"use client";

import { useEffect, useState } from "react";

/**
 * Gentle "keep scrolling" chevron under the hero microcopy. Bounces until the
 * user scrolls for the first time, then fades out for good. Hidden entirely
 * under reduced motion (a bouncing cue is pure decoration).
 */
export function ScrollCue() {
  const [hidden, setHidden] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      return;
    }
    if (window.scrollY > 12) {
      setHidden(true);
      return;
    }
    const onScroll = () => setHidden(true);
    window.addEventListener("scroll", onScroll, { passive: true, once: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (reduced) return null;

  return (
    <div
      aria-hidden="true"
      className={`scroll-cue transition-opacity duration-500 ${hidden ? "opacity-0" : "opacity-100"}`}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  );
}
