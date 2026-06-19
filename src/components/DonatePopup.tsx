'use client';
import React, { useEffect, useState } from 'react';
import { Heart, X } from 'lucide-react';
import { Language } from '@/types';

const T = {
  ar: { title: 'كن سبباً في الأثر', body: 'دعمك يعمّر حلقة ويكفل طالباً لحفظ كتاب الله. تبرّعك صدقة جارية.', cta: 'تبرّع الآن', later: 'لاحقاً' },
  en: { title: 'Be part of the impact', body: 'Your support sponsors a student and sustains a Quran circle — an ongoing charity.', cta: 'Donate now', later: 'Later' },
  ms: { title: 'Jadilah sebahagian kesan', body: 'Sokongan anda menaja pelajar dan mengekalkan halaqah Al-Quran — sedekah jariah.', cta: 'Derma sekarang', later: 'Nanti' },
};

const DELAY_MS = 90_000; // 1.5 minutes
const SEEN_KEY = 'athar_donate_popup_seen';

/**
 * Gentle donation prompt that slides in after ~1.5 minutes of browsing.
 * Dismissible, and shown only once per browser session.
 */
export default function DonatePopup({ currentLang, onDonate }: { currentLang: Language; onDonate: () => void }) {
  const [open, setOpen] = useState(false);
  const t = T[currentLang] || T.ar;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Don't nag: skip in admin preview or if already seen this session.
    const inPreview = window.parent !== window || new URLSearchParams(window.location.search).get('preview') === '1';
    if (inPreview || sessionStorage.getItem(SEEN_KEY)) return;
    const t = setTimeout(() => setOpen(true), DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    setOpen(false);
    try { sessionStorage.setItem(SEEN_KEY, '1'); } catch {}
  };

  if (!open) return null;
  const dir = currentLang === 'ar' ? 'rtl' : 'ltr';

  return (
    <div
      dir={dir}
      className="fixed bottom-5 left-5 rtl:right-5 rtl:left-auto z-[90] w-[88%] max-w-sm animate-in fade-in slide-in-from-bottom-6 duration-500"
    >
      <div className="relative bg-brand-blue-dark text-white rounded-3xl shadow-2xl border-2 border-brand-gold/40 overflow-hidden">
        <div className="absolute inset-0 islamic-pattern-dark opacity-[0.08] pointer-events-none" />
        <button
          onClick={close}
          aria-label="إغلاق"
          className="absolute top-3 left-3 rtl:right-3 rtl:left-auto z-10 h-7 w-7 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative p-6 text-center">
          <div className="mx-auto mb-3 h-12 w-12 flex items-center justify-center rounded-2xl bg-brand-gold/20 text-brand-gold border border-brand-gold/30">
            <Heart className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold font-classical text-brand-gold mb-1.5">{t.title}</h3>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-5">{t.body}</p>
          <div className="flex items-center justify-center gap-2.5">
            <button
              onClick={() => { close(); onDonate(); }}
              className="flex items-center gap-1.5 bg-brand-gold hover:bg-brand-gold-light text-brand-blue-dark font-bold text-sm px-5 py-2.5 rounded-xl shadow-md transition-colors"
            >
              <Heart className="h-4 w-4" />
              {t.cta}
            </button>
            <button onClick={close} className="text-xs text-slate-300 hover:text-white font-bold px-3 py-2.5 transition">
              {t.later}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
