import Image from "next/image";
import { founder } from "@/content/home";
import { Section } from "./section";
import { Eyebrow } from "./section-header";

export function FounderNote() {
  return (
    <Section>
      <div className="max-w-3xl">
        <Eyebrow>{founder.eyebrow}</Eyebrow>
        <figure className="mt-6 rounded-xl border border-brand-muted/50 bg-white p-8">
          <blockquote className="text-lg">
            <p>{founder.quote}</p>
          </blockquote>
          <figcaption className="mt-6 flex items-center gap-4">
            <Image
              src={founder.photo}
              alt={`${founder.name}, ${founder.role}`}
              width={64}
              height={64}
              className="h-16 w-16 rounded-full object-cover"
            />
            <div>
              <p className="font-medium">{founder.name}</p>
              <p className="text-sm text-brand-muted-text">{founder.role}</p>
            </div>
          </figcaption>
        </figure>
      </div>
    </Section>
  );
}
