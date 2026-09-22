import Image from "next/image";
import { shots, type ShotKey } from "@/content/shots";
import { cn } from "@/lib/utils";
import { Frame } from "./frame";

/**
 * A product screenshot from the manifest in content/shots.ts, inside a
 * browser frame on a faint blue plate. `priority` belongs on the hero only.
 */
export function Shot({
  name,
  priority = false,
  sizes = "(min-width: 768px) 50vw, 100vw",
  plate = true,
  className,
}: {
  name: ShotKey;
  priority?: boolean;
  sizes?: string;
  plate?: boolean;
  className?: string;
}) {
  const shot = shots[name];
  return (
    <div className={cn(plate && "rounded-[28px] bg-brand-blue/[0.06] p-3 md:rounded-[36px] md:p-5", className)}>
      <Frame>
        <Image src={shot.src} alt={shot.alt} width={shot.w} height={shot.h} sizes={sizes} priority={priority} className="block h-auto w-full" />
      </Frame>
    </div>
  );
}
