import Image from "next/image";
import Link from "next/link";
import { WORDMARK } from "@/lib/brand";
import { cn } from "@/lib/utils";

/**
 * Icon + wordmark, linking home. Inherits the surrounding text colour, so it
 * reads as ink on the light home page and white on the dark kept pages.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex min-h-11 items-center gap-2 rounded-md text-current focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue",
        className,
      )}
    >
      <Image
        src="/photos/MiniBrief-Icon-Mono-Ink.png"
        alt=""
        width={32}
        height={32}
        className="rounded-[22%]"
      />
      <span className="text-lg font-semibold tracking-tight max-[359px]:sr-only">{WORDMARK}</span>
    </Link>
  );
}
