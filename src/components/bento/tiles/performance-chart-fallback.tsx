export function PerformanceChartFallback() {
  return (
    <svg
      viewBox="0 0 600 176"
      className="h-full w-full"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="perf-mizan-fb" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D4A574" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#D4A574" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Benchmark dashed */}
      <path
        d="M0 130 L 50 130 L 100 124 L 150 138 L 200 124 L 250 113 L 300 102 L 350 98 L 400 92 L 450 86 L 500 78 L 600 64"
        fill="none"
        stroke="rgba(139,111,71,0.45)"
        strokeDasharray="3 4"
        strokeWidth="1.25"
      />
      {/* Mizan area */}
      <path
        d="M0 130 L 50 116 L 100 108 L 150 138 L 200 122 L 250 102 L 300 86 L 350 75 L 400 64 L 450 53 L 500 42 L 600 26 L 600 176 L 0 176 Z"
        fill="url(#perf-mizan-fb)"
      />
      <path
        d="M0 130 L 50 116 L 100 108 L 150 138 L 200 122 L 250 102 L 300 86 L 350 75 L 400 64 L 450 53 L 500 42 L 600 26"
        fill="none"
        stroke="#D4A574"
        strokeWidth="1.75"
      />
    </svg>
  );
}
