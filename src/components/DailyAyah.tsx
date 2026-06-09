'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Play, Pause, RefreshCw, BookOpen, Heart } from 'lucide-react';
import { QuranVerse, Language, getLangField } from '@/types';
import { DAILY_AYAHS } from '@/data';

interface DailyAyahProps {
  currentLang: Language;
}

export default function DailyAyah({ currentLang }: DailyAyahProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [likes, setLikes] = useState<Record<number, number>>({ 1: 342, 2: 512, 3: 189 });
  const [hasLiked, setHasLiked] = useState<Record<number, boolean>>({});
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const verse = DAILY_AYAHS[currentIndex];

  useEffect(() => {
    // When the verse changes, reset play state and load new audio
    setIsPlaying(false);
    setCurrentTime(0);

    if (audioRef.current) {
      audioRef.current.pause();
    }

    if (verse.audioUrl) {
      const audio = new Audio(verse.audioUrl);
      audioRef.current = audio;

      const handleLoadedMetadata = () => {
        setDuration(audio.duration);
      };
      const handleTimeUpdate = () => {
        setCurrentTime(audio.currentTime);
      };
      const handleEnded = () => {
        setIsPlaying(false);
        setCurrentTime(0);
      };

      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('ended', handleEnded);

      return () => {
        audio.pause();
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('ended', handleEnded);
      };
    }
  }, [currentIndex, verse.audioUrl]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(err => {
          console.warn("Audio playback failed or was blocked by browser autoplay rules:", err);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handleNextVerse = () => {
    setIsPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % DAILY_AYAHS.length);
  };

  const handleLike = () => {
    const vId = verse.id;
    if (hasLiked[vId]) {
      setLikes((prev) => ({ ...prev, [vId]: prev[vId] - 1 }));
      setHasLiked((prev) => ({ ...prev, [vId]: false }));
    } else {
      setLikes((prev) => ({ ...prev, [vId]: prev[vId] + 1 }));
      setHasLiked((prev) => ({ ...prev, [vId]: true }));
    }
  };

  const togglePlayAudio = () => {
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <section id="inspiration" className="py-20 bg-brand-sand text-slate-800 relative overflow-hidden select-none">

      {/* Decorative Overlays */}
      <div className="absolute inset-0 islamic-pattern opacity-15 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center z-10">

        {/* Module Title */}
        <div className="space-y-3 mb-12">
          <div className="inline-flex items-center space-x-1.5 rtl:space-x-reverse text-brand-gold-dark">
            <Sparkles className="h-5 w-5 text-brand-gold animate-pulse" />
            <span className="text-xs uppercase tracking-widest font-mono font-semibold">
              {currentLang === 'ms'
                ? 'Ayat Inspirasi Hari Ini'
                : currentLang === 'en'
                ? 'Inspirational Verse of the Day'
                : 'آيـة وتـأمـل للقلب الظامـئ'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-blue-dark tracking-tight leading-snug font-classical">
            {currentLang === 'ms' ? 'Perlindungan Al-Quran Harian' : currentLang === 'en' ? 'Daily Quran Sanctuary' : 'تأملات الذكر الـحكيم'}
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto font-sans leading-relaxed">
            {currentLang === 'ms'
              ? 'Berhenti sejenak untuk ketenangan rohani. Renungkan mesej Allah dan basahi lidah anda dengan zikrullah.'
              : currentLang === 'en'
              ? 'Pause for a brief spiritual breathing space. Contemplate on Allah\'s message and moisten your mouth with remembrance.'
              : 'تنفس عبق السكينة وعطر قلبك بآيات كتاب الله؛ لتبدأ يومك بمدد روحي باهر وحفظ من الرحمن.'}
          </p>
        </div>

        {/* Verse Board Card */}
        <div className="bg-white rounded-3xl border border-brand-gold/20 p-8 sm:p-12 shadow-lg relative max-w-3xl mx-auto overflow-hidden">

          {/* Top ornamental corner brackets */}
          <div className="absolute inset-4 border border-brand-gold/10 rounded-2xl pointer-events-none" />

          <div className="space-y-8 relative z-10">

            {/* Calligraphic Script */}
            <div className="space-y-4">
              <span className="text-xs text-brand-gold-dark font-mono uppercase tracking-widest block font-bold">
                {currentLang === 'ms'
                  ? `Surah ${getLangField(verse, 'surah', currentLang)} : Ayat ${verse.ayahNumber}`
                  : currentLang === 'en'
                  ? `Surah ${verse.surahEn} : Ayah ${verse.ayahNumber}`
                  : `سورة ${verse.surahAr} : آيـة ${verse.ayahNumber}`}
              </span>

              {/* Grand classical Arabic text */}
              <h3 className="text-2xl sm:text-4xl font-bold font-classical leading-relaxed text-brand-blue-dark max-w-2xl mx-auto px-2">
                {verse.textAr}
              </h3>

              {/* High contrast English/Malay translation */}
              <p className="text-sm sm:text-base text-slate-600 px-4 leading-relaxed max-w-2xl mx-auto italic font-sans font-medium">
                {getLangField(verse, 'text', currentLang)}
              </p>
            </div>

            {/* Audio player simulation bar */}
            <div className="max-w-md mx-auto bg-brand-sand rounded-full px-5 py-2.5 border border-brand-gold/15 flex items-center justify-between gap-4">

              <button
                onClick={togglePlayAudio}
                className="h-10 w-10 flex items-center justify-center rounded-full bg-brand-blue text-white hover:bg-brand-blue-light transition-transform active:scale-95 cursor-pointer shadow-sm"
                title={isPlaying ? 'Pause' : 'Play Recitation'}
              >
                {isPlaying ? <Pause className="h-4.5 w-4.5 font-bold" /> : <Play className="h-4.5 w-4.5 font-bold translate-x-[1px]" />}
              </button>

              <div className="flex-grow flex items-center justify-center text-xs text-slate-600 font-sans leading-none font-medium">
                {isPlaying ? (
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <span className="h-2 w-2 rounded-full bg-brand-gold animate-ping" />
                    <span className="text-brand-blue-dark">
                      {currentLang === 'ms'
                        ? 'Aliran qari aktif...'
                        : currentLang === 'en'
                        ? 'Reciter stream active...'
                        : 'القارئ: الشيخ عبد الباسط'}
                    </span>
                  </div>
                ) : (
                  <span>
                    {currentLang === 'ms'
                      ? 'Klik Main untuk mendengar bacaan qari'
                      : currentLang === 'en'
                      ? 'Click Play for audio recitation sound'
                      : 'انقر تشغيل للاستماع لصوت المقرئ'}
                  </span>
                )}
              </div>

              <span className="text-[10px] font-mono text-slate-500 select-none">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>

            </div>

            {/* Spiritual Reflection panel */}
            <div className="bg-brand-sand/60 p-5 rounded-2xl border border-brand-gold/10 text-left rtl:text-right font-sans">
              <span className="text-[10px] uppercase font-bold tracking-wider text-brand-gold-dark block mb-1.5 select-none">
                {currentLang === 'ms'
                  ? 'Tadabbur & Kesan Rohani:'
                  : currentLang === 'en'
                  ? 'Spiritual Insight & Impact:'
                  : 'تأمـلات تربويـة للأثـر السلـيم:'}
              </span>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans font-medium">
                {getLangField(verse, 'reflection', currentLang)}
              </p>
            </div>

            {/* Interactive Likes actions */}
            <div className="flex items-center justify-between border-t border-brand-gold/10 pt-6 select-none sm:px-2">

              <button
                onClick={handleLike}
                className={`flex items-center space-x-1.5 rtl:space-x-reverse text-xs font-semibold py-1.5 px-3.5 rounded-full transition-colors cursor-pointer select-none ${
                  hasLiked[verse.id]
                    ? 'bg-rose-500/10 text-rose-600 border border-rose-500/30'
                    : 'bg-slate-100 text-slate-500 hover:text-rose-600 hover:bg-rose-500/5'
                }`}
              >
                <Heart className={`h-4 w-4 ${hasLiked[verse.id] ? 'fill-rose-500 text-rose-500' : ''}`} />
                <span>{likes[verse.id]}</span>
              </button>

              <button
                onClick={handleNextVerse}
                className="flex items-center space-x-1.5 rtl:space-x-reverse bg-brand-gold/15 hover:bg-brand-gold/25 text-brand-gold-dark text-xs font-bold py-2 px-4 rounded-full transition-transform active:scale-95 border border-brand-gold/20 cursor-pointer"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>
                  {currentLang === 'ms'
                    ? 'Ayat Seterusnya'
                    : currentLang === 'en'
                    ? 'Next Ayah'
                    : 'آيـة أخرى'}
                </span>
              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
