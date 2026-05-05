/**
 * Ambient backdrop for the hero. Three slowly-drifting gold blobs +
 * a sparse field of slow-rising motes. Pure CSS animations (no JS),
 * gated by prefers-reduced-motion via the global contract.
 */

const PARTICLES = [
  { left: "8%", top: "18%", delay: "0s", size: 2, dur: "14s" },
  { left: "14%", top: "62%", delay: "3s", size: 1.5, dur: "16s" },
  { left: "22%", top: "38%", delay: "6s", size: 2, dur: "12s" },
  { left: "32%", top: "82%", delay: "1.5s", size: 1.5, dur: "18s" },
  { left: "44%", top: "14%", delay: "4.5s", size: 2, dur: "15s" },
  { left: "56%", top: "70%", delay: "0s", size: 1, dur: "20s" },
  { left: "62%", top: "30%", delay: "7s", size: 2, dur: "17s" },
  { left: "72%", top: "58%", delay: "2s", size: 1.5, dur: "13s" },
  { left: "84%", top: "22%", delay: "5s", size: 2, dur: "16s" },
  { left: "92%", top: "50%", delay: "8s", size: 1, dur: "19s" },
  { left: "16%", top: "92%", delay: "9s", size: 1.5, dur: "14s" },
  { left: "78%", top: "82%", delay: "3.5s", size: 1.5, dur: "21s" },
];

export function AmbientGold() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Blob A — large, gold-cream, top-right */}
      <div
        className="ambient-drift-a absolute h-[520px] w-[520px] rounded-full opacity-50 blur-[120px]"
        style={{
          top: "-8%",
          right: "-6%",
          background: "radial-gradient(circle at center, rgba(245,230,200,0.22), transparent 65%)",
        }}
      />
      {/* Blob B — gold-primary, lower-left */}
      <div
        className="ambient-drift-b absolute h-[480px] w-[480px] rounded-full opacity-60 blur-[120px]"
        style={{
          bottom: "-12%",
          left: "-8%",
          background: "radial-gradient(circle at center, rgba(212,165,116,0.20), transparent 65%)",
        }}
      />
      {/* Blob C — small, gold-cream, mid */}
      <div
        className="ambient-drift-c absolute h-[280px] w-[280px] rounded-full blur-[80px]"
        style={{
          top: "40%",
          left: "42%",
          background: "radial-gradient(circle at center, rgba(245,230,200,0.16), transparent 60%)",
        }}
      />

      {/* Floating motes */}
      {PARTICLES.map((p) => (
        <span
          key={`${p.left}-${p.top}`}
          className="absolute rounded-full bg-[var(--gold-cream)]"
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: 0,
            animation: `float-up ${p.dur} linear ${p.delay} infinite`,
            boxShadow: "0 0 8px rgba(245,230,200,0.6)",
          }}
        />
      ))}

      {/* Vignette — darkens edges to focus eye on center */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(10,11,16,0.6) 100%)",
        }}
      />
    </div>
  );
}
