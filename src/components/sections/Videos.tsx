"use client";

import { useCallback, useState } from "react";
import { site } from "@/config/site";
import { tiktokUrl, videos, type Video, type VideoCategory } from "@/content/media";
import { HexLights } from "../HexLights";
import { IconArrow, IconPlay, IconTikTok } from "../Icons";
import { TikTokPlayer } from "../TikTokPlayer";

// Solo se muestran los filtros que tienen videos.
const categories = Array.from(new Set(videos.map((v) => v.category)));
const filters: ("Todos" | VideoCategory)[] = categories.length > 1 ? ["Todos", ...categories] : [];

export function Videos() {
  const [active, setActive] = useState<"Todos" | VideoCategory>("Todos");
  const [playing, setPlaying] = useState<Video | null>(null);
  const list = active === "Todos" ? videos : videos.filter((v) => v.category === active);

  const close = useCallback(() => setPlaying(null), []);

  return (
    <section id="videos" className="bg-ink py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.28em] text-white/60 uppercase">Videos y tutoriales</p>
            <h2 className="font-display mt-3 text-5xl leading-[0.9] font-extrabold uppercase italic sm:text-7xl">
              Aprende <span className="text-outline">gratis</span>
            </h2>
          </div>
          {filters.length > 0 && (
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
          )}
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
          {list.map((v) => (
            <a
              key={v.tiktokId}
              href={tiktokUrl(v)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                if (e.metaKey || e.ctrlKey || e.shiftKey) return;
                e.preventDefault();
                setPlaying(v);
              }}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-ink-3"
              aria-label={`Ver video: ${v.title}`}
            >
              {v.thumbnail ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={v.thumbnail}
                  alt=""
                  loading="lazy"
                  style={{ objectPosition: v.focus ?? "center bottom" }}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              ) : (
                <HexLights className="absolute inset-0 h-full w-full opacity-20 transition duration-700 group-hover:scale-110 group-hover:opacity-35" />
              )}
              {!v.thumbnail && <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />}
              <span className="absolute top-3 left-3 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-bold tracking-[0.14em] uppercase backdrop-blur">
                {v.category}
              </span>
              <IconTikTok className="absolute right-3 bottom-3 size-5 text-white/80 drop-shadow" />
              <span className={`absolute left-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-black shadow-xl transition group-hover:scale-110 ${v.thumbnail ? "top-[38%] opacity-0 group-hover:opacity-100 max-md:opacity-90" : "top-1/2 opacity-90"}`}>
                <IconPlay className="ml-0.5 size-5" />
              </span>
              {/* Si la portada ya trae el título, no se repite encima */}
              {!v.thumbnail && (
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="font-display text-lg leading-tight font-bold uppercase italic sm:text-xl">{v.title}</p>
                </div>
              )}
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

      {/* Reproductor: el video de TikTok se carga solo al abrirlo */}
      {playing && <TikTokPlayer tiktokId={playing.tiktokId} title={playing.title} onClose={close} />}
    </section>
  );
}
