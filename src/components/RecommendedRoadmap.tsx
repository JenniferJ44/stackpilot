'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { RoadmapStep } from '@/data/resultConfig';

type Props = {
  steps: RoadmapStep[];
};

export default function RecommendedRoadmap({ steps }: Props) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="mt-10">
      <span className="section-tag">Roadmap recommandée</span>
      <h2 className="text-xl font-bold text-slate-900 mb-1">Les étapes pour aller de l'idée au produit</h2>
      <p className="text-sm text-slate-500 mb-6">Un calendrier type — ajusté lors du cadrage selon votre contexte.</p>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[22px] top-3 bottom-3 w-px bg-slate-200" aria-hidden />

        <ol className="space-y-4">
          {steps.map((step, i) => (
            <motion.li
              key={step.phase}
              className="flex gap-4"
              initial={prefersReducedMotion ? false : { opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
            >
              {/* Phase circle */}
              <div className="relative z-10 flex-shrink-0 w-11 h-11 rounded-full bg-indigo-50 border-2 border-indigo-200 flex items-center justify-center">
                <span className="text-xs font-black text-indigo-600">{step.phase}</span>
              </div>

              {/* Content */}
              <div className="flex-1 bg-white rounded-xl border border-slate-200/70 p-4 pb-3">
                <div className="flex items-center justify-between flex-wrap gap-1 mb-2">
                  <h3 className="font-bold text-slate-800 text-sm">{step.title}</h3>
                  <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-medium">
                    {step.duration}
                  </span>
                </div>
                <ul className="space-y-1">
                  {step.items.map((item) => (
                    <li key={item} className="flex items-start gap-1.5 text-xs text-slate-500">
                      <span className="mt-1 w-1 h-1 rounded-full bg-indigo-300 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
