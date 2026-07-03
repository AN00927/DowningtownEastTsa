import Link from "next/link";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { site } from "@/data/site";
import { Container } from "./ui";

const socialLinks = [
  { href: site.socials.facebook, label: "Facebook", Icon: Facebook },
  { href: site.socials.instagram, label: "Instagram", Icon: Instagram },
  { href: site.socials.youtube, label: "YouTube", Icon: Youtube },
];

export function Footer() {
  const year = "2026";
  return (
    <footer className="bg-deep-navy text-white/80">
      <Container className="py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:gap-28">
          {/* Brand */}
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5 font-bold text-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-sm">
                TSA
              </span>
              {site.chapterName}
            </div>
            <p className="mt-4 text-sm text-white/70">{site.description}</p>
          </div>

          {/* Quick nav */}
          <nav aria-label="Footer">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Pages
            </h2>
            <ul className="space-y-2.5">
              {site.nav.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social */}
          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Connect
            </h2>
            <ul className="flex flex-col gap-3">
              {socialLinks.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-sm text-white/70 transition-colors hover:text-white"
                  >
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/20">
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/15 pt-6 text-sm text-white/60">
          <p>© {year} {site.chapterName}. All rights reserved.</p>
          <p className="mt-1">
            Designed and developed by Rishabh Patel, Ahaan Nigam, and Neel
            Vangala.
          </p>
        </div>
      </Container>
    </footer>
  );
}
