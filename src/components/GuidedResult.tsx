'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Clock, Target, AlertTriangle, HelpCircle, Layers, FileText, Lightbulb, ArrowRight, ChevronDown, ChevronUp, GitBranch } from 'lucide-react';
import { getAlternateInitial } from '@/lib/animations';
import { GuidedRecommendation, GuidedAnswers } from '@/lib/guidedScoring';
import { technologies } from '@/data/technologies';
import Link from 'next/link';
import DiagnosticContactForm from './DiagnosticContactForm';
import { computeMaturity } from '@/lib/maturityScoring';
import CalendlyPopupButton, { triggerCalendlyPopup } from '@/components/CalendlyPopupButton';
import { DEFAULT_ROADMAP, getEstimation, getRelatedProjects, SERVICE_OPTIONS } from '@/data/resultConfig';
import MaturityScore from './MaturityScore';
import RecommendedRoadmap from './RecommendedRoadmap';
import IndicativeEstimate from './IndicativeEstimate';
import RelatedProjects from './RelatedProjects';
import ServiceOptions from './ServiceOptions';
import GeneratedBrief from './GeneratedBrief';
import DownloadDiagnosticPdfButton from './DownloadDiagnosticPdfButton';

type Props = {
  recommendation: GuidedRecommendation;
  answers: GuidedAnswers;
  onReset: () => void;
};

type FormState = 'idle' | 'open' | 'success';

const TECH_ICONS_INLINE: Record<string, string> = {
  Bubble: '🔵', Airtable: '🟡', Make: '⚡', Notion: '⬛', Salesforce: '☁️',
  SharePoint: '📁', 'Power Automate': '🔷', DocuSign: '✍️', 'Claude Code': '🤖',
  HubSpot: '🟠', Zapier: '🔶', Webflow: '🌊', Framer: '🖼️', WordPress: '📰',
  Stripe: '💳', Softr: '⬜',
};

const NECESSITY_ICONS: Record<string, string> = {
  required: '✅',
  useful: '🔵',
  phase2: '⏳',
  'single-tool': '🎯',
  'too-complex': '⚠️',
};

export default function GuidedResult({ recommendation: rec, answers, onReset }: Props) {
  const [formState, setFormState] = useState<FormState>('idle');
  const [expandedTool, setExpandedTool] = useState<string | null>(null);
  const hasCombination = rec.techStack.length > 1;
  const formAnchorRef = useRef<HTMLDivElement>(null);

  const maturity = computeMaturity(answers);
  const primaryTechId = rec.techStack.find((t) => t.necessity === 'primary')?.name.toLowerCase().replace(/\s+/g, '-') ?? '';
  const estimation = getEstimation(primaryTechId);
  const relatedProjects = getRelatedProjects(rec.techStack);

  useEffect(() => {
    if (formState === 'open') {
      setTimeout(() => {
        formAnchorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  }, [formState]);

  return (
    <div className="mt-8 space-y-5">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold border border-indigo-200/50 mb-3">
          <CheckCircle className="w-4 h-4" />
          Diagnostic terminé — architecture prête
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Votre architecture recommandée</h2>
      </div>

      {/* 1. Reformulation */}
      <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl px-5 py-3 text-sm text-indigo-900 leading-relaxed">
        <span className="font-semibold text-indigo-700">Notre lecture : </span>
        {rec.reformulation}
      </div>

      {/* 1b. Maturity score */}
      <MaturityScore result={maturity} />

      {/* 2. Stack recommandée */}
      <div className="bg-white border border-slate-200/60 rounded-2xl shadow-sm p-5">
        <div className="flex items-center gap-2 mb-4">
          <Layers className="w-4 h-4 text-indigo-600" />
          <h3 className="text-sm font-bold text-slate-800">Architecture recommandée</h3>
          <span className="ml-auto text-xs text-slate-400 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-md">
            {rec.techStack.length} bloc{rec.techStack.length > 1 ? 's' : ''}
          </span>
        </div>

        <div className="space-y-3">
          {rec.techStack.map((tech, techIdx) => {
            const relatedTech = technologies.find(
              (t) => t.name.toLowerCase() === tech.name.toLowerCase()
            );
            const necessityStyles = {
              primary:  'border-indigo-200 bg-indigo-50/60',
              secondary:'border-slate-200/70 bg-white',
              optional: 'border-slate-100 bg-slate-50/60',
            };

            return (
              <motion.div
                key={tech.name}
                initial={getAlternateInitial(techIdx)}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: techIdx * 0.1 }}
                className={`flex items-start gap-3 border rounded-xl px-4 py-3 ${necessityStyles[tech.necessity]}`}
              >
                <span className="text-2xl shrink-0">{tech.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    {relatedTech ? (
                      <Link
                        href={`/technologies/${relatedTech.id}`}
                        className="font-bold text-slate-900 hover:text-indigo-700 transition-colors text-sm"
                      >
                        {tech.name}
                      </Link>
                    ) : (
                      <span className="font-bold text-slate-900 text-sm">{tech.name}</span>
                    )}
                    {tech.necessity === 'primary' && (
                      <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-md font-semibold border border-indigo-200/50">
                        Bloc principal
                      </span>
                    )}
                    {tech.necessity === 'secondary' && (
                      <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium border border-slate-200/60">
                        Secondaire
                      </span>
                    )}
                    {tech.necessity === 'optional' && (
                      <span className="text-xs bg-slate-50 text-slate-400 px-2 py-0.5 rounded-md font-medium border border-slate-200">
                        Optionnel
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 leading-snug">{tech.role}</p>

                  {tech.prosCons && (tech.prosCons.advantages.length > 0 || tech.prosCons.drawbacks.length > 0) && (
                    <div className="mt-1.5">
                      <button
                        onClick={() => setExpandedTool(expandedTool === tech.name ? null : tech.name)}
                        className="flex items-center gap-1 text-xs text-slate-400 hover:text-blue-600 transition-colors"
                      >
                        {expandedTool === tech.name ? (
                          <ChevronUp className="w-3 h-3" />
                        ) : (
                          <ChevronDown className="w-3 h-3" />
                        )}
                        Pour votre projet
                      </button>
                      {expandedTool === tech.name && (
                        <div className="mt-2 space-y-1.5">
                          {tech.prosCons.advantages.map((a) => (
                            <div key={a} className="flex items-start gap-1.5 text-xs text-green-700">
                              <CheckCircle className="w-3 h-3 mt-0.5 shrink-0 text-green-500" />
                              {a}
                            </div>
                          ))}
                          {tech.prosCons.drawbacks.map((d) => (
                            <div key={d} className="flex items-start gap-1.5 text-xs text-amber-700">
                              <AlertTriangle className="w-3 h-3 mt-0.5 shrink-0 text-amber-400" />
                              {d}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 3. Combination necessity */}
      {hasCombination && (
        <div className="flex items-center gap-3">
          <span className="text-base">{NECESSITY_ICONS[rec.combinationNecessity]}</span>
          <div>
            <span className="text-xs text-slate-500 mr-2">Nécessité de la combinaison :</span>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${rec.combinationColor}`}>
              {rec.combinationLabel}
            </span>
          </div>
        </div>
      )}

      {/* 4. Rationale */}
      <div className="bg-white border border-slate-200/60 rounded-2xl shadow-sm p-5">
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb className="w-4 h-4 text-yellow-500" />
          <h3 className="text-sm font-bold text-slate-800">Pourquoi cette architecture</h3>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">{rec.rationale}</p>
      </div>

      {/* 5. V1 simplification */}
      {rec.v1Simplification && (
        <div className="bg-amber-50 border border-amber-100 rounded-xl px-5 py-3">
          <div className="flex items-start gap-2 text-sm text-amber-900">
            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold mb-0.5">Ce qui peut être simplifié pour une V1</p>
              <p className="leading-relaxed">{rec.v1Simplification}</p>
            </div>
          </div>
        </div>
      )}

      {/* 6. MVP */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-green-50 border border-green-100 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-4 h-4 text-green-600" />
            <h3 className="text-sm font-bold text-green-800">MVP — À garder en V1</h3>
          </div>
          <ul className="space-y-2">
            {rec.mvpKeep.map((item) => (
              <li key={item} className="flex items-start gap-2 text-xs text-green-900">
                <CheckCircle className="w-3.5 h-3.5 text-green-500 mt-0.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {rec.mvpDefer.length > 0 && (
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <ArrowRight className="w-4 h-4 text-slate-500" />
              <h3 className="text-sm font-bold text-slate-700">À reporter en phase 2</h3>
            </div>
            <ul className="space-y-2">
              {rec.mvpDefer.map((item) => (
                <li key={item} className="flex items-start gap-2 text-xs text-slate-600">
                  <XCircle className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* 7. Duration */}
      <div className="bg-teal-50 border border-teal-100 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-4 h-4 text-teal-600" />
          <h3 className="text-sm font-bold text-teal-800">Durée indicative</h3>
        </div>
        <p className="text-sm text-teal-800 leading-relaxed">{rec.estimatedDuration}</p>
      </div>

      {/* 8. Watchouts */}
      {rec.watchouts.length > 0 && (
        <div className="bg-white border border-slate-200/60 rounded-2xl shadow-sm p-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <h3 className="text-sm font-bold text-slate-800">Points de vigilance</h3>
          </div>
          <ul className="space-y-2">
            {rec.watchouts.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-amber-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 9. Clarifying questions */}
      {rec.clarifyingQuestions.length > 0 && (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <HelpCircle className="w-4 h-4 text-slate-500" />
            <h3 className="text-sm font-semibold text-slate-700">Questions à clarifier avant de démarrer</h3>
          </div>
          <ul className="space-y-2">
            {rec.clarifyingQuestions.map((q) => (
              <li key={q} className="flex items-start gap-2 text-sm text-slate-600">
                <Lightbulb className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                {q}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 10. Alternative recommendation */}
      {rec.alternativeRecommendation?.shouldDisplay && (
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <GitBranch className="w-4 h-4 text-amber-600" />
            <h3 className="text-sm font-bold text-amber-900">Stack alternative à considérer</h3>
          </div>
          <p className="text-sm font-semibold text-amber-800 mb-1">
            {rec.alternativeRecommendation.stackName}
          </p>
          {rec.alternativeRecommendation.tools.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {rec.alternativeRecommendation.tools.map((t) => (
                <span key={t} className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium border border-amber-200">
                  {TECH_ICONS_INLINE[t] ?? ''} {t}
                </span>
              ))}
            </div>
          )}
          <p className="text-xs text-amber-800 mb-3 leading-relaxed">
            <span className="font-semibold">Quand la préférer : </span>
            {rec.alternativeRecommendation.whenPreferable}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <p className="text-xs font-semibold text-green-700 mb-1">Avantages</p>
              <ul className="space-y-1">
                {rec.alternativeRecommendation.advantages.map((a) => (
                  <li key={a} className="flex items-start gap-1.5 text-xs text-green-800">
                    <CheckCircle className="w-3 h-3 mt-0.5 shrink-0 text-green-500" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold text-red-600 mb-1">Limites</p>
              <ul className="space-y-1">
                {rec.alternativeRecommendation.limits.map((l) => (
                  <li key={l} className="flex items-start gap-1.5 text-xs text-red-800">
                    <XCircle className="w-3 h-3 mt-0.5 shrink-0 text-red-400" />
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-xs text-amber-700 mt-3 italic leading-relaxed border-t border-amber-100 pt-3">
            {rec.alternativeRecommendation.relevanceNote}
          </p>
        </div>
      )}

      {/* 11. Roadmap */}
      <RecommendedRoadmap steps={DEFAULT_ROADMAP} />

      {/* 12. Estimation */}
      <IndicativeEstimate estimation={estimation} />

      {/* 13. Related projects */}
      <RelatedProjects projects={relatedProjects} />

      {/* 14. Service options */}
      <ServiceOptions options={SERVICE_OPTIONS} onCtaClick={(opt) => {
        if (opt.id === 'cadrage') {
          triggerCalendlyPopup('service-options');
        } else if (opt.id === 'mvp') {
          setFormState('open');
        }
      }} />

      {/* 15. Generated brief */}
      <GeneratedBrief
        recommendation={rec}
        projectCategory={answers.projectCategory}
        mainObjective={answers.mainObjective}
      />

      {/* 16. CTA */}
      <div ref={formAnchorRef} />
      {formState === 'success' ? (
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-100 rounded-2xl p-6 text-center">
            <div className="flex justify-center mb-3">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Diagnostic envoyé !</h3>
            <p className="text-sm text-slate-600">
              Merci, votre diagnostic a bien été transmis. Je reviendrai vers vous pour affiner
              le besoin et préparer un devis.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center flex-wrap">
            <CalendlyPopupButton
              context="diagnostic-success"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-indigo-200 bg-white text-indigo-700 text-sm font-semibold hover:bg-indigo-50 transition-colors"
              label="Réserver un appel"
            />
            <DownloadDiagnosticPdfButton
              answers={answers}
              recommendation={rec}
              maturity={maturity}
              estimation={estimation}
              roadmap={DEFAULT_ROADMAP}
            />
          </div>
          <div className="text-center">
            <button
              onClick={onReset}
              className="text-xs text-slate-400 hover:text-slate-600 transition-colors underline underline-offset-2"
            >
              Refaire le diagnostic
            </button>
          </div>
        </div>
      ) : formState === 'open' ? (
        <DiagnosticContactForm
          answers={answers}
          recommendation={rec}
          onSuccess={() => setFormState('success')}
          onCancel={() => setFormState('idle')}
        />
      ) : (
        <div className="bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100 rounded-2xl p-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-indigo-200/20 blur-2xl" />
          </div>
          <div className="relative">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-indigo-600/70 mb-3">
              <span className="w-8 h-px bg-indigo-300/50" />
              Prochaine étape
              <span className="w-8 h-px bg-indigo-300/50" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Prêt à passer à l&apos;étape suivante ?
            </h3>
            <p className="text-slate-600 text-sm mb-5 max-w-xl mx-auto">
              Demandez un devis à partir de votre diagnostic, réservez un appel de cadrage,
              ou exportez ce brief pour en discuter en interne.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center flex-wrap">
              <button
                onClick={() => setFormState('open')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-sm"
              >
                <FileText className="w-4 h-4" />
                Demander un devis
              </button>
              <CalendlyPopupButton
                context="diagnostic-result"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-indigo-200 bg-white text-indigo-700 text-sm font-semibold hover:bg-indigo-50 transition-colors"
                label="Réserver un appel"
              />
              <DownloadDiagnosticPdfButton
                answers={answers}
                recommendation={rec}
                maturity={maturity}
                estimation={estimation}
                roadmap={DEFAULT_ROADMAP}
              />
            </div>
            <button
              onClick={onReset}
              className="mt-3 text-xs text-slate-400 hover:text-slate-600 transition-colors underline underline-offset-2"
            >
              Refaire le diagnostic
            </button>
          </div>
        </div>
      )}

      <p className="text-center text-xs text-slate-400">
        ⚠️ Ces recommandations sont générées à partir d&apos;une matrice locale. Les prix et
        fonctionnalités sont indicatifs — vérifiez les conditions actuelles sur les sites officiels.
      </p>
    </div>
  );
}
