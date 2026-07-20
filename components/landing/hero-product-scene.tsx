"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { DemoFrame } from "./live-demo";
import type { Pointer } from "./hero-scene-atmosphere";

/**
 * Hero product visual: the *live* interactive demo presented as a floating
 * 3/4-perspective device, with a WebGL atmosphere layer behind it.
 *
 * The panel is real DOM (an iframe running the actual extension), not a
 * texture — that is deliberate. The hero copy claims "the real product,
 * live", and rasterising it to a video texture would quietly make that
 * false. The trade-off is that the panel can't receive scene post-processing
 * on its own face, so its rim light is CSS (see .hero-panel-3d in
 * globals.css) while bloom applies to the orbs behind it.
 *
 * Three modes, decided once on mount:
 * - "immersive": WebGL atmosphere + breathing tilt + pointer parallax.
 * - "static":    prefers-reduced-motion — everything renders, nothing moves.
 * - "flat":      phones, save-data, low-core, or no WebGL — no canvas at all,
 *                just a statically tilted panel.
 */

// Three.js only ships to clients that actually enter "immersive"/"static".
const HeroSceneAtmosphere = dynamic(() => import("./hero-scene-atmosphere"), {
  ssr: false,
  loading: () => null,
});

type Mode = "flat" | "static" | "immersive";

/** Resting 3/4 perspective. Everything else is an offset from here. */
const BASE_RX = 5.5;
const BASE_RY = -12;

function supportsWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export function HeroProductScene() {
  const [mode, setMode] = useState<Mode>("flat");
  const [inView, setInView] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef<Pointer>({ x: 0, y: 0 });

  // ── Mode decision ────────────────────────────────────────────────────────
  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean };
      deviceMemory?: number;
    };

    const decide = () => {
      const lowEnd =
        (nav.hardwareConcurrency ?? 8) <= 4 || (nav.deviceMemory ?? 8) <= 4;
      if (!wide.matches || nav.connection?.saveData || lowEnd || !supportsWebGL()) {
        setMode("flat");
        return;
      }
      setMode(reduced.matches ? "static" : "immersive");
    };

    decide();
    wide.addEventListener("change", decide);
    reduced.addEventListener("change", decide);
    return () => {
      wide.removeEventListener("change", decide);
      reduced.removeEventListener("change", decide);
    };
  }, []);

  // ── Pause everything below the fold ──────────────────────────────────────
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) setInView(e.isIntersecting);
      },
      { rootMargin: "120px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // ── Breathing tilt + pointer parallax ────────────────────────────────────
  // Writes CSS vars imperatively; React never renders during a move.
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    if (mode !== "immersive" || !inView) {
      panel.style.setProperty("--hx", `${BASE_RX}deg`);
      panel.style.setProperty("--hy", `${BASE_RY}deg`);
      return;
    }

    let raf = 0;
    let px = 0;
    let py = 0;
    // 0 = full 3/4 tilt, 1 = flat-on. Eases up while the pointer is over the
    // panel: the demo is live and clickable, and clicking into a tilted
    // surface is needlessly awkward.
    let flatten = 0;
    let hovering = false;

    const onPointerMove = (e: PointerEvent) => {
      // Normalise to -1..1 across the viewport.
      pointerRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
    };
    const onEnter = () => {
      hovering = true;
    };
    const onLeave = () => {
      hovering = false;
    };

    const tick = (now: number) => {
      const t = now / 1000;
      const target = pointerRef.current;
      px += (target.x - px) * 0.045;
      py += (target.y - py) * 0.045;
      flatten += ((hovering ? 1 : 0) - flatten) * 0.08;

      // "Gently breathing" — a couple of degrees, not a turntable.
      const k = 1 - flatten;
      const rx = (BASE_RX + Math.cos(t * 0.27) * 1.3 - py * 3.2) * k;
      const ry = (BASE_RY + Math.sin(t * 0.34) * 2.1 + px * 4.5) * k;

      panel.style.setProperty("--hx", `${rx.toFixed(3)}deg`);
      panel.style.setProperty("--hy", `${ry.toFixed(3)}deg`);
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    panel.addEventListener("pointerenter", onEnter);
    panel.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
      panel.removeEventListener("pointerenter", onEnter);
      panel.removeEventListener("pointerleave", onLeave);
    };
  }, [mode, inView]);

  return (
    <div ref={rootRef} className="relative w-full">
      {mode !== "flat" && (
        <div
          className="pointer-events-none absolute inset-[-22%] z-0"
          aria-hidden="true"
        >
          <HeroSceneAtmosphere
            pointer={pointerRef}
            active={mode === "immersive" && inView}
          />
        </div>
      )}

      <div className="hero-panel-stage relative z-[1]">
        <div ref={panelRef} className="hero-panel-3d">
          <DemoFrame boot="idle" className="max-w-none" />
        </div>
        <div className="hero-panel-shadow" aria-hidden="true" />
      </div>
    </div>
  );
}
