import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Public: returns only the Stripe publishable key (safe to expose) + enabled flag.
export async function GET() {
  try {
    const { data } = await supabaseAdmin
      .from('site_settings')
      .select('key, value')
      .in('key', ['stripe_publishable_key', 'payment_enabled']);
    const map: Record<string, string> = {};
    (data || []).forEach((r: any) => { map[r.key] = r.value || ''; });
    return NextResponse.json({
      publishableKey: map['stripe_publishable_key'] || '',
      enabled: map['payment_enabled'] === 'true',
    });
  } catch {
    return NextResponse.json({ publishableKey: '', enabled: false });
  }
}
