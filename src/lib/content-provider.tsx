'use client';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  PROGRAMS, FAQS, DAILY_AYAHS, ACADEMY_PROFILE, ACADEMY_STATS,
  TEAM_MEMBERS, PARTNERS, DETAILED_PROGRAMS, CONTACT_DETAILS,
  MEDIA_NEWS, MEDIA_ARTICLES, DIGITAL_LIBRARY, GALLERY_ITEMS,
  INITIATIVES_LIST, VOLUNTEER_OPPORTUNITIES, STUDENT_PROFILES,
} from '@/data';
import {
  HERO_DEFAULTS, FOOTER_DEFAULTS, HEADER_DEFAULTS, AI_COMPANION_DEFAULTS, NAV_DEFAULTS, FORMS_DEFAULTS, CALENDAR_DEFAULTS, EVENTS_DEFAULTS
} from '@/data/defaults';

export type Content = {
  hero: typeof HERO_DEFAULTS;
  footer: typeof FOOTER_DEFAULTS;
  header: typeof HEADER_DEFAULTS;
  ai_companion: typeof AI_COMPANION_DEFAULTS;
  about: typeof ACADEMY_PROFILE;
  stats: typeof ACADEMY_STATS;
  programs: typeof PROGRAMS;
  detailed_programs: typeof DETAILED_PROGRAMS;
  team: typeof TEAM_MEMBERS;
  partners: typeof PARTNERS;
  faqs: typeof FAQS;
  initiatives: typeof INITIATIVES_LIST;
  volunteers: typeof VOLUNTEER_OPPORTUNITIES;
  media_news: typeof MEDIA_NEWS;
  media_articles: typeof MEDIA_ARTICLES;
  digital_library: typeof DIGITAL_LIBRARY;
  gallery: typeof GALLERY_ITEMS;
  daily_ayahs: typeof DAILY_AYAHS;
  contact: typeof CONTACT_DETAILS;
  student_profiles: typeof STUDENT_PROFILES;
  navigation: typeof NAV_DEFAULTS;
  forms: typeof FORMS_DEFAULTS;
  calendar: typeof CALENDAR_DEFAULTS;
  events: typeof EVENTS_DEFAULTS;
};

const DEFAULTS: Content = {
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
  student_profiles: STUDENT_PROFILES,
  navigation: NAV_DEFAULTS,
  forms: FORMS_DEFAULTS,
  calendar: CALENDAR_DEFAULTS,
  events: EVENTS_DEFAULTS,
};

const ContentContext = createContext<Content>(DEFAULTS);

function mergeData<T>(defaults: T, override: any): T {
  if (override === null || override === undefined) return defaults;
  if (typeof defaults !== 'object' || defaults === null) return override as T;
  if (typeof override !== 'object') return override as T;

    if (Array.isArray(defaults)) {
      const overrideArr = Array.isArray(override) ? override : [];
      // Respect empty arrays explicitly saved by the user
      // if (overrideArr.length === 0) return defaults;
      
      return overrideArr.map((item: any, idx: number) => {
      const defaultItem = defaults.find((x: any) => x && x.id && x.id === item.id) || defaults[idx];
      return mergeData(defaultItem, item);
    }) as any;
  }

  const res: any = { ...defaults };
  for (const key of Object.keys(override)) {
    res[key] = mergeData(defaults[key as keyof typeof defaults], override[key]);
  }
  return res as T;
}

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<Content>(DEFAULTS);

  useEffect(() => {
    let active = true;
    fetch('/api/content', { cache: 'no-store' })
      .then((r) => r.json())
      .then((data) => {
        if (!active) return;
        if (data && data.content && typeof data.content === 'object') {
          const merged: Content = { ...DEFAULTS };
          for (const key of Object.keys(DEFAULTS) as (keyof Content)[]) {
            const dbValue = data.content[key];
            merged[key] = mergeData(DEFAULTS[key], dbValue) as any;
          }
          // Migration: ensure "support" nav item is a direct section button, not a group dropdown
          // Migration: hide fee calculator from nav
          // Migration: convert m-calendar group → direct section link (removes old مبادرات/مساعدات children)
          if (merged.navigation?.items) {
            const HIDDEN_NAV_IDS = new Set(['f-calc', 'sol-calc', 'calculator', 'm-articles']);
            merged.navigation = {
              ...merged.navigation,
              items: (merged.navigation.items as any[]).map((item: any) => {
                // Convert support group → direct button
                if (item.id === 'support' && item.kind === 'group') {
                  return { id: 'support', labelAr: 'انضم كمتطوع', labelEn: 'Join as Volunteer', labelMs: 'Jadi Sukarelawan', kind: 'section', section: 'support', sub: 'volunteer' };
                }
                // Process children of groups
                if (item.children) {
                  return {
                    ...item,
                    children: item.children.map((c: any) => {
                      // Clean m-calendar: keep only calendar + events, drop everything else (initiatives, aids…)
                      if (c.id === 'm-calendar') {
                        return {
                          id: 'm-calendar', labelAr: 'التقويم السنوي', labelEn: 'Annual Calendar', labelMs: 'Kalendar Tahunan', kind: 'group',
                          section: 'media', sub: 'annual-calendar',
                          children: [
                            { id: 'm-cal-calendar', labelAr: 'التقويم السنوي', labelEn: 'Annual Calendar', labelMs: 'Kalendar Tahunan', kind: 'section', section: 'media', sub: 'annual-calendar' },
                            { id: 'm-cal-events', labelAr: 'الفعاليات الحالية', labelEn: 'Active Events', labelMs: 'Acara Aktif', kind: 'section', section: 'media', sub: 'events-list' },
                          ],
                        };
                      }
                      // Hide articles and calculator
                      if (HIDDEN_NAV_IDS.has(c.id)) return { ...c, _hidden: true };
                      return c;
                    }),
                  };
                }
                return item;
              }),
            } as any;
          }
          setContent(merged);
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  // Live-preview support: when rendered inside the admin preview iframe,
  // listen for content updates pushed via postMessage and apply them instantly.
  useEffect(() => {
    function onMessage(e: MessageEvent) {
      const msg = e.data;
      if (!msg || msg.type !== 'athar-preview-content') return;
      const section = msg.section as keyof Content;
      const data = msg.data;
      if (!section) return;
      setContent((prev) => ({
        ...prev,
        [section]: mergeData((DEFAULTS as any)[section], data),
      }));
    }
    window.addEventListener('message', onMessage);
    // Tell the parent we're ready to receive preview data
    if (window.parent !== window) {
      window.parent.postMessage({ type: 'athar-preview-ready' }, '*');
    }
    return () => window.removeEventListener('message', onMessage);
  }, []);

  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
}

export function useContent(): Content {
  return useContext(ContentContext);
}

// Convenience hooks for specific sections
export const useHero = () => useContent().hero;
export const useFooter = () => useContent().footer;
export const useHeader = () => useContent().header;
export const useAbout = () => useContent().about;
export const useStats = () => useContent().stats;
export const usePrograms = () => useContent().programs;
export const useDetailedPrograms = () => useContent().detailed_programs;
export const useTeam = () => useContent().team;
export const usePartners = () => useContent().partners;
export const useFaqs = () => useContent().faqs;
export const useInitiatives = () => useContent().initiatives;
export const useVolunteers = () => useContent().volunteers;
export const useMediaNews = () => useContent().media_news;
export const useMediaArticles = () => useContent().media_articles;
export const useDigitalLibrary = () => useContent().digital_library;
export const useGallery = () => useContent().gallery;
export const useDailyAyahs = () => useContent().daily_ayahs;
export const useContact = () => useContent().contact;
export const useAICompanion = () => useContent().ai_companion;
export const useStudentProfiles = () => useContent().student_profiles;
export const useNavigation = () => useContent().navigation;
export const useForms = () => useContent().forms;
export const useCalendar = () => useContent().calendar;
export const useEvents = () => useContent().events;

export { DEFAULTS as DEFAULT_CONTENT };
