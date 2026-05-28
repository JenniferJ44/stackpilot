import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { projects } from '@/data/projects';
import { ArrowLeft, ArrowRight, CheckCircle, Lightbulb, Target, Wrench, User, Calendar } from 'lucide-react';
import MotionSection from '@/components/MotionSection';
import GalleryLightbox from '@/components/GalleryLightbox';
import GalleryGrid from '@/components/GalleryGrid';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://stackpilot.fr';

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  const title = `${project.title} — ${project.type} | Jennifer Jaulin`;
  const description = project.shortDescription;

  return {
    title,
    description,
    alternates: { canonical: `${BASE_URL}/projets/${slug}` },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/projets/${slug}`,
    },
  };
}

export default async function ProjetDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) notFound();

  return (
    <div className="min-h-screen bg-[#f7f9fd] pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">

        {/* BreadcrumbList JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE_URL },
                { '@type': 'ListItem', position: 2, name: 'Projets', item: `${BASE_URL}/projets` },
                { '@type': 'ListItem', position: 3, name: project.title, item: `${BASE_URL}/projets/${project.slug}` },
              ],
            }),
          }}
        />

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <Link href="/" className="hover:text-slate-700 transition-colors">Accueil</Link>
          <span>/</span>
          <Link href="/projets" className="hover:text-slate-700 transition-colors">Projets</Link>
          <span>/</span>
          <span className="text-slate-700 font-medium">{project.title}</span>
        </div>

        {/* Hero */}
        <MotionSection className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden mb-6">
          <div className="relative w-full h-64 sm:h-80 bg-slate-100">
            <img
              src={project.mainImage}
              alt={project.title}
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <p className="text-indigo-300 text-xs font-bold uppercase tracking-widest mb-1">{project.type}</p>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">{project.title}</h1>
            </div>
          </div>
          <div className="p-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-700 bg-green-50 border border-green-100 px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              {project.status}
            </span>
            {project.tags.slice(0, 5).map((tag) => (
              <span key={tag} className="text-xs bg-[#f7f9fd] border border-slate-200/70 text-slate-600 px-2.5 py-1 rounded-lg">
                {tag}
              </span>
            ))}
          </div>
        </MotionSection>

        <MotionSection delay={0.1} className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">

            {/* Description */}
            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6">
              <p className="section-tag mb-2">À propos du projet</p>
              <div className="space-y-3">
                {project.description.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="text-sm text-slate-600 leading-relaxed">{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Problème / Solution */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-amber-50 rounded-2xl border border-amber-100 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-4 h-4 text-amber-600" />
                  <p className="section-tag text-amber-700">Le problème</p>
                </div>
                <p className="text-sm text-amber-800 leading-relaxed">{project.problem}</p>
              </div>
              <div className="bg-indigo-50/60 rounded-2xl border border-indigo-100 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-4 h-4 text-indigo-600" />
                  <p className="section-tag text-indigo-700">La solution</p>
                </div>
                <p className="text-sm text-indigo-800 leading-relaxed">{project.solution}</p>
              </div>
            </div>

            {/* Fonctionnalités */}
            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <Wrench className="w-4 h-4 text-slate-500" />
                <p className="section-tag">Fonctionnalités</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {project.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-2 text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            {/* Rôle */}
            <div className="bg-violet-50 rounded-2xl border border-violet-100 p-5">
              <div className="flex items-center gap-2 mb-2">
                <User className="w-4 h-4 text-violet-600" />
                <p className="section-tag text-violet-700">Mon rôle</p>
              </div>
              <p className="text-sm text-violet-800 leading-relaxed">{project.role}</p>
            </div>

            {/* Galerie enrichie (illustrations avec titres/descriptions + lightbox) */}
            {project.galleryItems && project.galleryItems.length > 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6">
                <p className="section-tag mb-1">Galerie</p>
                <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                  Pour rendre le projet plus lisible, les visuels ci-dessous synthétisent le parcours automatisé, les bénéfices avant/après et l&apos;architecture technique simplifiée.
                </p>
                <GalleryGrid items={project.galleryItems} />
              </div>
            ) : project.gallery.length >= 1 ? (
              <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6">
                <p className="section-tag mb-4">Galerie</p>
                <GalleryLightbox images={project.gallery} title={project.title} />
              </div>
            ) : null}


          </div>

          {/* Sidebar */}
          <div className="space-y-6">

            {/* Stack */}
            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6">
              <p className="section-tag mb-3">Stack utilisée</p>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tool) => (
                  <span key={tool} className="text-xs font-semibold bg-indigo-50/60 border border-indigo-100 text-indigo-700 px-2.5 py-1 rounded-lg">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Infos */}
            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6">
              <p className="section-tag mb-3">Informations</p>
              <div className="space-y-2">
                <div className="flex items-start gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-slate-500 text-xs">Type</p>
                    <p className="text-slate-700 font-medium">{project.type}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-slate-500 text-xs">Statut</p>
                    <p className="text-slate-700 font-medium">{project.status}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6">
              <p className="section-tag mb-3">Tags</p>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-[#f7f9fd] border border-slate-200/70 text-slate-600 px-2 py-1 rounded-lg">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="relative bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl p-6 text-center overflow-hidden">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/8 blur-xl" />
              </div>
              <div className="relative">
                <p className="text-white font-bold text-sm mb-1">Un projet similaire ?</p>
                <p className="text-indigo-100 text-xs mb-4">
                  Obtenez une architecture personnalisée selon votre contexte.
                </p>
                <Link
                  href="/diagnostic"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-indigo-700 font-semibold text-sm hover:bg-indigo-50 transition-colors"
                >
                  Lancer le diagnostic
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>
        </MotionSection>

        {/* Back navigation */}
        <div className="mt-8">
          <Link
            href="/projets"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux projets
          </Link>
        </div>

      </div>
    </div>
  );
}
