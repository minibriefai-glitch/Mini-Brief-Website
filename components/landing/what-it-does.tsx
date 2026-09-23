"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { whatItDoes } from "@/content/home";
import { shots } from "@/content/shots";
import { cn } from "@/lib/utils";
import { Section } from "./section";

const featureBenefits = [
  "Know what needs you next.",
  "A head start, in your voice.",
  "Keep both sides of a promise.",
  "Gmail and Outlook, together.",
];

export function WhatItDoes() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const block = whatItDoes.blocks[active];
  const shot = shots[block.shot];

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown")
      next = (index + 1) % whatItDoes.tabs.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp")
      next = (index + whatItDoes.tabs.length - 1) % whatItDoes.tabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = whatItDoes.tabs.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <Section
      id="product"
      className="border-y border-white/[0.08] bg-[#080d1b] text-white"
    >
      <div className="grid items-end gap-6 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#a4b8ff]">
            {whatItDoes.eyebrow}
          </p>
          <h2 className="mt-5 max-w-2xl text-[clamp(2.25rem,4.5vw,3.75rem)] font-semibold leading-[1.06] tracking-[-0.045em]">
            {whatItDoes.h2}
          </h2>
        </div>
        <p className="max-w-sm text-base leading-relaxed text-[#a7b0c4] sm:text-lg lg:justify-self-end lg:pb-1">
          {whatItDoes.intro}
        </p>
      </div>

      <div className="mt-10 grid items-start gap-7 sm:mt-14 lg:grid-cols-[minmax(240px,0.38fr)_minmax(0,1fr)] lg:gap-12">
        <div
          role="tablist"
          aria-label="Explore MiniBrief features"
          aria-orientation="vertical"
          className="border-t border-white/10"
        >
          {whatItDoes.tabs.map((label, index) => (
            <button
              key={label}
              type="button"
              ref={(element) => {
                tabs.current[index] = element;
              }}
              role="tab"
              id={`feature-tab-${index}`}
              aria-label={label}
              aria-controls="feature-panel"
              aria-selected={active === index}
              tabIndex={active === index ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={cn(
                "group relative flex min-h-[72px] w-full items-center gap-4 border-b border-white/10 px-4 py-4 text-left transition-colors duration-150 focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a4b8ff] motion-reduce:transition-none sm:min-h-[108px] sm:py-5 lg:px-5",
                active === index
                  ? "bg-[#131d33] text-white"
                  : "text-[#a7b0c4] hover:bg-white/[0.035] hover:text-white",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "shrink-0 self-start pt-1 text-[11px] font-medium tabular-nums sm:pt-1.5",
                  active === index ? "text-[#a4b8ff]" : "text-[#73809a]",
                )}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-base font-semibold tracking-[-0.02em] sm:text-lg">
                  {label}
                </span>
                <span className="mt-1.5 hidden text-[13px] font-normal leading-relaxed text-[#a7b0c4] sm:block">
                  {featureBenefits[index]}
                </span>
              </span>
              <ChevronRight
                aria-hidden="true"
                className={cn(
                  "h-4 w-4 shrink-0 transition-colors motion-reduce:transition-none",
                  active === index
                    ? "text-[#a4b8ff]"
                    : "text-[#53617c] group-hover:text-[#a7b0c4]",
                )}
              />
              {active === index && (
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-0.5 bg-[#a4b8ff]"
                />
              )}
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          id="feature-panel"
          aria-labelledby={`feature-tab-${active}`}
          tabIndex={0}
          className="min-w-0 rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a4b8ff]"
        >
          <div className="flex aspect-[1.35] items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-[#e9edf6] p-3 sm:p-5 lg:aspect-[1.4] lg:p-6">
            <Image
              key={shot.src}
              src={shot.src}
              alt={shot.alt}
              width={shot.w}
              height={shot.h}
              sizes="(min-width: 1280px) 810px, (min-width: 1024px) 65vw, 92vw"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="pt-7 sm:pt-8">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-2xl font-semibold leading-tight tracking-[-0.03em] text-white sm:text-3xl">
                {block.title}
              </h3>
              <span
                aria-hidden="true"
                className="shrink-0 pt-1 text-[11px] font-medium tabular-nums tracking-wider text-[#73809a]"
              >
                {String(active + 1).padStart(2, "0")} / 04
              </span>
            </div>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#a7b0c4]">
              {block.body}
            </p>
            <a
              href="#interactive-demo"
              className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-sm text-sm font-semibold text-[#a4b8ff] transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a4b8ff] motion-reduce:transition-none"
            >
              {whatItDoes.explore}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-white/[0.08] pt-7 sm:mt-16">
        <p className="max-w-4xl text-sm leading-relaxed text-[#a7b0c4]">
          {whatItDoes.closing}
        </p>
      </div>
    </Section>
  );
}
