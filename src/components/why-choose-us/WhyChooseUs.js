"use client";

import { useState } from "react";
import Image from "next/image";
import { useInView } from "@/hooks/useInView";
import {
  HammerIcon,
  KeyIcon,
  MountainIcon,
  SlidersIcon,
  TreeIcon,
  TrendingUpIcon,
} from "./FeatureIcons";

const FEATURES = [
  {
    title: "Llave en mano real",
    description:
      "Nos hacemos cargo de absolutamente todo: proyecto, materiales, mano de obra y entrega. Vos llegás a inaugurar.",
    icon: KeyIcon,
    details: [
      {
        category: "Estructura y Base",
        items: [
          "Platea de hormigón armado (Loma Negra, Holcim)",
          "Hierro de refuerzo (Acerbrag, Gerdau)",
          "Madera estructural tratada (Pino, Eucalipto Saligna)",
          "Cubierta: chapa galvanizada o teja cerámica",
        ],
      },
      {
        category: "Instalaciones",
        items: [
          "Cañerías de agua: PAVCO o Tigre (termofusión)",
          "Desagües: PVC presión clase 4",
          "Electricidad: cables FV o Prysmian, tablero Schneider",
          "Gas: caño de cobre o polietileno según normativa",
        ],
      },
      {
        category: "Terminaciones",
        items: [
          "Cerámicos: Portobello, Zanella o similar primera línea",
          "Sanitarios: Ferrum, Andina o Roca",
          "Griferías: FV, Trobo o similar con garantía",
          "Pintura interior: Sherwin Williams o Alba",
          "Aberturas: aluminio línea Modena o similar",
        ],
      },
      {
        category: "Entrega Final",
        items: [
          "Limpieza profunda post-obra",
          "Pruebas de funcionamiento (agua, luz, gas)",
          "Manuales de uso y mantenimiento",
          "Garantía escrita de 2 años",
          "Lista para habitar o rentar de inmediato",
        ],
      },
    ],
  },
  
  {
    title: "Pagos por avance certificado",
    description:
      "Solo pagás cuando la obra avanza. Cada etapa es documentada con fotos y partes de obra para tu tranquilidad.",
    icon: TrendingUpIcon,
  
    details: [
      {
        category: "1. Etapa Preliminar y Cotización",
        items: [
          "Reunión inicial: definición de necesidades, materiales y terreno",
          "Presupuesto estimado según m² y calidad de terminaciones",
          "Estudio del terreno: niveles, suelo y accesibilidad",
          "Visita a obras terminadas en la zona (sin compromiso)",
        ],
      },
      {
        category: "2. Diseño y Anteproyecto",
        items: [
          "Planos básicos: distribución, fachadas y renderizado 3D",
          "Ajuste de costos según planos aprobados",
          "Firma del anteproyecto que congela el diseño",
          "Definición de materiales y marcas específicas",
        ],
      },
      {
        category: "3. Redacción y Firma del Contrato",
        items: [
          "Datos legales de constructor y propietario",
          "Pliego de condiciones: materiales, marcas e instalaciones",
          "Plazos, penalizaciones y forma de pago por avance",
          "Anticipo del 30% al firmar contrato",
          "Cronograma de obra con fechas de inicio y entrega",
        ],
      },
      {
        category: "4. Ejecución y Certificaciones",
        items: [
          "Inicio: preparación del terreno y platea de hormigón",
          "Pagos por avance certificado tras inspección (25% + 25% + 20%)",
          "Etapas: estructura, instalaciones, aislamiento y acabados",
          "Reportes semanales con fotos y videos por WhatsApp",
          "Visitas a obra coordinadas con previo aviso",
        ],
      },
      {
        category: "5. Recepción y Fin de Obra",
        items: [
          "Recepción provisoria: listado de detalles a corregir",
          "Liquidación final (10%) tras solución de observaciones",
          "Recepción definitiva: entrega de llaves y planos finales",
          "Acta de conformidad firmada por ambas partes",
          "Inicio de garantía de 2 años por vicios ocultos",
        ],
      },
    ],
  },

  {
    title: "Construcción artesanal",
    description:
      "Cada cabaña se construye a mano, con detalle y oficio. No somos una empresa de prefabricados en serie.",
    icon: HammerIcon,
  
    details: [
      {
        category: "Trabajo personalizado",
        items: [
          "estructura armada pieza por pieza",
          "montaje realizado directamente en obra",
          "control manual en cada etapa",
          "terminaciones revisadas antes de la entrega",
        ],
      },
    ],
  },

  {
    title: "Madera tratada desde el inicio",
    description:
      "Usamos maderas con tratamiento adecuado al clima serrano: protegidas de la humedad, el viento y los cambios térmicos.",
    icon: TreeIcon,
  
    details: [
      {
        category: "Protección",
        items: [
          "tratamiento impregnante (lasures)",
          "barrera contra humedad (marca Wichi o Naima)",
          "protección UV",
          "prevención de hongos e insectos",
        ],
      },
      {
        category: "Proceso",
        items: [
          "aplicación antes del montaje",
          "protección de estructura y revestimientos",
          "revisión durante la obra",
        ],
      },
      {
        category: "Pensado para las sierras",
        items: [
          "resistencia a lluvias y humedad",
          "adaptación a cambios térmicos",
          "mayor durabilidad exterior",
        ],
      },
    ],
  },

  {
    title: "Adaptación al terreno",
    description:
      "Conocemos las sierras. Diseñamos y construimos respetando la topografía y condiciones del lugar.",
    icon: MountainIcon,
  
    details: [
      {
        category: "Antes de construir analizamos",
        items: [
          "pendiente del lote",
          "drenaje de agua",
          "acceso a servicios",
        ],
      },
      {
        category: "Para evitar",
        items: [
          "humedad futura",
          "gastos innecesarios",
          "problemas de escurrimiento",
        ],
      },
    ],
  },

  {
    title: "Personalización real",
    description:
      "Tu cabaña no es igual a la del vecino. Trabajamos con vos el diseño, los materiales y los espacios que necesitás.",
    icon: SlidersIcon,
  
    details: [
      {
        category: "Diseño",
        items: [
          "distribución de ambientes",
          "cantidad de dormitorios",
          "ubicación de aberturas",
          "galerías y decks",
        ],
      },
      {
        category: "Materiales",
        items: [
          "madera o hierro + madera",
          "terminaciones interiores",
          "revestimientos exteriores",
          "opciones de pintura y color",
        ],
      },
      {
        category: "Uso del proyecto",
        items: [
          "vivienda permanente",
          "alquiler turístico",
          "casa de fin de semana",
          "ampliaciones futuras previstas",
        ],
      },
    ],
  },
];

const CONSTRUCTION_SYSTEMS = [
  {
    title: "Alpina de Madera",
    subtitle: "Rápida, cálida y eficiente.",
    image: "/images/alpina-madera.jpg",
  
    specs: [
      "estructura 3x6",
      "tirantería 2x4",
      "machimbre exterior",
      "chapa C25",
      "aislaciones",
      "pintura impregnante",
    ],
  
    details: [
      {
        category: "Estructura",
        items: [
          "estructura 3x6",
          "platea",
          "tirantería curada",
          "chapa C25",
          "aislaciones",
        ],
      },
  
      {
        category: "Interior y exterior",
        items: [
          "machimbre exterior",
          "interior machimbre o Durlock",
          "pintura impregnante",
          "vidrios colocados",
          "puertas interiores",
        ],
      },
  
      {
        category: "Terminaciones",
        items: [
          "cerámicas",
          "sanitarios",
          "griferías",
          "mesada",
          "bajo mesada",
        ],
      },
  
      {
        category: "Instalaciones",
        items: [
          "agua",
          "electricidad",
          "gas",
          "termotanque",
          "termofusión",
        ],
      },
  
      {
        category: "Modelos disponibles",
        items: [
          "32m² · 1 dormitorio",
          "48m² · 2 dormitorios",
          "64m² · 3 dormitorios",
        ],
      },
  
      {
        category: "Forma de trabajo",
        items: [
          "pagos por avance",
          "financiación posible",
          "seguimiento fotográfico",
          "construcción en obra",
        ],
      },
    ],
  },
  {
    title: "Alpina Hierro + Madera",
    subtitle: "Diseño moderno con máxima resistencia.",
    image: "/images/alpina-hierro.png",
  
    specs: [
      "estructura hierro 80",
      "vidrio + machimbre",
      "platea",
      "chapa C25",
      "termofusión",
      "griferías FV",
    ],
  
    details: [
      {
        category: "Estructura",
        items: [
          "estructura hierro 80",
          "platea",
          "vidrio + machimbre",
          "chapa C25",
          "aislaciones",
        ],
      },
  
      {
        category: "Interior y exterior",
        items: [
          "machimbre interior",
          "pintura impregnante",
          "aberturas aluminio",
          "vidrios colocados",
          "puertas interiores",
        ],
      },
  
      {
        category: "Terminaciones",
        items: [
          "cerámicas",
          "sanitarios",
          "griferías FV",
          "mesada",
          "bajo mesada",
        ],
      },
  
      {
        category: "Instalaciones",
        items: [
          "agua",
          "electricidad",
          "gas",
          "termotanque",
          "termofusión",
        ],
      },
  
      {
        category: "Modelos disponibles",
        items: [
          "32m² · 1 dormitorio",
          "48m² · 2 dormitorios",
          "64m² · 3 dormitorios",
        ],
      },
  
      {
        category: "Forma de trabajo",
        items: [
          "pagos por avance",
          "financiación posible",
          "seguimiento fotográfico",
          "construcción en obra",
        ],
      },
    ],
  },
  {
    title: "Alpina de Ladrillo Visto",
    subtitle:
      "Construcción sólida y tradicional para vivir todo el año.",
    image: "/images/ladrillo.jpeg",
  
    specs: [
      "ladrillo visto",
      "platea",
      "revoque interior",
      "chapa C25",
      "termofusión",
      "cerámicas",
    ],
  
    details: [
      {
        category: "Estructura",
        items: [
          "ladrillo visto",
          "platea",
          "revoque grueso y fino",
          "chapa C25",
          "aislaciones",
        ],
      },
  
      {
        category: "Interior y exterior",
        items: [
          "pintura interior",
          "aberturas aluminio",
          "vidrios colocados",
          "puertas interiores",
          "revestimientos tradicionales",
        ],
      },
  
      {
        category: "Terminaciones",
        items: [
          "cerámicas",
          "sanitarios Ferrum Andina",
          "griferías",
          "mesada acero inoxidable o granito",
          "bajo mesada pino o melamina",
        ],
      },
  
      {
        category: "Instalaciones",
        items: [
          "agua",
          "electricidad",
          "gas",
          "termotanque",
          "termofusión",
        ],
      },
  
      {
        category: "Modelos disponibles",
        items: [
          "32m² · 1 dormitorio",
          "48m² · 2 dormitorios",
          "64m² · 3 dormitorios",
        ],
      },
  
      {
        category: "Forma de trabajo",
        items: [
          "pagos por avance",
          "financiación posible",
          "seguimiento fotográfico",
          "construcción en obra",
        ],
      },
    ],
  },
  ];

export default function WhyChooseUs() {
  const { ref, inView } = useInView();

  const [showSystems, setShowSystems] = useState(false);
  const [openSpec, setOpenSpec] = useState(null);
  const [openFeature, setOpenFeature] = useState(null);

  return (
    <section
      ref={ref}
      id="nosotros"
      className="relative overflow-hidden bg-background px-5 py-24 sm:px-8 sm:py-32 lg:px-12"
      aria-labelledby="why-choose-heading"
    >
      {/* Fondos decorativos */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_20%_30%,rgba(16,185,129,0.02),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_90%_80%,rgba(197,160,115,0.04),transparent_60%)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">

          {/* Imagen */}
          <div
            className={`relative transition-all duration-700 ${
              inView ? "animate-fade-in-up" : "opacity-0"
            }`}
            style={{ animationDelay: "0.05s" }}
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-zinc-200/80 shadow-xl sm:aspect-[5/6]">
              <Image
                src="/images/sierras-cabana.png"
                alt="Cabaña de madera en las sierras de Traslasierra al atardecer"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority={false}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>

            {/* Badge */}
            <div
              className="absolute bottom-5 right-5 rounded-xl border border-zinc-200/60 bg-white/80 px-5 py-4 backdrop-blur-md shadow-md sm:bottom-6 sm:right-6"
              aria-label="Más de 50 obras entregadas en las sierras"
            >
              <p className="text-2xl font-bold tracking-tight text-emerald-700">
                +50
              </p>

              <p className="mt-0.5 max-w-[140px] text-xs leading-snug text-zinc-600">
                Obras entregadas
              </p>
            </div>
          </div>

          {/* Textos */}
          <div
            className={`lg:py-4 transition-all duration-700 ${
              inView ? "animate-fade-in-up" : "opacity-0"
            }`}
            style={{ animationDelay: "0.15s" }}
          >
            <p className="mb-5 inline-flex rounded-full border border-[#c5a073]/30 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-[#c5a073] sm:text-xs">
              Por qué elegirnos
            </p>

            <h2
              id="why-choose-heading"
              className="text-3xl font-bold leading-[1.15] tracking-tight text-zinc-900 sm:text-4xl lg:text-[2.65rem]"
            >
              Tu cabaña lista en 10 a 12 semanas, con precio cerrado por contrato y fotos semanales del avance.
            </h2>

            <p className="mt-5 text-base leading-relaxed text-zinc-600 sm:text-lg">
            Construimos alpinas y cabañas en Traslasierra desde [año]. Cada obra tiene precio cerrado por contrato, 
            cronograma por escrito y un responsable directo que te manda fotos todos los viernes. Sin sorpresas, 
            sin letra chica.
            </p>

            <div className="mt-8 flex items-start gap-3 rounded-xl border border-emerald-500/10 bg-emerald-500/5 px-5 py-4">
              <span
                className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-emerald-600"
                aria-hidden
              />

              <p className="text-sm leading-relaxed text-zinc-700 sm:text-[15px]">
                Operamos en toda la zona serrana de Córdoba y San Luis.
              </p>
            </div>

            {/* Botón */}
            <button
              type="button"
              onClick={() => setShowSystems(!showSystems)}
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-emerald-700 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-emerald-800 hover:shadow-lg"
              aria-expanded={showSystems}
            >
              VER TIPOS DE CABAÑAS
            </button>

            {/* Sistemas */}
            <div
              className={`overflow-hidden transition-all duration-700 ${
                showSystems
                  ? "mt-8 max-h-[3000px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="space-y-5">
                {CONSTRUCTION_SYSTEMS.map((system, index) => (
                  <div
                    key={system.title}
                    className={`overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all duration-500 ${
                      showSystems
                        ? "translate-y-0 opacity-100"
                        : "translate-y-4 opacity-0"
                    }`}
                    style={{
                      transitionDelay: `${index * 120}ms`,
                    }}
                  >
                    <div className="grid gap-0 md:grid-cols-[220px_1fr]">

                      {/* Imagen */}
                      <div className="relative h-60 md:h-full">
                        <Image
                          src={system.image}
                          alt={system.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Contenido */}
                      <div className="p-6">
                        <h3 className="text-xl font-semibold tracking-tight text-zinc-900">
                          {system.title}
                        </h3>

                        <ul className="mt-5 space-y-2">
  {system.specs.map((spec) => (
    <li
      key={spec}
      className="flex items-center gap-2 text-sm text-zinc-600"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
      {spec}
    </li>
  ))}
</ul>

                        <button
                          type="button"
                          onClick={() =>
                            setOpenSpec(
                              openSpec === index ? null : index
                            )
                          }
                          className="mt-5 inline-flex items-center text-sm font-medium text-emerald-700 transition-colors hover:text-emerald-800"
                        >
                          ▼ Ver especificaciones completas
                        </button>

                        <div
  className={`grid transition-all duration-500 ${
    openSpec === index
      ? "mt-5 grid-rows-[1fr] opacity-100"
      : "grid-rows-[0fr] opacity-0"
  }`}
>
  <div className="overflow-hidden">
    <div className="space-y-5">

      {system.details?.map((section) => (
        <div key={section.category}>
          <h4 className="text-sm font-semibold text-zinc-900">
            {section.category}
          </h4>

          <ul className="mt-2 space-y-1.5">
            {section.items.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-sm text-zinc-600"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}

    </div>
  </div>
</div>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Features */}
<div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">

{FEATURES.map((feature, i) => (
  <div
    key={feature.title}
    className={`group relative rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/30 hover:shadow-md ${
      inView ? "animate-fade-in-up" : "opacity-0"
    }`}
    style={{ animationDelay: `${0.2 + i * 0.05}s` }}
  >
    {/* Icono */}
    <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 transition-colors group-hover:bg-emerald-100">
      <feature.icon className="h-5 w-5" />
    </div>

    {/* Título */}
    <h3 className="text-lg font-semibold tracking-tight text-zinc-900">
      {feature.title}
    </h3>

    {/* Descripción */}
    <p className="mt-2.5 text-sm leading-relaxed text-zinc-600">
      {feature.description}
    </p>

    {/* Expandible */}
    {feature.details && (
      <>
        <button
          type="button"
          onClick={() =>
            setOpenFeature(
              openFeature === i ? null : i
            )
          }
          className="mt-5 inline-flex items-center text-sm font-medium text-emerald-700 transition-colors hover:text-emerald-800"
        >
          ▼ {
            feature.title === "Pagos por avance certificado"
              ? "Ver detalle completo"
              : feature.title === "Madera tratada desde el inicio"
              ? "Ver protección y tratamientos"
              : feature.title === "Adaptación al terreno"
              ? "Ver planificación de obra"
              : feature.title === "Personalización real"
              ? "Ver qué podés personalizar"
              : "Ver detalle completo"
          }
        </button>

        <div
          className={`grid transition-all duration-500 ${
            openFeature === i
              ? "mt-5 grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="space-y-5">

              {feature.details.map((section) => (
                <div key={section.category}>
                  <h4 className="text-sm font-semibold text-zinc-900">
                    {section.category}
                  </h4>

                  <ul className="mt-2 space-y-1.5">
                    {section.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-sm text-zinc-600"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

            </div>
          </div>
        </div>
      </>
    )}
  </div>
))}

</div>
</div>
    </section>
  );
}