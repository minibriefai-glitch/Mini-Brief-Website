/**
 * The product screenshots, by key. Until the real PNGs land at
 * public/shots/<key>.png these point at flat placeholder SVGs; when they do,
 * only the paths here change.
 */
export const shots = {
  hero:     { src: "/shots/placeholder-hero.svg",     alt: "The MiniBrief brief view", w: 1600, h: 1000 },
  brief:    { src: "/shots/placeholder-brief.svg",    alt: "A ranked brief with a long thread summarized", w: 1400, h: 1000 },
  reply:    { src: "/shots/placeholder-reply.svg",    alt: "A reply drafted from an intent", w: 1400, h: 1000 },
  promises: { src: "/shots/placeholder-promises.svg", alt: "The Promise Ledger", w: 1400, h: 1000 },
  inboxes:  { src: "/shots/placeholder-inboxes.svg",  alt: "Gmail and Outlook mailboxes connected side by side", w: 1400, h: 1000 },
} as const;

export type ShotKey = keyof typeof shots;
