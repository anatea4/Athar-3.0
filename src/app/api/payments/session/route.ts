import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

export const dynamic = 'force-dynamic';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function getStripeKey(): Promise<string | null> {
  const { data } = await supabaseAdmin.from('site_settings').select('value').eq('key', 'stripe_secret_key').single();
  return data?.value || process.env.STRIPE_SECRET_KEY || null;
}

// Public: returns receipt details for a completed checkout session (read-only, no secrets).
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });

  const key = await getStripeKey();
  if (!key) return NextResponse.json({ error: 'not configured' }, { status: 503 });

  const stripe = new Stripe(key, {
    apiVersion: '2024-12-18.acacia' as any,
    httpClient: Stripe.createFetchHttpClient(),
  });

  try {
    const session = await stripe.checkout.sessions.retrieve(id);
    return NextResponse.json({
      paid: session.payment_status === 'paid',
      amount: session.amount_total ? session.amount_total / 100 : null,
      currency: (session.currency || 'myr').toUpperCase(),
      email: session.customer_email || session.customer_details?.email || '',
      name: session.customer_details?.name || '',
      reference: session.id.slice(-8).toUpperCase(),
    });
  } catch {
    return NextResponse.json({ error: 'not found' }, { status: 404 });
  }
}
