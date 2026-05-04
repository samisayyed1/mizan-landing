/** Static SVG approximation of the hero sphere. Used as Suspense fallback. */
export function SphereFallback() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,165,116,0.08),transparent_60%)]" />
      <svg viewBox="0 0 400 400" className="h-full w-full max-w-[480px] opacity-70" aria-hidden>
        <defs>
          <linearGradient id="goldA" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5E6C8" />
            <stop offset="50%" stopColor="#D4A574" />
            <stop offset="100%" stopColor="#8B6F47" />
          </linearGradient>
        </defs>
        {Array.from({ length: 18 }).map((_, i) => {
          const r = 60 + i * 7;
          const tilt = (i * 11) % 90;
          return (
            <ellipse
              // biome-ignore lint/suspicious/noArrayIndexKey: static decorative array, never reordered
              key={i}
              cx="200"
              cy="200"
              rx={r}
              ry={r * 0.45}
              transform={`rotate(${tilt} 200 200)`}
              stroke="url(#goldA)"
              strokeWidth="1"
              fill="none"
              opacity={0.55}
            />
          );
        })}
        <circle cx="200" cy="200" r="14" fill="url(#goldA)" opacity="0.35" />
      </svg>
    </div>
  );
}
