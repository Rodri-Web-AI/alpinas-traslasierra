"use client";

import { useState } from "react";
import Image from "next/image";
import { scrollToAnchor } from "@/lib/scrollToAnchor";

const WHATSAPP_URL = "https://wa.me/5493544681747";

const NAV_LINKS = [
  { href: "#inicio", label: "Inicio" },
  { href: "#proceso", label: "Proceso" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#quienes-somos", label: "Precio" },
];

function NavLink({ href, label, className, onNavigate }) {
  function handleClick(e) {
    e.preventDefault();
    scrollToAnchor(href);
    onNavigate?.();
  }

  return (
    <a href={href} onClick={handleClick} className={className}>
      {label}
    </a>
  );
}

function Logo() {
  return (
    <a href="#" className="group flex items-center gap-4">
      <div className="relative h-16 w-16 shrink-0 overflow-hidden transition-transform group-hover:scale-105">
        <Image
          src="/images/alpinas-traslasierra-logo.png"
          alt="Logo Alpinas Traslasierra"
          fill
          className="object-contain object-left"
          priority
        />
      </div>
      
      <span className="flex flex-col leading-none">
        <span className="text-lg font-black tracking-wider text-zinc-900 sm:text-2xl">
          ALPINAS
        </span>
        <span className="text-[10px] font-bold tracking-[0.25em] text-emerald-800 sm:text-xs mt-1">
          TRASLASIERRA
        </span>
      </span>
    </a>
  );
}

function WhatsAppIcon({ className = "h-5 w-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section 
      id="inicio" 
      className="relative flex min-h-svh flex-col overflow-hidden bg-[#fbfbfa] text-zinc-900"
    >
      
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(34,197,94,0.025),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_70%_20%,rgba(197,160,115,0.04),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_20%_50%,rgba(25,45,35,0.02),transparent_65%)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />
      </div>

      {/* AQUÍ COMIENZA EL HEADER MODIFICADO */}
      <header className="relative z-20 animate-fade-in">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
          <Logo />

          {/* Bloque derecho unificado */}
          <div className="flex items-center gap-8 md:gap-10">
            <nav
              className="hidden items-center gap-8 md:flex"
              aria-label="Navegación principal"
            >
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900"
                />
              ))}
            </nav>

            <div className="flex shrink-0 items-center gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden rounded-full bg-emerald-800 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-900 sm:inline-flex"
              >
                WhatsApp
              </a>

              <button
                type="button"
                onClick={() => setMenuOpen((o) => !o)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 text-zinc-600 bg-white transition-colors hover:border-zinc-300 hover:text-zinc-900 md:hidden"
                aria-expanded={menuOpen}
                aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              >
                {menuOpen ? (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {menuOpen && (
          <nav className="border-t border-zinc-100 bg-white/95 px-5 py-4 shadow-lg backdrop-blur-md md:hidden">
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <NavLink
                    href={link.href}
                    label={link.label}
                    onNavigate={() => setMenuOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 hover:text-zinc-900"
                  />
                </li>
              ))}
              <li className="pt-2">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-full bg-emerald-800 px-4 py-3 text-sm font-medium text-white hover:bg-emerald-900"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </nav>
        )}
      </header>
      {/* AQUÍ TERMINA EL HEADER MODIFICADO */}

      <div className="relative z-10 flex flex-1 flex-col justify-center px-5 pb-20 pt-4 sm:px-8 lg:px-12">
        <div className="mx-auto w-full max-w-7xl grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          
          <div className="lg:col-span-7 xl:col-span-6 text-left">
            <p
              className="mb-6 inline-flex animate-fade-in-up rounded-full border border-emerald-800/20 bg-emerald-500/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-800 sm:text-xs"
              style={{ animationDelay: "0.1s" }}
            >
              Traslasierra · Córdoba · Argentina
            </p>

            <h1
              className="animate-fade-in-up text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl md:text-5xl lg:text-[3.25rem] lg:leading-[1.1]"
              style={{ animationDelay: "0.25s" }}
            >
              <span className="text-zinc-900">Construimos alpinas y cabañas </span>
              <span className="text-[#c5a073]">pensadas para disfrutar</span>
              <span className="text-zinc-900"> las sierras de verdad.</span>
            </h1>

            <p
              className="mt-6 max-w-xl animate-fade-in-up text-base leading-relaxed text-zinc-600 sm:text-lg"
              style={{ animationDelay: "0.4s" }}
            >
              +50 cabañas entregadas en Traslasierra. Agendá tu visita a obra esta semana
            </p>

            <div
              className="mt-10 flex animate-fade-in-up flex-col gap-3 sm:flex-row sm:items-center"
              style={{ animationDelay: "0.55s" }}
            >
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 rounded-full bg-emerald-800 px-7 py-3.5 text-sm font-medium text-white shadow-md shadow-emerald-800/10 transition-all hover:bg-emerald-900 hover:scale-[1.01]"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Hablar por WhatsApp
              </a>
              <NavLink
                href="#proyectos"
                label="Ver proyectos"
                className="inline-flex items-center justify-center rounded-full border border-zinc-300 bg-white px-7 py-3.5 text-sm font-medium text-zinc-700 shadow-sm transition-colors hover:border-zinc-400 hover:bg-zinc-50 hover:text-zinc-900"
              />
            </div>
          </div>

          <div 
            className="lg:col-span-5 xl:col-span-6 flex justify-center lg:justify-end animate-fade-in-up"
            style={{ animationDelay: "0.7s" }}
          >
            <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-zinc-100 shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-zinc-200/50 aspect-[4/3] sm:aspect-[1.35/1] lg:aspect-[4/3] xl:aspect-[1.35/1]">
              <img 
                src="/images/hero.png"
                alt="Diseño exclusivo de Cabaña Alpina en Traslasierra" 
                className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105"
                loading="eager"
              />
            </div>
          </div>

        </div>
      </div>

      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-5 z-50 flex h-14 w-14 animate-fade-in items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_4px_24px_rgba(37,211,102,0.35)] transition-transform hover:scale-105 sm:bottom-8 sm:left-8"
        style={{ animationDelay: "0.8s" }}
        aria-label="Contactar por WhatsApp"
      >
        <WhatsAppIcon className="h-7 w-7" />
      </a>

      <div
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 animate-fade-in sm:block"
        style={{ animationDelay: "1.2s" }}
        aria-hidden
      >
        <svg
          className="h-5 w-5 animate-bounce-slow text-zinc-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}