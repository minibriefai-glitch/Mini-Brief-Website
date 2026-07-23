"use client";

import { ParallaxDrift } from "./parallax-drift";

/**
 * Recurring glow-orb motif behind a section — the connective tissue that makes
 * the page read as one continuous 3D space. Pure CSS: two heavily-blurred
 * radial gradients (brand blue → muted violet) on separate parallax layers, so
 * scrolling separates them in depth. No WebGL, no paint storms.
 *
 * Decoration only: absolutely positioned, pointer-events-none, aria-hidden via
 * ParallaxDrift. Drop it as the first child of a `position: relative` section.
 */

type Placement = "left" | "right" | "center";

const POS: Record<Placement, { a: string; b: string }> = {
  left: { a: "top-[6%] -left-[8%]", b: "bottom-[4%] left-[18%]" },
  right: { a: "top-[8%] -right-[6%]", b: "bottom-[6%] right-[16%]" },
  center: { a: "top-[2%] left-1/2 -translate-x-1/2", b: "bottom-[2%] left-[30%]" },
};

export function SectionOrbs({
  placement = "left",
  className = "",
}: {
  placement?: Placement;
  className?: string;
}) {
  const p = POS[placement];
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden -z-10 ${className}`}
      aria-hidden="true"
    >
      {/* Far layer — big, faint blue, lags the scroll most. */}
      <ParallaxDrift rate={-0.05} className={`absolute ${p.a}`}>
        <div className="h-[clamp(320px,42vw,560px)] w-[clamp(320px,42vw,560px)] rounded-full bg-[radial-gradient(circle,rgba(74,98,245,0.16),transparent_68%)] blur-[48px]" />
      </ParallaxDrift>
      {/* Near layer — smaller violet, drifts the other way for depth. */}
      <ParallaxDrift rate={0.04} className={`absolute ${p.b}`}>
        <div className="h-[clamp(220px,30vw,400px)] w-[clamp(220px,30vw,400px)] rounded-full bg-[radial-gradient(circle,rgba(123,92,255,0.13),transparent_66%)] blur-[44px]" />
      </ParallaxDrift>
    </div>
  );
}
