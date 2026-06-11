import IconBox from "./IconBox";

export default function FeatureCard({ feature, index, visible }) {
  const Icon = feature.icon;

  return (
    <article
      className={`group rounded-2xl border border-white/[0.06] bg-zinc-900/40 p-8 backdrop-blur-sm transition-all duration-500 hover:border-emerald-500/25 hover:bg-zinc-900/70 ${
        visible ? "animate-fade-in-up opacity-100" : "translate-y-6 opacity-0"
      }`}
      style={{ animationDelay: visible ? `${0.2 + index * 0.08}s` : undefined }}
    >
      <IconBox>
        <Icon />
      </IconBox>
      <h3 className="text-lg font-semibold tracking-tight text-white">
        {feature.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-[15px]">
        {feature.description}
      </p>
    </article>
  );
}
