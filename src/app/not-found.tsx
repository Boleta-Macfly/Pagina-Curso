import Link from "next/link";
import { LogoMark } from "@/components/Logo";

export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center bg-ink px-4 text-center">
      <div>
        <LogoMark className="mx-auto w-28 text-white/80" />
        <p className="font-display mt-10 text-[120px] leading-none font-extrabold italic text-outline">404</p>
        <h1 className="font-display mt-2 text-3xl font-bold uppercase italic">Esta página no existe</h1>
        <p className="mt-3 text-white/55">Puede que el enlace haya cambiado o que el curso ya no esté disponible.</p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-white px-7 py-4 text-sm font-bold tracking-[0.12em] text-black uppercase"
        >
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
