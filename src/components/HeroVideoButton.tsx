"use client";

import { useCallback, useState } from "react";
import { site } from "@/config/site";
import { IconPlay } from "./Icons";
import { TikTokPlayer, tiktokVideoUrl } from "./TikTokPlayer";

/** Botón de play del inicio: abre el video destacado de Alex en la página. */
export function HeroVideoButton() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const { tiktokId, title } = site.heroVideo;

  return (
    <>
      <a
        href={tiktokVideoUrl(tiktokId)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => {
          if (e.metaKey || e.ctrlKey || e.shiftKey) return;
          e.preventDefault();
          setOpen(true);
        }}
        className="group absolute top-1/2 left-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-black shadow-[0_0_0_10px_rgba(255,255,255,0.08)] transition hover:scale-105"
        aria-label={`Ver video: ${title}`}
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-white/30 [animation-duration:2.2s]" />
        <IconPlay className="relative ml-1 size-7" />
      </a>
      {open && <TikTokPlayer tiktokId={tiktokId} title={title} onClose={close} />}
    </>
  );
}
