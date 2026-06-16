'use client';
import React, { useEffect } from 'react';
import { Newspaper, FileText, Download, Play, Image, Calendar, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { Language, getLangField } from '@/types';
import { useMediaNews, useMediaArticles, useDigitalLibrary, useGallery, useCalendar } from '@/lib/content-provider';

interface MediaSectionProps {
  currentLang: Language;
  activeSub?: string;
  // When provided, tab clicks navigate (update the URL to /media/<tab>) instead of switching locally.
  onNavigate?: (section: string, sub: string) => void;
}

// Detect media type from any pasted URL (image / YouTube / Vimeo / direct video)
function getMedia(url: string): { kind: 'image' | 'youtube' | 'vimeo' | 'video'; src: string } {
  const u = (url || '').trim();
  const yt = u.match(/(?:youtube\.com\/(?:.*[?&]v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
  if (yt) return { kind: 'youtube', src: `https://www.youtube.com/embed/${yt[1]}` };
  const vm = u.match(/vimeo\.com\/(\d+)/);
  if (vm) return { kind: 'vimeo', src: `https://player.vimeo.com/video/${vm[1]}` };
  if (/\.(mp4|webm|ogg)(\?|#|$)/i.test(u)) return { kind: 'video', src: u };
  return { kind: 'image', src: u };
}

// Normalize a pasted file link so the download button opens the actual file.
// Google Drive "…/file/d/<ID>/view?usp=sharing" → direct-download link.
function fileLink(url: string): string {
  const u = (url || '').trim();
  const drive = u.match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:.*&)?id=)([\w-]{20,})/i);
  if (drive) return `https://drive.google.com/uc?export=download&id=${drive[1]}`;
  return u;
}

export default function MediaSection({ currentLang, activeSub, onNavigate }: MediaSectionProps) {
  const MEDIA_NEWS = useMediaNews();
  const MEDIA_ARTICLES = useMediaArticles();
  const DIGITAL_LIBRARY = useDigitalLibrary();
  const GALLERY_ITEMS = useGallery();
  const CALENDAR = useCalendar();
  const [activeTab, setActiveTab] = React.useState(activeSub || 'news');
  const [galleryIndex, setGalleryIndex] = React.useState(0);

  useEffect(() => {
    if (activeSub) setActiveTab(activeSub);
  }, [activeSub]);

  const tabs = [
    { id: 'news', labelAr: 'الأخبار والإعلانات', labelEn: 'News & Events', labelMs: 'Berita & Pengumuman', icon: <Newspaper className="h-4 w-4" /> },
    { id: 'articles', labelAr: 'المقالات التربوية', labelEn: 'Educational Articles', labelMs: 'Artikel Pendidikan', icon: <FileText className="h-4 w-4" /> },
    { id: 'digital-library', labelAr: 'المكتبة الرقمية', labelEn: 'Digital Library', labelMs: 'Perpustakaan Digital', icon: <Download className="h-4 w-4" /> },
    { id: 'gallery', labelAr: 'الصور والفيديو', labelEn: 'Photo & Video Gallery', labelMs: 'Galeri Foto & Video', icon: <Image className="h-4 w-4" /> },
    { id: 'annual-calendar', labelAr: 'التقويم السنوي', labelEn: 'Annual Calendar', labelMs: 'Kalendar Tahunan', icon: <Calendar className="h-4 w-4" /> },
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
                onClick={() => (onNavigate ? onNavigate('media', tab.id) : setActiveTab(tab.id))}
                className={`flex items-center gap-2 px-5 py-3.5 text-xs font-bold rounded-full border transition-all duration-300 w-max shrink-0 cursor-pointer ${isSelected
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
                    {/* Download / open the file link if provided */}
                    {(doc as any).url ? (
                      <a
                        href={fileLink((doc as any).url)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 bg-brand-blue hover:bg-brand-gold text-white hover:text-brand-blue-dark rounded-xl transition-all duration-300 shadow"
                        title={currentLang === 'ar' ? 'تحميل / فتح' : 'Download / Open'}
                      >
                        <Download className="h-4 w-4" />
                      </a>
                    ) : (
                      <span className="p-2.5 bg-slate-200 text-slate-400 rounded-xl" title={currentLang === 'ar' ? 'أضف رابط الملف من لوحة التحكم' : 'Add file link from dashboard'}>
                        <Download className="h-4 w-4" />
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* GALLERY — slider (images & videos auto-detected from URL) */}
          {activeTab === 'gallery' && (() => {
            const items = (GALLERY_ITEMS || []).filter((i: any) => !i._hidden);
            const len = items.length;
            const idx = len ? ((galleryIndex % len) + len) % len : 0;
            const cur: any = items[idx];
            const media = cur ? getMedia(cur.url) : null;
            const go = (d: number) => setGalleryIndex((p) => (((p + d) % len) + len) % len);
            return (
              <div className="space-y-6 animate-in fade-in duration-500 text-right rtl:text-right ltr:text-left">
                <h3 className="text-xl sm:text-2xl font-bold text-brand-blue-dark flex items-center gap-2 border-b border-brand-gold/15 pb-4">
                  <Image className="h-6 w-6 text-brand-gold" />
                  <span>{currentLang === 'ms' ? 'Galeri Media' : currentLang === 'en' ? 'Media Gallery' : 'معرض الصور وتغطيات الفيديو'}</span>
                </h3>

                {len === 0 || !media ? (
                  <p className="text-center text-slate-400 py-16">{currentLang === 'ar' ? 'لا توجد وسائط بعد.' : 'No media yet.'}</p>
                ) : (
                  <div className="space-y-4">
                    {/* Main stage */}
                    <div className="relative rounded-3xl overflow-hidden bg-brand-blue-dark border border-brand-gold/20 shadow-lg aspect-video">
                      {media.kind === 'image' ? (
                        <img src={media.src} alt={getLangField(cur, 'title', currentLang)} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                      ) : media.kind === 'video' ? (
                        <video src={media.src} controls className="w-full h-full object-contain bg-black" />
                      ) : (
                        <iframe src={media.src} title={getLangField(cur, 'title', currentLang)} className="w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                      )}

                      {len > 1 && (
                        <>
                          <button onClick={() => go(-1)} className="absolute top-1/2 -translate-y-1/2 left-3 h-10 w-10 rounded-full bg-white/90 hover:bg-white text-brand-blue-dark flex items-center justify-center shadow-lg">
                            <ChevronLeft className="h-5 w-5" />
                          </button>
                          <button onClick={() => go(1)} className="absolute top-1/2 -translate-y-1/2 right-3 h-10 w-10 rounded-full bg-white/90 hover:bg-white text-brand-blue-dark flex items-center justify-center shadow-lg">
                            <ChevronRight className="h-5 w-5" />
                          </button>
                        </>
                      )}
                    </div>

                    {/* Caption */}
                    {getLangField(cur, 'title', currentLang) && (
                      <p className="text-center text-sm font-bold text-brand-blue-dark">{getLangField(cur, 'title', currentLang)}</p>
                    )}

                    {/* Thumbnails / dots */}
                    {len > 1 && (
                      <div className="flex items-center justify-center gap-2 flex-wrap">
                        {items.map((it: any, i: number) => {
                          const m = getMedia(it.url);
                          return (
                            <button
                              key={i}
                              onClick={() => setGalleryIndex(i)}
                              className={`h-14 w-20 rounded-lg overflow-hidden border-2 transition ${i === idx ? 'border-brand-gold scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}
                            >
                              {m.kind === 'image' ? (
                                <img src={m.src} alt="" className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full bg-brand-blue-dark flex items-center justify-center">
                                  <Play className="h-5 w-5 text-brand-gold" />
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })()}

          {/* ANNUAL CALENDAR */}
          {activeTab === 'annual-calendar' && (
            <div className="space-y-6 animate-in fade-in duration-500 text-right rtl:text-right ltr:text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-brand-blue-dark flex items-center gap-2 border-b border-brand-gold/15 pb-4">
                <Calendar className="h-6 w-6 text-brand-gold" />
                <span>{getLangField(CALENDAR, 'title', currentLang)}</span>
              </h3>

              {getLangField(CALENDAR, 'desc', currentLang) && (
                <p className="text-slate-500 font-sans text-sm leading-relaxed">{getLangField(CALENDAR, 'desc', currentLang)}</p>
              )}

              {CALENDAR.image && (
                <img src={CALENDAR.image} alt={getLangField(CALENDAR, 'title', currentLang)} className="w-full rounded-2xl border border-brand-gold/15 shadow-sm object-cover max-h-[480px]" />
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {(CALENDAR.events || []).map((ev: any, i: number) => (
                  <div key={i} className="flex items-center gap-4 bg-brand-gold/5 border border-brand-gold/15 rounded-2xl p-4">
                    <div className="flex flex-col items-center justify-center h-16 w-16 shrink-0 rounded-2xl bg-brand-blue-dark text-brand-gold font-bold">
                      <Calendar className="h-5 w-5" />
                      <span className="text-[10px] mt-0.5">{currentLang === 'en' ? (ev.dateEn || ev.dateAr) : (ev.dateAr || ev.dateEn)}</span>
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-brand-blue-dark">{getLangField(ev, 'title', currentLang)}</h4>
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
