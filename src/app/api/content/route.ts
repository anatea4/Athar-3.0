import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';

// Must be dynamic — otherwise Next caches the GET response and saved edits
// won't appear until rebuild ("edits don't save" bug).
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function getSession() {
  const cookieStore = cookies();
  const session = cookieStore.get('admin_session');
  if (!session) return null;
  try {
    return JSON.parse(session.value);
  } catch {
    return null;
  }
}

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('site_content')
    .select('section, data, updated_at');

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const content: Record<string, any> = {};
  for (const row of data || []) {
    content[row.section] = row.data;
  }
  return NextResponse.json({ content });
}

export async function PUT(req: NextRequest) {
  const session = getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  // Accept either { section, data } (new) or { key, value } (legacy)
  const section = body.section || body.key;
  const data = body.data !== undefined ? body.data : body.value;
  if (!section) return NextResponse.json({ error: 'Section required' }, { status: 400 });

  const { error } = await supabaseAdmin.from('site_content').upsert(
    {
      section,
      data: data === null || data === undefined ? {} : data,
      updated_at: new Date().toISOString(),
      updated_by: session.id,
    },
    { onConflict: 'section' }
  );

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
