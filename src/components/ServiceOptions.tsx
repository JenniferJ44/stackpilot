'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ServiceOption } from '@/data/resultConfig';
import { getAssembleInitial, ASSEMBLE_TARGET } from '@/lib/animations';

type Props = {
  options: ServiceOption[];
  onCtaClick?: (option: ServiceOption) => void;
};

export default function ServiceOptions({ options, onCtaClick }: Props) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="mt-10">
      <span className="section-tag">Ce que je peux construire pour vous</span>
      <h2 className="text-xl font-bold text-slate-900 mb-1">Comment je peux vous accompagner</h2>
      <p className="text-sm text-slate-500 mb-6">Choisissez le niveau d'accompagnement qui correspond à votre situation.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {options.map((option, i) => (
          <motion.div
            key={option.id}
            className="bg-white rounded-xl border border-slate-200/70 p-5 flex flex-col gap-3 hover:border-indigo-200 hover:shadow-[0_4px_20px_rgba(99,102,241,0.08)] transition-all duration-300"
            initial={prefersReducedMotion ? false : getAssembleInitial(i)}
            whileInView={prefersReducedMotion ? undefined : ASSEMBLE_TARGET}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: Math.min(i * 0.09, 0.35) }}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">{option.icon}</span>
              <div>
                <h3 className="font-bold text-slate-800 text-sm mb-1">{option.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{option.description}</p>
              </div>
            </div>
            <p className="text-xs text-indigo-600 font-medium">{option.ideal}</p>
            <button
              onClick={() => onCtaClick?.(option)}
              className="mt-auto w-full px-4 py-2 rounded-xl border border-indigo-200 bg-indigo-50 text-indigo-700 text-xs font-semibold hover:bg-indigo-100 hover:border-indigo-300 transition-all"
            >
              {option.cta}
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
