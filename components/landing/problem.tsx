import { problem } from "@/content/home";
import { Section } from "./section";
import { SectionHeader } from "./section-header";

export function Problem() {
  return (
    <Section>
      <SectionHeader eyebrow={problem.eyebrow} title={problem.h2} />
      <ul role="list" className="mt-10 grid gap-6 md:grid-cols-3">
        {problem.lines.map((line) => (
          <li key={line} className="rounded-xl border border-brand-muted/50 bg-white p-6 text-lg">
            {line}
          </li>
        ))}
      </ul>
    </Section>
  );
}
