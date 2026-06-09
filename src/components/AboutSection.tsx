'use client';
import React, { useEffect } from 'react';
import { Target, Users, Landmark, BookOpen, Compass, Award } from 'lucide-react';
import { Language, getLangField } from '@/types';
import { ACADEMY_PROFILE, TEAM_MEMBERS, PARTNERS } from '@/data';

interface AboutSectionProps {
  currentLang: Language;
  activeSub?: string;
}

export default function AboutSection({ currentLang, activeSub }: AboutSectionProps) {
  const [activeTab, setActiveTab] = React.useState('who-we-are');

  useEffect(() => {
    if (activeSub) {
      setActiveTab(activeSub);
    }
  }, [activeSub]);

  const tabs = [
    { id: 'who-we-are', labelAr: 'من نحن', labelEn: 'Who We Are', labelMs: 'Siapa Kami', icon: <Compass className="h-4.5 w-4.5" /> },
    { id: 'vision-mission', labelAr: 'الرؤية والرسالة', labelEn: 'Vision & Mission', labelMs: 'Visi & Misi', icon: <Target className="h-4.5 w-4.5" /> },
    { id: 'team', labelAr: 'فريق العمل', labelEn: 'Our Team', labelMs: 'Barisan Guru/Staf', icon: <Users className="h-4.5 w-4.5" /> },
    { id: 'partners', labelAr: 'شركاؤنا', labelEn: 'Our Partners', labelMs: 'Rakan Kerjasama', icon: <Landmark className="h-4.5 w-4.5" /> },
  ];

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

            {/* WHOW WE ARE */}
            {activeTab === 'who-we-are' && (
              <div className="space-y-8 animate-in fade-in duration-500 text-right rtl:text-right ltr:text-left">
                <div className="space-y-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-brand-blue-dark flex items-center gap-2">
                    <Compass className="h-6 w-6 text-brand-gold" />
                    <span>{currentLang === 'ms' ? 'Siapa Kami' : currentLang === 'en' ? 'Who We Are' : 'من نحن؟'}</span>
                  </h3>
                  <p className="text-slate-600 leading-relaxed font-sans text-sm sm:text-base">
                    {getLangField(ACADEMY_PROFILE, 'about', currentLang)}
                  </p>
                </div>

                <div className="border-t border-brand-gold/15 pt-6 space-y-5">
                  <h4 className="text-base font-bold text-brand-blue-dark flex items-center gap-2">
                    <Award className="h-5 w-5 text-brand-gold" />
                    <span>{currentLang === 'ms' ? 'Matlamat Strategik Kami' : currentLang === 'en' ? 'Our Strategic Goals' : 'أهدافنا الإستراتيجية'}</span>
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {objectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-3 bg-brand-gold/5 border border-brand-gold/10 p-4 rounded-2xl">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-gold text-brand-blue-dark font-bold text-xs mt-0.5">
                          {i + 1}
                        </span>
                        <span className="text-xs sm:text-sm text-slate-700 font-sans leading-relaxed">
                          {obj}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
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
                      <div className="p-3.5 bg-brand-gold/10 text-brand-gold-dark rounded-xl font-bold text-xl">
                        {partner.logo}
                      </div>
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

          </div>

        </div>

      </div>
    </section>
  );
}
