#!/usr/bin/env node
import { mkdir } from 'node:fs/promises';
import playwright from '/Users/mac_agent/.hermes/hermes-agent/node_modules/playwright/index.js';
const { chromium } = playwright;

const baseUrl = process.env.DAILY_LOOP_LOCAL_URL ?? 'http://127.0.0.1:5174/';
const outDir = new URL('../docs/daily-loop-puzzle/screenshots/REV-PUZZLE-028/', import.meta.url);

function connected(indices) {
  if (indices.length === 0) return false;
  const set = new Set(indices);
  const seen = new Set([indices[0]]);
  const stack = [indices[0]];
  while (stack.length) {
    const i = stack.pop();
    const r = Math.floor(i / 4);
    const c = i % 4;
    for (const [dr, dc] of [[1,0],[-1,0],[0,1],[0,-1]]) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr < 0 || nr >= 4 || nc < 0 || nc >= 4) continue;
      const ni = nr * 4 + nc;
      if (set.has(ni) && !seen.has(ni)) {
        seen.add(ni);
        stack.push(ni);
      }
    }
  }
  return seen.size === indices.length;
}

function findSolution(values, target, maxMoves = 6) {
  const n = values.length;
  const solution = [];
  function dfs(start, picked, sum) {
    if (picked.length > maxMoves || sum > target) return false;
    if (picked.length > 0 && sum === target && connected(picked)) {
      solution.push(...picked);
      return true;
    }
    for (let i = start; i < n; i += 1) {
      if (dfs(i + 1, [...picked, i], sum + values[i])) return true;
    }
    return false;
  }
  dfs(0, [], 0);
  return solution;
}

async function preparePage(browser, viewport, name) {
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1, isMobile: viewport.width <= 430, hasTouch: viewport.width <= 430 });
  const page = await context.newPage();
  page.on('console', (msg) => console.log(`[${name}] console.${msg.type()}: ${msg.text()}`));
  await page.goto(baseUrl, { waitUntil: 'networkidle' });
  return { context, page };
}

async function screenshot(page, filename) {
  await page.screenshot({ path: new URL(filename, outDir).pathname, fullPage: true });
}

async function main() {
  await mkdir(outDir, { recursive: true });
  const browser = await chromium.launch({
    headless: true,
    executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE || '/Users/mac_agent/Library/Caches/ms-playwright/chromium_headless_shell-1223/chrome-headless-shell-mac-arm64/chrome-headless-shell',
  });

  // Desktop first-run home.
  const desktopHome = await preparePage(browser, { width: 1440, height: 1100 }, 'desktop-home');
  await screenshot(desktopHome.page, 'desktop-home-first-run.png');
  await desktopHome.context.close();

  // Mobile first-run home and demo state.
  const mobileHome = await preparePage(browser, { width: 390, height: 844 }, 'mobile-home-demo');
  await screenshot(mobileHome.page, 'mobile-home-first-run.png');
  await mobileHome.page.locator('.first-run-card button').first().click();
  await mobileHome.page.waitForSelector('.demo-card');
  await screenshot(mobileHome.page, 'mobile-demo-step-1.png');
  await mobileHome.context.close();

  // Mobile puzzle and result state.
  const mobilePuzzle = await preparePage(browser, { width: 390, height: 844 }, 'mobile-puzzle-result');
  await mobilePuzzle.page.evaluate(() => {
    window.localStorage.setItem('daily-loop-puzzle:onboarding:v1', JSON.stringify({ completed: true, skipped: false, completedAt: new Date().toISOString(), locale: 'en' }));
  });
  await mobilePuzzle.page.reload({ waitUntil: 'networkidle' });
  await mobilePuzzle.page.locator('.nav-tabs button').nth(1).click();
  await mobilePuzzle.page.waitForSelector('.board .cell');
  await screenshot(mobilePuzzle.page, 'mobile-puzzle-ready.png');

  const solved = await mobilePuzzle.page.evaluate(async ({ connectedSource, findSolutionSource }) => {
    const target = Number(document.querySelector('.target-row strong')?.textContent ?? NaN);
    const buttons = [...document.querySelectorAll('.board .cell')];
    const values = buttons.map((button) => Number(button.textContent));
    globalThis.connected = eval(`(${connectedSource})`);
    const find = eval(`(${findSolutionSource})`);
    const solution = find(values, target, 6);
    if (!solution.length) return { ok: false, target, values, solution };
    for (const index of solution) {
      buttons[index].click();
      await new Promise((resolve) => setTimeout(resolve, 70));
    }
    return { ok: true, target, values, solution };
  }, { connectedSource: connected.toString(), findSolutionSource: findSolution.toString() });
  console.log(`[mobile-puzzle-result] solve=${JSON.stringify(solved)}`);
  await mobilePuzzle.page.waitForSelector('.result-card', { timeout: 3000 });
  await screenshot(mobilePuzzle.page, 'mobile-result-solved.png');
  await mobilePuzzle.context.close();

  // Desktop result state at a wider viewport.
  const desktopResult = await preparePage(browser, { width: 1440, height: 1100 }, 'desktop-result');
  await desktopResult.page.evaluate(() => {
    window.localStorage.setItem('daily-loop-puzzle:onboarding:v1', JSON.stringify({ completed: true, skipped: false, completedAt: new Date().toISOString(), locale: 'en' }));
  });
  await desktopResult.page.reload({ waitUntil: 'networkidle' });
  await desktopResult.page.locator('.nav-tabs button').nth(1).click();
  await desktopResult.page.waitForSelector('.board .cell');
  const desktopSolved = await desktopResult.page.evaluate(async ({ connectedSource, findSolutionSource }) => {
    const target = Number(document.querySelector('.target-row strong')?.textContent ?? NaN);
    const buttons = [...document.querySelectorAll('.board .cell')];
    const values = buttons.map((button) => Number(button.textContent));
    globalThis.connected = eval(`(${connectedSource})`);
    const find = eval(`(${findSolutionSource})`);
    const solution = find(values, target, 6);
    for (const index of solution) {
      buttons[index].click();
      await new Promise((resolve) => setTimeout(resolve, 70));
    }
    return { target, values, solution };
  }, { connectedSource: connected.toString(), findSolutionSource: findSolution.toString() });
  console.log(`[desktop-result] solve=${JSON.stringify(desktopSolved)}`);
  await desktopResult.page.waitForSelector('.result-card', { timeout: 3000 });
  await screenshot(desktopResult.page, 'desktop-result-solved.png');
  await desktopResult.context.close();

  await browser.close();
  console.log(`Screenshots saved to ${outDir.pathname}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
