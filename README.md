# Cuaderno de Triatlón

App web para registrar entrenamientos de **natación, carrera, ciclismo y fuerza**, planificar la semana y ver cada día "Hoy te toca". Pensada para el móvil.

## Dos formas de usarla

| | GitHub Pages (`index.html`) | Artefacto en Claude |
|---|---|---|
| Enlace | `https://alejandro-sanchez03.github.io/seguimiento-deporte/` | El enlace de claude.ai |
| Datos | En el móvil (no se borran al cerrar; exporta copias) | En tu cuenta de Claude, en todos tus dispositivos |
| Sin conexión | Sí | No |
| Icono propio en la pantalla de inicio | Sí | No |
| Leer foto del reloj con IA | No | Sí |

Las dos son la misma app. El código fuente está en `artefacto/entreno.html`; `index.html` se genera a partir de él.

## Activar GitHub Pages

1. En GitHub: **Settings → Pages**.
2. En *Build and deployment* elige **Deploy from a branch**, la rama con la app (`main` cuando se fusione) y la carpeta **/ (root)**.
3. Espera un par de minutos y abre el enlace en el móvil.
4. iPhone (Safari): compartir → **Añadir a pantalla de inicio**. Android (Chrome): menú ⋮ → **Instalar app** / **Añadir a pantalla de inicio**.

## Desarrollo

```bash
node scripts/build.mjs        # regenera index.html desde artefacto/entreno.html
python3 -m http.server 8080   # probar en http://localhost:8080
```
