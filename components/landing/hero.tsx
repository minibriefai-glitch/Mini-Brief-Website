"use client";

import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/effects/magnetic";
import { DemoFrame } from "./live-demo";
import { useNewsletter } from "./newsletter-dialog";

function CalloutChip({
  className,
  delay,
  floatDelay,
  icon,
  label,
}: {
  className: string;
  delay: string;
  floatDelay: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div
      className={`hero-anim hidden lg:block absolute z-[3] pointer-events-none ${className}`}
      style={{ animationDelay: delay }}
      aria-hidden="true"
    >
      <div
        className="float-soft flex items-center gap-2.5 rounded-full border border-white/[0.14] bg-[rgba(13,21,40,0.82)] backdrop-blur-md pl-2 pr-4 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.55),0_0_24px_rgba(74,98,245,0.22)]"
        style={{ animationDelay: floatDelay }}
      >
        <span
          className="flex h-7 w-7 items-center justify-center rounded-full text-white shadow-[0_3px_12px_rgba(74,98,245,0.6)] ring-1 ring-white/20"
          style={{ backgroundImage: "var(--grad)" }}
        >
          {icon}
        </span>
        <span className="font-display text-[12px] font-semibold text-white whitespace-nowrap">
          {label}
        </span>
      </div>
    </div>
  );
}

export function Hero() {
  const { open } = useNewsletter();

  return (
    <section className="relative z-[1] flex flex-col items-center text-center px-5 sm:px-6 pt-16 sm:pt-24 pb-10 sm:pb-14">
      <div className="hero-anim mb-6 inline-flex items-center gap-2 rounded-full border border-accent-border bg-accent-dim px-3.5 py-1.5 font-mono text-[10px] tracking-[0.16em] uppercase text-accent-b">
        <span className="pulse-soft w-[5px] h-[5px] rounded-full bg-accent-b shadow-[0_0_5px_var(--accent-b)]" />
        Private by design · Gmail &amp; Outlook
      </div>

      <h1 className="hero-anim font-display font-extrabold tracking-[-0.04em] leading-[0.98] text-white mb-6 max-w-[900px] text-[clamp(42px,7.6vw,76px)]" style={{ animationDelay: "0.04s" }}>
        <span className="text-grad text-grad-flow">Email intelligence</span>
        <br className="hidden sm:block" /> that triages your inbox and drafts
        every reply.
      </h1>

      <p
        className="hero-anim font-body text-fg-2 mb-9 text-[clamp(16px,1.7vw,19px)] max-w-[620px] leading-[1.65]"
        style={{ animationDelay: "0.1s" }}
      >
        The AI inbox that runs in your browser — never on our servers. Mini Brief
        triages what matters inside Gmail and Outlook, drafts replies in your own
        voice, and clears the noise. Your email stays yours.
      </p>

      <div className="hero-anim mb-4" style={{ animationDelay: "0.14s" }}>
        <Magnetic>
          <Button variant="hero" size="lg" onClick={() => open("hero-primary")}>
            Join the waitlist
          </Button>
        </Magnetic>
      </div>

      <p
        className="hero-anim font-body text-[12px] text-fg-3 mb-12 sm:mb-16"
        style={{ animationDelay: "0.2s" }}
      >
        The real product, live below — no install, nothing to sign up for
      </p>

      <div className="relative w-full flex justify-center">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[2%] -translate-x-1/2 w-[min(1100px,98vw)] h-[92%] z-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 60% at 50% 38%, rgba(74,98,245,0.28), rgba(123,92,255,0.12) 55%, transparent 75%)",
          }}
        />
        <div
          className="hero-anim relative z-[1] w-full max-w-[1000px]"
          style={{ animationDelay: "0.25s" }}
        >
          <CalloutChip
            className="-right-3 xl:-right-10 top-[11%]"
            delay="0.5s"
            floatDelay="0s"
            label="Instant triage"
            icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" />
              </svg>
            }
          />
          <CalloutChip
            className="-left-3 xl:-left-10 top-[22%]"
            delay="0.6s"
            floatDelay="1.6s"
            label="Thread summaries"
            icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 6h16" />
                <path d="M4 12h11" />
                <path d="M4 18h7" />
              </svg>
            }
          />
          <CalloutChip
            className="-left-3 xl:-left-10 bottom-[24%]"
            delay="0.7s"
            floatDelay="0.8s"
            label="Drafts in your voice"
            icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
              </svg>
            }
          />
          <CalloutChip
            className="-right-3 xl:-right-10 bottom-[14%]"
            delay="0.8s"
            floatDelay="2.4s"
            label="One-click unsubscribe"
            icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 6h18" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                <line x1="10" y1="11" x2="14" y2="15" />
                <line x1="14" y1="11" x2="10" y2="15" />
              </svg>
            }
          />
          <DemoFrame boot="idle" className="max-w-none" />
        </div>
      </div>
    </section>
  );
}
