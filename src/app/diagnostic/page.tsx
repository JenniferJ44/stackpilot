'use client';

import { Sparkles } from 'lucide-react';
import ChatAgent from '@/components/ChatAgent';

export default function DiagnosticPage() {
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

        <ChatAgent />
      </div>
    </div>
  );
}
