import type { ReactNode } from "react";

/**
 * Shared section header: mono kicker with hairline flanks, display headline,
 * optional subline. One place controls the type scale and rhythm for every
 * section, so the page reads as a single system.
 */
export function SectionHeader({
  kicker,
  title,
  sub,
  align = "center",
  className = "",
  titleClassName = "",
}: {
  kicker: string;
  title: ReactNode;
  sub?: ReactNode;
  align?: "center" | "left";
  className?: string;
  titleClassName?: string;
}) {
  const center = align === "center";
  return (
    <div className={`${center ? "text-center" : ""} ${className}`}>
      <div className={`section-kicker ${center ? "justify-center" : ""}`}>{kicker}</div>
      <h2
        className={`font-display font-extrabold tracking-[-0.03em] text-white leading-[1.1] text-[clamp(28px,4vw,44px)] ${
          sub ? "mb-4" : ""
        } ${center ? "mx-auto" : ""} ${titleClassName}`}
      >
        {title}
      </h2>
      {sub ? (
        <p
          className={`font-body text-[15px] text-fg-2 leading-relaxed max-w-[560px] ${
            center ? "mx-auto" : ""
          }`}
        >
          {sub}
        </p>
      ) : null}
    </div>
  );
}
