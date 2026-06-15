import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Public: tells the site whether maintenance mode is on. Exposes only a boolean.
export async function GET() {
  try {
    const { data } = await supabaseAdmin
      .from('site_settings')
      .select('value')
      .eq('key', 'maintenance_mode')
      .single();
    return NextResponse.json({ maintenance: data?.value === 'true' });
  } catch {
    return NextResponse.json({ maintenance: false });
  }
}
