import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function getGeminiKey(): Promise<string> {
  const { data } = await supabaseAdmin.from('site_settings').select('value').eq('key', 'gemini_api_key').single();
  return data?.value || process.env.GEMINI_API_KEY || '';
}

const KNOWLEDGE = `
أنت "مُعلّم أثر"، المساعد الذكي الرسمي لأكاديمية أثر. تحدّث بلطف واحترام وأسلوب راقٍ، وأجب بإيجاز ووضوح.

معلومات عن الأكاديمية:
- أكاديمية أثر مؤسسة تعليمية تأسست في أغسطس 2024م في ماليزيا، تُعنى بتعليم القرآن الكريم وعلومه واللغة العربية والعلوم الشرعية.
- الرؤية: الريادة في تعليم القرآن وعلومه واللغة العربية وتحقيق أثر إيجابي مستدام.

البرامج التعليمية:
- برنامج الحلقات القرآنية (بنين، بنات، أطفال) — تحفيظ وتجويد ومتابعة تربوية.
- برنامج مع السّفرة (سرد المحفوظ كاملاً).
- برنامج تكوين التربوي.
- مخيم صنّاع الغد (للبنين)، مخيم سفيرات الأثر (للفتيات).
- المعتكف الرمضاني، رحلة الأثر، برنامج قارئ أثر.
- الإجازات القرآنية بالسند المتصل.
- التعليم حضوري وعن بُعد.

القبول والتسجيل:
- التسجيل في الحلقات والبرامج وطلب التوظيف متاح عبر صفحة "القبول والتسجيل" في الموقع.
- الرسوم داخل ماليزيا: رسوم التسجيل 100 رينغيت (مرة واحدة عند الالتحاق)، والرسوم الشهرية 70 رينغيت.

الدعم والتواصل:
- التطوع، فريق السفراء، التبرعات (كفالة حلقة/طالب)، ودفع الرسوم متاح عبر الموقع.
- الهاتف/الواتساب: +60147086011 — البريد: atharacademy6@gmail.com

تعليمات:
- أجب بنفس لغة المستخدم (العربية أو الإنجليزية أو الماليزية).
- لأي سؤال عن الرسوم (داخل ماليزيا)، أجب دائماً: رسوم التسجيل 100 رينغيت، والرسوم الشهرية 70 رينغيت.
- للتسجيل، وجّه المستخدم لصفحة "القبول والتسجيل" أو للتواصل عبر واتساب.
- لا تختلق معلومات غير مؤكدة؛ وجّه للتواصل المباشر عند عدم اليقين.
- اجعل ردودك مختصرة (2-5 جمل غالباً).
`;

const langName = (lang: string) => (lang === 'ms' ? 'Malay' : lang === 'en' ? 'English' : 'Arabic');

export async function POST(req: NextRequest) {
  try {
    const { message, history, lang } = await req.json();
    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message required' }, { status: 400 });
    }

    const apiKey = await getGeminiKey();
    if (!apiKey) {
      return NextResponse.json({ error: 'Gemini API key not configured' }, { status: 503 });
    }

    // Build Gemini conversation contents from prior history + the new message
    const contents: any[] = [];
    for (const m of (Array.isArray(history) ? history : []).slice(-8)) {
      const role = m.sender === 'user' ? 'user' : 'model';
      const text = (m.text || '').toString();
      if (text) contents.push({ role, parts: [{ text }] });
    }
    contents.push({ role: 'user', parts: [{ text: message }] });

    const systemInstruction = {
      parts: [{ text: `${KNOWLEDGE}\n\nReply in ${langName(lang)}.` }],
    };

    // Try models in order; fall back to a lighter model if one is overloaded (503)
    // or rate-limited (429). Each request also gets one quick retry on 503.
    const models = ['gemini-2.5-flash', 'gemini-2.5-flash-lite', 'gemini-flash-lite-latest'];
    const payload = JSON.stringify({
      systemInstruction,
      contents,
      generationConfig: { temperature: 0.6, maxOutputTokens: 800 },
    });

    let lastStatus = 0;
    let lastErr = '';
    for (const model of models) {
      for (let attempt = 0; attempt < 2; attempt++) {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: payload }
        );
        if (res.ok) {
          const data = await res.json();
          const text = data?.candidates?.[0]?.content?.parts?.map((p: any) => p.text).join('') || '';
          if (text) return NextResponse.json({ text });
          lastStatus = 502;
          lastErr = 'empty';
          break;
        }
        lastStatus = res.status;
        lastErr = await res.text();
        // Retry same model once on transient overload; otherwise move to next model
        if (res.status === 503 && attempt === 0) {
          await new Promise((r) => setTimeout(r, 900));
          continue;
        }
        break;
      }
    }

    console.error('[chat] Gemini failed on all models:', lastStatus, lastErr);
    return NextResponse.json({ error: `Gemini error ${lastStatus}` }, { status: lastStatus === 429 ? 429 : 502 });
  } catch (e: any) {
    console.error('[chat] error:', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
