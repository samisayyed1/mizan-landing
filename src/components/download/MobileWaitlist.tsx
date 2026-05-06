"use client";

import { ArrowRight } from "lucide-react";
import { type FormEvent, useState } from "react";

/**
 * Mobile tab content. Single centered card — phone glyph, headline,
 * body, and an email-capture form that posts to /api/waitlist.
 *
 * The shared waitlist endpoint accepts an optional `tier` enum; we
 * omit it on this surface because mobile sign-ups aren't tied to a
 * pricing tier. The API stores them under the same KV namespace.
 */
function PhoneGlyph() {
  return (
    <svg
      viewBox="0 0 32 64"
      width="32"
      height="64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-[var(--gold-deep)]"
      aria-hidden
    >
      <rect x="3" y="2" width="26" height="60" rx="5" />
      <line x1="13" y1="56" x2="19" y2="56" />
      <line x1="12" y1="6" x2="20" y2="6" />
    </svg>
  );
}

type Status = "idle" | "submitting" | "success" | "error";

export function MobileWaitlist() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setError(null);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (!res.ok || json.ok !== true) {
        throw new Error(json.error ?? "Couldn't sign you up. Try again.");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Couldn't sign you up.");
    }
  }

  return (
    <div className="mx-auto flex max-w-[560px] flex-col items-center text-center">
      <PhoneGlyph />

      <h2
        className="font-display mt-8 text-balance text-[var(--text-primary)]"
        style={{
          fontSize: "clamp(36px, 4.4vw, 56px)",
          lineHeight: 1.08,
          fontVariationSettings: "'opsz' 56, 'wght' 500, 'SOFT' 30, 'WONK' 0",
        }}
      >
        Mizan, in your{" "}
        <span className="italic text-[var(--gold-cream)]">pocket.</span>
      </h2>

      <p className="mt-6 max-w-[480px] text-base leading-relaxed text-[var(--text-muted)]">
        Native iOS and Android apps are in development. Subscribe to Mizan
        Connect today and your portfolio will sync seamlessly when mobile
        arrives.
      </p>

      {status === "success" ? (
        <p className="mt-10 font-mono-data text-[13px] uppercase tracking-[0.2em] text-[var(--gold-cream)]">
          We&rsquo;ll let you know
        </p>
      ) : (
        <form
          onSubmit={onSubmit}
          className="mt-10 flex w-full max-w-[420px] flex-col items-stretch gap-3 sm:flex-row"
        >
          <label className="sr-only" htmlFor="mobile-waitlist-email">
            Email
          </label>
          <input
            id="mobile-waitlist-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@domain.com"
            disabled={status === "submitting"}
            className="h-12 flex-1 rounded-md border border-[var(--border-default)] bg-[var(--bg-surface)] px-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-subtle)] outline-none transition-colors duration-150 focus:border-[var(--gold-primary)] disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[var(--gold-primary)] px-6 text-sm font-medium tracking-tight text-[var(--bg-base)] transition-colors duration-200 hover:bg-[var(--gold-cream)] disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold-primary)]"
          >
            {status === "submitting" ? "Sending…" : "Notify me"}
            {status !== "submitting" ? (
              <ArrowRight
                aria-hidden
                className="h-3.5 w-3.5"
                strokeWidth={1.5}
              />
            ) : null}
          </button>
        </form>
      )}

      {status === "error" && error ? (
        <p className="mt-3 text-[13px] text-[var(--text-muted)]">{error}</p>
      ) : null}
    </div>
  );
}
