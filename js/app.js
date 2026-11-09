import { SPORTS, SPORT_KEYS, getSport } from './sports.js';
import {
  addDays,
  computePace,
  currentStreak,
  formatDistance,
  formatDuration,
  formatHours,
  gymVolume,
  inRange,
  parseDate,
  personalBests,
  sortByDateDesc,
  startOfWeek,
  summarize,
  toISODate,
  weeklyTotals,
} from './stats.js';
import { buildBackup, loadWorkouts, newId, parseBackup, saveWorkouts } from './storage.js';

let workouts = loadWorkouts();
const view = document.getElementById('view');

// ---------- utilidades ----------

const esc = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const fmtDate = (iso) =>
  parseDate(iso).toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });

function persist() {
  saveWorkouts(workouts);
}

function toast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toast.t);
  toast.t = setTimeout(() => el.classList.remove('show'), 2200);
}

function setActiveTab(route) {
  document.querySelectorAll('.tabbar a').forEach((a) => {
    a.classList.toggle('active', a.dataset.route === route);
  });
}

// ---------- router ----------

function router() {
  const hash = location.hash.replace(/^#\/?/, '');
  const [route, param] = hash.split('/');
  switch (route) {
    case 'nuevo':
      setActiveTab('nuevo');
      return renderForm(null, param);
    case 'editar':
      setActiveTab('historial');
      return renderForm(workouts.find((w) => w.id === param) || null);
    case 'historial':
      setActiveTab('historial');
      return renderHistory(param);
    case 'ajustes':
      setActiveTab('ajustes');
      return renderSettings();
    default:
      setActiveTab('resumen');
      return renderDashboard();
  }
}

window.addEventListener('hashchange', router);

// ---------- resumen ----------

function renderDashboard() {
  const today = new Date();
  const weekFrom = startOfWeek(today);
  const monthFrom = new Date(today.getFullYear(), today.getMonth(), 1);
  const tomorrow = addDays(today, 1);

  const week = summarize(inRange(workouts, weekFrom, tomorrow));
  const month = summarize(inRange(workouts, monthFrom, tomorrow));
  const streak = currentStreak(workouts, today);
  const recent = sortByDateDesc(workouts).slice(0, 5);

  view.innerHTML = `
    <section class="stats-row">
      <div class="stat"><span class="stat-value">${week.count}</span><span class="stat-label">sesiones esta semana</span></div>
      <div class="stat"><span class="stat-value">${formatHours(week.durationSec)}</span><span class="stat-label">tiempo esta semana</span></div>
      <div class="stat"><span class="stat-value">${streak}</span><span class="stat-label">${streak === 1 ? 'día' : 'días'} de racha</span></div>
    </section>

    <section class="card">
      <h2>Últimas 8 semanas <small>(minutos)</small></h2>
      ${weeklyChart(weeklyTotals(workouts, 8, today))}
      <div class="legend">${SPORT_KEYS.map((k) => `<span><i style="background:${SPORTS[k].color}"></i>${SPORTS[k].label}</span>`).join('')}</div>
    </section>

    <section class="card">
      <h2>Este mes por deporte</h2>
      <div class="sport-grid">
        ${SPORT_KEYS.map((k) => sportSummaryCard(k, month.bySport[k])).join('')}
      </div>
    </section>

    <section class="card">
      <div class="card-head">
        <h2>Recientes</h2>
        <a href="#/historial" class="link">Ver todo</a>
      </div>
      ${recent.length ? `<ul class="workout-list">${recent.map(workoutItem).join('')}</ul>` : emptyState()}
    </section>
  `;
}

function sportSummaryCard(key, s) {
  const sport = SPORTS[key];
  let extra = '';
  if (sport.hasExercises && s.volumeKg) extra = `${Math.round(s.volumeKg).toLocaleString('es-ES')} kg movidos`;
  else if (s.distanceM) extra = formatDistance(s.distanceM, key);
  return `
    <a class="sport-card" href="#/historial/${key}" style="--c:${sport.color}">
      <span class="sport-emoji">${sport.emoji}</span>
      <span class="sport-name">${sport.label}</span>
      <span class="sport-meta">${s.count} ${s.count === 1 ? 'sesión' : 'sesiones'} · ${formatHours(s.durationSec)}</span>
      ${extra ? `<span class="sport-meta">${extra}</span>` : ''}
    </a>`;
}

function weeklyChart(weeks) {
  const W = 320;
  const H = 150;
  const pad = { top: 10, bottom: 22, left: 4, right: 4 };
  const max = Math.max(60, ...weeks.map((w) => w.total));
  const slot = (W - pad.left - pad.right) / weeks.length;
  const barW = slot * 0.62;
  const scale = (H - pad.top - pad.bottom) / max;

  const bars = weeks
    .map((w, i) => {
      const x = pad.left + i * slot + (slot - barW) / 2;
      let y = H - pad.bottom;
      const segs = SPORT_KEYS.filter((k) => w.minutes[k])
        .map((k) => {
          const h = w.minutes[k] * scale;
          y -= h;
          return `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${barW.toFixed(1)}" height="${h.toFixed(1)}" fill="${SPORTS[k].color}"><title>${SPORTS[k].label}: ${Math.round(w.minutes[k])} min</title></rect>`;
        })
        .join('');
      const label = w.weekStart.toLocaleDateString('es-ES', { day: 'numeric', month: 'numeric' });
      const total = w.total ? `<text x="${(x + barW / 2).toFixed(1)}" y="${(y - 3).toFixed(1)}" class="chart-total">${Math.round(w.total)}</text>` : '';
      return `${segs}${total}<text x="${(x + barW / 2).toFixed(1)}" y="${H - 6}" class="chart-label">${label}</text>`;
    })
    .join('');

  return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Minutos de entrenamiento por semana">
    <line x1="0" x2="${W}" y1="${H - pad.bottom}" y2="${H - pad.bottom}" class="chart-axis" />
    ${bars}
  </svg>`;
}

function emptyState() {
  return `<div class="empty">
    <p>Aún no hay entrenamientos.</p>
    <a class="btn" href="#/nuevo">Registrar el primero</a>
  </div>`;
}

function workoutItem(w) {
  const sport = getSport(w.sport);
  const parts = [formatDuration(w.durationSec)];
  if (w.distanceM) parts.push(formatDistance(w.distanceM, w.sport));
  const pace = computePace(w);
  if (pace) parts.push(pace);
  if (sport.hasExercises && w.exercises?.length) {
    parts.push(`${w.exercises.length} ${w.exercises.length === 1 ? "ejercicio" : "ejercicios"}`);
    const vol = gymVolume(w);
    if (vol) parts.push(`${Math.round(vol).toLocaleString('es-ES')} kg`);
  }
  if (w.rpe) parts.push(`RPE ${w.rpe}`);
  return `
    <li>
      <a class="workout" href="#/editar/${esc(w.id)}" style="--c:${sport.color}">
        <span class="workout-icon">${sport.emoji}</span>
        <span class="workout-body">
          <span class="workout-title">${esc(w.title || sport.label)}</span>
          <span class="workout-date">${fmtDate(w.date)}</span>
          <span class="workout-meta">${parts.map(esc).join(' · ')}</span>
        </span>
      </a>
    </li>`;
}

// ---------- historial ----------

function renderHistory(filter) {
  const active = SPORT_KEYS.includes(filter) ? filter : 'todos';
  const list = sortByDateDesc(active === 'todos' ? workouts : workouts.filter((w) => w.sport === active));

  // Agrupar por mes
  const groups = new Map();
  for (const w of list) {
    const key = w.date.slice(0, 7);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(w);
  }

  const bests = active !== 'todos' ? personalBests(list)[active] : null;

  view.innerHTML = `
    <div class="chips">
      <a class="chip ${active === 'todos' ? 'active' : ''}" href="#/historial">Todos</a>
      ${SPORT_KEYS.map((k) => `<a class="chip ${active === k ? 'active' : ''}" href="#/historial/${k}">${SPORTS[k].emoji} ${SPORTS[k].label}</a>`).join('')}
    </div>
    ${bests ? bestsCard(active, bests) : ''}
    ${
      list.length
        ? [...groups.entries()]
            .map(([month, items]) => {
              const s = summarize(items);
              const label = parseDate(`${month}-01`).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
              return `<section class="month">
                <h3>${esc(label)} <small>${s.count} · ${formatHours(s.durationSec)}</small></h3>
                <ul class="workout-list">${items.map(workoutItem).join('')}</ul>
              </section>`;
            })
            .join('')
        : emptyState()
    }
  `;
}

function bestsCard(key, b) {
  const rows = [];
  if (b.longestDistance) rows.push(`<li>Distancia más larga: <strong>${formatDistance(b.longestDistance.distanceM, key)}</strong> <small>(${fmtDate(b.longestDistance.date)})</small></li>`);
  if (b.longestDuration) rows.push(`<li>Sesión más larga: <strong>${formatDuration(b.longestDuration.durationSec)}</strong> <small>(${fmtDate(b.longestDuration.date)})</small></li>`);
  if (!rows.length) return '';
  return `<section class="card"><h2>🏆 Mejores marcas</h2><ul class="bests">${rows.join('')}</ul></section>`;
}

// ---------- formulario ----------

function renderForm(existing, presetSport) {
  const w = existing || {
    sport: SPORT_KEYS.includes(presetSport) ? presetSport : 'carrera',
    date: toISODate(new Date()),
    title: '',
    durationSec: 0,
    distanceM: 0,
    rpe: null,
    notes: '',
    exercises: [],
  };
  const h = Math.floor(w.durationSec / 3600);
  const m = Math.floor((w.durationSec % 3600) / 60);
  const s = Math.round(w.durationSec % 60);

  view.innerHTML = `
    <form id="wf" class="card form" novalidate>
      <h2>${existing ? 'Editar entrenamiento' : 'Nuevo entrenamiento'}</h2>

      <fieldset class="sport-picker">
        <legend>Deporte</legend>
        ${SPORT_KEYS.map(
          (k) => `<label style="--c:${SPORTS[k].color}">
            <input type="radio" name="sport" value="${k}" ${w.sport === k ? 'checked' : ''} />
            <span>${SPORTS[k].emoji}<br />${SPORTS[k].label}</span>
          </label>`,
        ).join('')}
      </fieldset>

      <div class="row">
        <label>Fecha<input type="date" name="date" value="${esc(w.date)}" required /></label>
        <label>Título <input type="text" name="title" value="${esc(w.title)}" placeholder="Opcional (p. ej. Series 6x1000)" maxlength="80" /></label>
      </div>

      <div class="field">
        <span class="field-label">Duración</span>
        <div class="duration">
          <label><input type="number" name="h" min="0" max="48" inputmode="numeric" value="${h || ''}" placeholder="0" /> h</label>
          <label><input type="number" name="m" min="0" max="59" inputmode="numeric" value="${m || ''}" placeholder="0" /> min</label>
          <label><input type="number" name="s" min="0" max="59" inputmode="numeric" value="${s || ''}" placeholder="0" /> s</label>
        </div>
      </div>

      <div class="row" id="distance-row">
        <label>Distancia (<span id="dist-unit"></span>)
          <input type="number" name="distance" min="0" step="any" inputmode="decimal" />
        </label>
        <div class="pace-preview"><span class="field-label">Ritmo</span><output id="pace">—</output></div>
      </div>

      <div class="field" id="exercises-field">
        <span class="field-label">Ejercicios</span>
        <div id="exercises"></div>
        <button type="button" class="btn ghost" id="add-ex">+ Añadir ejercicio</button>
      </div>

      <label class="field">Esfuerzo percibido (RPE): <strong id="rpe-val">${w.rpe || '—'}</strong>
        <input type="range" name="rpe" min="0" max="10" value="${w.rpe || 0}" />
        <span class="hint">0 = sin indicar · 1 muy suave · 10 máximo</span>
      </label>

      <label class="field">Notas
        <textarea name="notes" rows="3" placeholder="Sensaciones, material, clima…">${esc(w.notes)}</textarea>
      </label>

      <div class="actions">
        ${existing ? '<button type="button" class="btn danger" id="del">Eliminar</button>' : ''}
        <button type="submit" class="btn primary">Guardar</button>
      </div>
    </form>
  `;

  const form = document.getElementById('wf');
  const exBox = document.getElementById('exercises');

  const addExerciseRow = (ex = {}) => {
    const row = document.createElement('div');
    row.className = 'exercise';
    row.innerHTML = `
      <input type="text" data-k="name" placeholder="Ejercicio" value="${esc(ex.name)}" list="ex-suggestions" />
      <input type="number" data-k="sets" placeholder="Series" min="0" inputmode="numeric" value="${esc(ex.sets)}" />
      <input type="number" data-k="reps" placeholder="Reps" min="0" inputmode="numeric" value="${esc(ex.reps)}" />
      <input type="number" data-k="weightKg" placeholder="Kg" min="0" step="any" inputmode="decimal" value="${esc(ex.weightKg)}" />
      <button type="button" class="icon-btn" aria-label="Quitar ejercicio">✕</button>`;
    row.querySelector('button').addEventListener('click', () => row.remove());
    exBox.appendChild(row);
  };
  (w.exercises || []).forEach(addExerciseRow);
  document.getElementById('add-ex').addEventListener('click', () => addExerciseRow());

  // Sugerencias de ejercicios a partir del historial
  const names = [...new Set(workouts.flatMap((x) => (x.exercises || []).map((e) => e.name)).filter(Boolean))];
  let dl = document.getElementById('ex-suggestions');
  if (!dl) {
    dl = document.createElement('datalist');
    dl.id = 'ex-suggestions';
    document.body.appendChild(dl);
  }
  dl.innerHTML = names.map((n) => `<option value="${esc(n)}"></option>`).join('');

  const currentSport = () => form.sport.value;
  const durationFromForm = () =>
    (Number(form.h.value) || 0) * 3600 + (Number(form.m.value) || 0) * 60 + (Number(form.s.value) || 0);
  const distanceFromForm = () => {
    const v = Number(form.distance.value) || 0;
    return getSport(currentSport()).distanceUnit === 'm' ? v : v * 1000;
  };

  const updateSportFields = (initial = false) => {
    const sport = getSport(currentSport());
    document.getElementById('distance-row').hidden = !sport.distanceUnit;
    document.getElementById('exercises-field').hidden = !sport.hasExercises;
    document.getElementById('dist-unit').textContent = sport.distanceUnit || '';
    if (initial && w.distanceM) {
      form.distance.value = sport.distanceUnit === 'm' ? w.distanceM : +(w.distanceM / 1000).toFixed(3);
    }
    if (sport.hasExercises && !exBox.children.length) addExerciseRow();
    updatePace();
  };

  const updatePace = () => {
    const pace = computePace({ sport: currentSport(), durationSec: durationFromForm(), distanceM: distanceFromForm() });
    document.getElementById('pace').textContent = pace || '—';
  };

  form.addEventListener('change', (e) => {
    if (e.target.name === 'sport') {
      form.distance.value = '';
      updateSportFields();
    }
  });
  form.addEventListener('input', (e) => {
    if (e.target.name === 'rpe') document.getElementById('rpe-val').textContent = Number(e.target.value) || '—';
    updatePace();
  });
  updateSportFields(true);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const sportKey = currentSport();
    const sport = getSport(sportKey);
    const durationSec = durationFromForm();
    if (!form.date.value) return toast('Indica la fecha');
    if (!durationSec && !sport.hasExercises) return toast('Indica la duración');

    const exercises = sport.hasExercises
      ? [...exBox.querySelectorAll('.exercise')]
          .map((row) => {
            const get = (k) => row.querySelector(`[data-k="${k}"]`).value.trim();
            return {
              name: get('name'),
              sets: Number(get('sets')) || 0,
              reps: Number(get('reps')) || 0,
              weightKg: Number(get('weightKg')) || 0,
            };
          })
          .filter((ex) => ex.name)
      : [];

    const data = {
      id: existing?.id || newId(),
      sport: sportKey,
      date: form.date.value,
      title: form.title.value.trim(),
      durationSec,
      distanceM: sport.distanceUnit ? distanceFromForm() : 0,
      rpe: Number(form.rpe.value) || null,
      notes: form.notes.value.trim(),
      exercises,
      createdAt: existing?.createdAt || Date.now(),
    };

    if (existing) {
      workouts = workouts.map((x) => (x.id === existing.id ? data : x));
    } else {
      workouts.push(data);
    }
    persist();
    toast(existing ? 'Entrenamiento actualizado' : 'Entrenamiento guardado');
    location.hash = '#/';
  });

  document.getElementById('del')?.addEventListener('click', () => {
    if (!confirm('¿Eliminar este entrenamiento?')) return;
    workouts = workouts.filter((x) => x.id !== existing.id);
    persist();
    toast('Entrenamiento eliminado');
    location.hash = '#/historial';
  });
}

// ---------- ajustes ----------

function renderSettings() {
  const total = summarize(workouts);
  view.innerHTML = `
    <section class="card">
      <h2>Tus datos</h2>
      <p>Tienes <strong>${total.count}</strong> entrenamientos (${formatHours(total.durationSec)} en total).
      Se guardan solo en este dispositivo. Haz copias de seguridad de vez en cuando.</p>
      <div class="actions left">
        <button class="btn" id="export">⬇️ Exportar copia (JSON)</button>
        <label class="btn ghost">⬆️ Importar copia
          <input type="file" id="import" accept="application/json,.json" hidden />
        </label>
      </div>
      <div class="actions left">
        <button class="btn ghost" id="export-csv">Exportar CSV</button>
      </div>
    </section>
    <section class="card">
      <h2>Zona peligrosa</h2>
      <button class="btn danger" id="wipe">Borrar todos los datos</button>
    </section>
  `;

  document.getElementById('export').addEventListener('click', () => {
    download(`entrenamientos-${toISODate(new Date())}.json`, buildBackup(workouts), 'application/json');
  });

  document.getElementById('export-csv').addEventListener('click', () => {
    const header = ['fecha', 'deporte', 'titulo', 'duracion_seg', 'distancia_m', 'rpe', 'notas'];
    const q = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
    const rows = sortByDateDesc(workouts).map((w) =>
      [w.date, w.sport, w.title, w.durationSec, w.distanceM, w.rpe ?? '', w.notes].map(q).join(','),
    );
    download(`entrenamientos-${toISODate(new Date())}.csv`, [header.join(','), ...rows].join('\n'), 'text/csv');
  });

  document.getElementById('import').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const imported = parseBackup(await file.text());
      const ids = new Set(workouts.map((w) => w.id));
      const fresh = imported.filter((w) => !ids.has(w.id));
      workouts = workouts.concat(fresh);
      persist();
      toast(`Importados ${fresh.length} entrenamientos`);
      renderSettings();
    } catch (err) {
      toast(`Error al importar: ${err.message}`);
    }
  });

  document.getElementById('wipe').addEventListener('click', () => {
    if (!confirm('Esto borrará TODOS tus entrenamientos de este dispositivo. ¿Seguro?')) return;
    workouts = [];
    persist();
    toast('Datos borrados');
    renderSettings();
  });
}

function download(name, content, type) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const a = Object.assign(document.createElement('a'), { href: url, download: name });
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// ---------- arranque ----------

router();

if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  navigator.serviceWorker.register('./sw.js').catch(() => {});
}
