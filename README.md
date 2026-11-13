# Cuaderno de Entreno

Tu app única de deporte: registro de entrenos, plan semanal, gimnasio, carreras y eventos, material y progreso, en un solo sitio y para **cualquier deporte** (carrera, natación, ciclismo, fuerza, pádel, escalada, senderismo, remo… y los que crees tú). Pensada para el móvil y publicada con GitHub Pages desde la rama `main`.

**Abrir la app:** https://alejandro-sanchez03.github.io/seguimiento-deporte/

## Qué hace

- **Inicio:** saludo con tu nombre y tu estado de la semana, y widgets que puedes mostrar, ocultar y reordenar: lo que toca hoy, resumen de la semana, registro rápido, próxima carrera o evento, últimas sesiones, avisos y gráfica de horas.
- **Registrar:** formulario que se adapta a cómo se mide cada deporte (ritmo /km, ritmo /100 m, ritmo /500 m, velocidad, solo tiempo o ejercicios con series y kg).
- **Semana:** plan por días, mover e intercambiar sesiones, días de trabajo y libres, copiar el plan a varias semanas.
- **Detalle del entreno:** al tocar una sesión planificada se abre su ficha: calentamiento, parte principal y vuelta a la calma, series con ritmo objetivo, tiempo por repetición y volumen, tu última sesión parecida y los botones para registrarla o moverla.
- **Progreso:** volumen, gráficas de evolución y récords, para todos los deportes o uno solo.
- **Carreras y eventos:** de cualquier deporte, con fecha, distancia opcional y objetivo (tiempo o texto); cuenta atrás en el inicio.
- **Material:** zapatillas, bici, neopreno u otro; se elige al registrar y suma km u horas. Zapatillas: aviso a partir de 600 km y a los 700.
- **Ajustes:** tu nombre, pantalla de inicio, tus deportes (añadir de la lista, crear uno propio, ocultar, ordenar), objetivo semanal, carreras, material y copias de seguridad.

## Importar un plan de entrenamiento

En **Semana → Importar plan** puedes meter un plan entero desde un PDF, un Excel (.xlsx), un CSV o texto pegado. Antes de guardar se ve cómo queda cada día.

El PDF tiene que tener texto (hecho con Word, Excel, Google Docs o la app del entrenador): un PDF escaneado o una foto no se puede leer.

Una fila por sesión (dos sesiones el mismo día = dos filas). La primera fila es la cabecera:

| Semana | Día | Deporte | Tipo | Descripción |
|---|---|---|---|---|
| 1 | Lunes | Carrera | Rodaje suave | 45 min Z2 |
| 1 | Martes | Fuerza | Pierna | Pierna completa |
| 1 | Viernes | Descanso | | |

- En lugar de **Semana** y **Día** puedes usar una columna **Fecha** (17/11/2026 o 2026-11-17).
- **Deporte**: el nombre de uno de tus deportes (también vale «correr», «bici», «gym»…). «Descanso» marca el día libre. Un deporte que no exista se añade.
- **Tipo**, **Duración** y **Notas** son opcionales.
- También vale texto libre: «Semana 1», «Lunes: Carrera 45 min suave», «Martes: Fuerza pierna + Natación 2000 m».

Plantilla: [`plantillas/plan-ejemplo.csv`](plantillas/plan-ejemplo.csv) (también se descarga desde la app).

## Instalar en el móvil

- **iPhone (Safari):** Compartir → «Añadir a pantalla de inicio».
- **Android (Chrome):** menú ⋮ → «Instalar app».

Funciona sin conexión una vez abierta.

## Tus datos

Se guardan en el propio dispositivo (`localStorage`, clave `cuaderno-tri:v1`; ajustes en `cuaderno-tri:ajustes`). No hay servidor ni cuentas. En iPhone, Safari puede borrar los datos de una web, así que la app te pide exportar una copia (**Exportar ahora** en Hoy, o **Ajustes → Exportar todo**) cada 7 días.

El objeto guardado lleva un número de versión (`schema`). Cuando cambia la estructura, la app migra sola al abrirse, sin borrar nada, y antes guarda una copia del estado anterior en `cuaderno-tri:v1:copia-antes-de-vN`. Si alguna vez lo guardado no se puede leer, se aparta en `cuaderno-tri:v1:ilegible-…` en lugar de sobrescribirlo.

## Estructura

```
index.html            Estructura y barra de pestañas
css/app.css           Estilos (modo claro y oscuro)
js/app.js             Toda la lógica de la app
js/vendor/            SheetJS (Excel) y pdf.js (PDF), ambas con licencia Apache 2.0
plantillas/           Plantilla para importar un plan
sw.js                 Funcionamiento sin conexión
manifest.webmanifest  Datos para instalarla como app
icons/                Iconos
```

Para probarla en local: `python3 -m http.server 8080` y abre http://localhost:8080.
