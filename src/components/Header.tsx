'use client';
import React, { useState } from 'react';
import { Languages, Menu, X, LogIn, ChevronDown } from 'lucide-react';
import { Language } from '@/types';
const logoSrc = '/athar-logo-white.png';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  activeSection: string;
  activeSubSection: string;
  onSectionChange: (sectionId: string, subSectionId?: string) => void;
}

export interface NavItem {
  id: string;
  labelAr: string;
  labelEn: string;
  labelMs?: string;
  subItems?: { id: string; labelAr: string; labelEn: string; labelMs?: string; }[];
}

export const NAVIGATION_ITEMS: NavItem[] = [
  { id: 'home', labelAr: 'الرئيسية', labelEn: 'Home', labelMs: 'Laman Utama' },
  {
    id: 'about',
    labelAr: 'عن المؤسسة',
    labelEn: 'About Academy',
    labelMs: 'Tentang Kami',
    subItems: [
      { id: 'who-we-are', labelAr: 'من نحن', labelEn: 'Who We Are', labelMs: 'Siapa Kami' },
      { id: 'vision-mission', labelAr: 'الرؤية والرسالة', labelEn: 'Vision & Mission', labelMs: 'Visi & Misi' },
      { id: 'team', labelAr: 'فريق العمل', labelEn: 'Our Team', labelMs: 'Barisan Guru/Staf' },
      { id: 'partners', labelAr: 'شركاؤنا', labelEn: 'Our Partners', labelMs: 'Rakan Kerjasama' },
      { id: 'stats', labelAr: 'الإنجازات والأثر', labelEn: 'Achievements & Impact', labelMs: 'Pencapaian & Impak' },
      { id: 'faq', labelAr: 'الأسئلة الشائعة', labelEn: 'FAQ', labelMs: 'Soalan Lazim (FAQ)' },
    ]
  },
  {
    id: 'programs',
    labelAr: 'البرامج والتعليم',
    labelEn: 'Programs & Learning',
    labelMs: 'Program',
    subItems: [
      { id: 'quran-circles', labelAr: 'حلقات القرآن', labelEn: 'Quran Circles', labelMs: 'Halaqah Al-Quran' },
      { id: 'quran-sard', labelAr: 'السرد القرآني', labelEn: 'Quran Recital (Sard)', labelMs: 'Sard Al-Quran (Hafazan Lancar)' },
      { id: 'quran-ijazah', labelAr: 'الإجازات القرآنية', labelEn: 'Quranic Ijazat', labelMs: 'Ijazah Al-Quran' },
      { id: 'distance-learning', labelAr: 'التعليم عن بُعد', labelEn: 'Distance Learning', labelMs: 'Pembelajaran Jarak Jauh' },
      { id: 'training-courses', labelAr: 'الدورات التدريبية', labelEn: 'Training Courses', labelMs: 'Kursus Latihan' },
      { id: 'educational-camps', labelAr: 'المخيمات التربوية', labelEn: 'Educational Camps', labelMs: 'Kem Pendidikan' },
      { id: 'creators-of-tomorrow', labelAr: 'صُنّاع الغد', labelEn: 'Creators of Tomorrow', labelMs: 'Pencipta Hari Esok' },
    ]
  },
  {
    id: 'solutions',
    labelAr: 'التقنيات الذكية',
    labelEn: 'Smart Technologies',
    labelMs: 'Teknologi AI',
    subItems: [
      { id: 'ai-teacher', labelAr: 'المعلم الذكي', labelEn: 'Smart Teacher', labelMs: 'Guru AI Pintar' },
      { id: 'ayah-reflection', labelAr: 'آية وتأمل', labelEn: 'Ayah & Reflection', labelMs: 'Ayat & Renungan' },
      { id: 'fee-calculator', labelAr: 'حاسبة الرسوم', labelEn: 'Fee Estimator', labelMs: 'Kalkulator Yuran' },
    ]
  },
  {
    id: 'media',
    labelAr: 'المركز الإعلامي',
    labelEn: 'Media Center',
    labelMs: 'Media',
    subItems: [
      { id: 'news', labelAr: 'الأخبار والإعلانات', labelEn: 'News & Announcements', labelMs: 'Berita & Pengumuman' },
      { id: 'articles', labelAr: 'المقالات التربوية', labelEn: 'Educational Articles', labelMs: 'Artikel Pendidikan' },
      { id: 'digital-library', labelAr: 'المكتبة الرقمية', labelEn: 'Digital Library', labelMs: 'Perpustakaan Digital' },
      { id: 'gallery', labelAr: 'معرض الصور والفيديو', labelEn: 'Photo & Video Gallery', labelMs: 'Galeri Foto & Video' },
      { id: 'annual-calendar', labelAr: 'التقويم السنوي', labelEn: 'Annual Calendar', labelMs: 'Kalendar Tahunan' },
    ]
  },
  {
    id: 'support',
    labelAr: 'التطوع والدعم',
    labelEn: 'Support & Volunteer',
    labelMs: 'Sokongan',
    subItems: [
      { id: 'volunteer', labelAr: 'فرص التطوع', labelEn: 'Volunteering', labelMs: 'Peluang Sukarelawan' },
      { id: 'support-athar', labelAr: 'ادعم الأثر (الكفالات)', labelEn: 'Support Athar (Sponsoring)', labelMs: 'Sokong Athar (Penajaan)' },
      { id: 'initiatives-list', labelAr: 'المبادرات والمساعدات', labelEn: 'Initiatives & Grants', labelMs: 'Inisiatif & Bantuan' },
    ]
  },
  { id: 'contact', labelAr: 'تواصل معنا', labelEn: 'Contact Us', labelMs: 'Hubungi' }
];

const LANGUAGES = [
  { code: 'ar', label: 'العربية', nativeLabel: 'العربية' },
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'ms', label: 'Melayu', nativeLabel: 'Bahasa Melayu' }
] as const;

export default function Header({
  currentLang,
  onLanguageChange,
  activeSection,
  activeSubSection,
  onSectionChange
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const handleLanguageToggle = () => {
    if (currentLang === 'ar') {
      onLanguageChange('en');
    } else if (currentLang === 'en') {
      onLanguageChange('ms');
    } else {
      onLanguageChange('ar');
    }
  };

  const getLabel = (item: NavItem | { labelAr: string; labelEn: string; labelMs?: string }) => {
    if (currentLang === 'ms') return item.labelMs || item.labelEn;
    if (currentLang === 'en') return item.labelEn;
    return item.labelAr;
  };

  const menuClick = (sectionId: string, subSectionId?: string) => {
    onSectionChange(sectionId, subSectionId);
    setIsMobileMenuOpen(false);
    setExpandedMobileItem(null);
  };

  const toggleMobileSubMenu = (itemId: string) => {
    setExpandedMobileItem(expandedMobileItem === itemId ? null : itemId);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-brand-blue-dark/95 text-white shadow-lg backdrop-blur-md border-b border-brand-gold/20 select-none">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4">

          {/* Logo Section */}
          <div className="flex items-center gap-2 shrink-0 cursor-pointer" onClick={() => menuClick('home')}>
            <img src={logoSrc} alt="شعار أثر" className="h-12 w-auto object-contain" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2.5 whitespace-nowrap justify-center flex-nowrap shrink-0">
            {NAVIGATION_ITEMS.map((item) => {
              const hasSubs = !!item.subItems;
              const isActive = activeSection === item.id;

              if (hasSubs) {
                return (
                  <div key={item.id} className="relative group py-2">
                    <button
                      className={`flex items-center gap-1 px-2 xl:px-3 py-1.5 text-[11px] xl:text-xs font-semibold rounded-lg transition-all duration-300 cursor-pointer whitespace-nowrap ${
                        isActive
                          ? 'text-brand-gold bg-brand-blue-light/30 border border-brand-gold/40'
                          : 'text-white/80 hover:text-brand-gold hover:bg-brand-blue-light/10'
                      }`}
                    >
                      <span>{getLabel(item)}</span>
                      <ChevronDown className="h-3.5 w-3.5 opacity-60 transition-transform duration-300 group-hover:rotate-180" />
                    </button>

                    {/* Premium Dropdown Panel */}
                    <div className="absolute top-full right-0 rtl:left-0 rtl:right-auto mt-1 w-60 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform scale-95 origin-top-right group-hover:scale-100 z-50 bg-[#162944] border border-brand-gold/20 shadow-2xl rounded-xl p-1.5 backdrop-blur-md">
                      {item.subItems?.map((sub) => {
                        const isSubActive = activeSubSection === sub.id;
                        return (
                          <button
                            key={sub.id}
                            onClick={() => menuClick(item.id, sub.id)}
                            className={`block w-full text-right rtl:text-right ltr:text-left px-3.5 py-2.5 text-xs rounded-lg transition-colors cursor-pointer ${
                              isSubActive
                                ? 'bg-brand-gold text-brand-blue-dark font-bold'
                                : 'text-white/90 hover:bg-brand-blue-light/20 hover:text-brand-gold'
                            }`}
                          >
                            {getLabel(sub)}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => menuClick(item.id)}
                  className={`px-2 xl:px-3 py-1.5 text-[11px] xl:text-xs font-semibold rounded-lg transition-all duration-300 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'text-brand-gold bg-brand-blue-light/30 border border-brand-gold/40'
                      : 'text-white/80 hover:text-brand-gold hover:bg-brand-blue-light/10'
                  }`}
                >
                  {getLabel(item)}
                </button>
              );
            })}
          </nav>

          {/* Actions Menu */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3.5 shrink-0">
            {/* Language Switch Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center gap-1.5 bg-brand-blue-light/20 border border-brand-gold/30 rounded-full px-3 py-1.5 text-[10px] font-semibold text-brand-gold hover:bg-brand-gold hover:text-brand-blue-dark transition-all duration-300 cursor-pointer"
                title={currentLang === 'ms' ? 'Tukar Bahasa' : currentLang === 'en' ? 'Switch Language' : 'تغيير اللغة'}
              >
                <Languages className="h-3.5 w-3.5" />
                <span>
                  {currentLang === 'ms' ? 'Melayu' : currentLang === 'en' ? 'English' : 'العربية'}
                </span>
                <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isLangDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsLangDropdownOpen(false)}
                  />
                  <div className="absolute top-full mt-1.5 w-36 bg-[#162944] border border-brand-gold/20 shadow-2xl rounded-xl p-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200 ltr:right-0 rtl:left-0">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          onLanguageChange(lang.code);
                          setIsLangDropdownOpen(false);
                        }}
                        className={`block w-full text-right rtl:text-right ltr:text-left px-3 py-2 text-xs rounded-lg transition-colors cursor-pointer ${
                          currentLang === lang.code
                            ? 'bg-brand-gold text-brand-blue-dark font-bold'
                            : 'text-white/90 hover:bg-brand-blue-light/20 hover:text-brand-gold'
                        }`}
                      >
                        {lang.nativeLabel}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* External Platform Login Button */}
            <a
              href="https://atharacademy.info/platform/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-gradient-to-r from-brand-gold to-brand-gold-dark hover:from-brand-gold-light hover:to-brand-gold text-brand-blue-dark font-bold text-[11px] px-4.5 py-2.5 rounded-full transition-all duration-300 uppercase tracking-wider shadow-md hover:scale-105 font-sans"
            >
              <LogIn className="h-4 w-4" />
              <span>
                {currentLang === 'ms' ? 'Log Masuk' : currentLang === 'en' ? 'Login' : 'تسجيل الدخول'}
              </span>
            </a>
          </div>

          {/* Smartphone Menu toggle */}
          <div className="flex items-center gap-2 lg:hidden shrink-0">
            {/* Quick Lang Switch */}
            <button
              onClick={handleLanguageToggle}
              className="bg-brand-blue-light/40 text-brand-gold p-2 rounded-full border border-brand-gold/20 cursor-pointer flex items-center justify-center gap-1"
              title={currentLang === 'ms' ? 'Tukar Bahasa' : currentLang === 'en' ? 'Switch Language' : 'تغيير اللغة'}
            >
              <Languages className="h-4.5 w-4.5" />
              <span className="text-[10px] font-bold">
                {currentLang === 'ms' ? 'MS' : currentLang === 'en' ? 'EN' : 'AR'}
              </span>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2 hover:bg-brand-blue-light/40 rounded-md cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Box */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#162944] border-t border-brand-gold/15 max-h-[85vh] overflow-y-auto px-4 pt-2 pb-6 space-y-4 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="space-y-1">
            {NAVIGATION_ITEMS.map((item) => {
              const hasSubs = !!item.subItems;
              const isActive = activeSection === item.id;
              const isExpanded = expandedMobileItem === item.id;

              if (hasSubs) {
                return (
                  <div key={item.id} className="space-y-0.5 border-b border-white/5 pb-1">
                    <button
                      onClick={() => toggleMobileSubMenu(item.id)}
                      className={`flex items-center justify-between w-full px-4 py-3 rounded-lg text-sm transition-all ${
                        isActive
                          ? 'text-brand-gold font-bold bg-brand-blue-light/20'
                          : 'text-white/80 hover:bg-brand-blue-light/10'
                      }`}
                    >
                      <span>{getLabel(item)}</span>
                      <ChevronDown className={`h-4.5 w-4.5 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-brand-gold' : 'opacity-65'}`} />
                    </button>

                    {isExpanded && (
                      <div className="bg-brand-blue-dark/50 border border-brand-gold/10 rounded-lg py-1.5 px-2.5 mt-1 space-y-0.5 animate-in slide-in-from-top-2 duration-200">
                        {item.subItems?.map((sub) => {
                          const isSubActive = activeSubSection === sub.id;
                          return (
                            <button
                              key={sub.id}
                              onClick={() => menuClick(item.id, sub.id)}
                              className={`block w-full text-right rtl:text-right ltr:text-left px-4 py-2.5 text-xs rounded-md transition-colors ${
                                isSubActive
                                  ? 'bg-brand-gold text-brand-blue-dark font-bold'
                                  : 'text-white/80 hover:bg-brand-blue-light/20 hover:text-brand-gold'
                              }`}
                            >
                              {getLabel(sub)}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => menuClick(item.id)}
                  className={`block w-full text-right rtl:text-right ltr:text-left px-4 py-3 rounded-lg text-sm transition-all border-b border-white/5 ${
                    isActive
                      ? 'text-brand-gold font-bold bg-brand-blue-light/20'
                      : 'text-white/80 hover:bg-brand-blue-light/10'
                  }`}
                >
                  {getLabel(item)}
                </button>
              );
            })}
          </div>

          {/* Mobile Direct External Login Redirect */}
          <div className="pt-4 border-t border-brand-gold/20">
            <a
              href="https://atharacademy.info/platform/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-brand-gold to-brand-gold-dark text-brand-blue-dark hover:bg-brand-gold-light w-full py-3.5 rounded-full font-bold text-sm shadow-md transition-all duration-300 font-sans"
            >
              <LogIn className="h-4.5 w-4.5" />
              <span>
                {currentLang === 'ms' ? 'Log Masuk Platform' : currentLang === 'en' ? 'Login to Platform' : 'تسجيل الدخول للمنصة'}
              </span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
