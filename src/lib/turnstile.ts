import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function getSecret(): Promise<string> {
  try {
    const { data } = await supabaseAdmin
      .from('site_settings')
      .select('value')
      .eq('key', 'turnstile_secret_key')
      .single();
    return data?.value || process.env.TURNSTILE_SECRET_KEY || '';
  } catch {
    return process.env.TURNSTILE_SECRET_KEY || '';
  }
}

/**
 * Verify a Cloudflare Turnstile token server-side.
 * If no secret is configured, returns true (protection is OFF — forms keep working).
 */
export async function verifyTurnstile(token?: string): Promise<boolean> {
  const secret = await getSecret();
  if (!secret) return true; // not configured → don't block
  if (!token) return false;
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token }),
    });
    const data = await res.json();
    return !!data.success;
  } catch {
    return false;
  }
}
