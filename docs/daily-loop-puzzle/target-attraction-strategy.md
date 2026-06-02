# Daily Loop Puzzle — attraction hook and target-segment strategy

Status: Sean 내부 검토용 전략 노트
Date: 2026-06-01
Owner: marketer
Approval boundary: 이 문서는 내부 전략 산출물이다. Sean 승인 전에는 공개 배포, 외부 게시, 커뮤니티/고객 접촉, 도메인/도구 구매, analytics/ads/payment 연동, 개인정보 수집을 하지 않는다.

## 1. 추천 포지셔닝

Daily Loop Puzzle은 “하루 1판, 1~3분 안에 끝나는 모바일 숫자 퍼즐”로 포지셔닝한다. 첫 외부 테스트 전 가장 먼저 강조할 hook은 “규칙 설명”이 아니라 “실제 예시/demo를 보고 바로 이해되는 한 판”이어야 한다.

추천 한 줄:

> 매일 1판, 연결된 숫자 타일로 오늘의 목표 합을 맞추는 3분 숫자 퍼즐 — 가입 없이 플레이하고, 스포일러 없는 결과만 가볍게 공유합니다.

공격 각도:

- 첫 화면에서 텍스트 설명보다 “예시 보드 → 타일 2~3개 선택 → 합이 Target에 가까워지는 장면 → 성공 결과 카드”를 먼저 보여준다.
- Wordle식 daily/share rhythm은 빌리되, “단어 지식”이 아니라 “숫자/패턴 감각”으로 차별화한다.
- 글로벌 확장성은 “언어 의존도가 낮은 숫자 퍼즐”에서 온다. 다만 v1 카피와 UI는 아직 영어/한국어 혼재이므로, 출시 전 최소 English-first + Korean fallback 또는 locale별 짧은 규칙 문구 정리가 필요하다.

## 2. 명시적 가정과 불확실성

### 가정

1. Daily puzzle 시장에는 “하루 1판”, “streak”, “친구와 결과 비교”, “스포일러 없는 공유”에 익숙한 사용자가 이미 있다.
2. 숫자/타일 기반 규칙은 단어 퍼즐보다 언어 장벽이 낮아 글로벌 확장에 유리할 수 있다.
3. 현재 v1의 connected target selection 규칙은 1~3분 플레이에 맞지만, 텍스트 설명만으로는 첫 사용자에게 즉시 이해되지 않을 수 있다.
4. 초기 monetization은 바로 매출보다 retention/share signal 검증이 우선이다. 광고-only로 월 100만원을 만들려면 큰 pageview가 필요하므로, 먼저 반복 플레이와 공유율을 확인해야 한다.

### 불확실성

1. “Loop”라는 이름이 현재 v1 mechanic과 충분히 맞는지 불확실하다. 현재는 literal graph loop가 아니라 connected-number target puzzle이다.
2. 숫자 퍼즐이 Wordle/Connections 사용자에게 충분히 감정적 매력을 줄지 아직 검증되지 않았다.
3. 난이도 밸런스가 daily habit 형성에 맞는지, 7일 이상 반복 플레이에서 지루함이 생기는지 추가 QA가 필요하다.
4. 공유 카드가 실제로 친구/단톡방/소셜에서 비교 욕구를 만들지 외부 테스트 전에는 알 수 없다.
5. 다국어/글로벌 targeting은 잠재력은 있으나, 현재는 public launch·analytics·user contact가 금지되어 있어 실제 시장 반응 데이터가 없다.

## 3. Attraction hook 평가

| Hook | 매력도 | 근거 | 리스크 | v1 우선순위 |
| --- | --- | --- | --- | --- |
| 실제 예시/demo로 배우기 | 매우 높음 | Sean 코멘트와 일치. 첫 사용자가 텍스트보다 조작 예시로 규칙을 더 빨리 이해할 가능성이 큼. | demo가 길면 daily puzzle의 빠른 느낌을 해칠 수 있음. | 1 |
| Daily ritual / 하루 1판 | 높음 | Wordle, NYT Games, Nerdle, Waffle 등 검증된 반복 사용 패턴. | daily 품질/난이도 관리가 부족하면 습관이 끊김. | 2 |
| Quick completion / 1~3분 | 높음 | NYT Mini Crossword도 “just a few minutes”를 명확히 말한다. 모바일 휴식 시간에 맞음. | 실제 난이도가 3분을 넘으면 불만 발생. | 3 |
| Shareable score / 스포일러 없는 결과 | 높음 | Wordle의 emoji grid 공유처럼 결과 비교가 바이럴 루프를 만들 수 있음. 참고: https://www.weforum.org/stories/2022/02/wordle-game-new-york-times-business-plan/ | 공유 텍스트가 재미 없거나 의미가 불명확하면 확산 약함. | 4 |
| Streak | 중간~높음 | daily game retention에 유효. | 새 사용자에게는 즉시 매력보다 부담으로 느껴질 수 있음. | 5 |
| One board a day | 중간~높음 | scarcity가 재방문 이유를 만든다. | 더 하고 싶은 사용자는 이탈 가능. archive/practice는 나중에 검토. | 6 |
| Comparison with friends | 중간 | score/moves/pattern으로 비교 가능. | 친구가 없으면 가치가 약함. 공유 전 seed/결과 format polish 필요. | 7 |
| Low-friction mobile play | 높음 | no account/no backend/no analytics는 trust와 진입장벽에 강점. | 수익화와 cross-device sync는 늦어진다. | 3과 병렬 |
| Puzzle satisfaction | 중간~높음 | 목표 합을 맞추는 즉시 보상은 명확함. | mechanic이 “새롭다”기보다 “간단하다”에 머물 수 있음. | 계속 개선 |

핵심 판단: v1에서 가장 강한 hook은 “하루 1판” 자체가 아니라 “한눈에 이해되는 daily puzzle demo”다. daily/share/streak는 이미 익숙한 category cue이고, Daily Loop Puzzle만의 첫 conversion 문제는 “뭘 하는 게임인지 바로 알 수 있나?”이다.

## 4. Primary target segment

### Primary: daily puzzle habit sharers

정의:

- Wordle, Connections, Mini Crossword, Nerdle, Waffle 같은 daily puzzle을 이미 아는 사용자.
- 하루에 긴 게임을 하기보다 출근길, 점심, 자기 전 1~3분짜리 mental snack을 찾는다.
- 결과를 친구, 가족, 단톡방, X/Threads 등에 공유하거나 최소한 자기 streak를 확인하는 데 익숙하다.

왜 1순위인가:

- Daily Loop Puzzle의 현재 자산인 one board a day, score, moves, streak, spoiler-free share가 이 segment의 기존 행동과 가장 잘 맞는다.
- 교육 비용이 낮다. “Wordle-style daily rhythm, but a connected number board”로 category를 빠르게 잡을 수 있다.
- 외부 launch 후 첫 traction이 생긴다면 공유 텍스트와 daily reset이 가장 빠른 organic loop가 된다.

Main pain / desired outcome:

- Pain: 매일 짧게 풀 새 퍼즐을 찾지만 너무 어렵거나 시간이 길면 부담스럽다.
- Desired outcome: 오늘의 한 판을 끝내고, 내 결과가 나쁘지 않은지 비교하고, streak를 이어간 느낌을 얻는다.

Objections:

- “숫자 퍼즐이면 수학처럼 어려운가?”
- “Wordle clone 아닌가?”
- “Loop라는데 실제 loop mechanic이 있나?”
- “가입/앱 설치/광고가 필요한가?”
- “한 판만 있으면 너무 적지 않나?”

Attack angle:

- 첫 문장: “3분 숫자 퍼즐”
- 첫 시각: 실제 4x4 예시 보드와 타일 선택 demo
- 첫 proof: “No account. No download. Spoiler-free result.”
- 첫 CTA: “Play today’s puzzle”보다 launch 전 copy에서는 “See how it works” 또는 “Try the example”을 선행한다.

Message angle variants:

1. “Wordle처럼 하루 한 판, 단어 대신 연결된 숫자 타일.”
2. “출근길 3분: 오늘의 target을 6 moves 안에 맞춰보세요.”
3. “정답은 숨기고, 결과만 공유하세요.”
4. “가입 없이 브라우저에서 바로 시작하는 daily number puzzle.”

Channels after Sean approval only:

- Product Hunt: maker/early adopter feedback. “tiny daily number puzzle with spoiler-free sharing.”
- Reddit: r/puzzles, r/WebGames, r/IndieDev 등 rules 확인 후 feedback-first post.
- Hacker News Show HN: local-first/no-backend angle이 있을 때만 적합.
- X/Threads: short demo GIF/video + score card.
- Tistory/블로그: 개발 과정, Wordle-like daily game pattern 분석, launch story.
- SEO: “daily number puzzle”, “daily logic puzzle”, “number puzzle no login”, “오늘의 숫자 퍼즐”.

## 5. Secondary target segments

### Secondary A: number/logic puzzle fans

정의:

- Nerdle, Sudoku, 2048, Kakuro, KenKen, simple math/logic puzzle을 좋아하는 사용자.
- 단어 지식보다 숫자/패턴/최적화 감각을 선호한다.

왜 중요인가:

- Daily Loop Puzzle의 mechanic은 단어보다 숫자와 인접성/합산 판단에 가깝다.
- Nerdle은 Wordle에서 영감을 받은 daily number game으로 자신을 설명하며, “math more accessible”를 mission으로 제시한다. 이는 숫자 퍼즐도 daily category 안에서 자리 잡을 수 있다는 근거다.

Objections:

- “너무 쉽거나 얕은가?”
- “수학 퍼즐이면 계산 스트레스가 큰가?”
- “Nerdle/2048/Sudoku와 뭐가 다른가?”

Message angles:

- “수식 입력이 아니라, 연결된 숫자를 고르는 가벼운 logic puzzle.”
- “복잡한 계산보다 패턴 찾기와 선택 순서가 핵심입니다.”
- “6 moves 안에 target을 맞추는 compact number challenge.”

Channels after approval:

- SEO: daily number puzzle, math puzzle, logic puzzle, 2048 alternative.
- Puzzle/game communities: 직접 홍보보다 feedback request 형태.
- Short-form demo: 타일 선택과 합산 변화가 보이는 5~8초 영상.

### Secondary B: global low-language mobile casual players

정의:

- 영어권뿐 아니라 한국어/일본어/스페인어 등 다양한 언어권에서 짧은 모바일 퍼즐을 즐기는 사용자.
- 긴 설명, 계정 생성, 앱 설치를 싫어하고 브라우저에서 바로 해보는 것을 선호한다.

왜 중요인가:

- 숫자, grid, emoji result는 언어 의존도가 낮다.
- NYT Games는 Wordle, Connections, Strands, Mini Crossword 등 다양한 daily games를 “everyone can enjoy playing every day”로 묶는다. Daily Loop Puzzle도 장기적으로 daily puzzle shelf의 하나가 되는 방향을 참고할 수 있다.
- Waffle처럼 supporter/ad/archive/premium daily mode로 확장하는 사례는 작은 daily puzzle도 글로벌 niche monetization option을 가질 수 있음을 보여준다.

Objections:

- “내 언어로 규칙이 충분히 명확한가?”
- “브라우저 저장이면 기기 바꾸면 기록이 없어지나?”
- “모바일 터치가 편한가?”

Message angles:

- “No account, no download — play in your browser.”
- “Numbers travel better than words: one small puzzle every day.”
- “Learn by example first, then play today’s board.”

Channels after approval:

- Locale-specific landing copy and SEO pages, starting with English/Korean only.
- Demo-first social clips that do not rely on spoken language.
- Later: localized share text and “How to play” snippets.

## 6. Public analog comparison

| Analog | URL | 관련 패턴 | Daily Loop Puzzle에 주는 시사점 |
| --- | --- | --- | --- |
| Wordle / NYT | https://www.nytimes.com/games/wordle/index.html | “A new puzzle is available each day”, 6 tries, 결과 공유 문화. | category anchor로 강력하지만 clone처럼 보이면 안 됨. “daily rhythm only borrowed”라고 설명. |
| NYT Games portfolio | https://www.nytco.com/games/ | Wordle, Connections, Strands, Spelling Bee, Mini Crossword 등 daily games shelf. Mini Crossword는 “just a few minutes”를 강조. | Daily Loop Puzzle도 “몇 분짜리 daily break”라는 shelf positioning이 적합. |
| NYT Wordle acquisition note | https://www.nytco.com/press/wordle-new-york-times-games/ | Wordle은 2021-11-01 90명에서 약 두 달 후 300,000명, 발표 시점 millions of daily players까지 성장했다고 NYT가 발표. | simplicity + daily scarcity + shareability는 proven pattern. 단, 같은 수준의 성장을 주장하면 과장. |
| Nerdle | https://nerdlegame.com/ | Wordle에서 영감을 받은 daily number game. 6 guesses, colored clues, browser/mobile app, “math more accessible”. | 숫자 기반 daily puzzle segment가 존재. Daily Loop Puzzle은 “수식 입력”보다 낮은 friction으로 차별화 가능. |
| Waffle | https://wafflegame.net/ | daily puzzle, stats/streak, share/copy, archive, supporter benefits, ads/premium daily feature. | 장기 monetization은 supporter/archive/premium mode가 가능하지만 Sean 승인 전 ads/payment/email verification은 금지. |
| 2048 | https://play2048.co/ | 단순 규칙, 빠른 이해, 브라우저 확산, 점수 비교. | “즉시 이해되는 mechanic”이 중요. Daily Loop Puzzle도 first demo가 필요. |

## 7. 먼저 강조해야 할 hook

Launch 전 최우선 hook:

> “실제 예시로 5초 안에 이해되는 daily number puzzle”

이유:

1. Sean의 피드백과 직접 일치한다. 첫 사용자는 텍스트 instruction보다 실제 예시/demo로 게임을 이해해야 한다.
2. Wordle-like daily ritual은 이미 차별점이 아니라 category cue다. 사용자가 떠나는 지점은 “매일 한 판이구나”가 아니라 “그래서 뭘 눌러야 하지?”일 가능성이 높다.
3. 숫자 퍼즐은 “수학 같아서 어렵다”는 objection이 생길 수 있으므로, 예시로 “계산 게임”이 아니라 “타일 선택 게임”임을 보여줘야 한다.
4. 글로벌 타겟에서도 demo는 번역 비용보다 강하다.

권장 첫 화면 구조:

1. Hero: “Match today’s target in 6 moves.”
2. Sub: “Pick connected number tiles. One board a day. No account.”
3. Mini demo card:
   - Target 18
   - 4x4 board 일부 표시
   - Step 1: 7 선택 → selected 7
   - Step 2: 5 선택 → selected 12
   - Step 3: 6 선택 → selected 18 → success
4. CTA row:
   - Primary: “Try today’s puzzle”
   - Secondary: “See 10-second example”
5. Proof chips:
   - 1–3 min
   - Spoiler-free result
   - Local-only MVP / no account

## 8. Launch copy가 피해야 할 것

피해야 할 표현:

1. “완전히 새로운 퍼즐 장르”
   - 근거 부족. Wordle/2048/Nerdle/Waffle 등 유사 패턴이 있다.
2. “중독성 있는” / “당신을 매일 붙잡아둘”
   - 과장이고 신뢰를 낮춘다.
3. “Loop puzzle”을 literal graph-loop mechanic처럼 보이게 하는 문구
   - 현재 v1은 connected target selection이다. “loop”는 daily habit/share loop에 가깝다.
4. “수학 실력을 올려준다”, “두뇌 훈련 효과 보장”
   - 교육/인지 개선 claim은 증거가 없다.
5. “전세계가 플레이하는”
   - 아직 외부 launch 전이며 사용자 데이터가 없다.
6. “완벽한 privacy”
   - no backend/no analytics는 말할 수 있지만 완벽한 privacy라는 절대 표현은 피한다.
7. fake urgency: “오늘 안 하면 놓칩니다”
   - daily scarcity는 제품 구조로 충분하다. 과도한 urgency는 불필요.
8. “친구들이 이미 하고 있다”
   - 현재 증거 없음.

안전한 표현:

- “internal/local MVP”
- “no account, no backend, no analytics in the current MVP”
- “spoiler-free result text”
- “designed for a 1–3 minute break”
- “Wordle-style daily rhythm, but a small connected-number board”

## 9. Ready-to-use copy variants

### Korean landing hero

Headline A:

> 오늘의 목표 합을 6번 안에 맞춰보세요.

Subheadline:

> Daily Loop Puzzle은 매일 1판 열리는 3분 숫자 퍼즐입니다. 연결된 숫자 타일을 고르고, 결과는 스포일러 없이 공유하세요. 가입은 필요 없습니다.

CTA:

> 오늘 퍼즐 풀기

Secondary CTA:

> 예시로 먼저 보기

### English landing hero

Headline A:

> Match today’s target in 6 moves.

Subheadline:

> A tiny daily number puzzle: pick connected tiles, finish in a few minutes, and share a spoiler-free result. No account required.

CTA:

> Play today’s puzzle

Secondary CTA:

> See how it works

### Demo-first short social copy

Korean:

> 숫자 설명을 길게 읽을 필요 없이, 예시 한 판으로 바로 이해되는 daily puzzle을 만들고 있습니다. 연결된 타일을 골라 Target을 맞추고, 결과만 스포일러 없이 공유하는 방식입니다. 지금은 Sean 내부 검토용 local MVP입니다.

English:

> Building a tiny daily number puzzle: pick connected tiles, hit the target, share a spoiler-free result. The next thing to improve is the first-time demo, so new players understand the rule before reading instructions.

### Product Hunt/HN-safe angle after approval

> Daily Loop Puzzle is a small local-first daily number puzzle. Each day gives you one 4x4 board, a target number, and 6 moves. The current MVP has no account, backend, analytics, ads, or payments — just a quick puzzle loop and spoiler-free result text.

## 10. Segment-channel-message matrix

| Segment | Primary desired outcome | Best first message | Best proof | Channel after approval | Main objection to answer |
| --- | --- | --- | --- | --- | --- |
| Daily puzzle habit sharers | 오늘의 한 판 완료 + 결과 비교 | “Wordle-style daily rhythm, but connected numbers.” | demo, share card, streak | Product Hunt, Reddit puzzle/webgame, X/Threads, Tistory | “이거 어떻게 하는 거야?” |
| Number/logic puzzle fans | 짧고 깔끔한 숫자 challenge | “Not equations — pick connected tiles to hit the target.” | target/moves/scoring clarity | SEO, puzzle communities, demo clips | “너무 쉽거나 수학 스트레스인가?” |
| Global low-language mobile casual players | 설치/가입 없이 바로 플레이 | “Numbers travel better than words.” | no account, mobile demo, localized microcopy | locale landing/SEO, short clips | “내 언어로 이해되나?” |

## 11. 다음 내부-safe 권장 작업

1. Product/UX task: 첫 화면에 5~10초 playable 또는 animated example/demo를 추가하는 설계안을 만든다.
2. Copy task: How to play를 “규칙 목록”보다 “예시 3 step” 중심으로 바꾼다.
3. QA task: demo를 본 사용자와 보지 않은 사용자가 첫 move를 이해하는지 내부 5명 이하 비공개 관찰 기준을 설계한다. 단, 외부 사용자 모집/접촉은 Sean 승인 전 금지.
4. Growth task: 외부 승인 전까지는 launch copy를 publish하지 말고, demo GIF/storyboard와 landing headline A/B 초안만 내부 준비한다.
5. Localization task: English/Korean microcopy를 분리하고, 숫자/emoji 중심 share text가 언어권별로 자연스러운지 검토한다.

## 12. 최종 판단

Daily Loop Puzzle의 첫 launch hook은 “하루 1판”이나 “streak”보다 “예시로 바로 이해되는 3분 숫자 퍼즐”이어야 한다. primary target은 Wordle/NYT Games류 daily puzzle habit sharers로 잡고, 첫 공격은 demo-first onboarding + spoiler-free share card로 한다. secondary로는 number/logic puzzle fans와 global low-language mobile casual players를 둔다. v1 copy는 no-account/local-first/quick daily play를 신뢰 포인트로 쓰되, “새 장르”, “전세계 인기”, “두뇌 향상”, literal loop mechanic 같은 unsupported claim은 피한다.
