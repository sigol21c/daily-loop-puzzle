# REV-PUZZLE-027 — Daily Loop Puzzle pre-launch device QA 및 Sean 승인 체크리스트

작성일: 2026-06-01 12:03 EDT
작성자: qaengineer
프로젝트 경로: `/Users/mac_agent/Documents/04_Projects/daily-loop-puzzle`
Revenue OS hub: `/Users/mac_agent/Documents/01_Knowledge/sean-s_wiki/10_Wiki/🛠️ Projects/revenue_os_v1.md`
상태: 내부/local-only QA 실행 스크립트. Sean 승인 전 외부 배포/공개/고객 접촉 금지.

## 0. 최종 gate 판정

- 로컬/internal RC 기준: GO 유지.
- Public launch / external deploy 기준: NO-GO.
- public launch 전 남은 필수 gap: 실제 iOS Safari, Android Chrome, desktop Chrome/Safari/Firefox에서 real user gesture 기반 touch/share/clipboard/PWA/manual accessibility QA를 완료하고 Sean이 명시 승인해야 한다.
- 이 문서는 “실제 디바이스에서 무엇을 어떻게 확인할지”를 실행 가능한 스크립트로 고정한다. 이 문서 작성 중 배포, 로그인, 폼 제출, DM/email/comment 발송, analytics/ads/payment 설정, 계정/credential 변경, remote push, 실사용자 데이터 수집은 하지 않았다.

## 1. 이번 문서 작성 시 확인한 근거 파일

- 루트 README: `/Users/mac_agent/Documents/04_Projects/daily-loop-puzzle/README.md`
  - 현재 Vite template 내용이 남아 있어 public-facing 제품 설명으로는 부적합하다. 단, 이번 task 범위는 documentation QA script 작성이므로 production behavior는 변경하지 않았다.
- package scripts: `/Users/mac_agent/Documents/04_Projects/daily-loop-puzzle/package.json`
  - 사용 가능 scripts: `dev`, `build`, `lint`, `test`, `smoke:metadata`, `preview`.
- 기존 QA evidence: `docs/daily-loop-puzzle/qa-checklist.md`
  - automated/browser smoke 기준으로 clipboard real user activation과 physical mobile touch 검증이 미완료로 남아 있다.
- RC audit: `docs/daily-loop-puzzle/local-release-candidate-readiness-REV-PUZZLE-026.md`
  - local/internal RC는 GO, external public launch는 Sean approval + real mobile/share/clipboard manual QA 전 NO-GO.
- launch draft: `docs/daily-loop-puzzle/launch-assets.md`
  - unpublished draft이며 Sean 승인 전 public copy/posting/channel action 금지.
- onboarding demo spec: `docs/daily-loop-puzzle/onboarding-demo-spec.md`
  - first-run 20초 demo, skip/replay/help flow, 44px+ touch target, accessibility requirements를 정의한다.
- i18n/global plan: `docs/daily-loop-puzzle/i18n-global-plan.md`
  - English-first + Korean fallback, public locale/SEO/channel 노출은 approval-gated.
- PWA metadata files: `index.html`, `public/manifest.webmanifest`, `scripts/check-pwa-metadata.mjs`
  - title/description/theme-color/apple mobile meta/manifest/local icon smoke 범위 확인.

## 2. Public launch 전 즉시 실행해야 하는 local command gate

아래 command는 Sean이 external deploy/public launch를 승인하더라도, 실제 deploy 직전에 같은 working directory에서 다시 실행한다.

Working directory:

```bash
cd /Users/mac_agent/Documents/04_Projects/daily-loop-puzzle
```

필수 gate:

```bash
pwd
npm test
npm run build
npm run smoke:metadata
npm run lint
npm audit --audit-level=high
```

한 줄로 실행할 때:

```bash
pwd && npm test && npm run build && npm run smoke:metadata && npm run lint && npm audit --audit-level=high
```

선택 manual preview gate, 외부 공유 금지:

```bash
npm run preview -- --host 127.0.0.1
```

주의:

- `npm run preview -- --host 0.0.0.0`, tunneling, public URL 공유, Vercel/Netlify/Cloudflare/GitHub Pages deploy는 Sean 승인 전 금지.
- 새 dependency 설치, Playwright browser download, analytics/payment SDK 추가, account setting 변경은 이 gate에 포함하지 않는다. 필요하면 별도 승인 task로 분리한다.

## 3. 이번 REV-PUZZLE-027에서 실제 실행한 local verification evidence

실행 시각: 2026-06-01 12:03 EDT
Working directory: `/Users/mac_agent/Documents/04_Projects/daily-loop-puzzle`
Command:

```bash
pwd && npm test && npm run build && npm run smoke:metadata && npm run lint && npm audit --audit-level=high
```

Result: PASS, exit code 0.

핵심 output:

```text
/Users/mac_agent/Documents/04_Projects/daily-loop-puzzle

> daily-loop-puzzle@0.0.0 test
> vitest run --environment jsdom

 RUN  v4.1.7 /Users/mac_agent/Documents/04_Projects/daily-loop-puzzle

 ✓ src/lib/onboarding.test.ts (3 tests) 2ms
 ✓ src/lib/puzzle.test.ts (5 tests) 5ms
 ✓ src/lib/dateSeed.test.ts (3 tests) 3ms
 ✓ src/lib/storage.test.ts (6 tests) 11ms
 ✓ src/i18n/locales.test.ts (2 tests) 3ms
 ✓ src/lib/share.test.ts (5 tests) 4ms
 ✓ src/App.test.tsx (4 tests) 131ms

 Test Files  7 passed (7)
      Tests  28 passed (28)
   Start at  12:03:13
   Duration  1.21s (transform 275ms, setup 0ms, import 476ms, tests 158ms, environment 5.56s)

> daily-loop-puzzle@0.0.0 build
> tsc -b && vite build

vite v8.0.14 building client environment for production...
✓ 27 modules transformed.
dist/index.html                   1.03 kB │ gzip:  0.49 kB
dist/assets/index-BzyV979Y.css    5.43 kB │ gzip:  1.90 kB
dist/assets/index-DppVjz5-.js   215.85 kB │ gzip: 68.04 kB
✓ built in 77ms

> daily-loop-puzzle@0.0.0 smoke:metadata
> node scripts/check-pwa-metadata.mjs

PWA metadata smoke passed: built index and manifest use local launch metadata only.

> daily-loop-puzzle@0.0.0 lint
> eslint .

found 0 vulnerabilities
```

해석:

- `package-lock.json`이 존재하므로 `npm audit --audit-level=high`를 실행했다.
- 모든 available local verification은 통과했다.
- 이번 실행은 local command만 사용했고 외부 배포/계정/고객 접촉/analytics/payment 작업은 하지 않았다.

## 4. Manual device/browser test matrix

각 row는 실제 기기 또는 해당 브라우저가 설치된 실제 desktop에서 실행한다. Browser devtools responsive mode는 보조 evidence로만 사용하고, iOS/Android share/clipboard 최종 pass를 대체하지 않는다.

| ID | Platform / browser | 필수 기기 조건 | Primary checks | Pass 기준 | Evidence |
| --- | --- | --- | --- | --- | --- |
| M1 | iOS Safari | 실제 iPhone, iOS 최신 또는 Sean 보유 기기, portrait 390x844 또는 유사 | 첫 load, onboarding/demo, Today puzzle, 6 tile taps, result, Share Sheet 또는 clipboard fallback, Add to Home Screen metadata | horizontal overflow 없음, 모든 tap target 정상, result 저장, share/manual copy text visible, 홈 화면 title/icon 확인 | screen recording + screenshots S1-S8 |
| M2 | Android Chrome | 실제 Android phone, Chrome 최신, portrait 360x800 또는 유사 | 첫 load, onboarding/demo, Today puzzle, 6 tile taps, Web Share/clipboard, install prompt/shortcut metadata | iOS와 동일. Chrome share/copy가 trusted tap에서 성공하거나 실패 시 manual fallback이 명확해야 함 | screen recording + screenshots S1-S8 |
| D1 | Desktop Chrome | macOS/Windows Chrome 최신 | keyboard/mouse flow, copy fallback, responsive 390x844 devtools 보조 확인, console errors | console error 0, mouse/touch emulation에서 playable, clipboard permission path 기록 | screenshots S1-S6 + console log |
| D2 | Desktop Safari | macOS Safari 최신 | Safari rendering, keyboard focus, copy permission/fallback, Add to Dock/PWA metadata 가능성 확인 | layout 깨짐 없음, focus visible, share/copy/fallback 상태 기록 | screenshots S1-S6 + console log |
| D3 | Desktop Firefox | Firefox 최신 | rendering, localStorage, clipboard fallback, keyboard navigation | layout 깨짐 없음, unsupported PWA/share path에서도 manual copy 가능 | screenshots S1-S6 + console log |

Minimum public-launch pass rule:

- M1 + M2 + D1 + D2 + D3 모두 pass해야 한다.
- M1 또는 M2에서 Web Share/clipboard가 실패하더라도, fallback text가 즉시 보이고 사용자가 long-press/select/copy 가능한 상태면 “conditional pass”로 둘 수 있다. 단, share CTA가 silent fail하거나 text가 사라지면 launch blocker다.
- desktop Firefox에서 PWA install prompt가 없거나 제한적이어도 blocker는 아니다. metadata와 local-only play가 정상이어야 한다.

## 5. 공통 manual QA setup

테스트 시작 전:

1. 최신 local build를 만든다.

```bash
cd /Users/mac_agent/Documents/04_Projects/daily-loop-puzzle
pwd && npm test && npm run build && npm run smoke:metadata && npm run lint && npm audit --audit-level=high
npm run preview -- --host 127.0.0.1
```

2. 외부 deploy 없이 같은 기기에서 `http://127.0.0.1:4173/`로 접속한다.
   - 모바일 실기기에서 로컬 preview 접근이 필요하면 같은 네트워크 public host/tunnel이 필요할 수 있다. 이것은 “외부 접근/네트워크 노출”이 될 수 있으므로 Sean 승인 전 임의로 실행하지 않는다.
   - 승인 전에는 모바일 실기기를 Mac의 Safari Web Inspector 또는 직접 로컬 파일 접근으로 테스트할 수 있는지 먼저 확인한다. 네트워크 노출이 필요하면 별도 승인을 받는다.
3. 각 browser에서 테스트 전 site data/localStorage를 초기화한다.
4. 테스트 중 실제 개인정보, 계정, analytics dashboard, external account screen은 열지 않는다.
5. 결과 기록은 이 문서의 pass/fail template에 복사한다.

## 6. Core flow manual script

각 browser/device에서 아래를 순서대로 수행한다.

### 6.1 First load / onboarding

1. 새 profile/incognito 또는 site data cleared 상태로 접속한다.
2. Home 화면이 3초 안에 이해 가능한지 확인한다.
3. first-run demo CTA가 보이면 `Try 20-second demo` 또는 한국어 equivalent를 누른다.
4. demo에서 `2`, `5` 순서로 탭한다.
5. demo success 후 Today puzzle 진입 CTA를 누른다.
6. Skip/replay/help가 있는 경우, skip이 daily result를 만들지 않는지 확인한다.

Pass:

- onboarding/demo 조작이 오늘 기록에 섞이지 않는다.
- demo tiles/buttons 높이가 최소 44px 이상으로 보이고 오탭 위험이 낮다.
- 화면에 horizontal scroll, 잘린 CTA, 겹친 text가 없다.

Fail/blocker:

- demo 완료 후 Today puzzle로 갈 수 없다.
- skip이 puzzle result를 오염시킨다.
- 360–390px 화면에서 CTA가 잘려 핵심 flow가 막힌다.

### 6.2 Today puzzle touch/mouse flow

1. Today 화면을 연다.
2. target, selected total, moves left/status가 보이는지 확인한다.
3. 타일 1개를 탭하고 selected total / selected state / move count가 즉시 변하는지 확인한다.
4. 인접하지 않은 타일을 시도하여 connected rule 안내가 이해 가능한지 확인한다.
5. 6 moves 이내에 성공 또는 실패 result로 도달한다.
6. result가 localStorage에 저장되고 reload 후 Today complete / Stats에 반영되는지 확인한다.

Pass:

- 모든 tile이 실제 finger tap으로 작동한다.
- selected state가 color-only가 아니라 border/text/aria state 등으로 보조된다.
- result 저장 후 reload해도 오늘 공식 기록이 유지된다.
- practice/replay가 공식 기록을 덮어쓰지 않는다.

Fail/blocker:

- iOS/Android에서 tile tap이 간헐적으로 누락되어 puzzle이 사실상 플레이 불가.
- result 저장 실패 또는 reload 후 기록 소실.
- 같은 날 공식 기록이 의도 없이 overwrite됨.

### 6.3 Stats / How / Help

1. Stats 화면을 연다.
2. Played, Solved, Streak, Best가 result와 일치하는지 확인한다.
3. How 화면 또는 Help overlay를 연다.
4. rule이 현재 구현 mechanic, 즉 “connected tiles to match target”만 설명하고 literal loop/graph mechanic을 과장하지 않는지 확인한다.
5. Help overlay가 있으면 close 후 puzzle state/focus가 유지되는지 확인한다.

Pass:

- Stats numbers가 result와 일치한다.
- How/Help는 answer spoiler를 노출하지 않는다.
- keyboard/focus navigation이 desktop에서 막히지 않는다.

Fail/blocker:

- Stats가 틀린 값을 표시하거나 localStorage corruption을 만든다.
- How/Help가 오늘 정답을 노출한다.
- dialog close 불가 또는 focus trap으로 사용자가 갇힌다.

## 7. Web Share / clipboard / manual-copy checks

이 제품의 성장 loop이므로 public launch 전 가장 엄격하게 확인한다.

### 7.1 iOS Safari

1. result 화면에서 share/copy CTA를 실제 finger tap으로 누른다.
2. iOS Share Sheet가 열리면 cancel만 하고 외부 앱으로 전송하지 않는다.
3. Share Sheet가 열리지 않으면 clipboard copy success toast 또는 fallback message를 확인한다.
4. fallback이면 spoiler-free share text block이 계속 visible/selectable인지 확인한다.
5. text 첫 줄이 `Daily Loop Puzzle #YYYY-MM-DD` 형식인지 확인한다.
6. text에 target solution values가 직접 노출되지 않는지 확인한다.

Pass:

- Share Sheet 또는 clipboard success 또는 manual-copy fallback 중 하나가 명확히 동작한다.
- 실패 메시지가 사용자를 막지 않고 직접 복사할 text를 보여준다.
- 외부 앱으로 실제 전송하지 않는다.

Fail/blocker:

- tap 후 아무 반응 없음.
- failure message만 보이고 복사할 text가 없음.
- share text가 target answer/solution values를 스포일러로 노출.

### 7.2 Android Chrome

동일 script를 수행하되, Android share sheet / clipboard permission toast / fallback text를 구분해 기록한다.

Pass/Fail 기준은 iOS와 동일하다.

### 7.3 Desktop Chrome/Safari/Firefox

1. result 화면에서 share/copy CTA를 mouse click 또는 keyboard activation으로 실행한다.
2. `navigator.share` 미지원이면 clipboard 또는 manual fallback이 동작하는지 기록한다.
3. clipboard가 성공했다면 새 local text field 또는 browser address bar가 아닌 안전한 local scratch note에 paste하여 text 형식을 확인한다. 외부 앱/DM/email에 붙여넣지 않는다.
4. Firefox에서 clipboard 권한 제한이 있으면 manual fallback이 visible인지 확인한다.

Pass:

- desktop에서도 share CTA가 graceful degradation한다.
- permission denied가 launch-breaking crash로 이어지지 않는다.

## 8. Touch target / responsive layout checks

최소 viewport/device:

- 390x844: iPhone 12/13/14급 기준.
- 375x667: 작은 iPhone SE급 기준.
- 360x800: Android narrow 기준.
- Desktop 1280px 이상: centered app shell 기준.

체크 항목:

| 항목 | Pass 기준 | Evidence |
| --- | --- | --- |
| App shell width | 모바일에서 horizontal overflow 없음 | screenshot S1/S2 |
| Nav buttons | 높이 44px 이상, 한 손 tap 가능 | screenshot with ruler 또는 visual note |
| Puzzle tiles | 각 tile 44x44px 이상, 실제 finger tap 성공 | screen recording |
| Primary CTA | fold 안에서 보이거나 자연스럽게 scroll 가능 | screenshot |
| Result share CTA | result 도달 후 바로 식별 가능 | screenshot S4 |
| Text readability | body text 14–16px 이상으로 보이고 줄겹침 없음 | screenshot |
| Korean/English mix | 의도된 i18n fallback 외 혼란스러운 혼합 없음 | note |
| Landscape | blocker는 아니지만 core controls가 완전히 사라지면 기록 | screenshot optional |

Launch blocker:

- 360–390px portrait에서 board나 CTA가 잘려 play/share가 불가능.
- touch target이 너무 작아 연속 오탭이 발생.
- selected/moves/status가 fold 밖으로 밀려 게임 상태를 이해할 수 없음.

## 9. PWA install metadata checks

자동 smoke가 확인하는 것:

- `index.html`: `<html lang="en">`, title, description meta, theme-color, apple mobile meta, manifest link, local apple touch icon link.
- `manifest.webmanifest`: `name`, `short_name`, `start_url`, `scope`, `display`, `theme_color`, `background_color`, local icons.
- external src/href references 없음.

Manual device에서 확인할 것:

| Platform | Steps | Pass 기준 |
| --- | --- | --- |
| iOS Safari | Share menu → Add to Home Screen flow까지만 열고 cancel | title이 `Daily Loop` 또는 승인된 title로 보임, icon이 깨지지 않음, 실제 추가는 Sean 승인 없으면 하지 않음 |
| Android Chrome | Install app/Add to home screen prompt 또는 menu 확인 후 cancel | name/short_name/icon/theme color가 깨지지 않음, 실제 install은 내부 승인 범위에서만 진행 |
| Desktop Chrome | install icon/menu 확인 가능하면 cancel | manifest가 installable로 인식되거나, 미인식 사유를 기록 |
| Desktop Safari/Firefox | PWA install 지원 제한 기록 | 지원 부재 자체는 blocker 아님 |

Launch blocker:

- manifest JSON parse failure.
- icon path 404.
- app name/title이 template 또는 엉뚱한 값으로 보임.
- metadata에 external tracking/analytics/payment reference 포함.

## 10. Accessibility / readability checks

Manual smoke 범위:

1. Keyboard-only desktop flow:
   - `Tab`, `Shift+Tab`, `Enter`, `Space`로 nav, CTA, tiles, share CTA 접근 가능.
   - focus outline이 보인다.
2. Screen reader quick check, 가능 시:
   - iOS VoiceOver 또는 macOS VoiceOver로 title, target, selected, moves left, buttons가 의미 있게 읽힌다.
3. Color/contrast:
   - selected tile이 color-only가 아니라 border/state/text로 구분된다.
   - result success/fail이 emoji/color만으로 전달되지 않는다.
4. Reduced motion:
   - system reduced motion에서 animation이 과하지 않거나 gameplay를 막지 않는다.
5. Readability:
   - 360–390px에서 Korean/English labels가 잘리지 않는다.
   - “local-only/no account/no analytics” 같은 trust copy가 현재 구현 fact와 일치한다.
6. Error/fallback readability:
   - clipboard failure message가 짧고 다음 행동, 즉 직접 복사를 안내한다.

Launch blocker:

- keyboard user가 core flow를 완료할 수 없음.
- focus가 사라져 현재 위치를 알 수 없음.
- Help/dialog가 닫히지 않음.
- share failure가 사용자에게 복구 방법을 주지 않음.

## 11. Screenshots / recordings shot list

각 device/browser별 최소 evidence:

- S1: Home first-load / onboarding card.
- S2: Tutorial demo step with selected `2` 또는 success state.
- S3: Today puzzle empty state showing target, selected total, moves, 4x4 board.
- S4: Mid-solve state with selected connected tiles.
- S5: Result success 또는 failure state with score/moves.
- S6: Share text/fallback visible state, spoiler-free grid 포함.
- S7: Stats screen after reload.
- S8: How/Help screen or overlay.
- S9: PWA install/add-to-home metadata preview, cancel 전 화면. 실제 public install/share는 승인 전 금지.
- R1: iOS Safari complete flow screen recording, 60초 이하.
- R2: Android Chrome complete flow screen recording, 60초 이하.

Evidence naming convention:

```text
REV-PUZZLE-027_<platform>_<browser>_<shot-id>_<YYYYMMDD-HHMM>.<png|mp4>
```

예:

```text
REV-PUZZLE-027_ios-safari_S6_20260601-1530.png
REV-PUZZLE-027_android-chrome_R2_20260601-1545.mp4
```

저장 위치 권장:

```text
docs/daily-loop-puzzle/manual-qa-evidence/REV-PUZZLE-027/
```

주의:

- 외부 계정, 개인정보, DM/email/social app 화면, analytics/payment/admin 화면을 캡처하지 않는다.
- share sheet는 열어도 외부 전송 전 cancel한다.
- 파일이 커지면 repository commit/push 전 human review를 받는다.

## 12. Pass/fail recording template

아래 template을 각 matrix row마다 복사한다.

```markdown
### REV-PUZZLE-027 manual run — <Platform / Browser>

- Tester:
- Date/time/timezone:
- Device model:
- OS version:
- Browser version:
- App build command evidence: `npm test`, `npm run build`, `npm run smoke:metadata`, `npm run lint`, `npm audit --audit-level=high` all pass? yes/no
- URL/environment: local preview only / approved staging / other
- External actions avoided: deploy/contact/post/payment/analytics/account changes? yes/no

| Check | Result | Evidence file | Notes / exact failure |
| --- | --- | --- | --- |
| First load / Home | PASS/FAIL | S1 | |
| Onboarding demo | PASS/FAIL | S2 | |
| Today puzzle touch/mouse | PASS/FAIL | S3/S4/R | |
| Result save + reload | PASS/FAIL | S5/S7 | |
| Web Share path | PASS/FAIL/N/A | S6/R | |
| Clipboard path | PASS/FAIL/N/A | S6/R | |
| Manual-copy fallback | PASS/FAIL | S6 | |
| Touch targets / no overflow | PASS/FAIL | S1-S5 | |
| PWA metadata/install preview | PASS/FAIL/N/A | S9 | |
| Accessibility/readability smoke | PASS/FAIL | notes | |
| Console errors | PASS/FAIL | console export | |

Decision for this browser/device: PASS / CONDITIONAL PASS / FAIL
Blockers found:
Follow-up recommendations:
```

Overall release decision template:

```markdown
## REV-PUZZLE-027 overall manual QA decision

- iOS Safari: PASS/CONDITIONAL PASS/FAIL
- Android Chrome: PASS/CONDITIONAL PASS/FAIL
- Desktop Chrome: PASS/CONDITIONAL PASS/FAIL
- Desktop Safari: PASS/CONDITIONAL PASS/FAIL
- Desktop Firefox: PASS/CONDITIONAL PASS/FAIL

Critical blockers:
High issues:
Medium/low issues:
Evidence folder:

Recommendation:
- Local/internal RC: GO / NO-GO
- External public launch: GO only if Sean approval is explicitly granted; otherwise NO-GO
```

## 13. Sean approval-gated actions before public launch

Sean의 명시 승인 없이는 아래를 실행하지 않는다.

### Deploy / public access

- Vercel, Netlify, Cloudflare, GitHub Pages, personal server 등 public deploy.
- staging URL을 외부인에게 공유.
- `--host 0.0.0.0`로 LAN 노출하거나 ngrok/Cloudflare Tunnel 등 tunneling 사용.
- domain 구매/연결.

### Posting / customer/community contact

- Product Hunt, Hacker News, Reddit, X, Threads, LinkedIn, Instagram, Tistory, YouTube Shorts, Discord/Slack communities에 게시.
- 친구/테스터/고객/커뮤니티에 DM/email/comment로 테스트 요청.
- 외부 feedback form 또는 survey 배포.

### Analytics / ads / payment / data

- Google Analytics, Plausible, PostHog, Mixpanel, Amplitude, Sentry/session replay, ads pixel, email capture, waitlist, login/auth, backend/database, payment/subscription 추가.
- localStorage-only 범위를 넘어 사용자 데이터 수집/저장/분석.
- 개인정보 처리방침/동의/삭제 기준 없이 data capture 추가.

### Accounts / credentials / spending

- 외부 account 생성/설정 변경.
- credentials/API key 생성 또는 연결.
- 유료 tool/domain/ad/subscription 구매.
- app store/PWA directory/product listing 등록.

### Claims / launch copy

- “viral”, “addictive”, “best”, “secure/private guaranteed”, “brain training”, “users love it”, “available now” 같은 검증되지 않은 claim.
- 현재 v1이 full graph-loop mechanic이라고 오해될 copy.
- public traction/revenue/endorsement/press/ranking claim.
- 일본어/스페인어/포르투갈어 등 미검수 번역을 public copy로 사용.

## 14. Launch readiness rule

Public launch를 GO로 바꾸려면 아래가 모두 true여야 한다.

1. Sean이 deploy/public sharing/channel/contact/data/analytics/payment 범위를 명시 승인했다.
2. Section 2 command gate가 최신 commit/build에서 exit code 0이다.
3. M1 iOS Safari와 M2 Android Chrome에서 real touch로 core flow가 완료됐다.
4. Web Share 또는 clipboard 또는 manual-copy fallback이 실제 user gesture에서 검증됐다.
5. Desktop Chrome/Safari/Firefox에서 rendering, keyboard, localStorage, fallback이 최소 pass다.
6. PWA metadata가 smoke와 manual preview에서 template/404/external reference 없이 확인됐다.
7. 접근성/readability smoke에서 keyboard/focus/dialog/share fallback blocker가 없다.
8. launch copy가 `launch-assets.md`의 conservative claim guardrail을 따른다.
9. no analytics/no account/no backend/no payment/local-only posture가 바뀌지 않았다. 바뀌면 privacy/legal QA와 Sean 재승인이 필요하다.

현재 상태는 1, 3, 4, 5, 6의 manual device 확인이 남아 있으므로 external public launch는 계속 NO-GO다.

## 15. 권장 다음 내부-safe action

1. Sean이 실기기 QA 범위만 승인하면, 이 문서의 M1/M2/D1/D2/D3 matrix를 실제로 실행한다.
2. evidence를 `docs/daily-loop-puzzle/manual-qa-evidence/REV-PUZZLE-027/`에 저장하고 pass/fail template을 채운다.
3. blocker가 없으면 별도 approval package에서 Sean에게 public deploy scope를 요청한다.
4. blocker가 있으면 productengineer에게 정확한 재현 steps, device/browser, evidence file을 넘긴다.
