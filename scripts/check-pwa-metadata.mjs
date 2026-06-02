#!/usr/bin/env node
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const distDir = join(root, 'dist');
const indexPath = join(distDir, 'index.html');
const manifestPath = join(distDir, 'manifest.webmanifest');

const failures = [];

function fail(message) {
  failures.push(message);
}

function requireFile(path, label) {
  if (!existsSync(path)) {
    fail(`${label} missing at ${path}`);
    return '';
  }
  return readFileSync(path, 'utf8');
}

function requireMatch(content, pattern, label) {
  if (!pattern.test(content)) {
    fail(`${label} not found`);
  }
}

const indexHtml = requireFile(indexPath, 'built index.html');

if (indexHtml) {
  requireMatch(indexHtml, /<html\s+lang="en"/i, 'html lang=en');
  requireMatch(indexHtml, /<title>Daily Loop Puzzle<\/title>/i, 'launch-ready title');
  requireMatch(indexHtml, /<meta\s+name="description"\s+content="[^"]+"\s*\/>/i, 'description meta');
  requireMatch(indexHtml, /<meta\s+name="theme-color"\s+content="#[0-9a-f]{6}"\s*\/>/i, 'theme-color meta');
  requireMatch(indexHtml, /<meta\s+name="apple-mobile-web-app-capable"\s+content="yes"\s*\/>/i, 'apple mobile web app capable meta');
  requireMatch(indexHtml, /<meta\s+name="apple-mobile-web-app-title"\s+content="Daily Loop"\s*\/>/i, 'apple mobile web app title meta');
  requireMatch(indexHtml, /<link\s+rel="manifest"\s+href="\/manifest\.webmanifest"\s*\/>/i, 'manifest link');
  requireMatch(indexHtml, /<link\s+rel="apple-touch-icon"\s+href="\/pwa-icon\.svg"\s*\/>/i, 'local apple touch icon link');

  const externalRefs = [...indexHtml.matchAll(/(?:src|href)="([^"]+)"/gi)]
    .map((match) => match[1])
    .filter((value) => /^(?:https?:)?\/\//i.test(value));
  if (externalRefs.length > 0) {
    fail(`built index.html has external src/href references: ${externalRefs.join(', ')}`);
  }
}

const manifestRaw = requireFile(manifestPath, 'built web manifest');
if (manifestRaw) {
  let manifest;
  try {
    manifest = JSON.parse(manifestRaw);
  } catch (error) {
    fail(`manifest.webmanifest is not valid JSON: ${error.message}`);
  }

  if (manifest) {
    const expected = {
      name: 'Daily Loop Puzzle',
      short_name: 'Daily Loop',
      start_url: '/',
      scope: '/',
      display: 'standalone',
      theme_color: '#f7f2e8',
      background_color: '#f7f2e8',
    };

    for (const [key, value] of Object.entries(expected)) {
      if (manifest[key] !== value) {
        fail(`manifest ${key} expected ${value}, received ${manifest[key]}`);
      }
    }

    if (typeof manifest.description !== 'string' || manifest.description.length < 20) {
      fail('manifest description is missing or too short');
    }

    if (!Array.isArray(manifest.icons) || manifest.icons.length === 0) {
      fail('manifest icons missing');
    } else {
      for (const icon of manifest.icons) {
        if (!icon.src || /^(?:https?:)?\/\//i.test(icon.src)) {
          fail(`manifest icon has non-local src: ${icon.src}`);
        }
      }
      if (!manifest.icons.some((icon) => icon.src === '/pwa-icon.svg' && icon.type === 'image/svg+xml')) {
        fail('manifest lacks local /pwa-icon.svg SVG icon');
      }
    }
  }
}

if (failures.length > 0) {
  console.error('PWA metadata smoke failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('PWA metadata smoke passed: built index and manifest use local launch metadata only.');
