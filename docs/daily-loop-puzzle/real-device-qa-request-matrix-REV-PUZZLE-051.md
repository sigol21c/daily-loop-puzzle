# REV-PUZZLE-051 — Daily Loop Puzzle 실제 기기 QA 요청 matrix 및 localhost 준비

작성 시각: 2026-06-01 17:18 EDT
작성자: qaengineer
프로젝트 경로: `/Users/mac_agent/Documents/04_Projects/daily-loop-puzzle`
상태: internal prep 완료. 실제 iOS/Android/desktop device QA 실행은 Sean 승인 필요. 외부 배포, tunnel, 공개 URL 공유, 고객/커뮤니티 contact, analytics/ads/payment/account 변경, real user data 수집은 하지 않았다.

## 0. Go / No-Go 판정

- Internal prep: GO / 완료.
- Local automated verification: GO / PASS.
- Real-device QA execution: HOLD — Sean의 limited device QA 승인 필요.
- External public launch/deploy/contact/analytics/payment: NO-GO 유지.

이 문서는 REV-QA-044 이후 남은 gap인 실제 iOS Safari, Android Chrome, Desktop Chrome/Safari/Firefox의 share, clipboard, manual copy, touch, localStorage, reduced-motion/a11y, offline/no-network expectation을 Sean이 승인 후 바로 실행할 수 있게 고정한 요청 matrix다.

## 1. 확인한 기준 문서

### Repository / local docs

- `/Users/mac_agent/Documents/04_Projects/daily-loop-puzzle/docs/daily-loop-puzzle/localhost-share-clipboard-manual-qa-pack-REV-QA-044.md`
  - Headless localhost branch smoke는 PASS.
  - `npm test`, `npm run build`, `npm run lint`, `npm run smoke:metadata`, `npm audit --audit-level=moderate`가 PASS였음.
  - 하지만 real iOS Safari / Android Chrome / Desktop Chrome/Safari/Firefox의 OS share sheet, clipboard permission, finger tap, paste 결과는 approval/device-dependent blocker로 남음.
- `/Users/mac_agent/Documents/04_Projects/daily-loop-puzzle/docs/daily-loop-puzzle/prelaunch-device-qa-and-approval-checklist-REV-PUZZLE-027.md`
  - public launch 전 M1 iOS Safari, M2 Android Chrome, D1 Desktop Chrome, D2 Desktop Safari, D3 Desktop Firefox pass rule 정의.
  - share sheet는 열어도 외부 전송 전 cancel, clipboard paste는 local scratch에서만 확인.
- `/Users/mac_agent/Documents/04_Projects/daily-loop-puzzle/docs/daily-loop-puzzle/sean-launch-decision-packet-REV-PUZZLE-029.md`
  - 추천 옵션은 `APPROVE LOCAL DEVICE QA ONLY`.
  - public launch는 Sean의 별도 external scope 승인 전 NO-GO.

### Obsidian / Revenue OS docs

- `/Users/mac_agent/Documents/01_Knowledge/sean-s_wiki/10_Wiki/🛠️ Projects/revenue_os_v1.md`
  - Daily Loop Puzzle은 1순위 후보이나 외부 approval gate가 유지됨.
  - Sean approval/readiness packet이 현재 Daily Loop Puzzle 외부 launch HOLD + 실제 기기 QA 제한 승인 요청을 권장한다고 링크됨.
- `/Users/mac_agent/Documents/01_Knowledge/sean-s_wiki/10_Wiki/🛠️ Projects/sean_approval_readiness_packet_puzzle_vs_utility_2026-06-01.md`
  - 현재 추천: Daily Loop Puzzle은 외부 launch HOLD + 제한된 실제 기기 QA 승인 요청.
  - 승인 요청 문구는 발송하지 않은 내부 초안으로 보관되어 있음.

## 2. 이번 REV-PUZZLE-051에서 완료한 internal prep

1. REV-QA-044, REV-PUZZLE-027, REV-PUZZLE-029, Revenue OS hub, Sean approval/readiness packet을 확인했다.
2. 실제 기기 QA request matrix를 이 파일에 작성했다.
3. localhost-only helper script를 추가했다.

```text
/Users/mac_agent/Documents/04_Projects/daily-loop-puzzle/scripts/prepare-real-device-qa-localhost.mjs
```

4. helper script가 생성하는 observation template 위치:

```text
/Users/mac_agent/Documents/04_Projects/daily-loop-puzzle/docs/daily-loop-puzzle/manual-qa-evidence/REV-PUZZLE-051/device-observations-template.md
```

5. 이번 작업 중 하지 않은 것:
   - 외부 deploy/public URL/tunnel/LAN 노출.
   - 고객/커뮤니티/친구/테스터에게 연락.
   - Slack/DM/email/comment/form 발송.
   - analytics/ads/payment/auth/account/credential 변경.
   - real user data 수집.
   - remote push.

## 3. Environment / package 상태

Command:

```bash
pwd && node --version && npm --version && test -f package-lock.json && echo 'package-lock=yes' || echo 'package-lock=no'; test -d node_modules && echo 'node_modules=yes' || echo 'node_modules=no'; date '+%Y-%m-%d %H:%M:%S %Z'; git status --short
```

Result:

```text
/Users/mac_agent/Documents/04_Projects/daily-loop-puzzle
v22.22.3
10.9.8
package-lock=yes
node_modules=yes
2026-06-01 17:18:53 EDT
fatal: not a git repository (or any of the parent directories): .git
```

해석:

- `package-lock.json`과 `node_modules`가 존재하므로 새 install 없이 기존 local verification을 실행했다.
- 현재 path는 git repository가 아니므로 `git status`는 사용할 수 없었다. remote push는 하지 않았다.

## 4. Local verification 결과

### 4.1 `npm test`

Result: PASS, exit code 0.

```text
> daily-loop-puzzle@0.0.0 test
> vitest run --environment jsdom

 RUN  v4.1.7 /Users/mac_agent/Documents/04_Projects/daily-loop-puzzle

 ✓ src/lib/onboarding.test.ts (3 tests) 2ms
 ✓ src/lib/dateSeed.test.ts (3 tests) 2ms
 ✓ src/lib/puzzle.test.ts (5 tests) 4ms
 ✓ src/lib/storage.test.ts (6 tests) 10ms
 ✓ src/i18n/locales.test.ts (2 tests) 2ms
 ✓ src/lib/share.test.ts (7 tests) 5ms
 ✓ src/App.test.tsx (5 tests) 142ms

 Test Files  7 passed (7)
      Tests  31 passed (31)
   Start at  17:18:56
   Duration  1.14s (transform 392ms, setup 0ms, import 628ms, tests 166ms, environment 5.09s)
```

### 4.2 `npm run build`

Result: PASS, exit code 0.

```text
> daily-loop-puzzle@0.0.0 build
> tsc -b && vite build

vite v8.0.14 building client environment for production...
transforming...✓ 27 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                   1.03 kB │ gzip:  0.49 kB
dist/assets/index-BzyV979Y.css    5.43 kB │ gzip:  1.90 kB
dist/assets/index-BAmdILL1.js   216.02 kB │ gzip: 68.10 kB

✓ built in 77ms
```

### 4.3 `npm run lint`

Result: PASS, exit code 0.

```text
> daily-loop-puzzle@0.0.0 lint
> eslint .
```

### 4.4 `npm run smoke:metadata`

Result: PASS, exit code 0.

```text
> daily-loop-puzzle@0.0.0 smoke:metadata
> node scripts/check-pwa-metadata.mjs

PWA metadata smoke passed: built index and manifest use local launch metadata only.
```

### 4.5 `npm audit --audit-level=moderate`

Result: PASS, exit code 0.

```text
found 0 vulnerabilities
```

### 4.6 Post-change combined verification

Helper script와 matrix 문서를 추가한 뒤 전체 gate를 다시 실행했다.

Command:

```bash
npm test && npm run build && npm run lint && npm run smoke:metadata && npm audit --audit-level=moderate && node scripts/prepare-real-device-qa-localhost.mjs
```

Result: PASS, exit code 0.

```text
> daily-loop-puzzle@0.0.0 test
> vitest run --environment jsdom

 RUN  v4.1.7 /Users/mac_agent/Documents/04_Projects/daily-loop-puzzle

 ✓ src/lib/dateSeed.test.ts (3 tests) 2ms
 ✓ src/lib/onboarding.test.ts (3 tests) 2ms
 ✓ src/lib/puzzle.test.ts (5 tests) 4ms
 ✓ src/i18n/locales.test.ts (2 tests) 2ms
 ✓ src/lib/storage.test.ts (6 tests) 11ms
 ✓ src/lib/share.test.ts (7 tests) 5ms
 ✓ src/App.test.tsx (5 tests) 141ms

 Test Files  7 passed (7)
      Tests  31 passed (31)
   Start at  17:21:18
   Duration  1.21s (transform 203ms, setup 0ms, import 436ms, tests 167ms, environment 5.69s)

> daily-loop-puzzle@0.0.0 build
> tsc -b && vite build

vite v8.0.14 building client environment for production...
transforming...✓ 27 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                   1.03 kB │ gzip:  0.49 kB
dist/assets/index-BzyV979Y.css    5.43 kB │ gzip:  1.90 kB
dist/assets/index-BAmdILL1.js   216.02 kB │ gzip: 68.10 kB

✓ built in 75ms

> daily-loop-puzzle@0.0.0 lint
> eslint .

> daily-loop-puzzle@0.0.0 smoke:metadata
> node scripts/check-pwa-metadata.mjs

PWA metadata smoke passed: built index and manifest use local launch metadata only.
found 0 vulnerabilities
REV-PUZZLE-051 localhost-only prep complete.
Evidence directory: /Users/mac_agent/Documents/04_Projects/daily-loop-puzzle/docs/daily-loop-puzzle/manual-qa-evidence/REV-PUZZLE-051
Observation template: /Users/mac_agent/Documents/04_Projects/daily-loop-puzzle/docs/daily-loop-puzzle/manual-qa-evidence/REV-PUZZLE-051/device-observations-template.md
Run local command gate:
  npm test && npm run build && npm run lint && npm run smoke:metadata && npm audit --audit-level=moderate
Run localhost preview only after approval for manual device QA:
  npm run preview -- --host 127.0.0.1
Open only on the same machine unless Sean explicitly approves same-network device access. Do not tunnel, deploy, publish, or send share output externally.
```

## 5. Localhost-only helper script

Script:

```bash
cd /Users/mac_agent/Documents/04_Projects/daily-loop-puzzle
node scripts/prepare-real-device-qa-localhost.mjs
```

Result: PASS, exit code 0.

```text
REV-PUZZLE-051 localhost-only prep complete.
Evidence directory: /Users/mac_agent/Documents/04_Projects/daily-loop-puzzle/docs/daily-loop-puzzle/manual-qa-evidence/REV-PUZZLE-051
Observation template: /Users/mac_agent/Documents/04_Projects/daily-loop-puzzle/docs/daily-loop-puzzle/manual-qa-evidence/REV-PUZZLE-051/device-observations-template.md
Run local command gate:
  npm test && npm run build && npm run lint && npm run smoke:metadata && npm audit --audit-level=moderate
Run localhost preview only after approval for manual device QA:
  npm run preview -- --host 127.0.0.1
Open only on the same machine unless Sean explicitly approves same-network device access. Do not tunnel, deploy, publish, or send share output externally.
```

이 script는:

- `package.json`, `package-lock.json`, `node_modules` 존재를 확인한다.
- `node_modules`가 없으면 install을 하지 않고 중단한다.
- `docs/daily-loop-puzzle/manual-qa-evidence/REV-PUZZLE-051/`를 만들고 observation template을 쓴다.
- localhost-only preview command만 안내한다.
- tunnel, deploy, publish, external share를 하지 않는다.

## 6. Sean 승인 후 실행할 localhost-only setup

주의: 아래는 “실제 기기 QA”로 넘어가기 전 Sean의 제한 승인이 필요하다. 승인 전에는 이 문서와 helper script만 준비 상태로 둔다.

```bash
cd /Users/mac_agent/Documents/04_Projects/daily-loop-puzzle
node scripts/prepare-real-device-qa-localhost.mjs
npm test && npm run build && npm run lint && npm run smoke:metadata && npm audit --audit-level=moderate
npm run preview -- --host 127.0.0.1
```

Same-machine desktop browser는 `http://127.0.0.1:4173/`만 사용한다.

모바일 실기기 접근이 같은 Mac의 `127.0.0.1`로 불가능해서 same-LAN host, `--host 0.0.0.0`, local IP, tunnel, device farm, external preview가 필요해지면 중단하고 Sean에게 추가 승인을 받아야 한다. 이 task에서는 그런 노출을 실행하지 않았다.

## 7. Real-device QA request matrix

공통 pass/fail evidence fields:

- Tester
- Date/time/timezone
- Device model
- OS version
- Browser version
- URL/environment
- Screenshot/recording file path
- Console errors, 있으면 exact text
- Result: PASS / CONDITIONAL PASS / FAIL
- Notes / exact failure
- External actions avoided: yes/no

### M1 — iOS Safari

| Area | Exact checklist | Pass 기준 | Evidence fields |
| --- | --- | --- | --- |
| Setup | Sean 승인 후 iPhone Safari에서 approved localhost-only URL을 연다. Site data를 clear하거나 private/new session을 사용한다. | 외부 deploy/tunnel/customer contact 없이 접근한다. | URL/environment, device model, iOS version, Safari version |
| First load/onboarding | Home → first-run demo CTA → demo tile `2`, `5` tap → Today puzzle 진입. | 360–390px portrait에서 horizontal overflow, 잘린 CTA, 겹친 text 없음. Demo가 official result를 오염시키지 않음. | S1 home, S2 demo, notes |
| Mobile touch | Today puzzle에서 실제 finger tap으로 tile selection, connected rule 안내, 6 moves 내 result 도달. | 모든 core tile/CTA가 손가락으로 작동. 오탭 때문에 play 불가하지 않음. | S3 ready, S4 mid-solve, recording optional |
| localStorage | Result 도달 후 reload. Stats/Today complete/result persistence 확인. | reload 후 오늘 기록과 stats가 유지되고 unintended overwrite 없음. | S5 result, S7 after reload |
| Web Share | Result의 share/copy CTA를 실제 finger tap. iOS Share Sheet가 열리면 외부 앱 전송 전 cancel. | Share Sheet가 열리거나, 실패 시 clipboard/manual fallback으로 복구 가능. Silent fail 없음. | S6 share sheet or fallback, outcome |
| Clipboard | Share Sheet가 없거나 reject되면 clipboard success/failure status 확인. Local scratch에만 paste 확인 가능하면 수행. | 성공 toast/status가 맞거나 permission denied가 manual fallback으로 이어짐. | pasted local text or permission note |
| Manual copy | Fallback text block을 long-press/select/copy 시도. | `Daily Loop Puzzle #YYYY-MM-DD` 형식의 spoiler-free text가 visible/selectable. Solution values 직접 노출 없음. | S6 manual text, notes |
| Reduced-motion/a11y | iOS Reduce Motion 및 VoiceOver quick smoke 가능 시 확인. Focus/reading order, color-only state 여부 확인. | motion이 gameplay를 막지 않고, 주요 버튼/상태가 읽힘. | a11y note |
| Offline/no-network expectation | 앱을 이미 load한 상태에서 network off 후 reload/continue 가능 여부를 기록. | 현재 service worker/offline-first 보장이 명시되지 않았으므로 hard blocker는 아님. 단, runtime external request가 있으면 FAIL. | offline expectation: PASS/FAIL/N/A, network note |

### M2 — Android Chrome

| Area | Exact checklist | Pass 기준 | Evidence fields |
| --- | --- | --- | --- |
| Setup | Sean 승인 후 Android Chrome에서 approved localhost-only URL을 연다. Site data clear. | 외부 deploy/tunnel/device farm 없이 접근한다. | URL/environment, device model, Android version, Chrome version |
| First load/onboarding | Home → demo CTA → demo taps → Today puzzle 진입. | mobile viewport에서 core CTA가 보이고 tap 가능. | S1/S2 |
| Mobile touch | 실제 finger tap으로 puzzle core flow 완료. | tile hit target과 selection feedback이 안정적. | S3/S4/R |
| localStorage | Result 후 reload, Stats 확인. | result/stats persistence 정상. | S5/S7 |
| Web Share | Result share/copy CTA를 finger tap. Android share sheet가 열리면 전송하지 않고 cancel. | share sheet, clipboard, manual fallback 중 하나가 명확히 동작. | S6/R, outcome |
| Clipboard | Chrome clipboard toast/permission/failure 기록. Local scratch paste만 허용. | permission failure가 crash/silent fail로 이어지지 않음. | pasted local text or note |
| Manual copy | fallback text select/copy 가능성 확인. | fallback text visible/selectable, spoiler-free. | S6 |
| Reduced-motion/a11y | Android Remove animations/TalkBack quick smoke 가능 시 확인. | motion/a11y가 core flow를 막지 않음. | a11y note |
| Offline/no-network expectation | 이미 load 후 offline 상태에서 behavior 기록. | external runtime dependency 없음. Offline reload failure는 PWA offline guarantee가 없으면 blocker가 아니라 expectation note. | offline note |

### D1 — Desktop Chrome

| Area | Exact checklist | Pass 기준 | Evidence fields |
| --- | --- | --- | --- |
| Setup | Chrome installed desktop에서 `http://127.0.0.1:4173/` 접속. | localhost only. No extension/account/cloud action. | OS, Chrome version, URL |
| Core flow | Mouse + keyboard로 onboarding/demo/today/result/stats/how 확인. | console error 0, core flow complete. | S1-S7, console export |
| Clipboard/share | share/copy CTA click. Chrome에서 Web Share 지원/미지원, clipboard permission, manual fallback 기록. | trusted click에서 success 또는 clear fallback. | S6, pasted local scratch text |
| localStorage | reload 후 persistence 확인. | 공식 기록 유지, practice/replay overwrite 없음. | S7 |
| Responsive/touch proxy | DevTools 390x844는 보조 evidence로만 확인. | horizontal overflow 없음. 실제 mobile pass 대체는 아님. | responsive screenshot |
| Reduced-motion/a11y | OS/browser reduced motion, keyboard Tab/Shift+Tab/Enter/Space, focus outline 확인. | keyboard-only로 핵심 flow 접근 가능. | a11y note |
| Offline/no-network expectation | localhost app loaded 상태에서 network disable/DevTools offline behavior 기록. | external runtime call 없음. | offline note |

### D2 — Desktop Safari

| Area | Exact checklist | Pass 기준 | Evidence fields |
| --- | --- | --- | --- |
| Setup | macOS Safari에서 `http://127.0.0.1:4173/` 접속. | localhost only, no account/iCloud/share destination action. | macOS, Safari version, URL |
| Rendering/core flow | onboarding/demo/today/result/stats/how 확인. | layout 깨짐 없음, console error 없음. | S1-S7, console note |
| Clipboard/share | share/copy CTA click. Safari share/clipboard permission/fallback 기록. Share sheet가 열리면 cancel. | silent fail 없음, manual fallback visible. | S6 |
| localStorage | reload persistence 확인. | result/stats 유지. | S7 |
| Reduced-motion/a11y | Reduce Motion, keyboard focus, VoiceOver quick smoke 가능 시 확인. | focus visible, Help/dialog close 가능. | a11y note |
| Offline/no-network expectation | external request 없음 확인. | offline-first guarantee가 아니므로 reload failure는 note, external runtime dependency는 FAIL. | offline note |

### D3 — Desktop Firefox

| Area | Exact checklist | Pass 기준 | Evidence fields |
| --- | --- | --- | --- |
| Setup | Firefox desktop에서 `http://127.0.0.1:4173/` 접속. | localhost only. | OS, Firefox version, URL |
| Rendering/core flow | onboarding/demo/today/result/stats/how 확인. | layout 깨짐 없음, core flow complete, console error 0. | S1-S7, console export |
| Clipboard/share | `navigator.share` 미지원/clipboard 제한 가능성을 기록하고 fallback 확인. | Web Share 미지원 자체는 blocker 아님. Manual-copy fallback이 visible/selectable이면 pass 가능. | S6 |
| localStorage | reload persistence 확인. | result/stats 유지. | S7 |
| Reduced-motion/a11y | keyboard-only, focus outline, reduced motion 확인. | keyboard user가 core flow를 완료할 수 있음. | a11y note |
| Offline/no-network expectation | runtime external request 없음 확인. | external runtime dependency가 있으면 FAIL. | offline note |

## 8. Minimum pass rule after Sean approval

실제 device QA가 launch blocker를 낮췄다고 보려면 아래가 필요하다.

1. M1 iOS Safari와 M2 Android Chrome에서 실제 finger tap으로 Home → onboarding/demo → Today puzzle → Result까지 완료.
2. M1/M2에서 Web Share 또는 clipboard 또는 manual-copy fallback 중 하나가 trusted user gesture 후 명확히 동작.
3. D1/D2/D3에서 rendering, keyboard/focus, localStorage, clipboard/manual fallback이 PASS 또는 Sean-approved CONDITIONAL PASS.
4. 모든 platform에서 share text가 spoiler-free이고 `Daily Loop Puzzle #YYYY-MM-DD` 형식 유지.
5. permission denied, unsupported API, offline/no-network limitation이 crash/silent fail로 이어지지 않음.
6. public deploy/contact/analytics/payment/account/data scope는 계속 잠금.

Public launch GO로 바꾸려면 위 pass 외에도 별도의 public deploy/channel/data approval packet이 필요하다.

## 9. Sean 승인 필요 / 승인 전 금지 구분

### Internal prep completed now

- Korean real-device QA request matrix 작성.
- localhost-only helper script 작성 및 실행 확인.
- observation template 생성 확인.
- `npm test`, `npm run build`, `npm run lint`, `npm run smoke:metadata`, `npm audit --audit-level=moderate` PASS 확인.
- 외부 action 없음.

### Sean approval needed before execution

- iOS/Android/desktop 실제 기기/브라우저 QA 실행.
- 같은 Mac이 아닌 모바일에서 접근하기 위한 same-network URL, `--host 0.0.0.0`, local IP, router/firewall 변경.
- screen recording/screenshot evidence를 Sean 기기에서 수집.
- share sheet를 실제 OS에서 열기. 단, 승인 후에도 외부 앱 전송은 하지 않고 cancel한다.

### Still prohibited without separate approval

- public deploy, staging/public URL, tunnel, external device farm.
- Product Hunt/HN/Reddit/X/LinkedIn/Tistory/Discord/Slack/community posting.
- customer/friend/tester DM/email/comment/form request.
- analytics, ads, payment, waitlist, auth, backend, external API, account/credential/spend changes.
- real user/customer data collection.

## 10. Reusable Sean approval request wording — 발송하지 않음

아래 문구는 Sean에게 보낼 수 있는 초안이다. 이 task에서는 발송하지 않았다.

```text
Sean, Daily Loop Puzzle은 현재 localhost 기준 npm test/build/lint/PWA metadata smoke/audit와 REV-QA-044 share/clipboard/manual fallback branch가 모두 PASS입니다. 다만 public launch 전에 실제 iOS Safari, Android Chrome, Desktop Chrome/Safari/Firefox에서 OS share sheet, clipboard permission, manual copy, touch behavior, localStorage persistence, reduced-motion/a11y, offline/no-network expectation을 확인해야 합니다.

승인 요청: 외부 배포, tunnel/public URL, domain, analytics, ads, payment, customer/community contact, Slack/DM/email/comment/form 발송, account/credential 변경, real user data 수집은 계속 금지한 상태로, 실제 기기/브라우저 QA만 진행해도 될까요?

승인되면 로컬/내부 범위에서 `docs/daily-loop-puzzle/real-device-qa-request-matrix-REV-PUZZLE-051.md`의 M1/M2/D1/D2/D3 matrix를 실행하고, PASS/FAIL evidence와 launch blocker만 정리하겠습니다. 승인 전에는 어떤 외부 공개나 연락도 하지 않습니다.
```

## 11. 산출물

- Matrix 문서:

```text
/Users/mac_agent/Documents/04_Projects/daily-loop-puzzle/docs/daily-loop-puzzle/real-device-qa-request-matrix-REV-PUZZLE-051.md
```

- Helper script:

```text
/Users/mac_agent/Documents/04_Projects/daily-loop-puzzle/scripts/prepare-real-device-qa-localhost.mjs
```

- Observation template generated by helper:

```text
/Users/mac_agent/Documents/04_Projects/daily-loop-puzzle/docs/daily-loop-puzzle/manual-qa-evidence/REV-PUZZLE-051/device-observations-template.md
```
