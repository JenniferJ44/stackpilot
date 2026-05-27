import { GuidedAnswers } from './guidedScoring';

export type Choice = {
  value: string;
  label: string;
  icon?: string;
};

export type FlowStep = {
  id: string;
  field: keyof GuidedAnswers;
  question: string | ((a: Partial<GuidedAnswers>) => string);
  preMessage?: string;
  choices?: Choice[] | ((a: Partial<GuidedAnswers>) => Choice[]);
  inputType: 'single' | 'multi' | 'textarea';
  optional?: boolean;
  skip?: (a: Partial<GuidedAnswers>) => boolean;
  thinkingMs?: number;
};

const isLanding = (a: Partial<GuidedAnswers>) => a.projectCategory === 'landing';
const isAutomation = (a: Partial<GuidedAnswers>) => a.projectCategory === 'automation';
const isDocs = (a: Partial<GuidedAnswers>) => a.projectCategory === 'docs';
const isGed = (a: Partial<GuidedAnswers>) => a.projectCategory === 'ged';
const isSimple = (a: Partial<GuidedAnswers>) =>
  isLanding(a) || isAutomation(a) || isDocs(a) || isGed(a);

export const FLOW_STEPS: FlowStep[] = [
  // ── 1. Type de projet ────────────────────────────────────────────────────
  {
    id: 'projectCategory',
    field: 'projectCategory',
    question: "Bonjour ! 👋 Pour commencer, quelle est la nature de votre projet ?",
    inputType: 'single',
    thinkingMs: 650,
    choices: [
      { value: 'app',        label: 'Application web / métier',      icon: '🌐' },
      { value: 'automation', label: 'Automatisation',                 icon: '⚡' },
      { value: 'crm',        label: 'CRM / Gestion clients',          icon: '📊' },
      { value: 'docs',       label: 'Documentation / wiki',           icon: '📚' },
      { value: 'ged',        label: 'Gestion documentaire',           icon: '📁' },
      { value: 'landing',    label: 'Site vitrine / landing page',    icon: '🌍' },
      { value: 'unknown',    label: 'Je ne sais pas encore',          icon: '💭' },
    ],
  },

  // ── 1a. Sous-type app ────────────────────────────────────────────────────
  {
    id: 'appSubtype',
    field: 'appSubtype',
    question: "Quel type d'application souhaitez-vous créer ?",
    preMessage: "Je vois, c'est une application. Quel type exactement ?",
    inputType: 'single',
    thinkingMs: 700,
    skip: (a) => a.projectCategory !== 'app',
    choices: [
      { value: 'saas',          label: 'SaaS',                    icon: '🚀' },
      { value: 'marketplace',   label: 'Marketplace',             icon: '🛒' },
      { value: 'client-portal', label: 'Espace client',           icon: '🔐' },
      { value: 'internal-tool', label: 'Outil interne métier',    icon: '🏢' },
      { value: 'mobile',        label: 'Application mobile',      icon: '📱' },
      { value: 'unknown',       label: 'Autre / je ne sais pas',  icon: '💭' },
    ],
  },

  // ── 1b. Sous-type docs ───────────────────────────────────────────────────
  {
    id: 'docsSubtype',
    field: 'docsSubtype',
    question: "Quel type de documentation souhaitez-vous créer ?",
    preMessage: "Très bien, parlons de votre documentation.",
    inputType: 'single',
    thinkingMs: 600,
    skip: (a) => a.projectCategory !== 'docs',
    choices: [
      { value: 'knowledge-base', label: 'Base de connaissances',        icon: '🗂️' },
      { value: 'wiki',           label: 'Wiki interne',                 icon: '📖' },
      { value: 'onboarding',     label: 'Onboarding / formation',       icon: '🎓' },
      { value: 'procedures',     label: 'Procédures opérationnelles',   icon: '📋' },
      { value: 'project-docs',   label: 'Documentation projet',         icon: '🗃️' },
    ],
  },

  // ── 1c. GED — Microsoft 365 ──────────────────────────────────────────────
  {
    id: 'hasMicrosoft365',
    field: 'hasMicrosoft365',
    question: "Utilisez-vous déjà Microsoft 365 dans votre organisation ?",
    preMessage: "Votre environnement technique influencera la recommandation.",
    inputType: 'single',
    thinkingMs: 600,
    skip: (a) => a.projectCategory !== 'ged',
    choices: [
      { value: 'yes',     label: 'Oui, Microsoft 365',  icon: '🔷' },
      { value: 'no',      label: 'Non',                  icon: '—'  },
      { value: 'unknown', label: 'Je ne sais pas',       icon: '💭' },
    ],
  },

  // ── 2. Objectif principal ────────────────────────────────────────────────
  {
    id: 'mainObjective',
    field: 'mainObjective',
    question: "Quel est l'objectif principal de ce projet ?",
    preMessage: "D'accord, je vois.",
    inputType: 'single',
    thinkingMs: 800,
    choices: [
      { value: 'save-time',     label: 'Gagner du temps sur des tâches répétitives',    icon: '⏱️' },
      { value: 'sell-book',     label: 'Vendre un service ou réserver en ligne',         icon: '💰' },
      { value: 'manage-clients',label: 'Gérer des clients ou des prospects',             icon: '👥' },
      { value: 'centralize',    label: 'Centraliser des informations ou documents',      icon: '📄' },
      { value: 'secure-space',  label: 'Créer un espace sécurisé pour des utilisateurs',icon: '🔐' },
      { value: 'test-idea',     label: 'Tester rapidement une idée de produit',          icon: '🧪' },
    ],
  },

  // ── 3. Comptes utilisateurs ───────────────────────────────────────────────
  {
    id: 'userAccounts',
    field: 'userAccounts',
    question: "Y aura-t-il des comptes utilisateurs dans ce projet ?",
    preMessage: "Très bien, je précise le besoin.",
    inputType: 'single',
    thinkingMs: 700,
    skip: (a) => ['landing', 'automation', 'ged', 'docs'].includes(a.projectCategory ?? ''),
    choices: [
      { value: 'none',       label: 'Non, pas de comptes utilisateurs' },
      { value: 'simple',     label: 'Oui, comptes simples (login basique)' },
      { value: 'multi-role', label: 'Oui, plusieurs rôles distincts' },
      { value: 'secure',     label: 'Oui, espace sécurisé (client / partenaire)' },
      { value: 'unknown',    label: 'Je ne sais pas encore' },
    ],
  },

  // ── 4. Fonctionnalités (multi-sélection) ─────────────────────────────────
  {
    id: 'selectedFeatures',
    field: 'selectedFeatures',
    question: (a) => {
      if (a.projectCategory === 'automation') return "Quel(s) type(s) d'automatisation souhaitez-vous ?";
      if (a.projectCategory === 'ged') return "Quelles fonctionnalités documentaires vous intéressent ?";
      if (a.projectCategory === 'landing') return "Quelles fonctionnalités souhaitez-vous sur ce site ?";
      return "Quelles fonctionnalités souhaitez-vous intégrer ? (plusieurs choix possibles)";
    },
    preMessage: "Décrivons maintenant les fonctionnalités attendues.",
    inputType: 'multi',
    optional: true,
    thinkingMs: 700,
    choices: (a) => {
      if (a.projectCategory === 'automation') {
        return [
          { value: 'auto-email',   label: 'Emails automatiques / notifications', icon: '📧' },
          { value: 'auto-sync',    label: 'Synchronisation entre outils',        icon: '🔄' },
          { value: 'auto-complex', label: 'Workflows complexes multi-étapes',    icon: '⚙️' },
          { value: 'other',        label: 'Autre',                               icon: '➕' },
        ];
      }
      if (a.projectCategory === 'ged') {
        return [
          { value: 'doc-storage',  label: 'Stockage et consultation',           icon: '📂' },
          { value: 'doc-workflow', label: "Workflow d'approbation",              icon: '✅' },
          { value: 'signature',    label: 'Signature électronique',             icon: '✍️' },
          { value: 'reporting',    label: 'Tableaux de bord / reporting',       icon: '📊' },
          { value: 'auto-sync',    label: 'Synchronisation avec outils tiers',  icon: '🔄' },
          { value: 'other',        label: 'Autre',                              icon: '➕' },
        ];
      }
      if (a.projectCategory === 'docs') {
        return [
          { value: 'doc-storage',      label: 'Stockage de fichiers joints',     icon: '📂' },
          { value: 'notifications',    label: 'Notifications / alertes',         icon: '🔔' },
          { value: 'reporting',        label: 'Suivi statistiques de lecture',   icon: '📊' },
          { value: 'auto-sync',        label: 'Synchronisation avec outils',     icon: '🔄' },
          { value: 'custom-interface', label: 'Interface sur-mesure',            icon: '🎨' },
          { value: 'other',            label: 'Autre',                           icon: '➕' },
        ];
      }
      if (a.projectCategory === 'landing') {
        return [
          { value: 'booking',       label: 'Réservation / prise de RDV',        icon: '📅' },
          { value: 'payment',       label: 'Paiement en ligne',                  icon: '💳' },
          { value: 'notifications', label: 'Formulaire de contact / alertes',    icon: '📩' },
          { value: 'auto-email',    label: 'Emails automatiques',                icon: '📧' },
          { value: 'other',         label: 'Autre',                              icon: '➕' },
        ];
      }
      if (a.projectCategory === 'crm') {
        return [
          { value: 'auto-email',    label: 'Emails automatiques / relances',    icon: '📧' },
          { value: 'auto-sync',     label: 'Synchronisation entre outils',      icon: '🔄' },
          { value: 'reporting',     label: 'Tableaux de bord / reporting',      icon: '📊' },
          { value: 'doc-storage',   label: 'Stockage de documents',             icon: '📂' },
          { value: 'notifications', label: 'Notifications / alertes',           icon: '🔔' },
          { value: 'user-roles',    label: 'Rôles et permissions avancés',      icon: '🔑' },
          { value: 'other',         label: 'Autre',                             icon: '➕' },
        ];
      }
      // app, unknown, other — ensemble complet
      return [
        { value: 'payment',             label: 'Paiement en ligne',                  icon: '💳' },
        { value: 'subscription',        label: 'Abonnements récurrents',             icon: '🔁' },
        { value: 'marketplace-payment', label: 'Transactions entre utilisateurs',    icon: '🤝' },
        { value: 'auto-email',          label: 'Emails automatiques / relances',     icon: '📧' },
        { value: 'auto-sync',           label: 'Synchronisation entre outils',       icon: '🔄' },
        { value: 'auto-complex',        label: 'Workflows complexes',                icon: '⚙️' },
        { value: 'doc-storage',         label: 'Stockage de documents',              icon: '📂' },
        { value: 'signature',           label: 'Signature électronique',             icon: '✍️' },
        { value: 'reporting',           label: 'Tableaux de bord / reporting',       icon: '📊' },
        { value: 'user-roles',          label: 'Rôles et permissions avancés',       icon: '🔑' },
        { value: 'notifications',       label: 'Notifications / alertes',            icon: '🔔' },
        { value: 'booking',             label: 'Réservation / agenda',               icon: '📅' },
        { value: 'other',               label: 'Autre',                              icon: '➕' },
      ];
    },
  },

  // ── 5. Types de données (multi-sélection) ────────────────────────────────
  {
    id: 'dataTypes',
    field: 'dataTypes',
    question: "Quels types de données allez-vous gérer ? (plusieurs choix possibles)",
    preMessage: "Merci, je précise le diagnostic.",
    inputType: 'multi',
    optional: true,
    thinkingMs: 700,
    skip: (a) => ['landing', 'automation'].includes(a.projectCategory ?? ''),
    choices: [
      { value: 'clients',   label: 'Clients / prospects',       icon: '👥' },
      { value: 'users',     label: 'Utilisateurs',              icon: '🧑' },
      { value: 'products',  label: 'Produits / services',       icon: '📦' },
      { value: 'documents', label: 'Documents / fichiers',      icon: '📄' },
      { value: 'bookings',  label: 'Réservations / événements', icon: '📅' },
      { value: 'content',   label: 'Contenus éditoriaux',       icon: '✏️' },
      { value: 'financial', label: 'Données financières',       icon: '💰' },
      { value: 'other',     label: 'Autre',                     icon: '➕' },
    ],
  },

  // ── 9. Volume de données ──────────────────────────────────────────────────
  {
    id: 'dataVolume',
    field: 'dataVolume',
    question: "Quel volume de données prévoyez-vous au départ ?",
    inputType: 'single',
    thinkingMs: 500,
    skip: (a) => ['landing', 'automation'].includes(a.projectCategory ?? ''),
    choices: [
      { value: 'low',     label: 'Faible — moins de 500 éléments' },
      { value: 'medium',  label: 'Moyen — 500 à 10 000 éléments' },
      { value: 'high',    label: 'Important — plus de 10 000 éléments' },
      { value: 'unknown', label: 'Je ne sais pas' },
    ],
  },

  // ── 10. Données sensibles ─────────────────────────────────────────────────
  {
    id: 'dataSensitive',
    field: 'dataSensitive',
    question: "Ces données sont-elles sensibles ou confidentielles ?",
    inputType: 'single',
    thinkingMs: 600,
    skip: (a) => ['landing', 'automation'].includes(a.projectCategory ?? ''),
    choices: [
      { value: 'no',      label: 'Non, données standard' },
      { value: 'yes',     label: 'Oui, données sensibles ou personnelles' },
      { value: 'unknown', label: 'Je ne sais pas' },
    ],
  },

  // ── 11. Outils existants (multi-sélection) ───────────────────────────────
  {
    id: 'existingTools',
    field: 'existingTools',
    question: "Quels outils utilisez-vous déjà dans votre organisation ?",
    preMessage: "Encore quelques questions sur votre contexte.",
    inputType: 'multi',
    optional: true,
    thinkingMs: 700,
    choices: [
      { value: 'none',         label: "Aucun outil structurant pour l'instant",  icon: '—'  },
      { value: 'google',       label: 'Google Workspace / Google Sheets',        icon: '🟢' },
      { value: 'microsoft365', label: 'Microsoft 365 / Teams / Outlook',         icon: '🔷' },
      { value: 'sharepoint',   label: 'SharePoint',                              icon: '📁' },
      { value: 'notion',       label: 'Notion',                                  icon: '⬛' },
      { value: 'airtable',     label: 'Airtable',                                icon: '🟡' },
      { value: 'salesforce',   label: 'Salesforce',                              icon: '☁️' },
      { value: 'hubspot',      label: 'HubSpot',                                 icon: '🟠' },
      { value: 'bubble',       label: 'Bubble',                                  icon: '🔵' },
      { value: 'cms',          label: 'WordPress / Webflow / Framer',            icon: '🌐' },
      { value: 'stripe',       label: 'Stripe',                                  icon: '💳' },
      { value: 'docusign',     label: 'DocuSign / outil de signature',           icon: '✍️' },
      { value: 'other',        label: 'Autre',                                   icon: '➕' },
    ],
  },

  // ── 11a. Connexions entre outils (multi-sélection) ────────────────────────
  {
    id: 'toolConnections',
    field: 'toolConnections',
    question: "Avez-vous déjà identifié des connexions nécessaires entre vos outils ?",
    inputType: 'multi',
    optional: true,
    thinkingMs: 600,
    skip: (a) => ['docs', 'ged', 'landing'].includes(a.projectCategory ?? ''),
    choices: [
      { value: 'form-db',        label: 'Formulaire vers base de données',          icon: '📋' },
      { value: 'web-crm',        label: 'Site web vers CRM',                        icon: '🌐' },
      { value: 'crm-signature',  label: 'CRM vers outil de signature',              icon: '✍️' },
      { value: 'payment-invoice',label: 'Paiement vers facture / notification',     icon: '💳' },
      { value: 'internal-email', label: 'Outil interne vers email / notification',  icon: '📧' },
      { value: 'docs-storage',   label: 'Documents vers espace de stockage',        icon: '📂' },
      { value: 'db-sync',        label: 'Synchronisation entre plusieurs bases',    icon: '🔄' },
      { value: 'unknown',        label: 'Je ne sais pas encore',                    icon: '💭' },
      { value: 'none',           label: 'Aucune connexion identifiée',              icon: '—'  },
      { value: 'other',          label: 'Autre',                                    icon: '➕' },
    ],
  },

  // ── 11b. CRM central (si Salesforce ou HubSpot sélectionné) ──────────────
  {
    id: 'crmIsCentral',
    field: 'crmIsCentral',
    question: "Ce CRM est-il au cœur de votre organisation commerciale ?",
    inputType: 'single',
    thinkingMs: 600,
    skip: (a) => {
      const t = a.existingTools ?? [];
      return !t.includes('salesforce') && !t.includes('hubspot') &&
        a.existingToolset !== 'salesforce-hubspot';
    },
    choices: [
      { value: 'yes',     label: "Oui, toute l'activité commerciale passe par lui" },
      { value: 'no',      label: 'Non, utilisation partielle ou en cours' },
      { value: 'unknown', label: 'Je ne sais pas' },
    ],
  },

  // ── (legacy — toujours sautées, conservées pour compatibilité) ────────────
  {
    id: 'hasSharepointTeams',
    field: 'hasSharepointTeams',
    question: '',
    inputType: 'single',
    skip: () => true,
    choices: [],
  },
  {
    id: 'existingDataInTool',
    field: 'existingDataInTool',
    question: '',
    inputType: 'single',
    skip: () => true,
    choices: [],
  },

  // ── 12. Priorité ──────────────────────────────────────────────────────────
  {
    id: 'mainPriority',
    field: 'mainPriority',
    question: "Quelle est votre priorité principale pour ce projet ?",
    preMessage: "Parfait, j'ai presque toutes les infos. Quelques dernières questions.",
    inputType: 'single',
    thinkingMs: 800,
    choices: [
      { value: 'test-quick',     label: 'Tester vite',                     icon: '🚀' },
      { value: 'simple',         label: 'Rester simple et accessible',      icon: '✅' },
      { value: 'build-properly', label: 'Construire proprement',            icon: '🏗️' },
      { value: 'robust',         label: 'Priorité robustesse et sécurité',  icon: '🔒' },
    ],
  },

  // ── 13. Délai ─────────────────────────────────────────────────────────────
  {
    id: 'timeline',
    field: 'timeline',
    question: "Quel est votre délai souhaité pour un premier livrable ?",
    inputType: 'single',
    thinkingMs: 600,
    choices: [
      { value: 'days',       label: 'Quelques jours',    icon: '🚀' },
      { value: '1-2weeks',   label: '1 à 2 semaines',    icon: '⚡' },
      { value: '3-6weeks',   label: '3 à 6 semaines',    icon: '📅' },
      { value: '2-3months',  label: '2 à 3 mois',        icon: '🗓️' },
      { value: 'no-urgency', label: "Pas d'urgence",     icon: '🌱' },
    ],
  },

  // ── 14. Budget ────────────────────────────────────────────────────────────
  {
    id: 'budget',
    field: 'budget',
    question: "Quel est votre budget mensuel estimé pour les outils ?",
    inputType: 'single',
    thinkingMs: 700,
    choices: [
      { value: 'very-limited', label: 'Très limité — gratuit ou < 50 €/mois' },
      { value: 'moderate',     label: 'Modéré — 50 à 500 €/mois' },
      { value: 'comfortable',  label: 'Confortable — 500 €/mois et plus' },
      { value: 'tbd',          label: 'Non défini — à estimer' },
    ],
  },

  // ── 15. Maintenance ───────────────────────────────────────────────────────
  {
    id: 'maintenanceOwner',
    field: 'maintenanceOwner',
    question: "Qui maintiendra et fera évoluer l'outil après le lancement ?",
    preMessage: "Je vais maintenant affiner la recommandation.",
    inputType: 'single',
    thinkingMs: 700,
    choices: [
      { value: 'self',           label: 'Moi-même',                    icon: '🧑' },
      { value: 'non-tech-team',  label: 'Une équipe non technique',    icon: '👥' },
      { value: 'internal-admin', label: 'Un administrateur interne',   icon: '🔑' },
      { value: 'external',       label: 'Un prestataire externe',      icon: '🤝' },
      { value: 'unknown',        label: 'Je ne sais pas encore',       icon: '💭' },
    ],
  },

  // ── 16. Autonomie ─────────────────────────────────────────────────────────
  {
    id: 'autonomyLevel',
    field: 'autonomyLevel',
    question: "Quel niveau d'autonomie souhaitez-vous sur l'outil au quotidien ?",
    inputType: 'single',
    thinkingMs: 800,
    choices: [
      { value: 'content',    label: 'Modifier les contenus uniquement' },
      { value: 'data',       label: 'Gérer les données (ajout, modification, export)' },
      { value: 'simple',     label: 'Un outil simple à maintenir' },
      { value: 'robustness', label: 'Priorité robustesse, même si plus technique' },
      { value: 'unknown',    label: 'Je ne sais pas encore' },
    ],
  },

  // ── 17. Précisions ────────────────────────────────────────────────────────
  {
    id: 'additionalContext',
    field: 'additionalContext',
    question: "Souhaitez-vous ajouter une précision sur votre projet ?",
    preMessage: "Parfait, j'ai ce qu'il me faut ! 🎯",
    inputType: 'textarea',
    optional: true,
    thinkingMs: 1300,
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function findNextStep(
  currentId: string,
  answers: Partial<GuidedAnswers>
): FlowStep | null {
  const idx = FLOW_STEPS.findIndex((s) => s.id === currentId);
  for (let i = idx + 1; i < FLOW_STEPS.length; i++) {
    const s = FLOW_STEPS[i];
    if (!s.skip || !s.skip(answers)) return s;
  }
  return null;
}

export function resolveChoices(
  step: FlowStep,
  answers: Partial<GuidedAnswers>
): Choice[] {
  if (!step.choices) return [];
  return typeof step.choices === 'function' ? step.choices(answers) : step.choices;
}

export function resolveQuestion(
  step: FlowStep,
  answers: Partial<GuidedAnswers>
): string {
  return typeof step.question === 'function' ? step.question(answers) : step.question;
}
