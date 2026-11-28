"use client";

import Link from "next/link";
import { useState } from "react";
import { openAdvisorChooser } from "@/lib/whatsapp";
import { IconArrow } from "./Icons";

/** Nombre del formulario en Netlify Forms (debe coincidir con public/__forms.html). */
export const ONLINE_FORM_NAME = "af-academy-online";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Lista de interesados en AF Academy Online.
 * Los datos se guardan en Netlify Forms (panel de Netlify → Forms),
 * desde donde se pueden ver, recibir por correo o descargar en CSV.
 */
export function OnlineLeadForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const nombre = String(data.get("nombre") ?? "").trim();
    const ubicacion = String(data.get("ubicacion") ?? "").trim();
    const whatsapp = String(data.get("whatsapp") ?? "").trim();
    const next: Record<string, string> = {};
    if (nombre.split(/\s+/).length < 2 || nombre.length < 4) next.nombre = "Escribe tu nombre y apellido.";
    if (ubicacion.length < 2) next.ubicacion = "Cuéntanos desde dónde nos escribes.";
    if (!/^\+?[\d\s-]{9,16}$/.test(whatsapp)) next.whatsapp = "Escribe un número de WhatsApp válido.";
    if (!data.get("acepto")) next.acepto = "Necesitamos tu autorización para contactarte.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("sending");
    const body = new URLSearchParams();
    body.set("form-name", ONLINE_FORM_NAME);
    body.set("nombre", nombre);
    body.set("ubicacion", ubicacion);
    body.set("whatsapp", whatsapp);
    body.set("acepto", "Sí");
    body.set("bot-field", String(data.get("bot-field") ?? ""));
    try {
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      form.reset();
    } catch {
      // Respaldo: si no se pudo guardar, se envían los datos por WhatsApp para no perder al interesado.
      setStatus("error");
      openAdvisorChooser(
        `¡Hola, {asesor}! Quiero que me avisen cuando lancen AF Academy Online.\n\nNombre: ${nombre}\nDesde: ${ubicacion}\nWhatsApp: ${whatsapp}`,
      );
    }
  }

  const field =
    "w-full rounded-2xl border border-white/15 bg-white/[0.04] px-5 py-4 text-base text-white outline-none transition placeholder:text-white/45 focus:border-white";

  if (status === "sent") {
    return (
      <div role="status" className="rounded-[28px] border border-white/15 bg-white/[0.04] p-8 text-center backdrop-blur">
        <p className="font-display text-3xl font-extrabold uppercase italic">¡Ya estás en la lista!</p>
        <p className="mt-3 text-white/65">Te escribiremos por WhatsApp apenas lancemos AF Academy Online.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="grid gap-3 rounded-[28px] border border-white/15 bg-white/[0.04] p-6 backdrop-blur sm:p-8"
    >
      <p className="font-display text-2xl font-extrabold uppercase italic sm:text-3xl">Sé el primero en enterarte</p>
      <p className="-mt-1 mb-2 text-sm text-white/60">Déjanos tus datos y te avisamos por WhatsApp cuando abramos inscripciones.</p>

      {/* Campo trampa contra spam: las personas no lo ven. */}
      <p className="hidden" aria-hidden="true">
        <label>
          No llenar: <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <Field label="Nombre y apellido" error={errors.nombre}>
        <input name="nombre" autoComplete="name" placeholder="Nombre y apellido" className={field} aria-invalid={!!errors.nombre} />
      </Field>
      <Field label="¿Desde dónde nos escribes?" error={errors.ubicacion}>
        <input
          name="ubicacion"
          autoComplete="address-level2"
          placeholder="¿Desde dónde nos escribes?"
          className={field}
          aria-invalid={!!errors.ubicacion}
        />
      </Field>
      <Field label="Número de WhatsApp" error={errors.whatsapp}>
        <input
          name="whatsapp"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="Tu número de WhatsApp"
          className={field}
          aria-invalid={!!errors.whatsapp}
        />
      </Field>

      <label className="mt-1 flex items-start gap-3 text-sm text-white/65">
        <input name="acepto" type="checkbox" className="mt-0.5 size-4 shrink-0 accent-white" aria-invalid={!!errors.acepto} />
        <span>
          Acepto que AF Academy me contacte por WhatsApp sobre sus cursos online, según la{" "}
          <Link href="/privacidad" className="underline underline-offset-2 hover:text-white">
            política de privacidad
          </Link>
          .
        </span>
      </label>
      {errors.acepto && <span className="pl-7 text-sm font-medium text-red-400">{errors.acepto}</span>}

      <button
        type="submit"
        disabled={status === "sending"}
        className="group mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-sm font-bold tracking-[0.12em] text-black uppercase transition hover:bg-white/85 active:scale-[0.98] disabled:opacity-60"
      >
        {status === "sending" ? "Enviando…" : "Avísenme"}
        <IconArrow className="size-4 transition-transform group-hover:translate-x-1" />
      </button>
      <p role="status" aria-live="polite" className="min-h-5 text-sm text-red-400">
        {status === "error" && "No pudimos guardar tus datos. Envíanoslos por WhatsApp con el asesor que elijas y te avisaremos."}
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
