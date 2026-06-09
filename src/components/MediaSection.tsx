'use client';
import React, { useEffect } from 'react';
import { Newspaper, FileText, Download, Play, Image, Calendar, User } from 'lucide-react';
import { Language, getLangField } from '@/types';
import { MEDIA_NEWS, MEDIA_ARTICLES, DIGITAL_LIBRARY, GALLERY_ITEMS } from '@/data';

interface MediaSectionProps {
  currentLang: Language;
  activeSub?: string;
}

export default function MediaSection({ currentLang, activeSub }: MediaSectionProps) {
  const [activeTab, setActiveTab] = React.useState('news');

  useEffect(() => {
    if (activeSub) {
      if (activeSub === 'news') setActiveTab('news');
      else if (activeSub === 'articles') setActiveTab('articles');
      else if (activeSub === 'digital-library') setActiveTab('digital-library');
      else if (activeSub === 'gallery') setActiveTab('gallery');
    }
  }, [activeSub]);

  const tabs = [
    { id: 'news', labelAr: 'الأخبار والإعلانات', labelEn: 'News & Events', labelMs: 'Berita & Pengumuman', icon: <Newspaper className="h-4 w-4" /> },
    { id: 'articles', labelAr: 'المقالات التربوية', labelEn: 'Educational Articles', labelMs: 'Artikel Pendidikan', icon: <FileText className="h-4 w-4" /> },
    { id: 'digital-library', labelAr: 'المكتبة الرقمية', labelEn: 'Digital Library', labelMs: 'Perpustakaan Digital', icon: <Download className="h-4 w-4" /> },
    { id: 'gallery', labelAr: 'الصور والفيديو', labelEn: 'Photo & Video Gallery', labelMs: 'Galeri Foto & Video', icon: <Image className="h-4 w-4" /> },
  ];

  return (
    <section className="relative bg-brand-sand py-16 overflow-hidden min-h-[70vh]">
      <div className="absolute inset-0 islamic-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest font-bold text-brand-gold">
            {currentLang === 'ms' ? 'Bilik Berita & Sumber' : currentLang === 'en' ? 'Newsroom and resources' : 'المركز الإعلامي والموارد'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-blue-dark mt-2">
            {currentLang === 'ms' ? 'Perpustakaan Digital & Galeri' : currentLang === 'en' ? 'Digital Library & Gallery' : 'معرض الصور والمكتبة الرقمية'}
          </h2>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-row items-center justify-start lg:justify-center gap-2 mb-10 overflow-x-auto pb-4 lg:pb-0 scrollbar-none w-full">
          {tabs.map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3.5 text-xs font-bold rounded-full border transition-all duration-300 w-max shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-brand-blue-dark border-brand-gold text-brand-gold shadow-md'
                    : 'bg-white border-brand-gold/10 text-slate-600 hover:border-brand-gold/30 hover:text-brand-blue-dark'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{currentLang === 'ms' ? tab.labelMs : currentLang === 'en' ? tab.labelEn : tab.labelAr}</span>
              </button>
            );
          })}
        </div>

        {/* Content Box */}
        <div className="bg-white border border-brand-gold/15 rounded-3xl p-6 sm:p-10 shadow-sm min-h-[400px]">

          {/* NEWS & ANNOUNCEMENTS */}
          {activeTab === 'news' && (
            <div className="space-y-6 animate-in fade-in duration-500 text-right rtl:text-right ltr:text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-brand-blue-dark flex items-center gap-2 border-b border-brand-gold/15 pb-4">
                <Newspaper className="h-6 w-6 text-brand-gold" />
                <span>{currentLang === 'ms' ? 'Berita & Pengumuman Terkini' : currentLang === 'en' ? 'Latest News and Announcements' : 'آخر الأخبار والإعلانات الرسمية'}</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {MEDIA_NEWS.map((item) => (
                  <div key={item.id} className="p-5.5 bg-brand-gold/5 border border-brand-gold/10 rounded-2xl hover:border-brand-gold/30 transition-all duration-300 space-y-3">
                    <span className="text-[10px] text-brand-gold-dark font-sans font-bold flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {item.date}
                    </span>
                    <h4 className="text-base font-bold text-brand-blue-dark leading-snug">
                      {getLangField(item, 'title', currentLang)}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-500 font-sans leading-relaxed">
                      {getLangField(item, 'excerpt', currentLang)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ARTICLES */}
          {activeTab === 'articles' && (
            <div className="space-y-6 animate-in fade-in duration-500 text-right rtl:text-right ltr:text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-brand-blue-dark flex items-center gap-2 border-b border-brand-gold/15 pb-4">
                <FileText className="h-6 w-6 text-brand-gold" />
                <span>{currentLang === 'ms' ? 'Artikel Pendidikan' : currentLang === 'en' ? 'Educational Articles' : 'المقالات والبحوث التربوية'}</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {MEDIA_ARTICLES.map((art) => (
                  <div key={art.id} className="p-6 bg-white border-2 border-brand-gold/10 hover:border-brand-gold/30 rounded-2xl shadow-sm transition-all duration-300 space-y-3">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5 text-brand-gold" />
                      {getLangField(art, 'author', currentLang)}
                    </span>
                    <h4 className="text-base sm:text-lg font-bold text-brand-blue-dark leading-snug">
                      {getLangField(art, 'title', currentLang)}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-500 font-sans leading-relaxed">
                      {getLangField(art, 'excerpt', currentLang)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DIGITAL LIBRARY */}
          {activeTab === 'digital-library' && (
            <div className="space-y-6 animate-in fade-in duration-500 text-right rtl:text-right ltr:text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-brand-blue-dark flex items-center gap-2 border-b border-brand-gold/15 pb-4">
                <Download className="h-6 w-6 text-brand-gold" />
                <span>{currentLang === 'ms' ? 'Perpustakaan Digital & Sumber' : currentLang === 'en' ? 'Digital Library & Resources' : 'المكتبة الرقمية والمقررات'}</span>
              </h3>

              <div className="space-y-3 pt-2">
                {DIGITAL_LIBRARY.map((doc, idx) => (
                  <div key={idx} className="p-4 bg-brand-sand/60 border border-brand-gold/15 rounded-xl hover:bg-brand-gold/5 hover:border-brand-gold/45 transition-colors duration-300 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-brand-gold/10 text-brand-gold-dark rounded-lg font-bold text-xs uppercase font-sans">
                        {doc.type}
                      </div>
                      <div className="text-right rtl:text-right ltr:text-left space-y-0.5">
                        <h4 className="text-xs sm:text-sm font-bold text-brand-blue-dark">
                          {getLangField(doc, 'title', currentLang)}
                        </h4>
                        <span className="text-[10px] text-slate-400 font-sans font-medium">{doc.size}</span>
                      </div>
                    </div>
                    {/* Simulated download trigger */}
                    <button
                      onClick={() => alert(currentLang === 'ms' ? 'Memulakan muat turun...' : currentLang === 'en' ? 'Starting download...' : 'بدء تحميل الملف المختار...')}
                      className="p-2.5 bg-brand-blue hover:bg-brand-gold text-white hover:text-brand-blue-dark rounded-xl transition-all duration-300 shadow"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* GALLERY */}
          {activeTab === 'gallery' && (
            <div className="space-y-6 animate-in fade-in duration-500 text-right rtl:text-right ltr:text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-brand-blue-dark flex items-center gap-2 border-b border-brand-gold/15 pb-4">
                <Image className="h-6 w-6 text-brand-gold" />
                <span>{currentLang === 'ms' ? 'Galeri Media' : currentLang === 'en' ? 'Media Gallery' : 'معرض الصور وتغطيات الفيديو'}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
                {GALLERY_ITEMS.map((item) => (
                  <div key={item.id} className="bg-brand-sand/30 border border-brand-gold/10 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between group">
                    <div className="h-48 overflow-hidden relative">
                      {item.type === 'image' ? (
                        <img
                          src={item.url}
                          alt={getLangField(item, 'title', currentLang)}
                          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                        />
                      ) : (
                        <div className="relative w-full h-full bg-slate-900 flex items-center justify-center text-white">
                          <Play className="h-10 w-10 text-brand-gold" />
                          <span className="absolute bottom-2 left-2 text-[9px] uppercase tracking-wider font-sans bg-black/60 px-2 py-0.5 rounded">
                            {currentLang === 'ms' ? 'Liputan Video' : currentLang === 'en' ? 'Video Coverage' : 'تغطية مرئية'}
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>
                    <div className="p-4">
                      <h4 className="text-xs sm:text-sm font-bold text-brand-blue-dark">
                        {getLangField(item, 'title', currentLang)}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
