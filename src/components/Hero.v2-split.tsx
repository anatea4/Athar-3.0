'use client';
import React, { useState, useEffect } from 'react';
import {
  Sparkles, ArrowRight, ArrowLeft, Award, BookOpen, Users, Clock,
  ShieldCheck, HeartHandshake, Smartphone, GraduationCap
} from 'lucide-react';
import { Language } from '@/types';
import { useHero } from '@/lib/content-provider';
import SmartImg from '@/components/SmartImg';
const logoSrc = '/athar-logo.png';

interface HeroProps {
  currentLang: Language;
  onExplorePrograms: () => void;
  onAccessPortal: () => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Users: <Users className="h-6 w-6 text-brand-blue" />,
  Award: <Award className="h-6 w-6 text-brand-blue" />,
  BookOpen: <BookOpen className="h-6 w-6 text-brand-blue" />,
  Clock: <Clock className="h-6 w-6 text-brand-blue" />,
  ShieldCheck: <ShieldCheck className="h-6 w-6 text-brand-gold-dark" />,
  HeartHandshake: <HeartHandshake className="h-6 w-6 text-brand-gold-dark" />,
  Smartphone: <Smartphone className="h-6 w-6 text-brand-gold-dark" />,
  GraduationCap: <GraduationCap className="h-6 w-6 text-brand-gold-dark" />,
};

const pickLang = (obj: any, field: string, lang: Language): string => {
  if (!obj) return '';
  if (lang === 'ms') return obj[`${field}Ms`] || obj[`${field}En`] || '';
  if (lang === 'en') return obj[`${field}En`] || obj[`${field}Ar`] || '';
  return obj[`${field}Ar`] || obj[`${field}En`] || '';
};

export default function Hero({ currentLang, onExplorePrograms, onAccessPortal }: HeroProps) {
  const hero = useHero();
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  
  const stats = (hero.stats || []).map((s: any, idx: number) => ({
    id: `stat-${idx + 1}`,
    iconName: s.icon,
    number: s.number,
    labelEn: s.labelEn,
    labelAr: s.labelAr,
    labelMs: s.labelMs,
  }));

  const renderStatIcon = (iconName: string) => {
    const icon = ICON_MAP[iconName] || ICON_MAP.Users;
    return React.cloneElement(icon as React.ReactElement<any>, {
      className: 'h-6 w-6 text-brand-gold-light'
    });
  };

  return (
    <section id="home" className="relative text-slate-800 overflow-hidden select-none">
      
      {/* Immersive Video Fold */}
      <div className="relative min-h-[92vh] flex flex-col justify-between py-16 sm:py-20 lg:py-24 border-b border-brand-gold/20 overflow-hidden">
        
        {/* YouTube Ambient Video Glow Background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <iframe
            src="https://www.youtube.com/embed/Eff2YQijMhA?autoplay=1&mute=1&loop=1&playlist=Eff2YQijMhA&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&enablejsapi=1"
            className="absolute top-1/2 left-1/2 w-[300%] h-[300%] sm:w-[160%] sm:h-[160%] lg:w-[115%] lg:h-[115%] aspect-video -translate-x-1/2 -translate-y-1/2 object-cover opacity-35 blur-2xl scale-110"
            allow="autoplay; encrypted-media"
            frameBorder="0"
            style={{ minWidth: '100%', minHeight: '100%' }}
          />
          
          {/* Semi-transparent dark/gold gradients for luxury aesthetics and readability */}
          <div className="absolute inset-0 bg-brand-blue-dark/85 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-blue-dark/80 via-brand-blue-dark/50 to-brand-blue-dark/95" />
          <div className="absolute inset-0 islamic-pattern opacity-10" />
        </div>

        {/* Floating Glowing Lights in Video Fold */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none z-0" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-blue-light/10 rounded-full blur-3xl pointer-events-none z-0" />

        {/* Foreground Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex-grow flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-8">
            
            {/* Column 1: Branding Content */}
            <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left rtl:lg:text-right space-y-6">
              
              {/* Logo & Small Badge in Row */}
              <div className="flex items-center gap-3.5 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-md shadow-sm">
                <img
                  src={logoSrc}
                  alt="logo"
                  className="h-7 w-7 object-contain rounded-full bg-white p-0.5 border border-brand-gold/20 shadow-inner"
                />
                <span className="text-xs font-semibold uppercase tracking-widest text-brand-gold font-sans">
                  {currentLang === 'ar' ? 'أكاديمية أثر' : currentLang === 'en' ? 'Athar Academy' : 'Akademi Athar'}
                </span>
              </div>

              {/* Classical Arabic/English Title and details */}
              <div className="space-y-4 max-w-2xl border-brand-gold/30 ltr:border-l-2 ltr:pl-6 rtl:border-r-2 rtl:pr-6 text-left rtl:text-right">
                <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight font-classical text-white drop-shadow-md leading-tight">
                  {pickLang(hero, 'title', currentLang)}
                </h1>
                <p className="text-base sm:text-lg text-slate-200/90 font-sans leading-relaxed drop-shadow-sm">
                  {pickLang(hero, 'subtitle', currentLang)}
                </p>
              </div>

              {/* Call To Actions Buttons */}
              <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4 pt-2">
                <button
                  onClick={onExplorePrograms}
                  className="flex items-center justify-center bg-gradient-to-r from-brand-gold to-brand-gold-dark hover:from-brand-gold-dark hover:to-brand-gold text-brand-blue-dark font-bold px-8 py-4 rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-brand-gold/25 cursor-pointer border border-brand-gold/50"
                >
                  <span>{pickLang(hero, 'ctaPrimary', currentLang)}</span>
                  {currentLang === 'ar' ? (
                    <ArrowLeft className="h-5 w-5 mr-2 ltr:hidden" />
                  ) : (
                    <ArrowRight className="h-5 w-5 ml-2 rtl:hidden" />
                  )}
                </button>

                <button
                  onClick={onAccessPortal}
                  className="flex items-center justify-center bg-white/10 hover:bg-white/20 text-white border border-white/30 hover:border-brand-gold font-semibold px-8 py-4 rounded-full transition-all duration-300 cursor-pointer backdrop-blur-sm"
                >
                  <span>{pickLang(hero, 'ctaSecondary', currentLang)}</span>
                </button>
              </div>

            </div>

            {/* Column 2: Cinematic Framed Player */}
            <div className="lg:col-span-5 flex justify-center items-center w-full">
              <div
                onClick={() => setIsVideoOpen(true)}
                className="relative w-full max-w-md aspect-video rounded-3xl overflow-hidden shadow-2xl border-2 border-brand-gold/40 group cursor-pointer transform hover:scale-[1.03] hover:-translate-y-1 transition-all duration-500 bg-black/40 backdrop-blur-sm"
              >
                {/* Thumbnail from YouTube */}
                <img
                  src="https://img.youtube.com/vi/Eff2YQijMhA/maxresdefault.jpg"
                  alt="Athar Academy Video Preview"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://img.youtube.com/vi/Eff2YQijMhA/hqdefault.jpg';
                  }}
                />
                
                {/* Visual Glassmorphic Overlay */}
                <div className="absolute inset-0 bg-brand-blue-dark/50 group-hover:bg-brand-blue-dark/30 transition-all duration-300 flex items-center justify-center" />
                
                {/* Pulse Play Button */}
                <div className="absolute p-4.5 bg-brand-gold hover:bg-brand-gold-dark text-brand-blue-dark rounded-full shadow-2xl transition-all duration-300 transform group-hover:scale-110 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-brand-gold animate-ping opacity-75"></div>
                  <svg className="w-8 h-8 fill-current relative left-[2px] rtl:left-0 rtl:right-[2px]" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                
                {/* Interactive tag */}
                <div className="absolute bottom-4 left-4 rtl:left-auto rtl:right-4 bg-brand-blue-dark/70 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs text-brand-gold border border-brand-gold/30 flex items-center gap-1.5 font-sans">
                  <Sparkles className="h-3.5 w-3.5 animate-pulse text-brand-gold" />
                  <span className="font-semibold">{currentLang === 'ms' ? 'Tonton Video' : currentLang === 'en' ? 'Watch Video' : 'شاهد الفيديو'}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Floating Glassmorphic Statistics Bar */}
          <div className="w-full mt-8 backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-5 shadow-2xl relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div
                  key={stat.id}
                  className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-brand-gold/20 hover:bg-white/10 transition-all duration-300 hover:scale-[1.03] text-center"
                >
                  <div className="p-3 bg-white/10 rounded-full border border-white/10 mb-3 text-brand-gold-light">
                    {renderStatIcon(stat.iconName)}
                  </div>
                  <span className="text-2xl sm:text-3xl font-extrabold text-white font-sans tracking-tight drop-shadow-md">
                    {stat.number}
                  </span>
                  <span className="text-xs text-slate-200/90 font-sans font-medium mt-1 drop-shadow-sm">
                    {currentLang === 'ms' ? (stat.labelMs || stat.labelEn) : (currentLang === 'en' ? stat.labelEn : stat.labelAr)}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Video Modal Lightbox Overlay */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <button
            onClick={() => setIsVideoOpen(false)}
            className="absolute top-6 right-6 text-white hover:text-brand-gold transition-colors p-2 bg-white/10 rounded-full hover:bg-white/20 focus:outline-none cursor-pointer"
            aria-label="Close video"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="w-full max-w-4xl aspect-video rounded-2xl overflow-hidden border border-brand-gold/30 shadow-2xl relative">
            <iframe
              src="https://www.youtube.com/embed/Eff2YQijMhA?autoplay=1&controls=1&modestbranding=1"
              className="w-full h-full"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              frameBorder="0"
            />
          </div>
        </div>
      )}

      {/* Core Educational Pillars Section - Polished Bento Style */}
      <div className="py-24 bg-brand-sand relative">
        <div className="absolute inset-0 islamic-pattern opacity-40 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 animate-in fade-in duration-1000">
            <div className="inline-flex items-center space-x-1.5 rtl:space-x-reverse text-brand-gold-dark">
              <Sparkles className="h-4.5 w-4.5 animate-pulse text-brand-gold" />
              <span className="text-xs uppercase tracking-widest font-semibold">
                {pickLang(hero, 'pillarsTagline', currentLang)}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-blue-dark tracking-tight">
              {pickLang(hero, 'pillarsHeading', currentLang)}
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed font-sans">
              {pickLang(hero, 'pillarsSub', currentLang)}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(hero.pillars || []).map((p: any) => (
              <div
                key={p.id}
                className="bg-white border border-brand-gold/15 rounded-3xl overflow-hidden hover:border-brand-gold hover:shadow-brand-gold/10 hover:shadow-lg transition-all duration-300 flex flex-col justify-between text-left rtl:text-right group h-full shadow-sm"
              >
                {/* Visual Thumbnail Image */}
                <div className="h-36 w-full overflow-hidden relative">
                  <SmartImg
                    src={p.img}
                    alt={currentLang === 'ms' ? (p.titleMs || p.titleEn) : (currentLang === 'en' ? p.titleEn : p.titleAr)}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                  {/* Absolute Floating Icon Over Image */}
                  <div className="absolute bottom-3 left-3 rtl:left-auto rtl:right-3 p-2 bg-white rounded-xl shadow-md border border-brand-gold/20 text-brand-gold-dark">
                    {ICON_MAP[p.icon] || ICON_MAP.GraduationCap}
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
