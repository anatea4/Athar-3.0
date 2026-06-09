'use client';
import React, { useEffect, useState, useCallback } from 'react';
import {
  Loader2, Save, Plus, Trash2, ChevronUp, ChevronDown, Eye, EyeOff,
  FileText, Link2, Layers, ExternalLink, FolderPlus,
} from 'lucide-react';
import { MultiLangField, EditLangProvider, LanguageTabs, TextField } from './FieldEditors';

type Toast = (type: 'success' | 'error', msg: string) => void;
type EditLang = 'Ar' | 'En' | 'Ms';

interface NavNode {
  id: string;
  labelAr: string;
  labelEn?: string;
  labelMs?: string;
  kind: 'section' | 'page' | 'external' | 'group';
  section?: string;
  sub?: string;
  slug?: string;
  url?: string;
  children?: NavNode[];
  _hidden?: boolean;
}

// Built-in site sections the admin can link to
const SECTION_TARGETS = [
  { v: 'home|', label: 'الرئيسية' },
  { v: 'about|who-we-are', label: 'من نحن — نبذة' },
  { v: 'about|vision-mission', label: 'من نحن — الرؤية والرسالة' },
  { v: 'about|partners', label: 'من نحن — الشركاء' },
  { v: 'about|faq', label: 'الأسئلة الشائعة' },
  { v: 'programs|quran-circles', label: 'البرامج — الحلقات' },
  { v: 'programs|quran-sard', label: 'البرامج — السرد' },
  { v: 'programs|quran-ijazah', label: 'البرامج — الإجازات' },
  { v: 'programs|training-courses', label: 'البرامج — الدورات' },
  { v: 'programs|educational-camps', label: 'البرامج — المخيمات' },
  { v: 'programs|creators-of-tomorrow', label: 'البرامج — صناع الغد' },
  { v: 'media|news', label: 'الإعلام — الأخبار' },
  { v: 'media|gallery', label: 'الإعلام — الوسائط' },
  { v: 'media|digital-library', label: 'الإعلام — المكتبة' },
  { v: 'media|annual-calendar', label: 'الإعلام — التقويم' },
  { v: 'support|volunteer', label: 'الدعم — التطوع' },
  { v: 'support|support-athar', label: 'الدعم — التبرع' },
  { v: 'solutions|ai-teacher', label: 'التقنيات الذكية' },
];

let idCounter = 0;
const newId = (p: string) => `${p}-${++idCounter}-${(globalThis.crypto?.randomUUID?.() || 'x').slice(0, 4)}`;

export default function NavManager({ onToast, onOpenPage }: { onToast: Toast; onOpenPage?: (slug: string) => void }) {
  const [items, setItems] = useState<NavNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lang, setLang] = useState<EditLang>('Ar');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/content', { cache: 'no-store' });
      const data = await res.json();
      let nav = data?.content?.navigation;
      if (!nav || !nav.items || nav.items.length === 0) {
        const def = await (await fetch('/api/defaults')).json();
        nav = def.navigation;
      }
      setItems(JSON.parse(JSON.stringify(nav.items || [])));
    } catch {
      onToast('error', 'فشل تحميل القائمة');
    } finally {
      setLoading(false);
    }
  }, [onToast]);

  useEffect(() => {
    load();
  }, [load]);

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section: 'navigation', data: { items } }),
      });
      if (res.ok) onToast('success', 'تم حفظ القائمة ✓ (حدّث الموقع لرؤية التغيير)');
      else onToast('error', 'فشل الحفظ');
    } finally {
      setSaving(false);
    }
  };

  // ---- helpers operating on the top-level list or a children array ----
  const move = (list: NavNode[], i: number, dir: -1 | 1): NavNode[] => {
    const j = i + dir;
    if (j < 0 || j >= list.length) return list;
    const next = [...list];
    [next[i], next[j]] = [next[j], next[i]];
    return next;
  };

  const updateTop = (i: number, node: NavNode) => {
    const next = [...items];
    next[i] = node;
    setItems(next);
  };

  const addTopGroup = () => {
    setItems([...items, { id: newId('grp'), labelAr: 'قسم جديد', labelEn: 'New Section', labelMs: '', kind: 'group', children: [] }]);
  };
  const addTopLink = () => {
    setItems([...items, { id: newId('item'), labelAr: 'رابط جديد', labelEn: 'New Link', labelMs: '', kind: 'section', section: 'home', sub: '' }]);
  };

  const createPageChild = async (parentIndex: number | null) => {
    // Create a real custom page then link it
    const res = await fetch('/api/pages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title_ar: 'صفحة جديدة', title_en: 'New Page', show_in_nav: false, blocks: [] }),
    });
    const data = await res.json();
    if (!res.ok) {
      onToast('error', data.error || 'فشل إنشاء الصفحة');
      return;
    }
    const node: NavNode = {
      id: newId('page'),
      labelAr: 'صفحة جديدة',
      labelEn: 'New Page',
      labelMs: '',
      kind: 'page',
      slug: data.page.slug,
    };
    if (parentIndex === null) {
      setItems([...items, node]);
    } else {
      const next = [...items];
      const parent = { ...next[parentIndex] };
      parent.children = [...(parent.children || []), node];
      next[parentIndex] = parent;
      setItems(next);
    }
    onToast('success', 'تم إنشاء صفحة جديدة وربطها بالقائمة');
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20 text-slate-300">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <EditLangProvider lang={lang}>
      <div className="space-y-5 pb-24">
        <div className="sticky top-0 z-10 -mx-8 px-8 py-4 bg-brand-gold-light/95 backdrop-blur border-b border-brand-gold/20 flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-bold text-brand-blue-dark font-serif">إدارة القائمة (التنقّل)</h1>
            <p className="text-xs text-slate-500 mt-0.5">رتّب عناصر القائمة، عدّل أسماءها، أضف صفحات جديدة — ثم احفظ</p>
          </div>
          <div className="flex items-center gap-2">
            <LanguageTabs value={lang} onChange={setLang} />
            <button
              onClick={save}
              disabled={saving}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl text-sm disabled:opacity-60 shadow-sm"
            >
              {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
              حفظ القائمة
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {items.map((item, i) => (
            <TopItemCard
              key={item.id}
              item={item}
              index={i}
              total={items.length}
              onChange={(n) => updateTop(i, n)}
              onMoveUp={() => setItems(move(items, i, -1))}
              onMoveDown={() => setItems(move(items, i, 1))}
              onDelete={() => { if (confirm('حذف هذا العنصر؟')) setItems(items.filter((_, idx) => idx !== i)); }}
              onAddPageChild={() => createPageChild(i)}
              onOpenPage={onOpenPage}
            />
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <button onClick={addTopGroup} className="flex items-center gap-2 border-2 border-dashed border-brand-gold/40 text-brand-gold-dark hover:bg-brand-gold-light font-bold py-2.5 px-4 rounded-xl text-sm">
            <FolderPlus className="h-4 w-4" /> إضافة قسم (قائمة منسدلة)
          </button>
          <button onClick={addTopLink} className="flex items-center gap-2 border-2 border-dashed border-brand-gold/40 text-brand-gold-dark hover:bg-brand-gold-light font-bold py-2.5 px-4 rounded-xl text-sm">
            <Link2 className="h-4 w-4" /> إضافة رابط مباشر
          </button>
          <button onClick={() => createPageChild(null)} className="flex items-center gap-2 border-2 border-dashed border-brand-gold/40 text-brand-gold-dark hover:bg-brand-gold-light font-bold py-2.5 px-4 rounded-xl text-sm">
            <FileText className="h-4 w-4" /> إضافة صفحة جديدة
          </button>
        </div>
      </div>
    </EditLangProvider>
  );
}

function KindBadge({ kind }: { kind: string }) {
  const map: Record<string, { label: string; cls: string; icon: React.ReactNode }> = {
    group: { label: 'قائمة منسدلة', cls: 'bg-brand-blue-dark text-brand-gold', icon: <Layers className="h-3 w-3" /> },
    section: { label: 'قسم بالموقع', cls: 'bg-blue-100 text-blue-700', icon: <Link2 className="h-3 w-3" /> },
    page: { label: 'صفحة', cls: 'bg-emerald-100 text-emerald-700', icon: <FileText className="h-3 w-3" /> },
    external: { label: 'رابط خارجي', cls: 'bg-amber-100 text-amber-700', icon: <ExternalLink className="h-3 w-3" /> },
  };
  const m = map[kind] || map.section;
  return <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${m.cls}`}>{m.icon}{m.label}</span>;
}

function TargetEditor({ node, onChange }: { node: NavNode; onChange: (n: NavNode) => void }) {
  if (node.kind === 'section') {
    const cur = `${node.section || 'home'}|${node.sub || ''}`;
    return (
      <div className="space-y-1">
        <label className="block text-[13px] font-semibold text-slate-700">يفتح هذا القسم في الموقع</label>
        <select
          value={cur}
          onChange={(e) => {
            const [section, sub] = e.target.value.split('|');
            onChange({ ...node, section, sub });
          }}
          className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:border-brand-gold"
        >
          {SECTION_TARGETS.map((t) => (
            <option key={t.v} value={t.v}>{t.label}</option>
          ))}
        </select>
      </div>
    );
  }
  if (node.kind === 'external') {
    return <TextField label="الرابط الخارجي" value={node.url || ''} onChange={(v) => onChange({ ...node, url: v })} dir="ltr" placeholder="https://..." />;
  }
  if (node.kind === 'page') {
    return (
      <div className="text-xs text-slate-500 bg-slate-50 rounded-lg p-2">
        مربوطة بالصفحة: <code dir="ltr" className="text-brand-blue-dark">/{node.slug}</code>
      </div>
    );
  }
  return null;
}

function ChildRow({
  child, index, total, onChange, onMoveUp, onMoveDown, onDelete, onOpenPage,
}: {
  child: NavNode; index: number; total: number;
  onChange: (n: NavNode) => void; onMoveUp: () => void; onMoveDown: () => void; onDelete: () => void;
  onOpenPage?: (slug: string) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`rounded-xl border ${child._hidden ? 'bg-slate-100 opacity-70 border-slate-200' : 'bg-white border-slate-200'}`}>
      <div className="flex items-center justify-between px-3 py-2 gap-2">
        <button onClick={() => setOpen(!open)} className="flex items-center gap-2 text-sm font-bold text-slate-700 flex-1 text-right min-w-0">
          <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
          <span className="truncate">{child.labelAr || 'عنصر'}</span>
          <KindBadge kind={child.kind} />
        </button>
        <div className="flex items-center gap-0.5 shrink-0">
          {child.kind === 'page' && onOpenPage && (
            <button onClick={() => onOpenPage(child.slug!)} className="p-1.5 hover:bg-emerald-50 rounded-lg" title="تعديل محتوى الصفحة">
              <FileText className="h-4 w-4 text-emerald-600" />
            </button>
          )}
          <button onClick={() => onChange({ ...child, _hidden: !child._hidden })} className="p-1.5 hover:bg-slate-100 rounded-lg" title={child._hidden ? 'إظهار' : 'إخفاء'}>
            {child._hidden ? <EyeOff className="h-4 w-4 text-slate-400" /> : <Eye className="h-4 w-4 text-emerald-600" />}
          </button>
          <button onClick={onMoveUp} disabled={index === 0} className="p-1.5 hover:bg-slate-100 rounded-lg disabled:opacity-30"><ChevronUp className="h-4 w-4" /></button>
          <button onClick={onMoveDown} disabled={index === total - 1} className="p-1.5 hover:bg-slate-100 rounded-lg disabled:opacity-30"><ChevronDown className="h-4 w-4" /></button>
          <button onClick={onDelete} className="p-1.5 hover:bg-red-50 rounded-lg"><Trash2 className="h-4 w-4 text-red-500" /></button>
        </div>
      </div>
      {open && (
        <div className="px-3 pb-3 space-y-3 border-t border-slate-100 pt-3">
          <MultiLangField label="اسم العنصر في القائمة" obj={child} fieldBase="label" onChange={(f, v) => onChange({ ...child, [f]: v })} />
          <TargetEditor node={child} onChange={onChange} />
          {child.kind === 'page' && onOpenPage && (
            <button onClick={() => onOpenPage(child.slug!)} className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1">
              <FileText className="h-3.5 w-3.5" /> تعديل محتوى هذه الصفحة في «صفحات مخصصة»
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function TopItemCard({
  item, index, total, onChange, onMoveUp, onMoveDown, onDelete, onAddPageChild, onOpenPage,
}: {
  item: NavNode; index: number; total: number;
  onChange: (n: NavNode) => void; onMoveUp: () => void; onMoveDown: () => void; onDelete: () => void;
  onAddPageChild: () => void; onOpenPage?: (slug: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const children = item.children || [];

  const setChildren = (c: NavNode[]) => onChange({ ...item, children: c });
  const moveChild = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= children.length) return;
    const next = [...children];
    [next[i], next[j]] = [next[j], next[i]];
    setChildren(next);
  };

  return (
    <div className={`rounded-2xl border shadow-sm ${item._hidden ? 'bg-slate-100 opacity-70 border-slate-200' : 'bg-white border-brand-gold/20'}`}>
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-l from-brand-gold-light to-white rounded-t-2xl border-b border-brand-gold/10">
        <button onClick={() => setOpen(!open)} className="flex items-center gap-2.5 text-base font-bold text-brand-blue-dark flex-1 text-right min-w-0">
          <span className="inline-flex items-center justify-center h-6 w-6 bg-brand-gold text-white rounded-lg text-[11px] shrink-0">{index + 1}</span>
          <span className="truncate">{item.labelAr || 'عنصر'}</span>
          <KindBadge kind={item.kind} />
          <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
        <div className="flex items-center gap-0.5 shrink-0">
          <button onClick={() => onChange({ ...item, _hidden: !item._hidden })} className="p-2 hover:bg-slate-100 rounded-lg" title={item._hidden ? 'إظهار' : 'إخفاء'}>
            {item._hidden ? <EyeOff className="h-4 w-4 text-slate-400" /> : <Eye className="h-4 w-4 text-emerald-600" />}
          </button>
          <button onClick={onMoveUp} disabled={index === 0} className="p-2 hover:bg-slate-100 rounded-lg disabled:opacity-30"><ChevronUp className="h-4 w-4" /></button>
          <button onClick={onMoveDown} disabled={index === total - 1} className="p-2 hover:bg-slate-100 rounded-lg disabled:opacity-30"><ChevronDown className="h-4 w-4" /></button>
          <button onClick={onDelete} className="p-2 hover:bg-red-50 rounded-lg"><Trash2 className="h-4 w-4 text-red-500" /></button>
        </div>
      </div>

      {open && (
        <div className="p-4 space-y-4">
          <MultiLangField label="اسم العنصر في القائمة" obj={item} fieldBase="label" onChange={(f, v) => onChange({ ...item, [f]: v })} />

          {item.kind !== 'group' ? (
            <TargetEditor node={item} onChange={onChange} />
          ) : (
            <div className="space-y-2">
              <div className="text-sm font-bold text-slate-600">العناصر الفرعية ({children.length})</div>
              {children.map((c, ci) => (
                <ChildRow
                  key={c.id}
                  child={c}
                  index={ci}
                  total={children.length}
                  onChange={(n) => { const next = [...children]; next[ci] = n; setChildren(next); }}
                  onMoveUp={() => moveChild(ci, -1)}
                  onMoveDown={() => moveChild(ci, 1)}
                  onDelete={() => { if (confirm('حذف هذا العنصر الفرعي؟')) setChildren(children.filter((_, idx) => idx !== ci)); }}
                  onOpenPage={onOpenPage}
                />
              ))}
              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  onClick={() => setChildren([...children, { id: newId('sec'), labelAr: 'رابط جديد', labelEn: 'New Link', labelMs: '', kind: 'section', section: 'home', sub: '' }])}
                  className="text-xs font-bold text-brand-gold-dark border border-dashed border-brand-gold/40 rounded-lg px-3 py-2 hover:bg-brand-gold-light"
                >
                  + رابط لقسم بالموقع
                </button>
                <button
                  onClick={() => setChildren([...children, { id: newId('ext'), labelAr: 'رابط خارجي', labelEn: 'External', labelMs: '', kind: 'external', url: '' }])}
                  className="text-xs font-bold text-brand-gold-dark border border-dashed border-brand-gold/40 rounded-lg px-3 py-2 hover:bg-brand-gold-light"
                >
                  + رابط خارجي
                </button>
                <button
                  onClick={onAddPageChild}
                  className="text-xs font-bold text-emerald-700 border border-dashed border-emerald-300 rounded-lg px-3 py-2 hover:bg-emerald-50"
                >
                  + صفحة جديدة
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
