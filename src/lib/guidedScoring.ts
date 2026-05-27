// ─── Types ───────────────────────────────────────────────────────────────────

export type GuidedAnswers = {
  // Step 1 — nature du projet
  projectCategory: string | null; // 'app' | 'automation' | 'crm' | 'docs' | 'ged' | 'landing' | 'unknown'
  appSubtype: string | null;      // 'saas' | 'marketplace' | 'client-portal' | 'internal-tool' | 'mobile' | 'unknown'
  docsSubtype: string | null;     // 'knowledge-base' | 'wiki' | 'onboarding' | 'procedures' | 'project-docs'
  hasMicrosoft365: string | null; // 'yes' | 'no' | 'unknown'  (affiché si projectCategory === 'ged')

  // Step 2 — objectif
  mainObjective: string | null;

  // Step 3 — utilisateurs
  userTypes: string[];     // 'self' | 'team' | 'clients' | 'partners' | 'multiple'
  userAccounts: string | null; // 'none' | 'simple' | 'multi-role' | 'secure' | 'unknown'

  // Step 4 — fonctionnalités (multi-sélection)
  // 'payment'|'subscription'|'marketplace-payment'|'auto-email'|'auto-sync'|'auto-complex'
  // 'doc-storage'|'doc-workflow'|'signature'|'reporting'|'custom-interface'
  // 'user-roles'|'notifications'|'booking'
  selectedFeatures: string[];
  // Champs legacy conservés pour compatibilité descendante
  needsInterface: string | null;
  needsPayment: string | null;
  needsAutomation: string | null;
  needsDocuments: string | null;
  needsReporting: string | null;

  // Step 5 — données
  dataTypes: string[];          // multi-sélection : 'clients'|'users'|'products'|'documents'|'bookings'|'content'|'financial'|'contracts'
  dataType: string | null;      // legacy
  dataVolume: string | null;
  dataSensitive: string | null;

  // Step 6 — outils existants
  existingTools: string[];             // multi-sélection : 'none'|'google'|'microsoft365'|'sharepoint'|'notion'|'airtable'|'salesforce'|'hubspot'|'bubble'|'cms'|'stripe'|'docusign'|'other'
  toolConnections: string[];           // multi-sélection : connexions identifiées entre outils
  existingToolset: string | null;      // legacy — 'none' | 'google' | 'microsoft' | 'airtable-notion' | 'salesforce-hubspot' | 'website' | 'other'
  hasSharepointTeams: string | null;   // legacy
  crmIsCentral: string | null;         // 'yes' | 'no' | 'unknown'  (si salesforce/hubspot)
  existingDataInTool: string | null;   // legacy

  // Step 7 — budget & délai
  mainPriority: string | null;  // 'test-quick' | 'simple' | 'build-properly' | 'robust'
  timeline: string | null;      // 'days' | '1-2weeks' | '3-6weeks' | '2-3months' | 'no-urgency'
  budget: string | null;        // 'very-limited' | 'moderate' | 'comfortable' | 'tbd'

  // Step 8 — maintenance
  maintenanceOwner: string | null; // 'self' | 'non-tech-team' | 'internal-admin' | 'external' | 'unknown'
  autonomyLevel: string | null;    // 'content' | 'data' | 'simple' | 'robustness' | 'unknown'

  // Step 9 — précisions
  additionalContext: string;

  // Précisions "Autre" saisies librement dans les multi-sélections
  otherDetails: Record<string, string>;
};

export type TechRole = {
  name: string;
  icon: string;
  role: string;
  necessity: 'primary' | 'secondary' | 'optional';
  prosCons?: {
    advantages: string[];
    drawbacks: string[];
  };
};

export type CombinationNecessity = 'required' | 'useful' | 'phase2' | 'single-tool' | 'too-complex';

export type AlternativeRecommendation = {
  shouldDisplay: boolean;
  stackName: string;
  tools: string[];
  whenPreferable: string;
  advantages: string[];
  limits: string[];
  relevanceNote: string;
};

export type GuidedRecommendation = {
  reformulation: string;
  techStack: TechRole[];
  combinationNecessity: CombinationNecessity;
  combinationLabel: string;
  combinationColor: string;
  rationale: string;
  v1Simplification: string | null;
  mvpKeep: string[];
  mvpDefer: string[];
  estimatedDuration: string;
  watchouts: string[];
  clarifyingQuestions: string[];
  alternativeRecommendation: AlternativeRecommendation | null;
};

// ─── Static data ──────────────────────────────────────────────────────────────

const TECH_ICONS: Record<string, string> = {
  Bubble: '🔵',
  Airtable: '🟡',
  Make: '⚡',
  Notion: '⬛',
  Salesforce: '☁️',
  SharePoint: '📁',
  'Power Automate': '🔷',
  DocuSign: '✍️',
  'Claude Code': '🤖',
  HubSpot: '🟠',
  Zapier: '🔶',
  Webflow: '🌊',
  Framer: '🖼️',
  WordPress: '📰',
  Stripe: '💳',
  Softr: '⬜',
};

const TECH_ROLES: Record<string, string> = {
  Bubble: 'Interface, logique métier, comptes utilisateurs',
  Airtable: 'Base de données, vues, gestion de contenu',
  Make: 'Automatisation des workflows entre outils',
  Notion: 'Documentation, wiki, base de connaissances',
  Salesforce: 'CRM enterprise, pipeline, reporting avancé',
  SharePoint: 'Gestion documentaire, bibliothèques, accès',
  'Power Automate': "Automatisation Microsoft, circuits d'approbation",
  DocuSign: 'Signature électronique, gestion des contrats',
  'Claude Code': 'Développement sur-mesure assisté par IA',
  HubSpot: 'CRM léger, marketing automation, suivi leads',
  Zapier: 'Automatisation simple entre applications',
  Webflow: 'Site vitrine, landing page, design avancé',
  Framer: 'Landing page moderne, prototypage rapide',
  WordPress: 'Site web, blog, CMS accessible',
  Stripe: 'Paiement en ligne, abonnements, facturation',
  Softr: 'Portail client no-code sur Airtable',
};

const COMBINATION_LABELS: Record<CombinationNecessity, string> = {
  required: 'Nécessaire',
  useful: 'Utile mais optionnelle',
  phase2: 'À prévoir en phase 2',
  'single-tool': 'Outil unique suffisant',
  'too-complex': 'À simplifier',
};

const COMBINATION_COLORS: Record<CombinationNecessity, string> = {
  required: 'bg-green-100 text-green-700 border-green-200',
  useful: 'bg-blue-100 text-blue-700 border-blue-200',
  phase2: 'bg-amber-100 text-amber-700 border-amber-200',
  'single-tool': 'bg-violet-100 text-violet-700 border-violet-200',
  'too-complex': 'bg-red-100 text-red-700 border-red-200',
};

// ─── Tool pros/cons data ──────────────────────────────────────────────────────

type ProsCons = { advantages: string[]; drawbacks: string[] };

const TOOL_PROCONS: Record<string, Record<string, ProsCons>> = {
  Bubble: {
    marketplace: {
      advantages: [
        "Gestion native des profils acheteurs et vendeurs",
        "Logique de mise en relation sur-mesure sans code",
        "Design d'interface entièrement personnalisable",
      ],
      drawbacks: [
        "Courbe d'apprentissage initiale (2-4 semaines)",
        "Performance à surveiller au-delà de 10 000 utilisateurs",
        "Coût mensuel qui augmente avec le trafic",
      ],
    },
    saas: {
      advantages: [
        "Interface + base de données + logique métier dans un seul outil",
        "Comptes utilisateurs, rôles et permissions natifs",
        "Déploiement d'une V1 en 4 à 8 semaines",
      ],
      drawbacks: [
        "Migration complexe si vous souhaitez sortir de Bubble",
        "Montée en charge à anticiper sur les plans inférieurs",
        "Moins adapté si vos besoins deviennent très techniques",
      ],
    },
    "client-portal": {
      advantages: [
        "Espace client sécurisé avec accès et rôles personnalisés",
        "Connexion à vos outils existants via API ou Make",
        "Interface sur-mesure sans développeur",
      ],
      drawbacks: [
        "Nécessite une configuration rigoureuse des permissions",
        "Coût mensuel récurrent (Bubble Starter ~25 $/mois+)",
        "Moins natif que Salesforce Experience Cloud si déjà sur Salesforce",
      ],
    },
    "internal-tool": {
      advantages: [
        "Interface sur-mesure adaptée à votre process interne",
        "Gestion des rôles (admin, viewer, editor) native",
        "Pas de développeur requis pour les évolutions fonctionnelles",
      ],
      drawbacks: [
        "Surdimensionné si le besoin est simple (Airtable suffit souvent)",
        "Coût mensuel plus élevé qu'Airtable",
        "Mise en place plus longue qu'une solution tableur évoluée",
      ],
    },
    _default: {
      advantages: [
        "Interface personnalisable sans code",
        "Logique métier complexe gérée nativement",
        "Déploiement rapide d'une V1",
      ],
      drawbacks: [
        "Courbe d'apprentissage initiale (2-3 semaines)",
        "Coût mensuel récurrent",
        "Migration complexe vers une autre solution",
      ],
    },
  },
  Make: {
    automation: {
      advantages: [
        "Logique conditionnelle avancée (si/sinon, boucles, filtres)",
        "2 000+ intégrations disponibles tous éditeurs",
        "Scénarios visuels faciles à comprendre et modifier en autonomie",
      ],
      drawbacks: [
        "Peut devenir complexe à maintenir sur des scénarios très imbriqués",
        "Coût basé sur le nombre d'opérations mensuelles",
        "Nécessite une mise à jour si les APIs tierces évoluent",
      ],
    },
    _default: {
      advantages: [
        "Automatise les tâches répétitives entre vos outils",
        "Pas de développeur requis pour les workflows",
        "Facile à modifier en autonomie",
      ],
      drawbacks: [
        "Dépendance aux APIs et connecteurs tiers",
        "Coût mensuel selon le volume d'opérations",
        "Configuration initiale prend du temps sur les scénarios complexes",
      ],
    },
  },
  Airtable: {
    "crm-simple": {
      advantages: [
        "CRM léger déployable en 2-3 jours",
        "Vues kanban et calendrier pour le suivi commercial",
        "Facile à adapter à votre process sans développeur",
      ],
      drawbacks: [
        "Ne remplace pas un CRM avancé (pas de scoring ni de forecasting natif)",
        "Automatisations limitées sans Make",
        "Interface moins intuitive pour les équipes non-tech",
      ],
    },
    "internal-tool": {
      advantages: [
        "Base de données flexible avec vues multiples (grille, kanban, calendrier)",
        "Apprentissage rapide (2-3 jours)",
        "Collaboration en temps réel pour toute l'équipe",
      ],
      drawbacks: [
        "Pas d'interface client ou public native sans Softr",
        "Limite de 50 000 enregistrements sur les plans standards",
        "Relations entre tables moins robustes qu'une vraie base SQL",
      ],
    },
    _default: {
      advantages: [
        "Déploiement rapide, pas de développeur requis",
        "Flexible et personnalisable selon votre process",
        "Collaboration en temps réel",
      ],
      drawbacks: [
        "Limites de volumétrie sur les plans basiques",
        "Pas d'interface public native sans outil tiers",
        "Automatisations natives limitées",
      ],
    },
  },
  Salesforce: {
    "crm-advanced": {
      advantages: [
        "Pipeline avancé, reporting et personnalisation poussée",
        "AppExchange : écosystème d'intégrations très large",
        "Conçu pour les équipes commerciales structurées",
      ],
      drawbacks: [
        "Coût élevé (25 €/utilisateur/mois minimum)",
        "Configuration et maintenance nécessitent souvent un admin dédié",
        "Délai de déploiement initial long (6-12 semaines)",
      ],
    },
    "client-portal": {
      advantages: [
        "Intégration native avec vos données CRM déjà centralisées",
        "Experience Cloud prêt à déployer sur licence Enterprise",
        "Gestion des accès et workflows avancée",
      ],
      drawbacks: [
        "Coût très élevé si pas déjà en place",
        "Nécessite des compétences Salesforce pour la configuration",
        "Surdimensionné si le CRM n'est pas au coeur de l'activité",
      ],
    },
    _default: {
      advantages: [
        "Référence CRM enterprise",
        "Reporting et personnalisation avancés",
        "Vaste écosystème d'intégrations (AppExchange)",
      ],
      drawbacks: [
        "Coût élevé",
        "Complexité de configuration",
        "Nécessite souvent un admin dédié",
      ],
    },
  },
  SharePoint: {
    "knowledge-base": {
      advantages: [
        "Inclus dans votre licence Microsoft 365",
        "Intégration native Teams, Outlook, OneDrive",
        "Gestion fine des droits par groupe Active Directory",
      ],
      drawbacks: [
        "Interface moins intuitive que Notion pour du contenu éditorial",
        "Configuration initiale plus technique",
        "Adoption utilisateur parfois difficile hors contexte Microsoft",
      ],
    },
    ged: {
      advantages: [
        "Solution native pour une GED dans l'écosystème Microsoft 365",
        "Versioning de documents et workflows d'approbation natifs",
        "Gestion des bibliothèques et accès par site ou équipe",
      ],
      drawbacks: [
        "Prise en main technique pour les configurations avancées",
        "Adoption utilisateur non-tech souvent difficile",
        "Peu adapté hors de l'environnement Microsoft",
      ],
    },
    _default: {
      advantages: [
        "Inclus dans Microsoft 365",
        "Gestion documentaire et accès intégrés",
        "Intégration Teams et Outlook native",
      ],
      drawbacks: [
        "Interface moins intuitive que des alternatives modernes",
        "Configuration technique initiale",
        "Adoption utilisateur à accompagner",
      ],
    },
  },
  "Power Automate": {
    _default: {
      advantages: [
        "Inclus dans votre licence Microsoft 365",
        "Connecteurs natifs SharePoint, Teams, Outlook et Dataverse",
        "Workflows d'approbation simples à configurer",
      ],
      drawbacks: [
        "Interface moins intuitive que Make sur les scénarios complexes",
        "Certains connecteurs nécessitent une licence Premium additionnelle",
        "Moins flexible que Make pour les intégrations hors Microsoft",
      ],
    },
  },
  Notion: {
    "knowledge-base": {
      advantages: [
        "Interface intuitive, rapide à adopter par toute l'équipe",
        "Blocs modulaires (wiki, table, kanban, calendrier) très flexibles",
        "Collaboration en temps réel fluide",
      ],
      drawbacks: [
        "Gestion des droits moins fine que SharePoint pour de grandes équipes",
        "Moins adapté pour des documents très formels ou réglementés",
        "Pas d'intégration Microsoft Teams native",
      ],
    },
    ged: {
      advantages: [
        "Déploiement rapide hors écosystème Microsoft",
        "Structure claire et collaboration facile",
        "Version desktop, web et mobile native",
      ],
      drawbacks: [
        "Versioning de fichiers moins robuste que SharePoint",
        "Gestion des accès moins granulaire pour de grandes équipes",
        "Moins adapté pour des documents lourds en volume",
      ],
    },
    _default: {
      advantages: [
        "Interface intuitive et adoption rapide",
        "Structure flexible (wiki, base de données, kanban)",
        "Collaboration en temps réel",
      ],
      drawbacks: [
        "Gestion des droits moins fine que SharePoint",
        "Moins adapté aux données très structurées en volume",
        "Automatisations natives limitées",
      ],
    },
  },
  DocuSign: {
    _default: {
      advantages: [
        "Leader de la signature électronique (valeur légale reconnue)",
        "Intégration native avec Salesforce et Bubble",
        "Traçabilité et archivage des documents signés",
      ],
      drawbacks: [
        "Coût par enveloppe ou abonnement mensuel",
        "Configuration des webhooks requiert une attention technique",
        "Peut être surdimensionné pour de faibles volumes de signature",
      ],
    },
  },
  Stripe: {
    _default: {
      advantages: [
        "Leader du paiement en ligne, forte confiance utilisateur",
        "Intégration native avec Bubble, Make et la plupart des outils no-code",
        "Gestion des abonnements et de la facturation incluse",
      ],
      drawbacks: [
        "Commission par transaction (1,4 à 2,9 % + 25 cts selon le pays)",
        "Configuration KYB/KYC plus complexe pour les marketplaces",
        "Intégration à configurer soigneusement (webhooks, events)",
      ],
    },
  },
  "Claude Code": {
    mobile: {
      advantages: [
        "Développement sur-mesure total sans contrainte no-code",
        "React Native ou Flutter pour iOS et Android natifs",
        "Fonctionnalités natives (notifications push, caméra, GPS) sans limite",
      ],
      drawbacks: [
        "Nécessite des compétences techniques pour la maintenance",
        "Coût de développement plus élevé qu'une solution no-code",
        "Délai de livraison plus long (2-4 mois minimum)",
      ],
    },
    _default: {
      advantages: [
        "Développement sur-mesure sans contrainte de plateforme",
        "IA intégrée pour accélérer les itérations",
        "Propriété complète du code",
      ],
      drawbacks: [
        "Compétences techniques requises pour la maintenance",
        "Coût plus élevé qu'une solution no-code",
        "Délai de livraison plus long",
      ],
    },
  },
  WordPress: {
    _default: {
      advantages: [
        "Gestion de contenu autonome pour équipes non-tech",
        "Écosystème de thèmes et plugins très large",
        "Hébergement indépendant et contrôle total",
      ],
      drawbacks: [
        "Mises à jour plugins/thèmes à gérer régulièrement",
        "Performance variable selon l'hébergeur",
        "Moins adapté pour des interfaces très personnalisées",
      ],
    },
  },
  Webflow: {
    _default: {
      advantages: [
        "Design professionnel avancé sans code",
        "SEO natif et excellentes performances de chargement",
        "CMS intégré pour les contenus éditoriaux",
      ],
      drawbacks: [
        "Courbe d'apprentissage pour les non-designers",
        "Moins adapté aux fonctionnalités dynamiques complexes",
        "Coût mensuel selon le plan (14 à 36 $/mois+)",
      ],
    },
  },
  Framer: {
    _default: {
      advantages: [
        "Design et animations de qualité en quelques heures",
        "Mise en ligne ultra-rapide",
        "Parfait pour une landing page moderne et soignée",
      ],
      drawbacks: [
        "Moins adapté aux sites avec beaucoup de contenu ou de pages",
        "CMS limité comparé à WordPress ou Webflow",
        "Moins d'intégrations tierces natives",
      ],
    },
  },
  HubSpot: {
    _default: {
      advantages: [
        "CRM dédié avec pipeline et activités commerciales natifs",
        "Tier gratuit très généreux pour démarrer",
        "Marketing automation et emailing inclus sur les plans payants",
      ],
      drawbacks: [
        "Plans payants très onéreux (800 €/mois+ pour fonctionnalités avancées)",
        "Moins flexible qu'Airtable pour les usages non-CRM",
        "Courbe d'apprentissage plus longue",
      ],
    },
  },
  Softr: {
    _default: {
      advantages: [
        "Portail client sur Airtable déployable en 1-2 semaines",
        "Interface utilisateur accessible sans code",
        "Coût mensuel faible",
      ],
      drawbacks: [
        "Personnalisation de l'interface limitée",
        "Dépend entièrement d'Airtable comme source de données",
        "Branding limité sur les plans basiques",
      ],
    },
  },
  Zapier: {
    _default: {
      advantages: [
        "Prise en main très rapide (moins d'1 heure)",
        "Interface intuitive pour les profils non-techniques",
        "Bibliothèque d'intégrations pré-configurées très large",
      ],
      drawbacks: [
        "Moins puissant que Make sur les scénarios complexes",
        "Coût plus élevé que Make à volume d'opérations équivalent",
        "Logique multi-étapes limitée sur les plans basiques",
      ],
    },
  },
};

// ─── Context derivation ───────────────────────────────────────────────────────

type DerivedContext = {
  effectiveProjectType: string;
  isMicrosoftEco: boolean;
  hasSalesforceExisting: boolean;
  hasAirtableExisting: boolean;
  hasNotionExisting: boolean;
  needsPayment: boolean;
  needsSubscription: boolean;
  needsMarketplacePay: boolean;
  needsSignature: boolean;
  needsAutomation: boolean;
  needsComplexAutomation: boolean;
  hasComplexUsers: boolean;
  hasUsers: boolean;
  needsCustomInterface: boolean;
  needsReporting: boolean;
  needsDocStorage: boolean;
  isBudgetLimited: boolean;
  isUrgent: boolean;
  wantsAutonomy: boolean;
  wantsRobust: boolean;
  featureCount: number;
};

function deriveContext(answers: GuidedAnswers): DerivedContext {
  const cat = answers.projectCategory ?? 'unknown';
  const sub = answers.appSubtype ?? 'unknown';

  // Effective project type
  let effectiveProjectType = 'unknown';
  if (cat === 'app') {
    effectiveProjectType = sub === 'unknown' ? 'webapp' : sub;
  } else if (cat === 'automation') {
    effectiveProjectType = 'automation';
  } else if (cat === 'crm') {
    const isSalesforceCentral =
      answers.existingToolset === 'salesforce-hubspot' && answers.crmIsCentral === 'yes';
    effectiveProjectType = isSalesforceCentral ? 'crm-advanced' : 'crm-simple';
  } else if (cat === 'docs') {
    effectiveProjectType = 'knowledge-base';
  } else if (cat === 'ged') {
    effectiveProjectType = 'ged';
  } else if (cat === 'landing') {
    effectiveProjectType = 'landing-page';
  }

  // Ecosystem — priorité à existingTools (multi), fallback sur legacy existingToolset
  const tools = new Set(answers.existingTools ?? []);

  const isMicrosoftEco =
    tools.has('microsoft365') || tools.has('sharepoint') ||
    answers.existingToolset === 'microsoft' ||
    answers.hasMicrosoft365 === 'yes' ||
    answers.hasSharepointTeams === 'yes';

  const hasSalesforceExisting =
    ((tools.has('salesforce') || answers.existingToolset === 'salesforce-hubspot') &&
      answers.crmIsCentral === 'yes');

  const hasAirtableExisting =
    tools.has('airtable') ||
    (answers.existingToolset === 'airtable-notion' && answers.existingDataInTool === 'yes');

  const hasNotionExisting =
    tools.has('notion') || answers.existingToolset === 'airtable-notion';

  // Feature flags — priorité à selectedFeatures (multi-select), fallback sur champs legacy
  const feats = new Set(answers.selectedFeatures ?? []);
  const hasFeature = (...keys: string[]) => keys.some((k) => feats.has(k));

  const needsPayment =
    hasFeature('payment', 'subscription', 'marketplace-payment') ||
    ['simple', 'subscription', 'marketplace'].includes(answers.needsPayment ?? '');

  const needsSubscription =
    feats.has('subscription') || answers.needsPayment === 'subscription';

  const needsMarketplacePay =
    feats.has('marketplace-payment') || answers.needsPayment === 'marketplace';

  const needsSignature =
    hasFeature('signature', 'doc-signature') || answers.needsDocuments === 'signature';

  const needsAutomation =
    hasFeature('auto-email', 'auto-sync', 'auto-complex') ||
    ['emails', 'sync', 'complex'].includes(answers.needsAutomation ?? '');

  const needsComplexAutomation =
    hasFeature('auto-sync', 'auto-complex') ||
    ['sync', 'complex'].includes(answers.needsAutomation ?? '');

  const hasComplexUsers =
    answers.userAccounts === 'multi-role' ||
    answers.userAccounts === 'secure' ||
    feats.has('user-roles');

  const hasUsers = answers.userAccounts !== 'none' && answers.userAccounts !== null;

  const needsCustomInterface =
    feats.has('custom-interface') || answers.needsInterface === 'custom';

  const needsReporting =
    hasFeature('reporting') ||
    ['simple', 'dashboard', 'advanced'].includes(answers.needsReporting ?? '');

  const needsDocStorage =
    hasFeature('doc-storage', 'doc-workflow', 'signature') ||
    (answers.needsDocuments !== 'no' && answers.needsDocuments !== null);

  // Budget / urgency
  const isBudgetLimited = answers.budget === 'very-limited';
  const isUrgent =
    answers.mainPriority === 'test-quick' ||
    answers.timeline === 'days' ||
    answers.timeline === '1-2weeks';
  const wantsAutonomy =
    answers.autonomyLevel === 'content' ||
    answers.autonomyLevel === 'data' ||
    answers.autonomyLevel === 'simple';
  const wantsRobust =
    answers.mainPriority === 'robust' || answers.autonomyLevel === 'robustness';

  // Complexity estimate
  const flags = [
    needsPayment,
    needsAutomation,
    needsSignature,
    needsReporting,
    hasComplexUsers,
    needsCustomInterface,
    needsDocStorage,
  ];
  const featureCount = flags.filter(Boolean).length;

  return {
    effectiveProjectType,
    isMicrosoftEco,
    hasSalesforceExisting,
    hasAirtableExisting,
    hasNotionExisting,
    needsPayment,
    needsSubscription,
    needsMarketplacePay,
    needsSignature,
    needsAutomation,
    needsComplexAutomation,
    hasComplexUsers,
    hasUsers,
    needsCustomInterface,
    needsReporting,
    needsDocStorage,
    isBudgetLimited,
    isUrgent,
    wantsAutonomy,
    wantsRobust,
    featureCount,
  };
}

// ─── Main function ────────────────────────────────────────────────────────────

export function buildGuidedRecommendation(answers: GuidedAnswers): GuidedRecommendation {
  const ctx = deriveContext(answers);
  const pt = ctx.effectiveProjectType;

  let primaryStack: string[] = [];
  let secondaryStack: string[] = [];
  let rationale = '';

  const addSecondary = (tool: string) => {
    if (!primaryStack.includes(tool) && !secondaryStack.includes(tool)) {
      secondaryStack.push(tool);
    }
  };

  // ── Primary stack decision ────────────────────────────────────────────────
  switch (pt) {
    case 'marketplace':
      primaryStack = ['Bubble'];
      addSecondary('Make');
      if (ctx.needsPayment) addSecondary('Stripe');
      rationale =
        'Bubble est la référence no-code pour une marketplace : profils, annonces, logique de mise en relation et design sur-mesure. Make automatisera vos notifications et synchronisations.' +
        (ctx.needsPayment ? ' Stripe gérera les transactions de manière sécurisée.' : '');
      break;

    case 'saas':
      primaryStack = ['Bubble'];
      if (ctx.needsAutomation) addSecondary('Make');
      if (ctx.needsPayment) addSecondary('Stripe');
      rationale =
        'Bubble permet de construire un SaaS complet avec comptes utilisateurs, logique métier et design personnalisé, sans code.' +
        (ctx.needsPayment ? " Stripe s'intègre nativement pour la gestion des abonnements." : '');
      break;

    case 'client-portal':
      if (ctx.hasSalesforceExisting) {
        primaryStack = ['Salesforce'];
        if (ctx.needsSignature) addSecondary('DocuSign');
        if (ctx.isMicrosoftEco) addSecondary('Power Automate');
        else if (ctx.needsAutomation) addSecondary('Make');
        rationale =
          "Avec Salesforce déjà en place, Experience Cloud (Salesforce) est la solution naturelle pour un espace client connecté à votre CRM. Les données, les accès et les workflows sont déjà centralisés.";
      } else {
        primaryStack = ['Bubble'];
        if (ctx.hasAirtableExisting) addSecondary('Airtable');
        if (ctx.needsAutomation) addSecondary('Make');
        rationale =
          'Bubble permet de créer un espace client sécurisé avec profils, rôles et accès personnalisés.' +
          (ctx.hasAirtableExisting ? ' Votre Airtable existant peut rester le back-office de données.' : '');
      }
      break;

    case 'webapp':
      if (!ctx.hasUsers && !ctx.needsCustomInterface && !ctx.wantsRobust) {
        primaryStack = ctx.wantsAutonomy ? ['WordPress'] : ['Webflow'];
        if (ctx.needsAutomation) addSecondary('Make');
        rationale =
          ctx.wantsAutonomy
            ? "WordPress est idéal pour une application web que votre équipe devra gérer de manière autonome : éditeur intuitif, large écosystème."
            : "Webflow offre un design professionnel et une expérience de création visuelle avancée pour une application sans comptes utilisateurs.";
      } else {
        primaryStack = ['Bubble'];
        if (ctx.needsAutomation) addSecondary('Make');
        if (ctx.needsPayment) addSecondary('Stripe');
        rationale =
          'Bubble couvre interface, base de données et logique métier en un seul outil.' +
          (ctx.hasComplexUsers ? " Il gère nativement les rôles et permissions complexes." : '');
      }
      break;

    case 'internal-tool':
      if (ctx.needsCustomInterface || ctx.hasComplexUsers) {
        primaryStack = ['Bubble'];
        if (ctx.needsAutomation) addSecondary('Make');
        rationale =
          "Bubble est recommandé pour un outil interne nécessitant une interface sur-mesure ou plusieurs rôles utilisateurs.";
      } else {
        primaryStack = ['Airtable'];
        if (ctx.needsAutomation) addSecondary('Make');
        rationale =
          'Airtable est idéal pour un outil interne simple : base de données flexible, vues personnalisées, collaboration facile.' +
          (ctx.needsAutomation ? ' Make automatisera les tâches répétitives.' : '');
      }
      break;

    case 'mobile':
      primaryStack = ['Claude Code'];
      rationale =
        "Une application mobile performante nécessite une approche sur-mesure. Claude Code permet de développer en React Native ou Flutter avec des fonctionnalités natives, en optimisant chaque étape.";
      break;

    case 'automation':
      if (ctx.isMicrosoftEco) {
        primaryStack = ['Power Automate'];
        rationale =
          "Power Automate est intégré nativement dans votre environnement Microsoft 365 : SharePoint, Teams, Outlook et 500+ connecteurs inclus dans votre licence.";
      } else {
        primaryStack = ['Make'];
        rationale =
          "Make est la plateforme d'automatisation visuelle la plus puissante pour les environnements non-Microsoft : logique conditionnelle avancée, 2 000+ intégrations.";
      }
      break;

    case 'crm-simple':
      primaryStack = ['Airtable'];
      if (ctx.needsAutomation) addSecondary('Make');
      rationale =
        'Airtable est parfait pour un CRM léger : rapide à déployer, flexible et collaboratif.' +
        (ctx.needsAutomation ? ' Make automatisera vos relances et notifications clients.' : ' Aucune combinaison nécessaire pour commencer.');
      break;

    case 'crm-advanced':
      primaryStack = ['Salesforce'];
      if (ctx.needsSignature) addSecondary('DocuSign');
      if (ctx.isMicrosoftEco) addSecondary('Power Automate');
      else if (ctx.needsComplexAutomation) addSecondary('Make');
      rationale =
        "Salesforce est la référence pour un CRM enterprise avec pipeline avancé, reporting et personnalisation poussée. Il est conçu pour des équipes commerciales structurées avec un CRM au cœur de l'activité.";
      break;

    case 'knowledge-base':
      if (ctx.isMicrosoftEco && !ctx.hasNotionExisting) {
        primaryStack = ['SharePoint'];
        rationale =
          "Dans votre environnement Microsoft 365, SharePoint est déjà disponible pour créer une base de connaissances structurée avec gestion des accès par équipe.";
      } else {
        primaryStack = ['Notion'];
        rationale =
          "Notion est l'outil le plus adapté pour une base de connaissances collaborative : wiki, documentation, templates réutilisables et interface intuitive. Déployable en quelques jours.";
      }
      if (ctx.needsAutomation) addSecondary(ctx.isMicrosoftEco ? 'Power Automate' : 'Make');
      break;

    case 'ged':
      if (ctx.isMicrosoftEco) {
        primaryStack = ['SharePoint'];
        addSecondary('Power Automate');
        rationale =
          "SharePoint est la solution naturelle pour une GED dans un environnement Microsoft 365 : gestion des droits, versioning, bibliothèques et workflows d'approbation natifs.";
      } else {
        primaryStack = ['Notion'];
        if (ctx.needsAutomation) addSecondary('Make');
        rationale =
          "Notion est une alternative moderne pour centraliser vos documents hors écosystème Microsoft : structuration claire, collaboration facile et déploiement rapide.";
      }
      if (ctx.needsSignature) addSecondary('DocuSign');
      break;

    case 'landing-page':
      if (ctx.wantsAutonomy || answers.maintenanceOwner === 'non-tech-team') {
        primaryStack = ['WordPress'];
        rationale =
          "WordPress est idéal si votre équipe doit gérer les contenus de manière autonome : éditeur intuitif, très large écosystème de thèmes et plugins.";
      } else if (ctx.needsCustomInterface) {
        primaryStack = ['Webflow'];
        rationale =
          "Webflow offre un design professionnel avancé avec une expérience visuelle incomparable pour un site vitrine moderne et personnalisé.";
      } else {
        primaryStack = ['Framer'];
        rationale =
          "Framer est parfait pour une landing page moderne et rapide : design épuré, animations soignées, mise en ligne en quelques heures.";
      }
      if (ctx.needsAutomation) addSecondary('Make');
      break;

    // ── Cas non déterminé — inférence depuis les autres réponses ─────────────
    default: {
      const obj = answers.mainObjective ?? '';
      if (ctx.hasUsers && (ctx.needsPayment || ctx.needsMarketplacePay)) {
        primaryStack = ['Bubble'];
        if (ctx.needsAutomation) addSecondary('Make');
        if (ctx.needsPayment) addSecondary('Stripe');
        rationale = "D'après vos fonctionnalités (utilisateurs + paiement), Bubble est l'outil le plus adapté.";
      } else if (['manage-clients', 'track-requests'].includes(obj) || answers.dataType === 'clients') {
        primaryStack = ['Airtable'];
        if (ctx.needsAutomation) addSecondary('Make');
        rationale = "D'après vos données et objectifs, Airtable couvre vos besoins de suivi et gestion.";
      } else if (['save-time', 'connect-tools'].includes(obj) || answers.needsAutomation === 'complex') {
        primaryStack = [ctx.isMicrosoftEco ? 'Power Automate' : 'Make'];
        rationale = "Votre besoin principal étant l'automatisation, un outil de workflow est recommandé en priorité.";
      } else if (['centralize', 'create-knowledge-base'].includes(obj) || answers.dataType === 'documents') {
        primaryStack = [ctx.isMicrosoftEco ? 'SharePoint' : 'Notion'];
        if (ctx.needsAutomation) addSecondary(ctx.isMicrosoftEco ? 'Power Automate' : 'Make');
        rationale = "Pour centraliser et structurer vos informations.";
      } else if (obj === 'present-offer') {
        primaryStack = ['Webflow'];
        rationale = "Pour une présentation professionnelle en ligne.";
      } else {
        primaryStack = ['Airtable'];
        if (ctx.needsAutomation) addSecondary('Make');
        rationale = "Airtable est une base solide pour structurer et démarrer votre projet.";
      }
      break;
    }
  }

  // ── Feature additions post-switch ────────────────────────────────────────
  if (
    ctx.needsSignature &&
    !primaryStack.includes('DocuSign') &&
    !secondaryStack.includes('DocuSign') &&
    primaryStack[0] !== 'DocuSign'
  ) {
    const allTools = [...primaryStack, ...secondaryStack];
    if (allTools.some((t) => ['Salesforce', 'Make', 'Power Automate', 'Bubble'].includes(t))) {
      addSecondary('DocuSign');
    }
  }

  // ── Simplification selon budget/urgence ──────────────────────────────────
  if ((ctx.isBudgetLimited || ctx.isUrgent) && secondaryStack.length > 1) {
    secondaryStack = secondaryStack.slice(0, 1);
  }
  secondaryStack = secondaryStack.slice(0, 2);

  // ── Combination necessity ─────────────────────────────────────────────────
  const totalTools = primaryStack.length + secondaryStack.length;
  let combinationNecessity: CombinationNecessity;

  if (totalTools === 1) {
    combinationNecessity = 'single-tool';
  } else if (totalTools > 3) {
    combinationNecessity = 'too-complex';
  } else if (ctx.isUrgent || ctx.isBudgetLimited) {
    combinationNecessity = 'phase2';
  } else if (['marketplace', 'saas', 'crm-advanced'].includes(pt) || (ctx.needsPayment && ctx.needsAutomation)) {
    combinationNecessity = 'required';
  } else if (pt === 'ged' && ctx.isMicrosoftEco) {
    combinationNecessity = 'required';
  } else {
    combinationNecessity = 'useful';
  }

  // ── Build tech stack ──────────────────────────────────────────────────────
  const allTools = [...primaryStack, ...secondaryStack];
  const techStack: TechRole[] = allTools.map((name, i) => ({
    name,
    icon: TECH_ICONS[name] ?? '🔧',
    role: TECH_ROLES[name] ?? name,
    necessity: i < primaryStack.length ? 'primary' : i === primaryStack.length ? 'secondary' : 'optional',
    prosCons: buildToolProsCons(name, pt, ctx),
  }));

  return {
    reformulation: buildReformulation(answers, ctx),
    techStack,
    combinationNecessity,
    combinationLabel: COMBINATION_LABELS[combinationNecessity],
    combinationColor: COMBINATION_COLORS[combinationNecessity],
    rationale,
    v1Simplification: buildV1Simplification(ctx, secondaryStack, combinationNecessity),
    ...buildMVP(answers, ctx, primaryStack[0] ?? 'l\'outil principal'),
    estimatedDuration: buildDuration(answers, ctx),
    watchouts: buildWatchouts(answers, ctx, allTools),
    clarifyingQuestions: buildClarifyingQuestions(answers, ctx),
    alternativeRecommendation: buildAlternativeRecommendation(pt, ctx, answers, primaryStack, secondaryStack),
  };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const CAT_LABELS: Record<string, string> = {
  app: 'une application',
  automation: 'un système d\'automatisation',
  crm: 'un CRM / outil de gestion client',
  docs: 'une base de connaissances',
  ged: 'une gestion documentaire',
  landing: 'un site vitrine / landing page',
  unknown: 'un projet',
};

const SUBTYPE_LABELS: Record<string, string> = {
  saas: 'SaaS',
  marketplace: 'marketplace',
  'client-portal': 'espace client',
  'internal-tool': 'outil interne',
  mobile: 'mobile',
};

const OBJ_LABELS: Record<string, string> = {
  'save-time': 'gagner du temps sur des tâches répétitives',
  'sell-book': 'vendre ou réserver en ligne',
  'manage-clients': 'mieux suivre clients et prospects',
  centralize: 'centraliser des informations',
  'secure-space': 'créer un espace sécurisé',
  'test-idea': 'tester rapidement une idée',
};

function buildReformulation(answers: GuidedAnswers, ctx: DerivedContext): string {
  const cat = answers.projectCategory ?? 'unknown';
  const sub = answers.appSubtype;
  const baseLabel = CAT_LABELS[cat] ?? 'votre projet';
  const subLabel = sub && sub !== 'unknown' ? SUBTYPE_LABELS[sub] : null;
  const fullType = subLabel ? `${baseLabel} de type ${subLabel}` : baseLabel;

  const parts: string[] = [`Votre projet ressemble à ${fullType}`];

  const features: string[] = [];
  if (ctx.hasUsers) features.push('comptes utilisateurs');
  if (ctx.needsPayment) features.push('paiement en ligne');
  if (ctx.needsAutomation) features.push('automatisations');
  if (ctx.needsSignature) features.push('signature électronique');
  if (ctx.needsReporting) features.push('reporting');
  if (features.length > 0) parts.push(`avec ${features.slice(0, 3).join(', ')}`);

  const obj = answers.mainObjective;
  if (obj && OBJ_LABELS[obj]) parts.push(`pour ${OBJ_LABELS[obj]}`);

  return parts.join(' ') + '.';
}

function buildV1Simplification(
  ctx: DerivedContext,
  secondaryStack: string[],
  necessity: CombinationNecessity
): string | null {
  if (necessity === 'single-tool' || secondaryStack.length === 0) return null;

  if (secondaryStack.includes('Stripe') && (ctx.isUrgent || ctx.isBudgetLimited)) {
    return 'Le paiement peut être géré manuellement (virement, facturation) en V1, puis intégré via Stripe en phase 2 une fois la valeur prouvée.';
  }
  if (secondaryStack.includes('Make') && ctx.isUrgent) {
    return 'Les automatisations peuvent être gérées manuellement dans un premier temps, Make sera ajouté en phase 2 quand les processus seront validés.';
  }
  if (secondaryStack.includes('DocuSign') && ctx.isBudgetLimited) {
    return 'La signature électronique peut être remplacée par un accord par email en V1 si le volume de documents reste faible.';
  }
  if (necessity === 'phase2') {
    return "Concentrez-vous sur l'outil principal pour valider votre concept. Les outils complémentaires seront intégrés en phase 2 selon les retours.";
  }
  return null;
}

function buildMVP(
  answers: GuidedAnswers,
  ctx: DerivedContext,
  primaryTool: string
): { mvpKeep: string[]; mvpDefer: string[] } {
  const pt = ctx.effectiveProjectType;

  const maps: Record<string, { keep: string[]; defer: string[] }> = {
    marketplace: {
      keep: [
        `Profils offreurs et demandeurs dans ${primaryTool}`,
        'Listing des offres avec filtres basiques',
        'Mise en relation simple (contact ou demande)',
        ctx.hasUsers ? 'Authentification et inscription' : 'Accès direct sans compte',
      ],
      defer: [
        ctx.needsPayment ? 'Paiement en ligne — intégrer Stripe en V2' : '',
        'Messagerie interne — V2',
        'Dashboard de performance — V2',
      ].filter(Boolean),
    },
    saas: {
      keep: [
        'Authentification et gestion des comptes',
        `Fonctionnalité principale dans ${primaryTool}`,
        ctx.needsPayment ? 'Intégration paiement / abonnement' : 'Version gratuite pour tester la demande',
        'Interface minimaliste validée avec 5 utilisateurs cibles',
      ],
      defer: [
        'Notifications avancées — V2',
        ctx.needsReporting ? 'Reporting et analytics — V2' : '',
        'Intégrations tierces — V2',
      ].filter(Boolean),
    },
    'client-portal': {
      keep: [
        `Authentification et accès sécurisé dans ${primaryTool}`,
        'Consultation des informations client',
        ctx.needsDocStorage ? 'Documents téléchargeables' : 'Informations essentielles',
        'Formulaire de contact ou de demande',
      ],
      defer: [
        'Messagerie interne — V2',
        ctx.needsReporting ? 'Reporting client avancé — V2' : '',
      ].filter(Boolean),
    },
    webapp: {
      keep: [
        ctx.hasUsers ? `Authentification dans ${primaryTool}` : 'Écran principal sans connexion',
        'Parcours utilisateur principal (1 action clé)',
        'Interface validée avec 3 utilisateurs réels',
      ],
      defer: [
        ctx.needsPayment ? 'Paiement — valider le besoin avant d\'intégrer' : '',
        ctx.needsReporting ? 'Reporting — V2' : '',
      ].filter(Boolean),
    },
    'internal-tool': {
      keep: [
        `Formulaire ou écran principal dans ${primaryTool}`,
        'Vue principale des enregistrements',
        ctx.hasComplexUsers ? 'Droits d\'accès par rôle' : 'Accès équipe simple',
        ctx.needsReporting ? 'Vue de suivi minimale' : 'Export des données',
      ],
      defer: [
        'Reporting avancé — V2',
        'Calendrier et vues secondaires — V2',
      ],
    },
    'crm-simple': {
      keep: [
        `Base contacts et entreprises dans ${primaryTool}`,
        'Pipeline de suivi en vue Kanban',
        'Formulaire d\'entrée de leads',
        ctx.needsAutomation ? 'Relances automatiques basiques' : 'Suivi manuel dans un premier temps',
      ],
      defer: [
        ctx.needsReporting ? 'Dashboard de performance — V2' : '',
        'Génération de documents — V2',
      ].filter(Boolean),
    },
    'crm-advanced': {
      keep: [
        'Objets standard Salesforce (Comptes, Contacts, Opportunités)',
        'Pipeline commercial et étapes de vente',
        'Tableaux de bord standards',
        '2-3 commerciaux pilotes pour valider la config',
      ],
      defer: [
        ctx.needsSignature ? 'DocuSign — après validation du processus commercial' : '',
        'Customisations avancées — après formation',
        'Portail client — V2',
      ].filter(Boolean),
    },
    automation: {
      keep: [
        'Cartographier les 3 processus les plus répétitifs',
        'Automatiser le processus le plus chronophage en premier',
        'Tester avec des données réelles avant production',
        'Configurer les alertes erreur dès le départ',
      ],
      defer: [
        'Automatisations secondaires — progressivement',
        'Scénarios complexes multi-étapes — V2',
      ],
    },
    'knowledge-base': {
      keep: [
        `Structure (sections, catégories) dans ${primaryTool}`,
        '5 à 10 pages de référence pour valider l\'organisation',
        'Droits de lecture et d\'édition par équipe',
        'Templates réutilisables pour les types récurrents',
      ],
      defer: [
        'Migration complète de l\'existant — progressivement',
        'Automatisations de mise à jour — V2',
      ],
    },
    ged: {
      keep: [
        `Architecture documentaire définie dans ${primaryTool}`,
        'Migration des 10 documents les plus consultés',
        'Droits d\'accès par équipe ou département',
        'Règles de nommage documentées',
      ],
      defer: [
        ctx.needsSignature ? 'Signature électronique — V2' : '',
        'Workflows d\'approbation avancés — V2',
      ].filter(Boolean),
    },
    'landing-page': {
      keep: [
        `Page principale avec proposition de valeur dans ${primaryTool}`,
        'Formulaire de contact ou de capture de leads',
        'Version mobile optimisée',
        'Intégration Google Analytics',
      ],
      defer: [
        ctx.needsAutomation ? 'Automatisation des emails — Make en V2' : '',
        'Blog et pages secondaires — V2',
      ].filter(Boolean),
    },
    mobile: {
      keep: [
        'Définir la plateforme cible : PWA, React Native ou Flutter',
        ctx.hasUsers ? 'Authentification et profils utilisateurs' : 'Écran principal de l\'app',
        'Parcours utilisateur principal (1 action clé)',
        'Tests sur appareils iOS et Android réels',
      ],
      defer: [
        ctx.needsPayment ? 'Paiement in-app — V2 (contraintes stores à anticiper)' : '',
        'Notifications push — V2',
      ].filter(Boolean),
    },
  };

  const mvp = maps[pt] ?? {
    keep: [
      `Fonctionnalité principale dans ${primaryTool}`,
      'Interface validée avec 3 utilisateurs cibles',
      'Données réelles importées',
    ],
    defer: ['Fonctionnalités secondaires', 'Intégrations avancées — V2'],
  };

  return { mvpKeep: mvp.keep.filter(Boolean), mvpDefer: mvp.defer.filter(Boolean) };
}

function buildDuration(answers: GuidedAnswers, ctx: DerivedContext): string {
  const pt = ctx.effectiveProjectType;
  const complex = ctx.featureCount >= 4 || ctx.needsCustomInterface;
  const isUrgent = ctx.isUrgent;

  const map: Record<string, string> = {
    marketplace: complex ? '3 à 6 mois' : '6 à 12 semaines',
    saas: complex ? '2 à 4 mois' : '4 à 8 semaines',
    webapp: complex ? '2 à 3 mois' : '3 à 6 semaines',
    'client-portal': '4 à 10 semaines',
    'crm-simple': '2 à 5 semaines',
    'crm-advanced': complex ? '3 à 6 mois' : '2 à 4 mois',
    'internal-tool': complex ? '6 à 12 semaines' : '3 à 8 semaines',
    automation: '1 à 3 semaines',
    ged: complex ? '6 à 10 semaines' : '2 à 5 semaines',
    'knowledge-base': '1 à 3 semaines',
    'landing-page': '1 à 3 semaines',
    mobile: complex ? '3 à 6 mois' : '6 à 10 semaines',
    unknown: '2 à 6 semaines',
  };

  const base = map[pt] ?? '2 à 6 semaines';

  if (isUrgent) return `${base} — délai serré, à prioriser immédiatement`;
  if (answers.timeline === 'no-urgency') return `${base} (pas d'urgence, construction progressive possible)`;
  return base;
}

function buildWatchouts(answers: GuidedAnswers, ctx: DerivedContext, stack: string[]): string[] {
  const w: string[] = [];

  if (answers.dataSensitive === 'yes') {
    w.push('Données sensibles : prévoir la politique RGPD, les droits d\'accès et la sécurisation dès le départ.');
  }
  if (answers.dataVolume === 'high') {
    w.push('Volume important : anticiper l\'architecture de données dès le départ — migrer après est coûteux en temps.');
  }
  if (stack.includes('Bubble')) {
    w.push('Bubble : définir la structure de base de données avant le design. Configurer les privacy rules dès le départ.');
  }
  if (stack.includes('Salesforce')) {
    w.push('Salesforce : surveiller les licences et les coûts — ils peuvent dépasser les prévisions initiales sans gouvernance claire.');
  }
  if (stack.includes('Make') || stack.includes('Power Automate')) {
    w.push('Automatisations : documenter chaque scénario avec un nom clair et activer les alertes en cas d\'erreur.');
  }
  if (ctx.needsPayment) {
    w.push('Paiement : vérifier les obligations légales (CGV, TVA, mentions obligatoires) avant d\'encaisser.');
  }
  if (stack.includes('SharePoint')) {
    w.push('SharePoint : définir l\'architecture documentaire avant de créer les bibliothèques — restructurer après est long.');
  }
  if (ctx.hasComplexUsers) {
    w.push('Rôles et permissions : configurer les droits dès le départ pour éviter les failles ou la surcharge de configuration.');
  }
  if (answers.maintenanceOwner === 'non-tech-team') {
    w.push('Maintenance non technique : prévoir une documentation utilisateur et une session de formation à la livraison.');
  }

  return w.slice(0, 5);
}

function buildClarifyingQuestions(answers: GuidedAnswers, ctx: DerivedContext): string[] {
  const q: string[] = [];

  if (!answers.projectCategory || answers.projectCategory === 'unknown') {
    q.push('Quelle est la principale action que vos utilisateurs devront faire dans cet outil ?');
  }
  if (!answers.userAccounts || answers.userAccounts === 'unknown') {
    q.push("Y aura-t-il des comptes utilisateurs distincts ou tout le monde accède avec le même accès ?");
  }
  if (!answers.needsPayment && ctx.effectiveProjectType === 'marketplace') {
    q.push("Avez-vous déjà défini le modèle économique (commission, abonnement, freemium) ?");
  }
  if (!answers.existingToolset) {
    q.push("Avez-vous des outils déjà en place que ce projet devra alimenter ou remplacer ?");
  }
  if (ctx.effectiveProjectType === 'crm-simple' && !answers.maintenanceOwner) {
    q.push("Qui sera responsable de maintenir et faire évoluer le CRM après le lancement ?");
  }
  if (!answers.budget && !answers.mainPriority) {
    q.push("Quel est votre budget mensuel approximatif pour les outils SaaS ?");
  }

  return q.slice(0, 4);
}

function buildToolProsCons(toolName: string, pt: string, _ctx: DerivedContext): ProsCons {
  const toolData = TOOL_PROCONS[toolName];
  if (!toolData) return { advantages: [], drawbacks: [] };
  return toolData[pt] ?? toolData['_default'] ?? { advantages: [], drawbacks: [] };
}

function buildAlternativeRecommendation(
  pt: string,
  ctx: DerivedContext,
  answers: GuidedAnswers,
  _primaryStack: string[],
  _secondaryStack: string[]
): AlternativeRecommendation | null {
  switch (pt) {
    case 'marketplace':
      return {
        shouldDisplay: true,
        stackName: 'Annuaire / mise en relation légère — Webflow + Airtable',
        tools: ['Webflow', 'Airtable'],
        whenPreferable:
          "Si votre marketplace ne nécessite pas encore de paiement et ressemble davantage à un annuaire ou une mise en relation simple.",
        advantages: [
          "Déploiement plus rapide (2-3 semaines)",
          "Coût mensuel plus faible",
          "Moins de complexité technique initiale",
        ],
        limits: [
          "Pas de gestion de paiement entre utilisateurs native",
          "Fonctionnalités de matching et logique de mise en relation limitées",
          "Difficile à faire évoluer vers une marketplace transactionnelle",
        ],
        relevanceNote:
          "À considérer uniquement pour tester la mise en relation avant d'investir dans une marketplace complète.",
      };

    case 'saas':
      if (!ctx.hasComplexUsers && !ctx.needsPayment) {
        return {
          shouldDisplay: true,
          stackName: 'SaaS simplifié — Softr + Airtable',
          tools: ['Softr', 'Airtable'],
          whenPreferable:
            "Si votre SaaS est essentiellement un portail de données (consultation, modification) sans logique métier complexe.",
          advantages: [
            "Déploiement plus rapide (1-2 semaines)",
            "Coût initial plus faible",
            "Interface simple à maintenir en autonomie",
          ],
          limits: [
            "Personnalisation de l'interface très limitée",
            "Logique métier avancée impossible",
            "Pas adapté aux SaaS avec flux complexes ou paiement",
          ],
          relevanceNote:
            "Pertinent uniquement si votre SaaS est centré sur la consultation et modification de données, sans flux métier complexes.",
        };
      }
      return null;

    case 'client-portal':
      if (!ctx.hasSalesforceExisting) {
        return {
          shouldDisplay: true,
          stackName: 'Portail client simplifié — Softr + Airtable',
          tools: ['Softr', 'Airtable'],
          whenPreferable:
            "Si votre portail client est essentiellement un accès à des données (dossiers, statuts, documents) sans interface complexe.",
          advantages: [
            "Déploiement en 1-2 semaines",
            "Pas de courbe d'apprentissage technique",
            "Coût mensuel faible",
          ],
          limits: [
            "Interface moins personnalisable que Bubble",
            "Logique métier complexe impossible",
            "Branding limité sur les plans basiques Softr",
          ],
          relevanceNote:
            "Idéal pour une V1 rapide avant d'évoluer vers Bubble si les besoins s'intensifient.",
        };
      }
      return null;

    case 'webapp':
      if (!ctx.hasUsers && !ctx.needsCustomInterface && !ctx.wantsRobust) {
        if (ctx.wantsAutonomy) {
          return {
            shouldDisplay: true,
            stackName: 'Webflow — design professionnel',
            tools: ['Webflow'],
            whenPreferable:
              "Si le design est une priorité et que vous acceptez une légère courbe d'apprentissage pour l'édition de contenu.",
            advantages: [
              "Design plus professionnel et personnalisable",
              "Performances et SEO excellents",
              "CMS intégré pour les contenus éditoriaux",
            ],
            limits: [
              "Éditeur moins intuitif que WordPress pour les équipes non-techniques",
              "Coût mensuel (14-36 $/mois+)",
              "Moins de plugins que WordPress pour étendre les fonctionnalités",
            ],
            relevanceNote:
              "Recommandé si le design est votre priorité principale et que votre équipe est à l'aise avec des outils modernes.",
          };
        } else {
          return {
            shouldDisplay: true,
            stackName: 'Framer — landing page ultra-rapide',
            tools: ['Framer'],
            whenPreferable:
              "Si vous avez besoin d'une landing page simple et soignée en quelques heures, sans contenu éditorial complexe.",
            advantages: [
              "Déploiement ultra-rapide (quelques heures)",
              "Design et animations modernes très soignés",
              "Coût plus faible",
            ],
            limits: [
              "CMS très limité comparé à Webflow",
              "Peu adapté aux sites avec plusieurs pages ou beaucoup de contenu",
              "Moins d'intégrations natives",
            ],
            relevanceNote:
              "À choisir si votre objectif est une landing page simple et rapide à lancer plutôt qu'un site complet.",
          };
        }
      } else if (ctx.wantsRobust) {
        return {
          shouldDisplay: true,
          stackName: 'Développement sur-mesure — Claude Code',
          tools: ['Claude Code'],
          whenPreferable:
            "Si vos besoins techniques dépassent les limites du no-code (performance, intégrations très spécifiques, infrastructure dédiée).",
          advantages: [
            "Sur-mesure total sans contrainte de plateforme",
            "Performance et scalabilité maîtrisées",
            "Propriété complète du code",
          ],
          limits: [
            "Coût de développement plus élevé",
            "Délai de livraison plus long (3-6 mois minimum)",
            "Nécessite des compétences techniques pour la maintenance",
          ],
          relevanceNote:
            "À envisager si votre projet a des besoins de scalabilité ou d'intégration que Bubble ne peut pas couvrir.",
        };
      }
      return null;

    case 'internal-tool':
      if (ctx.needsCustomInterface || ctx.hasComplexUsers) {
        return {
          shouldDisplay: true,
          stackName: 'Outil interne simplifié — Airtable + Softr',
          tools: ['Airtable', 'Softr'],
          whenPreferable:
            "Si vos utilisateurs ont des rôles simples et que l'interface n'a pas besoin d'être très personnalisée.",
          advantages: [
            "Déploiement plus rapide (1-2 semaines)",
            "Maintenance plus simple en autonomie",
            "Coût mensuel plus faible",
          ],
          limits: [
            "Interface moins sur-mesure que Bubble",
            "Logique conditionnelle avancée non disponible",
            "Moins adapté aux processus métier très spécifiques",
          ],
          relevanceNote:
            "À considérer pour une V1 rapide avant d'investir dans une solution plus personnalisée.",
        };
      } else if (ctx.needsDocStorage || ctx.hasNotionExisting) {
        return {
          shouldDisplay: true,
          stackName: 'Base de connaissances — Notion',
          tools: ['Notion'],
          whenPreferable:
            "Si votre outil interne est centré sur la documentation, les procédures ou les bases de connaissances plutôt que sur des données tabulaires.",
          advantages: [
            "Interface éditoriale plus agréable pour du contenu textuel",
            "Documentation et wiki intégrés naturellement",
            "Adoption rapide par les équipes",
          ],
          limits: [
            "Moins adapté à la gestion de données tabulaires en volume",
            "Moins de vues personnalisées qu'Airtable",
            "Automatisations natives plus limitées",
          ],
          relevanceNote:
            "Recommandé si votre usage est à plus de 60 % de documentation et à 40 % de suivi de données structurées.",
        };
      }
      return null;

    case 'automation':
      if (ctx.isMicrosoftEco) {
        return {
          shouldDisplay: true,
          stackName: 'Make — automatisation multi-éditeurs',
          tools: ['Make'],
          whenPreferable:
            "Si une partie de vos outils à connecter est hors écosystème Microsoft et que vous préférez une interface visuelle plus souple.",
          advantages: [
            "Interface visuelle plus intuitive pour les scénarios complexes",
            "2 000+ connecteurs tous éditeurs",
            "Logique conditionnelle avancée (boucles, filtres, routeurs)",
          ],
          limits: [
            "Pas inclus dans votre licence Microsoft 365 (coût additionnel)",
            "Connecteurs Microsoft moins profonds qu'avec Power Automate",
            "Coût mensuel selon le volume d'opérations",
          ],
          relevanceNote:
            "À considérer si plus de 50 % de vos intégrations concernent des outils hors Microsoft.",
        };
      }
      return {
        shouldDisplay: true,
        stackName: 'Zapier — automatisation simplifiée',
        tools: ['Zapier'],
        whenPreferable:
          "Si vos automatisations sont simples (déclencheur -> action directe) et que vous n'avez pas besoin de logique conditionnelle avancée.",
        advantages: [
          "Prise en main très rapide (moins d'1 heure)",
          "Interface intuitive pour les profils non-techniques",
          "Bibliothèque d'intégrations pré-configurées très large",
        ],
        limits: [
          "Moins puissant que Make sur les scénarios complexes",
          "Coût plus élevé que Make à volume d'opérations équivalent",
          "Logique multi-étapes limitée sur les plans basiques",
        ],
        relevanceNote:
          "Idéal pour des automatisations simples (ex : formulaire soumis -> entrée Airtable + email).",
      };

    case 'crm-simple':
      return {
        shouldDisplay: true,
        stackName: 'HubSpot CRM — fonctionnalités commerciales natives',
        tools: ['HubSpot'],
        whenPreferable:
          "Si vous avez besoin de fonctionnalités CRM plus avancées : emailing commercial, suivi d'ouvertures, séquences de relance.",
        advantages: [
          "CRM dédié avec pipeline et activités commerciales natifs",
          "Tier gratuit très généreux pour démarrer",
          "Marketing automation inclus sur les plans payants",
        ],
        limits: [
          "Plans payants très onéreux (800 €/mois+ pour fonctionnalités avancées)",
          "Moins flexible qu'Airtable pour les usages non-CRM",
          "Courbe d'apprentissage plus longue qu'Airtable",
        ],
        relevanceNote:
          "Recommandé si votre équipe a besoin d'un vrai outil de suivi commercial avec reporting natif.",
      };

    case 'crm-advanced':
      return {
        shouldDisplay: true,
        stackName: 'HubSpot Sales Hub — alternative plus accessible',
        tools: ['HubSpot'],
        whenPreferable:
          "Si votre équipe est de taille moyenne et que vous n'avez pas encore de processus CRM très complexes à modéliser.",
        advantages: [
          "Interface plus intuitive que Salesforce",
          "Déploiement plus rapide (2-4 semaines vs 6-12 semaines)",
          "Coût mensuel plus prévisible et plus faible",
        ],
        limits: [
          "Reporting et personnalisation moins poussés que Salesforce",
          "Moins adapté aux processus CRM très spécifiques",
          "AppExchange Salesforce sans équivalent pour les intégrations avancées",
        ],
        relevanceNote:
          "À considérer si Salesforce semble surdimensionné et que votre priorité est la rapidité de déploiement.",
      };

    case 'knowledge-base':
      if (ctx.isMicrosoftEco && !ctx.hasNotionExisting) {
        return {
          shouldDisplay: true,
          stackName: 'Notion — base de connaissances moderne',
          tools: ['Notion'],
          whenPreferable:
            "Si votre équipe trouve SharePoint peu intuitif et préfère un outil plus éditorial et collaboratif.",
          advantages: [
            "Interface plus intuitive et adoption rapide",
            "Structure de wiki plus moderne et flexible",
            "Meilleure expérience éditoriale pour les contenus riches",
          ],
          limits: [
            "Non inclus dans votre licence Microsoft 365 (coût additionnel ~10 €/user/mois)",
            "Moins intégré à Teams et Outlook",
            "Gestion des droits moins granulaire pour de très grandes équipes",
          ],
          relevanceNote:
            "Recommandé si l'adoption utilisateur est une priorité et que SharePoint est perçu comme complexe.",
        };
      }
      if (ctx.isMicrosoftEco) {
        return {
          shouldDisplay: true,
          stackName: 'SharePoint — inclus dans Microsoft 365',
          tools: ['SharePoint'],
          whenPreferable:
            "Si vous souhaitez éviter un coût Notion additionnel et que votre équipe est dans l'écosystème Microsoft.",
          advantages: [
            "Inclus dans votre licence Microsoft 365",
            "Intégration Teams et Outlook native",
            "Gestion des accès par groupe Active Directory",
          ],
          limits: [
            "Interface moins intuitive que Notion",
            "Configuration initiale plus technique",
            "Adoption utilisateur souvent plus difficile",
          ],
          relevanceNote:
            "Pertinent uniquement si vous avez une licence Microsoft 365 active et souhaitez réduire les coûts SaaS.",
        };
      }
      return null;

    case 'landing-page':
      if (answers.maintenanceOwner === 'non-tech-team' || ctx.wantsAutonomy) {
        return {
          shouldDisplay: true,
          stackName: 'Webflow — design professionnel avancé',
          tools: ['Webflow'],
          whenPreferable:
            "Si le design est une priorité et que vous acceptez une légère courbe d'apprentissage pour l'édition de contenu.",
          advantages: [
            "Design plus professionnel et personnalisable",
            "Performances et SEO excellents",
            "CMS intégré pour les contenus éditoriaux",
          ],
          limits: [
            "Éditeur moins intuitif que WordPress pour les équipes non-techniques",
            "Coût mensuel (14-36 $/mois+)",
            "Moins de plugins pour étendre les fonctionnalités",
          ],
          relevanceNote:
            "Recommandé si le design est votre priorité et que votre équipe est à l'aise avec des outils modernes.",
        };
      } else if (ctx.needsCustomInterface) {
        return {
          shouldDisplay: true,
          stackName: 'Framer — landing page ultra-rapide',
          tools: ['Framer'],
          whenPreferable:
            "Si vous avez besoin d'une landing page simple et soignée lancée en quelques heures, sans contenu éditorial complexe.",
          advantages: [
            "Déploiement ultra-rapide",
            "Design et animations modernes très soignés",
            "Coût plus faible que Webflow",
          ],
          limits: [
            "CMS très limité comparé à Webflow",
            "Peu adapté aux sites avec plusieurs pages ou beaucoup de contenu",
            "Moins d'intégrations tierces",
          ],
          relevanceNote:
            "À choisir si votre objectif est une landing page simple et rapide plutôt qu'un site complet.",
        };
      } else {
        return {
          shouldDisplay: true,
          stackName: 'Webflow — site complet et évolutif',
          tools: ['Webflow'],
          whenPreferable:
            "Si votre site doit avoir plusieurs pages, un CMS éditorial, ou évoluer vers un site plus complet.",
          advantages: [
            "CMS robuste pour les contenus éditoriaux",
            "Plus adapté aux sites multi-pages",
            "SEO avancé et performances excellentes",
          ],
          limits: [
            "Courbe d'apprentissage plus longue que Framer",
            "Coût mensuel plus élevé",
            "Moins adapté pour une simple landing page",
          ],
          relevanceNote:
            "À choisir si vous anticipez un site avec plus de 5 pages ou un besoin CMS.",
        };
      }

    default:
      return null;
  }
}
