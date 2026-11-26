import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/config/site";
import { bonosOf, courses, getCourse, soles, statusLabel } from "@/content/courses";
import { courseMessage, waProps } from "@/lib/whatsapp";
import { PageShell } from "@/components/PageShell";
import { HexLights } from "@/components/HexLights";
import { StudentGallery } from "@/components/StudentGallery";
import { editionsFor } from "@/content/students";
import { ItemIcon } from "@/components/ItemIcons";
import { ScrollToTop } from "@/components/ScrollToTop";
import { IconArrow, IconCalendar, IconClock, IconPin, IconWhatsApp } from "@/components/Icons";

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/cursos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = getCourse(slug);
  if (!c) return {};
  const title = c.seo?.title ?? c.title;
  const description = c.seo?.description ?? c.description;
  return {
    title,
    description,
    alternates: { canonical: `/cursos/${c.slug}` },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      ...(c.images.flyer
        ? { images: [{ url: c.images.flyer, width: 1080, height: 1350, alt: `Flyer del curso ${c.title}` }] }
        : {}),
    },
  };
}

export default async function CoursePage({ params }: PageProps<"/cursos/[slug]">) {
  const { slug } = await params;
  const c = getCourse(slug);
  if (!c) notFound();

  const wa = waProps(courseMessage(c.title, c.dateLabel));
  const facts = [
    { icon: IconCalendar, k: "Fecha", v: c.dateLabel || "Por confirmar" },
    { icon: IconPin, k: "Lugar", v: c.location || c.modality },
    { icon: IconClock, k: "Duración", v: c.duration || "Por confirmar" },
  ];

  return (
    <PageShell>
      <ScrollToTop />
      <section className="relative overflow-hidden pb-20">
        {c.images.hero ? (
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[640px] [mask-image:linear-gradient(to_bottom,black_30%,transparent)]">
            <Image src={c.images.hero} alt="" fill priority sizes="100vw" className="object-cover opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/10" />
          </div>
        ) : (
          <HexLights className="pointer-events-none absolute inset-x-0 top-0 h-[420px] w-full opacity-15 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        )}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div>
          <Link href="/#cursos" className="text-xs font-semibold tracking-[0.2em] text-white/50 uppercase hover:text-white">
            ← Todos los cursos
          </Link>
          <p className="mt-10 flex w-fit rounded-full bg-white px-3 py-1 text-[10px] font-bold tracking-[0.2em] text-black uppercase">
            {statusLabel[c.status]}
          </p>
          <h1 className="font-display mt-5 max-w-4xl text-[44px] leading-[0.88] font-extrabold break-words uppercase italic sm:text-8xl">
            {c.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/65">{c.description}</p>

          <dl className="mt-12 grid gap-px overflow-hidden rounded-[28px] border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {facts.map(({ icon: Icon, k, v }) => (
              <div key={k} className="bg-ink p-6">
                <dt className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] text-white/60 uppercase">
                  <Icon className="size-4" /> {k}
                </dt>
                <dd className="font-display mt-2 text-2xl font-bold uppercase italic">{v}</dd>
              </div>
            ))}
            <div className="bg-white p-6 text-black">
              <dt className="text-[11px] font-semibold tracking-[0.2em] text-black/60 uppercase">
                {c.presalePrice ? "Preventa" : "Inversión"}
              </dt>
              <dd className="mt-1 flex items-baseline gap-3">
                <span className="font-display text-3xl font-extrabold italic">
                  {c.presalePrice ? soles(c.presalePrice) : c.price ? soles(c.price) : c.status === "proximamente" ? "Muy pronto" : "Consultar"}
                </span>
                {c.presalePrice && c.price && <s className="text-black/60">{soles(c.price)}</s>}
              </dd>
            </div>
          </dl>
          </div>
        </div>
      </section>

      <section className="bg-paper py-20 text-black">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.3fr_0.7fr] lg:px-8">
          <div className="space-y-14">
            {c.audience && (
              <Block title="¿Para quién es?">
                <p className="text-black/65">{c.audience}</p>
              </Block>
            )}

            {c.split && (
              <Block title="Metodología">
                <div className="flex h-16 overflow-hidden rounded-2xl text-sm font-bold tracking-[0.12em] uppercase">
                  <div
                    className="flex items-center justify-center rounded-l-2xl border border-r-0 border-black/15 px-3 text-black/70"
                    style={{ width: `${c.split.theory}%` }}
                  >
                    {c.split.theory}% teórico
                  </div>
                  <div className="flex flex-1 items-center justify-center bg-black text-white">
                    {c.split.practice}% práctico
                  </div>
                </div>
                <p className="mt-4 text-black/60">
                  El curso es 20% teórico y 80% práctico: la mayor parte del tiempo aplicas lo aprendido, guiado por Alex.
                </p>
              </Block>
            )}

            {c.incluye.length > 0 && (
              <Block title="Incluye">
                <ul className="divide-y divide-black/10 border-y border-black/10">
                  {c.incluye.map((it) => (
                    <li key={it} className="flex items-center gap-4 py-4 text-lg">
                      <ItemIcon text={it} className="size-6 text-black/70" />
                      {it}
                    </li>
                  ))}
                </ul>
              </Block>
            )}

            <Block title="Lo que aprenderás">
              {c.modules.length ? (
                <ol className="divide-y divide-black/10 border-y border-black/10">
                  {c.modules.map((m, i) => (
                    <li key={m} className="flex items-baseline gap-5 py-4 text-lg">
                      <span className="font-display w-8 shrink-0 font-bold text-black/55 italic">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {m}
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="text-black/50">
                  {c.status === "proximamente" ? "El temario se publicará muy pronto." : "El temario se publicará pronto. Escríbenos para recibirlo."}
                </p>
              )}
            </Block>

            {c.kit && (
              <Block title="Kit de regalo">
                <div className="overflow-hidden rounded-[28px] bg-ink p-7 text-white sm:p-9">
                  {c.images.kit && (
                    <div className="relative -mx-7 -mt-7 mb-7 aspect-[2/1] sm:-mx-9 sm:-mt-9">
                      <Image
                        src={c.images.kit}
                        alt={`${c.kit.title}: ${c.kit.items.join(", ")}`}
                        fill
                        sizes="(min-width: 1024px) 720px, 100vw"
                        className="object-contain"
                      />
                    </div>
                  )}
                  <p className="text-[11px] font-semibold tracking-[0.2em] text-white/60 uppercase">{c.kit.brand}</p>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {c.kit.items.map((it) => (
                      <li key={it} className="flex items-center gap-3 rounded-xl border border-white/10 px-4 py-3">
                        <ItemIcon text={it} className="size-5 text-white/80" />
                        {it}
                      </li>
                    ))}
                  </ul>
                  {c.kit.perks.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {c.kit.perks.map((p) => (
                        <span key={p} className="rounded-full bg-white px-4 py-2 text-sm font-bold text-black">
                          {p}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Block>
            )}

            {bonosOf(c).length > 0 && (
              <Block title="Bonos">
                <ul className="grid gap-3 sm:grid-cols-2">
                  {bonosOf(c).map((it) => (
                    <li
                      key={it}
                      className="group flex items-center gap-4 rounded-2xl border border-black/10 p-5 font-semibold transition hover:border-black"
                    >
                      <span className="grid h-12 min-w-12 shrink-0 place-items-center rounded-xl bg-black px-2.5 text-white transition group-hover:scale-105">
                        <ItemIcon text={it} className="size-6" />
                      </span>
                      {it}
                    </li>
                  ))}
                </ul>
              </Block>
            )}
          </div>

          <aside className="h-fit space-y-4 lg:sticky lg:top-28">
            {c.status === "proximamente" ? (
            <div className="rounded-[28px] bg-ink p-8 text-white">
              <p className="font-display text-3xl font-extrabold uppercase italic">Próximamente</p>
              <p className="mt-3 text-sm text-white/60">Este curso estará disponible muy pronto.</p>
              <Link
                href="/#cursos"
                className="group mt-7 flex items-center justify-center gap-2 rounded-full bg-white py-4 text-sm font-bold tracking-[0.12em] text-black uppercase transition hover:bg-white/85"
              >
                Ver cursos disponibles
                <IconArrow className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            ) : (
            <div className="rounded-[28px] bg-ink p-8 text-white">
              <p className="font-display text-3xl font-extrabold uppercase italic">Reserva tu cupo</p>
              <p className="mt-3 text-sm text-white/60">
                {c.dateLabel ? `${c.dateLabel} · ` : ""}
                {c.location ? `${site.address.street} · ${site.address.venue}, ${site.address.district}` : c.modality}. Escríbenos por WhatsApp y te
                confirmamos tu inscripción.
              </p>
              <a
                {...wa}
                className="mt-7 flex items-center justify-center gap-2 rounded-full bg-white py-4 text-sm font-bold tracking-[0.12em] text-black uppercase transition hover:bg-white/85"
              >
                <IconWhatsApp className="size-5" />
                Contáctate con un asesor
              </a>
              <div className="mt-6 border-t border-white/10 pt-5">
                <p className="text-[10px] font-semibold tracking-[0.2em] text-white/60 uppercase">Medios de pago</p>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {site.paymentMethods.map((m) => (
                    <li key={m} className="rounded-full border border-white/15 px-2.5 py-1 text-xs text-white/75">
                      {m}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-xs text-white/60">Consulta con tu asesor el monto de separación de tu cupo.</p>
              </div>
            </div>
            )}
          </aside>
        </div>
      </section>

      {editionsFor(c.slug).map((ed) => (
        <section key={ed.label} id="alumnos" className="bg-ink py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.28em] text-white/60 uppercase">{ed.label}</p>
                <h2 className="font-display mt-3 text-5xl leading-[0.9] font-extrabold uppercase italic sm:text-7xl">
                  Alumnos <span className="text-outline">certificados</span>
                </h2>
              </div>
              <p className="max-w-sm text-white/60">
                Fotos reales de la última edición: práctica en taller y entrega de certificados AF Academy{c.kit ? ` y ${c.kit.brand}` : ""}.
              </p>
            </div>
            <StudentGallery photos={ed.photos} label={ed.label} />
            <a
              {...wa}
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-bold tracking-[0.12em] text-black uppercase transition hover:bg-white/85"
            >
              <IconWhatsApp className="size-5" />
              Quiero ser el próximo certificado
            </a>
          </div>
        </section>
      ))}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            name: c.title,
            description: c.description,
            provider: { "@type": "Organization", name: site.name, sameAs: site.url },
            ...(c.startDate && c.location
              ? {
                  hasCourseInstance: {
                    "@type": "CourseInstance",
                    courseMode: "onsite",
                    startDate: c.startDate,
                    location: {
                      "@type": "Place",
                      name: site.address.venue || site.name,
                      address: {
                        "@type": "PostalAddress",
                        streetAddress: site.address.street,
                        addressLocality: site.address.district,
                        addressRegion: site.address.city,
                        addressCountry: "PE",
                      },
                    },
                  },
                }
              : {}),
            ...(c.presalePrice || c.price
              ? { offers: { "@type": "Offer", price: c.presalePrice ?? c.price, priceCurrency: "PEN", category: "Paid" } }
              : {}),
          }),
        }}
      />
    </PageShell>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display mb-6 text-4xl font-extrabold uppercase italic">{title}</h2>
      {children}
    </div>
  );
}
