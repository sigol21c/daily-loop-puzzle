# Daily Loop Puzzle local-only architecture

Status: implemented for local MVP on 2026-06-01.

## Scope

Daily Loop Puzzle is a Vite + React + TypeScript single-page app. It runs fully in the browser during local development and production build preview.

## Runtime boundaries

- No server backend.
- No login or account system.
- No analytics, ads, payments, external tracking, or third-party runtime SDKs.
- No external API calls from app code.
- Official daily result and streak stats are stored only in the current browser via `localStorage` key `daily-loop-puzzle:stats:v1`.
- First-run onboarding status is stored only in the current browser via `localStorage` key `daily-loop-puzzle:onboarding:v1`.
- Locale preference is stored only in the current browser via `localStorage` key `daily-loop-puzzle:locale:v1`.

## Core modules

- `src/lib/dateSeed.ts`: UTC day key, FNV-style hash seed, repeatable PRNG.
- `src/lib/puzzle.ts`: deterministic 4x4 puzzle generation, connected 4-tile target path, selection evaluation, scoring.
- `src/lib/storage.ts`: localStorage load/save, first official result per day, streak/best score summaries.
- `src/lib/onboarding.ts`: localStorage-only first-run demo completion/skipped state with malformed data fallback.
- `src/i18n/types.ts`: typed locale message contract for UI, onboarding/demo, result, help, and share copy.
- `src/i18n/en.ts`, `src/i18n/ko.ts`: implemented internal draft locales.
- `src/i18n/locales.ts`: locale detection, supported-locale registry, local preference load/save, unsupported-locale fallback.
- `src/lib/share.ts`: spoiler-free share text plus Web Share API / clipboard fallback; accepts locale for share result line.
- `src/components/PuzzleBoard.tsx`: touch-first 4x4 board UI with localized labels/hints.
- `src/components/ResultCard.tsx`: result and share UI with localized copy.
- `src/App.tsx`: single-app view state for Home, Today, Result, Stats, How to Play, first-run Demo, transition card, and local Help overlay.

## Puzzle rule v1

Player selects number tiles on a 4x4 board. The official solution is generated as a connected 4-cell path. A solve requires:

1. selected tile values sum to today's target, and
2. selected cells are orthogonally connected.

This intentionally uses the UX-approved local MVP fallback instead of full graph loop validation; code comments document the tradeoff in `src/lib/puzzle.ts`.

## Daily determinism

`getDayKey()` returns a UTC `YYYY-MM-DD` string. `hashSeed("daily-loop:" + dayKey)` seeds board generation, so the same date produces the same board and target on every local run.

## Data retention

The app records only local gameplay summaries: day key, solved flag, score, moves, completion timestamp, and selected pattern for the share card. The first completed result for a day is official; later practice runs cannot overwrite that stored record.

## 2026-06-01 onboarding + i18n implementation note

Sean 리뷰용 내부 구현 범위:

- 첫 방문자는 Home에서 `Try the 20-second demo` / `20초 데모 해보기` 카드를 먼저 본다.
- 데모는 오늘 퍼즐과 분리된 2x2 예제(`Target 7`, `2 + 5 = 7`)만 사용한다. 데모 선택은 moves, result, stats, streak, share text에 반영되지 않는다.
- 사용자는 데모를 건너뛰고 바로 오늘 퍼즐을 풀 수 있으며, 건너뛰기/완료 상태는 `daily-loop-puzzle:onboarding:v1`에 best-effort로 저장된다.
- returning user는 튜토리얼에 다시 강제 진입하지 않는다. Home/How/Help에서 `Replay demo` / `예제 다시 보기`로 다시 열 수 있다.
- 데모 완료 후 첫 방문자는 `Now try today’s 4x4 puzzle.` 전환 카드를 보고 `Start`를 누른 뒤 실제 4x4 퍼즐로 들어간다.
- Today 화면에는 로컬 Help overlay를 추가했다. 오늘 정답은 공개하지 않고, 규칙과 2x2 mini example만 보여준다.

지원 locale 범위:

- 구현 완료: `en`, `ko`.
- fallback: 명시 저장된 locale이 있으면 browser hint보다 우선한다. `ko-*`는 `ko`, `en-*`는 `en`, 그 외 unsupported locale은 `en`으로 떨어진다.
- language selector 변경은 현재 puzzle/day/stats/move state를 리셋하지 않고 copy만 바꾼다.
- `ja`, `es`, `pt-BR`는 `docs/daily-loop-puzzle/i18n-global-plan.md`의 Phase 2 draft/backlog 범위로 남겼다. 현재 구현 파일에는 공개-ready가 아닌 미검수 번역을 넣지 않았다.

검증 명령:

- `npm test` — 7 files / 25 tests passed.
- `npm run build` — `tsc -b && vite build` passed.
- `npm run lint` — `eslint .` passed.

## 2026-06-01 REV-PUZZLE-020 local PWA/browser metadata note

Local-only launch-readiness scope added without changing the app runtime boundary:

- `index.html` now has a production title, description, viewport, `theme-color`, light `color-scheme`, manifest link, local SVG favicon, local SVG apple-touch icon link, and iOS standalone metadata (`apple-mobile-web-app-capable`, title, status bar style).
- `public/manifest.webmanifest` defines `Daily Loop Puzzle` / `Daily Loop` with project-path-safe relative `.` start/scope, `standalone` display, portrait orientation, local colors, and local SVG icon references only.
- `public/pwa-icon.svg` is a local square vector placeholder suitable for current internal browser/PWA metadata validation. Before public launch, replace or supplement it with reviewed maskable/raster icon exports if required by target stores/platforms.
- No service worker, offline caching, analytics, external URL, payment, ad, login, backend, or remote asset was added.
- `scripts/check-pwa-metadata.mjs` plus `npm run smoke:metadata` validates that the built `dist/index.html` includes required PWA/browser metadata, that `dist/manifest.webmanifest` is valid and local-only, that built `src`/`href` references do not intentionally point at external network origins, and that built document/manifest/icon references resolve within the GitHub Pages project path `/daily-loop-puzzle/`.

Current local verification command set for this metadata layer:

- `npm test`
- `npm run build`
- `npm run smoke:metadata`
- `npm run lint`

Remaining approval-gated/mobile gaps: real iOS/Android install/share/clipboard/touch testing, public icon polish, public deployment, analytics/ads/payments, external user contact, domain/account changes, and personal-data collection all remain blocked until explicit Sean approval.
