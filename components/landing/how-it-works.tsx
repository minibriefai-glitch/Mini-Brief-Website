import { howItWorks } from "@/content/home";
import { Section } from "./section";
import { SectionHeader } from "./section-header";

export function HowItWorks() {
  return (
    <Section id={howItWorks.id}>
      <SectionHeader eyebrow={howItWorks.eyebrow} title={howItWorks.h2} />
      <ol role="list" className="mt-14 grid list-none gap-6 md:grid-cols-3">
        {howItWorks.steps.map((step, i) => (
          <li key={step.title} className="rounded-2xl border border-brand-ink/10 bg-white p-8 shadow-card">
            <span
              aria-hidden="true"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-blue text-sm font-semibold text-white"
            >
              {i + 1}
            </span>
            <h3 className="mt-6 text-xl font-semibold tracking-tight text-brand-ink">{step.title}</h3>
            <p className="mt-3 text-lg leading-relaxed text-brand-muted-text">{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
