"use client";

import { useInView } from "@/hooks/useInView";

const WHATSAPP_URL = "https://wa.me/5493544681747";

const CTA_CONTENT = {
  badge: "EMPEZÁ AHORA",
  titleBefore: "En la primera conversación analizamos tu terreno, te damos un presupuesto estimado y te coordinamos una visita a una obra terminada. ",
  titleHighlight: "Sin compromiso.",
  subtitle:
    "Escribinos y en 24 horas hábiles (en días laborales) tenés una respuesta.",
  button: "Hablar por WhatsApp",
  footnote: "Respondemos en horario comercial · Lunes a Viernes · 8 a 18 hs",
};

function WhatsAppIcon({ className = "h-5 w-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function Cta() {
  const { ref, inView } = useInView();

  return (
    <section
      ref={ref}
      id="contacto"
      className="relative overflow-hidden bg-[#fbfbfa] px-5 py-28 text-zinc-900 sm:px-8 sm:py-36 lg:px-12"
      aria-labelledby="cta-heading"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_100%,rgba(16,185,129,0.04),transparent_55%)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />
      </div>

      <div
        className={`relative mx-auto flex max-w-4xl flex-col items-center text-center transition-all duration-700 ${
          inView ? "animate-fade-in-up opacity-100" : "opacity-0"
        }`}
      >
        <p className="rounded-full border border-zinc-300 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-zinc-600">
          {CTA_CONTENT.badge}
        </p>

        <h2
          id="cta-heading"
          className="mt-6 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-zinc-900 sm:text-4xl md:text-5xl"
        >
          {CTA_CONTENT.titleBefore}
          <span className="text-[#c5a073]">{CTA_CONTENT.titleHighlight}</span>
        </h2>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg">
          {CTA_CONTENT.subtitle}
        </p>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex items-center gap-3 rounded-xl bg-emerald-700 px-8 py-4 text-base font-semibold text-white shadow-md shadow-emerald-700/10 transition-all duration-300 hover:bg-emerald-800 hover:shadow-lg hover:shadow-emerald-700/20 sm:text-lg"
        >
          <WhatsAppIcon className="h-5 w-5 sm:h-6 sm:w-6" />
          {CTA_CONTENT.button}
        </a>

        <p className="mt-4 text-xs text-zinc-400">{CTA_CONTENT.footnote}</p>
      </div>
    </section>
  );
}
