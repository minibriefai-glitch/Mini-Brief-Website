"use client";

import { memo } from "react";
import { DEMOS, TONES, TONES_ORDER } from "./content";
import { AlertIcon, CheckIcon, SparkIcon, UnsubIcon } from "./showcase-rows";

/**
 * The dark MiniBrief side panel inside the cinematic product window —
 * mirrors the real extension (dark panel over a light Gmail). Four chapter
 * bodies are absolutely stacked and crossfaded by the stage's
 * `data-chapter`; tone/unsub/alert states are driven by `data-tone`,
 * `data-unsub`, `data-alert` on the stage. No timers, no local state —
 * the orchestrator writes attributes, CSS does the rest.
 */

const [SUMMARY, DRAFTS, CLIENTS, UNSUB] = DEMOS;

export const BriefPanel = memo(function BriefPanel() {
  return (
    <aside className="cine-panel absolute inset-y-0 right-0 z-[2] flex w-[315px] flex-col border-l border-white/[0.08] bg-surface shadow-[-24px_0_48px_rgba(0,0,0,0.35)]">
      <div className="flex items-center gap-2 border-b border-white/[0.07] px-4 py-3">
        <span
          className="flex h-6 w-6 items-center justify-center rounded-[7px] font-display text-[10px] font-extrabold text-white"
          style={{ backgroundImage: "var(--grad)" }}
        >
          MB
        </span>
        <span className="font-display text-[13px] font-bold text-white">
          <span className="text-mini">Mini</span>Brief
        </span>
        <span className="ml-auto flex items-center gap-1.5 font-mono text-[8px] tracking-[0.14em] uppercase text-fg-3">
          <span className="live-dot" />
          live
        </span>
      </div>

      <div className="relative flex-1">
        {/* ── brief ── */}
        <div data-body="brief" className="cine-body absolute inset-0 px-4 py-4">
          <PanelTitle>{SUMMARY.demoTitle}</PanelTitle>
          <div className="rounded-[10px] border border-accent-border bg-[rgba(74,98,245,0.08)] p-3.5">
            <div className="mb-1.5 flex items-center gap-1.5 font-mono text-[9px] tracking-[0.14em] uppercase text-accent-b">
              <span className="h-[5px] w-[5px] animate-pulse rounded-full bg-accent-b shadow-[0_0_5px_var(--accent-b)]" />
              AI Summary
              <span className="cine-generating ml-1.5 text-[10px] normal-case tracking-normal text-fg-3">
                generating…
              </span>
            </div>
            <p className="min-h-[150px] font-body text-[12px] leading-[1.55] text-[#aab0cc]">
              <span data-prose />
              <strong data-action className="text-accent-b" />
              <span
                className="cine-caret ml-0.5 inline-block h-[12px] w-[6px] animate-pulse bg-accent-b align-text-bottom"
              />
            </p>
          </div>
          <div className="mt-3 flex items-center gap-2 rounded-[10px] border border-dashed border-accent-border bg-[rgba(74,98,245,0.04)] px-3.5 py-2.5">
            <SparkIcon />
            <span className="font-body text-[11px] text-fg-3">Key points, owners, and the next action — extracted.</span>
          </div>
        </div>

        {/* ── drafts ── */}
        <div data-body="drafts" className="cine-body absolute inset-0 px-4 py-4">
          <PanelTitle>{DRAFTS.demoTitle}</PanelTitle>
          <div className="mb-2 font-body text-[11px] text-fg-3">Re: Q2 roadmap — can we push to Friday?</div>
          <div className="mb-2.5 flex flex-wrap gap-1.5">
            {TONES_ORDER.map((k) => (
              <span key={k} data-pill={k} className="cine-pill">
                {k}
              </span>
            ))}
          </div>
          <div className="relative min-h-[120px]">
            {TONES_ORDER.map((k) => (
              <div
                key={k}
                data-draft={k}
                className="cine-draft absolute inset-x-0 top-0 rounded-lg border border-accent-border bg-[rgba(74,98,245,0.07)] px-3.5 py-3 font-body text-[12px] leading-relaxed text-[#aab0cc]"
              >
                {TONES[k]}
              </div>
            ))}
          </div>
          <div className="mt-2 flex items-center gap-2 font-mono text-[9px] tracking-[0.12em] uppercase text-fg-3">
            <CheckIcon />
            Tone check passed — sounds like you
          </div>
        </div>

        {/* ── clients ── */}
        <div data-body="clients" className="cine-body absolute inset-0 px-4 py-4">
          <PanelTitle>{CLIENTS.demoTitle}</PanelTitle>
          <div className="mb-3 flex items-center gap-3 rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2.5">
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-display text-[12px] font-bold text-white"
              style={{ background: "linear-gradient(135deg,#4a62f5,#7b5cff)" }}
            >
              SC
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-display text-[12px] font-semibold text-white">Sarah Chen</div>
              <div className="truncate font-body text-[11px] text-fg-3">Acme Corp · VP Operations</div>
            </div>
            <span className="shrink-0 rounded-full border border-[rgba(34,211,160,0.22)] bg-[rgba(34,211,160,0.08)] px-2 py-0.5 font-mono text-[8px] tracking-[0.12em] uppercase text-live">
              Active
            </span>
          </div>
          <div className="mb-3 grid grid-cols-3 gap-1.5">
            {[
              { k: "Cadence", v: "Every 2 wks" },
              { k: "Last contact", v: "9 days ago" },
              { k: "Open threads", v: "2" },
            ].map((m) => (
              <div key={m.k} className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-2 py-2 text-center">
                <div className="mb-0.5 font-mono text-[8px] tracking-[0.1em] uppercase text-fg-3">{m.k}</div>
                <div className="font-display text-[11.5px] font-semibold text-white">{m.v}</div>
              </div>
            ))}
          </div>
          <div className="relative min-h-[86px]">
            <div className="cine-watching absolute inset-x-0 top-0 flex items-center gap-2 rounded-[10px] border border-dashed border-white/[0.10] bg-white/[0.02] p-3">
              <span className="h-[10px] w-[10px] animate-spin rounded-full border-2 border-accent-b border-t-transparent" />
              <span className="font-body text-[11px] text-fg-3">Watching this relationship…</span>
            </div>
            <div className="cine-alert absolute inset-x-0 top-0 rounded-[10px] border border-[rgba(245,158,74,0.3)] bg-[rgba(245,158,74,0.08)] p-3">
              <div className="mb-1 flex items-center gap-2">
                <AlertIcon />
                <span className="font-display text-[12px] font-semibold text-white">Going quiet</span>
              </div>
              <p className="font-body text-[11px] leading-[1.5] text-[#aab0cc]">
                Sarah hasn&apos;t replied in 9 days — past your 2-week cadence. MiniBrief flagged it before the
                relationship cooled.
              </p>
            </div>
          </div>
        </div>

        {/* ── sweep (unsubscribe) ── */}
        <div data-body="sweep" className="cine-body absolute inset-0 px-4 py-4">
          <PanelTitle>{UNSUB.demoTitle}</PanelTitle>
          <div className="relative min-h-[150px] rounded-[10px] border border-accent-border bg-[rgba(74,98,245,0.06)] p-3.5">
            <div className="cine-unsub-idle absolute inset-x-3.5 top-3.5">
              <div className="flex items-center justify-between gap-3 rounded-lg border border-accent-border bg-[rgba(74,98,245,0.18)] px-3 py-2.5">
                <div className="flex items-center gap-2">
                  <UnsubIcon />
                  <span className="font-display text-[13px] font-semibold text-white">Unsubscribe &amp; auto-trash</span>
                </div>
              </div>
              <p className="mt-2 font-body text-[11px] leading-relaxed text-fg-3">
                Fires the sender&apos;s RFC 8058 unsubscribe AND writes a Gmail filter so future emails skip the inbox.
              </p>
            </div>
            <div className="cine-unsub-filtering absolute inset-x-3.5 top-3.5">
              <div className="mb-2 flex items-center gap-2">
                <span className="h-[10px] w-[10px] animate-spin rounded-full border-2 border-accent-b border-t-transparent" />
                <span className="font-display text-[13px] font-semibold text-white">Creating Gmail filter…</span>
              </div>
              <div className="pl-4 font-mono text-[10px] leading-relaxed text-fg-3">
                ▸ POSTing unsubscribe to sender
                <br />▸ Writing filter: from:(*marketingdaily.com) → trash
              </div>
            </div>
            <div className="cine-unsub-done absolute inset-x-3.5 top-3.5">
              <div className="mb-2 flex items-center gap-2">
                <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full border border-live/50 bg-live/20">
                  <CheckIcon />
                </span>
                <span className="font-display text-[13px] font-semibold text-white">Filter created — permanent.</span>
              </div>
              <p className="font-body text-[12px] leading-[1.55] text-[#aab0cc]">
                Future emails from <span className="text-accent-b">marketingdaily.com</span> (and any subdomain)
                auto-trash via Gmail&apos;s server-side filter.
              </p>
            </div>
          </div>
          <div className="cine-sweep-note mt-3 flex items-center gap-2 font-mono text-[9px] tracking-[0.12em] uppercase text-fg-3">
            <span className="h-[5px] w-[5px] rounded-full bg-live shadow-[0_0_5px_var(--live)]" />
            3 newsletters cleared from this inbox
          </div>
        </div>
      </div>
    </aside>
  );
});

function PanelTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 truncate font-display text-[12px] font-semibold text-fg-2">{children}</div>
  );
}
