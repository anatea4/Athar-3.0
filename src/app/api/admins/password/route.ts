import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { changeAdminPassword } from '@/lib/auth';

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

export async function PUT(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { adminId, newPassword } = await req.json();
  if (!adminId || !newPassword)
    return NextResponse.json({ error: 'Admin ID and new password required' }, { status: 400 });

  if (!session.isSuper && adminId !== session.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const success = await changeAdminPassword(adminId, newPassword);
  if (!success) return NextResponse.json({ error: 'Failed to change password' }, { status: 500 });
  return NextResponse.json({ success: true });
}
