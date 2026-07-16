"use client";

import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/effects/magnetic";
import { ParallaxDrift } from "@/components/effects/parallax-drift";
import { DemoFrame } from "./live-demo";
import { useNewsletter } from "./newsletter-dialog";
import { ScrollCue } from "./scroll-cue";

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
      className={`hero-anim hidden xl:block absolute z-[3] pointer-events-none ${className}`}
      style={{ animationDelay: delay }}
      aria-hidden="true"
    >
      <div
        className="float-soft rounded-full p-[1.5px] shadow-[0_16px_40px_rgba(0,0,0,0.6),0_0_38px_rgba(74,98,245,0.4)]"
        style={{ animationDelay: floatDelay, backgroundImage: "var(--grad)" }}
      >
        <div className="flex items-center gap-3 rounded-full bg-[rgba(11,18,36,0.9)] backdrop-blur-md pl-2.5 pr-5 py-2.5">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-full text-white shadow-[0_4px_16px_rgba(74,98,245,0.75)] ring-1 ring-white/25"
            style={{ backgroundImage: "var(--grad)" }}
          >
            {icon}
          </span>
          <span className="font-display text-[14px] font-semibold tracking-[-0.01em] text-white whitespace-nowrap">
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const { open } = useNewsletter();

  return (
    <section className="relative z-[1] flex flex-col items-center text-center px-5 sm:px-6 pt-16 sm:pt-24 pb-10 sm:pb-14">
      <div
        className="hero-anim mb-6 inline-flex rounded-full p-px shadow-[0_10px_32px_rgba(74,98,245,0.22)]"
        style={{
          backgroundImage:
            "linear-gradient(100deg, rgba(91,114,255,0.7), rgba(123,92,255,0.22) 35%, rgba(91,114,255,0.1) 65%, rgba(123,92,255,0.6))",
        }}
      >
        <span className="inline-flex items-center gap-2 rounded-full bg-[rgba(9,14,30,0.92)] backdrop-blur-md pl-3 pr-4 py-[7px]">
          <span className="live-dot" aria-hidden="true" />
          <span className="font-body text-[12.5px] font-medium leading-none text-fg-2">
            <span className="font-semibold text-white">Private by design</span>
            <span className="mx-1.5 text-fg-3">·</span>
            Gmail &amp; Outlook
          </span>
        </span>
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
        className="hero-anim font-body text-[12px] text-fg-3 mb-3"
        style={{ animationDelay: "0.2s" }}
      >
        The real product, live below — no install, nothing to sign up for
      </p>

      <div className="mb-7 sm:mb-10">
        <ScrollCue />
      </div>

      <div className="relative w-full flex justify-center">
        <ParallaxDrift
          rate={-0.08}
          className="pointer-events-none absolute left-1/2 top-[2%] -translate-x-1/2 w-[min(1160px,98vw)] h-[92%] z-0"
        >
          <div
            className="h-full w-full"
            style={{
              background:
                "radial-gradient(ellipse 55% 60% at 50% 38%, rgba(74,98,245,0.28), rgba(123,92,255,0.12) 55%, transparent 75%)",
            }}
          />
        </ParallaxDrift>
        <div
          className="hero-anim-frame relative z-[1] w-full max-w-[960px]"
          style={{ animationDelay: "0.25s" }}
        >
          <CalloutChip
            className="left-full ml-3 2xl:ml-6 top-[13%]"
            delay="0.5s"
            floatDelay="0s"
            label="Triage"
            icon={
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" />
              </svg>
            }
          />
          <CalloutChip
            className="left-full ml-3 2xl:ml-6 bottom-[15%]"
            delay="0.8s"
            floatDelay="2.4s"
            label="Unsubscribe"
            icon={
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 6h18" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                <line x1="10" y1="11" x2="14" y2="15" />
                <line x1="14" y1="11" x2="10" y2="15" />
              </svg>
            }
          />
          <CalloutChip
            className="right-full mr-3 2xl:mr-6 top-[20%]"
            delay="0.6s"
            floatDelay="1.6s"
            label="Summaries"
            icon={
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 6h16" />
                <path d="M4 12h11" />
                <path d="M4 18h7" />
              </svg>
            }
          />
          <CalloutChip
            className="right-full mr-3 2xl:mr-6 bottom-[22%]"
            delay="0.7s"
            floatDelay="0.8s"
            label="Your voice"
            icon={
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
