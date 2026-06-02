import { en } from './en';
import { ko } from './ko';
import type { LocaleCode, LocaleMessages } from './types';
export type { LocaleCode, LocaleMessages } from './types';

const LOCALE_KEY = 'daily-loop-puzzle:locale:v1';

export const supportedLocales: Record<LocaleCode, { label: string; messages: LocaleMessages }> = {
  en: { label: 'English', messages: en },
  ko: { label: '한국어', messages: ko },
};

export const DEFAULT_LOCALE: LocaleCode = 'en';

export function isLocaleCode(value: string | null | undefined): value is LocaleCode {
  return value === 'en' || value === 'ko';
}

export function detectLocale(languages: readonly string[] = []): LocaleCode {
  for (const language of languages) {
    const normalized = language.toLowerCase();
    if (normalized === 'ko' || normalized.startsWith('ko-')) return 'ko';
    if (normalized === 'en' || normalized.startsWith('en-')) return 'en';
  }
  return DEFAULT_LOCALE;
}

export function loadLocalePreference(): LocaleCode | null {
  try {
    const stored = localStorage.getItem(LOCALE_KEY);
    return isLocaleCode(stored) ? stored : null;
  } catch {
    return null;
  }
}

export function saveLocalePreference(locale: LocaleCode): void {
  try {
    localStorage.setItem(LOCALE_KEY, locale);
  } catch {
    // Keep the app usable if localStorage is unavailable.
  }
}

export function getInitialLocale(): LocaleCode {
  return loadLocalePreference() ?? detectLocale(globalThis.navigator?.languages ?? []);
}

export function messagesFor(locale: LocaleCode): LocaleMessages {
  return supportedLocales[locale]?.messages ?? supportedLocales[DEFAULT_LOCALE].messages;
}
