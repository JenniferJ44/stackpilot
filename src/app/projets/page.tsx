import type { Metadata } from 'next';
import { projects } from '@/data/projects';
import ProjectCard from '@/components/ProjectCard';
import MotionSection from '@/components/MotionSection';
import Link from 'next/link';
import { ArrowRight, Calendar, Layers } from 'lucide-react';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://stackpilot.fr';

export const metadata: Metadata = {
  title: 'Projets no-code réalisés — Jennifer Jaulin',
  description:
    "Découvrez mes projets no-code réalisés : applications web, automatisations, outils métiers. Bubble, Make, Airtable, Claude Code — de l'idée à l'outil livré.",
  alternates: { canonical: `${BASE_URL}/projets` },
  openGraph: {
    title: 'Projets no-code réalisés — Jennifer Jaulin',
    description:
      'Découvrez mes projets no-code réalisés : applications web, automatisations, outils métiers.',
    url: `${BASE_URL}/projets`,
  },
};

export default function ProjetsPage() {
  const allTags = [...new Set(projects.flatMap((p) => p.tags))];

  return (
    <div className="min-h-screen bg-[#f7f9fd] pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <MotionSection className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 text-sm font-semibold px-4 py-2 rounded-full mb-4 border border-indigo-200/60">
            <Layers className="w-3.5 h-3.5" />
            {projects.length} projets réalisés
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            Mes projets réalisés
          </h1>
          <p className="text-slate-500 max-w-xl mx-auto">
            Des réalisations concrètes — prototypes, applications web et mobiles, outils métier — que j&apos;ai conçus et développés.
          </p>
        </MotionSection>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-16">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* CTA */}
        <MotionSection>
          <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm p-8 md:p-12 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="section-tag mb-2">Votre projet</p>
                <h2 className="text-2xl font-bold text-slate-900 mb-3">
                  Un projet similaire en tête ?
                </h2>
                <p className="text-slate-500 leading-relaxed mb-6">
                  J&apos;accompagne des entrepreneurs, freelances, associations et petites structures
                  dans la création de leurs outils numériques — no-code, automatisation, CRM ou
                  développement assisté par IA.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/diagnostic"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold text-sm hover:opacity-90 transition-opacity"
                  >
                    Clarifier mon besoin
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/a-propos#contact"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 hover:border-indigo-200 transition-colors"
                  >
                    <Calendar className="w-4 h-4" />
                    Me contacter
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { emoji: '⚡', value: '4 projets', label: 'prototypes livrés' },
                  { emoji: '🎯', value: '100%', label: 'projets livrés' },
                  { emoji: '🤖', value: 'Claude Code', label: 'outil principal' },
                  { emoji: '📈', label: 'résultats mesurables', value: 'Toujours' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-gradient-to-br from-indigo-50 to-violet-50 rounded-2xl p-4 border border-indigo-100 text-center"
                  >
                    <div className="text-2xl mb-1">{stat.emoji}</div>
                    <div className="text-xl font-bold text-slate-900">{stat.value}</div>
                    <div className="text-xs text-slate-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </MotionSection>

        {/* Tags cloud */}
        <MotionSection delay={0.1}>
          <div className="bg-white rounded-2xl border border-slate-200/60 p-6">
            <p className="section-tag mb-4">Tags de ces projets</p>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm bg-[#f7f9fd] border border-slate-200/70 text-slate-700 font-medium px-3 py-1.5 rounded-xl shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </MotionSection>

      </div>
    </div>
  );
}
