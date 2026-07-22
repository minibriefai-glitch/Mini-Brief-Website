import { AmbientDepth } from "@/components/effects/ambient-depth";
import { AmbientField } from "@/components/effects/ambient-field";
import { AtAGlance } from "@/components/landing/at-a-glance";
import { Comparison } from "@/components/landing/comparison";
import { CtaSection } from "@/components/landing/cta-section";
import { Faq } from "@/components/landing/faq";
import { Features } from "@/components/landing/features";
import { Footer } from "@/components/landing/footer";
import { FounderNote } from "@/components/landing/founder-note";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { IntroSplash } from "@/components/landing/intro-splash";
import { Nav } from "@/components/landing/nav";
import { NewsletterProvider } from "@/components/landing/newsletter-dialog";
import { OutcomeBand } from "@/components/landing/outcome-band";
import { Privacy } from "@/components/landing/privacy";
import { CinematicShowcase } from "@/components/landing/story/cinematic-showcase";
import { PrivacyCinematic } from "@/components/landing/story2/privacy-cinematic";
import { TrustBand } from "@/components/landing/trust-band";
import { FaqJsonLd } from "@/components/seo/json-ld";

export default function HomePage() {
  return (
    <NewsletterProvider>
      <FaqJsonLd />
      <IntroSplash />
      <AmbientDepth />
      <div className="site-backdrop" aria-hidden="true" />
      <AmbientField />

      <main id="main" className="relative min-h-screen flex flex-col">
        <Nav />
        <Hero />
        <OutcomeBand />
        <AtAGlance />
        <TrustBand />
        <Comparison />
        <CinematicShowcase />
        <Features />
        <HowItWorks />
        <PrivacyCinematic />
        <Privacy />
        <FounderNote />
        <Faq />
        <CtaSection />
        <Footer />
      </main>
    </NewsletterProvider>
  );
}
