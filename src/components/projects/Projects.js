"use client";

import { useState, useEffect } from "react";
import { useInView } from "@/hooks/useInView";

const MODELS = [
  {
    name: "Refugio 25m²",
    size: "25 m²",
    price: [
      "Inversión total: $21.900.000",
      "Anticipo (40%): $8.760.000",
      "12 cuotas: $1.095.000/mes",
    ],
    bedrooms: 1,
    bathrooms: 1,
    category: "Escapadas / Inversión inicial",
    description:
      "Modelo compacto ideal para empezar. Perfecto para alquiler turístico. Incluye altillo y galería.",
    features: ["Altillo", "Galería cubierta", "Cocina integrada", "Baño completo"],
    image: "/images/modelos/proyecto-1.jpeg",
    imageAlt: "Refugio Serrano - 25m² con altillo y galería",
    bestFor: "Inversores que buscan rentabilidad rápida",
    floorPlans: [
      {
        src: "/images/modelos/planos/plano1/plano-1_estructura1.png",
        alt: "Planta baja Refugio Serrano",
        caption: "Planta baja · 25 m²",
      },
      {
        src: "/images/modelos/planos/plano1/plano-2_estructura1.png",
        alt: "Altillo Refugio Serrano",
        caption: "Altillo con vista al living",
      },
    ],
  },
  {
    name: "Alpina 40 m² Estándar",
    recommended: true,
    size: "40 m²",
    price: [
      "~~Inversión total: $35.040.000~~",
      "🎉 Precio especial: $31.536.000",
      "(Ahorrás $3.504.000 - 10% de descuento)",
      "Anticipo (40%): $12.614.400",
      "12 cuotas: $1.576.800/mes",
    ],
    bedrooms: 2,
    bathrooms: 1,
    category: "Parejas / Alquiler turístico",
    description:
      "Equilibrio perfecto entre espacio y costo. Dos dormitorios, living-comedor amplio y baño completo.",
    features: ["2 dormitorios", "Living-comedor", "Cocina separada", "Habitación lateral"],
    image: "/images/modelos/proyecto-2.png",
    imageAlt: "Alpina Estándar - 40m² con 2 dormitorios",
    bestFor: "Parejas o alquiler turístico todo el año",
    floorPlans: [
      {
        src: "/images/modelos/planos/plano2/plano-1_estructura2.png",
        alt: "Planta baja Alpina Estándar",
        caption: "Planta baja · 40 m²",
      },
      {
        src: "/images/modelos/planos/plano2/plano-2_estructura2.png",
        alt: "Habitación lateral Alpina Estándar",
        caption: "Habitación lateral y ampliación",
      },
    ],
  },
  {
    name: "Alpina 40m² Familiar",
    size: "40 m²",
    price: [
      "Inversión total: $35.040.000",
      "(Ahorrás $3.504.000 - 10% de descuento)",
      "Anticipo (40%): $14.016.00",
      "12 cuotas: $1.752.000/mes",
    ],
    bedrooms: 2,
    bathrooms: 1,
    category: "Familias / Vivienda permanente",
    description:
      "Espacio amplio para vivir todo el año. Tres dormitorios, baño completo y gran living con vistas a las sierras.",
    features: ["2 dormitorios", "Living amplio", "Cocina-comedor", "Galería lateral"],
    image: "/images/modelos/proyecto-4.jpeg",
    imageAlt: "Alpina Familiar - 40m² con 3 dormitorios",
    bestFor: "Familias o vivienda permanente",
    floorPlans: [
      {
        src: "/images/modelos/planos/plano3/plano-1_estructura3.png",
        alt: "Planta baja Alpina Familiar",
        caption: "Planta baja · 40 m²",
      },
    ],
  },
  {
    name: "Alpina Premium con Loft",
    size: "35 m²",
    price: [
      "Inversión total: $30.660.000",
      "Anticipo (40%): $12.264.000",
      "12 cuotas: $1.533.000/mes",
    ],
    bedrooms: 2,
    bathrooms: 2,
    category: "Premium / Alta rentabilidad",
    description:
      "Doble altura, loft superior. El modelo que más destaca por su diseño único.",
    features: ["Loft superior", "Doble altura", "2 baños"],
    image: "/images/modelos/proyecto-3.png",
    imageAlt: "Alpina Premium - 35m² con loft y doble altura",
    bestFor: "Alquiler turístico premium o vivienda permanente",
    floorPlans: [
      {
        src: "/images/modelos/planos/plano4/plano-1_estructura4.png",
        alt: "Planta baja Alpina Premium",
        caption: "Planta baja · 35 m²",
      },
      {
        src: "/images/modelos/planos/plano4/plano-2_estructura4.png",
        alt: "Loft Alpina Premium",
        caption: "Loft superior con doble altura",
      },
    ],
  },
];

// Modal para mostrar los planos
function FloorPlansModal({ model, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  if (!model) return null;

  const plans = model.floorPlans;
  const currentPlan = plans[currentIndex];
  const hasMultiple = plans.length > 1;

  const goNext = () => setCurrentIndex((i) => (i + 1) % plans.length);
  const goPrev = () => setCurrentIndex((i) => (i - 1 + plans.length) % plans.length);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in p-4 sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Planos de ${model.name}`}
    >
      <div
        className="relative w-full max-w-5xl animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 sm:-top-14 sm:right-0"
          aria-label="Cerrar"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header del modal */}
        <div className="mb-4 text-center">
          <h3 className="text-xl font-bold text-white sm:text-2xl">
            {model.name}
          </h3>
          <p className="mt-1 text-sm text-zinc-300">
            {model.size} · {model.bedrooms} dorm. · {model.bathrooms} baño{model.bathrooms > 1 ? 's' : ''}
          </p>
          {hasMultiple && (
            <p className="mt-2 text-xs text-zinc-400">
              Plano {currentIndex + 1} de {plans.length}
            </p>
          )}
        </div>

        {/* Contenedor de imagen */}
        <div className="relative overflow-hidden rounded-2xl bg-white shadow-2xl">
          <div className="relative aspect-[4/3] w-full sm:aspect-[16/10]">
            <img
              src={currentPlan.src}
              alt={currentPlan.alt}
              className="h-full w-full object-contain bg-zinc-50 p-4 sm:p-8"
            />

            {/* Navegación anterior */}
            {hasMultiple && (
              <button
                onClick={goPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-zinc-900 shadow-lg backdrop-blur-md transition-all hover:bg-white hover:scale-105"
                aria-label="Plano anterior"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* Navegación siguiente */}
            {hasMultiple && (
              <button
                onClick={goNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-zinc-900 shadow-lg backdrop-blur-md transition-all hover:bg-white hover:scale-105"
                aria-label="Plano siguiente"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>

          {/* Caption */}
          {currentPlan.caption && (
            <div className="border-t border-zinc-200 bg-white px-5 py-3 text-center">
              <p className="text-sm font-medium text-zinc-700">
                {currentPlan.caption}
              </p>
            </div>
          )}
        </div>

        {/* Indicadores de puntos */}
        {hasMultiple && (
          <div className="mt-4 flex justify-center gap-2">
            {plans.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === currentIndex
                    ? "w-8 bg-[#c5a073]"
                    : "w-2 bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Ir al plano ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Componente para renderizar el precio (soporta array o string)
// Componente para renderizar el precio (soporta array o string)
function PriceBlock({ price }) {
  if (!price) return null;

  // Si es un string simple, lo muestra como estaba
  if (typeof price === "string") {
    return (
      <div className="mt-2">
        <span className="text-xl font-bold text-[#c5a073]">{price}</span>
      </div>
    );
  }

  // Si es un array, lo renderiza línea por línea
  return (
    <div className="mt-3 rounded-lg border border-[#c5a073]/20 bg-[#c5a073]/5 p-3">
      {price.map((line, i) => {
        // Detectar si el texto tiene ~~ (tachado)
        const isStrikethrough = line.includes("~~");
        const cleanText = line.replace(/~~/g, "");
        
        // Detectar si es el precio especial
        const isSpecialPrice = line.toLowerCase().includes("precio especial");
        
        return (
          <div
            key={i}
            className={`flex items-center gap-2 ${
              i === 0 ? "mb-2 pb-2 border-b border-[#c5a073]/20" : ""
            }`}
          >
            {i > 0 && !isSpecialPrice && (
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#c5a073]" />
            )}
            <span
              className={
                isStrikethrough
                  ? "text-sm text-zinc-400 line-through decoration-2 decoration-red-400/60"
                  : isSpecialPrice
                  ? "text-lg font-bold text-emerald-700"
                  : "text-sm text-zinc-700"
              }
            >
              {cleanText}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function ModelCard({ model, visible, index, onViewPlans }) {
  const hasPlans = model.floorPlans && model.floorPlans.length > 0;

  return (
    <article
      className={`break-inside-avoid mb-6 transition-all duration-700 ${
        visible ? "animate-fade-in-up opacity-100" : "opacity-0"
      }`}
      style={{ animationDelay: visible ? `${0.12 + index * 0.08}s` : undefined }}
    >
      <div className="group relative overflow-hidden rounded-2xl bg-white shadow-sm border border-zinc-200/50">
        {/* Badge recomendado */}
        {model.recommended && (
          <span className="absolute left-1/2 top-4 z-20 -translate-x-1/2 rounded-full bg-[#c5a073] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-md sm:text-xs">
            Modelo más recomendado
          </span>
        )}

        {/* Badge de categoría */}
        <span className="absolute left-4 top-4 z-10 rounded-full border border-white/20 bg-black/35 px-3 py-1 text-[11px] font-medium tracking-wide text-white/95 backdrop-blur-sm sm:text-xs">
          {model.category}
        </span>

        {/* Badge de metros cuadrados */}
        <span className="absolute right-4 top-4 z-10 rounded-full bg-[#c5a073] px-3 py-1 text-xs font-bold text-white shadow-sm">
          {model.size}
        </span>

        {/* Imagen */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={model.image}
            alt={model.imageAlt}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>

        {/* Contenido */}
        <div className="p-5 sm:p-6">
          <h3 className="text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">
            {model.name}
          </h3>

          {/* Precio entre el nombre y la descripción */}
<PriceBlock price={model.price} />

{/* Mecanismo de cobro */}
<div className="mt-3 rounded-lg bg-blue-50 border border-blue-200 p-3">
  <div className="flex items-center gap-2 mb-2">
    <svg className="h-4 w-4 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <span className="text-sm font-semibold text-blue-900">
      ¿Cómo funcionan los pagos?
    </span>
  </div>
  <ul className="text-xs text-blue-800 space-y-1">
    <li>• Precio total en USD (protege tu inversión)</li>
    <li>• Pagos en pesos al dólar blue del día</li>
    <li>• Cuotas fijas en USD, convertibles a pesos</li>
    <li>• Sin sorpresas: el precio que acordás es el final</li>
  </ul>
</div>

<p className="mt-3 text-sm leading-relaxed text-zinc-600">
  {model.description}
</p>

          {/* Especificaciones técnicas */}
          <div className="mt-4 flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5">
              <svg className="h-4 w-4 text-[#c5a073]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="font-medium text-zinc-700">{model.bedrooms} dorm.</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="h-4 w-4 text-[#c5a073]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
              </svg>
              <span className="font-medium text-zinc-700">{model.bathrooms} baño{model.bathrooms > 1 ? 's' : ''}</span>
            </div>
          </div>

          {/* Características */}
          <div className="mt-4 flex flex-wrap gap-2">
            {model.features.map((feature) => (
              <span
                key={feature}
                className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-800"
              >
                {feature}
              </span>
            ))}
          </div>

          {/* Ideal para */}
          <div className="mt-5 rounded-lg border border-zinc-200 bg-zinc-50 p-3">
            <p className="text-xs font-medium text-zinc-500">
              Ideal para: <span className="text-zinc-900">{model.bestFor}</span>
            </p>
          </div>

          {/* Botón Ver Planos */}
          {hasPlans && (
            <button
              onClick={() => onViewPlans(model)}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#c5a073] to-[#a8895f] px-5 py-3 text-sm font-semibold text-white shadow-md shadow-[#c5a073]/20 transition-all hover:shadow-lg hover:shadow-[#c5a073]/30 hover:scale-[1.02] active:scale-[0.98]"
              aria-label={`Ver planos de ${model.name}`}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 014-4h4M9 17H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-4M9 17l4-4m0 0l4 4m-4-4v8" />
              </svg>
              Ver planos
              <span className="ml-1 rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold">
                {model.floorPlans.length}
              </span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const { ref, inView } = useInView();
  const [selectedModel, setSelectedModel] = useState(null);

  return (
    <>
      <section
        ref={ref}
        id="proyectos"
        className="relative overflow-hidden bg-[#fbfbfa] px-5 py-24 text-zinc-900 sm:px-8 sm:py-32 lg:px-12"
        aria-labelledby="projects-heading"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(197,160,115,0.05),transparent_55%)]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <header
            className={`mx-auto max-w-3xl text-center transition-all duration-700 ${
              inView ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            <p className="mb-5 inline-flex rounded-full border border-[#c5a073]/30 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c5a073] sm:text-xs">
              Modelos disponibles
            </p>
            <h2
              id="projects-heading"
              className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl md:text-5xl"
            >
              Elegí el modelo que se adapta a tu proyecto
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg">
              Todos personalizables. Construcción llave en mano. 
              Pagos por avance certificado.{" "}
              <span className="inline-block mt-2 rounded-lg bg-[#c5a073]/10 border border-[#c5a073]/30 px-3 py-1 text-sm font-bold text-[#c5a073]">
                Desde USD 600/m² · Financiación propia: 40% anticipo + 12 cuotas sin interés
              </span>
            </p>
          </header>

          <div className="mt-14 columns-1 gap-6 sm:mt-16 sm:columns-2 lg:columns-2 xl:columns-2">
            {MODELS.map((model, i) => (
              <ModelCard
                key={model.name}
                model={model}
                visible={inView}
                index={i}
                onViewPlans={setSelectedModel}
              />
            ))}
          </div>

          {/* CTA final */}
          <div className={`mt-16 text-center transition-all duration-700 ${
              inView ? "animate-fade-in-up" : "opacity-0"
            }`}>
            <p className="text-sm text-zinc-600">
              ¿Tenés un diseño propio?{" "}
              <span className="font-medium text-[#c5a073]">
                También construimos sobre tus planos
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Modal de planos */}
      {selectedModel && (
        <FloorPlansModal
          model={selectedModel}
          onClose={() => setSelectedModel(null)}
        />
      )}
    </>
  );
}