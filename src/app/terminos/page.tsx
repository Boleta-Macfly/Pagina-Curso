import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  description: `Condiciones de inscripción, separación de cupo, pagos, cambios y cancelaciones de los cursos de ${site.name}.`,
  alternates: { canonical: "/terminos" },
};

/** Fecha de la última actualización de estos términos. */
const UPDATED = "26 de noviembre de 2026";

const sections: { title: string; items: string[] }[] = [
  {
    title: "Inscripción y separación de cupo",
    items: [
      "Para reservar un cupo se realiza un pago de separación, cuyo monto indicará el asesor según el curso, y que se descuenta del precio total.",
      "El cupo queda confirmado cuando el asesor valida el pago y envía la confirmación por WhatsApp.",
      "Los cupos son limitados y se asignan por orden de pago de la separación.",
    ],
  },
  {
    title: "Pago del saldo",
    items: [
      "El saldo restante se paga antes del inicio del curso, en la fecha que indique el asesor al confirmar la inscripción.",
      `Medios de pago aceptados: ${site.paymentMethods.join(", ")}.`,
      "Si el saldo no se paga en el plazo acordado, AF Academy puede liberar el cupo.",
    ],
  },
  {
    title: "Precios de preventa y promociones",
    items: [
      "Los precios de preventa y la promoción por ambos cursos rigen hasta la fecha indicada por el asesor o hasta agotar cupos.",
      "Las promociones no son acumulables entre sí.",
    ],
  },
  {
    title: "Cancelación por parte del alumno",
    items: [
      "Si el alumno no puede asistir y lo comunica con al menos 7 días de anticipación al inicio del curso, puede pasar su separación a la siguiente edición del mismo curso, una sola vez.",
      "La separación no es reembolsable, ya que asegura el cupo y la preparación de los materiales y el kit del alumno.",
      "Si el aviso se realiza con menos de 7 días de anticipación o el alumno no asiste, se pierde la separación.",
    ],
  },
  {
    title: "Cambios por parte de la academia",
    items: [
      "Si AF Academy cambia la fecha de un curso, el alumno puede pasar a la nueva fecha o solicitar la devolución total de lo pagado.",
      "Si AF Academy cancela un curso, se devuelve el 100 % de lo pagado.",
    ],
  },
  {
    title: "Asistencia y certificación",
    items: [
      "El certificado se entrega a quienes asisten a los dos días completos del curso.",
      "El kit de productos y el merch se entregan durante el curso.",
    ],
  },
  {
    title: "Uso de imagen",
    items: [
      "Durante los cursos se toman fotos y videos que pueden publicarse en las redes sociales y en la web de AF Academy.",
      "Si el alumno no desea aparecer en ese material, debe indicarlo al asesor antes o durante el curso.",
    ],
  },
];

export default function Terminos() {
  return (
    <PageShell>
      <article className="mx-auto max-w-3xl px-4 pb-24 sm:px-6">
        <p className="text-[11px] font-semibold tracking-[0.28em] text-white/60 uppercase">Última actualización: {UPDATED}</p>
        <h1 className="font-display mt-3 text-5xl leading-[0.9] font-extrabold uppercase italic sm:text-6xl">
          Términos y condiciones
        </h1>
        <p className="mt-6 leading-relaxed text-white/65">
          Estas condiciones aplican a la inscripción en los cursos presenciales de {site.name}. Al realizar el pago de
          separación, el alumno declara conocerlas y aceptarlas. La información de fechas, precios y cupos publicada en
          esta web es referencial y se confirma al momento de la inscripción.
        </p>

        <ol className="mt-12 space-y-10">
          {sections.map((s, i) => (
            <li key={s.title} className="border-t border-white/10 pt-8">
              <h2 className="font-display flex items-baseline gap-4 text-2xl font-bold uppercase italic">
                <span className="text-white/30">{String(i + 1).padStart(2, "0")}</span>
                {s.title}
              </h2>
              <ul className="mt-4 space-y-3 text-white/70">
                {s.items.map((t) => (
                  <li key={t} className="flex gap-3 leading-relaxed">
                    <span className="mt-3 h-px w-3 shrink-0 bg-white/40" />
                    {t}
                  </li>
                ))}
              </ul>
            </li>
          ))}
          <li className="border-t border-white/10 pt-8">
            <h2 className="font-display flex items-baseline gap-4 text-2xl font-bold uppercase italic">
              <span className="text-white/30">{String(sections.length + 1).padStart(2, "0")}</span>
              Contacto
            </h2>
            <p className="mt-4 leading-relaxed text-white/70">Para consultas, cambios o reclamos, comunícate con nuestros asesores por WhatsApp:</p>
            <ul className="mt-3 space-y-1 text-white/85">
              {site.advisors.map((a) => (
                <li key={a.phone}>
                  {a.name} ({a.role}): {a.display}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-white/60">
              Consulta también nuestra{" "}
              <Link href="/privacidad" className="underline underline-offset-4 hover:text-white">
                política de privacidad
              </Link>
              .
            </p>
          </li>
        </ol>
      </article>
    </PageShell>
  );
}
