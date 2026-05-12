import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const appSource = readFileSync(new URL('../src/main.jsx', import.meta.url), 'utf8');
const committee = JSON.parse(readFileSync(new URL('../src/data/tradingCommittee.json', import.meta.url), 'utf8'));

test('trading committee data includes saved markdown analyses', () => {
  assert.equal(committee.title, 'Trading Committee');
  assert.ok(committee.notes.length >= 1);
  assert.ok(committee.notes.some((note) => note.ticker === 'NVDA'));
  assert.ok(committee.notes.every((note) => note.markdown && note.path && note.bias));
});

test('app exposes committee tab, prompt composer, and markdown report viewer', () => {
  assert.match(appSource, /Committee/);
  assert.match(appSource, /TradingCommitteePanel/);
  assert.match(appSource, /Analyze \$\{ticker\.toUpperCase\(\)\} with trading committee/);
  assert.match(appSource, /Saved analyses/);
  assert.match(appSource, /MarkdownBlock/);
});
