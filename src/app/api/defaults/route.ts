import { NextResponse } from 'next/server';
import {
  PROGRAMS, FAQS, DAILY_AYAHS, ACADEMY_PROFILE, ACADEMY_STATS,
  TEAM_MEMBERS, PARTNERS, DETAILED_PROGRAMS, CONTACT_DETAILS,
  MEDIA_NEWS, MEDIA_ARTICLES, DIGITAL_LIBRARY, GALLERY_ITEMS,
  INITIATIVES_LIST, VOLUNTEER_OPPORTUNITIES,
} from '@/data';
import {
  HERO_DEFAULTS, FOOTER_DEFAULTS, HEADER_DEFAULTS, AI_COMPANION_DEFAULTS, NAV_DEFAULTS, FORMS_DEFAULTS, CALENDAR_DEFAULTS
} from '@/data/defaults';

// Return defaults for every section so the admin UI can show the editable fallback values.
export async function GET() {
  return NextResponse.json({
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
    navigation: NAV_DEFAULTS,
    forms: FORMS_DEFAULTS,
    calendar: CALENDAR_DEFAULTS,
  });
}
