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
  sub: "MiniBrief reads your inbox, flags what actually needs you, drafts the replies, and keeps track of what you promised. Message bodies are not stored on our servers.",
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
      body: "Connect Gmail and Outlook side by side, more than one of each if you like, and get one brief across all of them.",
      shot: "inboxes" satisfies ShotKey,
    },
  ],
  closing:
    "Also in the box: catch-up reports after time away, VIP alerts when someone important goes quiet, meeting prep from your calendar, a tone check before you send, and one-click unsubscribe that sticks.",
} as const;

export const privacy = {
  id: "privacy",
  eyebrow: "Private by design",
  h2: "Message bodies are not stored on our servers.",
  lines: [
    "Our server reads the mailboxes you connect, keeps a rolling 90 days of subjects, senders and previews, and never keeps a message body.",
    "AI requests go to one named provider, Anthropic, and are never logged or kept. Anthropic's terms forbid training on your data.",
    "No analytics, no telemetry, no tracking.",
    "Disconnect a mailbox and everything read from it is deleted at once; delete your account and everything goes.",
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
  groups: [
    {
      title: "Protection in your inbox",
      items: [
        {
          title: "A risk verdict on every message.",
          body: "Sender Guard judges each incoming message against a baseline built from your own mail: who writes to you, how often, and whether their mail passes authentication. A tier, the reasons and the evidence, and you can overturn any verdict.",
          // security plan S0/S1 (shipped 2026-09-22); PRIVACY.md "What we store about your mail"
        },
        {
          title: "Look-alike domains, caught on arrival.",
          body: "A sender imitating a domain you correspond with is called out, and MiniBrief watches about 150 look-alikes of your own domain so mail from one that gets registered is high risk from its first message.",
          // security plan S4 (shipped, DNS-only)
        },
        {
          title: "Links and attachments checked first.",
          body: "For the messages a phish arrives as, links and attachments are judged on the server before you open the mail, and a high-risk finding is pushed to your browser within minutes.",
          // security plan S1 (shipped)
        },
        {
          title: "A guard on Send.",
          body: "A look-alike of a domain you write to, or bank details and credentials headed to an outside address, stop a send until you confirm. A normal reply adds no step.",
          // security plan S3 (shipped)
        },
        {
          title: "A mailbox audit every six hours.",
          body: "Filters that forward, delete or hide your mail are the classic sign of a compromised account. MiniBrief finds them in Gmail, tells you, and removes a bad one with one click.",
          // security plan S2 (shipped, Gmail-first)
        },
        {
          title: "Your domain's posture.",
          body: "SPF, DKIM, DMARC and MTA-STS for your own domain, checked weekly straight from DNS, with the record to add for each gap where there is one.",
          // security plan S4 (shipped)
        },
      ],
    },
    {
      title: "Under the hood",
      items: [
        {
          title: "Message bodies are not stored.",
          body: "Our server keeps a rolling 90 days of subjects, senders and previews so your brief is ready when you open it. A message's body is fetched from your mailbox only when you open it, and is not kept.",
          // PRIVACY.md "The short version", "How long we keep it"
        },
        {
          title: "A subject line and about 120 characters, by default.",
          body: "That is all sorting sends to the AI. Full message text goes out only for the features you use on a message you opened, capped in length.",
          // PRIVACY.md "AI features"
        },
        {
          title: "Nothing sent to the AI is kept.",
          body: "Both the web app and the background worker call Anthropic, scoped to the feature. Neither the request nor the response is logged or stored, and Anthropic's terms forbid training on your data.",
          // PRIVACY.md "AI features"; CASA 6.5.1
        },
        {
          title: "Mailbox grants are sealed at rest.",
          body: "The OAuth grant that connects Gmail or Outlook is encrypted with AES-256-GCM before it is written, under a key that never lives in the database, and your browser never receives it.",
          // PRIVACY.md "The permission"; CASA 4.1.3, 3.2.1
        },
        {
          title: "Sign-in built to resist brute force.",
          body: "Passwords are at least 12 characters, checked against leaked-password lists, and stored only as bcrypt hashes by our auth provider. Two-factor authentication is a switch away. Sign-in and code entry are rate-limited.",
          // CASA 1.1.1, 1.1.3, 1.3.4; portal MfaSection
        },
        {
          title: "Short-lived access tokens.",
          body: "Access tokens expire after an hour and refresh tokens rotate; signing out revokes every session and wipes the local cache. Session cookies are HttpOnly, Secure, and SameSite.",
          // CASA 2.2.1, 2.2.3, 2.3.1, 2.3.2, 6.6.1
        },
        {
          title: "Every row is guarded in the database.",
          body: "Access control runs as PostgreSQL row-level security on every table, below the API, so the database itself decides what each signed-in user can see. No staff tool reads mail rows.",
          // CASA 3.1.1; PRIVACY.md "Who can read it"
        },
        {
          title: "Card details never touch us.",
          body: "Card details are entered on Stripe's own checkout page, a PCI-DSS Level 1 provider, and never reach MiniBrief.",
          // /security "Payments"; CASA 6.5.1
        },
      ],
    },
  ],
  alsoLead: "Also:",
  also: [
    "TLS 1.2 or better on every connection",
    "A Content Security Policy that forbids embedding MiniBrief in another site",
    "Only the OAuth scopes a feature needs, with access you can revoke at any time",
    "Dependencies audited for known vulnerabilities",
    "Secrets kept in a secrets store, never in the app",
    "Auto-quarantine of high-risk mail, if you switch it on",
  ],
  // CASA 4.1.1, 2.3.2, 6.1.1, 6.7.1; security plan S1 (auto-quarantine opt-in)
  link: { label: "Read the full Security page", href: "/security" },
} as const;

export const different = {
  eyebrow: "Why MiniBrief",
  h2: "A different deal with your data.",
  columns: { usual: "The usual approach", us: "MiniBrief" },
  rows: [
    { label: "Where your email lives", usual: "Whole mailboxes copied and kept", us: "Metadata for 90 days, message bodies not stored" },
    { label: "How much goes to the AI", usual: "Whole threads, by default", us: "A subject line and about 120 characters, unless you opt in" },
    { label: "Who the AI provider is", usual: "Unnamed, or several", us: "One named provider, Anthropic, under terms that forbid training on your data" },
    { label: "Where the AI key lives", usual: "Often in your browser", us: "Server-side, with nothing to extract" },
    { label: "Drafts in your voice", usual: "A generic AI tone", us: "Learned from your own sent mail, when you turn it on" },
    { label: "What you promised", usual: "Not tracked", us: "The Promise Ledger keeps commitments in both directions" },
    { label: "Gmail and Outlook", usual: "One or the other", us: "Both, side by side, in one brief" },
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
      a: "Our server reads the mailboxes you connect so your brief is ready whenever you open it. It keeps a rolling 90 days of metadata: subjects, senders, previews, dates and what MiniBrief worked out about each message. Message bodies are not stored; one is fetched from your mailbox when you open it. The AI sees a subject and a short preview per message for sorting, which runs in the background, and the message you opened for the features you use on it; nothing sent is logged or kept. The full picture is on the Security page.",
      link: { text: "Security page", href: "/security" },
    },
    {
      q: "Does it work on my phone?",
      a: "MiniBrief is a web app, so there is nothing to install and it opens in any modern browser. It's designed for the desktop browser first.",
    },
    {
      q: "Can my team use it on shared inboxes?",
      a: "Not yet. Today MiniBrief connects the Gmail and Outlook mailboxes you sign into yourself and builds one brief across all of them; a team edition with shared mailboxes is planned.",
    },
    {
      q: "What does it cost?",
      a: "Every account starts with a free trial. After that, one paid plan unlocks everything. Email michael@minibrief.app and we'll walk you through it.",
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
  tagline: "Email for Gmail and Outlook, private by design. Message bodies are not stored on our servers.",
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
    "MiniBrief reads your Gmail and Outlook, flags what needs a reply, drafts it, and tracks what you promised. Message bodies are not stored on our servers. Now in beta.",
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
