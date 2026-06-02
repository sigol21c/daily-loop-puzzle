import type { LocaleCode } from '../i18n/types';

export type OnboardingStatus = {
  completed: boolean;
  skipped: boolean;
  completedAt?: string;
  skippedAt?: string;
  locale?: LocaleCode;
};

const ONBOARDING_KEY = 'daily-loop-puzzle:onboarding:v1';
const DEFAULT_ONBOARDING_STATUS: OnboardingStatus = { completed: false, skipped: false };

function normalizeStatus(value: unknown): OnboardingStatus {
  if (!value || typeof value !== 'object') return DEFAULT_ONBOARDING_STATUS;
  const candidate = value as Partial<OnboardingStatus>;
  return {
    completed: Boolean(candidate.completed),
    skipped: Boolean(candidate.skipped),
    ...(typeof candidate.completedAt === 'string' ? { completedAt: candidate.completedAt } : {}),
    ...(typeof candidate.skippedAt === 'string' ? { skippedAt: candidate.skippedAt } : {}),
    ...(candidate.locale === 'en' || candidate.locale === 'ko' ? { locale: candidate.locale } : {}),
  };
}

export function loadOnboardingStatus(): OnboardingStatus {
  try {
    const raw = localStorage.getItem(ONBOARDING_KEY);
    if (!raw) return DEFAULT_ONBOARDING_STATUS;
    return normalizeStatus(JSON.parse(raw));
  } catch {
    return DEFAULT_ONBOARDING_STATUS;
  }
}

export function saveOnboardingStatus(next: OnboardingStatus): OnboardingStatus {
  const normalized = normalizeStatus(next);
  try {
    localStorage.setItem(ONBOARDING_KEY, JSON.stringify(normalized));
  } catch {
    // Local-only MVP: if storage is unavailable, keep the session playable.
  }
  return normalized;
}

export function resetOnboardingForTests(): void {
  localStorage.removeItem(ONBOARDING_KEY);
}
