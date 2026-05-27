'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronDown, Send } from 'lucide-react';
import { GuidedRecommendation } from '@/lib/guidedScoring';

type Props = {
  recommendation: GuidedRecommendation;
  projectCategory?: string | null;
  mainObjective?: string | null;
};

export default function GeneratedBrief({ recommendation, projectCategory, mainObjective }: Props) {
  const [open, setOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const stackNames = recommendation.techStack.map((t) => t.name).join(', ');

  const mailtoBody = [
    `Bonjour,`,
    ``,
    `Suite au diagnostic StackPilot, voici le brief de mon projet :`,
    ``,
    `Catégorie : ${projectCategory ?? 'Non précisée'}`,
    `Objectif principal : ${mainObjective ?? 'Non précisé'}`,
    `Stack recommandée : ${stackNames}`,
    ``,
    `Reformulation : ${recommendation.reformulation}`,
    ``,
    `Fonctionnalités MVP :`,
    ...(recommendation.mvpKeep?.map((f) => `- ${f}`) ?? []),
    ``,
    `Points d'attention :`,
    ...(recommendation.watchouts?.map((w) => `- ${w}`) ?? []),
    ``,
    `Alternative envisagée : ${recommendation.alternativeRecommendation?.stackName ?? 'Aucune'}`,
    ``,
    `Cordialement`,
  ].join('\n');

  const mailtoHref = `mailto:jennifer.jaulin1@gmail.com?subject=Brief%20projet%20StackPilot&body=${encodeURIComponent(mailtoBody)}`;

  return (
    <section className="mt-10">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-3 bg-white rounded-2xl border border-slate-200/70 px-5 py-4 text-left hover:border-indigo-200 hover:shadow-[0_4px_20px_rgba(99,102,241,0.06)] transition-all duration-300"
        aria-expanded={open}
      >
        <div>
          <span className="section-tag block mb-0.5">Brief projet généré</span>
          <span className="font-bold text-slate-800 text-sm">Consulter le brief structuré de votre projet</span>
          <p className="text-xs text-slate-500 mt-0.5">Synthèse prête à partager ou à envoyer directement.</p>
        </div>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex-shrink-0 text-slate-400"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? {} : { opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-2 bg-white rounded-2xl border border-slate-200/70 overflow-hidden"
          >
            <div className="p-5 space-y-5">

              {/* Stack + category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {projectCategory && (
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Type de projet</p>
                    <p className="text-sm text-slate-700 font-medium">{projectCategory}</p>
                  </div>
                )}
                {mainObjective && (
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Objectif</p>
                    <p className="text-sm text-slate-700 font-medium">{mainObjective}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Stack recommandée</p>
                  <p className="text-sm text-slate-700 font-medium">{stackNames}</p>
                </div>
              </div>

              {/* Reformulation */}
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Notre lecture du besoin</p>
                <p className="text-sm text-slate-600 leading-relaxed">{recommendation.reformulation}</p>
              </div>

              {/* MVP keep */}
              {recommendation.mvpKeep && recommendation.mvpKeep.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Fonctionnalités V1</p>
                  <ul className="space-y-1">
                    {recommendation.mvpKeep.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Watchouts */}
              {recommendation.watchouts && recommendation.watchouts.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Points d'attention</p>
                  <ul className="space-y-1">
                    {recommendation.watchouts.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Questions */}
              {recommendation.clarifyingQuestions && recommendation.clarifyingQuestions.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Questions à clarifier</p>
                  <ul className="space-y-1">
                    {recommendation.clarifyingQuestions.map((q) => (
                      <li key={q} className="flex items-start gap-2 text-sm text-slate-600">
                        <span className="mt-1 text-indigo-400 font-bold flex-shrink-0">?</span>
                        {q}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Alternative */}
              {recommendation.alternativeRecommendation?.shouldDisplay && (
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Alternative envisageable</p>
                  <p className="text-sm text-slate-600">{recommendation.alternativeRecommendation.stackName} — {recommendation.alternativeRecommendation.relevanceNote}</p>
                </div>
              )}
            </div>

            {/* Send CTA */}
            <div className="border-t border-slate-100 px-5 py-4 bg-slate-50/50 flex items-center justify-between gap-3 flex-wrap">
              <p className="text-xs text-slate-500">Envoyez ce brief directement pour démarrer la conversation.</p>
              <a
                href={mailtoHref}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                Envoyer ce brief
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
