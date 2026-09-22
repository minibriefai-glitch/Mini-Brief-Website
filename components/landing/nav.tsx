import { buttonVariants } from "@/components/ui/button";
import { nav } from "@/content/home";
import { Logo } from "./logo";
import { Container } from "./section";

const navLink =
  "inline-flex min-h-11 items-center rounded-md px-3 text-sm font-medium text-brand-ink hover:underline hover:underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue";

/**
 * The header: logo home, the three section anchors, Sign in, and the one
 * primary button. Below `md` only the logo and Get started show.
 */
export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-brand-ink/[0.06] bg-brand-page/85 text-brand-ink backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-6">
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
        </nav>
      </Container>
    </header>
  );
}
