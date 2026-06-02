import { describe, expect, it } from 'vitest';
import { getDayKey, hashSeed, seededRandom } from './dateSeed';

describe('date seed utilities', () => {
  it('returns the same day key for UTC dates on the same day', () => {
    expect(getDayKey(new Date('2026-05-31T02:30:00.000Z'))).toBe('2026-05-31');
    expect(getDayKey(new Date('2026-05-31T23:59:59.000Z'))).toBe('2026-05-31');
  });

  it('returns deterministic seeds for the same input and different seeds for different days', () => {
    expect(hashSeed('daily-loop:2026-05-31')).toBe(hashSeed('daily-loop:2026-05-31'));
    expect(hashSeed('daily-loop:2026-05-31')).not.toBe(hashSeed('daily-loop:2026-06-01'));
  });

  it('generates repeatable pseudo-random sequences from the same seed', () => {
    const a = seededRandom(12345);
    const b = seededRandom(12345);
    expect([a(), a(), a()]).toEqual([b(), b(), b()]);
  });
});
