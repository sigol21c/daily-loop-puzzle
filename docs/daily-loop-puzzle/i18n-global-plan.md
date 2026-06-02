# Daily Loop Puzzle i18n / 글로벌 타깃팅 계획

Status: Internal plan only — Sean 승인 전 외부 배포, 공개 SEO 적용, 커뮤니티 접촉, analytics/ads/payments, 개인정보 수집, 계정/도메인 변경 없음.
Last updated: 2026-06-01
Owner: Sean
Operator: GrowthArchitect

## 0. 가장 높은 레버리지 추천

첫 i18n 목표는 “많은 언어를 한 번에 출시”가 아니라, Daily Loop Puzzle의 핵심 매력인 1일 1판, 1~3분 플레이, 스포일러 없는 공유 루프를 영어권 중심으로 검증할 수 있게 만드는 최소 다국어 구조를 로컬에 먼저 심는 것이다.

추천 순서:

1. Phase 0 — 구조만 먼저: `en`을 기본 locale로 확정하고, 현재 혼합 한국어/영어 UI copy를 locale key로 분리한다.
2. Phase 1 — 첫 공개 후보: `en` 단일 공개를 기본으로 준비하되, Sean 내부 리뷰용 `ko`를 함께 유지한다.
3. Phase 2 — 빠른 확장 후보: `ja`, `es`, `pt-BR` 순서로 번역 후보를 추가한다.
4. Phase 3 — SEO/채널 확장 후보: `de`, `fr`, `zh-Hans`, `zh-Hant`는 UI 안정화와 번역 QA 이후 추가한다.

이 순서가 좋은 이유:

- 영어는 Product Hunt, Hacker News, Reddit, X/Threads 등 초기 피드백 채널과 가장 잘 맞는다.
- 한국어는 Sean 내부 검토와 초기 운영 문서/카피 생산에 필요하지만, 글로벌 퍼즐의 첫 외부 확산 언어로는 채널 폭이 좁다.
- 일본어/스페인어/브라질 포르투갈어는 모바일 퍼즐·짧은 게임·소셜 공유와 잘 맞지만, 번역 어투와 UI 길이 검증이 필요하다.
- 독일어/프랑스어/중국어 간체/번체는 도달 가능성은 크지만, 독일어 길이, 프랑스어 자연스러움, CJK 폰트/줄바꿈, 중국어권 접근 채널과 SEO/OG 검증 부담이 더 크다.

## 1. 현재 제품 맥락

로컬 MVP 기준 구현/문서 상태:

- Vite + React + TypeScript SPA.
- 서버, 로그인, analytics, ads, payments, 외부 API 없음.
- `localStorage`만 사용해 오늘 결과와 streak 저장.
- 현재 앱 copy는 영어와 한국어가 섞여 있다.
- 공유 텍스트는 `src/lib/share.ts`의 `buildShareText()`에서 영어 고정 문자열로 생성된다.
- UX 문서상 핵심 intent는 “3초 안에 이해, 1~3분 플레이, 모바일 우선, 스포일러 없는 공유”다.
- Sean 리뷰 맥락상 텍스트 설명보다 실제 예시/데모로 How to Play를 보여주는 것이 중요하다.

따라서 i18n도 rule 설명 번역보다 “언어별 15초 이해 가능한 예시 copy + 실제 데모 UI”를 우선해야 한다.

## 2. 타깃 세그먼트와 글로벌 진입 전략

### 2.1 1차 타깃 세그먼트

Daily Loop Puzzle의 첫 타깃은 “퍼즐 하드코어 유저” 전체가 아니라 다음 세그먼트가 더 현실적이다.

- 매일 1개씩 짧게 푸는 퍼즐 습관이 있는 사람.
- Wordle류의 spoiler-free 결과 공유 포맷을 이미 이해하는 사람.
- 모바일에서 1~3분짜리 가벼운 숫자/로직 게임을 선호하는 사람.
- 로그인 없이 바로 플레이하는 것을 선호하는 사람.
- 규칙이 복잡한 수학 게임보다 “목표 합 맞추기”처럼 즉시 이해되는 mechanic을 원하는 사람.

### 2.2 첫 글로벌 포지셔닝

권장 포지셔닝:

> A tiny daily number puzzle: tap connected tiles, match today’s target, and share a spoiler-free result.

한국어 내부 표현:

> 매일 1판, 연결된 숫자 타일로 오늘의 목표 합을 맞추고 스포일러 없는 결과를 공유하는 모바일 퍼즐.

핵심은 “숫자 퍼즐”이지만 수학 능력 향상/두뇌 훈련 같은 효능 주장은 하지 않는다. 현재 근거 있는 fact claim만 사용한다.

### 2.3 채널 적합성

Sean 승인 후 외부 테스트를 한다면 언어별 채널 적합성은 다음과 같다. 이 문서는 내부 계획이며 실행은 승인 전 금지다.

| 채널 | 1차 언어 | i18n 시사점 | 승인 전 상태 |
| --- | --- | --- | --- |
| Product Hunt | English | 영어 landing/share copy가 우선 | 실행 금지, draft만 가능 |
| Hacker News / Show HN | English | 기술적·local-first 설명 필요 | 실행 금지 |
| Reddit puzzle/webgame communities | English, Spanish, Japanese 일부 | 각 community rule 확인 필요 | 접촉/게시 금지 |
| X / Threads | English, Japanese, Korean, Spanish | 짧은 공유 텍스트와 screenshot/GIF가 중요 | 게시 금지 |
| Tistory / 한국어 개발로그 | Korean | 내부/한국어 리뷰와 장기 SEO 자산 | 공개 발행 금지 |
| 검색 SEO | English first, 이후 locale pages | hreflang/OG/slug 필요 | 공개 적용 금지 |

## 3. 언어 우선순위

### 3.1 평가 기준

언어는 다음 6개 기준으로 판단한다.

1. 글로벌 도달 범위: 인터넷 사용자/콘텐츠 생태계 크기.
2. 초기 launch channel 적합성: Product Hunt/HN/Reddit/X 등에서 바로 테스트 가능한가.
3. 구현 난이도: 문자열 길이, 복수형, 날짜/숫자, 폰트, 줄바꿈 위험.
4. 퍼즐 mechanic 적합성: 숫자 기반이라 단어 사전/문자 입력 의존이 낮은가.
5. 번역 품질 리스크: 기계번역으로 오해가 생길 가능성.
6. 운영 부담: Sean 승인/QA/지원/응답 부담.

### 3.2 최소 고려 언어별 평가

| 순위 | Locale | 언어 | 추천 단계 | 이유 | 주요 리스크 |
| ---: | --- | --- | --- | --- | --- |
| 1 | `en` | English | Phase 0/1 기본 | 글로벌 채널, Product Hunt/HN/Reddit, 기존 launch copy와 가장 맞음 | “connected tiles”, “target” 같은 rule copy를 너무 기술적으로 쓰면 첫 이해가 느려짐 |
| 2 | `ko` | Korean | Phase 0 내부 + Sean 리뷰 | Sean 검토, 국내 문서/운영, Tistory 재활용 가능 | 첫 글로벌 확산 채널은 좁음. UI가 한국어 위주가 되면 Product Hunt/HN 준비가 늦어짐 |
| 3 | `ja` | Japanese | Phase 2 | 모바일 퍼즐/캐주얼 게임 친화, X 공유 문화와 적합 | 자연스러운 게임 UI 어투 QA 필요. 줄바꿈/폰트 검증 필요 |
| 4 | `es` | Spanish | Phase 2 | 넓은 글로벌 도달, Reddit/소셜/검색 확장 가능 | 지역별 어휘 차이. `es` generic으로 시작하고 지역 타깃은 나중에 |
| 5 | `pt-BR` | Brazilian Portuguese | Phase 2 | 큰 모바일/소셜 게임 시장, 포르투갈어권 중 브라질 우선이 현실적 | `pt` generic보다 `pt-BR` 명시 권장. 유럽 포르투갈어와 어투 차이 |
| 6 | `de` | German | Phase 3 | 유럽권 SEO/웹 퍼즐 유저 가능성 | 문자열이 길어 버튼/카드 overflow 위험이 큼 |
| 7 | `fr` | French | Phase 3 | 유럽/캐나다/아프리카권 장기 확장 | 자연스러운 UX 어투와 성/수 표현 QA 필요 |
| 8 | `zh-Hans` | Simplified Chinese | Phase 3 | 사용자 규모 잠재력 큼, 숫자 퍼즐과 언어 장벽 낮음 | 중국 본토 접근/배포/채널 특성, 폰트, 간체 용어 QA, 외부 플랫폼 접근 리스크 |
| 9 | `zh-Hant` | Traditional Chinese | Phase 3 | 대만/홍콩 등 별도 소셜/게임 사용자층 가능 | 간체와 단순 변환 금지. 용어/어투 별도 검수 필요 |

### 3.3 초기 언어 세트 결론

실행 가능한 첫 범위:

- Build scope: `en`, `ko`만 locale architecture에 넣는다.
- Draft scope: `ja`, `es`, `pt-BR`는 Sean 검토용 번역 draft 파일 또는 backlog로만 준비한다.
- Defer: `de`, `fr`, `zh-Hans`, `zh-Hant`는 locale 구조가 안정되고 데모/How to Play copy가 확정된 뒤 추가한다.

외부 공개 1차 후보는 `en` 단일 페이지가 가장 안전하다. 다국어 UI가 있더라도 외부 SEO index/hreflang 노출은 Sean 승인 후 별도 gate로 둔다.

## 4. UX copy architecture

### 4.1 권장 파일 구조

가벼운 React SPA이므로 i18next 같은 대형 런타임 의존성은 첫 단계에서 불필요하다. 정적 TypeScript locale dictionary로 시작한다.

권장 구조:

```text
src/i18n/
  locales.ts
  types.ts
  en.ts
  ko.ts
  ja.ts        # Phase 2 draft only
  es.ts        # Phase 2 draft only
  pt-BR.ts     # Phase 2 draft only
```

권장 타입:

```ts
export type LocaleCode = 'en' | 'ko' | 'ja' | 'es' | 'pt-BR' | 'de' | 'fr' | 'zh-Hans' | 'zh-Hant';

export type LocaleMessages = {
  meta: {
    appName: string;
    htmlLang: string;
    ogLocale?: string;
  };
  nav: {
    home: string;
    today: string;
    stats: string;
    how: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  home: {
    readyTitle: string;
    readyBody: string;
    completeTitle: string;
    playCta: string;
    resultCta: string;
    howCta: string;
  };
  status: {
    today: string;
    target: string;
    streak: string;
    status: string;
    ready: string;
    solved: string;
    failed: string;
  };
  puzzle: {
    selected: string;
    movesLeft: string;
    connected: string;
    disconnected: string;
    hint: string;
  };
  result: {
    solvedTitle: string;
    failedTitle: string;
    shareCta: string;
    practiceCta: string;
    copied: string;
    shared: string;
    copyFailed: string;
  };
  stats: {
    title: string;
    played: string;
    solved: string;
    streak: string;
    best: string;
    localOnlyNotice: string;
  };
  howToPlay: {
    title: string;
    introExampleTitle: string;
    introExampleBody: string;
    steps: string[];
  };
  share: {
    title: string;       // e.g. Daily Loop Puzzle #{dayKey}
    solvedLine: string;  // template: ✅ {moves}/{maxMoves} moves · {score} pts
    failedLine: string;
  };
};
```

첫 구현에서는 전체 앱 리팩터링보다 다음 문자열부터 분리한다.

1. Hero/subtitle/nav/status.
2. Home CTA와 How to Play.
3. ResultCard copy.
4. Share text.
5. SEO/OG title/description은 public deployment 승인 전 내부 메타 draft로만 둔다.

### 4.2 Fallback behavior

권장 fallback 정책:

- 기본 locale: `en`.
- Sean/local review default: 브라우저 언어가 `ko`이면 `ko`, 아니면 `en`.
- 지원하지 않는 locale: base language fallback 후 `en`.
  - `en-US` → `en`
  - `es-MX` → `es`
  - `pt-PT` → 일단 `en` 또는 명시적 `pt-BR` 선택 유도. 브라질 포르투갈어를 포르투갈 전체로 보여주지 않는다.
  - `zh-CN`, `zh-SG` → `zh-Hans`
  - `zh-TW`, `zh-HK`, `zh-MO` → `zh-Hant`
- 사용자가 language selector에서 명시 선택하면 `localStorage`에 저장하고 browser hint보다 우선한다.
- `navigator.languages` / `Accept-Language`는 hint로만 사용하고, 명시 선택을 덮어쓰지 않는다. MDN도 `Accept-Language`를 사용자의 명시 선택보다 우선하지 말라고 설명한다.

### 4.3 Language selector

첫 버전 권장:

- 위치: header 하단 또는 nav 우측의 작은 selector.
- 라벨: `Language` / `언어`.
- 표시명은 각 언어의 native name 사용:
  - English
  - 한국어
  - 日本語
  - Español
  - Português (Brasil)
  - Deutsch
  - Français
  - 简体中文
  - 繁體中文
- `aria-label` 제공.
- 선택값은 `localStorage` key 예: `daily-loop-puzzle:locale:v1`.
- 선택 변경 시 게임 상태는 리셋하지 않는다. 현재 puzzle/day/stats는 유지하고 copy만 바꾼다.

### 4.4 Share text localization

공유 텍스트는 퍼즐 확산의 핵심이므로 UI 번역과 별도로 관리한다.

권장 원칙:

- Product name은 모든 언어에서 `Daily Loop Puzzle` 유지.
- 첫 줄은 검색/브랜드 일관성을 위해 공통 유지: `Daily Loop Puzzle #2026-06-01`.
- 두 번째 줄의 단위만 locale별로 번역:
  - en: `✅ 4/6 moves · 840 pts`
  - ko: `✅ 4/6 moves · 840점`
  - ja: `✅ 4/6手 · 840点` 또는 Sean 승인 전 `moves` 유지
  - es: `✅ 4/6 movimientos · 840 pts`
  - pt-BR: `✅ 4/6 jogadas · 840 pts`
  - de/fr/zh는 Phase 3 QA 후 확정
- 이모지 grid는 언어 공통 사용. 단, 접근성용 screen-reader copy는 UI 내부에 별도 제공한다.
- URL을 공유 텍스트에 넣는 것은 공개 URL 승인 후에만 한다.
- social hashtag는 첫 공개 전에는 넣지 않는다. hashtag는 번역보다 채널별 승인 이슈다.

### 4.5 Date/time/number handling

현재 day key는 UTC `YYYY-MM-DD`다. 글로벌 출시 전 결정이 필요하다.

첫 추천:

- 퍼즐 seed 기준은 계속 UTC day로 유지한다. 전 세계가 같은 퍼즐을 푸는 공유 루프가 단순하다.
- UI 표시만 locale에 맞게 `Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeZone: 'UTC' })` 또는 명시적 UTC day label로 포맷한다.
- “today” 표현은 사용자의 현지 날짜와 UTC day가 어긋날 수 있으므로 외부 공개 전 카피를 조심한다.
  - 안전한 표현: `Daily puzzle #2026-06-01`.
  - 덜 안전한 표현: `Today's puzzle`만 단독 사용.
- 숫자/점수는 `Intl.NumberFormat(locale)`로 표시한다.
- share text는 비교 가능성을 위해 날짜 key와 숫자 형식을 과하게 현지화하지 않는다. 예: `#2026-06-01` 유지.

### 4.6 SEO / Open Graph 고려사항 — 내부 계획만

Sean 승인 전 실제 공개 적용/배포/검색 노출은 하지 않는다.

승인 후 계획:

- URL 구조는 SPA라도 locale path를 추천: `/en/`, `/ko/`, `/ja/`, `/es/`, `/pt-BR/`.
- `html lang`을 현재 locale에 맞춘다.
- 각 locale별 `<title>`, meta description, OG title/description을 번역한다.
- OG image의 텍스트 삽입은 초기에는 영어 공통으로 시작하거나, locale별 screenshot 생성은 후순위로 둔다.
- Google Search Central 문서에 따르면 다국어 페이지는 각 언어 버전이 자기 자신과 다른 모든 버전을 `hreflang`으로 연결하고, fallback selector/default에는 `x-default`를 둘 수 있다.
- `hreflang` URL은 공개 URL이 확정된 후에만 완전한 URL로 생성한다. 로컬 파일에는 pseudo config만 둔다.
- 같은 페이지의 일부 UI만 번역하고 본문/게임 설명이 영어면 locale SEO page로 색인시키지 않는다. Google은 main content가 번역되지 않으면 localized duplicate 취급 위험이 있다.

## 5. How to Play / demo localization

Sean 피드백에 따라, 첫 사용자 이해는 텍스트 설명보다 실제 예시가 중요하다.

권장 i18n-safe How to Play 구조:

1. “목표: 14” 같은 작은 예시 보드 3~4칸을 보여준다.
2. 사용자가 선택해야 할 타일을 하이라이트한다.
3. 선택 합이 목표와 같아지는 순간을 보여준다.
4. “상하좌우로 연결되어야 함”을 그림으로 보여준다.
5. 텍스트는 locale별 짧은 caption만 제공한다.

언어별 copy 길이 차이를 줄이기 위해 설명문은 1문장 단위로 제한한다.

예:

- en: `Pick connected tiles that add up to the target.`
- ko: `연결된 타일을 골라 목표 합을 맞추세요.`
- ja draft: `つながったタイルを選んで目標の合計にします。`
- es draft: `Elige fichas conectadas que sumen el objetivo.`
- pt-BR draft: `Escolha peças conectadas que somem o alvo.`

이 예시 copy는 공개 전 원어민 또는 Sean 승인 대상이다.

## 6. 번역 품질 리스크와 Sean 승인 필요 항목

### 6.1 번역 리스크

| 영역 | 리스크 | 대응 |
| --- | --- | --- |
| Rule clarity | `connected`, `target`, `moves`, `official result`, `practice`가 언어별로 게임 맥락에서 어색할 수 있음 | 실제 demo + 짧은 caption 중심. 번역 glossary 고정 |
| 숫자/수학 부담 | “number puzzle”이 공부/수학 게임처럼 보일 수 있음 | “quick daily puzzle”, “tap tiles” 표현과 균형 |
| CJK UI | 일본어/중국어 줄바꿈, 폰트 fallback, 버튼 높이 문제 | 390x844 screenshot QA와 overflow test |
| 독일어 길이 | 버튼/상태 카드 overflow | `minmax`, wrapping, shorter CTA 별도 번역 |
| 포르투갈어 | `pt`와 `pt-BR` 혼동 | 첫 locale은 `pt-BR`로 명시 |
| 중국어 | 간체/번체 단순 변환 위험 | `zh-Hans`, `zh-Hant` 별도 파일과 승인 |
| Share copy | SNS에서 의미가 애매하면 공유 루프 약화 | 각 언어별 실제 share preview 검수 |
| SEO claims | locale별 과장/효능 주장 혼입 위험 | approved claim guardrails 적용 |

### 6.2 Sean 승인 전 공개 사용 금지 항목

다음은 Sean 승인 없이는 공개 사용하지 않는다.

- 공개 URL 배포 및 locale path 노출.
- `hreflang`, sitemap, OG image 등 실제 SEO 설정 적용.
- Product Hunt, Reddit, HN, X, Tistory 등 외부 게시.
- 외부 번역가/커뮤니티/원어민에게 검수 요청.
- analytics, ads, payments, waitlist, email capture, login, database, external API 추가.
- “global launch”, “available in X languages”, “viral”, “addictive”, “brain training” 등 검증되지 않은 표현.
- 일본어/스페인어/포르투갈어/독일어/프랑스어/중국어 번역을 원어민 또는 Sean 검토 없이 public copy로 사용하는 것.
- 중국어권/일본어권 채널별 계정 생성·설정 변경·게시.

### 6.3 Sean 승인 요청에 포함할 항목

외부 공개 전 Sean에게 다음을 선택받는다.

1. 첫 공개 언어: `en only` vs `en + ko selector`.
2. 외부 공개 위치: Product Hunt/HN/Reddit 전, 먼저 개인 URL/비공개 테스트 여부.
3. 다국어 SEO 노출 시점: 첫 주에는 차단하고 UI만 다국어로 둘지, locale pages를 바로 index할지.
4. 일본어/스페인어/포르투갈어 draft를 공개 전 검수할 사람/방식.
5. `Today's puzzle` 표현을 UTC 기준으로 계속 쓸지, `Daily puzzle #date`로 보수화할지.

## 7. 첫 구현 범위

### 7.1 1~2일 내부-local 구현 범위

목표: 다국어 출시가 아니라, 향후 번역 가능한 구조를 만든다.

Tasks:

1. `src/i18n/types.ts`, `src/i18n/en.ts`, `src/i18n/ko.ts`, `src/i18n/locales.ts` 생성.
2. `App.tsx`, `ResultCard.tsx`, `PuzzleBoard.tsx`, `share.ts`의 hardcoded copy를 key 기반으로 이동.
3. language selector 추가.
4. locale preference localStorage 저장.
5. `buildShareText(input, locale)` 또는 `buildShareText(input, messages.share)` 구조로 변경.
6. `Intl.DateTimeFormat` / `Intl.NumberFormat` helper 추가.
7. tests: share text locale snapshot, fallback mapping, language selector smoke test.

Out of scope:

- 외부 배포.
- SEO/hreflang 실제 적용.
- analytics/ads/payments.
- 외부 번역 검수 요청.
- 모든 언어 완성 번역.

### 7.2 3~5일 확장 범위

1. How to Play demo를 텍스트 설명보다 예시 중심으로 바꾼다.
2. `ja`, `es`, `pt-BR` draft locale 파일을 추가하되 public-ready가 아니라 `draft`로 표시한다.
3. 390x844 viewport에서 각 언어 overflow screenshot QA.
4. share text preview를 언어별로 검증한다.
5. Sean 승인 패키지에 언어별 screenshot과 copy table을 첨부한다.

### 7.3 이후 범위

Sean 승인 후에만:

- locale path routing.
- public URL 배포.
- `hreflang` / sitemap / OG.
- 각 채널별 localized launch copy.
- 외부 QA / 원어민 검수 / 커뮤니티 피드백.

## 8. 성공 지표

내부-local 단계 지표:

- hardcoded user-facing copy의 80% 이상이 locale dictionary로 이동.
- `en`, `ko` fallback이 동작.
- language selector 변경 시 puzzle state가 유지됨.
- `en`, `ko` share text snapshot test 통과.
- 390x844에서 `en`, `ko` 모두 horizontal overflow 없음.
- How to Play demo를 처음 보는 사용자가 텍스트만 읽지 않아도 mechanic을 이해할 수 있는 화면 구조로 전환.

Sean 승인 후 외부 실험 지표 후보:

- 첫 방문자가 How to Play 이전에 첫 move를 시도하는 비율.
- 퍼즐 완료율.
- share/copy 클릭률.
- share text를 보고 유입된 세션의 완료율.
- locale별 bounce 또는 completion 차이.

단, 이 지표 수집은 analytics/데이터 수집 승인 전에는 구현하지 않는다.

## 9. 근거와 참고 자료

내부 근거:

- `/Users/mac_agent/Documents/04_Projects/daily-loop-puzzle/docs/daily-loop-puzzle/ux-spec.md`
- `/Users/mac_agent/Documents/04_Projects/daily-loop-puzzle/docs/daily-loop-puzzle/launch-assets.md`
- `/Users/mac_agent/Documents/04_Projects/daily-loop-puzzle/docs/daily-loop-puzzle/local-architecture.md`
- `/Users/mac_agent/Documents/01_Knowledge/sean-s_wiki/10_Wiki/🛠️ Projects/revenue_os_v1.md`

외부 public web 참고, 읽기만 수행:

- Google Search Central, `Localized Versions of Your Pages`: 다국어 페이지의 `hreflang`, 자기 자신/상호 alternate, `x-default`, fully qualified URL 권장.
- MDN, `Accept-Language`: browser language는 hint이며 explicit user choice를 덮어쓰면 안 됨.
- W3C, `Language Tags and Locale Identifiers for the World Wide Web`: Web 언어 식별은 BCP 47 language tag 기반이 적합.
- Wordle Global about page: daily puzzle 카테고리에서 다국어 지원은 장기적으로 강력한 확장 포인트지만, 많은 언어는 유지보수/검수 커뮤니티가 필요함.

## 10. 다음 Kanban 후보

1. productengineer: `en`/`ko` locale architecture와 language selector를 로컬 구현하고 tests 추가.
2. productdesigner: How to Play를 실제 예시/demo 중심 화면으로 재설계.
3. qaengineer: 390x844 viewport에서 `en`/`ko` copy overflow, share text, localStorage locale preference QA.
4. marketer 또는 growtharchitect: Sean 승인용 `ja`/`es`/`pt-BR` draft copy table 작성. 공개 사용 금지 라벨 포함.
5. legalrisk: 외부 공개 전 privacy/data/claims 문구와 locale별 SEO/OG claim guardrail 검토.
