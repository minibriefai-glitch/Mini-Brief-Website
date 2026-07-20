"use client";

import { memo } from "react";
import { BrowserBar } from "@/components/landing/live-demo";
import { BriefPanel } from "./brief-panel";
import { InboxPane } from "./inbox-pane";
import { CHAPTERS, DEMOS, UNREAD_START } from "./content";

/**
 * The pinned cinematic stage. Three framing layers around the product
 * window: wrap (continuous scroll parallax + perspective) → camera
 * (chapter-driven push/pull/tilt, transitioned) → window (finale dim).
 * Chapters "arrive"/"ignite" play under a full-width typographic overlay
 * with the window centered; from "brief" on, the caption rail fades in and
 * the camera pushes toward the panel. All copy stays mounted for SR/SEO.
 */

type CaptionCopy = {
  key: string;
  tag: string;
  title: string;
  desc: string;
  bullets: string[];
};

const CAPTIONS: CaptionCopy[] = DEMOS.map((d) => ({
  key: d.id,
  tag: d.tag,
  title: d.title,
  desc: d.desc,
  bullets: d.bullets.slice(0, 2),
}));

export const Stage = memo(function Stage({
  stageRef,
}: {
  stageRef: React.Ref<HTMLDivElement>;
}) {
  return (
    <div
      ref={stageRef}
      className="cine-stage"
      data-chapter="arrive"
      data-panel="closed"
      data-tone="voice"
      data-unsub="idle"
      data-alert="0"
      data-streaming="0"
      data-live="0"
    >
      {/* Pre-blurred ambient glows, moved by transform only. */}
      <div className="cine-glow cine-glow-a" aria-hidden="true" />
      <div className="cine-glow cine-glow-b" aria-hidden="true" />

      {/* Typographic overlay for the opening chapters. */}
      <div className="cine-intro">
        <div className="cine-intro-slide" data-intro="arrive" data-on="1">
          <h3 className="font-display text-[clamp(36px,4.6vw,72px)] font-extrabold leading-[1.02] tracking-[-0.035em] text-white">
            8:04 AM. <span className="text-grad">47 unread.</span>
          </h3>
          <p className="mt-3 font-body text-[15px] text-fg-2">
            Every morning starts like this.
          </p>
        </div>
        <div className="cine-intro-slide" data-intro="ignite" data-on="0">
          <h3 className="font-display text-[clamp(36px,4.6vw,72px)] font-extrabold leading-[1.02] tracking-[-0.035em] text-white">
            MiniBrief <span className="text-grad">switches on.</span>
          </h3>
          <p className="mt-3 font-body text-[15px] text-fg-2">
            Watch the next half second.
          </p>
        </div>
      </div>

      <div className="cine-grid">
        <div className="cine-rail">
          <div className="cine-captions">
            {CAPTIONS.map((c) => (
              <div key={c.key} data-cap={c.key} data-active="0" className="cine-cap">
                <span className="mb-4 inline-block font-body text-[12px] font-semibold uppercase tracking-[0.08em] text-accent-b/80">
                  {c.tag}
                </span>
                <h3 className="mb-4 font-display text-[clamp(24px,2.4vw,34px)] font-extrabold leading-[1.1] tracking-[-0.025em] text-white">
                  {c.title}
                </h3>
                <p className="mb-5 max-w-[400px] font-body text-[14.5px] leading-[1.7] text-fg-2">{c.desc}</p>
                {c.bullets.length > 0 && (
                  <ul className="flex flex-col gap-2.5">
                    {c.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 font-body text-[13.5px] leading-relaxed text-fg-2">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[rgba(74,98,245,0.30)] bg-[rgba(74,98,245,0.12)]">
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#5b72ff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          <div className="cine-dots" aria-hidden="true">
            {CHAPTERS.map((c, i) => (
              <span key={c.id} data-dot={c.id} data-active={i === 0 ? "1" : "0"} />
            ))}
          </div>
        </div>

        <div className="cine-window-wrap" aria-hidden="true">
          <div className="cine-camera">
            <div className="cine-window overflow-hidden rounded-2xl border border-white/[0.10] bg-[rgba(13,21,40,0.6)] shadow-[0_30px_70px_rgba(0,0,0,0.5),0_0_50px_rgba(74,98,245,0.10)]">
              <BrowserBar />
              <div className="cine-screen relative">
                <InboxPane />
                <BriefPanel />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="cine-finale">
        <div className="cine-finale-item mb-4 font-mono text-[13px] tracking-[0.2em] uppercase text-fg-3">
          <span data-count className="cine-count font-display text-[clamp(48px,6vw,84px)] font-extrabold tracking-[-0.03em] text-white">
            {UNREAD_START}
          </span>
          <span className="ml-3 align-middle">unread</span>
        </div>
        <div className="cine-finale-mask mb-4">
          <h3 className="cine-finale-headline font-display text-[clamp(40px,5.4vw,72px)] font-extrabold leading-[1.02] tracking-[-0.035em] text-white">
            Inbox, <span className="text-grad">briefed.</span>
          </h3>
        </div>
        <p className="cine-finale-item mb-6 max-w-[440px] font-body text-[15px] leading-[1.65] text-fg-2">
          Triage, summaries, drafts, and a quieter inbox — every single morning, without you lifting a finger.
        </p>
        <p className="cine-finale-item font-mono text-[11px] tracking-[0.18em] uppercase text-fg-3">
          every morning · automatically · in your browser
        </p>
      </div>
    </div>
  );
});
