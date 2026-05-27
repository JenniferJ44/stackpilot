import { GuidedAnswers } from './guidedScoring';

export type SubScore = {
  id: string;
  label: string;
  score: number;   // 0-100
  description: string;
  icon: string;
};

export type MaturityResult = {
  global: number;
  label: string;
  interpretation: string;
  subScores: SubScore[];
};

function clamp(n: number): number {
  return Math.max(0, Math.min(100, Math.round(n)));
}

function scoreClarte(a: GuidedAnswers): SubScore {
  let s = 0;
  if (a.projectCategory && a.projectCategory !== 'unknown') s += 25;
  if (a.mainObjective) s += 25;
  if (a.userTypes.length > 0) s += 25;
  if (a.additionalContext && a.additionalContext.trim().length > 15) s += 25;

  let description: string;
  if (s <= 25)      description = "Le type de projet et l'objectif principal restent à définir.";
  else if (s <= 50) description = "Un premier élément est posé, mais le périmètre reste à préciser.";
  else if (s <= 75) description = "Le besoin principal est identifiable, mais le périmètre exact reste à cadrer.";
  else              description = "Le besoin est bien formulé et le périmètre est clairement identifié.";

  return { id: 'clarte', label: 'Clarté du besoin', score: clamp(s), description, icon: '🎯' };
}

function scoreAutomation(a: GuidedAnswers): SubScore {
  let s = 0;
  const autoFeatures = ['auto-email', 'auto-sync', 'auto-complex'];
  const hasAutoFeature = a.selectedFeatures.some((f) => autoFeatures.includes(f));
  if (a.needsAutomation === 'yes' || hasAutoFeature) s += 40;
  if (a.toolConnections.length > 0) s += 30;
  if (a.existingTools.length > 0 && !a.existingTools.includes('none')) s += 30;

  let description: string;
  if (s <= 30)      description = "Peu de tâches automatisables identifiées — à explorer lors du cadrage.";
  else if (s <= 60) description = "Plusieurs tâches semblent automatisables, mais le processus prioritaire est à cibler.";
  else              description = "Un fort potentiel d'automatisation a été identifié dans votre projet.";

  return { id: 'automation', label: "Potentiel d'automatisation", score: clamp(s), description, icon: '⚡' };
}

function scoreDonnees(a: GuidedAnswers): SubScore {
  let s = 0;
  if (a.dataTypes.length >= 2)      s += 40;
  else if (a.dataTypes.length === 1) s += 20;
  if (a.dataVolume)    s += 30;
  if (a.dataSensitive) s += 30;

  let description: string;
  if (s <= 30)      description = "Les données à gérer restent à identifier et structurer.";
  else if (s <= 60) description = "Les principaux types de données sont identifiés, le volume est à préciser.";
  else              description = "Les données du projet sont bien identifiées et quantifiées.";

  return { id: 'donnees', label: 'Structuration des données', score: clamp(s), description, icon: '📊' };
}

function scoreOutils(a: GuidedAnswers): SubScore {
  let s = 0;
  const hasTools = a.existingTools.length > 0 && !a.existingTools.includes('none');
  if (hasTools) s += 45;
  if (a.toolConnections.length > 0) s += 30;
  if (a.crmIsCentral || a.hasSharepointTeams || a.existingToolset) s += 25;

  let description: string;
  if (s === 0)        description = "Aucun outil existant identifié — la stack est à construire entièrement.";
  else if (s <= 40)   description = "Quelques outils sont en place, mais l'écosystème reste à consolider.";
  else if (s <= 70)   description = "Un écosystème est déjà en place et des connexions sont envisagées.";
  else                description = "L'environnement technique est bien défini, avec des outils et connexions identifiées.";

  return { id: 'outils', label: 'Outils déjà en place', score: clamp(s), description, icon: '🔧' };
}

function scorePerimetre(a: GuidedAnswers): SubScore {
  let s = 0;
  if (a.selectedFeatures.length > 0) s += 33;
  if (a.dataTypes.length > 0)        s += 33;
  if (a.userAccounts !== null)        s += 34;

  let description: string;
  if (s <= 33)      description = "Le périmètre fonctionnel reste large — les fonctionnalités clés sont à prioriser.";
  else if (s <= 66) description = "Les contours du projet se dessinent, quelques fonctionnalités restent à préciser.";
  else              description = "Le périmètre technique est bien défini : fonctionnalités, données et accès identifiés.";

  return { id: 'perimetre', label: 'Périmètre technique', score: clamp(s), description, icon: '🔲' };
}

function scorePriorite(a: GuidedAnswers): SubScore {
  let s = 0;
  if (a.timeline && a.timeline !== 'no-urgency') s += 35;
  if (a.timeline === 'days' || a.timeline === '1-2weeks') s += 15;
  if (a.budget && a.budget !== 'tbd') s += 25;
  if (a.mainPriority) s += 25;

  let description: string;
  if (s <= 30)      description = "Le délai et le budget restent à définir avant de lancer le projet.";
  else if (s <= 60) description = "Une priorité commence à se dessiner — le cadrage confirmera les contraintes.";
  else              description = "Le projet a une urgence et un budget identifiés — les conditions sont réunies.";

  return { id: 'priorite', label: 'Niveau de priorité', score: clamp(s), description, icon: '🚀' };
}

export function computeMaturity(a: GuidedAnswers): MaturityResult {
  const clarte    = scoreClarte(a);
  const auto      = scoreAutomation(a);
  const donnees   = scoreDonnees(a);
  const outils    = scoreOutils(a);
  const perimetre = scorePerimetre(a);
  const priorite  = scorePriorite(a);

  const subScores = [clarte, auto, donnees, outils, perimetre, priorite];

  // Pondération : clarté 25 %, auto 20 %, données 20 %, outils 15 %, périmètre 10 %, priorité 10 %
  const global = clamp(
    clarte.score    * 0.25 +
    auto.score      * 0.20 +
    donnees.score   * 0.20 +
    outils.score    * 0.15 +
    perimetre.score * 0.10 +
    priorite.score  * 0.10
  );

  let label: string;
  let interpretation: string;

  if (global < 35) {
    label = 'Projet à explorer';
    interpretation = "Les bases du projet sont à poser. Une session de cadrage permettra de définir rapidement le périmètre, l'objectif et les contraintes essentielles. Ce n'est pas un frein — c'est une étape normale.";
  } else if (global < 55) {
    label = 'Projet en cours de définition';
    interpretation = "Le projet prend forme, mais certains points restent à préciser. Quelques échanges de cadrage suffiront à poser des bases solides pour un premier MVP efficace.";
  } else if (global < 75) {
    label = 'Projet pertinent pour un MVP';
    interpretation = "Votre projet semble suffisamment clair pour lancer une première version. Quelques points doivent être précisés, mais les conditions sont réunies pour démarrer efficacement.";
  } else {
    label = 'Projet bien cadré — prêt à construire';
    interpretation = "Le projet est bien défini, les données sont structurées et les priorités sont claires. Les bases sont en place pour démarrer la construction rapidement et efficacement.";
  }

  return { global, label, interpretation, subScores };
}
