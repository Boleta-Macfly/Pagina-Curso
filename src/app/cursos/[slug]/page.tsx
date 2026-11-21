import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/config/site";
import { bundle, courses, getCourse, soles, statusLabel } from "@/content/courses";
import { courseMessage, whatsappLink } from "@/lib/whatsapp";
import { PageShell } from "@/components/PageShell";
import { HexLights } from "@/components/HexLights";
import { IconArrow, IconCalendar, IconCap, IconClock, IconPin, IconWhatsApp } from "@/components/Icons";

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
    openGraph: { title: `${title} | ${site.name}`, description },
  };
}

export default async function CoursePage({ params }: PageProps<"/cursos/[slug]">) {
  const { slug } = await params;
  const c = getCourse(slug);
  if (!c) notFound();

  const wa = whatsappLink(courseMessage(c.title, c.dateLabel));
  const facts = [
    { icon: IconCalendar, k: "Fecha", v: c.dateLabel || "Por confirmar" },
    { icon: IconPin, k: "Lugar", v: c.location || c.modality },
    { icon: IconClock, k: "Duración", v: c.duration || "Por confirmar" },
  ];
  const inBundle = bundle.enabled && bundle.courses.includes(c.slug);

  return (
    <PageShell>
      <section className="relative overflow-hidden pb-20">
        {c.images.hero ? (
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[640px] [mask-image:linear-gradient(to_bottom,black_30%,transparent)]">
            <Image src={c.images.hero} alt="" fill priority sizes="100vw" className="object-cover opacity-35" />
          </div>
        ) : (
          <HexLights className="pointer-events-none absolute inset-x-0 top-0 h-[420px] w-full opacity-15 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        )}
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.25fr_0.75fr] lg:px-8">
          <div>
          <Link href="/#cursos" className="text-xs font-semibold tracking-[0.2em] text-white/50 uppercase hover:text-white">
            ← Todos los cursos
          </Link>
          <p className="mt-10 flex w-fit rounded-full bg-white px-3 py-1 text-[10px] font-bold tracking-[0.2em] text-black uppercase">
            {statusLabel[c.status]}
          </p>
          <h1 className="font-display mt-5 max-w-4xl text-6xl leading-[0.88] font-extrabold uppercase italic sm:text-8xl">
            {c.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/65">{c.description}</p>

          <dl className="mt-12 grid gap-px overflow-hidden rounded-[28px] border border-white/10 bg-white/10 sm:grid-cols-2">
            {facts.map(({ icon: Icon, k, v }) => (
              <div key={k} className="bg-ink p-6">
                <dt className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] text-white/45 uppercase">
                  <Icon className="size-4" /> {k}
                </dt>
                <dd className="font-display mt-2 text-2xl font-bold uppercase italic">{v}</dd>
              </div>
            ))}
            <div className="bg-white p-6 text-black">
              <dt className="text-[11px] font-semibold tracking-[0.2em] text-black/45 uppercase">
                {c.presalePrice ? "Preventa" : "Inversión"}
              </dt>
              <dd className="mt-1 flex items-baseline gap-3">
                <span className="font-display text-3xl font-extrabold italic">
                  {c.presalePrice ? soles(c.presalePrice) : c.price ? soles(c.price) : "Consultar"}
                </span>
                {c.presalePrice && c.price && <s className="text-black/40">{soles(c.price)}</s>}
              </dd>
            </div>
          </dl>
          </div>

          {c.images.flyer && (
            <figure className="mx-auto w-full max-w-sm lg:mt-16">
              <a
                href={c.images.flyer}
                target="_blank"
                rel="noopener noreferrer"
                className="group block overflow-hidden rounded-[24px] border border-white/10 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]"
              >
                <Image
                  src={c.images.flyer}
                  alt={`Flyer del curso ${c.title}: ${c.dateLabel}, ${c.location}, preventa ${c.presalePrice ? soles(c.presalePrice) : ""}`}
                  width={1080}
                  height={1350}
                  sizes="(min-width: 1024px) 380px, 90vw"
                  className="transition duration-700 group-hover:scale-[1.03]"
                />
              </a>
              <figcaption className="mt-4 flex gap-2">
                <a
                  href={c.images.flyer}
                  download
                  className="flex-1 rounded-full bg-white py-3 text-center text-xs font-bold tracking-[0.12em] text-black uppercase transition hover:bg-white/85"
                >
                  Descargar flyer
                </a>
                <a
                  href={whatsappLink(`Mira este curso de AF Academy: ${c.title} (${c.dateLabel}) ${site.url}/cursos/${c.slug}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 rounded-full border border-white/20 py-3 text-center text-xs font-bold tracking-[0.12em] uppercase transition hover:border-white"
                >
                  Compartir
                </a>
              </figcaption>
            </figure>
          )}
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

            <Block title="Lo que aprenderás">
              {c.modules.length ? (
                <ol className="divide-y divide-black/10 border-y border-black/10">
                  {c.modules.map((m, i) => (
                    <li key={m} className="flex items-baseline gap-5 py-4 text-lg">
                      <span className="font-display w-8 shrink-0 font-bold text-black/35 italic">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {m}
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="text-black/50">El temario se publicará pronto. Escríbenos para recibirlo.</p>
              )}
            </Block>

            {c.kit && (
              <Block title="Kit para tus primeros servicios">
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
                  <p className="text-[11px] font-semibold tracking-[0.2em] text-white/45 uppercase">{c.kit.brand}</p>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {c.kit.items.map((it) => (
                      <li key={it} className="flex items-center gap-3 rounded-xl border border-white/10 px-4 py-3">
                        <span className="size-1.5 shrink-0 rounded-full bg-white" />
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

            {c.includes.length > 0 && (
              <Block title="También incluye">
                <ul className="grid gap-3 sm:grid-cols-3">
                  {c.includes.map((it) => (
                    <li key={it} className="flex items-center gap-3 rounded-2xl border border-black/10 p-5 font-semibold">
                      <IconCap className="size-5 shrink-0" />
                      {it}
                    </li>
                  ))}
                </ul>
              </Block>
            )}
          </div>

          <aside className="h-fit space-y-4 lg:sticky lg:top-28">
            <div className="rounded-[28px] bg-ink p-8 text-white">
              <p className="font-display text-3xl font-extrabold uppercase italic">Reserva tu cupo</p>
              <p className="mt-3 text-sm text-white/60">
                {c.dateLabel ? `${c.dateLabel} · ` : ""}
                {c.location || c.modality}. Escríbenos por WhatsApp y te confirmamos tu inscripción.
              </p>
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 flex items-center justify-center gap-2 rounded-full bg-white py-4 text-sm font-bold tracking-[0.12em] text-black uppercase transition hover:bg-white/85"
              >
                <IconWhatsApp className="size-5" />
                Inscribirme
              </a>
              <Link
                href="/#contacto"
                className="group mt-3 flex items-center justify-center gap-2 rounded-full border border-white/20 py-4 text-sm font-bold tracking-[0.12em] uppercase transition hover:border-white"
              >
                Solicitar información
                <IconArrow className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            {inBundle && (
              <div className="rounded-[28px] border-2 border-black p-6">
                <p className="text-[11px] font-semibold tracking-[0.2em] text-black/45 uppercase">{bundle.title}</p>
                <p className="font-display mt-1 text-3xl font-extrabold italic">{soles(bundle.price)}</p>
                <p className="text-sm text-black/60">Cerámico + PPF · Ahorra {soles(bundle.savings)}</p>
              </div>
            )}
          </aside>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            name: c.title,
            description: c.description,
            provider: { "@type": "Organization", name: site.name, sameAs: site.url },
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
