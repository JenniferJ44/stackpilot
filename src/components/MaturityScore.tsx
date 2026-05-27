'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { MaturityResult } from '@/lib/maturityScoring';

type Props = {
  result: MaturityResult;
};

function ScoreBar({ score, delay }: { score: number; delay: number }) {
  const prefersReducedMotion = useReducedMotion();

  const color =
    score >= 75 ? 'bg-emerald-500' :
    score >= 55 ? 'bg-indigo-500' :
    score >= 35 ? 'bg-amber-400' :
    'bg-rose-400';

  return (
    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
      <motion.div
        className={`h-full rounded-full ${color}`}
        initial={{ width: 0 }}
        whileInView={{ width: `${score}%` }}
        viewport={{ once: true, amount: 0.5 }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
      />
    </div>
  );
}

function globalColor(score: number) {
  if (score >= 75) return 'text-emerald-600';
  if (score >= 55) return 'text-indigo-600';
  if (score >= 35) return 'text-amber-500';
  return 'text-rose-500';
}

function globalRing(score: number) {
  if (score >= 75) return 'border-emerald-200 bg-emerald-50';
  if (score >= 55) return 'border-indigo-200 bg-indigo-50';
  if (score >= 35) return 'border-amber-200 bg-amber-50';
  return 'border-rose-200 bg-rose-50';
}

export default function MaturityScore({ result }: Props) {
  return (
    <section className="mt-10">
      <div className="flex items-center gap-2 mb-1">
        <span className="section-tag">Score de maturité projet</span>
      </div>

      {/* Global score */}
      <div className={`flex items-center gap-4 rounded-2xl border p-5 mb-6 ${globalRing(result.global)}`}>
        <div className={`text-4xl font-black tabular-nums ${globalColor(result.global)}`}>
          {result.global}<span className="text-xl font-semibold opacity-60">/100</span>
        </div>
        <div>
          <p className={`font-bold text-base ${globalColor(result.global)}`}>{result.label}</p>
          <p className="text-sm text-slate-600 leading-relaxed mt-0.5">{result.interpretation}</p>
        </div>
      </div>

      {/* Sub-scores grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {result.subScores.map((sub, i) => (
          <motion.div
            key={sub.id}
            className="bg-white rounded-xl border border-slate-200/70 p-4"
            initial={{ opacity: 0, y: 16, x: i % 2 === 0 ? -12 : 12 }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: i * 0.07 }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-base">{sub.icon}</span>
                <span className="text-sm font-semibold text-slate-700">{sub.label}</span>
              </div>
              <span className="text-sm font-bold text-slate-500 tabular-nums">{sub.score}</span>
            </div>
            <ScoreBar score={sub.score} delay={i * 0.07 + 0.1} />
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">{sub.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
