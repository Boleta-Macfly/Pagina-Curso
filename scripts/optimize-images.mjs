// Genera versiones WebP redimensionadas de las imágenes de /public
// para el sitio estático (se ejecuta solo antes de "npm run build").
import { readdir, mkdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const PUBLIC = path.resolve("public");
const OUT = path.join(PUBLIC, "_img");
// Deben coincidir con images.deviceSizes + images.imageSizes de next.config.ts
export const WIDTHS = [128, 256, 384, 640, 828, 1080, 1600];

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (p !== OUT) yield* walk(p);
    } else if (/\.(jpe?g|png)$/i.test(e.name)) yield p;
  }
}

let count = 0;
for await (const file of walk(PUBLIC)) {
  const rel = path.relative(PUBLIC, file).replace(/\.(jpe?g|png)$/i, ".webp");
  for (const w of WIDTHS) {
    const dest = path.join(OUT, String(w), rel);
    try {
      if ((await stat(dest)).mtimeMs >= (await stat(file)).mtimeMs) continue;
    } catch {}
    await mkdir(path.dirname(dest), { recursive: true });
    await sharp(file).resize({ width: w, withoutEnlargement: true }).webp({ quality: 78 }).toFile(dest);
    count++;
  }
}
console.log(`Imágenes optimizadas: ${count} archivos nuevos`);
