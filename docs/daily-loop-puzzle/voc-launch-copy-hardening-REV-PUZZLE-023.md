# REV-PUZZLE-023 — Daily Loop Puzzle 공개 VOC 기반 launch/onboarding/FAQ 카피 보강 리포트

작성일: 2026-06-01 10:57 EDT
상태: 내부 검토용 초안. 외부 게시/배포/커뮤니티 접촉/로그인/폼 제출/결제/광고/analytics/계정 변경 없음.
프로젝트: `/Users/mac_agent/Documents/04_Projects/daily-loop-puzzle`
Revenue OS hub: `/Users/mac_agent/Documents/01_Knowledge/sean-s_wiki/10_Wiki/🛠️ Projects/revenue_os_v1.md`

## 가장 강한 고객 인사이트

Daily Loop Puzzle의 launch copy는 “새로운 퍼즐”보다 “광고·계정·구독 압박 없이, 오늘 1판을 1-3분에 끝내고 스포일러 없이 공유하는 작은 루틴”을 전면에 두는 편이 더 강하다. 공개 VOC에서 반복되는 감정은 “퍼즐 자체는 좋아하지만 중간 광고, paywall 전환, 모바일 조작 불편, 모호한 규칙/정답 판정 때문에 이탈한다”였다. 즉, 현재 MVP의 `no login / no backend / no analytics / local-only / quick demo / spoiler-free share`는 기능 설명이 아니라 핵심 신뢰 자산으로 다뤄야 한다.

## 범위와 안전 원칙

- 공개 read-only 페이지/API만 확인했다.
- 댓글 작성, DM/email, 폼 제출, 로그인, 계정 변경, 결제, 광고/analytics 설정, 배포는 하지 않았다.
- 사용자명, 이메일, 프로필 URL, 개인 식별 정보는 저장하지 않았다.
- 아래 인용은 개인 식별자를 제거한 짧은 익명 snippet/paraphrase다. App Store/HN 원문에는 작성자명이 있을 수 있으나 이 문서에는 저장하지 않았다.
- 일부 공개 리뷰는 정치적/민감한 표현이 섞여 있었지만 Daily Loop Puzzle 카피와 직접 관련 없는 내용은 제외했다.

## 기존 자산 리뷰 요약

검토한 내부 자산:

1. `docs/daily-loop-puzzle/launch-assets.md`
   - 이미 “tiny daily number puzzle”, “1-3 minutes”, “spoiler-free sharing”, “no account/backend/analytics/payments”가 포함되어 있어 방향은 좋다.
   - 다만 VOC 기준으로는 “중간 광고 없음”, “구독 압박 없음”, “처음 20초 예제로 배움”, “모바일 조작 friction을 줄였다”를 더 전면화할 가치가 있다.
2. `docs/daily-loop-puzzle/ux-spec.md`
   - 3초 이해, 1-3분 플레이, local-only, share loop가 명확하다.
   - VOC상 “정답 판정/규칙이 납득되는가”가 중요하므로 How to Play와 FAQ에서 “상하좌우 연결”과 “첫 기록/연습 기록”을 더 단순하게 설명해야 한다.
3. `docs/daily-loop-puzzle/onboarding-demo-spec.md`
   - 2x2 demo는 VOC에서 반복된 “튜토리얼이 쉬워야 함 / 조작을 바로 익혀야 함”과 잘 맞는다.
   - launch copy에 “20-second example”을 hero 또는 first-run card에 넣는 것이 좋다.
4. `docs/daily-loop-puzzle/i18n-global-plan.md`
   - English-first + Korean fallback이 적절하다.
   - 영어 카피에서 “connected number tiles”가 다소 기술적으로 들릴 수 있어, 첫 문장에서는 “tap numbers to hit the target”처럼 낮추고 두 번째 문장에서 connected rule을 설명하는 편이 좋다.
5. `docs/daily-loop-puzzle/qa-checklist.md`
   - 외부 launch NO-GO와 clipboard/manual mobile check 필요가 명확하다.
   - public copy에는 “share/copy is designed to be spoiler-free”처럼 검증 범위를 맞추고, 실제 모바일 clipboard 검증 전 “works everywhere” 류의 과장을 피해야 한다.
6. `src/i18n/en.ts`, `src/i18n/ko.ts`
   - 현재 앱 카피는 기능적으로 충분하지만 `Target`, `Selected`, `moves`, `localStorage` 같은 혼합/기술어가 많다.
   - 런칭용 문구는 “today’s target”, “your browser”, “practice only”처럼 사용자 언어로 풀어 쓰는 편이 좋다.

## 공개 read-only 소스

| # | 소스 | URL | 관찰 용도 |
| ---: | --- | --- | --- |
| 1 | Apple App Store RSS — NYT Games | `https://itunes.apple.com/us/rss/customerreviews/id=307569751/sortby=mostrecent/json` | Wordle/Connections류 daily puzzle app의 만족/불만, 구독/앱 안정성/리뷰 nagging |
| 2 | Apple App Store RSS — Wordscapes | `https://itunes.apple.com/us/rss/customerreviews/id=1207472156/sortby=mostrecent/json` | 광고 interrupt, 단순 퍼즐 경험 훼손, 결제 제거 요구 |
| 3 | Apple App Store RSS — Sudoku.com | `https://itunes.apple.com/us/rss/customerreviews/id=1193508329/sortby=mostrecent/json` | 튜토리얼, daily puzzle habit, 광고 피로, auto-complete/control frustration |
| 4 | Apple App Store RSS — Knotwords | `https://itunes.apple.com/us/rss/customerreviews/id=1598756238/sortby=mostrecent/json` | daily streak, 1-3분 mini puzzle, easy-but-satisfying 난이도, word validity objections |
| 5 | Apple App Store RSS — Puzzmo | `https://itunes.apple.com/us/rss/customerreviews/id=6714482734/sortby=mostrecent/json` | subscription/paywall 반응, daily cap, phone/tablet readability, zoom 필요 |
| 6 | Apple App Store RSS — Really Bad Chess | `https://itunes.apple.com/us/rss/customerreviews/id=1109751921/sortby=mostrecent/json` | 업데이트 후 진행상황 삭제/화면 잘림/광고 신뢰 문제 |
| 7 | HN Algolia item — Figure daily logic puzzle | `https://hn.algolia.com/api/v1/items/32376154` | daily puzzle Show HN feedback: reminder, archive, difficulty, satisfying interaction |
| 8 | HN Algolia item — Hidden Mirrors daily puzzle | `https://hn.algolia.com/api/v1/items/40368008` | tutorial, mobile gesture, archive, settings/polish, “open all puzzles” objection |
| 9 | HN Algolia item — Triword daily word puzzle | `https://hn.algolia.com/api/v1/items/39433120` | valid-solution/obscure-word frustration, puzzle fairness/answer acceptance |
| 10 | HN Algolia item — Dogbunny daily puzzles | `https://hn.algolia.com/api/v1/items/33642567` | mobile layout, first-load cut-off, simple-but-complex praise, HN traffic/load caveat |

보조 확인:

- iTunes Search API로 앱 rating/userRatingCount 확인:
  - NYT Games: app id `307569751`, rating 약 4.8, review count 286k+.
  - Wordscapes: app id `1207472156`, rating 약 4.83, review count 1.1M+.
  - Sudoku.com: app id `1193508329`, rating 약 4.76, review count 1.8M+.
  - Knotwords: app id `1598756238`, rating 약 4.79, review count 7.9k+.
  - Puzzmo: app id `6714482734`, rating 약 3.9, review count 146.
- 이 수치는 수요 존재를 보여주지만, Daily Loop Puzzle이 같은 수요를 자동 획득한다는 증거는 아니다.

## VOC 테마별 직접 증거와 해석

### 1. “광고가 퍼즐 중간을 끊으면 바로 삭제/이탈”

직접 증거:

- Wordscapes 리뷰 다수: “ads that pop up and disrupt you mid game”, “ads pop up in the middle”, “interrupt the puzzle with an ad … I’m out.”
- Sudoku.com 리뷰: “ad … every 5 seconds”, “relaxing game … closing the app out of frustration.”
- Puzzmo 리뷰: “ads … cover over your entire UI”, “can’t play … keyboard blocked.”
- Really Bad Chess 리뷰: “scam-y ads”, “deleting.”

해석:

- 퍼즐 유저는 광고 자체보다 “몰입 중단”과 “오작동/사기성 광고”에 강하게 반응한다.
- Daily Loop Puzzle은 현재 광고가 없으므로 “no ads”는 trust point로 쓸 수 있다. 단, 향후 monetization을 고려한다면 “MVP has no ads”처럼 현재 범위로 제한해야 한다.

카피 적용:

- Hero/FAQ에 “No interrupting ads in the current MVP”를 추가 후보로 둔다.
- “free forever / never ads” 같은 미래 약속은 금지.

### 2. “구독/paywall 전환은 무료 daily habit과 충돌하면 반감이 큼”

직접 증거:

- NYT Games 리뷰: “pay to get full access.”
- Puzzmo 리뷰: “one puzzle a day unless you pay”, “no daily puzzling app is worth a subscription”, “MAYBE a one time purchase if it’s good.”
- Knotwords 리뷰: “paywall locking if you miss a single day in your streak.”

해석:

- daily puzzle은 무료 루틴으로 시작하는 경우가 많아, 갑작스러운 제한/구독 전환이 배신감으로 읽힌다.
- Daily Loop Puzzle은 지금 결제 없음이 장점이지만, future premium 가능성을 암시하지 않는 것이 안전하다.

카피 적용:

- MVP 카피: “No account, no subscription, no payment in this MVP.”
- avoid: “premium coming soon”, “unlock more” 같은 조기 수익화 냄새.

### 3. “짧지만 생각할 거리가 있어야 한다: easy-but-satisfying”

직접 증거:

- Knotwords 리뷰: “easy puzzles are satisfying”, “less than 30 seconds, but still calls for some thought.”
- Figure HN: “satisfying interactions”, 반대로 “11 moves felt like too many … accidentally solved … lacked elegant idea.”
- Dogbunny HN: “simple enough to be intuitively picked up but complex enough to spend a good 20 minutes trying to solve.”
- Sudoku.com 리뷰: “tutorial told me how to play easily”, “works my brain.”

해석:

- 유저가 원하는 것은 “긴 수학”이 아니라 “짧은 성공감 + 약간의 사고”다.
- Daily Loop Puzzle의 “1-3분”은 좋지만, “too easy / accidental solve” 위험이 있다. 카피에서는 “quick”과 “not brainless” 사이 균형이 필요하다.

카피 적용:

- “A quick number puzzle with just enough thinking for a short break.”
- “Not a math test — just tap connected numbers to hit the target.”

### 4. “첫 조작/규칙 이해가 안 되면 바로 friction이 생김”

직접 증거:

- Hidden Mirrors HN: “tutorial levels were quick and effective.”
- Hidden Mirrors HN: “Took me a good moment to figure out the controls and concept.”
- Hidden Mirrors HN: “Got stuck on the first swipe diagonal example … Need a hint or even solve button.”
- Parlor/daily logic HN 유사 comment: “only if” 문구가 “if and only if”인지 헷갈린다는 규칙 언어 objection.

해석:

- Daily Loop Puzzle의 20초 demo는 중요한 conversion asset이다.
- “connected horizontally or vertically”는 UX상 필요하지만 첫 문장에 넣으면 부담스러울 수 있다.

카피 적용:

- First-run headline은 “Learn by tapping 2 + 5 = 7”처럼 행동 기반으로 바꿔볼 수 있다.
- Help/FAQ는 “상하좌우로 붙은 타일만 이어집니다. 대각선은 연결로 보지 않습니다.”를 명시하는 것이 좋다.

### 5. “모바일/터치/화면 잘림은 launch 전에 꼭 막아야 하는 신뢰 문제”

직접 증거:

- Hidden Mirrors HN: “On phone it works perfectly” vs desktop gesture 문제.
- Hidden Mirrors HN: Android/Firefox swipe가 scroll로 처리된다는 조작 불만.
- Dogbunny HN: iOS Safari에서 bottom part가 cut off.
- Puzzmo 리뷰: “hard to play … can’t zoom in”, 특히 iPhone/Tablet readability.
- Really Bad Chess 리뷰: update 후 board/menu edge가 잘림.

해석:

- 모바일 우선 카피는 실제 모바일 QA와 같이 가야 한다. 미검증 상태에서 “perfect mobile experience”라고 쓰면 위험하다.
- Daily Loop Puzzle은 tap 기반이라 swipe보다 안전하지만, 실제 iOS/Android share/clipboard/touch 검증 전에는 “mobile-first layout” 정도로 제한해야 한다.

카피 적용:

- “mobile-first”는 유지.
- “works great on every phone”은 금지.
- FAQ에 “Current MVP still needs final real-device share/clipboard check before public launch”를 내부 문서에 유지.

### 6. “정답/판정이 불공정하거나 모호하면 퍼즐 신뢰가 깨짐”

직접 증거:

- Triword HN: valid alternative answer가 accept되지 않는다는 complaint.
- Triword HN: obscure words를 solution으로 쓰거나 alternate로 인정할지 논쟁.
- Knotwords 리뷰: 단어 정의/word choice가 이상하다는 불만.
- Sudoku.com 리뷰: auto-complete가 puzzle-solving agency를 빼앗는다는 불만.

해석:

- Daily Loop Puzzle은 단어 validity 문제는 없지만 “선택한 합이 Target과 같은데 왜 실패인가?” 같은 연결 규칙/6 moves 규칙의 불만이 생길 수 있다.
- 결과/실패 상태에서 “Selected must be connected”와 “6 moves used”를 명확히 보여줘야 한다.

카피 적용:

- Failure copy: “Not solved: your selected tiles didn’t make the target within 6 moves.”
- Disconnected hint: “Tiles need to touch side-by-side, not diagonally.”

### 7. “Streak, archive, reminder는 retention trigger지만 과하면 압박/잠금으로 보임”

직접 증거:

- Knotwords 리뷰: “1400 day streak”, “nearly 200 daily streak”, “nearly 6 month streak.”
- Figure HN: “email … daily unobtrusive reminder”, “archive of past puzzles.”
- Hidden Mirrors HN: “daily puzzle … Wordle style”가 이 case에 맞을지 의문, “open up all puzzles” 선호 의견.
- Puzzmo/Knotwords 리뷰: streak/paywall 결합에 대한 반감.

해석:

- streak는 습관 장치지만, 손실회피/잠금/유료화와 연결되면 분노 포인트가 된다.
- Daily Loop Puzzle은 “official first result + practice replay”가 있어 retention과 fairness를 동시에 설명할 수 있다.

카피 적용:

- “Build a tiny streak in your browser” 정도는 가능.
- “Never miss a day”, “protect your streak”, “pay to recover streak” 류는 피한다.

### 8. “Share motivation은 brag보다 spoiler-free comparison”

직접 증거:

- Wordle/NYT류 공개 논의의 핵심은 하루 1판, 결과 공유, spoiler-free pattern이다.
- Figure/HN 댓글에서 “daily reminder”, “archive”, “satisfying interactions”가 공유/재방문 동기와 연결된다.
- 기존 `launch-assets.md`의 share preview는 이 패턴과 이미 맞는다.

해석:

- Daily Loop Puzzle의 share copy는 “친구에게 자랑”보다 “결과만 비교, 답은 숨김”으로 설명해야 부담이 낮다.
- 숫자 퍼즐은 solution values를 드러내면 spoiler가 되므로 현재 grid-only share는 장점이다.

카피 적용:

- “Compare results without giving away the tiles.”
- “Copy a result card that hides the answer.”

## 고객 세그먼트/ICP 가설

### Primary ICP

“Wordle/NYT Games류 daily puzzle habit sharer”

- 매일 한 번, 짧게 끝나는 퍼즐을 선호.
- 결과 공유 포맷을 이미 이해.
- 긴 가입/설치/결제보다 즉시 플레이를 선호.
- 주요 job: 쉬는 시간에 머리를 조금 쓰고, 결과를 스포일러 없이 비교.
- 구매/수익화 신호: 직접 결제보다 광고 없는 경험/아카이브/추가 퍼즐에 대한 one-time purchase 가능성. 단, 현재 MVP에서는 결제 카피 금지.

### Secondary ICP 1

“Casual number/logic puzzle player”

- Sudoku, 숫자 게임, 간단한 logic puzzle에 익숙.
- 원하는 것: 쉬운 tutorial, 명확한 rule, 과한 그래픽/광고 없는 안정적 경험.
- objection: 수학이 어렵거나 계산이 많을 것 같다는 걱정.

### Secondary ICP 2

“Mobile web casual game tester / HN/Product Hunt feedback giver”

- Show HN/Product Hunt류에서 작은 실험을 눌러보고 UX 피드백을 주는 사람.
- 원하는 것: 기술적으로 honest한 설명, no backend/local-first, 빠른 로딩, 모바일/데스크톱 조작 안정성.
- objection: polish 부족, settings dead button, mobile cut-off, clipboard 불확실성.

## 추천 카피 변경 방향

### Hero/positioning

현재 방향:

- “A tiny daily number puzzle with spoiler-free sharing.”
- “Pick connected number tiles to hit today’s target.”

추천 보강:

- 첫 문장은 더 쉬운 행동 언어로 낮춘다: “Tap numbers to hit today’s target.”
- 두 번째 문장에서 constraint를 설명한다: “Tiles need to connect side-by-side.”
- trust point를 가까이 둔다: “No account, no ads, no analytics in this MVP.”

### Onboarding

추천 보강:

- “20-second example”을 규칙 설명보다 먼저 노출.
- 예제 copy를 `2 + 5 = 7`처럼 즉시 이해되는 형태로 유지.
- 대각선 연결 불가를 Help에 명확히 추가.

### FAQ

추가/수정 후보:

- “Is this a math test?” → “No. You only add a few small numbers.”
- “Why can’t I select these tiles?” → “Tiles must touch side-by-side; diagonal tiles do not count as connected.”
- “Do I need an account or subscription?” → “No account, no subscription, no payment in the current MVP.”
- “Will ads interrupt the puzzle?” → “No ads in the current MVP.”

### Share copy

추천 보강:

- “spoiler-free”의 의미를 구체화: “shows your result pattern, not the answer values.”
- 실패 공유도 부끄럽지 않게: “Tried today’s loop” 같은 neutral wording 고려.

## Sean 리뷰용 미공개 copy snippet 후보

아래 문구는 모두 unpublished/internal draft다. 외부 게시 전 Sean 승인과 실제 모바일/share QA가 필요하다.

### 1. Landing hero — English

Headline:

> Tap numbers to hit today’s target.

Subheadline:

> A tiny daily puzzle for a 3-minute break. Pick side-by-side tiles, finish in 6 moves, and copy a spoiler-free result.

Trust line:

> Current MVP: no account, no ads, no analytics, no payment — stats stay in your browser.

### 2. Landing hero — Korean internal

Headline:

> 오늘의 Target을 숫자 타일로 맞춰보세요.

Subheadline:

> 3분 쉬는 시간에 푸는 작은 데일리 퍼즐입니다. 상하좌우로 붙은 타일을 골라 6 moves 안에 목표 합을 맞추고, 정답을 숨긴 결과만 복사합니다.

Trust line:

> 현재 MVP는 로그인, 광고, analytics, 결제, 서버 저장이 없습니다. 기록은 이 브라우저에만 남습니다.

### 3. First-run onboarding card

English:

> New here? Learn with 2 + 5 = 7.
> Try a 20-second example, then play today’s real puzzle.

Korean:

> 처음이신가요? 2 + 5 = 7 예제로 바로 배워보세요.
> 20초 데모를 해보고 오늘의 실제 퍼즐로 넘어갑니다.

### 4. Rule clarity helper

English:

> Tiles must touch side-by-side. Diagonal tiles do not count as connected.

Korean:

> 타일은 상하좌우로 붙어 있어야 합니다. 대각선은 연결로 보지 않습니다.

### 5. Result/share helper

English:

> Share your result without revealing the answer values.

Korean:

> 정답 숫자는 숨기고 결과 패턴만 공유합니다.

### 6. Objection: account/subscription

English:

> No account or subscription is needed for the current MVP. Open the puzzle and play.

Korean:

> 현재 MVP는 계정이나 구독이 필요 없습니다. 열고 바로 플레이하면 됩니다.

### 7. Objection: ads/data

English:

> The current MVP has no interrupting ads, backend, analytics, or payment flow. Your result and streak stay in this browser unless you copy/share the result text yourself.

Korean:

> 현재 MVP에는 플레이를 끊는 광고, 백엔드, analytics, 결제 흐름이 없습니다. 결과와 streak는 직접 공유하지 않는 한 이 브라우저 안에만 남습니다.

### 8. Objection: “Is this math-heavy?”

English:

> It is not a math test. You only add a few small numbers and look for a connected path to the target.

Korean:

> 수학 시험이 아닙니다. 작은 숫자 몇 개를 더해 Target에 닿는 연결을 찾는 퍼즐입니다.

### 9. Failure-state copy

English:

> Not solved yet: your selected tiles did not hit the target within 6 moves. Replay is practice only; today’s first completed result stays official.

Korean:

> 아직 성공하지 못했습니다. 6 moves 안에 선택 합이 Target에 닿지 않았습니다. 다시 풀기는 연습으로만 처리되고, 오늘 첫 완료 기록이 공식 기록입니다.

### 10. Product Hunt / HN maker note opening

English:

> I built Daily Loop Puzzle as a small daily puzzle experiment: no account, no ads, no backend, just one quick number puzzle and a spoiler-free result card. I’m looking for feedback on rule clarity, mobile feel, and whether the share text makes sense.

Korean internal note:

> 외부 게시 전 Sean 승인 필요. HN/Product Hunt에서는 hype보다 구현 범위와 feedback 요청을 짧게 말하는 편이 안전하다.

## Avoid-list / 금지 또는 주의 표현

현재 근거/구현 기준으로 피해야 할 표현:

1. “The best daily puzzle”, “addictive”, “scientifically improves brain/focus”
   - 공개 VOC에는 재미/집중 언급이 있지만 효능 claim 근거는 없다.
2. “Works perfectly on all phones”
   - 실제 모바일 share/clipboard/touch 검증이 launch blocker로 남아 있다.
3. “Free forever”, “No ads ever”, “No subscription ever”
   - 현재 MVP 사실은 “no ads/payment in current MVP”까지만 안전하다.
4. “Loop/graph puzzle”을 과하게 암시하는 문구
   - v1은 connected-target selection이지 full loop mechanic이 아니다.
5. “Compete with friends”를 강하게 밀기
   - 계정/leaderboard가 없고 개인정보/소셜 기능도 없다. “compare copied results” 정도가 안전하다.
6. “We collect no data”의 절대 표현
   - 더 안전한 표현: “No backend or analytics in the current MVP; gameplay summary is stored locally in this browser.”
7. “Daily reminder / email me” 기능 언급
   - VOC에는 reminder 수요가 있지만 현재 구현/승인 범위 밖이며 개인정보 수집이 필요하다.
8. “Archive all past puzzles” 약속
   - 수요는 있으나 구현 범위 밖. backlog candidate로만 둔다.
9. “Official launch / public beta”
   - 외부 공개 approval gate가 잠겨 있으므로 내부 문서에서만 “draft”로 유지.

## 우선순위 추천

### Copy-only, 안전하게 바로 반영 가능한 내부 초안

1. `launch-assets.md` hero 후보에 “no ads/no subscription in current MVP” trust line 추가.
2. FAQ에 “Is this a math test?”, “Are diagonal tiles connected?”, “Will ads interrupt play?” 추가.
3. onboarding copy를 “2 + 5 = 7” 중심으로 더 행동형으로 바꾸는 후보 추가.
4. share copy 설명에 “answer values are hidden”을 명시.

### 구현/QA 후에만 반영할 후보

1. 실제 모바일 Safari/Chrome clipboard/share tap 검증 후 “copy result” claim 강화.
2. responsive viewport 390x844 실제 확인 후 “mobile-first” claim 유지/강화.
3. archive/reminder/streak recovery는 개인정보/결제/retention 압박 이슈가 있어 별도 approval gate 전까지 문구화하지 않음.

## 불확실성

- App Store RSS는 최근 리뷰 50개 중심이라 표본이 최신 이슈/불만 쪽으로 치우칠 수 있다.
- HN Show HN 댓글은 maker/technical audience에 치우쳐 일반 모바일 casual puzzle 유저와 다를 수 있다.
- Reddit은 공개 JSON 접근이 403으로 막혀 이번 산출물에는 직접 사용하지 않았다.
- 리뷰의 원문 감정이 강한 경우가 있어, Daily Loop Puzzle에 그대로 일반화하면 안 된다. 반복된 theme만 카피 입력으로 사용해야 한다.
- Daily Loop Puzzle의 실제 retention/share 성과는 아직 외부 launch 전이라 검증되지 않았다.

## 결론

Daily Loop Puzzle의 launch/onboarding copy는 “새로운 숫자 퍼즐”보다 “방해 없는 daily habit”으로 포지셔닝하는 것이 더 설득력 있다. 공개 VOC 기준으로 가장 강한 차별 포인트는 빠른 이해, 짧은 플레이, 스포일러 없는 공유, 그리고 현재 MVP의 no account/no ads/no analytics/no payment/local-only 신뢰 문구다. 다만 모바일 clipboard/share와 실제 터치 QA가 끝나기 전에는 “완벽한 모바일 공유 경험”처럼 과장하지 말고, Sean 승인 전까지 모든 문구는 unpublished draft로 유지해야 한다.
