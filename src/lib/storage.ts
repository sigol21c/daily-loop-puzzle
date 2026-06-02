export type DailyRecord = {
  dayKey: string;
  solved: boolean;
  score: number;
  moves: number;
  playedAt: string;
  selectedPattern?: boolean[];
};

export type PlayerStats = {
  records: DailyRecord[];
  currentStreak: number;
  bestScore: number;
  gamesPlayed: number;
  gamesSolved: number;
};

const STORAGE_KEY = 'daily-loop-puzzle:stats:v1';

function calculateStreak(records: DailyRecord[]): number {
  const sortedRecords = [...records].sort((a, b) => b.dayKey.localeCompare(a.dayKey));
  if (sortedRecords.length === 0 || !sortedRecords[0].solved) return 0;

  const solvedDays = [...new Set(sortedRecords.filter((record) => record.solved).map((record) => record.dayKey))];
  let streak = 1;
  let previous = new Date(`${solvedDays[0]}T00:00:00.000Z`);
  for (const dayKey of solvedDays.slice(1)) {
    const current = new Date(`${dayKey}T00:00:00.000Z`);
    const diffDays = Math.round((previous.getTime() - current.getTime()) / 86400000);
    if (diffDays !== 1) break;
    streak += 1;
    previous = current;
  }
  return streak;
}

function summarize(records: DailyRecord[]): PlayerStats {
  return {
    records,
    currentStreak: calculateStreak(records),
    bestScore: records.reduce((best, record) => Math.max(best, record.score), 0),
    gamesPlayed: records.length,
    gamesSolved: records.filter((record) => record.solved).length,
  };
}

function safeReadStorage(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function safeWriteStorage(records: DailyRecord[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ records }));
  } catch {
    // Local-only MVP: if storage is unavailable, keep the UI playable for the session.
  }
}

export function loadStats(): PlayerStats {
  const raw = safeReadStorage();
  if (!raw) return summarize([]);

  try {
    const parsed = JSON.parse(raw) as { records?: DailyRecord[] };
    return summarize(Array.isArray(parsed.records) ? parsed.records : []);
  } catch {
    return summarize([]);
  }
}

export function recordDailyResult(record: DailyRecord): PlayerStats {
  const stats = loadStats();
  if (stats.records.some((existing) => existing.dayKey === record.dayKey)) {
    return stats;
  }
  const records = [...stats.records, record].sort((a, b) => a.dayKey.localeCompare(b.dayKey));
  safeWriteStorage(records);
  return summarize(records);
}

export function resetStatsForTests(): void {
  localStorage.removeItem(STORAGE_KEY);
}
