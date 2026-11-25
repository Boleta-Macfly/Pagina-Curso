/**
 * Cargador de imágenes para el sitio estático: usa las versiones WebP
 * generadas por scripts/optimize-images.mjs en /_img/{ancho}/...
 */
export default function imageLoader({ src, width }: { src: string; width: number }) {
  if (!src.startsWith("/") || !/\.(jpe?g|png)$/i.test(src)) return src;
  return `/_img/${width}${src.replace(/\.(jpe?g|png)$/i, ".webp")}`;
}
