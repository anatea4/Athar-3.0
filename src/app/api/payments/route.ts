import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');
  if (!session) return null;
  try {
    return JSON.parse(session.value);
  } catch {
    return null;
  }
}

async function getStripeKey(): Promise<string | null> {
  const { data } = await supabaseAdmin
    .from('site_settings')
    .select('value')
    .eq('key', 'stripe_secret_key')
    .single();
  return data?.value || process.env.STRIPE_SECRET_KEY || null;
}

// GET: list payments (admin only)
export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data, error } = await supabaseAdmin
    .from('payments')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ payments: data || [] });
}

// POST: create a payment intent / checkout session
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { amount, currency = 'MYR', description, programId, customerEmail } = body;

  if (!amount || amount <= 0) {
    return NextResponse.json({ error: 'Amount required' }, { status: 400 });
  }

  // Check if payments are enabled
  const { data: enabledRow } = await supabaseAdmin
    .from('site_settings')
    .select('value')
    .eq('key', 'payment_enabled')
    .single();
  if (enabledRow?.value !== 'true') {
    return NextResponse.json({ error: 'Payments are currently disabled' }, { status: 503 });
  }

  const stripeKey = await getStripeKey();
  if (!stripeKey) {
    return NextResponse.json({ error: 'Stripe is not configured' }, { status: 503 });
  }

  // Fetch-based HTTP client works on both Node and the Cloudflare Workers runtime.
  const stripe = new Stripe(stripeKey, {
    apiVersion: '2024-12-18.acacia' as any,
    httpClient: Stripe.createFetchHttpClient(),
  });

  try {
    // Create a Stripe Checkout Session for hosted payment flow
    const sessionStripe = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: currency.toLowerCase(),
            product_data: { name: description || 'Athar Academy Tuition' },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      customer_email: customerEmail,
      success_url: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/?payment=success`,
      cancel_url: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/?payment=cancelled`,
      metadata: { programId: programId || '' },
    });

    // Store payment record
    await supabaseAdmin.from('payments').insert({
      amount,
      currency,
      status: 'pending',
      description: description || 'Tuition',
      stripe_payment_id: sessionStripe.id,
    });

    return NextResponse.json({ url: sessionStripe.url, id: sessionStripe.id });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Stripe error' }, { status: 500 });
  }
}
