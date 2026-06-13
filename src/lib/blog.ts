import "server-only";

import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type PostFrontmatter = {
  title: string;
  description: string;
  date: string; // ISO date, e.g. "2026-06-13"
  tags?: string[];
  draft?: boolean;
};

export type PostMeta = PostFrontmatter & {
  slug: string;
};

export type Post = PostMeta & {
  content: string;
};

const isProd = process.env.NODE_ENV === "production";

function readPostFile(slug: string): Post | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const fm = data as Partial<PostFrontmatter>;

  if (!fm.title || !fm.date) {
    throw new Error(`Post "${slug}" is missing required frontmatter (title, date).`);
  }

  return {
    slug,
    title: fm.title,
    description: fm.description ?? "",
    date: fm.date,
    tags: fm.tags ?? [],
    draft: fm.draft ?? false,
    content,
  };
}

/** All post slugs that have an .mdx file. */
export function getPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getPost(slug: string): Post | null {
  const post = readPostFile(slug);
  if (!post) return null;
  // Hide drafts in production builds.
  if (post.draft && isProd) return null;
  return post;
}

/** Published posts, newest first. Drafts are hidden in production. */
export function getAllPosts(): PostMeta[] {
  return getPostSlugs()
    .map((slug) => getPost(slug))
    .filter((post): post is Post => post !== null)
    .map(
      ({ slug, title, description, date, tags, draft }): PostMeta => ({
        slug,
        title,
        description,
        date,
        tags,
        draft,
      }),
    )
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function formatPostDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
