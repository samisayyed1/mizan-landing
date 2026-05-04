"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Enter a valid email address."),
});

type FormValues = z.infer<typeof schema>;
type Status = "idle" | "submitting" | "success" | "error";

export function WaitlistForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    setStatus("submitting");
    setError(null);
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      setStatus("error");
      setError(parsed.error.errors[0]?.message ?? "Invalid input.");
      return;
    }
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: parsed.data.email }),
      });
      const json = (await res.json()) as { ok: boolean; error?: string };
      if (!json.ok) {
        setStatus("error");
        setError(json.error ?? "Something went wrong.");
        return;
      }
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
      setError("Network error. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        role="status"
        className="mx-auto flex max-w-md items-center justify-center gap-3 rounded-md border border-[var(--gold-primary)]/30 bg-[var(--bg-surface)] px-5 py-4 text-sm text-[var(--text-primary)]"
      >
        <Check aria-hidden className="h-4 w-4 text-[var(--gold-primary)]" />
        You're on the waitlist. We'll be in touch when Connect opens up.
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="Mizan Connect waitlist"
      className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
    >
      <label htmlFor="waitlist-email" className="sr-only">
        Email address
      </label>
      <input
        id="waitlist-email"
        type="email"
        autoComplete="email"
        placeholder="you@domain.com"
        aria-invalid={Boolean(errors.email)}
        {...register("email", { required: true })}
        className="flex-1 rounded-md border border-[var(--border-default)] bg-[var(--bg-surface)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none transition-colors focus:border-[var(--gold-primary)]"
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="group inline-flex items-center justify-center gap-2 rounded-md bg-[var(--gold-primary)] px-5 py-3 text-sm font-medium text-[var(--bg-base)] transition-colors hover:bg-[var(--gold-cream)] disabled:opacity-60"
      >
        {status === "submitting" ? "Joining…" : "Join waitlist"}
        <ArrowRight
          aria-hidden
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
        />
      </button>
      {status === "error" && error ? (
        <p
          role="alert"
          className="absolute mt-14 text-xs text-[var(--text-muted)] sm:relative sm:mt-2"
        >
          {error}
        </p>
      ) : null}
    </form>
  );
}
