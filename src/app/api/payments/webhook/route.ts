import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';
import { notifyDonorThankYou } from '@/lib/notify';

export const dynamic = 'force-dynamic';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function getSetting(key: string): Promise<string | null> {
  const { data } = await supabaseAdmin.from('site_settings').select('value').eq('key', key).single();
  return data?.value || null;
}

// Stripe calls this endpoint after a payment. It must read the RAW body to verify the signature.
export async function POST(req: NextRequest) {
  const sig = req.headers.get('stripe-signature') || '';
  const rawBody = await req.text();

  const secretKey = (await getSetting('stripe_secret_key')) || process.env.STRIPE_SECRET_KEY || '';
  const webhookSecret = (await getSetting('stripe_webhook_secret')) || process.env.STRIPE_WEBHOOK_SECRET || '';

  if (!secretKey || !webhookSecret) {
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 503 });
  }

  const stripe = new Stripe(secretKey, { apiVersion: '2024-12-18.acacia' as any });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (e: any) {
    return NextResponse.json({ error: `Webhook signature error: ${e.message}` }, { status: 400 });
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      await supabaseAdmin
        .from('payments')
        .update({ status: 'paid' })
        .eq('stripe_payment_id', session.id);

      // Send a branded thank-you / receipt email to the donor.
      const donorEmail = session.customer_email || session.customer_details?.email || '';
      if (donorEmail) {
        await notifyDonorThankYou(donorEmail, {
          amount: session.amount_total ? session.amount_total / 100 : undefined,
          currency: (session.currency || 'MYR').toUpperCase(),
          name: session.customer_details?.name || '',
        });
      }
    } else if (event.type === 'checkout.session.expired') {
      const session = event.data.object as Stripe.Checkout.Session;
      await supabaseAdmin.from('payments').update({ status: 'expired' }).eq('stripe_payment_id', session.id);
    }
  } catch {
    // don't fail the webhook on a DB hiccup — Stripe will retry
  }

  return NextResponse.json({ received: true });
}
