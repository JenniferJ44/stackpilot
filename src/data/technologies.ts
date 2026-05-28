export type TechCategory =
  | 'no-code'
  | 'automation'
  | 'crm'
  | 'documentation'
  | 'signature'
  | 'ai-dev'
  | 'payments';

export type JenniferLevel = 'expert' | 'avancé' | 'recommandé';

export type Technology = {
  id: string;
  name: string;
  category: TechCategory;
  categoryLabel: string;
  description: string;
  icon: string;
  colorClass: string;
  bgClass: string;
  jenniferProjects?: string[];
  scores: {
    projectType: {
      webapp: number;
      crm: number;
      automation: number;
      documentation: number;
      interne: number;
      marketplace: number;
      mobile: number;
    };
    companySize: {
      solo: number;
      small: number;
      medium: number;
      large: number;
    };
    budget: {
      low: number;
      medium: number;
      high: number;
    };
    urgency: {
      urgent: number;
      normal: number;
      long: number;
    };
    features: {
      users: number;
      automation: number;
      crm: number;
      documents: number;
      payment: number;
      dashboard: number;
    };
  };
  pros: string[];
  cons: string[];
  idealFor: string[];
  pricing: string;
  url: string;
  jenniferLevel: JenniferLevel;
  showInTechPage?: boolean;
  logoUrl?: string;
  // Enrichissement base de connaissance
  keywords?: string[];
  avoidIf?: string[];
  watchouts?: string[];
  firstStep?: string;
  stackWith?: string[];
  alternatives?: string[];
};

export const technologies: Technology[] = [
  {
    id: 'bubble',
    name: 'Bubble',
    category: 'no-code',
    categoryLabel: 'No-Code App Builder',
    description:
      "La plateforme no-code de référence pour créer des applications web complètes avec base de données intégrée, logique métier visuelle et design personnalisé.",
    icon: '🔵',
    colorClass: 'text-blue-600',
    bgClass: 'bg-blue-50',
    jenniferProjects: [
      "Application d'orientation Orientix",
      "Prototypes SaaS et marketplaces no-code",
      "Interfaces avec comptes utilisateurs et dashboards",
      "Outils métier et back-office sur-mesure",
    ],
    scores: {
      projectType: { webapp: 10, crm: 6, automation: 3, documentation: 2, interne: 9, marketplace: 10, mobile: 6 },
      companySize: { solo: 9, small: 9, medium: 7, large: 4 },
      budget: { low: 5, medium: 9, high: 7 },
      urgency: { urgent: 5, normal: 9, long: 9 },
      features: { users: 10, automation: 5, crm: 5, documents: 3, payment: 8, dashboard: 8 },
    },
    pros: [
      "Très flexible pour des apps complexes",
      "Responsive design intégré",
      "Grande marketplace de plugins",
      "Idéal pour les MVPs SaaS",
    ],
    cons: [
      "Courbe d'apprentissage non négligeable",
      "Performances limitées à très grande échelle",
      "Coût qui augmente avec le trafic",
    ],
    idealFor: ["MVP SaaS", "Applications métier", "Plateformes clients", "Marketplaces no-code"],
    pricing: "Gratuit (limité) puis à partir de ~30 $/mois",
    url: "https://bubble.io",
    jenniferLevel: "expert",
    showInTechPage: true,
    logoUrl: '/logo_outils/bubble.png',
    keywords: [
      "marketplace", "réservation", "reservation", "saas", "startup", "application", "app web",
      "espace client", "portail client", "portail", "comptes utilisateurs", "utilisateurs",
      "dashboard", "tableau de bord", "rôles", "back-office", "backoffice", "paiement",
      "messagerie", "favoris", "mvp", "plateforme", "inscription", "profils utilisateurs",
      "outil métier", "commission", "annonce", "offre en ligne", "réserver",
    ],
    avoidIf: [
      "Le besoin est uniquement une documentation ou un wiki",
      "Un simple site vitrine sans logique applicative suffit",
      "Le client veut automatiser un seul formulaire sans app",
      "Le projet nécessite une app mobile native très avancée",
      "Le volume prévu est très élevé dès le départ sans budget architecture",
    ],
    watchouts: [
      "Structurer la base de données avant de toucher au design",
      "Configurer les privacy rules dès le départ — une faille de données est facile à créer",
      "Optimiser les recherches pour éviter les lenteurs (éviter les recherches 'do a search' en cascade)",
      "Tester le responsive sur mobile réel, pas seulement en aperçu",
      "Surveiller les coûts liés au trafic — ils augmentent avec les workload units",
    ],
    firstStep: "Définir les 3 parcours utilisateurs principaux (ex : inscription, action clé, résultat), puis schématiser la base de données sur papier avant de toucher à Bubble.",
    stackWith: ["Make", "Airtable", "Stripe", "DocuSign"],
    alternatives: [
      "Softr si portail client simple sur Airtable existant",
      "Airtable si besoin surtout back-office sans interface public",
      "Claude Code si fonctionnalités très spécifiques impossibles en no-code",
      "Webflow si le projet est un site vitrine sans logique applicative",
    ],
  },
  {
    id: 'airtable',
    name: 'Airtable',
    category: 'no-code',
    categoryLabel: 'Base de données No-Code',
    description:
      "Base de données collaborative et flexible qui combine la simplicité d'un tableur avec la puissance d'une base de données relationnelle.",
    icon: '🟡',
    colorClass: 'text-yellow-600',
    bgClass: 'bg-yellow-50',
    jenniferProjects: [
      "Structuration de bases de données métier",
      "Catalogue de formations et suivi de contenu",
      "Bases de suivi client et back-office",
      "Logique de correspondance et gestion de données",
    ],
    scores: {
      projectType: { webapp: 4, crm: 8, automation: 6, documentation: 7, interne: 9, marketplace: 3, mobile: 2 },
      companySize: { solo: 10, small: 10, medium: 8, large: 6 },
      budget: { low: 8, medium: 9, high: 6 },
      urgency: { urgent: 9, normal: 9, long: 8 },
      features: { users: 7, automation: 6, crm: 8, documents: 7, payment: 2, dashboard: 8 },
    },
    pros: [
      "Très rapide à prendre en main",
      "Vues multiples (kanban, calendrier, galerie)",
      "Interfaces personnalisables",
      "Excellent rapport qualité-prix",
    ],
    cons: [
      "Limites sur le nombre de lignes en plan bas",
      "Pas fait pour des apps grand public",
      "Automatisations limitées en natif",
    ],
    idealFor: ["CRM personnalisé", "Gestion de projets", "Base de données interne", "Suivi clients"],
    pricing: "Gratuit (1 000 lignes) puis à partir de ~10 $/utilisateur/mois",
    url: "https://airtable.com",
    jenniferLevel: "expert",
    showInTechPage: true,
    logoUrl: '/logo_outils/airtable.png',
    keywords: [
      "crm", "prospect", "prospects", "client", "clients", "suivi", "pipeline",
      "catalogue", "back-office", "base de données", "données", "kanban",
      "gestion", "inventaire", "mission", "missions", "formation", "formations",
      "contenu", "fournisseur", "candidature", "candidatures", "tracker",
      "suivi de projet", "suivi de leads", "leads", "base interne",
    ],
    avoidIf: [
      "Interface client très personnalisée avec logique complexe",
      "Millions d'utilisateurs attendus",
      "Application très transactionnelle (paiements, réservations temps réel)",
      "Expérience produit grand public complète",
    ],
    watchouts: [
      "Définir les relations entre tables avant de remplir les données",
      "Créer un champ identifiant unique pour éviter les doublons",
      "Configurer les droits d'accès par vue — pas par table entière",
      "Vérifier les limites de lignes et d'utilisateurs selon le plan choisi",
      "Prévoir une gouvernance : qui peut modifier quoi, qui est responsable",
    ],
    firstStep: "Créer une base vide avec 3 tables représentant vos entités principales, importer 10 lignes de données réelles, et tester les vues avant de configurer les automatisations.",
    stackWith: ["Make", "Bubble", "Softr", "Notion"],
    alternatives: [
      "Salesforce si CRM avancé avec équipe commerciale structurée",
      "HubSpot si besoin de marketing automation associé",
      "Notion si le besoin est davantage documentaire que base de données",
      "Supabase/PostgreSQL si besoin technique plus robuste",
    ],
  },
  {
    id: 'make',
    name: 'Make',
    category: 'automation',
    categoryLabel: 'Automatisation',
    description:
      "Plateforme d'automatisation visuelle qui connecte vos applications et automatise les flux de travail sans coder, avec des workflows très puissants.",
    icon: '⚡',
    colorClass: 'text-violet-600',
    bgClass: 'bg-violet-50',
    jenniferProjects: [
      "Automatisations entre formulaires, Google Sheets, Airtable et CRM",
      "Scénarios avec webhooks et envois d'emails ou SMS",
      "Synchronisation de statuts et données entre outils",
      "Automatisation de devis, factures et relances",
    ],
    scores: {
      projectType: { webapp: 3, crm: 6, automation: 10, documentation: 5, interne: 7, marketplace: 4, mobile: 6 },
      companySize: { solo: 10, small: 10, medium: 9, large: 8 },
      budget: { low: 9, medium: 9, high: 7 },
      urgency: { urgent: 8, normal: 10, long: 9 },
      features: { users: 3, automation: 10, crm: 5, documents: 6, payment: 5, dashboard: 4 },
    },
    pros: [
      "Visualisation claire des workflows",
      "Très grand nombre d'intégrations",
      "Logique conditionnelle avancée",
      "Prix très compétitif",
    ],
    cons: [
      "Pas de base de données intégrée",
      "Nécessite des apps tierces à connecter",
      "Débogage parfois complexe",
    ],
    idealFor: [
      "Automatisation de processus",
      "Synchronisation d'outils",
      "Notifications et alertes",
      "Traitement de données",
    ],
    pricing: "Gratuit (1 000 opérations/mois) puis à partir de ~10 €/mois",
    url: "https://make.com",
    jenniferLevel: "expert",
    showInTechPage: true,
    logoUrl: '/logo_outils/make.png',
    keywords: [
      "automatisation", "automatiser", "automatique", "webhook", "formulaire",
      "email automatique", "sms", "synchronisation", "synchroniser", "connecter",
      "scénario", "workflow", "notification", "alerte", "déclencheur",
      "zapier", "integromat", "intégration", "integration", "gmail",
      "google sheets", "slack", "twilio", "pennylane", "systeme.io", "hubspot",
      "relance automatique", "relances", "génération de document", "make.com",
    ],
    avoidIf: [
      "L'outil source permet déjà d'automatiser simplement (ex: HubSpot workflows)",
      "Volumes très importants où les coûts deviendraient prohibitifs",
      "Processus critique sans supervision humaine possible",
      "Client réfractaire à une plateforme d'automatisation tierce",
    ],
    watchouts: [
      "Documenter chaque scénario avec un nom et une description claire",
      "Activer la gestion des erreurs avec alertes email ou Slack",
      "Éviter les doublons avec des filtres de routage rigoureux",
      "Surveiller la consommation d'opérations pour anticiper les coûts",
      "Tester en conditions réelles avant de passer en production",
    ],
    firstStep: "Créer un scénario simple : déclencheur webhook ou formulaire → une seule action (ex: créer une ligne Airtable). Tester avec une vraie donnée avant d'ajouter de la complexité.",
    stackWith: ["Airtable", "Bubble", "Notion", "DocuSign", "Salesforce", "Stripe"],
    alternatives: [
      "Power Automate si l'environnement est entièrement Microsoft 365",
      "Zapier si besoin très simple et équipe non technique",
      "Automatisations natives de l'outil source si elles suffisent",
    ],
  },
  {
    id: 'notion',
    name: 'Notion',
    category: 'documentation',
    categoryLabel: 'Gestion des connaissances',
    description:
      "Outil tout-en-un de gestion de l'information : wiki, documentation, base de données légère, gestion de projets et prise de notes collaborative.",
    icon: '⬛',
    colorClass: 'text-gray-700',
    bgClass: 'bg-gray-50',
    jenniferProjects: [
      "Déploiement de Notion dans une organisation",
      "Création d'espaces d'équipe et templates réutilisables",
      "Base de connaissances et formation 360Learning autour de Notion",
      "Onboarding et règles d'usage pour une équipe",
    ],
    scores: {
      projectType: { webapp: 2, crm: 4, automation: 2, documentation: 10, interne: 8, marketplace: 1, mobile: 2 },
      companySize: { solo: 10, small: 10, medium: 8, large: 6 },
      budget: { low: 10, medium: 8, high: 5 },
      urgency: { urgent: 10, normal: 9, long: 8 },
      features: { users: 7, automation: 3, crm: 4, documents: 10, payment: 0, dashboard: 5 },
    },
    pros: [
      "Très rapide à déployer",
      "Interface intuitive et agréable",
      "Excellent pour la documentation",
      "Plan gratuit généreux",
    ],
    cons: [
      "Pas adapté aux apps métier complexes",
      "Performances à grande échelle limitées",
      "Personnalisation limitée",
    ],
    idealFor: ["Base de connaissances", "Wiki interne", "Documentation produit", "Espace client simple"],
    pricing: "Gratuit puis à partir de ~10 $/utilisateur/mois",
    url: "https://notion.so",
    jenniferLevel: "expert",
    showInTechPage: true,
    logoUrl: '/logo_outils/notion.png',
    keywords: [
      "documentation", "wiki", "procédures", "connaissances", "base de connaissances",
      "onboarding", "ressources", "capitaliser", "process", "guide", "manuel",
      "formation interne", "collaboration", "notes", "roadmap", "support interne",
      "faq", "procedures", "knowledge base", "espace de travail", "transparent",
    ],
    avoidIf: [
      "CRM robuste avec pipeline commercial structuré",
      "Application client avec comptes utilisateurs complexes",
      "Workflows métier très complexes avec logique conditionnelle",
      "Gestion documentaire réglementaire avec droits très fins",
      "Base de données métier très structurée à grande échelle",
    ],
    watchouts: [
      "Définir une structure de pages claire avant de remplir le contenu",
      "Nommer un responsable de la mise à jour par section",
      "Créer des templates réutilisables pour les processus clés",
      "Éviter la duplication de pages avec une règle 'une info = un seul endroit'",
      "Configurer les droits par page ou par espace selon la confidentialité",
    ],
    firstStep: "Créer un espace Notion avec 3 sections : Base de connaissances, Projets en cours, Ressources équipe. Importer 5 procédures existantes pour valider la structure.",
    stackWith: ["Airtable", "Make", "SharePoint"],
    alternatives: [
      "SharePoint si l'environnement est Microsoft 365 avec documents Office",
      "Confluence si l'équipe technique est déjà équipée Atlassian",
      "Salesforce Knowledge si le besoin est lié au service client Salesforce",
    ],
  },
  {
    id: 'salesforce',
    name: 'Salesforce',
    category: 'crm',
    categoryLabel: 'CRM Enterprise',
    description:
      "La référence mondiale des CRM enterprise. Gestion complète du cycle de vente, marketing automation, service client et analytics avancés.",
    icon: '☁️',
    colorClass: 'text-blue-700',
    bgClass: 'bg-blue-50',
    jenniferProjects: [
      "Administration Salesforce et création de flows",
      "Experience Cloud — espaces clients et portails partenaires",
      "Intégration Salesforce + DocuSign + Power Automate",
      "Structuration de données et reporting commercial",
    ],
    scores: {
      projectType: { webapp: 3, crm: 10, automation: 7, documentation: 4, interne: 6, marketplace: 2, mobile: 3 },
      companySize: { solo: 2, small: 4, medium: 8, large: 10 },
      budget: { low: 1, medium: 4, high: 10 },
      urgency: { urgent: 2, normal: 5, long: 10 },
      features: { users: 9, automation: 8, crm: 10, documents: 6, payment: 5, dashboard: 9 },
    },
    pros: [
      "Solution la plus complète du marché",
      "Très personnalisable",
      "Énorme écosystème d'apps",
      "Reporting avancé",
    ],
    cons: [
      "Coût très élevé",
      "Implémentation longue et complexe",
      "Surdimensionné pour les petites structures",
    ],
    idealFor: [
      "Grandes équipes commerciales",
      "Processus de vente complexes",
      "Entreprises multi-pays",
      "CRM enterprise",
    ],
    pricing: "À partir de ~75 €/utilisateur/mois (Essentials)",
    url: "https://salesforce.com",
    jenniferLevel: "expert",
    showInTechPage: true,
    logoUrl: '/logo_outils/salesforce.png',
    keywords: [
      "salesforce", "crm avancé", "équipe commerciale", "opportunité", "opportunités",
      "pipeline commercial", "contrat", "compte client", "comptes clients",
      "portail salesforce", "experience cloud", "partenaires", "support client",
      "service cloud", "reporting commercial", "force.com", "sales cloud",
      "flow salesforce", "cpq", "salesforce crm",
    ],
    avoidIf: [
      "Budget mensuel inférieur à 500 €",
      "Petite équipe non mature sur les outils CRM",
      "Besoin d'un MVP rapide en moins de 2 mois",
      "Besoin uniquement documentaire sans processus commercial",
      "Projet sans équipe commerciale structurée",
    ],
    watchouts: [
      "Définir la gouvernance des données avant l'implémentation (propriétaire des données, doublons)",
      "Configurer les profils et permissions avec soin — c'est complexe à corriger après",
      "Documenter tous les flows et automatisations pour éviter la dette technique",
      "Prévoir une conduite du changement et une formation utilisateurs",
      "Éviter de personnaliser excessivement avant de valider les processus métier",
    ],
    firstStep: "Réaliser un audit du processus commercial actuel. Configurer les objets standard (Comptes, Contacts, Opportunités) avant toute customisation. Tester avec 2-3 commerciaux pilotes.",
    stackWith: ["DocuSign", "Make", "SharePoint", "Power Automate"],
    alternatives: [
      "Airtable pour un CRM léger sans budget Salesforce",
      "HubSpot si besoin de marketing automation associé au sales",
      "Bubble si espace client custom sans CRM Salesforce déjà en place",
    ],
  },
  {
    id: 'sharepoint',
    name: 'SharePoint',
    category: 'documentation',
    categoryLabel: 'Gestion documentaire',
    description:
      "Plateforme Microsoft de gestion documentaire et de collaboration. Idéale pour les organisations déjà dans l'écosystème Microsoft 365.",
    icon: '📁',
    colorClass: 'text-blue-600',
    bgClass: 'bg-blue-50',
    jenniferProjects: [
      "Projets de gestion documentaire d'entreprise",
      "Structuration d'espaces documentaires et bibliothèques",
      "Collaboration documentaire et réflexion GED",
    ],
    scores: {
      projectType: { webapp: 3, crm: 2, automation: 3, documentation: 10, interne: 8, marketplace: 1, mobile: 1 },
      companySize: { solo: 2, small: 5, medium: 9, large: 10 },
      budget: { low: 3, medium: 8, high: 8 },
      urgency: { urgent: 4, normal: 7, long: 9 },
      features: { users: 9, automation: 5, crm: 2, documents: 10, payment: 0, dashboard: 5 },
    },
    pros: [
      "Intégration native Microsoft 365",
      "Gestion des droits très fine",
      "Archivage et versioning",
      "Très sécurisé",
    ],
    cons: [
      "Interface parfois complexe",
      "Configuration initiale longue",
      "Nécessite un abonnement Microsoft 365",
    ],
    idealFor: [
      "Gestion documentaire d'entreprise",
      "Intranet",
      "Espaces de travail sécurisés",
      "Écosystème Microsoft",
    ],
    pricing: "Inclus dans Microsoft 365 (à partir de ~6 €/utilisateur/mois)",
    url: "https://microsoft.com/sharepoint",
    jenniferLevel: "expert",
    showInTechPage: true,
    logoUrl: '/logo_outils/sharepoint.png',
    keywords: [
      "sharepoint", "microsoft", "microsoft 365", "office 365", "ged",
      "gestion documentaire", "bibliothèque", "documents", "fichiers", "intranet",
      "classement", "versioning", "validation documentaire", "métadonnées",
      "teams", "onedrive", "one drive", "office", "m365",
    ],
    avoidIf: [
      "Client non équipé Microsoft 365",
      "Besoin uniquement collaboratif simple (Notion suffit)",
      "Besoin UX très moderne pour les clients finaux",
      "Projet CRM, SaaS ou application métier",
    ],
    watchouts: [
      "Définir l'architecture documentaire avant de créer les bibliothèques",
      "Établir des règles de nommage claires et les documenter",
      "Configurer les droits par site et bibliothèque — pas globalement",
      "Prévoir une formation utilisateurs pour l'adoption",
      "Éviter la duplication entre SharePoint et Teams (qui utilise SharePoint en coulisses)",
    ],
    firstStep: "Cartographier les 5 types de documents les plus utilisés. Définir les métadonnées clés. Créer 2 bibliothèques pilotes avant de migrer l'existant.",
    stackWith: ["Power Automate", "DocuSign", "Make", "Notion"],
    alternatives: [
      "Notion pour une base de connaissances plus souple et moderne",
      "Google Drive si l'équipe est déjà sur Google Workspace",
      "GED spécialisée (ex. Zeendoc, Alfresco) si contraintes réglementaires fortes",
    ],
  },
  {
    id: 'power-automate',
    name: 'Power Automate',
    category: 'automation',
    categoryLabel: 'Automatisation Microsoft',
    description:
      "Solution d'automatisation Microsoft qui s'intègre nativement avec Office 365, Teams, SharePoint et plus de 500 connecteurs.",
    icon: '🔷',
    colorClass: 'text-blue-500',
    bgClass: 'bg-blue-50',
    jenniferProjects: [
      "Automatisations dans l'environnement Microsoft 365",
      "Workflows liés à DocuSign et SharePoint",
      "Circuits d'approbation documentaires",
    ],
    scores: {
      projectType: { webapp: 2, crm: 5, automation: 9, documentation: 6, interne: 8, marketplace: 2, mobile: 2 },
      companySize: { solo: 3, small: 6, medium: 9, large: 10 },
      budget: { low: 5, medium: 8, high: 8 },
      urgency: { urgent: 5, normal: 8, long: 8 },
      features: { users: 4, automation: 9, crm: 4, documents: 7, payment: 3, dashboard: 5 },
    },
    pros: [
      "Intégration parfaite avec Microsoft 365",
      "Interface en français",
      "Très bonne gestion des approbations",
      "Déjà inclus dans M365",
    ],
    cons: [
      "Moins flexible pour les apps non-Microsoft",
      "Certains connecteurs premium coûteux",
      "Moins visuel que Make",
    ],
    idealFor: [
      "Organisations Microsoft",
      "Automatisation Office",
      "Workflows d'approbation",
      "Synchronisation SharePoint",
    ],
    pricing: "Inclus dans M365, plans avancés à partir de ~15 $/utilisateur/mois",
    url: "https://powerautomate.microsoft.com",
    jenniferLevel: "expert",
    showInTechPage: false,
    logoUrl: '/logo_outils/power-automate.png',
    keywords: [
      "microsoft", "microsoft 365", "office 365", "sharepoint", "outlook",
      "teams", "approbation", "circuit d'approbation", "validation",
      "notification teams", "email outlook", "power automate", "onedrive",
      "excel automatique", "dynamics", "m365", "power platform",
    ],
    avoidIf: [
      "Les outils principaux sont hors de l'écosystème Microsoft",
      "Besoin d'automatisation multi-outils très souple (Make est plus adapté)",
      "Connecteurs premium trop coûteux pour le budget",
      "Scénario très complexe avec nombreux services externes non-Microsoft",
    ],
    watchouts: [
      "Vérifier les licences nécessaires pour les connecteurs premium",
      "Gérer les erreurs avec des branches conditionnelles 'Catch'",
      "Documenter chaque flux avec un nom et une description clairs",
      "Tester avec des données réelles avant mise en production",
      "Surveiller les quotas d'exécution selon la licence",
    ],
    firstStep: "Identifier le premier processus à automatiser (ex: notification Teams après ajout d'un document SharePoint). Créer un flux simple avec 3 étapes. Tester avec 3 cas différents.",
    stackWith: ["SharePoint", "DocuSign", "Salesforce", "Airtable"],
    alternatives: [
      "Make pour des automatisations multi-outils hors Microsoft",
      "Zapier pour des automatisations simples non-Microsoft",
      "Automatisations natives Microsoft si les cas d'usage sont standards",
    ],
  },
  {
    id: 'docusign',
    name: 'DocuSign',
    category: 'signature',
    categoryLabel: 'Signature électronique',
    description:
      "Leader mondial de la signature électronique et de la gestion des contrats numériques. Sécurisé, légalement reconnu, intégrable facilement.",
    icon: '✍️',
    colorClass: 'text-yellow-700',
    bgClass: 'bg-yellow-50',
    jenniferProjects: [
      "Déploiement de signature électronique pour parcours contractuels",
      "Intégration DocuSign + Salesforce + Power Automate",
      "Automatisation de l'envoi et de l'archivage des contrats",
    ],
    scores: {
      projectType: { webapp: 4, crm: 5, automation: 5, documentation: 8, interne: 6, marketplace: 5, mobile: 4 },
      companySize: { solo: 7, small: 8, medium: 9, large: 9 },
      budget: { low: 5, medium: 8, high: 8 },
      urgency: { urgent: 8, normal: 9, long: 7 },
      features: { users: 6, automation: 5, crm: 3, documents: 10, payment: 0, dashboard: 4 },
    },
    pros: [
      "Référence légale mondiale",
      "Facilité d'utilisation",
      "Intégrations nombreuses",
      "Audit trail complet",
    ],
    cons: [
      "Coût par enveloppe / signature",
      "Fonctionnalités limitées sur les plans bas",
      "Pas un outil de gestion documentaire complet",
    ],
    idealFor: [
      "Contrats clients",
      "Documents RH",
      "Devis et propositions commerciales",
      "Onboarding clients",
    ],
    pricing: "À partir de ~10 $/mois pour 5 enveloppes",
    url: "https://docusign.com",
    jenniferLevel: "expert",
    showInTechPage: true,
    logoUrl: '/logo_outils/docusign.png',
    keywords: [
      "signature", "contrat", "contrats", "devis", "convention", "signer",
      "signature électronique", "enveloppe", "document à signer",
      "validation client", "parcours contractuel", "archivage contrat",
      "faire signer", "accord", "engagement", "bon de commande",
    ],
    avoidIf: [
      "Besoin très occasionnel (moins de 5 documents par mois)",
      "Budget très limité avec alternative gratuite suffisante",
      "Processus contractuel pas encore défini",
      "Document simple pouvant être signé avec un outil moins coûteux",
    ],
    watchouts: [
      "Créer des modèles (templates) réutilisables dès le départ",
      "Définir l'ordre et les rôles de signature précisément",
      "Configurer les relances automatiques et le suivi de statut",
      "Prévoir l'archivage automatique après signature (Make ou Power Automate)",
      "Vérifier la conformité selon le contexte : eIDAS pour l'Europe, norme applicable",
    ],
    firstStep: "Créer un premier template avec un seul type de document. Tester avec un signataire interne. Puis brancher Make ou Power Automate pour automatiser l'envoi et l'archivage.",
    stackWith: ["Make", "Power Automate", "Salesforce", "SharePoint", "Airtable"],
    alternatives: [
      "Yousign (alternative française et conforme eIDAS)",
      "Dropbox Sign si déjà sur Dropbox Business",
      "Signature native Salesforce si le contexte est entièrement dans Salesforce",
    ],
  },
  {
    id: 'claude-code',
    name: 'Claude Code',
    category: 'ai-dev',
    categoryLabel: 'Développement assisté par IA',
    description:
      "Développement d'applications assisté par IA de pointe. Permet de créer des solutions sur-mesure très rapidement avec une IA qui comprend et génère du code.",
    icon: '🤖',
    colorClass: 'text-violet-600',
    bgClass: 'bg-violet-50',
    jenniferProjects: [
      "Création de prototypes et simulateurs interactifs",
      "Sites interactifs et agents conversationnels simulés",
      "Outils de portfolio et applications sur-mesure",
      "StackPilot — cet outil de diagnostic",
    ],
    scores: {
      projectType: { webapp: 9, crm: 6, automation: 7, documentation: 5, interne: 9, marketplace: 8, mobile: 8 },
      companySize: { solo: 10, small: 9, medium: 7, large: 6 },
      budget: { low: 8, medium: 9, high: 9 },
      urgency: { urgent: 7, normal: 9, long: 10 },
      features: { users: 9, automation: 8, crm: 7, documents: 6, payment: 8, dashboard: 9 },
    },
    pros: [
      "Sur-mesure total sans compromis",
      "Très rapide grâce à l'IA",
      "Évolutif sans limites",
      "Coût de développement réduit",
    ],
    cons: [
      "Nécessite un développeur / Product Builder",
      "Infrastructure à gérer",
      "Maintenance requise",
    ],
    idealFor: [
      "Applications sur-mesure",
      "Fonctionnalités très spécifiques",
      "Automatisations complexes",
      "MVPs techniques",
    ],
    pricing: "Abonnement Claude Pro (~20 $/mois) + temps de développement",
    url: "https://claude.ai/code",
    jenniferLevel: "expert",
    showInTechPage: true,
    keywords: [
      "prototype", "simulateur", "générateur", "portfolio interactif", "site interactif",
      "outil interne custom", "composant react", "next.js", "nextjs", "développement rapide",
      "claude", "intelligence artificielle", "code", "développement", "dev",
      "mvp technique", "application sur-mesure", "sur mesure", "custom",
      "react", "typescript", "javascript",
    ],
    avoidIf: [
      "Le client ne veut pas maintenir de code après livraison",
      "Projet critique sans développeur disponible pour la maintenance",
      "Besoin d'une application no-code maintenable par l'équipe métier",
      "Architecture complexe sans validation technique préalable",
    ],
    watchouts: [
      "Relire et tester tout le code généré avant de déployer",
      "Ne jamais exposer de clés API dans le code client",
      "Documenter les choix techniques pour la maintenabilité",
      "Prévoir une revue technique si le projet est critique",
      "Corriger les erreurs TypeScript avant tout déploiement",
    ],
    firstStep: "Décrire très précisément le composant ou la fonctionnalité cible. Générer une V1 simple. Tester. Itérer progressivement en ne complexifiant qu'une chose à la fois.",
    stackWith: ["Vercel", "Supabase", "Stripe", "Airtable API"],
    alternatives: [
      "Bubble si l'app doit être maintenable sans coder",
      "Webflow si c'est un site vitrine sans logique applicative",
      "Framer si c'est une landing page design très rapide",
    ],
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    category: 'crm',
    categoryLabel: 'CRM & Marketing',
    description:
      "Plateforme CRM tout-en-un avec marketing automation, sales pipeline, service client et CMS. Excellent pour les équipes commerciales et marketing.",
    icon: '🟠',
    colorClass: 'text-orange-600',
    bgClass: 'bg-orange-50',
    scores: {
      projectType: { webapp: 2, crm: 9, automation: 7, documentation: 3, interne: 5, marketplace: 2, mobile: 2 },
      companySize: { solo: 5, small: 9, medium: 9, large: 7 },
      budget: { low: 6, medium: 8, high: 9 },
      urgency: { urgent: 7, normal: 9, long: 8 },
      features: { users: 7, automation: 8, crm: 9, documents: 3, payment: 4, dashboard: 8 },
    },
    pros: [
      "CRM gratuit très complet",
      "Marketing automation puissant",
      "Interface intuitive",
      "Excellent support",
    ],
    cons: [
      "Prix monte vite avec les fonctionnalités avancées",
      "Moins personnalisable que Salesforce",
      "Modules vendus séparément",
    ],
    idealFor: ["Équipes commerciales PME", "Marketing digital", "Suivi des leads", "Inbound marketing"],
    pricing: "CRM gratuit, puis à partir de ~46 €/mois (Starter)",
    url: "https://hubspot.com",
    jenniferLevel: "recommandé",
    keywords: [
      "hubspot", "marketing", "leads", "inbound", "email marketing", "campagne",
      "crm marketing", "suivi commercial", "pipeline vente", "automation marketing",
      "nurturing", "newsletter", "landing page crm", "contact crm",
    ],
    avoidIf: [
      "Besoin CRM très avancé ou très personnalisé (Salesforce plus adapté)",
      "Besoin principalement documentaire",
      "Application métier spécifique sans lien avec le marketing",
    ],
    watchouts: [
      "Vérifier précisément les fonctionnalités incluses dans chaque plan",
      "Les modules sont vendus séparément — prévoir le budget global",
      "Anticiper la montée en puissance tarifaire avec la croissance",
      "Configurer les propriétés de contact dès le départ pour éviter les migrations",
      "Éviter les doublons de contacts dès l'import initial",
    ],
    firstStep: "Créer un pipeline de vente simple avec 5 étapes. Importer les contacts existants. Configurer un premier email de suivi automatique.",
    stackWith: ["Make", "Notion", "DocuSign"],
    alternatives: [
      "Airtable pour un CRM simple sans marketing automation",
      "Salesforce pour des besoins enterprise et processus complexes",
      "Notion pour un simple suivi interne sans pipeline",
    ],
  },
  {
    id: 'zapier',
    name: 'Zapier',
    category: 'automation',
    categoryLabel: 'Automatisation',
    description:
      "L'outil d'automatisation le plus utilisé au monde. Simple à prendre en main, idéal pour connecter des applications et automatiser des tâches répétitives.",
    icon: '🔶',
    colorClass: 'text-orange-500',
    bgClass: 'bg-orange-50',
    scores: {
      projectType: { webapp: 2, crm: 5, automation: 8, documentation: 4, interne: 6, marketplace: 3, mobile: 4 },
      companySize: { solo: 10, small: 9, medium: 7, large: 5 },
      budget: { low: 7, medium: 8, high: 6 },
      urgency: { urgent: 9, normal: 9, long: 7 },
      features: { users: 2, automation: 8, crm: 4, documents: 4, payment: 4, dashboard: 3 },
    },
    pros: [
      "Très simple à utiliser",
      "6 000+ intégrations disponibles",
      "Rapide à mettre en place",
      "Plan gratuit disponible",
    ],
    cons: [
      "Moins puissant que Make pour les workflows complexes",
      "Prix élevé à grande volumétrie",
      "Logique conditionnelle limitée",
    ],
    idealFor: [
      "Automatisations simples",
      "Connexion entre apps",
      "Notifications automatiques",
      "Synchronisation de données",
    ],
    pricing: "Gratuit (100 tâches/mois) puis à partir de ~20 $/mois",
    url: "https://zapier.com",
    jenniferLevel: "recommandé",
    keywords: [
      "zapier", "automatisation simple", "connecter facilement",
      "gmail", "google sheets", "typeform", "slack notification", "zap",
    ],
    avoidIf: [
      "Workflows complexes avec logique conditionnelle avancée (Make plus adapté)",
      "Volumes importants où les coûts deviennent prohibitifs",
      "Besoin de transformer des données complexes",
    ],
    watchouts: [
      "Vérifier le nombre de tâches incluses dans le plan",
      "Surveiller les coûts à grande volumétrie",
      "Documenter les Zaps créés pour la maintenabilité",
      "Passer à Make si les besoins deviennent plus complexes",
    ],
    firstStep: "Créer un Zap simple : déclencheur (ex: nouveau formulaire) → une action (ex: ligne Google Sheets). Tester avec de vraies données avant d'aller plus loin.",
    stackWith: ["Google Sheets", "Gmail", "Notion", "HubSpot"],
    alternatives: [
      "Make si workflows complexes ou volume important",
      "Power Automate si environnement Microsoft",
      "Automatisations natives de l'outil source si elles suffisent",
    ],
  },
  {
    id: 'glide',
    name: 'Glide',
    category: 'no-code',
    categoryLabel: 'App mobile No-Code',
    description:
      "Créez des applications mobiles et web professionnelles à partir d'une feuille Google Sheets ou Airtable en quelques minutes.",
    icon: '📱',
    colorClass: 'text-purple-600',
    bgClass: 'bg-purple-50',
    scores: {
      projectType: { webapp: 5, crm: 6, automation: 2, documentation: 5, interne: 8, marketplace: 3, mobile: 9 },
      companySize: { solo: 9, small: 9, medium: 7, large: 4 },
      budget: { low: 8, medium: 7, high: 5 },
      urgency: { urgent: 9, normal: 8, long: 6 },
      features: { users: 8, automation: 3, crm: 6, documents: 4, payment: 5, dashboard: 7 },
    },
    pros: [
      "Très rapide à créer",
      "Idéal pour apps mobiles",
      "Interface soignée automatiquement",
      "Prix abordable",
    ],
    cons: [
      "Moins flexible que Bubble",
      "Dépend d'une source de données externe",
      "Personnalisation limitée",
    ],
    idealFor: ["Application terrain", "Outil interne mobile", "Répertoire d'équipe", "Catalogue produits"],
    pricing: "Gratuit (limité) puis à partir de ~25 $/mois",
    url: "https://glideapps.com",
    jenniferLevel: "expert",
    showInTechPage: true,
    keywords: [
      "application mobile", "app mobile", "terrain", "technicien", "mobile",
      "tablette", "équipe terrain", "saisie terrain", "catalogue mobile",
      "répertoire", "glide", "outil mobile", "app pour terrain",
    ],
    avoidIf: [
      "Besoin d'une expérience très personnalisée avec logique complexe",
      "Application très transactionnelle",
      "Droits très complexes par enregistrement",
    ],
    watchouts: [
      "Glide dépend d'Airtable ou Google Sheets comme source — anticiper la structure",
      "Vérifier les fonctionnalités offline disponibles selon le plan",
      "Tester sur mobile réel avant de déployer",
      "Limites de lignes et d'utilisateurs selon le plan",
    ],
    firstStep: "Créer une feuille Airtable avec les données réelles. Connecter Glide. Créer une app basique et tester sur mobile avec 3 utilisateurs pilotes.",
    stackWith: ["Airtable", "Google Sheets", "Make"],
    alternatives: [
      "Bubble si besoin d'une expérience plus riche et personnalisée",
      "Softr si portail client desktop aussi nécessaire",
    ],
  },
  {
    id: 'softr',
    name: 'Softr',
    category: 'no-code',
    categoryLabel: 'Portail client No-Code',
    description:
      "Transformez votre Airtable ou Google Sheets en une application web avec portail client, espace membres et tableaux de bord.",
    icon: '🔷',
    colorClass: 'text-sky-600',
    bgClass: 'bg-sky-50',
    scores: {
      projectType: { webapp: 7, crm: 5, automation: 2, documentation: 6, interne: 8, marketplace: 5, mobile: 5 },
      companySize: { solo: 9, small: 9, medium: 7, large: 4 },
      budget: { low: 8, medium: 8, high: 5 },
      urgency: { urgent: 8, normal: 9, long: 7 },
      features: { users: 9, automation: 3, crm: 5, documents: 5, payment: 6, dashboard: 8 },
    },
    pros: [
      "Très rapide si vous avez déjà Airtable",
      "Portail client clé en main",
      "Interface moderne sans effort",
      "Plan gratuit généreux",
    ],
    cons: [
      "Dépend d'Airtable ou Google Sheets",
      "Personnalisation limitée",
      "Moins puissant que Bubble",
    ],
    idealFor: ["Portail client", "Espace membres", "Dashboard client", "Interface sur Airtable"],
    pricing: "Gratuit puis à partir de ~49 $/mois",
    url: "https://softr.io",
    jenniferLevel: "recommandé",
    keywords: [
      "portail client", "espace client", "espace membre", "interface sur airtable",
      "dashboard client", "accès sécurisé client", "softr",
      "espace de consultation", "accès clients", "portail sécurisé",
    ],
    avoidIf: [
      "Besoin d'une expérience très personnalisée sans Airtable",
      "Droits très complexes par enregistrement",
      "Grande volumétrie d'utilisateurs",
    ],
    watchouts: [
      "Softr dépend d'Airtable ou Google Sheets comme base de données",
      "Vérifier les limites d'utilisateurs selon le plan",
      "Tester les droits d'accès par enregistrement avec des comptes différents",
    ],
    firstStep: "Connecter Softr à une base Airtable existante. Créer un portail basique avec liste + vue détail. Tester l'accès sécurisé avec 2 comptes utilisateurs différents.",
    stackWith: ["Airtable", "Make", "DocuSign"],
    alternatives: [
      "Bubble si l'expérience client doit être très personnalisée",
      "Salesforce Experience Cloud si les données sont dans Salesforce",
      "Glide si l'usage est principalement mobile",
    ],
  },
  {
    id: 'webflow',
    name: 'Webflow',
    category: 'no-code',
    categoryLabel: 'Site web No-Code',
    description:
      "Plateforme de création de sites web professionnels sans code, avec un contrôle total sur le design, les animations et le contenu.",
    icon: '🌊',
    colorClass: 'text-blue-500',
    bgClass: 'bg-blue-50',
    scores: {
      projectType: { webapp: 6, crm: 1, automation: 2, documentation: 5, interne: 3, marketplace: 3, mobile: 3 },
      companySize: { solo: 9, small: 8, medium: 6, large: 4 },
      budget: { low: 6, medium: 8, high: 6 },
      urgency: { urgent: 6, normal: 9, long: 8 },
      features: { users: 4, automation: 2, crm: 1, documents: 4, payment: 5, dashboard: 3 },
    },
    pros: [
      "Design très haute qualité",
      "Animations avancées",
      "CMS intégré",
      "SEO optimisé",
    ],
    cons: [
      "Courbe d'apprentissage élevée",
      "Pas adapté aux apps complexes",
      "Prix peut monter vite",
    ],
    idealFor: ["Sites vitrines premium", "Landing pages", "Sites marketing", "Portfolio"],
    pricing: "Gratuit (limité) puis à partir de ~14 $/mois",
    url: "https://webflow.com",
    jenniferLevel: "recommandé",
    keywords: [
      "site vitrine", "landing page", "site marketing", "site web", "portfolio",
      "blog", "cms", "seo", "référencement", "page de présentation",
      "site institutionnel", "webflow", "site avec cms", "site public",
      "vitrine en ligne", "présenter mon offre", "page d'accueil",
    ],
    avoidIf: [
      "Logique applicative complexe avec comptes utilisateurs",
      "Base de données métier nécessaire",
      "Processus métier interne à gérer",
    ],
    watchouts: [
      "Courbe d'apprentissage pour le design avancé — prévoir du temps",
      "Vérifier les limites du plan pour les formulaires et les CMS items",
      "Tester les performances et le référencement avant le lancement",
      "Prévoir une formation si le client doit administrer le CMS seul",
    ],
    firstStep: "Utiliser un template Webflow existant. Créer une page simple avec hero, section features et formulaire de contact. Personnaliser la typographie et les couleurs.",
    stackWith: ["Make", "Airtable", "HubSpot"],
    alternatives: [
      "Framer pour une landing page très design encore plus rapidement",
      "WordPress si besoin de blog/CMS avec beaucoup de contenu",
      "Bubble si le site doit intégrer une vraie logique applicative",
    ],
  },
  {
    id: 'framer',
    name: 'Framer',
    category: 'no-code',
    categoryLabel: 'Site web / Landing page',
    description:
      "Outil de création de sites et landing pages ultra-design, pensé pour les startups et les équipes marketing qui veulent aller vite sans sacrifier l'esthétique.",
    icon: '🎨',
    colorClass: 'text-pink-600',
    bgClass: 'bg-pink-50',
    scores: {
      projectType: { webapp: 4, crm: 0, automation: 1, documentation: 3, interne: 2, marketplace: 2, mobile: 3 },
      companySize: { solo: 10, small: 8, medium: 5, large: 3 },
      budget: { low: 7, medium: 7, high: 5 },
      urgency: { urgent: 9, normal: 8, long: 6 },
      features: { users: 3, automation: 1, crm: 0, documents: 2, payment: 3, dashboard: 2 },
    },
    pros: [
      "Création ultra-rapide de landing pages design",
      "Animations impressionnantes sans code",
      "Excellente qualité visuelle par défaut",
      "Idéal pour le lancement de produit",
    ],
    cons: [
      "Limité aux sites vitrines sans logique applicative",
      "Moins adapté aux sites éditoriaux volumineux",
      "CMS moins puissant que Webflow",
    ],
    idealFor: ["Landing page startup", "Site de lancement", "Portfolio design", "Site de présentation rapide"],
    pricing: "Gratuit (limité) puis à partir de ~15 $/mois",
    url: "https://framer.com",
    jenniferLevel: "recommandé",
    keywords: [
      "landing page", "site vitrine", "site rapide", "framer", "startup design",
      "page de lancement", "portfolio", "présenter mon produit", "site moderne",
      "one page", "page unique", "site de lancement rapide",
    ],
    avoidIf: [
      "Blog ou site avec beaucoup de contenus (Webflow ou WordPress plus adaptés)",
      "Besoin de logique applicative",
      "CMS complexe avec de nombreuses collections",
    ],
    watchouts: [
      "CMS moins mature que Webflow pour les sites éditoriaux",
      "Vérifier les limites de pages et de visiteurs selon le plan",
      "Pas adapté si le client doit gérer un blog volumineux",
    ],
    firstStep: "Choisir un template Framer adapté à l'activité. Personnaliser le texte, les couleurs et les images en 1-2 heures. Publier sur un domaine personnalisé.",
    stackWith: ["Make", "HubSpot"],
    alternatives: [
      "Webflow si besoin de CMS riche ou site plus complexe",
      "WordPress si site éditorial avec blog volumineux",
      "Bubble si le site doit intégrer une logique applicative",
    ],
  },
  {
    id: 'wordpress',
    name: 'WordPress',
    category: 'no-code',
    categoryLabel: 'CMS & Site web',
    description:
      "Le CMS le plus utilisé au monde. Idéal pour les sites éditoriaux, les blogs, les sites vitrines administrables et les projets avec beaucoup de contenu.",
    icon: '🔵',
    colorClass: 'text-slate-600',
    bgClass: 'bg-slate-50',
    scores: {
      projectType: { webapp: 4, crm: 1, automation: 2, documentation: 6, interne: 3, marketplace: 3, mobile: 2 },
      companySize: { solo: 8, small: 8, medium: 6, large: 4 },
      budget: { low: 8, medium: 7, high: 5 },
      urgency: { urgent: 7, normal: 8, long: 7 },
      features: { users: 5, automation: 3, crm: 2, documents: 5, payment: 6, dashboard: 3 },
    },
    pros: [
      "CMS le plus populaire au monde",
      "Très grand écosystème de thèmes et plugins",
      "SEO excellent avec les bons plugins",
      "Autonomie client pour gérer le contenu",
    ],
    cons: [
      "Maintenance et mises à jour régulières nécessaires",
      "Sécurité à gérer activement",
      "Pas adapté aux applications métier",
    ],
    idealFor: ["Blog et site éditorial", "Site vitrine administrable", "SEO fort", "Clients autonomes sur le contenu"],
    pricing: "Logiciel gratuit + hébergement (~5-20 €/mois) + thème/plugins",
    url: "https://wordpress.org",
    jenniferLevel: "recommandé",
    keywords: [
      "wordpress", "blog", "site éditorial", "articles", "contenu",
      "site administrable", "seo", "référencement naturel", "boutique woocommerce",
      "woocommerce", "e-commerce", "site d'information", "site de presse",
      "site avec beaucoup de pages", "cms wordpress",
    ],
    avoidIf: [
      "Application métier avec logique complexe",
      "Base de données structurée nécessaire",
      "Comptes utilisateurs avec rôles complexes",
    ],
    watchouts: [
      "Prévoir des mises à jour régulières du core, des thèmes et plugins",
      "Sécuriser l'installation (SSL, sauvegardes, plugins de sécurité)",
      "Choisir un hébergement adapté à la volumétrie attendue",
      "Limiter le nombre de plugins pour éviter les conflits",
    ],
    firstStep: "Choisir un hébergement WordPress managé. Installer un thème premium. Configurer Yoast SEO. Créer 5 pages clés avant de publier.",
    stackWith: ["Make", "HubSpot"],
    alternatives: [
      "Webflow pour un design plus moderne et contrôlé",
      "Framer pour une landing page rapide et design",
      "Bubble si le site doit intégrer une logique applicative",
    ],
  },
  {
    id: 'monday',
    name: 'Monday.com',
    category: 'no-code',
    categoryLabel: 'Gestion de projet No-Code',
    description:
      "Plateforme de gestion de projets et de travail collaboratif. Permet de suivre les tâches, les projets et les équipes avec une interface visuelle très flexible.",
    icon: '📋',
    colorClass: 'text-red-500',
    bgClass: 'bg-red-50',
    jenniferProjects: [
      "Mise en place d'espaces projets pour équipes PME",
      "Suivi de campagnes marketing multi-équipes",
      "Automatisation de flux de validation internes",
    ],
    scores: {
      projectType: { webapp: 2, crm: 5, automation: 6, documentation: 5, interne: 9, marketplace: 2, mobile: 4 },
      companySize: { solo: 7, small: 9, medium: 9, large: 8 },
      budget: { low: 5, medium: 8, high: 9 },
      urgency: { urgent: 8, normal: 9, long: 8 },
      features: { users: 9, automation: 6, crm: 5, documents: 5, payment: 2, dashboard: 8 },
    },
    pros: [
      "Interface visuelle très intuitive",
      "Flexible et personnalisable",
      "Automations intégrées",
      "Excellent pour les équipes",
    ],
    cons: [
      "Prix peut monter avec les utilisateurs",
      "Pas un outil CRM complet",
      "Peut devenir complexe sans structure claire",
    ],
    idealFor: ["Gestion de projets", "Suivi d'équipes", "Planification opérationnelle", "Coordination multi-départements"],
    pricing: "À partir de ~9 $/utilisateur/mois (Basic)",
    url: "https://monday.com",
    jenniferLevel: "expert",
    showInTechPage: true,
    keywords: [
      "monday", "gestion de projet", "projet", "tâches", "suivi de projet",
      "planning", "équipe", "coordination", "tableau kanban", "gantt",
      "suivi avancement", "roadmap projet", "management", "tableau de bord projet",
    ],
    avoidIf: [
      "Besoin d'un CRM avec suivi commercial avancé",
      "Application métier avec logique complexe",
      "Petit projet solo sans équipe",
    ],
    watchouts: [
      "Définir la structure des boards avant de déployer à toute l'équipe",
      "Éviter la multiplication des boards sans gouvernance",
      "Configurer les automations dès le départ pour éviter les saisies manuelles",
      "Vérifier les permissions par espace de travail",
    ],
    firstStep: "Créer un board pour un projet en cours. Définir 5 statuts représentatifs. Inviter 2-3 collaborateurs et tester une automatisation simple (ex: notification sur changement de statut).",
    stackWith: ["Make", "Notion", "HubSpot"],
    alternatives: [
      "Notion pour une approche plus documentaire et flexible",
      "Airtable si la structure de données est plus complexe",
      "HubSpot si le projet est principalement commercial",
    ],
  },
  {
    id: 'systemeio',
    name: 'Systeme.io',
    category: 'no-code',
    categoryLabel: 'Marketing & Tunnel No-Code',
    description:
      "Plateforme tout-en-un pour créer des tunnels de vente, gérer les emails, héberger des formations et automatiser le marketing. Idéale pour les solopreneurs et PME.",
    icon: '🚀',
    colorClass: 'text-emerald-600',
    bgClass: 'bg-emerald-50',
    jenniferProjects: [
      "Mise en place de tunnels d'inscription à des webinaires",
      "Automatisation d'emails de bienvenue et séquences marketing",
      "Création de pages de vente et formulaires d'inscription",
    ],
    scores: {
      projectType: { webapp: 3, crm: 6, automation: 7, documentation: 3, interne: 4, marketplace: 5, mobile: 3 },
      companySize: { solo: 10, small: 9, medium: 6, large: 3 },
      budget: { low: 10, medium: 8, high: 5 },
      urgency: { urgent: 8, normal: 9, long: 7 },
      features: { users: 5, automation: 7, crm: 6, documents: 2, payment: 8, dashboard: 5 },
    },
    pros: [
      "Plan gratuit très généreux",
      "Tout-en-un : tunnel, email, paiement, formation",
      "Interface simple et rapide",
      "Alternative française à ClickFunnels",
    ],
    cons: [
      "Moins flexible que des outils spécialisés",
      "Design limité comparé à Webflow",
      "Pas adapté aux besoins B2B complexes",
    ],
    idealFor: ["Solopreneurs", "Coaches et formateurs", "Tunnels de vente", "Webinaires et formations en ligne"],
    pricing: "Gratuit jusqu'à 2 000 contacts, puis à partir de ~27 €/mois",
    url: "https://systeme.io",
    jenniferLevel: "expert",
    showInTechPage: true,
    keywords: [
      "systeme.io", "tunnel de vente", "funnel", "page de capture", "landing page vente",
      "email marketing", "séquence email", "formation en ligne", "webinaire",
      "automatisation marketing", "inscription webinaire", "vente en ligne",
      "solopreneur", "coach", "formateur", "plateforme tout-en-un",
    ],
    avoidIf: [
      "Besoin d'un design très personnalisé",
      "Équipe commerciale avec CRM avancé nécessaire",
      "Application métier ou outil interne",
    ],
    watchouts: [
      "Structurer les listes de contacts et les tags dès le départ",
      "Tester les automations email avec un compte de test",
      "Vérifier la conformité RGPD des formulaires et emails",
      "Prévoir une page de confirmation et une séquence de bienvenue",
    ],
    firstStep: "Créer une page de capture simple avec un formulaire. Connecter une séquence email de 3 messages. Tester l'inscription et la réception des emails avant de publier.",
    stackWith: ["Make", "Notion", "Airtable"],
    alternatives: [
      "HubSpot si besoin d'un CRM marketing plus complet",
      "Webflow + Make si le design est prioritaire",
      "ClickFunnels si déjà familier avec l'écosystème US",
    ],
  },
  {
    id: 'stripe',
    name: 'Stripe',
    category: 'payments',
    categoryLabel: 'Paiements en ligne',
    description:
      "La référence mondiale des paiements en ligne. Intégration simple et sécurisée pour accepter des paiements, gérer des abonnements et automatiser la facturation dans vos outils no-code.",
    icon: '💳',
    colorClass: 'text-blue-700',
    bgClass: 'bg-blue-50',
    jenniferProjects: [
      "Intégration de paiements dans des applications Bubble",
      "Gestion d'abonnements no-code via Stripe + Make",
      "Tunnels de vente avec paiement Stripe + Systeme.io",
    ],
    scores: {
      projectType: { webapp: 8, crm: 3, automation: 5, documentation: 0, interne: 3, marketplace: 9, mobile: 6 },
      companySize: { solo: 9, small: 9, medium: 8, large: 7 },
      budget: { low: 7, medium: 9, high: 8 },
      urgency: { urgent: 8, normal: 9, long: 7 },
      features: { users: 5, automation: 6, crm: 3, documents: 2, payment: 10, dashboard: 5 },
    },
    pros: [
      "Référence mondiale, confiance maximale",
      "APIs très bien documentées",
      "Gestion d'abonnements intégrée",
      "Tableau de bord complet",
    ],
    cons: [
      "Commission par transaction (1,4 % + 0,25 € pour cartes EU)",
      "Nécessite une intégration technique ou un outil no-code compatible",
      "Vérification d'identité (KYC) parfois longue",
    ],
    idealFor: ["Paiements en ligne", "Abonnements SaaS", "Marketplaces", "E-commerce no-code"],
    pricing: "Gratuit + commission de 1,4 % + 0,25 € par transaction (cartes européennes)",
    url: "https://stripe.com",
    jenniferLevel: "expert",
    showInTechPage: true,
    logoUrl: '/logo_outils/stripe.png',
    keywords: [
      "paiement", "stripe", "facturation", "abonnement", "subscription", "checkout",
      "cb", "carte bancaire", "e-commerce", "vente en ligne", "commission",
      "marketplace paiement", "stripe checkout", "stripe billing",
    ],
    avoidIf: [
      "Aucun paiement nécessaire dans le projet",
      "Budget très serré où les commissions sont rédhibitoires",
      "Contexte nécessitant un prestataire de paiement agréé ACPR",
    ],
    watchouts: [
      "Vérifier les taux de commission selon le pays et le type de carte",
      "Prévoir la conformité PCI DSS pour les formulaires de paiement",
      "Configurer Stripe Radar pour prévenir la fraude",
      "Tester le flux de paiement en mode test avant la mise en production",
    ],
    firstStep: "Créer un compte Stripe, configurer un produit ou un prix. Tester une transaction en mode test depuis Bubble ou Make avant de passer en production.",
    stackWith: ["Bubble", "Make", "Airtable", "Systeme.io"],
    alternatives: [
      "PayPlug si préférence pour un acteur français certifié",
      "Mollie si besoin européen multi-devises",
      "Systeme.io inclut un module paiement si le projet est simple",
    ],
  },
];

export const categoryLabels: Record<TechCategory, string> = {
  'no-code': 'No-Code',
  automation: 'Automatisation',
  crm: 'CRM',
  documentation: 'Documentation',
  signature: 'Signature',
  'ai-dev': 'Dev IA',
  payments: 'Paiements',
};

export const jenniferTools = [
  'Bubble',
  'Airtable',
  'Make',
  'Notion',
  'Salesforce',
  'SharePoint',
  'Power Automate',
  'DocuSign',
  'Claude Code',
];
