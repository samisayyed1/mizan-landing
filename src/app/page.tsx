/**
 * Landing page — composed of editorial sections built progressively in the
 * `feat/landing-overhaul` branch. Foundation commit ships an intentional
 * stub; subsequent commits replace this with hero, stats, showcase, bento,
 * founder letter, security, pricing, FAQ, final CTA, footer.
 */
export default function Home() {
  return (
    <main className="flex min-h-[100svh] items-center justify-center px-6">
      <div className="text-center">
        <p className="eyebrow">Foundation</p>
        <h1 className="font-display mt-6 text-5xl text-[var(--text-primary)]">
          Mizan
        </h1>
        <p className="mt-4 max-w-md text-[var(--text-muted)]">
          A private portfolio terminal. The page rebuild is in progress.
        </p>
      </div>
    </main>
  );
}
