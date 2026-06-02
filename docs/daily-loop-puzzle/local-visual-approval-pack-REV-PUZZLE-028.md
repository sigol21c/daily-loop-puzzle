# REV-PUZZLE-028 — Daily Loop Puzzle 로컬 visual approval pack 및 screenshot QA

작성일: 2026-06-01 12:22 EDT
작성자: qaengineer
프로젝트 경로: `/Users/mac_agent/Documents/04_Projects/daily-loop-puzzle`
Revenue OS hub: `/Users/mac_agent/Documents/01_Knowledge/sean-s_wiki/10_Wiki/🛠️ Projects/revenue_os_v1.md`
상태: localhost-only 내부 승인 검토 자료. 외부 공개/배포/고객 접촉/계정 변경/결제/광고/analytics/개인정보 수집 없음.

## 0. 최종 판정

- 로컬 visual approval 기준: GO.
- 외부 public launch / deploy 기준: NO-GO.
- 이번 작업에서 desktop 및 390px mobile viewport screenshot을 로컬 localhost에서 생성했다.
- 실제 iOS Safari / Android Chrome 디바이스 touch, Web Share, clipboard user-gesture 검증은 아직 남아 있으므로 public launch blocker는 해소되지 않았다.
- production behavior는 변경하지 않았다. 변경은 QA 문서, screenshot artifact, local-only screenshot helper script뿐이다.

## 1. 검토한 파일과 핵심 확인 사항

| 항목 | 경로 | 확인 결과 |
| --- | --- | --- |
| Revenue OS gate | `/Users/mac_agent/Documents/01_Knowledge/sean-s_wiki/10_Wiki/🛠️ Projects/revenue_os_v1.md` | Daily Loop Puzzle은 내부 첫 제품 후보로 승인됐지만 외부 공개/배포/고객 접촉/analytics/광고/결제/개인정보 수집은 Sean 승인 전 금지. |
| README | `README.md` | 아직 Vite template README다. public-facing 제품 README로는 부적합하지만 이번 task 범위에서는 production behavior/documentation 외 변경을 하지 않았다. |
| package scripts | `package.json` | `dev`, `build`, `lint`, `test`, `smoke:metadata`, `preview` 확인. |
| App UI | `src/App.tsx`, `src/App.css`, `src/components/PuzzleBoard.tsx`, `src/components/ResultCard.tsx` | Home / Demo / Today puzzle / Result / Stats / How 구조, 480px shell, 44px+ 버튼, 4x4 board, spoiler-free result block 확인. |
| public assets/manifest | `index.html`, `public/manifest.webmanifest`, `public/pwa-icon.svg`, `public/favicon.svg` | PWA metadata와 icon은 local asset만 사용. smoke script 검증 통과. |
| launch copy | `docs/daily-loop-puzzle/launch-assets.md` | unpublished draft이며, v1은 “connected-number puzzle”로 설명해야 한다. “literal loop/graph puzzle”, “works everywhere”, “free forever” 같은 과장 금지. |
| QA baseline | `docs/daily-loop-puzzle/qa-checklist.md` | local/internal MVP conditional GO, external NO-GO, real clipboard/mobile gap 유지. |
| RC audit | `docs/daily-loop-puzzle/local-release-candidate-readiness-REV-PUZZLE-026.md` | local RC GO, external launch NO-GO, local verification pass 기록 확인. |
| Device QA checklist | `docs/daily-loop-puzzle/prelaunch-device-qa-and-approval-checklist-REV-PUZZLE-027.md` | public launch 전 iOS/Android/desktop real device matrix와 share/clipboard script가 필수로 남아 있음. |

## 2. 로컬 screenshot evidence

생성 command:

```bash
cd /Users/mac_agent/Documents/04_Projects/daily-loop-puzzle
npm run dev -- --host 127.0.0.1
node scripts/capture-local-visuals-REV-PUZZLE-028.mjs
```

실제 실행 URL:

```text
http://127.0.0.1:5174/
```

Screenshot helper:

```text
/Users/mac_agent/Documents/04_Projects/daily-loop-puzzle/scripts/capture-local-visuals-REV-PUZZLE-028.mjs
```

생성된 screenshot 폴더:

```text
/Users/mac_agent/Documents/04_Projects/daily-loop-puzzle/docs/daily-loop-puzzle/screenshots/REV-PUZZLE-028/
```

파일 목록 및 viewport:

| 파일 | Viewport / 상태 | QA 메모 |
| --- | --- | --- |
| `desktop-home-first-run.png` | 1440x1100 desktop, first-run home | 480px centered app shell이 desktop에서 과도하게 늘어나지 않음. Hero, nav, status, first-run CTA가 보임. |
| `desktop-result-solved.png` | 1440x1100 desktop, solved result | result card, share/copy CTA, practice CTA, spoiler-free share text block이 보임. |
| `mobile-home-first-run.png` | 390px mobile, first-run home | horizontal overflow/clipping 없음. CTA 3개가 세로 stack으로 보이고 44px+ touch target으로 보임. Hero title은 크지만 읽을 수 있음. |
| `mobile-demo-step-1.png` | 390px mobile, 20초 demo step 1 | demo board와 instruction이 한 화면 흐름 안에 보임. 실제 finger tap 검증은 아님. |
| `mobile-puzzle-ready.png` | 390px mobile, Today puzzle ready | target/status/Help/4x4 board/힌트가 보임. board tile이 충분히 크고 horizontal overflow 없음. |
| `mobile-result-solved.png` | 390px mobile, solved result | result summary와 share/copy CTA, spoiler-free text가 잘리지 않음. 실제 clipboard/share 성공은 미검증. |

Screenshot script 실행 output 핵심:

```text
[mobile-puzzle-result] solve={"ok":true,"target":27,"values":[2,6,6,6,5,3,4,6,5,4,6,8,7,9,2,8],"solution":[0,1,2,3,5,6]}
[desktop-result] solve={"target":27,"values":[2,6,6,6,5,3,4,6,5,4,6,8,7,9,2,8],"solution":[0,1,2,3,5,6]}
Screenshots saved to /Users/mac_agent/Documents/04_Projects/daily-loop-puzzle/docs/daily-loop-puzzle/screenshots/REV-PUZZLE-028/
```

주의:

- 첫 시도에서 Playwright package가 기대한 profile cache browser는 없었다: `Executable doesn't exist at /Users/mac_agent/.hermes/profiles/qaengineer/home/Library/Caches/ms-playwright/chromium_headless_shell-1217/...`.
- 새 browser download / network install은 하지 않았다.
- 기존 로컬 cache에 있던 `/Users/mac_agent/Library/Caches/ms-playwright/chromium_headless_shell-1223/chrome-headless-shell-mac-arm64/chrome-headless-shell`을 `executablePath`로 지정해 해결했다.
- 이 helper는 local QA 전용이다. 다른 Mac에서 cache 경로가 다르면 `PLAYWRIGHT_CHROMIUM_EXECUTABLE=/path/to/chrome-headless-shell node scripts/capture-local-visuals-REV-PUZZLE-028.mjs`로 실행해야 한다.

## 3. Visual state checklist

| State | 기준 | 결과 | Evidence |
| --- | --- | --- | --- |
| Home / first-run | headline, language selector, nav, today/target/streak/status, 20초 demo CTA가 잘리지 않아야 함 | PASS | `desktop-home-first-run.png`, `mobile-home-first-run.png` |
| Demo | 2x2 예제와 Target 7, instruction, skip/replay/start flow가 보여야 함 | PASS by viewport screenshot | `mobile-demo-step-1.png`; 실제 touch는 별도 device QA 필요 |
| Today puzzle | Target/Selected/Moves, 4x4 board, connected hint, Help CTA가 보이고 overflow 없어야 함 | PASS by viewport screenshot | `mobile-puzzle-ready.png` |
| Result | solved/failure result, share/copy CTA, practice CTA, spoiler-free share text block이 보여야 함 | PASS by viewport screenshot | `desktop-result-solved.png`, `mobile-result-solved.png` |
| Desktop layout | desktop에서도 모바일 shell이 중앙 정렬되고 과도하게 퍼지지 않아야 함 | PASS | 1440x1100 screenshots |
| 390px mobile layout | 390px width에서 horizontal overflow, clipped CTA, unreadable text가 없어야 함 | PASS | mobile screenshots; full-page height 1006–1195px로 세로 scroll은 필요하지만 정상 |
| Real device touch/share | 실제 finger tap, Share Sheet, clipboard permission/fallback이 동작해야 함 | NOT VERIFIED | REV-PUZZLE-027 matrix 필요 |

## 4. Copy / claim risk review

현재 UI 및 launch draft에서 지켜야 할 안전 표현:

- “local-only MVP”, “local-only stats”, “no account/backend/analytics/payments”는 현재 구현 범위와 일치한다.
- “Pick connected number tiles to hit today’s target”, “connected tiles to match target”은 실제 v1 mechanic과 일치한다.
- “Daily Loop” 이름은 daily habit/share loop 의미로 설명할 수 있으나, v1을 literal loop/graph puzzle처럼 과장하면 안 된다.
- “1–3 minutes”는 positioning draft에는 있으나 모든 사용자를 보장하는 claim이 아니므로 public copy에서는 “designed for quick breaks”처럼 완화하는 편이 안전하다.
- “no analytics/ads/payments”는 현재 MVP 사실로 쓸 수 있지만 “never” 또는 “free forever” 식의 장기 약속은 금지한다.

Public-facing README risk:

- `README.md`가 아직 React + TypeScript + Vite template이므로 외부 공개 전 제품 설명으로 교체해야 한다.
- 이 task에서는 production behavior와 public-facing content publish를 하지 않는 gate 때문에 README를 수정하지 않았다.

## 5. No-network / no-PII / no-external-action evidence

이번 작업에서 수행한 일:

- localhost URL만 열었다: `http://127.0.0.1:5174/`.
- 새 dependency install 또는 Playwright browser download를 하지 않았다.
- 외부 deploy, preview URL 공유, remote push, 도메인 구매, analytics/ads/payment/backend/auth 추가 없음.
- 로그인, 폼 제출, 댓글/DM/email 발송, 고객/커뮤니티 contact 없음.
- 실사용자 개인정보 또는 real user data 수집 없음.
- screenshot은 synthetic/local browser context와 localStorage만 사용했다.

Static no-network search:

```text
Scope: /Users/mac_agent/Documents/04_Projects/daily-loop-puzzle/src
Pattern: fetch\(|XMLHttpRequest|axios|gtag|stripe|paypal|sentry|posthog|mixpanel|amplitude|firebase|supabase|sendBeacon|navigator\.sendBeacon|https?://
Result: 0 matches
```

Screenshot run console에는 Vite dev console/debug 및 React DevTools 안내만 보였다. App runtime error는 관찰되지 않았다.

## 6. Local verification evidence

Working directory:

```text
/Users/mac_agent/Documents/04_Projects/daily-loop-puzzle
```

실행 command:

```bash
pwd && npm test && npm run build && npm run smoke:metadata && npm run lint && npm audit --audit-level=high
```

결과: PASS, exit code 0.

핵심 output:

```text
/Users/mac_agent/Documents/04_Projects/daily-loop-puzzle

> daily-loop-puzzle@0.0.0 test
> vitest run --environment jsdom

 RUN  v4.1.7 /Users/mac_agent/Documents/04_Projects/daily-loop-puzzle

 ✓ src/lib/onboarding.test.ts (3 tests) 2ms
 ✓ src/lib/dateSeed.test.ts (3 tests) 2ms
 ✓ src/lib/puzzle.test.ts (5 tests) 6ms
 ✓ src/lib/storage.test.ts (6 tests) 9ms
 ✓ src/i18n/locales.test.ts (2 tests) 2ms
 ✓ src/lib/share.test.ts (5 tests) 6ms
 ✓ src/App.test.tsx (4 tests) 136ms

 Test Files  7 passed (7)
      Tests  28 passed (28)
   Start at  12:18:19
   Duration  1.10s (transform 256ms, setup 0ms, import 492ms, tests 163ms, environment 5.08s)

> daily-loop-puzzle@0.0.0 build
> tsc -b && vite build

vite v8.0.14 building client environment for production...
✓ 27 modules transformed.
dist/index.html                   1.03 kB │ gzip:  0.49 kB
dist/assets/index-BzyV979Y.css    5.43 kB │ gzip:  1.90 kB
dist/assets/index-DppVjz5-.js   215.85 kB │ gzip: 68.04 kB
✓ built in 72ms

> daily-loop-puzzle@0.0.0 smoke:metadata
> node scripts/check-pwa-metadata.mjs

PWA metadata smoke passed: built index and manifest use local launch metadata only.

> daily-loop-puzzle@0.0.0 lint
> eslint .

found 0 vulnerabilities
```

추가 helper 검증:

```bash
npm run lint && node scripts/capture-local-visuals-REV-PUZZLE-028.mjs
```

결과: PASS, exit code 0. `npm run lint`는 helper script 추가 후에도 통과했고 screenshot 6개가 재생성됐다.

## 7. Untested / 남은 blocker

Public launch 전 남은 blocker:

1. Sean의 명시 승인.
2. 실제 iOS Safari에서 finger tap, share sheet 또는 clipboard/manual fallback 확인.
3. 실제 Android Chrome에서 finger tap, Web Share 또는 clipboard/manual fallback 확인.
4. Desktop Chrome/Safari/Firefox에서 clipboard/fallback, keyboard/focus, console 확인.
5. PWA install metadata는 실제 target browser/device에서 확인.
6. 첫 사용자 이해도는 내부 observer 또는 승인된 external test 전까지 미검증.
7. 외부 공개 전 README template 교체 필요.

이번 visual pack으로 줄어든 리스크:

- 390px viewport에서 핵심 UI clipping/horizontal overflow는 관찰되지 않았다.
- Home/Demo/Puzzle/Result 상태가 local app에서 실제 렌더링되고 screenshot으로 남았다.
- Result share text는 mobile viewport에서 계속 visible이며, silent disappearance는 관찰되지 않았다.

## 8. Approval-gated next steps

Sean 승인 없이는 실행 금지:

- Public deploy, preview URL 공유, domain 구매/연결.
- Product Hunt/HN/Reddit/X/Threads/Tistory 등 외부 게시.
- 고객/커뮤니티/친구/테스터 contact.
- Analytics, ads, payment, email capture, waitlist, backend, database, auth 추가.
- App Store/PWA store 등록 또는 외부 account setting 변경.
- 실사용자 데이터 수집/저장/분석.

승인 후 권장 순서:

1. REV-PUZZLE-027의 M1/M2/D1/D2/D3 manual device matrix를 먼저 실행한다.
2. Web Share/clipboard/manual fallback evidence를 실제 user gesture로 기록한다.
3. README를 public-safe 제품 설명으로 교체한다.
4. launch copy는 `launch-assets.md`의 safe wording을 사용하되 v1 mechanic을 과장하지 않는다.
5. 그 다음에만 external launch/deploy gate를 별도 승인으로 진행한다.
