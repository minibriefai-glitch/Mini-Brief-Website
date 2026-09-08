"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ScrollProgress } from "@/components/effects/scroll-progress";
import { Magnetic } from "@/components/effects/magnetic";
import { Logo } from "./logo";
import { useNewsletter } from "./newsletter-dialog";
import { PORTAL_GET_STARTED_URL, PORTAL_SIGN_IN_URL } from "@/lib/portal";

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
      className="site-nav sticky top-0 z-50 flex items-center justify-between border-b border-white/[0.06] px-6 sm:px-12"
    >
      <Logo />
      {/* The portal's two doors (2026-09-08): Sign in as a text link, Get
          started as the one primary button. The waitlist keeps its place as
          a ghost button from `sm` up; on a phone the two doors are the row. */}
      <div className="flex items-center gap-3 sm:gap-4">
        <a
          href={PORTAL_SIGN_IN_URL}
          className="font-body text-[13px] font-medium text-fg-2 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-b focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-md px-1 py-1"
        >
          Sign in
        </a>
        <Button variant="ghost" size="md" className="hidden sm:inline-flex" onClick={() => open("nav-primary")}>
          Join waitlist
        </Button>
        <Magnetic>
          <Button asChild variant="primary" size="md">
            <a href={PORTAL_GET_STARTED_URL}>Get started</a>
          </Button>
        </Magnetic>
      </div>
      <ScrollProgress />
    </nav>
  );
}
