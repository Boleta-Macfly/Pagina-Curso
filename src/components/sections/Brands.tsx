import { brands } from "@/content/media";
import { LogoMark } from "../Logo";

export function Brands() {
  const row = [...brands, ...brands, ...brands, ...brands];
  return (
    <section id="marcas" aria-label="Marcas con las que trabajamos" className="overflow-hidden bg-paper py-8 text-black">
      <div className="flex w-max animate-marquee items-center gap-14 hover:[animation-play-state:paused]">
        {[...row, ...row].map((b, i) => (
          <span key={i} className="flex items-center gap-14" aria-hidden={i >= brands.length}>
            {/* Cuando lleguen los logos: <Image src={b.logo} .../> */}
            <span className="font-display text-3xl font-extrabold whitespace-nowrap uppercase italic sm:text-4xl">
              {b.name}
            </span>
            <LogoMark className="h-4 w-auto text-black/25" />
          </span>
        ))}
      </div>
    </section>
  );
}
