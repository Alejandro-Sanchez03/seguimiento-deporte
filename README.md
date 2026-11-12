# Cuaderno de Entreno

Tu app única de deporte: registro de entrenos, plan semanal, gimnasio, carreras y eventos, material y progreso, en un solo sitio y para **cualquier deporte** (carrera, natación, ciclismo, fuerza, pádel, escalada, senderismo, remo… y los que crees tú). Pensada para el móvil y publicada con GitHub Pages desde la rama `main`.

**Abrir la app:** https://alejandro-sanchez03.github.io/seguimiento-deporte/

## Qué hace

- **Inicio:** saludo con tu nombre y tu estado de la semana, y widgets que puedes mostrar, ocultar y reordenar: lo que toca hoy, resumen de la semana, registro rápido, próxima carrera o evento, últimas sesiones, avisos y gráfica de horas.
- **Registrar:** formulario que se adapta a cómo se mide cada deporte (ritmo /km, ritmo /100 m, ritmo /500 m, velocidad, solo tiempo o ejercicios con series y kg).
- **Semana:** plan por días, mover e intercambiar sesiones, días de trabajo y libres, copiar el plan a varias semanas.
- **Progreso:** volumen, gráficas de evolución y récords, para todos los deportes o uno solo.
- **Carreras y eventos:** de cualquier deporte, con fecha, distancia opcional y objetivo (tiempo o texto); cuenta atrás en el inicio.
- **Material:** zapatillas, bici, neopreno u otro; se elige al registrar y suma km u horas. Zapatillas: aviso a partir de 600 km y a los 700.
- **Ajustes:** tu nombre, pantalla de inicio, tus deportes (añadir de la lista, crear uno propio, ocultar, ordenar), objetivo semanal, carreras, material y copias de seguridad.

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
