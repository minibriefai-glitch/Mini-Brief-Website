import { CtaSection } from "@/components/landing/cta-section";
import { DemoVideo } from "@/components/landing/demo-video";
import { Faq } from "@/components/landing/faq";
import { Footer } from "@/components/landing/footer";
import { FounderNote } from "@/components/landing/founder-note";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Nav } from "@/components/landing/nav";
import { Privacy } from "@/components/landing/privacy";
import { Problem } from "@/components/landing/problem";
import { WhatItDoes } from "@/components/landing/what-it-does";
import { FaqJsonLd } from "@/components/seo/json-ld";

export default function HomePage() {
  return (
    <div data-page="light" className="flex min-h-screen flex-col bg-brand-page text-brand-ink">
      <FaqJsonLd />
      <Nav />
      <main id="main" className="flex-1">
        <Hero />
        <DemoVideo className="mx-auto max-w-6xl px-6 pb-16 md:pb-24" />
        <Problem />
        <WhatItDoes />
        <Privacy />
        <HowItWorks />
        <FounderNote />
        <Faq />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
