'use client';

import { useState } from 'react';
import { technologies, TechCategory } from '@/data/technologies';
import TechCard from '@/components/TechCard';
import Link from 'next/link';
import { ArrowRight, Layers } from 'lucide-react';

const CATEGORIES: { value: TechCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'Toutes' },
  { value: 'no-code', label: 'No-Code' },
  { value: 'automation', label: 'Automatisation' },
  { value: 'crm', label: 'CRM' },
  { value: 'documentation', label: 'Documentation' },
  { value: 'signature', label: 'Signature' },
  { value: 'payments', label: 'Paiements' },
  { value: 'ai-dev', label: 'Dev IA' },
];

export default function TechnologiesPage() {
  const [activeCategory, setActiveCategory] = useState<TechCategory | 'all'>('all');

  const pageTechs = technologies.filter((t) => t.showInTechPage === true);

  const filtered = pageTechs.filter((t) => {
    if (activeCategory !== 'all' && t.category !== activeCategory) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#f7f9fd] pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 text-sm font-semibold px-4 py-2 rounded-full mb-4 border border-indigo-200/60">
            <Layers className="w-3.5 h-3.5" />
            {pageTechs.length} technologies maîtrisées
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            Technologies maîtrisées
          </h1>
          <p className="text-slate-500 max-w-xl mx-auto">
            Toutes les solutions no-code, low-code et IA que je maîtrise pour concevoir, automatiser et structurer des outils numériques métier.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${
                  activeCategory === cat.value
                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-sm border-transparent'
                    : 'bg-white border-slate-200/70 text-slate-600 hover:border-indigo-200 hover:text-indigo-700 hover:bg-indigo-50/40'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4 text-xs text-slate-400 font-medium uppercase tracking-widest">
          {filtered.length} technologie{filtered.length > 1 ? 's' : ''} affichée{filtered.length > 1 ? 's' : ''}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((tech, i) => (
            <TechCard key={tech.id} tech={tech} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-500">
            Aucune technologie ne correspond à ces filtres.
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 relative bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-8 md:p-12 text-center overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/8 blur-2xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-violet-300/10 blur-2xl" />
          </div>
          <div className="relative">
            <h2 className="text-2xl font-bold text-white mb-3">
              Vous ne savez pas laquelle choisir ?
            </h2>
            <p className="text-indigo-100 mb-6">
              Lancez le diagnostic StackPilot et obtenez une architecture personnalisée en 2 minutes.
            </p>
            <Link
              href="/diagnostic"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-white text-indigo-700 font-semibold hover:bg-indigo-50 transition-colors"
            >
              Lancer le diagnostic
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
