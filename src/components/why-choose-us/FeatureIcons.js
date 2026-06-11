export function iconProps(className = "h-[22px] w-[22px] text-emerald-500") {
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

export function KeyIcon() {
  return (
    <svg {...iconProps()}>
      <circle cx="7.5" cy="15.5" r="5.5" />
      <path d="m21 2-2 2m-7.5 7.5L19 4" />
    </svg>
  );
}

export function TrendingUpIcon() {
  return (
    <svg {...iconProps()}>
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}

export function HammerIcon() {
  return (
    <svg {...iconProps()}>
      <path d="m15 12-8.373 8.373a1 1 0 1 1-3-3L12 9" />
      <path d="m18.649 11.649-2.648-2.649a1 1 0 1 1 3-3l2.65 2.65a1 1 0 1 1-3 3z" />
      <path d="m21.5 8.5-3.535-3.535" />
      <path d="M4 21l4-4" />
    </svg>
  );
}

export function TreeIcon() {
  return (
    <svg {...iconProps()}>
      <path d="m17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2a1 1 0 0 1-.8-1.2l2-6a1 1 0 0 1 1.8 0l2 6a1 1 0 0 1-.8 1.2H15l3.3 3.3a1 1 0 0 1-.7 1.7H17Z" />
      <path d="M12 22v-3" />
    </svg>
  );
}

export function MountainIcon() {
  return (
    <svg {...iconProps()}>
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

export function SlidersIcon() {
  return (
    <svg {...iconProps()}>
      <line x1="4" y1="21" x2="4" y2="14" />
      <line x1="4" y1="10" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" />
      <line x1="20" y1="12" x2="20" y2="3" />
      <line x1="1" y1="14" x2="7" y2="14" />
      <line x1="9" y1="8" x2="15" y2="8" />
      <line x1="17" y1="16" x2="23" y2="16" />
    </svg>
  );
}
