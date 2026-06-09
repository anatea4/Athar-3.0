'use client';
import React, { useEffect } from 'react';
import { Sparkles, Calendar, Gift, Heart, ArrowRight } from 'lucide-react';
import { Language, getLangField } from '@/types';
import { INITIATIVES_LIST } from '@/data';

interface InitiativesSectionProps {
  currentLang: Language;
  activeSub?: string;
}

export default function InitiativesSection({ currentLang, activeSub }: InitiativesSectionProps) {
  const [activeTab, setActiveTab] = React.useState('initiatives-list');

  useEffect(() => {
    if (activeSub) {
      if (activeSub === 'initiatives-list') setActiveTab('initiatives-list');
      else if (activeSub === 'events-list') setActiveTab('events-list');
      else if (activeSub === 'annual-calendar') setActiveTab('annual-calendar');
    }
  }, [activeSub]);

  const tabs = [
    { id: 'initiatives-list', labelAr: 'المبادرات والمساعدات', labelEn: 'Initiatives & Grants', labelMs: 'Inisiatif & Bantuan' },
    { id: 'events-list', labelAr: 'الفعاليات الحالية', labelEn: 'Active Events', labelMs: 'Acara Aktif' },
    { id: 'annual-calendar', labelAr: 'التقويم السنوي', labelEn: 'Annual Calendar', labelMs: 'Kalendar Tahunan' },
  ];

  // Calendar dates
  const calendarDates = [
    { dateAr: '15 أغسطس 2026', dateEn: 'Aug 15, 2026', dateMs: '15 Ogos 2026', titleAr: 'انطلاق الفصل الدراسي الأول وتسجيل الحلقات', titleEn: 'First Semester Begins & Circle Registration', titleMs: 'Permulaan Semester Pertama & Pendaftaran Halaqah' },
    { dateAr: '10 سبتمبر 2026', dateEn: 'Sep 10, 2026', dateMs: '10 Sept 2026', titleAr: 'مقابلات تقييم الحفاظ الجدد والفرز الأكاديمي', titleEn: 'Assessment Interviews for New Memorizers', titleMs: 'Temu Duga Penilaian Penghafal Baru & Saringan Akademik' },
    { dateAr: '01 نوفمبر 2026', dateEn: 'Nov 01, 2026', dateMs: '01 Nov 2026', titleAr: 'بدء برنامج مع السفرة لسرد المحفوظ', titleEn: 'Launch of "With the Scribes" Quran Recital', titleMs: 'Pelancaran Bacaan Al-Quran "Bersama Para Malaikat"' },
    { dateAr: '25 ديسمبر 2026', dateEn: 'Dec 25, 2026', dateMs: '25 Dis 2026', titleAr: 'حفل التخريم النصف سنوي وتكريم الطلبة المتميزين', titleEn: 'Mid-term Graduation & Award Ceremony', titleMs: 'Graduasi Pertengahan Penggal & Majlis Anugerah' },
    { dateAr: '05 مارس 2027', dateEn: 'Mar 05, 2027', dateMs: '05 Mac 2027', titleAr: 'انطلاق المعتكف الرمضاني العلمي المكثف', titleEn: 'Ramadan Intensive Spiritual Retreat', titleMs: 'Permulaan Rehlah Ruhiyyah Intensif Ramadan' },
    { dateAr: '01 يوليو 2027', dateEn: 'Jul 01, 2027', dateMs: '01 Jul 2027', titleAr: 'انطلاق مخيمات صناع الغد وسفيرات الأثر الصيفية', titleEn: 'Creators of Tomorrow & Ambassadors Camps', titleMs: 'Permulaan Kem Musim Panas "Pencipta Masa Depan" & "Duta Athar"' }
  ];

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
                onClick={() => setActiveTab(tab.id)}
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
                {INITIATIVES_LIST.map((init) => (
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {/* Event 1 */}
                <div className="bg-white border border-brand-gold/15 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
                  <div className="h-44 overflow-hidden relative">
                    <img
                      src="https://images.unsplash.com/photo-1590076215667-87373f82cb38?auto=format&fit=crop&q=80&w=600"
                      alt="Event"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <span className="absolute bottom-3 right-3 bg-brand-gold text-brand-blue-dark text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                      {currentLang === 'ms' ? 'Pertemuan Ruhiyyah' : currentLang === 'en' ? 'Spiritual Meeting' : 'ملتقى إيماني'}
                    </span>
                  </div>
                  <div className="p-5 space-y-2">
                    <h4 className="text-base font-bold text-brand-blue-dark">
                      {currentLang === 'ms' ? 'Halaqah Intensif Rehlah Ramadan' : currentLang === 'en' ? 'Annual Ramadan Quran Retreat' : 'الملتقى السنوي للمعتكف الرمضاني'}
                    </h4>
                    <p className="text-xs text-slate-500 font-sans leading-relaxed">
                      {currentLang === 'ms'
                        ? 'Menghimpunkan pelajar dan sheikh pada sepuluh malam terakhir Ramadan untuk mengulang, bertadabbur, dan solat bersama.'
                        : currentLang === 'en'
                        ? 'Gathering students and sheikhs in the last ten days of Ramadan to review, contemplate, and pray together.'
                        : 'ملتقى مبارك يعقد في العشر الأواخر من الشهر الفضيل للمراجعة المكثفة لطلبة الحلقات والمجازين.'}
                    </p>
                  </div>
                </div>

                {/* Event 2 */}
                <div className="bg-white border border-brand-gold/15 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
                  <div className="h-44 overflow-hidden relative">
                    <img
                      src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=600"
                      alt="Event"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <span className="absolute bottom-3 right-3 bg-brand-gold text-brand-blue-dark text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                      {currentLang === 'ms' ? 'Graduasi' : currentLang === 'en' ? 'Graduation' : 'حفل تخريج'}
                    </span>
                  </div>
                  <div className="p-5 space-y-2">
                    <h4 className="text-base font-bold text-brand-blue-dark">
                      {currentLang === 'ms' ? 'Majlis Graduasi Penerima Sanad' : currentLang === 'en' ? 'Connected Sanad Graduates Ceremony' : 'حفل تكريم حفاظ السند المتصل'}
                    </h4>
                    <p className="text-xs text-slate-500 font-sans leading-relaxed">
                      {currentLang === 'ms'
                        ? 'Merai dan memberi penghargaan kepada pelajar yang telah berjaya menghafal dan memperdengarkan keseluruhan Al-Quran dalam pelbagai riwayat.'
                        : currentLang === 'en'
                        ? 'Honoring students who successfully completed and recited the entire Quran in different narrations.'
                        : 'احتفال مهيب لتكريم الطلبة الذين أتموا قراءة القرآن غيباً بالإسناد المتصل إلى رسول الله ﷺ.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ANNUAL CALENDAR */}
          {activeTab === 'annual-calendar' && (
            <div className="space-y-6 animate-in fade-in duration-500 text-right rtl:text-right ltr:text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-brand-blue-dark flex items-center gap-2 border-b border-brand-gold/15 pb-4">
                <Calendar className="h-6 w-6 text-brand-gold" />
                <span>{currentLang === 'ms' ? 'Kalendar Akademik Tahunan' : currentLang === 'en' ? 'Annual Academic Calendar' : 'التقويم الأكاديمي السنوي'}</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
                {calendarDates.map((item, idx) => {
                  let statusTextAr = 'قريباً';
                  let statusTextEn = 'Upcoming';
                  let statusTextMs = 'Akan Datang';
                  let statusColor = 'bg-slate-50 text-slate-500 border-slate-200/60';

                  if (idx === 0) {
                    statusTextAr = 'نشط حالياً';
                    statusTextEn = 'Active';
                    statusTextMs = 'Aktif';
                    statusColor = 'bg-emerald-50 text-emerald-700 border-emerald-200';
                  } else if (idx === 1) {
                    statusTextAr = 'التسجيل مفتوح';
                    statusTextEn = 'Open';
                    statusTextMs = 'Dibuka';
                    statusColor = 'bg-brand-gold/10 text-brand-gold-dark border-brand-gold/30 animate-pulse';
                  }

                  return (
                    <div
                      key={idx}
                      className="bg-white border-2 border-brand-gold/10 hover:border-brand-gold/45 rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between shadow-sm relative group hover:shadow-md"
                    >
                      <div className="space-y-4">
                        {/* Header card indicator */}
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                          <span className="text-xs font-bold text-brand-gold-dark flex items-center gap-1.5 font-sans">
                            <Calendar className="h-4 w-4" />
                            {currentLang === 'ms' ? item.dateMs : currentLang === 'en' ? item.dateEn : item.dateAr}
                          </span>
                          <span className={`text-[9px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full border ${statusColor}`}>
                            {currentLang === 'ms' ? statusTextMs : currentLang === 'en' ? statusTextEn : statusTextAr}
                          </span>
                        </div>

                        {/* Title text */}
                        <h4 className="text-xs sm:text-sm font-bold text-brand-blue-dark leading-relaxed group-hover:text-brand-gold transition-colors">
                          {currentLang === 'ms' ? item.titleMs : currentLang === 'en' ? item.titleEn : item.titleAr}
                        </h4>
                      </div>

                      {/* Footer card indicator */}
                      <div className="mt-6 flex justify-end text-[10px] text-slate-400 font-sans font-semibold items-center gap-1.5 pt-3 border-t border-slate-50">
                        <span>{currentLang === 'ms' ? 'Pencapaian' : currentLang === 'en' ? 'Milestone' : 'محطة دراسية'}</span>
                        <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
