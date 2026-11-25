import Link from "next/link";
import { site } from "@/config/site";
import { courses } from "@/content/courses";
import { brands, faqs, testimonials } from "@/content/media";
import { advisorLink, waProps, waitlistMessage } from "@/lib/whatsapp";
import { HexLights } from "../HexLights";
import { Logo, LogoMark } from "../Logo";
import { Reveal } from "../Reveal";
import { WhatsAppForm } from "../WhatsAppForm";
import { IconChevron, IconTikTok, IconWhatsApp } from "../Icons";

/* ---------- AF Academy Online (lista de espera) ---------- */
export function OnlineWaitlist() {
  return (
    <section className="grain relative overflow-hidden bg-ink py-24 sm:py-32">
      <HexLights className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.12] [mask-image:radial-gradient(ellipse_at_right,black,transparent_70%)]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <Reveal>
          <span className="inline-flex rounded-full border border-white/20 px-3 py-1 text-[10px] font-bold tracking-[0.2em] uppercase">
            Próximamente
          </span>
          <h2 className="font-display mt-5 text-5xl leading-[0.9] font-extrabold uppercase italic sm:text-7xl">
            AF Academy
            <br />
            <span className="text-outline">Online</span>
          </h2>
          <p className="mt-6 max-w-md text-lg text-white/60">
            Estamos preparando cursos online para que aprendas desde cualquier lugar. Déjanos tus datos y sé de los
            primeros en enterarte.
          </p>
        </Reveal>
        <Reveal delay={120} className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur sm:p-9">
          <p className="font-display mb-5 text-2xl font-bold uppercase italic">Únete a la lista de espera</p>
          <WhatsAppForm
            intro={waitlistMessage}
            submitLabel="Quiero enterarme primero"
          />
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Testimonios (solo se muestra si hay testimonios reales) ---------- */
export function Testimonials() {
  if (testimonials.length === 0) return null;
  return (
    <section id="testimonios" className="bg-paper py-24 text-black sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-5xl font-extrabold uppercase italic sm:text-7xl">Alumnos AF</h2>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="rounded-[28px] bg-ink p-8 text-white">
              <blockquote className="text-white/80">“{t.text}”</blockquote>
              <figcaption className="mt-6 font-semibold">
                {t.name} <span className="block text-sm font-normal text-white/50">{t.course}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Preguntas frecuentes ---------- */
export function Faq() {
  const list = faqs.filter((f) => f.a);
  return (
    <section id="preguntas" className="bg-paper py-24 text-black sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <Reveal>
          <p className="text-[11px] font-semibold tracking-[0.28em] text-black/45 uppercase">Dudas</p>
          <h2 className="font-display mt-3 text-5xl leading-[0.9] font-extrabold uppercase italic sm:text-7xl">
            Preguntas <span className="text-outline-dark">frecuentes</span>
          </h2>
        </Reveal>
        <div className="divide-y divide-black/10 border-y border-black/10">
          {list.map((f) => (
            <details key={f.q} className="group py-2">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-semibold">
                {f.q}
                <span className="grid size-9 shrink-0 place-items-center rounded-full border border-black/15 transition group-open:rotate-180 group-open:bg-black group-open:text-white">
                  <IconChevron className="size-4" />
                </span>
              </summary>
              <p className="max-w-2xl pb-6 leading-relaxed text-black/60">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Contacto ---------- */
export function Contact() {
  return (
    <section id="contacto" className="relative overflow-hidden bg-ink py-24 sm:py-32">
      <LogoMark className="pointer-events-none absolute -right-24 bottom-0 w-[700px] text-white/[0.03]" />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <Reveal>
          <h2 className="font-display text-6xl leading-[0.86] font-extrabold uppercase italic sm:text-8xl">
            ¿Listo para
            <br />
            <span className="text-outline">empezar?</span>
          </h2>
          <p className="mt-6 max-w-md text-lg text-white/60">
            Escríbenos y te ayudamos a elegir el curso ideal para ti.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              {...waProps()}
              className="inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-bold tracking-[0.12em] text-black uppercase transition hover:bg-white/85"
            >
              <IconWhatsApp className="size-5" />
              Hablar por WhatsApp
            </a>
            <a
              href={site.social.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full border border-white/20 px-7 py-4 text-sm font-bold tracking-[0.12em] uppercase transition hover:border-white"
            >
              <IconTikTok className="size-5" />
              {site.coach.handle}
            </a>
          </div>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {site.advisors.map((a) => (
              <li key={a.phone}>
                <a
                  href={advisorLink(a)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-2xl border border-white/10 p-4 transition hover:border-white"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-wa text-white">
                    <IconWhatsApp className="size-5" />
                  </span>
                  <span className="text-sm">
                    <span className="block text-[10px] font-bold tracking-[0.18em] text-white/45 uppercase">{a.channel}</span>
                    <span className="block font-semibold">{a.name}</span>
                    <span className="block text-white/60">{a.display}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <dl className="mt-12 grid gap-5 text-sm sm:grid-cols-2">
            {site.email && <Info k="Correo" v={site.email} />}
            {site.location && <Info k="Ubicación" v={site.location} />}
            {site.hours && <Info k="Horario" v={site.hours} />}
          </dl>
        </Reveal>
        <Reveal delay={120} className="rounded-[28px] bg-white p-6 text-black sm:p-9">
          <p className="font-display mb-5 text-2xl font-bold uppercase italic">Envíanos tu consulta</p>
          <WhatsAppForm
            intro="¡Hola, {asesor}! Te escribo desde la página de AF Academy."
            submitLabel="Enviar por WhatsApp"
            withMessage
            tone="light"
          />
        </Reveal>
      </div>
    </section>
  );
}

function Info({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="text-[11px] font-semibold tracking-[0.2em] text-white/40 uppercase">{k}</dt>
      <dd className="mt-1 text-white/85">{v}</dd>
    </div>
  );
}

/* ---------- Footer ---------- */
export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <Logo variant="stacked" className="text-[30px]" />
          <p className="mt-6 max-w-xs text-sm text-white/50">{site.description}</p>
        </div>
        <FooterCol title="Cursos" items={courses.map((c) => ({ href: `/cursos/${c.slug}`, label: c.title }))} />
        <FooterCol title="Marcas" items={brands.map((b) => ({ href: "/#marcas", label: b.name }))} />
        <FooterCol
          title="Academia"
          items={[
            { href: "/#videos", label: "Videos" },
            { href: "/#sobre-alex", label: "Sobre Alex" },
            { href: "/#preguntas", label: "Preguntas frecuentes" },
            { href: "/#contacto", label: "Contacto" },
          ]}
        />
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-xs text-white/40 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
          <p>© 2026 {site.name}. Todos los derechos reservados.</p>
          <p className="flex gap-5">
            <Link href="/privacidad" className="hover:text-white">Política de privacidad</Link>
            <Link href="/terminos" className="hover:text-white">Términos y condiciones</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <div>
      <p className="text-[11px] font-semibold tracking-[0.2em] text-white/40 uppercase">{title}</p>
      <ul className="mt-4 space-y-2.5 text-sm">
        {items.map((i) => (
          <li key={i.label}>
            <Link href={i.href} className="text-white/70 transition hover:text-white">
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- Botón flotante de WhatsApp ---------- */
export function WhatsAppFloat() {
  return (
    <a
      {...waProps()}
      aria-label="Escríbenos por WhatsApp"
      className="group fixed right-4 bottom-4 z-40 flex items-center gap-2 rounded-full bg-wa p-4 text-white shadow-[0_15px_40px_-10px_rgba(37,211,102,0.6)] transition hover:scale-105 sm:right-6 sm:bottom-6"
    >
      <IconWhatsApp className="size-6" />
      <span className="hidden max-w-0 overflow-hidden text-sm font-bold whitespace-nowrap transition-all duration-500 group-hover:max-w-40 sm:inline">
        ¿Hablamos?
      </span>
    </a>
  );
}
