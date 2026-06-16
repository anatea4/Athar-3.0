'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Loader2, Home, Receipt } from 'lucide-react';

interface Details {
  paid: boolean;
  amount: number | null;
  currency: string;
  email: string;
  name: string;
  reference: string;
}

function SuccessInner() {
  const params = useSearchParams();
  const sessionId = params.get('session_id');
  const [details, setDetails] = useState<Details | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      return;
    }
    fetch(`/api/payments/session?id=${encodeURIComponent(sessionId)}`)
      .then((r) => r.json())
      .then((d) => setDetails(d?.error ? null : d))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [sessionId]);

  const today = new Date().toLocaleDateString('ar-EG');

  return (
    <div dir="rtl" className="min-h-screen bg-brand-sand flex items-center justify-center px-4 py-12 font-sans">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-brand-gold/15 overflow-hidden">
        <div className="bg-brand-blue-dark h-1.5" />
        <div className="p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center border-2 border-emerald-300 mb-5">
            <CheckCircle2 className="h-9 w-9" />
          </div>

          <img src="/athar-logo.png" alt="أكاديمية أثر" className="h-14 w-auto mx-auto mb-4 object-contain" />

          <h1 className="text-2xl font-bold text-brand-blue-dark mb-1">تم الدفع بنجاح</h1>
          <p className="text-sm text-slate-500 leading-relaxed mb-6">
            جزاك الله خيراً على دعمك لأكاديمية أثر. وصلك إيصال على بريدك الإلكتروني.
          </p>

          {loading ? (
            <div className="py-6 flex justify-center"><Loader2 className="h-6 w-6 animate-spin text-brand-gold" /></div>
          ) : (
            <div className="bg-brand-sand/60 border border-brand-gold/15 rounded-2xl p-5 text-right space-y-3 mb-6">
              <div className="flex items-center gap-2 text-brand-gold-dark font-bold text-sm border-b border-brand-gold/15 pb-2">
                <Receipt className="h-4 w-4" /> إيصال التبرّع
              </div>
              {details?.amount != null && (
                <Row label="المبلغ" value={`${details.amount} ${details.currency}`} bold />
              )}
              {details?.name && <Row label="الاسم" value={details.name} />}
              {details?.email && <Row label="البريد" value={details.email} />}
              {details?.reference && <Row label="رقم المرجع" value={details.reference} />}
              <Row label="التاريخ" value={today} />
              <Row label="الحالة" value={details?.paid ? 'مدفوع ✓' : 'قيد المعالجة'} />
            </div>
          )}

          <a
            href="/"
            className="w-full inline-flex items-center justify-center gap-2 bg-brand-blue-dark hover:bg-brand-gold hover:text-brand-blue-dark text-brand-gold font-bold py-3.5 rounded-2xl transition-colors"
          >
            <Home className="h-4.5 w-4.5" />
            الرجوع للموقع
          </a>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-slate-500">{label}</span>
      <span className={`${bold ? 'font-bold text-brand-blue-dark text-base' : 'text-slate-700'}`} dir="auto">{value}</span>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-brand-sand flex items-center justify-center"><Loader2 className="h-6 w-6 animate-spin text-brand-gold" /></div>}>
      <SuccessInner />
    </Suspense>
  );
}
