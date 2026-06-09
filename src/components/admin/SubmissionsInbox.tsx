'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { Loader2, Trash2, Mail, MailOpen, Download, Inbox, RefreshCw } from 'lucide-react';

type Toast = (type: 'success' | 'error', msg: string) => void;

interface Submission {
  id: string;
  form_type: string;
  data: Record<string, any>;
  is_read: boolean;
  created_at: string;
}

const TYPE_LABELS: Record<string, string> = {
  all: 'الكل',
  contact: 'تواصل معنا',
  inquiry: 'استفسارات (التذييل)',
  volunteer: 'طلبات التطوع',
  donation: 'الكفالات والتبرعات',
  careers: 'طلبات التوظيف',
  register_circles: 'التسجيل في الحلقات',
  register_programs: 'التسجيل في البرامج',
  ambassadors: 'سفراء الأثر',
  fee_payment: 'دفع الرسوم',
  registration: 'تسجيلات',
  general: 'أخرى',
};

const FIELD_LABELS: Record<string, string> = {
  name: 'الاسم',
  phone: 'الهاتف',
  email: 'البريد',
  message: 'الرسالة',
  role: 'الدور',
  type: 'النوع',
  amount: 'المبلغ',
};

const typeLabel = (t: string) => TYPE_LABELS[t] || t;
const fieldLabel = (k: string) => FIELD_LABELS[k] || k;

export default function SubmissionsInbox({ onToast }: { onToast: Toast }) {
  const [subs, setSubs] = useState<Submission[]>([]);
  const [counts, setCounts] = useState<Record<string, { total: number; unread: number }>>({});
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/submissions?type=${filter}`, { cache: 'no-store' });
      const data = await res.json();
      if (res.ok) {
        setSubs(data.submissions || []);
        setCounts(data.counts || {});
      }
    } catch {
      onToast('error', 'فشل تحميل الرسائل');
    } finally {
      setLoading(false);
    }
  }, [filter, onToast]);

  useEffect(() => {
    load();
  }, [load]);

  const markRead = async (s: Submission, read: boolean) => {
    await fetch('/api/submissions', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: s.id, is_read: read }),
    });
    setSubs((prev) => prev.map((x) => (x.id === s.id ? { ...x, is_read: read } : x)));
  };

  const remove = async (id: string) => {
    if (!confirm('حذف هذه الرسالة؟')) return;
    const res = await fetch('/api/submissions', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      onToast('success', 'تم الحذف');
      setSubs((prev) => prev.filter((x) => x.id !== id));
    }
  };

  const exportCsv = () => {
    if (subs.length === 0) return;
    const keys = Array.from(new Set(subs.flatMap((s) => Object.keys(s.data || {}))));
    const header = ['النوع', 'التاريخ', ...keys];
    const rows = subs.map((s) => [
      typeLabel(s.form_type),
      new Date(s.created_at).toLocaleString('ar-EG'),
      ...keys.map((k) => (s.data?.[k] ?? '').toString().replace(/"/g, '""')),
    ]);
    const csv = [header, ...rows].map((r) => r.map((c) => `"${c}"`).join(',')).join('\n');
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `athar-submissions-${filter}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filterTypes = ['all', 'register_circles', 'register_programs', 'careers', 'contact', 'volunteer', 'donation', 'inquiry', 'general'];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-brand-blue-dark font-serif">الرسائل والطلبات</h1>
          <p className="text-sm text-slate-500 mt-0.5">كل ما يُرسله الزوار من النماذج يصلك هنا</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={load} className="flex items-center gap-2 bg-white border border-brand-gold/30 hover:bg-brand-gold-light text-brand-blue-dark font-bold px-4 py-2.5 rounded-xl text-sm">
            <RefreshCw className="h-4 w-4" />
            تحديث
          </button>
          <button onClick={exportCsv} disabled={subs.length === 0} className="flex items-center gap-2 bg-brand-blue-dark hover:bg-brand-blue text-white font-bold px-4 py-2.5 rounded-xl text-sm disabled:opacity-50">
            <Download className="h-4 w-4" />
            تصدير Excel
          </button>
        </div>
      </div>

      {/* Filter chips */}
      <div className="flex flex-wrap gap-2">
        {filterTypes.map((t) => {
          const c = counts[t];
          const total = t === 'all' ? Object.values(counts).reduce((a, b) => a + b.total, 0) : c?.total || 0;
          const unread = t === 'all' ? Object.values(counts).reduce((a, b) => a + b.unread, 0) : c?.unread || 0;
          return (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition ${
                filter === t ? 'bg-brand-blue-dark text-white' : 'bg-white border border-brand-gold/20 text-slate-600 hover:bg-brand-gold-light'
              }`}
            >
              {typeLabel(t)}
              <span className="text-[11px] opacity-80">({total})</span>
              {unread > 0 && <span className="bg-brand-gold text-brand-blue-dark text-[10px] font-bold px-1.5 rounded-full">{unread}</span>}
            </button>
          );
        })}
      </div>

      {loading ? (
        <div className="flex justify-center py-20 text-slate-300">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : subs.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-brand-gold/30">
          <Inbox className="h-10 w-10 text-brand-gold/40 mx-auto mb-3" />
          <p className="text-slate-500">لا توجد رسائل في هذا القسم بعد.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {subs.map((s) => (
            <div
              key={s.id}
              className={`rounded-2xl border p-5 transition shadow-sm ${
                s.is_read ? 'bg-white border-slate-200' : 'bg-brand-gold-light border-brand-gold/40'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-brand-blue-dark text-white px-3 py-1 rounded-full">
                    {typeLabel(s.form_type)}
                  </span>
                  {!s.is_read && <span className="text-[10px] font-bold text-brand-gold-dark">● جديد</span>}
                  <span className="text-[11px] text-slate-400">{new Date(s.created_at).toLocaleString('ar-EG')}</span>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => markRead(s, !s.is_read)} className="p-2 hover:bg-slate-100 rounded-lg" title={s.is_read ? 'تعليم كغير مقروء' : 'تعليم كمقروء'}>
                    {s.is_read ? <MailOpen className="h-4 w-4 text-slate-400" /> : <Mail className="h-4 w-4 text-brand-gold-dark" />}
                  </button>
                  <button onClick={() => remove(s.id)} className="p-2 hover:bg-red-50 rounded-lg" title="حذف">
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                {Object.entries(s.data || {}).map(([k, v]) => (
                  <div key={k} className="flex gap-2 text-sm">
                    <span className="font-bold text-slate-500 shrink-0">{fieldLabel(k)}:</span>
                    <span className="text-slate-800 break-words" dir="auto">{String(v)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
