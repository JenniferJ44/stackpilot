'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { Project } from '@/data/projects';
import { CARD_HOVER_SHADOW, CARD_IDLE_SHADOW, getAssembleInitial, ASSEMBLE_TARGET } from '@/lib/animations';

type Props = {
  project: Project;
  index?: number;
};

export default function ProjectCard({ project, index = 0 }: Props) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden flex flex-col group cursor-pointer"
      style={{ boxShadow: CARD_IDLE_SHADOW }}
      initial={prefersReducedMotion ? false : getAssembleInitial(index)}
      whileInView={prefersReducedMotion ? undefined : ASSEMBLE_TARGET}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: Math.min(index * 0.09, 0.45) }}
      whileHover={prefersReducedMotion ? undefined : { y: -6, scale: 1.01, boxShadow: CARD_HOVER_SHADOW }}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
    >
      {/* Image */}
      <div className="relative w-full aspect-video overflow-hidden bg-slate-50">
        <img
          src={project.mainImage}
          alt={project.title}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
        />
        {/* Status badge */}
        <div className="absolute top-3 left-3">
          <span className="text-xs font-semibold bg-white/92 backdrop-blur-sm text-slate-700 px-2.5 py-1 rounded-full border border-white/60 shadow-sm">
            {project.status}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Type label */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">{project.type}</span>
        </div>

        <h3 className="font-bold text-slate-900 text-lg leading-snug mb-2">{project.title}</h3>
        <p className="text-sm text-slate-500 leading-relaxed mb-4 flex-1">{project.shortDescription}</p>

        {/* Stack chips */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="text-xs bg-slate-50 border border-slate-200/70 text-slate-600 px-2 py-0.5 rounded-md"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="text-xs text-slate-400 px-1 py-0.5">+{project.tags.length - 4}</span>
          )}
        </div>

        {/* CTA */}
        <Link
          href={`/projets/${project.slug}`}
          className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl border border-indigo-200 bg-indigo-50 text-indigo-700 text-sm font-semibold hover:bg-indigo-100 hover:border-indigo-300 transition-all group/btn"
        >
          Voir le projet
          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}
