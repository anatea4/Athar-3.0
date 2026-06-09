'use client';
import React, { useEffect, useRef, useState } from 'react';
import { RefreshCw, Monitor, Smartphone, ExternalLink } from 'lucide-react';

// Map admin section keys → site (section, subSection) so the preview shows the right place
const PREVIEW_NAV: Record<string, [string, string]> = {
  hero: ['home', ''],
  stats: ['about', 'stats'],
  about: ['about', 'who-we-are'],
  team: ['about', 'who-we-are'],
  partners: ['about', 'who-we-are'],
  faqs: ['about', 'faq'],
  programs: ['programs', 'quran-circles'],
  detailed_programs: ['programs', 'quran-circles'],
  initiatives: ['support', 'initiatives-list'],
  volunteers: ['support', 'support-athar'],
  media_news: ['media', 'news'],
  media_articles: ['media', 'articles'],
  digital_library: ['media', 'digital-library'],
  gallery: ['media', 'gallery'],
  daily_ayahs: ['solutions', 'ayah-reflection'],
  ai_companion: ['solutions', ''],
  contact: ['contact', ''],
  footer: ['home', ''],
  header: ['home', ''],
};

const LANGS = [
  { key: 'ar', label: 'ع' },
  { key: 'en', label: 'EN' },
  { key: 'ms', label: 'MS' },
];

export default function PreviewPane({ section, data }: { section: string; data: any }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [ready, setReady] = useState(false);
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [lang, setLang] = useState('ar');

  const post = (msg: any) => {
    iframeRef.current?.contentWindow?.postMessage(msg, '*');
  };

  // Wait for the iframe's ContentProvider to announce readiness
  useEffect(() => {
    function onMsg(e: MessageEvent) {
      if (e.data?.type === 'athar-preview-ready') setReady(true);
    }
    window.addEventListener('message', onMsg);
    return () => window.removeEventListener('message', onMsg);
  }, []);

  // When ready or section changes: navigate + push initial content + lang
  useEffect(() => {
    if (!ready) return;
    const nav = PREVIEW_NAV[section] || ['home', ''];
    post({ type: 'athar-preview-nav', section: nav[0], subSection: nav[1] });
    post({ type: 'athar-preview-lang', lang });
    post({ type: 'athar-preview-content', section, data });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, section]);

  // Push content live as the admin edits (debounced)
  useEffect(() => {
    if (!ready) return;
    const t = setTimeout(() => post({ type: 'athar-preview-content', section, data }), 200);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, ready, section]);

  // Push language changes
  useEffect(() => {
    if (ready) post({ type: 'athar-preview-lang', lang });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang, ready]);

  const reload = () => {
    setReady(false);
    if (iframeRef.current) {
      // eslint-disable-next-line no-self-assign
      iframeRef.current.src = iframeRef.current.src;
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-7rem)] sticky top-24">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-2 mb-2 px-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500">معاينة حية</span>
          {!ready && <span className="text-[10px] text-amber-600">جارٍ التحميل...</span>}
        </div>
        <div className="flex items-center gap-1.5">
          {/* language */}
          <div className="flex rounded-lg bg-slate-100 p-0.5">
            {LANGS.map((l) => (
              <button
                key={l.key}
                onClick={() => setLang(l.key)}
                className={`px-2 py-0.5 rounded text-[11px] font-bold ${lang === l.key ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}
              >
                {l.label}
              </button>
            ))}
          </div>
          {/* device */}
          <button
            onClick={() => setDevice(device === 'desktop' ? 'mobile' : 'desktop')}
            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600"
            title={device === 'desktop' ? 'عرض الجوال' : 'عرض الحاسوب'}
          >
            {device === 'desktop' ? <Smartphone className="h-4 w-4" /> : <Monitor className="h-4 w-4" />}
          </button>
          <button onClick={reload} className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600" title="إعادة تحميل">
            <RefreshCw className="h-4 w-4" />
          </button>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600"
            title="فتح الموقع في تبويب جديد"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Frame */}
      <div className="flex-1 rounded-2xl border border-slate-200 bg-slate-100 overflow-hidden shadow-inner flex items-center justify-center p-2">
        <div
          className={`bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 ${
            device === 'mobile' ? 'w-[390px] max-w-full h-full' : 'w-full h-full'
          }`}
        >
          <iframe
            ref={iframeRef}
            src="/?preview=1"
            className="w-full h-full border-0"
            title="معاينة الموقع"
          />
        </div>
      </div>
    </div>
  );
}
