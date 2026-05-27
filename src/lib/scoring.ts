import { technologies, Technology } from '@/data/technologies';

export type ProjectType =
  | 'webapp'
  | 'crm'
  | 'automation'
  | 'documentation'
  | 'interne'
  | 'marketplace'
  | 'mobile';

export type CompanySize = 'solo' | 'small' | 'medium' | 'large';
export type Budget = 'low' | 'medium' | 'high';
export type Urgency = 'urgent' | 'normal' | 'long';

export type FormAnswers = {
  description?: string;
  projectType: ProjectType;
  companySize: CompanySize;
  budget: Budget;
  urgency: Urgency;
  features: string[];
};

export type ScoredTechnology = Technology & {
  score: number;
  matchPercent: number;
  matchReasons: string[];
  reformulation: string;
  whyThisStack: string;
  contextualWatchouts: string[];
  nextStep: string;
  alternativesNote: string;
  confidenceLevel: 'Fort' | 'Moyen' | 'À préciser';
  needsMoreInfo: boolean;
  followUpQuestions: string[];
};

const MAX_SCORE =
  10 * 3.5 + // projectType
  10 * 1.5 + // companySize
  10 * 2.0 + // budget
  10 * 1.0 + // urgency
  10 * 2.0 + // features
  12;         // keyword bonus max

function featureWeight(featureCount: number): number {
  if (featureCount === 0) return 0;
  return 2.0 / featureCount;
}

function keywordBonus(tech: Technology, description: string): number {
  if (!description || !tech.keywords?.length) return 0;
  const lower = description.toLowerCase();
  const matches = tech.keywords.filter((kw) => lower.includes(kw.toLowerCase()));
  return Math.min(matches.length * 1.5, 12);
}

export function calculateScore(tech: Technology, answers: FormAnswers): number {
  let score = 0;

  score += tech.scores.projectType[answers.projectType] * 3.5;
  score += tech.scores.companySize[answers.companySize] * 1.5;
  score += tech.scores.budget[answers.budget] * 2.0;
  score += tech.scores.urgency[answers.urgency] * 1.0;

  const features = answers.features;
  const w = featureWeight(features.length);
  const featureMap: Record<string, keyof typeof tech.scores.features> = {
    users: 'users',
    automation: 'automation',
    crm: 'crm',
    documents: 'documents',
    payment: 'payment',
    dashboard: 'dashboard',
  };

  features.forEach((f) => {
    const key = featureMap[f];
    if (key) score += tech.scores.features[key] * w;
  });

  score += keywordBonus(tech, answers.description ?? '');

  return score;
}

function buildMatchReasons(tech: Technology, answers: FormAnswers): string[] {
  const reasons: string[] = [];

  const ptScore = tech.scores.projectType[answers.projectType];
  if (ptScore >= 8) {
    const labels: Record<string, string> = {
      webapp: 'les applications web',
      crm: 'les CRM',
      automation: "l'automatisation",
      documentation: 'la gestion documentaire',
      interne: 'les outils internes',
      marketplace: 'les marketplaces',
      mobile: 'les applications mobiles',
    };
    reasons.push(`Excellent choix pour ${labels[answers.projectType]}`);
  }

  if (tech.scores.budget[answers.budget] >= 8) {
    const labels: Record<Budget, string> = {
      low: 'les petits budgets',
      medium: 'les budgets intermédiaires',
      high: 'les investissements importants',
    };
    reasons.push(`Bien adapté à ${labels[answers.budget]}`);
  }

  if (tech.scores.urgency[answers.urgency] >= 8) {
    const labels: Record<Urgency, string> = {
      urgent: 'un déploiement rapide',
      normal: 'un projet standard',
      long: 'un projet long terme',
    };
    reasons.push(`Idéal pour ${labels[answers.urgency]}`);
  }

  const sizeLabels: Record<CompanySize, string> = {
    solo: 'solo / freelance',
    small: 'les petites équipes',
    medium: 'les PME',
    large: 'les grandes organisations',
  };
  if (tech.scores.companySize[answers.companySize] >= 8) {
    reasons.push(`Recommandé pour ${sizeLabels[answers.companySize]}`);
  }

  const featureLabels: Record<string, string> = {
    users: 'gestion des utilisateurs',
    automation: 'automatisation',
    crm: 'suivi client',
    documents: 'gestion documentaire',
    payment: 'paiement en ligne',
    dashboard: 'tableaux de bord',
  };

  answers.features.forEach((f) => {
    const key = f as keyof typeof tech.scores.features;
    if (tech.scores.features[key] >= 8) {
      reasons.push(`Très bon pour la ${featureLabels[f]}`);
    }
  });

  // keyword match reason
  if (answers.description && tech.keywords?.length) {
    const lower = answers.description.toLowerCase();
    const matches = tech.keywords.filter((kw) => lower.includes(kw.toLowerCase()));
    if (matches.length >= 2) {
      reasons.push(`Votre description correspond bien à ce type de projet`);
    }
  }

  return reasons.slice(0, 3);
}

function buildReformulation(answers: FormAnswers): string {
  const typeLabels: Record<ProjectType, string> = {
    webapp: 'une application web sur mesure',
    crm: 'un CRM ou outil de suivi client',
    automation: 'un système automatisé de workflow',
    documentation: 'un espace documentaire structuré',
    interne: 'un outil interne métier',
    marketplace: 'une marketplace ou plateforme multi-utilisateurs',
    mobile: 'une application mobile',
  };

  const sizeLabels: Record<CompanySize, string> = {
    solo: 'en solo ou freelance',
    small: 'pour une petite équipe',
    medium: 'pour une PME',
    large: 'pour une grande organisation',
  };

  const budgetLabels: Record<Budget, string> = {
    low: 'avec un budget serré',
    medium: 'avec un budget intermédiaire',
    high: 'avec un budget confortable',
  };

  const urgencyLabels: Record<Urgency, string> = {
    urgent: 'à livrer rapidement',
    normal: 'sans contrainte de temps particulière',
    long: 'sur le long terme',
  };

  const base = `Votre projet ressemble à ${typeLabels[answers.projectType]}, ${sizeLabels[answers.companySize]}, ${budgetLabels[answers.budget]}, ${urgencyLabels[answers.urgency]}.`;

  if (answers.description && answers.description.trim().length > 20) {
    return `${base} En tenant compte de votre description, voici les outils les plus adaptés.`;
  }

  return base;
}

function buildWhyThisStack(tech: Technology, answers: FormAnswers): string {
  const ptScore = tech.scores.projectType[answers.projectType];
  const budgetScore = tech.scores.budget[answers.budget];

  if (ptScore >= 9 && budgetScore >= 7) {
    return `${tech.name} est le choix naturel pour ce type de projet : il répond directement à vos besoins fonctionnels et s'inscrit dans votre enveloppe budgétaire.`;
  }

  if (ptScore >= 7) {
    return `${tech.name} est bien positionné pour ce type de projet et offre un bon équilibre entre puissance et accessibilité.`;
  }

  return `${tech.name} peut couvrir ce besoin, notamment si vos priorités évoluent ou si vous souhaitez consolider plusieurs fonctionnalités dans un seul outil.`;
}

function buildFollowUpQuestions(answers: FormAnswers): string[] {
  const questions: string[] = [];

  if (!answers.description || answers.description.trim().length < 30) {
    questions.push("Pouvez-vous décrire en 2-3 phrases ce que votre outil devra permettre de faire ?");
  }

  if (answers.projectType === 'webapp' && !answers.features.includes('users')) {
    questions.push("Votre application aura-t-elle des comptes utilisateurs distincts (clients, collaborateurs) ?");
  }

  if (answers.projectType === 'automation' && !answers.features.includes('crm')) {
    questions.push("Votre automatisation est-elle liée à un CRM ou à des outils existants (Gmail, Slack, Notion...) ?");
  }

  if (answers.companySize === 'large' && answers.budget === 'low') {
    questions.push("Pour une grande organisation avec un budget serré, avez-vous déjà des licences Microsoft 365 ou Google Workspace en place ?");
  }

  if (answers.features.includes('payment') && answers.projectType !== 'marketplace') {
    questions.push("Le paiement est-il central dans votre projet (abonnement SaaS, vente produits) ou secondaire (dons, facturation ponctuelle) ?");
  }

  return questions.slice(0, 3);
}

export function getRecommendations(answers: FormAnswers): ScoredTechnology[] {
  const scored = technologies
    .map((tech) => {
      const score = calculateScore(tech, answers);
      const matchPercent = Math.min(100, Math.round((score / MAX_SCORE) * 100));
      const matchReasons = buildMatchReasons(tech, answers);

      const confidenceLevel: 'Fort' | 'Moyen' | 'À préciser' =
        matchPercent >= 65 ? 'Fort' : matchPercent >= 45 ? 'Moyen' : 'À préciser';

      const needsMoreInfo =
        matchPercent < 45 ||
        (!answers.description || answers.description.trim().length < 20);

      const contextualWatchouts = tech.watchouts?.slice(0, 3) ?? [];
      const nextStep = tech.firstStep ?? "Identifier vos 3 besoins prioritaires avant de choisir votre outil.";
      const alternativesNote =
        tech.alternatives && tech.alternatives.length > 0
          ? `Alternatives à considérer : ${tech.alternatives.join(', ')}`
          : '';

      return {
        ...tech,
        score,
        matchPercent,
        matchReasons,
        reformulation: buildReformulation(answers),
        whyThisStack: buildWhyThisStack(tech, answers),
        contextualWatchouts,
        nextStep,
        alternativesNote,
        confidenceLevel,
        needsMoreInfo,
        followUpQuestions: buildFollowUpQuestions(answers),
      };
    })
    .sort((a, b) => b.score - a.score);

  return scored;
}
