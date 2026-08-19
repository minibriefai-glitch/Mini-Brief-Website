import type { Metadata } from "next";
import { LegalShell } from "@/components/legal/legal-shell";

export const metadata: Metadata = {
  title: "Security & Trust — MiniBrief",
  description:
    "Exactly what MiniBrief sends, stores, and cannot see. Written for IT and security reviewers: data flow per feature, named subprocessors with DPA status, breach notification windows, and what we do not have yet.",
};

/**
 * Trust page. Every factual claim here must match casa/02-data-flow-restricted-scopes.md
 * and casa/09-subprocessors.md in the extension repo. Those documents are the source of
 * truth and are what an assessor reads. If a data flow changes, this page changes in the
 * same pass, or the packet and the public claim disagree.
 */
export default function SecurityPage() {
  return (
    <LegalShell title="Security &amp; Trust" updated="August 5, 2026">
      <section>
        <p>
          If you are evaluating MiniBrief for your company, this page is written
          for you. It is not a summary of our intentions. It is the specific,
          checkable detail an IT or security reviewer needs: what leaves the
          device for each feature, who processes it, what we keep, and what we
          do not have yet.
        </p>
        <p>
          The design principle is that the safest data is the data nobody keeps.
          Your mail is read and sorted inside your browser. Our database is
          built so that it structurally cannot hold email content. Where content
          does leave the device, we say so here, feature by feature, including
          the cases that are less flattering to us.
        </p>
      </section>

      <section>
        <h2>The short version</h2>
        <ul>
          <li><strong>Sorting your inbox sends a subject line and about 120 characters.</strong> That is the default path, and it has no message-body field at all.</li>
          <li><strong>Full message bodies leave only for features that need them</strong>, listed individually below. Two of those run automatically when you open an email. Two more are off by default and only run if you switch them on.</li>
          <li><strong>Our database holds no email content.</strong> No bodies, no subjects, no previews, no AI payloads. This is enforced in the database schema itself, not by policy.</li>
          <li><strong>Nothing you send through us is logged or retained.</strong> The AI proxy forwards the request and keeps no copy of it.</li>
          <li><strong>Your email is never used to train AI models</strong>, by us or by our AI provider.</li>
          <li><strong>No analytics, telemetry, or behavioural tracking in the extension.</strong> No third-party tracking SDKs of any kind.</li>
          <li><strong>We never request permanent deletion of your mail.</strong> The strongest destructive action available to MiniBrief is moving a message to Trash, where you can recover it.</li>
        </ul>
      </section>

      <section>
        <h2>Independent assessment</h2>
        <p>
          Two things matter more than anything we say about ourselves here.
        </p>
        <p>
          <strong>Google OAuth verification is in progress.</strong> Because
          MiniBrief requests restricted Gmail scopes, Google requires an
          independent security assessment under the Cloud Application Security
          Assessment (CASA) framework, carried out by an accredited third-party
          lab rather than by us. Our application is at that assessment stage
          now. Until it completes we are candid about the status rather than
          implying more than is true, and this page will be updated when the
          Letter of Validation is issued.
        </p>
        <p>
          <strong>Microsoft publisher verification is complete.</strong> Our
          Microsoft application registration has been through Microsoft&rsquo;s
          publisher verification, which is what allows your administrator to see
          a named, verified publisher rather than an unknown developer on the
          consent screen.
        </p>
        <p>
          On Microsoft 365, connecting MiniBrief typically requires a one-time
          approval from your administrator. That is a Microsoft tenant policy
          covering the mail and calendar permissions we request, not something
          we can or would want to route around.
        </p>
      </section>

      <section>
        <h2>Exactly what leaves your device</h2>
        <p>
          This is the table security reviewers actually want, and it is the same
          one we hand to assessors. It is kept exhaustive by convention: adding a
          path that sends message content without listing it here is treated as
          a defect in our codebase, not as an oversight.
        </p>

        <div className="legal-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Feature</th>
                <th>What is sent</th>
                <th>When</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Inbox triage, importance, briefing, executive report</td>
                <td>Subject and a preview of about 120 characters. No body field exists on this path.</td>
                <td>Automatic</td>
              </tr>
              <tr>
                <td>Reply drafting, chase drafting</td>
                <td>Up to 4,000 characters of the message body, plus any notes you wrote yourself.</td>
                <td>When you click</td>
              </tr>
              <tr>
                <td>Summaries and the AI brief</td>
                <td>Up to 3,000 to 4,000 characters of the thread you are reading.</td>
                <td>When you open a message</td>
              </tr>
              <tr>
                <td>Thread chat</td>
                <td>The same thread text the brief already sent. No new data, no search, no access to any other thread.</td>
                <td>When you open the panel</td>
              </tr>
              <tr>
                <td>Commitment and open-question extraction</td>
                <td>Up to 3,000 characters of one thread message, with quoted replies and signatures stripped first.</td>
                <td><strong>Automatic when you open an email</strong></td>
              </tr>
              <tr>
                <td>Meeting prep</td>
                <td><strong>Calendar data, not mail:</strong> event title, description up to 500 characters, location, and the attendee names and email addresses.</td>
                <td>When you request prep</td>
              </tr>
              <tr>
                <td>&ldquo;Deeper reasons&rdquo;</td>
                <td>Up to 3,000 characters each from up to ten action-needed emails, <strong>without you opening them</strong>.</td>
                <td><strong>Off by default.</strong> Only if you turn it on</td>
              </tr>
              <tr>
                <td>&ldquo;Match my writing voice&rdquo;</td>
                <td>Up to 800 characters per sample from up to 15 of <strong>your own sent</strong> emails.</td>
                <td><strong>Off by default.</strong> Only if you turn it on</td>
              </tr>
              <tr>
                <td>Compose, tone check, search</td>
                <td>Only text you typed yourself.</td>
                <td>When you click</td>
              </tr>
              <tr>
                <td>Forwarding an email</td>
                <td><strong>Nothing goes to the AI.</strong> The message is delivered directly through Gmail or Outlook.</td>
                <td>Never</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          Two rows above deserve to be called out rather than buried, because
          they are the ones a careful reviewer would otherwise find themselves:
          commitment extraction runs <strong>automatically</strong> when you open
          an email, and is not something you switch on. And &ldquo;deeper
          reasons&rdquo;, if you enable it, reads message bodies for emails you
          have <strong>not</strong> opened. Both are listed with the same
          prominence as everything else on purpose.
        </p>
        <p>
          Outlook works identically. Where a row says &ldquo;body&rdquo;, the
          Outlook version is fetched through Microsoft Graph instead of the Gmail
          API, through the same proxy, with the same limits and the same
          not-logged, not-retained boundary. Connecting Outlook adds no new
          category of data. No Google data is ever sent to Microsoft, and no
          Microsoft data is ever sent to Google.
        </p>
      </section>

      <section>
        <h2>The path that content takes</h2>
        <ul>
          <li><strong>1. In your browser.</strong> The extension reads messages from the Gmail or Outlook session you are already signed in to. Parsing and the first sorting pass happen on your device and go no further.</li>
          <li><strong>2. Through our proxy.</strong> Only the content listed above leaves, over an encrypted connection, to a small service we run. It exists so that our AI key never sits inside the extension where it could be extracted. The proxy verifies your session, checks your subscription, and enforces a rate limit. It does not log or store request bodies.</li>
          <li><strong>3. On to Anthropic.</strong> The request is forwarded and the answer returned. Anthropic processes it as a data processor under commercial terms that prohibit training on it.</li>
          <li><strong>4. Back to you.</strong> The result is displayed in MiniBrief. Nothing about the request is written to our database.</li>
        </ul>
        <p>
          We are deliberate about the wording here. Your email content does pass{" "}
          <em>through</em> our proxy in transit. What it never does is come to
          rest there.
        </p>
      </section>

      <section>
        <h2>What we can and cannot see</h2>
        <p>
          <strong>We cannot see</strong> the contents of your emails, your
          subjects, your previews, your attachments, who you correspond with, or
          what you read. AI requests are forwarded without logging, so their
          contents are not readable by us and are not kept anywhere afterwards.
        </p>
        <p>
          <strong>We can see</strong> your account identifier and authentication
          details, your subscription status, and the phone number used once to
          verify a free trial.
        </p>
        <p>
          <strong>One thing we do record, stated plainly because a precise page
          should not round in its own favour:</strong> for each AI call we store
          which feature ran, which model answered, how many tokens it used, and
          when. That is how we measure cost and catch abuse. It contains no
          email content of any kind, and the table enforcing that is locked so
          that no browser client can read or write it. But it does mean we can
          tell that an account drafted replies on a given day, and it would be
          overclaiming to say we have no usage data at all.
        </p>
      </section>

      <section>
        <h2>Where data is stored</h2>
        <p>
          Our database holds only what is needed to run an account: identity and
          authentication, subscription status, the phone number used for one-time
          trial verification, anti-abuse identifiers, and content-free counters.
        </p>
        <p>
          <strong>Email content never reaches it.</strong> That is not a policy
          we apply carefully, it is a rule written into the database schema
          itself, and it is load-bearing for a second reason worth stating: our
          infrastructure provider has its own chain of sub-processors. Because
          no message content is ever written to the database, there is nothing of
          that kind for any of them to receive. Anthropic remains the only
          processor that ever handles content derived from your mailbox.
        </p>
        <p>
          Everything else lives on your own machine, in your browser&rsquo;s
          local storage. Mailbox-derived data is deliberately never placed in
          browser sync storage, which would replicate it off your device through
          your browser profile. Uninstalling the extension removes it.
        </p>
      </section>

      <section>
        <h2>Access and permissions</h2>
        <p>
          MiniBrief uses standard OAuth and requests the minimum scopes the
          product needs. Some specifics that reviewers ask about:
        </p>
        <ul>
          <li><strong>We do not request full mailbox access.</strong> On Google we use the modify scope rather than the broader one, which means we can read, label, archive and send, but <strong>cannot permanently delete</strong>. The strongest destructive action available to us is moving a message to Trash.</li>
          <li><strong>Calendar access is read-only.</strong></li>
          <li><strong>Microsoft scopes were trimmed</strong> to least privilege in version 4.0.3, dropping two that were redundant or unused.</li>
          <li><strong>Both flows use PKCE and a verified state parameter</strong> before any authorization code is exchanged.</li>
          <li>You can review and revoke access at any time, for Google at{" "}
            <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer">myaccount.google.com/permissions</a>{" "}
            and for Microsoft in your account settings.</li>
        </ul>
      </section>

      <section>
        <h2>Account security</h2>
        <ul>
          <li><strong>Two-factor authentication is available</strong> using standard authenticator apps, and can be enabled from Settings.</li>
          <li><strong>It is enforced on the server, not just in the interface.</strong> Once your account has a verified second factor, a session that has not completed it is rejected by our backend outright. Turning on 2FA cannot be bypassed by calling our API directly.</li>
          <li><strong>Email confirmation is mandatory.</strong> No session is issued until the address is confirmed.</li>
          <li>Connections are encrypted in transit with TLS. Account data is encrypted at rest by our infrastructure providers.</li>
        </ul>
      </section>

      <section>
        <h2>Subprocessors</h2>
        <p>
          A short list, each doing one narrow thing. Only one of them ever
          receives content derived from your mailbox.
        </p>

        <div className="legal-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Provider</th>
                <th>Purpose</th>
                <th>Receives mailbox content?</th>
                <th>Data processing agreement</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Anthropic</strong></td>
                <td>AI processing for the features listed above</td>
                <td><strong>Yes.</strong> The only one.</td>
                <td>In force through commercial terms, with standard contractual clauses included</td>
              </tr>
              <tr>
                <td><strong>Supabase</strong></td>
                <td>Database, authentication, backend hosting</td>
                <td>No. Structurally cannot.</td>
                <td>Executed July 2026</td>
              </tr>
              <tr>
                <td><strong>Stripe</strong></td>
                <td>Payments, on Stripe-hosted pages</td>
                <td>No</td>
                <td>In force. PCI-DSS Level 1</td>
              </tr>
              <tr>
                <td><strong>Resend</strong></td>
                <td>Account and sign-up confirmation email</td>
                <td>No</td>
                <td>In force. EU-U.S. Data Privacy Framework certified</td>
              </tr>
              <tr>
                <td><strong>Vercel</strong></td>
                <td>Hosting for this website only</td>
                <td>No. No application data.</td>
                <td>In force</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          Google and Microsoft are the <em>sources</em> of your mailbox data, at
          your direction. They are not our subprocessors.
        </p>
        <p>
          One honest note on Stripe: for payments it acts both as our processor
          and, for fraud screening and regulatory obligations, as an independent
          controller setting its own purposes. That is inherent to regulated
          payments rather than a gap. If you ask whether every subprocessor is
          purely a processor, the accurate answer is no, and Stripe is the
          exception.
        </p>
        <p>
          We never receive or store card numbers. Checkout is hosted by Stripe.
        </p>
      </section>

      <section>
        <h2>Incident response</h2>
        <p>
          Our providers are contractually bound to notify us of a personal data
          breach. The windows are not uniform, and we would rather give you the
          real numbers than round them to a single reassuring figure:
        </p>
        <ul>
          <li><strong>Anthropic:</strong> within 48 hours of becoming aware.</li>
          <li><strong>Supabase:</strong> within 48 hours where feasible.</li>
          <li><strong>Stripe:</strong> within 48 hours for data covered by GDPR and UK GDPR.</li>
          <li><strong>Resend:</strong> without undue delay, with no fixed hour specified. This is the weakest of the four and we would rather say so than imply otherwise.</li>
        </ul>
      </section>

      <section>
        <h2>Deleting your data</h2>
        <p>
          You can delete your account from within the product. Doing so removes
          your account record and everything linked to it, including usage
          counters, by database-level cascade rather than by a cleanup routine
          that might miss something. Disconnecting a mailbox clears its cached
          data from your browser. Uninstalling the extension removes local data
          from your device.
        </p>
      </section>

      <section>
        <h2>What we do not have yet</h2>
        <p>
          Most vendor security pages list only what they have. Here is the rest,
          because you will ask and because finding out later is worse:
        </p>
        <ul>
          <li><strong>No SOC 2 report.</strong> We are a small company and have not been through a SOC 2 audit. The independent assessment we are completing is Google&rsquo;s CASA, which is scoped to how we handle mailbox data specifically. If SOC 2 is a hard requirement for your organisation, we are not there yet.</li>
          <li><strong>No penetration test report of our own to share yet.</strong> Our infrastructure providers conduct and share theirs.</li>
          <li><strong>No zero-retention arrangement with our AI provider yet.</strong> Contractual terms already prohibit training on your data and limit processing to delivering the feature you asked for. A formal zero-retention agreement is a stronger, separate arrangement we have not completed.</li>
        </ul>
        <p>
          If any of these is a blocker for your organisation, tell us. Knowing
          which requirement stopped you is genuinely more useful to us than a
          polite no.
        </p>
      </section>

      <section>
        <h2>Questions, and reporting a vulnerability</h2>
        <p>
          Security questionnaires, architecture questions, and requests for our
          subprocessor documentation go to{" "}
          <a href="mailto:security@minibrief.app">security@minibrief.app</a>. A
          real person answers.
        </p>
        <p>
          If you believe you have found a security issue, email the same address
          with enough detail to reproduce it. We ask that you give us a
          reasonable opportunity to investigate and fix it before any public
          disclosure, and that you avoid accessing or modifying other
          people&rsquo;s data. We will acknowledge your report and keep you
          updated.
        </p>
        <p>
          This page complements our <a href="/privacy">Privacy Policy</a>, which
          is the controlling legal document.
        </p>
      </section>
    </LegalShell>
  );
}
