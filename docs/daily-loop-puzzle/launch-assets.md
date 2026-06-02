# Daily Loop Puzzle launch assets (unpublished draft)

Status: Internal draft for Sean review only.
Approval boundary: Do not publish, deploy, post, contact communities/users, buy domains/tools, add analytics/ads/payments, collect user data, or change external accounts until Sean explicitly approves the relevant gate.

## Recommended positioning

Daily Loop Puzzle is a tiny mobile-first daily number puzzle: pick connected tiles to match today's target, finish in 1-3 minutes, and copy a spoiler-free result without creating an account.

Short Korean positioning option:

매일 1판, 1-3분 안에 푸는 공유형 숫자 퍼즐 — 가입 없이 오늘의 목표 합을 맞추고 결과만 가볍게 복사합니다.

## One-line positioning variants

1. A one-puzzle-a-day number game where you tap connected tiles to hit today's target, then share a spoiler-free result.
2. A local-first daily number puzzle designed to be understood quickly, played on mobile, and shared without spoilers.
3. Wordle-style daily rhythm, but for a small connected-number puzzle you can finish in a couple of minutes.
4. 매일 한 판, 연결된 숫자 타일로 목표 합을 맞추는 모바일 퍼즐.

## Product Hunt-safe draft

### Name

Daily Loop Puzzle

### Tagline options

- A tiny daily number puzzle with spoiler-free sharing.
- Tap connected tiles, match today's target, share your result.
- A local-first daily puzzle for quick mobile breaks.

### Short description

Daily Loop Puzzle is a small daily web puzzle. Each day gives you a 4x4 board, a target number, and 6 moves to select connected number tiles that match the target. When you finish, you can copy a spoiler-free result card. The current MVP is local-only: no account, no backend, no analytics, no payments.

### Longer description

Daily Loop Puzzle is built for the familiar “one puzzle per day” habit, but with a compact number-board mechanic instead of words. Open the puzzle, check today's target, tap connected tiles, and try to match the target within 6 moves. Your first completed result for the day is stored locally in the browser, and the share text avoids revealing the answer.

This is currently an internal/local MVP. Before any public launch, it still needs Sean approval plus final mobile and clipboard checks.

### Maker comment draft

I built Daily Loop Puzzle as a small daily puzzle experiment: quick to understand, mobile-first, and shareable without spoilers. The first MVP runs fully in the browser with localStorage only — no login, backend, analytics, payments, or external API calls.

The current rule is intentionally simple: select connected number tiles so their sum matches today's target. I’m using this MVP to validate whether the daily/share loop feels fun before adding complexity.

## Reddit-safe draft

Use only after Sean approval and after checking the target subreddit rules. Avoid drive-by promotion. Prefer communities that allow feedback posts or maker/showcase posts.

### Title options

- I made a tiny daily number puzzle you can finish in a few minutes
- Feedback wanted: a mobile-first daily number puzzle with spoiler-free sharing
- Built a local-first daily puzzle MVP — looking for UX feedback

### Body draft

Hi — I made a small daily number puzzle as a local-first web MVP.

The idea is simple: each day has a 4x4 board and a target number. You tap connected number tiles and try to match the target within 6 moves. When you finish, the result can be copied in a spoiler-free format, so people can compare outcomes without revealing the answer.

A few design choices:

- one puzzle per day
- mobile-first layout
- no account or login
- no analytics, ads, payments, or backend in the current MVP
- daily result/streak stored only in the current browser via localStorage

I’m mainly looking for feedback on whether the rule is clear quickly, whether the board feels fair, and whether the share result is understandable.

If this kind of post is not allowed here, I’m happy to remove it.

### Reddit comments / reply snippets

If asked “Is this like Wordle?”

It borrows the one-puzzle-per-day and spoiler-free share rhythm, but the mechanic is a small connected-number board rather than guessing words.

If asked “What data do you collect?”

In the current MVP, none from the server side because there is no backend. The app stores only local gameplay summary in the browser's localStorage so it can show today’s result and basic streak stats on that device.

If asked “Why called Loop?”

The first MVP is a connected-tile target puzzle. The name points toward the daily habit/share loop and possible future loop mechanics, but I’m intentionally avoiding claims that v1 has a complex graph-loop rule.

## Hacker News-safe draft

Use only after Sean approval. HN tone should be specific, technical, and non-hype. Suitable only if there is an actual URL and the post is allowed/appropriate.

### Show HN title options

- Show HN: Daily Loop Puzzle — a local-first daily number puzzle
- Show HN: I built a tiny daily number puzzle with no backend
- Show HN: A mobile-first daily puzzle stored only in localStorage

### Body / comment draft

I built a small daily puzzle MVP in Vite + React + TypeScript.

Each UTC day generates a deterministic 4x4 number board and target. The player selects connected tiles and tries to match the target within 6 moves. The first completed result for the day is stored in localStorage, and the share text is spoiler-free.

Current boundaries:

- no backend
- no account/login
- no analytics, ads, payments, or third-party runtime SDKs
- no app-code external API calls
- localStorage only for played/solved/streak/best-score summary

This is intentionally a small MVP. The v1 rule is connected-target selection, not a full graph-loop mechanic. I’m using it to test whether the daily/share puzzle loop is understandable and fun before adding more complexity.

Feedback especially welcome on rule clarity, mobile feel, and whether the share output makes sense without revealing the answer.

## Short social posts

### X / Threads / LinkedIn short variants

1. Built a tiny daily number puzzle MVP: tap connected tiles, match today’s target, and copy a spoiler-free result. Local-first for now: no login, backend, analytics, or payments.

2. Daily Loop Puzzle is a small “one puzzle per day” experiment. 4x4 board, target number, 6 moves, spoiler-free sharing. The first MVP is local-only while I test the core feel.

3. New internal MVP: Daily Loop Puzzle. It’s a mobile-first daily number puzzle designed to be understood quickly and played in 1-3 minutes. No account. No backend. Just the puzzle loop.

4. I’m testing a simple daily puzzle mechanic: select connected number tiles until the sum matches today’s target. If the loop feels good, the next step is mobile/share polish.

5. 매일 1판 숫자 퍼즐 MVP를 만들었습니다. 4x4 보드에서 연결된 타일을 골라 목표 합을 맞추고, 스포일러 없는 결과를 복사하는 방식입니다. 지금은 내부/local-only 검증 단계입니다.

### Longer launch post draft

I’ve been working on Daily Loop Puzzle, a small daily number puzzle for mobile.

Each day gives you a 4x4 board and a target number. You tap connected tiles, try to match the target within 6 moves, and then copy a spoiler-free result card if you want to compare with someone else.

The current MVP is deliberately constrained:

- one puzzle per day
- 1-3 minute play session
- localStorage only for daily result and streak
- no login, backend, analytics, ads, or payments
- no external API calls from the app code

The goal is not to overbuild yet. It’s to see whether the daily puzzle habit and share result are clear enough to be worth improving.

## Landing-page copy draft

### Hero headline options

1. A tiny daily number puzzle for your next 3-minute break.
2. Match today’s target in 6 moves.
3. One daily number puzzle. No account. No spoilers.
4. Tap connected tiles. Hit the target. Share the result.

### Subheadline options

1. Daily Loop Puzzle gives you one 4x4 number board each day. Select connected tiles, match the target, and copy a spoiler-free result when you finish.
2. A mobile-first daily puzzle with a simple rule: choose connected numbers whose sum equals today’s target.
3. Built as a local-first MVP: your daily result and streak stay in your browser unless you choose to share the result text.

### Primary CTA options

Use only after Sean approves deployment.

- Play today’s puzzle
- Try today’s puzzle
- Start today’s loop

### Secondary CTA options

- See how it works
- Read the rules
- Copy my result

### Proof / trust points

Use as product facts, not inflated claims:

- Mobile-first 4x4 board.
- One deterministic puzzle per UTC day.
- Result text is spoiler-free.
- Current MVP has no account, backend, analytics, ads, payments, or external runtime SDKs.
- Stores only local gameplay summary in the current browser.
- Local QA passed unit tests, production build, lint, and dependency audit as of 2026-06-01.

### Objection handling

Objection: “Do I need an account?”

No. The current MVP has no login or account system.

Objection: “Will it spoil the answer when I share?”

The share text is designed to show your result and pattern without revealing the target solution values.

Objection: “Is my data sent somewhere?”

In the current MVP, there is no backend and no analytics. The app stores the day result and basic stats locally in your browser so it can show today’s completed state and streak on that device.

Objection: “Is this a complex math game?”

No. The rule is simple: select connected number tiles so their sum matches the target. It is meant to be quick, not a long calculation exercise.

Objection: “Is the current version a literal loop/graph puzzle?”

Not yet. The v1 mechanic is connected-target selection. Avoid marketing copy that implies a full graph-loop mechanic until that exists.

## FAQ

### What is Daily Loop Puzzle?

Daily Loop Puzzle is a small daily number puzzle. Each day, you get a 4x4 board and a target. Select connected tiles whose numbers add up to the target before you run out of moves.

### How long does one puzzle take?

The MVP is designed for a short session, roughly 1-3 minutes. Actual time will vary by player and puzzle.

### How do I win?

Match the target total by selecting connected tiles. The current MVP gives you 6 moves.

### Can I play more than once?

Your first completed result for the day is treated as the official local result. Later attempts can be treated as practice and should not overwrite that first stored result.

### Does it require an account?

No. The current MVP has no account or login.

### Does it collect analytics or personal data?

The current MVP has no analytics, ads, payments, backend, or external API calls from app code. It stores a small gameplay summary locally in the browser via localStorage.

### What is stored locally?

A local gameplay summary such as day key, solved status, score, moves, completion timestamp, and selected pattern for the result card. This stays in the current browser’s localStorage.

### Can I share my result?

Yes, the MVP includes a spoiler-free share/copy text. Real clipboard behavior still needs a trusted mobile/browser tap check before external launch.

### Why is it called Daily Loop Puzzle?

The name fits the daily habit loop and the intended direction of the puzzle. The current MVP rule is connected-tile target matching, so public copy should avoid implying a more complex loop mechanic until implemented.

### Is it ready to launch publicly?

Not yet. The internal/local MVP is conditionally ready for review, but public deployment and community posting require Sean approval and final mobile/share checks.

## Screenshot shot-list

Capture only after Sean approves screenshot production and only from an approved local or staging environment. Do not include personal data, analytics dashboards, external accounts, or unpublished credentials.

1. Today puzzle empty state
   - Show title, date, target, selected total at 0, moves left, and the 4x4 board.
   - Purpose: explains the core screen at a glance.

2. Mid-solve selected state
   - Show 2-3 selected connected tiles and updated selected total.
   - Purpose: demonstrates interaction and connected-tile mechanic.

3. Success result state
   - Show solved headline, moves/score/selected total, and share/copy button.
   - Purpose: communicates reward moment.

4. Spoiler-free share text preview
   - Show the share output with green/white pattern and no revealed solution values.
   - Purpose: supports social/share loop without spoilers.

5. Stats card
   - Show Played, Solved, Streak, Best score, and Today complete if available.
   - Purpose: shows lightweight retention loop.

6. How to Play screen
   - Show the three simple rules.
   - Purpose: reduces rule clarity objections.

7. Mobile viewport screenshot, 390x844
   - Show no horizontal overflow, readable text, and tappable buttons/tiles.
   - Purpose: validates mobile-first positioning.

8. Optional Korean-localized angle
   - Show Korean helper copy/rule hint if the final app keeps Korean UI copy.
   - Purpose: supports Korean launch/use cases without inventing separate product claims.

## Channel plan (approval-gated)

Internal-safe now:

- Sean review of this copy.
- Local screenshot planning.
- Private review of claims against implemented behavior.
- Local mobile/clipboard QA planning.

Requires Sean approval before action:

- Public URL or deployment.
- Product Hunt listing.
- Reddit/HN/community posting.
- Any external feedback recruitment.
- Any analytics, payment, waitlist, email capture, login, database, or external API integration.
- Domain purchase, social account creation/change, brand/account setup, or tool purchase.

Suggested order after approval:

1. Finish mobile 390x844 and real clipboard checks.
2. Capture screenshots from approved environment.
3. Publish a minimal landing/play page if approved.
4. Do one low-scale feedback post in a rules-compatible community.
5. Review qualitative feedback before scaling to Product Hunt or broader social.

## Approval-gated section: what requires Sean approval before use

Sean approval is required before any of the following:

### Deployment / public access

- Deploying to Vercel, Netlify, Cloudflare, GitHub Pages, a server, or any public URL.
- Sharing a staging URL with people outside the internal team.
- Buying or connecting a domain.

### Posting / launch communication

- Posting on Product Hunt, Reddit, Hacker News, X, LinkedIn, Threads, Instagram, Tistory, YouTube Shorts, or any public/community channel.
- Sending launch copy to newsletters, groups, DMs, forums, or communities.
- Asking external users, customers, friends, or communities to test the app.

### Analytics / payment / data collection

- Adding analytics, ads, tracking pixels, session replay, error monitoring, email capture, waitlists, surveys, login, database, payments, or subscriptions.
- Collecting user data beyond local-only browser storage.
- Changing the privacy posture from “local-only MVP.”

### Accounts / tools / spending

- Creating or changing external product accounts.
- Buying domains, tools, ads, subscriptions, or launch services.
- Connecting social accounts, app stores, payment processors, email providers, or analytics tools.

### Claims / positioning changes

- Claiming public traction, users, revenue, rankings, endorsements, press, or benchmarks that have not happened.
- Claiming legal, financial, health, investment, productivity, education, or cognitive benefits.
- Claiming the current MVP has a full graph-loop mechanic before that is implemented and verified.

## Conservative claim guardrails

Approved-safe factual claims for review drafts:

- “local-only MVP”
- “no account”
- “no backend”
- “no analytics/ads/payments in the current MVP”
- “stores daily result/streak locally in the browser”
- “4x4 daily number puzzle”
- “select connected tiles to match today’s target”
- “spoiler-free result text”

Avoid until proven or approved:

- “viral”
- “addictive”
- “best”
- “privacy guaranteed”
- “secure” beyond specific implementation facts
- “users love it”
- “improves your brain/math/productivity”
- “launching today”
- “available now” unless a public URL is approved and live
- “loop mechanic” if readers may understand that as a full graph-loop rule

## Test variants for Sean review

### Positioning test A: Habit-first

Headline: One daily number puzzle for your next 3-minute break.
Subheadline: Match today’s target by selecting connected tiles, then copy a spoiler-free result.
CTA: Play today’s puzzle

### Positioning test B: Mechanic-first

Headline: Match the target in 6 moves.
Subheadline: Tap connected numbers on a 4x4 board. Your first result of the day is saved locally in your browser.
CTA: Try the puzzle

### Positioning test C: Privacy/local-first

Headline: A daily puzzle with no account and no backend.
Subheadline: Daily Loop Puzzle stores only your local result and streak in the browser while you play one short puzzle per day.
CTA: Start today’s puzzle

### Positioning test D: Korean-first

Headline: 매일 1판, 목표 합 맞추기.
Subheadline: 연결된 숫자 타일을 골라 오늘의 목표를 맞추고, 스포일러 없는 결과를 복사하세요.
CTA: 오늘 퍼즐 풀기

## Internal review checklist before Sean sees this

- No public links included.
- No promise of launch date or availability.
- No claims about users, revenue, traction, or outcomes.
- No legal/financial/health/investment claims.
- Clear note that public deployment/posting/contact requires approval.
- Copy reflects v1 mechanic as connected-tile target matching, not full graph-loop validation.
