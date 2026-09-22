import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Browser-window chrome around a screenshot: a title bar with three dots and an address pill. */
export function Frame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-2xl border border-brand-ink/10 bg-white shadow-frame", className)}>
      <div aria-hidden="true" className="flex h-9 items-center gap-1.5 border-b border-brand-ink/[0.06] bg-brand-page px-4">
        <span className="h-2.5 w-2.5 rounded-full bg-brand-ink/10" />
        <span className="h-2.5 w-2.5 rounded-full bg-brand-ink/10" />
        <span className="h-2.5 w-2.5 rounded-full bg-brand-ink/10" />
        <span className="ml-4 h-5 w-full max-w-[260px] rounded-md border border-brand-ink/[0.06] bg-white" />
      </div>
      {children}
    </div>
  );
}
