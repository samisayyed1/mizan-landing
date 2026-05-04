import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[100svh] items-center justify-center px-6">
      <div className="text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--gold-primary)]">
          404
        </p>
        <h1 className="mt-4 font-serif text-5xl font-light tracking-[-0.02em] text-[var(--text-primary)]">
          Off the chart.
        </h1>
        <p className="mt-4 text-base text-[var(--text-secondary)]">
          That page isn't part of the portfolio.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-md bg-[var(--gold-primary)] px-6 py-3 text-sm font-medium text-[var(--bg-base)] transition-colors hover:bg-[var(--gold-cream)]"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
