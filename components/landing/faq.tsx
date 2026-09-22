import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { faq, type FaqItem } from "@/content/home";
import { Section } from "./section";
import { SectionHeader } from "./section-header";

/** The answer, verbatim, with the one phrase the copy marks as a link. */
function Answer({ a, link }: FaqItem) {
  const at = link ? a.indexOf(link.text) : -1;
  if (!link || at < 0) return <>{a}</>;
  return (
    <>
      {a.slice(0, at)}
      <Link href={link.href} className="text-brand-blue underline underline-offset-4 hover:no-underline">
        {link.text}
      </Link>
      {a.slice(at + link.text.length)}
    </>
  );
}

export function Faq() {
  return (
    <Section id={faq.id}>
      <SectionHeader title={faq.h2} />
      <div className="mt-8 max-w-prose divide-y divide-brand-ink/10 border-y border-brand-ink/10">
        {faq.items.map((item) => (
          <details key={item.q} className="group py-2">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 rounded-md py-2 text-lg font-medium text-brand-ink [&::-webkit-details-marker]:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue">
              {item.q}
              <ChevronDown
                aria-hidden="true"
                className="h-5 w-5 shrink-0 text-brand-ink transition-transform group-open:rotate-180"
              />
            </summary>
            <p className="pb-4 pr-9 text-lg text-brand-ink">
              <Answer {...item} />
            </p>
          </details>
        ))}
      </div>
    </Section>
  );
}
