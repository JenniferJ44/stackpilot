import Link from 'next/link';
import { Layers, ArrowRight, ExternalLink } from 'lucide-react';

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 relative">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Brand col */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 font-bold text-xl mb-4 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center shadow-sm">
                <Layers className="w-4 h-4 text-white" />
              </div>
              <span className="text-white">StackPilot</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs mb-2">
              Site de Jennifer Jaulin, Product Builder No-Code freelance.
            </p>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xs mb-5">
              Je conçois des MVP, automatisations et outils métiers no-code pour les indépendants,
              associations et petites structures.
            </p>
            <div className="flex gap-2.5">
              <a
                href="https://www.linkedin.com/in/jennifer-jaulin-64b872116/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 hover:text-white transition-all text-sm"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
                <span className="text-xs">LinkedIn</span>
              </a>
              <a
                href="https://www.malt.fr/profile/jenniferjaulin"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 hover:text-white transition-all text-sm"
                aria-label="Malt"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="text-xs">Malt</span>
              </a>
            </div>
          </div>

          {/* Nav col */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-xs uppercase tracking-widest">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: '/', label: 'Accueil' },
                { href: '/diagnostic', label: 'Diagnostic de stack' },
                { href: '/technologies', label: 'Technologies' },
                { href: '/projets', label: 'Projets' },
                { href: '/a-propos', label: 'À propos' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors flex items-center gap-1.5 group">
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Stack col */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-xs uppercase tracking-widest">
              Stack maîtrisée
            </h4>
            <ul className="space-y-2.5 text-sm">
              {['Bubble', 'Airtable', 'Make', 'Notion', 'Salesforce', 'SharePoint', 'Monday'].map(
                (tech) => (
                  <li key={tech}>
                    <Link href="/technologies" className="hover:text-white transition-colors flex items-center gap-1.5 group">
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                      {tech}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row justify-between gap-4 text-xs">
          <p className="text-slate-500">© 2025 StackPilot — Jennifer Jaulin. Tous droits réservés.</p>
          <p className="max-w-md text-center sm:text-right text-slate-600 leading-relaxed">
            Les prix, fonctionnalités et limites techniques sont indicatifs.
            Vérifiez toujours les conditions actuelles sur les sites officiels des éditeurs.
          </p>
        </div>

      </div>
    </footer>
  );
}
