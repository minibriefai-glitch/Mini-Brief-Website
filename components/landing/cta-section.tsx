import { buttonVariants } from "@/components/ui/button";
import { cta } from "@/content/home";
import { cn } from "@/lib/utils";
import { Section } from "./section";

export function CtaSection() {
  return (
    <Section>
      <div className="relative overflow-hidden rounded-3xl bg-brand-ink px-6 py-16 text-center text-white md:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_70%_at_50%_100%,rgba(58,95,220,0.35),transparent_70%)]"
        />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-[-0.02em] md:text-5xl md:leading-[1.08]">{cta.h2}</h2>
          <p className="mx-auto mt-5 max-w-prose text-lg leading-relaxed text-white/75 md:text-xl">{cta.body}</p>
          <a href={cta.primary.href} className={cn(buttonVariants({ variant: "primary", size: "lg" }), "mt-9 focus-visible:outline-white")}>
            {cta.primary.label}
          </a>
        </div>
      </div>
    </Section>
  );
}
