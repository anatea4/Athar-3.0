'use client';
import React, { useState, useEffect } from 'react';
import { Language } from '@/types';
import { useForms } from '@/lib/content-provider';
import DynamicForm, { FormDef } from '@/components/DynamicForm';
import FeeCalculator from '@/components/FeeCalculator';
import DonationPage from '@/components/DonationPage';
import VolunteerPage from '@/components/VolunteerPage';
import { Calculator } from 'lucide-react';

interface FormsSectionProps {
  currentLang: Language;
  sectionKey: string;          // 'admission' | 'support' | 'finance'
  activeSub?: string;
  headingAr: string;
  headingEn: string;
  headingMs: string;
  subAr?: string;
  subEn?: string;
  subMs?: string;
  includeCalculator?: boolean;  // finance section adds a Fee Calculator tab
  onNavigate?: (section: string, sub: string) => void;
}

const t = (lang: Language, ar: string, en: string, ms?: string) =>
  lang === 'ms' ? ms || en : lang === 'en' ? en : ar;

const formLabel = (f: FormDef, lang: Language) =>
  lang === 'ms' ? f.titleMs || f.titleEn || f.titleAr : lang === 'en' ? f.titleEn || f.titleAr : f.titleAr;

export default function FormsSection({
  currentLang, sectionKey, activeSub,
  headingAr, headingEn, headingMs, subAr, subEn, subMs, includeCalculator, onNavigate,
}: FormsSectionProps) {
  const allForms = useForms() as FormDef[];
  const forms = (allForms || [])
    .filter((f) => f.section === sectionKey && !f._hidden)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  // Build tab list (forms + optional calculator)
  const tabs: { id: string; label: string }[] = forms.map((f) => ({ id: f.id, label: formLabel(f, currentLang) }));
  if (includeCalculator) tabs.push({ id: 'calculator', label: t(currentLang, 'حاسبة الرسوم', 'Fee Calculator', 'Kalkulator Yuran') });

  const [activeTab, setActiveTab] = useState(activeSub || tabs[0]?.id || '');
  useEffect(() => {
    if (activeSub) setActiveTab(activeSub);
  }, [activeSub]);

  const activeForm = forms.find((f) => f.id === activeTab);

  return (
    <section className="relative bg-brand-sand py-16 overflow-hidden min-h-[70vh]">
      <div className="absolute inset-0 islamic-pattern opacity-10 pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className={`relative mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-500 ${(activeTab === 'donate' || activeTab === 'volunteer') ? 'max-w-7xl' : 'max-w-5xl'}`}>
        {/* Heading (hidden for donate and volunteer tabs to prevent duplicate headers) */}
        {activeTab !== 'donate' && activeTab !== 'volunteer' && (
          <div className="text-center max-w-3xl mx-auto mb-10 animate-in fade-in duration-300">
            <span className="text-xs uppercase tracking-widest font-bold text-brand-gold">
              {t(currentLang, 'أكاديمية أثر', 'Athar Academy', 'Akademi Athar')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-blue-dark mt-2 font-serif">
              {t(currentLang, headingAr, headingEn, headingMs)}
            </h2>
            {(subAr || subEn) && (
              <p className="text-slate-500 font-sans text-xs sm:text-sm mt-3 leading-relaxed">
                {t(currentLang, subAr || '', subEn || '', subMs)}
              </p>
            )}
          </div>
        )}

        {/* Tab pills */}
        {tabs.length > 1 && (
          <div className="flex flex-row lg:flex-wrap items-center justify-start lg:justify-center gap-2 mb-8 overflow-x-auto pb-3 lg:pb-0 scrollbar-none w-full">
            {tabs.map((tab) => {
              const selected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => (onNavigate ? onNavigate(sectionKey, tab.id) : setActiveTab(tab.id))}
                  className={`flex items-center gap-2 px-5 py-3 text-xs font-bold rounded-full border transition-all duration-300 w-max shrink-0 cursor-pointer ${
                    selected
                      ? 'bg-brand-blue-dark border-brand-gold text-brand-gold shadow-md'
                      : 'bg-white border-brand-gold/15 text-slate-600 hover:border-brand-gold/30 hover:text-brand-blue-dark'
                  }`}
                >
                  {tab.id === 'calculator' && <Calculator className="h-4 w-4" />}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Content card */}
        {activeTab === 'calculator' ? (
          <div className="-mx-4 sm:-mx-6 lg:-mx-8 animate-in fade-in duration-300">
            <FeeCalculator currentLang={currentLang} />
          </div>
        ) : activeTab === 'donate' ? (
          <div className="animate-in fade-in duration-300">
            <DonationPage currentLang={currentLang} form={activeForm} />
          </div>
        ) : activeTab === 'volunteer' ? (
          <div className="animate-in fade-in duration-300">
            <VolunteerPage currentLang={currentLang} form={activeForm} />
          </div>
        ) : activeForm ? (
          <div className="animate-in fade-in duration-300">
            <DynamicForm form={activeForm} lang={currentLang} />
          </div>
        ) : (
          <div className="bg-white border border-brand-gold/15 rounded-3xl p-10 text-center text-slate-400">
            {t(currentLang, 'لا توجد نماذج في هذا القسم بعد.', 'No forms in this section yet.')}
          </div>
        )}
      </div>
    </section>
  );
}

