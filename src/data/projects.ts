export type GalleryItem = {
  url: string;
  title: string;
  description: string;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  type: string;
  status: string;
  shortDescription: string;
  description: string;
  problem: string;
  solution: string;
  features: string[];
  stack: string[];
  role: string;
  tags: string[];
  mainImage: string;
  gallery: string[];
  galleryItems?: GalleryItem[];
  technicalImage?: string;
  associatedTechnologies: string[];
};

export const projects: Project[] = [
  {
    id: 'cabinetflow',
    slug: 'cabinetflow',
    title: 'CabinetFlow',
    type: 'No-code · Application métier',
    status: 'Projet portfolio',
    shortDescription:
      "Application de gestion tout-en-un pour cabinet : clients, rendez-vous, comptes-rendus, facturation et tableau de bord.",
    description:
      "CabinetFlow est un prototype d'outil métier conçu pour accompagner une activité de service dans la gestion de ses documents administratifs, notamment la création de factures. L'objectif du projet est de transformer une tâche souvent répétitive et peu fluide en un parcours clair, guidé et structuré.\n\nL'interface permet à l'utilisateur de renseigner progressivement les informations nécessaires à la génération d'une facture : données client, prestations, montants, informations complémentaires et éléments de suivi. Le projet met l'accent sur la lisibilité, la simplicité d'utilisation et la réduction des erreurs de saisie.\n\nCe projet illustre ma capacité à concevoir des outils internes ou SaaS métier à partir d'un besoin opérationnel concret : clarifier un processus, structurer les données, créer une interface agréable et préparer une base solide pour l'automatisation.",
    problem:
      "Les petites structures ou activités de service utilisent souvent des fichiers dispersés, des modèles de documents manuels ou des outils peu adaptés à leurs processus internes. Cela peut entraîner des oublis, des erreurs de saisie, une perte de temps et un manque de visibilité sur le suivi administratif.",
    solution:
      "Créer une interface simple et guidée permettant de centraliser les informations nécessaires, de structurer la saisie et de préparer la génération de documents administratifs comme les factures.",
    features: [
      "Formulaire guidé de création de facture",
      "Interface claire pour la saisie des informations client",
      "Structuration des prestations et montants",
      "Parcours utilisateur simple et progressif",
      "Design sobre, professionnel et adapté à un usage métier",
      "Base fonctionnelle pouvant évoluer vers un outil SaaS interne",
      "Préparation possible à l'automatisation documentaire",
    ],
    stack: ['Claude Code', 'React', 'TypeScript', 'UI responsive', 'Logique formulaire', "Design d'outil métier"],
    role:
      "J'ai conçu l'interface, structuré le parcours de saisie, défini les informations clés à afficher et prototypé une expérience utilisateur adaptée à un outil métier simple, clair et efficace.",
    tags: ['No-code', 'Application métier', 'Dashboard', 'Facturation', 'Gestion cabinet'],
    mainImage: '/images/projects/cabinetflow-cover.png',
    gallery: ['/images/projects/cabinetflow-cover.png', '/projects/CabinetFlow.png', '/projects/CabinetFlow_Formulaire_Facture.png'],
    associatedTechnologies: ['bubble', 'claude-code', 'react', 'typescript'],
  },
  {
    id: 'orientix',
    slug: 'orientix',
    title: 'Orientix',
    type: "Mobile · Orientation",
    status: 'Application en test',
    shortDescription:
      "Application mobile d'orientation pour aider les jeunes à explorer des métiers, découvrir des formations et construire progressivement leur projet.",
    description:
      "Orientix est une application mobile pensée pour accompagner les lycéens dans la construction de leur projet d'orientation. L'application propose une progression par étapes afin d'aider l'utilisateur à explorer les métiers, découvrir les formations, créer des chemins d'orientation et choisir progressivement un projet cohérent.\n\nLe design a été pensé pour un public lycéen : visuel, moderne, rassurant et légèrement ludique. L'objectif est de rendre l'orientation moins anxiogène en transformant un sujet complexe en parcours guidé. Chaque étape est présentée sous forme de carte avec un statut de progression, afin que l'utilisateur sache où il en est et ce qu'il peut faire ensuite.\n\nCe projet illustre une réflexion produit complète : définition du parcours utilisateur, logique de progression, gamification légère, exploration de données métiers/formations et adaptation de l'expérience à un public jeune.",
    problem:
      "L'orientation scolaire peut être perçue comme complexe, floue et stressante par les lycéens. Les informations sont nombreuses, dispersées et souvent difficiles à relier entre elles : métiers, formations, spécialités, établissements, poursuites d'études et débouchés.",
    solution:
      "Créer une application mobile progressive qui guide l'élève étape par étape, en lui permettant d'explorer les possibilités, de construire des chemins d'orientation et de suivre sa progression dans une interface claire et motivante.",
    features: [
      "Accueil personnalisé avec prénom utilisateur",
      "Parcours d'orientation par étapes",
      "Exploration des métiers",
      "Exploration des formations",
      "Création de chemins d'orientation",
      "Choix progressif du projet",
      "Cartes de progression avec statuts",
      "Interface mobile moderne",
      "Design ludique adapté aux lycéens",
      "Logique de gamification douce",
      "Préparation à un système de recommandations personnalisées",
    ],
    stack: ['Bubble Mobile Native', 'Bubble', 'Claude Code', 'UX mobile', 'Prototypage visuel', 'Structuration de données métiers/formations'],
    role:
      "J'ai imaginé le concept produit, défini les grandes étapes du parcours utilisateur, travaillé la logique de progression, conçu les écrans clés et structuré l'expérience pour rendre l'orientation plus accessible, interactive et motivante.",
    tags: ['Mobile app', 'Orientation', 'UX', 'Matching', 'Prototype'],
    mainImage: '/images/projects/orientix-cover.png',
    gallery: ['/images/projects/orientix-cover.png', '/projects/Orientix_Accueil.png', '/projects/Orientix_Taches.png'],
    associatedTechnologies: ['bubble', 'bubble-mobile-native', 'claude-code'],
  },
  {
    id: 'staypop',
    slug: 'staypop',
    title: 'StayPop',
    type: 'Plateforme de réservation / inspiration Airbnb',
    status: 'Prototype fonctionnel',
    shortDescription:
      "Application web de réservation de logements atypiques avec recherche, filtres, favoris et messagerie intégrée.",
    description:
      "StayPop est un prototype de plateforme de réservation de logements atypiques, inspiré des codes des applications de voyage et de location courte durée. L'expérience est centrée sur la découverte de lieux originaux, la recherche par critères, les favoris et l'échange entre utilisateur et hôte.\n\nLa page d'accueil met en avant une recherche rapide par destination, dates et nombre de voyageurs. La page d'exploration permet de filtrer les logements par ambiance — tiny house, bord de mer, nature, city break, insolite ou petit budget — et d'afficher des cartes logements avec image, localisation, prix et note. Une page de messagerie complète l'expérience en simulant les échanges entre voyageur et hôte.\n\nCe projet montre ma capacité à concevoir une application web complète avec plusieurs parcours : découverte, recherche, filtrage, favoris, consultation d'annonces et conversation. Il s'agit d'une base solide pour un MVP de marketplace de réservation.",
    problem:
      "Les plateformes de réservation doivent gérer plusieurs besoins en même temps : inspirer l'utilisateur, lui permettre de rechercher rapidement, comparer des offres, sauvegarder des favoris et communiquer avec les hôtes avant de réserver.",
    solution:
      "Créer une interface web moderne, colorée et fluide, organisée autour de trois grands usages : explorer des logements, filtrer les résultats selon ses envies et échanger avec un hôte via une messagerie intégrée.",
    features: [
      "Page d'accueil avec hero section",
      "Recherche par destination",
      "Sélection des dates d'arrivée et de départ",
      "Choix du nombre de voyageurs",
      "Catégories par ambiance : Tiny House, Bord de mer, Nature, City Break, Insolite, Petit Budget",
      "Page d'exploration avec filtres",
      "Filtres par budget et note",
      "Cartes logements avec image, prix, note et localisation",
      "Système de favoris",
      "Navigation entre les sections",
      "Page messages",
      "Liste de conversations",
      "Chat entre utilisateur et hôte",
      "Interface moderne, colorée et responsive",
    ],
    stack: ['Claude Code', 'React', 'TypeScript', 'UI responsive', 'Design web app', 'Logique marketplace', 'Logique de messagerie'],
    role:
      "J'ai conçu l'expérience utilisateur, structuré les écrans principaux, travaillé l'identité visuelle, créé les parcours de recherche et d'exploration, et intégré une logique de messagerie pour simuler une expérience complète de réservation.",
    tags: ['Travel App', 'Réservation', 'Marketplace', 'Chat', 'UI Design', 'React', 'TypeScript', 'Product Builder'],
    mainImage: '/projects/StayPop_Accueil.png',
    gallery: ['/projects/StayPop_Accueil.png', '/projects/StayPop_Recherche.png', '/projects/StayPop_Tchat.png'],
    associatedTechnologies: ['claude-code', 'react', 'typescript'],
  },
  {
    id: 'webinaire-make',
    slug: 'webinaire-make',
    title: "Automatisation d'un tunnel d'inscription à des webinaires",
    type: 'Automatisation / Make',
    status: 'Projet livré',
    shortDescription:
      "Automatisation complète du tunnel d'inscription à un webinaire : de la soumission du formulaire à la confirmation par SMS et email, avec synchronisation Google Sheets.",
    description:
      "Ce projet consiste en l'automatisation complète du parcours d'inscription à des webinaires récurrents. L'objectif était de supprimer toutes les actions manuelles entre le moment où un participant s'inscrit et la réception de sa confirmation, tout en centralisant les données dans un Google Sheets pour le suivi.\n\nLe scénario Make orchestre plusieurs services en cascade : réception du webhook déclenché par le formulaire d'inscription, validation des données, envoi d'un SMS de confirmation via Twilio, envoi d'un email de bienvenue, et ajout automatique du contact dans Google Sheets avec horodatage.\n\nUn second scénario gère les rappels automatiques : la veille du webinaire, un SMS et un email de rappel sont envoyés à tous les inscrits dont le statut est actif dans le Google Sheets. Ce flux évite toute saisie manuelle et garantit une communication fiable avec les participants.\n\nCe projet illustre une automatisation no-code de bout en bout : structuration des données, gestion des webhooks, orchestration multi-canaux et traçabilité des actions.",
    problem:
      "L'organisation de webinaires récurrents générait des tâches répétitives : copier les inscriptions dans un tableau, envoyer manuellement les confirmations, relancer les participants avant la session. Ce processus était chronophage, source d'oublis et peu scalable.",
    solution:
      "Automatiser entièrement le tunnel via Make : dès qu'un participant s'inscrit, les confirmations sont envoyées automatiquement par SMS (Twilio) et email, et les données sont synchronisées dans Google Sheets pour le suivi. Les rappels sont également automatisés la veille du webinaire.",
    features: [
      "Déclenchement par webhook sur soumission du formulaire",
      "Envoi automatique d'un SMS de confirmation via Twilio",
      "Envoi d'un email de confirmation personnalisé",
      "Ajout automatique du contact dans Google Sheets",
      "Scénario de rappel automatique la veille du webinaire",
      "Gestion des statuts d'inscription dans la base de données",
      "Logs d'exécution et gestion des erreurs dans Make",
      "Zéro action manuelle entre l'inscription et la confirmation",
    ],
    stack: ['Make', 'Webhooks', 'Twilio (SMS)', 'Google Sheets', 'Emailing', 'No-code'],
    role:
      "J'ai conçu et implémenté les scénarios Make de bout en bout : structuration du webhook, mapping des données, configuration des modules Twilio et email, mise en place du Google Sheets de suivi et automatisation des rappels.",
    tags: ['Make', 'Automatisation', 'Webhooks', 'Emailing', 'No-code', 'Twilio', 'Google Sheets'],
    mainImage: '/projects/webinaire-make/webinaire-accueil.png',
    gallery: [
      '/projects/webinaire-make/workflow-automatise.png',
      '/projects/webinaire-make/avant-apres.png',
      '/projects/webinaire-make/architecture-automatisee.png',
    ],
    galleryItems: [
      {
        url: '/projects/webinaire-make/workflow-automatise.png',
        title: 'Workflow automatisé',
        description: 'Visualisation du parcours automatisé : inscription, vérification, SMS, email, enregistrement Google Sheets et suivi centralisé.',
      },
      {
        url: '/projects/webinaire-make/avant-apres.png',
        title: 'Avant / Après automatisation',
        description: "Comparaison entre un processus manuel avec risques d'erreurs et un parcours automatisé, centralisé et plus fiable.",
      },
      {
        url: '/projects/webinaire-make/architecture-automatisee.png',
        title: 'Architecture automatisée',
        description: "Schéma simplifié de l'orchestration entre formulaire, Make, SMS, email, Google Sheets et tableau de suivi.",
      },
    ],
    technicalImage: '/projects/webinaire-make/scenario-01.png',
    associatedTechnologies: ['make'],
  },
  {
    id: 'maison-elise',
    slug: 'maison-elise',
    title: 'Maison Élise',
    type: 'No-code · Application métier',
    status: 'Projet portfolio',
    shortDescription:
      "Prototype tout-en-un pour salon de coiffure : site vitrine, réservation en ligne, agenda équipe, statistiques et assistant conseil.",
    description:
      "Maison Élise est un prototype d'application métier conçu pour un salon de coiffure indépendant. Il regroupe dans une seule interface un site vitrine, un système de réservation en ligne, un agenda d'équipe, des statistiques de suivi et un assistant conseil personnalisé.\n\nL'objectif est de montrer comment un outil digital peut centraliser tous les besoins d'un salon : attirer de nouveaux clients en ligne, gérer les rendez-vous sans friction, suivre les performances et accompagner les clientes dans leurs choix beauté.\n\nCe projet illustre ma capacité à concevoir des outils métier complets pour des professionnels indépendants qui souhaitent se digitaliser sans complexité.",
    problem:
      "Les salons de coiffure indépendants jonglent souvent entre plusieurs outils : agenda papier ou basique, absence de réservation en ligne, peu de visibilité sur leur activité et aucun accompagnement personnalisé pour leurs clientes.",
    solution:
      "Créer un prototype centralisé qui regroupe site vitrine, réservation en ligne, agenda équipe, statistiques et assistant conseil dans une interface simple et professionnelle, accessible depuis n'importe quel appareil.",
    features: [
      "Site vitrine du salon",
      "Réservation en ligne pour les clientes",
      "Agenda de l'équipe",
      "Tableau de bord avec statistiques",
      "Assistant conseil personnalisé",
      "Interface mobile et desktop",
      "Design élégant adapté à l'univers beauté",
      "Gestion des prestations et tarifs",
    ],
    stack: ['No-code', 'Bubble', 'Claude Code', 'UI responsive', "Design d'outil métier"],
    role:
      "J'ai conçu l'ensemble du prototype : architecture de l'outil, parcours client, interfaces clés et logique fonctionnelle pour répondre aux besoins concrets d'un salon de coiffure indépendant.",
    tags: ['Application métier', 'Site vitrine', 'Réservation', 'Dashboard', 'Prototype'],
    mainImage: '/images/projects/maison-elise-cover.png',
    gallery: ['/images/projects/maison-elise-cover.png'],
    associatedTechnologies: ['bubble', 'claude-code'],
  },
  {
    id: 'mon-histoire-magique',
    slug: 'mon-histoire-magique',
    title: 'Mon Histoire Magique',
    type: 'IA générative · Enfants',
    status: 'Prototype IA',
    shortDescription:
      "Application IA qui génère des histoires personnalisées pour enfants avec texte, illustration et version audio à partir d'un formulaire guidé.",
    description:
      "Mon Histoire Magique est une application IA qui permet à un parent ou à un enfant de créer une histoire personnalisée en quelques étapes simples. À partir d'un formulaire guidé — prénom de l'enfant, thème, personnages, décor et longueur souhaitée — l'application génère une histoire unique avec texte, illustration et narration audio.\n\nL'objectif est de rendre la création d'histoires magiques simple, rapide et accessible, en combinant la puissance de l'IA générative avec une expérience utilisateur pensée pour les familles.\n\nCe projet illustre comment l'IA peut enrichir une expérience quotidienne avec créativité, personnalisation et émotion, sans aucune complexité technique pour l'utilisateur final.",
    problem:
      "Les parents manquent souvent de temps pour inventer des histoires personnalisées pour leurs enfants. Les livres génériques ne correspondent pas toujours à la personnalité ou aux envies spécifiques de chaque enfant.",
    solution:
      "Créer une application guidée qui génère en quelques clics une histoire personnalisée avec texte, illustration et audio, à partir de paramètres simples renseignés par l'utilisateur.",
    features: [
      "Formulaire guidé de personnalisation",
      "Génération de texte via IA (OpenAI)",
      "Illustration générée par IA",
      "Version audio de l'histoire",
      "Interface simple et intuitive",
      "Résultat téléchargeable ou partageable",
      "Design coloré adapté aux enfants",
      "Personnalisation du prénom, thème et personnages",
    ],
    stack: ['OpenAI', 'IA générative', 'No-code', 'Make', 'Claude Code'],
    role:
      "J'ai conçu le formulaire guidé, défini la logique de génération, structuré les prompts IA et prototypé l'expérience pour offrir une création d'histoires simple, personnalisée et magique.",
    tags: ['OpenAI', 'IA générative', 'Audio', 'Illustration', 'No-code'],
    mainImage: '/images/projects/histoire-magique-cover.png',
    gallery: ['/images/projects/histoire-magique-cover.png'],
    associatedTechnologies: ['claude-code', 'make'],
  },
];
