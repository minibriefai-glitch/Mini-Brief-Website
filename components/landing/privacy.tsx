import { Reveal } from "@/components/effects/reveal-on-scroll";
import { SectionOrbs } from "@/components/effects/section-orbs";
import { TiltCard } from "@/components/effects/tilt-card";

const PILLARS = [
  {
    title: "Your email is never stored",
    desc: "Messages are read and sorted in your browser. AI features send a limited amount through our proxy to Anthropic, which forwards each request without logging or keeping it. Nothing is written to our database, so there is nothing on our side to leak, sell, or hand over.",
  },
  {
    title: "A subject line and 120 characters, by default",
    desc: "That is all most features ever send. Full message text goes out only for the things you switch on yourself, like drafting a reply, and only for the message you opened.",
  },
  {
    title: "Zero tracking, zero telemetry",
    desc: "No analytics SDKs, no pixels, and no behavioral logging. MiniBrief does not phone home, so we cannot see what you read, who you email, or how you use it.",
  },
  {
    title: "Your account holds settings, not mail",
    desc: "A MiniBrief account is required, and it syncs your preferences and VIPs across devices. It never stores the contents of your emails — only you and the AI ever see those.",
  },
];

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#22d3a0" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function Privacy() {
  return (
    <Reveal as="section" variant="3d" id="privacy" className="relative z-[1] px-6 sm:px-12 py-14 sm:py-20 section-seam">
      <SectionOrbs placement="left" />
      <TiltCard max={4} lift={4} className="max-w-[920px] mx-auto">
      <div className="float-shadow relative rounded-3xl border border-accent-border bg-[rgba(13,21,40,0.55)] backdrop-blur-md overflow-hidden">
        <div
          className="absolute -top-px left-1/2 -translate-x-1/2 w-[460px] h-[200px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(74,98,245,0.22), transparent 70%)" }}
          aria-hidden="true"
        />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-accent-b to-transparent"
          aria-hidden="true"
        />

        <div className="relative px-7 sm:px-12 py-10 sm:py-12">
          <div className="section-kicker">Privacy</div>
          <h2 className="font-display font-extrabold tracking-[-0.03em] text-white leading-[1.1] text-[clamp(28px,4vw,44px)] max-w-[600px]">
            Your email is never stored.
          </h2>
          <p className="font-body text-[15px] text-fg-2 leading-relaxed mt-3 max-w-[560px]">
            MiniBrief needs an account, but your email content never does. Your mail is read and sorted in your browser. What the AI needs passes through our proxy in transit and goes to Anthropic, and it comes to rest in neither place.
          </p>

          <Reveal stagger as="div" className="mt-8 flex flex-col divide-y divide-white/[0.06] border-t border-white/[0.06]">
            {PILLARS.map((p) => (
              <div key={p.title} className="flex items-start gap-4 py-5">
                <span className="mt-0.5 flex items-center justify-center w-7 h-7 rounded-full bg-[rgba(34,211,160,0.12)] border border-[rgba(34,211,160,0.4)] shrink-0">
                  <CheckIcon />
                </span>
                <div>
                  <h3 className="font-display text-[15px] font-bold text-white mb-1 tracking-[-0.01em]">
                    {p.title}
                  </h3>
                  <p className="font-body text-[13px] text-fg-2 leading-[1.6] max-w-[640px]">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </Reveal>

          <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-fg-3 mt-8">
            Email never stored · Processed in your browser · No tracking
          </p>
        </div>
      </div>
      </TiltCard>
    </Reveal>
  );
}
