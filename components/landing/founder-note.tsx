import Image from "next/image";
import { founder } from "@/content/home";
import { Section } from "./section";
import { Eyebrow } from "./section-header";

export function FounderNote() {
  return (
    <Section>
      <div className="mx-auto max-w-4xl">
        <Eyebrow>{founder.eyebrow}</Eyebrow>
        <figure className="relative mt-6 rounded-3xl border border-brand-ink/10 bg-white p-8 shadow-card md:p-12">
          <span aria-hidden="true" className="absolute left-8 top-4 font-serif text-8xl leading-none text-brand-blue/15 md:left-12">
            &ldquo;
          </span>
          <blockquote className="relative text-xl font-medium leading-snug text-brand-ink md:text-2xl md:leading-snug">
            <p>{founder.quote}</p>
          </blockquote>
          <figcaption className="mt-8 flex items-center gap-4">
            <Image
              src={founder.photo}
              alt={`${founder.name}, ${founder.role}`}
              width={72}
              height={72}
              className="h-[72px] w-[72px] rounded-full object-cover ring-4 ring-brand-page"
            />
            <div>
              <p className="font-semibold text-brand-ink">{founder.name}</p>
              <p className="text-sm text-brand-muted-text">{founder.role}</p>
            </div>
          </figcaption>
        </figure>
      </div>
    </Section>
  );
}
