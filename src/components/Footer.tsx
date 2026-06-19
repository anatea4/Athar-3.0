'use client';
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
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
