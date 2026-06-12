'use client';
import React, { useRef, useState } from 'react';
import { Upload, Loader2, FileText, Trash2, Plus, ExternalLink, ChevronUp, ChevronDown } from 'lucide-react';

type Toast = (type: 'success' | 'error', msg: string) => void;

interface LibItem {
  titleAr?: string;
  titleEn?: string;
  titleMs?: string;
  type?: string;
  size?: string;
  url?: string;
}

function formatSize(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  if (bytes >= 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${bytes} B`;
}

function detectType(name: string): string {
  const ext = (name.split('.').pop() || '').toLowerCase();
  const map: Record<string, string> = {
    pdf: 'PDF', doc: 'Word', docx: 'Word', xls: 'Excel', xlsx: 'Excel',
    ppt: 'PowerPoint', pptx: 'PowerPoint', txt: 'نص', rtf: 'نص',
    zip: 'ZIP', mp3: 'صوت', wav: 'صوت', ogg: 'صوت',
    png: 'صورة', jpg: 'صورة', jpeg: 'صورة', webp: 'صورة', gif: 'صورة',
  };
  return map[ext] || (ext ? ext.toUpperCase() : 'ملف');
}

export default function DigitalLibraryEditor({
  value,
  onChange,
  onToast,
}: {
  value: any;
  onChange: (next: LibItem[]) => void;
  onToast?: Toast;
}) {
  const items: LibItem[] = Array.isArray(value) ? value : [];

  const update = (i: number, patch: Partial<LibItem>) =>
    onChange(items.map((it, idx) => (idx === i ? { ...it, ...patch } : it)));
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i));
  const move = (i: number, dir: number) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  const add = () =>
    onChange([...items, { titleAr: '', titleEn: '', titleMs: '', type: 'PDF', size: '', url: '' }]);

  return (
    <div className="space-y-4">
      {items.map((it, i) => (
        <ItemCard
          key={i}
          item={it}
          index={i}
          total={items.length}
          onUpdate={(p) => update(i, p)}
          onRemove={() => remove(i)}
          onMove={(d) => move(i, d)}
          onToast={onToast}
        />
      ))}

      <button
        type="button"
        onClick={add}
        className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-brand-gold/40 text-brand-gold-dark hover:bg-brand-gold-light hover:border-brand-gold font-bold py-3.5 rounded-2xl text-sm transition"
      >
        <Plus className="h-5 w-5" />
        إضافة ملف جديد
      </button>
    </div>
  );
}

function ItemCard({
  item,
  index,
  total,
  onUpdate,
  onRemove,
  onMove,
  onToast,
}: {
  item: LibItem;
  index: number;
  total: number;
  onUpdate: (patch: Partial<LibItem>) => void;
  onRemove: () => void;
  onMove: (dir: number) => void;
  onToast?: Toast;
}) {
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (res.ok) {
        // Auto-fill the URL + size + type from the uploaded file
        onUpdate({ url: data.url, size: formatSize(file.size), type: detectType(file.name) });
        onToast?.('success', 'تم رفع الملف ✓');
      } else {
        onToast?.('error', data.error || 'فشل الرفع');
      }
    } catch {
      onToast?.('error', 'خطأ في رفع الملف');
    } finally {
      setUploading(false);
    }
  };

  const fileName = item.url ? decodeURIComponent(item.url.split('/').pop()!.split('?')[0]) : '';

  return (
    <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-l from-slate-50 to-white border-b border-slate-100">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2.5 text-sm font-bold text-slate-800 flex-1 text-right min-w-0"
        >
          <span className="inline-flex items-center justify-center h-6 w-6 bg-brand-gold text-white rounded-lg text-[11px] shrink-0">
            {index + 1}
          </span>
          <FileText className={`h-4 w-4 shrink-0 ${item.url ? 'text-emerald-600' : 'text-slate-300'}`} />
          <span className="truncate">{item.titleAr || `ملف ${index + 1}`}</span>
        </button>
        <div className="flex items-center gap-0.5 shrink-0">
          <button type="button" onClick={() => onMove(-1)} disabled={index === 0} className="p-2 rounded-lg hover:bg-slate-100 disabled:opacity-30" title="لأعلى"><ChevronUp className="h-4 w-4" /></button>
          <button type="button" onClick={() => onMove(1)} disabled={index === total - 1} className="p-2 rounded-lg hover:bg-slate-100 disabled:opacity-30" title="لأسفل"><ChevronDown className="h-4 w-4" /></button>
          <button type="button" onClick={onRemove} className="p-2 rounded-lg hover:bg-red-50" title="حذف"><Trash2 className="h-4 w-4 text-red-500" /></button>
        </div>
      </div>

      {open && (
        <div className="p-5 space-y-4">
          {/* Titles */}
          <div className="grid grid-cols-1 gap-3">
            <Field label="العنوان (عربي)" value={item.titleAr || ''} dir="rtl" onChange={(v) => onUpdate({ titleAr: v })} />
            <Field label="Title (English)" value={item.titleEn || ''} dir="ltr" onChange={(v) => onUpdate({ titleEn: v })} />
            <Field label="Tajuk (Melayu)" value={item.titleMs || ''} dir="ltr" onChange={(v) => onUpdate({ titleMs: v })} />
          </div>

          {/* File upload */}
          <div className="space-y-2">
            <label className="block text-[13px] font-semibold text-slate-700">الملف (يُحمَّل ويصبح قابلاً للتنزيل)</label>
            <div className="flex items-center gap-4 p-3 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50">
              <div className="h-16 w-16 rounded-xl border border-slate-200 bg-white flex items-center justify-center shrink-0 shadow-sm">
                <FileText className={`h-7 w-7 ${item.url ? 'text-brand-gold-dark' : 'text-slate-300'}`} />
              </div>
              <div className="flex-1 space-y-2 min-w-0">
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  disabled={uploading}
                  className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white text-sm font-bold px-4 py-2 rounded-xl disabled:opacity-60 transition"
                >
                  {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                  {uploading ? 'جارٍ الرفع...' : item.url ? 'استبدال الملف' : 'رفع ملف'}
                </button>
                {item.url && (
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[11px] text-brand-gold-dark hover:underline">
                    <ExternalLink className="h-3 w-3 shrink-0" />
                    <span className="truncate" dir="ltr">{fileName}</span>
                  </a>
                )}
                <p className="text-[11px] text-slate-400">PDF / Word / Excel / PowerPoint / صورة — حتى 25MB. يُحسب الحجم والنوع تلقائياً.</p>
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[10px] text-slate-400 font-bold shrink-0">أو الصق رابط:</span>
                  <input
                    type="text"
                    value={item.url || ''}
                    onChange={(e) => {
                      const v = e.target.value;
                      onUpdate({ url: v, type: detectType(v) });
                    }}
                    placeholder="https://..."
                    dir="ltr"
                    className="flex-1 min-w-0 px-3 py-1.5 border border-slate-200 rounded-lg text-[11px] focus:outline-none focus:border-brand-gold bg-white"
                  />
                </div>
              </div>
            </div>
            <input
              ref={inputRef}
              type="file"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFile(f);
                e.target.value = '';
              }}
            />
          </div>

          {/* Auto-filled meta (editable if needed) */}
          <div className="grid grid-cols-2 gap-3">
            <Field label="النوع" value={item.type || ''} dir="rtl" onChange={(v) => onUpdate({ type: v })} />
            <Field label="الحجم" value={item.size || ''} dir="ltr" onChange={(v) => onUpdate({ size: v })} />
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, value, onChange, dir }: { label: string; value: string; onChange: (v: string) => void; dir?: 'rtl' | 'ltr' }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[13px] font-semibold text-slate-700">{label}</label>
      <input
        type="text"
        value={value}
        dir={dir}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold bg-slate-50/50 focus:bg-white transition"
      />
    </div>
  );
}

