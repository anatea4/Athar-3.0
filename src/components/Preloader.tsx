'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
const logoSrc = '/athar-logo-white.png';
import { Language } from '@/types';

interface PreloaderProps {
  currentLang: Language;
  onComplete: () => void;
}

export default function Preloader({ currentLang, onComplete }: PreloaderProps) {
  const [isFinishing, setIsFinishing] = useState(false);

  useEffect(() => {
    // Lock body scroll while preloader is active
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    // Elegant, fast-paced logo loading duration (2.2 seconds total display, then exit)
    const timer = setTimeout(() => {
      setIsFinishing(true);
      const completeTimeout = setTimeout(() => {
        onComplete();
      }, 500); // Duration matches the exit transition
      return () => clearTimeout(completeTimeout);
    }, 2200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  // Generate very subtle gold particles on mount to maintain the premium backdrop
  const particles = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 80 + 20,
      size: Math.random() * 3 + 1.5,
      duration: Math.random() * 3 + 4,
      delay: Math.random() * 1.5,
    }));
  }, []);

  // Root container exit variants
  const containerVariants = {
    initial: { opacity: 1 },
    exit: {
      opacity: 0,
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as any }
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-brand-blue-dark overflow-hidden font-sans select-none"
      variants={containerVariants}
      initial="initial"
      animate={isFinishing ? "exit" : "initial"}
    >
      {/* 1. Islamic Star Pattern Overlay (Subtle, textured depth) */}
      <div className="absolute inset-0 islamic-pattern-dark opacity-[0.05] mix-blend-overlay pointer-events-none" />

      {/* 2. Soft Radial Core Glow */}
      <div className="absolute w-[450px] h-[450px] bg-brand-gold/5 blur-[100px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      {/* 3. Floating Gold Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-gradient-to-b from-[#dfb76c] to-[#8C7343] opacity-30"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
            }}
            animate={{
              y: [0, -150 - Math.random() * 180],
              x: [0, (Math.random() - 0.5) * 60],
              opacity: [0, 0.5, 0.5, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }}
          />
        ))}
      </div>

      {/* Main Centered Logo (Sole Focal Point) */}
      <motion.div
        className="flex flex-col items-center justify-center text-center px-6 z-20"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative flex items-center justify-center h-28 w-80">

          {/* Ethereal breathing golden aura behind logo */}
          <motion.div
            className="absolute w-52 h-52 bg-[#C09E5B]/15 blur-[50px] rounded-full pointer-events-none"
            animate={{
              scale: [0.95, 1.12, 0.95],
              opacity: [0.4, 0.75, 0.4]
            }}
            transition={{
              repeat: Infinity,
              duration: 3.0,
              ease: "easeInOut"
            }}
          />

          {/* Base Logo */}
          <img
            src={logoSrc}
            alt="Athar Logo"
            className="h-24 w-auto object-contain opacity-90 select-none pointer-events-none"
          />

          {/* Shiny Sweep Overlay Mask */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{
              maskImage: `url(${logoSrc})`,
              WebkitMaskImage: `url(${logoSrc})`,
              maskSize: 'contain',
              WebkitMaskSize: 'contain',
              maskPosition: 'center',
              WebkitMaskPosition: 'center',
              maskRepeat: 'no-repeat',
              WebkitMaskRepeat: 'no-repeat',
            }}
          >
            <motion.div
              className="absolute top-0 bottom-0 w-[40%] bg-gradient-to-r from-transparent via-white/80 to-transparent skew-x-[-20deg]"
              animate={{
                left: ['-120%', '220%']
              }}
              transition={{
                repeat: Infinity,
                repeatDelay: 1.2,
                duration: 1.4,
                ease: [0.4, 0, 0.2, 1],
                delay: 0.3
              }}
            />
          </div>

        </div>
      </motion.div>
    </motion.div>
  );
}
