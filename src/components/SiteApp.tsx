'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import ProgramCatalog from '@/components/ProgramCatalog';
import InitiativesSection from '@/components/InitiativesSection';
import AchievementsSection from '@/components/AchievementsSection';
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
import MaintenanceScreen from '@/components/MaintenanceScreen';
import LaunchOverlay from '@/components/LaunchOverlay';
import { scrollToSection } from '@/lib/scroll';
import { viewToPath, pathToView } from '@/lib/sections';
import { Language } from '@/types';
import { Sparkles } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface SiteAppProps {
  initialSection?: string;
  initialSub?: string;
}

export default function SiteApp({ initialSection = 'home', initialSub = '' }: SiteAppProps) {
  const [currentLang, setCurrentLang] = useState<Language>('ar');
  const [activeSection, setActiveSection] = useState<string>(initialSection);
  const [activeSubSection, setActiveSubSection] = useState<string>(initialSub);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [launchDone, setLaunchDone] = useState(false);
  const [preloaderOn, setPreloaderOn] = useState(true);
  const [maintenance, setMaintenance] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notifyMsgEn, setNotifyMsgEn] = useState('');
  const [notifyMsgAr, setNotifyMsgAr] = useState('');
  const [notifyMsgMs, setNotifyMsgMs] = useState('');

  useEffect(() => {
    const dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = currentLang;
  }, [currentLang]);

  // The preloader runs AFTER the launch intro finishes. If the preloader is
  // turned off from the dashboard, skip it entirely; otherwise show it then
  // dismiss after 3s max (safety net so it never hangs).
  useEffect(() => {
    if (!launchDone) return;
    if (!preloaderOn) { setIsLoading(false); return; }
    const t = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(t);
  }, [launchDone, preloaderOn]);

  // Guard: if the launch intro can't load/finish, hand off after 12s no matter what.
  useEffect(() => {
    const t = setTimeout(() => setLaunchDone(true), 12000);
    return () => clearTimeout(t);
  }, []);

  // Maintenance mode: if turned on from the dashboard, show the maintenance page to visitors.
  // Skipped inside the admin live-preview so editors can still preview content.
  useEffect(() => {
    const inPreview =
      typeof window !== 'undefined' &&
      (window.parent !== window || new URLSearchParams(window.location.search).get('preview') === '1');
    if (inPreview) return;
    fetch('/api/maintenance')
      .then((r) => r.json())
      .then((d) => setMaintenance(!!d.maintenance))
      .catch(() => {});
  }, []);

  // Back/forward buttons: sync the visible section to the URL path.
  useEffect(() => {
    const onPop = () => {
      const view = pathToView(window.location.pathname);
      setActiveSection(view.section);
      setActiveSubSection(view.sub || '');
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // Legacy deep-link: ?s=section&sub=subsection (kept for backward compatibility)
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

  // Show a confirmation after returning from Stripe Checkout (?payment=success|cancelled)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const status = new URLSearchParams(window.location.search).get('payment');
    if (status === 'success') {
      triggerBannerNotification(
        'Payment successful — thank you! A receipt has been emailed to you.',
        'تم الدفع بنجاح — جزاك الله خيراً! وصلك إيصال على بريدك.',
        'Pembayaran berjaya — terima kasih! Resit telah dihantar ke e-mel anda.'
      );
    } else if (status === 'cancelled') {
      triggerBannerNotification(
        'Payment was cancelled.',
        'تم إلغاء عملية الدفع.',
        'Pembayaran dibatalkan.'
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSectionChange = (sectionId: string, subSectionId: string = '') => {
    const isSameSection = activeSection === sectionId;
    setActiveSection(sectionId);
    setActiveSubSection(subSectionId);
    // Update the address bar to the section's real URL (shallow — no full reload).
    const inPreview =
      typeof window !== 'undefined' &&
      (window.parent !== window || new URLSearchParams(window.location.search).get('preview') === '1');
    if (!inPreview) {
      const path = viewToPath(sectionId, subSectionId);
      try { window.history.pushState(null, '', path); } catch { /* ignore */ }
    }
    if (!isSameSection) {
      setTimeout(() => scrollToSection(subSectionId || sectionId), 360);
    } else if (subSectionId) {
      scrollToSection(subSectionId);
    }
  };

  const handleExplorePrograms = () => handleSectionChange('programs', 'quran-circles');

  const handleAccessPortal = () => {
    handleSectionChange('finance', 'donate');
  };

  const handlePreloaderComplete = React.useCallback(() => setIsLoading(false), []);

  // Maintenance mode → show the trilingual maintenance page instead of the site.
  if (maintenance) {
    return <MaintenanceScreen />;
  }

  return (
    <>
      <LaunchOverlay
        currentLang={currentLang}
        onFinish={() => setLaunchDone(true)}
        onConfig={(c) => setPreloaderOn(c?.preloaderEnabled !== false)}
      />

      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-[100] pointer-events-auto"
          >
            <Preloader currentLang={currentLang} onComplete={handlePreloaderComplete} start={launchDone} />
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
              key={activeSection}
              id={activeSection}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.22, ease: 'easeInOut' }}
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
                    <AboutSection currentLang={currentLang} activeSub={activeSubSection || 'who-we-are'} onNavigate={handleSectionChange} />
                  )}
                </>
              )}
              {activeSection === 'programs' && (
                <ProgramCatalog currentLang={currentLang} activeSub={activeSubSection || 'quran-circles'} onSelectProgram={handleAccessPortal} onNavigate={handleSectionChange} />
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
                  {['annual-calendar', 'events-list'].includes(activeSubSection) ? (
                    <InitiativesSection currentLang={currentLang} activeSub={activeSubSection} onNavigate={handleSectionChange} />
                  ) : (
                    <MediaSection currentLang={currentLang} activeSub={activeSubSection || 'news'} onNavigate={handleSectionChange} />
                  )}
                </>
              )}
              {activeSection === 'support' && (
                <FormsSection
                  currentLang={currentLang}
                  sectionKey="support"
                  activeSub={activeSubSection}
                  onNavigate={handleSectionChange}
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
                  onNavigate={handleSectionChange}
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
                  includeCalculator={false}
                  onNavigate={handleSectionChange}
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
