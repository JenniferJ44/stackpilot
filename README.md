# StackPilot

Site vitrine et outil de diagnostic de stack no-code par **Jennifer Jaulin**, Product Builder No-Code freelance.

## Fonctionnalités

- **Diagnostic de stack** : questionnaire guidé générant une recommandation technologique personnalisée
- **Pages technologies** : fiches détaillées pour 12+ outils no-code, low-code et IA
- **Projets** : galerie de réalisations avec galerie lightbox
- **À propos + Contact** : formulaire de contact avec confirmation email via Resend
- **SEO** : sitemap automatique, robots.txt, JSON-LD (Person, WebSite, ProfessionalService), generateMetadata par page

## Stack technique

- **Next.js 15** (App Router, SSG)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **Resend** (envoi d'emails)
- Déployé sur **Vercel**

## Variables d'environnement

Copiez `.env.example` vers `.env.local` et remplissez les valeurs :

```bash
cp .env.example .env.local
```

| Variable | Rôle |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL publique (sitemap, Open Graph) |
| `RESEND_API_KEY` | Clé API Resend pour l'envoi d'emails |
| `CONTACT_EMAIL` | Adresse qui reçoit les messages du formulaire |
| `CONTACT_FROM_EMAIL` | Expéditeur vérifié dans Resend |

> En développement, `CONTACT_FROM_EMAIL=onboarding@resend.dev` fonctionne sans domaine vérifié.
> En production, utilisez une adresse d'un domaine vérifié dans Resend.

## Lancer le projet

```bash
npm install
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000).

## SEO — Google Search Console

Après déploiement en production :

1. Connectez-vous à [Google Search Console](https://search.google.com/search-console)
2. Ajoutez la propriété avec l'URL de production
3. Vérifiez la propriété (balise HTML ou DNS)
4. Soumettez le sitemap : `https://votre-domaine.fr/sitemap.xml`
5. Inspectez les URLs principales pour demander l'indexation

Le sitemap est généré automatiquement depuis `src/app/sitemap.ts` et inclut toutes les pages statiques, technologies et projets.
