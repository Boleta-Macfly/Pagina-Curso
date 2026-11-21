import { HexLights } from "../HexLights";
import { Reveal } from "../Reveal";
import { IconPolish, IconShield, IconSpark } from "../Icons";

const items = [
  {
    n: "01",
    title: "PPF",
    sub: "Paint Protection Film",
    text: "Precortes manuales y con plotter, manejo del software e instalación en piezas complejas, interior y exterior.",
    icon: IconShield,
  },
  {
    n: "02",
    title: "Cerámico",
    sub: "Recubrimiento cerámico",
    text: "Descontaminación química y manual, pH de shampoos, prelavado, preparación de superficie y aplicación del recubrimiento.",
    icon: IconSpark,
  },
  {
    n: "03",
    title: "Corrección",
    sub: "Incluido en el curso de Cerámico",
    text: "Eliminación de imperfecciones de la pintura con el método de pulido en 3 etapas.",
    icon: IconPolish,
  },
];

export function Disciplines() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-[11px] font-semibold tracking-[0.28em] text-white/45 uppercase">Lo que aprenderás</p>
          <h2 className="font-display mt-3 max-w-3xl text-5xl leading-[0.9] font-extrabold uppercase italic sm:text-7xl">
            Técnica de <span className="text-outline">taller real</span>
          </h2>
        </Reveal>

        <div className="mt-14 flex flex-col gap-4 lg:h-[460px] lg:flex-row">
          {items.map(({ n, title, sub, text, icon: Icon }, i) => (
            <article
              key={title}
              className="group relative flex-1 overflow-hidden rounded-[28px] border border-white/10 bg-ink-2 transition-[flex-grow] duration-700 ease-[var(--ease-out-expo)] lg:hover:flex-[1.9]"
            >
              <Reveal delay={i * 100} className="h-full">
              <HexLights className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-700 [mask-image:linear-gradient(to_bottom,black,transparent_75%)] group-hover:opacity-25" />
              <div className="relative flex h-full flex-col p-8">
                <div className="flex items-center justify-between">
                  <span className="grid size-12 place-items-center rounded-2xl bg-white text-black">
                    <Icon className="size-6" />
                  </span>
                  <span className="font-display text-sm font-bold text-white/40 italic">{n}</span>
                </div>
                <div className="mt-16 lg:mt-auto">
                  <p className="text-[11px] font-semibold tracking-[0.2em] text-white/45 uppercase">{sub}</p>
                  <h3 className="font-display mt-2 text-5xl font-extrabold uppercase italic">{title}</h3>
                  <p className="mt-4 max-w-sm text-white/60 transition-all duration-700 lg:max-h-0 lg:opacity-0 lg:group-hover:max-h-40 lg:group-hover:opacity-100">
                    {text}
                  </p>
                </div>
              </div>
              </Reveal>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
