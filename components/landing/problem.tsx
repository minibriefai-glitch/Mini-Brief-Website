import { problem } from "@/content/home";
import { Section } from "./section";
import { SectionHeader } from "./section-header";

export function Problem() {
  return (
    <Section>
      <SectionHeader eyebrow={problem.eyebrow} title={problem.h2} />
      <ol role="list" className="mt-14 grid list-none gap-10 md:grid-cols-3 md:gap-8">
        {problem.lines.map((line, i) => (
          <li key={line} className="border-t border-brand-ink/10 pt-6">
            <span aria-hidden="true" className="text-sm font-semibold tracking-[0.2em] text-brand-blue">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="mt-4 text-xl font-medium leading-snug text-brand-ink md:text-2xl">{line}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
