import type { MetadataRoute } from "next";

import { getSite } from "@/lib/site-server";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const { url } = await getSite();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${url}/sitemap.xml`,
  };
}
