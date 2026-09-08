import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { formatPostDate, getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing on software engineering, tooling, and building things.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  // The nav hides Blog until a post exists; keep the route consistent with it.
  if (posts.length === 0) notFound();

  return (
    <div className="max-w-[680px]">
      <h1 className="mb-12 border-b border-border pb-4 text-base font-bold uppercase tracking-[0.06em]">
        Blog
      </h1>

      <ul className="space-y-8">
        {posts.map((post) => (
          <li key={post.slug}>
            <article>
              <Link href={`/blog/${post.slug}`} className="group block">
                <h2 className="text-[15px] font-bold text-foreground transition-colors group-hover:text-primary">
                  {post.title}
                </h2>
                <p className="mt-1 text-[11px] uppercase tracking-[0.06em] text-muted-foreground">
                  <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                  {post.draft ? " · Draft" : null}
                </p>
                {post.description ? (
                  <p className="mt-2 text-[13px] leading-[1.7] text-foreground">
                    {post.description}
                  </p>
                ) : null}
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
