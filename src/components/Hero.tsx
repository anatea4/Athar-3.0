'use client';
import React, { useState, useEffect } from 'react';
import {
  Sparkles, ArrowRight, ArrowLeft, Award, BookOpen, Users, Clock,
  ShieldCheck, HeartHandshake, Smartphone, GraduationCap
} from 'lucide-react';
import { Language } from '@/types';
const logoSrc = '/athar-logo.png';

interface HeroProps {
  currentLang: Language;
  onExplorePrograms: () => void;
  onAccessPortal: () => void;
}

// Beautiful high-fidelity image slide collection of Athar Quran Academy
const CAROUSEL_SLIDES = [
  {
    id: 'slide-1',
    image: 'https://images.unsplash.com/photo-1609599006353-e629f1d40e39?auto=format&fit=crop&q=80&w=800',
    titleEn: 'Sanctuaries of Recitation',
    titleAr: 'مقارئ الـذكـر الحكيم',
    titleMs: 'Halaqah Tilawah Al-Quran',
    descEn: 'Authentic Quranic memorization under preeminent scholars with high connected Sanad.',
    descAr: 'حلقات ممتدة لحفظ القرآن وضبطه غيباً تحت إشراف نخبة من القراء والمقرئات مجازين بالسند المتصل.',
    descMs: 'Hafazan Al-Quran sahih di bawah bimbingan para ulama terkemuka dengan Sanad yang tinggi bersambung.',
  },
  {
    id: 'slide-2',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=800',
    titleEn: 'Spiritual Legacy',
    titleAr: 'أنـوار العلوم والتربية بالأثر',
    titleMs: 'Warisan Kerohanian',
    descEn: 'Foundational Islamic studies to nurture character and leave a lasting legacy (Athar).',
    descAr: 'حلقات ومناهج علمية تأصيلية ترتكز على هدي السلف الصالح لترك أثر سليم باقٍ في الفؤاد.',
    descMs: 'Pengajian Islam asas untuk memupuk akhlak mulia dan meninggalkan warisan soleh yang berterusan (Athar).',
  },
  {
    id: 'slide-3',
    image: 'https://images.unsplash.com/photo-1597935258735-e254c1839512?auto=format&fit=crop&q=80&w=800',
    titleEn: 'Eloquent Early Prep',
    titleAr: 'حلقة نور البينات للأطفال والبراعم',
    titleMs: 'Persediaan Awal Kefasihan',
    descEn: 'Building eloquence and correct Quran pronunciation utilizing classic Nooras Arabic method.',
    descAr: 'تأسيس فصاحة اللسان للأطفال الصغار وضبط مخارج الحروف الهجائية وقراءتها بالقاعدة النورانية.',
    descMs: 'Membina kefasihan dan sebutan Al-Quran yang betul menggunakan kaedah klasik Qaida Noorania.',
  }
];

export default function Hero({ currentLang, onExplorePrograms, onAccessPortal }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto play rotation every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev === 0 ? CAROUSEL_SLIDES.length - 1 : prev - 1));
  };

  const handleNextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
  };

  const stats = [
    {
      id: 'stat-1',
      icon: <Users className="h-6 w-6 text-brand-blue" />,
      number: '1,240+',
      labelEn: 'Active Students',
      labelAr: 'طالباً وطالبة نشطين',
      labelMs: 'Pelajar Aktif',
      color: 'border-brand-gold/20 bg-white/95'
    },
    {
      id: 'stat-2',
      icon: <Award className="h-6 w-6 text-brand-blue" />,
      number: '48',
      labelEn: 'Certified Huffaz Teach',
      labelAr: 'شيوخ ومعلمات مجازين بالسند',
      labelMs: 'Guru Huffaz Bertauliah Sanad',
      color: 'border-brand-gold/20 bg-white/95'
    },
    {
      id: 'stat-3',
      icon: <BookOpen className="h-6 w-6 text-brand-blue" />,
      number: '124,000+',
      labelEn: 'Recited Quran Hours',
      labelAr: 'ساعات تسميع مقطوعة',
      labelMs: 'Jam Bacaan Al-Quran',
      color: 'border-brand-gold/20 bg-white/95'
    },
    {
      id: 'stat-4',
      icon: <Clock className="h-6 w-6 text-brand-blue" />,
      number: '100%',
      labelEn: 'Online & Physical flex',
      labelAr: 'حلقات حضورية وعن بعد',
      labelMs: 'Fleksibiliti Fizikal & Online',
      color: 'border-brand-gold/20 bg-white/95'
    }
  ];


  return (
    <section id="home" className="relative bg-brand-sand text-slate-800 overflow-hidden py-16 sm:py-24 border-b border-brand-gold/20 select-none">

      {/* Decorative Islamic Geometric Pattern Overlay */}
      <div className="absolute inset-0 islamic-pattern opacity-40 pointer-events-none" />

      {/* Elegant, Soft Islamic Arches & Quran Manuscript watermark background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.07] pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1609599006353-e629f1d40e39?auto=format&fit=crop&q=80&w=1200")'
        }}
      />

      {/* Radial Gradient Glowing Lights */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-gold-light/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Hero Main Copy */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left rtl:lg:text-right space-y-6">

            {/* Elegant Small Badge */}
            <div className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-brand-gold/10 border border-brand-gold/30 rounded-full px-3 py-1 text-brand-gold shadow-sm animate-pulse">
              <img src={logoSrc} alt="logo" className="h-5 w-5 object-contain rounded-full bg-white/95 p-0.5 border border-brand-gold/25" />
              <span className="text-xs font-semibold uppercase tracking-wider font-sans">
                {currentLang === 'ms' ? 'Rasmi Akademi Athar' : currentLang === 'en' ? 'Athar Academy Official' : 'أكاديمية أثر الرسمية'}
              </span>
            </div>

            <div className="space-y-4 max-w-2xl border-brand-gold ltr:border-l-4 ltr:pl-6 rtl:border-r-4 rtl:pr-6 text-left rtl:text-right">
              <h1 className="text-4xl sm:text-5xl lg:text-4xl xl:text-5xl font-extrabold tracking-tight leading-none text-brand-blue-dark">
                {currentLang === 'ms' ? (
                  <>Akademi Athar mementingkan pengajaran Al-Quran, Bahasa Arab, dan Sains Islam dengan penuh dedikasi.</>
                ) : currentLang === 'en' ? (
                  <>Athar Academy teaches the Holy Quran, Arabic, and Islamic sciences with care.</>
                ) : (
                  <>أكاديمية أثر تهتم بتعليم القرآن الكريم وعلومه واللغة العربية.</>
                )}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 font-sans leading-relaxed">
                {currentLang === 'ms'
                  ? 'Kami menyediakan program hafazan Al-Quran, Tajwid, Bahasa Arab, dan pengajian Islam yang diiktiraf dengan sokongan akademik serta persekitaran yang membina.'
                  : currentLang === 'en'
                    ? 'We provide certified Quran memorization, Tajweed, Arabic language, and Islamic studies programs with real academic support and a nurturing environment.'
                    : 'نقدم برامج معتمدة في تحفيظ القرآن والتجويد واللغة العربية والعلوم الشرعية، مع متابعة تربوية وأسلوب تعليمي رفيع.'}
              </p>
            </div>

            {/* Call To Actions Buttons */}
            <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4 pt-2">
              <button
                onClick={onExplorePrograms}
                className="flex items-center justify-center bg-gradient-to-r from-brand-blue to-brand-blue-light hover:from-brand-blue-light hover:to-brand-blue text-white font-bold px-8 py-4 rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-brand-blue/20 cursor-pointer"
              >
                <span>{currentLang === 'ms' ? 'Lihat Program Pendaftaran' : currentLang === 'en' ? 'Browse Enrollment Programs' : 'عرض برامج التسجيل'}</span>
                {currentLang === 'ar' ? (
                  <ArrowLeft className="h-5 w-5 mr-2 ltr:hidden" />
                ) : (
                  <ArrowRight className="h-5 w-5 ml-2 rtl:hidden" />
                )}
              </button>

              <button
                onClick={onAccessPortal}
                className="flex items-center justify-center bg-white hover:bg-brand-gold-light/20 text-brand-blue-dark border border-brand-gold/30 font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:border-brand-gold cursor-pointer"
              >
                <span>{currentLang === 'ms' ? 'Buka Portal Pelajar' : currentLang === 'en' ? 'Open Student Portal' : 'الدخول للبوابة'}</span>
              </button>
            </div>

          </div>

          {/* Hero Premium Carousel Slide (Right) */}
          <div className="lg:col-span-6 flex justify-center items-center w-full">
            <div className="relative w-full max-w-xl bg-white border border-brand-gold/25 rounded-3xl overflow-hidden shadow-xl group flex flex-col h-[460px]">

              {/* Slide Images & Overlays */}
              <div className="relative w-full flex-grow overflow-hidden select-none">
                {CAROUSEL_SLIDES.map((slide, idx) => {
                  const isActive = idx === currentSlide;
                  return (
                    <div
                      key={slide.id}
                      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isActive ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                        }`}
                    >
                      {/* Background Unsplash Image */}
                      <img
                        src={slide.image}
                        alt={currentLang === 'ms' ? (slide.titleMs || slide.titleEn) : (currentLang === 'en' ? slide.titleEn : slide.titleAr)}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover select-none transition-transform duration-[10000ms] ease-out group-hover:scale-105"
                      />
                      {/* Rich Dark Gradient on bottom for text legibility */}
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-dark via-brand-blue-dark/50 to-transparent" />

                      {/* Floating Indicator Logo / Badge */}
                      <div className="absolute top-4 right-4 bg-brand-blue-dark/80 backdrop-blur-md px-3 py-1 rounded-full border border-brand-gold/30 flex items-center justify-center gap-1.5">
                        <img src={logoSrc} alt="logo" className="h-4 w-4 object-contain rounded-full bg-white/90 p-0.5" />
                        <span className="text-[10px] text-brand-gold tracking-widest uppercase font-semibold">
                          {currentLang === 'ms' ? 'PANDANGAN ATHAR' : currentLang === 'en' ? 'ATHAR SCENE' : 'مَشهَد الأَثَـر'}
                        </span>
                      </div>

                      {/* Slide Caption Box */}
                      <div className="absolute bottom-6 inset-x-5 text-center sm:text-left rtl:sm:text-right space-y-1.5">
                        <span className="block text-lg sm:text-xl font-bold tracking-wide text-brand-gold-light leading-snug drop-shadow-md">
                          {currentLang === 'ms' ? (slide.titleMs || slide.titleEn) : (currentLang === 'en' ? slide.titleEn : slide.titleAr)}
                        </span>
                        <p className="text-[11px] sm:text-xs text-slate-100 font-sans leading-relaxed drop-shadow">
                          {currentLang === 'ms' ? (slide.descMs || slide.descEn) : (currentLang === 'en' ? slide.descEn : slide.descAr)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Slider Control Action Bar */}
              <div className="bg-brand-blue-dark border-t border-brand-gold/25 p-4 flex items-center justify-between">
                {/* Dots indicators */}
                <div className="flex space-x-1.5 rtl:space-x-reverse">
                  {CAROUSEL_SLIDES.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${idx === currentSlide ? 'w-5 bg-brand-gold' : 'w-2 bg-brand-gold/30 hover:bg-brand-gold/50'
                        }`}
                      aria-label={`Slide ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Left/Right controls */}
                <div className="flex gap-2.5">
                  <button
                    onClick={handlePrevSlide}
                    className="h-8 w-8 rounded-full border border-brand-gold/35 text-brand-gold hover:bg-brand-gold hover:text-white flex items-center justify-center transition-all duration-300 transform hover:scale-105 active:scale-95 shadow cursor-pointer focus:outline-none"
                    title={currentLang === 'ms' ? 'Sebelumnya' : currentLang === 'en' ? 'Previous' : 'السابق'}
                  >
                    {currentLang === 'ar' ? (
                      <ArrowRight className="h-4 w-4" />
                    ) : (
                      <ArrowLeft className="h-4 w-4" />
                    )}
                  </button>

                  <button
                    onClick={handleNextSlide}
                    className="h-8 w-8 rounded-full border border-brand-gold/35 text-brand-gold hover:bg-brand-gold hover:text-white flex items-center justify-center transition-all duration-300 transform hover:scale-105 active:scale-95 shadow cursor-pointer focus:outline-none"
                    title={currentLang === 'ms' ? 'Seterusnya' : currentLang === 'en' ? 'Next' : 'التالي'}
                  >
                    {currentLang === 'ar' ? (
                      <ArrowLeft className="h-4 w-4" />
                    ) : (
                      <ArrowRight className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Dynamic Numerical Statistics Bar - Grid Layout */}
        <div className="mt-16 pt-8 border-t border-brand-gold/15">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className={`flex flex-col items-center justify-center p-5 rounded-2xl border ${stat.color} transition-all duration-300 hover:scale-[1.03] text-center shadow-md`}
              >
                <div className="p-3 bg-brand-sand rounded-full border border-brand-gold/20 mb-3">
                  {stat.icon}
                </div>
                <span className="text-2xl sm:text-3xl font-extrabold text-brand-blue-dark font-sans tracking-tight">
                  {stat.number}
                </span>
                <span className="text-xs text-slate-600 font-sans font-medium mt-1">
                  {currentLang === 'ms' ? (stat.labelMs || stat.labelEn) : (currentLang === 'en' ? stat.labelEn : stat.labelAr)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Core Educational Pillars Section - Polished Bento Style */}
        <div className="mt-24 pt-16 border-t border-brand-gold/15">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 animate-in fade-in duration-1000">
            <div className="inline-flex items-center space-x-1.5 rtl:space-x-reverse text-brand-gold-dark">
              <Sparkles className="h-4.5 w-4.5 animate-pulse text-brand-gold" />
              <span className="text-xs uppercase tracking-widest font-semibold">
                {currentLang === 'ms' ? 'METODOLOGI KAMI' : currentLang === 'en' ? 'OUR METHODOLOGY' : 'منهجية الأثر التربوية'}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-blue-dark tracking-tight">
              {currentLang === 'ms' ? 'Rangkaian Teras Pendidikan Kami' : currentLang === 'en' ? 'Our Core Educational Pillars' : 'ركائز التميز في أكاديمية أثر'}
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed font-sans">
              {currentLang === 'ms'
                ? 'Kami tidak hanya tertumpu kepada hafazan semata-mata; kami membina hubungan berterusan dengan Al-Quran dan memupuk akhlak Islam yang mulia.'
                : currentLang === 'en'
                  ? 'We do not focus on mindless memorization; we build a lifelong connection to the Holy Quran and noble Islamic character.'
                  : 'لسنا مجرد مقرأة تعتمد التلقين الآلي الحرفي، بل نسعى لبناء جيل يعيش بهداية القرآن وعياً وعقيدة وسلوكاً باقٍ الأثر.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                id: 'pillar-1',
                icon: <ShieldCheck className="h-6 w-6 text-brand-gold-dark" />,
                img: 'https://images.unsplash.com/photo-1584281729059-3d5a7ab24934?auto=format&fit=crop&q=80&w=400',
                titleEn: 'Connected Sanad Licensure',
                titleAr: 'الإسناد المتصل بالرحاب النبوية',
                titleMs: 'Pentauliahan Sanad Bersambung',
                descEn: 'Authentic recitation assessment (Ijazah) with uninterrupted lines back to the Prophet ﷺ under international certified judges.',
                descAr: 'عرض الختمة كاملة في المقارئ الفردية لنيل الإجازة بالسند المتصل إلى غاية المعصوم ﷺ بروايات متعددة مع ضبط مخارج الأداء.',
                descMs: 'Penilaian bacaan Al-Quran (Ijazah) dengan rantaian riwayat yang tidak terputus kembali kepada Rasulullah ﷺ di bawah bimbingan para qari bertauliah antarabangsa.'
              },
              {
                id: 'pillar-2',
                icon: <HeartHandshake className="h-6 w-6 text-brand-gold-dark" />,
                img: 'https://images.unsplash.com/photo-1590076215667-87373f82cb38?auto=format&fit=crop&q=80&w=400',
                titleEn: 'Ethics & Behavioral Athar',
                titleAr: 'التربية بالقيم وبناء الأثر الطيب',
                titleMs: 'Akhlak & Athar Tingkah Laku',
                descEn: 'Focusing on the practical behavioral impact of verses, nurturing noble prophetic manners alongside memorization.',
                descAr: 'لا نرتضي للمحفظ حفظ اللوح غيباً فحسب، بل يصاحب تسميعه اليومي دروس سلوكية عملية تضفي جمال الأخلاق وصلاح السيرة في واقع الحياة.',
                descMs: 'Menumpukan kepada kesan praktikal ayat-ayat Al-Quran terhadap tingkah laku, memupuk adab kenabian yang mulia di samping hafazan.'
              },
              {
                id: 'pillar-3',
                icon: <Smartphone className="h-6 w-6 text-brand-gold-dark" />,
                img: 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80&w=400',
                titleEn: 'Instant Live Parent Portal',
                titleAr: 'المزامنة الفورية وأثر المتابعة',
                titleMs: 'Portal Ibu Bapa Serta-Merta',
                descEn: 'A high-fidelity parent sync board enabling live lesson listening, advisor note verification, and seamless milestone progress checking.',
                descAr: 'بوابة تفاعلية حية تمكن أولياء الأمور من سماع ريكورد التسميع الصوتي لأولادهم، وتتبع التقييم المباشر ودرجات الحفظ والتسميع يوماً بيوم.',
                descMs: 'Satu platform pemantauan ibu bapa yang membolehkan mendengar bacaan pelajar secara langsung, menyemak ulasan guru, dan melihat laporan kemajuan.'
              },
              {
                id: 'pillar-4',
                icon: <GraduationCap className="h-6 w-6 text-brand-gold-dark" />,
                img: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=400',
                titleEn: 'Theological Foundation Study',
                titleAr: 'التأصيل العلمي والوعي الفكري',
                titleMs: 'Pengajian Asas Syariah',
                descEn: 'Complementary simplified classes in Tajweed theory, Nawawi Hadiths, prophetic biography, and essential jurisprudence.',
                descAr: 'تلقين الناشئة والشباب أصول العلوم العقدية والحديثية النبوية والفقه الميسر، بجانب ترسيخ قيم الأمن الفكري في مواجهة الشبهات المعاصرة.',
                descMs: 'Kelas tambahan ringkas mengenai teori Tajwid, Himpunan Hadis 40 Al-Nawawi, sirah nabi, dan fikah ibadat asas.'
              }
            ].map((p) => (
              <div
                key={p.id}
                className="bg-white border border-brand-gold/15 rounded-3xl overflow-hidden hover:border-brand-gold hover:shadow-brand-gold/10 hover:shadow-lg transition-all duration-300 flex flex-col justify-between text-left rtl:text-right group h-full shadow-sm"
              >
                {/* Visual Thumbnail Image */}
                <div className="h-36 w-full overflow-hidden relative">
                  <img
                    src={p.img}
                    alt={currentLang === 'ms' ? (p.titleMs || p.titleEn) : (currentLang === 'en' ? p.titleEn : p.titleAr)}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                  {/* Absolute Floating Icon Over Image */}
                  <div className="absolute bottom-3 left-3 rtl:left-auto rtl:right-3 p-2 bg-white rounded-xl shadow-md border border-brand-gold/20 text-brand-gold-dark">
                    {p.icon}
                  </div>
                </div>

                <div className="p-5.5 space-y-2.5 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-brand-blue-dark leading-snug">
                      {currentLang === 'ms' ? (p.titleMs || p.titleEn) : (currentLang === 'en' ? p.titleEn : p.titleAr)}
                    </h3>
                    <p className="text-slate-600 text-xs font-sans leading-relaxed mt-2">
                      {currentLang === 'ms' ? (p.descMs || p.descEn) : (currentLang === 'en' ? p.descEn : p.descAr)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
