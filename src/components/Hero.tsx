import Image from "next/image";
import Link from "next/link";
import { site } from "@/config/site";
import { courses } from "@/content/courses";
import { courseMessage, waProps } from "@/lib/whatsapp";
import { HexLights } from "./HexLights";
import { HeroVideoButton } from "./HeroVideoButton";
import { IconArrow, IconCalendar } from "./Icons";

export function Hero() {
  const upcoming = courses
    .filter((c) => c.status === "abierto" && c.startDate)
    .sort((a, b) => (a.startDate ?? "").localeCompare(b.startDate ?? ""));
  const next = upcoming[0];

  return (
    <section id="inicio" className="grain relative isolate overflow-hidden bg-ink pt-28 sm:pt-32">
      {/* Techo de luces en perspectiva */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[70%] [mask-image:linear-gradient(to_bottom,black_10%,transparent_95%)] [perspective:1100px]">
        <div className="absolute inset-x-[-15%] -top-10 h-[150%] origin-top [transform:rotateX(48deg)]">
          <HexLights className="h-full w-full opacity-[0.28]" />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.14),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-ink to-transparent" />

      <div className="mx-auto grid max-w-7xl items-end gap-12 px-4 pb-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:pb-24">
        <div className="animate-fade-up">
          <p className="inline-flex items-center gap-3 text-[11px] font-semibold tracking-[0.28em] text-white/60 uppercase">
            <span className="h-px w-8 bg-white/40" />
            {site.coach.roles[2]}
          </p>

          <h1 className="font-display mt-6 text-[52px] leading-[0.88] font-extrabold tracking-[-0.01em] uppercase italic sm:text-[84px] lg:text-[104px]">
            Domina
            <br />
            el PPF
            <br />
            <span className="text-outline">y el cerámico</span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
            Cursos prácticos en taller con Alex, CEO de AF Detailing. Aprende las técnicas que aplica en su
            taller y conviértelas en tu oficio o tu negocio.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              {...waProps(next ? courseMessage(next.title, next.dateLabel) : undefined)}
              className="group inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-bold tracking-[0.12em] text-black uppercase transition hover:bg-white/85 active:scale-[0.98]"
            >
              Inscríbete ahora
              <IconArrow className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <Link
              href="/#cursos"
              className="inline-flex items-center gap-3 rounded-full border border-white/25 px-7 py-4 text-sm font-bold tracking-[0.12em] uppercase transition hover:border-white hover:bg-white/5"
            >
              Conoce los cursos
            </Link>
          </div>

          {upcoming.length > 0 && (
            <div className="mt-10 grid w-full gap-3 sm:w-fit">
              {upcoming.map((c) => (
                <Link
                  key={c.slug}
                  href={`/cursos/${c.slug}`}
                  className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] py-3 pr-5 pl-3 backdrop-blur transition hover:border-white/30"
                >
                  <span className="grid size-11 place-items-center rounded-xl bg-white text-black">
                    <IconCalendar className="size-5" />
                  </span>
                  <span className="flex-1 text-sm">
                    <span className="block text-[11px] font-semibold tracking-[0.18em] text-white/50 uppercase">
                      Próximo curso
                    </span>
                    <span className="font-semibold">
                      {c.title} · {c.dateLabel}
                    </span>
                  </span>
                  <IconArrow className="size-4 text-white/50 transition-transform group-hover:translate-x-1 group-hover:text-white" />
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Video destacado: se configura en site.heroVideo */}
        <div className="relative mx-auto w-full max-w-sm animate-fade-up [animation-delay:200ms] lg:mx-0 lg:ml-auto">
          <div className="relative aspect-[9/15] overflow-hidden rounded-[28px] border border-white/15 bg-ink-3 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.9)]">
            <Image
              src={site.heroVideo.cover}
              alt={site.heroVideo.title}
              fill
              priority
              sizes="(min-width: 1024px) 448px, 90vw"
              className="object-cover object-bottom"
            />
            <HeroVideoButton />
          </div>
        </div>
      </div>

    </section>
  );
}
