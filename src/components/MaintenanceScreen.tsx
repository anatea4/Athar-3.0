'use client';
import React from 'react';

const logoSrc = '/athar-logo-white.png';

// Full-screen "under maintenance" page shown to visitors when maintenance mode is on.
// Trilingual (Arabic / English / Malay). The /admin dashboard is NOT affected.
export default function MaintenanceScreen() {
  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-brand-blue-dark text-center px-6 font-sans select-none overflow-hidden">
      <div className="absolute inset-0 islamic-pattern-dark opacity-[0.05] pointer-events-none" />
      <div className="absolute w-[450px] h-[450px] bg-brand-gold/5 blur-[100px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <img src={logoSrc} alt="Athar" className="relative h-20 w-auto mb-8 opacity-95 pointer-events-none" />

      <div className="relative space-y-5 max-w-lg">
        {/* Arabic */}
        <div dir="rtl">
          <h1 className="text-2xl sm:text-3xl font-bold text-brand-gold mb-1.5">الموقع تحت الصيانة</h1>
          <p className="text-sm text-white/70 leading-relaxed">
            نقوم حالياً بأعمال صيانة وتحديث للموقع. نعتذر عن الإزعاج، وسنعود قريباً بإذن الله.
          </p>
        </div>

        <div className="h-px bg-brand-gold/20 mx-auto w-2/3" />

        {/* English */}
        <div dir="ltr">
          <h2 className="text-lg font-bold text-brand-gold mb-1">Under Maintenance</h2>
          <p className="text-sm text-white/70 leading-relaxed">
            We&apos;re performing scheduled maintenance and updates. We&apos;ll be back shortly — thank you for your patience.
          </p>
        </div>

        <div className="h-px bg-brand-gold/20 mx-auto w-2/3" />

        {/* Malay */}
        <div dir="ltr">
          <h2 className="text-lg font-bold text-brand-gold mb-1">Dalam Penyelenggaraan</h2>
          <p className="text-sm text-white/70 leading-relaxed">
            Kami sedang menjalankan kerja penyelenggaraan dan kemas kini. Kami akan kembali sebentar lagi — terima kasih atas kesabaran anda.
          </p>
        </div>
      </div>

      <img
        src="/logo-footer.png"
        alt=""
        className="absolute bottom-8 h-12 w-auto opacity-80 brightness-125 pointer-events-none"
      />
    </div>
  );
}
