# Daily Loop Puzzle UX Spec

## Product intent

- Mobile-first daily puzzle that can be understood in under 3 seconds and completed in 1–3 minutes.
- Local-only MVP: no account, no backend, no analytics, no payment, no user collection.
- Core loop: open → see today's target → select numeric tiles → solve/fail → copy/share spoiler-free result → local stats/streak.

## Screens

### 1. Home / Today Puzzle

Primary content:
- Title: `Daily Loop Puzzle`
- Today's date key
- Target total
- Current selected total
- Moves left
- 4x4 puzzle board
- Short rule hint

States:
- not played: official result not yet stored for today.
- playing: result is null and moves remain.
- already played: official record exists; additional run is treated as practice.

Wireframe:

```text
┌──────────────────────────────┐
│ Daily puzzle · local-only MVP │
│ Daily Loop Puzzle             │
│ 숫자 타일을 골라 목표 합 맞추기 │
├──────┬──────┬────────┬───────┤
│Today │Target│Selected│Moves  │
├──────┴──────┴────────┴───────┤
│ [ 7 ][ 2 ][ 4 ][ 9 ]          │
│ [ 1 ][ 8 ][ 3 ][ 5 ]          │
│ [ 6 ][ 4 ][ 2 ][ 7 ]          │
│ [ 9 ][ 1 ][ 5 ][ 3 ]          │
│ 힌트: 정답은 4개의 타일         │
└──────────────────────────────┘
```

### 2. Result

Primary content:
- Success/fail headline
- moves/maxMoves, score, selected total
- `결과 공유/복사` button
- `연습으로 다시 풀기` button
- generated share text preview

States:
- solved: green border / success copy
- failed: red border / retry/practice copy
- copy success/failure status

### 3. Stats

Primary content:
- Played
- Solved
- Streak
- Best score
- Today official record notice

### 4. How to Play

Rules:
1. 타일을 눌러 선택/해제한다.
2. 선택한 숫자의 합이 Target과 같으면 성공한다.
3. 6번 안에 해결하면 오늘 기록이 localStorage에 저장된다.

## Component handoff

- `App`: owns dayKey, puzzle, moves, result, stats, share status.
- `PuzzleBoard` may be extracted later; current MVP keeps board inline.
- `StatusGrid`: may be extracted later; shows date, target, selected total, moves left.
- `ResultCard`: may be extracted later; receives result and share text.
- `StatsCard`: may be extracted later; receives `PlayerStats`.

## State model

```ts
type PuzzleCell = { id: string; value: number; selected: boolean; hint: 'low' | 'mid' | 'high' };
type Puzzle = { dayKey: string; target: number; cells: PuzzleCell[]; maxMoves: number; solutionIds: string[] };
type PuzzleResult = { solved: boolean; moves: number; score: number; selectedTotal: number };
type DailyRecord = { dayKey: string; solved: boolean; score: number; moves: number; playedAt: string };
```

## Share text variants

Variant A:

```text
Daily Loop Puzzle #2026-05-31
✅ 4/6 moves · 840 pts
🟩⬜🟩⬜
⬜🟩⬜🟩
```

Variant B:

```text
Daily Loop Puzzle 2026-05-31
Solved in 4/6 · 840 pts
🟩⬜🟩⬜
⬜🟩⬜🟩
```

Variant C:

```text
오늘의 Daily Loop
✅ 4/6 · 840점
🟩⬜🟩⬜
⬜🟩⬜🟩
```

MVP uses Variant A.

## Accessibility and mobile constraints

- 390px width should not horizontally scroll.
- Buttons/tile touch target should be at least 44px high.
- `aria-pressed` marks selected tile state.
- Color is supported by text/value; not color-only.

## Approval boundary

This UX is internal only until Sean approves external testing/deployment. No public URL, analytics, waitlist, account, payment, or community posting is part of this spec.
