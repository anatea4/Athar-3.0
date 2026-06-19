'use client';
import React from 'react';
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
    <section id="home" className="relative text-slate-800 overflow-hidden select-none bg-brand-blue-dark">
      
      {/* Decorative Islamic Geometric Pattern Overlay with rich gold-blue gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-blue-dark via-[#14233a] to-brand-blue-dark z-0" />
      <div className="absolute inset-0 islamic-pattern opacity-10 pointer-events-none z-0" />
      
      {/* Radial Gradient Glowing Lights */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-gold/15 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] bg-brand-blue-light/10 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Main Fold Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 flex flex-col items-center">
        
        {/* Branding & Typography Header */}
        <div className="flex flex-col items-center justify-center text-center space-y-6 max-w-4xl mx-auto mb-14">
          
          {/* Animated Glowing Logo */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-gold to-brand-gold-dark rounded-full blur-md opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
            <img
              src={logoSrc}
              alt="Athar Logo"
              className="relative h-24 w-24 sm:h-28 sm:w-28 object-contain rounded-full bg-white p-1.5 border border-brand-gold/30 shadow-2xl transition-all duration-500 hover:scale-105"
            />
          </div>

          <div className="space-y-4">
            {/* badge */}
            <span className="inline-flex items-center space-x-1.5 rtl:space-x-reverse text-xs font-semibold uppercase tracking-widest text-brand-gold font-sans bg-brand-gold/10 px-3.5 py-1.5 rounded-full border border-brand-gold/20">
              <Sparkles className="h-3.5 w-3.5 animate-pulse" />
              <span>{pickLang(hero, 'badge', currentLang)}</span>
            </span>

            {/* main title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-classical text-white drop-shadow-md leading-tight">
              {currentLang === 'ar' ? 'أكاديمية أثر' : currentLang === 'en' ? 'Athar Academy' : 'Akademi Athar'}
            </h1>
            
            {/* taglines */}
            <p className="text-base sm:text-lg text-brand-gold-light max-w-2xl mx-auto leading-relaxed font-sans font-medium">
              {pickLang(hero, 'title', currentLang)}
            </p>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl mx-auto leading-relaxed font-sans">
              {pickLang(hero, 'subtitle', currentLang)}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4 pt-2 justify-center items-center">
            <button
              onClick={onExplorePrograms}
              className="w-full sm:w-auto flex items-center justify-center bg-gradient-to-r from-brand-gold to-brand-gold-dark hover:from-brand-gold-dark hover:to-brand-gold text-brand-blue-dark font-bold px-8 py-4 rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-brand-gold/25 cursor-pointer border border-brand-gold/50"
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
              className="w-full sm:w-auto flex items-center justify-center bg-white/10 hover:bg-white/20 text-white border border-white/30 hover:border-brand-gold font-semibold px-8 py-4 rounded-full transition-all duration-300 cursor-pointer backdrop-blur-sm"
            >
              <span>{pickLang(hero, 'ctaSecondary', currentLang)}</span>
            </button>
          </div>

        </div>

        {/* Floating Cinematic Theater Card */}
        <div className="w-full max-w-4xl rounded-[2.5rem] border-2 border-brand-gold/30 bg-black/40 p-1.5 sm:p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] shadow-brand-gold/5 relative overflow-hidden aspect-video mx-auto mb-16 transform hover:scale-[1.01] transition-transform duration-500 backdrop-blur-sm animate-in fade-in duration-1000">
          <iframe
            src="https://www.youtube.com/embed/Eff2YQijMhA?autoplay=1&mute=1&loop=1&playlist=Eff2YQijMhA&controls=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1"
            className="w-full h-full rounded-[2rem] overflow-hidden"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            frameBorder="0"
          />
        </div>

        {/* Glassmorphic Stats bar */}
        <div className="w-full backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-5 shadow-2xl relative z-10">
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

      {/* Core Educational Pillars Section - Polished Bento Style */}
      <div className="py-24 bg-brand-sand relative">
        <div className="absolute inset-0 islamic-pattern opacity-40 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
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
