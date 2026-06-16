import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { notifyNewSubmission } from '@/lib/notify';

export const dynamic = 'force-dynamic';

async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');
  if (!session) return null;
  try { return JSON.parse(session.value); } catch { return null; }
}

// Admin-only: send a test notification email to the configured notify_email recipients.
export async function POST() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await notifyNewSubmission('contact', {
    name: 'اختبار النظام',
    email: 'test@athar.my',
    message: 'هذه رسالة اختبار من لوحة التحكم للتأكد أن إشعارات البريد تصل بنجاح.',
  });
  return NextResponse.json({ success: true });
}
