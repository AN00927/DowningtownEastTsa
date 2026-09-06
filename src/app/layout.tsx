import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BackToTop } from "@/components/back-to-top";
import { site } from "@/data/site";
import { Analytics } from "@vercel/analytics/next";

// Barlow / Barlow Condensed (latin) are self-hosted in ./fonts so dev and
// build never depend on Google Fonts being reachable from this machine.
const barlow = localFont({
  variable: "--font-barlow",
  src: [
    { path: "./fonts/barlow-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/barlow-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/barlow-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/barlow-700.woff2", weight: "700", style: "normal" },
  ],
});

// Condensed display face for headings: athletic, high-energy, built for the
// big uppercase type this competition-focused design leans on.
const display = localFont({
  variable: "--font-barlow-condensed",
  src: [
    { path: "./fonts/barlow-condensed-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/barlow-condensed-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/barlow-condensed-700.woff2", weight: "700", style: "normal" },
    { path: "./fonts/barlow-condensed-800.woff2", weight: "800", style: "normal" },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.chapterName} | ${site.schoolName}`,
    template: `%s | ${site.chapterName}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.chapterName} | ${site.schoolName}`,
    description: site.description,
    url: site.url,
    siteName: site.chapterName,
    type: "website",
    // Without this, scrapers pick whatever image they find first on the page,
    // which was the STEM Academy venue photo from the countdown section.
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 628,
        alt: `${site.chapterName} members at the TSA National Conference`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.chapterName} | ${site.schoolName}`,
    description: site.description,
    images: ["/og-image.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#101c31",
};

// Organization structured data for search engines.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.chapterName,
  url: site.url,
  description: site.description,
  parentOrganization: {
    "@type": "EducationalOrganization",
    name: site.schoolName,
  },
  sameAs: Object.values(site.socials),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${barlow.variable} ${display.variable} flex min-h-dvh flex-col`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <BackToTop />
        <Analytics />
      </body>
    </html>
  );
}
