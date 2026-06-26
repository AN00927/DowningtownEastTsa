import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, PageHeader, Section } from "@/components/ui";
import { formatDate } from "@/lib/utils";
import { news } from "@/data/news";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return news.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = news.find((p) => p.slug === slug);
  if (!post) {
    return { title: "News" };
  }
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function NewsPostPage({ params }: Params) {
  const { slug } = await params;
  const post = news.find((p) => p.slug === slug);
  if (!post) {
    notFound();
  }

  return (
    <>
      <PageHeader title={post.title} />
      <Section>
        <Container className="max-w-3xl">
          <p className="text-sm text-muted-foreground">
            {formatDate(post.date)}
          </p>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-foreground">
            {post.body.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          <Link
            href="/news"
            className="mt-8 inline-block text-sm font-semibold text-accent hover:underline"
          >
            &larr; Back to News
          </Link>
        </Container>
      </Section>
    </>
  );
}
