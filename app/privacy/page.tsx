import type { Metadata } from "next";
import { LegalShell } from "@/components/legal/legal-shell";

export const metadata: Metadata = {
  title: "Privacy Policy — MiniBrief",
  description:
    "How MiniBrief handles your data. Your email content is never stored on our servers; AI features route through a proxy that forwards without logging, and the waitlist collects only the email you submit.",
};

export default function PrivacyPage() {
  return (
    <LegalShell title="Privacy Policy" updated="July 15, 2026">
      <section>
        <p>
          MiniBrief is built so that we hold as little of your data as
          possible. This policy explains, in plain terms, exactly what is and
          is not collected. It covers two separate things: <strong>this
          website</strong> (the waitlist) and <strong>the MiniBrief browser
          extension</strong> (the product). They are deliberately kept apart.
          See also our <a href="/terms">Terms of Service</a>.
        </p>
      </section>

      <section>
        <h2>The short version</h2>
        <ul>
          <li>Your email content is never stored on our servers. AI features send a limited amount of it from your browser, through our AI proxy, to Anthropic — the proxy forwards each request without logging or keeping its contents, and nothing is ever written to our database.</li>
          <li>Using the extension requires a MiniBrief account. We store the account details needed to run the product — never the contents of your email.</li>
          <li>The extension contains no analytics, telemetry, or behavioral tracking.</li>
          <li>We do not sell, rent, or share your data for advertising. Ever.</li>
          <li>We never use your email content to train any AI model.</li>
        </ul>
      </section>

      <section>
        <h2>1. This website (the waitlist)</h2>
        <p>
          If you submit the waitlist form, we collect the email address you
          enter, the part of the page you submitted from, your browser&rsquo;s
          user-agent string, and the time of submission. We use this only to
          send you a confirmation and a single launch notification, and to
          prevent duplicate or abusive signups. Waitlist entries are stored
          with our database provider and emails are delivered through our email
          provider (see <strong>Service providers</strong>). We keep waitlist
          data until launch and a reasonable period afterward, or until you ask
          us to delete it. This site sets no advertising or analytics cookies
          and runs no third-party trackers.
        </p>
      </section>

      <section>
        <h2>2. The MiniBrief extension</h2>
        <p>
          The extension reads your inbox <strong>inside your browser</strong> to
          produce summaries, drafts, and triage. It connects to Gmail today;
          support for other providers such as Outlook is in development. Using
          the extension requires a MiniBrief account, and we operate a backend
          for that account. Your email content is never stored on that backend —
          it is handled in your browser and sent for AI processing only as
          described below.
        </p>

        <h3>Permissions we request</h3>
        <p>
          When you connect your Google account, we request only the access
          needed to run the features you use. The exact Google OAuth scopes are:
        </p>
        <ul>
          <li><strong>Read and manage your Gmail messages</strong> (<code>gmail.modify</code>) — to display your messages and generate summaries, triage, and drafts, and to carry out the inbox actions you take from the side panel: applying or removing labels, archiving, changing read/unread state, and sending the replies and forwards you approve. This one scope already covers sending, so we do <em>not</em> request the separate &ldquo;send&rdquo; or &ldquo;labels&rdquo; scopes.</li>
          <li><strong>Manage Gmail filters and read basic settings</strong> (<code>gmail.settings.basic</code>) — to create and manage filters that block unwanted senders when you unsubscribe (auto-archiving their future mail), and to read your signature for reply formatting.</li>
          <li><strong>Read your Google Calendar</strong> (<code>calendar.readonly</code>) — to build meeting prep. Read-only; we never modify your calendar.</li>
          <li><strong>Basic profile</strong> (email and profile) — to identify the mailbox you connected.</li>
        </ul>
        <p>
          You can review and revoke this access at any time at{" "}
          <a href="https://myaccount.google.com/connections" target="_blank" rel="noopener noreferrer">myaccount.google.com/connections</a>.
          When Outlook support ships, it will use the equivalent Microsoft Graph
          permissions, disclosed here before it goes live.
        </p>

        <h3>Your MiniBrief account</h3>
        <p>
          To use the extension you create an account. On our backend we store
          only the data needed to operate it: your account identifier and
          authentication details, your settings and preferences (such as your
          VIP list), and your plan or subscription status. If you start a free
          trial, we also store the phone number you verify once for that trial
          and, to prevent the same person from claiming repeated free trials, a
          normalized form of your sign-up email, of the mailbox addresses you
          connect, and of that phone number. If you enable two-factor
          authentication, its secret is held in our authentication provider&rsquo;s
          managed vault, never in our own tables. <strong>Your account never
          contains the contents of your emails, their subject lines, preview
          snippets, or any AI request.</strong>
        </p>

        <h3>Account security</h3>
        <ul>
          <li><strong>Email verification is required.</strong> You cannot activate an account until you confirm your email address.</li>
          <li><strong>Two-factor authentication (2FA) is optional.</strong> You can turn on TOTP-based 2FA in Settings; once enabled, it is enforced on our backend, not just in the interface.</li>
          <li><strong>Phone verification is a one-time anti-abuse step.</strong> It is required only to start a free trial — not to create or hold an account — and it is separate from 2FA.</li>
        </ul>

        <h3>What is sent for AI processing</h3>
        <p>
          To generate AI output, a limited amount of content is sent from your
          browser to Anthropic <strong>through our AI proxy</strong> — a
          server-side function whose only job is to attach our Anthropic
          credentials and forward the request, so no API key is ever shipped in
          the extension or exposed to your browser. The proxy does not log or
          store the contents of these requests; it keeps only an anonymous
          per-account count of how many calls you have made, for rate-limiting
          and billing. How much is sent depends on the feature:
        </p>
        <ul>
          <li><strong>Triage, classification, briefings, executive report, and VIP:</strong> the subject line and a short preview snippet only (about 120 characters). No message bodies.</li>
          <li><strong>Meeting prep:</strong> details of the calendar event you are preparing for — the event title, description (up to 500 characters), location, and the attendee names and email addresses — from your connected Google Calendar. This is calendar data, not email content, and it is not stored.</li>
          <li><strong>Reply drafting:</strong> the body of the email you are replying to (so the draft can actually respond to it), plus any notes you have written on that thread or on that contact. This runs when you ask for a draft.</li>
          <li><strong>Summaries and AI Brief:</strong> the cleaned body of the message being summarized — the body is the input the feature works on.</li>
          <li><strong>Commitments and open questions:</strong> when you open an email, MiniBrief automatically scans the latest message body — with quoted replies and signatures stripped out — to surface promises you or the other party made and questions still awaiting an answer.</li>
          <li><strong>Tone check:</strong> the draft text you wrote and asked us to check.</li>
        </ul>
        <p>
          Two additional features read message bodies and are <strong>off by
          default</strong> — they run only if you turn them on in Settings, where
          each discloses what it sends:
        </p>
        <ul>
          <li><strong>&ldquo;Deeper reasons&rdquo;</strong> — lets MiniBrief read a relevant message body in the background, without you opening the email, to explain why it needs your attention.</li>
          <li><strong>&ldquo;Match my writing voice&rdquo;</strong> — samples the body of <em>your own</em> sent emails so the AI can learn and mirror your writing style.</li>
        </ul>
        <p>
          Forwarding an email is <strong>not</strong> an AI feature: forwards go
          straight through the Gmail API and send nothing to Anthropic.
        </p>
        <p>
          Content sent for AI processing is used solely to generate the response
          you requested. The proxy does not retain it and our database never
          stores it. We do not use your email content — or any Google user data —
          to train, develop, or improve any AI or machine-learning model, and
          Anthropic does not use data submitted through its API to train its
          models. Anthropic processes the request under its own terms; we
          encourage you to review{" "}
          <a href="https://www.anthropic.com/legal/privacy" target="_blank" rel="noopener noreferrer">Anthropic&rsquo;s privacy policy</a>.
        </p>

        <h3>What stays on your device</h3>
        <p>
          Email parsing and AI prompts are built in your browser. Some features —
          such as your productivity and ROI history — read only message{" "}
          <em>metadata</em> (subject, sender, preview snippet, date, and labels,
          never full message bodies), classify it on your device, and cache it in
          your browser&rsquo;s local extension storage for roughly half a day.
          That metadata is never sent to our AI proxy or any third party. Any
          other local cache also stays in your browser&rsquo;s local extension
          storage. Uninstalling the extension removes this local data; account
          data on our backend persists until you ask us to delete it.
        </p>
      </section>

      <section>
        <h2>3. Google API Services User Data Policy (Limited Use)</h2>
        <p>
          MiniBrief&rsquo;s use of information received from Google APIs adheres
          to the{" "}
          <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer">Google API Services User Data Policy</a>,
          including the Limited Use requirements. In particular, MiniBrief:
        </p>
        <ul>
          <li>limits its use of Google user data to providing or improving the user-facing features described in this policy;</li>
          <li>does not transfer Google user data to others except as necessary to provide or improve those features, to comply with applicable law, or as part of a merger or acquisition with notice to users;</li>
          <li>does not use or transfer Google user data for advertising, including personalized or interest-based advertising;</li>
          <li>does not use Google user data to train generalized or non-personalized AI or machine-learning models, and does not transfer it for that purpose; and</li>
          <li>does not allow humans to read Google user data unless we have your affirmative consent to read specific messages, it is necessary for security or to comply with law, or the data has been aggregated and anonymized.</li>
        </ul>
      </section>

      <section>
        <h2>4. Service providers</h2>
        <p>We rely on a small number of third parties, each for a narrow purpose:</p>
        <ul>
          <li><strong>Anthropic</strong> — processes the limited email content described above to generate AI results (<a href="https://www.anthropic.com/legal/privacy" target="_blank" rel="noopener noreferrer">privacy policy</a>).</li>
          <li><strong>Supabase</strong> — our application backend; stores your account, settings, and subscription status, and runs the AI proxy. It never stores your email content (<a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer">privacy policy</a>).</li>
          <li><strong>Resend</strong> — delivers waitlist confirmation and launch emails (<a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">privacy policy</a>).</li>
          <li><strong>Stripe</strong> — processes subscription payments. We never receive or store your full card number (<a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer">privacy policy</a>).</li>
          <li><strong>Our hosting provider</strong> — serves this website and may process standard server request logs for security and reliability.</li>
        </ul>
      </section>

      <section>
        <h2>5. How we protect your data</h2>
        <p>
          We treat the email and calendar data you access through Google as{" "}
          <strong>sensitive data</strong> and protect it with layered,
          industry-standard safeguards:
        </p>
        <ul>
          <li>
            <strong>Encryption in transit.</strong> All data moving between the
            extension, our backend, the Google APIs, and our AI provider travels
            over encrypted connections (HTTPS/TLS). Nothing is transmitted in
            cleartext.
          </li>
          <li>
            <strong>Encryption at rest.</strong> The limited account data we do
            store — your account identifier, authentication details, settings,
            subscription status, and trial-verification data — is held in a
            managed database that encrypts data at rest using industry-standard
            AES-256 encryption. Your email content, subjects, and snippets are
            never stored on our servers at all.
          </li>
          <li>
            <strong>Data minimization.</strong> By design, the contents of your
            messages and calendar events stay in your browser. Only the minimum
            each feature needs ever leaves your device — a subject line and a
            short preview snippet for triage and briefings, or, for features that
            work on a full message (summaries, reply drafts, and the automatic
            commitment and open-question scan when you open an email), the body of
            that one message. The two body-reading features noted above are off by
            default and run only if you enable them.
          </li>
          <li>
            <strong>Authenticated, least-privilege access.</strong> Requests to
            our backend and AI proxy require your authenticated account token,
            which the server verifies before processing, and are rate-limited per
            user. Our database restricts each account to its own records, and
            billing and subscription status can be written only by verified
            server-side processes — never by the browser.
          </li>
          <li>
            <strong>Secret management.</strong> API keys and other secrets,
            including our Anthropic credentials, are stored only in server-side
            secret storage and are never shipped in the extension or exposed to
            your browser.
          </li>
          <li>
            <strong>Restricted human access.</strong> We do not allow our staff
            to read your Google user data except in the limited circumstances
            described in the Limited Use section above (for example, with your
            affirmative consent, where necessary for security, or to comply with
            applicable law).
          </li>
          <li>
            <strong>On-device protection.</strong> Any local cache lives in your
            browser&rsquo;s sandboxed extension storage, isolated from websites
            and other extensions. You can clear it at any time by disconnecting
            the mailbox or uninstalling the extension.
          </li>
        </ul>
      </section>

      <section>
        <h2>6. Your choices and rights</h2>
        <ul>
          <li>You can ask us to access or delete your waitlist data or account data at any time by emailing <a href="mailto:privacy@minibrief.app">privacy@minibrief.app</a>.</li>
          <li>You can uninstall the extension, which removes its local data from your browser; contact us to delete the account itself.</li>
          <li>Depending on where you live (for example, under GDPR or CCPA), you may have additional rights to access, correct, or delete personal data. Contact us and we will honor applicable requests.</li>
        </ul>
        <p>
          When you ask us to delete your account, we remove the associated data
          within 30 days, except where we are legally required to retain it.
        </p>
      </section>

      <section>
        <h2>7. Children</h2>
        <p>
          MiniBrief is intended for working professionals and is not directed
          to children. We do not knowingly collect data from anyone under 16.
        </p>
      </section>

      <section>
        <h2>8. Changes</h2>
        <p>
          We may update this policy as the product evolves. If we change how we
          use Google user data in a materially different way than disclosed here,
          we will notify you and, where required, ask for your consent before the
          new use takes effect. Material changes are reflected by the
          &ldquo;Last updated&rdquo; date above.
        </p>
        <p>
          Questions? Email{" "}
          <a href="mailto:privacy@minibrief.app">privacy@minibrief.app</a>.
        </p>
      </section>
    </LegalShell>
  );
}
