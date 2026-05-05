import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[100svh] items-center justify-center px-6">
      <div className="text-center">
        <p className="eyebrow">404</p>
        <h1 className="font-display mt-6 text-5xl text-[var(--text-primary)]">
          Off the chart.
        </h1>
        <p className="mt-4 text-[var(--text-muted)]">
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
