import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Star, ExternalLink } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://stackpilot.fr';

export const metadata: Metadata = {
  title: 'À propos — Jennifer Jaulin, Product Builder No-Code | StackPilot',
  description:
    'Jennifer Jaulin, Product Builder No-Code freelance. Je conçois des MVP, automatisations et outils métiers avec Bubble, Make, Airtable, Salesforce et plus. Contactez-moi.',
  alternates: { canonical: `${BASE_URL}/a-propos` },
  openGraph: {
    title: 'À propos — Jennifer Jaulin, Product Builder No-Code | StackPilot',
    description:
      'Jennifer Jaulin, Product Builder No-Code freelance. Je conçois des MVP, automatisations et outils métiers no-code.',
    url: `${BASE_URL}/a-propos`,
  },
};

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const expertiseTools = [
  { name: 'Bubble',       level: 'Expert', icon: '🔵', desc: 'Applications web no-code complètes',    slug: 'bubble',      logoUrl: '/logo_outils/bubble.png' },
  { name: 'Airtable',     level: 'Expert', icon: '🟡', desc: 'Bases de données et CRM personnalisés', slug: 'airtable',    logoUrl: '/logo_outils/airtable.png' },
  { name: 'Make',         level: 'Expert', icon: '⚡', desc: 'Automatisation de workflows',           slug: 'make',        logoUrl: '/logo_outils/make.png' },
  { name: 'Notion',       level: 'Expert', icon: '⬛', desc: 'Bases de connaissances et wikis',       slug: 'notion',      logoUrl: '/logo_outils/notion.png' },
  { name: 'Salesforce',   level: 'Expert', icon: '☁️', desc: 'CRM enterprise et configuration',       slug: 'salesforce',  logoUrl: '/logo_outils/salesforce.png' },
  { name: 'SharePoint',   level: 'Expert', icon: '📁', desc: 'Gestion documentaire Microsoft',        slug: 'sharepoint',  logoUrl: '/logo_outils/sharepoint.png' },
  { name: 'DocuSign',     level: 'Expert', icon: '✍️', desc: 'Signature électronique et CLM',         slug: 'docusign',    logoUrl: '/logo_outils/docusign.png' },
  { name: 'Monday',       level: 'Expert', icon: '📋', desc: 'Gestion de projets et équipes',         slug: 'monday' },
  { name: 'Glide',        level: 'Expert', icon: '📱', desc: 'Applications mobiles no-code',          slug: 'glide' },
  { name: 'Stripe',       level: 'Expert', icon: '💳', desc: 'Paiements en ligne et abonnements',     slug: 'stripe',      logoUrl: '/logo_outils/stripe.png' },
  { name: 'Claude Code',  level: 'Expert', icon: '🤖', desc: 'Développement assisté par IA',          slug: 'claude-code' },
] as const;

const services = [
  {
    icon: '🚀',
    title: 'Création de MVP no-code',
    description:
      "Conception et développement d'applications web ou outils métiers avec Bubble, Airtable, Glide ou d'autres outils adaptés à votre contexte.",
  },
  {
    icon: '⚡',
    title: 'Automatisation de processus',
    description:
      'Création de scénarios Make, automatisations entre outils, webhooks, synchronisation de données, alertes et notifications.',
  },
  {
    icon: '🗂️',
    title: 'Structuration de bases de données',
    description:
      'Modélisation de données, organisation d\'informations, création de bases Airtable ou structures adaptées aux besoins métiers.',
  },
  {
    icon: '🔧',
    title: 'Optimisation d\'outils existants',
    description:
      'Amélioration de workflows, correction de parcours, simplification de process, optimisation d\'interfaces et accompagnement à l\'usage.',
  },
  {
    icon: '🎯',
    title: 'Cadrage produit',
    description:
      'Clarification du besoin, priorisation des fonctionnalités, définition du MVP, parcours utilisateur et logique métier.',
  },
  {
    icon: '🎓',
    title: 'Formation & accompagnement',
    description:
      'Formation de vos équipes sur les outils choisis et accompagnement dans la prise en main et l\'amélioration continue.',
  },
];

const approach = [
  {
    step: '01',
    tag: 'Comprendre',
    title: 'Écoute & analyse du besoin',
    description:
      'Avant de recommander quoi que ce soit, je comprends votre métier, vos contraintes et vos objectifs réels.',
  },
  {
    step: '02',
    tag: 'Concevoir',
    title: 'Choix de l\'architecture',
    description:
      "Je sélectionne les blocs technologiques les plus adaptés à votre contexte — budget, urgence, taille d'équipe.",
  },
  {
    step: '03',
    tag: 'Construire',
    title: 'Construction itérative',
    description:
      "Je construis rapidement une V1 fonctionnelle, que l'on améliore ensemble au fil du temps.",
  },
  {
    step: '04',
    tag: 'Transmettre',
    title: 'Transmission & autonomie',
    description:
      "Je vous forme à l'outil pour que vous soyez autonome — ou je reste disponible pour la maintenance.",
  },
];

export default function AProposPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-slate-900 to-indigo-950 px-4 sm:px-6 lg:px-8 py-16 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-indigo-500/15 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-violet-500/12 blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 items-center">
            <div className="md:col-span-3">
              <div className="inline-flex items-center gap-2 bg-white/10 text-white/90 text-sm font-medium px-4 py-2 rounded-full mb-6 border border-white/20">
                <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                Product Builder No-Code Freelance
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-5">
                Jennifer Jaulin
              </h1>
              <p className="text-slate-300 leading-relaxed mb-4 text-sm">
                Je suis Jennifer Jaulin, Product Builder No-Code freelance. J&apos;aide les indépendants,
                associations et petites structures à transformer leurs idées, leurs processus ou leurs
                besoins métier en outils numériques concrets.
              </p>
              <p className="text-slate-300 leading-relaxed mb-4 text-sm">
                J&apos;interviens de bout en bout : cadrage du besoin, structuration des données, conception
                des parcours utilisateurs, création d&apos;un MVP, automatisation des tâches répétitives et
                amélioration continue.
              </p>
              <p className="text-slate-300 leading-relaxed mb-8 text-sm">
                Mon approche combine vision produit, logique métier et maîtrise des outils no-code comme
                Bubble, Airtable, Make, Salesforce, Notion ou Monday. L&apos;objectif : créer des solutions
                utiles, claires et maintenables, sans complexité inutile.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://www.linkedin.com/in/jennifer-jaulin-64b872116/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0077b5]/80 border border-[#0077b5] text-white text-sm font-medium hover:bg-[#0077b5] transition-colors"
                >
                  <LinkedinIcon className="w-4 h-4" />
                  LinkedIn
                </a>
                <a
                  href="https://www.malt.fr/profile/jenniferjaulin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm font-medium hover:bg-white/20 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Profil Malt
                </a>
              </div>
            </div>
            <div className="md:col-span-2">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20 text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 mx-auto mb-4 flex items-center justify-center text-5xl shadow-lg">
                  👩‍💻
                </div>
                <h3 className="text-white font-bold text-lg mb-1">Jennifer Jaulin</h3>
                <p className="text-slate-300 text-sm mb-5">Product Builder No-Code</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { v: '11+', l: 'outils maîtrisés' },
                    { v: 'No-Code', l: 'approche principale' },
                    { v: '< 3 sem', l: 'pour un MVP' },
                    { v: 'IA', l: 'augmentée Claude' },
                  ].map((s) => (
                    <div key={s.l} className="bg-white/10 rounded-xl p-3">
                      <div className="text-lg font-bold text-white">{s.v}</div>
                      <div className="text-xs text-slate-400">{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mon approche ──────────────────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#f7f9fd]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="section-tag justify-center">
              <span className="w-5 h-px bg-indigo-300" />
              Méthode
              <span className="w-5 h-px bg-indigo-300" />
            </p>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Mon approche</h2>
            <p className="text-slate-500">Une méthode pragmatique axée sur la livraison rapide et la valeur.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative">
            {approach.map((step, i) => (
              <div key={step.step} className="relative bg-white rounded-2xl border border-slate-200/60 shadow-sm p-5 hover:border-indigo-200 hover:shadow-md transition-all">
                {i < approach.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-5 h-px bg-gradient-to-r from-indigo-200 to-slate-200 z-10" />
                )}
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white font-bold text-xs font-mono flex items-center justify-center shadow-sm">
                    {step.step}
                  </div>
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">{step.tag}</span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-2">{step.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Outils maîtrisés ─────────────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="section-tag justify-center">
              <span className="w-5 h-px bg-indigo-300" />
              Stack maîtrisée
              <span className="w-5 h-px bg-indigo-300" />
            </p>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Outils maîtrisés</h2>
            <p className="text-slate-500">Les outils que j&apos;utilise au quotidien dans mes projets clients.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {expertiseTools.map((tool) => (
              <Link
                key={tool.name}
                href={`/technologies/${tool.slug}`}
                className="flex items-center gap-4 bg-[#f7f9fd] rounded-2xl border border-slate-200/60 p-4 hover:border-indigo-200 hover:bg-indigo-50/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              >
                <div className="w-10 h-10 flex items-center justify-center shrink-0">
                  {'logoUrl' in tool ? (
                    <img
                      src={tool.logoUrl}
                      alt={`Logo ${tool.name}`}
                      className="w-9 h-9 object-contain"
                    />
                  ) : (
                    <span className="text-3xl">{tool.icon}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-bold text-slate-900 text-sm">{tool.name}</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-md border bg-violet-100 text-violet-700 border-violet-200/50">
                      {tool.level}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">{tool.desc}</p>
                </div>
                <Star className="w-4 h-4 text-violet-500 fill-violet-500 shrink-0" />
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/technologies"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-indigo-200 bg-white text-indigo-700 text-sm font-semibold hover:bg-indigo-50 transition-colors"
            >
              Voir toutes les technologies
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Services ─────────────────────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#f7f9fd]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="section-tag justify-center">
              <span className="w-5 h-px bg-indigo-300" />
              Prestations
              <span className="w-5 h-px bg-indigo-300" />
            </p>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Ce que je peux faire pour vous</h2>
            <p className="text-slate-500">Des services concrets, du cadrage à la livraison.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service) => (
              <div key={service.title} className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-5 hover:border-indigo-200 hover:shadow-md transition-all">
                <div className="text-3xl mb-3">{service.icon}</div>
                <h3 className="font-bold text-slate-900 mb-2 text-sm">{service.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Formulaire de contact ──────────────────────────────────────── */}
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-white scroll-mt-20">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <p className="section-tag justify-center">
              <span className="w-5 h-px bg-indigo-300" />
              Contact
              <span className="w-5 h-px bg-indigo-300" />
            </p>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Travaillons ensemble</h2>
            <p className="text-slate-500 max-w-lg mx-auto text-sm leading-relaxed">
              Vous avez un projet, une idée d&apos;outil ou un processus à automatiser ? Envoyez-moi
              quelques informations, je vous répondrai rapidement.
            </p>
          </div>
          <div className="bg-[#f7f9fd] rounded-2xl border border-slate-200/60 p-6 sm:p-8">
            <ContactForm />
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <a
              href="https://www.linkedin.com/in/jennifer-jaulin-64b872116/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-medium hover:border-indigo-200 hover:text-indigo-700 transition-colors"
            >
              <LinkedinIcon className="w-4 h-4 text-[#0077b5]" />
              LinkedIn
            </a>
            <a
              href="https://www.malt.fr/profile/jenniferjaulin"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-medium hover:border-indigo-200 hover:text-indigo-700 transition-colors"
            >
              <ExternalLink className="w-4 h-4 text-[#fc5656]" />
              Profil Malt
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
