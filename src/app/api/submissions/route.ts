import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';
import { notifyNewSubmission } from '@/lib/notify';

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

// POST — public: a site visitor submits a form
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const form_type = (body.form_type || 'general').toString().slice(0, 50);
    const data = body.data && typeof body.data === 'object' ? body.data : {};

    // Basic anti-abuse: cap field count/size
    const safe: Record<string, any> = {};
    let count = 0;
    for (const [k, v] of Object.entries(data)) {
      if (count++ >= 30) break;
      safe[String(k).slice(0, 60)] = typeof v === 'string' ? v.slice(0, 4000) : v;
    }

    const { error } = await supabaseAdmin.from('submissions').insert({ form_type, data: safe });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    // Fire-and-forget email notification to the admin (no-op if not configured)
    await notifyNewSubmission(form_type, safe);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

// GET — admin: list submissions (optional ?type=&unread=1)
export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const type = req.nextUrl.searchParams.get('type');
  let query = supabaseAdmin.from('submissions').select('*').order('created_at', { ascending: false }).limit(500);
  if (type && type !== 'all') query = query.eq('form_type', type);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Also return per-type counts for the filter bar
  const { data: allTypes } = await supabaseAdmin.from('submissions').select('form_type, is_read');
  const counts: Record<string, { total: number; unread: number }> = {};
  for (const row of allTypes || []) {
    const t = row.form_type;
    counts[t] = counts[t] || { total: 0, unread: 0 };
    counts[t].total++;
    if (!row.is_read) counts[t].unread++;
  }

  return NextResponse.json({ submissions: data || [], counts });
}

// PATCH — admin: mark read/unread
export async function PATCH(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id, is_read } = await req.json();
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });

  const { error } = await supabaseAdmin.from('submissions').update({ is_read: !!is_read }).eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

// DELETE — admin: remove a submission
export async function DELETE(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });

  const { error } = await supabaseAdmin.from('submissions').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
