"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { nav } from "@/content/home";
import { Logo } from "./logo";
import { Container } from "./section";
import { cn } from "@/lib/utils";

const navLink =
  "inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-medium text-[#a7b0c4] transition-colors hover:bg-white/[0.04] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue motion-reduce:transition-none";

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    const sections = nav.anchors
      .map(({ href }) => document.getElementById(href.slice(1)))
      .filter((section): section is HTMLElement => section !== null);
    const visibleSections = new Set<HTMLElement>();
    let observer: IntersectionObserver;
    const observeSections = () => {
      observer?.disconnect();
      visibleSections.clear();
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting)
              visibleSections.add(entry.target as HTMLElement);
            else visibleSections.delete(entry.target as HTMLElement);
          }
          const closest = [...visibleSections].sort(
            (a, b) =>
              Math.abs(a.getBoundingClientRect().top - 80) -
              Math.abs(b.getBoundingClientRect().top - 80),
          )[0];
          setActiveSection(closest ? `#${closest.id}` : "");
        },
        {
          rootMargin: `-64px 0px -${Math.max(0, window.innerHeight - 280)}px 0px`,
          threshold: [0, 0.1, 0.5, 1],
        },
      );
      sections.forEach((section) => observer.observe(section));
    };
    observeSections();
    window.addEventListener("resize", observeSections);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", observeSections);
    };
  }, []);

  useEffect(() => {
    let frame = 0;
    const updateProgress = () => {
      frame = 0;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        scrollable > 0
          ? Math.min(1, Math.max(0, window.scrollY / scrollable))
          : 0;
      if (progressRef.current)
        progressRef.current.style.transform = `scaleX(${progress})`;
      if (window.scrollY < 80) setActiveSection("");
    };
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateProgress);
    };
    const resizeObserver = new ResizeObserver(scheduleUpdate);
    resizeObserver.observe(document.body);
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    updateProgress();
    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node))
        setMenuOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onDesktop = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    desktop.addEventListener("change", onDesktop);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [menuOpen]);

  return (
    <header
      ref={headerRef}
      onClickCapture={(event) => {
        if ((event.target as HTMLElement).closest("a")) setMenuOpen(false);
      }}
      className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#080d1b]/95 text-[#f4f6ff] backdrop-blur-md"
    >
      <Container className="flex h-16 items-center justify-between gap-2 sm:gap-4">
        <Logo />
        <nav aria-label="Primary" className="flex items-center gap-2 lg:gap-3">
          <ul className="hidden items-center gap-1 lg:flex">
            {nav.anchors.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={
                    activeSection === item.href ? "location" : undefined
                  }
                  className={cn(
                    navLink,
                    activeSection === item.href &&
                      "bg-white/[0.06] text-[#b5c5ff]",
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={nav.signIn.href}
            className={cn(navLink, "hidden lg:inline-flex")}
          >
            {nav.signIn.label}
          </a>
          <a
            href={nav.getStarted.href}
            className={cn(
              buttonVariants({ variant: "primary", size: "md" }),
              "rounded-xl bg-[#b5c5ff] text-[#0a1230] hover:bg-[#cbd6ff]",
            )}
          >
            {nav.getStarted.label}
          </a>
          <button
            ref={menuButtonRef}
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] transition-colors hover:border-white/30 hover:text-[#a4b8ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue motion-reduce:transition-none lg:hidden"
          >
            {menuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
          <div
            id={menuId}
            hidden={!menuOpen}
            className="absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-b border-white/15 bg-[#10182a] shadow-card lg:hidden"
          >
            <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
              {nav.anchors.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={
                      activeSection === item.href ? "location" : undefined
                    }
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      navLink,
                      "w-full justify-between text-base",
                      activeSection === item.href &&
                        "bg-white/[0.06] text-[#b5c5ff]",
                    )}
                  >
                    {item.label}
                    {activeSection === item.href && (
                      <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 rounded-full bg-[#a4b8ff]"
                      />
                    )}
                  </a>
                </li>
              ))}
              <li className="mt-2 border-t border-white/10 pt-2">
                <a
                  href={nav.signIn.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(navLink, "w-full text-base")}
                >
                  {nav.signIn.label}
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </Container>
      <div
        ref={progressRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left bg-[#a4b8ff]/80"
        style={{ transform: "scaleX(0)" }}
      />
    </header>
  );
}
