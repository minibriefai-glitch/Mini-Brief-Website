import Link from "next/link";
import { footer } from "@/content/home";
import { CONTACT_EMAIL, CONTACT_MAILTO, LINKEDIN_URL } from "@/lib/brand";
import { Logo } from "./logo";
import { Container } from "./section";

const heading = "text-xs font-medium uppercase tracking-wider text-brand-muted";
const link =
  "-ml-2 inline-flex min-h-11 min-w-11 items-center rounded-md px-2 text-sm text-white hover:underline hover:underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

function LinkColumn({
  id,
  title,
  links,
}: {
  id: string;
  title: string;
  links: ReadonlyArray<{ label: string; href: string }>;
}) {
  return (
    <nav aria-labelledby={id}>
      <p id={id} className={heading}>
        {title}
      </p>
      <ul className="mt-2">
        {links.map((item) =>
          item.href.startsWith("/") ? (
            <li key={item.href}>
              <Link href={item.href} className={link}>
                {item.label}
              </Link>
            </li>
          ) : (
            <li key={item.href}>
              <a href={item.href} className={link}>
                {item.label}
              </a>
            </li>
          ),
        )}
      </ul>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="bg-brand-ink text-white">
      <Container className="py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm text-brand-muted">{footer.tagline}</p>
          </div>
          <LinkColumn id="footer-product" title={footer.product.heading} links={footer.product.links} />
          <LinkColumn id="footer-legal" title={footer.legal.heading} links={footer.legal.links} />
          <nav aria-labelledby="footer-contact">
            <p id="footer-contact" className={heading}>
              {footer.contact.heading}
            </p>
            <ul className="mt-2">
              <li>
                <a href={CONTACT_MAILTO} className={link}>
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className={link}>
                  {footer.contact.linkedInLabel}
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <p className="mt-12 border-t border-white/10 pt-6 text-sm text-brand-muted">{footer.copyright}</p>
      </Container>
    </footer>
  );
}
