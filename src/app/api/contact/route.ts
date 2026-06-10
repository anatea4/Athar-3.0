import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { notifyNewSubmission } from '@/lib/notify';

export const dynamic = 'force-dynamic';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

// POST — a visitor sends a direct contact message { email, message, name?, phone? }
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = (body.email || '').toString().trim().slice(0, 200);
    const message = (body.message || '').toString().trim().slice(0, 4000);
    const name = (body.name || '').toString().trim().slice(0, 120);
    const phone = (body.phone || '').toString().trim().slice(0, 60);

    if (!email || !isEmail(email)) {
      return NextResponse.json(
        { success: false, error: 'البريد الإلكتروني غير صحيح، يرجى التحقق منه.' },
        { status: 400 }
      );
    }
    if (!message) {
      return NextResponse.json(
        { success: false, error: 'الرجاء كتابة نص الرسالة قبل الإرسال.' },
        { status: 400 }
      );
    }

    const payload = { name, email, phone, message };

    const { error } = await supabaseAdmin
      .from('submissions')
      .insert({ form_type: 'contact', data: payload });
    if (error) {
      return NextResponse.json(
        { success: false, error: 'تعذّر حفظ الرسالة، حاول مرة أخرى لاحقاً.' },
        { status: 500 }
      );
    }

    // Notify the academy (no-op if email isn't configured)
    await notifyNewSubmission('contact', payload);

    return NextResponse.json({
      success: true,
      message: 'تم استلام رسالتك بنجاح، وسيتواصل معك فريق أكاديمية أثر في أقرب وقت بإذن الله. شكراً لتواصلك معنا.',
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'حدث خطأ غير متوقع، يرجى المحاولة مرة أخرى.' },
      { status: 400 }
    );
  }
}
