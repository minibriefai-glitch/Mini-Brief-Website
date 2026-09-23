import { ArrowDown, ArrowUpRight } from "lucide-react";
import { privacy } from "@/content/home";
import { Container } from "./section";

export function Privacy() {
  return (
    <section
      id={privacy.id}
      aria-labelledby="privacy-heading"
      className="relative scroll-mt-24 border-y border-white/[0.08] bg-[#0B1121] py-20 text-white md:py-28 lg:py-32"
    >
      <Container>
        <div className="grid items-start gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#a4b8ff]">
              {privacy.eyebrow}
            </p>
            <h2
              id="privacy-heading"
              className="mt-6 max-w-lg text-[clamp(2.35rem,4.5vw,4.25rem)] font-semibold leading-[1.05] tracking-[-0.045em]"
            >
              Your email.
              <br />
              <span className="text-[#a7b0c4]">A smaller footprint.</span>
            </h2>
            <p className="mt-7 max-w-md text-base leading-relaxed text-[#a7b0c4] md:text-lg">
              Our server reads the mailboxes you connect to prepare your brief.
              It keeps a rolling 90 days of metadata. Message bodies are never
              stored on our servers.
            </p>

            <dl className="mt-10 max-w-md divide-y divide-white/10 border-y border-white/10">
              <div className="py-6">
                <dt className="text-sm font-medium text-white">
                  No invisible audience.
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-[#a7b0c4]">
                  {privacy.lines[2]}
                </dd>
              </div>
              <div className="py-6">
                <dt className="text-sm font-medium text-white">
                  Disconnect means delete.
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-[#a7b0c4]">
                  {privacy.lines[3]}
                </dd>
              </div>
            </dl>

            <a
              href={privacy.link.href}
              className="group mt-7 inline-flex min-h-11 items-center gap-3 rounded-sm text-sm font-medium text-[#a4b8ff] underline decoration-[#a4b8ff]/30 underline-offset-8 transition-colors hover:text-white hover:decoration-white/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a4b8ff] motion-reduce:transition-none"
            >
              {privacy.link.label}
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none"
              />
            </a>
          </div>

          <figure className="min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-[#0F172B] shadow-[0_24px_70px_-32px_rgba(0,0,0,0.5)]">
            <figcaption className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.08] px-5 py-4 sm:px-7">
              <span className="text-xs font-medium text-white">
                Your data, step by step
              </span>
              <span className="text-[10px] uppercase tracking-[0.12em] text-[#8f9bb3]">
                Mail + AI processing
              </span>
            </figcaption>

            <ol className="px-5 pb-6 pt-6 sm:px-7 sm:pb-7">
              <li>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-white">
                      Your connected mailboxes
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-[#a7b0c4]">
                      Only the Gmail and Outlook accounts you connect.
                    </p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="pt-0.5 text-[10px] tabular-nums text-[#8f9bb3]"
                  >
                    01
                  </span>
                </div>
                <div
                  aria-hidden="true"
                  className="my-4 flex items-center gap-3 text-[#7282a7]"
                >
                  <ArrowDown className="size-4" />
                  <span className="h-px flex-1 bg-white/[0.08]" />
                </div>
              </li>

              <li>
                <div className="mb-4 flex items-center justify-between gap-4">
                  <h3 className="text-sm font-medium text-white">
                    Read by the MiniBrief server
                  </h3>
                  <span
                    aria-hidden="true"
                    className="text-[10px] tabular-nums text-[#8f9bb3]"
                  >
                    02
                  </span>
                </div>
                <dl className="grid overflow-hidden rounded-xl border border-white/10 bg-[#0B1224] sm:grid-cols-2">
                  <div className="border-b border-white/10 p-5 sm:border-b-0 sm:border-r">
                    <dt className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#a7b0c4]">
                      Metadata
                    </dt>
                    <dd>
                      <p className="mt-3 text-[28px] font-medium leading-none tracking-[-0.04em] text-[#a4b8ff]">
                        90 days
                      </p>
                      <p className="mt-2 text-xs font-medium text-white">
                        Rolling retention
                      </p>
                      <p className="mt-3 text-xs leading-relaxed text-[#a7b0c4]">
                        Subjects, senders, previews, dates and what MiniBrief
                        worked out about each message.
                      </p>
                    </dd>
                  </div>
                  <div className="p-5">
                    <dt className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#a7b0c4]">
                      Message bodies
                    </dt>
                    <dd>
                      <p className="mt-3 text-[28px] font-medium leading-none tracking-[-0.04em] text-white">
                        Not stored
                      </p>
                      <p className="mt-2 text-xs font-medium text-white">
                        Fetched when you open
                      </p>
                      <p className="mt-3 text-xs leading-relaxed text-[#a7b0c4]">
                        A message body is fetched from your mailbox when you
                        open it, and is not kept on our servers.
                      </p>
                    </dd>
                  </div>
                </dl>
                <div
                  aria-hidden="true"
                  className="my-4 flex items-center gap-3 text-[#7282a7]"
                >
                  <ArrowDown className="size-4" />
                  <span className="h-px flex-1 bg-white/[0.08]" />
                </div>
              </li>

              <li>
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-sm font-medium text-white">
                    AI requests go to Anthropic
                  </h3>
                  <span
                    aria-hidden="true"
                    className="text-[10px] tabular-nums text-[#8f9bb3]"
                  >
                    03
                  </span>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-[#a7b0c4]">
                  Sorting sends a subject and about 120 preview characters. Full
                  message text is sent only for features you use on a message
                  you opened, capped in length.
                </p>
                <p className="mt-4 border-l-2 border-[#a4b8ff]/50 pl-3 text-xs leading-relaxed text-[#c5cde0]">
                  One named provider. Neither AI requests nor responses are
                  logged or stored. Anthropic&apos;s terms forbid training on
                  your data.
                </p>
              </li>
            </ol>
          </figure>
        </div>
      </Container>
    </section>
  );
}
