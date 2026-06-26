import Link from "next/link";
import { Facebook, Instagram, Youtube, GraduationCap } from "lucide-react";
import { site } from "@/data/site";
import { Container } from "./ui";

const socialLinks = [
  { href: site.socials.facebook, label: "Facebook", Icon: Facebook },
  { href: site.socials.instagram, label: "Instagram", Icon: Instagram },
  { href: site.socials.youtube, label: "YouTube", Icon: Youtube },
  { href: site.socials.schoology, label: "Schoology", Icon: GraduationCap },
];

export function Footer() {
  const year = "2025";
  return (
    <footer className="border-t bg-muted/40">
      <Container className="py-12">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2 font-bold">
              <span className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-base)] bg-primary text-primary-foreground">
                TSA
              </span>
              {site.chapterName}
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              {site.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <FooterCol
              title="Explore"
              links={site.nav.slice(0, 5)}
            />
            <FooterCol title="More" links={site.nav.slice(5)} />
            <div>
              <h3 className="mb-3 text-sm font-semibold">Connect</h3>
              <ul className="flex gap-3">
                {socialLinks.map(({ href, label, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-base)] border border-border hover:bg-muted"
                    >
                      <Icon className="h-4 w-4" aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t pt-6 text-sm text-muted-foreground">
          © {year} {site.chapterName}. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold">{title}</h3>
      <ul className="space-y-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
