'use client';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  PROGRAMS, FAQS, DAILY_AYAHS, ACADEMY_PROFILE, ACADEMY_STATS,
  TEAM_MEMBERS, PARTNERS, DETAILED_PROGRAMS, CONTACT_DETAILS,
  MEDIA_NEWS, MEDIA_ARTICLES, DIGITAL_LIBRARY, GALLERY_ITEMS,
  INITIATIVES_LIST, VOLUNTEER_OPPORTUNITIES, STUDENT_PROFILES,
} from '@/data';
import {
  HERO_DEFAULTS, FOOTER_DEFAULTS, HEADER_DEFAULTS, AI_COMPANION_DEFAULTS, NAV_DEFAULTS, FORMS_DEFAULTS, CALENDAR_DEFAULTS
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
};

const ContentContext = createContext<Content>(DEFAULTS);

function mergeData<T>(defaults: T, override: any): T {
  if (override === null || override === undefined) return defaults;
  if (typeof override !== 'object') return override as T;
  if (Array.isArray(override)) {
    return (override.length > 0 ? override : defaults) as T;
  }
  if (Object.keys(override).length === 0) return defaults;
  // Object — shallow merge: any provided keys override
  return { ...(defaults as any), ...override } as T;
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

export { DEFAULTS as DEFAULT_CONTENT };
