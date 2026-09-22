import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "light" | "dark";

/** The small pill badge above a heading. On ink it inverts to a white tint. */
export function Eyebrow({ children, tone = "light", className }: { children: ReactNode; tone?: Tone; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wider",
        tone === "light" ? "border-brand-ink/10 bg-white text-brand-muted-text shadow-card" : "border-white/15 bg-white/10 text-white/80",
        className,
      )}
    >
      <span aria-hidden="true" className={cn("h-1.5 w-1.5 rounded-full", tone === "light" ? "bg-brand-blue" : "bg-white/70")} />
      {children}
    </span>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  align = "left",
  tone = "light",
  className,
}: {
  eyebrow?: string;
  title: string;
  align?: "left" | "center";
  tone?: Tone;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
      <h2
        className={cn(
          "text-3xl font-semibold tracking-[-0.02em] md:text-5xl md:leading-[1.08]",
          tone === "light" ? "text-brand-ink" : "text-white",
          eyebrow && "mt-5",
        )}
      >
        {title}
      </h2>
    </div>
  );
}
