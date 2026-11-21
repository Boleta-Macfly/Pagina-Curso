import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/config/site";
import { courses, getCourse, statusLabel } from "@/content/courses";
import { courseMessage, whatsappLink } from "@/lib/whatsapp";
import { PageShell } from "@/components/PageShell";
import { HexLights } from "@/components/HexLights";
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
    { icon: IconPin, k: "Modalidad", v: c.modality },
    { icon: IconClock, k: "Duración", v: c.duration || "Por confirmar" },
  ];

  return (
    <PageShell>
      <section className="relative overflow-hidden pb-20">
        <HexLights className="pointer-events-none absolute inset-x-0 top-0 h-[420px] w-full opacity-15 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link href="/#cursos" className="text-xs font-semibold tracking-[0.2em] text-white/50 uppercase hover:text-white">
            ← Todos los cursos
          </Link>
          <p className="mt-10 inline-flex rounded-full bg-white px-3 py-1 text-[10px] font-bold tracking-[0.2em] text-black uppercase">
            {statusLabel[c.status]}
          </p>
          <h1 className="font-display mt-5 max-w-4xl text-6xl leading-[0.88] font-extrabold uppercase italic sm:text-8xl">
            {c.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/65">{c.description}</p>

          <dl className="mt-12 grid gap-px overflow-hidden rounded-[28px] border border-white/10 bg-white/10 sm:grid-cols-4">
            {facts.map(({ icon: Icon, k, v }) => (
              <div key={k} className="bg-ink p-6">
                <dt className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] text-white/45 uppercase">
                  <Icon className="size-4" /> {k}
                </dt>
                <dd className="font-display mt-2 text-2xl font-bold uppercase italic">{v}</dd>
              </div>
            ))}
            <div className="bg-white p-6 text-black">
              <dt className="text-[11px] font-semibold tracking-[0.2em] text-black/45 uppercase">Inversión</dt>
              <dd className="font-display mt-2 text-2xl font-bold uppercase italic">
                {c.price ? `S/ ${c.price.toLocaleString("es-PE")}` : "Consultar"}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="bg-paper py-20 text-black">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.3fr_0.7fr] lg:px-8">
          <div className="space-y-12">
            {c.audience && <Block title="¿Para quién es?"><p className="text-black/65">{c.audience}</p></Block>}
            <Block title="Lo que aprenderás">
              {c.benefits.length ? (
                <ul className="space-y-3">{c.benefits.map((b) => <li key={b}>— {b}</li>)}</ul>
              ) : (
                <p className="text-black/50">El detalle del contenido se publicará pronto. Escríbenos para recibirlo.</p>
              )}
            </Block>
            {c.modules.length > 0 && (
              <Block title="Temario">
                <ol className="divide-y divide-black/10 border-y border-black/10">
                  {c.modules.map((m, i) => (
                    <li key={m} className="flex gap-5 py-4">
                      <span className="font-display font-bold text-black/35 italic">0{i + 1}</span>
                      {m}
                    </li>
                  ))}
                </ol>
              </Block>
            )}
          </div>

          <aside className="h-fit rounded-[28px] bg-ink p-8 text-white lg:sticky lg:top-28">
            <p className="font-display text-3xl font-extrabold uppercase italic">Reserva tu cupo</p>
            <p className="mt-3 text-sm text-white/60">
              Escríbenos por WhatsApp y te enviamos horarios, precio y forma de pago.
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
          }),
        }}
      />
    </PageShell>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display mb-5 text-4xl font-extrabold uppercase italic">{title}</h2>
      {children}
    </div>
  );
}
