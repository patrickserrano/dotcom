import type { MetadataRoute } from "next";

import { getAllPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const { url } = siteConfig;

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${url}/`,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${url}/resume`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${url}/blog`,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  const postRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${url}/blog/${post.slug}`,
    lastModified: new Date(`${post.date}T00:00:00Z`),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...postRoutes];
}
