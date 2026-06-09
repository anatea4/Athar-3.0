'use client';
import React, { useEffect, useState, useCallback } from 'react';
import {
  Loader2, Save, Plus, Trash2, ArrowRight, ClipboardList, ExternalLink,
} from 'lucide-react';
import {
  MultiLangField, ImageField, TextField, ArrayItemCard, AddItemButton,
  EditLangProvider, LanguageTabs,
} from './FieldEditors';

type Toast = (type: 'success' | 'error', msg: string) => void;
type EditLang = 'Ar' | 'En' | 'Ms';

const SECTIONS = [
  { key: 'admission', label: 'القبول والتسجيل' },
  { key: 'support', label: 'المشاركة والدعم' },
  { key: 'finance', label: 'التبرعات والرسوم' },
];
const sectionLabel = (k: string) => SECTIONS.find((s) => s.key === k)?.label || k;

const FIELD_TYPES = [
  { v: 'text', l: 'نص' },
  { v: 'tel', l: 'هاتف' },
  { v: 'email', l: 'بريد إلكتروني' },
  { v: 'number', l: 'رقم' },
  { v: 'textarea', l: 'نص طويل' },
  { v: 'select', l: 'قائمة اختيار' },
];

const rid = () => (globalThis.crypto?.randomUUID?.() || `${Math.round(performance.now())}`).slice(0, 8);

export default function FormsManager({ onToast }: { onToast: Toast }) {
  const [forms, setForms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [lang, setLang] = useState<EditLang>('Ar');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/content', { cache: 'no-store' });
      const data = await res.json();
      let f = data?.content?.forms;
      if (!Array.isArray(f) || f.length === 0) {
        const def = await (await fetch('/api/defaults')).json();
        f = def.forms;
      }
      setForms(JSON.parse(JSON.stringify(f || [])));
    } catch {
      onToast('error', 'فشل تحميل النماذج');
    } finally {
      setLoading(false);
    }
  }, [onToast]);

  useEffect(() => { load(); }, [load]);

  const persist = async (next: any[]) => {
    setForms(next);
    setSaving(true);
    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section: 'forms', data: next }),
      });
      if (res.ok) onToast('success', 'تم الحفظ ✓');
      else onToast('error', 'فشل الحفظ');
    } finally {
      setSaving(false);
    }
  };

  const addForm = (section: string) => {
    const f = {
      id: `form-${rid()}`,
      section,
      order: forms.filter((x) => x.section === section).length + 1,
      titleAr: 'نموذج جديد', titleEn: 'New Form', titleMs: '',
      descAr: '', descEn: '', descMs: '',
      headerImage: '',
      submitType: `form_${rid()}`,
      submitLabelAr: 'إرسال', submitLabelEn: 'Submit', submitLabelMs: '',
      successAr: 'تم استلام طلبك بنجاح!', successEn: 'Received!', successMs: '',
      fields: [
        { key: 'name', labelAr: 'الاسم الكامل', labelEn: 'Full Name', type: 'text', required: true },
        { key: 'phone', labelAr: 'رقم الجوال', labelEn: 'Phone', type: 'tel', required: true },
      ],
    };
    const next = [...forms, f];
    setForms(next);
    setEditingId(f.id);
    onToast('success', 'تم إنشاء نموذج جديد — لا تنسَ الحفظ');
  };

  const editing = forms.find((f) => f.id === editingId);
  const updateEditing = (patch: any) => setForms(forms.map((f) => (f.id === editingId ? { ...f, ...patch } : f)));

  // ===== List view =====
  if (!editing) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-brand-blue-dark font-serif">إدارة النماذج</h1>
          <p className="text-sm text-slate-500 mt-0.5">أنشئ نماذج تسجيل لأي قسم، وأضف الحقول والصور — تظهر كتبويبات في الموقع تلقائياً</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20 text-slate-300"><Loader2 className="h-6 w-6 animate-spin" /></div>
        ) : (
          SECTIONS.map((sec) => {
            const secForms = forms.filter((f) => f.section === sec.key).sort((a, b) => (a.order || 0) - (b.order || 0));
            return (
              <div key={sec.key} className="bg-white rounded-2xl border border-brand-gold/20 p-5 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-bold text-brand-blue-dark">{sec.label} <span className="text-xs text-slate-400">({secForms.length})</span></h2>
                  <button onClick={() => addForm(sec.key)} className="flex items-center gap-1.5 bg-brand-gold hover:bg-brand-gold-dark text-white text-xs font-bold px-3 py-1.5 rounded-lg">
                    <Plus className="h-4 w-4" /> نموذج جديد
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {secForms.map((f) => (
                    <div key={f.id} className="flex items-center justify-between border border-slate-200 rounded-xl px-4 py-3">
                      <div className="min-w-0">
                        <div className="font-bold text-sm text-slate-800 truncate">{f.titleAr || f.titleEn}</div>
                        <div className="text-[11px] text-slate-400">{(f.fields || []).length} حقل</div>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button onClick={() => setEditingId(f.id)} className="text-xs bg-slate-800 hover:bg-slate-900 text-white px-3 py-1.5 rounded-lg">تعديل</button>
                        <button onClick={() => { if (confirm('حذف هذا النموذج؟')) persist(forms.filter((x) => x.id !== f.id)); }} className="p-2 hover:bg-red-50 rounded-lg">
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </button>
                      </div>
                    </div>
                  ))}
                  {secForms.length === 0 && <div className="text-xs text-slate-400 py-3">لا توجد نماذج بعد.</div>}
                </div>
              </div>
            );
          })
        )}
      </div>
    );
  }

  // ===== Editor view =====
  const flds = editing.fields || [];
  const setFlds = (f: any[]) => updateEditing({ fields: f });
  const updateFld = (i: number, patch: any) => { const n = [...flds]; n[i] = { ...n[i], ...patch }; setFlds(n); };

  return (
    <EditLangProvider lang={lang}>
      <div className="space-y-5 pb-24">
        <div className="sticky top-0 z-10 -mx-8 px-8 py-4 bg-brand-gold-light/95 backdrop-blur border-b border-brand-gold/20 flex items-center justify-between flex-wrap gap-3">
          <button onClick={() => setEditingId(null)} className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-bold text-sm">
            <ArrowRight className="h-4 w-4" /> رجوع للنماذج
          </button>
          <div className="flex items-center gap-2">
            <LanguageTabs value={lang} onChange={setLang} />
            <button onClick={() => persist(forms)} disabled={saving} className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl text-sm disabled:opacity-60">
              {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />} حفظ
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <div className="flex items-center gap-2 text-brand-gold-dark font-bold"><ClipboardList className="h-5 w-5" /> معلومات النموذج</div>
          <div>
            <label className="block text-[13px] font-semibold text-slate-700 mb-1">القسم الذي يظهر فيه</label>
            <select value={editing.section} onChange={(e) => updateEditing({ section: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:border-brand-gold">
              {SECTIONS.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}
            </select>
          </div>
          <MultiLangField label="عنوان النموذج" obj={editing} fieldBase="title" onChange={(f, v) => updateEditing({ [f]: v })} />
          <MultiLangField label="وصف مختصر" obj={editing} fieldBase="desc" onChange={(f, v) => updateEditing({ [f]: v })} multiline />
          <ImageField label="صورة رأس النموذج (اختياري)" value={editing.headerImage} onChange={(v) => updateEditing({ headerImage: v })} onToast={onToast} />
          <MultiLangField label="نص زر الإرسال" obj={editing} fieldBase="submitLabel" onChange={(f, v) => updateEditing({ [f]: v })} />
          <MultiLangField label="رسالة النجاح" obj={editing} fieldBase="success" onChange={(f, v) => updateEditing({ [f]: v })} multiline />
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3">
          <div className="font-bold text-slate-700">حقول النموذج</div>
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
                  <select value={fld.type || 'text'} onChange={(e) => updateFld(i, { type: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:border-brand-gold">
                    {FIELD_TYPES.map((ft) => <option key={ft.v} value={ft.v}>{ft.l}</option>)}
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
            onClick={() => setFlds([...flds, { key: `field_${rid()}`, labelAr: 'حقل جديد', labelEn: 'New Field', type: 'text', required: false }])}
            label="إضافة حقل"
          />
        </div>
      </div>
    </EditLangProvider>
  );
}
