'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { RelatedProject } from '@/data/resultConfig';
import { getAssembleInitial, ASSEMBLE_TARGET } from '@/lib/animations';

type Props = {
  projects: RelatedProject[];
};

export default function RelatedProjects({ projects }: Props) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="mt-10">
      <span className="section-tag">Projets similaires réalisés</span>
      <h2 className="text-xl font-bold text-slate-900 mb-1">Ce que j'ai déjà construit</h2>
      <p className="text-sm text-slate-500 mb-6">Des références proches de votre besoin pour vous projeter.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            className="bg-white rounded-xl border border-slate-200/70 p-4 flex flex-col gap-3"
            initial={prefersReducedMotion ? false : getAssembleInitial(i)}
            whileInView={prefersReducedMotion ? undefined : ASSEMBLE_TARGET}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: Math.min(i * 0.09, 0.35) }}
          >
            <div>
              <h3 className="font-bold text-slate-800 text-sm mb-1">{project.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{project.description}</p>
            </div>
            <div className="flex flex-wrap gap-1.5 flex-1">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-slate-50 border border-slate-200/70 text-slate-600 px-2 py-0.5 rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
            {project.slug ? (
              <Link
                href={`/projets/${project.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                Voir le projet <ArrowRight className="w-3 h-3" />
              </Link>
            ) : (
              <Link
                href="/projets"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                Voir les projets <ArrowRight className="w-3 h-3" />
              </Link>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
