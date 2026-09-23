import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Shared page column with a little more room for the product. */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("mx-auto max-w-7xl px-5 sm:px-8", className)}>
      {children}
    </div>
  );
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
