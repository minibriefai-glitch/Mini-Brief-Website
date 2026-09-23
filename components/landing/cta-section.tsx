import { ArrowUpRight, Check } from "lucide-react";
import { cta } from "@/content/home";
import { Section } from "./section";

export function CtaSection() {
  return (
    <Section className="pb-16 pt-0 md:pb-20 md:pt-0">
      <div
        data-tone="pale"
        className="relative isolate overflow-hidden rounded-[28px] bg-[#edf1ff] px-7 py-12 text-[#0a1230] sm:px-12 sm:py-16 lg:px-16"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-36 -z-10 h-[500px] w-[500px] rounded-full border-[70px] border-brand-blue/[0.04]"
        />
        <div className="grid items-end gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#344677]">
              Good mornings start here
            </p>
            <h2 className="mt-5 max-w-xl text-[clamp(2.4rem,5vw,4rem)] font-medium leading-[1.04] tracking-[-0.055em]">
              {cta.h2}
            </h2>
          </div>
          <div>
            <p className="max-w-sm text-base leading-relaxed text-[#344677]">
              {cta.body}
            </p>
            <a
              href={cta.primary.href}
              className="landing-action mt-6 inline-flex min-h-12 items-center justify-center gap-5 rounded-xl bg-brand-blue px-6 text-sm font-semibold text-white hover:bg-brand-blue-hover"
            >
              {cta.primary.label}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <p className="mt-4 flex items-center gap-2 text-xs text-[#344677]">
              <Check className="h-3.5 w-3.5" aria-hidden="true" />
              Gmail & Outlook. One clear brief.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
