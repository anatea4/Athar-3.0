'use client';
import React, { useState, useRef, createContext, useContext } from 'react';
import { Upload, Loader2, Image as ImageIcon, Trash2, ChevronUp, ChevronDown, Eye, EyeOff, Plus, GripVertical, FileText, ExternalLink, SlidersHorizontal, Crop } from 'lucide-react';
import { parseImg, buildImg, imgStyle, type ImgSettings } from '@/lib/img';
import ImageCropper from '@/components/admin/ImageCropper';

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
  const [showAdjust, setShowAdjust] = useState(false);
  const [cropping, setCropping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { src, settings } = parseImg(value);
  const update = (patch: Partial<ImgSettings>) => onChange(buildImg(src, { ...settings, ...patch }));

  const handleFile = async (file: File) => {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (res.ok) {
        onChange(buildImg(data.url, settings)); // keep current adjustments
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

  // 3×3 focal grid → object-position values
  const POS_GRID: { pos: string; label: string }[] = [
    { pos: 'left top', label: '↖' }, { pos: 'center top', label: '↑' }, { pos: 'right top', label: '↗' },
    { pos: 'left center', label: '←' }, { pos: 'center center', label: '●' }, { pos: 'right center', label: '→' },
    { pos: 'left bottom', label: '↙' }, { pos: 'center bottom', label: '↓' }, { pos: 'right bottom', label: '↘' },
  ];
  const curPos = settings.pos || 'center center';
  const curFit = settings.fit || 'cover';
  const curZoom = settings.zoom || 100;

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
          {src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={src} alt="preview" className="h-full w-full" style={{ objectFit: curFit, ...imgStyle(settings) }} />
          ) : (
            <ImageIcon className="h-7 w-7 text-slate-300" />
          )}
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white text-sm font-bold px-4 py-2 rounded-xl disabled:opacity-60 transition"
            >
              {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
              {uploading ? 'جارٍ الرفع...' : 'رفع صورة'}
            </button>
            {src && (
              <button
                type="button"
                onClick={() => setCropping(true)}
                className="flex items-center gap-1.5 text-sm font-bold px-3 py-2 rounded-xl border bg-white border-slate-200 text-slate-600 hover:border-brand-gold transition"
              >
                <Crop className="h-4 w-4" />
                قصّ مربّع
              </button>
            )}
            {src && (
              <button
                type="button"
                onClick={() => setShowAdjust((s) => !s)}
                className={`flex items-center gap-1.5 text-sm font-bold px-3 py-2 rounded-xl border transition ${
                  showAdjust ? 'bg-brand-gold-light border-brand-gold text-brand-gold-dark' : 'bg-white border-slate-200 text-slate-600 hover:border-brand-gold'
                }`}
              >
                <SlidersHorizontal className="h-4 w-4" />
                تعديل الصورة
              </button>
            )}
          </div>
          <p className="text-[11px] text-slate-400">اسحب الصورة هنا أو اضغط الزر — JPG/PNG/WEBP حتى 5MB</p>
          <input
            type="text"
            value={src || ''}
            onChange={(e) => onChange(buildImg(e.target.value, settings))}
            placeholder="أو الصق رابط صورة"
            dir="ltr"
            className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-[11px] focus:outline-none focus:border-brand-gold bg-white"
          />
        </div>
      </div>

      {/* Adjustment panel */}
      {src && showAdjust && (
        <div className="rounded-2xl border border-brand-gold/30 bg-brand-gold-light/30 p-4 space-y-4 animate-in fade-in slide-in-from-top-1 duration-200">
          {/* Fit */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <span className="text-[12px] font-bold text-slate-700">طريقة العرض</span>
            <div className="inline-flex rounded-lg bg-white border border-slate-200 p-0.5">
              <button type="button" onClick={() => update({ fit: 'cover' })}
                className={`px-3 py-1.5 text-[12px] font-bold rounded-md transition ${curFit === 'cover' ? 'bg-brand-blue text-white' : 'text-slate-500'}`}>
                تغطية (تملأ الإطار)
              </button>
              <button type="button" onClick={() => update({ fit: 'contain' })}
                className={`px-3 py-1.5 text-[12px] font-bold rounded-md transition ${curFit === 'contain' ? 'bg-brand-blue text-white' : 'text-slate-500'}`}>
                احتواء (الصورة كاملة)
              </button>
            </div>
          </div>

          {/* Focal position grid */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <span className="text-[12px] font-bold text-slate-700">موضع القصّ (الجزء الظاهر)</span>
            <div className="grid grid-cols-3 gap-1 w-[108px]">
              {POS_GRID.map((p) => (
                <button key={p.pos} type="button" onClick={() => update({ pos: p.pos })}
                  className={`h-8 rounded-md text-sm font-bold transition ${curPos === p.pos ? 'bg-brand-gold text-white' : 'bg-white border border-slate-200 text-slate-400 hover:border-brand-gold'}`}>
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Alignment */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <span className="text-[12px] font-bold text-slate-700">المحاذاة</span>
            <div className="inline-flex rounded-lg bg-white border border-slate-200 p-0.5">
              {([['right', 'يمين'], ['center', 'وسط'], ['left', 'يسار']] as const).map(([a, lbl]) => (
                <button key={a} type="button" onClick={() => update({ align: a })}
                  className={`px-3 py-1.5 text-[12px] font-bold rounded-md transition ${settings.align === a ? 'bg-brand-blue text-white' : 'text-slate-500'}`}>
                  {lbl}
                </button>
              ))}
            </div>
          </div>

          {/* Zoom */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-bold text-slate-700">الحجم / التكبير</span>
              <span className="text-[12px] font-mono text-brand-gold-dark font-bold">{curZoom}%</span>
            </div>
            <input type="range" min={100} max={250} step={5} value={curZoom}
              onChange={(e) => update({ zoom: Number(e.target.value) })}
              className="w-full accent-brand-gold" />
          </div>

          <button type="button"
            onClick={() => onChange(src)}
            className="text-[11px] text-slate-500 hover:text-brand-gold-dark underline">
            إعادة ضبط الإعدادات
          </button>
        </div>
      )}

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

      {cropping && src && (
        <ImageCropper
          src={src}
          onCropped={(url) => { onChange(buildImg(url, settings)); setCropping(false); }}
          onCancel={() => setCropping(false)}
          onToast={onToast}
        />
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// File upload field — for documents/PDF + images (digital library, attachments)
// ---------------------------------------------------------------------------
export function FileField({
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

  const isImg = !!value && /\.(png|jpe?g|gif|webp|svg|avif)(\?|#|$)/i.test(value);
  const fileName = value ? decodeURIComponent(value.split('/').pop()!.split('?')[0]) : '';

  const handleFile = async (file: File) => {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (res.ok) {
        onChange(data.url);
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
        <div className="h-16 w-16 rounded-xl border border-slate-200 bg-white overflow-hidden flex items-center justify-center shrink-0 shadow-sm">
          {isImg ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="preview" className="h-full w-full object-cover" />
          ) : (
            <FileText className={`h-7 w-7 ${value ? 'text-brand-gold-dark' : 'text-slate-300'}`} />
          )}
        </div>
        <div className="flex-1 space-y-2 min-w-0">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white text-sm font-bold px-4 py-2 rounded-xl disabled:opacity-60 transition"
          >
            {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            {uploading ? 'جارٍ الرفع...' : 'رفع ملف'}
          </button>
          {value && (
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[11px] text-brand-gold-dark hover:underline truncate"
            >
              <ExternalLink className="h-3 w-3 shrink-0" />
              <span className="truncate" dir="ltr">{fileName}</span>
            </a>
          )}
          <p className="text-[11px] text-slate-400">PDF / Word / Excel / صورة / فيديو — حتى 100MB</p>
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder="أو الصق رابط الملف"
            dir="ltr"
            className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-[11px] focus:outline-none focus:border-brand-gold bg-white"
          />
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
