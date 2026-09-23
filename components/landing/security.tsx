import { CreditCard, Database, EyeOff, KeyRound, Lock, ServerOff, ShieldCheck, Timer } from "lucide-react";
import { security } from "@/content/home";
import { TextLink } from "./link";
import { Section } from "./section";
import { SectionHeader } from "./section-header";

const icons = [EyeOff, Lock, ServerOff, KeyRound, ShieldCheck, Timer, Database, CreditCard];

export function Security() {
  return (
    <Section id={security.id}>
      <SectionHeader eyebrow={security.eyebrow} title={security.h2} />
      <p className="mt-6 max-w-prose text-lg leading-relaxed text-brand-muted-text">{security.intro}</p>
      <ul role="list" className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {security.items.map((item, i) => {
          const Icon = icons[i % icons.length];
          return (
            <li key={item.title} className="rounded-2xl border border-brand-ink/10 bg-white p-6 shadow-card">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue" aria-hidden="true">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold leading-snug text-brand-ink">{item.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-brand-muted-text">{item.body}</p>
            </li>
          );
        })}
      </ul>
      <div className="mt-10">
        <p className="text-xs font-medium uppercase tracking-wider text-brand-muted-text">{security.alsoLead}</p>
        <ul role="list" className="mt-3 grid gap-x-8 gap-y-2 text-base leading-relaxed text-brand-muted-text md:grid-cols-2">
          {security.also.map((line) => (
            <li key={line} className="flex gap-2">
              <span aria-hidden="true" className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue" />
              {line}
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-6 text-lg">
        <TextLink href={security.link.href} className="inline-flex min-h-11 items-center">
          {security.link.label}
        </TextLink>
      </p>
    </Section>
  );
}
