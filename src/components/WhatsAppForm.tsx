"use client";

import { useState } from "react";
import { whatsappLink } from "@/lib/whatsapp";
import { IconWhatsApp } from "./Icons";

type Props = {
  /** Encabezado del mensaje que se enviará por WhatsApp. */
  intro: string;
  submitLabel: string;
  withMessage?: boolean;
  tone?: "dark" | "light";
};

/**
 * Formulario sin servidor: valida los datos y abre WhatsApp con el mensaje
 * completo. No guarda datos personales en la web.
 */
export function WhatsAppForm({ intro, submitLabel, withMessage = false, tone = "dark" }: Props) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("nombre") ?? "").trim();
    const phone = String(data.get("telefono") ?? "").trim();
    const msg = String(data.get("mensaje") ?? "").trim();
    const next: Record<string, string> = {};
    if (name.length < 2) next.nombre = "Escribe tu nombre.";
    if (!/^\+?[\d\s-]{7,15}$/.test(phone)) next.telefono = "Escribe un número válido (7 a 15 dígitos).";
    if (withMessage && msg.length < 5) next.mensaje = "Cuéntanos brevemente qué necesitas.";
    setErrors(next);
    if (Object.keys(next).length) return;

    const text = `${intro}\n\nNombre: ${name}\nTeléfono: ${phone}${msg ? `\nMensaje: ${msg}` : ""}`;
    window.open(whatsappLink(text), "_blank", "noopener,noreferrer");
    setSent(true);
    e.currentTarget.reset();
  }

  const dark = tone === "dark";
  const field = `w-full rounded-2xl border px-5 py-4 text-base outline-none transition placeholder:opacity-50 ${
    dark
      ? "border-white/15 bg-white/[0.04] text-white focus:border-white"
      : "border-black/15 bg-white text-black focus:border-black"
  }`;

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-3">
      <Field label="Nombre" error={errors.nombre}>
        <input name="nombre" autoComplete="name" placeholder="Tu nombre" className={field} aria-invalid={!!errors.nombre} />
      </Field>
      <Field label="WhatsApp" error={errors.telefono}>
        <input
          name="telefono"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="Tu número de WhatsApp"
          className={field}
          aria-invalid={!!errors.telefono}
        />
      </Field>
      {withMessage && (
        <Field label="Mensaje" error={errors.mensaje}>
          <textarea name="mensaje" rows={3} placeholder="¿En qué curso estás interesado?" className={field} aria-invalid={!!errors.mensaje} />
        </Field>
      )}
      <button
        type="submit"
        className={`mt-2 inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-bold tracking-[0.12em] uppercase transition active:scale-[0.98] ${
          dark ? "bg-white text-black hover:bg-white/85" : "bg-black text-white hover:bg-black/80"
        }`}
      >
        <IconWhatsApp className="size-5" />
        {submitLabel}
      </button>
      <p role="status" aria-live="polite" className={`min-h-5 text-sm ${dark ? "text-white/70" : "text-black/70"}`}>
        {sent && "¡Listo! Se abrió WhatsApp con tu mensaje. Solo presiona enviar y te responderemos pronto."}
      </p>
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-1.5">
      <span className="sr-only">{label}</span>
      {children}
      {error && <span className="pl-2 text-sm font-medium text-red-400">{error}</span>}
    </label>
  );
}
