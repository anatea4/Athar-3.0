'use client';
import React, { useState } from 'react';
import { TextField, MultiLangField, ImageField, FileField, ArrayItemCard, AddItemButton, EditLangProvider, LanguageTabs } from './FieldEditors';

type Toast = (type: 'success' | 'error', msg: string) => void;
type EditLang = 'Ar' | 'En' | 'Ms';

const IMAGE_KEYS = ['image', 'img', 'avatar', 'logo', 'photo', 'picture', 'cover', 'thumbnail'];
const isImageKey = (k: string) => {
  const lk = k.toLowerCase();
  return IMAGE_KEYS.some((ik) => lk.includes(ik));
};

// File/document fields (PDF, attachments, downloads) and generic media urls
const FILE_KEYS = ['url', 'file', 'document', 'attachment', 'download', 'pdf'];
const isFileKey = (k: string) => {
  const lk = k.toLowerCase();
  return FILE_KEYS.some((fk) => lk.includes(fk));
};

// Technical keys the non-technical admin should never see/edit
const HIDDEN_KEYS = new Set([
  'id', '_hidden', 'icon', 'color', 'category', 'type', 'audioUrl',
  'ayahNumber', 'pricePerMonth_internal',
]);

// Detect multilingual base names in an object: e.g. titleAr/titleEn/titleMs → "title"
function detectLangBases(obj: any): string[] {
  if (!obj || typeof obj !== 'object') return [];
  const bases = new Set<string>();
  for (const key of Object.keys(obj)) {
    const m = key.match(/^(.+)(Ar|En|Ms)$/);
    if (m) bases.add(m[1]);
  }
  return Array.from(bases);
}

// Keys that are part of a lang group (so we skip them in the plain-field pass)
function langGroupKeys(obj: any): Set<string> {
  const set = new Set<string>();
  for (const key of Object.keys(obj || {})) {
    if (/^(.+)(Ar|En|Ms)$/.test(key)) set.add(key);
  }
  return set;
}

const LABEL_MAP: Record<string, string> = {
  title: 'العنوان',
  desc: 'الوصف',
  description: 'الوصف',
  name: 'الاسم',
  role: 'المنصب',
  bio: 'نبذة',
  question: 'السؤال',
  answer: 'الإجابة',
  label: 'التسمية',
  text: 'النص',
  reflection: 'التأمل',
  excerpt: 'المقتطف',
  author: 'الكاتب',
  badge: 'الشارة',
  subtitle: 'العنوان الفرعي',
  placeholder: 'النص التوضيحي',
  about: 'عن',
  vision: 'الرؤية',
  mission: 'الرسالة',
  ctaPrimary: 'زر رئيسي',
  ctaSecondary: 'زر ثانوي',
  pillarsHeading: 'عنوان أهم البرامج',
  pillarsSub: 'وصف أهم البرامج',
  pillarsTagline: 'شعار أهم البرامج',
  schedule: 'الجدول',
  duration: 'المدة',
  ageRules: 'الأعمار',
  teacher: 'المعلم',
  syllabus: 'المنهج',
  aboutText: 'نص النبذة',
  aboutHeading: 'عنوان النبذة',
  copyright: 'حقوق النشر',
  contactHeading: 'عنوان التواصل',
  statsLabel: 'تسمية الإحصائيات',
  number: 'الرقم',
  image: 'الصورة',
  img: 'الصورة',
  logo: 'الشعار',
  avatar: 'الصورة الشخصية',
  url: 'الصورة / الرابط',
  phone: 'رقم الهاتف',
  email: 'البريد الإلكتروني',
  website: 'الموقع الإلكتروني',
  whatsapp: 'رابط واتساب',
  instagram: 'رابط انستغرام',
  facebook: 'رابط فيسبوك',
  youtube: 'رابط يوتيوب',
  videoUrl: 'رابط فيديو الخلفية (YouTube)',
  date: 'التاريخ',
  stats: 'الإحصائية',
  circlesCount: 'عدد الحلقات',
  studentsCount: 'عدد الطلاب',
  sponsoredCircles: 'الحلقات المكفولة',
  unsponsoredCircles: 'الحلقات غير المكفولة',
  totalBeneficiaries: 'إجمالي المستفيدين',
  campSnaaBeneficiaries: 'مستفيدو مخيم صناع الغد',
  campSfeeratBeneficiaries: 'مستفيدو مخيم سفيرات الأثر',
  objectives: 'الأهداف',
  directorMessage: 'نص كلمة المدير',
  directorName: 'اسم المدير',
  directorImage: 'صورة المدير',
  chairmanMessage: 'نص كلمة رئيس المجلس',
  chairmanName: 'اسم رئيس المجلس',
  chairmanImage: 'صورة رئيس المجلس',
  secretaryMessage: 'نص كلمة الأمين العام',
  secretaryName: 'اسم الأمين العام',
  secretaryImage: 'صورة الأمين العام',
  pillars: 'أهم البرامج',
  videos: 'فيديوهات الخلفية',
  carousel: 'صور العرض المتحرك',
  nav: 'روابط القائمة',
  logoText: 'نص الشعار',
  logoSub: 'النص الفرعي للشعار',
  cta: 'زر الدعوة',
  newsletterHeading: 'عنوان النشرة',
  newsletterText: 'نص النشرة',
  linksHeading: 'عنوان الروابط',
};

const friendlyLabel = (key: string) => LABEL_MAP[key] || key;

// ---------------------------------------------------------------------------
// Render a single object's editable fields
// ---------------------------------------------------------------------------
function ObjectFields({
  obj,
  onChange,
  onToast,
}: {
  obj: any;
  onChange: (newObj: any) => void;
  onToast: Toast;
}) {
  const langBases = detectLangBases(obj);
  const langKeys = langGroupKeys(obj);

  const updateField = (field: string, value: any) => {
    onChange({ ...obj, [field]: value });
  };

  return (
    <div className="space-y-3">
      {/* Multilingual field groups */}
      {langBases.map((base) => (
        <MultiLangField
          key={base}
          label={friendlyLabel(base)}
          obj={obj}
          fieldBase={base}
          onChange={updateField}
          multiline={['desc', 'description', 'bio', 'answer', 'text', 'reflection', 'excerpt', 'about', 'vision', 'mission', 'aboutText', 'subtitle', 'pillarsSub', 'directorMessage', 'chairmanMessage', 'secretaryMessage'].includes(base)}
        />
      ))}

      {/* Plain fields (non-lang, non-array, non-object) */}
      {Object.keys(obj || {}).map((key) => {
        if (langKeys.has(key)) return null;
        if (HIDDEN_KEYS.has(key)) return null; // technical keys hidden from admin
        const val = obj[key];

        // File / document / media-url fields (PDF, attachments, gallery url, ...)
        if (typeof val === 'string' && isFileKey(key)) {
          return (
            <FileField
              key={key}
              label={friendlyLabel(key)}
              value={val}
              onChange={(v) => updateField(key, v)}
              onToast={onToast}
            />
          );
        }

        // Image fields
        if (typeof val === 'string' && isImageKey(key)) {
          return (
            <ImageField
              key={key}
              label={friendlyLabel(key)}
              value={val}
              onChange={(v) => updateField(key, v)}
              onToast={onToast}
            />
          );
        }

        // Plain string
        if (typeof val === 'string') {
          return (
            <TextField
              key={key}
              label={friendlyLabel(key)}
              value={val}
              onChange={(v) => updateField(key, v)}
              dir={/[؀-ۿ]/.test(val) ? 'rtl' : 'ltr'}
            />
          );
        }

        // Number
        if (typeof val === 'number') {
          return (
            <TextField
              key={key}
              label={friendlyLabel(key)}
              value={String(val)}
              onChange={(v) => updateField(key, Number(v) || 0)}
              dir="ltr"
            />
          );
        }

        // Array of strings (e.g. syllabus, objectives)
        if (Array.isArray(val) && val.every((x) => typeof x === 'string')) {
          return (
            <StringArrayEditor
              key={key}
              label={friendlyLabel(key)}
              items={val}
              onChange={(items) => updateField(key, items)}
            />
          );
        }

        // Nested array of objects
        if (Array.isArray(val)) {
          return (
            <div key={key} className="border border-slate-200 rounded-lg p-2">
              <div className="text-xs font-bold text-slate-600 mb-2">{friendlyLabel(key)}</div>
              <ArrayEditor items={val} onChange={(items) => updateField(key, items)} onToast={onToast} />
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// String array editor (list of bullet strings)
// ---------------------------------------------------------------------------
function StringArrayEditor({
  label,
  items,
  onChange,
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
}) {
  return (
    <div className="border border-slate-200 rounded-lg p-3 bg-slate-50 space-y-2">
      <div className="text-xs font-bold text-slate-600">{label}</div>
      {items.map((item, i) => (
        <div key={i} className="flex gap-2">
          <input
            type="text"
            value={item}
            onChange={(e) => {
              const next = [...items];
              next[i] = e.target.value;
              onChange(next);
            }}
            dir={/[؀-ۿ]/.test(item) ? 'rtl' : 'ltr'}
            className="flex-1 px-3 py-1.5 border border-slate-300 rounded text-xs"
          />
          <button
            type="button"
            onClick={() => onChange(items.filter((_, idx) => idx !== i))}
            className="px-2 bg-red-100 text-red-600 rounded text-xs"
          >
            ✕
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, ''])}
        className="text-xs text-brand-gold-dark font-bold hover:underline"
      >
        + إضافة عنصر
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Array of objects editor (with reorder/delete/hide)
// ---------------------------------------------------------------------------
function ArrayEditor({
  items,
  onChange,
  onToast,
}: {
  items: any[];
  onChange: (items: any[]) => void;
  onToast: Toast;
}) {
  const getTitle = (item: any) =>
    item?.titleAr || item?.titleEn || item?.nameAr || item?.nameEn || item?.questionAr || item?.questionEn || item?.labelAr || item?.number || '';

  const move = (from: number, to: number) => {
    if (to < 0 || to >= items.length) return;
    const next = [...items];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    onChange(next);
  };

  const makeNew = () => {
    // Clone the shape of the first item but blank its text fields
    const template = items[0] ? JSON.parse(JSON.stringify(items[0])) : {};
    const blank: any = {};
    for (const k of Object.keys(template)) {
      const v = template[k];
      if (typeof v === 'string') blank[k] = isImageKey(k) ? v : '';
      else if (typeof v === 'number') blank[k] = 0;
      else if (Array.isArray(v)) blank[k] = [];
      else blank[k] = v;
    }
    blank.id = `item-${items.length + 1}`;
    onChange([...items, blank]);
  };

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <ArrayItemCard
          key={i}
          index={i}
          total={items.length}
          title={getTitle(item)}
          hidden={item?._hidden === true}
          onMoveUp={() => move(i, i - 1)}
          onMoveDown={() => move(i, i + 1)}
          onDelete={() => {
            if (confirm('حذف هذا العنصر؟')) onChange(items.filter((_, idx) => idx !== i));
          }}
          onToggleHide={() => {
            const next = [...items];
            next[i] = { ...next[i], _hidden: !next[i]._hidden };
            onChange(next);
          }}
        >
          <ObjectFields
            obj={item}
            onChange={(newObj) => {
              const next = [...items];
              next[i] = newObj;
              onChange(next);
            }}
            onToast={onToast}
          />
        </ArrayItemCard>
      ))}
      <AddItemButton onClick={makeNew} label="إضافة عنصر جديد" />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Top-level Smart Editor (with language tabs)
// ---------------------------------------------------------------------------
export default function SmartEditor({
  data,
  onChange,
  onToast,
}: {
  data: any;
  onChange: (data: any) => void;
  onToast: Toast;
}) {
  const [lang, setLang] = useState<EditLang>('Ar');

  let body: React.ReactNode;
  if (Array.isArray(data)) {
    body = <ArrayEditor items={data} onChange={onChange} onToast={onToast} />;
  } else if (data && typeof data === 'object') {
    body = <ObjectFields obj={data} onChange={onChange} onToast={onToast} />;
  } else {
    body = <div className="text-sm text-slate-500">لا يوجد محتوى لعرضه.</div>;
  }

  return (
    <EditLangProvider lang={lang}>
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <span className="text-sm font-bold text-slate-500">اختر اللغة التي تريد تعديلها:</span>
          <LanguageTabs value={lang} onChange={setLang} />
        </div>
        {body}
      </div>
    </EditLangProvider>
  );
}
