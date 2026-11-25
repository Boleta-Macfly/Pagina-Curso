import Image from "next/image";
import { site } from "@/config/site";
import { LogoMark } from "../Logo";
import { Reveal } from "../Reveal";
import { IconArrow, IconInstagram, IconTikTok } from "../Icons";

export function About() {
  const { coach } = site;
  return (
    <section id="sobre-alex" className="bg-paper py-24 text-black sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <Reveal className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-ink">
            <Image
              src={site.coach.photo}
              alt={`${coach.name}, ${coach.roles.join(" y ")}`}
              fill
              sizes="(min-width: 1024px) 600px, 100vw"
              className="object-cover object-[68%_center]"
            />
            <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/40 to-transparent" />
            <LogoMark className="absolute top-6 left-6 w-14 text-white/90" />
          </div>
          <div className="font-display absolute -right-2 -bottom-6 rounded-2xl bg-black px-6 py-5 text-white sm:-right-6">
            <p className="text-[10px] font-semibold tracking-[0.2em] text-white/50 uppercase not-italic">Trainer</p>
            <p className="text-2xl font-extrabold uppercase italic">Oficial Feynlab Perú</p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <p className="text-[11px] font-semibold tracking-[0.28em] text-black/45 uppercase">Sobre el coach</p>
          <h2 className="font-display mt-3 text-6xl leading-[0.88] font-extrabold uppercase italic sm:text-8xl">
            {coach.name}
          </h2>
          <ul className="mt-6 flex flex-wrap gap-2">
            {coach.roles.map((r) => (
              <li key={r} className="rounded-full border border-black/15 px-4 py-1.5 text-sm font-medium">
                {r}
              </li>
            ))}
          </ul>

          <div className="mt-8 max-w-lg space-y-4 text-lg leading-relaxed text-black/65">
            {coach.bio.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>

          {coach.message && (
            <blockquote className="font-display mt-8 border-l-2 border-black pl-5 text-2xl italic">
              “{coach.message}”
            </blockquote>
          )}

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={site.social.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full bg-black px-6 py-3.5 text-xs font-bold tracking-[0.12em] text-white uppercase transition hover:bg-black/80"
            >
              <IconTikTok className="size-4" />
              Sígueme en TikTok
              <IconArrow className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            {site.social.instagram && (
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-full border border-black/20 px-6 py-3.5 text-xs font-bold tracking-[0.12em] uppercase transition hover:border-black"
              >
                <IconInstagram className="size-4" />
                Instagram
              </a>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
