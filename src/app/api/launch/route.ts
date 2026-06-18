import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const KEYS = [
  'launch_enabled', 'launch_count', 'launch_beat_ms', 'launch_curtain_ms', 'launch_golden_ms', 'launch_thanks_secs',
  'launch_title_ar', 'launch_title_en', 'launch_title_ms',
  'launch_verse_ar',
  'launch_message_ar', 'launch_message_en', 'launch_message_ms',
  'preloader_enabled',
];

const DEFAULT_MESSAGE_AR =
  'شكرٌ من القلب لكل من كان له أثر…\n\nإلى مؤسّسي الأكاديمية وروّادها\nإلى مشايخنا ومعلّمينا حملةِ كتاب الله\nإلى الموظّفين والإداريين جنودِ الخفاء\nإلى طلّابنا وطالباتنا نبضِ المسيرة\nإلى الداعمين والمتبرّعين أصحابِ الأثر الباقي\nوإلى كل محبٍّ رافَقَنا في الطريق\n\nجزاكم الله خيرًا، وجعله في موازين حسناتكم\nوبارك في الأثر… ليبقى';

const num = (v: string, def: number, min: number, max: number) => {
  const n = Number(v);
  return isNaN(n) ? def : Math.max(min, Math.min(max, n));
};

// Public: full launch ("تدشين") intro settings — every timing & text is editable.
export async function GET() {
  try {
    const { data } = await supabaseAdmin.from('site_settings').select('key, value').in('key', KEYS);
    const m: Record<string, string> = {};
    (data || []).forEach((r: any) => { m[r.key] = r.value || ''; });
    return NextResponse.json({
      enabled: m['launch_enabled'] === 'true',
      preloaderEnabled: m['preloader_enabled'] !== 'false', // default ON
      count: num(m['launch_count'], 5, 0, 10),
      beatMs: num(m['launch_beat_ms'], 1000, 400, 2500),
      curtainMs: num(m['launch_curtain_ms'], 3200, 1200, 8000),
      goldenMs: num(m['launch_golden_ms'], 6000, 2000, 12000),
      thanksSecs: num(m['launch_thanks_secs'], 0, 0, 60), // 0 = auto (medium pace)
      titleAr: m['launch_title_ar'] || 'تدشين أكاديمية أثر للقرآن الكريم',
      titleEn: m['launch_title_en'] || 'Athar Quran Academy Launch',
      titleMs: m['launch_title_ms'] || 'Pelancaran Akademi Athar',
      verseAr: m['launch_verse_ar'] || '﴿ وَقُل رَّبِّ زِدْنِي عِلْمًا ﴾',
      messageAr: m['launch_message_ar'] || DEFAULT_MESSAGE_AR,
      messageEn: m['launch_message_en'] || 'Thank you to everyone who left a mark…',
      messageMs: m['launch_message_ms'] || 'Terima kasih kepada semua yang meninggalkan kesan…',
    });
  } catch {
    return NextResponse.json({ enabled: false, preloaderEnabled: true });
  }
}
