# REV-PUZZLE-051 real-device QA observations

Approval status: Sean-approved local device QA only / not approved yet
Tester:
Date/time/timezone:
Local app URL: http://127.0.0.1:4173/ or approved same-network localhost-only URL
External actions avoided: deploy/contact/post/payment/analytics/account changes? yes/no

## Command gate before device run

- npm test: PASS/FAIL
- npm run build: PASS/FAIL
- npm run lint: PASS/FAIL
- npm run smoke:metadata: PASS/FAIL
- npm audit --audit-level=moderate: PASS/FAIL

## Device/browser row

Platform/browser: iOS Safari / Android Chrome / Desktop Chrome / Desktop Safari / Desktop Firefox
Device model:
OS version:
Browser version:
Viewport/orientation:
Network mode: same device localhost / Sean-approved same-LAN / other

| Check | Result | Evidence file | Notes / exact failure |
| --- | --- | --- | --- |
| First load / onboarding | PASS/FAIL | | |
| Mobile touch or mouse/keyboard core play | PASS/FAIL | | |
| localStorage save + reload persistence | PASS/FAIL | | |
| Web Share path | PASS/FAIL/N/A | | |
| Clipboard path | PASS/FAIL/N/A | | |
| Manual-copy fallback visible/selectable | PASS/FAIL | | |
| Reduced-motion/a11y/focus smoke | PASS/FAIL | | |
| Offline/no-network expectation | PASS/FAIL/N/A | | |
| Console errors | PASS/FAIL | | |

Decision for this browser/device: PASS / CONDITIONAL PASS / FAIL
Blockers found:
Follow-up recommendations:
