import { buttonVariants } from "@/components/ui/button";
import { hero } from "@/content/home";
import { TextLink } from "./link";
import { Container } from "./section";
import { Eyebrow } from "./section-header";
import { Shot } from "./shot";

export function Hero() {
  return (
    <section className="relative isolate pt-20 md:pt-28">
      {/* A faint blue wash behind the headline; nothing moves. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] max-w-full bg-[radial-gradient(60%_60%_at_50%_0%,rgba(58,95,220,0.10),transparent_70%)]"
      />
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <Eyebrow>{hero.eyebrow}</Eyebrow>
          <h1 className="mt-7 text-5xl font-semibold tracking-[-0.035em] text-brand-ink md:text-7xl md:leading-[1.02]">{hero.h1}</h1>
          <p className="mx-auto mt-7 max-w-2xl text-xl leading-relaxed text-brand-muted-text md:text-2xl md:leading-relaxed">{hero.sub}</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-4">
            <a href={hero.primary.href} className={buttonVariants({ variant: "primary", size: "lg" })}>
              {hero.primary.label}
            </a>
            <TextLink href={hero.secondary.href} className="inline-flex min-h-11 items-center text-base">
              {hero.secondary.label}
            </TextLink>
          </div>
        </div>
        <div className="mt-16 md:mt-20">
          <Shot name={hero.shot} priority sizes="(min-width: 1200px) 1152px, 100vw" />
        </div>
      </Container>
    </section>
  );
}
