"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { bundle, courses, soles, statusLabel } from "@/content/courses";
import { courseMessage, waProps } from "@/lib/whatsapp";
import { INTRO_MS } from "./IntroSplash";
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
    // Espera a que termine la intro del logo (si se está mostrando).
    const introShowing = !document.documentElement.classList.contains("no-intro");
    const t = setTimeout(() => setOpen(true), introShowing ? INTRO_MS + 200 : 900);
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
      <div className="grain relative flex max-h-[92dvh] w-full max-w-4xl animate-fade-up flex-col overflow-hidden rounded-t-3xl border border-white/10 bg-ink-2 sm:rounded-3xl">
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

        <div className="relative grid gap-0 overflow-y-auto overscroll-contain sm:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col justify-between border-b border-white/10 bg-white p-6 pr-16 text-black sm:border-r sm:border-b-0 sm:p-9">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-black px-3 py-1 text-[10px] font-bold tracking-[0.2em] text-white uppercase">
                <span className="size-1.5 animate-pulse rounded-full bg-white" />
                Inscripciones abiertas
              </span>
              <h2
                id="anuncio-titulo"
                className="font-display mt-4 text-[34px] leading-[0.9] font-extrabold uppercase italic sm:text-[54px]"
              >
                Próximos
                <br />
                cursos
              </h2>
              <p className="mt-3 max-w-[260px] text-sm text-black/60">
                Cursos intensivos de detailing con kit de productos y certificación. Dictados por AlexAF.
              </p>
            </div>
            <p className="mt-8 hidden text-[11px] font-semibold tracking-[0.2em] text-black/60 uppercase sm:block">AF Academy</p>
          </div>

          <ul className="divide-y divide-white/10 p-3 sm:p-4 sm:pr-14">
            {upcoming.map((c) => (
              <li key={c.slug} className="flex gap-4 p-4">
                {c.images.hero && (
                  <Link
                    href={`/cursos/${c.slug}`}
                    onClick={close}
                    className="relative aspect-[4/5] w-20 shrink-0 self-start overflow-hidden rounded-2xl sm:w-28"
                    aria-label={`Ver ${c.title}`}
                  >
                    <Image src={c.images.hero} alt="" fill sizes="96px" className="object-cover transition duration-700 hover:scale-110" />
                  </Link>
                )}
                <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold tracking-[0.18em] text-white/60 uppercase">
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
                    {c.location || c.modality}
                  </span>
                  {c.split && <span>{c.split.practice}% práctico</span>}
                </div>
                {c.presalePrice && (
                  <p className="mt-2 text-sm">
                    <span className="font-display text-xl font-extrabold italic">Preventa {soles(c.presalePrice)}</span>
                    {c.price && <s className="ml-2 text-white/60">{soles(c.price)}</s>}
                  </p>
                )}
                <div className="mt-4 flex flex-wrap gap-2">
                  <a
                    {...waProps(courseMessage(c.title, c.dateLabel))}
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
                </div>
              </li>
            ))}
            {bundle.enabled && (
              <li className="m-1 flex items-center justify-between gap-3 rounded-2xl bg-white/[0.06] p-4">
                <span className="text-sm">
                  <span className="block font-semibold">Ambos cursos</span>
                  <span className="text-white/55">Ahorra {soles(bundle.savings)}</span>
                </span>
                <span className="font-display text-2xl font-extrabold italic">{soles(bundle.price)}</span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
