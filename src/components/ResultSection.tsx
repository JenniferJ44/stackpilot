'use client';

import { CheckCircle, Star, AlertCircle, FileText, ArrowRight, HelpCircle, Lightbulb, Clock, Target, ListChecks, Layers, Brain, TriangleAlert } from 'lucide-react';
import { ScoredTechnology, FormAnswers } from '@/lib/scoring';
import { buildAgentInsight } from '@/lib/agentLogic';
import { analyzeProjectDescription, NEED_LABELS, TYPE_LABELS } from '@/lib/descriptionAnalyzer';
import { useMemo, useState } from 'react';
import DiagnosticContactForm, { DiagnosticSuccessCard } from './DiagnosticContactForm';

type Props = {
  results: ScoredTechnology[];
  answers?: FormAnswers;
  onReset: () => void;
};

const rankColors = [
  'from-yellow-400 to-orange-400',
  'from-slate-300 to-slate-400',
  'from-orange-300 to-yellow-600',
];
const rankLabels = ['🥇 Recommandation principale', '🥈 Alternative solide', '🥉 Bonne option'];

const confidenceBadge: Record<string, string> = {
  'Fort': 'bg-green-100 text-green-700',
  'Moyen': 'bg-yellow-100 text-yellow-700',
  'À préciser': 'bg-slate-100 text-slate-600',
};

type FormState = 'idle' | 'open' | 'success';

export default function ResultSection({ results, answers, onReset }: Props) {
  const top = results.slice(0, 3);
  const first = top[0];
  const [formState, setFormState] = useState<FormState>('idle');

  const insight = useMemo(
    () => (answers ? buildAgentInsight(answers, results) : null),
    [answers, results]
  );

  const analysis = useMemo(
    () =>
      answers?.description && answers.description.trim().length >= 15
        ? analyzeProjectDescription(answers.description)
        : null,
    [answers?.description]
  );

  return (
    <div className="mt-8 space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <CheckCircle className="w-4 h-4" />
          Analyse terminée — {results.length} technologies évaluées
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Votre stack recommandée</h2>
        <p className="text-slate-500 mt-1 text-sm">
          Basé sur votre projet, voici les outils les mieux adaptés à vos besoins.
        </p>
      </div>

      {/* Ce que j'ai compris */}
      {analysis && (analysis.projectTypeDetected || analysis.detectedNeeds.length > 0) && (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-slate-500" />
            <h3 className="text-sm font-semibold text-slate-700">Ce que j&apos;ai compris de votre projet</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {analysis.projectTypeDetected && (
              <div className="bg-white rounded-xl border border-slate-100 px-3 py-2">
                <p className="text-slate-400 font-medium uppercase tracking-wide mb-0.5">Type détecté</p>
                <p className="text-slate-700 font-semibold">{TYPE_LABELS[analysis.projectTypeDetected]}</p>
              </div>
            )}
            <div className="bg-white rounded-xl border border-slate-100 px-3 py-2">
              <p className="text-slate-400 font-medium uppercase tracking-wide mb-0.5">Complexité estimée</p>
              <p className="text-slate-700 font-semibold capitalize">{analysis.complexityLevel}</p>
            </div>
          </div>

          {analysis.detectedNeeds.length > 0 && (
            <div>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-2">Besoins détectés</p>
              <div className="flex flex-wrap gap-1.5">
                {analysis.detectedNeeds.map((need) => (
                  <span key={need} className="text-xs bg-blue-50 border border-blue-100 text-blue-700 px-2.5 py-1 rounded-lg font-medium">
                    {NEED_LABELS[need]}
                  </span>
                ))}
              </div>
            </div>
          )}

          {analysis.detectedTools.length > 0 && (
            <div>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-2">Outils mentionnés</p>
              <div className="flex flex-wrap gap-1.5">
                {analysis.detectedTools.map((tool) => (
                  <span key={tool} className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg font-medium">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}

          {analysis.warnings.length > 0 && (
            <div className="space-y-1.5">
              {analysis.warnings.map((w, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-amber-800 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2">
                  <TriangleAlert className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" />
                  {w}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Reformulation banner */}
      {first?.reformulation && (
        <div className="bg-blue-50 border border-blue-100 rounded-xl px-5 py-3 text-sm text-blue-800 leading-relaxed">
          <span className="font-semibold">Notre lecture : </span>
          {first.reformulation}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {top.map((tech, i) => (
          <div
            key={tech.id}
            className={`relative bg-white rounded-2xl border shadow-sm overflow-hidden flex flex-col ${
              i === 0 ? 'border-blue-200 ring-2 ring-blue-100' : 'border-slate-100'
            }`}
          >
            <div className={`h-1.5 w-full bg-gradient-to-r ${rankColors[i]}`} />

            <div className="p-5 flex flex-col flex-1">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs font-medium text-slate-400 mb-1">{rankLabels[i]}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{tech.icon}</span>
                    <h3 className="font-bold text-slate-900 text-lg">{tech.name}</h3>
                  </div>
                  <span className="inline-block mt-1 text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                    {tech.categoryLabel}
                  </span>
                </div>
                <div className="text-right shrink-0 space-y-1">
                  <div className="text-2xl font-bold text-blue-600">{tech.matchPercent}%</div>
                  <div className="text-xs text-slate-400">match</div>
                  <span
                    className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${
                      confidenceBadge[tech.confidenceLevel]
                    }`}
                  >
                    {tech.confidenceLevel}
                  </span>
                </div>
              </div>

              <div className="w-full bg-slate-100 rounded-full h-1.5 mb-4">
                <div
                  className="h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-violet-500"
                  style={{ width: `${tech.matchPercent}%` }}
                />
              </div>

              {tech.matchReasons.length > 0 && (
                <div className="mb-4 space-y-1.5">
                  {tech.matchReasons.map((reason, j) => (
                    <div key={j} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle className="w-3.5 h-3.5 text-green-500 mt-0.5 shrink-0" />
                      {reason}
                    </div>
                  ))}
                </div>
              )}

              <p className="text-sm text-slate-500 mb-4 leading-relaxed">{tech.description}</p>

              {/* Première étape */}
              {tech.nextStep && (
                <div className="mb-3 bg-violet-50 border border-violet-100 rounded-xl p-3">
                  <p className="text-xs font-semibold text-violet-700 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                    <ArrowRight className="w-3 h-3" />
                    Première étape
                  </p>
                  <p className="text-xs text-violet-800 leading-relaxed">{tech.nextStep}</p>
                </div>
              )}

              {/* Points de vigilance */}
              {tech.contextualWatchouts.length > 0 && (
                <div className="mb-3 bg-amber-50 border border-amber-100 rounded-xl p-3">
                  <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                    <AlertCircle className="w-3 h-3" />
                    Points de vigilance
                  </p>
                  <ul className="space-y-1">
                    {tech.contextualWatchouts.map((w, j) => (
                      <li key={j} className="text-xs text-amber-800 leading-relaxed flex items-start gap-1.5">
                        <span className="mt-0.5 shrink-0">•</span>
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-auto space-y-3">
                <div className="bg-slate-50 rounded-xl p-3">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                    Idéal pour
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {tech.idealFor.slice(0, 3).map((item) => (
                      <span
                        key={item}
                        className="text-xs bg-white border border-slate-200 text-slate-600 px-2 py-1 rounded-lg"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{tech.pricing}</span>
                </div>

                {/* Alternatives */}
                {tech.alternativesNote && (
                  <div className="text-xs text-slate-400 italic leading-relaxed">
                    {tech.alternativesNote}
                  </div>
                )}

                {tech.jenniferLevel === 'expert' && (
                  <div className="flex items-center gap-1.5 text-xs font-medium text-violet-600">
                    <Star className="w-3.5 h-3.5 fill-violet-600" />
                    Expertise Jennifer Jaulin
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stack combinaison */}
      {insight?.stackCombination && (
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Layers className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-semibold text-blue-800">Stack recommandée</h3>
          </div>
          <div className="flex flex-wrap gap-3 mb-3">
            {insight.stackCombination.tools.map((tool) => (
              <div key={tool.name} className="flex items-start gap-2 bg-white border border-blue-100 rounded-xl px-3 py-2 flex-1 min-w-[140px]">
                <span className="text-lg shrink-0">{tool.icon}</span>
                <div>
                  <p className="text-xs font-semibold text-slate-800">{tool.name}</p>
                  <p className="text-xs text-slate-500 leading-tight">{tool.role}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-blue-700 leading-relaxed">{insight.stackCombination.why}</p>
        </div>
      )}

      {/* Durée & MVP */}
      {insight && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-teal-50 border border-teal-100 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-teal-600" />
              <h3 className="text-sm font-semibold text-teal-800">Durée indicative</h3>
            </div>
            <p className="text-sm font-semibold text-teal-700 mb-3">{insight.projectDuration.label}</p>
            <ul className="space-y-1">
              {insight.projectDuration.phases.map((phase) => (
                <li key={phase.name} className="flex items-start gap-2 text-xs text-teal-800">
                  <span className="mt-0.5 shrink-0 text-teal-400">▸</span>
                  <span><span className="font-medium">{phase.name}</span> — {phase.duration}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-green-50 border border-green-100 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-4 h-4 text-green-600" />
              <h3 className="text-sm font-semibold text-green-800">Cadrage MVP</h3>
            </div>
            <ul className="space-y-1.5">
              {insight.mvpScope.map((item) => (
                <li key={item} className="flex items-start gap-2 text-xs text-green-800">
                  <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Étapes projet */}
      {insight && (
        <div className="bg-violet-50 border border-violet-100 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <ListChecks className="w-4 h-4 text-violet-600" />
            <h3 className="text-sm font-semibold text-violet-800">Étapes du projet</h3>
          </div>
          <ol className="space-y-3">
            {insight.projectSteps.map((step) => (
              <li key={step.number} className="flex gap-3">
                <span className="w-5 h-5 rounded-full bg-violet-200 text-violet-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {step.number}
                </span>
                <div>
                  <p className="text-xs font-semibold text-violet-800">{step.title}</p>
                  <p className="text-xs text-violet-700 leading-relaxed mt-0.5">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Questions de précision si confiance faible */}
      {first?.needsMoreInfo && first.followUpQuestions.length > 0 && (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <HelpCircle className="w-4 h-4 text-slate-500" />
            <h3 className="text-sm font-semibold text-slate-700">
              Pour affiner ces recommandations, posez-vous ces questions :
            </h3>
          </div>
          <ul className="space-y-2">
            {first.followUpQuestions.map((q, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                <Lightbulb className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />
                {q}
              </li>
            ))}
          </ul>
        </div>
      )}

      {formState === 'success' ? (
        <DiagnosticSuccessCard onReset={onReset} />
      ) : formState === 'open' ? (
        <DiagnosticContactForm
          onSuccess={() => setFormState('success')}
          onCancel={() => setFormState('idle')}
        />
      ) : (
        <div className="bg-gradient-to-br from-blue-50 to-violet-50 border border-blue-100 rounded-2xl p-6 text-center">
          <h3 className="text-lg font-bold text-slate-900 mb-2">
            Besoin d&apos;un accompagnement pour mettre en place cette stack ?
          </h3>
          <p className="text-slate-600 text-sm mb-5 max-w-xl mx-auto">
            Envoyez-moi votre diagnostic pour que je puisse analyser votre besoin et vous préparer
            une première estimation.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => setFormState('open')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-sm"
            >
              <FileText className="w-4 h-4" />
              Recevoir un devis à partir de ce diagnostic
            </button>
            <button
              onClick={onReset}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors"
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
