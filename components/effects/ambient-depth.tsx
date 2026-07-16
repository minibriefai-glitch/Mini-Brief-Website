"use client";

import { useEffect } from "react";

/**
 * Writes `--bd-depth` (overall page scroll progress, 0..1) onto the root
 * element. `.site-backdrop::after` fades in a violet under-glow as the
 * visitor goes deeper, so the fixed backdrop subtly shifts hue with scroll
 * instead of staying frozen. Opacity-only — no paint storms. Renders nothing.
 */
export function AmbientDepth() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const tick = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const d = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      document.documentElement.style.setProperty("--bd-depth", d.toFixed(3));
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    tick();
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
