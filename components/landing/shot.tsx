import Image from "next/image";
import { shots, type ShotKey } from "@/content/shots";
import { cn } from "@/lib/utils";

/**
 * A product screenshot from the manifest in content/shots.ts: explicit
 * dimensions, descriptive alt, a 1px border. `priority` belongs on the hero
 * shot only.
 */
export function Shot({
  name,
  priority = false,
  sizes = "(min-width: 768px) 50vw, 100vw",
  className,
}: {
  name: ShotKey;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  const shot = shots[name];
  return (
    <Image
      src={shot.src}
      alt={shot.alt}
      width={shot.w}
      height={shot.h}
      sizes={sizes}
      priority={priority}
      className={cn("h-auto w-full rounded-xl border border-brand-muted/50 bg-brand-page", className)}
    />
  );
}
