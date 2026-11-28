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
          En {site.name} respetamos tu privacidad. Los formularios de contacto y de cursos no almacenan tus datos:
          al enviarlos, se abre WhatsApp con tu mensaje y tú decides si lo envías.
        </p>
        <h2>Datos que recibimos</h2>
        <p>
          Los datos que nos envías voluntariamente por WhatsApp (nombre, número y consulta) y, si te inscribes en la
          lista de AF Academy Online, tu nombre y apellido, la ciudad o país desde donde nos escribes y tu número de
          WhatsApp. Estos últimos se guardan de forma segura en el servicio de formularios de nuestro proveedor de
          alojamiento web (Netlify).
        </p>
        <h2>Para qué los usamos</h2>
        <p>
          Para responder tu consulta, informarte sobre los cursos que solicitaste y avisarte por WhatsApp cuando
          lancemos AF Academy Online. No vendemos ni compartimos tus datos con terceros.
        </p>
        <h2>Tus derechos</h2>
        <p>
          Puedes pedirnos en cualquier momento que eliminemos tus datos escribiéndonos por los canales de contacto,
          conforme a la Ley N.° 29733 de Protección de Datos Personales del Perú.
        </p>
      </article>
    </PageShell>
  );
}
