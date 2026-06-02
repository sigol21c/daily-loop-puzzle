# Daily Loop Puzzle

Daily Loop Puzzle is a local-only React/Vite MVP for a small daily number puzzle. Each UTC day generates one deterministic 4x4 board and target; the player selects horizontally/vertically connected number tiles to match the target within 6 moves.

This repository is currently for internal local validation only. Do not publish, deploy, contact users or communities, add analytics/ads/payments, collect personal data, or change external accounts without Sean's explicit approval for that scope.

## Current product boundary

- One deterministic puzzle per UTC day.
- First completed daily result is stored locally in the current browser.
- Later attempts are practice and should not overwrite the first daily result.
- Result text is designed to be spoiler-free.
- App state uses browser `localStorage` only.
- No account, login, backend, analytics, ads, payments, or intentional external runtime API calls in the MVP.

## Known launch limitations

- Public launch remains NO-GO until Sean approves deployment/channel/contact/data scope.
- Real iOS Safari, Android Chrome, Desktop Chrome/Safari/Firefox device checks are still required before external launch.
- Unit tests cover Web Share/clipboard/manual-copy branches with mocked browser APIs; they do not prove OS-level trusted-gesture behavior on real devices.
- Copy should avoid claims like "works everywhere" or implying a full graph-loop mechanic; v1 is connected-tile target matching.

## Local setup

Use the existing lockfile and installed dependencies. Do not run network installs unless a task explicitly approves dependency changes.

```bash
npm test
npm run build
npm run smoke:metadata
npm run lint
npm audit --audit-level=moderate
```

For local browser viewing only:

```bash
npm run dev
```

Then open the localhost URL printed by Vite. Do not expose it through a tunnel or public URL without approval.

## Scripts

- `npm test` — Vitest suite in jsdom.
- `npm run build` — TypeScript build plus Vite production build.
- `npm run smoke:metadata` — checks built PWA metadata remains local launch metadata.
- `npm run lint` — ESLint over the repository.
- `npm run dev` — localhost-only Vite dev server.
- `npm run preview` — localhost preview of the built app.

## Documentation

- `docs/daily-loop-puzzle/sean-launch-decision-packet-REV-PUZZLE-029.md` — current Sean launch decision packet.
- `docs/daily-loop-puzzle/prelaunch-device-qa-and-approval-checklist-REV-PUZZLE-027.md` — real device/browser QA matrix.
- `docs/daily-loop-puzzle/launch-assets.md` — unpublished launch copy drafts; do not publish without approval.
- `docs/daily-loop-puzzle/qa-checklist.md` — accumulated local QA notes.
