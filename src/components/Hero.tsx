'use client';
import React, { useState, useEffect } from 'react';
import {
  Sparkles, ArrowRight, ArrowLeft, Award, BookOpen, Users, Clock,
  ShieldCheck, HeartHandshake, Smartphone, GraduationCap, Landmark, Heart
} from 'lucide-react';
import { Language } from '@/types';
import { useHero, usePartners } from '@/lib/content-provider';
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

const extractYoutubeId = (url: string): string => {
  if (!url) return 'Eff2YQijMhA'; // default fallback ID
  const trimmed = url.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = trimmed.match(regExp);
  return (match && match[2].length === 11) ? match[2] : 'Eff2YQijMhA';
};

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

export default function Hero({ currentLang, onExplorePrograms, onAccessPortal }: HeroProps) {
  const hero = useHero();
  const partners = usePartners();
  
  // Videos switcher
  const videosList = hero.videos || [
    { id: 'default', titleAr: 'الفيديو التعريفي', titleEn: 'Introductory Video', titleMs: 'Video Pengenalan', url: hero.videoUrl || 'https://youtu.be/Eff2YQijMhA' }
  ];
  const [activeVideoIdx, setActiveVideoIdx] = useState(0);
  const activeVideo = videosList[activeVideoIdx] || videosList[0];
  const videoId = extractYoutubeId(activeVideo.url);
  const iframeSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&enablejsapi=1`;

  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  useEffect(() => {
    setIsVideoLoaded(false);

    // Inject the YouTube Iframe API script dynamically if not present
    if (typeof window !== 'undefined' && !(window as any).YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      } else {
        document.head.appendChild(tag);
      }
    }

    let player: any;
    let pollInterval: NodeJS.Timeout;
    let fallbackTimer: NodeJS.Timeout;

    const initPlayer = () => {
      const iframeId = `hero-youtube-bg-${videoId}`;
      const iframe = document.getElementById(iframeId);
      if (iframe && (window as any).YT && (window as any).YT.Player) {
        clearInterval(pollInterval);
        player = new (window as any).YT.Player(iframe, {
          events: {
            onReady: (event: any) => {
              try {
                event.target.mute();
                event.target.playVideo();
                if (event.target.getPlayerState() === 1) {
                  setIsVideoLoaded(true);
                  clearTimeout(fallbackTimer);
                }
              } catch (e) {
                console.error('Error in YT player ready:', e);
              }
            },
            onStateChange: (event: any) => {
              // 1 is YT.PlayerState.PLAYING
              if (event.data === 1) {
                setIsVideoLoaded(true);
                clearTimeout(fallbackTimer);
              }
            }
          }
        });
      }
    };

    pollInterval = setInterval(initPlayer, 100);

    // Fallback: If the video has not loaded/started playing after 3.5 seconds,
    // display it anyway so the user doesn't see a blank background.
    fallbackTimer = setTimeout(() => {
      setIsVideoLoaded(true);
      clearInterval(pollInterval);
    }, 3500);

    return () => {
      clearInterval(pollInterval);
      clearTimeout(fallbackTimer);
      if (player && typeof player.destroy === 'function') {
        try {
          player.destroy();
        } catch (e) {
          console.error('Error destroying YouTube player:', e);
        }
      }
    };
  }, [videoId]);

  const getPillarsHeading = () => {
    const heading = pickLang(hero, 'pillarsHeading', currentLang);
    if (!heading || heading.includes('ركائز') || heading.includes('Pillars') || heading.includes('Teras')) {
      return currentLang === 'ms' ? 'Program-Program Utama Kami' : currentLang === 'en' ? 'Our Key Programs' : 'أهم البرامج في أكاديمية أثر';
    }
    return heading;
  };

  const getPillarsTagline = () => {
    const tagline = pickLang(hero, 'pillarsTagline', currentLang);
    if (tagline === 'منهجية الأثر التربوية' || tagline === 'OUR METHODOLOGY' || tagline === 'METODOLOGI KAMI') {
      return currentLang === 'ms' ? 'PROGRAM KAMI' : currentLang === 'en' ? 'OUR PROGRAMS' : 'برامجنا التعليمية';
    }
    return tagline;
  };

  const getPillarsSub = () => {
    const sub = pickLang(hero, 'pillarsSub', currentLang);
    if (sub.includes('تعتمد التلقين') || sub.includes('mindless memorization') || sub.includes('hafazan semata-mata')) {
      return currentLang === 'ms' 
        ? 'Kami menawarkan pelbagai program utama dan kem bermusim yang direka untuk pelbagai peringkat umur.' 
        : currentLang === 'en' 
          ? 'We offer a range of distinguished programs and seasonal camps designed for different age groups to nurture a Quranic and leading generation.' 
          : 'نقدم باقة من البرامج المتميزة والمخيمات الموسمية الموجهة لمختلف الفئات العمرية بهدف تنشئة جيل قرآني قيادي.';
    }
    return sub;
  };

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
        
        {/* YouTube Background Video Player */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <iframe
            id={`hero-youtube-bg-${videoId}`}
            src={iframeSrc}
            className={`absolute top-1/2 left-1/2 w-[300%] h-[300%] sm:w-[160%] sm:h-[160%] lg:w-[115%] lg:h-[115%] aspect-video -translate-x-1/2 -translate-y-1/2 object-cover transition-opacity duration-[1200ms] ${isVideoLoaded ? 'opacity-85' : 'opacity-0'}`}
            allow="autoplay; encrypted-media"
            frameBorder="0"
            style={{ minWidth: '100%', minHeight: '100%' }}
          />
          
          {/* Semi-transparent dark/gold gradients for luxury aesthetics and readability */}
          <div className="absolute inset-0 bg-brand-blue-dark/85 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-blue-dark/70 via-brand-blue-dark/40 to-brand-blue-dark/95" />
          <div className="absolute inset-0 islamic-pattern opacity-10" />
        </div>

        {/* Floating Glowing Lights in Video Fold */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none z-0" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-blue-light/10 rounded-full blur-3xl pointer-events-none z-0" />

        {/* Foreground Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex-grow flex flex-col justify-center items-center">
          <div className="flex flex-col items-center justify-center text-center space-y-6 max-w-4xl mx-auto py-8">
            
            {/* Animated Logo Container with Glow */}
            <div className="relative group mb-2">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-brand-gold to-brand-gold-dark rounded-full blur-md opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
              <img
                src={logoSrc}
                alt="Athar Logo"
                className="relative h-28 w-28 sm:h-36 sm:w-36 object-contain rounded-full bg-white p-2 border border-brand-gold/20 shadow-2xl transition-all duration-500 hover:scale-105"
              />
            </div>

            {/* Classical Arabic/English Brand Title */}
            <div className="space-y-4">
              <span className="block text-xs font-semibold uppercase tracking-widest text-brand-gold drop-shadow font-sans">
                {pickLang(hero, 'badge', currentLang)}
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-classical text-white drop-shadow-md leading-tight">
                {currentLang === 'ar' ? 'أكاديمية أثر' : currentLang === 'en' ? 'Athar Academy' : 'Akademi Athar'}
              </h1>
              <p className="text-lg sm:text-xl text-brand-gold-light max-w-2xl mx-auto leading-relaxed font-sans font-medium drop-shadow-md">
                {pickLang(hero, 'title', currentLang)}
              </p>
              <p className="text-sm sm:text-base text-slate-200/90 max-w-3xl mx-auto leading-relaxed font-sans drop-shadow-sm">
                {pickLang(hero, 'subtitle', currentLang)}
              </p>
            </div>

            {/* Call To Actions Buttons */}
            <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4 pt-4 justify-center items-center">
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
                className="w-full sm:w-auto flex items-center justify-center bg-white/10 hover:bg-white/20 text-white border border-white/30 hover:border-brand-gold font-semibold px-8 py-4 rounded-full transition-all duration-300 cursor-pointer backdrop-blur-sm shadow-md"
              >
                <span>{pickLang(hero, 'ctaSecondary', currentLang)}</span>
              </button>
            </div>

            {/* Background Videos Switcher - displays only if there are multiple videos */}
            {videosList.length > 1 && (
              <div className="flex flex-wrap gap-2 justify-center mt-8 bg-black/40 border border-brand-gold/20 rounded-2xl p-2.5 backdrop-blur-md max-w-xl shadow-lg">
                {videosList.map((vid: any, idx: number) => {
                  const isActive = idx === activeVideoIdx;
                  return (
                    <button
                      key={vid.id || idx}
                      onClick={() => setActiveVideoIdx(idx)}
                      className={`text-[10px] sm:text-xs font-bold px-4 py-2 rounded-xl transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                        isActive
                          ? 'bg-brand-gold text-brand-blue-dark shadow-md'
                          : 'bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white'
                      }`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${isActive ? 'bg-brand-blue-dark animate-pulse' : 'bg-slate-400'}`} />
                      <span>{pickLang(vid, 'title', currentLang)}</span>
                    </button>
                  );
                })}
              </div>
            )}

          </div>

          {/* Floating Glassmorphic Statistics Bar */}
          <div className="w-full mt-10 backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-5 shadow-2xl relative z-10">
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

      {/* Core Educational Programs Section (Replaced Pillars) */}
      <div className="py-24 bg-brand-sand relative border-b border-brand-gold/10">
        <div className="absolute inset-0 islamic-pattern opacity-30 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-blue-dark tracking-tight">
              {getPillarsHeading()}
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed font-sans">
              {getPillarsSub()}
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

      {/* Bottom Donation CTA Banner Section */}
      <div className="py-16 bg-brand-blue-dark text-white relative border-b border-brand-gold/20">
        {/* Background Islamic Watermark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue-dark via-[#1a3354] to-brand-blue-dark z-0" />
        <div className="absolute inset-0 islamic-pattern opacity-10 pointer-events-none z-0" />
        <div className="absolute -top-32 -right-32 w-80 h-80 bg-brand-gold/10 rounded-full blur-[100px] pointer-events-none z-0" />

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex p-3 bg-brand-gold/10 text-brand-gold rounded-full border border-brand-gold/20">
            <Heart className="h-6 w-6 animate-pulse" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-classical text-brand-gold-light leading-tight drop-shadow-md">
            {currentLang === 'ms' ? 'Sokong Misi Kami – Sumbang Sekarang' : currentLang === 'en' ? 'Support Our Mission – Donate Now' : 'ساهم في دعم ورعاية مسيرة أثـر لتعليم القرآن الكريم'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 max-w-2xl mx-auto leading-relaxed font-sans">
            {currentLang === 'ms' 
              ? 'Setiap sumbangan anda meninggalkan impak yang berkekalan dalam melahirkan generasi Al-Quran. Sertai kempen sumbangan kami hari ini.' 
              : currentLang === 'en' 
                ? 'Every donation you make leaves a lasting impact in nurturing a Quranic generation. Support our sponsorship campaigns today.' 
                : 'كل تبرع تقدمه يترك أثراً باقياً ونوراً ساطعاً في كفالة حلقة قرآنية أو طالب علم. كن شريكاً في الأثر والنجاح.'}
          </p>
          <div className="pt-2">
            <button
              onClick={onAccessPortal}
              className="flex items-center justify-center bg-gradient-to-r from-brand-gold to-brand-gold-dark hover:from-brand-gold-dark hover:to-brand-gold text-brand-blue-dark font-bold px-10 py-4 rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-brand-gold/25 cursor-pointer mx-auto border border-brand-gold/50"
            >
              <span>{currentLang === 'ms' ? 'Derma Sekarang' : currentLang === 'en' ? 'Donate Now' : 'تبرّع الآن'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Success Partners Section */}
      {partners && partners.length > 0 && (
        <div id="partners" className="py-24 bg-gradient-to-b from-white via-brand-sand/20 to-brand-sand/50 relative border-t border-brand-gold/10">
          <div className="absolute inset-0 islamic-pattern opacity-10 pointer-events-none" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <div className="inline-flex items-center space-x-1.5 rtl:space-x-reverse text-brand-gold-dark bg-brand-gold/10 px-3.5 py-1 rounded-full border border-brand-gold/20">
                <Landmark className="h-3.5 w-3.5" />
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider font-sans">
                  {currentLang === 'ms' ? 'Rakan Kerjasama Kejayaan' : currentLang === 'en' ? 'Partners in Success' : 'شركاء النجاح والأثر'}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-brand-blue-dark tracking-tight">
                {currentLang === 'ms' ? 'Rakan Kerjasama Kami' : currentLang === 'en' ? 'Our Success Partners' : 'شركاؤنا'}
              </h2>
              <div className="w-12 h-0.5 bg-brand-gold mx-auto mt-2" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
              {partners.map((partner: any, i: number) => (
                <div
                  key={i}
                  className="bg-white/70 backdrop-blur-sm border border-brand-gold/15 hover:border-brand-gold/50 p-6 rounded-3xl shadow-sm hover:shadow-brand-gold/10 hover:shadow-xl transition-all duration-500 flex flex-col items-center justify-center text-center group hover:-translate-y-1.5 cursor-default relative overflow-hidden"
                >
                  {/* Subtle gold shining line on top on hover */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                  {isImageSrc(partner.logo) ? (
                    <div className="h-16 w-16 rounded-2xl bg-white overflow-hidden flex items-center justify-center border border-brand-gold/10 shadow-sm group-hover:border-brand-gold/30 transition-all duration-500 mb-3 bg-gradient-to-br from-white to-slate-50">
                      <SmartImg
                        src={partner.logo}
                        alt={pickLang(partner, 'name', currentLang)}
                        className="h-full w-full object-contain p-1.5 filter grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100 transition-all duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ) : (
                    <div className="h-16 w-16 rounded-2xl bg-brand-gold/10 text-brand-gold-dark font-bold text-2xl flex items-center justify-center mb-3 border border-brand-gold/20 shadow-inner group-hover:bg-brand-gold/20 transition-all duration-500">
                      {partner.logo}
                    </div>
                  )}
                  <span className="text-xs font-bold text-brand-blue-dark group-hover:text-brand-gold-dark transition-colors line-clamp-1 font-sans">
                    {pickLang(partner, 'name', currentLang)}
                  </span>
                  {partner.descAr && (
                    <p className="text-[10px] text-slate-500 font-sans mt-1.5 line-clamp-2 max-w-[150px] leading-relaxed opacity-85 group-hover:opacity-100 transition-opacity">
                      {pickLang(partner, 'desc', currentLang)}
                    </p>
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
