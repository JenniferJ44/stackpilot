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
    type: 'Outil métier / facturation',
    status: 'Prototype fonctionnel',
    shortDescription:
      "Outil de gestion pensé pour simplifier la création de factures et structurer les informations administratives d'une activité de service.",
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
    tags: ['Outil métier', 'Facturation', 'Formulaire', 'SaaS', 'Product Builder', 'React', 'TypeScript'],
    mainImage: '/projects/CabinetFlow.png',
    gallery: ['/projects/CabinetFlow.png', '/projects/CabinetFlow_Formulaire_Facture.png'],
    associatedTechnologies: ['bubble', 'claude-code', 'react', 'typescript'],
  },
  {
    id: 'la-bonne-occaz',
    slug: 'la-bonne-occaz',
    title: 'La Bonne Occaz',
    type: 'Marketplace / petites annonces',
    status: 'Prototype fonctionnel',
    shortDescription:
      "Marketplace de petites annonces permettant de consulter, rechercher, mettre en favori et publier des produits entre particuliers.",
    description:
      "La Bonne Occaz est un prototype de plateforme de petites annonces inspiré des usages des sites de seconde main. Le projet propose une interface claire pour explorer des annonces, parcourir des catégories, rechercher un produit, consulter des cartes d'annonces et déposer une nouvelle annonce.\n\nL'objectif était de créer une expérience simple, directe et familière pour l'utilisateur, tout en travaillant une interface plus moderne et plus visuelle qu'un site classique de petites annonces. Les annonces sont présentées sous forme de cartes avec image, vendeur, titre et prix afin de faciliter la lecture rapide.\n\nCe projet met en avant une logique de marketplace : structuration des annonces, mise en avant des catégories, recherche, favoris et parcours de dépôt d'annonce. Il peut servir de base à un MVP de plateforme d'achat/revente entre particuliers ou de marketplace spécialisée.",
    problem:
      "Les plateformes de petites annonces nécessitent une expérience rapide et intuitive. L'utilisateur doit pouvoir comprendre immédiatement ce qu'il peut acheter, rechercher un produit, identifier les catégories disponibles et déposer une annonce sans friction.",
    solution:
      "Créer une page d'accueil marketplace claire, avec une navigation simple, des catégories visibles, une recherche accessible, des annonces récentes et des actions essentielles comme le dépôt d'annonce ou l'ajout aux favoris.",
    features: [
      "Page d'accueil marketplace",
      "Barre de recherche",
      "Catégories d'annonces : voitures, meubles, informatique, vêtements",
      "Liste d'annonces récentes",
      "Cartes produits avec image, titre, vendeur et prix",
      "Bouton de dépôt d'annonce",
      "Système de favoris visuel",
      "Interface responsive",
      "Design moderne et rassurant",
    ],
    stack: ['Claude Code', 'React', 'TypeScript', 'UI responsive', 'Design marketplace', 'Prototypage produit'],
    role:
      "J'ai conçu l'interface, structuré la page d'accueil, défini les composants principaux d'une marketplace et travaillé l'expérience utilisateur autour de la recherche, des catégories, des annonces et des favoris.",
    tags: ['Marketplace', 'Petites annonces', 'MVP', 'UI Design', 'React', 'TypeScript', 'Product Builder'],
    mainImage: '/projects/La_Bonne_Occaz_Accueil.png',
    gallery: ['/projects/La_Bonne_Occaz_Accueil.png'],
    associatedTechnologies: ['bubble', 'claude-code', 'react', 'typescript'],
  },
  {
    id: 'orientix',
    slug: 'orientix',
    title: 'Orientix',
    type: "Application mobile d'orientation scolaire",
    status: 'Prototype avancé',
    shortDescription:
      "Application mobile destinée à aider les lycéens à construire progressivement leur projet d'orientation grâce à un parcours clair, visuel et motivant.",
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
    tags: ['EdTech', 'Orientation', 'Mobile App', 'UX', 'Gamification', 'Bubble', 'Product Builder'],
    mainImage: '/projects/Orientix_Accueil.png',
    gallery: ['/projects/Orientix_Accueil.png', '/projects/Orientix_Taches.png'],
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
];
