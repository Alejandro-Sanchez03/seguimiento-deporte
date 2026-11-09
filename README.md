# Seguimiento Deporte

App web (PWA) para registrar y seguir tus entrenamientos de **natación, carrera, gym, ciclismo** y cualquier otro deporte.

## Funcionalidades

- **Registro de entrenamientos** con fecha, duración, distancia, esfuerzo percibido (RPE) y notas.
- **Métricas por deporte**:
  - Carrera → ritmo en min/km
  - Natación → distancia en metros y ritmo en min/100 m
  - Ciclismo → velocidad media en km/h
  - Gym → ejercicios con series, repeticiones y peso, y volumen total (kg)
- **Resumen**: sesiones y tiempo de la semana, racha de días, gráfico de las últimas 8 semanas por deporte y totales del mes.
- **Historial** agrupado por meses, filtrable por deporte, con mejores marcas.
- **Copias de seguridad**: exportar/importar JSON y exportar CSV.
- **Funciona sin conexión** e instalable en el móvil ("Añadir a pantalla de inicio").

Los datos se guardan en el propio dispositivo (`localStorage`); no hay servidor ni cuentas.

## Uso en local

No necesita compilación ni dependencias:

```bash
npm start          # o: python3 -m http.server 8080
```

Abre <http://localhost:8080>.

## Tests

```bash
npm test
```

## Publicarla (para usarla desde el móvil)

Al ser estática, puedes activar **GitHub Pages** (Settings → Pages → rama `main`, carpeta `/`) y abrir la URL desde el móvil para instalarla.

## Estructura

```
index.html            Estructura y navegación
css/styles.css        Estilos (modo claro/oscuro, adaptado a móvil)
js/app.js             Vistas: resumen, historial, formulario y ajustes
js/sports.js          Definición de deportes (añade aquí nuevos deportes)
js/stats.js           Cálculos: ritmos, totales, semanas, rachas
js/storage.js         Guardado local y copias de seguridad
sw.js                 Service worker (modo sin conexión)
tests/                Tests de los cálculos
```
