import { buttonVariants } from "@/components/ui/button";
import { hero } from "@/content/home";
import { TextLink } from "./link";
import { Section } from "./section";
import { Eyebrow } from "./section-header";
import { Shot } from "./shot";

export function Hero() {
  return (
    <Section>
      <div className="max-w-3xl">
        <Eyebrow>{hero.eyebrow}</Eyebrow>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-6xl">{hero.h1}</h1>
        <p className="mt-6 max-w-prose text-lg text-brand-muted-text">{hero.sub}</p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
          <a href={hero.primary.href} className={buttonVariants({ variant: "primary", size: "lg" })}>
            {hero.primary.label}
          </a>
          <TextLink href={hero.secondary.href} className="inline-flex min-h-11 items-center text-base">
            {hero.secondary.label}
          </TextLink>
        </div>
      </div>
      <div className="mt-12 md:mt-16">
        <Shot name={hero.shot} priority sizes="(min-width: 1200px) 1152px, 100vw" />
      </div>
    </Section>
  );
}
