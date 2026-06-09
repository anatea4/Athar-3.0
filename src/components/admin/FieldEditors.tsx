'use client';
import React, { useState, useRef, createContext, useContext } from 'react';
import { Upload, Loader2, Image as ImageIcon, Trash2, ChevronUp, ChevronDown, Eye, EyeOff, Plus, GripVertical } from 'lucide-react';

// ---------------------------------------------------------------------------
// Active editing-language context (so the whole form shows one language at a time)
// ---------------------------------------------------------------------------
type EditLang = 'Ar' | 'En' | 'Ms';
const EditLangContext = createContext<EditLang>('Ar');
export const useEditLang = () => useContext(EditLangContext);

const LANGS: { key: EditLang; label: string; flag: string; dir: 'rtl' | 'ltr' }[] = [
  { key: 'Ar', label: 'العربية', flag: '🇸🇦', dir: 'rtl' },
  { key: 'En', label: 'English', flag: '🇬🇧', dir: 'ltr' },
  { key: 'Ms', label: 'Melayu', flag: '🇲🇾', dir: 'ltr' },
];

export function LanguageTabs({ value, onChange }: { value: EditLang; onChange: (l: EditLang) => void }) {
  return (
    <div className="inline-flex rounded-xl bg-slate-100 p-1 gap-1">
      {LANGS.map((l) => (
        <button
          key={l.key}
          type="button"
          onClick={() => onChange(l.key)}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${
            value === l.key
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <span>{l.flag}</span>
          {l.label}
        </button>
      ))}
    </div>
  );
}

export function EditLangProvider({ lang, children }: { lang: EditLang; children: React.ReactNode }) {
  return <EditLangContext.Provider value={lang}>{children}</EditLangContext.Provider>;
}

// ---------------------------------------------------------------------------
// Text field (single line / multiline)
// ---------------------------------------------------------------------------
export function TextField({
  label,
  value,
  onChange,
  dir,
  multiline,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  dir?: 'rtl' | 'ltr';
  multiline?: boolean;
  placeholder?: string;
}) {
  return (
    <div className="space-y-1.5">
      {label && <label className="block text-[13px] font-semibold text-slate-700">{label}</label>}
      {multiline ? (
        <textarea
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          dir={dir}
          rows={3}
          placeholder={placeholder}
          className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold resize-y bg-slate-50/50 focus:bg-white transition"
        />
      ) : (
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          dir={dir}
          placeholder={placeholder}
          className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold bg-slate-50/50 focus:bg-white transition"
        />
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Multilingual field — shows ONLY the active language (from context)
// ---------------------------------------------------------------------------
export function MultiLangField({
  label,
  obj,
  fieldBase,
  onChange,
  multiline,
}: {
  label: string;
  obj: any;
  fieldBase: string;
  onChange: (field: string, value: string) => void;
  multiline?: boolean;
}) {
  const lang = useEditLang();
  const meta = LANGS.find((l) => l.key === lang)!;
  const field = `${fieldBase}${lang}`;
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-1.5 text-[13px] font-semibold text-slate-700">
        {label}
        <span className="text-[10px] text-slate-400 font-normal">{meta.flag}</span>
      </label>
      {multiline ? (
        <textarea
          value={obj?.[field] || ''}
          onChange={(e) => onChange(field, e.target.value)}
          dir={meta.dir}
          rows={3}
          className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold resize-y bg-slate-50/50 focus:bg-white transition"
        />
      ) : (
        <input
          type="text"
          value={obj?.[field] || ''}
          onChange={(e) => onChange(field, e.target.value)}
          dir={meta.dir}
          className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold bg-slate-50/50 focus:bg-white transition"
        />
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Image upload field — big preview + upload button
// ---------------------------------------------------------------------------
export function ImageField({
  label,
  value,
  onChange,
  onToast,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  onToast?: (type: 'success' | 'error', msg: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (res.ok) {
        onChange(data.url);
        onToast?.('success', 'تم رفع الصورة ✓');
      } else {
        onToast?.('error', data.error || 'فشل الرفع');
      }
    } catch {
      onToast?.('error', 'خطأ في رفع الصورة');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-[13px] font-semibold text-slate-700">{label}</label>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          const f = e.dataTransfer.files?.[0];
          if (f) handleFile(f);
        }}
        className={`flex items-center gap-4 p-3 rounded-2xl border-2 border-dashed transition ${
          dragOver ? 'border-brand-gold bg-brand-gold-light' : 'border-slate-200 bg-slate-50/50'
        }`}
      >
        <div className="h-24 w-24 rounded-xl border border-slate-200 bg-white overflow-hidden flex items-center justify-center shrink-0 shadow-sm">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="preview" className="h-full w-full object-cover" />
          ) : (
            <ImageIcon className="h-7 w-7 text-slate-300" />
          )}
        </div>
        <div className="flex-1 space-y-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white text-sm font-bold px-4 py-2 rounded-xl disabled:opacity-60 transition"
          >
            {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            {uploading ? 'جارٍ الرفع...' : 'رفع صورة'}
          </button>
          <p className="text-[11px] text-slate-400">اسحب الصورة هنا أو اضغط الزر — JPG/PNG/WEBP حتى 5MB</p>
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder="أو الصق رابط صورة"
            dir="ltr"
            className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-[11px] focus:outline-none focus:border-brand-gold bg-white"
          />
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
          e.target.value = '';
        }}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Array item card with reorder / delete / hide controls
// ---------------------------------------------------------------------------
export function ArrayItemCard({
  index,
  total,
  title,
  hidden,
  onMoveUp,
  onMoveDown,
  onDelete,
  onToggleHide,
  children,
}: {
  index: number;
  total: number;
  title: string;
  hidden?: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDelete: () => void;
  onToggleHide: () => void;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`rounded-2xl border overflow-hidden transition shadow-sm ${
        hidden ? 'border-slate-200 bg-slate-100 opacity-70' : 'border-slate-200 bg-white'
      }`}
    >
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-l from-slate-50 to-white border-b border-slate-100">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2.5 text-sm font-bold text-slate-800 flex-1 text-right min-w-0"
        >
          <GripVertical className="h-4 w-4 text-slate-300 shrink-0" />
          <span className="inline-flex items-center justify-center h-6 w-6 bg-brand-gold text-white rounded-lg text-[11px] shrink-0">
            {index + 1}
          </span>
          <span className="truncate">{title || `عنصر ${index + 1}`}</span>
          <ChevronDown className={`h-4 w-4 text-slate-400 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
        <div className="flex items-center gap-0.5 shrink-0">
          <IconBtn onClick={onToggleHide} title={hidden ? 'إظهار' : 'إخفاء'}>
            {hidden ? <EyeOff className="h-4 w-4 text-slate-400" /> : <Eye className="h-4 w-4 text-emerald-600" />}
          </IconBtn>
          <IconBtn onClick={onMoveUp} disabled={index === 0} title="تحريك لأعلى">
            <ChevronUp className="h-4 w-4" />
          </IconBtn>
          <IconBtn onClick={onMoveDown} disabled={index === total - 1} title="تحريك لأسفل">
            <ChevronDown className="h-4 w-4" />
          </IconBtn>
          <IconBtn onClick={onDelete} title="حذف" danger>
            <Trash2 className="h-4 w-4 text-red-500" />
          </IconBtn>
        </div>
      </div>
      {open && <div className="p-5 space-y-4">{children}</div>}
    </div>
  );
}

function IconBtn({ children, onClick, disabled, title, danger }: any) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-2 rounded-lg transition disabled:opacity-30 ${danger ? 'hover:bg-red-50' : 'hover:bg-slate-100'}`}
    >
      {children}
    </button>
  );
}

export function AddItemButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-brand-gold/40 text-brand-gold-dark hover:bg-brand-gold-light hover:border-brand-gold font-bold py-3.5 rounded-2xl text-sm transition"
    >
      <Plus className="h-5 w-5" />
      {label}
    </button>
  );
}
