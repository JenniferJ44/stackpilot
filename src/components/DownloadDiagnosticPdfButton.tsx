'use client';

import { useState } from 'react';
import { Download, Loader2, AlertCircle } from 'lucide-react';
import type { DiagnosticPdfParams } from '@/lib/generateDiagnosticPdf';

type Props = DiagnosticPdfParams;

type Status = 'idle' | 'loading' | 'error';

export default function DownloadDiagnosticPdfButton(props: Props) {
  const [status, setStatus] = useState<Status>('idle');

  const handleClick = async () => {
    setStatus('loading');
    try {
      const { generateDiagnosticPdf } = await import('@/lib/generateDiagnosticPdf');
      await generateDiagnosticPdf(props);
      setStatus('idle');
    } catch (err) {
      console.error('[PDF] generation failed:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  if (status === 'error') {
    return (
      <button
        onClick={() => setStatus('idle')}
        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-red-200 bg-red-50 text-red-600 text-sm font-medium"
      >
        <AlertCircle className="w-4 h-4" />
        Erreur — cliquez pour réessayer
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={status === 'loading'}
      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {status === 'loading' ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Génération du PDF…
        </>
      ) : (
        <>
          <Download className="w-4 h-4" />
          Télécharger mon diagnostic PDF
        </>
      )}
    </button>
  );
}
