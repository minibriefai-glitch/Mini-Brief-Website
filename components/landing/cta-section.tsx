import { buttonVariants } from "@/components/ui/button";
import { cta } from "@/content/home";
import { cn } from "@/lib/utils";
import { Section } from "./section";
import { SectionHeader } from "./section-header";

export function CtaSection() {
  return (
    <Section>
      <div className="rounded-xl border border-brand-muted/50 bg-white px-6 py-12 text-center md:py-16">
        <SectionHeader title={cta.h2} align="center" />
        <p className="mx-auto mt-4 max-w-prose text-lg text-brand-muted-text">{cta.body}</p>
        <a href={cta.primary.href} className={cn(buttonVariants({ variant: "primary", size: "lg" }), "mt-8")}>
          {cta.primary.label}
        </a>
      </div>
    </Section>
  );
}
