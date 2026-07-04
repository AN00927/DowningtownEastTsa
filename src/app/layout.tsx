import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BackToTop } from "@/components/back-to-top";
import { site } from "@/data/site";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Condensed display face for headings: athletic, high-energy, built for the
// big uppercase type this competition-focused design leans on.
const display = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
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
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.chapterName} | ${site.schoolName}`,
    description: site.description,
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
        className={`${barlow.variable} ${display.variable} flex min-h-screen flex-col`}
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
      </body>
    </html>
  );
}
