"use client";

import { useState } from "react";

const WHATSAPP_URL = "https://wa.me/5493544681747";
const COSTO_BASE_USD = 600;
const DOLAR_BLUE = 1460;

const CALIDAD_OPTIONS = [
  {
    id: "economica",
    label: "Económica",
    multiplier: 0.8,
    description: "Materiales básicos, terminaciones funcionales",
    pricePerM2: 480,
    icon: "🏠",
  },
  {
    id: "estandar",
    label: "Estándar",
    multiplier: 1.0,
    description: "Materiales de calidad, terminaciones completas",
    pricePerM2: 600,
    icon: "🏡",
  },
  {
    id: "premium",
    label: "Premium",
    multiplier: 1.4,
    description: "Materiales nobles, terminaciones de lujo",
    pricePerM2: 840,
    icon: "🏰",
  },
];

const EMAIL_DOMAINS = ["gmail.com", "hotmail.com", "outlook.com", "yahoo.com", "icloud.com"];

function WhatsAppIcon({ className = "h-5 w-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function getEmailSuggestions(input: string): string[] {
  if (!input || input.includes("@")) return [];
  return EMAIL_DOMAINS.map(domain => `${input}@${domain}`);
}

function normalizeEmail(email: string): string {
  if (!email.includes("@")) return email;
  const [user, domain] = email.split("@");
  if (!domain) return email;
  if (!domain.includes(".")) {
    return `${user}@${domain}.com`;
  }
  return email;
}

export default function BudgetCalculator() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    metros: 40,
    calidad: "estandar",
    nombre: "",
    apellido: "",
    localidad: "",
    whatsapp: "",
    email: "",
    mensaje: "",
  });
  const [showResult, setShowResult] = useState(false);
  const [emailSuggestions, setEmailSuggestions] = useState<string[]>([]);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field === "email" && typeof value === "string") {
      setEmailSuggestions(getEmailSuggestions(value));
    }
  };

  const handleEmailBlur = () => {
    const normalized = normalizeEmail(formData.email);
    if (normalized !== formData.email) {
      setFormData((prev) => ({ ...prev, email: normalized }));
    }
    // Cerrar sugerencias con un pequeño delay para permitir clicks
    setTimeout(() => setEmailSuggestions([]), 200);
  };

  // CAMBIO CLAVE: usar onMouseDown en lugar de onClick
  const selectEmailSuggestion = (suggestion: string) => {
    setFormData((prev) => ({ ...prev, email: suggestion }));
    setEmailSuggestions([]);
  };

  const nextStep = (step: number) => {
    if (currentStep === 1 && (!formData.metros || formData.metros < 10)) {
      alert("Por favor ingresá al menos 10 m²");
      return;
    }
    setCurrentStep(step);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!formData.nombre || !formData.apellido || !formData.email) {
      alert("Por favor completá tu nombre, apellido y email");
      return;
    }
  
    try {
      const priceRange = calculatePriceRange();
      const priceRangeARS = {
        min: priceRange.min * DOLAR_BLUE,
        max: priceRange.max * DOLAR_BLUE,
      };
  
      // Enviar a la API
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          apellido: formData.apellido,
          email: formData.email,
          whatsapp: formData.whatsapp,
          localidad: formData.localidad,
          metros: formData.metros,
          calidad: formData.calidad,
          mensaje: formData.mensaje,
          presupuestoMinUSD: priceRange.min,
          presupuestoMaxUSD: priceRange.max,
          presupuestoMinARS: priceRangeARS.min,
          presupuestoMaxARS: priceRangeARS.max,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Error al guardar el lead');
      }
  
      setShowResult(true);
      setTimeout(() => {
        document.getElementById("result-box")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
  
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al guardar tu consulta. Por favor intentá de nuevo o escribinos por WhatsApp.');
    }
  };

  const calculatePriceRange = () => {
    const calidadOption = CALIDAD_OPTIONS.find((c) => c.id === formData.calidad);
    if (!calidadOption) return { min: 0, max: 0, usd: 0 };
    const baseTotal = formData.metros * COSTO_BASE_USD * calidadOption.multiplier;
    const min = Math.round(baseTotal * 0.9);
    const max = Math.round(baseTotal * 1.1);
    return { min, max, usd: Math.round(baseTotal) };
  };

  const priceRange = calculatePriceRange();
  const priceRangeARS = {
    min: priceRange.min * DOLAR_BLUE,
    max: priceRange.max * DOLAR_BLUE,
  };

  // NUEVO: Calcular anticipo y cuotas
  const anticipoARS = {
    min: Math.round(priceRangeARS.min * 0.4),
    max: Math.round(priceRangeARS.max * 0.4),
  };
  const cuotaARS = {
    min: Math.round((priceRangeARS.min * 0.6) / 12),
    max: Math.round((priceRangeARS.max * 0.6) / 12),
  };
  const anticipoUSD = {
    min: Math.round(priceRange.min * 0.4),
    max: Math.round(priceRange.max * 0.4),
  };
  const cuotaUSD = {
    min: Math.round((priceRange.min * 0.6) / 12),
    max: Math.round((priceRange.max * 0.6) / 12),
  };

  const sendToWhatsApp = () => {
    const calidadOption = CALIDAD_OPTIONS.find((c) => c.id === formData.calidad);
    const whatsappNumber = formData.whatsapp ? formData.whatsapp.replace(/\D/g, "") : "";
    const fullPhone = whatsappNumber ? `+54 ${whatsappNumber}` : "No especificado";
    
    let message = `¡Hola! Soy ${formData.nombre} ${formData.apellido}.%0A%0A`;
    message += `Acabo de usar la calculadora de presupuesto:%0A`;
    message += `📐 Metros cuadrados: ${formData.metros} m²%0A`;
    message += `✨ Calidad: ${calidadOption?.label}%0A`;
    message += `📍 Localidad: ${formData.localidad || "No especificada"}%0A`;
    message += `💰 Presupuesto estimado: $${priceRangeARS.min.toLocaleString("es-AR")} - $${priceRangeARS.max.toLocaleString("es-AR")} ARS%0A`;
    message += `(USD ${priceRange.min.toLocaleString("es-AR")} - ${priceRange.max.toLocaleString("es-AR")})%0A`;
    message += `💵 Anticipo (40%): $${anticipoARS.min.toLocaleString("es-AR")} - $${anticipoARS.max.toLocaleString("es-AR")} ARS%0A`;
    message += `📅 12 cuotas: $${cuotaARS.min.toLocaleString("es-AR")} - $${cuotaARS.max.toLocaleString("es-AR")} ARS/mes%0A`;
    message += `📱 WhatsApp: ${fullPhone}%0A`;
    message += `📧 Email: ${formData.email}`;
    
    if (formData.mensaje) {
      message += `%0A%0A💬 Mensaje: ${formData.mensaje}`;
    }
    
    message += `%0A%0A¿Podemos coordinar una visita para ver mi proyecto en detalle?`;

    const whatsappUrl = `${WHATSAPP_URL}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  const resetCalculator = () => {
    setCurrentStep(1);
    setFormData({
      metros: 40,
      calidad: "estandar",
      nombre: "",
      apellido: "",
      localidad: "",
      whatsapp: "",
      email: "",
      mensaje: "",
    });
    setShowResult(false);
  };

  return (
    <section id="calculadora" className="relative overflow-hidden bg-[#fbfbfa] px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(197,160,115,0.05),transparent_55%)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-3xl">
        {!showResult ? (
          <>
            <div className="mb-10 text-center">
              <p className="mb-5 inline-flex rounded-full border border-[#c5a073]/30 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c5a073] sm:text-xs">
                Calculadora de presupuesto
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl md:text-5xl">
                Calculá el costo de tu cabaña
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg">
                Ingresá los metros cuadrados y obtené un presupuesto estimado en segundos
              </p>
            </div>

            <div className="mb-10 flex justify-center gap-3">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`flex h-10 w-10 items-center justify-center rounded-full font-bold transition-all ${
                    step === currentStep
                      ? "bg-[#c5a073] text-white"
                      : step < currentStep
                      ? "bg-emerald-800 text-white"
                      : "bg-zinc-200 text-zinc-500"
                  }`}
                >
                  {step}
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-zinc-200/60 bg-white p-6 shadow-sm sm:p-8">
              <form onSubmit={handleSubmit}>
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <label className="mb-3 block text-sm font-semibold text-zinc-900">
                        ¿Cuántos metros cuadrados querés construir?
                      </label>
                      <div className="space-y-4">
                        <input
                          type="range"
                          min="10"
                          max="150"
                          step="5"
                          value={formData.metros}
                          onChange={(e) => handleInputChange("metros", parseInt(e.target.value))}
                          className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-[#c5a073]"
                        />
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-zinc-500">10 m²</span>
                          <div className="text-center">
                            <span className="text-3xl font-bold text-[#c5a073]">{formData.metros}</span>
                            <span className="text-sm text-zinc-600 ml-2">m²</span>
                          </div>
                          <span className="text-sm text-zinc-500">150 m²</span>
                        </div>
                        <input
                          type="number"
                          min="10"
                          max="500"
                          value={formData.metros}
                          onChange={(e) => handleInputChange("metros", parseInt(e.target.value) || 10)}
                          className="w-full rounded-xl border-2 border-zinc-200 px-4 py-3 text-center text-sm transition-all focus:border-[#c5a073] focus:outline-none focus:ring-2 focus:ring-[#c5a073]/10"
                          placeholder="O ingresá un valor exacto"
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => nextStep(2)}
                      className="w-full rounded-xl bg-gradient-to-r from-[#c5a073] to-[#a8895f] px-6 py-4 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Siguiente →
                    </button>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <label className="mb-4 block text-sm font-semibold text-zinc-900">
                        ¿Qué nivel de terminaciones buscás?
                      </label>
                      <div className="grid gap-3">
                        {CALIDAD_OPTIONS.map((option) => (
                          <label
                            key={option.id}
                            className={`cursor-pointer rounded-xl border-2 p-4 transition-all ${
                              formData.calidad === option.id
                                ? "border-[#c5a073] bg-[#c5a073]/10"
                                : "border-zinc-200 hover:border-zinc-300"
                            }`}
                          >
                            <input
                              type="radio"
                              name="calidad"
                              value={option.id}
                              checked={formData.calidad === option.id}
                              onChange={(e) => handleInputChange("calidad", e.target.value)}
                              className="sr-only"
                            />
                            <div className="flex items-start gap-3">
                              <span className="text-3xl">{option.icon}</span>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <span className="font-semibold text-zinc-900">{option.label}</span>
                                  <span className="text-sm font-bold text-[#c5a073]">
                                    USD {option.pricePerM2}/m²
                                  </span>
                                </div>
                                <p className="mt-1 text-xs text-zinc-600">{option.description}</p>
                              </div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="flex-1 rounded-xl border-2 border-zinc-200 px-6 py-4 text-sm font-semibold text-zinc-700 transition-all hover:border-zinc-300 hover:bg-zinc-50"
                      >
                        ← Atrás
                      </button>
                      <button
                        type="button"
                        onClick={() => nextStep(3)}
                        className="flex-1 rounded-xl bg-gradient-to-r from-[#c5a073] to-[#a8895f] px-6 py-4 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                      >
                        Siguiente →
                      </button>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-800">
                      <p className="font-semibold">📐 Resumen de tu proyecto:</p>
                      <p className="mt-2">{formData.metros} m² · {CALIDAD_OPTIONS.find(c => c.id === formData.calidad)?.label}</p>
                      <p className="mt-1 text-xs">
                        Presupuesto estimado: ${priceRangeARS.min.toLocaleString("es-AR")} - ${priceRangeARS.max.toLocaleString("es-AR")} ARS
                      </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-zinc-900">
                          Tu nombre *
                        </label>
                        <input
                          type="text"
                          value={formData.nombre}
                          onChange={(e) => handleInputChange("nombre", e.target.value)}
                          placeholder="Ej: Juan"
                          className="w-full rounded-xl border-2 border-zinc-200 px-4 py-3 text-sm transition-all focus:border-[#c5a073] focus:outline-none focus:ring-2 focus:ring-[#c5a073]/10"
                          required
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-semibold text-zinc-900">
                          Tu apellido *
                        </label>
                        <input
                          type="text"
                          value={formData.apellido}
                          onChange={(e) => handleInputChange("apellido", e.target.value)}
                          placeholder="Ej: Pérez"
                          className="w-full rounded-xl border-2 border-zinc-200 px-4 py-3 text-sm transition-all focus:border-[#c5a073] focus:outline-none focus:ring-2 focus:ring-[#c5a073]/10"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-zinc-900">
                        Localidad donde querés construir *
                      </label>
                      <input
                        type="text"
                        list="localidades-list"
                        value={formData.localidad}
                        onChange={(e) => handleInputChange("localidad", e.target.value)}
                        placeholder="Ej: Villa Dolores, Mina Clavero, Merlo..."
                        className="w-full rounded-xl border-2 border-zinc-200 px-4 py-3 text-sm transition-all focus:border-[#c5a073] focus:outline-none focus:ring-2 focus:ring-[#c5a073]/10"
                        required
                      />
                      <datalist id="localidades-list">
                        <optgroup label="🏔️ Valle de Traslasierra">
                          {["Villa Dolores", "Villa Sarmiento", "Villa de las Rosas", "Los Pozos",
                            "Los Hornillos", "Arroyo de Los Patos", "Nono", "Mina Clavero",
                            "Cura Brochero", "San Lorenzo", "San Javier", "Las Chacras", "La Paz",
                            "Loma Bola", "Quebracho Ladeado", "Luyaba", "La Población", "Las Tapias",
                            "San José", "Panaholma", "Cruz de Caña", "La Ramada"].map(loc => (
                            <option key={loc} value={loc} />
                          ))}
                        </optgroup>
                        <optgroup label="🌲 Valle de Punilla">
                          {["Las Jarillas", "San Antonio", "Carlos Paz", "Bialet Masse",
                            "Villa Bustos", "Santa María de Punilla", "Cosquín", "La Falda",
                            "Casa Grande", "Villa Giardino", "Tanti", "Huerta Grande"].map(loc => (
                            <option key={loc} value={loc} />
                          ))}
                        </optgroup>
                        <optgroup label="🏞️ Valle de Calamuchita">
                          {["Villa General Belgrano", "Santa Rosa de Calamuchita", "Embalse",
                            "San Agustín", "La Cumbrecita", "Los Reartes"].map(loc => (
                            <option key={loc} value={loc} />
                          ))}
                        </optgroup>
                        <optgroup label="☀️ San Luis">
                          {["Merlo", "Carpintería", "Los Molles", "Cortaderas", "Quines"].map(loc => (
                            <option key={loc} value={loc} />
                          ))}
                        </optgroup>
                      </datalist>
                      <p className="mt-1 text-xs text-zinc-500">
                        Empezá a escribir y te sugerimos localidades
                      </p>
                    </div>

                    {/* EMAIL CON SUGERENCIAS ARREGLADO */}
                    <div className="relative">
                      <label className="mb-2 block text-sm font-semibold text-zinc-900">
                        Tu email *
                      </label>
                      <input
                        type="text"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        onBlur={handleEmailBlur}
                        onFocus={() => {
                          if (formData.email && !formData.email.includes("@")) {
                            setEmailSuggestions(getEmailSuggestions(formData.email));
                          }
                        }}
                        placeholder="Ej: juan"
                        className="w-full rounded-xl border-2 border-zinc-200 px-4 py-3 text-sm transition-all focus:border-[#c5a073] focus:outline-none focus:ring-2 focus:ring-[#c5a073]/10"
                        required
                        autoComplete="email"
                      />
                      
                      {emailSuggestions.length > 0 && (
                        <div className="absolute z-20 mt-1 w-full rounded-xl border border-zinc-200 bg-white shadow-lg overflow-hidden">
                          {emailSuggestions.map((suggestion) => (
                            <button
                              key={suggestion}
                              type="button"
                              onMouseDown={(e) => {
                                e.preventDefault(); // Previene el blur del input
                                selectEmailSuggestion(suggestion);
                              }}
                              className="flex w-full items-center gap-1 px-4 py-2.5 text-left text-sm transition-colors hover:bg-[#c5a073]/10 border-b border-zinc-100 last:border-b-0"
                            >
                              <span className="text-zinc-900 font-medium">{formData.email}</span>
                              <span className="text-[#c5a073] font-semibold">@{suggestion.split("@")[1]}</span>
                            </button>
                          ))}
                        </div>
                      )}
                      
                      <p className="mt-1 text-xs text-zinc-500">
                        Escribí tu usuario y elegí el dominio, o completá el email completo
                      </p>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-zinc-900">
                        Tu WhatsApp (opcional - se asume +54)
                      </label>
                      <div className="flex">
                        <span className="inline-flex items-center rounded-l-xl border border-r-0 border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-500">
                          +54
                        </span>
                        <input
                          type="tel"
                          value={formData.whatsapp}
                          onChange={(e) => handleInputChange("whatsapp", e.target.value)}
                          placeholder="Ej: 3544123456"
                          className="flex-1 rounded-r-xl border-2 border-zinc-200 px-4 py-3 text-sm transition-all focus:border-[#c5a073] focus:outline-none focus:ring-2 focus:ring-[#c5a073]/10"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-zinc-900">
                        Mensaje (opcional)
                      </label>
                      <textarea
                        value={formData.mensaje}
                        onChange={(e) => handleInputChange("mensaje", e.target.value)}
                        placeholder="Contanos un poco más sobre tu proyecto..."
                        rows={3}
                        className="w-full rounded-xl border-2 border-zinc-200 px-4 py-3 text-sm transition-all focus:border-[#c5a073] focus:outline-none focus:ring-2 focus:ring-[#c5a073]/10 resize-none"
                      />
                    </div>

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="flex-1 rounded-xl border-2 border-zinc-200 px-6 py-4 text-sm font-semibold text-zinc-700 transition-all hover:border-zinc-300 hover:bg-zinc-50"
                      >
                        ← Atrás
                      </button>
                      <button
                        type="submit"
                        className="flex-1 rounded-xl bg-gradient-to-r from-[#c5a073] to-[#a8895f] px-6 py-4 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                      >
                        🎯 Ver mi presupuesto
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </>
        ) : (
          /* RESULTADO CON ANTICIPO Y CUOTAS */
          <div id="result-box" className="rounded-2xl bg-gradient-to-br from-[#c5a073] to-[#a8895f] p-6 text-white shadow-xl sm:p-8">
            <div className="text-center">
              <h3 className="text-xl font-bold sm:text-2xl">📊 Tu presupuesto estimado:</h3>
              
              {/* Precio total en PESOS grande */}
              <div className="my-6">
                <div className="text-4xl font-extrabold sm:text-5xl">
                  ${priceRangeARS.min.toLocaleString("es-AR")} - ${priceRangeARS.max.toLocaleString("es-AR")}
                </div>
                <div className="mt-1 text-sm font-medium text-white/90">
                  pesos argentinos
                </div>
              </div>

              {/* Precio en USD pequeño */}
              <div className="mb-6 rounded-lg bg-white/10 px-4 py-2 inline-block">
                <div className="text-lg font-semibold">
                  USD {priceRange.min.toLocaleString("es-AR")} - {priceRange.max.toLocaleString("es-AR")}
                </div>
                <div className="text-xs text-white/80">
                  dólares estadounidenses
                </div>
              </div>

              {/* NUEVO: Anticipo y cuotas destacados */}
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {/* Anticipo */}
                <div className="rounded-xl bg-white/15 backdrop-blur-sm p-4 border border-white/20">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-xl">💵</span>
                    <span className="text-sm font-semibold uppercase tracking-wide">Anticipo (40%)</span>
                  </div>
                  <div className="text-2xl font-bold sm:text-3xl">
                    ${anticipoARS.min.toLocaleString("es-AR")}
                  </div>
                  <div className="text-xs text-white/80 mt-1">
                    - ${anticipoARS.max.toLocaleString("es-AR")}
                  </div>
                  <div className="text-xs text-white/70 mt-2">
                    USD {anticipoUSD.min.toLocaleString()} - {anticipoUSD.max.toLocaleString()}
                  </div>
                </div>

                {/* Cuotas */}
                <div className="rounded-xl bg-white/15 backdrop-blur-sm p-4 border border-white/20">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-xl">📅</span>
                    <span className="text-sm font-semibold uppercase tracking-wide">12 cuotas s/interés</span>
                  </div>
                  <div className="text-2xl font-bold sm:text-3xl">
                    ${cuotaARS.min.toLocaleString("es-AR")}
                  </div>
                  <div className="text-xs text-white/80 mt-1">
                    - ${cuotaARS.max.toLocaleString("es-AR")} /mes
                  </div>
                  <div className="text-xs text-white/70 mt-2">
                    USD {cuotaUSD.min.toLocaleString()} - {cuotaUSD.max.toLocaleString()} /mes
                  </div>
                </div>
              </div>

              {/* Detalles del proyecto */}
              <div className="mt-6 rounded-xl bg-white/20 p-5 text-left text-sm">
                <p className="mb-2">
                  <strong>Superficie:</strong> {formData.metros} m²
                </p>
                <p className="mb-2">
                  <strong>Calidad:</strong> {CALIDAD_OPTIONS.find(c => c.id === formData.calidad)?.label}
                </p>
                <p className="mb-2">
                  <strong>Localidad:</strong> {formData.localidad || "No especificada"}
                </p>
                <p className="mb-2">
                  <strong>Precio por m²:</strong> USD {CALIDAD_OPTIONS.find(c => c.id === formData.calidad)?.pricePerM2}
                </p>
                <p className="mt-4 text-xs opacity-90">
                  * Precio estimado sujeto a cotización del dólar blue del día (${DOLAR_BLUE})
                  <br />
                  ** No incluye movimiento de suelos, trámites municipales ni mobiliario
                  <br />
                  *** El presupuesto final se define tras visita técnica y planos aprobados
                </p>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={sendToWhatsApp}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-4 font-bold text-white shadow-lg transition-all hover:scale-105"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  Consultar por WhatsApp
                </button>
                <button
                  onClick={resetCalculator}
                  className="flex-1 rounded-full border-2 border-white/30 px-6 py-4 font-semibold text-white transition-all hover:bg-white/10"
                >
                  Calcular otro
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}