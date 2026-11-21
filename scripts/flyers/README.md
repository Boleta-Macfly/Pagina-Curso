# Flyers de cursos

Genera los flyers (1080×1350, formato Instagram, exportados a 2x) de cada curso.

1. Edita los datos del curso en `make.js` (fechas, precios, temario, kit).
2. Ejecuta: `node scripts/flyers/make.js scripts/flyers` (requiere Playwright).
3. Convierte los PNG a JPG y cópialos a `public/flyers/` con el mismo nombre.
