import type { MetadataRoute } from 'next';

const BASE = 'https://athar.my';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const sections = [
    '', 'about', 'programs', 'solutions', 'media', 'support', 'admission', 'finance', 'contact',
  ];
  return sections.map((s) => ({
    url: s ? `${BASE}/${s}` : BASE,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: s === '' ? 1 : 0.8,
  }));
}
