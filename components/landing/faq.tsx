import { ChevronDown } from "lucide-react";
import { faq, type FaqItem } from "@/content/home";
import { TextLink } from "./link";
import { Section } from "./section";
import { SectionHeader } from "./section-header";

/** The answer, verbatim, with the one phrase the copy marks as a link. */
function Answer({ a, link }: FaqItem) {
  const at = link ? a.indexOf(link.text) : -1;
  if (!link || at < 0) return <>{a}</>;
  return (
    <>
      {a.slice(0, at)}
      <TextLink href={link.href}>{link.text}</TextLink>
      {a.slice(at + link.text.length)}
    </>
  );
}

export function Faq() {
  return (
    <Section id={faq.id}>
      <div className="grid gap-10 md:grid-cols-[1fr_2fr] md:gap-16">
        <SectionHeader title={faq.h2} />
        <div className="divide-y divide-brand-ink/10 rounded-2xl border border-brand-ink/10 bg-white px-6 shadow-card md:px-8">
          {faq.items.map((item) => (
            <details key={item.q} className="group py-2">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 rounded-md py-4 text-lg font-medium text-brand-ink [&::-webkit-details-marker]:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue">
                {item.q}
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-page text-brand-ink" aria-hidden="true">
                  <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                </span>
              </summary>
              <p className="pb-6 pr-12 text-lg leading-relaxed text-brand-muted-text">
                <Answer {...item} />
              </p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
