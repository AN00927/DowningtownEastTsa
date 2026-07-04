import Link from "next/link";
import Image from "next/image";
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
    <footer className="bg-navy-950 text-white/80">
      {/* Hazard-stripe strip closes out the page. */}
      <div className="stripes-accent h-2 w-full" aria-hidden />
      <Container className="py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between md:gap-16">
          {/* Brand */}
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <Image
                src="/tsa-logo.png"
                alt="Technology Student Association logo"
                width={72}
                height={46}
                className="h-10 w-auto rounded-[4px] bg-white p-1"
              />
              <span className="font-display text-2xl font-bold uppercase leading-none tracking-[0.04em] text-white">
                Downingtown East TSA
              </span>
            </div>
            <span className="mt-4 block h-[3px] w-14 -skew-x-[20deg] bg-accent" aria-hidden />
            <p className="mt-4 text-sm text-white/70">{site.description}</p>
          </div>

          {/* Pages + Connect, grouped on the right */}
          <div className="flex gap-16 sm:gap-24 lg:gap-32">
            <nav aria-label="Footer">
              <h2 className="mb-4 font-display text-sm font-bold uppercase tracking-[0.18em] text-white">
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

            <div>
              <h2 className="mb-4 font-display text-sm font-bold uppercase tracking-[0.18em] text-white">
                Connect
              </h2>
              <ul className="flex flex-col gap-3">
                {socialLinks.map(({ href, label, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-3 text-sm text-white/70 transition-colors hover:text-white"
                    >
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-[4px] border border-white/20 transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                        <Icon className="h-4 w-4" aria-hidden />
                      </span>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
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
