# Cuaderno de Entreno

App web para registrar y planificar entrenamientos de **cualquier deporte**: carrera, natación, ciclismo, fuerza, pádel, escalada, senderismo, remo… y los que crees tú. Pensada para el móvil y publicada con GitHub Pages.

**Abrir la app:** https://alejandro-sanchez03.github.io/seguimiento-deporte/

## Qué hace

- **Hoy:** la sesión que toca, la semana de un vistazo, el objetivo de días y tus números de la semana.
- **Registrar:** formulario que se adapta a cómo se mide cada deporte (ritmo /km, ritmo /100 m, ritmo /500 m, velocidad, solo tiempo o ejercicios con series y kg).
- **Semana:** plan por días, mover e intercambiar sesiones, días de trabajo y libres, copiar el plan a varias semanas.
- **Progreso:** volumen, gráficas de evolución y récords, para todos los deportes o uno solo.
- **Ajustes:** tus deportes (añadir de la lista, crear uno propio, ocultar, ordenar), objetivo semanal y copias de seguridad.

## Instalar en el móvil

- **iPhone (Safari):** Compartir → «Añadir a pantalla de inicio».
- **Android (Chrome):** menú ⋮ → «Instalar app».

Funciona sin conexión una vez abierta.

## Tus datos

Se guardan en el propio dispositivo (`localStorage`). No hay servidor ni cuentas. Haz una copia desde **Ajustes → Exportar todo (JSON)** de vez en cuando; la app te avisa si pasan más de 30 días.

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
