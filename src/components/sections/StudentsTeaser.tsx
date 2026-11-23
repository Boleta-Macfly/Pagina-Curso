import Image from "next/image";
import Link from "next/link";
import { getCourse } from "@/content/courses";
import { studentEditions } from "@/content/students";
import { Reveal } from "../Reveal";
import { IconArrow } from "../Icons";

/** Bloque de la portada con fotos reales de alumnos certificados. */
export function StudentsTeaser() {
  const ed = studentEditions[0];
  if (!ed) return null;
  const course = getCourse(ed.course);
  const group = ed.photos.find((p) => p.kind === "grupo");
  const certs = ed.photos.filter((p) => p.kind === "certificado").slice(0, 3);

  return (
    <section id="alumnos" className="bg-ink py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.28em] text-white/45 uppercase">
              {course?.title} · {ed.label}
            </p>
            <h2 className="font-display mt-3 text-5xl leading-[0.9] font-extrabold uppercase italic sm:text-7xl">
              Ellos ya están
              <br />
              <span className="text-outline">certificados</span>
            </h2>
          </div>
          <p className="max-w-sm text-white/60">
            Alumnos reales de AF Academy recibiendo su certificado tras dos días de práctica en taller.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-3 lg:grid-cols-[1.6fr_1fr]">
          {group && (
            <Reveal className="relative aspect-[4/3] overflow-hidden rounded-[28px]">
              <Image src={group.src} alt={group.alt} fill sizes="(min-width: 1024px) 760px, 100vw" className="object-cover" />
              <span className="absolute bottom-4 left-4 rounded-full bg-black/70 px-3 py-1.5 text-xs font-semibold backdrop-blur">
                {ed.label}
              </span>
            </Reveal>
          )}
          <div className="grid grid-cols-3 gap-3 lg:grid-cols-2">
            {certs.map((p, i) => (
              <Reveal key={p.src} delay={i * 80} className={`relative overflow-hidden rounded-2xl ${i === 0 ? "lg:col-span-2 lg:aspect-[16/10]" : ""} aspect-[3/4]`}>
                <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 300px, 33vw" className="object-cover object-[center_60%]" />
              </Reveal>
            ))}
          </div>
        </div>

        {course && (
          <Link
            href={`/cursos/${course.slug}#alumnos`}
            className="group mt-10 inline-flex items-center gap-3 rounded-full border border-white/20 px-6 py-3.5 text-xs font-bold tracking-[0.12em] uppercase transition hover:border-white"
          >
            Ver todas las fotos de la edición
            <IconArrow className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        )}
      </div>
    </section>
  );
}
