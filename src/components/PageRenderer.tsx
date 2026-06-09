'use client';
import React, { useEffect, useState } from 'react';
import { Language } from '@/types';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingChatbot from '@/components/FloatingChatbot';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';
import { submitForm } from '@/lib/submit-form';

type Block = any;

const pick = (obj: any, base: string, lang: Language): string => {
  if (!obj) return '';
  if (lang === 'ms') return obj[`${base}Ms`] || obj[`${base}En`] || obj[`${base}Ar`] || '';
  if (lang === 'en') return obj[`${base}En`] || obj[`${base}Ar`] || '';
  return obj[`${base}Ar`] || obj[`${base}En`] || '';
};

export interface CustomPage {
  id: string;
  slug: string;
  title_ar: string;
  title_en: string;
  title_ms: string;
  blocks: Block[];
  published: boolean;
}

export default function PageRenderer({ page }: { page: CustomPage }) {
  const [lang, setLang] = useState<Language>('ar');

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const title = lang === 'ms' ? page.title_ms || page.title_en : lang === 'en' ? page.title_en : page.title_ar;
  const blocks = (page.blocks || []).filter((b: Block) => !b._hidden);

  // Clicking a nav section from a custom page navigates to the home SPA with that section
  const goToSection = (sectionId: string, subId?: string) => {
    window.location.href = `/?s=${encodeURIComponent(sectionId)}&sub=${encodeURIComponent(subId || '')}`;
  };

  return (
    <div className="min-h-screen bg-brand-sand font-sans flex flex-col">
      {/* Full site header — same design & navbar as the rest of the site */}
      <Header
        currentLang={lang}
        onLanguageChange={setLang}
        activeSection=""
        activeSubSection=""
        onSectionChange={goToSection}
      />

      {/* Page title */}
      <div className="bg-white border-b border-brand-gold/15">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-blue-dark font-serif">{title}</h1>
        </div>
      </div>

      {/* Blocks */}
      <main className="flex-grow">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 space-y-10">
          {blocks.length === 0 && (
            <p className="text-center text-slate-400 py-20">
              {lang === 'ar' ? 'لا يوجد محتوى في هذه الصفحة بعد.' : 'No content yet.'}
            </p>
          )}
          {blocks.map((block: Block, i: number) => (
            <BlockView key={i} block={block} lang={lang} />
          ))}
        </div>
      </main>

      <Footer currentLang={lang} />
      <FloatingChatbot currentLang={lang} />
      <WhatsAppButton currentLang={lang} />
    </div>
  );
}

function BlockView({ block, lang }: { block: Block; lang: Language }) {
  switch (block.type) {
    case 'heading':
      return (
        <h2 className="text-2xl sm:text-3xl font-bold text-brand-blue-dark text-center">
          {pick(block, 'text', lang)}
        </h2>
      );

    case 'text':
      return (
        <p className="text-base sm:text-lg text-slate-700 leading-relaxed whitespace-pre-line text-center">
          {pick(block, 'text', lang)}
        </p>
      );

    case 'image':
      return (
        <figure className="space-y-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={block.url}
            alt={pick(block, 'caption', lang)}
            className="w-full rounded-2xl shadow-md object-cover max-h-[480px]"
          />
          {pick(block, 'caption', lang) && (
            <figcaption className="text-center text-xs text-slate-500">{pick(block, 'caption', lang)}</figcaption>
          )}
        </figure>
      );

    case 'button':
      return (
        <div className="text-center">
          <a
            href={block.link || '#'}
            target={block.link?.startsWith('http') ? '_blank' : undefined}
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-brand-blue to-brand-blue-light text-white font-bold px-8 py-3.5 rounded-full shadow-lg hover:-translate-y-0.5 transition-transform"
          >
            {pick(block, 'label', lang)}
          </a>
        </div>
      );

    case 'hero':
      return (
        <div className="relative rounded-3xl overflow-hidden bg-brand-blue-dark text-white shadow-xl">
          {block.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={block.image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
          )}
          <div className="relative p-10 sm:p-14 text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold">{pick(block, 'title', lang)}</h2>
            <p className="text-slate-200 max-w-2xl mx-auto leading-relaxed">{pick(block, 'subtitle', lang)}</p>
            {pick(block, 'buttonLabel', lang) && (
              <a
                href={block.buttonLink || '#'}
                target={block.buttonLink?.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="inline-block bg-brand-gold text-brand-blue-dark font-bold px-8 py-3 rounded-full mt-2"
              >
                {pick(block, 'buttonLabel', lang)}
              </a>
            )}
          </div>
        </div>
      );

    case 'cards':
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(block.items || []).filter((c: any) => !c._hidden).map((card: any, idx: number) => (
            <div key={idx} className="bg-white rounded-2xl border border-brand-gold/15 overflow-hidden shadow-sm">
              {card.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={card.image} alt="" className="w-full h-40 object-cover" />
              )}
              <div className="p-5 space-y-2">
                <h3 className="font-bold text-brand-blue-dark">{pick(card, 'title', lang)}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{pick(card, 'desc', lang)}</p>
              </div>
            </div>
          ))}
        </div>
      );

    case 'form':
      return <FormBlock block={block} lang={lang} />;

    default:
      return null;
  }
}

// ---------------------------------------------------------------------------
// Registration / application form block
// ---------------------------------------------------------------------------
function FormBlock({ block, lang }: { block: Block; lang: Language }) {
  const fields: any[] = (block.fields || []).filter((f: any) => !f._hidden);
  const [values, setValues] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const set = (key: string, v: string) => setValues((prev) => ({ ...prev, [key]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    // Required validation
    for (const f of fields) {
      if (f.required && !(values[f.key] || '').trim()) {
        setError(lang === 'ar' ? 'يرجى تعبئة جميع الحقول المطلوبة' : 'Please fill all required fields');
        return;
      }
    }
    setSending(true);
    // Build a labelled payload so the dashboard shows readable field names
    const payload: Record<string, string> = {};
    for (const f of fields) {
      const label = pick(f, 'label', 'ar') || f.key;
      payload[label] = values[f.key] || '';
    }
    const ok = await submitForm(block.submitType || 'registration', payload);
    setSending(false);
    if (ok) {
      setDone(true);
      setValues({});
    } else {
      setError(lang === 'ar' ? 'تعذّر الإرسال، حاول مرة أخرى' : 'Submission failed, try again');
    }
  };

  if (done) {
    return (
      <div className="relative bg-white/95 backdrop-blur-xl border border-emerald-200 rounded-3xl p-10 text-center space-y-4 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />
        <CheckCircle2 className="relative z-10 h-16 w-16 text-emerald-500 mx-auto animate-in zoom-in duration-500" />
        <p className="relative z-10 text-xl font-extrabold text-emerald-800">
          {pick(block, 'success', lang) || (lang === 'ar' ? 'تم استلام طلبك بنجاح! سنتواصل معك قريباً.' : 'Your request was received! We will contact you soon.')}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="relative bg-white/90 backdrop-blur-xl rounded-3xl border border-brand-gold/30 shadow-[0_10px_40px_rgb(0,0,0,0.06)] p-8 sm:p-12 space-y-8 overflow-hidden text-right rtl:text-right z-0">
      {/* Decorative Background Blobs */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none -z-10 translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none -z-10 -translate-x-1/3 translate-y-1/3" />

      {pick(block, 'title', lang) && (
        <div className="text-center space-y-3 relative z-10">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-blue-dark to-brand-gold-dark">
            {pick(block, 'title', lang)}
          </h3>
          <div className="h-1.5 w-24 bg-gradient-to-r from-brand-gold to-brand-gold-light mx-auto rounded-full shadow-sm" />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6 relative z-10">
        {fields.map((f, i) => {
          const label = pick(f, 'label', lang) || f.key;
          const common = 'w-full px-5 py-3.5 border border-slate-200/80 rounded-xl text-sm font-medium text-slate-800 bg-slate-50/50 hover:bg-white focus:bg-white focus:outline-none focus:border-brand-gold focus:ring-4 focus:ring-brand-gold/15 transition-all duration-300 placeholder-slate-400';
          const full = f.type === 'textarea' ? 'sm:col-span-2' : '';
          return (
            <div key={i} className={`space-y-1.5 ${full} group`}>
              <label className="block text-sm font-bold text-brand-blue-dark/90 group-focus-within:text-brand-gold transition-colors">
                {label} {f.required && <span className="text-red-500">*</span>}
              </label>
              {f.type === 'textarea' ? (
                <textarea value={values[f.key] || ''} onChange={(e) => set(f.key, e.target.value)} rows={4} className={common + ' resize-y'} placeholder={lang === 'ar' ? 'اكتب هنا...' : 'Type here...'} />
              ) : f.type === 'select' ? (
                <div className="relative">
                  <select value={values[f.key] || ''} onChange={(e) => set(f.key, e.target.value)} className={common + ' appearance-none'}>
                    <option value="">—</option>
                    {(f.options || '').split(',').map((o: string, oi: number) => (
                      <option key={oi} value={o.trim()}>{o.trim()}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 flex items-center pointer-events-none ltr:right-4 rtl:left-4">
                    <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              ) : (
                <input
                  type={f.type === 'email' ? 'email' : f.type === 'tel' ? 'tel' : 'text'}
                  value={values[f.key] || ''}
                  onChange={(e) => set(f.key, e.target.value)}
                  dir={f.type === 'tel' || f.type === 'email' ? 'ltr' : undefined}
                  className={common}
                  placeholder={f.type === 'email' ? 'example@mail.com' : f.type === 'tel' ? '+60 12-345 6789' : undefined}
                />
              )}
            </div>
          );
        })}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm font-bold text-center animate-in shake">
          {error}
        </div>
      )}

      <div className="pt-4 relative z-10">
        <button
          type="submit"
          disabled={sending}
          className="relative w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-blue-dark to-brand-blue text-white font-bold py-4 rounded-xl shadow-[0_8px_20px_rgba(22,41,68,0.2)] hover:shadow-[0_8px_25px_rgba(212,175,55,0.4)] hover:-translate-y-1 transition-all duration-300 disabled:opacity-70 disabled:hover:translate-y-0 group overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-brand-gold to-brand-gold-light opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <span className="relative z-10 flex items-center gap-2 text-base">
            {sending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5 group-hover:translate-x-1 ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />}
            {pick(block, 'submitLabel', lang) || (lang === 'ar' ? 'تأكيد وإرسال الطلب' : lang === 'ms' ? 'Hantar Borang' : 'Submit Application')}
          </span>
        </button>
      </div>
    </form>
  );
}
