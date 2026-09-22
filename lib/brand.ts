/**
 * The brand, in one place: the light palette the home page is built on, the
 * wordmark, and the two public contact points. The web app's URLs live in
 * lib/portal.ts, not here.
 */
export const brandColors = {
  /** Text, and the footer background. */
  ink: "#07091A",
  /** The one accent: the primary button and links. 5.5:1 under white, 5.0:1 on page. */
  blue: "#3A5FDC",
  /** The primary button's hover fill: the same hue, darker. 6.6:1 under white. */
  blueHover: "#3352C8",
  /** Page background. */
  page: "#F5F5F7",
  /** Borders and dividers only; never text. */
  muted: "#94A3B8",
  /** Captions and secondary text: 7.0:1 on page. Every piece of text passes 4.5:1. */
  mutedText: "#475569",
} as const;

export const WORDMARK = "MiniBrief";

export const LINKEDIN_URL = "https://www.linkedin.com/company/minibrief";

export const CONTACT_EMAIL = "privacy@minibrief.app";
export const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}`;
