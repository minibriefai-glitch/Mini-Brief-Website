"use client";

import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/effects/magnetic";
import { DemoFrame } from "./live-demo";
import { useNewsletter } from "./newsletter-dialog";

function CalloutChip({
  className,
  delay,
  icon,
  label,
}: {
  className: string;
  delay: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div
      className={`hero-anim hidden sm:flex absolute z-[3] pointer-events-none items-center gap-2 rounded-full border border-white/[0.12] bg-[rgba(13,21,40,0.92)] backdrop-blur-md px-3.5 py-2 shadow-[0_12px_30px_rgba(0,0,0,0.5)] ${className}`}
      style={{ animationDelay: delay }}
      aria-hidden="true"
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[rgba(74,98,245,0.16)] text-accent-b">
        {icon}
      </span>
      <span className="font-display text-[12px] font-semibold text-white whitespace-nowrap">
        {label}
      </span>
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
            className="-right-3 lg:-right-9 top-[16%]"
            delay="0.5s"
            label="Instant triage"
            icon={
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" />
              </svg>
            }
          />
          <CalloutChip
            className="-left-3 lg:-left-9 bottom-[18%]"
            delay="0.65s"
            label="Drafts in your voice"
            icon={
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
              </svg>
            }
          />
          <DemoFrame boot="idle" className="max-w-none" />
        </div>
      </div>
    </section>
  );
}
