import { ArrowUpRight, Plus } from "lucide-react";
import { faq, type FaqItem } from "@/content/home";
import { TextLink } from "./link";
import { Section } from "./section";

function Answer({ a, link }: FaqItem) {
  const at = link ? a.indexOf(link.text) : -1;
  if (!link || at < 0) return <>{a}</>;
  return (
    <>
      {a.slice(0, at)}
      <TextLink href={link.href} tone="dark">
        {link.text}
      </TextLink>
      {a.slice(at + link.text.length)}
    </>
  );
}

export function Faq() {
  return (
    <Section id={faq.id} className="border-t border-white/10">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#a4b8ff]">
            A few good questions
          </p>
          <h2 className="mt-5 max-w-sm text-4xl font-medium leading-[1.08] tracking-[-0.045em] text-[#f4f6ff] sm:text-5xl">
            {faq.h2}
          </h2>
          <p className="mt-5 max-w-xs text-base leading-relaxed text-[#a7b0c4]">
            The practical details, before you bring your inbox along.
          </p>
          <a
            href="/security"
            className="mt-6 inline-flex min-h-11 items-center gap-2 rounded text-sm font-medium text-[#a4b8ff] hover:text-white"
          >
            Read about your data
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
        <div className="border-t border-white/10">
          {faq.items.map((item, index) => (
            <details
              name="minibrief-faq"
              key={item.q}
              className="group border-b border-white/10"
            >
              <summary className="flex min-h-20 cursor-pointer list-none items-center gap-4 rounded-sm py-6 text-base font-medium text-[#e8ecf7] [&::-webkit-details-marker]:hidden hover:text-[#a4b8ff] sm:text-lg">
                <span className="text-[10px] font-normal tracking-wider text-[#7f8da9]">
                  0{index + 1}
                </span>
                <span className="flex-1">{item.q}</span>
                <Plus
                  className="h-5 w-5 shrink-0 text-[#a4b8ff] transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none"
                  aria-hidden="true"
                />
              </summary>
              <p className="pb-7 pl-8 pr-4 text-sm leading-[1.85] text-[#a7b0c4] sm:text-base">
                <Answer {...item} />
              </p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
