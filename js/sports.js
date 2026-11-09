// Definición de deportes soportados y cómo se mide cada uno.
// distanceUnit: unidad en la que el usuario introduce la distancia ('m', 'km' o null si no aplica).
// paceType: cómo se expresa el ritmo/velocidad.

export const SPORTS = {
  natacion: {
    label: 'Natación',
    emoji: '🏊',
    color: '#0ea5e9',
    distanceUnit: 'm',
    paceType: 'per100m',
  },
  carrera: {
    label: 'Carrera',
    emoji: '🏃',
    color: '#f97316',
    distanceUnit: 'km',
    paceType: 'perKm',
  },
  ciclismo: {
    label: 'Ciclismo',
    emoji: '🚴',
    color: '#22c55e',
    distanceUnit: 'km',
    paceType: 'speed',
  },
  gym: {
    label: 'Gym',
    emoji: '🏋️',
    color: '#a855f7',
    distanceUnit: null,
    paceType: null,
    hasExercises: true,
  },
  otro: {
    label: 'Otro',
    emoji: '⚡',
    color: '#64748b',
    distanceUnit: 'km',
    paceType: null,
  },
};

export const SPORT_KEYS = Object.keys(SPORTS);

export function getSport(key) {
  return SPORTS[key] || SPORTS.otro;
}
