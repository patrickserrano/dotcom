import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import { mdxComponents } from "@/components/mdx-components";
import { formatPostDate, getPost, getPostSlugs } from "@/lib/blog";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
    },
    twitter: {
      card: "summary",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article className="max-w-[680px]">
      <header className="mb-8 border-b border-border pb-6">
        <p className="mb-3 text-[11px] uppercase tracking-[0.06em] text-muted-foreground">
          <Link href="/blog" className="transition-colors hover:text-foreground">
            ← Blog
          </Link>
        </p>
        <h1 className="text-xl font-bold leading-snug text-foreground">
          {post.title}
        </h1>
        <p className="mt-2 text-[11px] uppercase tracking-[0.06em] text-muted-foreground">
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
        </p>
      </header>

      <div className="prose prose-invert prose-site max-w-none">
        <MDXRemote source={post.content} components={mdxComponents} />
      </div>
    </article>
  );
}
