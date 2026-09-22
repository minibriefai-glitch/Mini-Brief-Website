import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** The page column: max-w-6xl with a 24px gutter. */
export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto max-w-6xl px-6", className)}>{children}</div>;
}

/**
 * One home-page section: vertical rhythm plus the page column. `scroll-mt`
 * keeps anchor targets clear of the sticky header.
 */
export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={cn("scroll-mt-16 py-20 md:py-28", className)}>
      <Container>{children}</Container>
    </section>
  );
}
