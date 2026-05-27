import { ProjectType } from './scoring';

export type DetectedNeed =
  | 'users'
  | 'payment'
  | 'automation'
  | 'crm'
  | 'documents'
  | 'dashboard'
  | 'geolocation'
  | 'messaging'
  | 'notifications'
  | 'booking'
  | 'stores';

export type ComplexityLevel = 'simple' | 'intermédiaire' | 'avancé';

export type DescriptionAnalysis = {
  projectTypeDetected: ProjectType | null;
  detectedNeeds: DetectedNeed[];
  detectedTools: string[];
  complexityLevel: ComplexityLevel;
  matchedKeywords: string[];
  suggestedFormValues: {
    projectType?: ProjectType;
    features: string[];
  };
  warnings: string[];
  confidenceScore: number;
  summary: string;
};

const TYPE_PATTERNS: Record<ProjectType, string[]> = {
  mobile: [
    'application mobile', 'app mobile', 'appli mobile', 'ios', 'android',
    'smartphone', 'notification push', 'géolocalisation', 'gps', 'app store',
    'play store', 'mobile native', 'application smartphone', 'mobile app',
    'hors ligne', 'offline', 'application ios', 'application android',
    'publier sur les stores', 'stores mobile',
  ],
  marketplace: [
    'marketplace', 'mise en relation', 'annonce', 'prestataire',
    'commission', 'vendeur', 'acheteur', 'place de marché',
    'deux côtés', 'offre et demande', 'plateforme de mise',
    'profils prestataires', 'profils clients',
  ],
  crm: [
    'crm', 'prospect', 'prospects', 'pipeline', 'opportunité', 'opportunités',
    'relance', 'relances', 'commercial', 'commerciaux', 'comptes clients',
    'leads', 'suivi commercial', 'base clients', 'portefeuille client',
    'cycle de vente',
  ],
  automation: [
    'automatiser', 'automatisation', 'webhook', 'email automatique',
    'sms automatique', 'synchronisation', 'scénario automatisé', 'make',
    'zapier', 'power automate', 'workflow', 'déclencheur', 'intégration automatique',
    'flux automatisé', 'automatique', 'connecter mes outils',
  ],
  documentation: [
    'documentation', 'procédure', 'procédures', 'wiki', 'base de connaissances',
    'onboarding', 'centre de ressources', 'knowledge base', 'guide interne',
    'manuel', 'notion', 'espace documentaire', 'faq interne', 'capitaliser',
  ],
  interne: [
    'outil interne', 'back-office', 'backoffice', 'usage interne',
    'équipe interne', 'processus interne', 'gestion interne',
    'outil pour mon équipe', 'tableau de bord interne', 'outil collaborateurs',
  ],
  webapp: [
    'application web', 'saas', 'plateforme', 'espace utilisateur',
    'portail', 'inscription', 'interface client', 'abonnement', 'logiciel',
    'site web', 'site vitrine', 'landing page', 'plateforme b2b',
    'facturation récurrente',
  ],
};

const NEED_PATTERNS: Record<DetectedNeed, string[]> = {
  users: [
    'compte utilisateur', 'comptes utilisateurs', 'inscription', 'connexion',
    'profil', 'profils', 'espace membre', 'rôles', 'authentification',
    'login', 'utilisateurs', 'membres', 'accès sécurisé',
  ],
  payment: [
    'paiement', 'payer', 'stripe', 'paypal', 'transaction', 'facturation',
    'abonnement', 'achat en ligne', 'carte bancaire', 'virement', 'monétisation',
    'paiement en ligne', 'payer en ligne',
  ],
  automation: [
    'automatiser', 'automatique', 'webhook', 'email automatique', 'notification automatique',
    'scénario', 'workflow', 'make', 'zapier', 'déclencher automatiquement',
  ],
  crm: [
    'crm', 'prospects', 'pipeline', 'leads', 'relance', 'commercial',
    'suivi client', 'cycle de vente', 'opportunités',
  ],
  documents: [
    'documents', 'fichiers', 'contrat', 'pdf', 'partage de documents',
    'bibliothèque', 'ged', 'versioning', 'gestion documentaire', 'documents à signer',
  ],
  dashboard: [
    'dashboard', 'tableau de bord', 'statistiques', 'analytics', 'rapport',
    'kpi', 'indicateur', 'visualisation', 'suivi en temps réel',
  ],
  geolocation: [
    'carte', 'géolocalisation', 'gps', 'localisation', 'proximité',
    'autour de moi', 'à proximité', 'maps', 'position géographique',
    'itinéraire', 'distance', 'map', 'cartographie',
  ],
  messaging: [
    'messagerie', 'chat', 'message', 'conversation', 'discussion',
    'temps réel', 'live chat', 'inbox', 'tchat', 'messaging',
  ],
  notifications: [
    'notification', 'notifications', 'notification push', 'push', 'alerte',
    'email de notification', 'sms', 'rappel', 'alerter',
  ],
  booking: [
    'réservation', 'réserver', 'créneau', 'disponibilité', 'rendez-vous',
    'calendrier', 'planning', 'booking', 'réserver une activité',
  ],
  stores: [
    'app store', 'play store', 'stores', 'publier sur les stores',
    'apple store', 'google play', 'application native', 'mobile native',
    'ios', 'android',
  ],
};

const TOOL_PATTERNS: { name: string; keywords: string[] }[] = [
  { name: 'Bubble', keywords: ['bubble', 'bubble.io'] },
  { name: 'Airtable', keywords: ['airtable'] },
  { name: 'Make', keywords: ['make', 'make.com', 'integromat'] },
  { name: 'Notion', keywords: ['notion'] },
  { name: 'Salesforce', keywords: ['salesforce', 'sales cloud'] },
  { name: 'SharePoint', keywords: ['sharepoint'] },
  { name: 'Power Automate', keywords: ['power automate', 'power platform'] },
  { name: 'DocuSign', keywords: ['docusign'] },
  { name: 'HubSpot', keywords: ['hubspot'] },
  { name: 'Zapier', keywords: ['zapier'] },
  { name: 'Glide', keywords: ['glide', 'glideapps'] },
  { name: 'Softr', keywords: ['softr'] },
  { name: 'Stripe', keywords: ['stripe'] },
  { name: 'Webflow', keywords: ['webflow'] },
  { name: 'Framer', keywords: ['framer'] },
  { name: 'WordPress', keywords: ['wordpress'] },
  { name: 'React Native', keywords: ['react native', 'react-native', 'expo'] },
  { name: 'Flutter', keywords: ['flutter'] },
  { name: 'Systeme.io', keywords: ['systeme.io', 'systeme io'] },
];

const ADVANCED_SIGNALS = [
  'géolocalisation', 'temps réel', 'native', 'ios', 'android',
  'messagerie', 'chat temps réel', 'paiement', 'multiple rôles',
  'app store', 'play store', 'stores', 'multilingue', 'multilingual',
  'grande volumétrie', 'api', 'intégrations multiples', 'commission',
];

const INTERMEDIATE_SIGNALS = [
  'réservation', 'comptes utilisateurs', 'dashboard', 'automatisation',
  'notifications', 'crm', 'reporting', 'mobile', 'portail client',
  'abonnement', 'paiement',
];

function detectProjectType(lower: string): { type: ProjectType | null; score: number; matched: string[] } {
  const scores: Record<ProjectType, { count: number; matched: string[] }> = {
    mobile: { count: 0, matched: [] },
    marketplace: { count: 0, matched: [] },
    crm: { count: 0, matched: [] },
    automation: { count: 0, matched: [] },
    documentation: { count: 0, matched: [] },
    interne: { count: 0, matched: [] },
    webapp: { count: 0, matched: [] },
  };

  for (const [type, patterns] of Object.entries(TYPE_PATTERNS) as [ProjectType, string[]][]) {
    const hits = patterns.filter((p) => lower.includes(p));
    scores[type] = { count: hits.length, matched: hits };
  }

  // Mobile has priority if any keyword found
  if (scores.mobile.count >= 1) {
    return { type: 'mobile', score: scores.mobile.count, matched: scores.mobile.matched };
  }

  // Find highest scoring type
  const sorted = (Object.entries(scores) as [ProjectType, { count: number; matched: string[] }][])
    .sort(([, a], [, b]) => b.count - a.count);

  const [bestType, best] = sorted[0];
  if (best.count === 0) return { type: null, score: 0, matched: [] };
  return { type: bestType, score: best.count, matched: best.matched };
}

export function analyzeProjectDescription(description: string): DescriptionAnalysis {
  if (!description || description.trim().length < 10) {
    return {
      projectTypeDetected: null,
      detectedNeeds: [],
      detectedTools: [],
      complexityLevel: 'simple',
      matchedKeywords: [],
      suggestedFormValues: { features: [] },
      warnings: [],
      confidenceScore: 0,
      summary: '',
    };
  }

  const lower = description.toLowerCase();
  const typeResult = detectProjectType(lower);

  const detectedNeeds: DetectedNeed[] = [];
  const allMatchedKeywords: string[] = [...typeResult.matched];

  for (const [need, patterns] of Object.entries(NEED_PATTERNS) as [DetectedNeed, string[]][]) {
    const hits = patterns.filter((p) => lower.includes(p));
    if (hits.length > 0) {
      detectedNeeds.push(need);
      allMatchedKeywords.push(...hits);
    }
  }

  const detectedTools: string[] = [];
  for (const tool of TOOL_PATTERNS) {
    if (tool.keywords.some((k) => lower.includes(k))) {
      detectedTools.push(tool.name);
    }
  }

  const advancedHits = ADVANCED_SIGNALS.filter((s) => lower.includes(s)).length;
  const intermediateHits = INTERMEDIATE_SIGNALS.filter((s) => lower.includes(s)).length;

  let complexityLevel: ComplexityLevel = 'simple';
  if (advancedHits >= 2 || (typeResult.type === 'mobile' && detectedNeeds.length >= 3)) {
    complexityLevel = 'avancé';
  } else if (advancedHits >= 1 || intermediateHits >= 2 || detectedNeeds.length >= 3) {
    complexityLevel = 'intermédiaire';
  }

  const warnings: string[] = [];
  if (typeResult.type === 'mobile') {
    const hasNativeSignals =
      detectedNeeds.includes('geolocation') ||
      detectedNeeds.includes('stores') ||
      detectedNeeds.includes('messaging');

    if (hasNativeSignals || complexityLevel === 'avancé') {
      warnings.push(
        "Votre projet mobile semble nécessiter des fonctionnalités avancées (carte, messagerie, ou publication stores). Bubble peut couvrir un MVP web responsive, mais React Native ou Flutter peuvent être plus adaptés pour une app native complète."
      );
    } else {
      warnings.push(
        "Pour un MVP mobile, Bubble (web responsive) ou Glide peuvent suffire. Vérifiez si une vraie app native est nécessaire avant d'investir dans un développement React Native ou Flutter."
      );
    }
  }

  if (
    detectedNeeds.includes('payment') &&
    (typeResult.type === 'marketplace' || detectedNeeds.includes('booking'))
  ) {
    warnings.push(
      "La gestion de paiements dans une marketplace implique des règles légales spécifiques (KYC, fractionnement des paiements). Prévoyez une validation juridique."
    );
  }

  if (detectedNeeds.includes('messaging') && detectedNeeds.includes('geolocation')) {
    warnings.push(
      "Messagerie temps réel + géolocalisation = projet techniquement ambitieux. Un cadrage technique préalable est fortement recommandé."
    );
  }

  const formFeatures = detectedNeeds.filter((n) =>
    ['users', 'payment', 'automation', 'crm', 'documents', 'dashboard'].includes(n)
  ) as string[];

  const totalSignals =
    typeResult.score + detectedNeeds.length * 0.8 + detectedTools.length * 0.5;
  const confidenceScore = Math.min(1, totalSignals / 8);

  const summary = buildSummary(
    typeResult.type,
    detectedNeeds,
    detectedTools,
    complexityLevel
  );

  return {
    projectTypeDetected: typeResult.type,
    detectedNeeds,
    detectedTools,
    complexityLevel,
    matchedKeywords: [...new Set(allMatchedKeywords)].slice(0, 10),
    suggestedFormValues: {
      projectType: typeResult.type ?? undefined,
      features: formFeatures,
    },
    warnings,
    confidenceScore,
    summary,
  };
}

const TYPE_LABELS: Record<ProjectType, string> = {
  mobile: 'une application mobile',
  marketplace: 'une marketplace ou plateforme de mise en relation',
  crm: 'un CRM ou outil de suivi commercial',
  automation: "un système d'automatisation",
  documentation: 'une base de connaissances ou espace documentaire',
  interne: 'un outil interne',
  webapp: 'une application web',
};

const NEED_LABELS: Record<DetectedNeed, string> = {
  users: 'comptes utilisateurs',
  payment: 'paiement en ligne',
  automation: 'automatisations',
  crm: 'suivi client / CRM',
  documents: 'gestion de documents',
  dashboard: 'tableaux de bord',
  geolocation: 'carte / géolocalisation',
  messaging: 'messagerie',
  notifications: 'notifications',
  booking: 'système de réservation',
  stores: 'publication sur les stores',
};

function buildSummary(
  type: ProjectType | null,
  needs: DetectedNeed[],
  tools: string[],
  complexity: ComplexityLevel
): string {
  if (!type && needs.length === 0) return '';

  const typeStr = type ? TYPE_LABELS[type] : 'un projet numérique';
  const needsStr =
    needs.length > 0
      ? needs
          .slice(0, 5)
          .map((n) => NEED_LABELS[n])
          .join(', ')
      : '';
  const complexityStr =
    complexity === 'simple'
      ? 'relativement simple'
      : complexity === 'intermédiaire'
      ? 'de complexité intermédiaire'
      : 'avancé et ambitieux';

  let summary = `D'après votre description, votre projet ressemble à ${typeStr}`;
  if (needsStr) summary += `, avec des besoins en : ${needsStr}`;
  summary += `. Le niveau de complexité semble ${complexityStr}.`;
  if (tools.length > 0) summary += ` Vous avez mentionné : ${tools.join(', ')}.`;

  return summary;
}

export { TYPE_LABELS, NEED_LABELS };
