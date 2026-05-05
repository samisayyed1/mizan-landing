import type { Metadata } from "next";
import { Footer } from "@/components/footer/footer";
import { Nav } from "@/components/nav/nav";
import { brand } from "@/content/copy";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Get in touch",
  description:
    "Mizan is built deliberately and supported personally. Reach the founder directly for early access, family-office onboarding, or operational questions.",
};

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main className="mx-auto flex min-h-[100svh] max-w-[var(--container-default)] flex-col px-6 pt-32 pb-16 md:px-10 md:pt-40">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <p className="eyebrow">Contact</p>
            <h1
              className="font-display mt-6 text-balance text-[var(--text-primary)]"
              style={{
                fontSize: "clamp(40px, 5.5vw, 88px)",
                lineHeight: 1.05,
                fontVariationSettings:
                  "'opsz' 144, 'wght' 400, 'SOFT' 30, 'WONK' 0",
              }}
            >
              Get in{" "}
              <span className="italic text-[var(--gold-cream)]">touch.</span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-[var(--text-muted)]">
              Mizan is built deliberately and supported personally. The founder
              reads every message. Most replies arrive within two business days.
            </p>

            <div className="mt-10 space-y-4 border-t border-[var(--border-subtle)] pt-8">
              <div>
                <p className="eyebrow">Direct</p>
                <a
                  href={`mailto:${brand.contactEmail}`}
                  className="mt-2 inline-block font-mono-data text-base text-[var(--gold-cream)] transition-colors duration-150 hover:text-[var(--gold-primary)]"
                >
                  {brand.contactEmail}
                </a>
              </div>
              <div>
                <p className="eyebrow">Time to first response</p>
                <p className="mt-2 font-mono-data text-base text-[var(--text-primary)] tabular">
                  &lt; 2 business days
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-8 md:p-10">
              <ContactForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
