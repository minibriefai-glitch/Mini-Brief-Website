"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * Hands the "opening" baton to the hero: sets a persistent flag on <html> (so a
 * hero mounting later can read it) and fires a one-shot event (for a hero that's
 * already listening). Idempotent — safe to call from every exit path.
 */
function signalSplashDone() {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (root.dataset.splashDone === "1") return;
  // Release the held hero entrance so it assembles as the lens opens.
  delete root.dataset.splashActive;
  root.dataset.splashDone = "1";
  window.dispatchEvent(new CustomEvent("mb:splash-done"));
}

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
      signalSplashDone();
      return;
    }

    // The splash will actually play: hold the hero entrance until the lens
    // opens (CSS pauses .hero-anim while this flag is present). Set only when
    // JS is running and the splash shows, so no-JS visitors still animate in.
    document.documentElement.dataset.splashActive = "1";

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Short-circuit for reduced-motion users — no held splash.
    const holdMs = reduced ? 200 : 650;
    // Mirrors the splash-out keyframe duration in globals.css (0.6s) so the
    // overlay unmounts exactly as the lens-open finishes.
    const fadeMs = reduced ? 50 : 600;

    // Hand the baton to the hero as the lens starts opening, so the panel opens
    // *through* the clearing aperture rather than after it.
    const fadeTimer = window.setTimeout(() => {
      setFading(true);
      signalSplashDone();
    }, holdMs);
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
