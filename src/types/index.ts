export type Language = 'en' | 'ar' | 'ms';

export function t(lang: Language, translations: { ar: string; en: string; ms?: string }): string {
  if (lang === 'ms') return translations.ms || translations.en;
  if (lang === 'en') return translations.en;
  return translations.ar;
}

export function getLangField<T = string>(obj: any, field: string, lang: Language): T {
  if (!obj) return '' as any;
  if (lang === 'ms') {
    const msField = `${field}Ms`;
    if (msField in obj && obj[msField] !== undefined) return obj[msField];
    // fallback to En
    const enField = `${field}En`;
    if (enField in obj && obj[enField] !== undefined) return obj[enField];
  }
  if (lang === 'en') {
    return (obj[`${field}En`] !== undefined ? obj[`${field}En`] : obj[`${field}Ar`]) as T;
  }
  return (obj[`${field}Ar`] !== undefined ? obj[`${field}Ar`] : obj[`${field}En`]) as T;
}

export interface Program {
  id: string;
  titleEn: string;
  titleAr: string;
  titleMs?: string;
  category: 'boys' | 'girls' | 'general' | 'kids';
  descriptionEn: string;
  descriptionAr: string;
  descriptionMs?: string;
  durationEn: string;
  durationAr: string;
  durationMs?: string;
  ageRulesEn: string;
  ageRulesAr: string;
  ageRulesMs?: string;
  scheduleEn: string;
  scheduleAr: string;
  scheduleMs?: string;
  pricePerMonth: number;
  syllabusEn: string[];
  syllabusAr: string[];
  syllabusMs?: string[];
  teacherEn: string;
  teacherAr: string;
  teacherMs?: string;
}

export interface StudentProfile {
  id: string;
  nameEn: string;
  nameAr: string;
  nameMs?: string;
  avatar: string;
  classEn: string;
  classAr: string;
  classMs?: string;
  teacherEn: string;
  teacherAr: string;
  teacherMs?: string;
  hifzProgress: number; // percentage
  memorizedJuzs: number[];
  currentSurahEn: string;
  currentSurahAr: string;
  currentSurahMs?: string;
  dailyTargetEn: string;
  dailyTargetAr: string;
  dailyTargetMs?: string;
  recentLogs: {
    id: string;
    date: string;
    surahEn: string;
    surahAr: string;
    surahMs?: string;
    verses: string;
    grade: 'A+' | 'A' | 'B' | 'C';
    typeEn: 'Memorization' | 'Revision';
    typeAr: 'تسميع جديد' | 'مراجعة';
    typeMs?: 'Hafazan' | 'Ulangkaji';
    notesEn: string;
    notesAr: string;
    notesMs?: string;
  }[];
  badges: {
    id: string;
    titleEn: string;
    titleAr: string;
    titleMs?: string;
    icon: string;
    color: string;
    unlockedAt: string;
  }[];
}

export interface QuranVerse {
  id: number;
  surahEn: string;
  surahAr: string;
  surahMs?: string;
  ayahNumber: number;
  textAr: string;
  textEn: string;
  textMs?: string;
  audioUrl?: string;
  reflectionEn: string;
  reflectionAr: string;
  reflectionMs?: string;
}

export interface FAQItem {
  id: string;
  questionEn: string;
  questionAr: string;
  questionMs?: string;
  answerEn: string;
  answerAr: string;
  answerMs?: string;
  category: 'admissions' | 'academics' | 'financial' | 'general';
}
