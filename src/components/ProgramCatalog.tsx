'use client';
import React, { useState, useEffect } from 'react';
import {
  BookOpen, Users, Clock, Award, Landmark, Sparkles, CheckCircle2,
  HelpCircle, Compass, ShieldCheck, HeartHandshake, PhoneCall, Calculator, Ticket,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import { Language, getLangField } from '@/types';
import { useDetailedPrograms, useStats, usePrograms, useContact } from '@/lib/content-provider';
import SmartImg from '@/components/SmartImg';
import { useRouter } from 'next/navigation';

interface ProgramCatalogProps {
  currentLang: Language;
  activeSub?: string;
  onSelectProgram?: (id: string) => void;
  onNavigate?: (section: string, sub: string) => void;
}

export default function ProgramCatalog({ currentLang, activeSub, onSelectProgram, onNavigate }: ProgramCatalogProps) {
  const DETAILED_PROGRAMS = useDetailedPrograms();
  const ACADEMY_STATS = useStats();
  const PROGRAMS = usePrograms();
  const CONTACT_DETAILS = useContact();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(activeSub || 'quran-circles');

  // Image slider states for Quran circles
  const [boysSlide, setBoysSlide] = useState(0);
  const [girlsSlide, setGirlsSlide] = useState(0);

  // Use the dashboard images as the source of truth. The hardcoded list is only a
  // seed for when the field was NEVER set (undefined) — once the admin edits the
  // images (including deleting them), an empty array is respected so deletions stick.
  const boysImages = Array.isArray(PROGRAMS[0]?.images)
    ? PROGRAMS[0].images
    : ['/quran-boys.png', '/quran-boys-2.png', '/quran-boys-3.png'];

  const girlsImages = Array.isArray(PROGRAMS[1]?.images)
    ? PROGRAMS[1].images
    : ['/quran-girls.png', '/quran-girls-2.png', '/quran-girls-3.png'];

  // Generic Program Gallery states
  const [galleryActiveImg, setGalleryActiveImg] = useState(0);
  const [galleryLightboxOpen, setGalleryLightboxOpen] = useState(false);

  const defaultProgramImages: Record<string, { src: string; titleAr: string; titleEn: string; descAr: string; descEn: string; }[]> = {
    safara: [
      { src: '/safara-1.png', titleAr: 'حلقات الإسناد وتلقي القراءات', titleEn: 'Connected Recitation Circles', descAr: 'تلقي القراءات والإجازات القرآنية بالسند المتصل على شيوخ الأكاديمية.', descEn: 'Receiving Quranic chains of narration from the academy scholars.' },
      { src: '/safara-2.png', titleAr: 'مدارسة المتون وضبط التجويد', titleEn: 'Text Study & Articulation', descAr: 'حلقات نقاشية ومدارسة المتون العلمية التخصصية كالجزرية وتحفة الأطفال.', descEn: 'Discussion and study of specialized Sharia and Tajweed texts.' },
      { src: '/safara-3.png', titleAr: 'تكريم الحفاظ والمتميزين', titleEn: 'Honoring Distinguished Students', descAr: 'احتفاء مبارك بالطلاب والطالبات الذين أتموا سرد القرآن غيباً في مجلس واحد.', descEn: 'Celebrating students who completed reciting the entire Quran in one sitting.' }
    ],
    takween: [
      { src: '/takween-1.png', titleAr: 'محاضرات العلوم الشرعية', titleEn: 'Sharia Science Lectures', descAr: 'تأصيل شرعي في العقيدة والفقه والحديث واللغة العربية.', descEn: 'Foundational sharia studies in creed, jurisprudence, and language.' },
      { src: '/takween-2.png', titleAr: 'حلقات النقاش والمذاكرة', titleEn: 'Discussion & Study Groups', descAr: 'تفعيل التعلم النشط وتوطين المعرفة بين الطلاب.', descEn: 'Promoting active learning and knowledge peer discussions.' },
      { src: '/takween-3.png', titleAr: 'تكريم المتفوقين في الاختبارات', titleEn: 'Honoring Top Achievers', descAr: 'جوائز تشجيعية وشهادات تفوق للطلبة المتميزين في الفحص الدوري.', descEn: 'Awards and certificates for top performing students in assessments.' }
    ],
    'creators-of-tomorrow': [
      { src: '/creators-1.png', titleAr: 'الأنشطة الرياضية واللياقة البدنية', titleEn: 'Sports & Physical Activities', descAr: 'تعزيز القوة البدنية والنشاط اليومي من خلال رياضات مختلفة.', descEn: 'Enhancing physical fitness and daily active sports.' },
      { src: '/creators-2.png', titleAr: 'ورش العمل وبناء القيادة', titleEn: 'Leadership & Workshops', descAr: 'تدريبات مهارية في الإلقاء، وحل المشكلات، والاعتماد على النفس.', descEn: 'Skill building in public speaking, problem-solving, and independence.' },
      { src: '/creators-3.png', titleAr: 'اللقاءات التربوية وحلقات القرآن', titleEn: 'Educational Meetings & Quran Hifz', descAr: 'مراجعة وتسميع أوراد القرآن الكريم بالإضافة إلى اللقاءات القيمية اليومية.', descEn: 'Reviewing Quranic memorization alongside daily values sittings.' }
    ],
    sfeerat: [
      { src: '/sfeerat-1.png', titleAr: 'الحلقات الحوارية والقيمية للفتيات', titleEn: 'Girls Value & Dialogue Circles', descAr: 'لقاءات تربوية تعزز الهوية الإسلامية والقيم والأخلاق النبيلة.', descEn: 'Educational sessions reinforcing Islamic identity and values.' },
      { src: '/sfeerat-2.png', titleAr: 'الورش الحرفية والإبداعية', titleEn: 'Craft & Creative Workshops', descAr: 'تعليم مهارات اليد والأعمال الفنية لتمكين الفتيات إبداعياً.', descEn: 'Teaching arts, crafts, and handiworks for creative empowerment.' },
      { src: '/sfeerat-2.png', titleAr: 'أنشطة الخدمة المجتمعية والترفيه', titleEn: 'Community Service & Recreation', descAr: 'أعمال تطوعية وزيارات ترفيهية تنمي الأثر السليم في الفؤاد.', descEn: 'Volunteering and fun field trips that foster healthy social impact.' }
    ],
    'ramadan-retreat': [
      { src: '/quran-boys.png', titleAr: 'التهجد وصلاة القيام', titleEn: 'Night Prayers (Tahajjud)', descAr: 'إحياء العشر الأواخر بالقيام والدعاء والتضرع في جو إيماني.', descEn: 'Spiritual night prayers and supplication during the last ten nights.' },
      { src: '/safara-1.png', titleAr: 'المراجعة القرآنية المكثفة', titleEn: 'Intensive Quranic Review', descAr: 'خطط يومية مكثفة لتثبيت الحفظ والمراجعة الجماعية والفردية.', descEn: 'Focused daily structures for solidifying memorization and reviews.' },
      { src: '/quran-girls-2.png', titleAr: 'إفطار الجماعي واللقاءات الإيمانية', titleEn: 'Community Iftar & Lessons', descAr: 'جلسات إيمانية وثقافية مباركة تجمع طلبة الأكاديمية.', descEn: 'Blessed spiritual and cultural sittings with academy students.' }
    ],
    'journey-athar': [
      { src: '/creators-1.png', titleAr: 'الرحلات الاستكشافية والخارجية', titleEn: 'Outdoor Expeditions & Field Trips', descAr: 'زيارة المعالم والتعلم من خلال الاستكشاف والتجربة العملية.', descEn: 'Visiting historic landmarks and learning through direct experience.' },
      { src: '/creators-2.png', titleAr: 'الأنشطة الجماعية وتحديات الفريق', titleEn: 'Group Activities & Team Challenges', descAr: 'ألعاب حركية ومسابقات تعزز روح الأخوة والعمل الجماعي.', descEn: 'Action sports and puzzles reinforcing team spirit and brotherhood.' },
      { src: '/quran-boys-2.png', titleAr: 'المحاضرات وجلسات التفكر والتدبر', titleEn: 'Lectures & Reflection Circles', descAr: 'جلسات تفكر في الطبيعة ودروس تدبر في معاني الآيات العظيمة.', descEn: 'Sittings in nature reflecting on Quranic verses and meanings.' }
    ],
    qari: [
      { src: '/safara-1.png', titleAr: 'فحص التجويد وضبط مخارج الحروف', titleEn: 'Tajweed Evaluation & Articulation', descAr: 'تعليم التلاوة الصحيحة وأحكام التجويد عملياً ونظرياً.', descEn: 'Teaching correct pronunciation and rules practically and theoretically.' },
      { src: '/quran-boys-3.png', titleAr: 'التسجيلات الصوتية والمحافل', titleEn: 'Audio Recordings & Assemblies', descAr: 'تسجيل التلاوات المتميزة للطلاب وتشجيعهم بظهور مبارك.', descEn: 'Recording top student recitations to encourage and reward them.' },
      { src: '/quran-girls-3.png', titleAr: 'التتويج بجوائز قارئ أثر المتميز', titleEn: 'Athar Reciter Award Coronation', descAr: 'تكريم المتسابقين الحاصلين على أعلى درجات الضبط والجمال الصوتي.', descEn: 'Honoring contestants with the highest articulation and vocal beauty.' }
    ]
  };

  useEffect(() => {
    if (activeSub) setActiveTab(activeSub);
  }, [activeSub]);

  useEffect(() => {
    setGalleryActiveImg(0);
    setGalleryLightboxOpen(false);
  }, [activeTab]);

  // Tabs match the site menu exactly — one tab per educational program, in order.
  const tabs = [
    { id: 'quran-circles', labelAr: 'برنامج الحلقات القرآنية', labelEn: 'Quran Circles', labelMs: 'Halaqah Al-Quran', icon: <Users className="h-4.5 w-4.5" /> },
    { id: 'safara', labelAr: 'برنامج مع السّفرة', labelEn: 'With the Scribes', labelMs: 'Bersama Para Pencatat', icon: <BookOpen className="h-4.5 w-4.5" /> },
    { id: 'takween', labelAr: 'برنامج تكوين', labelEn: 'Takween Program', labelMs: 'Program Takween', icon: <ShieldCheck className="h-4.5 w-4.5" /> },
    { id: 'creators-of-tomorrow', labelAr: 'مخيم صنّاع الغد', labelEn: 'Creators of Tomorrow', labelMs: 'Pencipta Hari Esok', icon: <Sparkles className="h-4.5 w-4.5" /> },
    { id: 'sfeerat', labelAr: 'مخيم سفيرات الأثر', labelEn: 'Ambassadors of Impact', labelMs: 'Duta Impak', icon: <HeartHandshake className="h-4.5 w-4.5" /> },
    { id: 'ramadan-retreat', labelAr: 'المعتكف الرمضاني', labelEn: 'Ramadan Retreat', labelMs: 'Iktikaf Ramadan', icon: <Award className="h-4.5 w-4.5" /> },
    { id: 'journey-athar', labelAr: 'رحلة الأثر', labelEn: 'Journey of Impact', labelMs: 'Perjalanan Impak', icon: <Compass className="h-4.5 w-4.5" /> },
    { id: 'qari', labelAr: 'قارئ أثر', labelEn: 'Athar Reciter', labelMs: 'Qari Athar', icon: <BookOpen className="h-4.5 w-4.5" /> },
    { id: 'accompanying', labelAr: 'البرامج المصاحبة', labelEn: 'Accompanying Programs', labelMs: 'Program Sampingan', icon: <Landmark className="h-4.5 w-4.5" /> },
  ];

  // Look up a program from the detailed data by its id
  const allDetailed = [...(DETAILED_PROGRAMS.basic || []), ...(DETAILED_PROGRAMS.accompanying || [])];
  const findProg = (id: string) => allDetailed.find((p: any) => p.id === id);

  // Maps each tab to its program data + accent icon
  const PROGRAM_TABS: Record<string, { progId: string; icon: React.ReactNode }> = {
    'safara': { progId: 'alsafarah', icon: <BookOpen className="h-6 w-6 text-brand-gold" /> },
    'takween': { progId: 'takween', icon: <ShieldCheck className="h-6 w-6 text-brand-gold" /> },
    'sfeerat': { progId: 'camps-sfeerat', icon: <HeartHandshake className="h-6 w-6 text-brand-gold" /> },
    'ramadan-retreat': { progId: 'ramadan-retreat', icon: <Award className="h-6 w-6 text-brand-gold" /> },
    'journey-athar': { progId: 'journey-athar', icon: <Compass className="h-6 w-6 text-brand-gold" /> },
    'qari': { progId: 'qari', icon: <BookOpen className="h-6 w-6 text-brand-gold" /> },
  };

  const programImages: Record<string, { src: string; titleAr: string; titleEn: string; descAr: string; descEn: string; }[]> = {};
  const tabsWithGalleries = ['safara', 'takween', 'creators-of-tomorrow', 'sfeerat', 'ramadan-retreat', 'journey-athar', 'qari'];
  for (const tabId of tabsWithGalleries) {
    let progId = '';
    if (tabId === 'creators-of-tomorrow') {
      progId = 'camps-snaa';
    } else if (PROGRAM_TABS[tabId]) {
      progId = PROGRAM_TABS[tabId].progId;
    }
    
    if (progId) {
      const prog = findProg(progId);
      // If the admin has set a gallery (even an empty one after deleting), use it —
      // so deletions stick instead of falling back to the built-in default images.
      if (prog && Array.isArray(prog.gallery)) {
        programImages[tabId] = prog.gallery.filter((item: any) => !item._hidden).map((item: any) => ({
          src: item.img || item.image || item.src || '',
          titleAr: item.titleAr || '',
          titleEn: item.titleEn || '',
          descAr: item.descAr || '',
          descEn: item.descEn || '',
        }));
      }
    }
    
    if (!programImages[tabId]) {
      programImages[tabId] = defaultProgramImages[tabId] || [];
    }
  }



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
                onClick={() => (onNavigate ? onNavigate('programs', tab.id) : setActiveTab(tab.id))}
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
              <div className="flex flex-col gap-10 pt-6 text-right rtl:text-right ltr:text-left">
                {/* Boys Card */}
                <div className="bg-white border border-brand-gold/15 hover:border-brand-gold/30 rounded-[2.5rem] overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 flex flex-col lg:flex-row group">
                  {/* Left Side: Image Slider */}
                  <div className="lg:w-2/5 min-h-[280px] relative overflow-hidden shrink-0 group/slider">
                    {/* Images Container */}
                    <div className="w-full h-full relative">
                      {boysImages.map((imgSrc, idx) => (
                        <div
                          key={imgSrc}
                          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                            idx === boysSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                          }`}
                        >
                          <SmartImg
                            src={imgSrc}
                            alt={getLangField(PROGRAMS[0], 'title', currentLang)}
                            className="w-full h-full object-cover group-hover:scale-[1.03] transition-all duration-700 absolute inset-0"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-l from-slate-950/40 to-transparent pointer-events-none z-20" />
                    
                    {/* Badge */}
                    <div className="absolute top-4 right-4 bg-brand-blue/90 backdrop-blur-sm text-brand-gold px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border border-brand-gold/30 shadow-md z-30">
                      {currentLang === 'ms' ? 'Kelas Lelaki' : currentLang === 'en' ? 'Boys Class' : 'حلقات البنين'}
                    </div>

                    {/* Navigation Arrows */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setBoysSlide((prev) => (prev === 0 ? boysImages.length - 1 : prev - 1));
                      }}
                      className="absolute top-1/2 left-3 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-800 p-1.5 rounded-full shadow-md hover:scale-105 transition-all opacity-0 group-hover/slider:opacity-100 focus:opacity-100 z-30 cursor-pointer"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setBoysSlide((prev) => (prev === boysImages.length - 1 ? 0 : prev + 1));
                      }}
                      className="absolute top-1/2 right-3 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-800 p-1.5 rounded-full shadow-md hover:scale-105 transition-all opacity-0 group-hover/slider:opacity-100 focus:opacity-100 z-30 cursor-pointer"
                      aria-label="Next image"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>

                    {/* Dots Indicators */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-30">
                      {boysImages.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => {
                            e.stopPropagation();
                            setBoysSlide(idx);
                          }}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            idx === boysSlide ? 'w-4 bg-brand-gold' : 'w-1.5 bg-white/60 hover:bg-white'
                          }`}
                          aria-label={`Go to slide ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Right Side: Content */}
                  <div className="lg:w-3/5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                    <div className="space-y-3">
                      <h4 className="text-xl sm:text-2xl font-bold text-brand-blue-dark leading-snug">
                        {getLangField(PROGRAMS[0], 'title', currentLang)}
                      </h4>
                      <p className="text-slate-500 font-sans text-xs sm:text-sm leading-relaxed">
                        {getLangField(PROGRAMS[0], 'description', currentLang)}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-brand-gold/5 border border-brand-gold/10 p-5 rounded-2xl text-xs text-slate-700 font-sans">
                      <div className="space-y-1">
                        <span className="flex items-center gap-1.5 text-brand-gold-dark font-bold">
                          <Clock className="h-4 w-4 text-brand-gold-dark shrink-0" />
                          <span>{currentLang === 'ms' ? 'Jadual' : currentLang === 'en' ? 'Schedule' : 'المواعيد'}</span>
                        </span>
                        <span className="text-slate-600 block leading-relaxed">{getLangField(PROGRAMS[0], 'schedule', currentLang)}</span>
                      </div>
                      
                      <div className="space-y-1 border-t sm:border-t-0 sm:border-r sm:border-l border-brand-gold/10 pt-3 sm:pt-0 sm:px-4">
                        <span className="flex items-center gap-1.5 text-brand-gold-dark font-bold">
                          <Users className="h-4 w-4 text-brand-gold-dark shrink-0" />
                          <span>{currentLang === 'ms' ? 'Umur' : currentLang === 'en' ? 'Ages' : 'الفئة العمرية'}</span>
                        </span>
                        <span className="text-slate-600 block leading-relaxed">{getLangField(PROGRAMS[0], 'ageRules', currentLang)}</span>
                      </div>

                      {getLangField(PROGRAMS[0], 'teacher', currentLang) && (
                      <div className="space-y-1 border-t sm:border-t-0 pt-3 sm:pt-0">
                        <span className="flex items-center gap-1.5 text-brand-gold-dark font-bold">
                          <Award className="h-4 w-4 text-brand-gold-dark shrink-0" />
                          <span>{currentLang === 'ms' ? 'Guru' : currentLang === 'en' ? 'Teacher' : 'المشرف'}</span>
                        </span>
                        <span className="text-slate-600 block leading-relaxed">{getLangField(PROGRAMS[0], 'teacher', currentLang)}</span>
                      </div>
                      )}
                    </div>

                    <button
                      onClick={() => onNavigate ? onNavigate('admission', 'register-circles') : undefined}
                      className="w-full sm:w-max flex items-center justify-center gap-2 bg-gradient-to-r from-brand-blue-dark to-brand-blue hover:from-brand-blue hover:to-brand-blue-dark text-white font-bold px-8 py-3.5 rounded-full shadow-md transition-all duration-300 hover:shadow-brand-blue-dark/25 cursor-pointer text-xs"
                    >
                      <Ticket className="h-4 w-4" />
                      <span>{currentLang === 'ms' ? 'Daftar Sekarang' : currentLang === 'en' ? 'Register Now' : 'سجّل الآن'}</span>
                    </button>
                  </div>
                </div>

                {/* Girls Card */}
                <div className="bg-white border border-brand-gold/15 hover:border-brand-gold/30 rounded-[2.5rem] overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 flex flex-col lg:flex-row group">
                  {/* Left Side: Image Slider */}
                  <div className="lg:w-2/5 min-h-[280px] relative overflow-hidden shrink-0 group/slider">
                    {/* Images Container */}
                    <div className="w-full h-full relative">
                      {girlsImages.map((imgSrc, idx) => (
                        <div
                          key={imgSrc}
                          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                            idx === girlsSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                          }`}
                        >
                          <SmartImg
                            src={imgSrc}
                            alt={getLangField(PROGRAMS[1], 'title', currentLang)}
                            className="w-full h-full object-cover group-hover:scale-[1.03] transition-all duration-700 absolute inset-0"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-l from-slate-950/40 to-transparent pointer-events-none z-20" />
                    
                    {/* Badge */}
                    <div className="absolute top-4 right-4 bg-brand-gold/90 backdrop-blur-sm text-brand-blue-dark px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border border-brand-gold/25 shadow-md z-30">
                      {currentLang === 'ms' ? 'Halaqah Perempuan' : currentLang === 'en' ? 'Girls Sanctuary' : 'حلقات البنات والتربية بالقرآن'}
                    </div>

                    {/* Navigation Arrows */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setGirlsSlide((prev) => (prev === 0 ? girlsImages.length - 1 : prev - 1));
                      }}
                      className="absolute top-1/2 left-3 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-800 p-1.5 rounded-full shadow-md hover:scale-105 transition-all opacity-0 group-hover/slider:opacity-100 focus:opacity-100 z-30 cursor-pointer"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setGirlsSlide((prev) => (prev === girlsImages.length - 1 ? 0 : prev + 1));
                      }}
                      className="absolute top-1/2 right-3 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-800 p-1.5 rounded-full shadow-md hover:scale-105 transition-all opacity-0 group-hover/slider:opacity-100 focus:opacity-100 z-30 cursor-pointer"
                      aria-label="Next image"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>

                    {/* Dots Indicators */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-30">
                      {girlsImages.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => {
                            e.stopPropagation();
                            setGirlsSlide(idx);
                          }}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            idx === girlsSlide ? 'w-4 bg-brand-gold' : 'w-1.5 bg-white/60 hover:bg-white'
                          }`}
                          aria-label={`Go to slide ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Right Side: Content */}
                  <div className="lg:w-3/5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                    <div className="space-y-3">
                      <h4 className="text-xl sm:text-2xl font-bold text-brand-blue-dark leading-snug">
                        {getLangField(PROGRAMS[1], 'title', currentLang)}
                      </h4>
                      <p className="text-slate-500 font-sans text-xs sm:text-sm leading-relaxed">
                        {getLangField(PROGRAMS[1], 'description', currentLang)}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-brand-gold/5 border border-brand-gold/10 p-5 rounded-2xl text-xs text-slate-700 font-sans">
                      <div className="space-y-1">
                        <span className="flex items-center gap-1.5 text-brand-gold-dark font-bold">
                          <Clock className="h-4 w-4 text-brand-gold-dark shrink-0" />
                          <span>{currentLang === 'ms' ? 'Jadual' : currentLang === 'en' ? 'Schedule' : 'المواعيد'}</span>
                        </span>
                        <span className="text-slate-600 block leading-relaxed">{getLangField(PROGRAMS[1], 'schedule', currentLang)}</span>
                      </div>
                      
                      <div className="space-y-1 border-t sm:border-t-0 sm:border-r sm:border-l border-brand-gold/10 pt-3 sm:pt-0 sm:px-4">
                        <span className="flex items-center gap-1.5 text-brand-gold-dark font-bold">
                          <Users className="h-4 w-4 text-brand-gold-dark shrink-0" />
                          <span>{currentLang === 'ms' ? 'Umur' : currentLang === 'en' ? 'Ages' : 'الفئة العمرية'}</span>
                        </span>
                        <span className="text-slate-600 block leading-relaxed">{getLangField(PROGRAMS[1], 'ageRules', currentLang)}</span>
                      </div>

                      {getLangField(PROGRAMS[1], 'teacher', currentLang) && (
                      <div className="space-y-1 border-t sm:border-t-0 pt-3 sm:pt-0">
                        <span className="flex items-center gap-1.5 text-brand-gold-dark font-bold">
                          <Award className="h-4 w-4 text-brand-gold-dark shrink-0" />
                          <span>{currentLang === 'ms' ? 'Guru' : currentLang === 'en' ? 'Teacher' : 'المشرفة'}</span>
                        </span>
                        <span className="text-slate-600 block leading-relaxed">{getLangField(PROGRAMS[1], 'teacher', currentLang)}</span>
                      </div>
                      )}
                    </div>

                    <button
                      onClick={() => onNavigate ? onNavigate('admission', 'register-circles') : undefined}
                      className="w-full sm:w-max flex items-center justify-center gap-2 bg-gradient-to-r from-brand-gold to-brand-gold-dark hover:from-brand-gold-dark hover:to-brand-gold text-brand-blue-dark font-bold px-8 py-3.5 rounded-full shadow-md transition-all duration-300 hover:shadow-brand-gold/25 cursor-pointer text-xs"
                    >
                      <Ticket className="h-4 w-4" />
                      <span>{currentLang === 'ms' ? 'Daftar Sekarang' : currentLang === 'en' ? 'Register Now' : 'سجّل الآن'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Unified premium layout — one tab per program (مع السّفرة، تكوين، سفيرات، المعتكف، رحلة الأثر، قارئ أثر) */}
          {PROGRAM_TABS[activeTab] && (() => {
            const cfg = PROGRAM_TABS[activeTab];
            const prog: any = findProg(cfg.progId);
            if (!prog) return null;
            const title = getLangField(prog, 'title', currentLang) as string;
            const desc = getLangField(prog, 'desc', currentLang) as string;
            return (
              <div className="space-y-6 animate-in fade-in duration-500 text-right rtl:text-right ltr:text-left">
                <h3 className="text-xl sm:text-2xl font-bold text-brand-blue-dark flex items-center gap-2 border-b border-brand-gold/15 pb-4">
                  {cfg.icon}
                  <span>{title}</span>
                </h3>

                <div className="bg-gradient-to-br from-brand-blue-dark to-[#12233b] border-2 border-brand-gold/30 text-white rounded-3xl p-8 relative overflow-hidden shadow-lg">
                  <div className="absolute top-0 right-0 w-36 h-36 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />
                  <div className="space-y-4 max-w-3xl">
                    <span className="text-[10px] uppercase font-bold tracking-widest px-3 py-1 bg-brand-gold/25 text-brand-gold-light rounded-full border border-brand-gold/20">
                      {currentLang === 'ms' ? 'Program Akademi Athar' : currentLang === 'en' ? 'Athar Academy Program' : 'برنامج من أكاديمية أثر'}
                    </span>
                    <h4 className="text-lg sm:text-2xl font-extrabold text-brand-gold">{title}</h4>
                    <p className="text-slate-200 font-sans text-sm sm:text-base leading-relaxed">{desc}</p>
                    {prog.stats && (
                      <div className="pt-4 border-t border-white/10">
                        <span className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-sm font-bold text-brand-gold-light">
                          <Users className="h-4 w-4" /> {prog.stats}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-brand-gold/5 border border-brand-gold/20 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-sm text-slate-600 font-sans">
                    {currentLang === 'ms' ? 'Untuk pendaftaran dan maklumat lanjut, hubungi kami.' : currentLang === 'en' ? 'For registration and details, contact us.' : 'للتسجيل والاستفسار عن هذا البرنامج تواصل معنا.'}
                  </div>
                  <a href={CONTACT_DETAILS.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-brand-gold text-brand-blue-dark px-6 py-2.5 rounded-full text-xs font-bold shadow-md hover:scale-105 transition-transform shrink-0">
                    <PhoneCall className="h-4 w-4" />
                    <span>{currentLang === 'ms' ? 'Daftar via WhatsApp' : currentLang === 'en' ? 'Register on WhatsApp' : 'سجّل عبر واتساب'}</span>
                  </a>
                </div>

                {/* Awesome Photo Gallery Showcase for Program */}
                {programImages[activeTab] && programImages[activeTab].length > 0 && !['ramadan-retreat', 'qari'].includes(activeTab) && (
                  <div className="space-y-6 pt-6 animate-in fade-in duration-500">
                    <div className="flex items-center gap-2 border-b border-brand-gold/15 pb-3">
                      <Sparkles className="h-5 w-5 text-brand-gold" />
                      <h4 className="text-base sm:text-lg font-bold text-brand-blue-dark">
                        {currentLang === 'ms' ? 'Galeri Foto Program' : currentLang === 'en' ? 'Program Photo Gallery' : 'معرض صور البرنامج التفاعلي'}
                      </h4>
                    </div>

                    {/* Main Preview Card */}
                    <div className="relative aspect-[16/10] sm:aspect-[21/9] w-full rounded-[2rem] overflow-hidden border border-brand-gold/20 shadow-lg group/main-gallery">
                      {/* Active Image */}
                      {programImages[activeTab].map((img, idx) => (
                        <div
                          key={img.src + idx}
                          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                            idx === galleryActiveImg ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-95 z-0'
                          }`}
                        >
                          <SmartImg
                            src={img.src}
                            alt={currentLang === 'en' ? img.titleEn : img.titleAr}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}

                      {/* Gradient Overlay for Text */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none z-20" />

                      {/* Info Overlay */}
                      <div className="absolute bottom-6 right-6 left-6 z-30 text-white flex flex-col md:flex-row md:items-end justify-between gap-4 text-right">
                        <div className="space-y-1.5 max-w-xl">
                          <h5 className="text-base sm:text-lg font-extrabold text-brand-gold">
                            {currentLang === 'en' ? programImages[activeTab][galleryActiveImg]?.titleEn : programImages[activeTab][galleryActiveImg]?.titleAr}
                          </h5>
                          <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
                            {currentLang === 'en' ? programImages[activeTab][galleryActiveImg]?.descEn : programImages[activeTab][galleryActiveImg]?.descAr}
                          </p>
                        </div>
                        
                        {/* Zoom Button */}
                        <button
                          onClick={() => setGalleryLightboxOpen(true)}
                          className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-full text-xs font-bold transition-all hover:scale-105 shrink-0 flex items-center justify-center gap-1.5 self-start md:self-auto cursor-pointer"
                        >
                          <Compass className="h-4 w-4 text-brand-gold" />
                          <span>{currentLang === 'ms' ? 'Zum' : currentLang === 'en' ? 'Zoom Image' : 'تكبير الصورة'}</span>
                        </button>
                      </div>

                      {/* Chevron Controls */}
                      <button
                        onClick={() => setGalleryActiveImg((prev) => (prev === 0 ? programImages[activeTab].length - 1 : prev - 1))}
                        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/20 hover:bg-white/35 text-white p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover/main-gallery:opacity-100 z-30 cursor-pointer"
                        aria-label="Previous"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => setGalleryActiveImg((prev) => (prev === programImages[activeTab].length - 1 ? 0 : prev + 1))}
                        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/20 hover:bg-white/35 text-white p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover/main-gallery:opacity-100 z-30 cursor-pointer"
                        aria-label="Next"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>

                    {/* Thumbnail Row */}
                    <div className="grid grid-cols-3 gap-4">
                      {programImages[activeTab].map((img, idx) => {
                        const isActive = idx === galleryActiveImg;
                        return (
                          <button
                            key={idx}
                            onClick={() => setGalleryActiveImg(idx)}
                            className={`relative aspect-[16/10] rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                              isActive
                                ? 'border-brand-gold scale-[1.02] shadow-md shadow-brand-gold/25'
                                : 'border-transparent hover:border-brand-gold/40 opacity-70 hover:opacity-100'
                            } cursor-pointer`}
                          >
                            <SmartImg
                              src={img.src}
                              alt="thumbnail"
                              className="w-full h-full object-cover"
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Lightbox / Modal */}
                {galleryLightboxOpen && programImages[activeTab] && (
                  <div
                    className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-[9999] flex items-center justify-center p-4 animate-in fade-in duration-300"
                    onClick={() => setGalleryLightboxOpen(false)}
                  >
                    <div
                      className="relative max-w-5xl w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 shadow-2xl animate-in zoom-in-95 duration-300"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <SmartImg
                        src={programImages[activeTab][galleryActiveImg]?.src}
                        alt="Zoomed"
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Close button */}
                      <button
                        onClick={() => setGalleryLightboxOpen(false)}
                        className="absolute top-4 right-4 bg-black/60 hover:bg-black text-white p-2 rounded-full border border-white/10 transition-colors z-50 cursor-pointer text-xs font-bold px-3 py-1.5"
                      >
                        ✕
                      </button>

                      {/* Info overlay in lightbox */}
                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 to-transparent p-6 text-white text-right">
                        <h5 className="text-base sm:text-lg font-bold text-brand-gold">
                          {currentLang === 'en' ? programImages[activeTab][galleryActiveImg]?.titleEn : programImages[activeTab][galleryActiveImg]?.titleAr}
                        </h5>
                        <p className="text-xs sm:text-sm text-slate-300 font-sans mt-1 leading-relaxed">
                          {currentLang === 'en' ? programImages[activeTab][galleryActiveImg]?.descEn : programImages[activeTab][galleryActiveImg]?.descAr}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })()}

          {/* ACCOMPANYING PROGRAMS — grid of all */}
          {activeTab === 'accompanying' && (
            <div className="space-y-6 animate-in fade-in duration-500 text-right rtl:text-right ltr:text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-brand-blue-dark flex items-center gap-2 border-b border-brand-gold/15 pb-4">
                <Landmark className="h-6 w-6 text-brand-gold" />
                <span>{currentLang === 'ms' ? 'Program Sampingan' : currentLang === 'en' ? 'Accompanying Programs' : 'البرامج المصاحبة'}</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(DETAILED_PROGRAMS.accompanying || []).filter((p: any) => !p._hidden).map((p: any, i: number) => (
                  <div key={i} className="bg-white border-2 border-brand-gold/15 hover:border-brand-gold/30 rounded-3xl p-6 space-y-3 transition-all duration-300">
                    <h4 className="text-lg font-bold text-brand-blue-dark">{getLangField(p, 'title', currentLang)}</h4>
                    <p className="text-slate-500 font-sans text-xs sm:text-sm leading-relaxed">{getLangField(p, 'desc', currentLang)}</p>
                    {p.stats && (
                      <div className="bg-brand-sand p-3 rounded-xl text-xs text-brand-blue font-bold font-sans">👥 {p.stats}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===== Legacy program blocks below are no longer reachable (kept harmless) ===== */}
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

              {/* Awesome Photo Gallery Showcase for Creators of Tomorrow */}
              {programImages[activeTab] && (
                <div className="space-y-6 pt-6 animate-in fade-in duration-500">
                  <div className="flex items-center gap-2 border-b border-brand-gold/15 pb-3">
                    <Sparkles className="h-5 w-5 text-brand-gold" />
                    <h4 className="text-base sm:text-lg font-bold text-brand-blue-dark">
                      {currentLang === 'ms' ? 'Galeri Foto Program' : currentLang === 'en' ? 'Program Photo Gallery' : 'معرض صور البرنامج التفاعلي'}
                    </h4>
                  </div>

                  {/* Main Preview Card */}
                  <div className="relative aspect-[16/10] sm:aspect-[21/9] w-full rounded-[2rem] overflow-hidden border border-brand-gold/20 shadow-lg group/main-gallery">
                    {/* Active Image */}
                    {programImages[activeTab].map((img, idx) => (
                      <div
                        key={img.src + idx}
                        className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                          idx === galleryActiveImg ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-95 z-0'
                        }`}
                      >
                        <SmartImg
                          src={img.src}
                          alt={currentLang === 'en' ? img.titleEn : img.titleAr}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}

                    {/* Gradient Overlay for Text */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none z-20" />

                    {/* Info Overlay */}
                    <div className="absolute bottom-6 right-6 left-6 z-30 text-white flex flex-col md:flex-row md:items-end justify-between gap-4 text-right">
                      <div className="space-y-1.5 max-w-xl">
                        <h5 className="text-base sm:text-lg font-extrabold text-brand-gold">
                          {currentLang === 'en' ? programImages[activeTab][galleryActiveImg]?.titleEn : programImages[activeTab][galleryActiveImg]?.titleAr}
                        </h5>
                        <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
                          {currentLang === 'en' ? programImages[activeTab][galleryActiveImg]?.descEn : programImages[activeTab][galleryActiveImg]?.descAr}
                        </p>
                      </div>
                      
                      {/* Zoom Button */}
                      <button
                        onClick={() => setGalleryLightboxOpen(true)}
                        className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-full text-xs font-bold transition-all hover:scale-105 shrink-0 flex items-center justify-center gap-1.5 self-start md:self-auto cursor-pointer"
                      >
                        <Compass className="h-4 w-4 text-brand-gold" />
                        <span>{currentLang === 'ms' ? 'Zum' : currentLang === 'en' ? 'Zoom Image' : 'تكبير الصورة'}</span>
                      </button>
                    </div>

                    {/* Chevron Controls */}
                    <button
                      onClick={() => setGalleryActiveImg((prev) => (prev === 0 ? programImages[activeTab].length - 1 : prev - 1))}
                      className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/20 hover:bg-white/35 text-white p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover/main-gallery:opacity-100 z-30 cursor-pointer"
                      aria-label="Previous"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setGalleryActiveImg((prev) => (prev === programImages[activeTab].length - 1 ? 0 : prev + 1))}
                      className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/20 hover:bg-white/35 text-white p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover/main-gallery:opacity-100 z-30 cursor-pointer"
                      aria-label="Next"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Thumbnail Row */}
                  <div className="grid grid-cols-3 gap-4">
                    {programImages[activeTab].map((img, idx) => {
                      const isActive = idx === galleryActiveImg;
                      return (
                        <button
                          key={idx}
                          onClick={() => setGalleryActiveImg(idx)}
                          className={`relative aspect-[16/10] rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                            isActive
                              ? 'border-brand-gold scale-[1.02] shadow-md shadow-brand-gold/25'
                              : 'border-transparent hover:border-brand-gold/40 opacity-70 hover:opacity-100'
                          } cursor-pointer`}
                        >
                          <SmartImg
                            src={img.src}
                            alt="thumbnail"
                            className="w-full h-full object-cover"
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Lightbox / Modal */}
              {galleryLightboxOpen && programImages[activeTab] && (
                <div
                  className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-[9999] flex items-center justify-center p-4 animate-in fade-in duration-300"
                  onClick={() => setGalleryLightboxOpen(false)}
                >
                  <div
                    className="relative max-w-5xl w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 shadow-2xl animate-in zoom-in-95 duration-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <SmartImg
                      src={programImages[activeTab][galleryActiveImg]?.src}
                      alt="Zoomed"
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Close button */}
                    <button
                      onClick={() => setGalleryLightboxOpen(false)}
                      className="absolute top-4 right-4 bg-black/60 hover:bg-black text-white p-2 rounded-full border border-white/10 transition-colors z-50 cursor-pointer text-xs font-bold px-3 py-1.5"
                    >
                      ✕
                    </button>

                    {/* Info overlay in lightbox */}
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 to-transparent p-6 text-white text-right">
                      <h5 className="text-base sm:text-lg font-bold text-brand-gold">
                        {currentLang === 'en' ? programImages[activeTab][galleryActiveImg]?.titleEn : programImages[activeTab][galleryActiveImg]?.titleAr}
                      </h5>
                      <p className="text-xs sm:text-sm text-slate-300 font-sans mt-1 leading-relaxed">
                        {currentLang === 'en' ? programImages[activeTab][galleryActiveImg]?.descEn : programImages[activeTab][galleryActiveImg]?.descAr}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>



      </div>
    </section>
  );
}
