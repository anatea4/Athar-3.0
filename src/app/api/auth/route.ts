import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAdmin } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = body.email || body.username; // accept both for compatibility
    const { password } = body;
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }

    const admin = await verifyAdmin(email, password);
    if (!admin) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const cookieStore = await cookies();
    cookieStore.set(
      'admin_session',
      JSON.stringify({ id: admin.id, email: admin.email, isSuper: admin.is_super }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      }
    );

    return NextResponse.json({
      success: true,
      admin: { id: admin.id, email: admin.email, isSuper: admin.is_super },
    });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');
  if (!session) return NextResponse.json({ admin: null });
  try {
    const admin = JSON.parse(session.value);
    return NextResponse.json({ admin });
  } catch {
    return NextResponse.json({ admin: null });
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  return NextResponse.json({ success: true });
}
