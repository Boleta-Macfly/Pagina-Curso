import Image from "next/image";
import { brands } from "@/content/media";
import { LogoMark } from "../Logo";

/** Franja animada con los logos de las marcas aliadas. */
export function Brands() {
  const row = [...brands, ...brands, ...brands, ...brands];
  return (
    <section id="marcas" aria-label="Marcas con las que trabajamos" className="overflow-hidden bg-paper py-8 text-black">
      <div className="flex w-max animate-marquee items-center gap-16 hover:[animation-play-state:paused]">
        {[...row, ...row].map((b, i) => (
          <span key={i} className="flex items-center gap-16" aria-hidden={i >= brands.length || undefined}>
            <Image
              src={b.logo.dark}
              alt={i < brands.length ? b.name : ""}
              width={b.logo.width}
              height={b.logo.height}
              sizes="240px"
              className={`w-auto ${
                b.logo.height / b.logo.width < 0.2 ? "h-6 sm:h-8" : b.logo.height / b.logo.width > 0.6 ? "h-16 sm:h-20" : "h-12 sm:h-14"
              }`}
            />
            <LogoMark className="h-4 w-auto text-black/20" />
          </span>
        ))}
      </div>
    </section>
  );
}
