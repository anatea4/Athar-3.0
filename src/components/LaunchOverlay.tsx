'use client';
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Language } from '@/types';

const logoSrc = '/athar-logo-white.png';
const meemLogo = '/logo-footer.png';

interface LaunchConfig {
  enabled: boolean;
  preloaderEnabled?: boolean;
  count: number; beatMs: number; curtainMs: number; goldenMs: number; thanksSecs: number;
  titleAr: string; titleEn: string; titleMs: string;
  verseAr: string;
  messageAr: string; messageEn: string; messageMs: string;
}

type Phase = 'idle' | 'count' | 'curtain' | 'golden' | 'thanks' | 'gone';

const CONFETTI_COLORS = ['#C09E5B', '#dfb76c', '#8C7343', '#F4E4BC', '#ffd86b'];

// Realistic RED theatre velvet: top sheen → bottom shadow + many fold stops.
const VELVET =
  'linear-gradient(180deg, rgba(255,235,235,0.18) 0%, rgba(0,0,0,0.10) 26%, rgba(0,0,0,0.52) 100%),' +
  'repeating-linear-gradient(90deg,' +
  '#5e0b0b 0px,#841414 14px,#b81d1d 28px,#db2f2f 40px,#ff6a6a 48px,#db2f2f 56px,#b81d1d 68px,#841414 82px,#5e0b0b 96px)';

interface ConfettiPiece {
  id: number; left: number; delay: number; duration: number; size: number;
  rotate: number; color: string; round: boolean; drift: number;
}

// Module-level so it keeps a STABLE identity — defining it inside the component
// would remount it on every parent render and make the fall stutter/restart.
function ConfettiLayer({ pieces }: { pieces: ConfettiPiece[] }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {pieces.map((c) => (
        <motion.div
          key={c.id}
          className="absolute top-0"
          style={{
            left: `${c.left}%`,
            width: c.size,
            height: c.round ? c.size : c.size * 0.42,
            backgroundColor: c.color,
            borderRadius: c.round ? '50%' : 2,
            willChange: 'transform, opacity',
          }}
          initial={{ y: '-12vh', opacity: 0, rotate: c.rotate }}
          // opacity returns to 0 before the loop resets → the y jump is invisible (no "cut").
          animate={{ y: '112vh', x: [0, c.drift, 0], opacity: [0, 1, 1, 0], rotate: c.rotate + 360 }}
          transition={{ duration: c.duration, delay: c.delay, ease: 'linear', repeat: Infinity, repeatType: 'loop' }}
        />
      ))}
    </div>
  );
}

export default function LaunchOverlay({
  currentLang,
  onFinish,
  onConfig,
}: {
  currentLang: Language;
  onFinish?: () => void;
  onConfig?: (c: LaunchConfig) => void;
}) {
  const [cfg, setCfg] = useState<LaunchConfig | null>(null);
  const [phase, setPhase] = useState<Phase>('idle');
  const [n, setN] = useState(0);
  const [done, setDone] = useState(false);

  const finish = useCallback(() => {
    setPhase('gone');
    document.body.style.overflow = '';
    setDone((d) => { if (!d) onFinish?.(); return true; });
  }, [onFinish]);

  useEffect(() => {
    let alive = true;
    fetch('/api/launch')
      .then((r) => r.json())
      .then((d: LaunchConfig) => {
        if (!alive) return;
        onConfig?.(d);
        if (d?.enabled) {
          setCfg(d);
          setN(d.count);
          setPhase(d.count > 0 ? 'count' : 'curtain');
          document.body.style.overflow = 'hidden';
        } else { finish(); }
      })
      .catch(() => alive && finish());
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Countdown ticker.
  useEffect(() => {
    if (phase !== 'count' || !cfg) return;
    if (n <= 0) { setPhase('curtain'); return; }
    const t = setTimeout(() => setN((v) => v - 1), cfg.beatMs);
    return () => clearTimeout(t);
  }, [phase, n, cfg]);

  // Phase durations.
  useEffect(() => {
    if (!cfg) return;
    if (phase === 'curtain') { const t = setTimeout(() => setPhase('golden'), cfg.curtainMs + 600); return () => clearTimeout(t); }
    if (phase === 'golden') { const t = setTimeout(() => setPhase('thanks'), cfg.goldenMs); return () => clearTimeout(t); }
  }, [phase, cfg]);

  useEffect(() => () => { document.body.style.overflow = ''; }, []);

  const confetti = useMemo<ConfettiPiece[]>(
    () => Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2.5,
      duration: 4 + Math.random() * 3,
      size: 6 + Math.random() * 9,
      rotate: Math.random() * 360,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      round: Math.random() > 0.6,
      drift: (Math.random() - 0.5) * 70,
    })),
    []
  );

  if (phase === 'idle' || phase === 'gone' || !cfg) return null;

  const title = currentLang === 'ms' ? cfg.titleMs : currentLang === 'en' ? cfg.titleEn : cfg.titleAr;
  const message = currentLang === 'ms' ? cfg.messageMs : currentLang === 'en' ? cfg.messageEn : cfg.messageAr;
  const dir = currentLang === 'ar' ? 'rtl' : 'ltr';
  const curtainSec = cfg.curtainMs / 1000;
  const autoThanks = Math.min(26, Math.max(12, (message?.length || 0) / 13));
  const thanksDur = cfg.thanksSecs && cfg.thanksSecs > 0 ? cfg.thanksSecs : autoThanks;
  const EASE = [0.4, 0, 0.2, 1] as any;

  // Phase transition WITH motion (slide + fade).
  const slide = {
    initial: { opacity: 0, y: 60, scale: 0.97 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: EASE } },
    exit: { opacity: 0, y: -60, scale: 1.03, transition: { duration: 0.6, ease: EASE } },
  };
  const fadeOnly = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.6 } },
    exit: { opacity: 0, transition: { duration: 0.5 } },
  };

  return (
    <AnimatePresence>
      <motion.div
        key="launch"
        dir={dir}
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed inset-0 z-[200] bg-brand-blue-dark overflow-hidden select-none"
        style={{ willChange: 'opacity' }}
      >
        <div className="absolute inset-0 islamic-pattern-dark opacity-[0.06] mix-blend-overlay pointer-events-none" />
        <div className="absolute w-[520px] h-[520px] bg-brand-gold/10 blur-[120px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        <AnimatePresence>
          {/* ---------- PHASE 1: title + countdown ---------- */}
          {phase === 'count' && (
            <motion.div key="count" {...slide} className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.p
                className="text-brand-gold font-classical font-bold tracking-wide px-6 text-center mb-8"
                style={{ fontSize: 'min(6vw, 30px)' }}
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                {title}
              </motion.p>
              <div className="relative flex items-center justify-center">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={n}
                    initial={{ opacity: 0, scale: 0.35, filter: 'blur(6px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 1.9, filter: 'blur(4px)' }}
                    transition={{ duration: Math.min(0.7, cfg.beatMs / 1400), ease: [0.16, 1, 0.3, 1] }}
                    className="font-black text-white leading-none"
                    style={{ fontSize: 'min(38vw, 210px)', willChange: 'transform, opacity' }}
                  >
                    {n}
                  </motion.span>
                </AnimatePresence>
                <motion.div
                  key={`ring-${n}`}
                  className="absolute rounded-full border-2 border-brand-gold/50"
                  style={{ width: 'min(44vw, 270px)', height: 'min(44vw, 270px)' }}
                  initial={{ scale: 0.5, opacity: 0.7 }}
                  animate={{ scale: 1.3, opacity: 0 }}
                  transition={{ duration: cfg.beatMs / 1000, ease: 'easeOut' }}
                />
              </div>
            </motion.div>
          )}

          {/* ---------- PHASE 2: red velvet curtain + gold confetti ---------- */}
          {phase === 'curtain' && (
            <motion.div key="curtain" {...fadeOnly} className="absolute inset-0">
              <ConfettiLayer pieces={confetti} />
              {/* warm glow + light burst behind seam */}
              <motion.div
                className="absolute z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-100/70 blur-3xl"
                style={{ width: 320, height: 320 }}
                initial={{ scale: 0.2, opacity: 0.85 }}
                animate={{ scale: 6, opacity: 0 }}
                transition={{ duration: curtainSec, delay: 0.35, ease: 'easeOut' }}
              />
              {/* valance / pelmet lifts away */}
              <motion.div
                className="absolute top-0 left-0 right-0 z-40"
                style={{ height: 78, background: VELVET, boxShadow: 'inset 0 -10px 18px rgba(0,0,0,0.45), 0 8px 18px rgba(0,0,0,0.4)' }}
                initial={{ y: 0 }}
                animate={{ y: '-110%' }}
                transition={{ duration: curtainSec * 0.85, delay: 0.2, ease: [0.65, 0, 0.35, 1] }}
              >
                <div className="absolute -bottom-3 left-0 right-0 h-3 flex justify-around">
                  {Array.from({ length: 30 }).map((_, i) => (
                    <span key={i} className="h-3 w-2 rounded-b-full" style={{ background: 'linear-gradient(#ffd86b,#b8860b)' }} />
                  ))}
                </div>
              </motion.div>
              {/* two panels gather to the sides */}
              {[-1, 1].map((side) => (
                <motion.div
                  key={`cur${side}`}
                  className="absolute inset-y-0 z-30"
                  style={{
                    width: '52%',
                    [side < 0 ? 'left' : 'right']: 0,
                    background: VELVET,
                    transformOrigin: side < 0 ? 'left center' : 'right center',
                    boxShadow: side < 0 ? 'inset -34px 0 56px rgba(0,0,0,0.5)' : 'inset 34px 0 56px rgba(0,0,0,0.5)',
                  } as React.CSSProperties}
                  initial={{ x: 0, scaleX: 1 }}
                  animate={{ x: `${side * 100}%`, scaleX: 0.8 }}
                  exit={{ x: `${side * 100}%`, scaleX: 0.8 }}
                  transition={{ duration: curtainSec, delay: 0.25, ease: [0.6, 0, 0.25, 1] }}
                >
                  <div className="absolute inset-0 islamic-pattern-dark opacity-[0.1] mix-blend-overlay" />
                  <div className={`absolute inset-y-0 ${side < 0 ? 'right-0' : 'left-0'} w-[4px] bg-gradient-to-b from-amber-100/0 via-amber-100/80 to-amber-100/0`} />
                  <div className="absolute bottom-0 left-0 right-0 h-5 flex justify-around items-start">
                    {Array.from({ length: 24 }).map((_, i) => (
                      <span key={i} className="h-5 w-1.5 rounded-b-full" style={{ background: 'linear-gradient(#ffd86b,#8a1414)' }} />
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* ---------- PHASE 3: Bismillah + verse + golden burst ---------- */}
          {phase === 'golden' && (
            <motion.div key="golden" {...slide} className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <ConfettiLayer pieces={confetti} />
              <motion.div className="relative flex items-center justify-center mb-6"
                initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
                <motion.div className="absolute w-52 h-52 rounded-full bg-brand-gold/25 blur-[55px]"
                  animate={{ scale: [0.9, 1.2, 0.9], opacity: [0.4, 0.8, 0.4] }}
                  transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }} />
                <img src={logoSrc} alt="Athar" className="relative h-20 sm:h-24 w-auto object-contain" />
              </motion.div>
              <motion.h1
                className="text-white font-classical font-bold leading-[1.6]"
                style={{ fontSize: 'min(8.5vw, 56px)' }}
                initial={{ clipPath: 'inset(0% 0% 0% 100%)', opacity: 0.25 }}
                animate={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
                transition={{ duration: 2.4, ease: EASE }}
              >
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </motion.h1>
              <motion.p
                className="mt-5 text-brand-gold font-classical font-bold"
                style={{ fontSize: 'min(5vw, 26px)' }}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 2.6 }}
              >
                {cfg.verseAr}
              </motion.p>
            </motion.div>
          )}

          {/* ---------- PHASE 4: thank-you rises (title + Athar logo at end) ---------- */}
          {phase === 'thanks' && (
            <motion.div key="thanks" {...fadeOnly} className="absolute inset-0 overflow-hidden flex justify-center">
              <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-brand-blue-dark to-transparent z-20 pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-blue-dark via-brand-blue-dark/90 to-transparent z-20 pointer-events-none" />
              <motion.div
                className="absolute w-full max-w-2xl px-8 text-center"
                initial={{ y: '110vh' }}
                animate={{ y: '-118%' }}
                transition={{ duration: thanksDur, ease: 'linear' }}
                onAnimationComplete={finish}
                style={{ willChange: 'transform' }}
              >
                <div className="mx-auto mb-8 h-px w-24 bg-gradient-to-r from-transparent via-brand-gold to-transparent" />
                <h2 className="text-xl sm:text-3xl font-extrabold text-brand-gold leading-snug font-classical mb-8 tracking-wide">
                  {title}
                </h2>
                <p className="text-lg sm:text-2xl font-bold text-white leading-[2.1] font-classical whitespace-pre-line">
                  {message}
                </p>
                <div className="mt-12 flex flex-col items-center gap-4">
                  <div className="h-px w-24 bg-gradient-to-r from-transparent via-brand-gold to-transparent" />
                  <img src={logoSrc} alt="Athar" className="h-16 sm:h-20 w-auto object-contain opacity-95" />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Meem (designer) logo — visible at the bottom across ALL phases */}
        <div className="absolute bottom-6 left-0 right-0 z-[60] flex flex-col items-center gap-1 pointer-events-none">
          <span className="text-[9px] text-white/40 tracking-widest">تطوير وتصميم</span>
          <img src={meemLogo} alt="Meem" className="h-8 w-auto object-contain opacity-85 brightness-125" />
        </div>

        {/* skip */}
        <button
          onClick={finish}
          className="absolute top-5 left-5 rtl:right-5 rtl:left-auto z-[60] flex items-center gap-1.5 text-white/55 hover:text-white text-xs font-bold bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition"
        >
          <X className="h-3.5 w-3.5" />
          {currentLang === 'ms' ? 'Langkau' : currentLang === 'en' ? 'Skip' : 'تخطّي'}
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
