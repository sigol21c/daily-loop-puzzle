#!/usr/bin/env node
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';

const root = process.cwd();
const required = ['package.json', 'package-lock.json'];
const missing = required.filter((name) => !existsSync(join(root, name)));
const hasNodeModules = existsSync(join(root, 'node_modules'));
const evidenceDir = join(root, 'docs', 'daily-loop-puzzle', 'manual-qa-evidence', 'REV-PUZZLE-051');
const templatePath = join(evidenceDir, 'device-observations-template.md');

if (missing.length > 0) {
  console.error(`Missing required project files in ${root}: ${missing.join(', ')}`);
  process.exit(1);
}

if (!hasNodeModules) {
  console.error('node_modules is missing. Stop: do not install dependencies or use the network without explicit approval.');
  process.exit(1);
}

mkdirSync(evidenceDir, { recursive: true });

const template = `# REV-PUZZLE-051 real-device QA observations\n\nApproval status: Sean-approved local device QA only / not approved yet\nTester:\nDate/time/timezone:\nLocal app URL: http://127.0.0.1:4173/ or approved same-network localhost-only URL\nExternal actions avoided: deploy/contact/post/payment/analytics/account changes? yes/no\n\n## Command gate before device run\n\n- npm test: PASS/FAIL\n- npm run build: PASS/FAIL\n- npm run lint: PASS/FAIL\n- npm run smoke:metadata: PASS/FAIL\n- npm audit --audit-level=moderate: PASS/FAIL\n\n## Device/browser row\n\nPlatform/browser: iOS Safari / Android Chrome / Desktop Chrome / Desktop Safari / Desktop Firefox\nDevice model:\nOS version:\nBrowser version:\nViewport/orientation:\nNetwork mode: same device localhost / Sean-approved same-LAN / other\n\n| Check | Result | Evidence file | Notes / exact failure |\n| --- | --- | --- | --- |\n| First load / onboarding | PASS/FAIL | | |\n| Mobile touch or mouse/keyboard core play | PASS/FAIL | | |\n| localStorage save + reload persistence | PASS/FAIL | | |\n| Web Share path | PASS/FAIL/N/A | | |\n| Clipboard path | PASS/FAIL/N/A | | |\n| Manual-copy fallback visible/selectable | PASS/FAIL | | |\n| Reduced-motion/a11y/focus smoke | PASS/FAIL | | |\n| Offline/no-network expectation | PASS/FAIL/N/A | | |\n| Console errors | PASS/FAIL | | |\n\nDecision for this browser/device: PASS / CONDITIONAL PASS / FAIL\nBlockers found:\nFollow-up recommendations:\n`;

writeFileSync(templatePath, template, 'utf8');

console.log('REV-PUZZLE-051 localhost-only prep complete.');
console.log(`Evidence directory: ${evidenceDir}`);
console.log(`Observation template: ${templatePath}`);
console.log('Run local command gate:');
console.log('  npm test && npm run build && npm run lint && npm run smoke:metadata && npm audit --audit-level=moderate');
console.log('Run localhost preview only after approval for manual device QA:');
console.log('  npm run preview -- --host 127.0.0.1');
console.log('Open only on the same machine unless Sean explicitly approves same-network device access. Do not tunnel, deploy, publish, or send share output externally.');
