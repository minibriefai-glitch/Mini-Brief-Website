"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useScrollProgress } from "@/components/effects/use-scroll-progress";
import { SectionHeader } from "@/components/landing/section-header";
import {
  CHAPTERS,
  INBOX_ROWS,
  SUMMARY_PROSE,
  SUMMARY_TOTAL,
  UNREAD_START,
  band,
  chapterAt,
  type ChapterId,
} from "./content";
import { ROW_STRIDE } from "./inbox-pane";
import { ShowcaseRows } from "./showcase-rows";
import { Stage } from "./stage";

/**
 * Orchestrator for the Showcase section. Renders the stacked rows
 * (SSR/no-JS default; small screens; reduced motion; save-data) or the
 * pinned cinematic scene, and — in cinematic mode — runs the per-frame
 * pipeline: scroll progress in, CSS-var / dataset / textContent writes out.
 * Every visual state is a pure function of progress, so scrolling backwards
 * unwinds the whole story. React never renders during a scrub.
 */

type Mode = "static" | "cinematic";

/** Caption shown per chapter (openers + finale use the intro overlay instead). */
const CAP_FOR: Record<ChapterId, string> = {
  arrive: "",
  ignite: "",
  brief: "summary",
  drafts: "drafts",
  clients: "clients",
  sweep: "unsubscribe",
  zero: "",
};

/** Inbox row highlighted as "the thread being read" per chapter. */
const FOCUS_FOR: Partial<Record<ChapterId, string>> = {
  brief: "q4",
  drafts: "sarah",
  clients: "sarah",
  sweep: "mktg",
};

/** Chapter boundary hysteresis — kills flicker when parked on an edge. */
const HYST = 0.008;

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

type ElCache = {
  rows: { el: HTMLElement; newsletterRank: number }[];
  caps: HTMLElement[];
  dots: HTMLElement[];
  intros: HTMLElement[];
  prose: HTMLElement | null;
  action: HTMLElement | null;
  count: HTMLElement | null;
  unread: HTMLElement | null;
};

const initialLast = () => ({
  chapter: -1,
  chars: -1,
  arrived: -1,
  labeled: -1,
  swept: -1,
  tone: "",
  unsub: "",
  alert: false,
  badge: -1,
  focus: "",
  live: "",
});

export function CinematicShowcase() {
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
  const els = useRef<ElCache | null>(null);
  const last = useRef(initialLast());

  // Cache the stage's driven elements once per cinematic mount. Declared
  // before the engine hook so it runs first; the engine's first emit is a
  // rAF later regardless.
  useEffect(() => {
    if (mode !== "cinematic") {
      els.current = null;
      return;
    }
    const stage = stageRef.current;
    if (!stage) return;
    let newsletterRank = 0;
    const rows = Array.from(stage.querySelectorAll<HTMLElement>("[data-row]")).map((el) => {
      const row = INBOX_ROWS.find((r) => r.id === el.dataset.row);
      return { el, newsletterRank: row?.newsletter ? newsletterRank++ : -1 };
    });
    els.current = {
      rows,
      caps: Array.from(stage.querySelectorAll<HTMLElement>("[data-cap]")),
      dots: Array.from(stage.querySelectorAll<HTMLElement>("[data-dot]")),
      intros: Array.from(stage.querySelectorAll<HTMLElement>("[data-intro]")),
      prose: stage.querySelector<HTMLElement>("[data-prose]"),
      action: stage.querySelector<HTMLElement>("[data-action]"),
      count: stage.querySelector<HTMLElement>("[data-count]"),
      unread: stage.querySelector<HTMLElement>("[data-unread]"),
    };
    last.current = initialLast();
  }, [mode]);

  const onFrame = useCallback((p: number) => {
    const stage = stageRef.current;
    const E = els.current;
    if (!stage || !E) return;
    const L = last.current;

    /* ── continuous channel ── */
    stage.style.setProperty("--p", p.toFixed(4));
    const { index, id, local } = chapterAt(p);
    stage.style.setProperty("--cp", local.toFixed(4));

    // Triage beam position (sweeps the list during "ignite").
    stage.style.setProperty("--sweep", band(p, 0.1, 0.175).toFixed(4));

    const live = p > 0 && p < 1 ? "1" : "0";
    if (live !== L.live) {
      L.live = live;
      stage.dataset.live = live;
    }

    // AI brief scrub-types with scroll (and un-types on the way back up).
    const bl = band(band(p, 0.18, 0.4), 0.1, 0.92);
    const chars = Math.round(bl * SUMMARY_TOTAL.length);
    if (chars !== L.chars && E.prose && E.action) {
      L.chars = chars;
      E.prose.textContent = SUMMARY_TOTAL.slice(0, Math.min(chars, SUMMARY_PROSE.length));
      E.action.textContent =
        chars > SUMMARY_PROSE.length ? SUMMARY_TOTAL.slice(SUMMARY_PROSE.length, chars) : "";
      const streaming = chars > 0 && chars < SUMMARY_TOTAL.length ? "1" : "0";
      if (stage.dataset.streaming !== streaming) stage.dataset.streaming = streaming;
    }

    // Unread badge: counts UP as mail cascades in, back DOWN in the finale.
    const arriveBand = band(p, 0.0, 0.085);
    const zeroBand = band(p, 0.86, 1);
    const badge =
      zeroBand > 0
        ? Math.round(UNREAD_START * (1 - easeOutCubic(band(zeroBand, 0.06, 0.72))))
        : Math.round(UNREAD_START * easeOutCubic(arriveBand));
    if (badge !== L.badge) {
      L.badge = badge;
      const text = String(badge);
      if (E.unread) E.unread.textContent = text;
      if (E.count) E.count.textContent = text;
    }

    /* ── discrete channel (ref-compared; writes only on flips) ── */

    // Mail cascade: rows drop in one by one across the arrive band.
    const arrived = Math.min(E.rows.length, Math.floor(arriveBand * (E.rows.length + 1.2)));
    if (arrived !== L.arrived) {
      L.arrived = arrived;
      E.rows.forEach(({ el }, i) => {
        el.dataset.arrived = i < arrived ? "1" : "0";
      });
    }

    // Triage chips pop as the beam passes each row.
    const tp = band(p, 0.105, 0.175);
    const labeled = Math.min(E.rows.length, Math.floor(tp * (E.rows.length + 1)));
    if (labeled !== L.labeled) {
      L.labeled = labeled;
      E.rows.forEach(({ el }, i) => {
        el.dataset.labeled = i < labeled ? "1" : "0";
      });
    }

    // Draft tone flips by thirds of the drafts band.
    const dl = band(p, 0.4, 0.56);
    const tone = dl < 1 / 3 ? "voice" : dl < 2 / 3 ? "brief" : "warm";
    if (tone !== L.tone) {
      L.tone = tone;
      stage.dataset.tone = tone;
    }

    // Client "going quiet" alert.
    const alert = p >= 0.63;
    if (alert !== L.alert) {
      L.alert = alert;
      stage.dataset.alert = alert ? "1" : "0";
    }

    // Unsubscribe stages.
    const ul = band(p, 0.7, 0.86);
    const unsub = ul < 0.22 ? "idle" : ul < 0.5 ? "filtering" : "done";
    if (unsub !== L.unsub) {
      L.unsub = unsub;
      stage.dataset.unsub = unsub;
    }

    // Newsletter rows sweep out (staggered), remaining rows compact up by
    // whole row strides — transforms only, zero layout work.
    const swept = ul >= 0.82 ? 3 : ul >= 0.7 ? 2 : ul >= 0.56 ? 1 : 0;
    if (swept !== L.swept) {
      L.swept = swept;
      let sweptAbove = 0;
      for (const { el, newsletterRank } of E.rows) {
        el.style.transform = sweptAbove > 0 ? `translateY(-${sweptAbove * ROW_STRIDE}px)` : "";
        const isSwept = newsletterRank >= 0 && newsletterRank < swept;
        el.dataset.swept = isSwept ? "1" : "0";
        if (isSwept) sweptAbove++;
      }
    }

    // Chapter flip: camera, intro slides, captions, dots, panel, focus row.
    if (index !== L.chapter) {
      const forward = index > L.chapter && p >= CHAPTERS[index].from + HYST;
      const backward =
        index < L.chapter && L.chapter >= 0 && p <= CHAPTERS[L.chapter].from - HYST;
      if (L.chapter === -1 || forward || backward) {
        L.chapter = index;
        stage.dataset.chapter = id;
        stage.dataset.panel = index >= 2 ? "open" : "closed";
        for (const s of E.intros) s.dataset.on = s.dataset.intro === id ? "1" : "0";
        const cap = CAP_FOR[id];
        for (const c of E.caps) c.dataset.active = c.dataset.cap === cap ? "1" : "0";
        E.dots.forEach((d, i) => {
          d.dataset.active = i === index ? "1" : "0";
        });
        const focus = FOCUS_FOR[id] ?? "";
        if (focus !== L.focus) {
          L.focus = focus;
          for (const { el } of E.rows) {
            el.dataset.focus = el.dataset.row === focus ? "1" : "0";
          }
        }
      }
    }
  }, []);

  const trackRef = useScrollProgress<HTMLDivElement>({
    onFrame,
    smooth: 0.18,
    enabled: mode === "cinematic",
  });

  return (
    <section className="relative z-[1] px-6 sm:px-12 py-14 sm:py-20 section-seam">
      <SectionHeader
        kicker="What it does"
        title={
          <>
            The work it does, <span className="text-grad">every day</span>.
          </>
        }
        sub="Not a list of features — the work Mini Brief takes off your plate the moment you open your inbox."
        className="mb-14 sm:mb-20"
      />

      {mode === "static" ? (
        <ShowcaseRows />
      ) : (
        <div ref={trackRef} className="cine-track -mx-6 sm:-mx-12">
          <Stage stageRef={stageRef} />
        </div>
      )}
    </section>
  );
}
