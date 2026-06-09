'use client';
import React, { useState } from 'react';
import { Phone, Mail, Globe, Send, CheckCircle2 } from 'lucide-react';
import { Language } from '@/types';
import { CONTACT_DETAILS } from '@/data';

interface ContactSectionProps {
  currentLang: Language;
}

export default function ContactSection({ currentLang }: ContactSectionProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [msg, setMsg] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !msg) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setName('');
      setPhone('');
      setMsg('');
    }, 4500);
  };

  return (
    <section className="relative bg-brand-sand py-16 overflow-hidden min-h-[70vh]">
      <div className="absolute inset-0 islamic-pattern opacity-10 pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest font-bold text-brand-gold">
            {currentLang === 'ms' ? 'Hubungi Kami' : currentLang === 'en' ? 'Get In Touch' : 'تواصل معنا'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-blue-dark mt-2">
            {currentLang === 'ms' ? 'Hubungi Akademi Athar' : currentLang === 'en' ? 'Contact Athar Academy' : 'قنوات الاتصال والتواصل المباشر'}
          </h2>
        </div>

        <div className="bg-white border border-brand-gold/15 rounded-3xl p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Contact Channels Grid */}
            <div className="lg:col-span-5 space-y-6 text-right rtl:text-right ltr:text-left">
              <h3 className="text-lg font-bold text-brand-blue-dark border-b border-slate-100 pb-3">
                {currentLang === 'ms' ? 'Saluran Rasmi' : currentLang === 'en' ? 'Official Channels' : 'أرقام وحسابات الأكاديمية'}
              </h3>

              <div className="space-y-4 font-sans text-xs sm:text-sm text-slate-600">
                <a
                  href={`tel:${CONTACT_DETAILS.phone}`}
                  className="flex items-center gap-4 bg-brand-gold/5 border border-brand-gold/10 hover:border-brand-gold/45 p-4 rounded-xl transition-colors"
                >
                  <div className="p-2.5 bg-brand-gold/10 text-brand-gold-dark rounded-lg">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div className="text-right rtl:text-right ltr:text-left">
                    <span className="text-[10px] text-slate-400 block font-bold uppercase">
                      {currentLang === 'ms' ? 'No. Telefon / WhatsApp' : currentLang === 'en' ? 'Phone / WhatsApp' : 'رقم الهاتف والواتساب'}
                    </span>
                    <span className="font-bold text-brand-blue-dark font-sans text-sm sm:text-base">{CONTACT_DETAILS.phone}</span>
                  </div>
                </a>

                <a
                  href={`mailto:${CONTACT_DETAILS.email}`}
                  className="flex items-center gap-4 bg-brand-gold/5 border border-brand-gold/10 hover:border-brand-gold/45 p-4 rounded-xl transition-colors"
                >
                  <div className="p-2.5 bg-brand-gold/10 text-brand-gold-dark rounded-lg">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="text-right rtl:text-right ltr:text-left">
                    <span className="text-[10px] text-slate-400 block font-bold uppercase">
                      {currentLang === 'ms' ? 'Alamat E-mel' : currentLang === 'en' ? 'Email Address' : 'البريد الإلكتروني'}
                    </span>
                    <span className="font-bold text-brand-blue-dark font-sans">{CONTACT_DETAILS.email}</span>
                  </div>
                </a>

                <a
                  href={`https://${CONTACT_DETAILS.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-brand-gold/5 border border-brand-gold/10 hover:border-brand-gold/45 p-4 rounded-xl transition-colors"
                >
                  <div className="p-2.5 bg-brand-gold/10 text-brand-gold-dark rounded-lg">
                    <Globe className="h-5 w-5" />
                  </div>
                  <div className="text-right rtl:text-right ltr:text-left">
                    <span className="text-[10px] text-slate-400 block font-bold uppercase">
                      {currentLang === 'ms' ? 'Laman Web Rasmi' : currentLang === 'en' ? 'Official Site' : 'الموقع الإلكتروني'}
                    </span>
                    <span className="font-bold text-brand-blue-dark font-sans">{CONTACT_DETAILS.website}</span>
                  </div>
                </a>
              </div>

              {/* Social networks */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                  {currentLang === 'ms' ? 'Ikuti Perkembangan Kami' : currentLang === 'en' ? 'Follow Our Updates' : 'تابع تغطياتنا على المنصات:'}
                </span>
                <div className="flex gap-2.5">
                  <a
                    href={CONTACT_DETAILS.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-brand-blue-light/10 text-brand-gold hover:bg-brand-gold hover:text-brand-blue-dark border border-brand-gold/15 rounded-xl transition-all shadow-sm"
                    title="Instagram"
                  >
                    <Globe className="h-5 w-5" />
                  </a>
                  <a
                    href={CONTACT_DETAILS.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-brand-blue-light/10 text-brand-gold hover:bg-brand-gold hover:text-brand-blue-dark border border-brand-gold/15 rounded-xl transition-all shadow-sm"
                    title="Facebook"
                  >
                    <Globe className="h-5 w-5" />
                  </a>
                  <a
                    href={CONTACT_DETAILS.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-brand-blue-light/10 text-brand-gold hover:bg-brand-gold hover:text-brand-blue-dark border border-brand-gold/15 rounded-xl transition-all shadow-sm"
                    title="Youtube"
                  >
                    <Globe className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Direct message Form */}
            <div className="lg:col-span-7 bg-brand-sand/40 border border-brand-gold/15 p-6 sm:p-8 rounded-3xl">
              <h3 className="text-lg font-bold text-brand-blue-dark mb-4 text-right rtl:text-right ltr:text-left">
                {currentLang === 'ms' ? 'Hantar Mesej Terus' : currentLang === 'en' ? 'Send Direct Message' : 'تواصل معنا بشكل مباشر'}
              </h3>

              {sent ? (
                <div className="text-center py-12 space-y-3 animate-in zoom-in duration-300">
                  <div className="p-3 bg-emerald-100 text-emerald-600 rounded-full inline-block">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h4 className="text-base font-bold text-brand-blue-dark">
                    {currentLang === 'ms' ? 'Mesej Berjaya Dihantar!' : currentLang === 'en' ? 'Message Dispatched Successfully!' : 'تم إرسال رسالتك بنجاح!'}
                  </h4>
                  <p className="text-xs text-slate-500 font-sans">
                    {currentLang === 'ms' ? 'Pengurus penyelaras kami akan menyemak dan menghubungi telefon anda.' : currentLang === 'en' ? 'Our coordination managers will review and write back to your phone.' : 'سيتلقى المشرفون طلبك ويتم التجاوب معك عبر الواتساب/الهاتف.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm font-sans">
                  <div className="flex flex-col space-y-1 text-right rtl:text-right ltr:text-left">
                    <label className="font-bold text-slate-700">{currentLang === 'ms' ? 'Nama Anda' : currentLang === 'en' ? 'Your Name' : 'اسمك الكريم'}</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={currentLang === 'ms' ? 'cth. Abdullah Ahmad' : currentLang === 'en' ? 'e.g. Abdullah Ahmad' : 'مثال: عبد الله أحمد'}
                      className="border border-brand-gold/20 focus:border-brand-gold outline-none p-3 rounded-xl bg-white text-slate-800"
                      required
                        />
                  </div>

                  <div className="flex flex-col space-y-1 text-right rtl:text-right ltr:text-left">
                    <label className="font-bold text-slate-700">{currentLang === 'ms' ? 'No. Telefon / WhatsApp' : currentLang === 'en' ? 'Phone / WhatsApp' : 'رقم الهاتف والواتساب'}</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 0147086011"
                      className="border border-brand-gold/20 focus:border-brand-gold outline-none p-3 rounded-xl bg-white text-slate-800 text-left rtl:text-right"
                      required
                    />
                  </div>

                  <div className="flex flex-col space-y-1 text-right rtl:text-right ltr:text-left">
                    <label className="font-bold text-slate-700">{currentLang === 'ms' ? 'Mesej Anda' : currentLang === 'en' ? 'Your Message' : 'نص الاستفسار أو الرسالة'}</label>
                    <textarea
                      value={msg}
                      onChange={(e) => setMsg(e.target.value)}
                      placeholder={currentLang === 'ms' ? 'Tulis butiran anda di sini...' : currentLang === 'en' ? 'Type your details here...' : 'اكتب تفاصيل استفسارك أو رغبتك هنا...'}
                      rows={4}
                      className="border border-brand-gold/20 focus:border-brand-gold outline-none p-3 rounded-xl bg-white text-slate-800"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-brand-blue hover:bg-brand-gold hover:text-brand-blue-dark text-white font-bold py-3.5 rounded-xl shadow-md transition-colors cursor-pointer"
                  >
                    <Send className="h-4 w-4" />
                    <span>{currentLang === 'ms' ? 'Hantar Mesej' : currentLang === 'en' ? 'Send Message' : 'إرسال الرسالة الآن'}</span>
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
