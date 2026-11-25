"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { courses, statusLabel } from "@/content/courses";
import { brands } from "@/content/media";
import { waProps } from "@/lib/whatsapp";
import { Logo } from "./Logo";
import { IconArrow, IconCap, IconChevron, IconClose, IconMenu } from "./Icons";

type MenuKey = "cursos" | "marcas" | null;

const links = [
  { href: "/#videos", label: "Videos" },
  { href: "/#sobre-alex", label: "Sobre Alex" },
  { href: "/#preguntas", label: "Preguntas" },
  { href: "/#contacto", label: "Contacto" },
];

export function Header() {
  const [open, setOpen] = useState<MenuKey>(null);
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobile(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
  }, [mobile]);

  const enter = (key: MenuKey) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(key);
  };
  const leave = () => {
    closeTimer.current = setTimeout(() => setOpen(null), 160);
  };

  return (
    <header
      ref={navRef}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled || open ? "bg-ink/90 backdrop-blur-xl" : "bg-transparent"
      }`}
      onMouseLeave={leave}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-4 transition-[height] duration-500 sm:px-6 lg:px-8 ${
          scrolled ? "h-16" : "h-20"
        }`}
      >
        <Link href="/" className="text-[19px] sm:text-[21px]" aria-label="AF Academy, inicio">
          <Logo />
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
          {(["cursos", "marcas"] as const).map((key) => (
            <button
              key={key}
              type="button"
              aria-expanded={open === key}
              aria-controls={`menu-${key}`}
              onMouseEnter={() => enter(key)}
              onClick={(e) => {
                e.stopPropagation();
                setOpen(open === key ? null : key);
              }}
              className={`group flex items-center gap-1 rounded-full px-4 py-2 text-[13px] font-semibold tracking-[0.14em] uppercase transition-colors ${
                open === key ? "text-white" : "text-white/70 hover:text-white"
              }`}
            >
              {key === "cursos" ? "Cursos" : "Marcas"}
              <IconChevron
                className={`size-3.5 transition-transform duration-300 ${open === key ? "rotate-180" : ""}`}
              />
            </button>
          ))}
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onMouseEnter={() => enter(null)}
              className="rounded-full px-4 py-2 text-[13px] font-semibold tracking-[0.14em] text-white/70 uppercase transition-colors hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            {...waProps()}
            className="hidden rounded-full bg-white px-5 py-2.5 text-[13px] font-bold tracking-[0.1em] text-black uppercase transition hover:bg-white/85 active:scale-[0.97] sm:inline-flex"
          >
            Inscríbete
          </a>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full border border-white/15 lg:hidden"
            aria-label="Abrir menú"
            aria-expanded={mobile}
            onClick={() => setMobile(true)}
          >
            <IconMenu className="size-5" />
          </button>
        </div>
      </div>

      {/* Mega menú (escritorio) */}
      <div
        className={`absolute inset-x-0 top-full hidden origin-top bg-white text-black shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)] transition-all duration-300 lg:block ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
        }`}
        onMouseEnter={() => enter(open)}
      >
        <div id="menu-cursos" hidden={open !== "cursos"} className="mx-auto max-w-7xl px-8 py-10">
          <div className="grid grid-cols-4 gap-8">
            {courses.map((c) => (
              <Link
                key={c.slug}
                href={`/cursos/${c.slug}`}
                onClick={() => setOpen(null)}
                className="group flex gap-3 rounded-xl p-3 -m-3 transition-colors hover:bg-black/[0.04]"
              >
                <IconCap className="mt-0.5 size-5 shrink-0" />
                <span>
                  <span className="block font-semibold leading-snug">{c.title}</span>
                  <span className="mt-1 block text-sm text-black/55">{c.short}</span>
                  <span className="mt-2 inline-block text-[11px] font-semibold tracking-[0.12em] text-black/45 uppercase">
                    {c.dateLabel || statusLabel[c.status]}{c.location ? ` · ${c.location}` : ` · ${c.modality}`}
                  </span>
                </span>
              </Link>
            ))}
            <a
              {...waProps()}
              className="group flex gap-3 rounded-xl bg-black p-5 text-white"
            >
              <span>
                <span className="block font-semibold">Solicitar información</span>
                <span className="mt-1 block text-sm text-white/60">Te asesoramos para elegir tu curso.</span>
                <IconArrow className="mt-3 size-5 transition-transform group-hover:translate-x-1" />
              </span>
            </a>
          </div>
        </div>

        <div id="menu-marcas" hidden={open !== "marcas"} className="mx-auto max-w-7xl px-8 py-10">
          <p className="mb-6 text-[11px] font-semibold tracking-[0.2em] text-black/45 uppercase">
            Marcas con las que trabaja la academia
          </p>
          <div className="grid grid-cols-3 gap-6">
            {brands.map((b) => (
              <Link
                key={b.name}
                href="/#marcas"
                onClick={() => setOpen(null)}
                className="group flex h-36 flex-col items-center justify-center gap-3 rounded-2xl border border-black/10 px-6 transition hover:border-black hover:shadow-lg"
              >
                <Image
                  src={b.logo.dark}
                  alt={b.name}
                  width={b.logo.width}
                  height={b.logo.height}
                  sizes="220px"
                  className={`w-auto transition group-hover:scale-105 ${b.logo.height / b.logo.width < 0.2 ? "h-7" : "h-16"}`}
                />
                {b.note && <span className="text-center text-xs text-black/50">{b.note}</span>}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      <div
        className={`fixed inset-0 z-50 flex flex-col bg-ink transition-opacity duration-300 lg:hidden ${
          mobile ? "visible opacity-100" : "invisible opacity-0"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Menú"
      >
        <div className="flex h-20 items-center justify-between px-4 sm:px-6">
          <Logo className="text-[19px]" />
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full border border-white/15"
            aria-label="Cerrar menú"
            onClick={() => setMobile(false)}
          >
            <IconClose className="size-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 pb-10 sm:px-6">
          <MobileGroup title="Cursos">
            {courses.map((c) => (
              <Link
                key={c.slug}
                href={`/cursos/${c.slug}`}
                onClick={() => setMobile(false)}
                className="block py-3 text-white/80"
              >
                {c.title}
                <span className="block text-xs text-white/45">{c.dateLabel || statusLabel[c.status]}</span>
              </Link>
            ))}
          </MobileGroup>
          <MobileGroup title="Marcas">
            {brands.map((b) => (
              <Link key={b.name} href="/#marcas" onClick={() => setMobile(false)} className="flex items-center py-3" aria-label={b.name}>
                <Image
                  src={b.logo.light}
                  alt={b.name}
                  width={b.logo.width}
                  height={b.logo.height}
                  sizes="180px"
                  className={`w-auto opacity-85 ${b.logo.height / b.logo.width < 0.2 ? "h-4" : "h-9"}`}
                />
              </Link>
            ))}
          </MobileGroup>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMobile(false)}
              className="font-display block border-b border-white/10 py-5 text-2xl font-bold uppercase italic"
            >
              {l.label}
            </Link>
          ))}
          <a
            {...waProps()}
            className="mt-8 flex justify-center rounded-full bg-white py-4 font-bold tracking-[0.1em] text-black uppercase"
          >
            Inscríbete ahora
          </a>
        </div>
      </div>
    </header>
  );
}

function MobileGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details className="group border-b border-white/10">
      <summary className="font-display flex cursor-pointer list-none items-center justify-between py-5 text-2xl font-bold uppercase italic">
        {title}
        <IconChevron className="size-5 transition-transform group-open:rotate-180" />
      </summary>
      <div className="pb-4">{children}</div>
    </details>
  );
}
