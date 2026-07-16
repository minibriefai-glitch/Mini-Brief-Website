"use client";

import { useEffect, useRef } from "react";

/**
 * Subtle scroll parallax for decorative layers (glows, orbs) — never text.
 * Renders an outer positioning element (measured) and an inner element that
 * receives the drift transform, so measurement never reads its own offset.
 * All instances share one passive scroll listener + rAF (module singleton).
 * No-ops entirely under reduced motion. Marked aria-hidden — decoration only.
 */

type Entry = { outer: HTMLElement; inner: HTMLElement; rate: number };

const entries = new Set<Entry>();
let raf = 0;

function tick() {
  raf = 0;
  const vh = window.innerHeight;
  // Reads first, then writes — keeps layout clean within the frame.
  const writes: Array<[HTMLElement, number]> = [];
  for (const e of entries) {
    const r = e.outer.getBoundingClientRect();
    if (r.bottom < -240 || r.top > vh + 240) continue;
    const delta = r.top + r.height / 2 - vh / 2;
    writes.push([e.inner, delta * e.rate]);
  }
  for (const [el, y] of writes) {
    el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
  }
}

function schedule() {
  if (!raf) raf = requestAnimationFrame(tick);
}

function add(entry: Entry) {
  entries.add(entry);
  if (entries.size === 1) {
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
  }
  schedule();
}

function remove(entry: Entry) {
  entries.delete(entry);
  if (entries.size === 0) {
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
    if (raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  }
}

export function ParallaxDrift({
  rate = -0.06,
  className = "",
  children,
}: {
  /** px of drift per px of distance from viewport center. Negative = lags the scroll. */
  rate?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;
    const entry = { outer, inner, rate };
    add(entry);
    return () => remove(entry);
  }, [rate]);

  return (
    <div ref={outerRef} className={className} aria-hidden="true">
      <div ref={innerRef} className="h-full w-full">
        {children}
      </div>
    </div>
  );
}
