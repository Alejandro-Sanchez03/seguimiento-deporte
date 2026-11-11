(() => {
'use strict';

// ===================== Iconos =====================
const ICONS = {
  swim: '<circle cx="17" cy="5.5" r="2"/><path d="M6 12l4-4 3 2 3-3"/><path d="M2 16c2 0 2-1.5 4-1.5s2 1.5 4 1.5 2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5"/><path d="M2 20c2 0 2-1.5 4-1.5s2 1.5 4 1.5 2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5"/>',
  bike: '<circle cx="5.5" cy="16.5" r="3.5"/><circle cx="18.5" cy="16.5" r="3.5"/><path d="M5.5 16.5L9 9h6l3.5 7.5M9 9l3.5 7.5h-7M13.5 5.5h2.5L15 9"/>',
  run: '<circle cx="15" cy="4.5" r="2"/><path d="M7.5 21l3-6 3 2.5V21M10.5 15l1.5-5.5 3.5 3 3.5-1M12 9.5L8 10.5 6 14"/>',
  strength: '<path d="M2.5 10v4M5.5 7v10M18.5 7v10M21.5 10v4M5.5 12h13"/>',
  hike: '<path d="M3 20l6-10 4 6 3-4 5 8z"/><circle cx="17" cy="5" r="2"/>',
  racket: '<ellipse cx="10" cy="9" rx="6" ry="6"/><path d="M14.5 13.5L21 20"/><circle cx="19" cy="6" r="1.6"/>',
  ball: '<circle cx="12" cy="12" r="9"/><path d="M12 7l4 3-1.5 4.5h-5L8 10z"/><path d="M12 3v4M16 10l4.5-1.5M14.5 14.5l2.5 4M9.5 14.5L7 18.5M8 10L3.5 8.5"/>',
  climb: '<circle cx="9" cy="4.5" r="2"/><path d="M9 7v6l-3 7M9 13l4 3v4M9 9l5-3 2-3M9 10L5 8"/><path d="M19 3v18"/>',
  yoga: '<circle cx="12" cy="5" r="2"/><path d="M12 7v6M6 10l6 3 6-3M5 19c2-3 5-4 7-4s5 1 7 4"/>',
  row: '<path d="M3 18c3 1.5 15 1.5 18 0"/><path d="M5 9l12 6M17 15l3 1.5"/><circle cx="9" cy="7" r="2"/>',
  ski: '<circle cx="15" cy="4.5" r="2"/><path d="M4 19l16 2M7 12l4 2 2-5 4 3M11 14l-1 5"/>',
  skate: '<path d="M5 15h11c2 0 3-1 3-3V6M5 15V7h6v4h5"/><circle cx="7" cy="19" r="1.6"/><circle cx="16" cy="19" r="1.6"/>',
  box: '<path d="M7 7a4 4 0 018 0v4H7z"/><path d="M7 11v4a3 3 0 003 3h3a3 3 0 003-3v-4M10 18v3h4v-3"/>',
  heart: '<path d="M12 20s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.5-7 10-7 10z"/>',
  bolt: '<path d="M13 2L5 14h6l-1 8 8-12h-6z"/>',
};
const ICON_NAMES = Object.keys(ICONS);
const icoName = (name, extra = '') => `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true" ${extra}>${ICONS[name] || ICONS.bolt}</svg>`;
const ICO_CHECK = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
const ICO_MORE = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="5" cy="12" r="1.3"/><circle cx="12" cy="12" r="1.3"/><circle cx="19" cy="12" r="1.3"/></svg>';
const ICO_L = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>';
const ICO_R = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>';

// ===================== Deportes (configurables) =====================
// Cómo se mide cada deporte. paceM: metros a los que se refiere el ritmo.
const METRICS = {
  pace_km: { label: 'Distancia y ritmo por km', unit: 'km', paceM: 1000, paceLbl: '/km', ex: 'carrera, trail' },
  pace_100m: { label: 'Distancia y ritmo por 100 m', unit: 'm', paceM: 100, paceLbl: '/100m', ex: 'natación' },
  pace_500m: { label: 'Distancia y ritmo por 500 m', unit: 'm', paceM: 500, paceLbl: '/500m', ex: 'remo' },
  speed: { label: 'Distancia y velocidad (km/h)', unit: 'km', ex: 'bici, patines, esquí' },
  time: { label: 'Solo tiempo', ex: 'pádel, fútbol, yoga' },
  strength: { label: 'Ejercicios con series, reps y kg', ex: 'gimnasio' },
};
const isDistMetric = (m) => ['pace_km', 'pace_100m', 'pace_500m', 'speed'].includes(m);
const isPaceMetric = (m) => ['pace_km', 'pace_100m', 'pace_500m'].includes(m);
const COLORS = ['blue', 'teal', 'orange', 'violet', 'rose', 'amber', 'green', 'indigo', 'brown', 'slate'];
const COLOR_NAMES = { blue: 'Azul', teal: 'Verde azulado', orange: 'Naranja', violet: 'Violeta', rose: 'Rosa', amber: 'Ámbar', green: 'Verde', indigo: 'Índigo', brown: 'Marrón', slate: 'Gris' };

const PRESETS = [
  { key: 'run', label: 'Carrera', icon: 'run', color: 'orange', metric: 'pace_km', intervals: true, types: ['Rodaje suave', 'Largo', 'Series', 'Competición'], chips: [5, 8, 10, 12, 15, 21.1], records: [5000, 10000, 21097.5, 42195], ph: 'p. ej. 6x400 a 4:15' },
  { key: 'swim', label: 'Natación', icon: 'swim', color: 'blue', metric: 'pace_100m', intervals: true, types: ['Series', 'Continuo', 'Técnica'], gear: ['Pull buoy', 'Palas'], chips: [1000, 1500, 2000, 2500, 3000, 3800], records: [400, 1000, 1500, 1900, 2000, 3000, 3800], ph: 'p. ej. 10x100 a 1:45' },
  { key: 'bike', label: 'Ciclismo', icon: 'bike', color: 'teal', metric: 'speed', elev: true, types: ['Rodaje', 'Largo', 'Series', 'Competición'], chips: [30, 40, 60, 90, 120], ph: 'p. ej. 90 km Z2' },
  { key: 'strength', label: 'Fuerza', icon: 'strength', color: 'violet', metric: 'strength', types: ['Pierna', 'Torso', 'Cuerpo completo', 'Core'], ph: 'p. ej. Pierna completa' },
  { key: 'hike', label: 'Senderismo / Trail', icon: 'hike', color: 'green', metric: 'pace_km', elev: true, types: ['Ruta', 'Trail', 'Montaña'], chips: [8, 12, 15, 20, 25], ph: 'p. ej. Ruta de 15 km' },
  { key: 'padel', label: 'Pádel', icon: 'racket', color: 'amber', metric: 'time', types: ['Partido', 'Clase', 'Entreno'], ph: 'p. ej. Partido 2 sets' },
  { key: 'tennis', label: 'Tenis', icon: 'racket', color: 'green', metric: 'time', types: ['Partido', 'Clase', 'Entreno'], ph: 'p. ej. Clase de revés' },
  { key: 'football', label: 'Fútbol', icon: 'ball', color: 'green', metric: 'time', types: ['Partido', 'Entreno'], ph: 'p. ej. Partido 7' },
  { key: 'basket', label: 'Baloncesto', icon: 'ball', color: 'orange', metric: 'time', types: ['Partido', 'Entreno'], ph: 'p. ej. Entreno de tiro' },
  { key: 'climb', label: 'Escalada', icon: 'climb', color: 'brown', metric: 'time', types: ['Bloque', 'Vía', 'Rocódromo'], ph: 'p. ej. Bloque V4' },
  { key: 'yoga', label: 'Yoga / Movilidad', icon: 'yoga', color: 'indigo', metric: 'time', types: ['Yoga', 'Movilidad', 'Estiramientos'], ph: 'p. ej. Movilidad de cadera' },
  { key: 'row', label: 'Remo', icon: 'row', color: 'indigo', metric: 'pace_500m', intervals: true, types: ['Continuo', 'Series'], chips: [2000, 5000, 10000], records: [500, 2000, 5000, 10000], ph: 'p. ej. 4x1000 a 1:55' },
  { key: 'owswim', label: 'Aguas abiertas', icon: 'swim', color: 'indigo', metric: 'pace_100m', types: ['Continuo', 'Competición'], chips: [750, 1500, 1900, 3800], records: [750, 1500, 1900, 3800], ph: 'p. ej. 2 km en el mar' },
  { key: 'ski', label: 'Esquí', icon: 'ski', color: 'blue', metric: 'speed', elev: true, types: ['Pista', 'Travesía', 'Fondo'], ph: 'p. ej. Travesía' },
  { key: 'skate', label: 'Patinaje', icon: 'skate', color: 'rose', metric: 'speed', types: ['Rodaje', 'Series'], ph: 'p. ej. 20 km' },
  { key: 'hiit', label: 'Crossfit / HIIT', icon: 'bolt', color: 'rose', metric: 'time', types: ['WOD', 'HIIT', 'Circuito'], ph: 'p. ej. WOD Murph' },
  { key: 'box', label: 'Boxeo / Artes marciales', icon: 'box', color: 'slate', metric: 'time', types: ['Técnica', 'Saco', 'Sparring'], ph: 'p. ej. Saco 6x3 min' },
  { key: 'cardio', label: 'Elíptica / Cardio', icon: 'heart', color: 'slate', metric: 'time', types: ['Suave', 'Intervalos'], ph: 'p. ej. 40 min suave' },
];
const PRESET_MAP = Object.fromEntries(PRESETS.map((p) => [p.key, p]));
const DEFAULT_ACTIVE = ['swim', 'run', 'bike', 'strength'];

// Ajustes guardados: deportes (activos y ocultos), objetivo semanal y última copia.
let settings = { sports: DEFAULT_ACTIVE.map((k) => ({ ...PRESET_MAP[k] })), goalDays: 6, lastExport: null };
let SPORTS = {};
let SPORT_KEYS = []; // deportes activos, en orden
function applySports() {
  SPORTS = {};
  for (const s of settings.sports) SPORTS[s.key] = s;
  SPORT_KEYS = settings.sports.filter((s) => !s.hidden).map((s) => s.key);
  let css = '';
  for (const s of settings.sports) css += `.s-${s.key}{--c:var(--col-${COLORS.includes(s.color) ? s.color : 'slate'})}`;
  let el = document.getElementById('sport-css');
  if (!el) { el = document.createElement('style'); el.id = 'sport-css'; document.head.appendChild(el); }
  el.textContent = css;
}
const sp = (k) => SPORTS[k] || PRESET_MAP[k] || { key: k, label: k || 'Otro', icon: 'bolt', color: 'slate', metric: 'time', types: [] };
const ico = (k, extra = '') => icoName(sp(k).icon || k, extra);
const sportColor = (k) => `var(--col-${sp(k).color || 'slate'})`;
const metricOf = (k) => sp(k).metric || 'time';
const FEELS = ['Muy mal', 'Mal', 'Normal', 'Bien', 'Genial'];
const RPE_TXT = ['', 'Muy suave', 'Muy suave', 'Suave', 'Moderado', 'Moderado', 'Algo duro', 'Duro', 'Muy duro', 'Casi máximo', 'Máximo'];

// ===================== Utilidades =====================
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const pad2 = (n) => String(n).padStart(2, '0');
const iso = (d) => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
const fromISO = (s) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const addDays = (s, n) => { const d = fromISO(s); d.setDate(d.getDate() + n); return iso(d); };
const mondayOf = (s) => addDays(s, -((fromISO(s).getDay() + 6) % 7));
const today = () => iso(new Date());
const isISO = (s) => typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s);
const DOW = ['lun', 'mar', 'mié', 'jue', 'vie', 'sáb', 'dom'];
const dowOf = (s) => DOW[(fromISO(s).getDay() + 6) % 7];
const cap = (t) => t.charAt(0).toUpperCase() + t.slice(1);
const longDate = (s) => cap(fromISO(s).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' }));
const shortDate = (s) => fromISO(s).toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' });
const nf = (n, d = 0) => Number(n).toLocaleString('es-ES', { maximumFractionDigits: d, minimumFractionDigits: 0 });
const uid = () => (crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2));
const clone = (o) => JSON.parse(JSON.stringify(o ?? null));

function fmtDur(sec) {
  if (!sec || sec < 0) return '';
  sec = Math.round(sec);
  const h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = sec % 60;
  return h ? `${h}:${pad2(m)}:${pad2(s)}` : `${m}:${pad2(s)}`;
}
// "45" → 45 min · "4530" → 45:30 · "10215" → 1:02:15 · "1:02:15" / "45:30" tal cual
function parseDuration(str) {
  str = String(str || '').trim();
  if (!str) return null;
  if (/[:.'h]/.test(str)) {
    const parts = str.split(/[^0-9]+/).filter(Boolean).map(Number);
    if (!parts.length) return null;
    if (parts.length >= 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
    if (parts.length === 2) return parts[0] * 60 + parts[1];
    return parts[0] * 60;
  }
  const d = str.replace(/\D/g, '');
  if (!d) return null;
  if (d.length <= 3) return Number(d) * 60;
  const s = Number(d.slice(-2)), m = Number(d.slice(-4, -2)), h = Number(d.slice(0, -4) || 0);
  return h * 3600 + m * 60 + s;
}
// Ritmo: "415" → 4:15 · "4:15" · "4" → 4:00
function parsePace(str) {
  str = String(str || '').trim();
  if (!str) return null;
  if (/[:.']/.test(str)) {
    const [m, s = 0] = str.split(/[^0-9]+/).filter(Boolean).map(Number);
    return m * 60 + s;
  }
  const d = str.replace(/\D/g, '');
  if (!d) return null;
  if (d.length <= 1) return Number(d) * 60;
  return Number(d.slice(0, -2) || 0) * 60 + Number(d.slice(-2));
}
const fmtPace = (sec) => (sec ? `${Math.floor(sec / 60)}:${pad2(Math.round(sec % 60) % 60)}` : '');
const num = (v) => { const n = Number(String(v ?? '').replace(',', '.')); return Number.isFinite(n) && n > 0 ? n : null; };

// Ritmo (s por unidad) o velocidad (km/h) de una sesión, como número.
function paceVal(s) {
  if (!s.durationSec || !s.distanceM) return null;
  const m = METRICS[metricOf(s.sport)];
  if (m?.paceM) return s.durationSec / (s.distanceM / m.paceM);
  if (metricOf(s.sport) === 'speed') return (s.distanceM / 1000) / (s.durationSec / 3600);
  return null;
}
function paceOf(s) {
  const v = paceVal(s);
  if (v == null) return '';
  const m = METRICS[metricOf(s.sport)];
  return m.paceM ? `${fmtPace(v)} ${m.paceLbl}` : `${nf(v, 1)} km/h`;
}
const distUnit = (k) => METRICS[metricOf(k)]?.unit || 'km';
const distFmt = (k, meters) => (distUnit(k) === 'm' ? `${nf(meters)} m` : `${nf(meters / 1000, 2)} km`);
const distTxt = (s) => (!s.distanceM ? '' : distFmt(s.sport, s.distanceM));
function strengthTotals(s) {
  let sets = 0, kg = 0;
  for (const ex of s.exercises || []) for (const st of ex.sets || []) { sets++; kg += (Number(st.reps) || 0) * (Number(st.kg) || 0); }
  return { ex: (s.exercises || []).length, sets, kg };
}
const gearOf = (s) => s.gear || [s.pullbuoy && 'Pull buoy', s.paddles && 'Palas'].filter(Boolean);
function summary(s) {
  const p = [];
  const metric = metricOf(s.sport);
  if (metric === 'strength') {
    const t = strengthTotals(s);
    if (t.ex) p.push(`${t.ex} ejercicio${t.ex === 1 ? '' : 's'}`);
    if (t.sets) p.push(`${t.sets} series`);
    if (t.kg) p.push(`${nf(t.kg)} kg`);
    if (s.durationSec) p.push(fmtDur(s.durationSec));
  } else {
    if (s.distanceM) p.push(distTxt(s));
    if (s.durationSec) p.push(fmtDur(s.durationSec));
    const pc = paceOf(s); if (pc) p.push(pc);
    if (s.elevationM) p.push(`+${nf(s.elevationM)} m`);
    if (s.type === 'Series' && s.reps?.count) p.push(`${s.reps.count}x${s.reps.distM || '?'}`);
  }
  if (s.rpe) p.push(`RPE ${s.rpe}`);
  return p.join(' · ');
}
const sessionTitle = (s) => s.title || [sp(s.sport).label, s.type].filter(Boolean).join(' · ');

// ===================== Datos (en el dispositivo) =====================
// Todo se guarda en localStorage con la clave LS_KEY, en un único objeto:
//   { schema, sessions: [...], plan: [...], days: [...], races: [...], shoes: [...] }
// Las colecciones nuevas se añaden sin tocar las existentes. Cada cambio de estructura sube
// SCHEMA y tiene su paso en migrate(); antes de migrar se guarda una copia del estado anterior.
const COLLS = ['sessions', 'plan', 'days', 'races', 'shoes'];
const data = Object.fromEntries(COLLS.map((c) => [c, new Map()]));
const SCHEMA = 3;
let store = 'loading';
let extraKeys = {}; // claves desconocidas del objeto guardado: se conservan tal cual al guardar
let storageBroken = false; // si no se pudo leer lo guardado, no se escribe encima
let unreadableNote = false; // se apartaron datos ilegibles en otra clave
const LS_KEY = 'cuaderno-tri:v1';
const LS_SETTINGS = 'cuaderno-tri:ajustes';

function migrate(raw) {
  const from = Number(raw.schema) || 1;
  if (from >= SCHEMA) return { raw, changed: false };
  const hasData = COLLS.some((c) => Array.isArray(raw[c]) && raw[c].length);
  if (hasData) {
    try { localStorage.setItem(`${LS_KEY}:copia-antes-de-v${SCHEMA}`, JSON.stringify(raw)); } catch { /* sin espacio: se migra igualmente, la migración no borra nada */ }
  }
  // v1 → v2: se añade la lista de carreras. Sesiones, plan y días no cambian.
  if (from < 2) raw.races = Array.isArray(raw.races) ? raw.races : [];
  // v2 → v3: se añade la lista de zapatillas. Las sesiones pueden llevar shoeId (opcional).
  if (from < 3) raw.shoes = Array.isArray(raw.shoes) ? raw.shoes : [];
  raw.schema = SCHEMA;
  return { raw, changed: true };
}

function loadAll() {
  let raw = {};
  let text = null;
  try { text = localStorage.getItem(LS_KEY); } catch { storageBroken = true; }
  if (text) {
    try {
      const parsed = JSON.parse(text);
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) raw = parsed;
      else throw new Error('formato');
    } catch {
      // Datos ilegibles: se apartan en otra clave. Si no se pueden apartar, no se escribe encima.
      try { localStorage.setItem(`${LS_KEY}:ilegible-${Date.now()}`, text); unreadableNote = true; }
      catch { storageBroken = true; }
    }
  }
  const m = migrate(raw);
  raw = m.raw;
  extraKeys = {};
  for (const [k, v] of Object.entries(raw)) if (!COLLS.includes(k) && k !== 'schema') extraKeys[k] = v;
  for (const c of COLLS) data[c] = new Map((Array.isArray(raw[c]) ? raw[c] : []).filter((o) => o && o.id).map((o) => [o.id, o]));
  try {
    const st = JSON.parse(localStorage.getItem(LS_SETTINGS) || 'null');
    if (st && Array.isArray(st.sports) && st.sports.length) settings = { ...settings, ...st };
  } catch { /* usar ajustes por defecto */ }
  // Deportes usados en sesiones que no estén en la lista (p. ej. tras importar).
  for (const s of data.sessions.values()) ensureSport(s.sport);
  applySports();
  store = 'local';
  if (m.changed && text && !storageBroken && !unreadableNote) saveLocal();
  try { navigator.storage?.persist?.(); } catch { /* opcional */ }
}
function saveLocal() {
  if (storageBroken) { toast('No se guardó: tus datos anteriores no se pudieron leer. Exporta o recarga la app.'); return; }
  const obj = { ...extraKeys, schema: SCHEMA, ...Object.fromEntries(COLLS.map((c) => [c, [...data[c].values()]])) };
  try { localStorage.setItem(LS_KEY, JSON.stringify(obj)); }
  catch { toast('No se pudo guardar: el almacenamiento del navegador está lleno o bloqueado.'); }
}
function saveSettings() {
  try { localStorage.setItem(LS_SETTINGS, JSON.stringify(settings)); } catch { /* ignorar */ }
  applySports();
}
function ensureSport(key) {
  if (!key || settings.sports.some((s) => s.key === key)) return;
  settings.sports.push(PRESET_MAP[key] ? { ...PRESET_MAP[key] } : { key, label: key, icon: 'bolt', color: 'slate', metric: 'time', types: [] });
}
async function put(coll, obj) {
  obj = clone(obj);
  data[coll].set(obj.id, obj);
  saveLocal();
}
async function del(coll, id) {
  data[coll].delete(id);
  saveLocal();
}
async function pool(tasks) {
  let errors = 0;
  for (const t of tasks) { try { await t(); } catch { errors++; } }
  return errors;
}

// ===================== Consultas =====================
const sessionsOn = (d) => [...data.sessions.values()].filter((s) => s.date === d).sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
const planOn = (d) => [...data.plan.values()].filter((p) => p.date === d).sort((a, b) => (a.order || 0) - (b.order || 0));
const sessionsDesc = () => [...data.sessions.values()].sort((a, b) => b.date.localeCompare(a.date) || (b.createdAt || 0) - (a.createdAt || 0));
const dayStatus = (d) => data.days.get(d)?.status || '';
function planState(p) {
  if (p.sessionId && data.sessions.has(p.sessionId)) return 'done';
  const t = today();
  if (p.date < t) return 'missed';
  return p.date === t ? 'today' : 'pending';
}
function weekInfo(mon) {
  const t = today();
  const days = Array.from({ length: 7 }, (_, i) => addDays(mon, i));
  let planned = 0, done = 0, missed = 0, train = 0;
  const free = [];
  for (const d of days) {
    const pl = planOn(d), ss = sessionsOn(d);
    planned += pl.length;
    for (const p of pl) { const st = planState(p); if (st === 'done') done++; else if (st === 'missed') missed++; }
    const trains = ss.length > 0 || (d >= t && pl.length > 0);
    if (trains) train++;
    else if (d >= t) free.push(d);
  }
  return { days, planned, done, missed, train, free };
}
function goalNote(w, compact = false) {
  const G = settings.goalDays || 6;
  const rest = 7 - G;
  const restTxt = rest ? ` y ${rest} de descanso` : '';
  if (w.train > G) return { cls: 'warn', txt: `Te pasas: ${w.train} días de entreno. Tu objetivo es ${G}${restTxt}.` };
  if (w.train === G) return { cls: 'okay', txt: `Semana en objetivo: ${G} días de entreno${restTxt}.` };
  const missing = G - w.train;
  const canFill = Math.max(0, w.free.length - (7 - G)); // respeta los días de descanso del objetivo
  let txt = `Te ${missing === 1 ? 'falta 1 día' : `faltan ${missing} días`} para llegar a ${G}.`;
  if (!compact && canFill > 0) {
    const names = w.free.map((d) => `${dowOf(d)} ${fromISO(d).getDate()}${dayStatus(d) === 'off' ? ' (libras)' : ''}`).join(', ');
    txt += ` Días sin sesión: ${names}.`;
  } else if (canFill < missing) {
    txt += canFill === 0 ? ' Esta semana ya no da para más: prioriza descansar bien.' : '';
  }
  return { cls: 'warn', txt };
}
function lastExercise(name, excludeId, beforeDate) {
  const key = name.trim().toLowerCase();
  if (!key) return null;
  for (const s of sessionsDesc()) {
    if (s.id === excludeId || metricOf(s.sport) !== 'strength') continue;
    if (beforeDate && s.date > beforeDate) continue;
    const ex = (s.exercises || []).find((e) => (e.name || '').trim().toLowerCase() === key);
    if (ex && ex.sets?.length) return { date: s.date, sets: ex.sets };
  }
  return null;
}
const setsTxt = (sets) => {
  // Agrupa series iguales: 3×8 @ 70 kg
  const groups = [];
  for (const st of sets) {
    const g = groups[groups.length - 1];
    if (g && g.reps === st.reps && g.kg === st.kg) g.n++;
    else groups.push({ n: 1, reps: st.reps, kg: st.kg });
  }
  return groups.map((g) => `${g.n}×${g.reps || '?'}${g.kg ? ` @ ${nf(g.kg, 1)} kg` : ''}`).join(', ');
};

// ===================== UI básica =====================
let route = 'hoy';
let weekMon = mondayOf(today());
let moving = null; // {kind:'item', id} | {kind:'day', date}
function routeFromHash() {
  const r = location.hash.slice(1) || 'hoy';
  if (r === 'historial') return 'progreso';
  if (r === 'datos') return 'ajustes';
  return ['hoy', 'semana', 'registrar', 'progreso', 'ajustes', 'carreras', 'zapatillas'].includes(r) ? r : 'hoy';
}
let draft = null;
let renderQueued = false;

function scheduleRender() {
  if (renderQueued) return;
  renderQueued = true;
  requestAnimationFrame(() => { renderQueued = false; render(true); });
}
function toast(msg) {
  const root = $('#toast-root');
  root.innerHTML = `<div class="toast" role="status">${esc(msg)}</div>`;
  clearTimeout(toast.t);
  toast.t = setTimeout(() => (root.innerHTML = ''), 2600);
}
function go(r) { if (location.hash !== '#' + r) location.hash = r; else render(); }

function openSheet(html, mount) {
  const root = $('#sheet-root');
  root.innerHTML = `<div class="backdrop" data-close></div><div class="sheet" role="dialog" aria-modal="true"><div class="sheet-in"><div class="sheet-grip"></div>${html}</div></div>`;
  root.querySelector('[data-close]').onclick = closeSheet;
  mount?.(root.querySelector('.sheet-in'));
}
function closeSheet() { $('#sheet-root').innerHTML = ''; }
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeSheet(); });

function render(fromData = false) {
  // No re-pintar el formulario mientras se escribe por cambios de datos.
  if (fromData && route === 'registrar' && $('#session-form')) { refreshDatalist(); return; }
  $$('.tabs a').forEach((a) => { if (a.dataset.tab === route) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
  const app = $('#app');
  const banner = unreadableNote ? '<div class="note bad">Había datos guardados que no se pudieron leer. Se han apartado sin borrarlos. Si echas algo en falta, importa tu última copia de seguridad.</div>' : '';
  const views = { hoy: viewToday, semana: viewWeek, registrar: viewForm, progreso: viewProgress, ajustes: viewSettings, carreras: viewRaces, zapatillas: viewShoes };
  (views[route] || viewToday)(app, banner);
}
window.addEventListener('hashchange', () => {
  route = routeFromHash();
  if (route === 'registrar' && !draft) draft = newDraft({});
  closeSheet();
  render();
  window.scrollTo(0, 0);
});

// ===================== HOY =====================
function viewToday(app, banner) {
  const t = today();
  if (store === 'loading') { app.innerHTML = `<div class="top"><div><div class="date">${esc(longDate(t))}</div><h1>Hoy te toca</h1></div></div><div class="skel"></div>`; return; }
  const items = planOn(t);
  const extra = sessionsOn(t).filter((s) => !items.some((p) => p.sessionId === s.id));
  const mon = mondayOf(t);
  const w = weekInfo(mon);
  const missed = w.days.filter((d) => d < t).flatMap((d) => planOn(d).filter((p) => planState(p) === 'missed'));
  const tomorrow = planOn(addDays(t, 1));
  const st = dayStatus(t);

  const cards = items.map((p) => {
    const done = planState(p) === 'done';
    const s = done ? data.sessions.get(p.sessionId) : null;
    return `<article class="today s-${p.sport}">
      <div class="today-band">${ico(p.sport)}<span class="kind">${esc(sp(p.sport).label)}${p.type ? ' · ' + esc(p.type) : ''}</span></div>
      <div class="today-body">
        <div class="today-desc">${esc(p.desc || p.type || sp(p.sport).label)}</div>
        ${done
          ? `<div class="done-line">${ICO_CHECK} Hecha · ${esc(summary(s))}</div>
             <button class="btn block" data-edit="${esc(s.id)}">Ver o corregir el registro</button>`
          : `<button class="btn sport block" data-do="${esc(p.id)}">${ICO_CHECK} Hecha · registrar</button>
             <div class="row"><button class="btn" data-move="${esc(p.id)}">Mover a otro día</button></div>`}
      </div></article>`;
  }).join('');

  const emptyCard = !items.length ? `<div class="empty">
      <h2>${extra.length ? 'Nada más planificado' : 'Hoy no tienes sesión planificada'}</h2>
      <p class="muted" style="margin:0">${w.train >= 6 && !extra.length ? 'Puede ser tu día de descanso de la semana.' : 'Registra lo que hagas o planifica la semana.'}</p>
      <div class="row"><a class="btn primary" href="#registrar" data-new>Registrar sesión</a><a class="btn" href="#semana">Planificar</a></div>
    </div>` : '';

  const extraList = extra.length ? `<section><div class="eyebrow">También hecho hoy</div><div class="list">${extra.map(sessionRow).join('')}</div></section>` : '';

  const missedSec = missed.length ? `<section>
      <div class="sec-head"><h2>Pendientes de esta semana</h2></div>
      <div class="list">${missed.map((p) => `<div class="item s-${p.sport}">
        <span class="tile">${ico(p.sport)}</span>
        <span class="item-main"><span class="item-title">${esc(p.desc || p.type || sp(p.sport).label)}</span><span class="item-sub">${esc(shortDate(p.date))} · no registrada</span></span>
        <button class="btn small" data-today="${esc(p.id)}">A hoy</button>
        <button class="iconbtn" data-sheet="${esc(p.id)}" aria-label="Más opciones">${ICO_MORE}</button>
      </div>`).join('')}</div></section>` : '';

  const goal = goalNote(w, true);
  const strip = w.days.map((d) => {
    const dots = planOn(d).map((p) => `<i class="dot s-${p.sport} ${planState(p) === 'done' ? '' : 'hollow'}"></i>`).join('')
      + sessionsOn(d).filter((s) => !planOn(d).some((p) => p.sessionId === s.id)).map((s) => `<i class="dot s-${s.sport}"></i>`).join('');
    return `<a href="#semana" class="${d === t ? 'is-today' : ''}"><span class="d">${dowOf(d)}</span><span class="n">${fromISO(d).getDate()}</span><span class="dots">${dots}</span></a>`;
  }).join('');

  const recent = sessionsDesc().slice(0, 4);
  app.innerHTML = `${banner}
    <div class="top">
      <div><div class="date">${esc(longDate(t))}</div><h1>Hoy te toca</h1></div>
      <button class="daychip" data-st="${st}" data-daytoggle="${t}">${st === 'work' ? 'Trabajo' : st === 'off' ? 'Libro' : 'Marcar día'}</button>
    </div>
    ${cards}${emptyCard}
    ${backupNote()}
    ${extraList}
    ${tomorrow.length ? `<section><div class="eyebrow">Mañana</div><div class="list">${tomorrow.map(planRow).join('')}</div></section>` : ''}
    ${raceCountdown()}
    ${shoeWarnings()}
    ${missedSec}
    <section>
      <div class="sec-head"><h2>Esta semana</h2><a class="muted" href="#semana">Ver semana</a></div>
      <div class="strip">${strip}</div>
      <div class="meter">
        <div class="sec-head"><span>Plan cumplido</span><b class="num">${w.done} de ${w.planned}</b></div>
        <div class="meter-bar"><i style="width:${w.planned ? Math.round((w.done / w.planned) * 100) : 0}%"></i></div>
      </div>
      <div class="note ${goal.cls}">${esc(goal.txt)}</div>
    </section>
    ${homeStats(t)}
    ${recent.length ? `<section><div class="sec-head"><h2>Últimas sesiones</h2><a class="muted" href="#progreso" data-prog="all">Todas</a></div><div class="list">${recent.map(sessionRow).join('')}</div></section>` : ''}`;

  bindCommon(app);
}

function planRow(p) {
  const st = planState(p);
  const badge = st === 'done' ? `<span class="badge done">${ICO_CHECK.replace('class="ico"', 'class="ico" style="width:14px;height:14px"')}Hecha</span>` : st === 'missed' ? '<span class="badge missed">No hecha</span>' : '';
  return `<button class="item s-${p.sport}" data-sheet="${esc(p.id)}"><span class="tile">${ico(p.sport)}</span>
    <span class="item-main"><span class="item-title">${esc(p.desc || p.type || sp(p.sport).label)}</span><span class="item-sub">${esc(sp(p.sport).label)}${p.type ? ' · ' + esc(p.type) : ''}</span></span>${badge}</button>`;
}
function sessionRow(s) {
  return `<button class="item s-${s.sport}" data-edit="${esc(s.id)}"><span class="tile">${ico(s.sport)}</span>
    <span class="item-main"><span class="item-title">${esc(sessionTitle(s))}</span><span class="item-sub num">${esc(shortDate(s.date))} · ${esc(summary(s) || 'Sin datos')}</span></span></button>`;
}

function bindCommon(root) {
  root.querySelectorAll('[data-do]').forEach((b) => (b.onclick = () => startFromPlan(data.plan.get(b.dataset.do))));
  root.querySelectorAll('[data-edit]').forEach((b) => (b.onclick = () => editSession(b.dataset.edit)));
  root.querySelectorAll('[data-move]').forEach((b) => (b.onclick = () => startMove({ kind: 'item', id: b.dataset.move })));
  root.querySelectorAll('[data-sheet]').forEach((b) => (b.onclick = (e) => { e.stopPropagation(); planSheet(b.dataset.sheet); }));
  root.querySelectorAll('[data-today]').forEach((b) => (b.onclick = () => movePlan(b.dataset.today, today())));
  root.querySelectorAll('[data-daytoggle]').forEach((b) => (b.onclick = (e) => { e.stopPropagation(); toggleDay(b.dataset.daytoggle); }));
  root.querySelectorAll('[data-backup]').forEach((b) => (b.onclick = () => exportFile('json')));
  root.querySelectorAll('[data-new]').forEach((b) => (b.onclick = () => { draft = newDraft({}); }));
  root.querySelectorAll('[data-prog]').forEach((b) => (b.onclick = (e) => { e.preventDefault(); progSport = b.dataset.prog; progPeriod = 'week'; progOffset = 0; histLimit = 20; go('progreso'); }));
}

async function toggleDay(d) {
  const cur = dayStatus(d);
  const next = cur === '' ? 'work' : cur === 'work' ? 'off' : '';
  if (next) await put('days', { id: d, status: next }).catch(() => {});
  else await del('days', d);
  render();
}

// ===================== SEMANA =====================
function viewWeek(app, banner) {
  const t = today();
  const w = weekInfo(weekMon);
  const end = addDays(weekMon, 6);
  const range = `${fromISO(weekMon).getDate()} ${fromISO(weekMon).toLocaleDateString('es-ES', { month: 'short' })} – ${fromISO(end).getDate()} ${fromISO(end).toLocaleDateString('es-ES', { month: 'short' })}`;
  const goal = goalNote(w);
  const mv = moving?.kind === 'item' ? data.plan.get(moving.id) : null;

  const dayCards = w.days.map((d) => {
    const pl = planOn(d);
    const linked = new Set(pl.map((p) => p.sessionId));
    const extra = sessionsOn(d).filter((s) => !linked.has(s.id));
    const st = dayStatus(d);
    const isSource = (moving?.kind === 'day' && moving.date === d) || (mv && mv.date === d);
    return `<div class="day ${d === t ? 'is-today' : ''} ${d < t ? 'is-past' : ''} ${moving ? 'target' : ''} ${isSource ? 'source' : ''}" data-day="${d}">
      <div class="day-head">
        <span class="day-name">${esc(fromISO(d).toLocaleDateString('es-ES', { weekday: 'long' }))} ${fromISO(d).getDate()}${d === t ? '<small>hoy</small>' : ''}</span>
        <button class="daychip" data-st="${st}" data-daytoggle="${d}" aria-label="Cambiar trabajo o libre">${st === 'work' ? 'Trabajo' : st === 'off' ? 'Libro' : 'Marcar'}</button>
        <button class="iconbtn" data-daymenu="${d}" aria-label="Opciones del día">${ICO_MORE}</button>
      </div>
      ${pl.map((p) => {
        const ps = planState(p);
        const s = ps === 'done' ? data.sessions.get(p.sessionId) : null;
        return `<button class="pill s-${p.sport} ${ps === 'done' ? 'is-done' : ''} ${ps === 'missed' ? 'is-missed' : ''} ${moving?.id === p.id ? 'is-moving' : ''}" data-sheet="${esc(p.id)}">
          ${ico(p.sport)}
          <span class="pill-main"><span class="pill-title">${esc(p.desc || p.type || sp(p.sport).label)}</span>
          <span class="pill-sub">${esc(sp(p.sport).label)}${p.type ? ' · ' + esc(p.type) : ''}${s ? ' · ' + esc(summary(s)) : ''}</span></span>
          ${ps === 'done' ? '<span class="badge done">Hecha</span>' : ps === 'missed' ? '<span class="badge missed">No hecha</span>' : ''}
        </button>`;
      }).join('')}
      ${racesOn(d).map((r) => `<a class="pill race" href="#carreras">${ICO_FLAG}<span class="pill-main"><span class="pill-title">${esc(r.name)}</span><span class="pill-sub">Carrera${raceMeta(r) ? ' · ' + esc(raceMeta(r)) : ''}</span></span></a>`).join('')}
      ${extra.map((s) => `<button class="pill extra s-${s.sport}" data-edit="${esc(s.id)}">${ico(s.sport)}<span class="pill-main"><span class="pill-title">${esc(sessionTitle(s))}</span><span class="pill-sub">Sin planificar · ${esc(summary(s))}</span></span><span class="badge done">Hecha</span></button>`).join('')}
      ${moving ? '' : `<button class="addbtn" data-add="${d}">+ Añadir sesión</button>`}
    </div>`;
  }).join('');

  const moveTxt = moving?.kind === 'item' && mv ? `Toca el día al que mover «${mv.desc || mv.type || sp(mv.sport).label}»` : moving?.kind === 'day' ? `Toca el día con el que intercambiar el ${shortDate(moving.date)}` : '';

  app.innerHTML = `${banner}
    <div class="weeknav">
      <button class="btn" data-wk="-1" aria-label="Semana anterior">${ICO_L}</button>
      <div class="mid"><div class="eyebrow">${weekMon === mondayOf(t) ? 'Esta semana' : 'Semana'}</div><h2 class="num">${esc(range)}</h2></div>
      <button class="btn" data-wk="1" aria-label="Semana siguiente">${ICO_R}</button>
    </div>
    ${moving ? `<div class="movebar"><span>${esc(moveTxt)}</span><button class="btn" id="cancel-move">Cancelar</button></div>` : ''}
    <div class="stats3">
      <div class="stat"><b>${w.done}/${w.planned}</b><span>plan cumplido</span></div>
      <div class="stat"><b>${w.train}/${settings.goalDays || 6}</b><span>días de entreno</span></div>
      <div class="stat"><b>${w.missed}</b><span>no hechas</span></div>
    </div>
    <div class="note ${goal.cls}">${esc(goal.txt)}</div>
    ${weekMon !== mondayOf(t) ? '<button class="btn small" id="go-today" style="align-self:center">Ir a esta semana</button>' : ''}
    ${dayCards}
    <section>
      <div class="eyebrow">Plan de varias semanas</div>
      <div class="row">
        <button class="btn" id="copy-week">Copiar semana a las siguientes</button>
        <button class="btn danger" id="clear-week">Vaciar semana</button>
      </div>
    </section>`;

  bindCommon(app);
  $$('[data-wk]', app).forEach((b) => (b.onclick = () => { weekMon = addDays(weekMon, 7 * Number(b.dataset.wk)); render(); }));
  $('#go-today', app)?.addEventListener('click', () => { weekMon = mondayOf(t); render(); });
  $('#cancel-move', app)?.addEventListener('click', () => { moving = null; render(); });
  $$('[data-add]', app).forEach((b) => (b.onclick = () => planEditor({ date: b.dataset.add })));
  $$('[data-daymenu]', app).forEach((b) => (b.onclick = (e) => { e.stopPropagation(); dayMenu(b.dataset.daymenu); }));
  $('#copy-week', app).onclick = copyWeekSheet;
  $('#clear-week', app).onclick = clearWeekSheet;
  if (moving) {
    $$('.day', app).forEach((el) => {
      el.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); dropOn(el.dataset.day); }, true);
    });
  }
}

function startMove(m) {
  const p = m.kind === 'item' ? data.plan.get(m.id) : null;
  moving = m;
  weekMon = mondayOf(p ? p.date : m.date || today());
  closeSheet();
  if (route !== 'semana') go('semana'); else render();
}
async function dropOn(d) {
  const m = moving; moving = null;
  if (!m) return;
  if (m.kind === 'item') {
    const p = data.plan.get(m.id);
    if (p && p.date !== d) { await movePlan(p.id, d, true); toast(`Movida al ${shortDate(d)}`); }
  } else if (m.kind === 'day' && m.date !== d) {
    const a = planOn(m.date).filter((p) => planState(p) !== 'done');
    const b = planOn(d).filter((p) => planState(p) !== 'done');
    await pool([...a.map((p) => () => put('plan', { ...p, date: d })), ...b.map((p) => () => put('plan', { ...p, date: m.date }))]);
    toast(`Intercambiados ${shortDate(m.date)} y ${shortDate(d)}`);
  }
  render();
}
async function movePlan(id, d, silent) {
  const p = data.plan.get(id);
  if (!p) return;
  await put('plan', { ...p, date: d, order: Date.now() }).catch(() => {});
  if (!silent) toast(`Movida al ${shortDate(d)}`);
  render();
}

function dayMenu(d) {
  const has = planOn(d).some((p) => planState(p) !== 'done');
  openSheet(`<h2 style="text-transform:capitalize">${esc(longDate(d))}</h2>
    <div class="actions">
      <button class="btn" id="dm-add">+ Añadir sesión planificada</button>
      <button class="btn" id="dm-log">Registrar una sesión este día</button>
      <button class="btn" id="dm-swap" ${has ? '' : 'disabled'}>Intercambiar con otro día</button>
      <button class="btn" id="dm-next" ${has ? '' : 'disabled'}>Pasar lo pendiente al día siguiente</button>
      <button class="btn ghost" data-close-sheet>Cerrar</button>
    </div>`, (el) => {
    $('#dm-add', el).onclick = () => planEditor({ date: d });
    $('#dm-log', el).onclick = () => { closeSheet(); draft = newDraft({ date: d }); go('registrar'); };
    $('#dm-swap', el).onclick = () => startMove({ kind: 'day', date: d });
    $('#dm-next', el).onclick = async () => {
      closeSheet();
      const n = addDays(d, 1);
      await pool(planOn(d).filter((p) => planState(p) !== 'done').map((p) => () => put('plan', { ...p, date: n, order: Date.now() })));
      toast(`Pasado al ${shortDate(n)}`); render();
    };
    $('[data-close-sheet]', el).onclick = closeSheet;
  });
}

function planSheet(id) {
  const p = data.plan.get(id);
  if (!p) return;
  const st = planState(p);
  const s = st === 'done' ? data.sessions.get(p.sessionId) : null;
  openSheet(`<div class="row s-${p.sport}" style="align-items:center"><span class="tile">${ico(p.sport)}</span>
      <div style="flex:1;min-width:0"><div class="eyebrow">${esc(sp(p.sport).label)}${p.type ? ' · ' + esc(p.type) : ''} · ${esc(shortDate(p.date))}</div><h2>${esc(p.desc || p.type || sp(p.sport).label)}</h2></div></div>
    ${s ? `<div class="note okay">Hecha: ${esc(summary(s))}</div>` : st === 'missed' ? '<div class="note bad">No registrada. Si la hiciste, regístrala; si no, muévela o bórrala.</div>' : ''}
    <div class="actions">
      ${s ? '<button class="btn" id="ps-view">Ver o corregir el registro</button>' : `<button class="btn sport s-${p.sport}" id="ps-do">${ICO_CHECK} Hecha · registrar</button>
      <button class="btn" id="ps-move">Mover a otro día</button>
      ${p.date !== today() ? '<button class="btn" id="ps-today">Pasar a hoy</button>' : ''}`}
      <button class="btn" id="ps-edit">Editar</button>
      <button class="btn" id="ps-dup">Duplicar</button>
      <button class="btn danger" id="ps-del">Eliminar del plan</button>
    </div>`, (el) => {
    $('#ps-do', el)?.addEventListener('click', () => { closeSheet(); startFromPlan(p); });
    $('#ps-view', el)?.addEventListener('click', () => { closeSheet(); editSession(s.id); });
    $('#ps-move', el)?.addEventListener('click', () => startMove({ kind: 'item', id }));
    $('#ps-today', el)?.addEventListener('click', () => { closeSheet(); movePlan(id, today()); });
    $('#ps-edit', el).onclick = () => planEditor(p);
    $('#ps-dup', el).onclick = async () => { closeSheet(); await put('plan', { ...p, id: uid(), sessionId: null, order: Date.now() }).catch(() => {}); toast('Duplicada'); render(); };
    const delBtn = $('#ps-del', el);
    delBtn.onclick = async () => {
      if (!delBtn.dataset.sure) { delBtn.dataset.sure = '1'; delBtn.textContent = 'Toca otra vez para eliminar'; return; }
      closeSheet(); await del('plan', id); toast('Eliminada del plan'); render();
    };
  });
}

function planEditor(init) {
  const p = { id: init.id || null, date: init.date || today(), sport: init.sport || SPORT_KEYS[0], type: init.type || '', desc: init.desc || '' };
  const draw = (el) => {
    el.innerHTML = `<div class="sheet-grip"></div><h2>${p.id ? 'Editar sesión planificada' : 'Planificar sesión'}</h2>
      <div class="sports">${SPORT_KEYS.map((k) => `<button type="button" class="s-${k}" data-sp="${k}" aria-pressed="${p.sport === k}">${ico(k)}<span>${esc(sp(k).label)}</span></button>`).join('')}</div>
      <div class="field"><span class="lbl">Tipo</span><div class="chips">${(sp(p.sport).types || []).map((t) => `<button type="button" data-ty="${esc(t)}" aria-pressed="${p.type === t}">${esc(t)}</button>`).join('')}</div></div>
      <div class="field"><label for="pe-desc">Descripción</label><input id="pe-desc" type="text" value="${esc(p.desc)}" placeholder="${esc(sp(p.sport).ph || 'Descripción breve')}" maxlength="120" autocomplete="off"></div>
      <div class="field"><label for="pe-date">Día</label><input id="pe-date" type="date" value="${esc(p.date)}"></div>
      <button class="btn primary block" id="pe-save">${p.id ? 'Guardar cambios' : 'Añadir al plan'}</button>`;
    $$('[data-sp]', el).forEach((b) => (b.onclick = () => { p.desc = $('#pe-desc', el).value; p.date = $('#pe-date', el).value; p.sport = b.dataset.sp; p.type = ''; draw(el); }));
    $$('[data-ty]', el).forEach((b) => (b.onclick = () => { p.desc = $('#pe-desc', el).value; p.date = $('#pe-date', el).value; p.type = p.type === b.dataset.ty ? '' : b.dataset.ty; draw(el); }));
    $('#pe-save', el).onclick = async () => {
      const date = $('#pe-date', el).value;
      if (!isISO(date)) { toast('Elige un día'); return; }
      const prev = p.id ? data.plan.get(p.id) : null;
      const obj = { ...(prev || {}), id: p.id || uid(), sport: p.sport, type: p.type, desc: $('#pe-desc', el).value.trim(), date, order: prev?.order || Date.now(), sessionId: prev?.sessionId || null };
      closeSheet();
      await put('plan', obj).catch(() => {});
      toast(p.id ? 'Plan actualizado' : 'Añadida al plan');
      render();
    };
  };
  openSheet('', (el) => draw(el));
}

function copyWeekSheet() {
  const items = weekInfo(weekMon).days.flatMap(planOn);
  if (!items.length) { toast('Esta semana no tiene sesiones planificadas que copiar'); return; }
  let n = 1, replace = false;
  const draw = (el) => {
    el.innerHTML = `<div class="sheet-grip"></div><h2>Copiar semana</h2>
      <p class="muted" style="margin:0">Copia las ${items.length} sesiones de esta semana, en los mismos días, a las semanas siguientes. Luego puedes mover cada una según tus turnos.</p>
      <div class="field"><span class="lbl">Número de semanas</span>
        <div class="seg">${[1, 2, 3, 4, 6, 8, 12].map((k) => `<button type="button" data-n="${k}" aria-pressed="${n === k}">${k}</button>`).join('')}</div></div>
      <button type="button" class="toggle" id="cw-rep" aria-pressed="${replace}">${replace ? ICO_CHECK : ''}Sustituir lo que ya haya planificado en esas semanas</button>
      <p class="hint">Se copiará hasta la semana del ${esc(shortDate(addDays(weekMon, 7 * n)))}.</p>
      <button class="btn primary block" id="cw-go">Copiar a ${n} semana${n === 1 ? '' : 's'}</button>`;
    $$('[data-n]', el).forEach((b) => (b.onclick = () => { n = Number(b.dataset.n); draw(el); }));
    $('#cw-rep', el).onclick = () => { replace = !replace; draw(el); };
    $('#cw-go', el).onclick = async () => {
      closeSheet(); toast('Copiando…');
      const tasks = [];
      for (let k = 1; k <= n; k++) {
        const mon = addDays(weekMon, 7 * k);
        if (replace) weekInfo(mon).days.flatMap(planOn).filter((p) => planState(p) !== 'done').forEach((p) => tasks.push(() => del('plan', p.id)));
        items.forEach((p, i) => tasks.push(() => put('plan', { id: uid(), sport: p.sport, type: p.type || '', desc: p.desc || '', date: addDays(p.date, 7 * k), order: Date.now() + i, sessionId: null })));
      }
      const errs = await pool(tasks);
      toast(errs ? `Copiado con ${errs} errores` : `Copiada a ${n} semana${n === 1 ? '' : 's'}`);
      render();
    };
  };
  openSheet('', draw);
}
function clearWeekSheet() {
  const items = weekInfo(weekMon).days.flatMap(planOn).filter((p) => planState(p) !== 'done');
  if (!items.length) { toast('No hay sesiones pendientes que borrar'); return; }
  openSheet(`<h2>Vaciar semana</h2><p class="muted" style="margin:0">Se borrarán ${items.length} sesiones planificadas sin hacer. Las ya registradas se quedan.</p>
    <div class="actions"><button class="btn danger" id="cw-del">Borrar ${items.length} sesiones</button><button class="btn ghost" id="cw-no">Cancelar</button></div>`, (el) => {
    $('#cw-no', el).onclick = closeSheet;
    $('#cw-del', el).onclick = async () => { closeSheet(); await pool(items.map((p) => () => del('plan', p.id))); toast('Semana vaciada'); render(); };
  });
}

// ===================== REGISTRO =====================
const firstSport = () => SPORT_KEYS[0] || 'run';
function newDraft(o) {
  return {
    id: null, sport: o.sport || lastSport() || firstSport(), date: o.date || today(), title: o.title || '', type: o.type || '',
    durationSec: null, distanceM: null, elevationM: null, rpe: null, feel: null, notes: '',
    gear: [], reps: { count: null, distM: null, paces: [] },
    exercises: [], planId: o.planId || null, shoeId: undefined,
  };
}
// El deporte de la última sesión registrada, para ahorrar un toque.
function lastSport() {
  const s = sessionsDesc()[0];
  return s && SPORT_KEYS.includes(s.sport) ? s.sport : null;
}
function startFromPlan(p) {
  if (!p) return;
  draft = newDraft({ sport: p.sport, date: p.date, type: p.type, title: p.desc, planId: p.id });
  if (sp(p.sport).intervals && p.type === 'Series') {
    const m = /(\d+)\s*[x×]\s*(\d+)/i.exec(p.desc || '');
    if (m) { draft.reps.count = Number(m[1]); draft.reps.distM = Number(m[2]); }
  }
  closeSheet();
  go('registrar');
}
function editSession(id) {
  const s = data.sessions.get(id);
  if (!s) return;
  draft = { ...newDraft({}), ...clone(s) };
  draft.gear = gearOf(s);
  draft.reps = draft.reps || { count: null, distM: null, paces: [] };
  draft.exercises = draft.exercises || [];
  draft.shoeId = s.shoeId || null;
  closeSheet();
  go('registrar');
}
function refreshDatalist() {
  const names = new Set();
  for (const s of data.sessions.values()) for (const e of s.exercises || []) if (e.name) names.add(e.name.trim());
  $('#ex-names').innerHTML = [...names].sort().map((n) => `<option value="${esc(n)}"></option>`).join('');
}
const repChips = (metric) => (metric === 'pace_100m' ? [50, 100, 200, 400] : metric === 'pace_500m' ? [250, 500, 1000, 2000] : [200, 400, 800, 1000, 2000]);

function viewForm(app, banner) {
  if (!draft) draft = newDraft({});
  const d = draft;
  if (!SPORT_KEYS.includes(d.sport) && !d.id) d.sport = firstSport();
  const S = sp(d.sport);
  const metric = S.metric || 'time';
  const M = METRICS[metric] || {};
  refreshDatalist();
  const plan = d.planId ? data.plan.get(d.planId) : null;
  const unitM = M.unit === 'm';
  const distVal = d.distanceM ? (unitM ? d.distanceM : +(d.distanceM / 1000).toFixed(3)) : '';
  const sportKeys = SPORT_KEYS.includes(d.sport) ? SPORT_KEYS : [...SPORT_KEYS, d.sport];

  const durField = (label, big) => `<div class="field"><label for="f-dur">${label}</label><input id="f-dur" class="${big ? 'big' : ''}" inputmode="numeric" value="${esc(fmtDur(d.durationSec))}" placeholder="${big ? '45:00' : '60'}" autocomplete="off"><span class="hint" id="dur-hint">${d.durationSec ? '' : 'Escribe 4530 para 45:30 o 90 para 1:30:00'}</span></div>`;

  let specific = '';
  if (isDistMetric(metric)) {
    specific += `<div class="grid2">
      <div class="field"><label for="f-dist">Distancia (${M.unit})</label><input id="f-dist" class="big" inputmode="decimal" value="${esc(distVal)}" placeholder="0" autocomplete="off"></div>
      ${durField('Tiempo', true)}
    </div>
    ${S.chips?.length ? `<div class="chips">${S.chips.map((v) => `<button type="button" data-dist="${v}">${nf(v, 1)} ${M.unit}</button>`).join('')}</div>` : ''}
    <div class="box" style="flex-direction:row;justify-content:space-between;align-items:center">
      <span class="muted">${metric === 'speed' ? 'Velocidad media (km/h)' : `Ritmo ${M.paceLbl.replace('/', '/ ')}`}</span><span class="calc" id="calc">—</span>
    </div>`;
  } else if (metric === 'time') {
    specific += durField('Duración', true);
  }
  if (S.elev) {
    specific += `<div class="field"><label for="f-elev">Desnivel positivo (m)</label><input id="f-elev" inputmode="numeric" value="${esc(d.elevationM ?? '')}" placeholder="0" autocomplete="off"></div>`;
  }
  const shoeOpts = shoesFor(d.sport);
  if (d.shoeId === undefined) d.shoeId = defaultShoe(d.sport);
  const curShoe = d.shoeId ? data.shoes.get(d.shoeId) : null;
  if (curShoe && !shoeOpts.includes(curShoe)) shoeOpts.push(curShoe); // al editar una sesión con zapatillas ya retiradas
  if (shoeOpts.length) {
    specific += `<div class="field"><span class="lbl">Zapatillas</span><div class="chips">${shoeOpts.map((sh) => `<button type="button" data-shoepick="${esc(sh.id)}" aria-pressed="${d.shoeId === sh.id}">${esc(sh.name)} · ${nf(shoeKm(sh), 0)} km</button>`).join('')}<button type="button" data-shoepick="" aria-pressed="${!d.shoeId}">Ninguna</button></div></div>`;
  }
  if (S.gear?.length) {
    specific += `<div class="field"><span class="lbl">Material</span><div class="row">${S.gear.map((g) => {
      const on = d.gear.includes(g);
      return `<button type="button" class="toggle" data-gear="${esc(g)}" aria-pressed="${on}">${on ? ICO_CHECK : ''}${esc(g)}</button>`;
    }).join('')}</div></div>`;
  }
  if (S.intervals && isPaceMetric(metric) && d.type === 'Series') {
    const count = Math.min(Number(d.reps.count) || 0, 40);
    specific += `<div class="box"><b>Series</b>
      <div class="grid2">
        <div class="field"><label for="f-rc">Repeticiones</label><input id="f-rc" inputmode="numeric" value="${esc(d.reps.count ?? '')}" placeholder="6" autocomplete="off"></div>
        <div class="field"><label for="f-rd">Distancia de cada una (m)</label><input id="f-rd" inputmode="numeric" value="${esc(d.reps.distM ?? '')}" placeholder="${repChips(metric)[1]}" autocomplete="off"></div>
      </div>
      <div class="chips">${repChips(metric).map((v) => `<button type="button" data-rd="${v}">${v} m</button>`).join('')}</div>
      ${count ? `<span class="lbl">Ritmo de cada una (min${M.paceLbl})</span>
      <div class="reps-list">${Array.from({ length: count }, (_, i) => `<label>#${i + 1}<input data-rp="${i}" inputmode="numeric" value="${esc(fmtPace(d.reps.paces?.[i]))}" placeholder="${esc(fmtPace(d.reps.paces?.[0]) || '4:15')}" autocomplete="off"></label>`).join('')}</div>
      <span class="hint" id="reps-hint"></span>` : '<span class="hint">Pon el número de repeticiones para anotar el ritmo de cada una.</span>'}
    </div>`;
  }
  if (metric === 'strength') {
    const lastStrength = sessionsDesc().find((s) => s.sport === d.sport && s.id !== d.id && s.exercises?.length);
    specific += `<div class="field"><span class="lbl">Ejercicios</span>
      ${d.exercises.map((ex, i) => exerciseCard(ex, i)).join('')}
      <button type="button" class="btn block" id="add-ex">+ Añadir ejercicio</button>
      ${!d.exercises.length && lastStrength ? `<button type="button" class="btn ghost block" id="copy-last">Repetir ejercicios del ${esc(shortDate(lastStrength.date))}${lastStrength.type ? ' (' + esc(lastStrength.type) + ')' : ''}</button>` : ''}
    </div>
    ${durField('Duración (opcional)', false)}`;
  }

  app.innerHTML = `${banner}
    <form id="session-form" novalidate>
      <div class="top"><div><div class="eyebrow">${d.id ? 'Editar sesión' : plan ? 'Registrar sesión planificada' : 'Nueva sesión'}</div>
        <h1>${esc(plan ? plan.desc || plan.type || S.label : d.id ? sessionTitle(d) : 'Registrar')}</h1></div></div>
      <div class="sports">${sportKeys.map((k) => `<button type="button" class="s-${k}" data-sport="${k}" aria-pressed="${d.sport === k}">${ico(k)}<span>${esc(sp(k).label)}</span></button>`).join('')}</div>
      ${S.types?.length ? `<div class="field"><span class="lbl">Tipo</span><div class="chips">${S.types.map((t) => `<button type="button" data-type="${esc(t)}" aria-pressed="${d.type === t}">${esc(t)}</button>`).join('')}</div></div>` : ''}
      ${specific}
      <div class="field"><span class="lbl">Esfuerzo percibido (RPE) <span class="muted" id="rpe-txt">${d.rpe ? '· ' + RPE_TXT[d.rpe] : ''}</span></span>
        <div class="rpe">${Array.from({ length: 10 }, (_, i) => `<button type="button" data-rpe="${i + 1}" aria-pressed="${d.rpe === i + 1}">${i + 1}</button>`).join('')}</div></div>
      <div class="field"><span class="lbl">Sensaciones</span>
        <div class="seg feels">${FEELS.map((f, i) => `<button type="button" data-feel="${i + 1}" aria-pressed="${d.feel === i + 1}">${f}</button>`).join('')}</div></div>
      <div class="field"><label for="f-date">Fecha</label><input id="f-date" type="date" value="${esc(d.date)}"></div>
      <div class="field"><label for="f-notes">Notas</label><textarea id="f-notes" placeholder="Cómo fue, molestias, material, clima…">${esc(d.notes)}</textarea></div>
      <div class="savebar">
        ${d.id ? '<button type="button" class="btn danger" id="f-del">Eliminar</button>' : ''}
        <button type="submit" class="btn primary">${d.id ? 'Guardar cambios' : 'Guardar sesión'}</button>
      </div>
    </form>`;
  bindForm(app);
  updateCalc();
}

function exerciseCard(ex, i) {
  const last = lastExercise(ex.name || '', draft.id, draft.date);
  return `<div class="box ex" data-exi="${i}">
    <div class="ex-head"><input type="text" list="ex-names" data-exname="${i}" value="${esc(ex.name)}" placeholder="Ejercicio (p. ej. Sentadilla)" autocomplete="off">
      <button type="button" class="iconbtn" data-exdel="${i}" aria-label="Quitar ejercicio">✕</button></div>
    ${last ? `<div class="ex-last"><span>Última vez (${esc(shortDate(last.date))}): <b class="num">${esc(setsTxt(last.sets))}</b></span><button type="button" class="btn small" data-excopy="${i}">Copiar</button></div>` : ex.name ? '<div class="hint">Primera vez que registras este ejercicio.</div>' : ''}
    ${ex.sets.length ? '<div class="set-head"><span></span><span>Reps</span><span>Kg</span><span></span></div>' : ''}
    ${ex.sets.map((st, j) => `<div class="set"><span class="k">${j + 1}</span>
      <input data-sr="${i}:${j}" inputmode="numeric" value="${esc(st.reps ?? '')}" placeholder="${esc(last?.sets[j]?.reps ?? '')}" aria-label="Repeticiones serie ${j + 1}">
      <input data-sk="${i}:${j}" inputmode="decimal" value="${esc(st.kg ?? '')}" placeholder="${esc(last?.sets[j]?.kg ?? '')}" aria-label="Kilos serie ${j + 1}">
      <button type="button" class="iconbtn" data-setdel="${i}:${j}" aria-label="Quitar serie">−</button></div>`).join('')}
    <button type="button" class="btn small" data-setadd="${i}">+ Serie${ex.sets.length ? ' (copia la anterior)' : ''}</button>
  </div>`;
}

function updateCalc() {
  const d = draft;
  const M = METRICS[metricOf(d.sport)] || {};
  const out = $('#calc');
  if (out) {
    const v = paceVal(d);
    out.textContent = v == null ? '—' : M.paceM ? fmtPace(v) : nf(v, 1);
  }
  const dh = $('#dur-hint');
  if (dh && $('#f-dur') && document.activeElement === $('#f-dur')) dh.textContent = d.durationSec ? `= ${fmtDur(d.durationSec)}` : 'Escribe 4530 para 45:30 o 90 para 1:30:00';
  const rh = $('#reps-hint');
  if (rh && M.paceM) {
    const ps = (d.reps.paces || []).filter(Boolean);
    if (ps.length) {
      const avg = ps.reduce((a, b) => a + b, 0) / ps.length;
      const best = Math.min(...ps);
      const repT = d.reps.distM ? ` · cada ${d.reps.distM} m ≈ ${fmtDur((avg * d.reps.distM) / M.paceM)}` : '';
      rh.textContent = `Media ${fmtPace(avg)} ${M.paceLbl} · mejor ${fmtPace(best)} ${M.paceLbl}${repT}`;
    } else rh.textContent = '';
  }
}

function bindForm(app) {
  const d = draft;
  const form = $('#session-form', app);
  const rerender = () => { const y = window.scrollY; viewForm(app, ''); window.scrollTo(0, y); };
  const unitM = () => distUnit(d.sport) === 'm';

  $$('[data-sport]', form).forEach((b) => (b.onclick = () => {
    if (d.sport === b.dataset.sport) return;
    const prevUnit = distUnit(d.sport), prevMetric = metricOf(d.sport);
    d.sport = b.dataset.sport;
    d.shoeId = undefined;
    d.type = (sp(d.sport).types || []).includes(d.type) ? d.type : '';
    d.gear = d.gear.filter((g) => (sp(d.sport).gear || []).includes(g));
    if (!isDistMetric(metricOf(d.sport))) d.distanceM = null;
    else if (prevUnit !== distUnit(d.sport) || !isDistMetric(prevMetric)) d.distanceM = null;
    if (!sp(d.sport).elev) d.elevationM = null;
    rerender();
  }));
  $$('[data-type]', form).forEach((b) => (b.onclick = () => { d.type = d.type === b.dataset.type ? '' : b.dataset.type; rerender(); }));
  $$('[data-rpe]', form).forEach((b) => (b.onclick = () => {
    const v = Number(b.dataset.rpe); d.rpe = d.rpe === v ? null : v;
    $$('[data-rpe]', form).forEach((x) => x.setAttribute('aria-pressed', String(Number(x.dataset.rpe) === d.rpe)));
    $('#rpe-txt').textContent = d.rpe ? '· ' + RPE_TXT[d.rpe] : '';
  }));
  $$('[data-feel]', form).forEach((b) => (b.onclick = () => {
    const v = Number(b.dataset.feel); d.feel = d.feel === v ? null : v;
    $$('[data-feel]', form).forEach((x) => x.setAttribute('aria-pressed', String(Number(x.dataset.feel) === d.feel)));
  }));
  $$('[data-gear]', form).forEach((b) => (b.onclick = () => {
    const g = b.dataset.gear;
    d.gear = d.gear.includes(g) ? d.gear.filter((x) => x !== g) : [...d.gear, g];
    rerender();
  }));
  $$('[data-shoepick]', form).forEach((b) => (b.onclick = () => { d.shoeId = b.dataset.shoepick || null; rerender(); }));
  $$('[data-dist]', form).forEach((b) => (b.onclick = () => {
    const v = Number(b.dataset.dist); d.distanceM = unitM() ? v : Math.round(v * 1000);
    $('#f-dist').value = v; updateCalc();
  }));
  $$('[data-rd]', form).forEach((b) => (b.onclick = () => { d.reps.distM = Number(b.dataset.rd); rerender(); }));

  const on = (sel, fn, ev = 'input') => { const el = $(sel, form); if (el) el.addEventListener(ev, fn); };
  on('#f-dist', (e) => { const v = num(e.target.value); d.distanceM = v == null ? null : unitM() ? Math.round(v) : Math.round(v * 1000); updateCalc(); });
  on('#f-dur', (e) => { d.durationSec = parseDuration(e.target.value); updateCalc(); });
  on('#f-dur', (e) => { if (d.durationSec) e.target.value = fmtDur(d.durationSec); const h = $('#dur-hint'); if (h) h.textContent = ''; }, 'blur');
  on('#f-elev', (e) => { d.elevationM = num(e.target.value); });
  on('#f-date', (e) => { d.date = e.target.value; });
  on('#f-notes', (e) => { d.notes = e.target.value; });
  on('#f-rc', (e) => { d.reps.count = num(e.target.value); }, 'input');
  on('#f-rc', rerender, 'change');
  on('#f-rd', (e) => { d.reps.distM = num(e.target.value); updateCalc(); });
  $$('[data-rp]', form).forEach((inp) => {
    inp.addEventListener('input', () => { d.reps.paces[Number(inp.dataset.rp)] = parsePace(inp.value); updateCalc(); });
    inp.addEventListener('blur', () => { const v = d.reps.paces[Number(inp.dataset.rp)]; if (v) inp.value = fmtPace(v); });
  });

  // Ejercicios (fuerza)
  $('#add-ex', form)?.addEventListener('click', () => { d.exercises.push({ name: '', sets: [{ reps: null, kg: null }] }); rerender(); const ins = $$('[data-exname]'); ins[ins.length - 1]?.focus(); });
  $('#copy-last', form)?.addEventListener('click', () => {
    const last = sessionsDesc().find((s) => s.sport === d.sport && s.id !== d.id && s.exercises?.length);
    d.exercises = clone(last.exercises).map((e) => ({ name: e.name, sets: e.sets.map((st) => ({ reps: st.reps ?? null, kg: st.kg ?? null })) }));
    if (!d.type && last.type) d.type = last.type;
    rerender();
  });
  $$('[data-exname]', form).forEach((inp) => {
    inp.addEventListener('input', () => { d.exercises[Number(inp.dataset.exname)].name = inp.value; });
    inp.addEventListener('change', rerender);
  });
  $$('[data-exdel]', form).forEach((b) => (b.onclick = () => { d.exercises.splice(Number(b.dataset.exdel), 1); rerender(); }));
  $$('[data-excopy]', form).forEach((b) => (b.onclick = () => {
    const ex = d.exercises[Number(b.dataset.excopy)];
    const last = lastExercise(ex.name, d.id, d.date);
    if (last) ex.sets = clone(last.sets);
    rerender();
  }));
  $$('[data-setadd]', form).forEach((b) => (b.onclick = () => {
    const ex = d.exercises[Number(b.dataset.setadd)];
    const prev = ex.sets[ex.sets.length - 1];
    ex.sets.push(prev ? { ...prev } : { reps: null, kg: null });
    rerender();
  }));
  $$('[data-setdel]', form).forEach((b) => (b.onclick = () => { const [i, j] = b.dataset.setdel.split(':').map(Number); d.exercises[i].sets.splice(j, 1); rerender(); }));
  $$('[data-sr]', form).forEach((inp) => inp.addEventListener('input', () => { const [i, j] = inp.dataset.sr.split(':').map(Number); d.exercises[i].sets[j].reps = num(inp.value); }));
  $$('[data-sk]', form).forEach((inp) => inp.addEventListener('input', () => { const [i, j] = inp.dataset.sk.split(':').map(Number); const v = String(inp.value).replace(',', '.'); d.exercises[i].sets[j].kg = v === '' ? null : Number.isFinite(Number(v)) ? Number(v) : null; }));

  const delBtn = $('#f-del', form);
  if (delBtn) delBtn.onclick = async () => {
    if (!delBtn.dataset.sure) { delBtn.dataset.sure = '1'; delBtn.textContent = '¿Seguro? Toca otra vez'; return; }
    const id = d.id;
    for (const p of data.plan.values()) if (p.sessionId === id) await put('plan', { ...p, sessionId: null });
    await del('sessions', id);
    draft = null; toast('Sesión eliminada'); go('hoy');
  };

  form.onsubmit = async (e) => {
    e.preventDefault();
    if (!isISO(d.date)) { toast('Pon la fecha de la sesión'); return; }
    const S = sp(d.sport), metric = S.metric || 'time';
    const s = {
      id: d.id || uid(), sport: d.sport, date: d.date, title: d.title || '', type: d.type || '',
      durationSec: d.durationSec || null, distanceM: isDistMetric(metric) ? d.distanceM || null : null,
      rpe: d.rpe || null, feel: d.feel || null, notes: (d.notes || '').trim(),
      createdAt: d.createdAt || Date.now(), planId: d.planId || null,
    };
    if (S.gear?.length) s.gear = d.gear.filter((g) => S.gear.includes(g));
    if (S.elev) s.elevationM = d.elevationM || null;
    if (isDistMetric(metric) && d.shoeId && data.shoes.has(d.shoeId)) s.shoeId = d.shoeId;
    if (S.intervals && isPaceMetric(metric) && d.type === 'Series') {
      const count = Number(d.reps.count) || 0;
      s.reps = { count, distM: d.reps.distM || null, paces: (d.reps.paces || []).slice(0, count).map((x) => x || null) };
    }
    if (metric === 'strength') {
      s.exercises = d.exercises.filter((x) => x.name?.trim()).map((x) => ({ name: x.name.trim(), sets: x.sets.filter((st) => st.reps || st.kg).map((st) => ({ reps: st.reps || null, kg: st.kg ?? null })) }));
    }
    // Enlazar con el plan: el indicado, o el pendiente del mismo día y deporte.
    let plan = s.planId ? data.plan.get(s.planId) : null;
    if (!plan && !d.id) plan = planOn(s.date).find((p) => p.sport === s.sport && planState(p) !== 'done') || null;
    if (plan) s.planId = plan.id;
    if (!s.title && plan?.desc) s.title = plan.desc;
    await put('sessions', s);
    if (plan && plan.sessionId !== s.id) await put('plan', { ...plan, sessionId: s.id });
    draft = null;
    const shoe = s.shoeId ? data.shoes.get(s.shoeId) : null;
    const shoeMsg = shoe && shoeState(shoe) !== 'ok' ? ` · «${shoe.name}» llevan ${nf(shoeKm(shoe), 0)} km` : '';
    toast((d.id ? 'Cambios guardados' : plan ? '¡Hecha! Sesión registrada' : 'Sesión registrada') + shoeMsg);
    go('hoy');
  };
}

// ===================== ESTADÍSTICAS =====================
let progSport = 'all';
let progPeriod = 'week'; // week | month | year
let progOffset = 0;
let progExercise = '';
let histLimit = 20;
const MONTHS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

const sessionsIn = (from, to, sport = 'all') => [...data.sessions.values()].filter((s) => s.date >= from && s.date < to && (sport === 'all' || s.sport === sport));
function fmtHM(sec) {
  const m = Math.round((sec || 0) / 60), h = Math.floor(m / 60);
  return h ? `${h} h ${pad2(m % 60)} min` : `${m} min`;
}
function totals(list) {
  const t = { n: list.length, sec: 0, dist: 0, kg: 0, by: {} };
  for (const s of list) {
    const b = (t.by[s.sport] ||= { n: 0, sec: 0, dist: 0, kg: 0 });
    b.n++; b.sec += s.durationSec || 0; t.sec += s.durationSec || 0;
    if (isDistMetric(metricOf(s.sport))) { b.dist += s.distanceM || 0; t.dist += s.distanceM || 0; }
    if (metricOf(s.sport) === 'strength') { const kg = strengthTotals(s).kg; b.kg += kg; t.kg += kg; }
  }
  return t;
}
const volTxt = (k, b) => (isDistMetric(metricOf(k)) ? (distUnit(k) === 'm' ? `${nf(b.dist)} m` : `${nf(b.dist / 1000, 1)} km`) : metricOf(k) === 'strength' ? `${b.n} ses.` : fmtHM(b.sec));
function periodRange(kind, off) {
  const t = today();
  if (kind === 'week') { const from = addDays(mondayOf(t), 7 * off); return { from, to: addDays(from, 7) }; }
  const d = fromISO(t);
  if (kind === 'month') {
    const a = new Date(d.getFullYear(), d.getMonth() + off, 1), b = new Date(a.getFullYear(), a.getMonth() + 1, 1);
    return { from: iso(a), to: iso(b) };
  }
  return { from: `${d.getFullYear() + off}-01-01`, to: `${d.getFullYear() + off + 1}-01-01` };
}
function periodLabel(kind, r) {
  const a = fromISO(r.from);
  if (kind === 'week') { const e = fromISO(addDays(r.to, -1)); return `${a.getDate()} ${MONTHS[a.getMonth()]} – ${e.getDate()} ${MONTHS[e.getMonth()]}`; }
  if (kind === 'month') return cap(a.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }));
  return String(a.getFullYear());
}
// Buckets para gráficas: 12 semanas (o 12 meses en vista Año) que terminan en el periodo elegido.
function buckets(kind, r) {
  const out = [];
  if (kind === 'year') {
    const y = fromISO(r.from).getFullYear();
    for (let m = 0; m < 12; m++) out.push({ from: iso(new Date(y, m, 1)), to: iso(new Date(y, m + 1, 1)), label: MONTHS[m] });
    return out;
  }
  const lastMon = mondayOf(addDays(r.to, -1));
  for (let i = 11; i >= 0; i--) {
    const from = addDays(lastMon, -7 * i), d = fromISO(from);
    out.push({ from, to: addDays(from, 7), label: `${d.getDate()}/${d.getMonth() + 1}` });
  }
  return out;
}

// ---------- Gráficas SVG ----------
function niceMax(v) {
  if (!(v > 0)) return 1;
  const p = 10 ** Math.floor(Math.log10(v));
  return [1, 2, 2.5, 5, 10].map((k) => k * p).find((k) => k >= v);
}
const CH = { W: 340, H: 156, L: 40, R: 10, T: 12, B: 24 };
function xLabels(labels, x0, step) {
  const every = labels.length > 8 ? 3 : 1;
  return labels.map((l, i) => ((labels.length - 1 - i) % every === 0 ? `<text x="${(x0 + i * step).toFixed(1)}" y="${CH.H - 6}" text-anchor="middle">${esc(l)}</text>` : '')).join('');
}
function barChart(labels, series, fmtY, aria) {
  const n = labels.length, iw = CH.W - CH.L - CH.R, ih = CH.H - CH.T - CH.B;
  const tot = labels.map((_, i) => series.reduce((a, s) => a + (s.values[i] || 0), 0));
  const max = niceMax(Math.max(...tot));
  const step = iw / n, bw = Math.min(22, step * 0.62);
  const y = (v) => CH.T + ih - (v / max) * ih;
  let bars = '';
  labels.forEach((_, i) => {
    let acc = 0;
    const x = CH.L + i * step + (step - bw) / 2;
    for (const s of series) {
      const v = s.values[i] || 0; if (!v) continue;
      const y1 = y(acc + v), y0 = y(acc);
      bars += `<rect x="${x.toFixed(1)}" y="${y1.toFixed(1)}" width="${bw.toFixed(1)}" height="${Math.max(0.5, y0 - y1).toFixed(1)}" fill="${s.color}"><title>${esc(labels[i])} · ${esc(s.name)}: ${esc(fmtY(v))}</title></rect>`;
      acc += v;
    }
  });
  const grid = [0, max / 2, max].map((v) => `<line x1="${CH.L}" x2="${CH.W - CH.R}" y1="${y(v).toFixed(1)}" y2="${y(v).toFixed(1)}" class="g"/><text x="${CH.L - 6}" y="${(y(v) + 3).toFixed(1)}" text-anchor="end">${esc(fmtY(v))}</text>`).join('');
  return `<svg class="chart" viewBox="0 0 ${CH.W} ${CH.H}" role="img" aria-label="${esc(aria)}">${grid}${bars}${xLabels(labels, CH.L + step / 2, step)}</svg>`;
}
function lineChart(labels, values, fmtY, color, invert, aria) {
  const pts = values.map((v, i) => [i, v]).filter(([, v]) => v != null && Number.isFinite(v));
  if (pts.length < 2) return '<p class="hint">Hacen falta al menos dos semanas con datos para dibujar la evolución.</p>';
  const n = labels.length, iw = CH.W - CH.L - CH.R, ih = CH.H - CH.T - CH.B;
  let lo = Math.min(...pts.map((p) => p[1])), hi = Math.max(...pts.map((p) => p[1]));
  const pad = Math.max((hi - lo) * 0.15, hi * 0.02 || 1); lo -= pad; hi += pad;
  const step = iw / n;
  const x = (i) => CH.L + i * step + step / 2;
  const y = (v) => (invert ? CH.T + ((v - lo) / (hi - lo)) * ih : CH.T + ih - ((v - lo) / (hi - lo)) * ih);
  const grid = [lo, (lo + hi) / 2, hi].map((v) => `<line x1="${CH.L}" x2="${CH.W - CH.R}" y1="${y(v).toFixed(1)}" y2="${y(v).toFixed(1)}" class="g"/><text x="${CH.L - 6}" y="${(y(v) + 3).toFixed(1)}" text-anchor="end">${esc(fmtY(v))}</text>`).join('');
  const line = pts.map(([i, v]) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  const base = CH.T + ih;
  const area = `${x(pts[0][0]).toFixed(1)},${base} ${line} ${x(pts[pts.length - 1][0]).toFixed(1)},${base}`;
  const dots = pts.map(([i, v], k) => `<circle cx="${x(i).toFixed(1)}" cy="${y(v).toFixed(1)}" r="${k === pts.length - 1 ? 4.5 : 2.5}" fill="${color}"><title>${esc(labels[i])}: ${esc(fmtY(v))}</title></circle>`).join('');
  return `<svg class="chart" viewBox="0 0 ${CH.W} ${CH.H}" role="img" aria-label="${esc(aria)}">${grid}<polygon points="${area}" fill="${color}" opacity=".12"/><polyline points="${line}" fill="none" stroke="${color}" stroke-width="2.2" stroke-linejoin="round"/>${dots}${xLabels(labels, x(0), step)}</svg>`;
}

// ---------- Récords ----------
function distLabel(k, m) {
  if (m === 21097.5) return 'Media maratón';
  if (m === 42195) return 'Maratón';
  return distUnit(k) === 'm' || m < 1000 ? `${nf(m)} m` : `${nf(m / 1000, 1)} km`;
}
function bestOver(list, target) {
  let best = null;
  for (const s of list) {
    if (!s.durationSec || !s.distanceM) continue;
    if (s.distanceM < target * 0.98 || s.distanceM > target * 1.03) continue;
    const t = (s.durationSec * target) / s.distanceM;
    if (!best || t < best.t) best = { t, s };
  }
  return best;
}
// Récords según cómo se mide cada deporte. Solo devuelve marcas que existen.
function recordsFor(k) {
  const S = sp(k), metric = S.metric || 'time', M = METRICS[metric] || {};
  const all = [...data.sessions.values()].filter((s) => s.sport === k);
  const r = [];
  const maxBy = (f) => all.reduce((b, s) => (f(s) > (b ? f(b) : 0) ? s : b), null);
  if (isPaceMetric(metric)) {
    for (const m of S.records || []) {
      const b = bestOver(all, m);
      if (b) r.push({ label: distLabel(k, m), value: fmtDur(b.t), sub: `${fmtPace((b.t * M.paceM) / m)} ${M.paceLbl}`, s: b.s });
    }
    const reps = {};
    for (const s of all) {
      const dm = s.reps?.distM; if (!dm) continue;
      for (const p of s.reps.paces || []) if (p && (!reps[dm] || p < reps[dm].p)) reps[dm] = { p, s };
    }
    Object.keys(reps).map(Number).sort((a, b) => a - b).slice(0, 4).forEach((dm) => r.push({ label: `Mejor serie de ${nf(dm)} m`, value: fmtDur((reps[dm].p * dm) / M.paceM), sub: `${fmtPace(reps[dm].p)} ${M.paceLbl}`, s: reps[dm].s }));
  }
  if (isDistMetric(metric)) {
    const L = maxBy((s) => s.distanceM || 0);
    if (L?.distanceM) r.push({ label: 'Sesión más larga', value: distTxt(L), s: L });
    if (metric === 'speed') {
      const fast = all.filter((s) => s.distanceM && s.durationSec >= 1800).reduce((b, s) => (!b || paceVal(s) > paceVal(b) ? s : b), null);
      if (fast) r.push({ label: 'Mejor velocidad (≥ 30 min)', value: paceOf(fast), s: fast });
    } else if (!(S.records || []).length) {
      const fast = all.filter((s) => s.distanceM && s.durationSec >= 1200).reduce((b, s) => (!b || paceVal(s) < paceVal(b) ? s : b), null);
      if (fast) r.push({ label: 'Mejor ritmo (≥ 20 min)', value: fmtPace(paceVal(fast)), sub: M.paceLbl, s: fast });
    }
  }
  if (S.elev) {
    const E = maxBy((s) => s.elevationM || 0);
    if (E?.elevationM) r.push({ label: 'Más desnivel', value: `${nf(E.elevationM)} m`, s: E });
  }
  if (metric === 'time') {
    const L = maxBy((s) => s.durationSec || 0);
    if (L?.durationSec) r.push({ label: 'Sesión más larga', value: fmtHM(L.durationSec), s: L });
    const weeks = {};
    for (const s of all) { const w = mondayOf(s.date); weeks[w] = (weeks[w] || 0) + 1; }
    const top = Object.entries(weeks).sort((a, b) => b[1] - a[1])[0];
    if (top && top[1] > 1) r.push({ label: 'Más sesiones en una semana', value: String(top[1]), sub: `semana del ${shortDate(top[0])}`, s: null, keep: true });
  }
  if (metric === 'strength') {
    const ex = {};
    for (const s of all) for (const e of s.exercises || []) {
      const name = (e.name || '').trim(); if (!name) continue;
      for (const st of e.sets || []) {
        const kg = Number(st.kg) || 0, reps = Number(st.reps) || 0; if (!kg) continue;
        const cur = (ex[name.toLowerCase()] ||= { name, kg: 0, reps: 0, e1rm: 0, s: null });
        if (kg > cur.kg || (kg === cur.kg && reps > cur.reps)) Object.assign(cur, { kg, reps, s });
        if (reps && reps <= 12) cur.e1rm = Math.max(cur.e1rm, kg * (1 + reps / 30));
      }
    }
    Object.values(ex).sort((a, b) => b.kg - a.kg).slice(0, 8).forEach((e) => r.push({ label: e.name, value: `${nf(e.kg, 1)} kg`, sub: `${e.reps ? `× ${e.reps}` : ''}${e.e1rm ? ` · 1RM ≈ ${nf(e.e1rm, 0)} kg` : ''}`, s: e.s }));
  }
  return r;
}
function recordTiles(recs, showSport) {
  if (!recs.length) return '<p class="hint">Aún no hay marcas. Aparecerán según registres sesiones.</p>';
  return `<div class="recs">${recs.map((x) => {
    const tag = x.s ? `button type="button" data-edit="${esc(x.s.id)}"` : 'div';
    const sub = [x.sub, x.s ? shortDate(x.s.date) : ''].filter(Boolean).join(' · ');
    return `<${tag} class="rec ${x.k ? 's-' + x.k : ''}">
      <span class="rec-l">${showSport && x.k ? `${ico(x.k)}` : ''}${esc(x.label)}</span><b class="num">${esc(x.value)}</b>
      ${sub ? `<span class="rec-s">${esc(sub)}</span>` : ''}</${x.s ? 'button' : 'div'}>`;
  }).join('')}</div>`;
}

// ---------- Bloque de estadísticas en Hoy ----------
// Deportes que salen en resúmenes: los que tienen sesiones en el rango, o los activos.
function sportsWithData(list) {
  const used = new Set(list.map((s) => s.sport));
  const keys = [...SPORT_KEYS.filter((k) => used.has(k)), ...[...used].filter((k) => !SPORT_KEYS.includes(k))];
  return keys;
}
function homeStats(t) {
  if (!data.sessions.size) return '';
  const mon = mondayOf(t);
  const curList = sessionsIn(mon, addDays(t, 1));
  const cur = totals(curList);
  const prev = totals(sessionsIn(addDays(mon, -7), addDays(t, -6)));
  const delta = prev.sec ? Math.round(((cur.sec - prev.sec) / prev.sec) * 100) : null;
  const bk = buckets('week', { from: mon, to: addDays(mon, 7) }).slice(-8);
  const recent = sessionsIn(bk[0].from, addDays(t, 1));
  const keys = sportsWithData(recent);
  const tileKeys = (keys.length ? keys : SPORT_KEYS).slice(0, 6);
  const series = keys.map((k) => ({ name: sp(k).label, color: sportColor(k), values: bk.map((b) => sessionsIn(b.from, b.to, k).reduce((a, s) => a + (s.durationSec || 0), 0) / 3600) }));
  return `<section>
    <div class="sec-head"><h2>Tus números</h2><a class="muted" href="#progreso" data-prog="all">Ver progreso</a></div>
    <div class="sum"><b class="num">${cur.n}</b> sesiones · <b class="num">${fmtHM(cur.sec)}</b> esta semana${delta != null ? ` <span class="delta ${delta >= 0 ? 'up' : 'down'}">${delta >= 0 ? '+' : ''}${delta} %</span><span class="muted"> vs. semana pasada a estas alturas</span>` : ''}</div>
    <div class="tiles">${tileKeys.map((k) => { const b = cur.by[k] || { n: 0, sec: 0, dist: 0 }; return `<button type="button" class="stile s-${k}" data-prog="${k}">
      <span class="stile-h">${ico(k)}<span>${esc(sp(k).label)}</span></span>
      <b class="num">${b.n ? esc(volTxt(k, b)) : '—'}</b>
      <span class="muted">${b.n ? `${b.n} ses. · ${fmtHM(b.sec)}` : 'Sin sesiones esta semana'}</span></button>`; }).join('')}</div>
    ${series.length ? `<div class="box"><span class="eyebrow">Horas por semana</span>${barChart(bk.map((b) => b.label), series, (v) => `${nf(v, 1)} h`, 'Horas de entrenamiento por semana y deporte')}
      <div class="legend">${keys.map((k) => `<span><i style="background:${sportColor(k)}"></i>${esc(sp(k).label)}</span>`).join('')}</div></div>` : ''}
  </section>`;
}

// ---------- Pestaña Progreso ----------
function viewProgress(app, banner) {
  const ps = progSport;
  const r = periodRange(progPeriod, progOffset);
  const list = sessionsIn(r.from, r.to, ps);
  const tot = totals(list);
  const bk = buckets(progPeriod, r);
  const labels = bk.map((b) => b.label);
  const perBucket = (k) => bk.map((b) => sessionsIn(b.from, b.to, k));
  const unitName = progPeriod === 'year' ? 'mes' : 'semana';
  const metric = ps === 'all' ? null : metricOf(ps);
  const M = metric ? METRICS[metric] || {} : {};
  const chipKeys = [...new Set([...SPORT_KEYS, ...sportsWithData([...data.sessions.values()])])];

  let third;
  if (ps === 'all') {
    const nSports = sportsWithData(list).length;
    third = `<div class="stat"><b>${nSports}</b><span>deporte${nSports === 1 ? '' : 's'}</span></div>`;
  } else if (metric === 'strength') third = `<div class="stat"><b>${nf(tot.kg / 1000, 1)} t</b><span>peso movido</span></div>`;
  else if (isDistMetric(metric)) third = `<div class="stat"><b>${M.unit === 'm' ? nf(tot.dist) : nf(tot.dist / 1000, 1)}</b><span>${M.unit === 'm' ? 'metros' : 'km'}</span></div>`;
  else { const rp = list.filter((s) => s.rpe); third = `<div class="stat"><b>${rp.length ? nf(rp.reduce((a, s) => a + s.rpe, 0) / rp.length, 1) : '—'}</b><span>RPE medio</span></div>`; }

  let charts = '';
  if (ps === 'all') {
    const keys = sportsWithData(list);
    const keysChart = sportsWithData(sessionsIn(bk[0].from, bk[bk.length - 1].to));
    const maxH = Math.max(1, ...keys.map((k) => tot.by[k].sec));
    const series = keysChart.map((k) => ({ name: sp(k).label, color: sportColor(k), values: perBucket(k).map((ss) => ss.reduce((a, s) => a + (s.durationSec || 0), 0) / 3600) }));
    charts = `<section><h2>Tiempo por deporte</h2>${keys.length ? `<div class="box vol">${keys.map((k) => {
        const b = tot.by[k];
        return `<button type="button" class="volrow s-${k}" data-prog="${k}"><span class="vl">${ico(k)}<span>${esc(sp(k).label)}</span></span><span class="vb"><i style="width:${Math.max(3, Math.round((b.sec / maxH) * 100))}%"></i></span><span class="vv num"><b>${esc(fmtHM(b.sec))}</b><small>${b.n} ses.${isDistMetric(metricOf(k)) && b.dist ? ' · ' + esc(volTxt(k, b)) : ''}</small></span></button>`;
      }).join('')}</div>` : '<p class="hint">Sin sesiones en este periodo.</p>'}</section>
      <section><h2>Horas por ${unitName}</h2><div class="box">${barChart(labels, series, (v) => `${nf(v, 1)} h`, 'Horas por periodo y deporte')}
      <div class="legend">${keysChart.map((k) => `<span><i style="background:${sportColor(k)}"></i>${esc(sp(k).label)}</span>`).join('')}</div></div></section>`;
  } else if (metric === 'strength') {
    const names = {};
    for (const s of data.sessions.values()) if (s.sport === ps) for (const e of s.exercises || []) { const k = (e.name || '').trim(); if (k) names[k] = (names[k] || 0) + 1; }
    const top = Object.entries(names).sort((a, b) => b[1] - a[1]).map(([n]) => n).slice(0, 10);
    if (!top.includes(progExercise)) progExercise = top[0] || '';
    const hist = sessionsDesc().filter((s) => s.sport === ps).reverse()
      .map((s) => { const e = (s.exercises || []).find((x) => (x.name || '').trim().toLowerCase() === progExercise.toLowerCase()); const kg = e ? Math.max(0, ...(e.sets || []).map((st) => Number(st.kg) || 0)) : 0; return kg ? { d: s.date, kg } : null; })
      .filter(Boolean).slice(-12);
    const vol = perBucket(ps).map((ss) => ss.reduce((a, s) => a + strengthTotals(s).kg, 0) / 1000);
    charts = `<section><h2>Peso por ejercicio</h2>
      ${top.length ? `<div class="filters chips">${top.map((n) => `<button type="button" data-ex="${esc(n)}" aria-pressed="${n === progExercise}">${esc(n)}</button>`).join('')}</div>
      <div class="box"><span class="eyebrow">${esc(progExercise)} · peso máximo por sesión</span>${lineChart(hist.map((h) => `${fromISO(h.d).getDate()}/${fromISO(h.d).getMonth() + 1}`), hist.map((h) => h.kg), (v) => `${nf(v, 0)} kg`, sportColor(ps), false, `Evolución del peso en ${progExercise}`)}</div>` : '<p class="hint">Registra sesiones con ejercicios para ver su evolución.</p>'}</section>
      <section><h2>Volumen por ${unitName}</h2><div class="box">${barChart(labels, [{ name: sp(ps).label, color: sportColor(ps), values: vol }], (v) => `${nf(v, 1)} t`, 'Toneladas movidas por periodo')}</div></section>`;
  } else if (isDistMetric(metric)) {
    const ss = perBucket(ps);
    const distV = ss.map((x) => x.reduce((a, s) => a + (s.distanceM || 0), 0) / (M.unit === 'm' ? 1 : 1000));
    const paceV = ss.map((x) => {
      const ok = x.filter((s) => s.distanceM && s.durationSec);
      const d = ok.reduce((a, s) => a + s.distanceM, 0), t = ok.reduce((a, s) => a + s.durationSec, 0);
      if (!d || !t) return null;
      return M.paceM ? t / (d / M.paceM) : (d / 1000) / (t / 3600);
    });
    const paceName = M.paceM ? `Ritmo medio (min${M.paceLbl})` : 'Velocidad media (km/h)';
    const fmtP = M.paceM ? (v) => fmtPace(v) : (v) => nf(v, 1);
    charts = `<section><h2>${M.unit === 'm' ? 'Metros' : 'Kilómetros'} por ${unitName}</h2><div class="box">${barChart(labels, [{ name: sp(ps).label, color: sportColor(ps), values: distV }], (v) => nf(v, 0), `Distancia por periodo en ${sp(ps).label}`)}</div></section>
      <section><h2>${paceName}</h2><div class="box">${lineChart(labels, paceV, fmtP, sportColor(ps), !!M.paceM, paceName)}
      <p class="hint">${M.paceM ? 'Más arriba es más rápido: el eje va al revés porque menos minutos es mejor.' : 'Más arriba es más rápido.'} Media ponderada por distancia.</p></div></section>`;
  } else {
    const ss = perBucket(ps);
    const hours = ss.map((x) => x.reduce((a, s) => a + (s.durationSec || 0), 0) / 3600);
    const rpe = ss.map((x) => { const v = x.filter((s) => s.rpe); return v.length ? v.reduce((a, s) => a + s.rpe, 0) / v.length : null; });
    charts = `<section><h2>Horas por ${unitName}</h2><div class="box">${barChart(labels, [{ name: sp(ps).label, color: sportColor(ps), values: hours }], (v) => `${nf(v, 1)} h`, `Horas por periodo en ${sp(ps).label}`)}</div></section>
      <section><h2>Intensidad media (RPE)</h2><div class="box">${lineChart(labels, rpe, (v) => nf(v, 1), sportColor(ps), false, 'RPE medio por periodo')}</div></section>`;
  }

  let recs;
  if (ps === 'all') {
    const pick = [];
    for (const k of sportsWithData([...data.sessions.values()])) pick.push(...recordsFor(k).filter((x) => x.s).slice(0, 2).map((x) => ({ ...x, k })));
    recs = recordTiles(pick.slice(0, 8), true);
  } else recs = recordTiles(recordsFor(ps));

  // Historial
  const hist = sessionsDesc().filter((s) => ps === 'all' || s.sport === ps);
  const shown = hist.slice(0, histLimit);
  const groups = new Map();
  for (const s of shown) { const k = mondayOf(s.date); if (!groups.has(k)) groups.set(k, []); groups.get(k).push(s); }

  app.innerHTML = `${banner}<h1>Progreso</h1>
    <div class="filters chips"><button type="button" data-ps="all" aria-pressed="${ps === 'all'}">Todo</button>${chipKeys.map((k) => `<button type="button" data-ps="${k}" aria-pressed="${ps === k}">${esc(sp(k).label)}</button>`).join('')}</div>
    ${!data.sessions.size ? '<div class="empty"><h2>Aún no hay datos</h2><p class="muted" style="margin:0">Cuando registres sesiones verás aquí tu volumen, la evolución de tus ritmos y pesos, y tus récords.</p><a class="btn primary" href="#registrar" data-new>Registrar sesión</a></div>' : `
    <div class="seg pseg">${[['week', 'Semana'], ['month', 'Mes'], ['year', 'Año']].map(([k, l]) => `<button type="button" data-pp="${k}" aria-pressed="${progPeriod === k}">${l}</button>`).join('')}</div>
    <div class="weeknav">
      <button class="btn" data-po="-1" aria-label="Periodo anterior">${ICO_L}</button>
      <div class="mid"><div class="eyebrow">${progOffset === 0 ? (progPeriod === 'week' ? 'Esta semana' : progPeriod === 'month' ? 'Este mes' : 'Este año') : 'Periodo'}</div><h2 class="num">${esc(periodLabel(progPeriod, r))}</h2></div>
      <button class="btn" data-po="1" aria-label="Periodo siguiente" ${progOffset >= 0 ? 'disabled' : ''}>${ICO_R}</button>
    </div>
    <div class="stats3"><div class="stat"><b>${tot.n}</b><span>sesiones</span></div><div class="stat"><b>${Math.floor(Math.round(tot.sec / 60) / 60)}:${pad2(Math.round(tot.sec / 60) % 60)}</b><span>horas</span></div>${third}</div>
    ${charts}
    <section><h2>Récords personales</h2>${recs}</section>
    <section><div class="sec-head"><h2>Historial</h2><span class="muted num">${hist.length} sesiones</span></div>
      ${[...groups].map(([mon, ss]) => `<div class="sec-head"><span class="eyebrow">Semana del ${esc(shortDate(mon))}</span><span class="muted num">${ss.length} · ${esc(fmtHM(ss.reduce((a, s) => a + (s.durationSec || 0), 0)))}</span></div><div class="list">${ss.map(sessionRow).join('')}</div>`).join('')}
      ${hist.length > histLimit ? '<button class="btn block" id="more-hist">Ver más sesiones</button>' : ''}
    </section>`}`;
  bindCommon(app);
  $$('[data-ps]', app).forEach((b) => (b.onclick = () => { progSport = b.dataset.ps; histLimit = 20; render(); }));
  $$('[data-pp]', app).forEach((b) => (b.onclick = () => { progPeriod = b.dataset.pp; progOffset = 0; render(); }));
  $$('[data-po]', app).forEach((b) => (b.onclick = () => { progOffset = Math.min(0, progOffset + Number(b.dataset.po)); render(); }));
  $$('[data-ex]', app).forEach((b) => (b.onclick = () => { progExercise = b.dataset.ex; render(); }));
  $('#more-hist', app)?.addEventListener('click', () => { histLimit += 30; render(); });
}

// ===================== DATOS =====================
const CSV_S = ['id', 'fecha', 'deporte', 'tipo', 'titulo', 'duracion_seg', 'distancia_m', 'desnivel_m', 'rpe', 'sensaciones', 'notas', 'plan_id', 'detalle_json'];
const CSV_P = ['id', 'fecha', 'deporte', 'tipo', 'descripcion', 'sesion_id'];
const csvCell = (v) => { const s = String(v ?? ''); return /[",\n;]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; };
function toCSV(header, rows) { return '﻿' + [header.join(','), ...rows.map((r) => r.map(csvCell).join(','))].join('\n'); }
function parseCSV(text) {
  text = text.replace(/^﻿/, '');
  const rows = []; let row = [], cell = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (q) { if (ch === '"') { if (text[i + 1] === '"') { cell += '"'; i++; } else q = false; } else cell += ch; }
    else if (ch === '"') q = true;
    else if (ch === ',') { row.push(cell); cell = ''; }
    else if (ch === '\n' || ch === '\r') { if (ch === '\r' && text[i + 1] === '\n') i++; row.push(cell); rows.push(row); row = []; cell = ''; }
    else cell += ch;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  return rows.filter((r) => r.some((c) => c !== ''));
}
function sessionsCSV() {
  return toCSV(CSV_S, sessionsDesc().map((s) => {
    const { id, date, sport, type, title, durationSec, distanceM, elevationM, rpe, feel, notes, planId, ...rest } = s;
    return [id, date, sport, type, title, durationSec, distanceM, elevationM, rpe, feel, notes, planId, JSON.stringify(rest)];
  }));
}
function planCSV() {
  return toCSV(CSV_P, [...data.plan.values()].sort((a, b) => a.date.localeCompare(b.date)).map((p) => [p.id, p.date, p.sport, p.type, p.desc, p.sessionId]));
}
function fullJSON() {
  return JSON.stringify({ app: 'cuaderno-deporte', version: 2, exportedAt: new Date().toISOString(), settings,
    sessions: [...data.sessions.values()], plan: [...data.plan.values()], days: [...data.days.values()], races: [...data.races.values()], shoes: [...data.shoes.values()] }, null, 2);
}
const validKey = (k) => typeof k === 'string' && /^[A-Za-z0-9_-]{1,40}$/.test(k);
function cleanSession(s) {
  if (!s || !isISO(s.date) || !validKey(s.sport)) return null;
  return { ...s, id: typeof s.id === 'string' && /^[\w.~:@+-]+$/.test(s.id) ? s.id : uid() };
}
function cleanPlan(p) {
  if (!p || !isISO(p.date) || !validKey(p.sport)) return null;
  return { id: typeof p.id === 'string' && /^[\w.~:@+-]+$/.test(p.id) ? p.id : uid(), date: p.date, sport: p.sport, type: p.type || '', desc: p.desc || '', order: Number(p.order) || Date.now(), sessionId: p.sessionId || null };
}
async function importText(name, text) {
  let sessions = [], plan = [], days = [], races = [], shoes = [];
  if (/\.json$/i.test(name) || /^\s*[{[]/.test(text)) {
    const j = JSON.parse(text);
    sessions = (j.sessions || []).map(cleanSession).filter(Boolean);
    plan = (j.plan || []).map(cleanPlan).filter(Boolean);
    races = (Array.isArray(j.races) ? j.races : []).map(cleanRace).filter(Boolean);
    shoes = (Array.isArray(j.shoes) ? j.shoes : []).map(cleanShoe).filter(Boolean);
    days = (j.days || []).filter((x) => isISO(x?.id) && ['work', 'off'].includes(x.status)).map((x) => ({ id: x.id, status: x.status }));
    for (const def of j.settings?.sports || []) if (validKey(def?.key) && !settings.sports.some((x) => x.key === def.key)) settings.sports.push(cleanSportDef(def));
    if (j.settings?.goalDays) settings.goalDays = Math.min(7, Math.max(1, Number(j.settings.goalDays) || 6));
  } else {
    const rows = parseCSV(text);
    const head = rows.shift() || [];
    const ix = (k) => head.indexOf(k);
    if (head.includes('detalle_json') || head.includes('duracion_seg')) {
      sessions = rows.map((r) => {
        let extra = {};
        try { extra = JSON.parse(r[ix('detalle_json')] || '{}'); } catch { /* ignorar */ }
        const nOr = (k) => (r[ix(k)] === '' || r[ix(k)] == null ? null : Number(r[ix(k)]));
        return cleanSession({ ...extra, id: r[ix('id')], date: r[ix('fecha')], sport: r[ix('deporte')], type: r[ix('tipo')] || '', title: r[ix('titulo')] || '',
          durationSec: nOr('duracion_seg'), distanceM: nOr('distancia_m'), elevationM: nOr('desnivel_m'), rpe: nOr('rpe'), feel: nOr('sensaciones'), notes: r[ix('notas')] || '', planId: r[ix('plan_id')] || null });
      }).filter(Boolean);
    } else if (head.includes('descripcion')) {
      plan = rows.map((r) => cleanPlan({ id: r[ix('id')], date: r[ix('fecha')], sport: r[ix('deporte')], type: r[ix('tipo')], desc: r[ix('descripcion')], sessionId: r[ix('sesion_id')] || null })).filter(Boolean);
    } else throw new Error('formato');
  }
  const total = sessions.length + plan.length + days.length + races.length + shoes.length;
  if (!total) throw new Error('vacío');
  for (const x of [...sessions, ...plan]) ensureSport(x.sport);
  saveSettings();
  toast(`Importando ${total} registros…`);
  const errs = await pool([...sessions.map((s) => () => put('sessions', s)), ...plan.map((p) => () => put('plan', p)), ...days.map((x) => () => put('days', x)), ...races.map((r) => () => put('races', r)), ...shoes.map((x) => () => put('shoes', x))]);
  toast(errs ? `Importado con ${errs} errores` : `Importados ${sessions.length} sesiones, ${plan.length} del plan, ${races.length} carreras y ${shoes.length} zapatillas`);
  render();
}

// ===================== CARRERAS =====================
const ICO_FLAG = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 21V4M5 4h11l-2 4 2 4H5"/></svg>';
const daysUntil = (d) => Math.round((fromISO(d) - fromISO(today())) / 86400000);
const upcomingRaces = () => [...data.races.values()].filter((r) => r.date >= today()).sort((a, b) => a.date.localeCompare(b.date));
const pastRaces = () => [...data.races.values()].filter((r) => r.date < today()).sort((a, b) => b.date.localeCompare(a.date));
const racesOn = (d) => [...data.races.values()].filter((r) => r.date === d);
function countdownTxt(n) {
  if (n === 0) return '¡Es hoy!';
  if (n === 1) return 'Mañana';
  return `Faltan ${n} días`;
}
function raceDist(r) {
  if (!r.distanceM) return '';
  return r.sport && distUnit(r.sport) === 'm' ? `${nf(r.distanceM)} m` : `${nf(r.distanceM / 1000, 2)} km`;
}
// Ritmo o velocidad necesarios para la marca objetivo.
function racePace(r, sec = r.targetSec) {
  if (!r.distanceM || !sec || !r.sport) return ''; // en carreras de varios deportes no tiene sentido
  const metric = metricOf(r.sport);
  const M = METRICS[metric] || {};
  if (M.paceM) return `${fmtPace(sec / (r.distanceM / M.paceM))} ${M.paceLbl}`;
  if (metric === 'speed') return `${nf((r.distanceM / 1000) / (sec / 3600), 1)} km/h`;
  return '';
}
function raceMeta(r) {
  return [raceDist(r), r.targetSec ? `objetivo ${fmtDur(r.targetSec)}` : '', racePace(r) ? `a ${racePace(r)}` : ''].filter(Boolean).join(' · ');
}
// Tarjeta de cuenta atrás de la próxima carrera (pantalla Hoy).
function raceCountdown() {
  const r = upcomingRaces()[0];
  if (!r) return '';
  const n = daysUntil(r.date);
  const more = upcomingRaces().length - 1;
  return `<section>
    <div class="sec-head"><h2>Próxima carrera</h2><a class="muted" href="#carreras">${more > 0 ? `Ver las ${more + 1}` : 'Carreras'}</a></div>
    <a class="race-card ${r.sport ? 's-' + esc(r.sport) : ''} ${n === 0 ? 'is-today' : ''}" href="#carreras">
      <span class="race-count"><b class="num">${n === 0 ? '¡Hoy!' : n}</b>${n === 0 ? '' : `<span>${n === 1 ? 'día' : 'días'}</span>`}</span>
      <span class="race-info"><span class="race-name">${esc(r.name)}</span>
        <span class="race-sub">${esc(longDate(r.date))}${n >= 14 ? ` · ${Math.floor(n / 7)} semanas` : ''}</span>
        ${raceMeta(r) ? `<span class="race-sub num">${esc(raceMeta(r))}</span>` : ''}</span>
    </a>
  </section>`;
}
function raceCard(r) {
  const n = daysUntil(r.date);
  const past = n < 0;
  return `<button type="button" class="race-row ${r.sport ? 's-' + esc(r.sport) : ''}" data-race="${esc(r.id)}">
    <span class="race-flag">${r.sport ? ico(r.sport) : ICO_FLAG}</span>
    <span class="item-main"><span class="item-title">${esc(r.name)}</span>
      <span class="item-sub">${esc(shortDate(r.date))}${raceMeta(r) ? ' · ' + esc(raceMeta(r)) : ''}</span>
      ${past && r.resultSec ? `<span class="item-sub">Resultado: <b class="num">${esc(fmtDur(r.resultSec))}</b>${r.targetSec ? (r.resultSec <= r.targetSec ? ' · objetivo cumplido' : ` · ${fmtDur(r.resultSec - r.targetSec)} sobre el objetivo`) : ''}</span>` : ''}</span>
    ${past ? (r.resultSec ? '' : '<span class="badge pending">Sin resultado</span>') : `<span class="badge countdown num">${n === 0 ? 'Hoy' : n === 1 ? 'Mañana' : `${n} días`}</span>`}
  </button>`;
}
function viewRaces(app, banner) {
  const up = upcomingRaces(), past = pastRaces();
  app.innerHTML = `${banner}
    <div class="top"><div><div class="eyebrow">Objetivos</div><h1>Carreras</h1></div></div>
    <button class="btn primary block" id="add-race">+ Añadir carrera</button>
    <section><h2>Próximas</h2>${up.length ? `<div class="list">${up.map(raceCard).join('')}</div>` : '<div class="empty"><p class="muted" style="margin:0">No tienes carreras apuntadas. Añade la próxima y verás la cuenta atrás en la pantalla Hoy.</p></div>'}</section>
    ${past.length ? `<section><h2>Pasadas</h2><div class="list">${past.map(raceCard).join('')}</div></section>` : ''}`;
  $('#add-race', app).onclick = () => raceEditor(null);
  $$('[data-race]', app).forEach((b) => (b.onclick = () => raceEditor(data.races.get(b.dataset.race))));
}
function raceEditor(r) {
  const isNew = !r;
  const f = r ? clone(r) : { id: uid(), name: '', date: addDays(today(), 28), sport: SPORT_KEYS.find((k) => isDistMetric(metricOf(k))) || '', distanceM: null, targetSec: null, resultSec: null, notes: '' };
  const raceSports = [...new Set([...SPORT_KEYS, ...(f.sport ? [f.sport] : [])])];
  const chipsFor = (k) => (!k || distUnit(k) === 'km' ? [5, 10, 21.0975, 42.195] : [750, 1500, 1900, 3800]);
  const draw = (el) => {
    const unitM = f.sport && distUnit(f.sport) === 'm';
    const distVal = f.distanceM ? (unitM ? f.distanceM : +(f.distanceM / 1000).toFixed(3)) : '';
    const isPast = f.date && f.date <= today();
    el.innerHTML = `<div class="sheet-grip"></div><h2>${isNew ? 'Nueva carrera' : 'Editar carrera'}</h2>
      <div class="field"><label for="re-name">Nombre</label><input id="re-name" type="text" maxlength="80" value="${esc(f.name)}" placeholder="p. ej. Media maratón de Valencia" autocomplete="off"></div>
      <div class="field"><label for="re-date">Fecha</label><input id="re-date" type="date" value="${esc(f.date)}"></div>
      <div class="field"><span class="lbl">Deporte</span><div class="chips">${raceSports.map((k) => `<button type="button" data-rs="${esc(k)}" aria-pressed="${f.sport === k}">${esc(sp(k).label)}</button>`).join('')}<button type="button" data-rs="" aria-pressed="${!f.sport}">Varios (triatlón…)</button></div></div>
      <div class="field"><label for="re-dist">Distancia (${unitM ? 'm' : 'km'})</label><input id="re-dist" inputmode="decimal" value="${esc(distVal)}" placeholder="0" autocomplete="off">
        <div class="chips">${chipsFor(f.sport).map((v) => `<button type="button" data-rdist="${v}">${v === 21.0975 ? 'Media' : v === 42.195 ? 'Maratón' : nf(v, 1) + (unitM ? ' m' : ' km')}</button>`).join('')}</div></div>
      <div class="field"><label for="re-target">Marca objetivo</label><input id="re-target" inputmode="numeric" value="${esc(fmtDur(f.targetSec))}" placeholder="1:39:00" autocomplete="off"><span class="hint" id="re-pace">${racePace(f) ? `Ritmo necesario: ${esc(racePace(f))}` : 'Escribe 13900 para 1:39:00'}</span></div>
      ${isPast ? `<div class="field"><label for="re-result">Resultado</label><input id="re-result" inputmode="numeric" value="${esc(fmtDur(f.resultSec))}" placeholder="Tu tiempo final" autocomplete="off"></div>` : ''}
      <div class="field"><label for="re-notes">Notas</label><textarea id="re-notes" placeholder="Dorsal, recogida, logística…">${esc(f.notes)}</textarea></div>
      <button class="btn primary block" id="re-save">${isNew ? 'Añadir carrera' : 'Guardar'}</button>
      ${isNew ? '' : '<button class="btn danger block" id="re-del">Eliminar carrera</button>'}`;
    const keep = () => {
      f.name = $('#re-name', el).value; f.date = $('#re-date', el).value; f.notes = $('#re-notes', el).value;
      const v = num($('#re-dist', el).value); f.distanceM = v == null ? null : unitM ? Math.round(v) : Math.round(v * 1000);
      f.targetSec = parseDuration($('#re-target', el).value);
      if ($('#re-result', el)) f.resultSec = parseDuration($('#re-result', el).value);
    };
    $$('[data-rs]', el).forEach((b) => (b.onclick = () => { keep(); const wasM = unitM; f.sport = b.dataset.rs; if (wasM !== (f.sport && distUnit(f.sport) === 'm')) f.distanceM = null; draw(el); }));
    $$('[data-rdist]', el).forEach((b) => (b.onclick = () => { keep(); const v = Number(b.dataset.rdist); f.distanceM = unitM ? v : Math.round(v * 1000); draw(el); }));
    $('#re-date', el).addEventListener('change', () => { keep(); draw(el); });
    const paceHint = () => { keep(); $('#re-pace', el).textContent = racePace(f) ? `Ritmo necesario: ${racePace(f)}` : 'Escribe 13900 para 1:39:00'; };
    $('#re-target', el).addEventListener('input', paceHint);
    $('#re-dist', el).addEventListener('input', paceHint);
    $('#re-target', el).addEventListener('blur', () => { if (f.targetSec) $('#re-target', el).value = fmtDur(f.targetSec); });
    $('#re-save', el).onclick = async () => {
      keep();
      if (!f.name.trim()) { toast('Ponle nombre a la carrera'); return; }
      if (!isISO(f.date)) { toast('Elige la fecha'); return; }
      await put('races', cleanRace(f));
      closeSheet(); toast(isNew ? 'Carrera añadida' : 'Carrera guardada'); render();
    };
    const delBtn = $('#re-del', el);
    if (delBtn) delBtn.onclick = async () => {
      if (!delBtn.dataset.sure) { delBtn.dataset.sure = '1'; delBtn.textContent = 'Toca otra vez para eliminar'; return; }
      await del('races', f.id); closeSheet(); toast('Carrera eliminada'); render();
    };
  };
  openSheet('', draw);
}
function cleanRace(r) {
  if (!r || !isISO(r.date) || !String(r.name || '').trim()) return null;
  const n = (v) => (Number(v) > 0 ? Math.round(Number(v)) : null);
  return { id: typeof r.id === 'string' && /^[\w.~:@+-]+$/.test(r.id) ? r.id : uid(), name: String(r.name).trim().slice(0, 80), date: r.date,
    sport: validKey(r.sport) ? r.sport : '', distanceM: n(r.distanceM), targetSec: n(r.targetSec), resultSec: n(r.resultSec), notes: String(r.notes || '').slice(0, 1000) };
}

// ===================== ZAPATILLAS =====================
const ICO_SHOE = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 16v-5l4-1 3 3h3l7 2a2 2 0 011 2v1H3z"/><path d="M3 19h18M8 13l1-2M11 13l1-2"/></svg>';
const SHOE_WARN_BEFORE = 100; // aviso a falta de 100 km del límite (600 de 700)
const shoeSessions = (id) => [...data.sessions.values()].filter((s) => s.shoeId === id);
const shoeKm = (sh) => (Number(sh.startKm) || 0) + shoeSessions(sh.id).reduce((a, s) => a + (s.distanceM || 0), 0) / 1000;
const shoeLimit = (sh) => Number(sh.limitKm) || 700;
function shoeState(sh) {
  const km = shoeKm(sh), lim = shoeLimit(sh);
  return km >= lim ? 'over' : km >= lim - SHOE_WARN_BEFORE ? 'near' : 'ok';
}
const shoesFor = (sport) => [...data.shoes.values()].filter((sh) => !sh.retired && (sh.sports || ['run']).includes(sport)).sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
// Zapatilla por defecto: la última usada en ese deporte (si sigue activa) o la única que haya.
function defaultShoe(sport) {
  const opts = shoesFor(sport);
  if (!opts.length) return null;
  const last = sessionsDesc().find((s) => s.sport === sport && s.shoeId && opts.some((o) => o.id === s.shoeId));
  if (last) return last.shoeId;
  return opts.length === 1 ? opts[0].id : null;
}
function shoeWarnings() {
  return [...data.shoes.values()].filter((sh) => !sh.retired && shoeState(sh) !== 'ok').map((sh) => {
    const km = Math.round(shoeKm(sh)), lim = shoeLimit(sh);
    return shoeState(sh) === 'over'
      ? `<a class="note bad" href="#zapatillas">Tus zapatillas «${esc(sh.name)}» llevan ${nf(km)} km y ya han pasado los ${nf(lim)}. Es buen momento para cambiarlas.</a>`
      : `<a class="note warn" href="#zapatillas">Tus zapatillas «${esc(sh.name)}» llevan ${nf(km)} km de ${nf(lim)}. Ve pensando en cambiarlas.</a>`;
  }).join('');
}
function shoeCard(sh) {
  const km = shoeKm(sh), lim = shoeLimit(sh), st = shoeState(sh);
  const n = shoeSessions(sh.id).length;
  const last = sessionsDesc().find((s) => s.shoeId === sh.id);
  return `<button type="button" class="shoe ${sh.retired ? 'is-retired' : ''}" data-shoe="${esc(sh.id)}">
    <span class="shoe-head"><span class="item-title">${esc(sh.name)}</span><span class="num shoe-km ${st}">${nf(km, 0)} / ${nf(lim)} km</span></span>
    <span class="meter-bar shoe-bar ${st}"><i style="width:${Math.min(100, Math.round((km / lim) * 100))}%"></i></span>
    <span class="item-sub">${esc((sh.sports || ['run']).map((k) => sp(k).label).join(', '))} · ${n} sesi${n === 1 ? 'ón' : 'ones'}${last ? ` · última: ${esc(shortDate(last.date))}` : ''}${sh.retired ? ' · retiradas' : st === 'over' ? ' · toca cambiarlas' : st === 'near' ? ` · quedan ${nf(Math.max(0, lim - km))} km` : ''}</span>
  </button>`;
}
function viewShoes(app, banner) {
  const all = [...data.shoes.values()].sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
  const active = all.filter((sh) => !sh.retired), retired = all.filter((sh) => sh.retired);
  app.innerHTML = `${banner}
    <div class="top"><div><div class="eyebrow">Material</div><h1>Zapatillas</h1></div></div>
    <p class="hint" style="margin:0">Elige las zapatillas al registrar una carrera y la app suma sus kilómetros. Te avisa a partir de ${nf(700 - SHOE_WARN_BEFORE)} km y al llegar a 700 (o al límite que pongas).</p>
    <button class="btn primary block" id="add-shoe">+ Añadir zapatillas</button>
    <section><h2>En uso</h2>${active.length ? `<div class="shoes">${active.map(shoeCard).join('')}</div>` : '<div class="empty"><p class="muted" style="margin:0">No tienes zapatillas dadas de alta.</p></div>'}</section>
    ${retired.length ? `<section><h2>Retiradas</h2><div class="shoes">${retired.map(shoeCard).join('')}</div></section>` : ''}`;
  $('#add-shoe', app).onclick = () => shoeEditor(null);
  $$('[data-shoe]', app).forEach((b) => (b.onclick = () => shoeEditor(data.shoes.get(b.dataset.shoe))));
}
function shoeEditor(sh) {
  const isNew = !sh;
  const f = sh ? clone(sh) : { id: uid(), name: '', sports: [SPORT_KEYS.includes('run') ? 'run' : SPORT_KEYS.find((k) => isDistMetric(metricOf(k))) || 'run'], startKm: 0, limitKm: 700, retired: false, createdAt: Date.now() };
  const used = isNew ? 0 : shoeSessions(f.id).length;
  const distSports = [...new Set([...SPORT_KEYS.filter((k) => isDistMetric(metricOf(k))), ...(f.sports || [])])];
  const draw = (el) => {
    el.innerHTML = `<div class="sheet-grip"></div><h2>${isNew ? 'Nuevas zapatillas' : 'Editar zapatillas'}</h2>
      <div class="field"><label for="sh-name">Nombre</label><input id="sh-name" type="text" maxlength="60" value="${esc(f.name)}" placeholder="p. ej. Pegasus 41 rojas" autocomplete="off"></div>
      <div class="field"><span class="lbl">Para qué deportes</span><div class="chips">${distSports.map((k) => `<button type="button" data-shs="${esc(k)}" aria-pressed="${(f.sports || []).includes(k)}">${esc(sp(k).label)}</button>`).join('')}</div></div>
      <div class="grid2">
        <div class="field"><label for="sh-start">Km que ya tenían</label><input id="sh-start" inputmode="decimal" value="${esc(f.startKm || '')}" placeholder="0" autocomplete="off"></div>
        <div class="field"><label for="sh-limit">Avisar al llegar a (km)</label><input id="sh-limit" inputmode="numeric" value="${esc(f.limitKm || 700)}" autocomplete="off"></div>
      </div>
      ${isNew ? '' : `<p class="hint" style="margin:0">Llevan ${nf(shoeKm(f), 0)} km en ${used} sesi${used === 1 ? 'ón' : 'ones'} registradas con ellas.</p>
        <button type="button" class="toggle" id="sh-ret" aria-pressed="${!!f.retired}">${f.retired ? ICO_CHECK : ''}Retiradas (ya no las uso)</button>`}
      <button class="btn primary block" id="sh-save">${isNew ? 'Añadir zapatillas' : 'Guardar'}</button>
      ${!isNew && !used ? '<button class="btn danger block" id="sh-del">Eliminar</button>' : ''}`;
    const keep = () => { f.name = $('#sh-name', el).value; f.startKm = num($('#sh-start', el).value) || 0; f.limitKm = num($('#sh-limit', el).value) || 700; };
    $$('[data-shs]', el).forEach((b) => (b.onclick = () => { keep(); const k = b.dataset.shs; f.sports = (f.sports || []).includes(k) ? f.sports.filter((x) => x !== k) : [...(f.sports || []), k]; draw(el); }));
    $('#sh-ret', el)?.addEventListener('click', () => { keep(); f.retired = !f.retired; draw(el); });
    $('#sh-save', el).onclick = async () => {
      keep();
      if (!f.name.trim()) { toast('Ponles un nombre'); return; }
      if (!f.sports?.length) { toast('Elige al menos un deporte'); return; }
      await put('shoes', cleanShoe(f));
      closeSheet(); toast(isNew ? 'Zapatillas añadidas' : 'Zapatillas guardadas'); render();
    };
    const delBtn = $('#sh-del', el);
    if (delBtn) delBtn.onclick = async () => {
      if (!delBtn.dataset.sure) { delBtn.dataset.sure = '1'; delBtn.textContent = 'Toca otra vez para eliminar'; return; }
      await del('shoes', f.id); closeSheet(); toast('Zapatillas eliminadas'); render();
    };
  };
  openSheet('', draw);
}
function cleanShoe(sh) {
  if (!sh || !String(sh.name || '').trim()) return null;
  return { id: typeof sh.id === 'string' && /^[\w.~:@+-]+$/.test(sh.id) ? sh.id : uid(), name: String(sh.name).trim().slice(0, 60),
    sports: (Array.isArray(sh.sports) ? sh.sports : ['run']).filter(validKey).slice(0, 10), startKm: Math.max(0, Number(sh.startKm) || 0),
    limitKm: Math.max(1, Number(sh.limitKm) || 700), retired: !!sh.retired, createdAt: Number(sh.createdAt) || Date.now() };
}

// ===================== AJUSTES =====================
function cleanSportDef(d) {
  const metric = METRICS[d.metric] ? d.metric : 'time';
  const list = (v) => (Array.isArray(v) ? v : String(v || '').split(',')).map((x) => String(x).trim()).filter(Boolean).slice(0, 12);
  return {
    key: d.key, label: String(d.label || 'Deporte').slice(0, 40), icon: ICONS[d.icon] ? d.icon : 'bolt',
    color: COLORS.includes(d.color) ? d.color : 'slate', metric, types: list(d.types), gear: list(d.gear),
    elev: !!d.elev, intervals: !!d.intervals && isPaceMetric(metric),
    chips: Array.isArray(d.chips) ? d.chips.filter((x) => Number(x) > 0).slice(0, 8) : [],
    records: Array.isArray(d.records) ? d.records.filter((x) => Number(x) > 0) : [],
    ph: String(d.ph || ''), hidden: !!d.hidden,
  };
}
function daysSince(isoStr) {
  if (!isoStr) return null;
  return Math.floor((fromISO(today()) - fromISO(isoStr.slice(0, 10))) / 86400000);
}
const BACKUP_EVERY_DAYS = 7; // en iPhone, Safari puede borrar los datos de una web; mejor copias frecuentes
const hasAnyData = () => data.sessions.size + data.plan.size + data.races.size + data.shoes.size > 0;
function backupDue() {
  const ds = daysSince(settings.lastExport);
  return hasAnyData() && (ds == null || ds >= BACKUP_EVERY_DAYS);
}
function backupNote() {
  if (!backupDue()) return '';
  const ds = daysSince(settings.lastExport);
  return `<div class="note warn backup-note"><span>${ds == null ? 'Aún no has hecho ninguna copia de seguridad.' : `Tu última copia de seguridad es de hace ${ds} días.`} Tus datos solo están en este móvil y Safari puede borrarlos.</span>
    <button type="button" class="btn small" data-backup>Exportar ahora</button></div>`;
}

function viewSettings(app, banner) {
  const ds = daysSince(settings.lastExport);
  const used = new Set([...data.sessions.values()].map((s) => s.sport));
  app.innerHTML = `${banner}<h1>Ajustes</h1>
    <section><div class="sec-head"><h2>Mis deportes</h2></div>
      <p class="hint">Los deportes activos salen al registrar y planificar. Ocultar uno no borra sus sesiones.</p>
      <div class="list">${settings.sports.map((d, i) => `<div class="item s-${d.key}">
        <span class="tile">${ico(d.key)}</span>
        <span class="item-main"><span class="item-title">${esc(d.label)}${d.hidden ? ' <span class="badge pending">Oculto</span>' : ''}</span>
          <span class="item-sub">${esc(METRICS[d.metric]?.label || '')}${used.has(d.key) ? '' : ' · sin sesiones'}</span></span>
        <button class="iconbtn" data-up="${i}" aria-label="Subir" ${i === 0 ? 'disabled' : ''}>↑</button>
        <button class="btn small" data-sedit="${esc(d.key)}">Editar</button>
      </div>`).join('')}</div>
      <button class="btn primary block" id="add-sport">+ Añadir deporte</button>
    </section>
    <section><h2>Carreras y material</h2>
      <div class="list">
        <a class="item" href="#carreras"><span class="tile c-ink">${ICO_FLAG}</span><span class="item-main"><span class="item-title">Carreras</span><span class="item-sub">${upcomingRaces().length ? `${upcomingRaces().length} próxima${upcomingRaces().length === 1 ? '' : 's'} · ${esc(countdownTxt(daysUntil(upcomingRaces()[0].date)).toLowerCase())}` : 'Apunta tus próximas carreras y marcas objetivo'}</span></span>${ICO_R}</a>
        <a class="item" href="#zapatillas"><span class="tile c-ink">${ICO_SHOE}</span><span class="item-main"><span class="item-title">Zapatillas</span><span class="item-sub">${(() => { const act = [...data.shoes.values()].filter((x) => !x.retired); const warn = act.filter((x) => shoeState(x) !== 'ok').length; return act.length ? `${act.length} en uso${warn ? ` · ${warn} cerca del límite` : ''}` : 'Cuenta los km de cada par y avisa a los 700'; })()}</span></span>${ICO_R}</a>
      </div>
    </section>
    <section><h2>Objetivo semanal</h2>
      <p class="hint">Días de entreno por semana. La app te avisa si te pasas o te quedas corto.</p>
      <div class="seg goal">${[3, 4, 5, 6, 7].map((n) => `<button type="button" data-goal="${n}" aria-pressed="${settings.goalDays === n}">${n}</button>`).join('')}</div>
    </section>
    <section class="dz"><h2>Copia de seguridad</h2>
      <div class="note ${backupDue() ? 'warn' : 'okay'}">Tus datos se guardan solo en este dispositivo. ${ds == null ? 'Aún no has hecho ninguna copia.' : ds === 0 ? 'Última copia: hoy.' : `Última copia: hace ${ds} día${ds === 1 ? '' : 's'}.`} Si borras los datos del navegador, Safari los elimina o cambias de móvil, solo recuperarás lo que tengas en una copia. La app te lo recuerda cada ${BACKUP_EVERY_DAYS} días.</div>
      <div class="stats3">
        <div class="stat"><b>${data.sessions.size}</b><span>sesiones</span></div>
        <div class="stat"><b>${data.plan.size}</b><span>en el plan</span></div>
        <div class="stat"><b>${settings.sports.filter((d) => !d.hidden).length}</b><span>deportes</span></div>
      </div>
      <button class="btn primary block" data-exp="json">Exportar todo (JSON)</button>
      <div class="row"><button class="btn" data-exp="scsv">Sesiones (CSV)</button><button class="btn" data-exp="pcsv">Plan (CSV)</button></div>
      <p class="hint">Guarda el JSON en iCloud, Google Drive o envíatelo por correo. El CSV se abre en Excel o Google Sheets.</p>
      <label class="btn block" for="imp">Importar copia (JSON o CSV)</label>
      <input id="imp" type="file" accept=".json,.csv,application/json,text/csv" hidden>
      <p class="hint">Se añade a lo que ya tienes. Si un registro ya existe, se sustituye.</p>
    </section>
    <section><h2>Instalar en el móvil</h2>
      <p class="muted" style="margin:0">iPhone: abre la app en Safari, pulsa Compartir y luego «Añadir a pantalla de inicio». Android: menú ⋮ de Chrome y «Instalar app».</p>
    </section>`;
  $$('[data-sedit]', app).forEach((b) => (b.onclick = () => sportEditor(sp(b.dataset.sedit))));
  $$('[data-up]', app).forEach((b) => (b.onclick = () => {
    const i = Number(b.dataset.up); const arr = settings.sports;
    [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]]; saveSettings(); render();
  }));
  $('#add-sport', app).onclick = addSportSheet;
  $$('[data-goal]', app).forEach((b) => (b.onclick = () => { settings.goalDays = Number(b.dataset.goal); saveSettings(); render(); }));
  $$('[data-exp]', app).forEach((b) => (b.onclick = () => exportFile(b.dataset.exp)));
  $('#imp', app).addEventListener('change', async (e) => {
    const f = e.target.files?.[0]; e.target.value = '';
    if (!f) return;
    try { await importText(f.name, await f.text()); }
    catch { toast('No se pudo importar: el archivo no es una copia de esta app.'); }
  });
}

function addSportSheet() {
  const have = new Set(settings.sports.map((d) => d.key));
  const avail = PRESETS.filter((p) => !have.has(p.key));
  openSheet(`<h2>Añadir deporte</h2>
    <p class="muted" style="margin:0">Elige uno de la lista o crea el tuyo.</p>
    <div class="presets">${avail.map((p) => `<button type="button" class="preset s-${p.key}" data-preset="${p.key}">${icoName(p.icon)}<span>${esc(p.label)}</span></button>`).join('')}</div>
    <button class="btn primary block" id="custom-sport">Crear deporte personalizado</button>`, (el) => {
    // Los colores de los predefinidos aún no están en la hoja de estilos dinámica.
    $$('[data-preset]', el).forEach((b) => {
      b.style.setProperty('--c', `var(--col-${PRESET_MAP[b.dataset.preset].color})`);
      b.onclick = () => { settings.sports.push({ ...PRESET_MAP[b.dataset.preset] }); saveSettings(); closeSheet(); toast(`${PRESET_MAP[b.dataset.preset].label} añadido`); render(); };
    });
    $('#custom-sport', el).onclick = () => sportEditor(null);
  });
}

function sportEditor(def) {
  const isNew = !def;
  const f = def ? clone(def) : { key: 'c' + Math.random().toString(36).slice(2, 8), label: '', icon: 'bolt', color: 'rose', metric: 'time', types: [], gear: [], elev: false, intervals: false, chips: [], records: [], ph: '' };
  const hasSessions = !isNew && [...data.sessions.values()].some((s) => s.sport === f.key);
  const draw = (el) => {
    el.innerHTML = `<div class="sheet-grip"></div><h2>${isNew ? 'Nuevo deporte' : 'Editar deporte'}</h2>
      <div class="field"><label for="se-name">Nombre</label><input id="se-name" type="text" maxlength="40" value="${esc(f.label)}" placeholder="p. ej. Surf" autocomplete="off"></div>
      <div class="field"><span class="lbl">Cómo lo mides</span>
        <div class="metrics">${Object.entries(METRICS).map(([k, m]) => `<button type="button" data-metric="${k}" aria-pressed="${f.metric === k}" ${hasSessions && f.metric !== k ? 'disabled' : ''}><b>${esc(m.label)}</b><small>${esc(m.ex)}</small></button>`).join('')}</div>
        ${hasSessions ? '<span class="hint">No se puede cambiar porque ya tiene sesiones registradas.</span>' : ''}</div>
      ${isDistMetric(f.metric) ? `<button type="button" class="toggle" id="se-elev" aria-pressed="${!!f.elev}">${f.elev ? ICO_CHECK : ''}Apuntar desnivel</button>` : ''}
      ${isPaceMetric(f.metric) ? `<button type="button" class="toggle" id="se-int" aria-pressed="${!!f.intervals}">${f.intervals ? ICO_CHECK : ''}Apuntar series con el ritmo de cada una</button>` : ''}
      <div class="field"><span class="lbl">Icono</span><div class="icons">${ICON_NAMES.map((n) => `<button type="button" data-icon="${n}" aria-pressed="${f.icon === n}" aria-label="${n}">${icoName(n)}</button>`).join('')}</div></div>
      <div class="field"><span class="lbl">Color</span><div class="colors">${COLORS.map((c) => `<button type="button" data-color="${c}" aria-pressed="${f.color === c}" aria-label="${esc(COLOR_NAMES[c])}" style="--c:var(--col-${c})"></button>`).join('')}</div></div>
      <div class="field"><label for="se-types">Tipos de sesión</label><input id="se-types" type="text" value="${esc((f.types || []).join(', '))}" placeholder="Separados por comas: Partido, Entreno" autocomplete="off"></div>
      <div class="field"><label for="se-gear">Material (opcional)</label><input id="se-gear" type="text" value="${esc((f.gear || []).join(', '))}" placeholder="Separado por comas: Neopreno, Aletas" autocomplete="off"></div>
      <button class="btn primary block" id="se-save">${isNew ? 'Añadir deporte' : 'Guardar'}</button>
      ${isNew ? '' : `<button class="btn block" id="se-hide">${f.hidden ? 'Mostrar de nuevo' : 'Ocultar este deporte'}</button>`}
      ${!isNew && !hasSessions ? '<button class="btn danger block" id="se-del">Quitar de mis deportes</button>' : ''}`;
    const keep = () => { f.label = $('#se-name', el).value; f.types = $('#se-types', el).value; f.gear = $('#se-gear', el).value; };
    $$('[data-metric]', el).forEach((b) => (b.onclick = () => { keep(); f.metric = b.dataset.metric; if (!isDistMetric(f.metric)) f.elev = false; if (!isPaceMetric(f.metric)) f.intervals = false; draw(el); }));
    $$('[data-icon]', el).forEach((b) => (b.onclick = () => { keep(); f.icon = b.dataset.icon; draw(el); }));
    $$('[data-color]', el).forEach((b) => (b.onclick = () => { keep(); f.color = b.dataset.color; draw(el); }));
    $('#se-elev', el)?.addEventListener('click', () => { keep(); f.elev = !f.elev; draw(el); });
    $('#se-int', el)?.addEventListener('click', () => { keep(); f.intervals = !f.intervals; draw(el); });
    $('#se-save', el).onclick = () => {
      keep();
      if (!f.label.trim()) { toast('Ponle un nombre al deporte'); return; }
      const clean = cleanSportDef(f);
      const i = settings.sports.findIndex((x) => x.key === f.key);
      if (i >= 0) settings.sports[i] = clean; else settings.sports.push(clean);
      saveSettings(); closeSheet(); toast(isNew ? `${clean.label} añadido` : 'Deporte guardado'); render();
    };
    $('#se-hide', el)?.addEventListener('click', () => {
      const i = settings.sports.findIndex((x) => x.key === f.key);
      settings.sports[i].hidden = !settings.sports[i].hidden;
      if (settings.sports.every((x) => x.hidden)) { settings.sports[i].hidden = false; toast('Tiene que quedar al menos un deporte activo'); return; }
      saveSettings(); closeSheet(); render();
    });
    const delBtn = $('#se-del', el);
    if (delBtn) delBtn.onclick = () => {
      if (!delBtn.dataset.sure) { delBtn.dataset.sure = '1'; delBtn.textContent = 'Toca otra vez para quitarlo'; return; }
      if (settings.sports.filter((x) => !x.hidden && x.key !== f.key).length === 0) { toast('Tiene que quedar al menos un deporte activo'); return; }
      settings.sports = settings.sports.filter((x) => x.key !== f.key);
      for (const p of [...data.plan.values()]) if (p.sport === f.key && planState(p) !== 'done') del('plan', p.id);
      saveSettings(); closeSheet(); toast('Deporte quitado'); render();
    };
  };
  openSheet('', draw);
}

function exportFile(kind) {
  const stamp = today();
  const f = kind === 'json' ? { name: `entrenos-${stamp}.json`, body: fullJSON(), type: 'application/json' }
    : kind === 'scsv' ? { name: `sesiones-${stamp}.csv`, body: sessionsCSV(), type: 'text/csv' }
    : { name: `plan-${stamp}.csv`, body: planCSV(), type: 'text/csv' };
  const blob = new Blob([f.body], { type: f.type });
  const file = typeof File === 'function' ? new File([blob], f.name, { type: f.type }) : null;
  // En el móvil, el menú Compartir permite guardar en Archivos, Drive o enviarlo.
  if (file && navigator.canShare?.({ files: [file] })) {
    navigator.share({ files: [file], title: f.name }).then(() => markExported(kind)).catch((e) => {
      if (e?.name !== 'AbortError') downloadBlob(blob, f.name, kind); // si no se puede compartir, se descarga
    });
    return;
  }
  downloadBlob(blob, f.name, kind);
}
function downloadBlob(blob, name, kind) {
  const url = URL.createObjectURL(blob);
  const a = Object.assign(document.createElement('a'), { href: url, download: name });
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
  markExported(kind);
}
function markExported(kind) {
  if (kind && kind !== 'json') { toast('Archivo descargado'); return; }
  settings.lastExport = new Date().toISOString();
  saveSettings();
  toast('Copia guardada');
  render();
}

// ===================== Arranque =====================
loadAll();
route = routeFromHash();
render();
})();
