"use client";

import Image from "next/image";
import { useInView } from "@/hooks/useInView";

const REAL_PROJECTS = [
  {
    id: 1,
    title: "Cabaña Alpina de Madera · Traslasierra",
    location: "Villa de Las Rosas, Córdoba",
    stages: [
      {
        title: "El terreno",
        description:
          "Relevamos tu lote, estudiamos la orientación y definimos juntos el alcance real de la obra.",
        image: "/images/obras-reales/obra-1/terreno.png",
      },
      {
        title: "Estructura y madera tratada",
        description:
          "Montaje artesanal pieza por pieza con madera tratada contra humedad y termitas. Cada cabaña se construye a mano, no es un prefabricado.",
        image: "/images/obras-reales/obra-1/estructura.jpeg",
      },
      {
        title: "Entrega final",
        description:
          "Cabaña terminada, probada y lista para habitar o rentar. Pagás solo por avance certificado: cada etapa documentada con fotos y partes de obra.",
        image: "/images/obras-reales/obra-1/final.jpg",
      },
    ],
  },
  {
    id: 2,
    title: "Alpina Ladrillo Visto · Traslasierra",
    location: "Villa de Las Rosas, Córdoba",
    stages: [
      {
        title: "Estructura y cerramientos",
        description:
          "Base de ladrillo, estructura de madera tratada y techo de chapa instalado. Avance documentado con partes de obra semanales para tu control total.",
        image: "/images/obras-reales/obra-2/estructura-avance.jpg",
      },
      {
        title: "Terminaciones interiores",
        description:
          "Revestimiento interior, aberturas colocadas y detalles finales. Terminaciones que garantizan confort térmico y durabilidad en el tiempo.",
        image: "/images/obras-reales/obra-2/interiores.jpeg",
      },
      {
        title: "Entrega final",
        description:
          "Alpina terminada con base de ladrillo visto, madera tratada y techo de chapa. Lista para habitar o poner en alquiler turístico de inmediato.",
        image: "/images/obras-reales/obra-2/final.jpeg",
      },
    ],
  },
  {
    id: 3,
    title: "Cabaña de Madera con Galería",
    location: "Traslasierra, Córdoba",
    stages: [
      {
        title: "Estructura y techado",
        description:
          "Montaje de estructura de madera tratada y vigas de techo. Cada pieza se coloca a mano con precisión y control de calidad.",
        image: "/images/obras-reales/obra-3/estructura-techo.jpg",
      },
      {
        title: "Revestimiento y aberturas",
        description:
          "Colocación de madera de revestimiento exterior y ventanas. La galería comienza a tomar forma con sus columnas estructurales.",
        image: "/images/obras-reales/obra-3/revestimiento.jpg",
      },
      {
        title: "Entrega final",
        description:
          "Cabaña terminada con galería cubierta, madera tratada y lista para disfrutar.",
        image: "/images/obras-reales/obra-3/final.jpeg",
      },
    ],
  },
  {
    id: 4,
    title: "Alpina con Base de Ladrillo",
    location: "Traslasierra, Córdoba",
    stages: [
      {
        title: "Estructura avanzada",
        description:
          "Base de ladrillo vista, estructura de madera tratada y techo de chapa instalado. Avance documentado con partes de obra semanales.",
        image: "/images/obras-reales/obra-4/cerramientos.jpeg",
      },
      {
        title: "Interior terminado",
        description:
          "Revestimiento interior en madera, aberturas colocadas y detalles finales. Confort térmico y durabilidad garantizada.",
        image: "/images/obras-reales/obra-4/cerramientos-2.jpeg",
      },
      {
        title: "Entrega final",
        description:
          "Alpina terminada con base de ladrillo visto, madera tratada y techo de chapa. Lista para habitar o poner en alquiler turístico.",
        image: "/images/obras-reales/obra-4/final.jpeg",
      },
    ],
  },
];

export default function ObrasReales() {
  const { ref, inView } = useInView();

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#faf8f5] py-24 sm:py-28"
    >
      {/* Fondos decorativos */}
      <div className="absolute left-[-120px] top-20 h-[280px] w-[280px] rounded-full bg-[#c5a073]/10 blur-3xl" />

      <div className="absolute bottom-0 right-[-120px] h-[260px] w-[260px] rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div
          className={`mx-auto max-w-3xl text-center transition-all duration-700 ${
            inView ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <p className="mb-5 inline-flex rounded-full border border-[#c5a073]/30 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-[#c5a073] sm:text-xs">
            Obras realizadas
          </p>

          <h2 className="text-3xl font-bold leading-[1.15] tracking-tight text-zinc-900 sm:text-4xl lg:text-[2.8rem]">
          Trabajos Realizados
          </h2>

          <p className="mt-5 text-base leading-relaxed text-zinc-600 sm:text-lg">
          Mostramos 4 proyectos en detalle. Tenemos +50 obras entregadas en toda la región. Pedinos más ejemplos por WhatsApp.
          </p>

          {/* Badge con el total de obras documentadas */}
          <div className="mt-6 inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.15em] text-emerald-800">
            {REAL_PROJECTS.length} {REAL_PROJECTS.length === 1 ? 'Obras recientes documentadas' : 'Obras recientes documentadas'}
          </div>
        </div>

        {/* Projects */}
        <div className="mt-16 space-y-20">
          {REAL_PROJECTS.map((project, projectIndex) => (
            <div
              key={project.id}
              className={`transition-all duration-700 ${
                inView ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{
                animationDelay: `${projectIndex * 150}ms`,
              }}
            >
              {/* Project Header */}
              <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight text-zinc-900">
                    {project.title}
                  </h3>

                  <p className="mt-2 text-sm text-zinc-500">
                    {project.location}
                  </p>
                </div>

                {/* Badge eliminado de acá */}
              </div>

              {/* Timeline */}
              <div className="flex gap-6 overflow-x-auto pb-4">
                {project.stages.map((stage, stageIndex) => (
                  <article
                    key={stage.title}
                    className="group relative min-w-[300px] max-w-[300px] overflow-hidden rounded-3xl border border-zinc-200/80 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
                  >
                    {/* Imagen */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={stage.image}
                        alt={stage.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="300px"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                      {/* Etapa */}
                      <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.15em] text-white backdrop-blur-sm">
                        Hito {stageIndex + 1}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h4 className="text-lg font-semibold tracking-tight text-zinc-900">
                        {stage.title}
                      </h4>

                      <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                        {stage.description}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Nota aclaratoria */}
        <div className={`mt-16 text-center transition-all duration-700 ${
            inView ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <p className="text-sm text-zinc-500 italic">
            Mostramos una selección de obras recientes. Contamos con +50 proyectos entregados en toda la región serrana.
          </p>
        </div>
      </div>
    </section>
  );
}