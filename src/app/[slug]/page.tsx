import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';
import PageRenderer, { CustomPage } from '@/components/PageRenderer';

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
  const page = await getPage(params.slug);
  if (!page) return { title: 'Athar Academy' };
  return { title: `${page.title_ar || page.title_en} | أكاديمية أثر` };
}

export default async function CustomPageRoute({ params }: { params: { slug: string } }) {
  const page = await getPage(params.slug);
  if (!page) notFound();
  return <PageRenderer page={page} />;
}
