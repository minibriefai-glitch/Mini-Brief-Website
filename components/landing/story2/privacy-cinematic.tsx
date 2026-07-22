"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/effects/reveal-on-scroll";
import { useScrollProgress } from "@/components/effects/use-scroll-progress";
import { SectionHeader } from "@/components/landing/section-header";
import { CHAPTERS2, HEADS2, PROOF2, chapter2At } from "./privacy-content";
import { PrivacyStage } from "./privacy-stage";

/**
 * Orchestrator for the second pinned beat — the privacy architecture story.
 * Mirrors the Showcase engine but far lighter: every visual state is pure CSS
 * keyed on `data-chapter`, so onFrame only writes progress vars + the chapter
 * attribute (never React state). Renders a stacked-card fallback on small
 * screens / reduced motion / save-data.
 */

type Mode = "static" | "cinematic";

/** Chapter-boundary hysteresis — kills flicker when parked on an edge. */
const HYST = 0.01;

export function PrivacyCinematic() {
  const [mode, setMode] = useState<Mode>("static");

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    const decide = () => {
      setMode(
        wide.matches && !reduced.matches && !nav.connection?.saveData
          ? "cinematic"
          : "static",
      );
    };
    decide();
    wide.addEventListener("change", decide);
    reduced.addEventListener("change", decide);
    return () => {
      wide.removeEventListener("change", decide);
      reduced.removeEventListener("change", decide);
    };
  }, []);

  const stageRef = useRef<HTMLDivElement>(null);
  const last = useRef({ index: -1, live: "" });

  const onFrame = useCallback((p: number) => {
    const stage = stageRef.current;
    if (!stage) return;
    const L = last.current;

    stage.style.setProperty("--p", p.toFixed(4));
    const { index, id, local } = chapter2At(p);
    stage.style.setProperty("--cp", local.toFixed(4));

    const live = p > 0 && p < 1 ? "1" : "0";
    if (live !== L.live) {
      L.live = live;
      stage.dataset.live = live;
    }

    // Chapter flip with hysteresis (same pattern as the Showcase engine).
    if (index !== L.index) {
      const forward = index > L.index && p >= CHAPTERS2[index].from + HYST;
      const backward =
        index < L.index && L.index >= 0 && p <= CHAPTERS2[L.index].from - HYST;
      if (L.index === -1 || forward || backward) {
        L.index = index;
        stage.dataset.chapter = id;
      }
    }
  }, []);

  const trackRef = useScrollProgress<HTMLDivElement>({
    onFrame,
    smooth: 0.16,
    enabled: mode === "cinematic",
  });

  return (
    <section className="relative z-[1] px-6 sm:px-12 py-14 sm:py-20 section-seam">
      <SectionHeader
        kicker="Private by design"
        title={
          <>
            Your email never leaves <span className="text-grad">your browser.</span>
          </>
        }
        sub="Most AI inbox tools upload your mail to their servers. Watch where yours actually goes."
        className="mb-14 sm:mb-20"
      />

      {mode === "static" ? (
        <PrivacyStatic />
      ) : (
        <div ref={trackRef} className="cine2-track -mx-6 sm:-mx-12">
          <PrivacyStage stageRef={stageRef} />
        </div>
      )}
    </section>
  );
}

/** Stacked fallback for small screens / reduced motion / save-data. */
function PrivacyStatic() {
  return (
    <Reveal stagger className="mx-auto grid max-w-[880px] grid-cols-1 gap-4 sm:grid-cols-2">
      {HEADS2.map((h) => (
        <div key={h.id} className="card-glass-static p-6">
          <h3 className="mb-1.5 font-display text-[17px] font-semibold tracking-[-0.01em] text-white">
            {h.title}
          </h3>
          <p className="font-body text-[13.5px] leading-[1.6] text-fg-2">{h.sub}</p>
        </div>
      ))}
      <div className="flex flex-wrap justify-center gap-2.5 pt-2 sm:col-span-2">
        {PROOF2.map((t) => (
          <span
            key={t}
            className="rounded-full border border-accent-border bg-accent-dim px-4 py-2 font-mono text-[11px] uppercase tracking-[0.08em] text-accent-b/90"
          >
            {t}
          </span>
        ))}
      </div>
    </Reveal>
  );
}
