'use client';

import { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

type Status = 'idle' | 'loading' | 'success' | 'error';

const inputClass = [
  'w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm',
  'placeholder:text-slate-400',
  'focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400',
  // Override browser autofill yellow background
  '[&:-webkit-autofill]:shadow-[inset_0_0_0_1000px_white]',
  '[&:-webkit-autofill]:[-webkit-text-fill-color:#1e293b]',
  'transition-colors',
].join(' ');

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (process.env.NODE_ENV === 'development') {
          console.error('[ContactForm] API error:', res.status, data);
        }
        throw new Error(data?.error || 'Erreur inconnue');
      }

      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.error('[ContactForm] Submit error:', err);
      }
      setErrorMsg(
        err instanceof Error && err.message !== 'Erreur inconnue'
          ? err.message
          : 'Une erreur s\'est produite lors de l\'envoi. Vous pouvez aussi me contacter via LinkedIn.'
      );
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
        <div className="w-14 h-14 rounded-full bg-green-50 border border-green-100 flex items-center justify-center">
          <CheckCircle className="w-7 h-7 text-green-500" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">Message envoyé !</h3>
        <p className="text-slate-500 max-w-sm text-sm leading-relaxed">
          Merci, votre message a bien été envoyé. Vous allez recevoir un email de confirmation
          et je vous répondrai rapidement.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="text-sm text-indigo-600 font-semibold hover:text-indigo-700 mt-2"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-name" className="block text-sm font-semibold text-slate-700 mb-1.5">
            Nom <span className="text-red-400">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Votre nom"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-sm font-semibold text-slate-700 mb-1.5">
            Email <span className="text-red-400">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            placeholder="votre@email.com"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-subject" className="block text-sm font-semibold text-slate-700 mb-1.5">
          Sujet
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          autoComplete="off"
          value={form.subject}
          onChange={handleChange}
          placeholder="De quoi souhaitez-vous parler ?"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-semibold text-slate-700 mb-1.5">
          Message <span className="text-red-400">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          autoComplete="off"
          value={form.message}
          onChange={handleChange}
          placeholder="Décrivez votre projet, votre besoin ou posez votre question…"
          className={`${inputClass} resize-none`}
        />
      </div>

      {status === 'error' && (
        <div className="flex items-start gap-2 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold text-sm hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed transition-opacity shadow-sm"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Envoi en cours…
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Envoyer mon message
          </>
        )}
      </button>

      <p className="text-xs text-slate-400 text-center leading-relaxed">
        Les informations transmises via ce formulaire sont uniquement utilisées pour répondre à votre demande.
      </p>
    </form>
  );
}
