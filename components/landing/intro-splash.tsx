"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function IntroSplash() {
  const [fading, setFading] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    // Play once per browser session — repeat visits skip straight to the page.
    // try/catch: sessionStorage can throw (Safari private mode, blocked storage).
    let seen = false;
    try {
      seen = sessionStorage.getItem("mb-splash") === "1";
      if (!seen) sessionStorage.setItem("mb-splash", "1");
    } catch {
      // Storage unavailable — fall back to playing the splash.
    }
    if (seen) {
      setRemoved(true);
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Short-circuit for reduced-motion users — no held splash.
    const holdMs = reduced ? 200 : 650;
    const fadeMs = reduced ? 50 : 400;

    const fadeTimer = window.setTimeout(() => setFading(true), holdMs);
    const removeTimer = window.setTimeout(() => setRemoved(true), holdMs + fadeMs);

    // Lock scroll while the splash is up so the page doesn't jump behind it.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(removeTimer);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  useEffect(() => {
    if (removed) document.body.style.overflow = "";
  }, [removed]);

  if (removed) return null;

  return (
    <div
      className={`splash-overlay${fading ? " splash-out" : ""}`}
      role="status"
      aria-label="Loading MiniBrief"
    >
      <div className="splash-logo">
        <Image
          src="/photos/MiniBrief-Icon-Mono-Ink.png"
          alt="MiniBrief"
          width={80}
          height={80}
          className="rounded-[22%]"
          priority
        />
        <span className="font-display text-[30px] sm:text-[36px] font-bold tracking-[-0.02em] leading-none">
          <span className="text-mini">Mini</span>Brief
        </span>
      </div>
    </div>
  );
}
