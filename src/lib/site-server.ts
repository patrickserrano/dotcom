import "server-only";

import { headers } from "next/headers";

import { getAllPosts } from "@/lib/blog";
import {
  resolveSiteVariant,
  siteConfigFor,
  type NavLink,
  type SiteConfig,
  type SiteVariant,
} from "@/lib/site";

/**
 * Resolve the site variant for the current request.
 *
 * Reading the Host header opts every route into dynamic rendering — the
 * deliberate cost of serving both domains from a single deployment.
 *
 * SITE_VARIANT forces a variant regardless of host, which is how you preview
 * the Powers build locally (`SITE_VARIANT=powers npm run dev`).
 */
export async function getSite(): Promise<SiteConfig> {
  const override = process.env.SITE_VARIANT;
  if (override === "powers" || override === "serrano") {
    return siteConfigFor(override satisfies SiteVariant);
  }

  return siteConfigFor(resolveSiteVariant((await headers()).get("host")));
}

/** True when at least one post is publishable in this environment. */
export function hasPosts(): boolean {
  return getAllPosts().length > 0;
}

/**
 * Primary nav. Blog is listed only once a post exists — an empty blog is
 * hidden from the nav, absent from the sitemap, and 404s if requested.
 */
export function getNavLinks(): NavLink[] {
  const links: NavLink[] = [
    { href: "/", label: "About" },
    { href: "/resume", label: "Resume" },
  ];

  if (hasPosts()) {
    links.push({ href: "/blog", label: "Blog" });
  }

  return links;
}
