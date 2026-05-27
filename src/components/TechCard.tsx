'use client';

import Link from 'next/link';
import { ExternalLink, Star, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { Technology } from '@/data/technologies';
import { CARD_HOVER_SHADOW, CARD_IDLE_SHADOW, getAssembleInitial, ASSEMBLE_TARGET } from '@/lib/animations';

const levelConfig = {
  expert:     { label: 'Mon expertise', color: 'bg-violet-100 text-violet-700 border border-violet-200/50' },
  avancé:     { label: 'Niveau avancé',  color: 'bg-indigo-100 text-indigo-700 border border-indigo-200/50' },
  recommandé: { label: 'Recommandé',     color: 'bg-slate-100 text-slate-600 border border-slate-200/50' },
};

type Props = {
  tech: Technology;
  index?: number;
};

export default function TechCard({ tech, index = 0 }: Props) {
  const level = levelConfig[tech.jenniferLevel];
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="relative group bg-white rounded-2xl border border-slate-200/60 overflow-hidden cursor-pointer"
      style={{ boxShadow: CARD_IDLE_SHADOW }}
      initial={prefersReducedMotion ? false : getAssembleInitial(index)}
      whileInView={prefersReducedMotion ? undefined : ASSEMBLE_TARGET}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: Math.min(index * 0.08, 0.44) }}
      whileHover={prefersReducedMotion ? undefined : { y: -6, scale: 1.01, boxShadow: CARD_HOVER_SHADOW }}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
    >
      {/* Expert accent bar */}
      {tech.jenniferLevel === 'expert' && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-violet-500" />
      )}

      {/* Full-card overlay link */}
      <Link
        href={`/technologies/${tech.id}`}
        className="absolute inset-0 rounded-2xl z-0"
        aria-label={`Voir le détail de ${tech.name}`}
      />

      {/* Card content */}
      <div className="pointer-events-none p-5 flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl ${tech.bgClass} flex items-center justify-center text-2xl border border-white/60 shadow-sm`}>
              {tech.logoUrl ? (
                <img src={tech.logoUrl} alt={`Logo ${tech.name}`} className="w-9 h-9 object-contain" />
              ) : (
                tech.icon
              )}
            </div>
            <div>
              <h3 className="font-bold text-slate-900">{tech.name}</h3>
              <span className="text-xs text-slate-500">{tech.categoryLabel}</span>
            </div>
          </div>
          {tech.jenniferLevel === 'expert' && (
            <Star className="w-4 h-4 text-violet-500 fill-violet-500 shrink-0" />
          )}
        </div>

        <span className={`self-start text-xs font-semibold px-2.5 py-1 rounded-lg mb-3 ${level.color}`}>
          {level.label}
        </span>

        <p className="text-sm text-slate-500 leading-relaxed mb-4 flex-1">{tech.description}</p>

        <div className="space-y-3">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Idéal pour</p>
            <div className="flex flex-wrap gap-1">
              {tech.idealFor.map((item) => (
                <span key={item} className="text-xs bg-indigo-50/60 border border-indigo-100 text-indigo-700 px-2 py-0.5 rounded-md">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-xs font-semibold text-green-600 mb-1.5">✓ Points forts</p>
              {tech.pros.slice(0, 2).map((p) => (
                <div key={p} className="flex items-start gap-1.5 text-xs text-slate-600 mb-1">
                  <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 shrink-0" />
                  {p}
                </div>
              ))}
            </div>
            <div>
              <p className="text-xs font-semibold text-red-500 mb-1.5">✗ Limites</p>
              {tech.cons.slice(0, 2).map((c) => (
                <div key={c} className="flex items-start gap-1.5 text-xs text-slate-600 mb-1">
                  <XCircle className="w-3 h-3 text-red-400 mt-0.5 shrink-0" />
                  {c}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">{tech.pricing}</span>
            <div className="flex items-center gap-3">
              <a
                href={tech.url}
                target="_blank"
                rel="noopener noreferrer"
                className="pointer-events-auto flex items-center gap-1 text-xs font-medium text-indigo-600 hover:text-indigo-700 relative z-10"
              >
                Site <ExternalLink className="w-3 h-3" />
              </a>
              <span className="flex items-center gap-1 text-xs font-semibold text-violet-600 group-hover:text-violet-700">
                Détail <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
