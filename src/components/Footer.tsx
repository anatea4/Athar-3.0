'use client';
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

// Brand glyphs (lucide dropped brand icons) — single-path SVGs, tinted via currentColor.
const SOCIAL_ICONS: Record<string, string> = {
  whatsapp: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z',
  instagram: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
  facebook: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
  youtube: 'M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  twitter: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817-5.97 6.817H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  tiktok: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z',
  snapchat: 'M12.166 3.43c1.71.01 3.13 1.06 3.73 2.4.28.62.24 1.62.21 2.43-.01.18-.02.37-.02.55 0 .12.27.14.5.04.13-.06.27-.09.41-.09.32 0 .62.21.66.52.04.32-.22.55-.66.7-.05.02-.12.04-.19.06-.27.08-.7.21-.78.49-.05.18.03.4.24.69l.01.01c.05.07 1.16 1.66 2.7 1.91.21.04.36.22.35.43-.01.06-.02.12-.04.18-.16.38-.86.66-2.13.86-.04.06-.09.27-.12.41-.03.13-.06.27-.11.42-.05.16-.17.24-.36.24h-.03c-.13 0-.31-.03-.54-.08-.31-.07-.69-.14-1.16-.14-.27 0-.55.02-.83.07-.55.09-1.02.43-1.56.81-.71.51-1.51 1.08-2.74 1.08l-.12-.01h-.07l-.11.01c-1.23 0-2.03-.57-2.74-1.08-.54-.39-1.01-.72-1.56-.81-.28-.05-.56-.07-.83-.07-.49 0-.88.08-1.16.14-.22.05-.4.08-.54.08-.24 0-.34-.14-.39-.25-.05-.14-.08-.29-.11-.42-.03-.14-.08-.35-.12-.41-1.27-.2-1.97-.48-2.13-.87-.02-.05-.04-.11-.04-.17-.02-.21.14-.39.35-.43 1.54-.25 2.65-1.84 2.7-1.91l.01-.01c.21-.29.29-.51.24-.69-.08-.28-.51-.41-.78-.49-.07-.02-.14-.04-.19-.06-.59-.23-.71-.5-.66-.78.05-.27.36-.46.66-.46.09 0 .17.02.25.05.25.11.47.17.65.17.18 0 .27-.05.29-.06-.01-.18-.02-.37-.03-.56-.05-.81-.09-1.81.19-2.43.6-1.34 2.02-2.39 3.73-2.4z',
};
import { Language } from '@/types';
import { useFooter, useContact } from '@/lib/content-provider';
import { submitForm } from '@/lib/submit-form';
const atharLogo = '/athar-logo.png';
const logoFooter = '/logo-footer.png';

interface FooterProps {
  currentLang: Language;
}

const pick = (obj: any, field: string, lang: Language): string => {
  if (!obj) return '';
  if (lang === 'ms') return obj[`${field}Ms`] || obj[`${field}En`] || '';
  if (lang === 'en') return obj[`${field}En`] || obj[`${field}Ar`] || '';
  return obj[`${field}Ar`] || obj[`${field}En`] || '';
};

export default function Footer({ currentLang }: FooterProps) {
  const footer = useFooter();
  const contact = useContact();
  const [emailInput, setEmailInput] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !messageInput) return;
    submitForm('inquiry', { email: emailInput, message: messageInput });
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setEmailInput('');
      setMessageInput('');
    }, 4000);
  };

  return (
    <footer className="bg-brand-blue-dark text-white pt-16 pb-8 border-t border-brand-gold/30 relative select-none">
      <div className="absolute inset-0 islamic-pattern-dark opacity-10 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pb-12 border-b border-brand-gold/15">

          {/* Logo & Vision pillar */}
          <div className="lg:col-span-4 space-y-6 text-center lg:text-left rtl:lg:text-right">
            <div className="flex items-center justify-center lg:justify-start">
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white/95 border border-brand-gold/20 shadow-md overflow-hidden p-1">
                <img src={atharLogo} alt="Athar Academy Logo" className="h-full w-auto object-contain" />
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans font-medium">
              {pick(footer, 'aboutText', currentLang)}
            </p>

            {/* Social media icons — controlled from dashboard «معلومات التواصل» */}
            {(() => {
              const order: { key: string; label: string }[] = [
                { key: 'whatsapp', label: 'WhatsApp' },
                { key: 'instagram', label: 'Instagram' },
                { key: 'facebook', label: 'Facebook' },
                { key: 'youtube', label: 'YouTube' },
                { key: 'twitter', label: 'X' },
                { key: 'tiktok', label: 'TikTok' },
                { key: 'snapchat', label: 'Snapchat' },
              ];
              const active = order.filter((s) => (contact as any)[s.key]);
              if (active.length === 0) return null;
              return (
                <div className="flex flex-wrap items-center justify-center lg:justify-start rtl:lg:justify-end gap-2.5 pt-1">
                  {active.map(({ key, label }) => (
                    <a
                      key={key}
                      href={(contact as any)[key]}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      title={label}
                      className="h-9 w-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-brand-gold text-white hover:text-brand-blue-dark border border-brand-gold/25 transition-colors"
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                        <path d={SOCIAL_ICONS[key]} />
                      </svg>
                    </a>
                  ))}
                </div>
              );
            })()}

          </div>

          {/* Quick Contact Directory info */}
          <div className="lg:col-span-4 space-y-6 text-left rtl:text-right font-sans">
            <h3 className="text-sm font-bold text-brand-gold uppercase tracking-widest">
              {pick(footer, 'contactHeading', currentLang)}
            </h3>

            <ul className="space-y-4 text-xs sm:text-sm text-slate-300">
              <li className="flex items-center space-x-3.5 rtl:space-x-reverse">
                <Phone className="h-5 w-5 text-brand-gold shrink-0" />
                <span className="font-mono">{contact.phone || '+60147086011'}</span>
              </li>
              <li className="flex items-center space-x-3.5 rtl:space-x-reverse">
                <Mail className="h-5 w-5 text-brand-gold shrink-0" />
                <span className="font-sans">{contact.email || 'atharacademy6@gmail.com'}</span>
              </li>
              <li className="flex items-center space-x-3.5 rtl:space-x-reverse">
                <MapPin className="h-5 w-5 text-brand-gold shrink-0" />
                <span className="font-sans">
                  {currentLang === 'ms' ? 'Malaysia' : currentLang === 'en' ? 'Malaysia' : 'ماليزيا'}
                </span>
              </li>
            </ul>

            <div className="pt-3 text-[11px] text-slate-400 font-sans leading-relaxed">
              {currentLang === 'ms'
                ? 'Pasukan sokongan sedia membantu untuk pertanyaan pendaftaran dari Ahad hingga Khamis, 9:00 Pagi - 6:00 Petang (Waktu Malaysia).'
                : currentLang === 'en'
                ? 'Support team is available for registration queries from Sunday to Thursday, 9:00 AM - 6:00 PM (Malaysia Time).'
                : 'يسعد قسم إدارة القبول والتسجيل بـخدمتكم من الأحد إلى الخميس، من الساعة 9:00 صباحاً حتى 6:00 مساءً بتوقيت ماليزيا.'}
            </div>
          </div>

          {/* Interactive Advisory query form */}
          <div className="lg:col-span-4 space-y-6 text-left rtl:text-right">
            <h3 className="text-sm font-bold text-brand-gold uppercase tracking-widest">
              {currentLang === 'ms' ? 'Pertanyaan Penasihat Langsung' : currentLang === 'en' ? 'Direct Advisor Inquiry' : 'استفسار أكاديمي مباشر'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3 font-sans">
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder={currentLang === 'ms' ? 'Alamat e-mel anda...' : currentLang === 'en' ? 'Your email address...' : 'بريدك الإلكتروني للرد...'}
                className="w-full bg-brand-blue-light/30 border border-brand-gold/15 hover:border-brand-gold/50 text-xs sm:text-sm text-white rounded-xl py-3 px-4 outline-none focus:border-brand-gold transition-colors font-sans"
              />

              <textarea
                required
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder={currentLang === 'ms' ? 'Bagaimana kami boleh membantu? (cth. soalan penempatan adik-beradik)' : currentLang === 'en' ? 'How can we help? (e.g. sibling placement questions)' : 'اكتب استفسارك هنا تفصيلاً (مثل حجز مقابلة التسميع الأولى للطفل)...'}
                className="w-full bg-brand-blue-light/30 border border-brand-gold/15 hover:border-brand-gold/50 text-xs text-white rounded-xl py-3 px-4 outline-none h-20 focus:border-brand-gold transition-colors font-sans"
              />

              {isSubmitted && (
                <div className="bg-brand-gold/15 p-3 rounded-xl border border-brand-gold/30 text-brand-gold-light text-xs flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>
                    {currentLang === 'ms'
                      ? 'Pertanyaan diterima! Maklum balas penasihat akan dihantar tidak lama lagi.'
                      : currentLang === 'en'
                      ? 'Inquiry received! Advisor response will be sent shortly.'
                      : 'تم استلام الرسالة بنجاح! سيتواصل معك أحد المشرفين خلال بضع دقائق.'}
                  </span>
                </div>
              )}

              <button
                type="submit"
                className="flex items-center justify-center w-full bg-brand-gold hover:bg-brand-gold-light text-brand-blue-dark font-bold text-xs py-3 rounded-xl uppercase tracking-wider shadow-md transition-colors cursor-pointer select-none"
              >
                <Send className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0 shrink-0" />
                <span>{currentLang === 'ms' ? 'Hantar Pertanyaan' : currentLang === 'en' ? 'Submit Inquiry' : 'إرسال الرسالة للمشرف'}</span>
              </button>
            </form>
          </div>

        </div>

        {/* Footer Base copyright notes */}
        <div className="mt-4 flex flex-col sm:flex-row justify-between items-center text-xs text-[#94a3b8] font-sans gap-4 select-none">
          <div>
            {pick(footer, 'copyright', currentLang)}
          </div>
          <div className="flex items-center gap-3">
            <span>{currentLang === 'ms' ? 'Dibuat oleh' : currentLang === 'en' ? 'Made by' : 'صنع بواسطة'}</span>
            <img src={logoFooter} alt="Meem Design" className="h-12 w-auto object-contain brightness-125 contrast-105 opacity-90 hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>

      </div>
    </footer>
  );
}
