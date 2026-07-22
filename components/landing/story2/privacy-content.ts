/**
 * Story data for the second pinned cinematic — the privacy architecture beat
 * ("Your email never leaves your browser"). Kept self-contained; it borrows
 * only the generic `band()` remapper from the inbox story, never its
 * inbox-specific chapter table.
 */

export type Chapter2Id = "open" | "local" | "reach" | "proof" | "sealed";

export type Chapter2 = {
  id: Chapter2Id;
  /** Scroll band within the track, 0..1. */
  from: number;
  to: number;
};

export const CHAPTERS2: Chapter2[] = [
  { id: "open", from: 0.0, to: 0.16 }, // inbox opens inside the browser
  { id: "local", from: 0.16, to: 0.42 }, // a device boundary seals around it
  { id: "reach", from: 0.42, to: 0.68 }, // the pipe to "our servers" is blocked
  { id: "proof", from: 0.68, to: 0.86 }, // proof chips light up
  { id: "sealed", from: 0.86, to: 1.0 }, // finale
];

export function chapter2At(p: number): {
  index: number;
  id: Chapter2Id;
  local: number;
} {
  let index = 0;
  for (let i = CHAPTERS2.length - 1; i >= 0; i--) {
    if (p >= CHAPTERS2[i].from) {
      index = i;
      break;
    }
  }
  const c = CHAPTERS2[index];
  const span = c.to - c.from;
  const local = span > 0 ? Math.min(1, Math.max(0, (p - c.from) / span)) : 1;
  return { index, id: c.id, local };
}

/** Narration shown at the top of the stage, one slide per chapter (sealed uses
 *  the centered finale instead). Toggled by the stage's data-chapter in CSS. */
export const HEADS2: { id: Exclude<Chapter2Id, "sealed">; title: string; sub: string }[] = [
  {
    id: "open",
    title: "You open your inbox.",
    sub: "Gmail or Outlook — right where you already work.",
  },
  {
    id: "local",
    title: "It all happens right here.",
    sub: "Your email is read inside your browser, on your device.",
  },
  {
    id: "reach",
    title: "Our servers never see it.",
    sub: "Your email content is blocked from our servers — only your settings ever sync.",
  },
  {
    id: "proof",
    title: "Private by construction.",
    sub: "Not a policy you have to trust — it's how MiniBrief is built.",
  },
];

/** Proof chips revealed in the "proof" chapter. */
export const PROOF2 = [
  "Processed in-browser",
  "Never stored on our servers",
  "Zero tracking",
];

/** A few static inbox rows for the mini browser (decorative). */
export const MINI_ROWS = [
  { initials: "MT", tint: "linear-gradient(135deg,#4a62f5,#7b5cff)", w: "72%" },
  { initials: "SC", tint: "linear-gradient(135deg,#2f9e8f,#22d3a0)", w: "58%" },
  { initials: "JW", tint: "linear-gradient(135deg,#d97a3f,#ef8b6e)", w: "64%" },
  { initials: "PP", tint: "linear-gradient(135deg,#3f6ad9,#5b9cff)", w: "50%" },
];
