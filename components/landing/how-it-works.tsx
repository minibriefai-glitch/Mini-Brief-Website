import { ArrowUpRight } from "lucide-react";
import { howItWorks } from "@/content/home";
import { PORTAL_GET_STARTED_URL } from "@/lib/portal";
import { Section } from "./section";

export function HowItWorks() {
  return (
    <Section
      id={howItWorks.id}
      className="border-b border-[#07091A]/10 bg-[#F5F5F7] text-[#07091A]"
    >
      <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end lg:gap-12">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3A5FDC]">
            {howItWorks.eyebrow}
          </p>
          <h2 className="mt-5 text-[clamp(2.25rem,4.5vw,3.75rem)] font-semibold leading-[1.06] tracking-[-0.045em]">
            {howItWorks.h2}
          </h2>
        </div>
        <a
          href={PORTAL_GET_STARTED_URL}
          className="group inline-flex min-h-12 shrink-0 items-center gap-3 rounded-full border border-[#3A5FDC]/20 bg-white px-5 text-sm font-semibold text-[#3A5FDC] transition-colors hover:border-[#3A5FDC]/50 hover:bg-[#e9edf8] hover:text-[#07091A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3A5FDC] motion-reduce:transition-none"
        >
          Start with your first brief
          <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
        </a>
      </div>

      <ol
        role="list"
        className="mt-12 grid list-none gap-8 md:mt-16 md:grid-cols-3 md:gap-10 lg:gap-16"
      >
        {howItWorks.steps.map((step, index) => (
          <li
            key={step.title}
            className="relative grid grid-cols-[3.5rem_minmax(0,1fr)] gap-4 md:block"
          >
            {index < howItWorks.steps.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute bottom-[-2rem] left-6 top-14 w-px bg-[#07091A]/10 md:bottom-auto md:left-20 md:right-[-2.5rem] md:top-8 md:h-px md:w-auto lg:right-[-4rem]"
              />
            )}
            <span
              aria-hidden="true"
              className="relative z-10 block w-fit self-start bg-[#F5F5F7] text-4xl font-light leading-none tracking-[-0.065em] text-[#3A5FDC] md:pr-6 md:text-[64px]"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="pb-1 md:mt-8 md:pb-0">
              <h3 className="text-xl font-semibold leading-snug tracking-[-0.025em] text-[#07091A] lg:text-2xl">
                {step.title}
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#475569] lg:text-base">
                {step.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
