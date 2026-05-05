"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Enter a valid email address."),
  message: z.string().min(1, "Tell us a little about what you need.").max(2000),
});

type FormValues = z.infer<typeof schema>;
type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
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
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
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
        className="flex items-center gap-3 rounded-md border border-[var(--gold-primary)] bg-[var(--bg-surface)] px-5 py-4 text-sm text-[var(--text-primary)]"
      >
        <Check aria-hidden className="h-4 w-4 text-[var(--gold-primary)]" />
        Received. We'll be in touch within two business days.
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div>
        <label htmlFor="contact-email" className="eyebrow block">
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          autoComplete="email"
          placeholder="you@domain.com"
          aria-invalid={Boolean(errors.email)}
          {...register("email", { required: true })}
          className="mt-3 w-full rounded-md border border-[var(--border-default)] bg-[var(--bg-surface)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder-[var(--text-subtle)] outline-none transition-colors duration-150 focus:border-[var(--gold-primary)]"
        />
        {errors.email ? (
          <p role="alert" className="mt-2 text-xs text-[var(--text-muted)]">
            {errors.email.message}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="contact-message" className="eyebrow block">
          What can we help with
        </label>
        <textarea
          id="contact-message"
          rows={5}
          placeholder="Briefly: who you are, what you're tracking, and what you'd like Mizan to do."
          aria-invalid={Boolean(errors.message)}
          {...register("message", { required: true })}
          className="mt-3 w-full rounded-md border border-[var(--border-default)] bg-[var(--bg-surface)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder-[var(--text-subtle)] outline-none transition-colors duration-150 focus:border-[var(--gold-primary)]"
        />
        {errors.message ? (
          <p role="alert" className="mt-2 text-xs text-[var(--text-muted)]">
            {errors.message.message}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group inline-flex items-center justify-center gap-2 rounded-md bg-[var(--gold-primary)] px-6 py-3 text-sm font-medium text-[var(--bg-base)] transition-colors duration-150 hover:bg-[var(--gold-cream)] disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send"}
        <ArrowRight
          aria-hidden
          className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1"
        />
      </button>

      {status === "error" && error ? (
        <p role="alert" className="text-xs text-[var(--text-muted)]">
          {error}
        </p>
      ) : null}
    </form>
  );
}
