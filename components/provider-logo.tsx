import Image from "next/image";
import { cn } from "@/lib/utils";

type MailProvider = "Gmail" | "Outlook";

// Match the connected-mailbox logos in cloud's MailboxTabs. These are the
// existing Blob object names: the Outlook folder includes a trailing space.
const providerLogos: Record<MailProvider, string> = {
  Gmail:
    "https://vvotv2lifqdlacds.public.blob.vercel-storage.com/providers/google/Google__G__logo.svg.webp",
  Outlook:
    "https://vvotv2lifqdlacds.public.blob.vercel-storage.com/providers/microsoft%20/outlook-logo-png-svg.webp",
};

/** Decorative logo; always pair it with the provider's visible name. */
export function ProviderLogo({
  provider,
  className,
}: {
  provider: MailProvider;
  className?: string;
}) {
  return (
    <Image
      src={providerLogos[provider]}
      alt=""
      aria-hidden="true"
      width={16}
      height={16}
      draggable={false}
      className={cn("size-4 shrink-0 object-contain", className)}
    />
  );
}
