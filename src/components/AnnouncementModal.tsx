"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { courses, statusLabel } from "@/content/courses";
import { courseMessage, whatsappLink } from "@/lib/whatsapp";
import { LogoMark } from "./Logo";
import { IconArrow, IconCalendar, IconClose, IconPin, IconWhatsApp } from "./Icons";

const STORAGE_KEY = "afa-anuncio-visto";

/** Anuncio de próximos cursos que aparece al entrar (una vez por sesión). */
export function AnnouncementModal() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  const upcoming = courses
    .filter((c) => c.featured)
    .sort((a, b) => (a.startDate ?? "9999").localeCompare(b.startDate ?? "9999"));

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {}
    if (seen || upcoming.length === 0) return;
    const t = setTimeout(() => setOpen(true), 900);
    return () => clearTimeout(t);
  }, [upcoming.length]);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function close() {
    setOpen(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {}
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center p-0 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="anuncio-titulo"
    >
      <button
        type="button"
        aria-label="Cerrar anuncio"
        className="absolute inset-0 animate-[fade-up_.4s_ease_both] bg-black/75 backdrop-blur-sm"
        onClick={close}
      />
      <div className="grain relative w-full max-w-3xl animate-fade-up overflow-hidden rounded-t-3xl border border-white/10 bg-ink-2 sm:rounded-3xl">
        {/* Emblema gigante de fondo */}
        <LogoMark className="pointer-events-none absolute -right-16 -bottom-10 w-[420px] text-white/[0.04]" />

        <button
          ref={closeRef}
          type="button"
          onClick={close}
          className="absolute top-4 right-4 z-10 grid size-10 place-items-center rounded-full border border-white/15 bg-black/40 text-white/80 transition hover:bg-white hover:text-black"
          aria-label="Cerrar"
        >
          <IconClose className="size-4" />
        </button>

        <div className="relative grid gap-0 sm:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col justify-between border-b border-white/10 bg-white p-7 text-black sm:border-r sm:border-b-0 sm:p-9">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-black px-3 py-1 text-[10px] font-bold tracking-[0.2em] text-white uppercase">
                <span className="size-1.5 animate-pulse rounded-full bg-white" />
                Inscripciones abiertas
              </span>
              <h2
                id="anuncio-titulo"
                className="font-display mt-5 text-[42px] leading-[0.9] font-extrabold uppercase italic sm:text-[54px]"
              >
                Próximos
                <br />
                cursos
              </h2>
              <p className="mt-4 max-w-[260px] text-sm text-black/60">
                Cupos limitados. Aprende directamente con Alex, Trainer Oficial Feynlab Perú.
              </p>
            </div>
            <p className="mt-8 text-[11px] font-semibold tracking-[0.2em] text-black/40 uppercase">AF Academy</p>
          </div>

          <ul className="divide-y divide-white/10 p-3 sm:p-4">
            {upcoming.map((c) => (
              <li key={c.slug} className="p-4">
                <p className="text-[11px] font-semibold tracking-[0.18em] text-white/45 uppercase">
                  {statusLabel[c.status]}
                </p>
                <h3 className="font-display mt-1 text-2xl font-bold uppercase italic">{c.title}</h3>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-white/65">
                  <span className="inline-flex items-center gap-1.5">
                    <IconCalendar className="size-4" />
                    {c.dateLabel || "Fecha por confirmar"}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <IconPin className="size-4" />
                    {c.modality}
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <a
                    href={whatsappLink(courseMessage(c.title, c.dateLabel))}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={close}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold tracking-[0.08em] text-black uppercase transition hover:bg-white/85"
                  >
                    <IconWhatsApp className="size-4" />
                    {c.status === "abierto" ? "Reservar cupo" : "Avísame"}
                  </a>
                  <Link
                    href={`/cursos/${c.slug}`}
                    onClick={close}
                    className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs font-bold tracking-[0.08em] uppercase transition hover:border-white"
                  >
                    Ver detalles
                    <IconArrow className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
