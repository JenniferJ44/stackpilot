'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Layers, ArrowRight } from 'lucide-react';
import CalendlyPopupButton from '@/components/CalendlyPopupButton';

const links = [
  { href: '/', label: 'Accueil' },
  { href: '/diagnostic', label: 'Diagnostic' },
  { href: '/technologies', label: 'Technologies' },
  { href: '/projets', label: 'Projets' },
  { href: '/a-propos', label: 'À propos' },
  { href: '/a-propos#contact', label: 'Contact' },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#f7f9fd]/95 backdrop-blur-md shadow-sm border-b border-indigo-100/40'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 font-bold text-xl group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-sm group-hover:shadow-indigo-200 transition-shadow">
              <Layers className="w-4 h-4 text-white" />
            </div>
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              StackPilot
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-indigo-700 bg-indigo-50 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-indigo-500" />
                  )}
                </Link>
              );
            })}
            <CalendlyPopupButton
              context="nav-desktop"
              className="ml-4 flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-semibold hover:opacity-90 hover:shadow-lg hover:shadow-indigo-200/50 transition-all shadow-sm"
            >
              Réserver un diagnostic
              <ArrowRight className="w-3.5 h-3.5" />
            </CalendlyPopupButton>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#f7f9fd] border-t border-indigo-100/40 shadow-lg">
          <div className="px-4 py-3 flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-indigo-700 bg-indigo-50 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <CalendlyPopupButton
              context="nav-mobile"
              className="mt-2 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-semibold"
            >
              Réserver un diagnostic
              <ArrowRight className="w-3.5 h-3.5" />
            </CalendlyPopupButton>
          </div>
        </div>
      )}
    </header>
  );
}
