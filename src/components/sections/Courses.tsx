import Link from "next/link";
import { courses, statusLabel } from "@/content/courses";
import { courseMessage, whatsappLink } from "@/lib/whatsapp";
import { Reveal } from "../Reveal";
import { IconArrow, IconCalendar, IconClock, IconPin, IconWhatsApp } from "../Icons";

export function Courses() {
  return (
    <section id="cursos" className="bg-paper py-24 text-black sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.28em] text-black/45 uppercase">Programas</p>
            <h2 className="font-display mt-3 text-5xl leading-[0.9] font-extrabold uppercase italic sm:text-7xl">
              Cursos
              <span className="text-outline-dark"> AF</span>
            </h2>
          </div>
          <p className="max-w-sm text-black/60">
            Formación práctica en taller con Alex. Elige tu curso y reserva tu cupo por WhatsApp.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {courses.map((c, i) => {
            const online = c.modality === "Online";
            return (
              <Reveal key={c.slug} delay={i * 90} as="article" className={online ? "lg:col-span-2" : ""}>
                <div
                  className={`group relative flex h-full flex-col overflow-hidden rounded-[28px] p-7 transition duration-500 sm:p-10 ${
                    online
                      ? "border border-dashed border-black/25 bg-paper-2"
                      : "bg-ink text-white hover:-translate-y-1 hover:shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]"
                  }`}
                >
                  <span
                    className={`font-display pointer-events-none absolute -top-6 right-4 text-[150px] leading-none font-extrabold italic ${
                      online ? "text-black/[0.04]" : "text-white/[0.05]"
                    }`}
                    aria-hidden="true"
                  >
                    0{i + 1}
                  </span>

                  <span
                    className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-[10px] font-bold tracking-[0.2em] uppercase ${
                      online ? "bg-black text-white" : "bg-white text-black"
                    }`}
                  >
                    {c.status === "abierto" && <span className="size-1.5 animate-pulse rounded-full bg-black" />}
                    {statusLabel[c.status]}
                  </span>

                  <h3 className="font-display mt-6 text-4xl leading-none font-extrabold uppercase italic sm:text-5xl">
                    {c.title}
                  </h3>
                  <p className={`mt-4 max-w-lg leading-relaxed ${online ? "text-black/60" : "text-white/60"}`}>
                    {c.description}
                  </p>

                  {!online && (
                    <ul className="mt-7 flex flex-wrap gap-2 text-sm">
                      <Meta icon={<IconCalendar className="size-4" />}>{c.dateLabel || "Fecha por confirmar"}</Meta>
                      <Meta icon={<IconPin className="size-4" />}>{c.modality}</Meta>
                      {c.duration && <Meta icon={<IconClock className="size-4" />}>{c.duration}</Meta>}
                    </ul>
                  )}

                  <div className="mt-auto flex flex-wrap items-center gap-3 pt-9">
                    <a
                      href={whatsappLink(courseMessage(c.title, c.dateLabel))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-xs font-bold tracking-[0.1em] uppercase transition active:scale-[0.97] ${
                        online ? "bg-black text-white hover:bg-black/80" : "bg-white text-black hover:bg-white/85"
                      }`}
                    >
                      <IconWhatsApp className="size-4" />
                      {online ? "Unirme a la lista de espera" : "Inscribirme por WhatsApp"}
                    </a>
                    {!online && (
                      <Link
                        href={`/cursos/${c.slug}`}
                        className="group/l inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-xs font-bold tracking-[0.1em] uppercase transition hover:border-white"
                      >
                        Más información
                        <IconArrow className="size-3.5 transition-transform group-hover/l:translate-x-0.5" />
                      </Link>
                    )}
                    <span className={`ml-auto text-sm font-semibold ${online ? "text-black/50" : "text-white/50"}`}>
                      {c.price ? `S/ ${c.price.toLocaleString("es-PE")}` : "Precio: consultar"}
                    </span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Meta({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <li className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3.5 py-1.5 text-white/80">
      {icon}
      {children}
    </li>
  );
}
