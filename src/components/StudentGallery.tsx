"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { StudentPhoto } from "@/content/students";
import { IconArrow, IconClose } from "./Icons";

type Props = { photos: StudentPhoto[]; label: string };

/** Galería tipo mosaico con visor a pantalla completa. */
export function StudentGallery({ photos, label }: Props) {
  const [open, setOpen] = useState<number | null>(null);

  const go = useCallback(
    (d: number) => setOpen((i) => (i === null ? i : (i + d + photos.length) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, go]);

  const [first, ...rest] = photos;
  const idx = (p: StudentPhoto) => photos.indexOf(p);
  // Completa la fila de certificados (4 columnas) con fotos de clase para evitar huecos.
  const certOnly = rest.filter((p) => p.kind === "certificado");
  const classOnly = rest.filter((p) => p.kind !== "certificado");
  const fill = certOnly.length ? (4 - (certOnly.length % 4)) % 4 : 0;
  const certs = [...certOnly, ...classOnly.slice(0, fill)];
  const others = classOnly.slice(fill);

  return (
    <>
      <div className="grid gap-3">
        {first && (
          <Tile photo={first} onClick={() => setOpen(0)} className="aspect-[4/3] sm:aspect-[16/9]" sizes="(min-width: 1024px) 1200px, 100vw" label={label} />
        )}
        {certs.length > 0 && (
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {certs.map((p) => (
              <Tile key={p.src} photo={p} onClick={() => setOpen(idx(p))} className="aspect-[3/4]" sizes="(min-width: 1024px) 300px, 50vw" />
            ))}
          </div>
        )}
        {others.length > 0 && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {others.map((p) => (
              <Tile key={p.src} photo={p} onClick={() => setOpen(idx(p))} className="aspect-[4/5]" sizes="(min-width: 1024px) 400px, 50vw" />
            ))}
          </div>
        )}
      </div>

      {open !== null && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/95 p-4" role="dialog" aria-modal="true" aria-label="Foto ampliada">
          <button type="button" className="absolute inset-0" aria-label="Cerrar" onClick={() => setOpen(null)} />
          <div className="relative h-full max-h-[86dvh] w-full max-w-5xl">
            <Image src={photos[open].src} alt={photos[open].alt} fill sizes="100vw" className="object-contain" />
          </div>
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-sm text-white/70">
            {photos[open].alt} · {label} · {open + 1}/{photos.length}
          </p>
          <button type="button" onClick={() => setOpen(null)} aria-label="Cerrar" className="absolute top-4 right-4 grid size-11 place-items-center rounded-full bg-white text-black">
            <IconClose className="size-5" />
          </button>
          <button type="button" onClick={() => go(-1)} aria-label="Foto anterior" className="absolute top-1/2 left-3 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white backdrop-blur hover:bg-white hover:text-black">
            <IconArrow className="size-5 rotate-180" />
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Foto siguiente" className="absolute top-1/2 right-3 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white backdrop-blur hover:bg-white hover:text-black">
            <IconArrow className="size-5" />
          </button>
        </div>
      )}
    </>
  );
}

function Tile({
  photo,
  onClick,
  className = "",
  sizes,
  label,
}: {
  photo: StudentPhoto;
  onClick: () => void;
  className?: string;
  sizes: string;
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative block w-full overflow-hidden rounded-2xl bg-ink-3 ${className}`}
      aria-label={`Ampliar: ${photo.alt}`}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        sizes={sizes}
        loading="lazy"
        className={`w-full transition duration-700 group-hover:scale-105 ${className ? "h-full object-cover object-[center_60%]" : "h-auto"}`}
      />
      {photo.kind === "certificado" && (
        <span className="absolute top-3 left-3 rounded-full bg-white px-2.5 py-1 text-[10px] font-bold tracking-[0.14em] text-black uppercase">
          Certificado
        </span>
      )}
      {label && (
        <span className="absolute bottom-4 left-4 rounded-full bg-black/70 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
          {label}
        </span>
      )}
    </button>
  );
}
