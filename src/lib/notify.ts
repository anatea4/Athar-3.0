import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function getSetting(key: string): Promise<string> {
  const { data } = await supabaseAdmin.from('site_settings').select('value').eq('key', key).single();
  return data?.value || '';
}

const FORM_LABELS: Record<string, string> = {
  contact: 'رسالة تواصل جديدة',
  inquiry: 'استفسار جديد',
  volunteer: 'طلب تطوّع جديد',
  donation: 'طلب كفالة / تبرّع جديد',
  careers: 'طلب توظيف جديد',
  register_circles: 'تسجيل جديد في الحلقات',
  register_programs: 'تسجيل جديد في البرامج',
  registration: 'تسجيل جديد',
  general: 'إرسال جديد من الموقع',
};

const FIELD_LABELS: Record<string, string> = {
  name: 'الاسم',
  phone: 'الهاتف',
  email: 'البريد',
  message: 'الرسالة',
  role: 'الدور',
  type: 'النوع',
  amount: 'المبلغ',
};

/**
 * Send an email notification to the admin about a new form submission.
 * Uses Resend (https://resend.com). Requires `resend_api_key` + `notify_email`
 * to be set in site_settings. Silently no-ops if not configured.
 */
export async function notifyNewSubmission(formType: string, data: Record<string, any>): Promise<void> {
  try {
    const apiKey = (await getSetting('resend_api_key')) || process.env.RESEND_API_KEY || '';
    const toRaw = (await getSetting('notify_email')) || '';
    // Support multiple recipients separated by comma, semicolon, space, or newline
    const to = toRaw
      .split(/[,;\s\n]+/)
      .map((s) => s.trim())
      .filter((s) => s.includes('@'));
    if (!apiKey || to.length === 0) return; // not configured yet — skip silently

    const title = FORM_LABELS[formType] || FORM_LABELS.general;
    const rows = Object.entries(data || {})
      .map(
        ([k, v]) =>
          `<tr><td style="padding:8px 14px;font-weight:bold;color:#8C7343;border-bottom:1px solid #eee;">${
            FIELD_LABELS[k] || k
          }</td><td style="padding:8px 14px;color:#192d4a;border-bottom:1px solid #eee;">${String(v)}</td></tr>`
      )
      .join('');

    const html = `
      <div dir="rtl" style="font-family:Tahoma,Arial,sans-serif;background:#FCF9F2;padding:24px;">
        <div style="max-width:560px;margin:auto;background:#fff;border-radius:16px;overflow:hidden;border-top:4px solid #C09E5B;">
          <div style="background:#192d4a;padding:18px 24px;color:#C09E5B;font-size:18px;font-weight:bold;">
            أكاديمية أثر — ${title}
          </div>
          <table style="width:100%;border-collapse:collapse;font-size:14px;">${rows}</table>
          <div style="padding:14px 24px;color:#94a3b8;font-size:12px;">
            وصلتك هذه الرسالة من نموذج على موقع أكاديمية أثر. افتح لوحة التحكم لعرض كل الطلبات.
          </div>
        </div>
      </div>`;

    const fromAddress = (await getSetting('email_from')) || 'Athar Academy <onboarding@resend.dev>';

    // Send to each recipient SEPARATELY so one rejected address (e.g. Resend test-mode
    // restriction) does not block the others. Each succeeds/fails independently.
    await Promise.all(
      to.map(async (recipient) => {
        try {
          const res = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ from: fromAddress, to: [recipient], subject: `أثر • ${title}`, html }),
          });
          if (!res.ok) {
            console.error(`[notify] failed for ${recipient}:`, res.status, await res.text());
          } else {
            console.log('[notify] email sent to:', recipient);
          }
        } catch (err) {
          console.error(`[notify] error for ${recipient}:`, err);
        }
      })
    );
  } catch (e) {
    console.error('[notify] error:', e);
  }
}
