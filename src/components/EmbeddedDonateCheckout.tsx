'use client';
import React, { useCallback, useMemo } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';
import { X } from 'lucide-react';

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
    <div className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-sm flex items-start sm:items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full my-6 relative shadow-2xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h3 className="font-bold text-brand-blue-dark">إتمام الدفع الآمن</h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 text-slate-500" aria-label="إغلاق">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-3 sm:p-5">
          <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        </div>
      </div>
    </div>
  );
}
