"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/effects/reveal-on-scroll";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

// Self-contained bundle of the real extension UI. Lives in /public so Next
// serves it same-origin (an iframe can then run its scripts + blob URLs), and
// the maintenance-mode middleware skips it because it ends in `.html`.
const DEMO_SRC = "/demo/minibrief-extension-demo.html";

// The bundle was captured at a desktop viewport. We render the iframe at this
// logical size and scale it to fit whatever space it's in, so the whole UI is
// always visible instead of clipped or scrollbarred.
const LOGICAL_W = 1440;
const LOGICAL_H = 900;

/**
 * Renders the demo iframe at its native desktop size, scaled to fit its parent.
 * `fit="width"` fills the container width and reserves matching height (in-page
 * frame). `fit="contain"` shrinks to fit both axes and centers (full screen).
 */
function ScaledDemo({ fit, onLoad }: { fit: "width" | "contain"; onLoad?: () => void }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const compute = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (!w) return;
      setScale(fit === "contain" ? Math.min(w / LOGICAL_W, h / LOGICAL_H) : w / LOGICAL_W);
    };
    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    return () => ro.disconnect();
  }, [fit]);

  return (
    <div
      ref={boxRef}
      className={`relative w-full overflow-hidden ${fit === "contain" ? "h-full flex items-center justify-center" : ""}`}
      style={fit === "width" && scale ? { height: LOGICAL_H * scale } : undefined}
    >
      {scale > 0 && (
        <div className="relative" style={{ width: LOGICAL_W * scale, height: LOGICAL_H * scale }}>
          <iframe
            title="Mini Brief — interactive product demo"
            src={DEMO_SRC}
            onLoad={onLoad}
            className="absolute left-0 top-0 border-0 bg-[#faf9f5]"
            style={{
              width: LOGICAL_W,
              height: LOGICAL_H,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
            }}
          />
        </div>
      )}
    </div>
  );
}

function BrowserBar({ children }: { children?: React.ReactNode }) {
  return (
    <div className="relative z-[3] flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.07] bg-white/[0.02]">
      <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
      <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
      <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
      <div className="flex-1 flex justify-center min-w-0 px-3">
        <div className="inline-flex items-center gap-1.5 w-full max-w-[280px] justify-center rounded-md bg-black/30 border border-white/[0.07] px-3 py-1">
          <span className="live-dot" aria-hidden="true" />
          <span className="font-body text-[11px] text-fg-3 truncate">mail.google.com · Mini Brief</span>
        </div>
      </div>
      {children}
    </div>
  );
}

/**
 * The real product in a browser-window frame. Reusable anywhere.
 * - boot="scroll": load the 2 MB bundle when it nears the viewport (mid-page).
 * - boot="idle":   load it after first paint via requestIdleCallback (hero,
 *   above the fold) so it never blocks LCP.
 * On small screens / data-saver connections it stays a tap-to-launch poster.
 */
export function DemoFrame({
  boot = "scroll",
  className = "max-w-[1080px]",
}: {
  boot?: "scroll" | "idle";
  className?: string;
}) {
  const [launched, setLaunched] = useState(false);
  const [frameLoaded, setFrameLoaded] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (launched || typeof window === "undefined") return;
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    if (nav.connection?.saveData) return;
    if (window.matchMedia("(max-width: 767px)").matches) return;

    if (boot === "idle") {
      const w = window as Window & {
        requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
        cancelIdleCallback?: (id: number) => void;
      };
      if (w.requestIdleCallback) {
        const id = w.requestIdleCallback(() => setLaunched(true), { timeout: 2500 });
        return () => w.cancelIdleCallback?.(id);
      }
      const t = window.setTimeout(() => setLaunched(true), 1200);
      return () => window.clearTimeout(t);
    }

    const el = frameRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setLaunched(true);
            io.disconnect();
          }
        }
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [launched, boot]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    e.currentTarget.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <div className={`relative z-[1] mx-auto w-full ${className}`}>
      <div
        ref={frameRef}
        onMouseMove={onMove}
        className="demo-card group relative overflow-hidden rounded-2xl border border-white/[0.10] bg-[rgba(13,21,40,0.6)] shadow-[0_30px_70px_rgba(0,0,0,0.5),0_0_50px_rgba(74,98,245,0.10)]"
      >
        <BrowserBar>
          {launched && (
            <div className="hidden sm:flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setFullscreen(true)}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.12] bg-white/[0.02] px-3 py-1 font-mono text-[10px] tracking-[0.12em] uppercase text-fg-2 transition-colors hover:border-accent-b/60 hover:text-white"
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M15 3h6v6" />
                  <path d="M9 21H3v-6" />
                  <path d="M21 3l-7 7" />
                  <path d="M3 21l7-7" />
                </svg>
                Full screen
              </button>
            </div>
          )}
        </BrowserBar>

        {launched ? (
          <div className="relative">
            <ScaledDemo fit="width" onLoad={() => setFrameLoaded(true)} />
            <div
              aria-hidden={frameLoaded}
              className={`absolute inset-0 z-[5] flex flex-col items-center justify-center gap-3 bg-[rgba(9,14,30,0.97)] transition-opacity duration-700 ${
                frameLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            >
              <span className="h-8 w-8 rounded-full border-2 border-accent-b border-t-transparent animate-spin" />
              <span className="font-display text-[13px] font-semibold text-white">
                Booting the live demo…
              </span>
              <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-fg-3">
                Loading the real interface
              </span>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setLaunched(true)}
            aria-label="Launch the interactive Mini Brief demo"
            className="relative block w-full outline-none focus-visible:ring-2 focus-visible:ring-accent-b focus-visible:ring-inset"
          >
            <div className="relative aspect-[16/10] w-full">
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 60% 60% at 50% 42%, rgba(74,98,245,0.22), transparent 70%)",
                }}
              />
              <div className="demo-scan" aria-hidden="true" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
                <span className="relative h-16 w-16 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110">
                  <span className="demo-ring" aria-hidden="true" />
                  <span className="demo-ring delay" aria-hidden="true" />
                  <span className="demo-play flex h-16 w-16 items-center justify-center rounded-full bg-accent-b shadow-[0_10px_34px_rgba(74,98,245,0.5)]">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </span>
                <span className="font-display text-[16px] font-semibold text-white">
                  Launch the interactive demo
                </span>
                <span className="font-body text-[12px] text-fg-3">
                  Runs in your browser · nothing to install
                </span>
              </div>
            </div>
            <div className="demo-spotlight" aria-hidden="true" />
          </button>
        )}
      </div>

      {launched && (
        <p className="mt-4 text-center font-body text-[12px] text-fg-3">
          Best on desktop.{" "}
          <button
            type="button"
            onClick={() => setFullscreen(true)}
            className="text-accent-b link-underline"
          >
            Open full screen
          </button>{" "}
          or{" "}
          <a
            href={DEMO_SRC}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-b link-underline"
          >
            open in a new tab ↗
          </a>
          .
        </p>
      )}

      <Dialog open={fullscreen} onOpenChange={setFullscreen}>
        <DialogContent className="w-[96vw] max-w-[1540px] h-[92vh] p-0 overflow-hidden flex flex-col">
          <DialogTitle className="sr-only">Mini Brief interactive demo</DialogTitle>
          <DialogDescription className="sr-only">
            The real Mini Brief interface, running in your browser.
          </DialogDescription>
          <BrowserBar />
          <div className="flex-1 min-h-0">
            {fullscreen && <ScaledDemo fit="contain" />}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

/** Standalone "Try it live" section (kept for optional mid-page placement). */
export function LiveDemo() {
  return (
    <Reveal
      as="section"
      id="try-it-live"
      className="relative z-[1] overflow-hidden px-6 sm:px-12 py-14 sm:py-20 border-t border-white/[0.05] scroll-mt-24"
    >
      <div className="demo-orb demo-orb-a" aria-hidden="true" />
      <div className="demo-orb demo-orb-b" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[74%] w-[min(1120px,96vw)] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(ellipse 55% 60% at 50% 45%, rgba(74,98,245,0.20), rgba(123,92,255,0.09) 55%, transparent 75%)",
        }}
      />

      <div className="font-body text-[12px] font-semibold tracking-[0.08em] uppercase text-accent-b/70 text-center mb-3">
        Try it live
      </div>
      <h2 className="font-display font-bold tracking-[-0.02em] text-white text-center mb-2 leading-[1.15] text-[clamp(26px,3.8vw,40px)]">
        Not a mockup — the <span className="text-grad">real product</span>.
      </h2>
      <p className="font-body text-[15px] text-fg-2 text-center mb-10 max-w-[540px] mx-auto leading-relaxed">
        This is the actual Mini Brief interface, running right here in your browser.
        Click around the triage, summaries, and drafts — no install, no sign-up.
      </p>

      <DemoFrame boot="scroll" />
    </Reveal>
  );
}
