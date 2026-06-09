'use client';
import React from 'react';
import { Language } from '@/types';
import { useContact } from '@/lib/content-provider';

export default function WhatsAppButton({ currentLang }: { currentLang: Language }) {
  useContact();
  // Official Athar Academy WhatsApp number: +60 14-708 6011
  const href = 'https://wa.me/60147086011';

  const label =
    currentLang === 'ms' ? 'Hubungi via WhatsApp' : currentLang === 'en' ? 'Contact via WhatsApp' : 'تواصل عبر واتساب';

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={label}
      aria-label={label}
      className={`fixed bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-2xl border-2 border-white transition-all duration-300 hover:scale-110 active:scale-95 ${
        currentLang === 'ar' ? 'right-6' : 'left-6'
      }`}
    >
      <svg viewBox="0 0 32 32" className="h-8 w-8 fill-white" aria-hidden="true">
        <path d="M16.004 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.257.59 4.46 1.713 6.4L3.2 28.8l6.57-1.72a12.74 12.74 0 0 0 6.234 1.612h.005c7.06 0 12.8-5.74 12.8-12.8s-5.745-12.692-12.805-12.692zm0 23.04h-.004a10.6 10.6 0 0 1-5.4-1.48l-.388-.23-4.003 1.05 1.07-3.9-.253-.4a10.56 10.56 0 0 1-1.62-5.61c0-5.87 4.78-10.64 10.65-10.64 2.845 0 5.518 1.11 7.53 3.122a10.57 10.57 0 0 1 3.118 7.53c-.002 5.87-4.78 10.648-10.64 10.648zm5.84-7.972c-.32-.16-1.894-.935-2.188-1.042-.293-.107-.507-.16-.72.16-.214.32-.826 1.042-1.013 1.256-.187.214-.373.24-.693.08-.32-.16-1.352-.498-2.576-1.59-.952-.85-1.594-1.9-1.78-2.22-.187-.32-.02-.493.14-.652.144-.143.32-.373.48-.56.16-.187.213-.32.32-.533.107-.214.053-.4-.027-.56-.08-.16-.72-1.736-.987-2.376-.26-.624-.524-.54-.72-.55l-.613-.01c-.214 0-.56.08-.853.4-.293.32-1.12 1.094-1.12 2.67 0 1.576 1.147 3.098 1.307 3.312.16.214 2.255 3.443 5.464 4.83.764.33 1.36.527 1.824.674.766.243 1.464.21 2.016.127.615-.092 1.894-.774 2.16-1.522.267-.747.267-1.388.187-1.522-.08-.133-.293-.213-.613-.373z" />
      </svg>
    </a>
  );
}
