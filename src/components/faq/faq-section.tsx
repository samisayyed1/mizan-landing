import { Reveal } from "@/components/ui/reveal";
import { faqItems } from "@/content/faq";
import { FaqItem } from "./faq-item";

export function FaqSection() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative mx-auto max-w-container px-6 py-32 md:px-10 md:py-40"
    >
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--gold-primary)]">
            Questions
          </p>
          <h2
            id="faq-heading"
            className="mt-4 font-serif text-4xl font-light tracking-[-0.02em] text-[var(--text-primary)] md:text-5xl"
          >
            Frequently asked.
          </h2>
          <p className="mt-5 max-w-sm text-base leading-relaxed text-[var(--text-secondary)]">
            Honest answers about how Mizan handles your data, what's open source, and what isn't.
          </p>
        </Reveal>

        <div className="lg:col-span-8">
          {faqItems.map((item) => (
            <FaqItem key={item.q} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
