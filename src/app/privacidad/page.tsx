import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { site } from "@/config/site";

export const metadata: Metadata = { title: "Política de privacidad", alternates: { canonical: "/privacidad" } };

// BORRADOR: revisar con un asesor legal antes de publicar.
export default function Privacidad() {
  return (
    <PageShell>
      <article className="mx-auto max-w-3xl px-4 pb-24 text-white/70 sm:px-6 [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-white">
        <h1 className="font-display text-5xl font-extrabold text-white uppercase italic">Política de privacidad</h1>
        <p className="mt-6">
          En {site.name} respetamos tu privacidad. Esta web no almacena los datos que escribes en sus formularios:
          al enviarlos, se abre WhatsApp con tu mensaje y tú decides si lo envías.
        </p>
        <h2>Datos que recibimos</h2>
        <p>Solo los datos que nos envías voluntariamente por WhatsApp (nombre, número y consulta).</p>
        <h2>Para qué los usamos</h2>
        <p>Para responder tu consulta e informarte sobre los cursos que solicitaste.</p>
        <h2>Tus derechos</h2>
        <p>
          Puedes pedirnos en cualquier momento que eliminemos tus datos escribiéndonos por los canales de contacto,
          conforme a la Ley N.° 29733 de Protección de Datos Personales del Perú.
        </p>
      </article>
    </PageShell>
  );
}
