import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getNavLinks, getSite } from "@/lib/site-server";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();

  return {
    // Per-domain, so the relative `alternates.canonical` on each page resolves
    // to that domain — each host canonicalises to itself.
    metadataBase: new URL(site.url),
    title: {
      default: site.title,
      template: `%s | ${site.name}`,
    },
    description: site.description,
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: site.title,
      description: site.description,
      url: "/",
    },
    twitter: {
      card: "summary",
      title: site.title,
      description: site.description,
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#0d0d0d",
  colorScheme: "dark",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const site = await getSite();
  const navLinks = getNavLinks();

  return (
    <html lang="en" className="dark h-full">
      <body className="flex min-h-full flex-col">
        <SiteHeader siteName={site.name} navLinks={navLinks} />
        <main className="mx-auto w-full max-w-[860px] flex-1 px-6 py-12 sm:px-10 sm:py-18">
          {children}
        </main>
        <SiteFooter siteName={site.name} />
        <Analytics />
      </body>
    </html>
  );
}
