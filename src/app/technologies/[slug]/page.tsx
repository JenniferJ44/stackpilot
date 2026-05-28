import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { technologies } from '@/data/technologies';
import { projects } from '@/data/projects';
import { ArrowLeft, Star, CheckCircle, XCircle, AlertTriangle, ArrowRight, ExternalLink, Layers } from 'lucide-react';
import TechnologyChat from '@/components/TechnologyChat';
import MotionSection from '@/components/MotionSection';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://stackpilot.fr';

const customTitles: Partial<Record<string, string>> = {
  bubble: 'Bubble — Créer une application web no-code | Jennifer Jaulin',
  airtable: 'Airtable — Base de données no-code | Jennifer Jaulin',
  make: 'Make — Expert automatisation no-code | Jennifer Jaulin',
  notion: 'Notion — Documentation et wiki no-code | Jennifer Jaulin',
  salesforce: 'Salesforce — Administratrice CRM certifiée | Jennifer Jaulin',
  sharepoint: 'SharePoint — Gestion documentaire Microsoft | Jennifer Jaulin',
  'power-automate': 'Power Automate — Automatisation Microsoft 365 | Jennifer Jaulin',
  docusign: 'DocuSign — Signature électronique | Jennifer Jaulin',
  'claude-code': 'Claude Code — Développement assisté par IA | Jennifer Jaulin',
  glide: 'Glide — Application mobile no-code | Jennifer Jaulin',
  monday: 'Monday.com — Gestion de projets no-code | Jennifer Jaulin',
  systemeio: 'Systeme.io — Tunnels de vente et marketing no-code | Jennifer Jaulin',
};

export async function generateStaticParams() {
  return technologies.map((tech) => ({ slug: tech.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tech = technologies.find((t) => t.id === slug);
  if (!tech) return {};

  const title = customTitles[slug] ?? `${tech.name} — ${tech.categoryLabel} | StackPilot`;
  const description = `${tech.description} Découvrez les cas d'usage, avantages, limites et retours d'expérience terrain.`;

  return {
    title,
    description,
    alternates: { canonical: `${BASE_URL}/technologies/${slug}` },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/technologies/${slug}`,
    },
  };
}

const levelConfig = {
  expert:     { label: 'Mon expertise', color: 'bg-violet-100 text-violet-700 border border-violet-200/50' },
  avancé:     { label: 'Niveau avancé',  color: 'bg-indigo-100 text-indigo-700 border border-indigo-200/50' },
  recommandé: { label: 'Recommandé',     color: 'bg-slate-100 text-slate-600 border border-slate-200/50' },
};

export default async function TechnologyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tech = technologies.find((t) => t.id === slug);

  if (!tech) notFound();

  const level = levelConfig[tech.jenniferLevel];
  const hasStackWith = tech.stackWith && tech.stackWith.length > 0;
  const hasJenniferProjects = tech.jenniferProjects && tech.jenniferProjects.length > 0;
  const associatedProjects = projects.filter((p) => p.associatedTechnologies.includes(tech.id));

  return (
    <div className="min-h-screen bg-[#f7f9fd] pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">

        {/* BreadcrumbList JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE_URL },
                { '@type': 'ListItem', position: 2, name: 'Technologies', item: `${BASE_URL}/technologies` },
                { '@type': 'ListItem', position: 3, name: tech.name, item: `${BASE_URL}/technologies/${tech.id}` },
              ],
            }),
          }}
        />

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <Link href="/" className="hover:text-slate-700 transition-colors">Accueil</Link>
          <span>/</span>
          <Link href="/technologies" className="hover:text-slate-700 transition-colors">Technologies</Link>
          <span>/</span>
          <span className="text-slate-700 font-medium">{tech.name}</span>
        </div>

        {/* Hero */}
        <MotionSection className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6 sm:p-8 mb-6">
          {/* Expert accent bar */}
          {tech.jenniferLevel === 'expert' && (
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-t-2xl" />
          )}
          <div className="flex flex-col sm:flex-row sm:items-start gap-5">
            <div className={`w-16 h-16 rounded-2xl ${tech.bgClass} flex items-center justify-center text-3xl shrink-0 border border-white/60 shadow-sm`}>
              {tech.logoUrl ? (
                <img src={tech.logoUrl} alt={`Logo ${tech.name}`} className="w-11 h-11 object-contain" />
              ) : (
                tech.icon
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold text-slate-900">{tech.name}</h1>
                {tech.jenniferLevel === 'expert' && (
                  <Star className="w-5 h-5 text-violet-500 fill-violet-500" />
                )}
              </div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-sm text-slate-500">{tech.categoryLabel}</span>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${level.color}`}>
                  {level.label}
                </span>
              </div>
              <p className="text-slate-600 leading-relaxed">{tech.description}</p>
            </div>
            <div className="flex flex-col items-start sm:items-end gap-2 shrink-0 sm:max-w-[160px]">
              <a
                href={tech.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#f7f9fd] border border-slate-200/70 text-sm font-medium text-slate-700 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-700 transition-all whitespace-nowrap"
              >
                Site officiel <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <span className="text-sm text-slate-400 break-words sm:text-right">{tech.pricing}</span>
            </div>
          </div>
        </MotionSection>

        <MotionSection delay={0.1} className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Main content — 2 cols */}
          <div className="lg:col-span-2 space-y-6">

            {/* Idéal pour */}
            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6">
              <p className="section-tag mb-2">Idéal pour</p>
              <div className="flex flex-wrap gap-2">
                {tech.idealFor.map((item) => (
                  <span key={item} className="text-sm bg-indigo-50/60 border border-indigo-100 text-indigo-700 px-3 py-1.5 rounded-xl">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Points forts / Limites */}
            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <p className="section-tag text-green-600 mb-2">Points forts</p>
                  <div className="space-y-2">
                    {tech.pros.map((p) => (
                      <div key={p} className="flex items-start gap-2 text-sm text-slate-700">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                        {p}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="section-tag text-red-500 mb-2">Limites</p>
                  <div className="space-y-2">
                    {tech.cons.map((c) => (
                      <div key={c} className="flex items-start gap-2 text-sm text-slate-700">
                        <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                        {c}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* À éviter si */}
            {tech.avoidIf && tech.avoidIf.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6">
                <p className="section-tag mb-2">Cas non adaptés</p>
                <div className="space-y-2">
                  {tech.avoidIf.map((item) => (
                    <div key={item} className="flex items-start gap-2 text-sm text-slate-600">
                      <XCircle className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Points de vigilance */}
            {tech.watchouts && tech.watchouts.length > 0 && (
              <div className="bg-amber-50 rounded-2xl border border-amber-100 shadow-sm p-6">
                <p className="section-tag text-amber-700 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Points de vigilance
                </p>
                <div className="space-y-2">
                  {tech.watchouts.map((item) => (
                    <div key={item} className="flex items-start gap-2 text-sm text-amber-900">
                      <span className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full bg-amber-500" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Alternatives */}
            {tech.alternatives && tech.alternatives.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6">
                <p className="section-tag mb-2">Alternatives à considérer</p>
                <div className="space-y-2">
                  {tech.alternatives.map((item) => (
                    <div key={item} className="flex items-start gap-2 text-sm text-slate-600">
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Premier pas */}
            {tech.firstStep && (
              <div className="bg-indigo-50/60 rounded-2xl border border-indigo-100 shadow-sm p-6">
                <p className="section-tag text-indigo-600 mb-2">Par où commencer ?</p>
                <p className="text-sm text-indigo-900 leading-relaxed">{tech.firstStep}</p>
              </div>
            )}

          </div>

          {/* Sidebar — 1 col */}
          <div className="space-y-6">

            {/* Se combine avec */}
            {hasStackWith && (
              <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6">
                <p className="section-tag mb-3">Se combine avec</p>
                <div className="flex flex-wrap gap-2">
                  {tech.stackWith!.map((name) => {
                    const related = technologies.find((t) => t.name === name || t.id === name.toLowerCase().replace(/\s/g, '-'));
                    return related ? (
                      <Link
                        key={name}
                        href={`/technologies/${related.id}`}
                        className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-xl bg-violet-50 border border-violet-100 text-violet-700 hover:bg-violet-100 hover:border-violet-200 transition-all"
                      >
                        <span>{related.icon}</span>
                        {name}
                      </Link>
                    ) : (
                      <span
                        key={name}
                        className="text-sm px-3 py-1.5 rounded-xl bg-[#f7f9fd] border border-slate-200 text-slate-600"
                      >
                        {name}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Expériences terrain */}
            {hasJenniferProjects && (
              <div className="bg-violet-50 rounded-2xl border border-violet-100 shadow-sm p-6">
                <p className="section-tag text-violet-700 mb-1 flex items-center gap-2">
                  <Star className="w-3.5 h-3.5 fill-violet-500 text-violet-500" />
                  Expériences terrain
                </p>
                <p className="text-xs text-violet-600 mb-3">Utilisé dans mes projets clients et personnels</p>
                <div className="space-y-2">
                  {tech.jenniferProjects!.map((item) => (
                    <div key={item} className="flex items-start gap-2 text-sm text-violet-900">
                      <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-violet-400" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="relative bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl p-6 text-center overflow-hidden">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/8 blur-xl" />
              </div>
              <div className="relative">
                <p className="text-white font-bold text-sm mb-1">Un projet en tête ?</p>
                <p className="text-indigo-100 text-xs mb-4">
                  Obtenez une architecture personnalisée selon votre contexte.
                </p>
                <Link
                  href="/diagnostic"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-indigo-700 font-semibold text-sm hover:bg-indigo-50 transition-colors"
                >
                  Lancer le diagnostic
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>
        </MotionSection>

        {/* TechnologyChat mini-agent */}
        <MotionSection delay={0.05} className="mt-6">
          <TechnologyChat tech={tech} />
        </MotionSection>

        {/* Projets associés */}
        {associatedProjects.length > 0 && (
          <MotionSection delay={0.1} className="mt-8">
            <div className="mb-5">
              <p className="section-tag">Réalisations</p>
              <h2 className="text-xl font-bold text-slate-900">Mes projets {tech.name}</h2>
              <p className="text-sm text-slate-500 mt-1">
                Découvrez les projets réalisés ou prototypés avec cette technologie.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {associatedProjects.map((project) => (
                <Link
                  key={project.id}
                  href={`/projets/${project.slug}`}
                  className="bg-white rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-indigo-200 transition-all duration-200 overflow-hidden flex flex-col group"
                >
                  <div className="relative h-44 overflow-hidden bg-slate-100">
                    <img
                      src={project.mainImage}
                      alt={project.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="text-xs font-semibold bg-white/90 backdrop-blur-sm text-slate-700 px-2 py-1 rounded-full shadow-sm">
                        {project.status}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <p className="text-xs text-indigo-600 font-bold uppercase tracking-widest mb-1">{project.type}</p>
                    <h3 className="font-bold text-slate-900 text-base mb-2">{project.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-3 flex-1">{project.shortDescription}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-xs bg-[#f7f9fd] border border-slate-200 text-slate-600 px-2 py-0.5 rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 group-hover:text-indigo-800 transition-colors">
                      Voir le projet
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </MotionSection>
        )}

        {/* Back navigation */}
        <div className="mt-8">
          <Link
            href="/technologies"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux technologies
          </Link>
        </div>

      </div>
    </div>
  );
}
