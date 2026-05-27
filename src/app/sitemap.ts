import { MetadataRoute } from 'next';
import { technologies } from '@/data/technologies';
import { projects } from '@/data/projects';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://stackpilot.fr';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/diagnostic`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/technologies`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/projets`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/a-propos`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ];

  const techPages: MetadataRoute.Sitemap = technologies.map((tech) => ({
    url: `${BASE_URL}/technologies/${tech.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${BASE_URL}/projets/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  return [...staticPages, ...techPages, ...projectPages];
}
