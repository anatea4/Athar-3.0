'use client';
import React, { useEffect, useState } from 'react';
import { Language } from '@/types';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingChatbot from '@/components/FloatingChatbot';
import WhatsAppButton from '@/components/WhatsAppButton';
import SmartImg from '@/components/SmartImg';
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
            <SmartImg src={block.image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
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
                <SmartImg src={card.image} alt="" className="w-full h-40 object-cover" />
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
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-3">
        <CheckCircle2 className="h-12 w-12 text-emerald-500 mx-auto" />
        <p className="text-lg font-bold text-emerald-800">
          {pick(block, 'success', lang) || (lang === 'ar' ? 'تم استلام طلبك بنجاح! سنتواصل معك قريباً.' : 'Your request was received! We will contact you soon.')}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-brand-gold/20 shadow-sm p-6 sm:p-8 space-y-5 text-right rtl:text-right">
      {pick(block, 'title', lang) && (
        <h3 className="text-xl font-bold text-brand-blue-dark text-center">{pick(block, 'title', lang)}</h3>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map((f, i) => {
          const label = pick(f, 'label', lang) || f.key;
          const common = 'w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-gold bg-slate-50/50 focus:bg-white transition';
          const full = f.type === 'textarea' ? 'sm:col-span-2' : '';
          return (
            <div key={i} className={`space-y-1 ${full}`}>
              <label className="block text-sm font-semibold text-slate-700">
                {label} {f.required && <span className="text-red-500">*</span>}
              </label>
              {f.type === 'textarea' ? (
                <textarea value={values[f.key] || ''} onChange={(e) => set(f.key, e.target.value)} rows={3} className={common + ' resize-y'} />
              ) : f.type === 'select' ? (
                <select value={values[f.key] || ''} onChange={(e) => set(f.key, e.target.value)} className={common}>
                  <option value="">—</option>
                  {(f.options || '').split(',').map((o: string, oi: number) => (
                    <option key={oi} value={o.trim()}>{o.trim()}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={f.type === 'email' ? 'email' : f.type === 'tel' ? 'tel' : 'text'}
                  value={values[f.key] || ''}
                  onChange={(e) => set(f.key, e.target.value)}
                  dir={f.type === 'tel' || f.type === 'email' ? 'ltr' : undefined}
                  className={common}
                />
              )}
            </div>
          );
        })}
      </div>
      {error && <p className="text-sm text-red-600 text-center">{error}</p>}
      <button
        type="submit"
        disabled={sending}
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-blue to-brand-blue-light hover:from-brand-blue-light hover:to-brand-blue text-white font-bold py-3.5 rounded-full shadow-lg transition-all disabled:opacity-60"
      >
        {sending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
        {pick(block, 'submitLabel', lang) || (lang === 'ar' ? 'إرسال الطلب' : lang === 'ms' ? 'Hantar' : 'Submit')}
      </button>
    </form>
  );
}
