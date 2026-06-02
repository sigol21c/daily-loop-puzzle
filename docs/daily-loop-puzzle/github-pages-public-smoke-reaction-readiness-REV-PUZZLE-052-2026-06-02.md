# REV-PUZZLE-052 — Daily Loop Puzzle GitHub Pages public smoke / reaction-readiness baseline

작성 시각: 2026-06-02 08:36–08:45 EDT
작성자: qaengineer
프로젝트: `/Users/mac_agent/Documents/04_Projects/daily-loop-puzzle`
Public URL: https://sigol21c.github.io/daily-loop-puzzle/

## 0. QA 판정

- Public GitHub Pages 기본 플레이 smoke: GO with one medium PWA/base-path issue.
- Reaction-readiness baseline: GO for read-only observation only.
- Public launch/growth actions: HOLD. Product Hunt/Reddit/HN/커뮤니티 게시, 고객 contact, analytics/ads/payment/payment mock/privacy/account integration은 기존 approval gate `t_2cb47912`에 따라 계속 금지.
- 발견 이슈: `manifest.webmanifest`의 `start_url`, `scope`, `icons[].src`가 `/` 루트 기준이라 GitHub Pages subpath(`/daily-loop-puzzle/`)에서는 manifest icon URL이 404로 해석된다. 일반 웹 플레이는 정상이나 PWA/Add-to-Home/manifest 품질에는 영향이 있다.

## 1. 확인한 허브/기준 문서

### Revenue OS hub

파일: `/Users/mac_agent/Documents/01_Knowledge/sean-s_wiki/10_Wiki/🛠️ Projects/revenue_os_v1.md`

확인한 핵심 라인:

```text
166|- [[revenue_os_pivot_app_web_game_2026-05-31]]의 1순위 후보: **Daily Loop Puzzle / 매일 1판 공유형 웹 퍼즐·미니게임**
169|- 2026-06-02 Sean이 “결제 mock도 붙이지 말고 배포해. 반응을 한번 보자”라고 승인하여 **Daily Loop Puzzle은 GitHub Pages 공개 배포만 GO**로 전환됐다: https://sigol21c.github.io/daily-loop-puzzle/ . 단, Product Hunt/Reddit/HN/커뮤니티 게시, 고객 contact, analytics/ads/payment/payment mock/privacy/account integration은 계속 별도 승인 잠금이다.
174|2. Sean 승인 반영: Daily Loop Puzzle은 GitHub Pages 공개 배포만 승인/완료됨(https://sigol21c.github.io/daily-loop-puzzle/). 단, Product Hunt/Reddit/HN/커뮤니티 게시, 고객 contact, analytics/ads/payment/payment mock/privacy/account integration은 Sean이 세부 설명을 확인하고 별도 승인하기 전 계속 잠금. 즉시 후보는 reaction 관찰, 실제 기기 QA, launch-readiness hardening.
```

### 최신 approval / QA docs

- `docs/daily-loop-puzzle/sean-launch-decision-packet-REV-PUZZLE-029.md`
  - 상태: Sean이 GitHub Pages public deploy만 승인. 결제/결제 mock/광고/analytics/login/account/개인정보 수집/고객·커뮤니티 게시·contact는 추가하지 않음.
  - Public reaction-test URL: `https://sigol21c.github.io/daily-loop-puzzle/`
- `docs/daily-loop-puzzle/real-device-qa-request-matrix-REV-PUZZLE-051.md`
  - 실제 iOS/Android/Desktop device QA는 별도 승인/실행 matrix로 남아 있음.
  - 외부 게시/contact/account/payment/analytics/data 수집 금지 유지.

## 2. Local verification 결과

`package.json`에는 `verify` script가 없어서 먼저 확인 후, 사용 가능한 gate(`test`, `build`, `lint`, `smoke:metadata`, `audit`)를 실행했다.

Command:

```bash
pwd && date '+%Y-%m-%d %H:%M:%S %Z' && node --version && npm --version && (npm run verify || true) && npm test && npm run build && npm run lint && npm run smoke:metadata && npm audit --audit-level=moderate
```

Result: PASS for available gates, exit code 0. `npm run verify`는 missing script로 실패했지만 `|| true`로 기록 후 available scripts를 계속 실행했다.

Exact output:

```text
/Users/mac_agent/Documents/04_Projects/daily-loop-puzzle
2026-06-02 08:36:51 EDT
v22.22.3
10.9.8
npm error Missing script: "verify"
npm error
npm error To see a list of scripts, run:
npm error   npm run
npm error A complete log of this run can be found in: /Users/mac_agent/.hermes/profiles/qaengineer/home/.npm/_logs/2026-06-02T12_36_52_031Z-debug-0.log

> daily-loop-puzzle@0.0.0 test
> vitest run --environment jsdom


 RUN  v4.1.7 /Users/mac_agent/Documents/04_Projects/daily-loop-puzzle

 ✓ src/lib/onboarding.test.ts (3 tests) 3ms
 ✓ src/lib/dateSeed.test.ts (3 tests) 3ms
 ✓ src/lib/storage.test.ts (6 tests) 13ms
 ✓ src/lib/puzzle.test.ts (5 tests) 6ms
 ✓ src/i18n/locales.test.ts (2 tests) 2ms
 ✓ src/lib/share.test.ts (7 tests) 5ms
 ✓ src/App.test.tsx (5 tests) 152ms

 Test Files  7 passed (7)
      Tests  31 passed (31)
   Start at  08:36:52
   Duration  1.30s (transform 349ms, setup 0ms, import 588ms, tests 182ms, environment 5.73s)


> daily-loop-puzzle@0.0.0 build
> tsc -b && vite build

vite v8.0.14 building client environment for production...
transforming...✓ 27 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                   1.03 kB │ gzip:  0.49 kB
dist/assets/index-BzyV979Y.css    5.43 kB │ gzip:  1.90 kB
dist/assets/index-FfQb6E6y.js   216.02 kB │ gzip: 68.10 kB

✓ built in 87ms

> daily-loop-puzzle@0.0.0 lint
> eslint .


> daily-loop-puzzle@0.0.0 smoke:metadata
> node scripts/check-pwa-metadata.mjs

PWA metadata smoke passed: built index and manifest use local launch metadata only.
found 0 vulnerabilities
```

해석:

- Automated tests: PASS, 7 files / 31 tests.
- Build: PASS, Vite production asset generated.
- Lint: PASS.
- PWA metadata smoke: PASS for current local script expectation.
- Dependency audit: PASS, `found 0 vulnerabilities`.
- Gap: local `smoke:metadata`는 GitHub Pages subpath deployment에서 manifest absolute-root URL이 404가 되는지 검증하지 못한다.

## 3. Public URL read-only HTTP/static asset smoke

### 3.1 Root HEAD / GET / direct static assets

Command:

```bash
URL='https://sigol21c.github.io/daily-loop-puzzle/'
curl -sSIL "$URL"
python3 - <<'PY'
import re, urllib.request
url='https://sigol21c.github.io/daily-loop-puzzle/'
with urllib.request.urlopen(url, timeout=20) as r:
    body=r.read().decode('utf-8', 'replace')
    print('status=', r.status)
    print('final_url=', r.url)
    print('bytes=', len(body.encode()))
    print('title=', re.search(r'<title>(.*?)</title>', body, re.S).group(1) if re.search(r'<title>(.*?)</title>', body, re.S) else '')
    assets=re.findall(r'(?:src|href)="([^"]+)"', body)
    print('assets=', assets)
    suspicious=[x for x in re.findall(r'https?://[^\"\'<> )]+', body) if 'sigol21c.github.io' not in x]
    print('external_urls_in_index=', suspicious)
    for a in assets:
        if a.startswith('data:') or a.startswith('#'): continue
        full=urllib.parse.urljoin(url,a)
        with urllib.request.urlopen(full, timeout=20) as ar:
            data=ar.read()
            print('asset', full, 'status=', ar.status, 'bytes=', len(data), 'content_type=', ar.headers.get('content-type'))
PY
```

Exact output:

```text
## HEAD root
HTTP/2 200 
server: GitHub.com
content-type: text/html; charset=utf-8
last-modified: Tue, 02 Jun 2026 10:24:02 GMT
access-control-allow-origin: *
strict-transport-security: max-age=31556952
etag: "6a1eaf42-466"
expires: Tue, 02 Jun 2026 12:47:10 GMT
cache-control: max-age=600
x-proxy-cache: MISS
x-github-request-id: 3418:BAC4A:50AD862:56238A9:6A1ECE75
accept-ranges: bytes
age: 0
date: Tue, 02 Jun 2026 12:37:10 GMT
via: 1.1 varnish
x-served-by: cache-iad-kiad7000133-IAD
x-cache: MISS
x-cache-hits: 0
x-timer: S1780403831.745624,VS0,VE33
vary: Accept-Encoding
x-fastly-request-id: ed974a5bda0d5c9f78e64edce82b796bed44a0a7
content-length: 1126

## GET root status/size/title/assets
status= 200
final_url= https://sigol21c.github.io/daily-loop-puzzle/
bytes= 1126
title= Daily Loop Puzzle
assets= ['/daily-loop-puzzle/manifest.webmanifest', '/daily-loop-puzzle/favicon.svg', '/daily-loop-puzzle/pwa-icon.svg', '/daily-loop-puzzle/assets/index-FfQb6E6y.js', '/daily-loop-puzzle/assets/index-BzyV979Y.css']
external_urls_in_index= []
asset https://sigol21c.github.io/daily-loop-puzzle/manifest.webmanifest status= 200 bytes= 638 content_type= application/manifest+json; charset=utf-8
asset https://sigol21c.github.io/daily-loop-puzzle/favicon.svg status= 200 bytes= 9522 content_type= image/svg+xml
asset https://sigol21c.github.io/daily-loop-puzzle/pwa-icon.svg status= 200 bytes= 1085 content_type= image/svg+xml
asset https://sigol21c.github.io/daily-loop-puzzle/assets/index-FfQb6E6y.js status= 200 bytes= 216028 content_type= application/javascript; charset=utf-8
asset https://sigol21c.github.io/daily-loop-puzzle/assets/index-BzyV979Y.css status= 200 bytes= 5438 content_type= text/css; charset=utf-8
```

해석:

- Public root: HTTP 200.
- HTML title: `Daily Loop Puzzle`.
- HTML direct assets under `/daily-loop-puzzle/`: all HTTP 200.
- Index HTML 안의 unexpected external URL: none.

### 3.2 Runtime/static asset external endpoint scan

Command:

```bash
python3 - <<'PY'
import re, urllib.request, urllib.parse
base='https://sigol21c.github.io/daily-loop-puzzle/'
html=urllib.request.urlopen(base, timeout=20).read().decode('utf-8','replace')
assets=re.findall(r'(?:src|href)="([^"]+)"', html)
print('## runtime asset external/network scan')
for a in assets:
    full=urllib.parse.urljoin(base,a)
    data=urllib.request.urlopen(full, timeout=20).read().decode('utf-8','replace') if a.endswith(('.js','.css','.webmanifest','.svg')) else ''
    urls=sorted(set(re.findall(r'https?://[^\"\'`<> )]+', data)))
    fetches=sorted(set(re.findall(r'\b(fetch|XMLHttpRequest|sendBeacon)\b', data)))
    analytics=sorted(set(x for x in re.findall(r'\b(gtag|ga\(|GoogleAnalytics|plausible|posthog|mixpanel|amplitude|stripe|paypal|adsbygoogle|fbq)\b', data, re.I)))
    print(full)
    print('  external_urls=', urls)
    print('  network_api_tokens=', fetches)
    print('  tracker_payment_tokens=', analytics)
PY
```

Exact output:

```text
## runtime asset external/network scan
https://sigol21c.github.io/daily-loop-puzzle/manifest.webmanifest
  external_urls= []
  network_api_tokens= []
  tracker_payment_tokens= []
https://sigol21c.github.io/daily-loop-puzzle/favicon.svg
  external_urls= ['http://www.w3.org/2000/svg']
  network_api_tokens= []
  tracker_payment_tokens= []
https://sigol21c.github.io/daily-loop-puzzle/pwa-icon.svg
  external_urls= ['http://www.w3.org/2000/svg']
  network_api_tokens= []
  tracker_payment_tokens= []
https://sigol21c.github.io/daily-loop-puzzle/assets/index-FfQb6E6y.js
  external_urls= ['http://www.w3.org/1998/Math/MathML', 'http://www.w3.org/1999/xlink', 'http://www.w3.org/2000/svg', 'http://www.w3.org/XML/1998/namespace', 'https://react.dev/errors/']
  network_api_tokens= ['fetch']
  tracker_payment_tokens= ['Ga(', 'ga(']
https://sigol21c.github.io/daily-loop-puzzle/assets/index-BzyV979Y.css
  external_urls= []
  network_api_tokens= []
  tracker_payment_tokens= []
```

Follow-up interpretation:

- `https://react.dev/errors/`는 React production error helper string이다. Analytics/payment/service endpoint로 보지는 않았다.
- `fetch` token은 React preload/runtime helper에서 나온다. App-specific external API call로 보지는 않았다.
- `Ga(`/`ga(`는 minified React 함수명 false positive다. `gtag`, `GoogleAnalytics`, `plausible`, `posthog`, `mixpanel`, `amplitude`, `stripe`, `paypal`, `adsbygoogle`, `fbq`는 발견되지 않았다.

### 3.3 Public manifest base-path issue

Command:

```bash
BASE='https://sigol21c.github.io/daily-loop-puzzle/'
curl -sS "$BASE/manifest.webmanifest"
python3 - <<'PY'
import json, urllib.request, urllib.parse
manifest_url='https://sigol21c.github.io/daily-loop-puzzle/manifest.webmanifest'
manifest=json.load(urllib.request.urlopen(manifest_url, timeout=20))
for icon in manifest.get('icons',[]):
    src=icon.get('src')
    full=urllib.parse.urljoin(manifest_url, src)
    try:
        with urllib.request.urlopen(full, timeout=20) as r:
            print(src, '=>', full, 'status=', r.status, 'bytes=', len(r.read()), 'content_type=', r.headers.get('content-type'))
    except Exception as e:
        print(src, '=>', full, 'ERROR=', type(e).__name__, str(e))
PY
```

Exact output:

```text
## manifest
{
  "name": "Daily Loop Puzzle",
  "short_name": "Daily Loop",
  "description": "A mobile-first daily logic puzzle with local-only play, streaks, and spoiler-free sharing.",
  "start_url": "/",
  "scope": "/",
  "display": "standalone",
  "orientation": "portrait-primary",
  "theme_color": "#f7f2e8",
  "background_color": "#f7f2e8",
  "categories": ["games", "puzzle"],
  "icons": [
    {
      "src": "/pwa-icon.svg",
      "sizes": "any",
      "type": "image/svg+xml",
      "purpose": "any maskable"
    },
    {
      "src": "/favicon.svg",
      "sizes": "48x48",
      "type": "image/svg+xml",
      "purpose": "any"
    }
  ]
}

## HEAD manifest icon paths
/pwa-icon.svg => https://sigol21c.github.io/pwa-icon.svg ERROR= HTTPError HTTP Error 404: Not Found
/favicon.svg => https://sigol21c.github.io/favicon.svg ERROR= HTTPError HTTP Error 404: Not Found
```

Impact:

- 일반 gameplay/public reaction URL은 로드된다.
- PWA manifest icon/start/scope가 GitHub Pages project path와 맞지 않아 Add-to-Home/manifest quality smoke에는 실패한다.
- Fix recommendation: GitHub Pages project deploy에서는 manifest `start_url`, `scope`, icon `src`를 `/daily-loop-puzzle/` 또는 relative path 기준으로 맞추고, metadata smoke script가 subpath deploy를 검증하도록 업데이트한다.

## 4. Browser smoke 결과

Browser URL: `https://sigol21c.github.io/daily-loop-puzzle/`

### 4.1 First screen

Observed first screen:

- Header: `매일 한 판 · 로컬 저장만 사용`.
- Language selector: English / 한국어.
- Navigation: 홈 / 오늘 / 기록 / 방법.
- Status cards: 오늘 `2026-06-02`, Target `8`, Streak `0` first-run state, status `준비됨`.
- Onboarding card: `처음이신가요? 20초 예제로 배워보세요.` with demo / skip / rules buttons.
- No visible form, login, account, payment, analytics consent, email capture, or external posting UI.
- Desktop viewport visual: centered narrow app shell, no obvious broken layout or horizontal overflow.

Console after navigation: no messages, no JS errors.

### 4.2 Play flow

Steps:

1. Scrolled enough to bring onboarding buttons into clickable viewport.
2. Clicked `건너뛰고 오늘 퍼즐 풀기`.
3. On today puzzle, clicked adjacent tiles `7` and `1` for target `8`.

Observed result:

- Success state shown: `성공했습니다`.
- Result detail visible: `2/6 moves · 1170점 · selected 8`.
- Share text block visible:

```text
Daily Loop Puzzle #2026-06-02
✅ 2/6 moves · 1170점
🟩🟩⬜⬜
⬜⬜⬜⬜
⬜⬜⬜⬜
⬜⬜⬜⬜
```

Console after play: no messages, no JS errors.

### 4.3 Share/copy behavior

Steps:

1. Clicked `결과 공유/복사` in solved state.
2. Inspected visible body text and attempted browser clipboard read for QA evidence.

Observed:

- Share/copy button did not navigate away or open an external posting/contact/payment flow in this headless browser smoke.
- Spoiler-free result text remained visible on page.
- Clipboard read check returned `ERR:NotAllowedError:Failed to execute 'readText' on 'Clipboard': Read permission denied.` This is a browser permission limitation for reading clipboard, not proof that copy failed.
- Real OS/browser clipboard and Web Share sheet still require approved real-device/manual QA.

### 4.4 Replay/practice behavior

Steps:

1. Clicked `연습으로 다시 풀기`.

Observed:

- Today puzzle board returned for practice/replay.
- Official today result stayed represented in localStorage as solved; replay did not erase the solved record in observed state.
- Console after replay: no messages, no JS errors.

### 4.5 Browser resource/network observation

Browser performance entries after smoke:

```json
{
  "innerWidth": 1280,
  "innerHeight": 577,
  "scrollWidth": 1280,
  "bodyScrollWidth": 1280,
  "resourceNames": [
    "https://sigol21c.github.io/daily-loop-puzzle/assets/index-FfQb6E6y.js",
    "https://sigol21c.github.io/daily-loop-puzzle/assets/index-BzyV979Y.css",
    "https://sigol21c.github.io/daily-loop-puzzle/manifest.webmanifest",
    "https://sigol21c.github.io/daily-loop-puzzle/favicon.svg",
    "https://sigol21c.github.io/pwa-icon.svg"
  ]
}
```

Interpretation:

- Runtime fetched expected JS/CSS/manifest/favicon resources.
- Browser also attempted `https://sigol21c.github.io/pwa-icon.svg`, matching the manifest absolute-root icon bug above.
- No analytics/payment/form/contact endpoints observed in this smoke.

## 5. Mobile viewport feasibility

이번 task에서는 실제 모바일 기기, iOS Safari, Android Chrome, OS share sheet, paste target, or approved external tester flow를 실행하지 않았다.

Feasibility observations from this read-only public smoke:

- App shell is already narrow/centered on desktop and designed for mobile-first reading.
- First-screen content and CTA labels match the prior localhost/mobile docs.
- No obvious desktop horizontal overflow was observed (`documentElement.scrollWidth` = `innerWidth` = 1280 in browser smoke).

Remaining mobile/device gaps:

- 390px/real mobile viewport public URL visual screenshot not captured in this task.
- iOS Safari / Android Chrome touch targets, trusted clipboard gesture, Web Share sheet open+cancel, and local scratch paste are still unverified here.
- PWA/Add-to-Home is not ready until manifest base-path issue is fixed and retested.

## 6. Launch-reaction baseline fields for Sean to fill manually

이 섹션은 real user data를 수집하지 않는다. Sean이 승인된 범위에서 직접 관찰한 내용을 나중에 수동 기입하기 위한 빈 baseline이다.

| Field | Manual entry |
| --- | --- |
| Observation date/time |  |
| Who observed | Sean / internal only |
| Device/browser |  |
| Public URL opened successfully? |  |
| First impression / confusion point |  |
| Could solve one puzzle without help? |  |
| Share/copy tried? external send cancelled? |  |
| Clipboard paste result in local scratch only |  |
| Any layout/touch issue |  |
| Any PWA/Add-to-Home issue |  |
| Reaction signal, if voluntarily observed by Sean |  |
| Follow-up decision | HOLD / fix PWA / device QA / ask for separate launch-channel approval |

## 7. Approval-gated next steps — separated from allowed read-only smoke

Allowed now / completed in this task:

- Inspect public URL read-only.
- Run local verification.
- Browser smoke without posting/contact/payment/account/analytics actions.
- Document findings in this project note.

Still approval-gated / not performed:

- Product Hunt / Reddit / HN / community posting.
- Customer, friend, tester, or external user contact.
- Real user data collection or inference.
- Analytics, ads, payment, payment mock, waitlist/email capture, privacy/service integrations.
- GitHub/hosting/account/credential/permission changes.
- Legal, financial, revenue, conversion, or “validated demand” claims.
- Public launch-channel copy publishing.

Recommended next internal-safe actions:

1. Product engineering follow-up: fix GitHub Pages subpath PWA manifest/icon/start/scope paths and extend `smoke:metadata` to catch this on public/project-path builds.
2. QA follow-up after fix: rerun public root/assets/manifest/browser smoke.
3. Sean-approved manual device QA: execute the REV-PUZZLE-051 matrix on iOS/Android/Desktop, but cancel any share sheet before external transmission and paste only into local scratch.
4. Only after separate Sean approval: decide whether any public channel posting/contact/analytics/payment/privacy/service integration is allowed.

## 8. Git sync status

Initial git check:

```bash
git status --short && git branch --show-current && git remote -v
```

Output before this note was written:

```text
main
origin	https://github.com/sigol21c/daily-loop-puzzle.git (fetch)
origin	https://github.com/sigol21c/daily-loop-puzzle.git (push)
```

This note is the only intended project-doc change from REV-PUZZLE-052.

Stage/commit command:

```bash
git add docs/daily-loop-puzzle/github-pages-public-smoke-reaction-readiness-REV-PUZZLE-052-2026-06-02.md && git commit -m "docs: add GitHub Pages public smoke baseline"
```

Commit result:

```text
Committed locally on branch main with message: docs: add GitHub Pages public smoke baseline
```

Final commit hash is reported in the kanban handoff because amending this note changes the hash.

Push command:

```bash
git push origin main
```

Push output:

```text
fatal: could not read Username for 'https://github.com': Device not configured
```

Push result: NOT pushed. Existing HTTPS credentials were not available; no credential/account changes were attempted.

Follow-up task created for the PWA manifest issue: `t_c38ead30` assigned to productengineer.
