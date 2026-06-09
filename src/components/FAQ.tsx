'use client';
import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { FAQItem, Language, getLangField } from '@/types';
import { useFaqs } from '@/lib/content-provider';

interface FAQProps {
  currentLang: Language;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.215, 0.61, 0.355, 1] as any
    }
  }
};

export default function FAQ({ currentLang }: FAQProps) {
  const FAQS = useFaqs();
  const [activeCategory, setActiveCategory] = useState<'all' | 'admissions' | 'academics' | 'financial' | 'general'>('all');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);

  const filteredFaqs = (activeCategory === 'all'
    ? FAQS
    : FAQS.filter((f: any) => f.category === activeCategory)
  ).filter((f: any) => !f._hidden);

  const toggleExpand = (id: string) => {
    if (expandedFaqId === id) {
      setExpandedFaqId(null);
    } else {
      setExpandedFaqId(id);
    }
  };

  return (
    <section id="faq" className="py-20 bg-brand-sand selection:bg-brand-gold/30">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

        {/* Module Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center space-x-1.5 rtl:space-x-reverse text-brand-gold-dark">
            <HelpCircle className="h-5 w-5" />
            <span className="text-xs uppercase tracking-widest font-mono font-semibold">
              {currentLang === 'ms'
                ? 'Panduan Kemasukan & Akademi'
                : currentLang === 'en'
                  ? 'Admission & Academy Guideline'
                  : 'الاستفسارات والأسئلة الأكثر شيوعاً'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-blue-dark font-serif tracking-tight">
            {currentLang === 'ms'
              ? 'Jawapan kepada Soalan Utama'
              : currentLang === 'en'
                ? 'Answers to Key Questions'
                : 'دليل الإجابات الشافية'}
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto font-sans leading-relaxed">
            {currentLang === 'ms'
              ? 'Cari jawapan kepada soalan biasa mengenai kelayakan guru, keperluan umur, jadual waktu, dan geran bantuan kewangan langsung.'
              : currentLang === 'en'
                ? 'Find answers to common queries regarding teacher qualifications, age requirements, scheduling, and direct financial aid grants.'
                : 'طالع إجابات مفصلة وشفافة عن شروحات تحكيم الصوتيات، شروط قبول الصغار، آليات سداد الاشتراكات، ومنح الأثر الخيرية.'}
          </p>
        </div>

        {/* Category Filter Bar */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 font-sans">
          {[
            { id: 'all', en: 'All Questions', ar: 'كل الأسئلة', ms: 'Semua Soalan' },
            { id: 'admissions', en: 'Admissions & Place', ar: 'القبول والتسجيل', ms: 'Kemasukan & Pendaftaran' },
            { id: 'academics', en: 'Academics & Circles', ar: 'القرآن والتجويد', ms: 'Al-Quran & Tajwid' },
            { id: 'financial', en: 'Fees & Aid', ar: 'الرسوم والدعم المالي', ms: 'Yuran & Bantuan' },
            { id: 'general', en: 'General Portal', ar: 'متابعة أولياء الأمور', ms: 'Portal Umum' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-brand-blue-dark text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-brand-gold/10 hover:text-brand-blue border border-brand-gold/10'
              }`}
            >
              {currentLang === 'ms' ? cat.ms : currentLang === 'en' ? cat.en : cat.ar}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <motion.div
          key={activeCategory}
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-4 font-sans text-left rtl:text-right"
        >
          {filteredFaqs.map((faq) => {
            const isExpanded = expandedFaqId === faq.id;
            return (
              <motion.div
                key={faq.id}
                variants={itemVariants}
                className="bg-white rounded-2xl border border-brand-gold/15 shadow-sm overflow-hidden transition-all duration-300"
              >

                {/* Trigger Button */}
                <button
                  onClick={() => toggleExpand(faq.id)}
                  className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left rtl:text-right outline-none cursor-pointer focus:bg-brand-sand/30"
                >
                  <span className="text-xs sm:text-sm md:text-base font-bold text-brand-blue-dark font-sans leading-snug">
                    {getLangField(faq, 'question', currentLang)}
                  </span>

                  <span className="text-brand-gold shrink-0">
                    {isExpanded ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </span>
                </button>

                {/* Body Content */}
                {isExpanded && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-dashed border-brand-gold/10 bg-brand-sand/20 animate-in fade-in duration-300">
                    <p className="font-sans font-medium text-slate-600">
                      {getLangField(faq, 'answer', currentLang)}
                    </p>
                  </div>
                )}

              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
