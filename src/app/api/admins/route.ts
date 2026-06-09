import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';
import { hashPassword } from '@/lib/auth';

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

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data, error } = await supabaseAdmin
    .from('admins')
    .select('id, email, is_super, created_at')
    .order('created_at');

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ admins: data });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session || !session.isSuper)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { email, password, isSuper } = await req.json();
  if (!email || !password)
    return NextResponse.json({ error: 'Email and password required' }, { status: 400 });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email))
    return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });

  const normalized = email.trim().toLowerCase();
  const passwordHash = await hashPassword(password);
  const { data, error } = await supabaseAdmin
    .from('admins')
    .insert({
      email: normalized,
      username: normalized.split('@')[0],
      password_hash: passwordHash,
      is_super: isSuper || false,
    })
    .select('id, email, is_super, created_at')
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ admin: data });
}

export async function DELETE(req: NextRequest) {
  const session = await getSession();
  if (!session || !session.isSuper)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await req.json();
  if (id === session.id)
    return NextResponse.json({ error: 'Cannot delete yourself' }, { status: 400 });

  const { error } = await supabaseAdmin.from('admins').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
