// Funciones puras de cálculo y formato. Sin acceso al DOM ni al almacenamiento,
// para poder probarlas con `node --test`.

import { getSport, SPORT_KEYS } from './sports.js';

/** Convierte una fecha 'YYYY-MM-DD' en Date local a medianoche. */
export function parseDate(str) {
  const [y, m, d] = str.split('-').map(Number);
  return new Date(y, m - 1, d);
}

/** Date -> 'YYYY-MM-DD' (hora local). */
export function toISODate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** Lunes de la semana de la fecha dada (semana ISO, empieza en lunes). */
export function startOfWeek(date) {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const day = (d.getDay() + 6) % 7; // 0 = lunes
  d.setDate(d.getDate() - day);
  return d;
}

export function addDays(date, n) {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  d.setDate(d.getDate() + n);
  return d;
}

/** Segundos -> 'h:mm:ss' o 'mm:ss'. */
export function formatDuration(totalSec) {
  if (!Number.isFinite(totalSec) || totalSec <= 0) return '0:00';
  const s = Math.round(totalSec);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return h > 0 ? `${h}:${pad(m)}:${pad(sec)}` : `${m}:${pad(sec)}`;
}

/** Segundos -> texto corto tipo '5 h 20 min'. */
export function formatHours(totalSec) {
  const min = Math.round((totalSec || 0) / 60);
  const h = Math.floor(min / 60);
  const m = min % 60;
  if (h === 0) return `${m} min`;
  return m === 0 ? `${h} h` : `${h} h ${m} min`;
}

/** Distancia en metros -> texto según la unidad del deporte. */
export function formatDistance(meters, sportKey) {
  if (!meters) return '';
  const unit = getSport(sportKey).distanceUnit;
  if (unit === 'm') return `${Math.round(meters).toLocaleString('es-ES')} m`;
  return `${(meters / 1000).toLocaleString('es-ES', { maximumFractionDigits: 2 })} km`;
}

/**
 * Ritmo o velocidad según el deporte.
 * - carrera: min/km
 * - natación: min/100 m
 * - ciclismo: km/h
 * Devuelve null si no se puede calcular.
 */
export function computePace(workout) {
  const { durationSec, distanceM, sport } = workout;
  if (!durationSec || !distanceM) return null;
  const type = getSport(sport).paceType;
  switch (type) {
    case 'perKm':
      return `${formatDuration(durationSec / (distanceM / 1000))} /km`;
    case 'per100m':
      return `${formatDuration(durationSec / (distanceM / 100))} /100m`;
    case 'speed': {
      const kmh = distanceM / 1000 / (durationSec / 3600);
      return `${kmh.toLocaleString('es-ES', { maximumFractionDigits: 1 })} km/h`;
    }
    default:
      return null;
  }
}

/** Volumen total levantado en una sesión de gym (kg). */
export function gymVolume(workout) {
  if (!Array.isArray(workout.exercises)) return 0;
  return workout.exercises.reduce(
    (acc, ex) => acc + (Number(ex.sets) || 0) * (Number(ex.reps) || 0) * (Number(ex.weightKg) || 0),
    0,
  );
}

/** Filtra entrenamientos con fecha en [from, to) (Dates). */
export function inRange(workouts, from, to) {
  return workouts.filter((w) => {
    const d = parseDate(w.date);
    return d >= from && d < to;
  });
}

/** Totales agregados por deporte. */
export function summarize(workouts) {
  const bySport = {};
  for (const key of SPORT_KEYS) {
    bySport[key] = { count: 0, durationSec: 0, distanceM: 0, volumeKg: 0 };
  }
  let durationSec = 0;
  for (const w of workouts) {
    const s = bySport[w.sport] || bySport.otro;
    s.count += 1;
    s.durationSec += w.durationSec || 0;
    s.distanceM += w.distanceM || 0;
    s.volumeKg += gymVolume(w);
    durationSec += w.durationSec || 0;
  }
  return { count: workouts.length, durationSec, bySport };
}

/**
 * Minutos por deporte de cada una de las últimas `weeks` semanas (la última es la actual).
 * Devuelve [{ weekStart: Date, minutes: { sport: n }, total }].
 */
export function weeklyTotals(workouts, weeks, today = new Date()) {
  const current = startOfWeek(today);
  const result = [];
  for (let i = weeks - 1; i >= 0; i--) {
    const from = addDays(current, -7 * i);
    const to = addDays(from, 7);
    const minutes = {};
    let total = 0;
    for (const w of inRange(workouts, from, to)) {
      const key = SPORT_KEYS.includes(w.sport) ? w.sport : 'otro';
      const m = (w.durationSec || 0) / 60;
      minutes[key] = (minutes[key] || 0) + m;
      total += m;
    }
    result.push({ weekStart: from, minutes, total });
  }
  return result;
}

/** Días consecutivos con al menos un entrenamiento, terminando hoy o ayer. */
export function currentStreak(workouts, today = new Date()) {
  const days = new Set(workouts.map((w) => w.date));
  let cursor = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  if (!days.has(toISODate(cursor))) cursor = addDays(cursor, -1);
  let streak = 0;
  while (days.has(toISODate(cursor))) {
    streak += 1;
    cursor = addDays(cursor, -1);
  }
  return streak;
}

/** Mejores marcas sencillas por deporte: distancia más larga y sesión más larga. */
export function personalBests(workouts) {
  const bests = {};
  for (const w of workouts) {
    const b = (bests[w.sport] ||= { longestDistance: null, longestDuration: null });
    if (w.distanceM && (!b.longestDistance || w.distanceM > b.longestDistance.distanceM)) {
      b.longestDistance = w;
    }
    if (w.durationSec && (!b.longestDuration || w.durationSec > b.longestDuration.durationSec)) {
      b.longestDuration = w;
    }
  }
  return bests;
}

/** Ordena por fecha descendente (y por creación en caso de empate). */
export function sortByDateDesc(workouts) {
  return [...workouts].sort(
    (a, b) => b.date.localeCompare(a.date) || (b.createdAt || 0) - (a.createdAt || 0),
  );
}
