"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ScrollProgress } from "@/components/effects/scroll-progress";
import { Magnetic } from "@/components/effects/magnetic";
import { Logo } from "./logo";
import { useNewsletter } from "./newsletter-dialog";

export function Nav() {
  const { open } = useNewsletter();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      el.dataset.scrolled = window.scrollY > 12 ? "true" : "false";
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <nav
      ref={ref}
      data-scrolled="false"
      className="site-nav sticky top-0 z-50 flex items-center justify-between border-b border-white/[0.06] backdrop-blur-md px-6 sm:px-12"
    >
      <Logo />
      <div className="flex items-center gap-5 sm:gap-7">
        <a
          href="#try-it-live"
          className="hidden sm:inline-flex font-display text-[13px] font-semibold text-fg-2 transition-colors hover:text-white link-underline"
        >
          Live demo
        </a>
        <Magnetic>
          <Button variant="primary" size="md" onClick={() => open("nav-primary")}>
            Join waitlist
          </Button>
        </Magnetic>
      </div>
      <ScrollProgress />
    </nav>
  );
}
