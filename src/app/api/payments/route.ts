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
  const { amount, currency = 'MYR', description, programId, customerEmail, customerName, embedded } = body;

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
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const common = {
      mode: 'payment' as const,
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
      customer_email: customerEmail || undefined,
      metadata: { programId: programId || '' },
    };

    // embedded = in-site checkout (returns a client_secret); otherwise hosted (returns a url)
    const sessionStripe = embedded
      ? await stripe.checkout.sessions.create({
          ...common,
          ui_mode: 'embedded' as any,
          return_url: `${baseUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        } as any)
      : await stripe.checkout.sessions.create({
          ...common,
          success_url: `${baseUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${baseUrl}/?payment=cancelled`,
        });

    // Store payment record (with payer details for the dashboard)
    await supabaseAdmin.from('payments').insert({
      amount,
      currency,
      status: 'pending',
      description: description || 'Tuition',
      stripe_payment_id: sessionStripe.id,
      customer_email: customerEmail || null,
      customer_name: customerName || null,
    });

    return NextResponse.json(
      embedded
        ? { clientSecret: sessionStripe.client_secret, id: sessionStripe.id }
        : { url: sessionStripe.url, id: sessionStripe.id }
    );
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Stripe error' }, { status: 500 });
  }
}
