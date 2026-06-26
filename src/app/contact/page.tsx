import type { Metadata } from "next";
import { Facebook, Instagram, Youtube, GraduationCap } from "lucide-react";
import { Card, Container, PageHeader, Section } from "@/components/ui";
import { ContactForm } from "@/components/contact-form";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Downingtown East TSA. Questions, sign-ups, and more.",
};

const socialLinks = [
  { label: "Facebook", href: site.socials.facebook, Icon: Facebook },
  { label: "Instagram", href: site.socials.instagram, Icon: Instagram },
  { label: "YouTube", href: site.socials.youtube, Icon: Youtube },
  { label: "Schoology", href: site.socials.schoology, Icon: GraduationCap },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact Us"
        subtitle="Questions about TSA? Reach out, we'd love to hear from you."
      />
      <Section>
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            {/* Left: contact form */}
            <div>
              <h2 className="mb-6 text-2xl font-bold tracking-tight">
                Send us a message
              </h2>
              <ContactForm />
            </div>

            {/* Right: socials + privacy note */}
            <div>
              <h2 className="mb-6 text-2xl font-bold tracking-tight">
                Find us online
              </h2>
              <Card className="p-6">
                <ul className="flex flex-col gap-3">
                  {socialLinks.map(({ label, href, Icon }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 font-medium transition-colors hover:text-accent"
                      >
                        <Icon className="h-5 w-5 text-accent" aria-hidden="true" />
                        <span>{label}</span>
                      </a>
                    </li>
                  ))}
                </ul>

                <p className="mt-6 border-t pt-4 text-sm text-muted-foreground">
                  For privacy, we don&apos;t publish student emails. Please use
                  the contact form to reach the chapter, or message us on any of
                  the channels above.
                </p>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
