/**
 * Static SVG snapshot of the portfolio chart shape. Renders during SSR and
 * while Recharts (~120 KB) is downloading in the background. Same gold
 * gradient + curve shape so the swap is invisible.
 */
export function PortfolioMiniFallback() {
  return (
    <svg
      viewBox="0 0 800 240"
      className="h-[240px] w-full"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="mizan-area-fb" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D4A574" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#D4A574" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0 180 C 80 165, 140 175, 200 200 S 280 215, 320 195 S 420 130, 500 100 S 620 60, 720 35 L 800 25 L 800 240 L 0 240 Z"
        fill="url(#mizan-area-fb)"
      />
      <path
        d="M0 180 C 80 165, 140 175, 200 200 S 280 215, 320 195 S 420 130, 500 100 S 620 60, 720 35 L 800 25"
        fill="none"
        stroke="#D4A574"
        strokeWidth="1.75"
      />
    </svg>
  );
}
