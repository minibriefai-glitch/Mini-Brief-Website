import { Reveal } from "@/components/effects/reveal-on-scroll";
import { SectionOrbs } from "@/components/effects/section-orbs";
import { SectionHeader } from "./section-header";

const FAQS: Array<{ q: string; a: React.ReactNode }> = [
  {
    q: "Do I need a MiniBrief account?",
    a: "Yes. Creating an account takes about a minute and lets MiniBrief sync your settings and VIPs across devices and manage your plan. The account never stores the contents of your emails.",
  },
  {
    q: "Do you store or read my email?",
    a: "No. Your mail is parsed and pre-sorted in your browser, and we store none of it. AI features send a limited amount through our proxy to Anthropic: by default a subject line and a preview of about 120 characters, and full message text only for features you turn on yourself. The proxy forwards each request without logging or keeping its contents, nothing is written to our database, and MiniBrief contains no analytics, telemetry, or behavioral tracking.",
  },
  {
    q: "Which inboxes does it support?",
    a: "Gmail and Outlook, both available now. MiniBrief runs alongside your existing webmail, so there is no separate app to open. Work or school Outlook accounts usually need a one-time approval from a Microsoft 365 admin before anyone in the organisation can connect.",
  },
  {
    q: "Do I need to bring my own AI key?",
    a: "No, and there is no option to. MiniBrief works with a built-in model from the moment you sign in. There is no key to manage, no separate AI bill, and no API key stored in your browser for anyone to extract.",
  },
  {
    q: "Does the AI train on my email?",
    a: (
      <>
        Email content is sent only to Anthropic to generate the response you
        asked for. Per Anthropic&rsquo;s API terms, inputs sent through the API
        are not used to train its models. You can review{" "}
        <a
          href="https://www.anthropic.com/legal/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent-b hover:underline"
        >
          Anthropic&rsquo;s privacy policy
        </a>{" "}
        for details.
      </>
    ),
  },
  {
    q: "When does it launch, and what will it cost?",
    a: "MiniBrief is launching soon for Chrome and Firefox. Pricing will be announced before launch — join the waitlist and you'll be the first to hear, with no other emails in between.",
  },
];

function Chevron() {
  return (
    <svg
      className="faq-chevron shrink-0 text-fg-3"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function Faq() {
  return (
    <Reveal as="section" className="relative z-[1] px-6 sm:px-12 py-14 sm:py-20 section-seam">
      <SectionOrbs placement="left" />
      <SectionHeader
        kicker="FAQ"
        title="Questions, answered straight."
        sub="The things people ask before they trust an extension with their inbox."
        className="mb-10"
      />

      <Reveal stagger as="div" className="card-glass-static max-w-[760px] mx-auto overflow-hidden">
        {FAQS.map((f) => (
          <details key={f.q} className="faq-item group">
            <summary className="faq-q flex items-center justify-between gap-4 px-6 py-5 cursor-pointer select-none">
              <span className="font-display text-[15px] sm:text-[16px] font-semibold text-white">
                {f.q}
              </span>
              <Chevron />
            </summary>
            <div className="faq-a px-6 pb-5 -mt-1 font-body text-[14px] text-fg-2 leading-[1.7] max-w-[640px]">
              {f.a}
            </div>
          </details>
        ))}
      </Reveal>
    </Reveal>
  );
}
