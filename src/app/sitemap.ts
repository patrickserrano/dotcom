import type { MetadataRoute } from "next";

import { getAllPosts } from "@/lib/blog";
import { getSite } from "@/lib/site-server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Each domain advertises its own URLs, matching its self-canonical tags.
  const { url } = await getSite();

  const routes: MetadataRoute.Sitemap = [
    { url: `${url}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${url}/resume`, changeFrequency: "monthly", priority: 0.8 },
  ];

  // /blog 404s while there are no posts, so it stays out of the sitemap too.
  const posts = getAllPosts();
  if (posts.length > 0) {
    routes.push({
      url: `${url}/blog`,
      changeFrequency: "weekly",
      priority: 0.7,
    });

    for (const post of posts) {
      routes.push({
        url: `${url}/blog/${post.slug}`,
        lastModified: new Date(`${post.date}T00:00:00Z`),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return routes;
}
