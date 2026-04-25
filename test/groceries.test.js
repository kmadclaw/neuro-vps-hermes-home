import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const appSource = readFileSync(new URL('../src/main.jsx', import.meta.url), 'utf8');
const groceries = JSON.parse(readFileSync(new URL('../src/data/groceries.json', import.meta.url), 'utf8'));

test('groceries data tracks current shopping list items', () => {
  assert.deepEqual(groceries.toBuy, ['Tomato', 'Milk', 'Onion']);
  assert.deepEqual(groceries.bought, []);
});

test('app exposes a groceries tab and renders the tracked list', () => {
  assert.match(appSource, /Groceries/);
  assert.match(appSource, /groceriesData\.toBuy\.map/);
  assert.match(appSource, /shopping list/i);
});
