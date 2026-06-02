# REV-PUZZLE-038 — replay/share/copy launch-readiness hardening

작성일: 2026-06-01
작업 경로: `/Users/mac_agent/Documents/04_Projects/daily-loop-puzzle`
상태: internal/local-only hardening 완료. 외부 배포, 공개 URL 공유, 고객/커뮤니티 contact, 계정/credentials 변경, analytics/ads/payments, 개인정보 수집은 하지 않았다.

## 1. 점검한 파일

- `/Users/mac_agent/Documents/01_Knowledge/sean-s_wiki/10_Wiki/🛠️ Projects/revenue_os_v1.md`
- `docs/daily-loop-puzzle/sean-launch-decision-packet-REV-PUZZLE-029.md`
- `README.md`
- `package.json`
- `src/App.tsx`
- `src/App.test.tsx`
- `src/lib/share.ts`
- `src/lib/share.test.ts`
- `docs/daily-loop-puzzle/launch-assets.md`

## 2. 변경 파일

- `README.md`
  - Vite template README를 제품/검증용 README로 교체했다.
  - local-only, privacy/no external integration, approval-gated external steps, real-device/browser share limitation을 명시했다.
- `src/App.tsx`
  - first-run onboarding demo와 replay demo를 분리했다.
  - rules/help/in-progress puzzle에서 연 replay demo의 `Skip`은 이전 화면으로 돌아가며 onboarding skip 처리나 puzzle reset을 하지 않는다.
- `src/App.test.tsx`
  - rules 화면에서 replay demo `Skip`을 눌러도 오늘 퍼즐로 강제 이동하지 않고 onboarding metadata를 쓰지 않는 deterministic regression test를 추가했다.
- `src/lib/share.ts`
  - `navigator.share`가 존재하지만 reject되는 경우 clipboard fallback을 시도하도록 보강했다.
  - clipboard API가 없으면 명시적으로 `Clipboard copy is unavailable` 에러를 던져 UI가 manual-copy fallback 문구를 보여줄 수 있게 했다.
- `src/lib/share.test.ts`
  - `navigator.share` success, `navigator.share` reject → clipboard fallback success, Web Share unavailable → clipboard success, clipboard reject → manual-copy failure path, share/clipboard unavailable → manual-copy failure path를 자동 테스트로 강화했다.
- `dist/`
  - `npm run build` 실행으로 local build output이 갱신되었다.
- `docs/daily-loop-puzzle/replay-share-copy-hardening-REV-PUZZLE-038.md`
  - 이 Korean hardening note.

## 3. RED/GREEN test evidence

### RED command

```bash
npx vitest run --environment jsdom src/lib/share.test.ts src/App.test.tsx
```

### RED result

Expected failure를 확인했다.

```text
Test Files  2 failed (2)
Tests  3 failed | 9 passed (12)

Failed branches:
- src/lib/share.test.ts: native Web Share reject가 clipboard fallback으로 resolve되지 않고 `Error: share unavailable`로 reject됨.
- src/lib/share.test.ts: share/clipboard 모두 없을 때 `Clipboard copy is unavailable`가 아니라 TypeError(`Cannot read properties of undefined (reading 'writeText')`) 발생.
- src/App.test.tsx: rules 화면에서 replay demo `Skip` 후 How to play 화면에 남지 않고 Today puzzle로 이동함.
```

### GREEN command

```bash
npx vitest run --environment jsdom src/lib/share.test.ts src/App.test.tsx
```

### GREEN result

```text
✓ src/lib/share.test.ts (7 tests) 3ms
✓ src/App.test.tsx (5 tests) 141ms

Test Files  2 passed (2)
Tests  12 passed (12)
Duration  645ms
```

## 4. Replay demo `Skip` 판정

판정: fixed with automated test evidence.

기존 문제는 onboarding 미완료 상태에서 rules 화면의 replay demo를 열고 `Skip`을 누르면 first-run onboarding skip과 동일하게 처리되어 오늘 퍼즐로 강제 이동하는 흐름이었다. 수정 후에는 first-run home card에서 시작한 demo만 onboarding skip/complete로 처리하고, rules/help/in-progress puzzle에서 시작한 replay demo는 `closeReplayDemo`로 이전 화면에 복귀한다.

검증 test:

- `src/App.test.tsx` — `keeps replay demo Skip inside rules instead of treating it like first-run onboarding skip`
- 기존 in-progress replay 보호 test도 계속 통과: `replays the demo from an in-progress puzzle without resetting moves or onboarding metadata`

Core puzzle rules, puzzle generation, scoring, storage schema는 변경하지 않았다.

## 5. Share/copy branch coverage 판정

판정: strengthened with automated test evidence.

자동 테스트가 커버하는 branch:

1. `navigator.share` success → returns `shared`.
2. `navigator.share` unavailable + `navigator.clipboard.writeText` success → returns `copied`.
3. `navigator.share` reject + `navigator.clipboard.writeText` success → returns `copied`.
4. clipboard fallback reject → rejects so React UI can show manual-copy fallback text.
5. share/clipboard unavailable → rejects with `Clipboard copy is unavailable` so React UI can show manual-copy fallback text.

Browser-only limitation:

- Vitest/jsdom tests prove branch behavior with mocked browser APIs only.
- 실제 iOS Safari/Android Chrome/Desktop browser의 trusted user gesture, permission prompt, OS share sheet, clipboard paste 결과는 REV-PUZZLE-027 manual device QA 전까지 미검증이다.
- Public copy는 “designed to be spoiler-free”와 “local-first/current MVP” 수준으로 제한해야 하며 “works everywhere”는 아직 금지다.

## 6. README / launch-copy safety pass

판정: completed.

- `README.md`는 Vite template에서 product/local verification README로 교체했다.
- README에 아래 guardrail을 명시했다.
  - internal local validation only
  - no publish/deploy/contact/analytics/ads/payments/personal data/account changes without Sean approval
  - no account/login/backend/analytics/ads/payments/external runtime API calls in current MVP
  - real device/browser share checks still required
  - Web Share/clipboard unit tests are mocked branch tests, not OS-level proof
- `docs/daily-loop-puzzle/launch-assets.md`는 이미 unpublished internal draft, approval boundary, local-only/no external integrations, real clipboard check limitation, non-hype copy guardrail을 포함하고 있어 이번 task에서는 no-change로 유지했다.

## 7. Full local verification

### Command

```bash
npm test && npm run build && npm run lint && npm run smoke:metadata && npm audit --audit-level=moderate
```

### Result

Exit code: 0

핵심 output:

```text
> daily-loop-puzzle@0.0.0 test
> vitest run --environment jsdom

✓ src/lib/onboarding.test.ts (3 tests) 2ms
✓ src/lib/puzzle.test.ts (5 tests) 5ms
✓ src/lib/dateSeed.test.ts (3 tests) 6ms
✓ src/i18n/locales.test.ts (2 tests) 2ms
✓ src/lib/share.test.ts (7 tests) 5ms
✓ src/lib/storage.test.ts (6 tests) 12ms
✓ src/App.test.tsx (5 tests) 142ms

Test Files  7 passed (7)
Tests  31 passed (31)
Duration  1.11s

> daily-loop-puzzle@0.0.0 build
> tsc -b && vite build

vite v8.0.14 building client environment for production...
✓ 27 modules transformed.
dist/index.html                   1.03 kB │ gzip:  0.49 kB
dist/assets/index-BzyV979Y.css    5.43 kB │ gzip:  1.90 kB
dist/assets/index-BAmdILL1.js   216.02 kB │ gzip: 68.10 kB
✓ built in 88ms

> daily-loop-puzzle@0.0.0 lint
> eslint .

> daily-loop-puzzle@0.0.0 smoke:metadata
> node scripts/check-pwa-metadata.mjs

PWA metadata smoke passed: built index and manifest use local launch metadata only.
found 0 vulnerabilities
```

## 8. Launch-readiness conclusion

Internal local hardening: PASS.

Public launch: still HOLD / NO-GO until Sean explicitly approves external deployment/channel/contact/data scope and REV-PUZZLE-027 real-device/browser share/clipboard/touch QA is completed.
