import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source = readFileSync(new URL('../src/main.jsx', import.meta.url), 'utf8');

test('homepage contains the required management message', () => {
  assert.match(source, /This page is managed by Neuro VPS Hermes Agent/);
});
