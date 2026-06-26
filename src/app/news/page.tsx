import type { Metadata } from "next";
import Link from "next/link";
import { Card, Container, PageHeader, Section } from "@/components/ui";
import { formatDate } from "@/lib/utils";
import { news } from "@/data/news";

export const metadata: Metadata = {
  title: "News",
  description: "Updates and announcements from Downingtown East TSA.",
};

export default function NewsPage() {
  return (
    <>
      <PageHeader
        title="News & Announcements"
        subtitle="Updates from Downingtown East TSA."
      />
      <Section>
        <Container>
          <ul className="flex flex-col gap-6">
            {news.map((post) => (
              <li key={post.slug}>
                <Card className="p-6">
                  <p className="text-sm text-muted-foreground">
                    {formatDate(post.date)}
                  </p>
                  <h2 className="mt-1 text-xl font-semibold tracking-tight">
                    <Link
                      href={`/news/${post.slug}`}
                      className="transition-colors hover:text-accent"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-3 text-muted-foreground">{post.excerpt}</p>
                  <Link
                    href={`/news/${post.slug}`}
                    className="mt-4 inline-block text-sm font-semibold text-accent hover:underline"
                  >
                    Read more &rarr;
                  </Link>
                </Card>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
