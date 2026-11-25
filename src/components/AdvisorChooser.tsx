"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/config/site";
import { advisorLink } from "@/lib/whatsapp";
import { IconClose, IconWhatsApp } from "./Icons";

/**
 * Ventana para elegir asesor de ventas. Intercepta cualquier clic en un
 * enlace con `data-wa` y escucha el evento "wa:elegir" (formularios).
 */
export function AdvisorChooser() {
  const [template, setTemplate] = useState<string | null>(null);
  const firstRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[data-wa]");
      if (!a) return;
      e.preventDefault();
      setTemplate(a.getAttribute("data-wa") ?? "");
    };
    const onEvent = (e: Event) => setTemplate((e as CustomEvent<string>).detail);
    document.addEventListener("click", onClick);
    window.addEventListener("wa:elegir", onEvent);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("wa:elegir", onEvent);
    };
  }, []);

  useEffect(() => {
    if (template === null) return;
    firstRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setTemplate(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [template]);

  if (template === null) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-labelledby="asesor-titulo">
      <button type="button" aria-label="Cerrar" className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={() => setTemplate(null)} />
      <div className="relative w-full max-w-md animate-fade-up rounded-t-3xl bg-white p-6 text-black sm:rounded-3xl sm:p-8">
        <button
          type="button"
          onClick={() => setTemplate(null)}
          aria-label="Cerrar"
          className="absolute top-4 right-4 grid size-10 place-items-center rounded-full border border-black/10 transition hover:bg-black hover:text-white"
        >
          <IconClose className="size-4" />
        </button>
        <p className="text-[11px] font-semibold tracking-[0.2em] text-black/60 uppercase">WhatsApp</p>
        <h2 id="asesor-titulo" className="font-display mt-1 pr-12 text-3xl leading-none font-extrabold uppercase italic">
          Elige a tu asesor
        </h2>
        <p className="mt-2 text-sm text-black/60">Te responderá personalmente para ayudarte con tu inscripción.</p>

        <ul className="mt-6 space-y-3">
          {site.advisors.map((a, i) => (
            <li key={a.phone}>
              <a
                ref={i === 0 ? firstRef : undefined}
                href={advisorLink(a, template)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setTimeout(() => setTemplate(null), 300)}
                className="group flex items-center gap-4 rounded-2xl border border-black/10 p-4 transition hover:border-black hover:bg-black hover:text-white"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-wa text-white">
                  <IconWhatsApp className="size-6" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[10px] font-bold tracking-[0.18em] text-black/60 uppercase group-hover:text-white/60">
                    {a.channel}
                  </span>
                  <span className="block text-lg leading-tight font-bold">{a.name}</span>
                  <span className="block text-sm text-black/55 group-hover:text-white/70">
                    {a.role} · {a.display}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
