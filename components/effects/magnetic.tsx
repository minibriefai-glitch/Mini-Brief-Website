"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  /** How strongly the element follows the cursor (0–1). */
  strength?: number;
  className?: string;
};

/**
 * Wraps an element so it gently leans toward the cursor while hovered,
 * then springs back on leave. Pure transform — no layout shift.
 */
export function Magnetic({ children, strength = 0.25, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  // Off for reduced-motion and coarse/touch/no-hover pointers (mirrors TiltCard).
  // Default on so SSR markup is identical; the effect flips it on the client.
  const enabled = useRef(true);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    enabled.current = fine.matches && !reduced.matches;
    if (!enabled.current && ref.current) ref.current.style.transform = "";
  }, []);

  const onMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    const el = ref.current;
    if (!el || !enabled.current) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };

  const reset = () => {
    const el = ref.current;
    if (el) el.style.transform = "";
  };

  return (
    <span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={cn(
        "inline-block transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform",
        className,
      )}
    >
      {children}
    </span>
  );
}
