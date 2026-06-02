import { describe, expect, it, beforeEach } from 'vitest';
import { loadStats, recordDailyResult, resetStatsForTests } from './storage';

describe('local stats storage', () => {
  beforeEach(() => {
    localStorage.clear();
    resetStatsForTests();
  });

  it('persists only the first official result for a day', () => {
    recordDailyResult({ dayKey: '2026-05-31', solved: true, score: 840, moves: 4, playedAt: '2026-05-31T10:00:00Z' });
    recordDailyResult({ dayKey: '2026-05-31', solved: false, score: 10, moves: 6, playedAt: '2026-05-31T11:00:00Z' });
    const stats = loadStats();
    expect(stats.records).toHaveLength(1);
    expect(stats.records[0].score).toBe(840);
    expect(stats.currentStreak).toBe(1);
  });

  it('sets the current streak to zero when the latest official result is a failed day', () => {
    recordDailyResult({ dayKey: '2026-05-31', solved: true, score: 840, moves: 4, playedAt: '2026-05-31T10:00:00Z' });
    recordDailyResult({ dayKey: '2026-06-01', solved: true, score: 920, moves: 3, playedAt: '2026-06-01T10:00:00Z' });
    recordDailyResult({ dayKey: '2026-06-02', solved: false, score: 0, moves: 6, playedAt: '2026-06-02T10:00:00Z' });

    const stats = loadStats();

    expect(stats.gamesPlayed).toBe(3);
    expect(stats.gamesSolved).toBe(2);
    expect(stats.currentStreak).toBe(0);
  });

  it('counts consecutive solved days through the latest solved official result', () => {
    recordDailyResult({ dayKey: '2026-05-30', solved: true, score: 700, moves: 5, playedAt: '2026-05-30T10:00:00Z' });
    recordDailyResult({ dayKey: '2026-05-31', solved: true, score: 840, moves: 4, playedAt: '2026-05-31T10:00:00Z' });
    recordDailyResult({ dayKey: '2026-06-01', solved: true, score: 920, moves: 3, playedAt: '2026-06-01T10:00:00Z' });

    expect(loadStats().currentStreak).toBe(3);
  });

  it('resets the streak across a missed daily date rollover gap', () => {
    recordDailyResult({ dayKey: '2026-05-30', solved: true, score: 700, moves: 5, playedAt: '2026-05-30T10:00:00Z' });
    recordDailyResult({ dayKey: '2026-06-01', solved: true, score: 920, moves: 3, playedAt: '2026-06-01T10:00:00Z' });

    const stats = loadStats();

    expect(stats.gamesPlayed).toBe(2);
    expect(stats.gamesSolved).toBe(2);
    expect(stats.currentStreak).toBe(1);
  });

  it('keeps a failed first official result locked even if a later practice solve occurs the same day', () => {
    recordDailyResult({ dayKey: '2026-06-01', solved: false, score: 0, moves: 6, playedAt: '2026-06-01T10:00:00Z' });
    recordDailyResult({ dayKey: '2026-06-01', solved: true, score: 960, moves: 4, playedAt: '2026-06-01T10:05:00Z' });

    const stats = loadStats();

    expect(stats.records).toHaveLength(1);
    expect(stats.records[0]).toMatchObject({ dayKey: '2026-06-01', solved: false, score: 0, moves: 6 });
    expect(stats.gamesSolved).toBe(0);
    expect(stats.currentStreak).toBe(0);
  });

  it('ignores malformed localStorage data and returns empty stats', () => {
    localStorage.setItem('daily-loop-puzzle:stats:v1', '{not-json');

    expect(loadStats()).toEqual({
      records: [],
      currentStreak: 0,
      bestScore: 0,
      gamesPlayed: 0,
      gamesSolved: 0,
    });
  });
});
