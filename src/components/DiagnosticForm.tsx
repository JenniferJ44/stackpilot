'use client';

import { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, CheckCircle2, Sparkles } from 'lucide-react';
import { getRecommendations, FormAnswers, ProjectType, CompanySize, Budget, Urgency } from '@/lib/scoring';
import ResultSection from './ResultSection';
import { ScoredTechnology } from '@/lib/scoring';
import { analyzeProjectDescription } from '@/lib/descriptionAnalyzer';

type Draft = {
  description: string;
  projectType: ProjectType | '';
  companySize: CompanySize | '';
  budget: Budget | '';
  urgency: Urgency | '';
  features: string[];
};

const PROJECT_TYPES: { value: ProjectType; label: string; icon: string }[] = [
  { value: 'webapp', label: 'Application web', icon: '🌐' },
  { value: 'mobile', label: 'Application mobile', icon: '📱' },
  { value: 'marketplace', label: 'Marketplace', icon: '🛒' },
  { value: 'crm', label: 'CRM / Gestion clients', icon: '👥' },
  { value: 'automation', label: 'Automatisation', icon: '⚡' },
  { value: 'documentation', label: 'Gestion documentaire', icon: '📚' },
  { value: 'interne', label: 'Outil interne', icon: '🏢' },
];

const SIZES: { value: CompanySize; label: string; icon: string }[] = [
  { value: 'solo', label: 'Solo / Freelance', icon: '🧑' },
  { value: 'small', label: '2 à 10 personnes', icon: '👥' },
  { value: 'medium', label: '11 à 50 personnes', icon: '🏢' },
  { value: 'large', label: 'Plus de 50 personnes', icon: '🏭' },
];

const BUDGETS: { value: Budget; label: string; icon: string; sub: string }[] = [
  { value: 'low', label: 'Moins de 500 €/mois', icon: '💰', sub: 'Solutions no-code abordables' },
  { value: 'medium', label: '500 à 2 000 €/mois', icon: '💳', sub: 'Outils professionnels' },
  { value: 'high', label: 'Plus de 2 000 €/mois', icon: '💎', sub: 'Solutions enterprise' },
];

const URGENCIES: { value: Urgency; label: string; icon: string; sub: string }[] = [
  { value: 'urgent', label: 'Urgent', icon: '🚀', sub: 'Moins d\'un mois' },
  { value: 'normal', label: 'Normal', icon: '📅', sub: '1 à 3 mois' },
  { value: 'long', label: 'Long terme', icon: '🌱', sub: '3 mois et plus' },
];

const FEATURES: { value: string; label: string; icon: string }[] = [
  { value: 'users', label: 'Comptes utilisateurs', icon: '👤' },
  { value: 'automation', label: 'Automatisation', icon: '⚙️' },
  { value: 'crm', label: 'CRM', icon: '📊' },
  { value: 'documents', label: 'Gestion documentaire', icon: '📄' },
  { value: 'payment', label: 'Paiement en ligne', icon: '💳' },
  { value: 'dashboard', label: 'Tableaux de bord', icon: '📈' },
];

const STEP_LABELS = [
  'Votre projet',
  'Votre structure',
  'Budget & délais',
  'Fonctionnalités',
];

const TOTAL_STEPS = 4;

export default function DiagnosticForm() {
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState<Draft>({
    description: '',
    projectType: '',
    companySize: '',
    budget: '',
    urgency: '',
    features: [],
  });
  const [results, setResults] = useState<ScoredTechnology[] | null>(null);
  const [formAnswers, setFormAnswers] = useState<FormAnswers | null>(null);
  const [autofillApplied, setAutofillApplied] = useState(false);

  // Auto-fill from description when user leaves the description field
  useEffect(() => {
    if (!draft.description || draft.description.trim().length < 20) return;
    const analysis = analyzeProjectDescription(draft.description);
    if (analysis.confidenceScore < 0.25) return;

    let changed = false;
    const updates: Partial<Draft> = {};

    if (!draft.projectType && analysis.suggestedFormValues.projectType) {
      updates.projectType = analysis.suggestedFormValues.projectType;
      changed = true;
    }

    if (analysis.suggestedFormValues.features.length > 0) {
      const newFeatures = [...new Set([...draft.features, ...analysis.suggestedFormValues.features])];
      if (newFeatures.length > draft.features.length) {
        updates.features = newFeatures;
        changed = true;
      }
    }

    if (changed) {
      setDraft((prev) => ({ ...prev, ...updates }));
      setAutofillApplied(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draft.description]);

  function toggleFeature(v: string) {
    setDraft((d) => ({
      ...d,
      features: d.features.includes(v) ? d.features.filter((f) => f !== v) : [...d.features, v],
    }));
  }

  function canAdvance(): boolean {
    if (step === 1) return draft.projectType !== '';
    if (step === 2) return draft.companySize !== '';
    if (step === 3) return draft.budget !== '' && draft.urgency !== '';
    return true;
  }

  function handleSubmit() {
    if (!draft.projectType || !draft.companySize || !draft.budget || !draft.urgency) return;
    const answers: FormAnswers = {
      description: draft.description,
      projectType: draft.projectType,
      companySize: draft.companySize,
      budget: draft.budget,
      urgency: draft.urgency,
      features: draft.features,
    };
    setFormAnswers(answers);
    setResults(getRecommendations(answers));
  }

  function reset() {
    setStep(1);
    setDraft({ description: '', projectType: '', companySize: '', budget: '', urgency: '', features: [] });
    setResults(null);
    setFormAnswers(null);
    setAutofillApplied(false);
  }

  if (results) {
    return <ResultSection results={results} answers={formAnswers ?? undefined} onReset={reset} />;
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="px-6 pt-6 pb-4 border-b border-slate-100">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium text-slate-500">
            Étape {step} sur {TOTAL_STEPS}
          </span>
          <span className="text-sm font-semibold text-blue-600">{STEP_LABELS[step - 1]}</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-1.5">
          <div
            className="h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 transition-all duration-300"
            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </div>

      <div className="p-6">
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Décrivez votre projet en quelques mots <span className="text-slate-400 font-normal">(optionnel)</span>
              </label>
              <textarea
                rows={3}
                value={draft.description}
                onChange={(e) => setDraft({ ...draft, description: e.target.value })}
                placeholder="Ex : Je veux créer une plateforme pour gérer mes clients et automatiser mes relances..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 resize-none bg-slate-50"
              />
            </div>
            {autofillApplied && (
              <div className="flex items-start gap-2 bg-violet-50 border border-violet-100 rounded-xl px-4 py-2.5 text-xs text-violet-700">
                <Sparkles className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                <span>Champs pré-remplis à partir de votre description. Vous pouvez les modifier librement.</span>
              </div>
            )}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Quel est le type principal de votre projet ? <span className="text-red-400">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {PROJECT_TYPES.map((pt) => (
                  <button
                    key={pt.value}
                    onClick={() => setDraft({ ...draft, projectType: pt.value })}
                    className={`flex items-center gap-2 px-3 py-3 rounded-xl border text-sm font-medium transition-all text-left ${
                      draft.projectType === pt.value
                        ? 'bg-blue-50 border-blue-300 text-blue-700 ring-1 ring-blue-200'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <span>{pt.icon}</span>
                    {pt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Quelle est la taille de votre structure ? <span className="text-red-400">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SIZES.map((s) => (
                <button
                  key={s.value}
                  onClick={() => setDraft({ ...draft, companySize: s.value })}
                  className={`flex items-center gap-3 px-4 py-4 rounded-xl border text-sm font-medium transition-all text-left ${
                    draft.companySize === s.value
                      ? 'bg-blue-50 border-blue-300 text-blue-700 ring-1 ring-blue-200'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span className="text-2xl">{s.icon}</span>
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Budget mensuel approximatif <span className="text-red-400">*</span>
              </label>
              <div className="grid grid-cols-1 gap-3">
                {BUDGETS.map((b) => (
                  <button
                    key={b.value}
                    onClick={() => setDraft({ ...draft, budget: b.value })}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium transition-all text-left ${
                      draft.budget === b.value
                        ? 'bg-blue-50 border-blue-300 text-blue-700 ring-1 ring-blue-200'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <span className="text-xl">{b.icon}</span>
                    <div>
                      <div>{b.label}</div>
                      <div className="text-xs font-normal text-slate-400">{b.sub}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Urgence du projet <span className="text-red-400">*</span>
              </label>
              <div className="grid grid-cols-3 gap-3">
                {URGENCIES.map((u) => (
                  <button
                    key={u.value}
                    onClick={() => setDraft({ ...draft, urgency: u.value })}
                    className={`flex flex-col items-center gap-1 px-3 py-4 rounded-xl border text-sm font-medium transition-all text-center ${
                      draft.urgency === u.value
                        ? 'bg-blue-50 border-blue-300 text-blue-700 ring-1 ring-blue-200'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <span className="text-2xl">{u.icon}</span>
                    <span>{u.label}</span>
                    <span className="text-xs font-normal text-slate-400">{u.sub}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Quels éléments sont importants pour votre projet ?
            </label>
            <p className="text-sm text-slate-400 mb-4">Sélectionnez tout ce qui s'applique</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {FEATURES.map((f) => (
                <button
                  key={f.value}
                  onClick={() => toggleFeature(f.value)}
                  className={`flex items-center gap-2 px-3 py-3 rounded-xl border text-sm font-medium transition-all text-left ${
                    draft.features.includes(f.value)
                      ? 'bg-violet-50 border-violet-300 text-violet-700 ring-1 ring-violet-200'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span>{f.icon}</span>
                  <span>{f.label}</span>
                  {draft.features.includes(f.value) && (
                    <CheckCircle2 className="w-3.5 h-3.5 ml-auto shrink-0 text-violet-500" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="px-6 pb-6 flex justify-between gap-3">
        {step > 1 ? (
          <button
            onClick={() => setStep(step - 1)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Retour
          </button>
        ) : (
          <div />
        )}

        {step < TOTAL_STEPS ? (
          <button
            onClick={() => canAdvance() && setStep(step + 1)}
            disabled={!canAdvance()}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${
              canAdvance()
                ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white hover:opacity-90 shadow-sm'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            Continuer
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-sm"
          >
            Voir mes recommandations
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
