import Link from "next/link";
import { Logo } from "@/components/landing/logo";
import { Container } from "@/components/landing/section";

type Props = {
  title: string;
  updated: string;
  children: React.ReactNode;
};

/** The policy pages, in the site's light design. */
export function LegalShell({ title, updated, children }: Props) {
  return (
    <div data-page="light" className="flex min-h-screen flex-col bg-brand-page text-brand-ink">
      <header className="border-b border-brand-ink/[0.06] bg-brand-page">
        <Container className="flex h-16 items-center justify-between">
          <Logo />
          <Link
            href="/"
            className="inline-flex min-h-11 items-center rounded-md px-3 text-sm font-medium text-brand-ink hover:underline hover:underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
          >
            Back to home
          </Link>
        </Container>
      </header>

      <main id="main" className="flex-1 py-16 md:py-20">
        <article className="mx-auto max-w-3xl px-6">
          <h1 className="text-4xl font-semibold tracking-[-0.03em] text-brand-ink md:text-5xl">{title}</h1>
          <p className="mt-3 text-sm text-brand-muted-text">Last updated: {updated}</p>
          <div className="legal-prose mt-10 text-lg leading-relaxed text-brand-ink">{children}</div>
          <p className="mt-14 border-t border-brand-ink/10 pt-6 text-sm text-brand-muted-text">
            This document is written in plain language for transparency. It is not legal
            advice. The contact details for questions are in the document above.
          </p>
        </article>
      </main>

      <footer className="border-t border-brand-ink/[0.06]">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-sm text-brand-muted-text sm:flex-row">
          <p>© {new Date().getFullYear()} MiniBrief</p>
          <nav aria-label="Policies" className="flex items-center gap-5">
            <Link href="/terms" className="hover:underline hover:underline-offset-4">Terms</Link>
            <Link href="/privacy" className="hover:underline hover:underline-offset-4">Privacy</Link>
            <Link href="/security" className="hover:underline hover:underline-offset-4">Security</Link>
            <Link href="/accessibility" className="hover:underline hover:underline-offset-4">Accessibility</Link>
          </nav>
        </Container>
      </footer>
    </div>
  );
}
