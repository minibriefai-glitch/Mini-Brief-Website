"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Perspective tilt-on-cursor wrapper — the Stripe/Linear card feel, done with
 * CSS transforms only (no WebGL). The card leans a few degrees toward the
 * pointer and eases back to rest when the cursor leaves; pair it with the
 * `.tilt-card` class (globals.css) for the layered floating shadow.
 *
 * Writes --rx/--ry/--tz imperatively per rAF frame, so a moving cursor never
 * triggers a React render. Fully inert for anyone who can't or shouldn't get
 * it: reduced-motion, coarse/touch pointers, and no-hover devices render the
 * card flat and skip all listeners.
 */

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Max lean in degrees on each axis. Spec ceiling is ~8°. */
  max?: number;
  /** Lift toward the viewer (px) while hovered — deepens the float. */
  lift?: number;
  as?: React.ElementType;
};

export function TiltCard({
  children,
  className,
  max = 7,
  lift = 6,
  as: Tag = "div",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Honour the people who opt out of motion or can't hover a pointer.
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;

    let raf = 0;
    // current vs. target, so entry/exit both glide instead of snapping.
    let rx = 0;
    let ry = 0;
    let tz = 0;
    let tRx = 0;
    let tRy = 0;
    let tTz = 0;

    const write = () => {
      raf = 0;
      rx += (tRx - rx) * 0.14;
      ry += (tRy - ry) * 0.14;
      tz += (tTz - tz) * 0.14;
      el.style.setProperty("--rx", `${rx.toFixed(3)}deg`);
      el.style.setProperty("--ry", `${ry.toFixed(3)}deg`);
      el.style.setProperty("--tz", `${tz.toFixed(2)}px`);
      // Keep gliding until we've effectively converged on the target.
      if (
        Math.abs(tRx - rx) > 0.01 ||
        Math.abs(tRy - ry) > 0.01 ||
        Math.abs(tTz - tz) > 0.05
      ) {
        schedule();
      }
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(write);
    };

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width; // 0..1
      const py = (e.clientY - r.top) / r.height;
      // Toward the cursor: top → tilt back (+rx), right → tilt right (−ry).
      tRx = (0.5 - py) * 2 * max;
      tRy = (px - 0.5) * 2 * max;
      tTz = lift;
      schedule();
    };
    const onLeave = () => {
      tRx = 0;
      tRy = 0;
      tTz = 0;
      schedule();
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [max, lift]);

  const Component = Tag as React.ElementType<
    React.HTMLAttributes<HTMLElement> & React.RefAttributes<HTMLElement>
  >;
  return (
    <Component ref={ref} className={cn("tilt-card", className)}>
      {children}
    </Component>
  );
}
