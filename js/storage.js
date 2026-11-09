// Persistencia en localStorage. Todo se guarda en el propio dispositivo.

const KEY = 'seguimiento-deporte:v1';

export function loadWorkouts() {
  try {
    const raw = localStorage.getItem(KEY);
    const data = raw ? JSON.parse(raw) : [];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export function saveWorkouts(workouts) {
  localStorage.setItem(KEY, JSON.stringify(workouts));
}

export function newId() {
  if (globalThis.crypto?.randomUUID) return crypto.randomUUID();
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

/** Valida y normaliza datos importados desde un JSON de copia de seguridad. */
export function parseBackup(text) {
  const data = JSON.parse(text);
  const list = Array.isArray(data) ? data : data?.workouts;
  if (!Array.isArray(list)) throw new Error('El archivo no contiene entrenamientos.');
  return list
    .filter((w) => w && typeof w.date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(w.date))
    .map((w) => ({
      id: typeof w.id === 'string' ? w.id : newId(),
      sport: typeof w.sport === 'string' ? w.sport : 'otro',
      date: w.date,
      title: typeof w.title === 'string' ? w.title : '',
      durationSec: Number(w.durationSec) || 0,
      distanceM: Number(w.distanceM) || 0,
      rpe: Number(w.rpe) || null,
      notes: typeof w.notes === 'string' ? w.notes : '',
      exercises: Array.isArray(w.exercises) ? w.exercises : [],
      createdAt: Number(w.createdAt) || Date.now(),
    }));
}

export function buildBackup(workouts) {
  return JSON.stringify({ app: 'seguimiento-deporte', version: 1, exportedAt: new Date().toISOString(), workouts }, null, 2);
}
