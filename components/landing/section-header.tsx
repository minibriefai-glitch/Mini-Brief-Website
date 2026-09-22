import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The small pill badge above a heading. Muted text on an ink pill: the
 * palette's eyebrow colour at a contrast that passes AA (muted on the page
 * background alone does not).
 */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-brand-ink px-3 py-1 text-xs font-medium uppercase tracking-wider text-brand-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("max-w-prose", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className={cn("text-3xl font-semibold tracking-tight text-brand-ink md:text-4xl", eyebrow && "mt-4")}>
        {title}
      </h2>
    </div>
  );
}
