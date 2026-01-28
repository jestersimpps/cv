import { defineRouting } from 'next-intl/routing';

export const locales = ['en', 'nl', 'zh', 'fr', 'es'] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: 'en',
  localePrefix: 'as-needed' // Only show /nl, /zh etc., not /en for default
});

export const localeNames: Record<Locale, string> = {
  en: 'English',
  nl: 'Nederlands',
  zh: '中文',
  fr: 'Français',
  es: 'Español'
};

export const localeFlags: Record<Locale, string> = {
  en: '🇬🇧',
  nl: '🇳🇱',
  zh: '🇨🇳',
  fr: '🇫🇷',
  es: '🇪🇸'
};
