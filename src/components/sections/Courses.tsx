import Image from "next/image";
import Link from "next/link";
import { bundle, courses, getCourse, soles, statusLabel, type Course } from "@/content/courses";
import { courseMessage, whatsappLink } from "@/lib/whatsapp";
import { Reveal } from "../Reveal";
import { IconArrow, IconCalendar, IconCap, IconPin, IconWhatsApp } from "../Icons";

export function Courses() {
  const onsite = courses.filter((c) => c.modality !== "Online");
  const online = courses.filter((c) => c.modality === "Online");

  return (
    <section id="cursos" className="bg-paper py-24 text-black sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.28em] text-black/45 uppercase">
              Cursos intensivos de detailing
            </p>
            <h2 className="font-display mt-3 text-5xl leading-[0.9] font-extrabold uppercase italic sm:text-7xl">
              Aprende y amplía
              <br />
              <span className="text-outline-dark">tus servicios</span>
            </h2>
          </div>
          <p className="max-w-sm text-black/60">
            Clases presenciales dictadas por AlexAF, con kit de productos para tus primeros servicios y certificación.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {onsite.map((c, i) => (
            <Reveal key={c.slug} delay={i * 90} as="article">
              <CourseCard course={c} index={i} />
            </Reveal>
          ))}
        </div>

        {bundle.enabled && <Bundle />}

        {online.map((c) => (
          <Reveal key={c.slug} className="mt-5">
            <div className="flex flex-col gap-6 rounded-[28px] border border-dashed border-black/25 bg-paper-2 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-10">
              <div>
                <span className="inline-flex rounded-full bg-black px-3 py-1 text-[10px] font-bold tracking-[0.2em] text-white uppercase">
                  {statusLabel[c.status]}
                </span>
                <h3 className="font-display mt-4 text-4xl font-extrabold uppercase italic">{c.title}</h3>
                <p className="mt-2 max-w-xl text-black/60">{c.description}</p>
              </div>
              <a
                href={whatsappLink("Hola Alex, quiero unirme a la lista de espera de AF Academy Online.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-black px-6 py-3.5 text-xs font-bold tracking-[0.1em] text-white uppercase transition hover:bg-black/80"
              >
                <IconWhatsApp className="size-4" />
                Unirme a la lista de espera
              </a>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function CourseCard({ course: c, index }: { course: Course; index: number }) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-[28px] bg-ink p-7 text-white transition duration-500 hover:-translate-y-1 hover:shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] sm:p-10">
      {c.images.hero && (
        <div className="relative -mx-7 -mt-7 mb-7 aspect-[16/7] overflow-hidden sm:-mx-10 sm:-mt-10">
          <Image
            src={c.images.hero}
            alt=""
            fill
            sizes="(min-width: 1024px) 600px, 100vw"
            className="object-cover transition duration-[1.2s] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
          <span
            className="font-display absolute right-6 bottom-2 text-[110px] leading-none font-extrabold text-white/15 italic"
            aria-hidden="true"
          >
            0{index + 1}
          </span>
        </div>
      )}

      <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-3 py-1 text-[10px] font-bold tracking-[0.2em] text-black uppercase">
        {c.status === "abierto" && <span className="size-1.5 animate-pulse rounded-full bg-black" />}
        {c.presalePrice ? "Preventa" : statusLabel[c.status]}
      </span>

      <h3 className="font-display mt-6 text-4xl leading-none font-extrabold uppercase italic sm:text-5xl">{c.title}</h3>

      <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/70">
        <li className="inline-flex items-center gap-2">
          <IconCalendar className="size-4" />
          {c.dateLabel || "Fecha por confirmar"}
        </li>
        {c.location && (
          <li className="inline-flex items-center gap-2">
            <IconPin className="size-4" />
            {c.location}
          </li>
        )}
        <li className="inline-flex items-center gap-2">
          <IconCap className="size-4" />
          Certificación
        </li>
        {c.split && (
          <li className="inline-flex items-center gap-2 font-semibold text-white">
            {c.split.practice}% práctico
          </li>
        )}
      </ul>

      {c.modules.length > 0 && (
        <div className="mt-8">
          <p className="text-[11px] font-semibold tracking-[0.2em] text-white/40 uppercase">Aprenderás</p>
          <ul className="mt-3 space-y-2 text-white/75">
            {c.modules.slice(0, 4).map((m) => (
              <li key={m} className="flex gap-3">
                <span className="mt-2.5 h-px w-3 shrink-0 bg-white/50" />
                {m}
              </li>
            ))}
            {c.modules.length > 4 && (
              <li className="pl-6 text-sm text-white/45">+ {c.modules.length - 4} {c.modules.length - 4 === 1 ? "tema más" : "temas más"}</li>
            )}
          </ul>
        </div>
      )}

      {c.kit && (
        <div className="mt-7 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <p className="text-[11px] font-semibold tracking-[0.2em] text-white/40 uppercase">Incluye</p>
          <p className="mt-1 font-semibold">{c.kit.title}</p>
          {c.kit.perks.length > 0 && <p className="mt-1 text-sm text-white/55">{c.kit.perks.join(" · ")}</p>}
        </div>
      )}

      <div className="mt-auto pt-9">
        <div className="flex items-end gap-4">
          {c.presalePrice && c.price && (
            <span className="text-white/40">
              <span className="block text-[10px] font-semibold tracking-[0.18em] uppercase">Precio normal</span>
              <s className="text-lg">{soles(c.price)}</s>
            </span>
          )}
          <span>
            <span className="block text-[10px] font-semibold tracking-[0.18em] text-white/50 uppercase">
              {c.presalePrice ? "Preventa" : "Inversión"}
            </span>
            <span className="font-display text-4xl font-extrabold italic">
              {c.presalePrice ? soles(c.presalePrice) : c.price ? soles(c.price) : "Consultar"}
            </span>
          </span>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href={whatsappLink(courseMessage(c.title, c.dateLabel))}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-xs font-bold tracking-[0.1em] text-black uppercase transition hover:bg-white/85 active:scale-[0.97]"
          >
            <IconWhatsApp className="size-4" />
            Reservar mi cupo
          </a>
          <Link
            href={`/cursos/${c.slug}`}
            className="group/l inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-xs font-bold tracking-[0.1em] uppercase transition hover:border-white"
          >
            Ver temario completo
            <IconArrow className="size-3.5 transition-transform group-hover/l:translate-x-0.5" />
          </Link>
          {c.images.flyer && (
            <a
              href={c.images.flyer}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold tracking-[0.1em] text-white/60 uppercase underline-offset-4 hover:text-white hover:underline"
            >
              Ver flyer
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function Bundle() {
  const names = bundle.courses.map((s) => getCourse(s)?.title).filter(Boolean);
  return (
    <Reveal className="mt-5">
      <div className="relative flex flex-col items-start gap-6 overflow-hidden rounded-[28px] border-2 border-black p-7 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.28em] text-black/45 uppercase">Promoción</p>
          <h3 className="font-display mt-2 text-4xl font-extrabold uppercase italic sm:text-5xl">{bundle.title}</h3>
          <p className="mt-2 text-black/60">{names.join(" + ")}</p>
        </div>
        <div className="flex flex-wrap items-center gap-5">
          <span className="font-display text-5xl font-extrabold italic sm:text-6xl">{soles(bundle.price)}</span>
          <span className="rounded-full bg-black px-4 py-2 text-xs font-bold tracking-[0.12em] text-white uppercase">
            Ahorra {soles(bundle.savings)}
          </span>
          <a
            href={whatsappLink(
              `Hola Alex, quiero inscribirme a ambos cursos (${names.join(" + ")}) por ${soles(bundle.price)}. ¿Me das más información?`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3.5 text-xs font-bold tracking-[0.1em] text-white uppercase transition hover:bg-black/80"
          >
            <IconWhatsApp className="size-4" />
            Quiero ambos cursos
          </a>
        </div>
      </div>
    </Reveal>
  );
}
