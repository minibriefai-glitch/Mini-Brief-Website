import { howItWorks } from "@/content/home";
import { Section } from "./section";
import { SectionHeader } from "./section-header";

export function HowItWorks() {
  return (
    <Section id={howItWorks.id}>
      <SectionHeader eyebrow={howItWorks.eyebrow} title={howItWorks.h2} />
      <ol role="list" className="mt-10 grid list-none gap-6 md:grid-cols-3">
        {howItWorks.steps.map((step, i) => (
          <li key={step.title} className="rounded-xl border border-brand-muted/50 bg-white p-6">
            <span
              aria-hidden="true"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-ink text-sm font-semibold text-white"
            >
              {i + 1}
            </span>
            <h3 className="mt-4 text-xl font-semibold tracking-tight">{step.title}</h3>
            <p className="mt-2 text-lg">{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
