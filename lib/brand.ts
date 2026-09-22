/**
 * The brand, in one place: the light palette the home page is built on, the
 * wordmark, and the two public contact points. The web app's URLs live in
 * lib/portal.ts, not here.
 */
export const brandColors = {
  /** Text, and the footer background. */
  ink: "#07091A",
  /** The one accent: the primary button and links. */
  blue: "#4A72F5",
  /** Page background. */
  page: "#F5F5F7",
  /** Eyebrows and captions. */
  muted: "#94A3B8",
} as const;

export const WORDMARK = "MiniBrief";

export const LINKEDIN_URL = "https://www.linkedin.com/company/minibrief";

export const CONTACT_EMAIL = "privacy@minibrief.app";
export const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}`;
