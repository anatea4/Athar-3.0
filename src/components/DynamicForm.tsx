'use client';
import React, { useState } from 'react';
import { Language } from '@/types';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';
import { submitForm } from '@/lib/submit-form';

export interface FormField {
  key: string;
  labelAr: string;
  labelEn?: string;
  labelMs?: string;
  type: 'text' | 'tel' | 'email' | 'textarea' | 'select' | 'number';
  required?: boolean;
  options?: string;
  _hidden?: boolean;
}

export interface FormDef {
  id: string;
  section?: string;
  order?: number;
  titleAr: string;
  titleEn?: string;
  titleMs?: string;
  descAr?: string;
  descEn?: string;
  descMs?: string;
  headerImage?: string;
  submitType: string;
  submitLabelAr?: string;
  submitLabelEn?: string;
  submitLabelMs?: string;
  successAr?: string;
  successEn?: string;
  successMs?: string;
  fields: FormField[];
  _hidden?: boolean;
}

const pick = (obj: any, base: string, lang: Language): string => {
  if (!obj) return '';
  if (lang === 'ms') return obj[`${base}Ms`] || obj[`${base}En`] || obj[`${base}Ar`] || '';
  if (lang === 'en') return obj[`${base}En`] || obj[`${base}Ar`] || '';
  return obj[`${base}Ar`] || obj[`${base}En`] || '';
};

export default function DynamicForm({ form, lang }: { form: FormDef; lang: Language }) {
  const fields = (form.fields || []).filter((f) => !f._hidden);
  const [values, setValues] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const set = (key: string, v: string) => setValues((prev) => ({ ...prev, [key]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    for (const f of fields) {
      if (f.required && !(values[f.key] || '').trim()) {
        setError(lang === 'ar' ? 'يرجى تعبئة جميع الحقول المطلوبة' : 'Please fill all required fields');
        return;
      }
    }
    setSending(true);
    const payload: Record<string, string> = { 'النموذج': pick(form, 'title', 'ar') };
    for (const f of fields) {
      const label = pick(f, 'label', 'ar') || f.key;
      payload[label] = values[f.key] || '';
    }
    const ok = await submitForm(form.submitType || 'registration', payload);
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
          {pick(form, 'success', lang) || (lang === 'ar' ? 'تم استلام طلبك بنجاح! سنتواصل معك قريباً.' : 'Received! We will contact you soon.')}
        </p>
        <button onClick={() => setDone(false)} className="text-xs text-emerald-700 underline">
          {lang === 'ar' ? 'إرسال طلب آخر' : 'Submit another'}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {form.headerImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={form.headerImage} alt={pick(form, 'title', lang)} className="w-full h-44 object-cover rounded-2xl border border-brand-gold/15" />
      )}
      <div className="text-center space-y-2">
        <h3 className="text-xl sm:text-2xl font-bold text-brand-blue-dark">{pick(form, 'title', lang)}</h3>
        {pick(form, 'desc', lang) && (
          <p className="text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">{pick(form, 'desc', lang)}</p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 text-right rtl:text-right">
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
                    {(f.options || '').split(',').map((o, oi) => (
                      <option key={oi} value={o.trim()}>{o.trim()}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={f.type === 'email' ? 'email' : f.type === 'tel' ? 'tel' : f.type === 'number' ? 'number' : 'text'}
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
          {pick(form, 'submitLabel', lang) || (lang === 'ar' ? 'إرسال الطلب' : lang === 'ms' ? 'Hantar' : 'Submit')}
        </button>
      </form>
    </div>
  );
}
