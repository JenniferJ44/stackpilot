'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { CALENDLY_URL } from '@/lib/siteConfig';

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

export type CalendlyPopupButtonProps = {
  label?: string;
  context?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  children?: React.ReactNode;
};

const VARIANT_STYLES: Record<NonNullable<CalendlyPopupButtonProps['variant']>, string> = {
  primary:
    'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-sm',
  secondary:
    'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-indigo-200 bg-white text-indigo-700 text-sm font-semibold hover:bg-indigo-50 transition-colors',
  ghost:
    'inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-indigo-600 text-sm font-semibold hover:bg-indigo-50 transition-colors',
};

export function triggerCalendlyPopup(context?: string) {
  const url = context
    ? `${CALENDLY_URL}?utm_source=${encodeURIComponent(context)}`
    : CALENDLY_URL;

  if (typeof window !== 'undefined' && window.Calendly) {
    window.Calendly.initPopupWidget({ url });
  } else {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}

export default function CalendlyPopupButton({
  label = 'Réserver un appel',
  context,
  className,
  variant = 'secondary',
  children,
}: CalendlyPopupButtonProps) {
  // Inject Calendly CSS once, deduped by selector check
  useEffect(() => {
    if (document.querySelector('link[data-calendly-css]')) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    link.setAttribute('data-calendly-css', '1');
    document.head.appendChild(link);
  }, []);

  return (
    <>
      <Script
        id="calendly-widget-js"
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
      <button
        type="button"
        onClick={() => triggerCalendlyPopup(context)}
        className={className ?? VARIANT_STYLES[variant]}
      >
        {children ?? label}
      </button>
    </>
  );
}
