import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  computePace,
  currentStreak,
  formatDuration,
  gymVolume,
  startOfWeek,
  summarize,
  toISODate,
  weeklyTotals,
} from '../js/stats.js';
import { parseBackup } from '../js/storage.js';

test('formatDuration', () => {
  assert.equal(formatDuration(0), '0:00');
  assert.equal(formatDuration(65), '1:05');
  assert.equal(formatDuration(3725), '1:02:05');
});

test('ritmo de carrera en min/km', () => {
  assert.equal(computePace({ sport: 'carrera', durationSec: 50 * 60, distanceM: 10000 }), '5:00 /km');
});

test('ritmo de natación en min/100m', () => {
  assert.equal(computePace({ sport: 'natacion', durationSec: 30 * 60, distanceM: 1500 }), '2:00 /100m');
});

test('velocidad de ciclismo en km/h', () => {
  assert.equal(computePace({ sport: 'ciclismo', durationSec: 2 * 3600, distanceM: 60000 }), '30 km/h');
});

test('gym no tiene ritmo, pero sí volumen', () => {
  const w = { sport: 'gym', durationSec: 3600, exercises: [{ name: 'Sentadilla', sets: 3, reps: 10, weightKg: 60 }] };
  assert.equal(computePace(w), null);
  assert.equal(gymVolume(w), 1800);
});

test('startOfWeek devuelve el lunes', () => {
  assert.equal(toISODate(startOfWeek(new Date(2026, 10, 9))), '2026-11-09'); // lunes
  assert.equal(toISODate(startOfWeek(new Date(2026, 10, 15))), '2026-11-09'); // domingo
});

test('summarize agrupa por deporte', () => {
  const s = summarize([
    { sport: 'carrera', date: '2026-11-01', durationSec: 1800, distanceM: 5000 },
    { sport: 'carrera', date: '2026-11-02', durationSec: 1200, distanceM: 3000 },
    { sport: 'natacion', date: '2026-11-03', durationSec: 2400, distanceM: 2000 },
  ]);
  assert.equal(s.count, 3);
  assert.equal(s.durationSec, 5400);
  assert.equal(s.bySport.carrera.distanceM, 8000);
  assert.equal(s.bySport.natacion.count, 1);
});

test('weeklyTotals reparte por semanas', () => {
  const today = new Date(2026, 10, 11); // miércoles
  const weeks = weeklyTotals(
    [
      { sport: 'carrera', date: '2026-11-10', durationSec: 1800 },
      { sport: 'gym', date: '2026-11-03', durationSec: 3600 },
    ],
    2,
    today,
  );
  assert.equal(weeks.length, 2);
  assert.equal(weeks[0].minutes.gym, 60);
  assert.equal(weeks[1].minutes.carrera, 30);
});

test('currentStreak cuenta días consecutivos', () => {
  const today = new Date(2026, 10, 9);
  const ws = ['2026-11-08', '2026-11-07', '2026-11-05'].map((date) => ({ date }));
  assert.equal(currentStreak(ws, today), 2);
  assert.equal(currentStreak([...ws, { date: '2026-11-09' }], today), 3);
});

test('parseBackup acepta formato exportado y descarta registros inválidos', () => {
  const list = parseBackup(
    JSON.stringify({ workouts: [{ id: 'a', sport: 'carrera', date: '2026-11-01', durationSec: 60 }, { date: 'mal' }] }),
  );
  assert.equal(list.length, 1);
  assert.equal(list[0].id, 'a');
});
