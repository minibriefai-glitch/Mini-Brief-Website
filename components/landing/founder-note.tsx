import { Reveal } from "@/components/effects/reveal-on-scroll";
import { SectionHeader } from "./section-header";

export function FounderNote() {
  return (
    <Reveal as="section" variant="up" className="relative z-[1] px-6 sm:px-12 py-14 sm:py-20 section-seam">
      <SectionHeader
        kicker="Why we built it"
        title="A note from the founder."
        className="mb-10"
      />

      <div className="card-glass-static max-w-[720px] mx-auto backdrop-blur-md shadow-[0_20px_56px_rgba(0,0,0,0.38)] p-7 sm:p-10">
        <blockquote className="font-body text-[15px] sm:text-[16px] text-fg-2 leading-[1.8] space-y-4">
          <p>I built Mini Brief because my inbox was beating me.</p>
          <p>
            Hundreds of unread emails, no structure, no idea what actually needed a
            reply. Newsletters, promos, and junk piling up until the one email that
            mattered was buried three pages down, and some days I&rsquo;d miss it
            completely. Threads twenty messages deep that I had to read top to bottom
            just to find the one question hiding inside. Every time I needed something,
            I was searching, scrolling, and hoping.
          </p>
          <p>I didn&rsquo;t want a prettier inbox. I wanted my day back.</p>
          <p>
            So I built the thing I needed. Mini Brief reads your inbox, clears the
            newsletters and noise away from what actually matters, pulls the answer out
            of long chains, and drafts the reply in your own voice, right inside Gmail
            and Outlook.
          </p>
          <p>
            What used to eat your morning now takes minutes. Nothing important slips
            through, and you get a whole lot more of your day back.
          </p>
        </blockquote>

        <div className="flex items-center gap-4 mt-7 pt-6 border-t border-white/[0.06]">
          <div
            aria-hidden="true"
            className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border border-accent-border bg-accent-dim font-display text-[16px] font-bold tracking-[-0.01em] text-accent-b"
          >
            MM
          </div>
          <div>
            <div className="font-display text-[15px] font-semibold text-white">Michael Mancuso</div>
            <div className="font-body text-[13px] text-fg-3">Founder, Mini Brief</div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
