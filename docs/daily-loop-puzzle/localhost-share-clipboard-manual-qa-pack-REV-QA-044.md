# REV-QA-044 — Daily Loop Puzzle localhost share/clipboard/manual QA pack

작성 시각: 2026-06-01 16:08:02 EDT
작성자: qaengineer
프로젝트 경로: `/Users/mac_agent/Documents/04_Projects/daily-loop-puzzle`
상태: internal/localhost-only QA pack 완료. 외부 배포, 공개 URL 공유, 고객/커뮤니티 contact, 계정/credential 변경, analytics/ads/payments 추가, 개인정보 수집, remote push는 하지 않았다.

## 0. 최종 판정

- Internal localhost share/copy/manual fallback QA: GO / PASS.
- Public launch / external deployment: NO-GO 유지.
- 이유: Web Share/clipboard/manual fallback의 코드 branch와 localhost headless desktop browser smoke는 통과했지만, 실제 iOS Safari / Android Chrome / Desktop Chrome·Safari·Firefox의 OS share sheet, trusted user gesture, permission prompt, real touch, paste 결과는 아직 approval/device-dependent blocker다.

## 1. 이번에 확인한 기준 문서와 파일

### Revenue OS / Obsidian 기준

- `/Users/mac_agent/Documents/01_Knowledge/sean-s_wiki/10_Wiki/🛠️ Projects/revenue_os_v1.md`
  - Sean 승인 전 외부 공개, 고객 연락, 유료 도구 결제/가입, 계정 설정 변경 금지.
  - Daily Loop Puzzle은 계속 1순위 후보지만 외부 launch는 잠금 상태.
- `/Users/mac_agent/Documents/01_Knowledge/sean-s_wiki/10_Wiki/🛠️ Projects/revenue_os_latest_artifacts_synthesis_2026-06-01.md`
  - 다음 internal-safe queue로 `Daily Loop Puzzle localhost share/clipboard/manual fallback QA`를 지정.
  - real device share/clipboard/touch QA 전 외부 launch NO-GO.

### Repository 파일

- `README.md`
  - internal local validation only.
  - no account/login/backend/analytics/ads/payments/external runtime API calls.
  - real iOS Safari, Android Chrome, Desktop Chrome/Safari/Firefox checks required before external launch.
  - Web Share/clipboard unit tests are mocked branch tests, not OS-level proof.
- `src/lib/share.ts`
  - `navigator.share({ text })` success 시 `shared` 반환.
  - Web Share가 reject되면 clipboard fallback을 시도.
  - clipboard API가 없으면 `Clipboard copy is unavailable` 에러를 던져 UI manual-copy fallback으로 연결.
- `src/App.tsx`
  - `handleShare()`가 `shareOrCopy(shareText)` 결과에 따라 `messages.result.shared` 또는 `messages.result.copied`를 보여준다.
  - 에러 시 `messages.result.copyFailed`를 보여준다.
  - `ResultCard`에 spoiler-free share text `<pre aria-label="spoiler-free share text">`가 항상 표시된다.
- `src/components/ResultCard.tsx`
  - `결과 공유/복사` 버튼, share status, manual copy용 `<pre>`가 한 카드 안에 존재한다.
- `src/lib/share.test.ts`
  - Web Share success, clipboard fallback, Web Share reject → clipboard fallback, clipboard reject, share/clipboard unavailable branch 7개 test.
- `src/App.test.tsx`
  - onboarding/demo/language/replay flow 5개 test.
- `docs/daily-loop-puzzle/replay-share-copy-hardening-REV-PUZZLE-038.md`
  - 이전 hardening에서 share/copy branch가 자동 테스트로 강화됨.
- `docs/daily-loop-puzzle/prelaunch-device-qa-and-approval-checklist-REV-PUZZLE-027.md`
  - public launch 전 실기기 matrix와 pass rule 정의.

## 2. Local environment / browser path

Working directory:

```text
/Users/mac_agent/Documents/04_Projects/daily-loop-puzzle
```

Node/npm/package 상태 command:

```bash
pwd && node --version && npm --version && test -f package-lock.json && echo 'package-lock=yes' || echo 'package-lock=no' && test -d node_modules && echo 'node_modules=yes' || echo 'node_modules=no'
```

결과:

```text
/Users/mac_agent/Documents/04_Projects/daily-loop-puzzle
v22.22.3
10.9.8
package-lock=yes
node_modules=yes
```

Installed desktop browser app check command:

```bash
for app in "Google Chrome" Safari Firefox; do p="/Applications/$app.app"; if [ -d "$p" ]; then echo "APP_EXISTS $app"; defaults read "$p/Contents/Info" CFBundleShortVersionString 2>/dev/null || true; defaults read "$p/Contents/Info" CFBundleVersion 2>/dev/null || true; else echo "APP_MISSING $app"; fi; done
```

결과:

```text
APP_MISSING Google Chrome
APP_EXISTS Safari
26.5
21624.2.5.11.4
APP_MISSING Firefox
```

Localhost browser smoke는 Hermes browser tool의 headless Chromium에서 수행했다.

Browser runtime evidence:

```json
{
  "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/149.0.0.0 Safari/537.36",
  "platform": "MacIntel",
  "hasShare": true,
  "hasCanShare": true,
  "hasClipboardWriteText": true,
  "isSecureContext": true,
  "innerWidth": 1280,
  "innerHeight": 577,
  "url": "http://127.0.0.1:5173/",
  "lang": "ko"
}
```

해석:

- `http://127.0.0.1:5173/`는 secure context로 취급되어 `navigator.share`와 `navigator.clipboard.writeText`가 노출된다.
- 이 smoke는 desktop headless Chromium만 증명한다. Safari 26.5는 설치 확인만 했고, 이번 pack에서 OS share sheet를 열거나 외부 앱으로 공유하지 않았다.
- Chrome/Firefox 앱은 `/Applications`에 없어 실제 desktop Chrome/Firefox app QA는 이번 환경에서 blocker다.

## 3. Localhost server / HTTP smoke

Server command:

```bash
npm run dev -- --host 127.0.0.1
```

HTTP smoke command:

```bash
python3 - <<'PY'
import urllib.request
url='http://127.0.0.1:5173/'
try:
    with urllib.request.urlopen(url, timeout=5) as r:
        body=r.read().decode('utf-8', 'replace')
        print('url', url)
        print('status', r.status)
        print('content_type', r.headers.get('content-type'))
        print('contains_root', 'id="root"' in body)
        print('contains_title', 'Daily Loop Puzzle' in body)
except Exception as e:
    print(type(e).__name__, str(e))
    raise
PY
```

결과:

```text
url http://127.0.0.1:5173/
status 200
content_type text/html
contains_root True
contains_title True
```

## 4. Share/copy/manual fallback localhost smoke

주의: 실제 외부 공유를 하지 않기 위해 OS share sheet를 목적지까지 진행하지 않았다. 대신 `navigator.share`와 `navigator.clipboard.writeText`를 safe stub으로 교체한 뒤, 앱 UI의 `결과 공유/복사` 버튼을 통해 branch를 검증했다.

공통 사전 조건:

- `localStorage`에 synthetic today result를 주입해 result screen을 열었다.
- Synthetic result는 실제 사용자 데이터가 아니다.
- Result view에서 manual-copy `<pre aria-label="spoiler-free share text">`가 표시됨을 확인했다.

Synthetic share text:

```text
Daily Loop Puzzle #2026-06-01
✅ 3/6 moves · 880점
🟩🟩⬜⬜
⬜🟩⬜⬜
⬜⬜⬜⬜
⬜⬜⬜⬜
```

### 4.1 Web Share success branch

Stub:

```js
Object.defineProperty(navigator, 'share', {
  configurable: true,
  value: async (payload) => { window.__lastSharePayload = payload; return undefined; }
});
Object.defineProperty(navigator, 'clipboard', {
  configurable: true,
  value: { writeText: async (text) => { window.__lastClipboardText = text; return undefined; } }
});
```

Observed result:

```json
{
  "lastClipboardText": null,
  "lastSharePayload": {
    "text": "Daily Loop Puzzle #2026-06-01\n✅ 3/6 moves · 880점\n🟩🟩⬜⬜\n⬜🟩⬜⬜\n⬜⬜⬜⬜\n⬜⬜⬜⬜"
  },
  "status": ["공유 창을 열었습니다."]
}
```

판정: PASS. UI는 Web Share success를 `공유 창을 열었습니다.`로 표시한다.

### 4.2 Web Share reject → clipboard fallback branch

Stub:

```js
Object.defineProperty(navigator, 'share', {
  configurable: true,
  value: async (payload) => { window.__lastSharePayload = payload; throw new Error('stub share rejected'); }
});
Object.defineProperty(navigator, 'clipboard', {
  configurable: true,
  value: { writeText: async (text) => { window.__lastClipboardText = text; return undefined; } }
});
```

Observed result:

```json
{
  "lastClipboardText": "Daily Loop Puzzle #2026-06-01\n✅ 3/6 moves · 880점\n🟩🟩⬜⬜\n⬜🟩⬜⬜\n⬜⬜⬜⬜\n⬜⬜⬜⬜",
  "lastSharePayload": {
    "text": "Daily Loop Puzzle #2026-06-01\n✅ 3/6 moves · 880점\n🟩🟩⬜⬜\n⬜🟩⬜⬜\n⬜⬜⬜⬜\n⬜⬜⬜⬜"
  },
  "status": ["결과를 클립보드에 복사했습니다."]
}
```

판정: PASS. `navigator.share`가 reject되어도 clipboard fallback이 실행되고 status가 copy success로 바뀐다.

### 4.3 share/clipboard unavailable → manual-copy fallback branch

Stub:

```js
Object.defineProperty(navigator, 'share', { configurable: true, value: undefined });
Object.defineProperty(navigator, 'clipboard', { configurable: true, value: undefined });
```

Observed result:

```json
{
  "status": ["공유/복사에 실패했습니다. 아래 텍스트를 직접 복사해주세요."],
  "preText": "Daily Loop Puzzle #2026-06-01\n✅ 3/6 moves · 880점\n🟩🟩⬜⬜\n⬜🟩⬜⬜\n⬜⬜⬜⬜\n⬜⬜⬜⬜",
  "errors": []
}
```

판정: PASS. 자동 공유/복사가 불가해도 사용자가 직접 복사할 수 있는 spoiler-free text가 화면에 남는다.

### 4.4 Console error check

Initial navigation console:

```text
console_messages: []
js_errors: []
total_messages: 0
total_errors: 0
```

Share/copy/manual branch smoke 후 console:

```text
console_messages: []
js_errors: []
total_messages: 0
total_errors: 0
```

판정: PASS. Localhost branch smoke 중 JS console error 없음.

## 5. Touch/mobile-width feasibility

정적 CSS 근거:

- `.app-shell { width: min(100%, 480px); padding: 20px 16px 32px; }`
- `button { min-height: 44px; }`
- `.cell { min-height: 70px; }`
- `@media (max-width: 380px)`에서 `.app-shell` padding을 12px로 줄이고 `.cell { min-height: 60px; }` 유지.
- `pre { overflow-x: auto; white-space: pre-wrap; }`라서 share text가 result card 밖으로 강제 overflow될 가능성을 낮춘다.

Localhost headless Chromium smoke 범위:

- Viewport: `1280x577` desktop headless only.
- Result screen과 manual-copy `<pre>` 표시 확인.
- Share/copy button click branch 확인.

판정:

- Desktop headless 기준 기능 branch: PASS.
- Mobile-width feasibility: CSS상 360–390px phone width에서 44px+ touch target 기준을 의도적으로 만족하도록 설계되어 있다.
- 하지만 이번 환경에서 real mobile viewport/touch event를 실제 기기로 검증하지 못했으므로 public launch pass로 승격하지 않는다.

Exact blocker:

- Approval gate상 외부 device farm/cloud browser 사용 금지.
- `/Applications`에 Google Chrome/Firefox app이 없어 desktop Chrome/Firefox native app QA 불가.
- iOS/Android 실기기 접근 및 같은 네트워크 preview 노출은 별도 승인/기기 의존이다.
- Hermes browser tool의 headless Chromium은 OS share sheet, pasteboard permission prompt, finger tap miss, iOS Safari long-press/select behavior를 증명하지 못한다.

## 6. Required local verification commands

### 6.1 `npm test`

Command:

```bash
npm test
```

Result: PASS, exit code 0.

```text
> daily-loop-puzzle@0.0.0 test
> vitest run --environment jsdom

 RUN  v4.1.7 /Users/mac_agent/Documents/04_Projects/daily-loop-puzzle

 ✓ src/lib/dateSeed.test.ts (3 tests) 2ms
 ✓ src/lib/onboarding.test.ts (3 tests) 2ms
 ✓ src/lib/puzzle.test.ts (5 tests) 5ms
 ✓ src/lib/storage.test.ts (6 tests) 12ms
 ✓ src/i18n/locales.test.ts (2 tests) 3ms
 ✓ src/lib/share.test.ts (7 tests) 4ms
 ✓ src/App.test.tsx (5 tests) 141ms

 Test Files  7 passed (7)
      Tests  31 passed (31)
   Start at  16:04:47
   Duration  1.15s (transform 308ms, setup 0ms, import 540ms, tests 168ms, environment 5.35s)
```

### 6.2 `npm run build`

Command:

```bash
npm run build
```

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

✓ built in 78ms
```

### 6.3 `npm run lint`

Command:

```bash
npm run lint
```

Result: PASS, exit code 0.

```text
> daily-loop-puzzle@0.0.0 lint
> eslint .
```

### 6.4 `npm run smoke:metadata`

Command:

```bash
npm run smoke:metadata
```

Result: PASS, exit code 0.

```text
> daily-loop-puzzle@0.0.0 smoke:metadata
> node scripts/check-pwa-metadata.mjs

PWA metadata smoke passed: built index and manifest use local launch metadata only.
```

### 6.5 `npm audit --audit-level=moderate`

Command:

```bash
npm audit --audit-level=moderate
```

Result: PASS, exit code 0.

```text
found 0 vulnerabilities
```

## 7. Remaining real-device / approval-dependent checklist

아래 항목은 이번 REV-QA-044에서 완료하지 않았고, public launch 전 별도 승인/기기가 필요하다.

| Area | Status | 이유 |
| --- | --- | --- |
| iOS Safari real device | BLOCKED / approval-device-dependent | 실제 iPhone, Safari share sheet, clipboard permission, long-press/manual copy, finger tap 검증 필요 |
| Android Chrome real device | BLOCKED / approval-device-dependent | 실제 Android, Chrome Web Share/clipboard/paste fallback, touch miss 검증 필요 |
| Desktop Chrome native app | BLOCKED / environment-dependent | `/Applications/Google Chrome.app` 없음 |
| Desktop Firefox native app | BLOCKED / environment-dependent | `/Applications/Firefox.app` 없음 |
| Desktop Safari 26.5 full manual QA | BLOCKED / manual-device-dependent | Safari app 설치는 확인했지만 이번 task에서 OS share sheet/clipboard prompt를 실제로 진행하지 않음 |
| External deploy/public URL | NOT RUN / approval-gated | Sean 승인 전 금지 |
| Analytics/payment/account/community channel | NOT RUN / approval-gated | Sean 승인 전 금지 |

## 8. Release recommendation

- Internal localhost QA pack: GO.
- External/public launch: HOLD / NO-GO.
- 다음 Sean 승인 전 내부-safe 권장 작업:
  1. REV-QA-044 결과를 Sean launch decision packet에 링크.
  2. 승인 후 실제 iOS Safari + Android Chrome + Desktop Safari/Chrome/Firefox matrix를 REV-PUZZLE-027 script대로 실행.
  3. 실기기에서 Web Share가 실패하더라도 manual-copy text가 즉시 보이고 직접 복사 가능한지 evidence screenshot/screen recording으로 확보.

## 9. 산출물 위치

이 QA pack 파일:

```text
/Users/mac_agent/Documents/04_Projects/daily-loop-puzzle/docs/daily-loop-puzzle/localhost-share-clipboard-manual-qa-pack-REV-QA-044.md
```
