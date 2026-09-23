/**
 * The product screenshots, by key. Dimensions are CSS pixels (the files are
 * 2x). hero and brief are captured from the product demo (its cream palette
 * recoloured to white for the site); reply, promises and
 * inboxes are stand-ins drawn in the product's style until real captures
 * replace them. Only this file changes when they do.
 */
export const shots = {
  hero:     { src: "/shots/hero.png",     alt: "The MiniBrief brief view", w: 1600, h: 1000 },
  brief:    { src: "/shots/brief.png",    alt: "A ranked brief with a long thread summarized", w: 928, h: 900 },
  reply:    { src: "/shots/reply.png",    alt: "A reply drafted from an intent", w: 1400, h: 760 },
  promises: { src: "/shots/promises.png", alt: "The Promise Ledger", w: 1400, h: 810 },
  inboxes:  { src: "/shots/inboxes.png",  alt: "Gmail and Outlook mailboxes connected side by side", w: 1400, h: 1000 },
} as const;

export type ShotKey = keyof typeof shots;
