import type { SVGProps } from "react";

const base = {
  width: 28,
  height: 28,
  viewBox: "0 0 28 28",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Layered concentric arcs — denotes diversified portfolio composition. */
export function IconPortfolio(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props} aria-hidden>
      <circle cx="14" cy="14" r="11" />
      <path d="M14 3a11 11 0 0 1 0 22" />
      <path d="M14 7a7 7 0 0 1 0 14" />
      <circle cx="14" cy="14" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Ascending bar + trend line. */
export function IconPerformance(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props} aria-hidden>
      <path d="M3 22h22" />
      <path d="M6 22V14" />
      <path d="M11 22V10" />
      <path d="M16 22v-4" />
      <path d="M21 22V6" />
      <path d="M3 9l6-3 6 4 6-6" />
    </svg>
  );
}

/** Constellation/dots — denotes AI / intelligence. */
export function IconAi(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props} aria-hidden>
      <circle cx="6" cy="8" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="14" cy="6" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="22" cy="10" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="9" cy="18" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="20" cy="20" r="1.5" fill="currentColor" stroke="none" />
      <path d="M6 8l8-2 8 4-3 10-11-2z" opacity="0.4" />
      <path d="M14 6L9 18" opacity="0.4" />
      <path d="M22 10l-2 10" opacity="0.4" />
    </svg>
  );
}

/** Two interlocking arcs — denotes Connect / sync. */
export function IconConnect(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props} aria-hidden>
      <path d="M9 6a8 8 0 0 0 0 16" />
      <path d="M19 22a8 8 0 0 0 0-16" />
      <circle cx="9" cy="14" r="2" />
      <circle cx="19" cy="14" r="2" />
    </svg>
  );
}

/** Target with arrow — goals. */
export function IconGoals(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props} aria-hidden>
      <circle cx="14" cy="14" r="10" />
      <circle cx="14" cy="14" r="6" />
      <circle cx="14" cy="14" r="2" />
      <path d="M14 4v3M14 21v3M4 14h3M21 14h3" />
    </svg>
  );
}

/** Globe with longitude lines — multi-currency. */
export function IconCurrency(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props} aria-hidden>
      <circle cx="14" cy="14" r="10" />
      <path d="M4 14h20" />
      <path d="M14 4a14 14 0 0 1 0 20" />
      <path d="M14 4a14 14 0 0 0 0 20" />
    </svg>
  );
}
