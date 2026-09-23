import { Menu, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { nav } from "@/content/home";
import { Logo } from "./logo";
import { Container } from "./section";
import { cn } from "@/lib/utils";

const navLink =
  "inline-flex min-h-11 items-center rounded-md px-3 text-sm font-medium text-brand-ink hover:underline hover:underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue";

/**
 * The header: logo home, the three section anchors, Sign in, and the one
 * primary button. Below `md` the anchors and Sign in fold into a native
 * <details> menu, so the page needs no JavaScript to navigate. The one
 * inline script only closes that menu after a choice; without it the menu
 * simply stays open.
 */
const closeMenuOnChoice =
  "document.currentScript.previousElementSibling.addEventListener('click',e=>{if(e.target.closest('a'))e.currentTarget.removeAttribute('open')})";
export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-brand-ink/[0.06] bg-brand-page/85 text-brand-ink backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Logo />
        <nav aria-label="Primary" className="flex items-center gap-2 md:gap-4">
          <ul className="hidden items-center gap-1 md:flex">
            {nav.anchors.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={navLink}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a href={nav.signIn.href} className={`${navLink} hidden md:inline-flex`}>
            {nav.signIn.label}
          </a>
          <a href={nav.getStarted.href} className={buttonVariants({ variant: "primary", size: "md" })}>
            {nav.getStarted.label}
          </a>
          <details className="group md:hidden">
            <summary
              aria-label="Menu"
              className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-full border border-brand-ink/10 bg-white text-brand-ink [&::-webkit-details-marker]:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
            >
              <Menu className="h-5 w-5 group-open:hidden" aria-hidden="true" />
              <X className="hidden h-5 w-5 group-open:block" aria-hidden="true" />
            </summary>
            <div className="absolute inset-x-0 top-full border-b border-brand-ink/[0.06] bg-brand-page shadow-card">
              <ul className="mx-auto flex max-w-6xl flex-col px-6 py-3">
                {nav.anchors.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className={cn(navLink, "w-full text-base")}>
                      {item.label}
                    </a>
                  </li>
                ))}
                <li className="mt-2 border-t border-brand-ink/10 pt-2">
                  <a href={nav.signIn.href} className={cn(navLink, "w-full text-base")}>
                    {nav.signIn.label}
                  </a>
                </li>
              </ul>
            </div>
          </details>
          <script dangerouslySetInnerHTML={{ __html: closeMenuOnChoice }} />
        </nav>
      </Container>
    </header>
  );
}
