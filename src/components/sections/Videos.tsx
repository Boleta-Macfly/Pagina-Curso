"use client";

import { useState } from "react";
import { site } from "@/config/site";
import { videos, type VideoCategory } from "@/content/media";
import { HexLights } from "../HexLights";
import { IconArrow, IconPlay, IconTikTok } from "../Icons";

const filters: ("Todos" | VideoCategory)[] = ["Todos", "PPF", "Cerámico", "Corrección", "Cursos"];

export function Videos() {
  const [active, setActive] = useState<(typeof filters)[number]>("Todos");
  const list = active === "Todos" ? videos : videos.filter((v) => v.category === active);

  return (
    <section id="videos" className="bg-ink py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.28em] text-white/45 uppercase">Videos y tutoriales</p>
            <h2 className="font-display mt-3 text-5xl leading-[0.9] font-extrabold uppercase italic sm:text-7xl">
              Aprende <span className="text-outline">gratis</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filtrar videos">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                role="tab"
                aria-selected={active === f}
                onClick={() => setActive(f)}
                className={`rounded-full px-4 py-2 text-xs font-bold tracking-[0.1em] uppercase transition ${
                  active === f ? "bg-white text-black" : "border border-white/15 text-white/70 hover:border-white/40"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {list.map((v) => (
            <a
              key={v.title}
              href={v.url || site.social.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-[9/14] overflow-hidden rounded-2xl border border-white/10 bg-ink-3"
            >
              {/* Miniatura: se usa la imagen si existe; si no, un fondo de marca */}
              {v.thumbnail ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={v.thumbnail}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />
              ) : (
                <HexLights className="absolute inset-0 h-full w-full opacity-20 transition duration-700 group-hover:scale-110 group-hover:opacity-35" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <span className="absolute top-3 left-3 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold tracking-[0.14em] uppercase backdrop-blur">
                {v.category}
              </span>
              <span className="absolute top-1/2 left-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-black opacity-90 transition group-hover:scale-110 group-hover:opacity-100">
                <IconPlay className="ml-0.5 size-5" />
              </span>
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="font-display text-lg leading-tight font-bold uppercase italic sm:text-xl">{v.title}</p>
                <p className="mt-1 text-xs text-white/55">▶ {v.views} reproducciones</p>
              </div>
            </a>
          ))}
        </div>

        <a
          href={site.social.tiktok}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-10 inline-flex items-center gap-3 rounded-full border border-white/20 px-6 py-3.5 text-xs font-bold tracking-[0.12em] uppercase transition hover:border-white"
        >
          <IconTikTok className="size-4" />
          Ver todos los videos en TikTok
          <IconArrow className="size-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  );
}
