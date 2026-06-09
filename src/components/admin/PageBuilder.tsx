'use client';
import React, { useEffect, useState, useCallback } from 'react';
import {
  Plus, Trash2, Save, ArrowRight, Loader2, Eye, EyeOff, ExternalLink,
  ChevronUp, ChevronDown, Type, AlignLeft, Image as ImageIcon, MousePointerClick,
  LayoutPanelTop, LayoutGrid, FileText, ClipboardList,
} from 'lucide-react';
import {
  TextField, MultiLangField, ImageField, ArrayItemCard, AddItemButton,
  EditLangProvider, LanguageTabs,
} from './FieldEditors';

type Toast = (type: 'success' | 'error', msg: string) => void;
type EditLang = 'Ar' | 'En' | 'Ms';

interface Page {
  id: string;
  slug: string;
  title_ar: string;
  title_en: string;
  title_ms: string;
  blocks: any[];
  published: boolean;
  show_in_nav: boolean;
  sort_order: number;
}

const BLOCK_TYPES: { type: string; label: string; icon: React.ReactNode }[] = [
  { type: 'heading', label: 'عنوان', icon: <Type className="h-4 w-4" /> },
  { type: 'text', label: 'فقرة نص', icon: <AlignLeft className="h-4 w-4" /> },
  { type: 'image', label: 'صورة', icon: <ImageIcon className="h-4 w-4" /> },
  { type: 'button', label: 'زر', icon: <MousePointerClick className="h-4 w-4" /> },
  { type: 'hero', label: 'بانر كبير', icon: <LayoutPanelTop className="h-4 w-4" /> },
  { type: 'cards', label: 'بطاقات', icon: <LayoutGrid className="h-4 w-4" /> },
  { type: 'form', label: 'نموذج تسجيل', icon: <ClipboardList className="h-4 w-4" /> },
];

const BLOCK_LABEL: Record<string, string> = Object.fromEntries(BLOCK_TYPES.map((b) => [b.type, b.label]));

function newBlock(type: string): any {
  switch (type) {
    case 'heading':
      return { type, textAr: 'عنوان جديد', textEn: 'New heading', textMs: '' };
    case 'text':
      return { type, textAr: 'اكتب النص هنا...', textEn: '', textMs: '' };
    case 'image':
      return { type, url: '', captionAr: '', captionEn: '', captionMs: '' };
    case 'button':
      return { type, labelAr: 'اضغط هنا', labelEn: 'Click here', labelMs: '', link: '' };
    case 'hero':
      return {
        type, titleAr: 'عنوان البانر', titleEn: '', titleMs: '',
        subtitleAr: '', subtitleEn: '', subtitleMs: '', image: '',
        buttonLabelAr: '', buttonLabelEn: '', buttonLabelMs: '', buttonLink: '',
      };
    case 'cards':
      return {
        type,
        items: [
          { titleAr: 'بطاقة', titleEn: '', titleMs: '', descAr: '', descEn: '', descMs: '', image: '' },
        ],
      };
    case 'form':
      return {
        type,
        titleAr: 'نموذج التسجيل', titleEn: 'Registration Form', titleMs: '',
        submitType: 'registration',
        submitLabelAr: 'إرسال الطلب', submitLabelEn: 'Submit', submitLabelMs: '',
        successAr: 'تم استلام طلبك بنجاح! سنتواصل معك قريباً.', successEn: 'Received! We will contact you soon.', successMs: '',
        fields: [
          { key: 'name', labelAr: 'الاسم الكامل', labelEn: 'Full Name', labelMs: '', type: 'text', required: true },
          { key: 'phone', labelAr: 'رقم الجوال', labelEn: 'Phone', labelMs: '', type: 'tel', required: true },
          { key: 'email', labelAr: 'البريد الإلكتروني', labelEn: 'Email', labelMs: '', type: 'email', required: false },
        ],
      };
    default:
      return { type };
  }
}

export default function PageBuilder({ onToast, openSlug, onConsumedOpenSlug }: { onToast: Toast; openSlug?: string | null; onConsumedOpenSlug?: () => void }) {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Page | null>(null);
  const [saving, setSaving] = useState(false);
  const [lang, setLang] = useState<EditLang>('Ar');
  const [showAddMenu, setShowAddMenu] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/pages', { cache: 'no-store' });
      const data = await res.json();
      if (res.ok) setPages(data.pages || []);
      return data.pages || [];
    } catch {
      onToast('error', 'فشل تحميل الصفحات');
      return [];
    } finally {
      setLoading(false);
    }
  }, [onToast]);

  useEffect(() => {
    load();
  }, [load]);

  // Auto-open a specific page when navigated here from the Navigation Manager
  useEffect(() => {
    if (!openSlug) return;
    let active = true;
    (async () => {
      const list = await load();
      if (!active) return;
      const found = (list as Page[]).find((p) => p.slug === openSlug);
      if (found) setEditing(found);
      onConsumedOpenSlug?.();
    })();
    return () => { active = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openSlug]);

  const createPage = async () => {
    const res = await fetch('/api/pages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title_ar: 'صفحة جديدة', title_en: 'New Page', blocks: [] }),
    });
    const data = await res.json();
    if (res.ok) {
      onToast('success', 'تم إنشاء الصفحة');
      await load();
      setEditing(data.page);
    } else {
      onToast('error', data.error || 'فشل');
    }
  };

  const savePage = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      const res = await fetch('/api/pages', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editing),
      });
      const data = await res.json();
      if (res.ok) {
        onToast('success', 'تم حفظ الصفحة ✓');
        setEditing(data.page);
        await load();
      } else {
        onToast('error', data.error || 'فشل الحفظ');
      }
    } finally {
      setSaving(false);
    }
  };

  const deletePage = async (id: string) => {
    if (!confirm('حذف هذه الصفحة نهائياً؟')) return;
    const res = await fetch('/api/pages', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      onToast('success', 'تم الحذف');
      if (editing?.id === id) setEditing(null);
      await load();
    }
  };

  const togglePageField = async (page: Page, field: 'published' | 'show_in_nav') => {
    const res = await fetch('/api/pages', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: page.id, [field]: !page[field] }),
    });
    if (res.ok) await load();
  };

  // ---- Block operations (on the editing page) ----
  const setBlocks = (blocks: any[]) => setEditing((p) => (p ? { ...p, blocks } : p));
  const addBlock = (type: string) => {
    if (!editing) return;
    setBlocks([...(editing.blocks || []), newBlock(type)]);
    setShowAddMenu(false);
  };
  const updateBlock = (i: number, b: any) => {
    if (!editing) return;
    const next = [...editing.blocks];
    next[i] = b;
    setBlocks(next);
  };
  const moveBlock = (from: number, to: number) => {
    if (!editing || to < 0 || to >= editing.blocks.length) return;
    const next = [...editing.blocks];
    const [m] = next.splice(from, 1);
    next.splice(to, 0, m);
    setBlocks(next);
  };

  // ===================== LIST VIEW =====================
  if (!editing) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">الصفحات</h1>
            <p className="text-sm text-slate-500 mt-0.5">أنشئ صفحات جديدة بروابط خاصة وتظهر في قائمة الموقع</p>
          </div>
          <button
            onClick={createPage}
            className="flex items-center gap-2 bg-brand-gold hover:bg-brand-gold-dark text-white font-bold px-5 py-2.5 rounded-xl text-sm shadow-sm"
          >
            <Plus className="h-5 w-5" />
            صفحة جديدة
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20 text-slate-400">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : pages.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
            <FileText className="h-10 w-10 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500">لا توجد صفحات بعد. اضغط «صفحة جديدة» للبدء.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pages.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="font-bold text-slate-900 truncate">{p.title_ar || p.title_en || 'بدون عنوان'}</h3>
                    <p className="text-xs text-slate-400 font-mono mt-0.5" dir="ltr">/{p.slug}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <a href={`/${p.slug}`} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-slate-100 rounded-lg" title="فتح">
                      <ExternalLink className="h-4 w-4 text-slate-500" />
                    </a>
                    <button onClick={() => deletePage(p.id)} className="p-2 hover:bg-red-50 rounded-lg" title="حذف">
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <button
                    onClick={() => setEditing(p)}
                    className="flex-1 bg-slate-800 hover:bg-slate-900 text-white text-sm font-bold py-2 rounded-lg"
                  >
                    تعديل الصفحة
                  </button>
                  <button
                    onClick={() => togglePageField(p, 'published')}
                    className={`px-3 py-2 rounded-lg text-xs font-bold ${p.published ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}
                    title="نشر/إخفاء"
                  >
                    {p.published ? 'منشورة' : 'مخفية'}
                  </button>
                  <button
                    onClick={() => togglePageField(p, 'show_in_nav')}
                    className={`px-3 py-2 rounded-lg text-xs font-bold ${p.show_in_nav ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'}`}
                    title="إظهار في القائمة"
                  >
                    {p.show_in_nav ? 'في القائمة' : 'خارج القائمة'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // ===================== EDITOR VIEW =====================
  return (
    <EditLangProvider lang={lang}>
      <div className="space-y-5 pb-24">
        {/* Sticky header */}
        <div className="sticky top-0 z-10 -mx-8 px-8 py-4 bg-slate-50/95 backdrop-blur border-b border-slate-200 flex items-center justify-between flex-wrap gap-3">
          <button onClick={() => setEditing(null)} className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-bold text-sm">
            <ArrowRight className="h-4 w-4" />
            رجوع للصفحات
          </button>
          <div className="flex items-center gap-2">
            <LanguageTabs value={lang} onChange={setLang} />
            <a href={`/${editing.slug}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold px-4 py-2.5 rounded-xl text-sm">
              <ExternalLink className="h-4 w-4" />
              معاينة
            </a>
            <button
              onClick={savePage}
              disabled={saving}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl text-sm disabled:opacity-60 shadow-sm"
            >
              {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
              حفظ الصفحة
            </button>
          </div>
        </div>

        {/* Page meta */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <h2 className="font-bold text-slate-800">معلومات الصفحة</h2>
          <MultiLangField
            label="عنوان الصفحة"
            obj={{ titleAr: editing.title_ar, titleEn: editing.title_en, titleMs: editing.title_ms }}
            fieldBase="title"
            onChange={(field, v) => {
              const map: any = { titleAr: 'title_ar', titleEn: 'title_en', titleMs: 'title_ms' };
              setEditing({ ...editing, [map[field]]: v });
            }}
          />
          <TextField
            label="الرابط (بالإنجليزية، يظهر بعد اسم الموقع)"
            value={editing.slug}
            onChange={(v) => setEditing({ ...editing, slug: v })}
            dir="ltr"
            placeholder="about-us"
          />
          <div className="flex flex-wrap gap-4 pt-1">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={editing.published} onChange={(e) => setEditing({ ...editing, published: e.target.checked })} className="h-4 w-4" />
              منشورة (ظاهرة للزوار)
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={editing.show_in_nav} onChange={(e) => setEditing({ ...editing, show_in_nav: e.target.checked })} className="h-4 w-4" />
              تظهر في قائمة الموقع
            </label>
          </div>
        </div>

        {/* Blocks */}
        <div className="space-y-3">
          <h2 className="font-bold text-slate-800">مكوّنات الصفحة</h2>
          {(editing.blocks || []).map((block, i) => (
            <ArrayItemCard
              key={i}
              index={i}
              total={editing.blocks.length}
              title={`${BLOCK_LABEL[block.type] || block.type} — ${block.textAr || block.titleAr || block.labelAr || ''}`}
              hidden={block._hidden}
              onMoveUp={() => moveBlock(i, i - 1)}
              onMoveDown={() => moveBlock(i, i + 1)}
              onDelete={() => { if (confirm('حذف هذا المكوّن؟')) setBlocks(editing.blocks.filter((_, idx) => idx !== i)); }}
              onToggleHide={() => updateBlock(i, { ...block, _hidden: !block._hidden })}
            >
              <BlockEditor block={block} onChange={(b) => updateBlock(i, b)} onToast={onToast} />
            </ArrayItemCard>
          ))}

          {/* Add block */}
          <div className="relative">
            <AddItemButton onClick={() => setShowAddMenu((v) => !v)} label="إضافة مكوّن جديد" />
            {showAddMenu && (
              <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2 bg-white border border-slate-200 rounded-2xl p-3 shadow-lg">
                {BLOCK_TYPES.map((bt) => (
                  <button
                    key={bt.type}
                    onClick={() => addBlock(bt.type)}
                    className="flex items-center gap-2 px-3 py-3 rounded-xl border border-slate-200 hover:border-brand-gold hover:bg-brand-gold-light text-sm font-bold text-slate-700"
                  >
                    <span className="text-brand-gold-dark">{bt.icon}</span>
                    {bt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </EditLangProvider>
  );
}

// ---------------------------------------------------------------------------
// Per-type block editor
// ---------------------------------------------------------------------------
function BlockEditor({ block, onChange, onToast }: { block: any; onChange: (b: any) => void; onToast: Toast }) {
  const set = (field: string, value: any) => onChange({ ...block, [field]: value });

  switch (block.type) {
    case 'heading':
      return <MultiLangField label="نص العنوان" obj={block} fieldBase="text" onChange={set} />;

    case 'text':
      return <MultiLangField label="النص" obj={block} fieldBase="text" onChange={set} multiline />;

    case 'image':
      return (
        <div className="space-y-3">
          <ImageField label="الصورة" value={block.url} onChange={(v) => set('url', v)} onToast={onToast} />
          <MultiLangField label="تعليق (اختياري)" obj={block} fieldBase="caption" onChange={set} />
        </div>
      );

    case 'button':
      return (
        <div className="space-y-3">
          <MultiLangField label="نص الزر" obj={block} fieldBase="label" onChange={set} />
          <TextField label="الرابط" value={block.link} onChange={(v) => set('link', v)} dir="ltr" placeholder="https://..." />
        </div>
      );

    case 'hero':
      return (
        <div className="space-y-3">
          <MultiLangField label="العنوان" obj={block} fieldBase="title" onChange={set} />
          <MultiLangField label="الوصف" obj={block} fieldBase="subtitle" onChange={set} multiline />
          <ImageField label="صورة الخلفية" value={block.image} onChange={(v) => set('image', v)} onToast={onToast} />
          <MultiLangField label="نص الزر (اختياري)" obj={block} fieldBase="buttonLabel" onChange={set} />
          <TextField label="رابط الزر" value={block.buttonLink} onChange={(v) => set('buttonLink', v)} dir="ltr" placeholder="https://..." />
        </div>
      );

    case 'cards': {
      const items = block.items || [];
      const setItems = (it: any[]) => set('items', it);
      return (
        <div className="space-y-2">
          {items.map((card: any, i: number) => (
            <ArrayItemCard
              key={i}
              index={i}
              total={items.length}
              title={card.titleAr || card.titleEn || `بطاقة ${i + 1}`}
              hidden={card._hidden}
              onMoveUp={() => { if (i > 0) { const n = [...items]; [n[i - 1], n[i]] = [n[i], n[i - 1]]; setItems(n); } }}
              onMoveDown={() => { if (i < items.length - 1) { const n = [...items]; [n[i + 1], n[i]] = [n[i], n[i + 1]]; setItems(n); } }}
              onDelete={() => { if (confirm('حذف البطاقة؟')) setItems(items.filter((_: any, idx: number) => idx !== i)); }}
              onToggleHide={() => { const n = [...items]; n[i] = { ...n[i], _hidden: !n[i]._hidden }; setItems(n); }}
            >
              <MultiLangField label="عنوان البطاقة" obj={card} fieldBase="title" onChange={(f, v) => { const n = [...items]; n[i] = { ...n[i], [f]: v }; setItems(n); }} />
              <MultiLangField label="وصف البطاقة" obj={card} fieldBase="desc" onChange={(f, v) => { const n = [...items]; n[i] = { ...n[i], [f]: v }; setItems(n); }} multiline />
              <ImageField label="صورة البطاقة" value={card.image} onChange={(v) => { const n = [...items]; n[i] = { ...n[i], image: v }; setItems(n); }} onToast={onToast} />
            </ArrayItemCard>
          ))}
          <AddItemButton
            onClick={() => setItems([...items, { titleAr: '', titleEn: '', titleMs: '', descAr: '', descEn: '', descMs: '', image: '' }])}
            label="إضافة بطاقة"
          />
        </div>
      );
    }

    case 'form': {
      const flds = block.fields || [];
      const setFlds = (f: any[]) => set('fields', f);
      const updateFld = (i: number, patch: any) => { const n = [...flds]; n[i] = { ...n[i], ...patch }; setFlds(n); };
      return (
        <div className="space-y-4">
          <MultiLangField label="عنوان النموذج" obj={block} fieldBase="title" onChange={set} />
          <MultiLangField label="نص زر الإرسال" obj={block} fieldBase="submitLabel" onChange={set} />
          <MultiLangField label="رسالة النجاح بعد الإرسال" obj={block} fieldBase="success" onChange={set} multiline />
          <TextField label="معرّف النموذج (يظهر في صندوق الرسائل)" value={block.submitType || ''} onChange={(v) => set('submitType', v)} dir="ltr" placeholder="careers" />

          <div className="space-y-2">
            <div className="text-sm font-bold text-slate-600">حقول النموذج</div>
            {flds.map((fld: any, i: number) => (
              <ArrayItemCard
                key={i}
                index={i}
                total={flds.length}
                title={fld.labelAr || fld.key || `حقل ${i + 1}`}
                hidden={fld._hidden}
                onMoveUp={() => { if (i > 0) { const n = [...flds]; [n[i - 1], n[i]] = [n[i], n[i - 1]]; setFlds(n); } }}
                onMoveDown={() => { if (i < flds.length - 1) { const n = [...flds]; [n[i + 1], n[i]] = [n[i], n[i + 1]]; setFlds(n); } }}
                onDelete={() => { if (confirm('حذف هذا الحقل؟')) setFlds(flds.filter((_: any, idx: number) => idx !== i)); }}
                onToggleHide={() => updateFld(i, { _hidden: !fld._hidden })}
              >
                <MultiLangField label="اسم الحقل" obj={fld} fieldBase="label" onChange={(f, v) => updateFld(i, { [f]: v })} />
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-[13px] font-semibold text-slate-700">نوع الحقل</label>
                    <select
                      value={fld.type || 'text'}
                      onChange={(e) => updateFld(i, { type: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:border-brand-gold"
                    >
                      <option value="text">نص</option>
                      <option value="tel">هاتف</option>
                      <option value="email">بريد إلكتروني</option>
                      <option value="textarea">نص طويل</option>
                      <option value="select">قائمة اختيار</option>
                    </select>
                  </div>
                  <label className="flex items-center gap-2 text-sm pt-6">
                    <input type="checkbox" checked={!!fld.required} onChange={(e) => updateFld(i, { required: e.target.checked })} className="h-4 w-4" />
                    حقل مطلوب
                  </label>
                </div>
                {fld.type === 'select' && (
                  <TextField label="الخيارات (افصل بفاصلة)" value={fld.options || ''} onChange={(v) => updateFld(i, { options: v })} placeholder="ذكر, أنثى" />
                )}
              </ArrayItemCard>
            ))}
            <AddItemButton
              onClick={() => setFlds([...flds, { key: `field_${flds.length + 1}`, labelAr: 'حقل جديد', labelEn: 'New Field', labelMs: '', type: 'text', required: false }])}
              label="إضافة حقل"
            />
          </div>
        </div>
      );
    }

    default:
      return <p className="text-sm text-slate-400">نوع غير معروف</p>;
  }
}
