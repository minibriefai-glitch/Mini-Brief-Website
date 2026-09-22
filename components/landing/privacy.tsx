import { Check } from "lucide-react";
import { privacy } from "@/content/home";
import { TextLink } from "./link";
import { Container } from "./section";
import { SectionHeader } from "./section-header";

export function Privacy() {
  return (
    <section id={privacy.id} className="relative scroll-mt-16 overflow-hidden bg-brand-ink py-20 text-white md:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_50%_at_80%_0%,rgba(58,95,220,0.28),transparent_70%)]"
      />
      <Container className="relative">
        <SectionHeader eyebrow={privacy.eyebrow} title={privacy.h2} tone="dark" />
        <ul role="list" className="mt-14 grid gap-4 md:grid-cols-2">
          {privacy.lines.map((line) => (
            <li key={line} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-6 text-lg leading-relaxed">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-blue text-white" aria-hidden="true">
                <Check className="h-4 w-4" strokeWidth={2.5} />
              </span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-lg">
          <TextLink href={privacy.link.href} tone="dark" className="inline-flex min-h-11 items-center">
            {privacy.link.label}
          </TextLink>
        </p>
      </Container>
    </section>
  );
}
