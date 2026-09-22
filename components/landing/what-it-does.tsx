import { Handshake, Layers, Package, PenLine, Sparkles } from "lucide-react";
import { whatItDoes } from "@/content/home";
import { Section } from "./section";
import { SectionHeader } from "./section-header";
import { Shot } from "./shot";

const icons = [Sparkles, PenLine, Handshake, Layers];

/**
 * Four blocks, text and screenshot side by side from `md`, alternating
 * sides. The screenshot comes first in the DOM so it stacks first on mobile.
 */
export function WhatItDoes() {
  return (
    <Section>
      <SectionHeader eyebrow={whatItDoes.eyebrow} title={whatItDoes.h2} />
      <div className="mt-16 flex flex-col gap-20 md:gap-28">
        {whatItDoes.blocks.map((block, i) => {
          const flipped = i % 2 === 1;
          const Icon = icons[i % icons.length];
          return (
            <div key={block.title} className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
              <Shot name={block.shot} className={flipped ? "md:order-2" : undefined} />
              <div className={flipped ? "md:order-1" : undefined}>
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue" aria-hidden="true">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-6 text-2xl font-semibold tracking-[-0.02em] text-brand-ink md:text-3xl">{block.title}</h3>
                <p className="mt-4 max-w-prose text-lg leading-relaxed text-brand-muted-text">{block.body}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-20 flex gap-5 rounded-2xl border border-brand-ink/10 bg-white p-6 shadow-card md:p-8">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue" aria-hidden="true">
          <Package className="h-5 w-5" />
        </span>
        <p className="max-w-prose text-lg leading-relaxed text-brand-ink">{whatItDoes.closing}</p>
      </div>
    </Section>
  );
}
