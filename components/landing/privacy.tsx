import { Check } from "lucide-react";
import { privacy } from "@/content/home";
import { TextLink } from "./link";
import { Section } from "./section";
import { SectionHeader } from "./section-header";

export function Privacy() {
  return (
    <Section id={privacy.id}>
      <SectionHeader eyebrow={privacy.eyebrow} title={privacy.h2} />
      <ul role="list" className="mt-10 grid gap-4 md:grid-cols-2">
        {privacy.lines.map((line) => (
          <li key={line} className="flex gap-3 rounded-xl border border-brand-muted/50 bg-white p-6 text-lg">
            <Check aria-hidden="true" className="mt-1 h-5 w-5 shrink-0" />
            <span>{line}</span>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-lg">
        <TextLink href={privacy.link.href} className="inline-flex min-h-11 items-center">
          {privacy.link.label}
        </TextLink>
      </p>
    </Section>
  );
}
