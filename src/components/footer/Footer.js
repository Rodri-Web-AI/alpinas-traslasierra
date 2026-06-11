import React from "react";

const NAV_LINKS = [
  { href: "#inicio", label: "Inicio" },
  { href: "#proceso", label: "El Proceso" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#quienes-somos", label: "Quiénes Somos" }, /* <--- Apunta exactamente al ID de arriba */
];

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200/80 bg-zinc-50">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* Columna 1: Identidad */}
          <div>
            <p className="text-lg font-bold tracking-tight text-zinc-900">
              Alpinas Traslasierra
            </p>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">
              Construcción artesanal de cabañas y estructuras de diseño adaptadas a la topografía, el clima y las necesidades del Valle de Traslasierra. Edificaciones pieza a pieza.
            </p>
          </div>

          {/* Columna 2: Navegación Organizada */}
          <nav aria-label="Navegación del sitio">
            <h2 className="text-sm font-semibold tracking-tight text-zinc-900">
              Navegación
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-zinc-600 transition-colors hover:text-emerald-800"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Columna 3: Contacto y Ubicación */}
          <div>
            <h2 className="text-sm font-semibold tracking-tight text-zinc-900">
              Contacto Directo
            </h2>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-600">
              <p>
                <span className="font-medium text-zinc-700">Ubicación:</span>{" "}
                Valle de Traslasierra — San José y Villa Dolores, Córdoba.
              </p>
              <p>
                <span className="font-medium text-zinc-700">Área de cobertura:</span>{" "}
                Obras en toda la región serrana de Córdoba y Norte de San Luis.
              </p>
            </div>
          </div>

          {/* Columna 4: Garantía de Confianza */}
          <div>
            <h2 className="text-sm font-semibold tracking-tight text-zinc-900">
              Compromiso
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-zinc-600">
              Trabajamos bajo contratos claros, presupuestos transparentes sin letra chica y pagos escalonados por avance de obra certificado. Tu tranquilidad es nuestra prioridad.
            </p>
          </div>

        </div>

        {/* Barra de Copyright e Información Técnica */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-zinc-200/60 pt-8 text-xs text-zinc-400 sm:flex-row">
          <p>© 2026 Alpinas Traslasierra. Todos los derechos reservados.</p>
          <p className="text-center sm:text-right text-[11px] max-w-md">
            Diseño y edificación a medida. No comercializamos viviendas modulares industrializadas ni prefabricadas en serie.
          </p>
        </div>
      </div>
    </footer>
  );
}