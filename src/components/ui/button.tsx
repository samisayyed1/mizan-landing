import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "ghost" | "tertiary";

type Props = {
  href: string;
  variant?: Variant;
  external?: boolean;
  children: ReactNode;
  withArrow?: boolean;
  className?: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children">;

const base =
  "group inline-flex items-center justify-center gap-2 text-sm font-medium tracking-tight transition-colors duration-150 ease-[cubic-bezier(0.33,1,0.68,1)] outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold-primary)]";

const variants: Record<Variant, string> = {
  primary:
    "rounded-md bg-[var(--gold-primary)] text-[var(--bg-base)] hover:bg-[var(--gold-cream)] px-6 py-3 shadow-[0_8px_32px_-12px_rgba(212,165,116,0.45)]",
  ghost:
    "rounded-md border border-[var(--border-default)] text-[var(--text-primary)] hover:border-[var(--gold-primary)] hover:text-[var(--gold-primary)] px-6 py-3 bg-transparent",
  tertiary:
    "text-[var(--gold-cream)] hover:text-[var(--gold-primary)] underline-offset-4 hover:underline",
};

/**
 * Static link button. Three variants: primary (the one gold-primary CTA per
 * viewport), ghost (outlined), tertiary (text-only).
 */
export function Button({
  href,
  variant = "primary",
  external,
  children,
  withArrow,
  className,
  ...rest
}: Props) {
  const classes = cn(base, variants[variant], className);
  const arrow = withArrow ? (
    <ArrowRight
      aria-hidden
      className="h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-1"
    />
  ) : null;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...rest}>
        {children}
        {arrow}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
      {arrow}
    </Link>
  );
}
