"use client";

import { useInView } from "@/hooks/useInView";

const CONSTRUCTION_STEPS = [
  {
    title: "Estructura de madera tratada serrana",
    image: "/images/en-obra/estructura-madera.jpeg",
    imageAlt: "Estructura de madera tratada en obra bajo cielo despejado",
  },
  {
    title: "Montaje artesanal en obra",
    image: "/images/en-obra/montaje-artesanal.png",
    imageAlt: "Trabajadores montando estructura de techo alpino en obra",
  },
  {
    title: "Control de calidad en terreno",
    image: "/images/en-obra/control-calidad.png",
    imageAlt: "Operario con casco revisando estructura en terreno",
  },
  {
    title: "Madera con tratamiento serrano",
    image: "/images/en-obra/madera-tratamiento.png",
    imageAlt: "Detalle de tablas de madera con tratamiento serrano",
  },
];

const STATS = [
  { value: "+50", label: "Obras entregadas" },
  { value: "100%", label: "Pagos por avance" },
  { value: "10-12", label: "Semanas promedio de obra" },
  { value: "2", label: "Provincias de alcance (Córdoba y Norte de San Luis)" },
];

function ConstructionCard({ step, visible, index }) {
  return (
    <article
      className={`transition-all duration-700 ${
        visible ? "animate-fade-in-up opacity-100" : "opacity-0"
      }`}
      style={{ animationDelay: visible ? `${0.1 + index * 0.08}s` : undefined }}
    >
      <div className="group relative h-80 overflow-hidden rounded-2xl bg-zinc-100 sm:h-96">
        <img
          src={step.image}
          alt={step.imageAlt}
          width={600}
          height={800}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-2/5 bg-gradient-to-t from-black/75 via-black/35 to-transparent"
          aria-hidden
        />

        <p className="absolute bottom-0 left-0 right-0 z-20 p-6 text-sm font-semibold leading-snug tracking-tight text-white sm:text-base">
          {step.title}
        </p>
      </div>
    </article>
  );
}

function StatsBlock({ visible }) {
  return (
    <div
      className={`mt-10 rounded-2xl border border-zinc-200/80 bg-white p-8 shadow-sm transition-all duration-700 sm:mt-12 ${
        visible ? "animate-fade-in-up opacity-100" : "opacity-0"
      }`}
      style={{ animationDelay: visible ? "0.45s" : undefined }}
    >
      <ul className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-6">
        {STATS.map((stat) => (
          <li key={stat.label} className="text-center lg:text-left">
            <p className="text-3xl font-bold tracking-tight text-emerald-700 sm:text-4xl">
              {stat.value}
            </p>
            <p className="mt-1.5 text-sm leading-snug text-zinc-600 sm:text-[15px]">
              {stat.label}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function EnObra() {
  const { ref, inView } = useInView();

  return (
    <section
      ref={ref}
      id="en-obra"
      className="relative overflow-hidden bg-[#fbfbfa] px-5 py-24 text-zinc-900 sm:px-8 sm:py-32 lg:px-12"
      aria-labelledby="en-obra-heading"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_80%_20%,rgba(16,185,129,0.04),transparent_55%)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <header
          className={`mx-auto max-w-3xl text-center transition-all duration-700 ${
            inView ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <p className="mb-5 inline-flex rounded-full border border-[#c5a073]/30 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c5a073] sm:text-xs">
            En obra
          </p>
          <h2
            id="en-obra-heading"
            className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl md:text-5xl"
          >
            Nuestro recorrido
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg">
            Buscamos ofrecer estructura y orden 
          </p>
        </header>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
          {CONSTRUCTION_STEPS.map((step, i) => (
            <ConstructionCard
              key={step.title}
              step={step}
              visible={inView}
              index={i}
            />
          ))}
        </div>

        <StatsBlock visible={inView} />
      </div>
    </section>
  );
}
