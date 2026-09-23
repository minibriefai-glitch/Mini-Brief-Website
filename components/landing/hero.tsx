import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { hero } from "@/content/home";
import { Container } from "./section";
import { InteractiveDemo } from "./interactive-demo";

export function Hero() {
  return (
    <section className="landing-hero relative isolate overflow-hidden pb-4 pt-12 sm:pt-16 lg:pt-24">
      <div
        aria-hidden="true"
        className="landing-hero-grid pointer-events-none absolute inset-0 -z-10"
      />
      <Container>
        <div className="grid items-end gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
          <div className="landing-enter">
            <p className="flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#a4b8ff]">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-[#a4b8ff]"
              />{" "}
              Your inbox, reimagined
              <span className="ml-1 rounded border border-white/15 px-1.5 py-0.5 text-[9px] tracking-[0.12em] text-[#b4bdd1]">
                BETA
              </span>
            </p>
            <h1 className="mt-7 text-[clamp(2.25rem,7vw,6rem)] font-medium leading-[1.02] tracking-[-0.065em] text-[#f4f6ff]">
              {hero.h1}
              <br />
              <span className="text-[#a4b8ff]">{hero.accent}</span>
            </h1>
          </div>
          <div className="landing-enter max-w-md pb-1 lg:pb-2">
            <p className="text-lg leading-[1.7] text-[#b4bdd1]">{hero.sub}</p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href={hero.primary.href}
                className="landing-action inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-[#b5c5ff] px-5 text-sm font-semibold text-[#0a1230] hover:bg-[#cbd6ff]"
              >
                {hero.primary.label}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={hero.secondary.href}
                className="group inline-flex min-h-12 items-center gap-2 rounded-xl px-2 text-sm font-medium text-white hover:text-[#a4b8ff]"
              >
                Explore the demo
                <ArrowDown
                  className="h-4 w-4 transition-transform group-hover:translate-y-0.5 motion-reduce:transform-none"
                  aria-hidden="true"
                />
              </a>
            </div>
            <p className="mt-5 flex items-center gap-2 text-xs text-[#99a5bd]">
              <Check
                className="h-3.5 w-3.5 text-[#a4b8ff]"
                aria-hidden="true"
              />{" "}
              Free trial. No separate AI bill.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t border-white/10 pt-5 text-xs text-[#b4bdd1] lg:mt-12">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <span className="text-[10px] uppercase tracking-[0.15em] text-[#8b98b2]">
              Made for your inboxes
            </span>
            <span className="inline-flex items-center gap-2 font-medium text-[#e1e6f4]">
              <Mail className="h-4 w-4 text-[#a4b8ff]" aria-hidden="true" />
              Gmail
            </span>
            <span className="inline-flex items-center gap-2 font-medium text-[#e1e6f4]">
              <span
                aria-hidden="true"
                className="grid h-3.5 w-3.5 grid-cols-2 gap-0.5"
              >
                <i className="bg-[#a4b8ff]" />
                <i className="bg-[#a4b8ff]/70" />
                <i className="bg-[#a4b8ff]/70" />
                <i className="bg-[#a4b8ff]" />
              </span>
              Outlook
            </span>
          </div>
          <a
            href="#privacy"
            className="inline-flex min-h-8 items-center gap-2 rounded text-[#b4bdd1] hover:text-white"
          >
            <ShieldCheck
              className="h-4 w-4 text-[#a4b8ff]"
              aria-hidden="true"
            />
            Message bodies are not stored on our servers.
          </a>
        </div>

        <div className="landing-demo-stage relative mt-9 rounded-[24px] border border-white/[0.12] bg-white/[0.035] p-2.5 shadow-[0_32px_100px_-32px_rgba(0,0,0,0.65)] sm:p-4">
          <div className="flex flex-wrap items-center justify-between gap-2 px-1 pb-3 pt-0.5 text-[10px] uppercase tracking-[0.16em] text-[#a4afc5] sm:px-2 sm:pb-4 sm:pt-1">
            <span className="inline-flex items-center gap-2">
              <span
                className="h-1.5 w-1.5 rounded-full bg-[#a4b8ff]"
                aria-hidden="true"
              />
              A little clarity. Try it for yourself.
            </span>
            <span className="text-[#b9c5e0]">No sign-up needed</span>
          </div>
          <InteractiveDemo />
        </div>
      </Container>
    </section>
  );
}
