import { GuidedRecommendation } from '@/lib/guidedScoring';

// ─── Roadmap ──────────────────────────────────────────────────────────────────

export type RoadmapStep = {
  phase: string;
  title: string;
  duration: string;
  items: string[];
};

export const DEFAULT_ROADMAP: RoadmapStep[] = [
  {
    phase: '01',
    title: 'Cadrage & architecture',
    duration: '1–2 semaines',
    items: [
      'Définition des écrans et parcours utilisateur clés',
      'Choix des outils et connexions confirmés',
      'Structure de données + règles métier',
    ],
  },
  {
    phase: '02',
    title: 'Construction du MVP',
    duration: '3–6 semaines',
    items: [
      'Mise en place de la base de données',
      'Développement des fonctionnalités prioritaires',
      'Intégrations essentielles',
    ],
  },
  {
    phase: '03',
    title: 'Tests & ajustements',
    duration: '1–2 semaines',
    items: [
      'Tests utilisateurs sur les parcours clés',
      'Corrections et ajustements UX',
      'Validation des données et automatisations',
    ],
  },
  {
    phase: '04',
    title: 'Mise en production',
    duration: '1 semaine',
    items: [
      'Déploiement et configuration des accès',
      'Formation des utilisateurs si besoin',
      'Documentation et transfert',
    ],
  },
  {
    phase: '05',
    title: 'Itérations post-lancement',
    duration: 'Continu',
    items: [
      'Retours utilisateurs et priorisation',
      'Évolutions fonctionnelles V2',
      'Optimisation des automatisations',
    ],
  },
];

// ─── Estimation ───────────────────────────────────────────────────────────────

export type EstimationBlock = {
  label: string;
  range: string;
};

export type Estimation = {
  blocks: EstimationBlock[];
  total: string;
  note: string;
};

const ESTIMATION_BUBBLE: Estimation = {
  blocks: [
    { label: 'Cadrage & architecture', range: '1–2 j' },
    { label: 'Base de données & logique', range: '2–4 j' },
    { label: 'Interfaces & parcours', range: '3–6 j' },
    { label: 'Automatisations & API', range: '1–3 j' },
    { label: 'Tests & mise en ligne', range: '1–2 j' },
  ],
  total: '8–17 jours',
  note: 'Estimation indicative pour un MVP Bubble. Varie selon le périmètre exact et les intégrations.',
};

const ESTIMATION_MAKE: Estimation = {
  blocks: [
    { label: 'Cadrage & mapping des flux', range: '0.5–1 j' },
    { label: 'Connexion des outils', range: '1–2 j' },
    { label: 'Construction des scénarios', range: '1–3 j' },
    { label: 'Tests & validation', range: '0.5–1 j' },
  ],
  total: '3–7 jours',
  note: "Estimation pour une automatisation Make. Dépend du nombre de scénarios et de la complexité des flux.",
};

const ESTIMATION_POWER_AUTOMATE: Estimation = {
  blocks: [
    { label: 'Cadrage & analyse des flux', range: '0.5–1 j' },
    { label: 'Configuration Power Automate', range: '1–3 j' },
    { label: 'Intégrations Microsoft 365', range: '1–2 j' },
    { label: 'Tests & validation', range: '0.5–1 j' },
  ],
  total: '3–7 jours',
  note: "Estimation pour un projet Power Automate dans l'écosystème Microsoft 365.",
};

const ESTIMATION_AIRTABLE: Estimation = {
  blocks: [
    { label: 'Cadrage & structure de données', range: '0.5–1 j' },
    { label: 'Construction des bases', range: '1–2 j' },
    { label: 'Vues & interfaces', range: '1–2 j' },
    { label: 'Automatisations & tests', range: '0.5–1 j' },
  ],
  total: '3–6 jours',
  note: "Estimation pour un projet Airtable. Varie selon le nombre de tables et de vues.",
};

const ESTIMATION_NOTION: Estimation = {
  blocks: [
    { label: 'Cadrage & architecture', range: '0.5 j' },
    { label: 'Création des espaces', range: '0.5–1 j' },
    { label: 'Bases de données & relations', range: '1–2 j' },
    { label: 'Tests & formation', range: '0.5 j' },
  ],
  total: '2.5–4.5 jours',
  note: "Estimation pour un projet Notion. Varie selon la complexité de l'arborescence.",
};

const ESTIMATION_SHAREPOINT: Estimation = {
  blocks: [
    { label: 'Cadrage & arborescence', range: '1 j' },
    { label: 'Configuration SharePoint', range: '1–3 j' },
    { label: 'Permissions & accès', range: '0.5–1 j' },
    { label: 'Tests & formation', range: '0.5–1 j' },
  ],
  total: '3–6 jours',
  note: "Estimation pour un projet SharePoint. Dépend du volume documentaire et des intégrations Teams.",
};

const ESTIMATION_DEFAULT: Estimation = {
  blocks: [
    { label: 'Cadrage & architecture', range: '1–2 j' },
    { label: 'Développement des fonctionnalités', range: '3–8 j' },
    { label: 'Intégrations & automatisations', range: '1–3 j' },
    { label: 'Tests & mise en ligne', range: '1–2 j' },
  ],
  total: '6–15 jours',
  note: "Estimation indicative. Le cadrage permettra d'affiner ce chiffrage selon votre périmètre exact.",
};

const ESTIMATION_MAP: Record<string, Estimation> = {
  bubble: ESTIMATION_BUBBLE,
  make: ESTIMATION_MAKE,
  'power-automate': ESTIMATION_POWER_AUTOMATE,
  airtable: ESTIMATION_AIRTABLE,
  notion: ESTIMATION_NOTION,
  sharepoint: ESTIMATION_SHAREPOINT,
};

export function getEstimation(primaryTechId: string): Estimation {
  return ESTIMATION_MAP[primaryTechId.toLowerCase()] ?? ESTIMATION_DEFAULT;
}

// ─── Related projects ─────────────────────────────────────────────────────────

export type RelatedProject = {
  title: string;
  description: string;
  tags: string[];
  slug: string | null;
};

const RELATED_BUBBLE: RelatedProject[] = [
  {
    title: 'Orientix',
    description: "Plateforme d'orientation scolaire avec espace élève, formulaire de profil et recommandations personnalisées.",
    tags: ['Bubble', 'Application web', 'SaaS'],
    slug: 'orientix',
  },
  {
    title: 'CabinetFlow',
    description: "Outil métier de gestion de factures avec formulaire guidé et structure de données clients.",
    tags: ['Outil interne', 'Facturation', 'Formulaire'],
    slug: 'cabinetflow',
  },
];

const RELATED_MAKE: RelatedProject[] = [
  {
    title: "Tunnel d'inscription à des webinaires",
    description: "Scénario Make automatisant l'inscription, la confirmation SMS/email via Twilio et la synchronisation Google Sheets.",
    tags: ['Make', 'Automatisation', 'Webhooks', 'Emailing'],
    slug: 'webinaire-make',
  },
  {
    title: 'Automatisation onboarding client',
    description: "Flux Make connectant Typeform, Notion et Gmail pour déclencher un onboarding complet à chaque nouveau client.",
    tags: ['Make', 'Automatisation', 'Email'],
    slug: null,
  },
];

const RELATED_POWER_AUTOMATE: RelatedProject[] = [
  {
    title: "Circuit d'approbation documentaire",
    description: "Workflow Power Automate intégré à SharePoint et Teams pour valider des documents avant publication.",
    tags: ['Power Automate', 'SharePoint', 'Microsoft 365'],
    slug: null,
  },
  {
    title: 'Alertes et reporting automatique',
    description: "Flux déclenchant des emails et rapports Excel à partir de données SharePoint mises à jour.",
    tags: ['Power Automate', 'Excel', 'Email'],
    slug: null,
  },
];

const RELATED_AIRTABLE: RelatedProject[] = [
  {
    title: 'CRM no-code sur Airtable',
    description: "Base de gestion clients avec suivi des opportunités, relances automatisées et vues par statut.",
    tags: ['Airtable', 'CRM', 'No-code'],
    slug: null,
  },
  {
    title: 'Gestion de projets interne',
    description: "Outil de suivi de projets multiples avec tableaux Kanban, timeline et interfaces par rôle.",
    tags: ['Airtable', 'Gestion de projet', 'Interface'],
    slug: null,
  },
];

const RELATED_NOTION: RelatedProject[] = [
  {
    title: 'Base de connaissances équipe',
    description: "Wiki interne structuré sur Notion avec arborescence par département et moteur de recherche.",
    tags: ['Notion', 'Documentation', 'Wiki'],
    slug: null,
  },
  {
    title: "Espace client d'onboarding",
    description: "Portail Notion partagé pour accompagner les nouveaux clients avec ressources et checklist.",
    tags: ['Notion', 'Onboarding', 'Client'],
    slug: null,
  },
];

const RELATED_SHAREPOINT: RelatedProject[] = [
  {
    title: 'GED multi-services',
    description: "Gestion documentaire sur SharePoint avec métadonnées, permissions par équipe et historique des versions.",
    tags: ['SharePoint', 'GED', 'Microsoft 365'],
    slug: null,
  },
  {
    title: 'Intranet documentaire',
    description: "Site SharePoint structuré pour centraliser procédures, modèles et ressources RH.",
    tags: ['SharePoint', 'Intranet', 'RH'],
    slug: null,
  },
];

const RELATED_MAP: Record<string, RelatedProject[]> = {
  bubble: RELATED_BUBBLE,
  make: RELATED_MAKE,
  'power-automate': RELATED_POWER_AUTOMATE,
  airtable: RELATED_AIRTABLE,
  notion: RELATED_NOTION,
  sharepoint: RELATED_SHAREPOINT,
};

export function getRelatedProjects(techStack: GuidedRecommendation['techStack']): RelatedProject[] {
  const primaryId = techStack.find((t) => t.necessity === 'primary')?.name?.toLowerCase().replace(/\s+/g, '-') ?? '';
  return RELATED_MAP[primaryId] ?? RELATED_BUBBLE;
}

// ─── Service options ──────────────────────────────────────────────────────────

export type ServiceOption = {
  id: string;
  icon: string;
  title: string;
  description: string;
  ideal: string;
  cta: string;
};

export const SERVICE_OPTIONS: ServiceOption[] = [
  {
    id: 'cadrage',
    icon: '🗺️',
    title: 'Session de cadrage',
    description: "Un échange de 60–90 min pour transformer votre besoin en architecture concrète, avec une feuille de route actionnable.",
    ideal: "Idéal si vous voulez clarifier avant d'investir.",
    cta: 'Réserver un appel',
  },
  {
    id: 'mvp',
    icon: '🚀',
    title: 'Construire le MVP',
    description: "Je construis votre première version fonctionnelle, de l'architecture à la mise en ligne, selon la stack recommandée.",
    ideal: "Idéal pour aller vite avec quelqu'un qui connaît les outils.",
    cta: 'Demander un devis',
  },
  {
    id: 'accompagnement',
    icon: '🤝',
    title: 'Accompagnement continu',
    description: "Je reste aux côtés de votre équipe pour les évolutions, la maintenance et l'optimisation de votre outil dans le temps.",
    ideal: "Idéal si vous avez besoin d'un partenaire technique durable.",
    cta: 'En savoir plus',
  },
  {
    id: 'formation',
    icon: '🎓',
    title: 'Formation & transfert',
    description: "Je forme vos équipes à l'outil construit pour qu'elles puissent le piloter et l'évoluer en autonomie.",
    ideal: "Idéal si vous voulez gérer l'outil en interne après livraison.",
    cta: 'Discutons-en',
  },
];
