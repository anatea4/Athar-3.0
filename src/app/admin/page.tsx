'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  LayoutDashboard, Settings, LogOut, Plus, Trash2,
  Save, Eye, EyeOff, Shield, X, Lock, UserPlus,
  RefreshCw, CheckCircle, AlertCircle, Loader2,
  FileText, Mail, Users, BookOpen, Image as ImageIcon,
  HelpCircle, Phone, CreditCard, Newspaper, Heart,
  Star, Building2, MessageSquare, Code, LayoutList, FilePlus, Inbox, ChevronDown, Sparkles
} from 'lucide-react';
import SmartEditor from '@/components/admin/SmartEditor';
import PreviewPane from '@/components/admin/PreviewPane';
import PageBuilder from '@/components/admin/PageBuilder';
import SubmissionsInbox from '@/components/admin/SubmissionsInbox';
import NavManager from '@/components/admin/NavManager';
import FormsManager from '@/components/admin/FormsManager';
import DigitalLibraryEditor from '@/components/admin/DigitalLibraryEditor';

type AdminUser = { id: string; email: string; isSuper: boolean };
type Tab =
  | 'overview'
  | 'hero'
  | 'about'
  | 'stats'
  | 'programs'
  | 'detailed_programs'
  | 'team'
  | 'partners'
  | 'faqs'
  | 'initiatives'
  | 'events'
  | 'volunteers'
  | 'media_news'
  | 'media_articles'
  | 'digital_library'
  | 'gallery'
  | 'daily_ayahs'
  | 'calendar'
  | 'contact'
  | 'footer'
  | 'header'
  | 'ai_companion'
  | 'navigation'
  | 'forms_manager'
  | 'custom_pages'
  | 'submissions'
  | 'admins'
  | 'payments'
  | 'settings';

interface ToastMsg {
  id: number;
  type: 'success' | 'error' | 'info';
  message: string;
}

const SECTIONS: { id: Tab; label: string; icon: React.ReactNode; group: string }[] = [
  { id: 'overview', label: 'نظرة عامة', icon: <LayoutDashboard className="h-4 w-4" />, group: 'home' },
  // Pages
  { id: 'hero', label: 'الصفحة الرئيسية', icon: <FileText className="h-4 w-4" />, group: 'pages' },
  { id: 'about', label: 'عن الأكاديمية', icon: <Building2 className="h-4 w-4" />, group: 'pages' },
  { id: 'stats', label: 'الإحصائيات', icon: <Star className="h-4 w-4" />, group: 'pages' },
  { id: 'header', label: 'رأس الصفحة', icon: <FileText className="h-4 w-4" />, group: 'pages' },
  { id: 'footer', label: 'تذييل الصفحة', icon: <FileText className="h-4 w-4" />, group: 'pages' },
  { id: 'ai_companion', label: 'المساعد الذكي', icon: <MessageSquare className="h-4 w-4" />, group: 'pages' },
  // Content sections
  { id: 'programs', label: 'البرامج', icon: <BookOpen className="h-4 w-4" />, group: 'content' },
  { id: 'detailed_programs', label: 'البرامج المفصلة', icon: <BookOpen className="h-4 w-4" />, group: 'content' },
  { id: 'team', label: 'الفريق', icon: <Users className="h-4 w-4" />, group: 'content' },
  { id: 'partners', label: 'الشركاء', icon: <Heart className="h-4 w-4" />, group: 'content' },
  { id: 'faqs', label: 'الأسئلة الشائعة', icon: <HelpCircle className="h-4 w-4" />, group: 'content' },
  { id: 'initiatives', label: 'المبادرات', icon: <Star className="h-4 w-4" />, group: 'content' },
  { id: 'events', label: 'الفعاليات الحالية', icon: <Sparkles className="h-4 w-4" />, group: 'content' },
  { id: 'volunteers', label: 'التطوع', icon: <Heart className="h-4 w-4" />, group: 'content' },
  { id: 'media_news', label: 'الأخبار', icon: <Newspaper className="h-4 w-4" />, group: 'content' },
  { id: 'media_articles', label: 'المقالات', icon: <FileText className="h-4 w-4" />, group: 'content' },
  { id: 'digital_library', label: 'المكتبة الرقمية', icon: <FileText className="h-4 w-4" />, group: 'content' },
  { id: 'gallery', label: 'معرض الصور', icon: <ImageIcon className="h-4 w-4" />, group: 'content' },
  { id: 'daily_ayahs', label: 'الآيات اليومية', icon: <BookOpen className="h-4 w-4" />, group: 'content' },
  { id: 'calendar', label: 'التقويم السنوي', icon: <FileText className="h-4 w-4" />, group: 'content' },
  { id: 'contact', label: 'بيانات التواصل', icon: <Phone className="h-4 w-4" />, group: 'content' },
  // Builder
  { id: 'navigation', label: 'إدارة القائمة', icon: <LayoutList className="h-4 w-4" />, group: 'builder' },
  { id: 'forms_manager', label: 'إدارة النماذج', icon: <FileText className="h-4 w-4" />, group: 'builder' },
  { id: 'custom_pages', label: 'صفحات مخصصة', icon: <FilePlus className="h-4 w-4" />, group: 'builder' },
  // Inbox
  { id: 'submissions', label: 'الرسائل والطلبات', icon: <Inbox className="h-4 w-4" />, group: 'inbox' },
  // Management
  { id: 'admins', label: 'إدارة المشرفين', icon: <UserPlus className="h-4 w-4" />, group: 'manage' },
  { id: 'payments', label: 'المدفوعات', icon: <CreditCard className="h-4 w-4" />, group: 'manage' },
  { id: 'settings', label: 'الإعدادات', icon: <Settings className="h-4 w-4" />, group: 'manage' },
];

const GROUP_LABELS: Record<string, string> = {
  home: 'القائمة الرئيسية',
  pages: 'صفحات الموقع',
  content: 'محتوى الأقسام',
  builder: 'منشئ الصفحات',
  inbox: 'الوارد',
  manage: 'الإدارة',
};

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(null);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [toasts, setToasts] = useState<ToastMsg[]>([]);

  // Content state — keyed by section name
  const [content, setContent] = useState<Record<string, any>>({});
  const [defaults, setDefaults] = useState<Record<string, any>>({});
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [editorValue, setEditorValue] = useState('');          // JSON string (advanced view)
  const [editorData, setEditorData] = useState<any>(null);     // parsed object (form view)
  const [editorMode, setEditorMode] = useState<'form' | 'json'>('form');
  const [savingSection, setSavingSection] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(true);
  const [openPageSlug, setOpenPageSlug] = useState<string | null>(null);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    home: true, pages: true, content: false, builder: true, inbox: true, manage: false,
  });

  // Admins state
  const [admins, setAdmins] = useState<Array<{ id: string; email: string; is_super: boolean; created_at: string }>>([]);
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminPass, setNewAdminPass] = useState('');
  const [newAdminSuper, setNewAdminSuper] = useState(false);
  const [changingPassFor, setChangingPassFor] = useState<string | null>(null);
  const [newPassValue, setNewPassValue] = useState('');

  // Settings state
  const [settings, setSettings] = useState<Record<string, string>>({});

  const addToast = useCallback((type: ToastMsg['type'], message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  }, []);

  // Check existing session on mount
  useEffect(() => {
    fetch('/api/auth')
      .then((r) => r.json())
      .then((d) => {
        if (d.admin) {
          setCurrentAdmin({ id: d.admin.id, email: d.admin.email, isSuper: d.admin.isSuper });
          setIsLoggedIn(true);
        }
      })
      .catch(() => {});
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPass }),
      });
      const data = await res.json();
      if (res.ok) {
        setCurrentAdmin({ id: data.admin.id, email: data.admin.email, isSuper: data.admin.isSuper });
        setIsLoggedIn(true);
        addToast('success', `مرحباً ${data.admin.email}!`);
      } else {
        addToast('error', data.error || 'فشل تسجيل الدخول');
      }
    } catch {
      addToast('error', 'خطأ في الاتصال');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth', { method: 'DELETE' });
    setIsLoggedIn(false);
    setCurrentAdmin(null);
    addToast('info', 'تم تسجيل الخروج');
  };

  const loadContent = useCallback(async () => {
    try {
      const res = await fetch('/api/content', { cache: 'no-store' });
      const data = await res.json();
      if (res.ok && data.content) setContent(data.content);
    } catch {
      addToast('error', 'فشل تحميل المحتوى');
    }
  }, [addToast]);

  const loadDefaults = useCallback(async () => {
    try {
      const res = await fetch('/api/defaults');
      const data = await res.json();
      if (res.ok) setDefaults(data);
    } catch {}
  }, []);

  const loadAdmins = useCallback(async () => {
    try {
      const res = await fetch('/api/admins');
      const data = await res.json();
      if (res.ok) setAdmins(data.admins || []);
    } catch {}
  }, []);

  const loadSettings = useCallback(async () => {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      if (res.ok) setSettings(data.settings || {});
    } catch {}
  }, []);

  useEffect(() => {
    if (!isLoggedIn) return;
    loadContent();
    loadDefaults();
    loadAdmins();
    loadSettings();
  }, [isLoggedIn, loadContent, loadDefaults, loadAdmins, loadSettings]);

  const CONTENT_TABS = SECTIONS.filter((s) => s.group === 'pages' || s.group === 'content').map((s) => s.id);
  const isContentTab = (t: Tab) => CONTENT_TABS.includes(t);

  const startEdit = useCallback((section: string) => {
    const current = content[section];
    const fallback = defaults[section];
    let value: any;
    if (Array.isArray(fallback)) {
      // Arrays: use saved content if non-empty, else defaults
      value = Array.isArray(current) && current.length > 0 ? current : fallback || [];
    } else if (fallback && typeof fallback === 'object') {
      // Objects: merge defaults under saved content so newly-added default fields always appear
      value = { ...(fallback as any), ...(current && typeof current === 'object' ? current : {}) };
    } else {
      value = current ?? fallback ?? {};
    }
    // Deep clone so editing doesn't mutate the loaded state
    const cloned = JSON.parse(JSON.stringify(value));
    setEditorData(cloned);
    setEditorValue(JSON.stringify(cloned, null, 2));
    setEditingSection(section);
    setEditorMode('form');
  }, [content, defaults]);

  // Auto-open the form when switching to a content section (no extra clicks).
  const loadedSectionRef = useRef<string | null>(null);
  useEffect(() => {
    if (!isLoggedIn) return;
    if (!isContentTab(activeTab)) {
      loadedSectionRef.current = null;
      return;
    }
    if (loadedSectionRef.current === activeTab) return; // already loaded this section
    if (Object.keys(defaults).length === 0) return; // wait for defaults
    startEdit(activeTab);
    loadedSectionRef.current = activeTab;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, isLoggedIn, defaults, content]);

  const saveSection = async (section: string) => {
    setSavingSection(section);
    try {
      // In JSON mode parse the textarea; in form mode use editorData
      const parsed = editorMode === 'json' ? JSON.parse(editorValue) : editorData;
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section, data: parsed }),
      });
      if (!res.ok) {
        const d = await res.json();
        addToast('error', d.error || 'فشل الحفظ');
        return;
      }
      addToast('success', `تم الحفظ بنجاح ✓`);
      await loadContent();
    } catch (e: any) {
      addToast('error', 'تعذّر الحفظ: ' + e.message);
    } finally {
      setSavingSection(null);
    }
  };

  const resetSection = async (section: string) => {
    if (!confirm(`هل تريد استعادة المحتوى الأصلي لهذا القسم؟ سيتم فقدان تعديلاتك.`)) return;
    const res = await fetch('/api/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ section, data: {} }),
    });
    if (res.ok) {
      addToast('success', 'تمت استعادة المحتوى الأصلي');
      await loadContent();
      // Force the form to reload with default content
      loadedSectionRef.current = null;
      const fallback = defaults[section] || {};
      const cloned = JSON.parse(JSON.stringify(fallback));
      setEditorData(cloned);
      loadedSectionRef.current = section;
    }
  };

  const createAdmin = async () => {
    if (!newAdminEmail || !newAdminPass) {
      addToast('error', 'البريد وكلمة المرور مطلوبان');
      return;
    }
    const res = await fetch('/api/admins', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: newAdminEmail, password: newAdminPass, isSuper: newAdminSuper }),
    });
    const d = await res.json();
    if (res.ok) {
      addToast('success', `تم إنشاء المشرف ${newAdminEmail}`);
      setNewAdminEmail('');
      setNewAdminPass('');
      setNewAdminSuper(false);
      await loadAdmins();
    } else {
      addToast('error', d.error || 'فشل');
    }
  };

  const deleteAdmin = async (id: string) => {
    if (!confirm('حذف هذا المشرف نهائياً؟')) return;
    const res = await fetch('/api/admins', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      addToast('success', 'تم الحذف');
      await loadAdmins();
    } else {
      const d = await res.json();
      addToast('error', d.error || 'فشل');
    }
  };

  const changePassword = async (adminId: string) => {
    if (!newPassValue) {
      addToast('error', 'كلمة المرور مطلوبة');
      return;
    }
    const res = await fetch('/api/admins/password', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ adminId, newPassword: newPassValue }),
    });
    if (res.ok) {
      addToast('success', 'تم تغيير كلمة المرور');
      setChangingPassFor(null);
      setNewPassValue('');
    } else {
      const d = await res.json();
      addToast('error', d.error || 'فشل');
    }
  };

  const saveSetting = async (key: string, value: string) => {
    const res = await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, value }),
    });
    if (res.ok) {
      addToast('success', `تم حفظ ${key}`);
      setSettings({ ...settings, [key]: value });
    } else {
      addToast('error', 'فشل الحفظ');
    }
  };

  // Render toasts
  const renderToasts = () => (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-md">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg border ${
            t.type === 'success'
              ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
              : t.type === 'error'
              ? 'bg-red-50 border-red-300 text-red-900'
              : 'bg-blue-50 border-blue-300 text-blue-900'
          }`}
        >
          {t.type === 'success' ? (
            <CheckCircle className="h-5 w-5" />
          ) : t.type === 'error' ? (
            <AlertCircle className="h-5 w-5" />
          ) : (
            <RefreshCw className="h-5 w-5" />
          )}
          <span className="text-sm font-medium">{t.message}</span>
        </div>
      ))}
    </div>
  );

  // Login screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-blue-dark via-brand-blue to-brand-blue-dark px-4 relative overflow-hidden">
        {renderToasts()}
        <div className="absolute inset-0 islamic-pattern-dark opacity-30" />
        <div className="absolute w-[500px] h-[500px] bg-brand-gold/10 blur-[120px] rounded-full" />
        <div className="relative w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-2xl p-8 space-y-6 border-t-4 border-brand-gold">
            <div className="text-center space-y-2">
              <div className="inline-flex p-1 bg-white rounded-3xl border border-brand-gold/30 shadow-md h-20 w-20 items-center justify-center overflow-hidden mb-1">
                <img src="/athar-logo.png" alt="Athar Academy Logo" className="h-full w-auto object-contain" />
              </div>
              <h1 className="text-2xl font-bold text-brand-blue-dark font-serif">لوحة إدارة أثر</h1>
              <p className="text-sm text-slate-500">Athar Academy Admin</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">البريد الإلكتروني</label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-brand-gold"
                  placeholder="it@athar.my"
                  required
                  autoFocus
                  dir="ltr"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">كلمة المرور</label>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={loginPass}
                    onChange={(e) => setLoginPass(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-brand-gold pr-12"
                    placeholder="••••••••"
                    required
                    dir="ltr"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPass ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                disabled={loginLoading}
                className="w-full bg-gradient-to-r from-brand-gold to-brand-gold-dark hover:from-brand-gold-dark hover:to-brand-gold text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-60 shadow-lg"
              >
                {loginLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <Lock className="h-5 w-5" />
                    دخول
                  </>
                )}
              </button>
            </form>
            <p className="text-xs text-center text-slate-500">
              أكاديمية أثر • التحكم الكامل في الموقع
            </p>
            <div className="flex flex-col items-center justify-center pt-3 border-t border-slate-100 gap-1 opacity-80 hover:opacity-100 transition-opacity">
              <span className="text-[10px] text-slate-400 font-sans">صنع بواسطة</span>
              <img src="/logo-MEEM-2.jpg" alt="Meem Design" className="h-10 w-auto object-contain" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main dashboard layout
  return (
    <div className="min-h-screen bg-brand-gold-light flex" dir="rtl">
      {renderToasts()}

      {/* Sidebar */}
      <aside className="w-64 bg-brand-blue-dark text-slate-100 flex flex-col fixed h-full border-l border-brand-gold/20">
        <div className="p-5 border-b border-brand-gold/20 relative">
          <div className="absolute inset-0 islamic-pattern-dark opacity-40 pointer-events-none" />
          <div className="flex items-center gap-3 relative z-10">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white border border-brand-gold/20 p-1">
              <img src="/athar-logo.png" alt="Athar Academy Logo" className="h-full w-auto object-contain" />
            </div>
            <div className="min-w-0">
              <h2 className="text-lg font-bold font-serif text-brand-gold leading-tight">لوحة أثر</h2>
              <p className="text-[10px] text-slate-400 truncate mt-0.5" dir="ltr">{currentAdmin?.email}</p>
            </div>
          </div>
          {currentAdmin?.isSuper && (
            <div className="mt-2 relative z-10">
              <span className="inline-block text-[9px] uppercase font-bold bg-brand-gold text-brand-blue-dark px-2 py-0.5 rounded">
                Super Admin
              </span>
            </div>
          )}
        </div>
        <nav className="flex-1 overflow-y-auto py-3">
          {Object.keys(GROUP_LABELS).map((group) => {
            const groupSections = SECTIONS.filter((s) => s.group === group);
            const isOpen = expandedGroups[group] ?? true;
            const hasActive = groupSections.some((s) => s.id === activeTab);
            return (
              <div key={group} className="mb-1">
                <button
                  onClick={() => setExpandedGroups((prev) => ({ ...prev, [group]: !(prev[group] ?? true) }))}
                  className="w-full flex items-center justify-between px-5 py-2 text-[10px] uppercase text-brand-gold/60 font-bold tracking-wider hover:text-brand-gold"
                >
                  <span>{GROUP_LABELS[group]}</span>
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isOpen ? '' : '-rotate-90'}`} />
                </button>
                {(isOpen || hasActive) && (
                  <div className="space-y-0.5">
                    {groupSections.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setActiveTab(s.id)}
                        className={`w-full flex items-center gap-3 px-5 py-2.5 text-sm transition-colors ${
                          activeTab === s.id
                             ? 'bg-brand-gold/15 text-brand-gold border-r-2 border-brand-gold font-bold'
                             : 'hover:bg-brand-blue/40 text-slate-300'
                        }`}
                      >
                        {s.icon}
                        <span>{s.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
        <div className="p-3 border-t border-slate-700 space-y-3">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 rounded text-sm"
          >
            <LogOut className="h-4 w-4" />
            تسجيل الخروج
          </button>
          <div className="flex flex-row items-center justify-center gap-2 pt-2 border-t border-slate-800 opacity-70 hover:opacity-100 transition-opacity w-full">
            <span className="text-[10px] text-slate-400 font-sans">صنع بواسطة</span>
            <img src="/logo-footer.png" alt="Meem Design" className="h-11 w-auto object-contain brightness-125 contrast-105" />
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 mr-64 p-8 overflow-y-auto">
        {activeTab === 'overview' && (
          <OverviewTab adminCount={admins.length} onGoto={(t) => setActiveTab(t)} />
        )}

        {isContentTab(activeTab) && (
          <div className={`flex gap-6 ${showPreview ? '' : ''}`}>
            <div className="flex-1 min-w-0">
              <SectionEditor
                sectionId={activeTab}
                label={SECTIONS.find((s) => s.id === activeTab)?.label || activeTab}
                currentData={content[activeTab]}
                editorData={editorData}
                setEditorData={setEditorData}
                onSave={() => saveSection(activeTab)}
                onReset={() => resetSection(activeTab)}
                saving={savingSection === activeTab}
                addToast={addToast}
                showPreview={showPreview}
                onTogglePreview={() => setShowPreview((v) => !v)}
              />
            </div>
            {showPreview && (
              <div className="w-[44%] max-w-[640px] shrink-0 hidden lg:block">
                <PreviewPane section={activeTab} data={editorData} />
              </div>
            )}
          </div>
        )}

        {activeTab === 'admins' && (
          <AdminsTab
            admins={admins}
            currentAdmin={currentAdmin}
            newAdminEmail={newAdminEmail}
            setNewAdminEmail={setNewAdminEmail}
            newAdminPass={newAdminPass}
            setNewAdminPass={setNewAdminPass}
            newAdminSuper={newAdminSuper}
            setNewAdminSuper={setNewAdminSuper}
            onCreate={createAdmin}
            onDelete={deleteAdmin}
            changingPassFor={changingPassFor}
            setChangingPassFor={setChangingPassFor}
            newPassValue={newPassValue}
            setNewPassValue={setNewPassValue}
            onChangePass={changePassword}
          />
        )}

        {activeTab === 'navigation' && (
          <NavManager
            onToast={addToast}
            onOpenPage={(slug: string) => {
              setOpenPageSlug(slug);
              setActiveTab('custom_pages');
            }}
          />
        )}

        {activeTab === 'forms_manager' && <FormsManager onToast={addToast} />}

        {activeTab === 'custom_pages' && <PageBuilder onToast={addToast} openSlug={openPageSlug} onConsumedOpenSlug={() => setOpenPageSlug(null)} />}

        {activeTab === 'submissions' && <SubmissionsInbox onToast={addToast} />}

        {activeTab === 'payments' && <PaymentsTab settings={settings} onSave={saveSetting} />}

        {activeTab === 'settings' && <SettingsTab settings={settings} onSave={saveSetting} />}
      </main>
    </div>
  );
}

// ============================================================================
// Subcomponents
// ============================================================================

function OverviewTab({ adminCount, onGoto }: { adminCount: number; onGoto: (t: Tab) => void }) {
  const [counts, setCounts] = useState<Record<string, { total: number; unread: number }>>({});
  const [pagesCount, setPagesCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [subRes, pagesRes] = await Promise.all([
          fetch('/api/submissions?type=all', { cache: 'no-store' }),
          fetch('/api/pages', { cache: 'no-store' }),
        ]);
        const subData = await subRes.json();
        const pagesData = await pagesRes.json();
        if (subRes.ok) setCounts(subData.counts || {});
        if (pagesRes.ok) setPagesCount((pagesData.pages || []).length);
      } catch {}
      finally { setLoading(false); }
    })();
  }, []);

  const c = (k: string) => counts[k]?.total || 0;
  const totalUnread = Object.values(counts).reduce((a, b) => a + b.unread, 0);
  const totalAll = Object.values(counts).reduce((a, b) => a + b.total, 0);
  const registrations = c('register_circles') + c('register_programs');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-brand-blue-dark font-serif">نظرة عامة</h1>
        <p className="text-slate-600 mt-1">ملخّص نشاط أكاديمية أثر {loading && '...'}</p>
      </div>

      {/* Primary registration stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <BigStat label="تسجيلات الحلقات" value={c('register_circles')} icon={<BookOpen className="h-6 w-6" />} onClick={() => onGoto('submissions')} />
        <BigStat label="تسجيلات البرامج" value={c('register_programs')} icon={<Star className="h-6 w-6" />} onClick={() => onGoto('submissions')} />
        <BigStat label="طلبات التوظيف" value={c('careers')} icon={<Users className="h-6 w-6" />} onClick={() => onGoto('submissions')} />
        <BigStat label="طلبات التطوع" value={c('volunteer')} icon={<Heart className="h-6 w-6" />} onClick={() => onGoto('submissions')} />
      </div>

      {/* Secondary stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <BigStat label="الكفالات والتبرعات" value={c('donation')} icon={<CreditCard className="h-6 w-6" />} onClick={() => onGoto('submissions')} dark />
        <BigStat label="رسائل التواصل" value={c('contact') + c('inquiry')} icon={<MessageSquare className="h-6 w-6" />} onClick={() => onGoto('submissions')} dark />
        <BigStat label="الصفحات المخصصة" value={pagesCount} icon={<FilePlus className="h-6 w-6" />} onClick={() => onGoto('custom_pages')} dark />
        <BigStat label="عدد المشرفين" value={adminCount} icon={<Shield className="h-6 w-6" />} onClick={() => onGoto('admins')} dark />
      </div>

      {/* Inbox highlight */}
      <button
        onClick={() => onGoto('submissions')}
        className="w-full text-right bg-gradient-to-l from-brand-gold-light to-white border border-brand-gold/30 rounded-2xl p-6 flex items-center justify-between hover:shadow-md transition"
      >
        <div>
          <div className="text-2xl font-bold text-brand-blue-dark font-serif">{totalAll} رسالة/طلب إجمالاً</div>
          <p className="text-sm text-slate-500 mt-1">
            {totalUnread > 0 ? `لديك ${totalUnread} رسالة جديدة غير مقروءة` : 'كل الرسائل مقروءة'}
          </p>
        </div>
        <div className="relative">
          <Inbox className="h-12 w-12 text-brand-gold" />
          {totalUnread > 0 && (
            <span className="absolute -top-1 -left-1 bg-red-500 text-white text-[11px] font-bold h-6 min-w-6 px-1.5 rounded-full flex items-center justify-center">{totalUnread}</span>
          )}
        </div>
      </button>

      <div className="bg-white rounded-2xl border border-brand-gold/20 p-6">
        <h2 className="text-lg font-bold mb-3 text-brand-blue-dark">دليل سريع</h2>
        <ul className="space-y-2 text-sm text-slate-600">
          <li>• «إدارة القائمة»: رتّب عناصر قائمة الموقع وأضف صفحات جديدة.</li>
          <li>• «الرسائل والطلبات»: كل تسجيل أو طلب يصلك هنا + على بريدك.</li>
          <li>• أي قسم في «صفحات الموقع» و«محتوى الأقسام»: عدّل النصوص بالـ3 لغات وارفع الصور.</li>
          <li>• «الإعدادات»: حدّد بُرُد الإشعارات (أكثر من بريد) ومفاتيح الدفع.</li>
        </ul>
      </div>
    </div>
  );
}

function BigStat({ label, value, icon, onClick, dark }: { label: string; value: number; icon: React.ReactNode; onClick?: () => void; dark?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`text-right rounded-2xl border p-5 shadow-sm transition hover:shadow-md hover:-translate-y-0.5 ${
        dark ? 'bg-brand-blue-dark border-brand-gold/30 text-white' : 'bg-white border-brand-gold/30 text-brand-blue-dark'
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className={dark ? 'text-brand-gold' : 'text-brand-gold-dark'}>{icon}</span>
        <span className="text-3xl font-bold font-serif">{value}</span>
      </div>
      <p className={`text-sm font-semibold ${dark ? 'text-slate-200' : 'text-slate-600'}`}>{label}</p>
    </button>
  );
}

function StatCard({ label, value, icon, color }: { label: string; value: number | string; icon: React.ReactNode; color: string }) {
  const colorMap: Record<string, string> = {
    amber: 'bg-white border-brand-gold/30 text-brand-gold-dark',
    emerald: 'bg-white border-brand-blue/20 text-brand-blue',
    indigo: 'bg-brand-blue-dark border-brand-gold/30 text-brand-gold',
  };
  return (
    <div className={`rounded-2xl border p-5 shadow-sm ${colorMap[color]}`}>
      <div className="flex items-center justify-between mb-2">
        {icon}
        <span className="text-3xl font-bold font-serif">{value}</span>
      </div>
      <p className="text-sm font-semibold">{label}</p>
    </div>
  );
}

function SectionEditor({
  sectionId,
  label,
  currentData,
  editorData,
  setEditorData,
  onSave,
  onReset,
  saving,
  addToast,
  showPreview,
  onTogglePreview,
}: any) {
  return (
    <div className="space-y-4 pb-24">
      {/* Sticky header bar with title + actions */}
      <div className="sticky top-0 z-10 -mx-8 px-8 py-4 bg-brand-gold-light/95 backdrop-blur border-b border-brand-gold/20 flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-brand-blue-dark font-serif">{label}</h1>
          <p className="text-xs text-slate-500 mt-0.5">عدّل النصوص والصور ثم اضغط "حفظ التغييرات"</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onTogglePreview}
            className="hidden lg:flex items-center gap-2 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold px-4 py-2.5 rounded-xl text-sm"
            title="إظهار/إخفاء المعاينة"
          >
            {showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            {showPreview ? 'إخفاء المعاينة' : 'إظهار المعاينة'}
          </button>
          <button
            onClick={onReset}
            className="flex items-center gap-2 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold px-4 py-2.5 rounded-xl text-sm"
            title="استعادة المحتوى الأصلي"
          >
            <RefreshCw className="h-4 w-4" />
            استعادة الأصلي
          </button>
          <button
            onClick={onSave}
            disabled={saving}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl text-sm disabled:opacity-60 shadow-sm"
          >
            {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
            حفظ التغييرات
          </button>
        </div>
      </div>

      {editorData == null ? (
        <div className="flex items-center justify-center py-20 text-slate-400">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          {sectionId === 'digital_library' ? (
            <DigitalLibraryEditor value={editorData} onChange={setEditorData} onToast={addToast} />
          ) : (
            <SmartEditor data={editorData} onChange={setEditorData} onToast={addToast} />
          )}
        </div>
      )}

      <div className="bg-brand-gold-light border border-brand-gold/30 rounded-xl p-4 text-sm text-brand-blue-dark">
        <div className="font-bold mb-1">💡 إرشادات</div>
        <ul className="text-xs space-y-1 list-disc list-inside">
          <li>اضغط على عنوان أي عنصر لفتحه وتعديل نصوصه بالعربية والإنجليزية والماليزية.</li>
          <li>لرفع صورة: اضغط زر «رفع صورة» واختر الصورة من جهازك (الحد الأقصى 5 ميجابايت).</li>
          <li>أزرار ⬆️⬇️ لإعادة الترتيب، 👁️ للإظهار/الإخفاء، 🗑️ للحذف، وزر «إضافة» لعنصر جديد.</li>
          <li>لا تنسَ الضغط على «حفظ التغييرات» — تظهر التعديلات على الموقع مباشرة بعد الحفظ.</li>
        </ul>
      </div>
    </div>
  );
}

function AdminsTab({
  admins,
  currentAdmin,
  newAdminEmail,
  setNewAdminEmail,
  newAdminPass,
  setNewAdminPass,
  newAdminSuper,
  setNewAdminSuper,
  onCreate,
  onDelete,
  changingPassFor,
  setChangingPassFor,
  newPassValue,
  setNewPassValue,
  onChangePass,
}: any) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-brand-blue-dark font-serif">إدارة المشرفين</h1>

      {currentAdmin?.isSuper && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-brand-gold" />
            إضافة مشرف جديد
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              type="email"
              placeholder="email@athar.my"
              value={newAdminEmail}
              onChange={(e) => setNewAdminEmail(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-brand-gold"
              dir="ltr"
            />
            <input
              type="password"
              placeholder="كلمة المرور"
              value={newAdminPass}
              onChange={(e) => setNewAdminPass(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-brand-gold"
              dir="ltr"
            />
            <label className="flex items-center gap-2 px-2 py-2">
              <input
                type="checkbox"
                checked={newAdminSuper}
                onChange={(e) => setNewAdminSuper(e.target.checked)}
                className="h-4 w-4"
              />
              <span className="text-sm">صلاحيات Super Admin</span>
            </label>
          </div>
          <button
            onClick={onCreate}
            className="mt-3 flex items-center gap-2 bg-brand-gold hover:bg-brand-gold-dark text-white font-bold px-4 py-2 rounded-lg text-sm"
          >
            <Plus className="h-4 w-4" />
            إضافة المشرف
          </button>
        </div>
      )}

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr className="text-right">
              <th className="px-4 py-3 font-bold text-slate-700">البريد</th>
              <th className="px-4 py-3 font-bold text-slate-700">الصلاحية</th>
              <th className="px-4 py-3 font-bold text-slate-700">تاريخ الإنشاء</th>
              <th className="px-4 py-3 font-bold text-slate-700">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((a: any) => (
              <tr key={a.id} className="border-t border-slate-200">
                <td className="px-4 py-3" dir="ltr">{a.email}</td>
                <td className="px-4 py-3">
                  {a.is_super ? (
                    <span className="inline-block text-[10px] uppercase font-bold bg-brand-gold text-brand-blue-dark px-2 py-0.5 rounded">
                      Super
                    </span>
                  ) : (
                    <span className="text-xs text-slate-600">عادي</span>
                  )}
                </td>
                <td className="px-4 py-3 text-xs text-slate-500">
                  {new Date(a.created_at).toLocaleDateString('ar-EG')}
                </td>
                <td className="px-4 py-3 space-x-2 rtl:space-x-reverse">
                  <button
                    onClick={() => setChangingPassFor(changingPassFor === a.id ? null : a.id)}
                    className="text-xs bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1 rounded"
                  >
                    تغيير كلمة المرور
                  </button>
                  {currentAdmin?.isSuper && a.id !== currentAdmin.id && (
                    <button
                      onClick={() => onDelete(a.id)}
                      className="text-xs bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded"
                    >
                      حذف
                    </button>
                  )}
                  {changingPassFor === a.id && (
                    <div className="mt-2 flex items-center gap-2">
                      <input
                        type="password"
                        placeholder="كلمة مرور جديدة"
                        value={newPassValue}
                        onChange={(e) => setNewPassValue(e.target.value)}
                        className="px-3 py-1 border border-slate-300 rounded text-xs"
                        dir="ltr"
                      />
                      <button
                        onClick={() => onChangePass(a.id)}
                        className="text-xs bg-emerald-500 text-white px-3 py-1 rounded"
                      >
                        حفظ
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PaymentsTab({ settings, onSave }: { settings: Record<string, string>; onSave: (k: string, v: string) => void }) {
  const [pubKey, setPubKey] = useState(settings.stripe_publishable_key || '');
  const [secretKey, setSecretKey] = useState(settings.stripe_secret_key || '');
  const [webhookSecret, setWebhookSecret] = useState(settings.stripe_webhook_secret || '');
  const [enabled, setEnabled] = useState(settings.payment_enabled === 'true');

  useEffect(() => {
    setPubKey(settings.stripe_publishable_key || '');
    setSecretKey(settings.stripe_secret_key || '');
    setWebhookSecret(settings.stripe_webhook_secret || '');
    setEnabled(settings.payment_enabled === 'true');
  }, [settings]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-brand-blue-dark font-serif">إعدادات المدفوعات (Stripe)</h1>
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">حالة المدفوعات</label>
          <button
            onClick={() => {
              const v = !enabled;
              setEnabled(v);
              onSave('payment_enabled', v ? 'true' : 'false');
            }}
            className={`px-4 py-2 rounded-lg font-bold text-sm ${
              enabled ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-700'
            }`}
          >
            {enabled ? '✓ مفعّل' : '✗ معطّل'}
          </button>
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Stripe Publishable Key</label>
          <input
            type="text"
            value={pubKey}
            onChange={(e) => setPubKey(e.target.value)}
            placeholder="pk_test_... or pk_live_..."
            className="w-full px-4 py-2 border border-slate-300 rounded-lg font-mono text-xs"
            dir="ltr"
          />
          <button
            onClick={() => onSave('stripe_publishable_key', pubKey)}
            className="mt-2 text-xs bg-brand-gold hover:bg-brand-gold-dark text-white px-3 py-1 rounded"
          >
            حفظ
          </button>
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Stripe Secret Key</label>
          <input
            type="password"
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
            placeholder="sk_test_... or sk_live_..."
            className="w-full px-4 py-2 border border-slate-300 rounded-lg font-mono text-xs"
            dir="ltr"
          />
          <button
            onClick={() => onSave('stripe_secret_key', secretKey)}
            className="mt-2 text-xs bg-brand-gold hover:bg-brand-gold-dark text-white px-3 py-1 rounded"
          >
            حفظ
          </button>
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Stripe Webhook Secret</label>
          <input
            type="password"
            value={webhookSecret}
            onChange={(e) => setWebhookSecret(e.target.value)}
            placeholder="whsec_..."
            className="w-full px-4 py-2 border border-slate-300 rounded-lg font-mono text-xs"
            dir="ltr"
          />
          <button
            onClick={() => onSave('stripe_webhook_secret', webhookSecret)}
            className="mt-2 text-xs bg-brand-gold hover:bg-brand-gold-dark text-white px-3 py-1 rounded"
          >
            حفظ
          </button>
          <p className="text-[11px] text-slate-400 mt-1.5">
            لتأكيد الدفع تلقائياً: أنشئ Webhook في Stripe على المسار <span className="font-mono" dir="ltr">/api/payments/webhook</span> وانسخ سرّه هنا.
          </p>
        </div>
        <div className="text-xs text-slate-500 bg-slate-50 p-3 rounded">
          💡 أنشئ المفاتيح من Dashboard Stripe الخاص بك في{' '}
          <a href="https://dashboard.stripe.com/apikeys" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
            dashboard.stripe.com/apikeys
          </a>
        </div>
      </div>
    </div>
  );
}

function SettingsTab({ settings, onSave }: { settings: Record<string, string>; onSave: (k: string, v: string) => void }) {
  const [siteName, setSiteName] = useState(settings.site_name || 'Athar Academy');
  const [notifyEmail, setNotifyEmail] = useState(settings.notify_email || '');
  const [resendKey, setResendKey] = useState(settings.resend_api_key || '');
  const [emailFrom, setEmailFrom] = useState(settings.email_from || '');
  const [geminiKey, setGeminiKey] = useState(settings.gemini_api_key || '');
  useEffect(() => {
    setSiteName(settings.site_name || 'Athar Academy');
    setNotifyEmail(settings.notify_email || '');
    setResendKey(settings.resend_api_key || '');
    setEmailFrom(settings.email_from || '');
    setGeminiKey(settings.gemini_api_key || '');
  }, [settings]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-brand-blue-dark font-serif">الإعدادات العامة</h1>

      <div className="bg-white rounded-2xl border border-brand-gold/20 p-6 space-y-4 shadow-sm">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">اسم الموقع</label>
          <input
            type="text"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-brand-gold"
          />
          <button
            onClick={() => onSave('site_name', siteName)}
            className="mt-2 text-xs bg-brand-gold hover:bg-brand-gold-dark text-white px-4 py-1.5 rounded-lg font-bold"
          >
            حفظ
          </button>
        </div>
      </div>

      {/* Email notifications */}
      <div className="bg-white rounded-2xl border border-brand-gold/20 p-6 space-y-4 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-brand-blue-dark flex items-center gap-2">
            <Mail className="h-5 w-5 text-brand-gold" />
            إشعارات البريد الإلكتروني
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            عند أي تسجيل أو طلب تطوّع أو تبرّع، تصلك رسالة على هذا البريد فوراً.
          </p>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">البريد/البُرُد التي تصلها الإشعارات</label>
          <textarea
            value={notifyEmail}
            onChange={(e) => setNotifyEmail(e.target.value)}
            placeholder="email1@example.com, email2@example.com"
            dir="ltr"
            rows={2}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-brand-gold resize-y"
          />
          <p className="text-[11px] text-slate-500 mt-1">يمكنك إضافة أكثر من بريد، افصل بينها بفاصلة أو سطر جديد.</p>
          <button
            onClick={() => onSave('notify_email', notifyEmail)}
            className="mt-2 text-xs bg-brand-gold hover:bg-brand-gold-dark text-white px-4 py-1.5 rounded-lg font-bold"
          >
            حفظ البريد
          </button>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">مفتاح Resend API (لتفعيل الإرسال)</label>
          <input
            type="password"
            value={resendKey}
            onChange={(e) => setResendKey(e.target.value)}
            placeholder="re_xxxxxxxx"
            dir="ltr"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg font-mono text-xs focus:outline-none focus:border-brand-gold"
          />
          <button
            onClick={() => onSave('resend_api_key', resendKey)}
            className="mt-2 text-xs bg-brand-gold hover:bg-brand-gold-dark text-white px-4 py-1.5 rounded-lg font-bold"
          >
            حفظ المفتاح
          </button>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">عنوان المُرسِل (From) — اختياري</label>
          <input
            type="text"
            value={emailFrom}
            onChange={(e) => setEmailFrom(e.target.value)}
            placeholder="Athar Academy <noreply@athar.my>"
            dir="ltr"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-brand-gold"
          />
          <button
            onClick={() => onSave('email_from', emailFrom)}
            className="mt-2 text-xs bg-brand-gold hover:bg-brand-gold-dark text-white px-4 py-1.5 rounded-lg font-bold"
          >
            حفظ المُرسِل
          </button>
        </div>

        <div className="text-xs text-slate-600 bg-brand-gold-light border border-brand-gold/20 p-3 rounded-xl leading-relaxed space-y-2">
          <div>
            💡 <b>المفتاح مجاناً:</b> ادخل{' '}
            <a href="https://resend.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-brand-blue underline font-bold">resend.com</a>
            {' '}→ حساب مجاني → API Keys → Create → الصق المفتاح هنا.
          </div>
          <div className="border-t border-brand-gold/20 pt-2">
            ⚠️ <b>مهم لإرسال أكثر من بريد:</b> في الوضع التجريبي يصل البريد فقط لبريد حساب Resend.
            لاستقبال الإشعارات على <b>أي بريد</b> (مثل بريدك الشخصي): وثّق نطاق <code>athar.my</code> في{' '}
            <a href="https://resend.com/domains" target="_blank" rel="noopener noreferrer" className="text-brand-blue underline font-bold">resend.com/domains</a>
            {' '}ثم ضع هنا في خانة «المُرسِل»: <code>Athar Academy &lt;noreply@athar.my&gt;</code>. بعدها تصل لكل البُرُد.
          </div>
        </div>
      </div>

      {/* AI Assistant (Gemini) */}
      <div className="bg-white rounded-2xl border border-brand-gold/20 p-6 space-y-4 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-brand-blue-dark flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-brand-gold" />
            المساعد الذكي (Gemini)
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            مفتاح Gemini يشغّل شات بوت «مُعلّم أثر» ليرد على الزوار بذكاء.
          </p>
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">مفتاح Gemini API</label>
          <input
            type="password"
            value={geminiKey}
            onChange={(e) => setGeminiKey(e.target.value)}
            placeholder="AIza... أو AQ..."
            dir="ltr"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg font-mono text-xs focus:outline-none focus:border-brand-gold"
          />
          <button
            onClick={() => onSave('gemini_api_key', geminiKey)}
            className="mt-2 text-xs bg-brand-gold hover:bg-brand-gold-dark text-white px-4 py-1.5 rounded-lg font-bold"
          >
            حفظ مفتاح Gemini
          </button>
        </div>
        <div className="text-xs text-slate-600 bg-brand-gold-light border border-brand-gold/20 p-3 rounded-xl leading-relaxed">
          💡 احصل على مفتاح مجاني من{' '}
          <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer" className="text-brand-blue underline font-bold">aistudio.google.com/apikey</a>.
          النموذج المستخدم: <code>gemini-2.5-flash</code>.
        </div>
      </div>
    </div>
  );
}
