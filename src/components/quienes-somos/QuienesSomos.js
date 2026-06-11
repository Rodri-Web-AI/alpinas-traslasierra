"use client";

import { useInView } from "@/hooks/useInView";
import AttributeCard from "./AttributeCard";

const SECTION_HEADER = {
  tag: "Precios",
  title: "Alpinas Traslasierra, la mejor opción para tu futura cabaña",
  description: (
    <>
      {"Especificamos tiempos, contratos, material de seguimiento y personalización garantizada para nuestros clientes con precios que rondan "}
      <span className="font-bold text-[#c5a073] text-lg bg-[#c5a073]/10 px-2 py-0.5 rounded-md">
      Desde USD 600/m²<span className="text-sm font-normal text-zinc-500"></span>
      </span>
    </>
  ),
};

const ATTRIBUTES = [
  {
    title: "Construcción 100% artesanal, pieza por pieza",
    description:
      "Cada cabaña se edifica en tu terreno con mano de obra propia especializada, desde la platea de hormigón hasta el último detalle de terminación. No usamos paneles prefabricados.",
  },
  {
    title: "Madera tratada antes del montaje",
    description:
      "Trabajamos con Pino, Eucalipto y Saligna. Toda la madera recibe tratamiento con impregnantes antes de instalarse: protección contra humedad, termitas, carcomas y hongos. No es una promesa, es parte estándar del proceso. Ninguna pieza se monta sin tratamiento previo. Opción de elegir materiales como Cedro (Impacta en el costo final)",
  },
  {
    title: "Alcance regional",
    description:
      "Operamos en todo el Valle de Traslasierra, Valle de Punilla y Norte de San Luis. ¿Tu localidad no está en la lista? Consultanos.",
  },
];

// ... (Tus imports y constantes se mantienen exactamente igual)

export default function QuienesSomos() {
  const { ref, inView } = useInView();

  return (
    <section
      ref={ref}
      id="quienes-somos" /* <--- Este es el ID clave que va a buscar el navegador */
      className="relative overflow-hidden bg-[#fbfbfa] px-5 py-24 text-zinc-900 sm:px-8 sm:py-32 lg:px-12"
      aria-labelledby="quienes-somos-heading"
    >
      {/* ... (Todo el resto del contenido de tu sección queda exactamente igual) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_10%_50%,rgba(16,185,129,0.03),transparent_55%)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div
            className={`transition-all duration-700 ${
              inView ? "animate-fade-in-up opacity-100" : "opacity-0"
            }`}
          >
            <p className="mb-5 inline-flex rounded-full border border-emerald-800/20 bg-emerald-500/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-800 sm:text-xs">
              {SECTION_HEADER.tag}
            </p>
            <h2
              id="quienes-somos-heading"
              className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl md:text-5xl"
            >
              {SECTION_HEADER.title}
            </h2>
            <div
              className="mt-6 h-px w-12 bg-gradient-to-r from-[#c5a073] to-[#c5a073]/30"
              aria-hidden
            />
            <p className="mt-6 text-base leading-relaxed text-zinc-600 sm:text-lg">
              {SECTION_HEADER.description}
            </p>
          </div>

          <ul className="flex flex-col gap-5 sm:gap-6" role="list">
            {ATTRIBUTES.map((attr, i) => (
              <li key={attr.title}>
                <AttributeCard
                  title={attr.title}
                  description={attr.description}
                  visible={inView}
                  index={i}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
