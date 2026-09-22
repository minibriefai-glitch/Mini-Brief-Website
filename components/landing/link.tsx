import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const textLink =
  "rounded-sm font-medium text-brand-blue underline underline-offset-4 hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue";

/** An inline text link: blue, underlined. Routes go through next/link; anchors and external URLs are plain <a>. */
export function TextLink({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  const cls = cn(textLink, className);
  return href.startsWith("/") ? (
    <Link href={href} className={cls}>
      {children}
    </Link>
  ) : (
    <a href={href} className={cls}>
      {children}
    </a>
  );
}
