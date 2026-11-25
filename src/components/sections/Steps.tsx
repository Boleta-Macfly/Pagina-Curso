import { Reveal } from "../Reveal";

const steps = [
  { t: "Elige tu curso", d: "Revisa los programas y fechas disponibles." },
  { t: "Escríbenos", d: "Solicita información por WhatsApp con un clic." },
  { t: "Recibe asesoría", d: "Resolvemos tus dudas y te recomendamos el curso ideal." },
  { t: "Confirma tu cupo", d: "Reserva tu lugar y recibe los detalles del curso." },
  { t: "Empieza a aprender", d: "Accede a la capacitación práctica en taller." },
];

export function Steps() {
  return (
    <section className="bg-paper py-24 text-black sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-[11px] font-semibold tracking-[0.28em] text-black/60 uppercase">Inscripción</p>
          <h2 className="font-display mt-3 text-5xl leading-[0.9] font-extrabold uppercase italic sm:text-7xl">
            5 pasos <span className="text-outline-dark">y listo</span>
          </h2>
        </Reveal>
        <ol className="mt-14 grid gap-px overflow-hidden rounded-[28px] border border-black/10 bg-black/10 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((s, i) => (
            <Reveal key={s.t} as="li" delay={i * 80} className="group bg-paper p-7 transition-colors duration-500 hover:bg-black hover:text-white">
              <span className="font-display text-6xl font-extrabold italic text-black/15 transition-colors group-hover:text-white/25">
                {i + 1}
              </span>
              <h3 className="font-display mt-6 text-2xl font-bold uppercase italic">{s.t}</h3>
              <p className="mt-2 text-sm text-black/55 transition-colors group-hover:text-white/60">{s.d}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
