import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const appSource = readFileSync(new URL('../src/main.jsx', import.meta.url), 'utf8');
const habits = JSON.parse(readFileSync(new URL('../src/data/habits.json', import.meta.url), 'utf8'));

test('habits data provides age-appropriate tasks for an 8 year old', () => {
  assert.equal(habits.title, 'Good Habits for an 8 Year Old');
  assert.ok(habits.tasks.length >= 8);
  assert.ok(habits.tasks.every((task) => task.name && task.when && task.goal));
  assert.ok(habits.tasks.some((task) => /brush teeth/i.test(task.name)));
  assert.ok(habits.tasks.some((task) => /reading/i.test(task.name)));
});

test('app exposes a habits tab and renders habit task cards', () => {
  assert.match(appSource, /Habits/);
  assert.match(appSource, /habitsData\.tasks\.map/);
  assert.match(appSource, /Good Habits for an 8 Year Old/);
  assert.match(appSource, /habit-card/);
});
