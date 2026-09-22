import { whatItDoes } from "@/content/home";
import { Section } from "./section";
import { SectionHeader } from "./section-header";
import { Shot } from "./shot";

/**
 * Four blocks, text and screenshot side by side from `md`, alternating
 * sides. The screenshot comes first in the DOM so it stacks first on mobile.
 */
export function WhatItDoes() {
  return (
    <Section>
      <SectionHeader eyebrow={whatItDoes.eyebrow} title={whatItDoes.h2} />
      <div className="mt-12 flex flex-col gap-16 md:gap-24">
        {whatItDoes.blocks.map((block, i) => {
          const flipped = i % 2 === 1;
          return (
            <div key={block.title} className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
              <Shot name={block.shot} className={flipped ? "md:order-2" : undefined} />
              <div className={flipped ? "md:order-1" : undefined}>
                <h3 className="text-2xl font-semibold tracking-tight">{block.title}</h3>
                <p className="mt-4 max-w-prose text-lg">{block.body}</p>
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-12 max-w-prose text-lg text-brand-muted-text">{whatItDoes.closing}</p>
    </Section>
  );
}
