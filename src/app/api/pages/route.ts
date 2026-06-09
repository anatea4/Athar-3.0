import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');
  if (!session) return null;
  try {
    return JSON.parse(session.value);
  } catch {
    return null;
  }
}

function slugify(s: string) {
  return (s || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9؀-ۿ\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// GET — list all pages (admin) or only published (public via ?published=1)
export async function GET(req: NextRequest) {
  const onlyPublished = req.nextUrl.searchParams.get('published') === '1';
  let query = supabaseAdmin.from('custom_pages').select('*').order('sort_order');
  if (onlyPublished) query = query.eq('published', true);
  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ pages: data || [] });
}

// POST — create a new page
export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const titleAr = body.title_ar || 'صفحة جديدة';
  let slug = slugify(body.slug || body.title_en || body.title_ar || 'page');
  if (!slug) slug = 'page';

  // Ensure unique slug
  const { data: existing } = await supabaseAdmin.from('custom_pages').select('slug');
  const taken = new Set((existing || []).map((p: any) => p.slug));
  let finalSlug = slug;
  let n = 2;
  while (taken.has(finalSlug)) finalSlug = `${slug}-${n++}`;

  const { data, error } = await supabaseAdmin
    .from('custom_pages')
    .insert({
      slug: finalSlug,
      title_ar: titleAr,
      title_en: body.title_en || '',
      title_ms: body.title_ms || '',
      blocks: body.blocks || [],
      published: body.published ?? true,
      show_in_nav: body.show_in_nav ?? true,
      sort_order: body.sort_order ?? 0,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ page: data });
}

// PUT — update an existing page
export async function PUT(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  if (!body.id) return NextResponse.json({ error: 'id required' }, { status: 400 });

  const update: any = { updated_at: new Date().toISOString() };
  if (body.slug !== undefined) update.slug = slugify(body.slug);
  if (body.title_ar !== undefined) update.title_ar = body.title_ar;
  if (body.title_en !== undefined) update.title_en = body.title_en;
  if (body.title_ms !== undefined) update.title_ms = body.title_ms;
  if (body.blocks !== undefined) update.blocks = body.blocks;
  if (body.published !== undefined) update.published = body.published;
  if (body.show_in_nav !== undefined) update.show_in_nav = body.show_in_nav;
  if (body.sort_order !== undefined) update.sort_order = body.sort_order;

  const { data, error } = await supabaseAdmin
    .from('custom_pages')
    .update(update)
    .eq('id', body.id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ page: data });
}

// DELETE — remove a page
export async function DELETE(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });

  const { error } = await supabaseAdmin.from('custom_pages').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
