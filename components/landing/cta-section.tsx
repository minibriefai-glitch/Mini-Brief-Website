"use client";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/effects/reveal-on-scroll";
import { Magnetic } from "@/components/effects/magnetic";
import { ParallaxDrift } from "@/components/effects/parallax-drift";
import { SectionOrbs } from "@/components/effects/section-orbs";
import { PORTAL_GET_STARTED_URL } from "@/lib/portal";

export function CtaSection() {
  return (
    <Reveal as="section" variant="zoom" className="cta-divider relative z-[1] px-6 pt-16 pb-20 flex flex-col items-center text-center">
      <SectionOrbs placement="right" />
      <ParallaxDrift
        rate={-0.1}
        className="absolute w-[500px] h-[220px] top-0 left-1/2 -translate-x-1/2 pointer-events-none"
      >
        <div
          className="h-full w-full"
          style={{ background: "radial-gradient(ellipse, rgba(74,98,245,0.18), transparent 70%)" }}
        />
      </ParallaxDrift>
      <div className="section-kicker relative justify-center">Now in beta</div>
      <h2 className="relative font-display font-extrabold tracking-[-0.03em] text-white mb-4 leading-[1.08] text-[clamp(30px,4.8vw,52px)]">
        Your inbox, triaged <span className="text-grad">from today.</span>
      </h2>
      <p className="relative font-body text-[16px] text-fg-2 mb-7 max-w-[520px] leading-relaxed">
        MiniBrief is live in beta for Gmail and Outlook. Create an account, connect a mailbox, and your first brief is minutes away.
      </p>
      <Magnetic>
        <Button asChild variant="hero" size="lg">
          <a href={PORTAL_GET_STARTED_URL}>Get started</a>
        </Button>
      </Magnetic>
      <p className="relative font-body text-[12px] text-fg-3 mt-4">
        In beta · Gmail &amp; Outlook · Every account starts with a free trial
      </p>
    </Reveal>
  );
}
