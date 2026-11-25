"use client";

import { useEffect } from "react";
import { IconClose } from "./Icons";

type Props = {
  tiktokId: string;
  title: string;
  onClose: () => void;
};

export const tiktokVideoUrl = (id: string) => `https://www.tiktok.com/@alexaf___/video/${id}`;

/** Reproductor de TikTok en ventana; el video se carga solo al abrirla. */
export function TikTokPlayer({ tiktokId, title, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-4" role="dialog" aria-modal="true" aria-label={title}>
      <button type="button" aria-label="Cerrar video" className="absolute inset-0" onClick={onClose} />
      <div className="relative flex h-full max-h-[86dvh] w-full max-w-[400px] flex-col">
        <div className="relative flex-1 overflow-hidden rounded-2xl bg-black">
          <iframe
            src={`https://www.tiktok.com/embed/v2/${tiktokId}`}
            title={title}
            allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        </div>
        <div className="mt-3 flex items-center justify-between gap-3 text-white">
          <p className="text-sm font-semibold">{title}</p>
          <a
            href={tiktokVideoUrl(tiktokId)}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-full border border-white/20 px-3 py-1.5 text-xs font-bold uppercase hover:border-white"
          >
            Abrir en TikTok
          </a>
        </div>
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar"
        className="absolute top-4 right-4 grid size-11 place-items-center rounded-full bg-white text-black"
      >
        <IconClose className="size-5" />
      </button>
    </div>
  );
}
