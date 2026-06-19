'use client';
import React, { useEffect } from 'react';
import { Sparkles, Calendar, Gift, Heart, ArrowRight } from 'lucide-react';
import { Language, getLangField } from '@/types';
import { useInitiatives, useEvents, useCalendar } from '@/lib/content-provider';
import SmartImg from '@/components/SmartImg';

interface InitiativesSectionProps {
  currentLang: Language;
  activeSub?: string;
  onNavigate?: (section: string, sub: string) => void;
}

export default function InitiativesSection({ currentLang, activeSub, onNavigate }: InitiativesSectionProps) {
  const INITIATIVES_LIST = useInitiatives();
  const EVENTS_LIST = useEvents() as any[];
  const CALENDAR = useCalendar() as any;
  const [activeTab, setActiveTab] = React.useState(activeSub || 'annual-calendar');

  useEffect(() => {
    if (activeSub) {
      if (activeSub === 'initiatives-list') setActiveTab('initiatives-list');
      else if (activeSub === 'events-list') setActiveTab('events-list');
      else if (activeSub === 'annual-calendar') setActiveTab('annual-calendar');
    }
  }, [activeSub]);

  // Order: Annual Calendar → Active Events → Initiatives & Grants
  const tabs = [
    { id: 'annual-calendar', labelAr: 'التقويم السنوي', labelEn: 'Annual Calendar', labelMs: 'Kalendar Tahunan' },
    { id: 'events-list', labelAr: 'الفعاليات الحالية', labelEn: 'Active Events', labelMs: 'Acara Aktif' },
    { id: 'initiatives-list', labelAr: 'المبادرات والمساعدات', labelEn: 'Initiatives & Grants', labelMs: 'Inisiatif & Bantuan' },
  ];

  const calendarEvents = (CALENDAR?.events || []) as any[];

  return (
    <section className="relative bg-brand-sand py-16 overflow-hidden min-h-[70vh]">
      <div className="absolute inset-0 islamic-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest font-bold text-brand-gold">
            {currentLang === 'ms' ? 'Kesan Sosial & Aktivisme' : currentLang === 'en' ? 'Social Impact & Activism' : 'المبادرات والفعاليات والأثر'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-blue-dark mt-2">
            {currentLang === 'ms' ? 'Inisiatif Komuniti Kami' : currentLang === 'en' ? 'Our Community Initiatives' : 'مبادراتنا وفعالياتنا المجتمعية'}
          </h2>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center gap-2 mb-10 overflow-x-auto pb-4 scrollbar-none w-full">
          {tabs.map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => (onNavigate ? onNavigate('media', tab.id) : setActiveTab(tab.id))}
                className={`px-5 py-3 rounded-full text-xs sm:text-sm font-bold border transition-all duration-300 w-max shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-brand-blue-dark border-brand-gold text-brand-gold shadow-md'
                    : 'bg-white border-brand-gold/10 text-slate-600 hover:border-brand-gold/30 hover:text-brand-blue-dark'
                }`}
              >
                {currentLang === 'ms' ? tab.labelMs : currentLang === 'en' ? tab.labelEn : tab.labelAr}
              </button>
            );
          })}
        </div>

        {/* View Box */}
        <div className="bg-white border border-brand-gold/15 rounded-3xl p-6 sm:p-10 shadow-sm min-h-[400px]">

          {/* INITIATIVES */}
          {activeTab === 'initiatives-list' && (
            <div className="space-y-6 animate-in fade-in duration-500 text-right rtl:text-right ltr:text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-brand-blue-dark flex items-center gap-2 border-b border-brand-gold/15 pb-4">
                <Gift className="h-6 w-6 text-brand-gold" />
                <span>{currentLang === 'ms' ? 'Geran & Bantuan Komuniti' : currentLang === 'en' ? 'Community Grants & Aids' : 'مبادرات الدعم والمنح التعليمية'}</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {INITIATIVES_LIST.filter((x: any) => !x._hidden).map((init) => (
                  <div key={init.id} className="p-6 bg-gradient-to-tr from-brand-sand via-white to-white border-2 border-brand-gold/15 hover:border-brand-gold/45 rounded-2xl shadow-sm transition-all duration-300 flex items-start gap-4">
                    <div className="p-3 bg-brand-gold/10 text-brand-gold-dark rounded-xl shrink-0">
                      <Heart className="h-6 w-6" />
                    </div>
                    <div className="space-y-2 text-right rtl:text-right ltr:text-left">
                      <h4 className="text-base font-bold text-brand-blue-dark">
                        {getLangField(init, 'title', currentLang)}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-500 font-sans leading-relaxed">
                        {getLangField(init, 'desc', currentLang)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ACTIVE EVENTS */}
          {activeTab === 'events-list' && (
            <div className="space-y-6 animate-in fade-in duration-500 text-right rtl:text-right ltr:text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-brand-blue-dark flex items-center gap-2 border-b border-brand-gold/15 pb-4">
                <Sparkles className="h-6 w-6 text-brand-gold" />
                <span>{currentLang === 'ms' ? 'Acara Semasa & Akan Datang' : currentLang === 'en' ? 'Current & Upcoming Events' : 'الفعاليات والملتقيات الحالية'}</span>
              </h3>

              {EVENTS_LIST.length === 0 ? (
                <p className="text-sm text-slate-400 font-sans py-10 text-center">
                  {currentLang === 'ms' ? 'Tiada acara buat masa ini.' : currentLang === 'en' ? 'No events at the moment.' : 'لا توجد فعاليات حالياً.'}
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  {EVENTS_LIST.filter((x: any) => !x._hidden).map((ev, i) => {
                    const badge = getLangField(ev, 'badge', currentLang) as string;
                    const img = (ev.image || '').toString();
                    return (
                      <div key={ev.id || i} className="bg-white border border-brand-gold/15 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
                        {img && (
                          <div className="h-44 overflow-hidden relative">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <SmartImg src={img} alt={getLangField(ev, 'title', currentLang) as string} loading="lazy" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                            {badge && (
                              <span className="absolute bottom-3 right-3 bg-brand-gold text-brand-blue-dark text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                                {badge}
                              </span>
                            )}
                          </div>
                        )}
                        <div className="p-5 space-y-2">
                          <h4 className="text-base font-bold text-brand-blue-dark">
                            {getLangField(ev, 'title', currentLang)}
                          </h4>
                          <p className="text-xs text-slate-500 font-sans leading-relaxed">
                            {getLangField(ev, 'desc', currentLang)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ANNUAL CALENDAR */}
          {activeTab === 'annual-calendar' && (
            <div className="space-y-6 animate-in fade-in duration-500 text-right rtl:text-right ltr:text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-brand-blue-dark flex items-center gap-2 border-b border-brand-gold/15 pb-4">
                <Calendar className="h-6 w-6 text-brand-gold" />
                <span>{currentLang === 'ms' ? 'Kalendar Akademik Tahunan' : currentLang === 'en' ? 'Annual Academic Calendar' : 'التقويم الأكاديمي السنوي'}</span>
              </h3>

              {(getLangField(CALENDAR, 'desc', currentLang) as string) && (
                <p className="text-sm text-slate-500 font-sans leading-relaxed">
                  {getLangField(CALENDAR, 'desc', currentLang)}
                </p>
              )}
              {CALENDAR?.image && (
                <div className="overflow-hidden rounded-2xl border border-brand-gold/15 shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <SmartImg src={CALENDAR.image} alt={getLangField(CALENDAR, 'title', currentLang) as string} loading="lazy" referrerPolicy="no-referrer" className="w-full object-cover max-h-[420px]" />
                </div>
              )}

              {calendarEvents.length === 0 ? (
                <p className="text-sm text-slate-400 font-sans py-10 text-center">
                  {currentLang === 'ms' ? 'Tiada tarikh dalam kalendar lagi.' : currentLang === 'en' ? 'No calendar entries yet.' : 'لا توجد مواعيد في التقويم بعد — أضِفها من لوحة التحكم.'}
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
                  {calendarEvents.filter((x: any) => !x._hidden).map((item, idx) => {
                    let statusTextAr = 'قريباً';
                    let statusTextEn = 'Upcoming';
                    let statusTextMs = 'Akan Datang';
                    let statusColor = 'bg-slate-50 text-slate-500 border-slate-200/60';
                    if (idx === 0) {
                      statusTextAr = 'نشط حالياً'; statusTextEn = 'Active'; statusTextMs = 'Aktif';
                      statusColor = 'bg-emerald-50 text-emerald-700 border-emerald-200';
                    } else if (idx === 1) {
                      statusTextAr = 'التسجيل مفتوح'; statusTextEn = 'Open'; statusTextMs = 'Dibuka';
                      statusColor = 'bg-brand-gold/10 text-brand-gold-dark border-brand-gold/30 animate-pulse';
                    }
                    const dateText = currentLang === 'en' ? item.dateEn : currentLang === 'ms' ? (item.dateMs || item.dateEn || item.dateAr) : item.dateAr;
                    return (
                      <div
                        key={idx}
                        className="bg-white border-2 border-brand-gold/10 hover:border-brand-gold/45 rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between shadow-sm relative group hover:shadow-md"
                      >
                        <div className="space-y-4">
                          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                            <span className="text-xs font-bold text-brand-gold-dark flex items-center gap-1.5 font-sans">
                              <Calendar className="h-4 w-4" />
                              {dateText}
                            </span>
                            <span className={`text-[9px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full border ${statusColor}`}>
                              {currentLang === 'ms' ? statusTextMs : currentLang === 'en' ? statusTextEn : statusTextAr}
                            </span>
                          </div>
                          <h4 className="text-xs sm:text-sm font-bold text-brand-blue-dark leading-relaxed group-hover:text-brand-gold transition-colors">
                            {getLangField(item, 'title', currentLang)}
                          </h4>
                        </div>
                        <div className="mt-6 flex justify-end text-[10px] text-slate-400 font-sans font-semibold items-center gap-1.5 pt-3 border-t border-slate-50">
                          <span>{currentLang === 'ms' ? 'Pencapaian' : currentLang === 'en' ? 'Milestone' : 'محطة دراسية'}</span>
                          <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
