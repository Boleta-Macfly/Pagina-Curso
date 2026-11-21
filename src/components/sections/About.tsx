import { site } from "@/config/site";
import { LogoMark } from "../Logo";
import { Reveal } from "../Reveal";
import { IconArrow, IconTikTok } from "../Icons";

export function About() {
  const { coach } = site;
  return (
    <section id="sobre-alex" className="bg-paper py-24 text-black sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <Reveal className="relative">
          {/* Reemplazar por foto real del coach */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-ink">
            <LogoMark className="absolute top-1/2 left-1/2 w-2/3 -translate-x-1/2 -translate-y-1/2 text-white/[0.07]" />
            <p className="absolute bottom-6 left-6 text-[11px] tracking-[0.2em] text-white/35 uppercase">
              Foto de Alex en taller · pendiente
            </p>
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

          <p className="mt-8 max-w-lg text-lg leading-relaxed text-black/65">
            {coach.bio ||
              "Alex dirige AF Detailing y forma a nuevos detailers en PPF y tratamiento cerámico. En sus videos comparte el paso a paso de instalaciones reales, y en AF Academy lo enseña en persona."}
          </p>

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
          </div>
        </Reveal>
      </div>
    </section>
  );
}
