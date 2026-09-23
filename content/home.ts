/**
 * Every word on the home page, transcribed from the brief. Components read
 * from here and add markup, never copy. Portal URLs come from lib/portal.ts,
 * contact details from lib/brand.ts.
 */
import { PORTAL_GET_STARTED_URL, PORTAL_SIGN_IN_URL } from "@/lib/portal";
import type { ShotKey } from "./shots";

export const nav = {
  anchors: [
    { label: "Privacy", href: "#privacy" },
    { label: "Security", href: "#security" },
    { label: "How it works", href: "#how-it-works" },
    { label: "FAQ", href: "#faq" },
  ],
  signIn: { label: "Sign in", href: PORTAL_SIGN_IN_URL },
  getStarted: { label: "Get started", href: PORTAL_GET_STARTED_URL },
} as const;

export const hero = {
  eyebrow: "In beta · Gmail & Outlook · Free trial",
  h1: "Your Gmail and Outlook, in one brief.",
  sub: "MiniBrief reads your inbox, flags what actually needs you, drafts the replies, and keeps track of what you promised. Your email is never stored on our servers.",
  primary: { label: "Get started", href: PORTAL_GET_STARTED_URL },
  secondary: { label: "See how it works", href: "#how-it-works" },
  shot: "hero" satisfies ShotKey,
} as const;

export const problem = {
  eyebrow: "The problem",
  h2: "Email eats the morning.",
  lines: [
    "The one message that matters is buried under newsletters, receipts, and noise.",
    "The thread is twenty messages deep, and the actual question is somewhere in the middle.",
    "You said you'd follow up Friday. Friday came and went.",
  ],
} as const;

export const whatItDoes = {
  eyebrow: "What it does",
  h2: "The work MiniBrief takes off your plate.",
  blocks: [
    {
      title: "One brief, not a pile.",
      body: "Open MiniBrief and get one ranked brief: what needs a reply, what's waiting on someone else, and what can wait. Long threads come with the key points and the next step already pulled out.",
      shot: "brief" satisfies ShotKey,
    },
    {
      title: "Replies, drafted.",
      body: "Pick what you want to say, approve, decline, follow up, schedule, and MiniBrief writes the reply. Turn on voice matching and it learns from your own sent mail, so drafts read like you wrote them.",
      shot: "reply" satisfies ShotKey,
    },
    {
      title: "Promise Ledger.",
      body: "MiniBrief spots commitments in both directions: what you told a client you'd do, and what they said they'd send you. It keeps the list so nothing slips because a thread went quiet.",
      shot: "promises" satisfies ShotKey,
    },
    {
      title: "Every inbox, one place.",
      body: "Connect Gmail and Outlook side by side, including the shared mailboxes your team works out of, and get one brief across all of them.",
      shot: "inboxes" satisfies ShotKey,
    },
  ],
  closing:
    "Also in the box: catch-up reports after time away, VIP alerts when someone important goes quiet, meeting prep from your calendar, a tone check before you send, and one-click unsubscribe that sticks.",
} as const;

export const privacy = {
  id: "privacy",
  eyebrow: "Private by design",
  h2: "Your email is never stored on our servers.",
  lines: [
    "Your mail is read and sorted in your browser.",
    "AI requests pass through our proxy to one named provider, Anthropic, and are never logged or kept. Anthropic's terms forbid training on your data.",
    "No analytics, no telemetry, no tracking.",
    "Your account syncs your settings across devices, never your messages.",
  ],
  link: { label: "How it's built", href: "/security" },
} as const;

/**
 * Every control here is documented on /security or in the CASA evidence
 * pack for cloud.minibrief.app; the source is noted per item.
 */
export const security = {
  id: "security",
  eyebrow: "Security",
  h2: "Secure by construction.",
  intro: "These are not policies we promise to follow. They are how MiniBrief is built.",
  items: [
    {
      title: "Your email is never stored.",
      body: "Your messages are never written to our database, so there is nothing on our side to leak, sell, or hand over.",
      // /security: "The short version"
    },
    {
      title: "A subject line and about 120 characters, by default.",
      body: "That is all most features send to the AI. Full message text goes out only for features you switch on yourself, and only for the message you opened.",
      // /security: "The short version"
    },
    {
      title: "The AI proxy keeps nothing.",
      body: "It forwards each request to Anthropic and returns the answer without logging or storing the request body. Anthropic's terms forbid training on your data.",
      // /security: "How your email flows"; CASA 6.5.1
    },
    {
      title: "Mailbox tokens are sealed at rest.",
      body: "The tokens that connect Gmail and Outlook are encrypted at rest with AES-256-GCM, and no provider token is ever sent to your browser.",
      // CASA 4.1.3, 3.2.1
    },
    {
      title: "Sign-in built to resist brute force.",
      body: "Passwords are at least 12 characters, checked against leaked-password lists, and stored only as bcrypt hashes by our auth provider. Sign-in and code entry are rate-limited.",
      // CASA 1.1.1, 1.1.3, 1.3.4
    },
    {
      title: "Short-lived access tokens.",
      body: "Access tokens expire after an hour and refresh tokens rotate; signing out revokes every session. Session cookies are HttpOnly, Secure, and SameSite.",
      // CASA 2.2.1, 2.2.3, 2.3.1, 2.3.2
    },
    {
      title: "Every row is guarded in the database.",
      body: "Access control runs as PostgreSQL row-level security on every table, below the API, so the database itself decides what each signed-in user can see.",
      // CASA 3.1.1
    },
    {
      title: "Card details never touch us.",
      body: "Card details are entered on Stripe's own checkout page, a PCI-DSS Level 1 provider, and never reach MiniBrief.",
      // /security: "Payments"; CASA 6.5.1
    },
  ],
  alsoLead: "Also:",
  also: [
    "TLS 1.2 or better on every connection",
    "A Content Security Policy that forbids embedding MiniBrief in another site",
    "Only the OAuth scopes a feature needs, with access you can revoke at any time",
    "Dependencies audited for known vulnerabilities",
    "Secrets kept in a secrets store, never in the app",
    "The local cache wiped when you sign out",
  ],
  // CASA 4.1.1, 2.3.2, 6.1.1, 6.7.1, 6.6.1; /security: "Access and authentication"
  link: { label: "Read the full Security page", href: "/security" },
} as const;

export const different = {
  eyebrow: "Why MiniBrief",
  h2: "A different deal with your data.",
  columns: { usual: "The usual approach", us: "MiniBrief" },
  rows: [
    { label: "Where your email lives", usual: "Uploaded to their servers", us: "Read in your browser, never stored" },
    { label: "How much goes to the AI", usual: "Whole threads, by default", us: "A subject line and about 120 characters, unless you opt in" },
    { label: "Who the AI provider is", usual: "Unnamed, or several", us: "One named provider, Anthropic, under terms that forbid training on your data" },
    { label: "Where the AI key lives", usual: "Often in your browser", us: "Server-side, with nothing to extract" },
    { label: "Drafts in your voice", usual: "A generic AI tone", us: "Learned from your own sent mail, when you turn it on" },
    { label: "What you promised", usual: "Not tracked", us: "The Promise Ledger keeps commitments in both directions" },
    { label: "Gmail and Outlook", usual: "One or the other", us: "Both, side by side, including shared mailboxes" },
  ],
} as const;

export const howItWorks = {
  id: "how-it-works",
  eyebrow: "How it works",
  h2: "Up and running in a few minutes.",
  steps: [
    {
      title: "Create your account",
      body: "Sign up with your email. Every account starts with a free trial.",
    },
    {
      title: "Connect Gmail or Outlook",
      body: "Sign in with Google or Microsoft. Work or school Outlook accounts usually need a one-time approval from a Microsoft 365 admin.",
    },
    {
      title: "Open your brief",
      body: "MiniBrief reads your inbox and hands you the first brief. Come back each morning, or whenever you need to know where things stand.",
    },
  ],
} as const;

export const founder = {
  eyebrow: "Why we built it",
  quote:
    "I built MiniBrief because my inbox was beating me. The one email that mattered was buried three pages down, threads ran twenty messages deep, and some days I missed things completely. I didn't want a prettier inbox. I wanted my day back, so I built the thing I needed.",
  name: "Michael Mancuso",
  role: "Founder, MiniBrief",
  photo: "/photos/founder.jpg",
} as const;

export interface FaqItem {
  q: string;
  /** Plain text, verbatim. Also what the FAQ JSON-LD emits. */
  a: string;
  /** A phrase inside `a` to render as a link. */
  link?: { text: string; href: string };
}

export const faq = {
  id: "faq",
  h2: "Questions, answered straight.",
  items: [
    {
      q: "Do you store or read my email?",
      a: "No. Your mail is parsed and sorted in your browser, and we store none of it. AI features send a limited amount through our proxy to Anthropic to generate the result you asked for; the proxy keeps nothing and writes nothing to our database. The full picture is on the Security page.",
      link: { text: "Security page", href: "/security" },
    },
    {
      q: "Does it work on my phone?",
      a: "MiniBrief is a web app, so there is nothing to install and it opens in any modern browser. It's designed for the desktop browser first.",
    },
    {
      q: "Can my team use it on shared inboxes?",
      a: "Yes. Connect the Gmail or Outlook mailboxes your team works out of and MiniBrief builds one brief across all of them.",
    },
    {
      q: "What does it cost?",
      a: "Every account starts with a free trial. After that, pricing is per mailbox. Email michael@minibrief.app and we'll walk you through it.",
    },
    {
      q: "Do I need my own AI key?",
      a: "No. The AI is built in. There is no key to manage and no separate AI bill.",
    },
  ] satisfies readonly FaqItem[],
} as const;

export const cta = {
  h2: "Your inbox, briefed from today.",
  body: "MiniBrief is in beta for Gmail and Outlook. Create an account, connect a mailbox, and your first brief is minutes away.",
  primary: { label: "Get started", href: PORTAL_GET_STARTED_URL },
} as const;

export const footer = {
  tagline: "Email for Gmail and Outlook, private by design. Your email is never stored on our servers.",
  product: {
    heading: "Product",
    links: [
      { label: "How it works", href: "#how-it-works" },
      { label: "FAQ", href: "#faq" },
      { label: "Sign in", href: PORTAL_SIGN_IN_URL },
      { label: "Get started", href: PORTAL_GET_STARTED_URL },
    ],
  },
  legal: {
    heading: "Legal",
    links: [
      { label: "Terms", href: "/terms" },
      { label: "Privacy", href: "/privacy" },
      { label: "Security", href: "/security" },
      { label: "Accessibility", href: "/accessibility" },
    ],
  },
  contact: { heading: "Contact", linkedInLabel: "LinkedIn" },
  copyright: "© 2026 MiniBrief",
} as const;

export const metadata = {
  title: "MiniBrief — Your Gmail and Outlook, in one brief",
  description:
    "MiniBrief reads your Gmail and Outlook, flags what needs a reply, drafts it, and tracks what you promised. Your email is never stored on our servers. Now in beta.",
} as const;

export interface DemoVideoConfig {
  enabled: boolean;
  /** Self-hosted URLs. */
  webm: string;
  mp4: string;
  /** A local file. */
  poster: string;
}

export const demoVideo: DemoVideoConfig = { enabled: false, webm: "", mp4: "", poster: "" };
