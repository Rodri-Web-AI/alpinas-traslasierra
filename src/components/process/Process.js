"use client";

import { useInView } from "@/hooks/useInView";
import ProcessStep from "./ProcessStep";
import {
  ChatIcon,
  CheckCircleIcon,
  DesignIcon,
  DocumentIcon,
  HardHatIcon,
} from "./ProcessIcons";

const STEPS = [
  {
    number: "01",
    title: "Asesoramiento",
    description:
      "Arrancamos conociéndote. Analizamos tu terreno y la normativa municipal. Te coordinamos visitas a obras terminadas.",
    highlight: "Avanzamos recién cuando vos estés seguro.",
    icon: ChatIcon,
    image: {
      src: "/images/proceso/Etapa-1.png",
      alt: "Relevamiento del terreno en las sierras",
      caption: "Analizamos tu lote, su orientación y la normativa",
    },
  },
  {
    number: "02",
    title: "Diseño",
    description:
      "Si ya tenés planos, los tomamos como base y los optimizamos. Si arrancás de cero, elegís entre nuestros modelos de alpinas y los adaptamos a tu terreno y a tu objetivo.",
    highlight: "Modelos adaptados a tu lote.",
    icon: DesignIcon,
    image: {
      src: "/images/proceso/Etapa-2.png",
      alt: "Plano de diseño de cabaña alpina",
      caption: "Diseño personalizado sobre modelos probados",
    },
  },
  {
    number: "03",
    title: "Presupuesto",
    description:
      "Trabajamos con presupuesto cerrado por contrato: el precio que acordamos es el precio final. Los pagos son progresivos por etapas cumplidas",
    highlight: "Precio cerrado por contrato.",
    icon: DocumentIcon,
    image: {
      src: "/images/proceso/Etapa-3.png",
      alt: "Presupuesto cerrado por contrato",
      caption: "El precio que firmás es el precio final",
    },
  },
  {
    number: "04",
    title: "La Obra",
    description:
      "Plazo récord: la alpina estándar está lista en 10 a 12 semanas. Te mantenemos en el loop con fotos y videos por WhatsApp en cada avance. La obra es abierta: podés visitarla cuando quieras, con previo aviso.",
    highlight: "10 a 12 semanas. Obra abierta.",
    icon: HardHatIcon,
    timeline: [
      {
        week: "Semana 1-2",
        tasks: ["Platea de hormigón y base"],
      },
      {
        week: "Semana 3-4",
        tasks: ["Estructura de madera tratada o hierro"],
      },
      {
        week: "Semana 5-7",
        tasks: ["Cerramientos y techo"],
      },
      {
        week: "Semana 8-10",
        tasks: ["Instalaciones (luz, agua, gas)"],
      },
      {
        week: "Semana 11-12",
        tasks: ["Terminaciones y entrega"],
      },
    ],
    gallery: [
      {
        src: "/images/proceso/platea-1.png",
        alt: "Platea de hormigón terminada",
        caption: "Base estructural lista",
      },
      {
        src: "/images/proceso/estructura-2.png",
        alt: "Estructura de madera tratada montada",
        caption: "Montaje artesanal pieza por pieza",
      },
      {
        src: "/images/proceso/aislante-3.png",
        alt: "Cerramientos y revestimiento exterior",
        caption: "Protección climática instalada",
      },
    ],
  },
  {
    number: "05",
    title: "La Entrega",
    description:
      "Recibís tu cabaña terminada, probada y lista para habitar y te entregamos la garantía escrita de 2 años por vicios ocultos.",
    highlight: "Garantía escrita de 2 años.",
    icon: CheckCircleIcon,
    image: {
      src: "/images/proceso/Entrega.png",
      alt: "Entrega de cabaña terminada con llaves",
      caption: "Garantía escrita y acompañamiento post-entrega",
    },
  },
];

function TimelineNode({ number, visible, index }) {
  return (
    <div
      className={`relative z-10 flex shrink-0 items-center justify-center transition-all duration-700 ${
        visible ? "animate-fade-in-up opacity-100" : "opacity-0"
      }`}
      style={{ animationDelay: visible ? `${0.15 + index * 0.1}s` : undefined }}
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#c5a073]/40 bg-white text-sm font-bold tracking-tight text-[#c5a073] shadow-sm ring-4 ring-white sm:h-14 sm:w-14 sm:text-base">
        {number}
      </span>
    </div>
  );
}

// Componente para imágenes del proceso
// Componente para imágenes del proceso
function ProcessImage({ image, visible, index, align = "center" }) {
  if (!image) return null;

  return (
    <div
      className={`mt-8 transition-all duration-700 ${
        visible ? "animate-fade-in-up opacity-100" : "opacity-0"
      }`}
      style={{ animationDelay: visible ? `${0.3 + index * 0.1}s` : undefined }}
    >
      <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-zinc-200/50 bg-white shadow-lg">
        <div className="relative w-full aspect-[16/10] overflow-hidden">
          <img
            src={image.src}
            alt={image.alt}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </div>
        
        {image.caption && (
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 pointer-events-none">
            <p className="text-sm font-medium text-white drop-shadow-md">
              {image.caption}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Componente para galería de múltiples imágenes (usado en Construcción)
function ProcessGallery({ images, visible }) {
  if (!images || images.length === 0) return null;

  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-3">
      {images.map((image, index) => (
        <div
          key={image.src}
          className={`relative overflow-hidden rounded-xl border border-zinc-200/50 bg-white shadow-md transition-all duration-700 ${
            visible ? "animate-fade-in-up opacity-100" : "opacity-0"
          }`}
          style={{ animationDelay: visible ? `${0.3 + index * 0.1}s` : undefined }}
        >
          <div className="relative aspect-square overflow-hidden">
            <img
              src={image.src}
              alt={image.alt}
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>
          
          {image.caption && (
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <p className="text-xs font-medium text-white drop-shadow-md">
                {image.caption}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function Process() {
  const { ref, inView } = useInView();

  console.log("Process inView:", inView); // ← AGREGÁ ESTA LÍNEA

  return (
    <section
      ref={ref}
      id="proceso"
      className="relative overflow-hidden bg-[#fbfbfa] px-5 py-24 sm:px-8 sm:py-32 lg:px-12"
      aria-labelledby="process-heading"
    >
      {/* Parallax Real Centrado */}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[url('/images/fondo-proceso-parallax.jpeg')] bg-cover bg-center bg-no-repeat bg-scroll md:bg-fixed"
        aria-hidden
      />

      {/* Velo Oscuro */}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-zinc-950/40 backdrop-blur-[1px]"
        aria-hidden
      />

      <div className="pointer-events-none absolute inset-0 z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_20%,rgba(16,185,129,0.02),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_70%,rgba(197,160,115,0.04),transparent_60%)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />
      </div>

      <div className="relative z-20 mx-auto max-w-7xl">
        <header
          className={`mx-auto max-w-3xl text-center transition-all duration-700 ${
            inView ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <p className="mb-5 inline-flex rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-400 sm:text-xs">
            EL PROCESO
          </p>
          
          <h2
            id="process-heading"
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
          >
            Así se construye tu cabaña, paso a paso
          </h2>
          
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg">
            Un proceso claro y ordenado donde vos sabés exactamente en qué etapa
            está tu obra en todo momento.
          </p>
        </header>

        <div className="relative mt-16 lg:mt-20">
          <div
            className="absolute left-[23px] top-0 h-full w-px bg-zinc-300/80 sm:left-[27px] md:left-1/2 md:-translate-x-1/2"
            aria-hidden
          />

          <ol className="relative flex flex-col gap-12 sm:gap-16">
            {STEPS.map((step, i) => {
              const align = i % 2 === 0 ? "left" : "right";

              return (
                <li key={step.number} className="flex flex-col">
                  {/* Timeline node y contenido */}
                  <div className="grid grid-cols-[auto_1fr] items-start gap-5 md:grid-cols-[1fr_auto_1fr] md:gap-8 lg:gap-12">
                    <div className="col-start-1 row-start-1 flex justify-center md:col-start-2">
                      <TimelineNode
                        number={step.number}
                        visible={inView}
                        index={i}
                      />
                    </div>

                    <div
                      className={`col-start-2 row-start-1 min-w-0 ${
                        align === "left"
                          ? "md:col-start-1 md:pr-8 lg:pr-12"
                          : "md:col-start-3 md:pl-8 lg:pl-12"
                      }`}
                    >
                      <ProcessStep
                        step={step}
                        index={i}
                        visible={inView}
                        align={align}
                      />
                    </div>
                  </div>

                  {/* Imagen individual después del paso */}
                  {step.image && !step.gallery && (
                    <div className="mt-8 flex justify-center md:mt-12">
                      <div className="w-full max-w-3xl">
                        <ProcessImage
                          image={step.image}
                          visible={inView}
                          index={i}
                          align={align}
                        />
                      </div>
                    </div>
                  )}

                  {/* Galería múltiple para el paso de Construcción */}
                  {step.gallery && (
                    <div className="mt-8">
                      <ProcessGallery
                        images={step.gallery}
                        visible={inView}
                      />
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

