# Daily Loop Puzzle first-run demo/onboarding UX spec

Status: Internal draft for Sean review only.
Owner: productdesigner
Last updated: 2026-06-01
Approval boundary: Do not publish, deploy, post externally, contact communities/users, add analytics/ads/payments, collect personal data, buy domains/tools, or change external accounts until Sean explicitly approves the relevant gate.

## 1. User goal and product goal

### User goal

A first-time mobile user should understand the Daily Loop Puzzle rule by doing one tiny guided example before playing today's real puzzle.

The user should leave onboarding knowing:

1. The board has number tiles.
2. The goal is to match the Target total.
3. Selected tiles must be connected horizontally/vertically.
4. Each tap is a move; the real puzzle gives 6 moves.
5. The first completed daily puzzle becomes today's official local result; later plays are practice.

### Product goal

Reduce first-run confusion without slowing returning users.

Design target:

- New user: rule understood in under 20-30 seconds through a worked example.
- Returning user: direct path to Today's Puzzle in 1 tap or less.
- No account, backend, analytics, payment, waitlist, survey, or external integration.

## 2. Core onboarding concept

Use a tiny 2x2 demo board before the real 4x4 board.

Demo puzzle:

```text
Target 7

[ 2 ][ 5 ]
[ 4 ][ 1 ]
```

Worked answer: tap `2`, then tap `5`. The selected total becomes `7`, the two tiles are connected, and the demo shows success.

Why this example:

- The sum is obvious: `2 + 5 = 7`.
- The answer uses adjacent tiles, so the connected rule is visible.
- It avoids requiring the user to solve a full 4x4 before understanding the rule.
- It maps directly to the current MVP rule in `src/lib/puzzle.ts`: selected total equals target and selected cells are orthogonally connected.

## 3. Proposed user flow

```text
First visit
  ↓
Home / Welcome card
  ├─ Primary: Try 20-second demo
  ├─ Secondary: Skip and play today
  └─ Tertiary: How to play
        ↓
Guided demo step 1: target and board
        ↓ tap 2
Guided demo step 2: selected total updates
        ↓ tap 5
Guided demo step 3: success explanation
        ↓
Transition card: "Now try today's puzzle"
        ↓
Today's 4x4 puzzle

Returning visit
  ↓
Home / Today card
  ├─ Primary: Play today's puzzle / View result
  ├─ Secondary: Replay demo
  └─ Tertiary: Help
```

Recommended persistence:

- Store local tutorial completion under `daily-loop-puzzle:onboarding:v1`.
- Value shape: `{ completed: boolean; skipped: boolean; completedAt?: string; skippedAt?: string; locale?: 'ko' | 'en' }`.
- Do not send this anywhere. It is browser-local only.
- If localStorage is unavailable, default to showing a dismissible first-run demo each session and do not block play.

## 4. Screen and state specification

### 4.1 First visit home state

Purpose: Invite the user into a quick demo, not a text-heavy rules page.

Mobile-first wireframe:

```text
┌──────────────────────────────┐
│ Daily puzzle · local-only MVP │
│ Daily Loop Puzzle             │
│ 매일 1판, 목표 합 맞추기      │
├──────────────────────────────┤
│ 처음이신가요?                 │
│ 20초 예제로 바로 배워보세요.  │
│                              │
│ Target 7                     │
│ [2] [5]                      │
│ [4] [1]                      │
│                              │
│ [20초 데모 해보기]            │
│ [건너뛰고 오늘 퍼즐 풀기]      │
│ How to play                  │
└──────────────────────────────┘
```

Behavior:

- Show only when onboarding storage says the user has not completed/skipped the tutorial.
- Primary CTA opens `TutorialDemo` at step 0.
- Skip CTA writes `skipped: true` and starts today's puzzle.
- `How to play` opens the help overlay or current How view.

Internal draft microcopy:

| Element | Korean draft | English draft |
| --- | --- | --- |
| Eyebrow | 내부 MVP · 로컬 저장만 사용 | Internal MVP · local-only |
| Headline | 처음이신가요? 20초 예제로 배워보세요. | New here? Learn with a 20-second example. |
| Body | 작은 예제로 연결된 숫자 타일을 골라 Target을 맞추는 방법을 보여드릴게요. | We’ll show a tiny example: pick connected number tiles to match the Target. |
| Primary CTA | 20초 데모 해보기 | Try the 20-second demo |
| Skip CTA | 건너뛰고 오늘 퍼즐 풀기 | Skip and play today |
| Tertiary | 규칙만 보기 | Read the rules |

### 4.2 Replay tutorial state

Purpose: Let users re-open the demo from Home, How, or Help without resetting today's puzzle.

Entry points:

- Home secondary action after tutorial completion: `Replay demo` / `데모 다시 보기`.
- Help overlay footer: `Show example again` / `예제 다시 보기`.
- How to Play screen after rules list.

Behavior:

- Does not modify today's puzzle moves, result, or stats.
- If opened while a puzzle is in progress, show as modal/overlay and return to the same puzzle state on close.
- If opened from Home, close returns to Home.
- Replay completion should keep `completed: true`; it should not overwrite official daily result.

Internal draft microcopy:

| Element | Korean draft | English draft |
| --- | --- | --- |
| Button | 데모 다시 보기 | Replay demo |
| Close | 닫기 | Close |
| Footer note | 데모는 연습용입니다. 오늘 기록에는 반영되지 않습니다. | This demo is practice only. It does not affect today’s result. |

### 4.3 Skip tutorial state

Purpose: Avoid blocking users who already understand the mechanic.

Behavior:

- Skip action immediately starts Today's Puzzle.
- Write `skipped: true` to localStorage so returning users are not forced into the demo.
- Keep a persistent way to replay the demo from Home/Help.
- If the user skips but later opens replay and completes it, update storage to `{ completed: true, skipped: true }` or `{ completed: true, skipped: false }`; either is acceptable as long as the user is not forced again.

Internal draft microcopy:

| Element | Korean draft | English draft |
| --- | --- | --- |
| Skip button | 건너뛰고 오늘 퍼즐 풀기 | Skip and play today |
| Toast optional | 데모는 Help에서 다시 볼 수 있습니다. | You can replay the demo from Help. |

### 4.4 Demo step-by-step states

Use a focused `TutorialDemo` component with deterministic local state. The user can interact, but the demo also guides the correct tap order.

Demo data:

```ts
const DEMO_PUZZLE = {
  target: 7,
  maxMoves: 2,
  cells: [
    { id: 'demo-0', value: 2, row: 0, col: 0 },
    { id: 'demo-1', value: 5, row: 0, col: 1 },
    { id: 'demo-2', value: 4, row: 1, col: 0 },
    { id: 'demo-3', value: 1, row: 1, col: 1 },
  ],
  solutionIds: ['demo-0', 'demo-1'],
};
```

#### Step 0: Orient

```text
┌──────────────────────────────┐
│ Demo 1/3                     │
│ 목표는 Target 7입니다.        │
│                              │
│ Target 7   Selected 0   0/2  │
│                              │
│ [ 2 ] [ 5 ]                  │
│ [ 4 ] [ 1 ]                  │
│                              │
│ 먼저 2를 눌러보세요.          │
│ [건너뛰기]                    │
└──────────────────────────────┘
```

Allowed actions:

- Highlight tile `2` with subtle pulse/ring.
- If user taps `2`, advance to Step 1.
- If user taps another tile, allow selection but show gentle correction and offer reset.

Internal draft microcopy:

| Element | Korean draft | English draft |
| --- | --- | --- |
| Step label | 데모 1/3 | Demo 1/3 |
| Headline | 목표는 Target 7입니다. | The goal is Target 7. |
| Instruction | 먼저 2를 눌러보세요. | First, tap 2. |
| Correction | 좋아요, 하지만 이 예제에서는 2부터 눌러볼게요. | Nice try — for this example, start with 2. |

#### Step 1: Show selected total

After tapping `2`:

```text
┌──────────────────────────────┐
│ Demo 2/3                     │
│ Selected가 2로 올라갔습니다.  │
│                              │
│ Target 7   Selected 2   1/2  │
│                              │
│ [ 2*] [ 5 ]                  │
│ [ 4 ] [ 1 ]                  │
│                              │
│ 이제 옆에 붙은 5를 눌러       │
│ 2 + 5 = 7을 만들어보세요.    │
└──────────────────────────────┘
```

Allowed actions:

- Highlight tile `5`.
- If user taps `5`, advance to Step 2.
- If user untaps `2`, remain in Step 0-like state with copy: `선택을 해제했어요. 다시 2를 눌러보세요.` / `You unselected it. Tap 2 again.`
- If user taps `4` or `1`, show connected/sum explanation and reset option.

Internal draft microcopy:

| Element | Korean draft | English draft |
| --- | --- | --- |
| Step label | 데모 2/3 | Demo 2/3 |
| Headline | Selected가 2로 올라갔습니다. | Selected is now 2. |
| Instruction | 이제 옆에 붙은 5를 눌러 2 + 5 = 7을 만들어보세요. | Now tap the adjacent 5 to make 2 + 5 = 7. |
| Connection hint | 타일은 상하좌우로 이어져야 합니다. | Tiles must connect horizontally or vertically. |

#### Step 2: Success and rule summary

After tapping `5`:

```text
┌──────────────────────────────┐
│ Demo 3/3                     │
│ 성공! 2 + 5 = 7              │
│                              │
│ Target 7   Selected 7   2/2  │
│                              │
│ [ 2*] [ 5*]                  │
│ [ 4 ] [ 1 ]                  │
│                              │
│ 오늘 퍼즐도 같은 방식입니다:  │
│ 연결된 타일을 골라 Target을   │
│ 맞추세요.                    │
│ [오늘 퍼즐 시작하기]          │
│ [데모 다시 해보기]            │
└──────────────────────────────┘
```

Behavior:

- Show success animation no longer than 500ms; avoid delaying CTA.
- Primary CTA writes `completed: true` and starts Today's Puzzle.
- Replay resets demo state.

Internal draft microcopy:

| Element | Korean draft | English draft |
| --- | --- | --- |
| Step label | 데모 3/3 | Demo 3/3 |
| Headline | 성공! 2 + 5 = 7 | Success! 2 + 5 = 7 |
| Rule recap | 오늘 퍼즐도 같은 방식입니다: 연결된 타일을 골라 Target을 맞추세요. | Today’s puzzle works the same way: pick connected tiles to match the Target. |
| Primary CTA | 오늘 퍼즐 시작하기 | Start today’s puzzle |
| Secondary CTA | 데모 다시 해보기 | Try the demo again |

### 4.5 Transition into Today's Puzzle

Purpose: Bridge from the 2x2 example to the real 4x4 board without surprise.

Recommended transition card:

```text
┌──────────────────────────────┐
│ 이제 오늘의 4x4 퍼즐입니다.   │
│ 규칙은 방금과 같고, 기회는    │
│ 6 moves입니다.               │
│                              │
│ [시작하기]                    │
└──────────────────────────────┘
```

Behavior options:

- Preferred: inline transition card with one `Start` tap, then show puzzle. This prevents accidental first move immediately after tutorial.
- Fast option: directly show Today's Puzzle with a dismissible top helper: `방금처럼 연결된 타일을 골라 Target을 맞추세요.`

Internal draft microcopy:

| Element | Korean draft | English draft |
| --- | --- | --- |
| Headline | 이제 오늘의 4x4 퍼즐입니다. | Now try today’s 4x4 puzzle. |
| Body | 규칙은 방금과 같고, 기회는 6 moves입니다. | Same rule as the demo, but you have 6 moves. |
| CTA | 시작하기 | Start |
| Inline helper | 방금처럼 연결된 타일을 골라 Target을 맞추세요. | Just like the demo, pick connected tiles to match the Target. |

### 4.6 Help overlay

Purpose: Give lightweight support without navigating away or resetting progress.

Entry points:

- `?` icon near board status row.
- `How` nav tab can remain as a full page, but Today's Puzzle should use the overlay for quick help.
- Result screen can show `How was this solved?` only as rule explanation, not answer reveal.

Mobile-first wireframe:

```text
┌──────────────────────────────┐
│ ? Help                    X  │
├──────────────────────────────┤
│ 1. Target을 확인합니다.       │
│ 2. 숫자 타일을 눌러 합을      │
│    맞춥니다.                 │
│ 3. 선택 타일은 상하좌우로     │
│    연결되어야 합니다.         │
│ 4. 6 moves 안에 성공하세요.   │
│                              │
│ Mini example: 2 + 5 = 7      │
│ [2*] [5*]                    │
│ [4 ] [1 ]                    │
│                              │
│ [예제 다시 보기]              │
└──────────────────────────────┘
```

Behavior:

- Modal uses `role="dialog"`, `aria-modal="true"`, labelled by title.
- Close returns focus to the button that opened it.
- Escape key closes on desktop.
- Overlay does not mutate puzzle state.
- It may show the 2x2 mini example but must not reveal today's answer.

Internal draft microcopy:

| Element | Korean draft | English draft |
| --- | --- | --- |
| Title | 퍼즐 도움말 | Puzzle help |
| Rule 1 | Target 숫자를 확인합니다. | Check the Target number. |
| Rule 2 | 타일을 눌러 선택 합을 Target에 맞춥니다. | Tap tiles so Selected matches the Target. |
| Rule 3 | 선택한 타일은 상하좌우로 연결되어야 합니다. | Selected tiles must connect horizontally or vertically. |
| Rule 4 | 오늘 퍼즐은 6 moves 안에 끝납니다. | Today’s puzzle ends within 6 moves. |
| Replay CTA | 예제 다시 보기 | Show the example again |
| Close | 닫기 | Close |

## 5. Mobile-first layout notes

### Layout

- Keep the first-run experience in a single-column layout for 360-430px wide screens.
- Avoid horizontal scroll at 390px width.
- Put primary CTA above secondary CTA.
- Demo board should use 2 columns with 56-64px square tiles; real board remains 4 columns.
- On small screens, help overlay should be a bottom sheet or centered card with max-height and internal scroll.

### Touch targets

- All buttons and tiles: minimum 44px height.
- Preferred demo tile size: 56px minimum.
- Maintain 8-12px gap between demo tiles to reduce wrong taps.

### Visual hierarchy

- Highlight the next requested tile with a non-color-only treatment: ring + label + optional arrow.
- Selected tiles should show color, border, and `aria-pressed` state.
- Target and Selected values should stay visible during the demo.
- Use friendly success feedback, but do not over-animate.

### Responsive behavior

- `<= 480px`: full-width cards, stacked buttons, compact helper copy.
- `481-768px`: centered card max-width ~520px.
- `>= 769px`: app shell can remain narrow; do not create desktop-only complexity for MVP.

## 6. Accessibility requirements

- Demo tiles are buttons with `aria-pressed`.
- Demo board can use `role="grid"` and `role="gridcell"`, matching current `PuzzleBoard` pattern.
- The step headline should be announced when step changes. Implementation options:
  - Use an `aria-live="polite"` status message for step instructions.
  - Keep focus on the next actionable tile when appropriate.
- Help overlay uses `role="dialog"`, `aria-modal="true"`, labelled title, close button, focus trap, and focus return.
- Color is never the only indicator: selected state should include border/icon/text.
- Respect `prefers-reduced-motion`; disable pulse/celebration animation when set.
- Korean/English copy should not be mixed inside a single screen after localization is implemented. Current MVP may use mixed copy, but the handoff should support locale dictionaries.

## 7. Implementation handoff for productengineer

### Recommended components

```text
App
├─ OnboardingGate
│  ├─ FirstRunCard
│  ├─ TutorialDemo
│  └─ TutorialTransitionCard
├─ PuzzleBoard (existing)
├─ HelpOverlay
├─ ResultCard (existing)
└─ Stats/How sections (existing inline sections can be extracted later)
```

### New state and types

```ts
type View = 'home' | 'today' | 'result' | 'stats' | 'howToPlay';
type OnboardingMode = 'firstRun' | 'demo' | 'transition' | 'none';
type TutorialStep = 0 | 1 | 2;

type OnboardingStatus = {
  completed: boolean;
  skipped: boolean;
  completedAt?: string;
  skippedAt?: string;
  locale?: 'ko' | 'en';
};
```

Suggested localStorage module:

```ts
const ONBOARDING_KEY = 'daily-loop-puzzle:onboarding:v1';

function loadOnboardingStatus(): OnboardingStatus {
  // Safe parse. If missing or invalid, return { completed: false, skipped: false }.
}

function saveOnboardingStatus(next: OnboardingStatus): void {
  // Best-effort localStorage write. If unavailable, fail silently and keep in-memory state.
}
```

### Suggested app behavior

- On app boot:
  - Load stats as today.
  - Load onboarding status.
  - If not completed/skipped and no todayRecord, show first-run card on Home.
  - If completed/skipped, show current Home behavior.
- `startPuzzle(false)` should not force the tutorial. The gate is handled before this call.
- `Replay demo` opens the demo without resetting puzzle state.
- Completing demo from first-run path should call transition, then `startPuzzle(false)`.
- Completing demo from replay path should close back to the previous view.

### Demo interaction logic

- Keep demo state separate from real `Puzzle` state.
- Do not call `recordDailyResult` from demo.
- Do not use today's generated puzzle as the demo because it could reveal or alter the real challenge.
- Wrong tap behavior should be forgiving:
  - No failure state.
  - Show a hint and allow reset.
  - Keep the user moving toward the example.

### CSS classes to add

```text
.first-run-card
.demo-card
.demo-status-row
.demo-board
.demo-cell
.demo-cell.selected
.demo-cell.next
.demo-instruction
.demo-success
.transition-card
.help-button
.help-overlay
.help-dialog
.help-rule-list
```

### Copy/localization structure

Use a dictionary rather than hard-coded mixed-language strings where practical:

```ts
const copy = {
  ko: {
    firstRunHeadline: '처음이신가요? 20초 예제로 배워보세요.',
    demoCta: '20초 데모 해보기',
    skipCta: '건너뛰고 오늘 퍼즐 풀기',
  },
  en: {
    firstRunHeadline: 'New here? Learn with a 20-second example.',
    demoCta: 'Try the 20-second demo',
    skipCta: 'Skip and play today',
  },
};
```

MVP can default to Korean or existing mixed UI, but the component should be easy to localize globally later.

## 8. Acceptance criteria for implementation

Functional:

- First-time user sees a demo invitation before the real puzzle.
- User can complete a concrete example: tap `2`, tap `5`, see `2 + 5 = 7` success.
- User can skip tutorial and play today's puzzle immediately.
- Returning user is not blocked by tutorial.
- User can replay tutorial from Home/Help.
- Help overlay explains the rule and includes mini example without revealing today's answer.
- Demo never affects moves, result, stats, streak, or share text.

UX:

- The rule is taught through the worked example, not only text.
- The transition from demo to real 4x4 puzzle says the real puzzle has 6 moves.
- Wrong demo taps recover gracefully.
- Mobile 390px viewport has no horizontal scroll.
- Primary CTA is visible without excessive scrolling on 390x844.

Technical:

- No external network/account/analytics/payment/data collection added.
- Onboarding persistence is localStorage-only and best-effort.
- `npm run build`, `npm run lint`, and existing tests should pass after implementation.
- Accessibility: tile buttons, live step instruction, dialog focus behavior, non-color-only selected state.

## 9. Main target segment and attraction hooks

Primary target for early validation:

- Mobile-first casual puzzle players who like Wordle-style daily habits but want a number/logic puzzle that takes 1-3 minutes.
- Secondary: Korean/English bilingual indie puzzle audience and productivity-break users who prefer no-account, no-install web games.

Attraction hooks to reinforce in onboarding and copy:

1. Daily ritual: one new puzzle per day.
2. Low commitment: 1-3 minutes, no account.
3. Clear challenge: match the Target in 6 moves.
4. Share loop: spoiler-free result after completion.
5. Local-first trust: current MVP stores only local browser stats.

Onboarding should not over-explain monetization or future features. Its job is only to make the first successful tap sequence feel obvious.

## 10. Global/multi-language notes

- Prepare Korean and English copy now, but mark both as internal draft until Sean approves external use.
- Prefer short UI labels that fit 360px width in both languages.
- Avoid idioms that do not translate well, e.g. Korean-only wordplay around `Loop`.
- Do not claim public availability or global launch until deployment is approved.
- If later adding locale detection, keep it client-only and avoid storing personal location/language beyond local preference unless approved.

## 11. Open decisions for Sean / downstream team

1. Default language for the internal MVP first-run flow: Korean-first, English-first, or browser/local toggle.
2. Whether the first-run demo should be a modal overlay or inline Home card. Productdesign recommendation: inline Home card for first visit, modal/bottom-sheet for replay/help.
3. Whether to implement the transition card as a required extra tap. Productdesign recommendation: yes, for first-run only, to prevent accidental first move.
4. Whether the future product should evolve the word `Loop` into a true graph/loop mechanic. Current onboarding must describe the implemented rule only: connected tile target matching.

## 12. Internal QA checklist after implementation

- [ ] Fresh localStorage: first visit shows first-run card.
- [ ] Demo step 0: `2` is highlighted and tapping it advances.
- [ ] Demo step 1: selected total is `2`, `5` is highlighted, copy says `2 + 5 = 7`.
- [ ] Demo step 2: success state appears and Start Today's Puzzle works.
- [ ] Skip writes skip status and opens Today's Puzzle.
- [ ] Replay demo does not reset in-progress today's puzzle.
- [ ] Help overlay opens/closes without losing selected tiles.
- [ ] Today's result/stats remain unchanged after demo.
- [ ] 390x844 viewport: no horizontal scroll, all CTAs tappable.
- [ ] Keyboard: tab order reaches close, tiles, CTAs; Escape closes Help overlay.
- [ ] Reduced motion: no required pulse/animation.
- [ ] `npm run build`, `npm run lint`, `npm run test` pass.

## 13. Non-goals for this task

- No public launch or deployment.
- No domain, analytics, ads, payment, account, waitlist, survey, or external data collection.
- No customer/community contact.
- No change to scoring, puzzle generation, or full graph-loop mechanics.
- No production copy approval; all microcopy here is internal draft.
