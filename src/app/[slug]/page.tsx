import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';
import PageRenderer, { CustomPage } from '@/components/PageRenderer';
import SiteApp from '@/components/SiteApp';
import { resolveSlug, SECTION_TITLES_AR } from '@/lib/sections';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const dynamic = 'force-dynamic';

async function getPage(slug: string): Promise<CustomPage | null> {
  const { data, error } = await supabase
    .from('custom_pages')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();
  if (error || !data) return null;
  return data as CustomPage;
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  // Built-in section route → section title
  const view = resolveSlug(params.slug);
  if (view) {
    const title = SECTION_TITLES_AR[view.section] || 'أكاديمية أثر';
    return { title: `${title} | أكاديمية أثر` };
  }
  const page = await getPage(params.slug);
  if (!page) return { title: 'Athar Academy' };
  return { title: `${page.title_ar || page.title_en} | أكاديمية أثر` };
}

export default async function SlugRoute({ params }: { params: { slug: string } }) {
  // 1) Built-in site section (e.g. /about, /programs, /stats) → render the site app on it.
  const view = resolveSlug(params.slug);
  if (view) {
    return <SiteApp initialSection={view.section} initialSub={view.sub || ''} />;
  }

  // 2) Otherwise treat it as a custom CMS page.
  const page = await getPage(params.slug);
  if (!page) notFound();
  return <PageRenderer page={page} />;
}
