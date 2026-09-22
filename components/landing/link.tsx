import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** An inline text link, underlined. Routes go through next/link; anchors and external URLs are plain <a>. */
export function TextLink({
  href,
  tone = "light",
  className,
  children,
}: {
  href: string;
  tone?: "light" | "dark";
  className?: string;
  children: ReactNode;
}) {
  const cls = cn(
    "rounded-sm font-medium underline underline-offset-4 hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
    tone === "light" ? "text-brand-blue focus-visible:outline-brand-blue" : "text-white decoration-white/50 focus-visible:outline-white",
    className,
  );
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
