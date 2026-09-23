import { ArrowUpRight } from "lucide-react";
import { Container } from "./section";

const outcomes = [
  {
    number: "01",
    title: "Find your focus.",
    body: "The important messages rise to the top.",
    href: "#product",
  },
  {
    number: "02",
    title: "Get the words right.",
    body: "A thoughtful draft. Your final say.",
    href: "#interactive-demo",
  },
  {
    number: "03",
    title: "Keep your word.",
    body: "Every commitment, in one clear view.",
    href: "#interactive-demo",
  },
];

export function Problem() {
  return (
    <section aria-label="A clearer way to work" className="py-10 sm:py-14">
      <Container>
        <div className="grid gap-0 border-b border-white/10 pb-10 md:grid-cols-3 md:pb-14">
          {outcomes.map((item) => (
            <a
              key={item.number}
              href={item.href}
              className="group flex items-start gap-4 rounded-xl py-5 transition-colors hover:bg-white/[0.025] md:px-6 first:md:pl-0 last:md:pr-0"
            >
              <span className="pt-1 text-[10px] font-medium tracking-wider text-[#a4b8ff]">
                {item.number}
              </span>
              <div className="flex-1">
                <h2 className="text-base font-medium text-[#f4f6ff]">
                  {item.title}
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-[#99a5bd]">
                  {item.body}
                </p>
              </div>
              <ArrowUpRight
                className="mt-1 h-4 w-4 shrink-0 text-[#7887a3] transition-colors group-hover:text-[#a4b8ff]"
                aria-hidden="true"
              />
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
