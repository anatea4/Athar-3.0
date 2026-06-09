import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { hashPassword } from '@/lib/auth';
import {
  PROGRAMS, FAQS, DAILY_AYAHS, ACADEMY_PROFILE, ACADEMY_STATS,
  TEAM_MEMBERS, PARTNERS, DETAILED_PROGRAMS, CONTACT_DETAILS,
  MEDIA_NEWS, MEDIA_ARTICLES, DIGITAL_LIBRARY, GALLERY_ITEMS,
  INITIATIVES_LIST, VOLUNTEER_OPPORTUNITIES,
} from '@/data';
import {
  HERO_DEFAULTS, FOOTER_DEFAULTS, HEADER_DEFAULTS, AI_COMPANION_DEFAULTS,
} from '@/data/defaults';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const ALL_CONTENT: Record<string, any> = {
  hero: HERO_DEFAULTS,
  footer: FOOTER_DEFAULTS,
  header: HEADER_DEFAULTS,
  ai_companion: AI_COMPANION_DEFAULTS,
  about: ACADEMY_PROFILE,
  stats: ACADEMY_STATS,
  programs: PROGRAMS,
  detailed_programs: DETAILED_PROGRAMS,
  team: TEAM_MEMBERS,
  partners: PARTNERS,
  faqs: FAQS,
  initiatives: INITIATIVES_LIST,
  volunteers: VOLUNTEER_OPPORTUNITIES,
  media_news: MEDIA_NEWS,
  media_articles: MEDIA_ARTICLES,
  digital_library: DIGITAL_LIBRARY,
  gallery: GALLERY_ITEMS,
  daily_ayahs: DAILY_AYAHS,
  contact: CONTACT_DETAILS,
};

// GET /api/seed            → create/refresh super admin only
// GET /api/seed?content=1  → also populate every site_content section with current content
export async function GET(req: NextRequest) {
  const results: string[] = [];
  const seedContent = req.nextUrl.searchParams.get('content') === '1';

  // 1. Super admin
  try {
    const adminEmail = 'it@athar.my';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Athar@123';
    const passwordHash = await hashPassword(adminPassword);
    const { error } = await supabaseAdmin
      .from('admins')
      .upsert(
        { email: adminEmail, username: 'it', password_hash: passwordHash, is_super: true },
        { onConflict: 'email' }
      );
    if (error) results.push(`Admin seed error: ${error.message}`);
    else results.push(`✓ Super admin ready: ${adminEmail}`);
  } catch (e: any) {
    results.push(`Admin seed exception: ${e.message}`);
  }

  // 2. Optional content seed
  if (seedContent) {
    let ok = 0;
    for (const [section, data] of Object.entries(ALL_CONTENT)) {
      const { error } = await supabaseAdmin
        .from('site_content')
        .upsert({ section, data, updated_at: new Date().toISOString() }, { onConflict: 'section' });
      if (error) results.push(`Content "${section}" error: ${error.message}`);
      else ok++;
    }
    results.push(`✓ Seeded ${ok} content sections with current site content`);
  }

  // 3. Default settings
  try {
    const defaults = [
      { key: 'stripe_publishable_key', value: '' },
      { key: 'stripe_secret_key', value: '' },
      { key: 'payment_enabled', value: 'false' },
      { key: 'site_name', value: 'Athar Academy' },
      { key: 'notify_email', value: '' },
      { key: 'resend_api_key', value: '' },
    ];
    for (const s of defaults) {
      await supabaseAdmin.from('site_settings').upsert(s, { onConflict: 'key', ignoreDuplicates: true });
    }
    results.push('✓ Default settings ensured');
  } catch (e: any) {
    results.push(`Settings error: ${e.message}`);
  }

  return NextResponse.json({
    message: 'Seed completed',
    results,
    login: { url: '/admin', email: 'it@athar.my', password: 'Set via ADMIN_PASSWORD env var' },
    tip: 'Call /api/seed?content=1 to also load all current content into the database for editing.',
  });
}
