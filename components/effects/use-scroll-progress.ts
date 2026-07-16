"use client";

import { useEffect, useRef } from "react";

type Options = {
  /**
   * Called with progress 0..1 as the track scrolls through the viewport.
   * p = 0 when the track's top reaches the viewport top; p = 1 when the
   * track's bottom reaches the viewport bottom. Invoked imperatively per
   * rAF frame — never causes a React render. Keep it cheap: CSS-var /
   * dataset / textContent writes only.
   */
  onFrame: (p: number) => void;
  /**
   * Exponential smoothing factor per frame (0 = raw scroll position).
   * ~0.16 turns discrete wheel steps into a fluid glide. The rAF loop
   * stays alive only until the smoothed value converges on the target.
   */
  smooth?: number;
  enabled?: boolean;
};

/**
 * Scroll-progress engine for pinned scenes. Attach the returned ref to a
 * tall "track" element containing a sticky stage; the hook maps the page's
 * traversal of that track to 0..1.
 *
 * Perf contract:
 * - Geometry (track top / range) is read only on resize, never per frame.
 * - Per-frame reads are `window.scrollY` alone; passive listeners + rAF.
 * - An IntersectionObserver gates all work when the track is more than a
 *   viewport away; leaving the track snaps one final clamped emit so fast
 *   flings always land on the correct end state.
 */
export function useScrollProgress<T extends HTMLElement>({
  onFrame,
  smooth = 0,
  enabled = true,
}: Options) {
  const trackRef = useRef<T>(null);
  const onFrameRef = useRef(onFrame);

  useEffect(() => {
    onFrameRef.current = onFrame;
  }, [onFrame]);

  useEffect(() => {
    const el = trackRef.current;
    if (!enabled || !el) return;

    let trackTop = 0;
    let range = 1;
    let current = -1; // -1 = nothing emitted yet (forces the first emit)
    let raf = 0;
    let active = true;

    const computeTarget = () => {
      const p = (window.scrollY - trackTop) / range;
      return p < 0 ? 0 : p > 1 ? 1 : p;
    };

    const emit = (value: number) => {
      if (value !== current) {
        current = value;
        onFrameRef.current(current);
      }
    };

    const tick = () => {
      raf = 0;
      const target = computeTarget();
      let next = target;
      if (smooth > 0 && current >= 0) {
        next = current + (target - current) * smooth;
        // Snap once we're within a hair of the target so the loop ends.
        if (Math.abs(target - next) < 0.0002) next = target;
      }
      emit(next);
      if (current !== target) schedule();
    };

    const schedule = () => {
      if (!raf && active) raf = requestAnimationFrame(tick);
    };

    const measure = () => {
      // Layout reads live here (resize/entry only), never in the frame path.
      const rect = el.getBoundingClientRect();
      trackTop = rect.top + window.scrollY;
      range = Math.max(1, el.offsetHeight - window.innerHeight);
      schedule();
    };

    const onScroll = () => schedule();

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          active = e.isIntersecting;
          if (active) {
            measure();
          } else {
            if (raf) {
              cancelAnimationFrame(raf);
              raf = 0;
            }
            // One clamped snap so states are correct if the user flung past.
            emit(computeTarget());
          }
        }
      },
      { rootMargin: "100% 0px" },
    );

    // Track height changes with viewport units; content above the track
    // shifts trackTop — watch both.
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    ro.observe(document.documentElement);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    io.observe(el);
    measure();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      ro.disconnect();
      io.disconnect();
    };
  }, [enabled, smooth]);

  return trackRef;
}
