import { Reveal } from "@/components/effects/reveal-on-scroll";
import { TiltCard } from "@/components/effects/tilt-card";
import { SectionOrbs } from "@/components/effects/section-orbs";
import { SectionHeader } from "./section-header";

const STEPS = [
  {
    n: "01",
    title: "Install and sign in",
    desc: "Add the extension to Chrome or Firefox and create your MiniBrief account. Setup takes about a minute.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3v12" />
        <path d="m8 11 4 4 4-4" />
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      </svg>
    ),
  },
  {
    n: "02",
    title: "Open Gmail or Outlook",
    desc: "The panel appears next to your inbox, and triage begins as soon as your mail loads.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-10 5L2 7" />
      </svg>
    ),
  },
  {
    n: "03",
    title: "Read the brief",
    desc: "Catch-up reports, voice-matched drafts, and one-click unsubscribe, all without leaving your inbox. No AI key to bring.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    n: "04",
    title: "Set your VIPs",
    desc: "Flag the people who matter. MiniBrief monitors those threads and escalates to critical if they stay silent past your window.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
];

export function HowItWorks() {
  return (
    <Reveal as="section" variant="up" className="relative z-[1] px-6 sm:px-12 py-14 sm:py-20 section-seam">
      <SectionOrbs placement="left" />
      <SectionHeader
        kicker="How it works"
        title="Four steps to a managed inbox."
        sub="MiniBrief reads and sorts your mail in your browser. Your account keeps settings and VIPs in sync, and your email content is never stored."
        className="mb-10"
      />

      <div className="relative max-w-[1040px] mx-auto">
        <div className="steps-track hidden lg:block" aria-hidden="true" />
        <Reveal stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map((s) => (
            <TiltCard key={s.n} className="h-full" max={6}>
              <div className="feat-inner h-full !p-6 relative overflow-hidden">
                <span
                  className="absolute -top-3 right-4 font-display text-[72px] font-extrabold leading-none text-white/[0.05] select-none pointer-events-none"
                  aria-hidden="true"
                >
                  {s.n}
                </span>
                <div className="feat-icon relative w-11 h-11 rounded-xl flex items-center justify-center bg-[rgba(74,98,245,0.10)] border border-[rgba(74,98,245,0.20)] text-accent-b mb-4">
                  {s.icon}
                </div>
                <h3 className="font-display text-[16px] font-semibold text-white mb-1.5 tracking-[-0.01em]">
                  {s.title}
                </h3>
                <p className="font-body text-[13px] text-fg-2 leading-[1.6]">{s.desc}</p>
              </div>
            </TiltCard>
          ))}
        </Reveal>
      </div>
    </Reveal>
  );
}
