'use client';
import React, { useCallback, useMemo } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';
import { X, ArrowRight } from 'lucide-react';

interface Props {
  publishableKey: string;
  amount: number;
  currency?: string;
  description?: string;
  email?: string;
  name?: string;
  onClose: () => void;
}

// In-site Stripe Embedded Checkout — the payment form renders inside our own page.
export default function EmbeddedDonateCheckout({
  publishableKey, amount, currency = 'MYR', description, email, name, onClose,
}: Props) {
  const stripePromise = useMemo(() => loadStripe(publishableKey), [publishableKey]);

  const fetchClientSecret = useCallback(async () => {
    const res = await fetch('/api/payments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ embedded: true, amount, currency, description, customerEmail: email, customerName: name }),
    });
    const data = await res.json();
    return data.clientSecret as string;
  }, [amount, currency, description, email, name]);

  return (
    <div className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-sm flex items-stretch sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white sm:rounded-3xl w-full sm:max-w-xl h-full sm:h-auto sm:my-6 relative shadow-2xl flex flex-col sm:max-h-[94vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 shrink-0">
          <h3 className="font-bold text-brand-blue-dark">إتمام الدفع الآمن</h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 text-slate-500" aria-label="إغلاق">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable checkout area (so it works on phones) */}
        <div className="p-3 sm:p-5 overflow-y-auto flex-1 min-h-0">
          <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        </div>

        {/* Footer — clear "back to site" button */}
        <div className="px-5 py-3 border-t border-slate-100 shrink-0 bg-white sm:rounded-b-3xl">
          <button
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm py-3 rounded-2xl transition-colors"
          >
            <ArrowRight className="h-4 w-4" />
            الرجوع للموقع
          </button>
        </div>
      </div>
    </div>
  );
}
