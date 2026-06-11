export default function AttributeCard({ title, description, visible, index }) {
  return (
    <article
      className={`relative overflow-hidden rounded-xl border border-zinc-200/60 bg-white p-6 shadow-sm transition-all duration-700 ${
        visible ? "animate-fade-in-up opacity-100" : "opacity-0"
      }`}
      style={{ animationDelay: visible ? `${0.15 + index * 0.1}s` : undefined }}
    >
      <span
        className="absolute bottom-0 left-0 top-0 w-1 bg-gradient-to-b from-[#c5a073] to-[#c5a073]/40"
        aria-hidden
      />
      <div className="pl-3">
        <h3 className="mb-2 font-semibold tracking-tight text-zinc-900">{title}</h3>
        <p className="text-sm leading-relaxed text-zinc-600">{description}</p>
      </div>
    </article>
  );
}
