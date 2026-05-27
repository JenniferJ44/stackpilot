'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Estimation } from '@/data/resultConfig';

type Props = {
  estimation: Estimation;
};

export default function IndicativeEstimate({ estimation }: Props) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="mt-10">
      <span className="section-tag">Estimation indicative</span>
      <h2 className="text-xl font-bold text-slate-900 mb-1">Combien de temps pour construire ça ?</h2>
      <p className="text-sm text-slate-500 mb-6">
        Basé sur des projets similaires. Le cadrage affine ces estimations.
      </p>

      <motion.div
        className="bg-white rounded-2xl border border-slate-200/70 overflow-hidden"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/60">
              <th className="text-left text-xs font-bold text-slate-500 uppercase tracking-wider px-5 py-3">Bloc de travail</th>
              <th className="text-right text-xs font-bold text-slate-500 uppercase tracking-wider px-5 py-3">Durée estimée</th>
            </tr>
          </thead>
          <tbody>
            {estimation.blocks.map((block, i) => (
              <motion.tr
                key={block.label}
                className="border-b border-slate-100 last:border-0"
                initial={prefersReducedMotion ? false : { opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.4, ease: 'easeOut', delay: i * 0.06 + 0.15 }}
              >
                <td className="px-5 py-3 text-slate-700">{block.label}</td>
                <td className="px-5 py-3 text-right font-semibold text-indigo-600 tabular-nums">{block.range}</td>
              </motion.tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-indigo-50/70">
              <td className="px-5 py-3.5 font-bold text-slate-800">Total estimé</td>
              <td className="px-5 py-3.5 text-right font-black text-indigo-700 text-base tabular-nums">{estimation.total}</td>
            </tr>
          </tfoot>
        </table>
      </motion.div>

      <p className="text-xs text-slate-400 mt-3 leading-relaxed">⚠️ {estimation.note}</p>
    </section>
  );
}
