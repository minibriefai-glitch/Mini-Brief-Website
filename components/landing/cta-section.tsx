"use client";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/effects/reveal-on-scroll";
import { Magnetic } from "@/components/effects/magnetic";
import { ParallaxDrift } from "@/components/effects/parallax-drift";
import { useNewsletter } from "./newsletter-dialog";

export function CtaSection() {
  const { open } = useNewsletter();

  return (
    <Reveal as="section" variant="zoom" className="cta-divider relative z-[1] px-6 pt-16 pb-20 flex flex-col items-center text-center">
      <ParallaxDrift
        rate={-0.1}
        className="absolute w-[500px] h-[220px] top-0 left-1/2 -translate-x-1/2 pointer-events-none"
      >
        <div
          className="h-full w-full"
          style={{ background: "radial-gradient(ellipse, rgba(74,98,245,0.18), transparent 70%)" }}
        />
      </ParallaxDrift>
      <div className="section-kicker relative justify-center">Get early access</div>
      <h2 className="relative font-display font-extrabold tracking-[-0.03em] text-white mb-4 leading-[1.08] text-[clamp(30px,4.8vw,52px)]">
        Be first to know <span className="text-grad">when it launches.</span>
      </h2>
      <p className="relative font-body text-[16px] text-fg-2 mb-7 max-w-[520px] leading-relaxed">
        Mini Brief launches soon. Join the waitlist and we will email you once when it is live. Nothing else.
      </p>
      <Magnetic>
        <Button variant="hero" size="lg" onClick={() => open("cta-section")}>
          Join the waitlist
        </Button>
      </Magnetic>
      <p className="relative font-body text-[12px] text-fg-3 mt-4">
        Launching soon for Chrome &amp; Firefox · One launch email, nothing else · Your email is never stored
      </p>
    </Reveal>
  );
}
