"use client";

import { useState } from "react";

function StepIconBox({ children }) {
  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#c5a073]/25 bg-[#c5a073]/10">
      {children}
    </span>
  );
}

export default function ProcessStep({
  step,
  index,
  visible,
  align,
}) {
  const Icon = step.icon;
  const isRight = align === "right";

  const [openTimeline, setOpenTimeline] = useState(false);

  return (
    <article
      className={`group rounded-2xl border border-zinc-200/60 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/20 hover:shadow-md sm:p-8 ${
        visible
          ? "animate-fade-in-up opacity-100"
          : "translate-y-6 opacity-0"
      }`}
      style={{
        animationDelay: visible
          ? `${0.2 + index * 0.1}s`
          : undefined,
      }}
    >
      {/* Header */}
      <div
        className={`mb-4 flex items-center gap-3 ${
          isRight
            ? "md:flex-row-reverse md:justify-end"
            : ""
        }`}
      >
        <StepIconBox>
          <Icon />
        </StepIconBox>

        <h3 className="text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">
          {step.title}
        </h3>
      </div>

      {/* Description */}
      <p
        className={`text-sm leading-relaxed text-zinc-600 sm:text-[15px] ${
          isRight ? "md:text-right" : ""
        }`}
      >
        {step.description}
      </p>

      {/* Highlight */}
      <div className={`mt-5 ${isRight ? "md:flex md:justify-end" : ""}`}>
        <p className="inline-flex rounded-full border border-emerald-800/20 bg-emerald-500/5 px-4 py-1.5 text-xs font-medium leading-snug text-emerald-800 sm:text-sm">
          {step.highlight}
        </p>
      </div>

      {/* Timeline Expandible */}
      {step.timeline && (
        <div className={`mt-6 ${isRight ? "md:flex md:justify-end" : ""}`}>
          <div className="w-full max-w-md">
            <button
              type="button"
              onClick={() => setOpenTimeline(!openTimeline)}
              className={`inline-flex items-center text-sm font-medium text-emerald-700 transition-colors hover:text-emerald-800 ${
                isRight ? "md:ml-auto" : ""
              }`}
            >
              ▼ Ver qué ocurre en esta etapa
            </button>

            <div
              className={`grid transition-all duration-500 ${
                openTimeline
                  ? "mt-5 grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="space-y-5 rounded-2xl border border-zinc-200/70 bg-zinc-50/80 p-5">

                  {step.timeline.map((phase) => (
                    <div key={phase.week}>
                      <h4 className="text-sm font-semibold text-zinc-900">
                        {phase.week}
                      </h4>

                      <ul className="mt-2 space-y-1.5">
                        {phase.tasks.map((task) => (
                          <li
                            key={task}
                            className="flex items-center gap-2 text-sm text-zinc-600"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                            {task}
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
      )}
    </article>
  );
}