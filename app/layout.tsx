import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "sonner";
import { SiteJsonLd } from "@/components/seo/json-ld";
import "./globals.css";

// Inter, vendored at app/fonts (SIL OFL 1.1): the one typeface on the site.
// globals.css points --font-body, --font-display and --font-mono at it, so
// the kept dark pages need no restyle.
const inter = localFont({
  src: "./fonts/InterVariable.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-inter",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://minibrief.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "MiniBrief",
  description:
    "Email intelligence for Gmail and Outlook. Catch-up reports, VIP alerts, voice-matched drafts, and one-click unsubscribe. Your email is never stored on our servers. Now in beta for Gmail and Outlook.",
  openGraph: {
    title: "MiniBrief — Email intelligence for Gmail and Outlook",
    description:
      "Triage your inbox, surface what needs a reply, and draft responses in your own voice. Your mail is parsed in your browser and never stored on our servers.",
    type: "website",
    url: siteUrl,
    siteName: "MiniBrief",
  },
  twitter: {
    card: "summary_large_image",
    title: "MiniBrief — Email intelligence for Gmail and Outlook",
    description:
      "Triage your inbox, surface what needs a reply, and draft responses in your own voice. Your email is never stored on our servers.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteJsonLd />
        {children}
        <Toaster
          theme="dark"
          position="bottom-center"
          toastOptions={{
            style: {
              background: "rgba(13,21,40,0.97)",
              border: "1px solid rgba(74,98,245,0.3)",
              color: "#fff",
              fontFamily: "var(--font-inter)",
            },
          }}
        />
      </body>
    </html>
  );
}
