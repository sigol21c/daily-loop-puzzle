import { beforeEach, describe, expect, it } from 'vitest';
import { loadOnboardingStatus, resetOnboardingForTests, saveOnboardingStatus } from './onboarding';

describe('local onboarding storage', () => {
  beforeEach(() => {
    localStorage.clear();
    resetOnboardingForTests();
  });

  it('defaults to incomplete and unskipped for first-time users', () => {
    expect(loadOnboardingStatus()).toEqual({ completed: false, skipped: false });
  });

  it('persists completed/skipped status locally', () => {
    saveOnboardingStatus({ completed: true, skipped: false, completedAt: '2026-06-01T00:00:00.000Z', locale: 'ko' });

    expect(loadOnboardingStatus()).toMatchObject({ completed: true, skipped: false, locale: 'ko' });
  });

  it('ignores malformed onboarding storage', () => {
    localStorage.setItem('daily-loop-puzzle:onboarding:v1', '{bad-json');

    expect(loadOnboardingStatus()).toEqual({ completed: false, skipped: false });
  });
});
