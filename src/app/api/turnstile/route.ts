import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Public: returns the Turnstile site key (safe to expose) so forms can render the widget.
export async function GET() {
  try {
    const { data } = await supabaseAdmin
      .from('site_settings')
      .select('value')
      .eq('key', 'turnstile_site_key')
      .single();
    return NextResponse.json({ siteKey: data?.value || process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '' });
  } catch {
    return NextResponse.json({ siteKey: '' });
  }
}
