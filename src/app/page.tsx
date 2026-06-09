'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import ProgramCatalog from '@/components/ProgramCatalog';
import InitiativesSection from '@/components/InitiativesSection';
import AchievementsSection from '@/components/AchievementsSection';
import SupportSection from '@/components/SupportSection';
import MediaSection from '@/components/MediaSection';
import ContactSection from '@/components/ContactSection';
import FAQ from '@/components/FAQ';
import DailyAyah from '@/components/DailyAyah';
import AICompanion from '@/components/AICompanion';
import FeeCalculator from '@/components/FeeCalculator';
import Footer from '@/components/Footer';
import FloatingChatbot from '@/components/FloatingChatbot';
import WhatsAppButton from '@/components/WhatsAppButton';
import FormsSection from '@/components/FormsSection';
import Preloader from '@/components/Preloader';
import { Language } from '@/types';
import { Sparkles } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('ar');
  const [activeSection, setActiveSection] = useState<string>('home');
  const [activeSubSection, setActiveSubSection] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showNotification, setShowNotification] = useState(false);
  const [notifyMsgEn, setNotifyMsgEn] = useState('');
  const [notifyMsgAr, setNotifyMsgAr] = useState('');
  const [notifyMsgMs, setNotifyMsgMs] = useState('');

  useEffect(() => {
    const dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = currentLang;
  }, [currentLang]);

  // Read ?s=section&sub=subsection from the URL (used when arriving from a custom page's navbar)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const s = params.get('s');
    const sub = params.get('sub');
    if (s) {
      setActiveSection(s);
      setActiveSubSection(sub || '');
      setIsLoading(false);
    }
  }, []);

  // Live-preview mode (inside admin iframe): skip preloader + react to nav/lang messages
  useEffect(() => {
    const isPreview =
      typeof window !== 'undefined' &&
      (window.parent !== window || new URLSearchParams(window.location.search).get('preview') === '1');
    if (isPreview) setIsLoading(false);

    function onMessage(e: MessageEvent) {
      const msg = e.data;
      if (!msg) return;
      if (msg.type === 'athar-preview-nav') {
        if (msg.section) setActiveSection(msg.section);
        setActiveSubSection(msg.subSection || '');
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      }
      if (msg.type === 'athar-preview-lang' && msg.lang) {
        setCurrentLang(msg.lang);
      }
    }
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  const triggerBannerNotification = (msgEn: string, msgAr: string, msgMs: string = '') => {
    setNotifyMsgEn(msgEn);
    setNotifyMsgAr(msgAr);
    setNotifyMsgMs(msgMs || msgEn);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 4500);
  };

  const handleSectionChange = (sectionId: string, subSectionId: string = '') => {
    setActiveSection(sectionId);
    setActiveSubSection(subSectionId);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  const handleExplorePrograms = () => handleSectionChange('programs', 'quran-circles');

  const handleAccessPortal = () => {
    window.open('https://atharacademy.info/platform/', '_blank', 'noopener,noreferrer');
    triggerBannerNotification(
      'Opening the official Athar Academy login platform...',
      'جاري توجيهك إلى منصة تسجيل الدخول لأكاديمية أثر...',
      'Membuka platform log masuk rasmi Akademi Athar...'
    );
  };

  const handlePreloaderComplete = React.useCallback(() => setIsLoading(false), []);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-[100] pointer-events-auto"
          >
            <Preloader currentLang={currentLang} onComplete={handlePreloaderComplete} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-brand-sand font-sans relative flex flex-col justify-between selection:bg-brand-gold/30">
        {showNotification && (
          <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 max-w-sm sm:max-w-md w-[90%] bg-brand-blue border-2 border-brand-gold rounded-2xl shadow-2xl p-4 text-white text-left rtl:text-right flex items-start gap-3.5 animate-in fade-in slide-in-from-top-6 duration-300">
            <div className="p-2 bg-brand-gold/20 text-brand-gold rounded-full shrink-0">
              <Sparkles className="h-4 w-4 animate-spin" />
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] text-brand-gold font-bold uppercase tracking-wider block">
                {currentLang === 'ms' ? 'Amaran Sistem Langsung' : currentLang === 'en' ? 'Live System Alert' : 'تنبيه من نظام أثـر'}
              </span>
              <p className="text-xs font-semibold leading-relaxed">
                {currentLang === 'ms' ? notifyMsgMs : currentLang === 'en' ? notifyMsgEn : notifyMsgAr}
              </p>
            </div>
          </div>
        )}

        <Header
          currentLang={currentLang}
          onLanguageChange={setCurrentLang}
          activeSection={activeSection}
          activeSubSection={activeSubSection}
          onSectionChange={handleSectionChange}
        />

        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeSection}-${activeSubSection}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
            >
              {activeSection === 'home' && (
                <Hero currentLang={currentLang} onExplorePrograms={handleExplorePrograms} onAccessPortal={handleAccessPortal} />
              )}
              {activeSection === 'about' && (
                <>
                  {activeSubSection === 'stats' ? (
                    <AchievementsSection currentLang={currentLang} activeSub="stats" />
                  ) : activeSubSection === 'faq' ? (
                    <FAQ currentLang={currentLang} />
                  ) : (
                    <AboutSection currentLang={currentLang} activeSub={activeSubSection || 'who-we-are'} />
                  )}
                </>
              )}
              {activeSection === 'programs' && (
                <ProgramCatalog currentLang={currentLang} activeSub={activeSubSection || 'quran-circles'} onSelectProgram={handleAccessPortal} />
              )}
              {activeSection === 'solutions' && (
                <>
                  {activeSubSection === 'ayah-reflection' ? (
                    <DailyAyah currentLang={currentLang} />
                  ) : activeSubSection === 'fee-calculator' ? (
                    <FeeCalculator currentLang={currentLang} />
                  ) : (
                    <AICompanion currentLang={currentLang} />
                  )}
                </>
              )}
              {activeSection === 'media' && (
                <>
                  {activeSubSection === 'annual-calendar' ? (
                    <InitiativesSection currentLang={currentLang} activeSub="annual-calendar" />
                  ) : (
                    <MediaSection currentLang={currentLang} activeSub={activeSubSection || 'news'} />
                  )}
                </>
              )}
              {activeSection === 'support' && (
                <FormsSection
                  currentLang={currentLang}
                  sectionKey="support"
                  activeSub={activeSubSection}
                  headingAr="المشاركة والدعم"
                  headingEn="Participate & Support"
                  headingMs="Sertai & Sokong"
                  subAr="كن جزءاً من رسالة أكاديمية أثر — تطوّع أو انضم لفريق السفراء."
                  subEn="Be part of the Athar Academy mission — volunteer or join the ambassadors."
                />
              )}
              {activeSection === 'admission' && (
                <FormsSection
                  currentLang={currentLang}
                  sectionKey="admission"
                  activeSub={activeSubSection}
                  headingAr="القبول والتسجيل"
                  headingEn="Admission & Registration"
                  headingMs="Kemasukan & Pendaftaran"
                  subAr="سجّل في الحلقات والبرامج أو قدّم طلب توظيف — عبّئ النموذج المناسب وسنتواصل معك."
                  subEn="Register for circles and programs, or apply to join our team."
                />
              )}
              {activeSection === 'finance' && (
                <FormsSection
                  currentLang={currentLang}
                  sectionKey="finance"
                  activeSub={activeSubSection}
                  includeCalculator
                  headingAr="التبرعات والرسوم"
                  headingEn="Donations & Fees"
                  headingMs="Derma & Yuran"
                  subAr="ادعم الأكاديمية بتبرعك، أو سدّد الرسوم، أو احسب تكلفة الاشتراك."
                  subEn="Support the academy, pay fees, or estimate subscription costs."
                />
              )}
              {activeSection === 'contact' && <ContactSection currentLang={currentLang} />}
            </motion.div>
          </AnimatePresence>
        </main>

        <Footer currentLang={currentLang} />
        <FloatingChatbot currentLang={currentLang} />
        <WhatsAppButton currentLang={currentLang} />
      </div>
    </>
  );
}
