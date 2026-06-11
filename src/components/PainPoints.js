"use client";

import { useInView } from "@/hooks/useInView";

const PAIN_POINTS = [
  {
    title: "Obras sin fecha de entrega",
    description:
      "Empezás la construcción y nadie te puede decir cuándo vas a terminar. Los plazos se estiran indefinidamente y perdés el control de tu proyecto.",
    icon: ClockIcon,
  },
  {
    title: "Costos que no paran de crecer",
    description:
      "El presupuesto inicial era una cosa, pero cada semana aparece un 'adicional' inesperado. Terminás pagando el doble de lo que te prometieron.",
    icon: DollarIcon,
  },
  {
    title: "Obras abandonadas a mitad de camino",
    description:
      "El constructor desaparece, los materiales quedan tirados y tu terreno se convierte en una obra parada sin solución a la vista.",
    icon: MessageIcon,
  },
  {
    title: "Cero transparencia",
    description:
      "No sabés en qué se gasta tu plata. No hay informes, no hay fotos, no hay comunicación. Tu obra avanza (o no) y vos nunca sabés cómo está.",
    icon: EyeIcon,
  },
];

function IconBox({ children }) {
  return (
    // Modificado: Borde y fondo ahora usan tonos rojos sutiles acordes al fondo claro
    <span className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg border border-red-500/15 bg-red-500/5">
      {children}
    </span>
  );
}

// Modificado: El color por defecto del ícono ahora es text-red-500
function iconProps(className = "h-[22px] w-[22px] text-red-500") {
  return {
    className,
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };
}

function ClockIcon() {
  return (
    <svg {...iconProps()}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function DollarIcon() {
  return (
    <svg {...iconProps()}>
      <line x1="12" y1="1" x2="12" y2="23"></line>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg {...iconProps()}>
      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
      <path d="M9 10h6M9 14h4" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg {...iconProps()}>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  );
}

function PainCard({ point, index, visible }) {
  const Icon = point.icon;

  return (
    <article
      className={`group rounded-2xl border border-zinc-200/60 bg-white p-8 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all duration-500 hover:border-red-500/30 hover:shadow-[0_8px_24px_rgba(239,68,68,0.05)] ${
        visible ? "animate-fade-in-up opacity-100" : "translate-y-6 opacity-0"
      }`}
      style={{ animationDelay: visible ? `${0.15 + index * 0.1}s` : undefined }}
    >
      <IconBox>
        <Icon />
      </IconBox>
      <h3 className="text-lg font-semibold tracking-tight text-zinc-900">
        {point.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-zinc-600 sm:text-[15px]">
        {point.description}
      </p>
    </article>
  );
}

export default function PainPoints() {
  const { ref, inView } = useInView();

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-background px-5 py-24 sm:px-8 sm:py-32 lg:px-12"
      aria-labelledby="pain-points-heading"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(239,68,68,0.015),transparent_55%)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <header
          className={`mx-auto max-w-3xl text-center transition-all duration-700 ${
            inView ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <p className="mb-5 inline-flex rounded-full border border-red-500/20 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-red-600 sm:text-xs bg-red-50/50">
            Lo que todos temen antes de construir
          </p>
          <h2
            id="pain-points-heading"
            className="text-3xl font-bold leading-[1.2] tracking-tight text-zinc-900 sm:text-4xl lg:text-[2.75rem]"
          >
            Construir en las sierras no debería ser una fuente de estrés
          </h2>
          <p className="mt-5 text-base leading-relaxed text-zinc-600 sm:text-lg">
          El 70% de las obras en las Córdoba se atrasan más de 6 meses. 
          Estos son los 4 problemas que más se ven y cómo nosotros lo solucionamos.
          </p>
        </header>

        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 lg:mt-20">
          {PAIN_POINTS.map((point, i) => (
            <PainCard key={point.title} point={point} index={i} visible={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}