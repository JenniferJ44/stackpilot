import { FormAnswers, ScoredTechnology } from './scoring';

export type StackCombination = {
  tools: Array<{ name: string; icon: string; role: string }>;
  why: string;
} | null;

export type ProjectDuration = {
  label: string;
  phases: Array<{ name: string; duration: string }>;
};

export type AgentInsight = {
  stackCombination: StackCombination;
  projectDuration: ProjectDuration;
  mvpScope: string[];
  projectSteps: Array<{ number: number; title: string; description: string }>;
};

const TOOL_ROLES: Record<string, string> = {
  Bubble: 'Interface utilisateur & logique métier',
  Airtable: 'Base de données & gestion de contenu',
  Make: 'Automatisation & connexions entre outils',
  Notion: 'Documentation & wiki collaboratif',
  HubSpot: 'CRM & marketing',
  Softr: 'Portail client sur Airtable',
  Stripe: 'Paiement en ligne',
  DocuSign: 'Signature électronique',
  'Claude Code': 'Développement sur-mesure',
};

export function buildStackCombination(
  answers: FormAnswers,
  topTechs: ScoredTechnology[]
): StackCombination {
  const main = topTechs[0];
  if (!main?.stackWith?.length) return null;
  if (answers.features.length < 2) return null;

  const companions = main.stackWith
    .map((name) => {
      const found = topTechs.find((t) => t.name === name);
      return found ? { name, icon: found.icon, role: TOOL_ROLES[name] ?? name } : null;
    })
    .filter((t): t is { name: string; icon: string; role: string } => t !== null)
    .slice(0, 2);

  if (companions.length === 0) return null;

  const allTools = [
    { name: main.name, icon: main.icon, role: TOOL_ROLES[main.name] ?? 'Outil principal' },
    ...companions,
  ];

  const why =
    companions.length === 1
      ? `${main.name} gère le cœur de votre application, tandis que ${companions[0].name} s'occupe de ${companions[0].role.toLowerCase()}.`
      : `${main.name} gère le cœur de votre application, ${companions[0].name} automatise vos flux, et ${companions[1]?.name ?? ''} complète la gestion de vos données.`;

  return { tools: allTools, why };
}

export function buildProjectDuration(answers: FormAnswers): ProjectDuration {
  const { urgency, projectType, features } = answers;
  const complexity = features.length;

  const base: Record<string, ProjectDuration> = {
    webapp: {
      label: complexity >= 4 ? '2 à 4 mois' : '3 à 6 semaines',
      phases: [
        { name: 'Cadrage & maquettes', duration: '1 semaine' },
        { name: 'Configuration & développement', duration: complexity >= 4 ? '6 à 10 semaines' : '3 à 5 semaines' },
        { name: 'Tests & ajustements', duration: '1 à 2 semaines' },
        { name: 'Mise en ligne', duration: '3 à 5 jours' },
      ],
    },
    crm: {
      label: '2 à 5 semaines',
      phases: [
        { name: 'Audit des données existantes', duration: '3 à 5 jours' },
        { name: 'Structure de la base', duration: '1 semaine' },
        { name: 'Automatisations & vues', duration: '1 à 2 semaines' },
        { name: 'Formation & adoption', duration: '1 semaine' },
      ],
    },
    automation: {
      label: '1 à 3 semaines',
      phases: [
        { name: 'Cartographie des processus', duration: '2 à 3 jours' },
        { name: 'Construction des scénarios', duration: '1 à 2 semaines' },
        { name: 'Tests & corrections', duration: '3 à 5 jours' },
      ],
    },
    documentation: {
      label: '1 à 3 semaines',
      phases: [
        { name: 'Architecture documentaire', duration: '2 à 3 jours' },
        { name: 'Migration & structuration', duration: '1 à 2 semaines' },
        { name: 'Formation équipe', duration: '2 à 3 jours' },
      ],
    },
    interne: {
      label: '3 à 8 semaines',
      phases: [
        { name: 'Cahier des charges fonctionnel', duration: '1 semaine' },
        { name: "Construction de l'outil", duration: '3 à 5 semaines' },
        { name: 'Tests avec les utilisateurs', duration: '1 semaine' },
        { name: 'Déploiement progressif', duration: '1 semaine' },
      ],
    },
    marketplace: {
      label: '2 à 5 mois',
      phases: [
        { name: 'Conception & architecture', duration: '2 à 3 semaines' },
        { name: 'MVP de la plateforme', duration: '4 à 8 semaines' },
        { name: 'Tests beta & retours', duration: '2 à 3 semaines' },
        { name: 'Lancement & optimisation', duration: 'en continu' },
      ],
    },
    mobile: {
      label: complexity >= 3 ? '2 à 5 mois' : '4 à 8 semaines',
      phases: [
        { name: 'Choix de la plateforme', duration: '1 semaine' },
        { name: 'Maquettes & parcours utilisateurs', duration: '1 à 2 semaines' },
        { name: 'Développement du MVP', duration: complexity >= 3 ? '6 à 12 semaines' : '3 à 5 semaines' },
        { name: 'Tests sur appareils réels', duration: '1 à 2 semaines' },
        { name: 'Publication (stores)', duration: '1 à 2 semaines' },
      ],
    },
  };

  const d = base[projectType] ?? base.webapp;

  if (urgency === 'urgent') {
    return { label: `${d.label} — à prioriser pour tenir votre délai`, phases: d.phases };
  }

  return d;
}

export function buildMVPScope(answers: FormAnswers, mainTech: ScoredTechnology): string[] {
  const { projectType, features } = answers;

  const mvpMap: Record<string, string[]> = {
    webapp: [
      'Authentification utilisateur (inscription / connexion)',
      "Parcours principal de l'application (1 action clé)",
      features.includes('payment') ? 'Intégration paiement basique' : 'Tableau de bord minimal',
      'Déploiement en ligne avec domaine',
    ],
    crm: [
      'Base contacts / entreprises avec champs essentiels',
      'Pipeline de suivi en vue Kanban',
      "Formulaire d'entrée de leads",
      features.includes('dashboard')
        ? 'Vue récapitulative des performances'
        : 'Export des données basique',
    ],
    automation: [
      'Identifier les 3 tâches les plus répétitives',
      'Automatiser la tâche la plus chronophage en premier',
      "Mettre en place des alertes en cas d'erreur",
    ],
    documentation: [
      "Structure de l'espace (sections, catégories)",
      'Migration des 10 documents les plus utilisés',
      "Droits d'accès par rôle",
    ],
    interne: [
      'Le formulaire ou écran principal de saisie',
      'La liste / vue principale des enregistrements',
      features.includes('dashboard') ? 'Un tableau de bord de suivi' : 'Export des données',
    ],
    marketplace: [
      'Profils offreurs et demandeurs',
      'Listing des offres avec filtres basiques',
      'Contact ou mise en relation simple',
      features.includes('payment') ? 'Paiement sécurisé via Stripe' : 'Processus de validation manuelle',
    ],
    mobile: [
      'Définir la plateforme cible : web responsive (Bubble/Glide) ou native (React Native/Flutter)',
      features.includes('users') ? 'Authentification et profils utilisateurs' : 'Écran principal de l\'app',
      features.includes('payment') ? 'Intégration paiement sécurisé' : 'Fonctionnalité core de l\'app',
      'Tests sur appareils mobiles réels (iOS et Android)',
      'Déploiement initial (PWA ou stores selon la plateforme choisie)',
    ],
  };

  void mainTech;
  return mvpMap[projectType] ?? mvpMap.webapp;
}

export function buildProjectSteps(
  answers: FormAnswers,
  mainTech: ScoredTechnology
): Array<{ number: number; title: string; description: string }> {
  const { projectType } = answers;

  const stepsMap: Record<string, Array<{ title: string; description: string }>> = {
    webapp: [
      {
        title: 'Définir les parcours utilisateurs',
        description:
          "Listez les 3 actions principales que vos utilisateurs feront. Schématisez-les sur papier.",
      },
      {
        title: 'Structurer la base de données',
        description:
          "Identifiez vos entités (ex : utilisateurs, projets, commandes) et leurs relations avant de toucher à l'outil.",
      },
      {
        title: 'Construire le MVP',
        description: `Commencez par les écrans essentiels dans ${mainTech.name}. Ne pensez pas encore au design final.`,
      },
      {
        title: 'Tester avec de vrais utilisateurs',
        description:
          "Faites tester par 3 à 5 personnes cibles. Notez les frictions avant d'aller plus loin.",
      },
      {
        title: 'Mettre en ligne et itérer',
        description: "Déployez sur un domaine, collectez les retours, et améliorez en cycles courts.",
      },
    ],
    crm: [
      {
        title: 'Auditer vos données existantes',
        description:
          "Exportez vos contacts actuels (Excel, Google Sheets). Identifiez les champs essentiels.",
      },
      {
        title: 'Structurer votre base',
        description: `Créez les tables principales dans ${mainTech.name} : Contacts, Entreprises, Opportunités.`,
      },
      {
        title: 'Configurer votre pipeline',
        description:
          "Définissez les étapes de votre cycle de vente et créez la vue Kanban correspondante.",
      },
      {
        title: 'Automatiser les tâches répétitives',
        description:
          "Configurez des rappels, notifications, ou synchronisations pour réduire la saisie manuelle.",
      },
      {
        title: "Former l'équipe",
        description: "Créez un guide de prise en main interne. Prévoyez une session de formation de 2h.",
      },
    ],
    automation: [
      {
        title: 'Cartographier vos processus',
        description:
          "Listez les 5 tâches les plus répétitives avec leur déclencheur, les données traitées, et le résultat attendu.",
      },
      {
        title: 'Prioriser les gains rapides',
        description:
          "Commencez par l'automatisation qui vous fera gagner le plus de temps avec le moins de complexité.",
      },
      {
        title: 'Construire le premier scénario',
        description: `Créez votre premier workflow dans ${mainTech.name}. Testez avec des données réelles, pas fictives.`,
      },
      {
        title: "Ajouter des garde-fous",
        description: "Configurez des alertes en cas d'erreur et des logs pour suivre les exécutions.",
      },
      {
        title: 'Documenter et dupliquer',
        description:
          "Une fois validé, documentez le scénario et adaptez-le pour les autres processus prioritaires.",
      },
    ],
    documentation: [
      {
        title: "Définir l'architecture",
        description: "Listez vos grandes catégories de contenu et la hiérarchie des sections.",
      },
      {
        title: 'Choisir vos gabarits',
        description: `Dans ${mainTech.name}, créez 2 à 3 templates de pages (procédure, référence, tutoriel).`,
      },
      {
        title: 'Migrer les contenus prioritaires',
        description:
          "Commencez par les 10 documents les plus consultés. Ne cherchez pas à tout migrer d'un coup.",
      },
      {
        title: 'Configurer les accès',
        description:
          "Définissez qui peut lire, modifier, et publier. Mettez en place les espaces par équipe si nécessaire.",
      },
      {
        title: "Adopter en équipe",
        description:
          'Organisez une session de prise en main. Désignez un "gardien" responsable de la qualité de la base.',
      },
    ],
    interne: [
      {
        title: 'Rédiger le cahier des charges',
        description:
          "Décrivez le problème à résoudre, les utilisateurs concernés, et les 3 fonctionnalités indispensables.",
      },
      {
        title: 'Prototyper les écrans clés',
        description: `Esquissez les wireframes sur papier, puis construisez les écrans principaux dans ${mainTech.name}.`,
      },
      {
        title: 'Impliquer les futurs utilisateurs',
        description: "Faites tester une version préliminaire par l'équipe concernée dès la 2e semaine.",
      },
      {
        title: 'Affiner et automatiser',
        description:
          "Ajoutez les automatisations demandées, les notifications, et les vues de suivi.",
      },
      {
        title: 'Déployer progressivement',
        description:
          "Lancez d'abord sur un périmètre restreint. Récoltez les retours avant de généraliser.",
      },
    ],
    marketplace: [
      {
        title: 'Définir le modèle économique',
        description:
          "Commission, abonnement, freemium ? Clarifiez la proposition de valeur pour les deux côtés de la marketplace.",
      },
      {
        title: 'Construire les profils',
        description: `Créez les pages offreurs et demandeurs dans ${mainTech.name} avec les informations essentielles.`,
      },
      {
        title: 'Créer le listing et la mise en relation',
        description: "Implémentez la recherche avec filtres basiques et le mécanisme de contact ou réservation.",
      },
      {
        title: 'Intégrer le paiement',
        description: "Connectez Stripe pour les transactions. Configurez les frais de service si applicable.",
      },
      {
        title: 'Tester avec de vrais utilisateurs',
        description:
          "Recrutez 5 offreurs et 10 demandeurs pour un test beta. Itérez rapidement sur les frictions.",
      },
    ],
    mobile: [
      {
        title: 'Choisir la bonne plateforme',
        description: `Web responsive (Bubble, Glide, Claude Code) ou native (React Native, Flutter) ? Ce choix dépend des fonctionnalités natives nécessaires (GPS, notifications push, stores).`,
      },
      {
        title: 'Définir les parcours utilisateurs',
        description: "Lister les 3 actions clés de l'application. Schématiser les écrans principaux sur papier ou Figma.",
      },
      {
        title: 'Construire le MVP',
        description: `Créer les écrans essentiels dans ${mainTech.name}. Tester en mode responsive mobile en priorité dès la première semaine.`,
      },
      {
        title: 'Tester sur appareils réels',
        description: "Faire tester par 5 utilisateurs sur iPhone et Android. Corriger les frictions avant de déployer.",
      },
      {
        title: 'Déploiement et itérations',
        description: "Déployer en PWA ou soumettre aux stores. Planifier les mises à jour selon les retours utilisateurs.",
      },
    ],
  };

  const steps = stepsMap[projectType] ?? stepsMap.webapp;
  return steps.map((s, i) => ({ number: i + 1, ...s }));
}

export function buildAgentInsight(answers: FormAnswers, topTechs: ScoredTechnology[]): AgentInsight {
  const mainTech = topTechs[0];
  return {
    stackCombination: buildStackCombination(answers, topTechs),
    projectDuration: buildProjectDuration(answers),
    mvpScope: buildMVPScope(answers, mainTech),
    projectSteps: buildProjectSteps(answers, mainTech),
  };
}

type FollowUpPattern = {
  keywords: string[];
  handler: (answers: FormAnswers, topTechs: ScoredTechnology[]) => string;
};

const FOLLOW_UP_PATTERNS: FollowUpPattern[] = [
  {
    keywords: ['durée', 'temps', 'délai', 'semaine', 'mois', 'jour', 'long', 'rapide', 'vite', 'combien de temps'],
    handler: (answers) => {
      const d = buildProjectDuration(answers);
      const phases = d.phases.map((p) => `• ${p.name} : ${p.duration}`).join('\n');
      return `Pour ce type de projet, comptez ${d.label}.\n\nÀ titre indicatif :\n${phases}`;
    },
  },
  {
    keywords: ['mvp', 'minimum', 'essentiel', 'commencer', 'démarrer', 'priorité', 'fonctionnalité indispensable'],
    handler: (answers, topTechs) => {
      const items = buildMVPScope(answers, topTechs[0]);
      return `Voici ce que je recommande pour votre MVP :\n${items.map((item) => `• ${item}`).join('\n')}\n\nConcentrez-vous d'abord sur ces éléments avant d'ajouter des fonctionnalités secondaires.`;
    },
  },
  {
    keywords: ['étape', 'roadmap', 'plan', 'planning', 'comment faire', 'par où', 'démarrer'],
    handler: (answers, topTechs) => {
      const steps = buildProjectSteps(answers, topTechs[0]);
      return `Voici les étapes recommandées :\n\n${steps.map((s) => `${s.number}. ${s.title}\n   ${s.description}`).join('\n\n')}`;
    },
  },
  {
    keywords: ['budget', 'coût', 'prix', 'combien', 'euro', '€', 'abonnement', 'tarif'],
    handler: (answers, topTechs) => {
      const top3 = topTechs.slice(0, 3).map((t) => `• ${t.name} : ${t.pricing}`).join('\n');
      const ctx =
        answers.budget === 'low'
          ? "Avec un budget serré, misez sur les offres gratuites ou d'entrée de gamme pour commencer."
          : answers.budget === 'medium'
          ? "Votre budget intermédiaire vous permet d'accéder aux fonctionnalités essentielles des outils recommandés."
          : "Avec un budget confortable, vous pouvez opter pour les plans avancés dès le départ.";
      return `Tarifs indicatifs des outils recommandés :\n${top3}\n\n${ctx}`;
    },
  },
  {
    keywords: ['développeur', 'dev', 'technique', 'coder', 'code', 'programmeur', 'compétence technique'],
    handler: (_, topTechs) => {
      const main = topTechs[0];
      const isNoCode = main.category === 'no-code' || main.category === 'automation';
      if (isNoCode) {
        return `${main.name} est un outil no-code — aucune compétence en développement n'est requise pour la plupart des usages. Un minimum de logique et de rigueur suffisent.\n\nSi votre projet devient très complexe, un accompagnement par un expert no-code peut vous faire gagner beaucoup de temps.`;
      }
      return "Ce type de projet peut nécessiter des compétences techniques selon le niveau de personnalisation voulu. Un accompagnement par un expert no-code ou low-code est souvent conseillé.";
    },
  },
  {
    keywords: ['pourquoi pas', 'vs', 'versus', 'différence', 'comparer', 'alternative', 'plutôt que', 'par rapport'],
    handler: (_, topTechs) => {
      if (topTechs.length < 2) {
        return `${topTechs[0]?.name ?? "L'outil recommandé"} reste le choix le plus pertinent pour votre profil.`;
      }
      const [first, second] = topTechs;
      return `${first.name} (${first.matchPercent}% de match) vs ${second.name} (${second.matchPercent}% de match) :\n\n• ${first.name} est recommandé en priorité car il correspond mieux à votre type de projet et à vos fonctionnalités.\n• ${second.name} est une bonne alternative si vous préférez une approche différente ou si vos priorités évoluent.\n\nLe choix final dépend souvent de vos préférences et de la courbe d'apprentissage acceptable.`;
    },
  },
  {
    keywords: ['stack', 'combinaison', 'associer', 'combiner', 'quel autre', 'quel outil en plus', 'complément'],
    handler: (answers, topTechs) => {
      const combo = buildStackCombination(answers, topTechs);
      if (!combo) {
        return `Pour votre profil, ${topTechs[0]?.name ?? "l'outil principal"} peut couvrir seul la majorité de vos besoins. Une combinaison d'outils devient pertinente quand plusieurs fonctionnalités distinctes sont nécessaires.`;
      }
      const toolList = combo.tools.map((t) => `• ${t.icon} ${t.name} : ${t.role}`).join('\n');
      return `Stack recommandée :\n${toolList}\n\n${combo.why}`;
    },
  },
  {
    keywords: ['vigilance', 'risque', 'attention', 'erreur', 'piège', 'éviter'],
    handler: (_, topTechs) => {
      const main = topTechs[0];
      const watchouts = main.contextualWatchouts?.slice(0, 3) ?? [];
      if (watchouts.length === 0) {
        return `Aucun point de vigilance majeur identifié pour ${main.name} dans votre contexte. Consultez la documentation officielle pour les bonnes pratiques spécifiques.`;
      }
      return `Points de vigilance pour ${main.name} :\n${watchouts.map((w) => `• ${w}`).join('\n')}`;
    },
  },
];

export function answerFollowUp(
  question: string,
  answers: FormAnswers,
  topTechs: ScoredTechnology[]
): string {
  const q = question.toLowerCase();

  for (const pattern of FOLLOW_UP_PATTERNS) {
    if (pattern.keywords.some((kw) => q.includes(kw))) {
      return pattern.handler(answers, topTechs);
    }
  }

  const main = topTechs[0];
  return `Pour votre projet, je vous recommande de commencer avec ${main.name} (${main.matchPercent}% de correspondance).\n\nVous pouvez me poser des questions sur : la durée du projet, le MVP, les étapes, le budget, la comparaison des outils, ou les combinaisons de stack recommandées.`;
}
