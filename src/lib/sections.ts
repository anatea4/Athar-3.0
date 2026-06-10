// ---------------------------------------------------------------------------
// URL scheme for the site sections + their in-section tabs.
//   /                      → home
//   /about                 → About (default tab)
//   /about/who-we-are      → About, "who we are" tab
//   /programs/quran-circles→ Programs, that program tab
//   /admission/<form-id>   → a managed form (dynamic)
// ---------------------------------------------------------------------------

// Top-level section slugs (each is its own page).
export const SECTION_SLUGS = [
  'home', 'about', 'programs', 'solutions', 'media', 'support', 'admission', 'finance', 'contact',
];

// Valid sub-tab slugs per (static) section. Sub-routes outside these → 404.
export const SECTION_SUBS: Record<string, string[]> = {
  about: [
    'who-we-are', 'vision-mission', 'objectives', 'team',
    'director-message', 'chairman-message', 'secretary-message', 'partners', 'stats', 'faq',
  ],
  programs: [
    'quran-circles', 'safara', 'takween', 'creators-of-tomorrow', 'sfeerat',
    'ramadan-retreat', 'journey-athar', 'qari', 'accompanying',
  ],
  solutions: ['ai-teacher', 'ayah-reflection', 'fee-calculator'],
  media: ['news', 'articles', 'digital-library', 'gallery', 'annual-calendar'],
};

// These sections have data-driven sub-pages (managed form ids) → accept any sub.
export const DYNAMIC_SUB_SECTIONS = ['support', 'admission', 'finance'];

// Backward-compatible single-word aliases (old shared links keep working).
const ALIASES: Record<string, { section: string; sub?: string }> = {
  stats: { section: 'about', sub: 'stats' },
  faq: { section: 'about', sub: 'faq' },
  'ayah-reflection': { section: 'solutions', sub: 'ayah-reflection' },
  'fee-calculator': { section: 'solutions', sub: 'fee-calculator' },
  'annual-calendar': { section: 'media', sub: 'annual-calendar' },
};

// Resolve the FIRST path segment to a section (+ optional sub via alias).
export function resolveSlug(slug: string): { section: string; sub?: string } | null {
  if (SECTION_SLUGS.includes(slug)) return { section: slug };
  if (ALIASES[slug]) return ALIASES[slug];
  return null;
}

// Is `sub` a valid tab for `section`?
export function isValidSub(section: string, sub: string): boolean {
  if (DYNAMIC_SUB_SECTIONS.includes(section)) return true; // form ids are dynamic
  return (SECTION_SUBS[section] || []).includes(sub);
}

// Build the URL path for a (section, sub) pair — keeps the address bar in sync.
export function viewToPath(section: string, sub?: string): string {
  if (section === 'home' || !section) return '/';
  return sub ? `/${section}/${encodeURIComponent(sub)}` : `/${section}`;
}

// Parse a pathname back into a view (for back/forward navigation).
export function pathToView(pathname: string): { section: string; sub?: string } {
  const parts = pathname.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean).map((p) => decodeURIComponent(p));
  if (parts.length === 0) return { section: 'home' };
  const base = resolveSlug(parts[0]);
  if (!base) return { section: 'home' };
  if (parts.length >= 2) return { section: base.section, sub: parts[1] };
  return base;
}

// Arabic title per section (for <title> on each route).
export const SECTION_TITLES_AR: Record<string, string> = {
  home: 'الرئيسية',
  about: 'عن المؤسسة',
  programs: 'البرامج والتعليم',
  solutions: 'التقنيات الذكية',
  media: 'المركز الإعلامي',
  support: 'التطوع والدعم',
  admission: 'القبول والتسجيل',
  finance: 'التبرعات والرسوم',
  contact: 'تواصل معنا',
};
