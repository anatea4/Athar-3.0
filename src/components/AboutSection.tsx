'use client';
import React, { useEffect } from 'react';
import { Target, Users, Landmark, BookOpen, Compass, Award, Quote, UserCircle2 } from 'lucide-react';
import { Language, getLangField } from '@/types';
import { useAbout, useTeam, usePartners } from '@/lib/content-provider';

interface AboutSectionProps {
  currentLang: Language;
  activeSub?: string;
}

// A logo can be either a short emoji/initials (text) or an uploaded image URL.
// Treat it as an image when it looks like a URL / path / data-URI.
function isImageSrc(v?: string): boolean {
  if (!v) return false;
  const s = v.trim();
  return (
    /^(https?:)?\/\//i.test(s) ||
    /^(data:image|blob:)/i.test(s) ||
    s.startsWith('/') ||
    /\.(png|jpe?g|gif|webp|svg|avif)(\?.*)?$/i.test(s)
  );
}

export default function AboutSection({ currentLang, activeSub }: AboutSectionProps) {
  const ACADEMY_PROFILE = useAbout();
  const TEAM_MEMBERS = useTeam();
  const PARTNERS = usePartners();
  const [activeTab, setActiveTab] = React.useState(activeSub || 'who-we-are');

  useEffect(() => {
    if (activeSub) {
      setActiveTab(activeSub);
    }
  }, [activeSub]);

  const tabs = [
    { id: 'who-we-are', labelAr: 'نبذة عن الأكاديمية', labelEn: 'About the Academy', labelMs: 'Tentang Akademi', icon: <Compass className="h-4.5 w-4.5" /> },
    { id: 'vision-mission', labelAr: 'الرؤية والرسالة', labelEn: 'Vision & Mission', labelMs: 'Visi & Misi', icon: <Target className="h-4.5 w-4.5" /> },
    { id: 'objectives', labelAr: 'أهداف الأكاديمية', labelEn: 'Our Goals', labelMs: 'Matlamat Kami', icon: <Award className="h-4.5 w-4.5" /> },
    { id: 'team', labelAr: 'فريق العمل', labelEn: 'Our Team', labelMs: 'Barisan Guru/Staf', icon: <Users className="h-4.5 w-4.5" /> },
    { id: 'director-message', labelAr: 'كلمة مدير الأكاديمية', labelEn: "Director's Message", labelMs: 'Pesanan Pengarah', icon: <Quote className="h-4.5 w-4.5" /> },
    { id: 'chairman-message', labelAr: 'كلمة رئيس مجلس الإدارة', labelEn: "Chairman's Message", labelMs: 'Pesanan Pengerusi', icon: <Quote className="h-4.5 w-4.5" /> },
    { id: 'secretary-message', labelAr: 'كلمة الأمين العام', labelEn: "Secretary-General's Message", labelMs: 'Pesanan Setiausaha', icon: <Quote className="h-4.5 w-4.5" /> },
    { id: 'partners', labelAr: 'شركاؤنا', labelEn: 'Our Partners', labelMs: 'Rakan Kerjasama', icon: <Landmark className="h-4.5 w-4.5" /> },
  ];

  // Leadership-message tabs share one layout, driven by the field prefix in ACADEMY_PROFILE
  const messageTabs: Record<string, { prefix: string; titleAr: string; titleEn: string; titleMs: string }> = {
    'director-message': { prefix: 'director', titleAr: 'كلمة مدير الأكاديمية', titleEn: "Director's Message", titleMs: 'Pesanan Pengarah' },
    'chairman-message': { prefix: 'chairman', titleAr: 'كلمة رئيس مجلس الإدارة', titleEn: "Chairman's Message", titleMs: 'Pesanan Pengerusi' },
    'secretary-message': { prefix: 'secretary', titleAr: 'كلمة الأمين العام', titleEn: "Secretary-General's Message", titleMs: 'Pesanan Setiausaha' },
  };

  const objectives = currentLang === 'ms'
    ? ACADEMY_PROFILE.objectivesMs
    : currentLang === 'en'
      ? ACADEMY_PROFILE.objectivesEn
      : ACADEMY_PROFILE.objectivesAr;

  return (
    <section className="relative bg-brand-sand py-16 overflow-hidden min-h-[70vh]">
      {/* Background Decorative patterns */}
      <div className="absolute inset-0 islamic-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest font-bold text-brand-gold">
            {currentLang === 'ms' ? 'Tentang Akademi Athar' : currentLang === 'en' ? 'About Athar Academy' : 'عن المؤسسـة'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-blue-dark mt-2">
            {currentLang === 'ms' ? 'Ketahui Lebih Lanjut Mengenai Kami' : currentLang === 'en' ? 'Learn More About Us' : 'تعرّف على أكاديمية أثر'}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Side Tabs Switcher */}
          <div className="lg:col-span-3 flex flex-row lg:flex-col gap-2.5 overflow-x-auto pb-4 lg:pb-0 scrollbar-none shrink-0 w-full">
            {tabs.map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-5 py-4 text-xs font-bold rounded-2xl border transition-all duration-300 w-max lg:w-full shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-brand-blue-dark border-brand-gold text-brand-gold shadow-lg shadow-brand-blue-dark/20 scale-[1.02]'
                      : 'bg-white border-brand-gold/15 text-slate-600 hover:border-brand-gold/40 hover:text-brand-blue-dark'
                  }`}
                >
                  <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-brand-gold text-brand-blue-dark' : 'bg-brand-gold/10 text-brand-gold-dark'}`}>
                    {tab.icon}
                  </div>
                  <span>{currentLang === 'ms' ? tab.labelMs : currentLang === 'en' ? tab.labelEn : tab.labelAr}</span>
                </button>
              );
            })}
          </div>

          {/* Sub-view Content Box */}
          <div className="lg:col-span-9 bg-white border border-brand-gold/15 rounded-3xl p-6 sm:p-10 shadow-sm relative min-h-[450px] flex flex-col justify-between">

            {/* WHO WE ARE (intro only) */}
            {activeTab === 'who-we-are' && (
              <div className="space-y-6 animate-in fade-in duration-500 text-right rtl:text-right ltr:text-left">
                <h3 className="text-xl sm:text-2xl font-bold text-brand-blue-dark flex items-center gap-2">
                  <Compass className="h-6 w-6 text-brand-gold" />
                  <span>{currentLang === 'ms' ? 'Tentang Akademi' : currentLang === 'en' ? 'About the Academy' : 'نبذة عن الأكاديمية'}</span>
                </h3>
                <p className="text-slate-600 leading-loose font-sans text-sm sm:text-base whitespace-pre-line">
                  {getLangField(ACADEMY_PROFILE, 'about', currentLang)}
                </p>
              </div>
            )}

            {/* OBJECTIVES / GOALS (own tab) */}
            {activeTab === 'objectives' && (
              <div className="space-y-6 animate-in fade-in duration-500 text-right rtl:text-right ltr:text-left">
                <h3 className="text-xl sm:text-2xl font-bold text-brand-blue-dark flex items-center gap-2">
                  <Award className="h-6 w-6 text-brand-gold" />
                  <span>{currentLang === 'ms' ? 'Matlamat Akademi' : currentLang === 'en' ? 'Our Goals' : 'أهداف الأكاديمية'}</span>
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-3 bg-brand-gold/5 border border-brand-gold/10 p-4 rounded-2xl">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-gold text-brand-blue-dark font-bold text-xs mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-xs sm:text-sm text-slate-700 font-sans leading-relaxed">
                        {obj}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* VISION & MISSION */}
            {activeTab === 'vision-mission' && (
              <div className="space-y-8 animate-in fade-in duration-500 text-right rtl:text-right ltr:text-left">
                <h3 className="text-xl sm:text-2xl font-bold text-brand-blue-dark flex items-center gap-2">
                  <Target className="h-6 w-6 text-brand-gold" />
                  <span>{currentLang === 'ms' ? 'Visi dan Misi' : currentLang === 'en' ? 'Vision and Mission' : 'الرؤية والرسالة'}</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  {/* Vision Box */}
                  <div className="bg-gradient-to-br from-brand-blue-dark to-brand-blue border border-brand-gold/25 text-white p-6 sm:p-8 rounded-3xl relative overflow-hidden shadow-md flex flex-col justify-between">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold/10 rounded-full blur-2xl pointer-events-none" />
                    <div className="space-y-4">
                      <div className="inline-flex p-3 bg-brand-gold text-brand-blue-dark rounded-2xl shadow-md">
                        <Target className="h-6 w-6" />
                      </div>
                      <h4 className="text-lg font-bold text-brand-gold-light">
                        {currentLang === 'ms' ? 'Visi Kami' : currentLang === 'en' ? 'Our Vision' : 'رؤيتـنا'}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                        {getLangField(ACADEMY_PROFILE, 'vision', currentLang)}
                      </p>
                    </div>
                  </div>

                  {/* Mission Box */}
                  <div className="bg-white border-2 border-brand-gold/20 p-6 sm:p-8 rounded-3xl relative overflow-hidden shadow-md flex flex-col justify-between">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold/5 rounded-full blur-2xl pointer-events-none" />
                    <div className="space-y-4">
                      <div className="inline-flex p-3 bg-brand-gold/10 text-brand-gold rounded-2xl">
                        <BookOpen className="h-6 w-6" />
                      </div>
                      <h4 className="text-lg font-bold text-brand-blue-dark">
                        {currentLang === 'ms' ? 'Misi Kami' : currentLang === 'en' ? 'Our Mission' : 'رسالتـنا'}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                        {getLangField(ACADEMY_PROFILE, 'mission', currentLang)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TEAM MEMBERS */}
            {activeTab === 'team' && (
              <div className="space-y-6 animate-in fade-in duration-500 text-right rtl:text-right ltr:text-left">
                <h3 className="text-xl sm:text-2xl font-bold text-brand-blue-dark flex items-center gap-2">
                  <Users className="h-6 w-6 text-brand-gold" />
                  <span>{currentLang === 'ms' ? 'Pasukan Akademik dan Pentadbiran' : currentLang === 'en' ? 'Academic and Administrative Team' : 'فريق العمل الأكاديمي والتربوي'}</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  {TEAM_MEMBERS.map((member, i) => (
                    <div key={i} className="flex gap-4 p-4 bg-brand-gold/5 border border-brand-gold/10 rounded-2xl hover:border-brand-gold/30 hover:bg-brand-gold/10 transition-all duration-300">
                      <img
                        src={member.image}
                        alt={getLangField(member, 'name', currentLang)}
                        className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl object-cover border border-brand-gold/25"
                      />
                      <div className="space-y-1 text-right rtl:text-right ltr:text-left">
                        <h4 className="text-sm sm:text-base font-bold text-brand-blue-dark">
                          {getLangField(member, 'name', currentLang)}
                        </h4>
                        <span className="text-[10px] sm:text-xs text-brand-gold-dark font-semibold block uppercase tracking-wide">
                          {getLangField(member, 'role', currentLang)}
                        </span>
                        <p className="text-[11px] sm:text-xs text-slate-500 font-sans leading-relaxed mt-1">
                          {getLangField(member, 'bio', currentLang)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PARTNERS */}
            {activeTab === 'partners' && (
              <div className="space-y-6 animate-in fade-in duration-500 text-right rtl:text-right ltr:text-left">
                <h3 className="text-xl sm:text-2xl font-bold text-brand-blue-dark flex items-center gap-2">
                  <Landmark className="h-6 w-6 text-brand-gold" />
                  <span>{currentLang === 'ms' ? 'Rakan Kerjasama Kejayaan Kami' : currentLang === 'en' ? 'Our Success Partners' : 'شركاء النجاح والأثر'}</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  {PARTNERS.map((partner, i) => (
                    <div key={i} className="p-5 bg-white border-2 border-brand-gold/10 hover:border-brand-gold/40 rounded-2xl shadow-sm transition-all duration-300 flex items-start gap-4">
                      {isImageSrc(partner.logo) ? (
                        <div className="h-14 w-14 shrink-0 rounded-xl border border-brand-gold/20 bg-white overflow-hidden flex items-center justify-center shadow-sm">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={partner.logo}
                            alt={getLangField(partner, 'name', currentLang) as string}
                            className="h-full w-full object-contain"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      ) : (
                        <div className="p-3.5 bg-brand-gold/10 text-brand-gold-dark rounded-xl font-bold text-xl shrink-0">
                          {partner.logo}
                        </div>
                      )}
                      <div className="space-y-1 text-right rtl:text-right ltr:text-left">
                        <h4 className="text-sm sm:text-base font-bold text-brand-blue-dark">
                          {getLangField(partner, 'name', currentLang)}
                        </h4>
                        <p className="text-[11px] sm:text-xs text-slate-500 font-sans leading-relaxed mt-1">
                          {getLangField(partner, 'desc', currentLang)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* LEADERSHIP MESSAGES (Director / Chairman / Secretary-General) */}
            {messageTabs[activeTab] && (() => {
              const cfg = messageTabs[activeTab];
              const title = currentLang === 'ms' ? cfg.titleMs : currentLang === 'en' ? cfg.titleEn : cfg.titleAr;
              const message = getLangField(ACADEMY_PROFILE as any, `${cfg.prefix}Message`, currentLang) as string;
              const name = getLangField(ACADEMY_PROFILE as any, `${cfg.prefix}Name`, currentLang) as string;
              const image = (ACADEMY_PROFILE as any)[`${cfg.prefix}Image`] as string;
              return (
                <div className="space-y-6 animate-in fade-in duration-500 text-right rtl:text-right ltr:text-left">
                  <h3 className="text-xl sm:text-2xl font-bold text-brand-blue-dark flex items-center gap-2">
                    <Quote className="h-6 w-6 text-brand-gold" />
                    <span>{title}</span>
                  </h3>

                  <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start bg-gradient-to-br from-brand-gold/5 to-white border border-brand-gold/15 rounded-3xl p-6 sm:p-8">
                    {/* Portrait */}
                    <div className="shrink-0">
                      {image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={image} alt={name} className="h-28 w-28 sm:h-36 sm:w-36 rounded-2xl object-cover border-2 border-brand-gold/30 shadow-md" />
                      ) : (
                        <div className="h-28 w-28 sm:h-36 sm:w-36 rounded-2xl bg-brand-blue-dark/5 border-2 border-brand-gold/20 flex items-center justify-center">
                          <UserCircle2 className="h-16 w-16 text-brand-gold/40" />
                        </div>
                      )}
                    </div>
                    {/* Message */}
                    <div className="flex-1 space-y-3">
                      <Quote className="h-8 w-8 text-brand-gold/40" />
                      <p className="text-sm sm:text-base text-slate-600 leading-loose font-sans whitespace-pre-line">
                        {message}
                      </p>
                      <div className="pt-2 border-t border-brand-gold/15">
                        <span className="text-base font-bold text-brand-blue-dark">{name}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}

          </div>

        </div>

      </div>
    </section>
  );
}
