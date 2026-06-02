import { describe, expect, it, beforeEach } from 'vitest';
import { detectLocale, loadLocalePreference, saveLocalePreference } from './locales';

function setNavigatorLanguages(languages: readonly string[]) {
  Object.defineProperty(window.navigator, 'languages', {
    configurable: true,
    value: languages,
  });
}

describe('locale selection', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('falls back from regional browser language tags to supported locales', () => {
    expect(detectLocale(['ko-KR'])).toBe('ko');
    expect(detectLocale(['en-US'])).toBe('en');
    expect(detectLocale(['pt-PT'])).toBe('en');
    expect(detectLocale(['fr-FR'])).toBe('en');
  });

  it('uses explicit localStorage preference before browser hints', () => {
    setNavigatorLanguages(['ko-KR']);
    saveLocalePreference('en');

    expect(loadLocalePreference()).toBe('en');
    expect(detectLocale(window.navigator.languages)).toBe('ko');
  });
});
