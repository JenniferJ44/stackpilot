'use client';

import { useState } from 'react';
import { Sparkles, ClipboardList } from 'lucide-react';
import ChatAgent from '@/components/ChatAgent';
import DiagnosticForm from '@/components/DiagnosticForm';

type Mode = 'chat' | 'form';

export default function DiagnosticPage() {
  const [mode, setMode] = useState<Mode>('chat');

  return (
    <div className="min-h-screen bg-[#f7f9fd] pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 text-sm font-semibold px-4 py-2 rounded-full mb-4 border border-indigo-200/60">
            <Sparkles className="w-3.5 h-3.5" />
            Diagnostic de stack — gratuit
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            Quelle architecture pour votre projet ?
          </h1>
          <p className="text-slate-500 max-w-xl mx-auto">
            Répondez à quelques questions et obtenez une recommandation de stack technologique
            adaptée à votre contexte et vos contraintes.
          </p>
        </div>

        {/* Mode switcher */}
        <div className="flex gap-2 p-1 bg-white rounded-xl border border-indigo-100/50 shadow-sm mb-8">
          <button
            onClick={() => setMode('chat')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              mode === 'chat'
                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Diagnostic guidé
          </button>
          <button
            onClick={() => setMode('form')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              mode === 'form'
                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <ClipboardList className="w-4 h-4" />
            Mode formulaire
          </button>
        </div>

        {mode === 'chat' ? <ChatAgent /> : <DiagnosticForm />}
      </div>
    </div>
  );
}
