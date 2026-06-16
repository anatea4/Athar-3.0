import type { MetadataRoute } from 'next';
import { createClient } from '@supabase/supabase-js';
import { SECTION_SUBS } from '@/lib/sections';

const BASE = 'https://athar.my';

// تهيئة عميل Supabase بشكل آمن لتفادي مشاكل وقت البناء (Build time) في حال عدم وجود متغيرات البيئة
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // 1. الأقسام الرئيسية الثابتة
  const mainSections = [
    '', 'about', 'programs', 'solutions', 'media', 'support', 'admission', 'finance', 'contact',
  ];

  const mainUrls: MetadataRoute.Sitemap = mainSections.map((s) => ({
    url: s ? `${BASE}/${s}` : BASE,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: s === '' ? 1 : 0.8,
  }));

  // 2. توليد روابط الصفحات الفرعية ديناميكياً (Sub-tabs) مثل /about/who-we-are
  const subUrls: MetadataRoute.Sitemap = [];
  for (const [section, subs] of Object.entries(SECTION_SUBS)) {
    for (const sub of subs) {
      subUrls.push({
        url: `${BASE}/${section}/${sub}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.6,
      });
    }
  }

  // 3. جلب الصفحات المخصصة المنشورة ديناميكياً وبشكل آمن من قاعدة البيانات (مع استثناء غير المنشورة)
  let customUrls: MetadataRoute.Sitemap = [];
  if (supabase) {
    try {
      const { data: pages } = await supabase
        .from('custom_pages')
        .select('slug, updated_at')
        .eq('published', true); // جلب الصفحات المنشورة فقط لحماية الصفحات المسودة أو الخاصة

      if (pages) {
        customUrls = pages.map((page) => ({
          url: `${BASE}/${page.slug}`,
          lastModified: page.updated_at ? new Date(page.updated_at) : now,
          changeFrequency: 'monthly',
          priority: 0.7,
        }));
      }
    } catch (error) {
      console.error('Error generating dynamic sitemap from Supabase:', error);
    }
  }

  return [...mainUrls, ...subUrls, ...customUrls];
}

