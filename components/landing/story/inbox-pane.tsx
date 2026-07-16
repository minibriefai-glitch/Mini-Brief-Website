"use client";

import { memo } from "react";
import { INBOX_ROWS, UNREAD_START } from "./content";

/**
 * The light Gmail-ish inbox inside the cinematic product window. Pure
 * presentational and memoized — every state change (triage chips, sweeps,
 * focus, compaction) arrives as data attributes / inline transforms written
 * imperatively by the orchestrator, so scrubbing never re-renders this tree.
 *
 * Row geometry contract: each row wrapper is exactly ROW_STRIDE px tall
 * (row box + gap). Sweep compaction shifts rows up by whole strides using
 * transforms only — no layout animation.
 */

export const ROW_STRIDE = 60;

export const InboxPane = memo(function InboxPane() {
  return (
    <div className="cine-inbox absolute inset-0 flex flex-col">
      <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-black/[0.07]">
        <div className="flex items-center gap-2.5">
          <span className="font-display text-[15px] font-bold text-ink">Inbox</span>
          <span className="rounded-full bg-black/[0.06] px-2.5 py-0.5 font-mono text-[10px] font-bold text-ink-2">
            <span data-unread>{UNREAD_START}</span> unread
          </span>
        </div>
        <div className="cine-mb-pill flex items-center gap-1.5 rounded-full p-[1px]" style={{ backgroundImage: "var(--grad)" }}>
          <span className="flex items-center gap-1.5 rounded-full bg-[#fdfcfa] px-2.5 py-[3px]">
            <span className="live-dot" />
            <span className="font-mono text-[9px] tracking-[0.1em] uppercase text-ink-2">Mini Brief on</span>
          </span>
        </div>
      </div>

      <div className="relative flex-1 overflow-hidden px-2.5 pt-2">
        {/* Triage beam: sweeps down the list during "ignite", popping chips
            as it passes. Driven by --sweep (0..1), transform-only. */}
        <div className="cine-beam" aria-hidden="true" />
        {INBOX_ROWS.map((r) => (
          <div key={r.id} data-row={r.id} className="cine-row-slot" style={{ height: ROW_STRIDE }}>
            <div data-label={r.label.toLowerCase()} className="cine-row flex h-[52px] items-center gap-3 rounded-[10px] px-3">
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-display text-[11px] font-bold text-white"
                style={{ background: r.avatar }}
              >
                {r.initials}
              </span>
              <span className="w-[118px] shrink-0 truncate font-display text-[12.5px] font-bold text-ink">
                {r.sender}
              </span>
              <span className="min-w-0 flex-1 truncate font-body text-[12px] text-ink">
                <span className="font-semibold">{r.subject}</span>
                <span className="text-ink-2"> — {r.snippet}</span>
              </span>
              <span className={`cine-chip cine-chip-${r.label.toLowerCase()} shrink-0`}>{r.label}</span>
              <span className="w-[52px] shrink-0 text-right font-body text-[10.5px] font-semibold text-ink-2">
                {r.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
