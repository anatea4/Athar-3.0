import { notFound } from 'next/navigation';
import SiteApp from '@/components/SiteApp';
import { resolveSlug, isValidSub, SECTION_TITLES_AR } from '@/lib/sections';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { slug: string; sub: string } }) {
  const view = resolveSlug(params.slug);
  const title = view ? (SECTION_TITLES_AR[view.section] || 'أكاديمية أثر') : 'أكاديمية أثر';
  return { title: `${title} | أكاديمية أثر` };
}

// Nested section/sub route, e.g. /about/who-we-are, /programs/quran-circles.
export default function SubRoute({ params }: { params: { slug: string; sub: string } }) {
  const view = resolveSlug(params.slug);
  const sub = decodeURIComponent(params.sub);
  if (!view || !isValidSub(view.section, sub)) notFound();
  return <SiteApp initialSection={view.section} initialSub={sub} />;
}
