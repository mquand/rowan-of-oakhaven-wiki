#!/usr/bin/env node
/**
 * scripts/filter-data.mjs
 * Filters out "internal" fields from game data files to create public-safe wiki data.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// When running in GitHub Actions, game-repo is checked out into 'game-repo'
// When running locally, fallback to sibling directory
const GAME_REPO_DATA = fs.existsSync(path.resolve(ROOT_DIR, 'game-repo/docs/_data'))
  ? path.resolve(ROOT_DIR, 'game-repo/docs/_data')
  : path.resolve(ROOT_DIR, '../Indie-game-001/docs/_data');

const OUTPUT_DATA_DIR = path.resolve(ROOT_DIR, 'docs/data');

if (!fs.existsSync(OUTPUT_DATA_DIR)) {
  fs.mkdirSync(OUTPUT_DATA_DIR, { recursive: true });
}

function stripInternal(obj) {
  if (Array.isArray(obj)) {
    return obj.map(stripInternal);
  } else if (obj !== null && typeof obj === 'object') {
    const clean = {};
    for (const [key, value] of Object.entries(obj)) {
      if (key === 'internal') continue; // strip sensitive internal fields!
      clean[key] = stripInternal(value);
    }
    return clean;
  }
  return obj;
}

if (!fs.existsSync(GAME_REPO_DATA)) {
  console.log(`⚠️ Source data directory not found: ${GAME_REPO_DATA}`);
  process.exit(0);
}

const files = fs.readdirSync(GAME_REPO_DATA).filter(f => f.endsWith('.json'));

for (const file of files) {
  const srcPath = path.join(GAME_REPO_DATA, file);
  const destPath = path.join(OUTPUT_DATA_DIR, file);

  const raw = fs.readFileSync(srcPath, 'utf8');
  const data = JSON.parse(raw);
  const cleaned = stripInternal(data);

  fs.writeFileSync(destPath, JSON.stringify(cleaned, null, 2), 'utf8');
  console.log(`✓ Filtered public data: ${file} -> docs/data/${file}`);
}

console.log('✅ Public data filtering complete!');
