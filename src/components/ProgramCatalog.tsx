'use client';
import React, { useState, useEffect } from 'react';
import {
  BookOpen, Users, Clock, Award, Landmark, Sparkles, CheckCircle2,
  HelpCircle, Compass, ShieldCheck, HeartHandshake, PhoneCall, Calculator, Ticket
} from 'lucide-react';
import { Language, getLangField } from '@/types';
import { DETAILED_PROGRAMS, ACADEMY_STATS, PROGRAMS, CONTACT_DETAILS } from '@/data';

interface ProgramCatalogProps {
  currentLang: Language;
  activeSub?: string;
  onSelectProgram?: (id: string) => void;
}

export default function ProgramCatalog({ currentLang, activeSub, onSelectProgram }: ProgramCatalogProps) {
  const [activeTab, setActiveTab] = useState('quran-circles');



  useEffect(() => {
    if (activeSub) {
      // Map activeSub navigation keys to actual tab IDs
      if (activeSub === 'quran-circles') setActiveTab('quran-circles');
      else if (activeSub === 'quran-sard') setActiveTab('quran-sard');
      else if (activeSub === 'quran-ijazah') setActiveTab('quran-ijazah');
      else if (activeSub === 'distance-learning') setActiveTab('distance-learning');
      else if (activeSub === 'training-courses') setActiveTab('training-courses');
      else if (activeSub === 'educational-camps') setActiveTab('educational-camps');
      else if (activeSub === 'creators-of-tomorrow') setActiveTab('creators-of-tomorrow');
    }
  }, [activeSub]);

  const tabs = [
    { id: 'quran-circles', labelAr: 'حلقات القرآن', labelEn: 'Quran Circles', labelMs: 'Halaqah Al-Quran', icon: <Users className="h-4.5 w-4.5" /> },
    { id: 'quran-sard', labelAr: 'السرد القرآني', labelEn: 'Quran Recital (Sard)', labelMs: 'Sard Al-Quran (Hafazan Lancar)', icon: <BookOpen className="h-4.5 w-4.5" /> },
    { id: 'quran-ijazah', labelAr: 'الإجازات القرآنية', labelEn: 'Quranic Ijazat', labelMs: 'Ijazah Al-Quran', icon: <Award className="h-4.5 w-4.5" /> },
    { id: 'distance-learning', labelAr: 'التعليم عن بُعد', labelEn: 'Distance Learning', labelMs: 'Pembelajaran Jarak Jauh', icon: <Compass className="h-4.5 w-4.5" /> },
    { id: 'training-courses', labelAr: 'الدورات التدريبية', labelEn: 'Training Courses', labelMs: 'Kursus Latihan', icon: <ShieldCheck className="h-4.5 w-4.5" /> },
    { id: 'educational-camps', labelAr: 'المخيمات التربوية', labelEn: 'Educational Camps', labelMs: 'Kem Pendidikan', icon: <HeartHandshake className="h-4.5 w-4.5" /> },
    { id: 'creators-of-tomorrow', labelAr: 'صُنّاع الغد', labelEn: 'Creators of Tomorrow', labelMs: 'Pencipta Hari Esok', icon: <Sparkles className="h-4.5 w-4.5" /> }
  ];



  return (
    <section className="relative bg-brand-sand py-16 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 islamic-pattern opacity-10 pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Page Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest font-bold text-brand-gold">
            {currentLang === 'ms' ? 'Rangkaian Pendidikan' : currentLang === 'en' ? 'Educational Framework' : 'المنظومة التعليمية'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-blue-dark mt-2">
            {currentLang === 'ms' ? 'Katalog Program & Kurikulum' : currentLang === 'en' ? 'Programs & Curriculum Catalog' : 'البرامج والمخيمات التعليمية'}
          </h2>
          <p className="text-slate-500 font-sans text-xs sm:text-sm mt-3 leading-relaxed">
            {currentLang === 'ms'
              ? 'Akademi Athar menawarkan laluan pendidikan Islam bersepadu yang meliputi hafazan, tajwid, sains syariah, dan kem aktif.'
              : currentLang === 'en'
                ? 'Athar Academy offers integrated Islamic educational pathways covering memorization, tajweed, sharia sciences, and active camps.'
                : 'نقدم مسارات قرآنية وتربوية متكاملة لربط الأجيال بكتاب الله تعالى وعلومه واللغة العربية عبر برامجنا ومخيماتنا التخصصية.'}
          </p>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-row lg:flex-wrap items-center justify-start lg:justify-center gap-2 mb-10 overflow-x-auto pb-4 lg:pb-0 scrollbar-none w-full">
          {tabs.map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3.5 text-xs font-bold rounded-full border transition-all duration-300 w-max shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-brand-blue-dark border-brand-gold text-brand-gold shadow-md'
                    : 'bg-white border-brand-gold/15 text-slate-600 hover:border-brand-gold/30 hover:text-brand-blue-dark'
                }`}
              >
                <span>{currentLang === 'ms' ? tab.labelMs : currentLang === 'en' ? tab.labelEn : tab.labelAr}</span>
              </button>
            );
          })}
        </div>

        {/* Tab content wrapper */}
        <div className="bg-white border border-brand-gold/15 rounded-3xl p-6 sm:p-10 shadow-sm min-h-[400px] mb-16">

          {/* T1: QURAN CIRCLES */}
          {activeTab === 'quran-circles' && (
            <div className="space-y-8 animate-in fade-in duration-500 text-right rtl:text-right ltr:text-left">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-brand-gold/15 pb-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-brand-blue-dark">
                    {currentLang === 'ms' ? 'Halaqah Hafazan Al-Quran Harian' : currentLang === 'en' ? 'Daily Quran Memorization Circles' : 'حلقات القرآن الكريم اليومية'}
                  </h3>
                  <p className="text-slate-500 font-sans text-xs sm:text-sm mt-1">
                    {currentLang === 'ms' ? 'Halaqah kanak-kanak lelaki & perempuan yang khusus untuk hafazan, tajwid, dan nilai murni.' : currentLang === 'en' ? 'Boys & Girls sanctuaries dedicated to hifz, tajweed, and values.' : 'حلقات تربوية قرآنية تعنى بالبناء الإيماني واللفظي الصحيح.'}
                  </p>
                </div>
                {/* Stats Pills */}
                <div className="flex flex-wrap gap-2.5 font-sans font-bold text-[10px] sm:text-xs">
                  <span className="bg-brand-blue/10 text-brand-blue border border-brand-blue/20 px-3 py-1.5 rounded-full">
                    {currentLang === 'ms' ? `${ACADEMY_STATS.circlesCount} Halaqah` : currentLang === 'en' ? `${ACADEMY_STATS.circlesCount} Circles` : `${ACADEMY_STATS.circlesCount} حلقة نشطة`}
                  </span>
                  <span className="bg-brand-gold/15 text-brand-gold-dark border border-brand-gold/30 px-3 py-1.5 rounded-full">
                    {currentLang === 'ms' ? `${ACADEMY_STATS.studentsCount} Pelajar` : currentLang === 'en' ? `${ACADEMY_STATS.studentsCount} Students` : `${ACADEMY_STATS.studentsCount} طالب وطالبة`}
                  </span>
                </div>
              </div>

              {/* Stats overview cards */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
                <div className="bg-brand-sand/50 border border-brand-gold/10 p-4 rounded-2xl">
                  <span className="text-[10px] text-slate-400 block font-bold uppercase">{currentLang === 'ms' ? 'Jumlah Halaqah' : currentLang === 'en' ? 'Total Circles' : 'إجمالي عدد الحلقات'}</span>
                  <span className="text-2xl font-extrabold text-brand-blue-dark font-sans">{ACADEMY_STATS.circlesCount}</span>
                </div>
                <div className="bg-brand-sand/50 border border-brand-gold/10 p-4 rounded-2xl">
                  <span className="text-[10px] text-slate-400 block font-bold uppercase">{currentLang === 'ms' ? 'Jumlah Pelajar' : currentLang === 'en' ? 'Total Students' : 'إجمالي عدد الطلاب'}</span>
                  <span className="text-2xl font-extrabold text-brand-blue-dark font-sans">{ACADEMY_STATS.studentsCount}</span>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl">
                  <span className="text-[10px] text-emerald-600 block font-bold uppercase">{currentLang === 'ms' ? 'Halaqah Ditaja' : currentLang === 'en' ? 'Sponsored Circles' : 'الحلقات المكفولة'}</span>
                  <span className="text-2xl font-extrabold text-emerald-700 font-sans">{ACADEMY_STATS.sponsoredCircles}</span>
                </div>
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl relative group">
                  <span className="text-[10px] text-amber-600 block font-bold uppercase">{currentLang === 'ms' ? 'Halaqah Perlu Penajaan' : currentLang === 'en' ? 'Unsponsored Circles' : 'حلقات تحتاج كفالة'}</span>
                  <span className="text-2xl font-extrabold text-amber-700 font-sans">{ACADEMY_STATS.unsponsoredCircles}</span>
                </div>
              </div>

              {/* Circles Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 text-right rtl:text-right ltr:text-left">
                <div className="bg-white border-2 border-brand-gold/10 hover:border-brand-gold/30 rounded-3xl p-6 transition-all duration-300">
                  <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 bg-brand-blue/10 text-brand-blue rounded-full">
                    {currentLang === 'ms' ? 'Kelas Lelaki' : currentLang === 'en' ? 'Boys Class' : 'حلقات البنين'}
                  </span>
                  <h4 className="text-lg font-bold text-brand-blue-dark mt-3">
                    {getLangField(PROGRAMS[0], 'title', currentLang)}
                  </h4>
                  <p className="text-slate-500 font-sans text-xs sm:text-sm leading-relaxed mt-2">
                    {getLangField(PROGRAMS[0], 'description', currentLang)}
                  </p>
                  <ul className="mt-4 space-y-2 text-xs text-slate-600 font-sans">
                    <li>⏱️ <strong>{currentLang === 'ms' ? 'Jadual: ' : currentLang === 'en' ? 'Schedule: ' : 'المواعيد: '}</strong> {getLangField(PROGRAMS[0], 'schedule', currentLang)}</li>
                    <li>👥 <strong>{currentLang === 'ms' ? 'Umur: ' : currentLang === 'en' ? 'Ages: ' : 'الأعمار: '}</strong> {getLangField(PROGRAMS[0], 'ageRules', currentLang)}</li>
                    <li>👤 <strong>{currentLang === 'ms' ? 'Guru: ' : currentLang === 'en' ? 'Teacher: ' : 'الشيخ: '}</strong> {getLangField(PROGRAMS[0], 'teacher', currentLang)}</li>
                  </ul>
                </div>

                <div className="bg-white border-2 border-brand-gold/10 hover:border-brand-gold/30 rounded-3xl p-6 transition-all duration-300">
                  <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 bg-brand-gold/15 text-brand-gold-dark rounded-full">
                    {currentLang === 'ms' ? 'Halaqah Perempuan' : currentLang === 'en' ? 'Girls Sanctuary' : 'حلقات البنات والتربية بالقرآن'}
                  </span>
                  <h4 className="text-lg font-bold text-brand-blue-dark mt-3">
                    {getLangField(PROGRAMS[1], 'title', currentLang)}
                  </h4>
                  <p className="text-slate-500 font-sans text-xs sm:text-sm leading-relaxed mt-2">
                    {getLangField(PROGRAMS[1], 'description', currentLang)}
                  </p>
                  <ul className="mt-4 space-y-2 text-xs text-slate-600 font-sans">
                    <li>⏱️ <strong>{currentLang === 'ms' ? 'Jadual: ' : currentLang === 'en' ? 'Schedule: ' : 'المواعيد: '}</strong> {getLangField(PROGRAMS[1], 'schedule', currentLang)}</li>
                    <li>👥 <strong>{currentLang === 'ms' ? 'Umur: ' : currentLang === 'en' ? 'Ages: ' : 'الأعمار: '}</strong> {getLangField(PROGRAMS[1], 'ageRules', currentLang)}</li>
                    <li>👤 <strong>{currentLang === 'ms' ? 'Guru: ' : currentLang === 'en' ? 'Teacher: ' : 'المعلمة: '}</strong> {getLangField(PROGRAMS[1], 'teacher', currentLang)}</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* T2: QURAN SARD */}
          {activeTab === 'quran-sard' && (
            <div className="space-y-6 animate-in fade-in duration-500 text-right rtl:text-right ltr:text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-brand-blue-dark flex items-center gap-2 border-b border-brand-gold/15 pb-4">
                <BookOpen className="h-6 w-6 text-brand-gold" />
                <span>{currentLang === 'ms' ? 'Sard Al-Quran (Hafazan Lancar)' : currentLang === 'en' ? 'Quran Recital (Sard)' : 'حلقات السرد القرآني'}</span>
              </h3>

              <div className="bg-gradient-to-br from-brand-blue-dark to-[#12233b] border-2 border-brand-gold/30 text-white rounded-3xl p-8 relative overflow-hidden shadow-lg">
                <div className="absolute top-0 right-0 w-36 h-36 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />

                <div className="space-y-4 max-w-3xl">
                  <span className="text-[10px] uppercase font-bold tracking-widest px-3 py-1 bg-brand-gold/25 text-brand-gold-light rounded-full border border-brand-gold/20">
                    {currentLang === 'ms' ? 'Program Penguasaan Elit' : currentLang === 'en' ? 'Premium Mastery Program' : 'برنامج مع السّفرة (السنوي)'}
                  </span>
                  <h4 className="text-lg sm:text-2xl font-extrabold text-brand-gold">
                    {currentLang === 'ms' ? 'Program Bersama Para Malaikat Pencatat' : currentLang === 'en' ? 'With the Noble Scribes Program' : 'سرد المحفوظ كاملاً في جلسة واحدة'}
                  </h4>
                  <p className="text-slate-200 font-sans text-sm sm:text-base leading-relaxed">
                    {currentLang === 'ms'
                      ? 'Program khusus peringkat tinggi yang didedikasikan untuk membaca keseluruhan Al-Quran yang dihafal dalam satu sesi atau sesi berturut-turut di bawah pengawasan lembaga pentauliahan.'
                      : currentLang === 'en'
                        ? 'A specialized, high-tier program dedicated to reciting the entire memorized Quran in a single sitting or consecutive sessions under certification boards.'
                        : 'برنامج ريادي مصمم لتعزيز قوة الحفظ والتمكين، حيث يقوم الطالب بعرض تسميع القرآن الكريم كاملاً غيباً عن ظهر قلب في مجلس واحد لتثبيت أثره.'}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10 font-sans text-xs">
                    <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl">
                      <span className="text-brand-gold font-bold block mb-1">🎯 {currentLang === 'ms' ? 'Matlamat Program:' : currentLang === 'en' ? 'Program Goal:' : 'هدف البرنامج:'}</span>
                      <span>{currentLang === 'ms' ? 'Membaca keseluruhan Al-Quran daripada ingatan dalam satu hari.' : currentLang === 'en' ? 'Reciting the entire Quran by memory in one day.' : 'تمكين الطالب من سرد كامل المحفوظ في جلسة واحدة للوصول لدرجة الإتقان المطلق.'}</span>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl">
                      <span className="text-brand-gold font-bold block mb-1">👥 {currentLang === 'ms' ? 'Jumlah Penerima Manfaat:' : currentLang === 'en' ? 'Total Beneficiaries:' : 'عدد المستفيدين:'}</span>
                      <span className="text-sm font-bold text-brand-gold-light">{currentLang === 'ms' ? '500+ Penerima Manfaat (untuk 2 tahun)' : currentLang === 'en' ? '500+ Beneficiaries (for 2 years)' : 'أكثر من 500 مستفيد ومستفيدة للعامين الماضيين'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* T3: QURANIC IJAZAH */}
          {activeTab === 'quran-ijazah' && (
            <div className="space-y-6 animate-in fade-in duration-500 text-right rtl:text-right ltr:text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-brand-blue-dark flex items-center gap-2 border-b border-brand-gold/15 pb-4">
                <Award className="h-6 w-6 text-brand-gold" />
                <span>{currentLang === 'ms' ? 'Penguasaan Bacaan & Sanad Bersambung' : currentLang === 'en' ? 'Recitation Mastery & Connected Sanad' : 'الإجازات القرآنية والسند المتصل'}</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pt-2">
                <div className="md:col-span-8 space-y-4 text-right rtl:text-right ltr:text-left">
                  <h4 className="text-lg font-bold text-brand-blue-dark">
                    {getLangField(PROGRAMS[3], 'title', currentLang)}
                  </h4>
                  <p className="text-slate-600 font-sans text-xs sm:text-sm leading-relaxed">
                    {getLangField(PROGRAMS[3], 'description', currentLang)}
                  </p>

                  <div className="space-y-3 pt-2">
                    <span className="text-xs font-bold text-brand-blue block uppercase">{currentLang === 'ms' ? 'Pencapaian Kurikulum:' : currentLang === 'en' ? 'Curriculum Milestones:' : 'أهداف ومنهج مقارئ الإسناد:'}</span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600 font-sans">
                      {(currentLang === 'ms' ? (PROGRAMS[3].syllabusMs || PROGRAMS[3].syllabusEn) : (currentLang === 'en' ? PROGRAMS[3].syllabusEn : PROGRAMS[3].syllabusAr)).map((item: string, idx: number) => (
                        <li key={idx} className="flex items-center gap-2 bg-brand-gold/5 border border-brand-gold/10 p-3 rounded-xl">
                          <CheckCircle2 className="h-4.5 w-4.5 text-brand-gold shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="md:col-span-4 bg-brand-sand/50 border border-brand-gold/25 rounded-2xl p-5 text-right rtl:text-right font-sans text-xs space-y-4">
                  <span className="text-[10px] text-brand-gold-dark font-bold uppercase tracking-wider block">🎓 {currentLang === 'ms' ? 'Kelayakan Sanad' : currentLang === 'en' ? 'Sanad Prerequisites' : 'شروط الالتحاق بالإجازة'}</span>
                  <p className="text-slate-500 leading-relaxed text-right rtl:text-right ltr:text-left">
                    {currentLang === 'ms'
                      ? 'Memerlukan hafazan Al-Quran yang lengkap dengan sebutan Tajwid yang betul. Calon akan menjalani penilaian lisan awal.'
                      : currentLang === 'en'
                        ? 'Requires full Quran memorization with proper Tajweed articulation. Candidates undergo a preliminary oral check.'
                        : 'حفظ كامل للقرآن الكريم غيباً، واجتياز اختبار التقييم الأولي في مخارج الحروف والصفات النظرية والتطبيقية.'}
                  </p>
                  <div className="border-t border-brand-gold/10 pt-3">
                    <span className="font-bold text-brand-blue-dark block mb-1">👨‍🏫 {currentLang === 'ms' ? 'Syeikh Utama:' : currentLang === 'en' ? 'Lead Sheikh:' : 'المقرئ المسؤول:'}</span>
                    <span className="text-slate-600 font-bold">{getLangField(PROGRAMS[3], 'teacher', currentLang)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* T4: DISTANCE LEARNING */}
          {activeTab === 'distance-learning' && (
            <div className="space-y-6 animate-in fade-in duration-500 text-right rtl:text-right ltr:text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-brand-blue-dark flex items-center gap-2 border-b border-brand-gold/15 pb-4">
                <Compass className="h-6 w-6 text-brand-gold" />
                <span>{currentLang === 'ms' ? 'Pembelajaran Jarak Jauh' : currentLang === 'en' ? 'Online Distance Learning Portal' : 'التعليم والتحفيظ عن بُعد'}</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-brand-blue-dark">
                    {currentLang === 'ms' ? 'Bilik Darjah Maya Global' : currentLang === 'en' ? 'Global Virtual Classrooms' : 'فصول افتراضية عابرة للحدود'}
                  </h4>
                  <p className="text-slate-600 font-sans text-xs sm:text-sm leading-relaxed">
                    {currentLang === 'ms'
                      ? 'Akademi Athar menawarkan slot dalam talian yang fleksibel menggunakan peranti audio digital terkini dan lembaran visual. Pelajar boleh mempelajari Hafazan Al-Quran, Tajwid, dan bahasa Arab dari mana-mana sahaja di dunia.'
                      : currentLang === 'en'
                        ? 'Athar Academy offers flexible online slots utilizing the latest digital audio tools and visual sheets. Students can study Quranic Hifz, Tajweed, and Arabic from any part of the world.'
                        : 'إيماناً منا بشمولية رسالة القرآن الكريم، تتيح الأكاديمية حلقات إلكترونية وتفاعلية بالكامل عبر الأنظمة المرئية والصوتية عالية الجودة، مما يربط الطلاب حول العالم بمشايخ الأكاديمية.'}
                  </p>
                  <ul className="space-y-2 text-xs text-slate-500 font-sans">
                    <li className="flex items-center gap-2">✓ {currentLang === 'ms' ? 'Penstriman audio berkualiti tinggi' : currentLang === 'en' ? 'High-quality audio streaming' : 'تسميع صوتي تفاعلي عالي الوضوح'}</li>
                    <li className="flex items-center gap-2">✓ {currentLang === 'ms' ? 'Slot fleksibel untuk dewasa yang sibuk' : currentLang === 'en' ? 'Flexible slots for busy adults' : 'مواعيد مرنة متناسبة مع الكبار والموظفين'}</li>
                    <li className="flex items-center gap-2">✓ {currentLang === 'ms' ? 'Pemantauan perkembangan ibu bapa secara langsung' : currentLang === 'en' ? 'Direct parent progress monitoring' : 'متابعة مباشرة عبر قنوات الواتساب لخطط التطور'}</li>
                  </ul>
                </div>

                <div className="bg-brand-gold/5 border border-brand-gold/20 rounded-3xl p-6 flex flex-col justify-between items-center text-center">
                  <div className="p-4 bg-brand-gold/10 text-brand-gold-dark rounded-full mb-3">
                    <Compass className="h-10 w-10" />
                  </div>
                  <h5 className="text-sm font-bold text-brand-blue-dark">
                    {currentLang === 'ms' ? 'Sedia untuk Sertai Secara Online?' : currentLang === 'en' ? 'Ready to Join Online?' : 'ترغب بالدراسة عبر الإنترنت؟'}
                  </h5>
                  <p className="text-xs text-slate-500 font-sans mt-2 max-w-sm">
                    {currentLang === 'ms' ? 'Jadual disesuaikan secara individu berdasarkan zon waktu pelajar.' : currentLang === 'en' ? 'Schedules are tailored individually based on the student timezone.' : 'يتم تنسيق المواعيد بشكل مرن بما يتوافق مع فروق التوقيت المحلية للطلبة المغتربين.'}
                  </p>
                  <a
                    href={CONTACT_DETAILS.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex items-center gap-2 bg-brand-gold text-brand-blue-dark px-6 py-2.5 rounded-full text-xs font-bold shadow-md hover:scale-105 transition-transform animate-bounce"
                  >
                    <PhoneCall className="h-4 w-4" />
                    <span>{currentLang === 'ms' ? 'Tanya di WhatsApp' : currentLang === 'en' ? 'Enquire on WhatsApp' : 'تواصل معنا للتسجيل'}</span>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* T5: TRAINING COURSES */}
          {activeTab === 'training-courses' && (
            <div className="space-y-6 animate-in fade-in duration-500 text-right rtl:text-right ltr:text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-brand-blue-dark flex items-center gap-2 border-b border-brand-gold/15 pb-4">
                <ShieldCheck className="h-6 w-6 text-brand-gold" />
                <span>{currentLang === 'ms' ? 'Kursus Syariah & Latihan Pendidikan' : currentLang === 'en' ? 'Sharia Courses & Educational Training' : 'الدورات التدريبية وتأصيل العلوم الشرعية'}</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {/* Course 1 */}
                <div className="bg-white border border-brand-gold/15 rounded-2xl p-5 space-y-3 shadow-sm text-right rtl:text-right ltr:text-left">
                  <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 bg-brand-gold/10 text-brand-gold-dark rounded">
                    {currentLang === 'ms' ? 'Tahap Pengenalan' : currentLang === 'en' ? 'Introductory Tier' : 'برنامج العلوم الشرعية التمهيدي'}
                  </span>
                  <h4 className="text-base font-bold text-brand-blue-dark">
                    {getLangField(PROGRAMS[2], 'title', currentLang)}
                  </h4>
                  <p className="text-xs text-slate-500 font-sans leading-relaxed">
                    {getLangField(PROGRAMS[2], 'description', currentLang)}
                  </p>
                  <div className="bg-brand-sand p-3 rounded-xl border border-brand-gold/5 text-xs text-slate-500 space-y-1 font-sans">
                    <div className="flex justify-between">
                      <span className="font-bold">{currentLang === 'ms' ? 'Tempoh:' : currentLang === 'en' ? 'Duration:' : 'المدة:'}</span>
                      <span>{getLangField(PROGRAMS[2], 'duration', currentLang)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold">{currentLang === 'ms' ? 'Pengajar:' : currentLang === 'en' ? 'Instructor:' : 'المحاضر:'}</span>
                      <span>{getLangField(PROGRAMS[2], 'teacher', currentLang)}</span>
                    </div>
                  </div>
                </div>

                {/* Course 2 */}
                <div className="bg-white border border-brand-gold/15 rounded-2xl p-5 space-y-3 shadow-sm text-right rtl:text-right ltr:text-left">
                  <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 bg-brand-blue/10 text-brand-blue rounded">
                    {currentLang === 'ms' ? 'Hafazan Teks Matan' : currentLang === 'en' ? 'Text Memorization' : 'دورات المتون واللغة العربية'}
                  </span>
                  <h4 className="text-base font-bold text-brand-blue-dark">
                    {currentLang === 'ms' ? 'Hafazan Teks Matan & Pengajian Arab' : currentLang === 'en' ? 'Hadith Texts & Arabic Studies' : 'دورات المتون العلمية ودراسة اللغة العربية'}
                  </h4>
                  <p className="text-xs text-slate-500 font-sans leading-relaxed">
                    {currentLang === 'ms'
                      ? 'Halaqah pengajian mendalam yang memfokuskan kepada teks Syariah klasik (Al-Jazariyyah, 40 Al-Nawawi) dan kelas tatabahasa khusus untuk penutur asli dan bukan asli.'
                      : currentLang === 'en'
                        ? 'Deep-dive study circles focusing on classic Sharia texts (Al-Jazariyyah, Nawawi Forty) and specialized grammar classes for native and non-native speakers.'
                        : 'دورات دورية مخصصة لحفظ وشرح المتون العلمية المعتمدة في التجويد والحديث (كتحفة الأطفال والجزرية والأربعين النووية) وحلقات النحو والصرف.'}
                  </p>
                  <div className="bg-brand-sand p-3 rounded-xl border border-brand-gold/5 text-xs text-slate-500 space-y-1 font-sans">
                    <div className="flex justify-between">
                      <span className="font-bold">{currentLang === 'ms' ? 'Tempoh:' : currentLang === 'en' ? 'Duration:' : 'المدة:'}</span>
                      <span>{currentLang === 'ms' ? 'Kelas Berkala' : currentLang === 'en' ? 'Periodic Classes' : 'دورات مكثفة مجدولة'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold">{currentLang === 'ms' ? 'Kategori:' : currentLang === 'en' ? 'Category:' : 'المستهدفون:'}</span>
                      <span>{currentLang === 'ms' ? 'Huffaz & Pelajar Arab' : currentLang === 'en' ? 'Huffaz & Arabic learners' : 'طلبة العلم وعامة الدارسين'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* T6: EDUCATIONAL CAMPS */}
          {activeTab === 'educational-camps' && (
            <div className="space-y-6 animate-in fade-in duration-500 text-right rtl:text-right ltr:text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-brand-blue-dark flex items-center gap-2 border-b border-brand-gold/15 pb-4">
                <HeartHandshake className="h-6 w-6 text-brand-gold" />
                <span>{currentLang === 'ms' ? 'Kem Pendidikan Tahunan' : currentLang === 'en' ? 'Annual Educational Camps' : 'المخيمات التربوية السنوية'}</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {/* Camp 1 */}
                <div className="bg-white border-2 border-brand-gold/15 hover:border-brand-gold/30 rounded-3xl p-6 space-y-3 transition-all duration-300">
                  <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 bg-brand-blue/10 text-brand-blue rounded-full">
                    {currentLang === 'ms' ? 'Kem Lelaki — 30 Hari' : currentLang === 'en' ? 'Boys Camp — 30 Days' : 'البنين — 30 يوماً'}
                  </span>
                  <h4 className="text-lg font-bold text-brand-blue-dark mt-2">
                    {getLangField(DETAILED_PROGRAMS.accompanying[0], 'title', currentLang)}
                  </h4>
                  <p className="text-slate-500 font-sans text-xs sm:text-sm leading-relaxed">
                    {getLangField(DETAILED_PROGRAMS.accompanying[0], 'desc', currentLang)}
                  </p>
                  <div className="bg-brand-sand p-3 rounded-xl text-xs text-brand-blue font-bold font-sans">
                    👥 {currentLang === 'ms' ? `Penerima Manfaat: ${ACADEMY_STATS.campSnaaBeneficiaries} pelajar` : currentLang === 'en' ? `Beneficiaries: ${ACADEMY_STATS.campSnaaBeneficiaries} students` : `عدد المستفيدين: ${ACADEMY_STATS.campSnaaBeneficiaries} مستفيداً`}
                  </div>
                </div>

                {/* Camp 2 */}
                <div className="bg-white border-2 border-brand-gold/15 hover:border-brand-gold/30 rounded-3xl p-6 space-y-3 transition-all duration-300">
                  <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 bg-brand-gold/15 text-brand-gold-dark rounded-full">
                    {currentLang === 'ms' ? 'Kem Perempuan' : currentLang === 'en' ? 'Girls Camp' : 'الفتيات'}
                  </span>
                  <h4 className="text-lg font-bold text-brand-blue-dark mt-2">
                    {getLangField(DETAILED_PROGRAMS.accompanying[1], 'title', currentLang)}
                  </h4>
                  <p className="text-slate-500 font-sans text-xs sm:text-sm leading-relaxed">
                    {getLangField(DETAILED_PROGRAMS.accompanying[1], 'desc', currentLang)}
                  </p>
                  <div className="bg-brand-sand p-3 rounded-xl text-xs text-brand-blue font-bold font-sans">
                    👥 {currentLang === 'ms' ? `Penerima Manfaat: ${ACADEMY_STATS.campSfeeratBeneficiaries} pelajar` : currentLang === 'en' ? `Beneficiaries: ${ACADEMY_STATS.campSfeeratBeneficiaries} students` : `عدد المستفيدين: ${ACADEMY_STATS.campSfeeratBeneficiaries} مستفيدة`}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* T7: CREATORS OF TOMORROW */}
          {activeTab === 'creators-of-tomorrow' && (
            <div className="space-y-6 animate-in fade-in duration-500 text-right rtl:text-right ltr:text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-brand-blue-dark flex items-center gap-2 border-b border-brand-gold/15 pb-4">
                <Sparkles className="h-6 w-6 text-brand-gold" />
                <span>{currentLang === 'ms' ? 'Kem Pencipta Hari Esok' : currentLang === 'en' ? 'Creators of Tomorrow Program' : 'مخيم صُنّاع الغد'}</span>
              </h3>

              <div className="bg-gradient-to-br from-[#123F27] to-[#0a2316] border-2 border-[#C09E5B] text-white rounded-3xl p-8 relative overflow-hidden shadow-lg">
                <div className="absolute top-0 right-0 w-36 h-36 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />
                <div className="space-y-4 max-w-3xl">
                  <span className="text-[10px] uppercase font-bold tracking-widest px-3 py-1 bg-brand-gold/20 text-[#FCF9F2] rounded-full border border-brand-gold/30">
                    {currentLang === 'ms' ? 'Kem Belia Unggul' : currentLang === 'en' ? 'Flagship Youth Camp' : 'برنامج سنوي رائد للفتيان'}
                  </span>
                  <h4 className="text-lg sm:text-2xl font-extrabold text-brand-gold">
                    {currentLang === 'ms' ? 'Kem Pencipta Hari Esok' : currentLang === 'en' ? 'Creators of Tomorrow Camp' : 'مخيم صنّاع الغد التربوي المهاري'}
                  </h4>
                  <p className="text-slate-200 font-sans text-xs sm:text-sm leading-relaxed">
                    {currentLang === 'ms'
                      ? 'Kem kediaman intensif selama 30 hari yang dirancang untuk pelajar lelaki, memberi tumpuan langsung kepada pembangunan sahsiah, stamina fizikal, bengkel kepimpinan, pendidikan nilai murni, dan ulangkaji hafazan Al-Quran.'
                      : currentLang === 'en'
                        ? 'A specialized, intensive 30-day residency camp designed for boys, focusing directly on character growth, physical stamina, leadership workshops, values education, and Quran hifz revision.'
                        : 'مخيم تربوي مهاري ترفيهي مكثف للبنين يستمر لمدة 30 يوماً متواصلة، يجمع بين البناء القيمي والأخلاقي والرياضة وبناء مهارات القيادة والاعتماد على النفس.'}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 font-sans text-xs text-center">
                    <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl">
                      <span className="text-brand-gold block font-bold mb-0.5">{currentLang === 'ms' ? 'Tempoh Kem' : currentLang === 'en' ? 'Camp Duration' : 'مدة المخيم'}</span>
                      <span className="text-sm font-extrabold text-[#FCF9F2]">{currentLang === 'ms' ? '30 Hari' : currentLang === 'en' ? '30 Days' : '30 يوماً كاملة'}</span>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl">
                      <span className="text-brand-gold block font-bold mb-0.5">{currentLang === 'ms' ? 'Penerima Manfaat' : currentLang === 'en' ? 'Beneficiaries' : 'المستفيدين'}</span>
                      <span className="text-sm font-extrabold text-[#FCF9F2]">{currentLang === 'ms' ? `${ACADEMY_STATS.campSnaaBeneficiaries} Pelajar` : currentLang === 'en' ? `${ACADEMY_STATS.campSnaaBeneficiaries} Students` : `${ACADEMY_STATS.campSnaaBeneficiaries} مستفيداً`}</span>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl">
                      <span className="text-brand-gold block font-bold mb-0.5">{currentLang === 'ms' ? 'Fokus Utama' : currentLang === 'en' ? 'Focus Areas' : 'المحاور الأساسية'}</span>
                      <span className="text-xs text-[#FCF9F2]">{currentLang === 'ms' ? 'Nilai, Hifz, Sukan' : currentLang === 'en' ? 'Values, Hifz, Sports' : 'القيم، المهارات، والرياضة'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>



      </div>
    </section>
  );
}
