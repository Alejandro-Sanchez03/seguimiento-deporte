# Cuaderno de Entreno

App web para registrar y planificar entrenamientos de **cualquier deporte**: carrera, natación, ciclismo, fuerza, pádel, escalada, senderismo, remo… y los que crees tú. Pensada para el móvil y publicada con GitHub Pages.

**Abrir la app:** https://alejandro-sanchez03.github.io/seguimiento-deporte/

## Qué hace

- **Hoy:** la sesión que toca, la semana de un vistazo, el objetivo de días y tus números de la semana.
- **Registrar:** formulario que se adapta a cómo se mide cada deporte (ritmo /km, ritmo /100 m, ritmo /500 m, velocidad, solo tiempo o ejercicios con series y kg).
- **Semana:** plan por días, mover e intercambiar sesiones, días de trabajo y libres, copiar el plan a varias semanas.
- **Progreso:** volumen, gráficas de evolución y récords, para todos los deportes o uno solo.
- **Carreras:** próximas carreras con fecha, distancia, marca objetivo y ritmo necesario; cuenta atrás en Hoy.
- **Zapatillas:** kilómetros de cada par, elegidas al registrar; aviso a partir de 600 km y al llegar a 700 (límite configurable).
- **Ajustes:** tus deportes (añadir de la lista, crear uno propio, ocultar, ordenar), objetivo semanal, carreras, zapatillas y copias de seguridad.

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
sw.js                 Funcionamiento sin conexión
manifest.webmanifest  Datos para instalarla como app
icons/                Iconos
```

Para probarla en local: `python3 -m http.server 8080` y abre http://localhost:8080.
