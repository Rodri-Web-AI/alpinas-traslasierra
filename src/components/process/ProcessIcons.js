function iconProps(className = "h-5 w-5 text-[#c5a073]") {
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

export function ChatIcon() {
  return (
    <svg {...iconProps()}>
      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
    </svg>
  );
}

export function DesignIcon() {
  return (
    <svg {...iconProps()}>
      <path d="M12 3l7 4v10l-7 4-7-4V7l7-4z" />
      <path d="M12 7v10M5 7l7 4 7-4" />
      <path d="M3 21h18" />
    </svg>
  );
}

export function DocumentIcon() {
  return (
    <svg {...iconProps()}>
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
    </svg>
  );
}

export function HardHatIcon() {
  return (
    <svg {...iconProps()}>
      <path d="M2 18a1 1 0 001 1h18a1 1 0 001-1v-2a6 6 0 00-6-6H8a6 6 0 00-6 6v2z" />
      <path d="M12 2v4M8 6h8" />
    </svg>
  );
}

export function CheckCircleIcon() {
  return (
    <svg {...iconProps()}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}
