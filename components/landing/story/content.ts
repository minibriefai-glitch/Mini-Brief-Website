/**
 * Single source of truth for the Showcase story — shared by the cinematic
 * scroll scene and the stacked-rows fallback so the copy can never drift
 * between the two rendering paths.
 */

export type DemoId = "summary" | "drafts" | "clients" | "unsubscribe";

export type DemoCopy = {
  id: DemoId;
  tag: string;
  title: string;
  desc: string;
  bullets: string[];
  demoTitle: string;
};

export const DEMOS: DemoCopy[] = [
  {
    id: "summary",
    tag: "Triage",
    title: "We read every thread for you.",
    desc: "MiniBrief scans the full thread the moment you open it. However long the back-and-forth, you get the key points, who needs what, and the next action.",
    bullets: [
      "TLDR, action items, and sentiment for any thread length",
      "Reads up to 4,000 characters per email for accuracy",
      "Cached per email — second open is instant, zero token cost",
    ],
    demoTitle: "Thread: Q4 planning — next steps",
  },
  {
    id: "drafts",
    tag: "Voice",
    title: "We draft replies in your voice.",
    desc: "MiniBrief studies your sent folder to learn your voice, including greetings, sign-offs, and formality, then generates replies that read like you wrote them.",
    bullets: [
      "Learns from up to 100 of your real sent emails",
      "Reply by intent — approve, decline, follow up, schedule, and more",
      "Three tone modes (voice, brief, warm) plus a tone check that flags and fixes harsh lines",
    ],
    demoTitle: "Smart Reply — Sarah Chen",
  },
  {
    id: "clients",
    tag: "Relationships",
    title: "We keep your client relationships warm.",
    desc: "MiniBrief builds a profile for every client — status, cadence, history — and quietly watches the threads. When someone important goes quiet, you hear about it before the relationship cools.",
    bullets: [
      "Client profiles: status, cadence, notes, and next check-in",
      "Triage and meeting prep that know who's a client",
      "Relationship-health alerts when a client goes quiet",
    ],
    demoTitle: "Client · Sarah Chen — Acme Corp",
  },
  {
    id: "unsubscribe",
    tag: "Unsubscribe",
    title: "We make unsubscribe permanent.",
    desc: "One click does two things. It fires the RFC 8058 unsubscribe and writes a permanent filter, so if the sender rotates subdomains the next email is still trashed automatically.",
    bullets: [
      "RFC 8058 one-click + mailto fallback",
      "Persistent Gmail server-side filter (not a label rule)",
      "Survives newsletter subdomain rotation",
    ],
    demoTitle: "Marketing Daily — 5 new offers",
  },
];

export const TONES_ORDER = ["voice", "brief", "warm"] as const;
export type ToneKey = (typeof TONES_ORDER)[number];

export const TONES: Record<ToneKey, string> = {
  voice:
    "Hi Sarah — Friday at 9:00 AM works on my calendar. I've blocked the slot and added the call link. Speak then.",
  brief: "Friday at 9am works — see you then.",
  warm: "Hey Sarah, Friday at 9 sounds great — really looking forward to it! Let me know if anything shifts on your end.",
};

export const SUMMARY_PROSE =
  "Team is debating Q4 priorities ahead of Friday's board meeting. API shipping is the leading candidate (James, Priya). Pricing page is still open — needs resolution before the deck is finalized. ";
export const SUMMARY_ACTION = "Action needed from you.";
export const SUMMARY_TOTAL = SUMMARY_PROSE + SUMMARY_ACTION;

/* ───────── Cinematic chapters ───────── */

export type ChapterId =
  | "arrive"
  | "ignite"
  | "brief"
  | "drafts"
  | "clients"
  | "sweep"
  | "zero";

export type Chapter = {
  id: ChapterId;
  /** Scroll band within the track, 0..1. */
  from: number;
  to: number;
  /** Caption copy for this chapter (the four feature chapters reuse DEMOS). */
  demo?: DemoCopy;
};

export const CHAPTERS: Chapter[] = [
  { id: "arrive", from: 0.0, to: 0.1 }, // window tilted + centered, mail cascades in
  { id: "ignite", from: 0.1, to: 0.18 }, // MiniBrief pill lights, beam sweeps, chips pop
  { id: "brief", from: 0.18, to: 0.4, demo: DEMOS[0] }, // camera pushes in, brief scrub-types
  { id: "drafts", from: 0.4, to: 0.56, demo: DEMOS[1] },
  { id: "clients", from: 0.56, to: 0.7, demo: DEMOS[2] },
  { id: "sweep", from: 0.7, to: 0.86, demo: DEMOS[3] }, // camera pulls wide for the sweep
  { id: "zero", from: 0.86, to: 1.0 }, // window recedes, layered finale
];

export function chapterAt(p: number): {
  index: number;
  id: ChapterId;
  /** Progress within the chapter, 0..1. */
  local: number;
} {
  let index = 0;
  for (let i = CHAPTERS.length - 1; i >= 0; i--) {
    if (p >= CHAPTERS[i].from) {
      index = i;
      break;
    }
  }
  const c = CHAPTERS[index];
  const span = c.to - c.from;
  const local = span > 0 ? Math.min(1, Math.max(0, (p - c.from) / span)) : 1;
  return { index, id: c.id, local };
}

/** Remap a local 0..1 into a sub-band, clamped — handy for scrubbing. */
export function band(local: number, from: number, to: number): number {
  const t = (local - from) / (to - from);
  return t < 0 ? 0 : t > 1 ? 1 : t;
}

/* ───────── Inbox fixture (cinematic stage) ───────── */

export type InboxRow = {
  id: string;
  sender: string;
  initials: string;
  /** Avatar background — a CSS gradient string. */
  avatar: string;
  subject: string;
  snippet: string;
  time: string;
  /** Triage label revealed in the "triage" chapter. */
  label: "Urgent" | "Client" | "Team" | "Newsletter" | "FYI";
  /** Newsletter rows sweep out during the "sweep" chapter. */
  newsletter?: boolean;
  /** The thread "being read" while the brief streams. */
  focus?: boolean;
};

export const INBOX_ROWS: InboxRow[] = [
  {
    id: "q4",
    sender: "Maya Torres",
    initials: "MT",
    avatar: "linear-gradient(135deg,#4a62f5,#7b5cff)",
    subject: "Q4 planning — next steps",
    snippet: "Can we align on Q4 priorities? I want everyone's input before the board meeting on Friday…",
    time: "10:24 AM",
    label: "Urgent",
    focus: true,
  },
  {
    id: "sarah",
    sender: "Sarah Chen",
    initials: "SC",
    avatar: "linear-gradient(135deg,#2f9e8f,#22d3a0)",
    subject: "Re: Q2 roadmap — can we push to Friday?",
    snippet: "Friday could work on our side — does 9:00 AM still suit you for the call?",
    time: "9:58 AM",
    label: "Client",
  },
  {
    id: "mktg",
    sender: "Marketing Daily",
    initials: "M",
    avatar: "linear-gradient(135deg,#7a4a99,#aa70cc)",
    subject: "Your weekly digest — 5 hand-picked offers inside",
    snippet: "Don't miss this week's deals: 5 offers our editors love, curated just for you…",
    time: "9:41 AM",
    label: "Newsletter",
    newsletter: true,
  },
  {
    id: "james",
    sender: "James Wu",
    initials: "JW",
    avatar: "linear-gradient(135deg,#d97a3f,#ef8b6e)",
    subject: "API ship date",
    snippet: "Agree on growth but we need to ship the API first — enterprise deals fall through without it.",
    time: "9:12 AM",
    label: "Team",
  },
  {
    id: "priya",
    sender: "Priya Patel",
    initials: "PP",
    avatar: "linear-gradient(135deg,#3f6ad9,#5b9cff)",
    subject: "Pricing page — still unresolved",
    snippet: "+1 on the API. Also, the pricing page issue from last sprint should block the board deck…",
    time: "8:47 AM",
    label: "Team",
  },
  {
    id: "growth",
    sender: "Growth Weekly",
    initials: "G",
    avatar: "linear-gradient(135deg,#4a8f99,#70c2cc)",
    subject: "12 tactics your competitors already use",
    snippet: "This week: the growth loops behind three breakout launches, plus a teardown of…",
    time: "8:30 AM",
    label: "Newsletter",
    newsletter: true,
  },
  {
    id: "billing",
    sender: "Acme Billing",
    initials: "AB",
    avatar: "linear-gradient(135deg,#5a6478,#8892b0)",
    subject: "Invoice #2291 — paid",
    snippet: "Your invoice #2291 for June has been paid in full. No action is required.",
    time: "8:02 AM",
    label: "FYI",
  },
  {
    id: "tech",
    sender: "TechLetter",
    initials: "T",
    avatar: "linear-gradient(135deg,#99574a,#cc8a70)",
    subject: "Tuesday roundup: launches, layoffs, LLMs",
    snippet: "The 10 stories worth your time this morning, summarized in two minutes flat…",
    time: "7:45 AM",
    label: "Newsletter",
    newsletter: true,
  },
];

/** Unread badge the finale counts down from. */
export const UNREAD_START = 47;
