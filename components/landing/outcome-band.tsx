import { Reveal } from "@/components/effects/reveal-on-scroll";
import { SectionHeader } from "./section-header";

const SHIFTS = [
  { before: "187 emails a day", after: "one ranked brief" },
  { before: "20-message threads", after: "the answer, pulled out" },
  { before: "Every reply", after: "drafted in your voice" },
];

export function OutcomeBand() {
  return (
    <Reveal as="section" variant="fade" className="relative z-[1] px-6 sm:px-12 py-12 sm:py-16">
      <SectionHeader
        kicker="What changes"
        title={
          <>
            What used to eat your morning now takes{" "}
            <span className="text-grad">minutes</span>.
          </>
        }
        titleClassName="max-w-[720px]"
        className="mb-10"
      />

      <Reveal stagger className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 max-w-[920px] mx-auto">
        {SHIFTS.map((s) => (
          <div
            key={s.after}
            className="card-glass flex flex-col items-center text-center gap-2.5 px-5 py-7"
          >
            <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-fg-3 line-through decoration-fg-3/50">
              {s.before}
            </span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#5b72ff"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="rotate-90"
            >
              <path d="M5 12h14" />
              <path d="m13 6 6 6-6 6" />
            </svg>
            <span className="font-display text-[19px] font-bold text-white tracking-[-0.015em]">
              {s.after}
            </span>
          </div>
        ))}
      </Reveal>
    </Reveal>
  );
}
