import type { Metadata } from 'next';
import Link from "next/link";
import { ArrowRight, Zap, CheckCircle, BarChart2, Workflow, Brain, Star, Calendar, Layers } from "lucide-react";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://stackpilot.fr';

export const metadata: Metadata = {
  title: 'Product Builder No-Code freelance — StackPilot',
  description:
    'Jennifer Jaulin, Product Builder No-Code freelance. Je conçois vos MVP, automatisations et outils métiers no-code. Diagnostic de stack gratuit inclus.',
  alternates: { canonical: BASE_URL },
  openGraph: {
    title: 'Product Builder No-Code freelance — StackPilot',
    description:
      'Jennifer Jaulin, Product Builder No-Code freelance. Je conçois vos MVP, automatisations et outils métiers no-code.',
    type: 'website',
    url: BASE_URL,
  },
};
import { technologies } from "@/data/technologies";
import { projects } from "@/data/projects";
import TechCard from "@/components/TechCard";
import ProjectCard from "@/components/ProjectCard";
import MotionSection from "@/components/MotionSection";
import CalendlyPopupButton from "@/components/CalendlyPopupButton";

const features = [
  {
    icon: Brain,
    title: "Diagnostic de stack",
    description:
      "Répondez à quelques questions sur votre projet et obtenez une architecture technologique personnalisée, basée sur une matrice d'expertise.",
  },
  {
    icon: Layers,
    title: "12 technologies maîtrisées",
    description:
      "No-code, automatisation, CRM, gestion documentaire, signature électronique, IA — toutes les catégories pour votre projet numérique.",
  },
  {
    icon: BarChart2,
    title: "Score de compatibilité",
    description:
      "Chaque outil reçoit un score basé sur votre type de projet, budget, urgence, taille d'équipe et fonctionnalités requises.",
  },
  {
    icon: Workflow,
    title: "Accompagnement expert",
    description:
      "Je peux vous accompagner pour concevoir et déployer la stack recommandée, de A à Z.",
  },
];

const steps = [
  {
    number: "01",
    title: "Décrivez votre projet",
    description: "Via le diagnostic guidé, expliquez votre besoin en quelques questions ciblées.",
  },
  {
    number: "02",
    title: "Recevez votre architecture",
    description: "L'algorithme analyse vos réponses et génère le plan de stack le plus adapté.",
  },
  {
    number: "03",
    title: "Passez à la construction",
    description: "Réservez un accompagnement pour concevoir et déployer votre stack.",
  },
];

const skills = [
  "Bubble", "Airtable", "Make", "Notion",
  "Salesforce", "SharePoint", "Power Automate", "DocuSign",
  "Claude Code", "Structuration de données", "Automatisation", "MVP SaaS",
];

export default function Home() {
  const featuredTechs = technologies.filter((t) => t.jenniferLevel === "expert").slice(0, 3);
  const featuredProjects = projects.slice(0, 3);

  return (
    <div className="overflow-x-hidden">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-violet-950">
        {/* Glow orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-indigo-500/15 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-violet-500/15 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-indigo-600/8 blur-2xl" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="hero-badge inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium px-4 py-2 rounded-full mb-8">
            <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
            Par Jennifer Jaulin, Product Builder No-Code
          </div>

          <h1 className="hero-title text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Product Builder No-Code
            </span>{" "}
            freelance pour créer vos outils métiers
          </h1>

          <p className="hero-subtitle text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            StackPilot analyse votre projet en 2 minutes et vous recommande les blocs technologiques
            no-code, CRM, automatisation ou IA les plus adaptés à vos besoins et votre budget.
          </p>

          <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/diagnostic"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold hover:opacity-90 hover:scale-[1.02] transition-all shadow-lg shadow-indigo-500/30"
            >
              Lancer mon diagnostic
              <ArrowRight className="w-4 h-4" />
            </Link>
            <CalendlyPopupButton
              context="hero"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 hover:border-white/30 transition-all backdrop-blur-sm"
            >
              <Calendar className="w-4 h-4" />
              Réserver un diagnostic
            </CalendlyPopupButton>
          </div>

          <div className="hero-trust mt-12 flex flex-wrap justify-center gap-6 text-sm text-slate-400">
            {["Gratuit", "Résultats en 2 minutes", "12 technologies maîtrisées", "Aucun compte requis"].map((t) => (
              <div key={t} className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                {t}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comment ça marche ──────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#f7f9fd]">
        <div className="max-w-5xl mx-auto">
          <MotionSection className="text-center mb-12">
            <p className="section-tag justify-center">
              <span className="w-5 h-px bg-indigo-300" />
              Processus
              <span className="w-5 h-px bg-indigo-300" />
            </p>
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Comment ça marche ?</h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Un processus simple et rapide pour identifier les outils les plus adaptés à votre projet.
            </p>
          </MotionSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <MotionSection
                key={step.number}
                delay={i * 0.12}
                from={i === 0 ? 'left' : i === 1 ? 'bottom' : 'right'}
              >
                <div className="relative">
                  {i < steps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-indigo-200 to-violet-200 z-0" />
                  )}
                  <div className="bp-card relative z-10 bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6 text-center hover:border-indigo-200 hover:shadow-md transition-all duration-200">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white font-bold text-lg flex items-center justify-center mx-auto mb-4 shadow-md font-mono">
                      {step.number}
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2">{step.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </MotionSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Fonctionnalités ───────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <MotionSection className="text-center mb-12">
            <p className="section-tag justify-center">
              <span className="w-5 h-px bg-indigo-300" />
              Avantages
              <span className="w-5 h-px bg-indigo-300" />
            </p>
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Pourquoi StackPilot ?</h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Un outil conçu par une experte pour vous donner des recommandations concrètes et
              actionnables, sans jargon.
            </p>
          </MotionSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              const featureFrom = (['left', 'bottom', 'bottom', 'right'] as const)[i];
              return (
                <MotionSection key={f.title} delay={i * 0.09} from={featureFrom}>
                  <div className="bp-card bg-[#f7f9fd] rounded-2xl p-6 border border-slate-200/60 hover:border-indigo-200 hover:shadow-md transition-all duration-200 h-full">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center mb-4 shadow-sm">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2 text-sm">{f.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{f.description}</p>
                  </div>
                </MotionSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Technologies aperçu ──────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#f7f9fd]">
        <div className="max-w-6xl mx-auto">
          <MotionSection className="text-center mb-12">
            <p className="section-tag justify-center">
              <span className="w-5 h-px bg-indigo-300" />
              Stack évaluée
              <span className="w-5 h-px bg-indigo-300" />
            </p>
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Technologies maîtrisées</h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Je maîtrise ces outils à un niveau expert — et StackPilot les évalue
              pour vous proposer la meilleure combinaison.
            </p>
          </MotionSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {featuredTechs.map((tech, i) => (
              <TechCard key={tech.id} tech={tech} index={i} />
            ))}
          </div>
          <MotionSection className="text-center">
            <Link
              href="/technologies"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-indigo-200 bg-white text-indigo-700 font-medium hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-200 text-sm"
            >
              Voir les 12 technologies
              <ArrowRight className="w-4 h-4" />
            </Link>
          </MotionSection>
        </div>
      </section>

      {/* ── Projets aperçu ──────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <MotionSection className="text-center mb-12">
            <p className="section-tag justify-center">
              <span className="w-5 h-px bg-indigo-300" />
              Réalisations
              <span className="w-5 h-px bg-indigo-300" />
            </p>
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Exemples de projets</h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Des réalisations concrètes avec des résultats mesurables — pour vous inspirer et
              vous montrer ce qui est possible.
            </p>
          </MotionSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {featuredProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
          <MotionSection className="text-center">
            <Link
              href="/projets"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-indigo-200 bg-white text-indigo-700 font-medium hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-200 text-sm"
            >
              Voir tous les projets
              <ArrowRight className="w-4 h-4" />
            </Link>
          </MotionSection>
        </div>
      </section>

      {/* ── Jennifer preview ───────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#f7f9fd]">
        <div className="max-w-5xl mx-auto">
          <MotionSection>
            <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <div>
                  <p className="section-tag">
                    <span className="w-5 h-px bg-indigo-300" />
                    Product Builder No-Code
                  </p>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">
                    Product Builder No-Code, de l&apos;idée à l&apos;outil
                  </h2>
                  <p className="text-slate-500 leading-relaxed mb-4 text-sm">
                    J&apos;aide les indépendants, associations et petites structures à transformer leurs
                    idées en outils numériques concrets — MVP, automatisations, bases de données
                    structurées, sans complexité inutile.
                  </p>
                  <p className="text-slate-500 leading-relaxed mb-6 text-sm">
                    Vous avez une idée d&apos;application, un processus manuel à automatiser ou un outil
                    interne à structurer ? Je vous aide à choisir la bonne stack no-code et à la
                    déployer rapidement. Bubble, Make, Airtable, Salesforce, DocuSign — des
                    technologies que je maîtrise pour votre projet.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs bg-indigo-50/60 border border-indigo-100 text-indigo-700 px-3 py-1 rounded-lg"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <Link
                    href="/a-propos"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700 group"
                  >
                    En savoir plus sur mon activité
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
                <div className="bg-gradient-to-br from-indigo-50 to-violet-100 rounded-2xl p-8 text-center border border-indigo-100">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 mx-auto mb-5 flex items-center justify-center text-4xl shadow-lg">
                    👩‍💻
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1">Jennifer Jaulin</h3>
                  <p className="text-sm text-slate-500 mb-4">Product Builder No-Code</p>
                  <div className="grid grid-cols-2 gap-3 text-center">
                    {[
                      { value: "9+", label: "outils maîtrisés" },
                      { value: "100%", label: "no-code / low-code" },
                      { value: "3 sem.", label: "pour un MVP" },
                      { value: "0", label: "ligne de code requise" },
                    ].map((stat) => (
                      <div key={stat.label} className="bg-white rounded-xl p-3 border border-white shadow-sm">
                        <div className="text-xl font-bold text-indigo-600">{stat.value}</div>
                        <div className="text-xs text-slate-500">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </MotionSection>
        </div>
      </section>

      {/* ── CTA final ──────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative bg-gradient-to-br from-indigo-600 to-violet-700 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-violet-300/10 blur-3xl" />
        </div>
        <MotionSection className="relative max-w-3xl mx-auto text-center">
          <p className="section-tag justify-center text-indigo-300">
            <span className="w-5 h-px bg-indigo-400" />
            Démarrer maintenant
            <span className="w-5 h-px bg-indigo-400" />
          </p>
          <h2 className="text-3xl font-bold text-white mb-4">
            Prêt à construire la bonne stack ?
          </h2>
          <p className="text-indigo-100 mb-8 text-lg">
            Clarifiez votre besoin avec le diagnostic gratuit, ou réservez un appel pour parler
            de votre projet directement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/diagnostic"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-indigo-700 font-semibold hover:bg-indigo-50 transition-colors shadow-lg"
            >
              Lancer le diagnostic
              <ArrowRight className="w-4 h-4" />
            </Link>
            <CalendlyPopupButton
              context="cta-bottom"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-white/30 text-white font-semibold hover:bg-white/10 transition-colors"
            >
              <Calendar className="w-4 h-4" />
              Réserver un diagnostic
            </CalendlyPopupButton>
          </div>
        </MotionSection>
      </section>

    </div>
  );
}
