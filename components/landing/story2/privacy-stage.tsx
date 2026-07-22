"use client";

import { memo } from "react";
import { BrowserBar } from "@/components/landing/live-demo";
import { CHAPTERS2, HEADS2, MINI_ROWS, PROOF2 } from "./privacy-content";

/**
 * Pinned stage for the privacy architecture beat. A static, memoised DOM tree
 * that the orchestrator animates by flipping `data-chapter` on the root — every
 * transition is CSS (globals.css `cine2-*`), transform/opacity only. All copy
 * stays mounted for screen readers and crawlers.
 *
 * The story: your inbox opens inside the browser → a device boundary seals
 * around it → the pipe to "our servers" carries only settings, email content is
 * blocked → proof chips → finale.
 */
export const PrivacyStage = memo(function PrivacyStage({
  stageRef,
}: {
  stageRef: React.Ref<HTMLDivElement>;
}) {
  return (
    <div ref={stageRef} className="cine2-stage" data-chapter="open" data-live="0">
      <div className="cine2-glow cine2-glow-a" aria-hidden="true" />
      <div className="cine2-glow cine2-glow-b" aria-hidden="true" />

      {/* Top narration — one slide per chapter (sealed uses the finale). */}
      <div className="cine2-heads">
        {HEADS2.map((h) => (
          <div key={h.id} className="cine2-head" data-head={h.id}>
            <h3 className="font-display text-[clamp(30px,4vw,60px)] font-extrabold leading-[1.04] tracking-[-0.035em] text-white">
              {h.title}
            </h3>
            <p className="mt-3 font-body text-[15px] text-fg-2 max-w-[520px] mx-auto">
              {h.sub}
            </p>
          </div>
        ))}
      </div>

      {/* The scene: device (browser) — pipe — our servers. */}
      <div className="cine2-grid">
        {/* Device sandbox */}
        <div className="cine2-device">
          <div className="cine2-seal" aria-hidden="true" />
          <div className="cine2-browser">
            <BrowserBar />
            <div className="cine2-inbox">
              {MINI_ROWS.map((r, i) => (
                <div key={i} className="cine2-row">
                  <span
                    className="cine2-ava"
                    style={{ backgroundImage: r.tint }}
                    aria-hidden="true"
                  >
                    {r.initials}
                  </span>
                  <span className="cine2-bars">
                    <span className="cine2-bar" style={{ width: r.w }} />
                    <span className="cine2-bar cine2-bar-sm" />
                  </span>
                </div>
              ))}
              <div className="cine2-core" aria-hidden="true">
                <span className="cine2-core-ring" />
                <span className="cine2-core-ring cine2-core-ring-2" />
                <span className="cine2-core-label">Reading in your browser</span>
              </div>
            </div>
          </div>
          <div className="cine2-badge" aria-hidden="true">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="11" x="3" y="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            On your device
          </div>
        </div>

        {/* Pipe toward our servers — email content gets blocked. */}
        <div className="cine2-link" aria-hidden="true">
          <div className="cine2-pipe">
            <span className="cine2-packet cine2-packet-mail" />
            <span className="cine2-packet cine2-packet-mail cine2-packet-2" />
          </div>
          <div className="cine2-shield">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
          <span className="cine2-link-label">email content · blocked</span>
        </div>

        {/* Our servers — nothing lands. */}
        <div className="cine2-server">
          <div className="cine2-server-rack" aria-hidden="true">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="8" x="2" y="2" rx="2" />
              <rect width="20" height="8" x="2" y="14" rx="2" />
              <path d="M6 6h.01M6 18h.01" />
            </svg>
          </div>
          <span className="cine2-server-name">Our servers</span>
          <span className="cine2-server-count">
            <span className="cine2-server-num">0</span> emails stored
          </span>
        </div>
      </div>

      {/* Proof chips. */}
      <div className="cine2-proof" aria-hidden="true">
        {PROOF2.map((t) => (
          <span key={t} className="cine2-chip">
            {t}
          </span>
        ))}
      </div>

      {/* Chapter dots. */}
      <div className="cine2-dots" aria-hidden="true">
        {CHAPTERS2.map((c, i) => (
          <span key={c.id} data-dot={c.id} data-active={i === 0 ? "1" : "0"} />
        ))}
      </div>

      {/* Finale (sealed) — keyboard-reachable content. */}
      <div className="cine2-finale">
        <div className="cine2-finale-item cine2-finale-lock" aria-hidden="true">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="11" x="3" y="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
        <div className="cine2-finale-mask mb-3">
          <h3 className="cine2-finale-headline font-display text-[clamp(38px,5.2vw,70px)] font-extrabold leading-[1.03] tracking-[-0.035em] text-white">
            Your email <span className="text-grad">stays yours.</span>
          </h3>
        </div>
        <p className="cine2-finale-item mb-6 max-w-[460px] font-body text-[15px] leading-[1.65] text-fg-2">
          Read in your browser, sent only to the AI that answers you, and never
          stored on our servers.
        </p>
        <div className="cine2-finale-item flex items-center gap-3">
          <a
            href="/privacy"
            className="inline-flex items-center gap-2 rounded-full border border-accent-border bg-accent-dim px-5 py-2.5 font-body text-[13px] font-semibold text-white transition-colors hover:border-accent-b/60"
          >
            How privacy works
          </a>
          <a
            href="/security"
            className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] px-5 py-2.5 font-body text-[13px] font-semibold text-fg-2 transition-colors hover:text-white hover:border-white/25"
          >
            Security
          </a>
        </div>
      </div>
    </div>
  );
});
