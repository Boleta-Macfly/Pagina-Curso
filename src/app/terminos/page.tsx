import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { site } from "@/config/site";

export const metadata: Metadata = { title: "Términos y condiciones", alternates: { canonical: "/terminos" } };

// BORRADOR: completar con las condiciones reales (pagos, reembolsos, cambios de fecha).
export default function Terminos() {
  return (
    <PageShell>
      <article className="mx-auto max-w-3xl px-4 pb-24 text-white/70 sm:px-6 [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-white">
        <h1 className="font-display text-5xl font-extrabold text-white uppercase italic">Términos y condiciones</h1>
        <p className="mt-6">
          La información de esta web es referencial. Las fechas, precios y cupos de los cursos de {site.name} se
          confirman al momento de la inscripción por WhatsApp.
        </p>
        <h2>Inscripciones y pagos</h2>
        <p>Pendiente de completar con las condiciones de la academia.</p>
        <h2>Cambios y cancelaciones</h2>
        <p>Pendiente de completar con las condiciones de la academia.</p>
      </article>
    </PageShell>
  );
}
