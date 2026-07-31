import { Reveal } from "@/components/effects/reveal-on-scroll";
import { TiltCard } from "@/components/effects/tilt-card";
import { SectionOrbs } from "@/components/effects/section-orbs";
import { SectionHeader } from "./section-header";

const iconProps = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const PILLARS = [
  {
    label: "Email never stored",
    sub: "Nothing is written to our database, and requests are never logged",
    icon: (
      <svg {...iconProps}>
        <rect width="18" height="11" x="3" y="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    label: "Parsed in your browser",
    sub: "Your mail is read and sorted on your device",
    icon: (
      <svg {...iconProps}>
        <rect width="18" height="14" x="3" y="5" rx="2" />
        <path d="M3 9h18" />
      </svg>
    ),
  },
  {
    label: "Zero tracking",
    sub: "No analytics, telemetry, or pixels",
    icon: (
      <svg {...iconProps}>
        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
        <line x1="2" y1="2" x2="22" y2="22" />
      </svg>
    ),
  },
  {
    label: "Account ≠ your mail",
    sub: "Your account syncs settings, never messages",
    icon: (
      <svg {...iconProps}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="m22 11-3 3-1.5-1.5" />
      </svg>
    ),
  },
  {
    // Naming Anthropic outright is stronger than omitting it. The terms are
    // genuinely good, and a reader who later discovers an unnamed subprocessor
    // assumes the worst.
    label: "One AI provider, named",
    sub: "Anthropic, under terms that forbid training on your data",
    icon: (
      <svg {...iconProps}>
        <path d="M12 2 4 6v6c0 5 3.4 9.4 8 10 4.6-.6 8-5 8-10V6l-8-4Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
];

export function TrustBand() {
  return (
    <Reveal as="section" variant="fade" className="relative z-[1] px-6 sm:px-12 py-14 sm:py-20 section-seam">
      <SectionOrbs placement="left" />
      <SectionHeader
        kicker="Why you can trust it"
        title={
          <>
            Most AI email tools store your inbox on their servers.{" "}
            <span className="text-grad">MiniBrief stores none of it.</span>
          </>
        }
        titleClassName="max-w-[760px]"
        sub="Trust here is structural, not a badge we bought. It comes from how the product is built. By default we send only a subject line and a preview of about 120 characters. Full message text is sent only for features you turn on yourself, and only for the message you opened."
        className="mb-10"
      />

      {/* Five pillars since the named-provider card was added, so the desktop
          track is 5-up rather than leaving a lone orphan on a second row. The
          sm:3 step keeps the tablet break from doing the same thing. */}
      <Reveal stagger variant="3d" className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 max-w-[1040px] mx-auto">
        {PILLARS.map((p) => (
          // Wrapper carries the 3D tip-in; TiltCard owns hover tilt (separate
          // elements so the transforms don't fight).
          <div key={p.label} className="h-full">
            <TiltCard className="h-full" max={6}>
              <div className="card-glass group h-full flex flex-col items-center text-center px-5 py-7">
              <div className="mb-3.5 w-11 h-11 rounded-xl flex items-center justify-center bg-[rgba(74,98,245,0.10)] border border-[rgba(74,98,245,0.20)] text-accent-b transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:scale-105">
                {p.icon}
              </div>
              <div className="font-display text-[15px] font-semibold text-white tracking-[-0.01em]">
                {p.label}
              </div>
              <div className="font-body text-[12px] text-fg-3 mt-1 leading-snug max-w-[180px]">
                {p.sub}
              </div>
              </div>
            </TiltCard>
          </div>
        ))}
      </Reveal>
    </Reveal>
  );
}
