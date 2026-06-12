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
          `<tr>
            <td style="padding:14px 16px;font-weight:bold;color:#8C7343;border-bottom:1px solid #f1f5f9;width:30%;vertical-align:top;font-size:13px;background-color:#fafaf9;">${
              FIELD_LABELS[k] || k
            }</td>
            <td style="padding:14px 16px;color:#192d4a;border-bottom:1px solid #f1f5f9;line-height:1.5;font-size:14px;">${String(v)}</td>
          </tr>`
      )
      .join('');

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://atharacademy.info';
    const logoUrl = `${siteUrl}/athar-logo.png`;
    const footerLogoUrl = `${siteUrl}/logo-footer.png`;
    const adminUrl = `${siteUrl}/admin`;

    const html = `
      <div dir="rtl" style="font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color:#FCF9F2; padding:45px 20px; text-align:right; -webkit-font-smoothing:antialiased;">
        <div style="max-width:600px; margin:0 auto; background-color:#ffffff; border-radius:24px; overflow:hidden; border-top:6px solid #192d4a; border-bottom:6px solid #C09E5B; box-shadow: 0 20px 40px rgba(25, 45, 74, 0.06);">
          
          <!-- Institution Header Logo -->
          <div style="background-color:#ffffff; padding:35px 24px 25px 24px; text-align:center; border-bottom:1px solid #f3f4f6;">
            <img src="${logoUrl}" alt="Athar Logo" style="height:90px; width:auto; display:inline-block; margin-bottom:12px;" />
            <h1 style="margin:0; font-size:22px; font-weight:800; color:#192d4a; font-family:'Segoe UI', system-ui, sans-serif;">أكاديمية أثر للقرآن الكريم</h1>
            <p style="margin:4px 0 0 0; font-size:11px; color:#C09E5B; font-weight:700; letter-spacing:1.5px; text-transform:uppercase;">ATHAR QURAN ACADEMY</p>
          </div>

          <!-- Notification Banner -->
          <div style="background-color:#192d4a; padding:20px 24px; color:#ffffff; font-size:18px; font-weight:bold; text-align:center;">
            🔔 ${title}
          </div>

          <!-- Description text -->
          <div style="padding:28px 28px 10px 28px; text-align:right;">
            <p style="margin:0; font-size:14px; color:#64748b; line-height:1.6;">
              السلام عليكم ورحمة الله وبركاته،<br/>
              تم استلام نموذج إلكتروني جديد عبر الموقع الرسمي للأكاديمية. تفاصيل الطلب المرسل أدناه:
            </p>
          </div>

          <!-- Fields Table -->
          <div style="padding:10px 28px 28px 28px;">
            <div style="background-color:#fafaf9; border:1px solid #e7e5e4; border-radius:18px; overflow:hidden;">
              <table style="width:100%; border-collapse:collapse; font-size:14px; text-align:right;">
                <tbody>
                  ${rows}
                </tbody>
              </table>
            </div>
          </div>

          <!-- CTA to Admin Dashboard -->
          <div style="padding: 0 28px 35px 28px; text-align: center;">
            <a href="${adminUrl}" target="_blank" style="display: inline-block; background-color: #C09E5B; color: #ffffff; padding: 14px 35px; font-size: 14px; font-weight: 800; text-decoration: none; border-radius: 14px; box-shadow: 0 6px 20px rgba(192, 158, 91, 0.25); transition: all 0.2s ease;">
              عرض تفاصيل الطلبات في لوحة التحكم
            </a>
          </div>

          <!-- Footer Information & Creator Logo -->
          <div style="background-color:#f8fafc; padding:28px; text-align:center; border-top:1px solid #e2e8f0;">
            <p style="margin:0 0 16px 0; color:#64748b; font-size:11px; line-height:1.6;">
              تصلك هذه الرسالة بصفتك مشرفاً في أكاديمية أثر. يمكنك تعديل إعدادات البريد من لوحة التحكم.
            </p>
            <div style="display:inline-flex; align-items:center; justify-content:center; gap:8px;">
              <span style="color:#94a3b8; font-size:10px; vertical-align:middle; line-height:32px;">تطوير وتصميم</span>
              <img src="${footerLogoUrl}" alt="Meem Design" style="height:28px; width:auto; vertical-align:middle; display:inline-block;" />
            </div>
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
