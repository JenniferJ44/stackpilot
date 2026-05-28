'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Bot, CheckCircle, BarChart2, Layers } from 'lucide-react';
import {
  GuidedAnswers,
  buildGuidedRecommendation,
  GuidedRecommendation,
} from '@/lib/guidedScoring';
import {
  FlowStep,
  Choice,
  FLOW_STEPS,
  findNextStep,
  resolveChoices,
  resolveQuestion,
} from '@/lib/chatFlow';
import GuidedResult from './GuidedResult';

// ─── Message types ────────────────────────────────────────────────────────────

type BotMsg = {
  id: string;
  kind: 'bot';
  text: string;
};

type UserMsg = {
  id: string;
  kind: 'user';
  text: string;
  stepId: string;
};

type ChoicesMsg = {
  id: string;
  kind: 'choices';
  stepId: string;
  choices: Choice[];
  answered: boolean;
  selected: string;
};

type ChoicesMultiMsg = {
  id: string;
  kind: 'choices-multi';
  stepId: string;
  choices: Choice[];
  selected: string[];
  answered: boolean;
  otherText: string;
};

type InputMsg = {
  id: string;
  kind: 'input';
  stepId: string;
  optional: boolean;
  answered: boolean;
};

type ChatMsg = BotMsg | UserMsg | ChoicesMsg | ChoicesMultiMsg | InputMsg;

// ─── History for back navigation ──────────────────────────────────────────────

type HistoryEntry = {
  stepId: string;
  prevAnswers: Partial<GuidedAnswers>;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function uid(): string {
  return Math.random().toString(36).slice(2, 9);
}

const OTHER_DETAIL_LABELS: Record<string, string> = {
  existingTools: 'Précisez les autres outils utilisés',
  toolConnections: 'Précisez les autres connexions à prévoir',
};

function getOtherLabel(stepId: string): string {
  return OTHER_DETAIL_LABELS[stepId] ?? 'Précisez votre réponse';
}

function getOtherPlaceholder(stepId: string): string {
  if (stepId === 'existingTools') return 'Exemple : Monday, Pipedrive, Brevo, Pennylane, Sellsy, Odoo…';
  return 'Précisez…';
}

function fillDefaults(p: Partial<GuidedAnswers>): GuidedAnswers {
  return {
    projectCategory: p.projectCategory ?? null,
    appSubtype: p.appSubtype ?? null,
    docsSubtype: p.docsSubtype ?? null,
    hasMicrosoft365: p.hasMicrosoft365 ?? null,
    mainObjective: p.mainObjective ?? null,
    userTypes: p.userTypes ?? [],
    userAccounts: p.userAccounts ?? null,
    needsInterface: p.needsInterface ?? null,
    needsPayment: p.needsPayment ?? null,
    needsAutomation: p.needsAutomation ?? null,
    needsDocuments: p.needsDocuments ?? null,
    needsReporting: p.needsReporting ?? null,
    selectedFeatures: p.selectedFeatures ?? [],
    dataTypes: p.dataTypes ?? [],
    dataType: p.dataType ?? null,
    dataVolume: p.dataVolume ?? null,
    existingTools: p.existingTools ?? [],
    toolConnections: p.toolConnections ?? [],
    dataSensitive: p.dataSensitive ?? null,
    existingToolset: p.existingToolset ?? null,
    hasSharepointTeams: p.hasSharepointTeams ?? null,
    crmIsCentral: p.crmIsCentral ?? null,
    existingDataInTool: p.existingDataInTool ?? null,
    mainPriority: p.mainPriority ?? null,
    timeline: p.timeline ?? null,
    budget: p.budget ?? null,
    maintenanceOwner: p.maintenanceOwner ?? null,
    autonomyLevel: p.autonomyLevel ?? null,
    additionalContext: p.additionalContext ?? '',
    otherDetails: p.otherDetails ?? {},
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ChatAgent() {
  const [msgs, setMsgs] = useState<ChatMsg[]>([]);
  const [answers, setAnswers] = useState<Partial<GuidedAnswers>>({});
  const [thinking, setThinking] = useState(false);
  const [activeStepId, setActiveStepId] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [result, setResult] = useState<GuidedRecommendation | null>(null);
  const [textInput, setTextInput] = useState('');

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const msgsRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  // Start on mount — guard prevents double-init in React 18 Strict Mode
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    appendStep(FLOW_STEPS[0], {}, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll uniquement à l'intérieur du conteneur de chat — jamais toute la page
  useEffect(() => {
    const el = msgsRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs, thinking]);

  function appendStep(
    step: FlowStep,
    currentAnswers: Partial<GuidedAnswers>,
    showPre: boolean
  ) {
    const newMsgs: ChatMsg[] = [];

    if (showPre && step.preMessage) {
      newMsgs.push({ id: uid(), kind: 'bot', text: step.preMessage });
    }

    newMsgs.push({ id: uid(), kind: 'bot', text: resolveQuestion(step, currentAnswers) });

    if (step.inputType === 'textarea') {
      newMsgs.push({
        id: uid(),
        kind: 'input',
        stepId: step.id,
        optional: step.optional ?? false,
        answered: false,
      });
    } else if (step.inputType === 'multi') {
      newMsgs.push({
        id: uid(),
        kind: 'choices-multi',
        stepId: step.id,
        choices: resolveChoices(step, currentAnswers),
        selected: [],
        answered: false,
        otherText: '',
      });
    } else {
      newMsgs.push({
        id: uid(),
        kind: 'choices',
        stepId: step.id,
        choices: resolveChoices(step, currentAnswers),
        answered: false,
        selected: '',
      });
    }

    setMsgs((prev) => [...prev, ...newMsgs]);
    setActiveStepId(step.id);
  }

  function handleSelect(stepId: string, value: string) {
    if (activeStepId !== stepId) return;

    const step = FLOW_STEPS.find((s) => s.id === stepId)!;
    const label =
      resolveChoices(step, answers).find((c) => c.value === value)?.label ?? value;

    // Mark choices as answered
    setMsgs((prev) =>
      prev.map((m) =>
        m.kind === 'choices' && m.stepId === stepId
          ? { ...m, answered: true, selected: value }
          : m
      )
    );

    // User bubble
    setMsgs((prev) => [...prev, { id: uid(), kind: 'user', text: label, stepId }]);

    const newAnswers: Partial<GuidedAnswers> = {
      ...answers,
      [step.field]: value,
    };
    setAnswers(newAnswers);

    // Push to history
    setHistory((prev) => [...prev, { stepId, prevAnswers: { ...answers } }]);

    advance(stepId, newAnswers, step.thinkingMs ?? 700);
  }

  function handleMultiToggle(stepId: string, value: string) {
    if (activeStepId !== stepId) return;
    setMsgs((prev) =>
      prev.map((m) =>
        m.kind === 'choices-multi' && m.stepId === stepId && !m.answered
          ? {
              ...m,
              selected: m.selected.includes(value)
                ? m.selected.filter((v) => v !== value)
                : [...m.selected, value],
            }
          : m
      )
    );
  }

  function handleMultiOtherChange(stepId: string, text: string) {
    if (activeStepId !== stepId) return;
    setMsgs((prev) =>
      prev.map((m) =>
        m.kind === 'choices-multi' && m.stepId === stepId && !m.answered
          ? { ...m, otherText: text }
          : m
      )
    );
  }

  function handleMultiSubmit(stepId: string, selected: string[], otherText: string) {
    if (activeStepId !== stepId) return;

    const step = FLOW_STEPS.find((s) => s.id === stepId)!;
    const choices = resolveChoices(step, answers);
    const labels = selected.map((v) => {
      if (v === 'other' && otherText.trim()) return `Autre : ${otherText.trim()}`;
      return choices.find((c) => c.value === v)?.label ?? v;
    });

    setMsgs((prev) =>
      prev.map((m) =>
        m.kind === 'choices-multi' && m.stepId === stepId ? { ...m, answered: true } : m
      )
    );

    if (labels.length > 0) {
      setMsgs((prev) => [
        ...prev,
        { id: uid(), kind: 'user', text: labels.join(', '), stepId },
      ]);
    }

    const trimmedOther = otherText.trim();
    const newOtherDetails = trimmedOther
      ? { ...(answers.otherDetails ?? {}), [step.id]: trimmedOther }
      : { ...(answers.otherDetails ?? {}) };

    const newAnswers = {
      ...answers,
      [step.field]: selected,
      otherDetails: newOtherDetails,
    } as typeof answers;
    setAnswers(newAnswers);

    setHistory((prev) => [...prev, { stepId, prevAnswers: { ...answers } }]);

    advance(stepId, newAnswers, step.thinkingMs ?? 700);
  }

  function handleTextSubmit(stepId: string, text: string) {
    if (activeStepId !== stepId) return;

    // Mark input as answered
    setMsgs((prev) =>
      prev.map((m) =>
        m.kind === 'input' && m.stepId === stepId ? { ...m, answered: true } : m
      )
    );

    if (text.trim()) {
      setMsgs((prev) => [...prev, { id: uid(), kind: 'user', text: text.trim(), stepId }]);
    }

    const step = FLOW_STEPS.find((s) => s.id === stepId)!;
    const newAnswers: Partial<GuidedAnswers> = {
      ...answers,
      [step.field]: text,
    };
    setAnswers(newAnswers);
    setTextInput('');

    setHistory((prev) => [...prev, { stepId, prevAnswers: { ...answers } }]);

    advance(stepId, newAnswers, step.thinkingMs ?? 1300);
  }

  function advance(
    currentStepId: string,
    currentAnswers: Partial<GuidedAnswers>,
    delay: number
  ) {
    setActiveStepId(null);
    setThinking(true);

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setThinking(false);
      const nextStep = findNextStep(currentStepId, currentAnswers);

      if (nextStep) {
        appendStep(nextStep, currentAnswers, true);
      } else {
        // All done
        setMsgs((prev) => [
          ...prev,
          { id: uid(), kind: 'bot', text: 'Je prépare maintenant votre diagnostic... 🔍' },
        ]);
        setThinking(true);
        timerRef.current = setTimeout(() => {
          setThinking(false);
          const full = fillDefaults(currentAnswers);
          setAnswers(full);
          setResult(buildGuidedRecommendation(full));
        }, 1500);
      }
    }, delay);
  }

  function handleBack() {
    if (history.length === 0) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    setThinking(false);

    const newHistory = [...history];
    const entry = newHistory.pop()!;
    setHistory(newHistory);

    const step = FLOW_STEPS.find((s) => s.id === entry.stepId)!;

    // Remove user message + answered choices/input for that step
    setMsgs((prev) => {
      const cleaned = prev.filter((m) => {
        if (m.kind === 'user' && m.stepId === entry.stepId) return false;
        if (
          (m.kind === 'choices' || m.kind === 'choices-multi' || m.kind === 'input') &&
          m.stepId === entry.stepId
        )
          return false;
        return true;
      });
      // Re-add fresh unanswered choices
      if (step.inputType === 'textarea') {
        return [
          ...cleaned,
          {
            id: uid(),
            kind: 'input' as const,
            stepId: step.id,
            optional: step.optional ?? false,
            answered: false,
          },
        ];
      }
      if (step.inputType === 'multi') {
        return [
          ...cleaned,
          {
            id: uid(),
            kind: 'choices-multi' as const,
            stepId: step.id,
            choices: resolveChoices(step, entry.prevAnswers),
            selected: [],
            answered: false,
            otherText: '',
          },
        ];
      }
      return [
        ...cleaned,
        {
          id: uid(),
          kind: 'choices' as const,
          stepId: step.id,
          choices: resolveChoices(step, entry.prevAnswers),
          answered: false,
          selected: '',
        },
      ];
    });

    setAnswers(entry.prevAnswers);
    setActiveStepId(entry.stepId);
    setTextInput('');
  }

  function reset() {
    if (timerRef.current) clearTimeout(timerRef.current);
    setMsgs([]);
    setAnswers({});
    setHistory([]);
    setResult(null);
    setThinking(false);
    setActiveStepId(null);
    setTextInput('');
    setTimeout(() => appendStep(FLOW_STEPS[0], {}, false), 50);
  }

  // ── Result screen ─────────────────────────────────────────────────────────
  if (result) {
    return (
      <GuidedResult
        recommendation={result}
        answers={fillDefaults(answers)}
        onReset={reset}
      />
    );
  }

  // ── Progress ──────────────────────────────────────────────────────────────
  const computeProgress = () => {
    if (!activeStepId) return { stepCurrent: history.length, stepTotal: history.length, pct: 100 };
    const idx = FLOW_STEPS.findIndex((s) => s.id === activeStepId);
    let remaining = 0;
    if (idx >= 0) {
      for (let i = idx; i < FLOW_STEPS.length; i++) {
        const s = FLOW_STEPS[i];
        if (!s.skip || !s.skip(answers)) remaining++;
      }
    }
    const stepTotal = history.length + remaining;
    const stepCurrent = history.length + 1;
    const pct = stepTotal > 0 ? Math.round((history.length / stepTotal) * 100) : 0;
    return { stepCurrent, stepTotal, pct };
  };
  const { stepCurrent, stepTotal, pct: progressPct } = computeProgress();

  // ── Chat screen ───────────────────────────────────────────────────────────
  return (
    <div className="bg-white rounded-2xl border border-indigo-100/50 shadow-sm overflow-hidden flex flex-col h-[min(620px,80svh)]">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-3.5 flex items-center gap-3 shrink-0">
        <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
          <Layers className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white font-semibold text-sm">Diagnostic StackPilot</p>
          <p className="text-indigo-200 text-xs">Conseiller en architecture technologique</p>
        </div>
        {history.length > 0 && !thinking && (
          <button
            onClick={handleBack}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/15 text-white text-xs font-medium hover:bg-white/25 transition-colors shrink-0"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            Retour
          </button>
        )}
      </div>

      {/* Barre de progression */}
      <div className="px-4 pt-2.5 pb-2 bg-white border-b border-indigo-100/40 shrink-0">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <BarChart2 className="w-3 h-3" />
            <span>Étape {stepCurrent} sur {stepTotal}</span>
          </div>
          <span className="text-xs font-semibold text-indigo-600">{progressPct}&nbsp;%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-1.5">
          <div
            className="h-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Messages */}
      <div ref={msgsRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[#f7f9fd]">
        {msgs.map((msg) => {
          // ── Bot bubble
          if (msg.kind === 'bot') {
            return (
              <motion.div
                key={msg.id}
                className="flex gap-2.5 items-end"
                initial={{ opacity: 0, y: 10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
              >
                <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shrink-0 mb-0.5 shadow-sm">
                  <Bot className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="max-w-[80%] bg-white border border-indigo-100/60 px-4 py-2.5 rounded-2xl rounded-bl-md text-sm text-slate-700 shadow-sm leading-relaxed">
                  {msg.text}
                </div>
              </motion.div>
            );
          }

          // ── User bubble
          if (msg.kind === 'user') {
            return (
              <motion.div
                key={msg.id}
                className="flex justify-end"
                initial={{ opacity: 0, x: 10, scale: 0.97 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
              >
                <div className="max-w-[75%] bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-4 py-2.5 rounded-2xl rounded-br-md text-sm shadow-sm leading-relaxed">
                  {msg.text}
                </div>
              </motion.div>
            );
          }

          // ── Choices (single-select blocks)
          if (msg.kind === 'choices') {
            return (
              <motion.div
                key={msg.id}
                className="pl-9"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut', delay: 0.05 }}
              >
                <div className="flex flex-wrap gap-2">
                  {msg.choices.map((choice) => {
                    const isSelected = msg.selected === choice.value;
                    const isAnswered = msg.answered;
                    return (
                      <button
                        key={choice.value}
                        onClick={() => !isAnswered && handleSelect(msg.stepId, choice.value)}
                        disabled={isAnswered}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-medium transition-all ${
                          isAnswered
                            ? isSelected
                              ? 'bg-indigo-50 border-indigo-300 text-indigo-700 opacity-80 cursor-default'
                              : 'bg-slate-100 border-slate-200 text-slate-400 opacity-35 cursor-default'
                            : 'bg-white border-slate-200/80 text-slate-700 hover:border-indigo-300 hover:bg-indigo-50/60 hover:text-indigo-700 cursor-pointer shadow-sm'
                        }`}
                      >
                        {choice.icon && (
                          <span className="text-base leading-none">{choice.icon}</span>
                        )}
                        <span>{choice.label}</span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            );
          }

          // ── Multi-select choices (module blocks)
          if (msg.kind === 'choices-multi') {
            return (
              <motion.div
                key={msg.id}
                className="pl-9 space-y-3"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut', delay: 0.05 }}
              >
                <div className="flex flex-wrap gap-2">
                  {msg.choices.map((choice) => {
                    const isSelected = msg.selected.includes(choice.value);
                    const isAnswered = msg.answered;
                    return (
                      <button
                        key={choice.value}
                        onClick={() => !isAnswered && handleMultiToggle(msg.stepId, choice.value)}
                        disabled={isAnswered}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-medium transition-all ${
                          isAnswered
                            ? isSelected
                              ? 'bg-indigo-50 border-indigo-300 text-indigo-700 opacity-80 cursor-default'
                              : 'bg-slate-100 border-slate-200 text-slate-400 opacity-35 cursor-default'
                            : isSelected
                              ? 'bg-indigo-50 border-indigo-400 text-indigo-700 shadow-sm cursor-pointer'
                              : 'bg-white border-slate-200/80 text-slate-700 hover:border-indigo-300 hover:bg-indigo-50/60 hover:text-indigo-700 cursor-pointer shadow-sm'
                        }`}
                      >
                        {choice.icon && (
                          <span className="text-base leading-none">{choice.icon}</span>
                        )}
                        <span>{choice.label}</span>
                        {!isAnswered && isSelected && (
                          <CheckCircle className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
                {msg.selected.includes('other') && !msg.answered && (
                  <div className="space-y-1">
                    <p className="text-xs text-slate-500">{getOtherLabel(msg.stepId)}</p>
                    <input
                      type="text"
                      value={msg.otherText}
                      onChange={(e) => handleMultiOtherChange(msg.stepId, e.target.value)}
                      placeholder={getOtherPlaceholder(msg.stepId)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 bg-white"
                    />
                  </div>
                )}
                {!msg.answered && (
                  <button
                    onClick={() => handleMultiSubmit(msg.stepId, msg.selected, msg.otherText)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-sm"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    {msg.selected.length > 0
                      ? `Valider les blocs (${msg.selected.length})`
                      : 'Valider ma sélection'}
                  </button>
                )}
              </motion.div>
            );
          }

          // ── Textarea input
          if (msg.kind === 'input') {
            if (msg.answered) {
              return (
                <motion.div
                  key={msg.id}
                  className="pl-9"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                  <p className="text-xs text-slate-400 italic">Précisions transmises.</p>
                </motion.div>
              );
            }
            return (
              <motion.div
                key={msg.id}
                className="pl-9 space-y-2"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut', delay: 0.05 }}
              >
                <textarea
                  rows={3}
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleTextSubmit(msg.stepId, textInput);
                    }
                  }}
                  placeholder="Exemple : outil imposé, contrainte technique, deadline, projet similaire, budget déjà défini…"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 resize-none bg-white"
                />
                <button
                  onClick={() => handleTextSubmit(msg.stepId, textInput)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-sm"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  Voir l&apos;architecture recommandée
                </button>
              </motion.div>
            );
          }

          return null;
        })}

        {/* Thinking dots */}
        <AnimatePresence>
        {thinking && (
          <motion.div
            key="thinking"
            className="flex gap-2.5 items-end"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shrink-0 mb-0.5 shadow-sm">
              <Bot className="w-3.5 h-3.5 text-white" />
            </div>
            <div className="bg-white border border-indigo-100/60 px-4 py-3 rounded-2xl rounded-bl-md shadow-sm flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce"
                style={{ animationDelay: '0ms' }}
              />
              <span
                className="w-2 h-2 rounded-full bg-violet-400 animate-bounce"
                style={{ animationDelay: '150ms' }}
              />
              <span
                className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce"
                style={{ animationDelay: '300ms' }}
              />
            </div>
          </motion.div>
        )}
        </AnimatePresence>

      </div>
    </div>
  );
}
