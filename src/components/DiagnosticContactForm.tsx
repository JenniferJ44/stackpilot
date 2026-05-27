'use client';

import { useState } from 'react';
import { Send, X, CheckCircle, PenLine } from 'lucide-react';
import { GuidedAnswers, GuidedRecommendation } from '@/lib/guidedScoring';

type FormFields = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  gdprConsent: boolean;
};

type EditableSummary = {
  needSummary: string;
  recommendedStack: string;
  alternativeStack: string;
  mvp: string;
  estimatedDuration: string;
  risks: string;
  clarificationQuestions: string;
  additionalProjectDetails: string;
};

const EMPTY_FIELDS: FormFields = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  message: '',
  gdprConsent: false,
};

function bulleted(items: string[]): string {
  return items.length > 0 ? items.map((i) => `• ${i}`).join('\n') : '';
}

const OTHER_DETAIL_FIELD_LABELS: Record<string, string> = {
  existingTools: 'Autres outils',
  toolConnections: 'Autres connexions',
  selectedFeatures: 'Autres fonctionnalités',
  dataTypes: 'Autres types de données',
};

function buildInitialSummary(rec: GuidedRecommendation, answers?: GuidedAnswers): EditableSummary {
  const alt = rec.alternativeRecommendation;
  const altText = alt?.shouldDisplay
    ? `${alt.stackName} — ${alt.whenPreferable}`
    : '';
  const otherDetails = answers?.otherDetails ?? {};
  const otherLines = Object.entries(otherDetails).map(
    ([key, val]) => `${OTHER_DETAIL_FIELD_LABELS[key] ?? key} : ${val}`
  );
  return {
    needSummary: rec.reformulation,
    recommendedStack: rec.techStack.map((t) => t.name).join(', '),
    alternativeStack: altText,
    mvp: bulleted(rec.mvpKeep),
    estimatedDuration: rec.estimatedDuration,
    risks: bulleted(rec.watchouts),
    clarificationQuestions: bulleted(rec.clarifyingQuestions),
    additionalProjectDetails: otherLines.join('\n'),
  };
}

type Props = {
  answers?: GuidedAnswers;
  recommendation?: GuidedRecommendation;
  onSuccess: () => void;
  onCancel: () => void;
};

export default function DiagnosticContactForm({ answers, recommendation, onSuccess, onCancel }: Props) {
  const [fields, setFields] = useState<FormFields>(EMPTY_FIELDS);
  const [summary, setSummary] = useState<EditableSummary>(() =>
    recommendation ? buildInitialSummary(recommendation, answers) : buildInitialSummary({
      reformulation: '', techStack: [], combinationNecessity: 'single-tool',
      combinationLabel: '', combinationColor: '', rationale: '', v1Simplification: null,
      mvpKeep: [], mvpDefer: [], estimatedDuration: '', watchouts: [], clarifyingQuestions: [],
      alternativeRecommendation: null,
    })
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hasGuidedDiagnostic = !!(answers && recommendation);

  function setField<K extends keyof FormFields>(key: K, value: FormFields[K]) {
    setFields((prev) => ({ ...prev, [key]: value }));
  }

  function setSummaryField<K extends keyof EditableSummary>(key: K, value: string) {
    setSummary((prev) => ({ ...prev, [key]: value }));
  }

  const isValid =
    fields.firstName.trim() !== '' &&
    fields.lastName.trim() !== '' &&
    fields.email.trim() !== '' &&
    /\S+@\S+\.\S+/.test(fields.email) &&
    fields.gdprConsent;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/diagnostic-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contact: {
            firstName: fields.firstName.trim(),
            lastName: fields.lastName.trim(),
            email: fields.email.trim(),
            phone: fields.phone.trim() || null,
            company: fields.company.trim() || null,
            message: fields.message.trim() || null,
            consent: true,
          },
          ...(hasGuidedDiagnostic && recommendation && answers ? {
            diagnosticOriginal: {
              answers,
              recommendation,
              recommendedStack: recommendation.techStack.map((t) => t.name),
              stackRoles: recommendation.techStack.map((t) => ({
                name: t.name,
                role: t.role,
                necessity: t.necessity,
              })),
              necessityLevel: recommendation.combinationNecessity,
              mvp: recommendation.mvpKeep,
              estimatedDuration: recommendation.estimatedDuration,
              risks: recommendation.watchouts,
              clarificationQuestions: recommendation.clarifyingQuestions,
            },
            diagnosticEdited: {
              needSummary: summary.needSummary.trim(),
              recommendedStack: summary.recommendedStack.trim(),
              alternativeStack: summary.alternativeStack.trim(),
              mvp: summary.mvp.trim(),
              estimatedDuration: summary.estimatedDuration.trim(),
              risks: summary.risks.trim(),
              clarificationQuestions: summary.clarificationQuestions.trim(),
              additionalProjectDetails: summary.additionalProjectDetails.trim(),
            },
          } : {}),
          metadata: {
            source: hasGuidedDiagnostic
              ? 'StackPilot guided chat diagnostic'
              : 'StackPilot form diagnostic',
            submittedAt: new Date().toISOString(),
          },
        }),
      });

      if (!res.ok) throw new Error("Erreur lors de l'envoi");
      onSuccess();
    } catch {
      setError('Une erreur est survenue. Vous pouvez réessayer ou me contacter directement.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-6">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Envoyer ce diagnostic pour recevoir un devis
          </h3>
          <p className="text-sm text-slate-500 mt-0.5">
            Votre diagnostic est prérempli ci-dessous. Vous pouvez le relire, le compléter ou
            corriger certains éléments avant l&apos;envoi.
          </p>
        </div>
        <button
          onClick={onCancel}
          className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ── Partie 1 : Vos coordonnées ─────────────────────────────────── */}
        <div className="space-y-4">
          <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
            1 — Vos coordonnées
          </h4>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Prénom <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={fields.firstName}
                onChange={(e) => setField('firstName', e.target.value)}
                placeholder="Marie"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 bg-slate-50"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Nom <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={fields.lastName}
                onChange={(e) => setField('lastName', e.target.value)}
                placeholder="Dupont"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 bg-slate-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Email <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              value={fields.email}
              onChange={(e) => setField('email', e.target.value)}
              placeholder="marie@entreprise.fr"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 bg-slate-50"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Téléphone <span className="text-slate-400 font-normal">(optionnel)</span>
              </label>
              <input
                type="tel"
                value={fields.phone}
                onChange={(e) => setField('phone', e.target.value)}
                placeholder="+33 6 00 00 00 00"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 bg-slate-50"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Entreprise <span className="text-slate-400 font-normal">(optionnel)</span>
              </label>
              <input
                type="text"
                value={fields.company}
                onChange={(e) => setField('company', e.target.value)}
                placeholder="Mon Entreprise SAS"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 bg-slate-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Précisions complémentaires sur votre projet <span className="text-slate-400 font-normal">(optionnel)</span>
            </label>
            <textarea
              rows={2}
              value={fields.message}
              onChange={(e) => setField('message', e.target.value)}
              placeholder="Ajoutez ici toute précision utile pour préparer le devis : contexte, contraintes, échéance, outils imposés…"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 resize-none bg-slate-50"
            />
          </div>
        </div>

        {/* ── Partie 2 : Résumé du diagnostic (uniquement si diagnostic guidé) ── */}
        {hasGuidedDiagnostic && <div className="space-y-4 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <PenLine className="w-3.5 h-3.5 text-slate-400" />
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              2 — Résumé du diagnostic transmis
            </h4>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed -mt-1">
            Ces informations sont préremplies à partir de votre diagnostic. Vous pouvez les modifier
            si besoin avant l&apos;envoi.
          </p>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Résumé de votre besoin
            </label>
            <textarea
              rows={3}
              value={summary.needSummary}
              onChange={(e) => setSummaryField('needSummary', e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-blue-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 resize-none bg-blue-50/50"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Stack recommandée
            </label>
            <input
              type="text"
              value={summary.recommendedStack}
              onChange={(e) => setSummaryField('recommendedStack', e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-blue-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 bg-blue-50/50"
            />
          </div>

          {summary.alternativeStack && (
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Stack alternative identifiée{' '}
                <span className="text-slate-400 font-normal">(optionnel)</span>
              </label>
              <textarea
                rows={2}
                value={summary.alternativeStack}
                onChange={(e) => setSummaryField('alternativeStack', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-amber-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-400 resize-none bg-amber-50/40"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              MVP conseillé — à garder en V1
            </label>
            <textarea
              rows={3}
              value={summary.mvp}
              onChange={(e) => setSummaryField('mvp', e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-blue-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 resize-none bg-blue-50/50"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Durée indicative
            </label>
            <input
              type="text"
              value={summary.estimatedDuration}
              onChange={(e) => setSummaryField('estimatedDuration', e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-blue-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 bg-blue-50/50"
            />
          </div>

          {summary.risks && (
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Points de vigilance
              </label>
              <textarea
                rows={3}
                value={summary.risks}
                onChange={(e) => setSummaryField('risks', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-blue-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 resize-none bg-blue-50/50"
              />
            </div>
          )}

          {summary.clarificationQuestions && (
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Questions à clarifier avant de démarrer
              </label>
              <textarea
                rows={3}
                value={summary.clarificationQuestions}
                onChange={(e) => setSummaryField('clarificationQuestions', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-blue-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 resize-none bg-blue-50/50"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Informations complémentaires sur votre projet{' '}
              <span className="text-slate-400 font-normal">(optionnel)</span>
            </label>
            <textarea
              rows={3}
              value={summary.additionalProjectDetails}
              onChange={(e) => setSummaryField('additionalProjectDetails', e.target.value)}
              placeholder="Contrainte technique, délai serré, équipe impliquée, budget précis..."
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 resize-none bg-slate-50"
            />
          </div>
        </div>}

        {/* ── RGPD ───────────────────────────────────────────────────────── */}
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={fields.gdprConsent}
            onChange={(e) => setField('gdprConsent', e.target.checked)}
            className="mt-0.5 w-4 h-4 accent-blue-600 shrink-0"
          />
          <span className="text-xs text-slate-500 leading-relaxed">
            J&apos;accepte que les informations transmises soient utilisées pour me recontacter au
            sujet de mon projet. Aucun démarchage commercial.{' '}
            <span className="text-red-400">*</span>
          </span>
        </label>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 px-4 py-2.5 rounded-xl">
            {error}
          </p>
        )}

        <div className="flex gap-3 pt-1">
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={!isValid || submitting}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${
              isValid && !submitting
                ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white hover:opacity-90 shadow-sm'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            {submitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Envoi en cours...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Envoyer ma demande de devis
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export function DiagnosticSuccessCard({ onReset }: { onReset: () => void }) {
  return (
    <div className="bg-green-50 border border-green-100 rounded-2xl p-6 text-center">
      <div className="flex justify-center mb-3">
        <CheckCircle className="w-10 h-10 text-green-500" />
      </div>
      <h3 className="text-base font-bold text-slate-900 mb-1">Diagnostic envoyé !</h3>
      <p className="text-sm text-slate-600 mb-4">
        Merci, votre diagnostic a bien été transmis. Je reviendrai vers vous pour affiner le besoin
        et préparer un devis.
      </p>
      <button
        onClick={onReset}
        className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors"
      >
        Refaire le diagnostic
      </button>
    </div>
  );
}
