import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "light" | "dark";

/** A restrained section label, with a high-contrast treatment on dark panels. */
export function Eyebrow({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em]",
        tone === "light" ? "text-brand-muted-text" : "text-[#a4b8ff]",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          tone === "light" ? "bg-brand-blue" : "bg-[#a4b8ff]",
        )}
      />
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
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
      <h2
        className={cn(
          "text-4xl font-medium leading-[1.08] tracking-[-0.045em] md:text-5xl",
          tone === "light" ? "text-brand-ink" : "text-white",
          eyebrow && "mt-5",
        )}
      >
        {title}
      </h2>
    </div>
  );
}
