/**
 * The site is served from two domains while the name change is in progress:
 * the established patrickserrano.com and the new patrickpowers.dev. Both serve
 * identical content apart from the surname, and each canonicalises to itself
 * so the two stay independently indexed.
 *
 * This module is isomorphic — client components import it — so it must not
 * touch `headers()` or read private env vars. Host resolution and anything
 * server-only lives in `site-server.ts`.
 */

export type SiteVariant = "serrano" | "powers";

const VARIANTS = {
  serrano: { surname: "Serrano", host: "patrickserrano.com" },
  powers: { surname: "Powers", host: "patrickpowers.dev" },
} as const satisfies Record<SiteVariant, { surname: string; host: string }>;

/** Used for unrecognised hosts: Vercel preview URLs, localhost, bare IPs. */
export const DEFAULT_VARIANT: SiteVariant = "serrano";

export type SiteConfig = {
  variant: SiteVariant;
  surname: string;
  name: string;
  title: string;
  description: string;
  resumeDescription: string;
  host: string;
  url: string;
  email: string;
  themeColor: string;
};

export function siteConfigFor(variant: SiteVariant): SiteConfig {
  const { surname, host } = VARIANTS[variant];
  const name = `Patrick ${surname}`;

  return {
    variant,
    surname,
    name,
    title: name,
    description: `${name} is a software engineer and creative technologist with experience across engineering, management, design, and systems work.`,
    resumeDescription: `Resume for ${name} — software engineering, management, marketing technology, design, and systems administration experience.`,
    host,
    url: `https://${host}`,
    // Contact and social accounts stay on the old name until those accounts
    // are themselves renamed, so they are shared by both variants.
    email: "hello@patrickserrano.com",
    themeColor: "#0d0d0d",
  };
}

/**
 * Pick a variant from a request Host header. Matches on the "patrickpowers"
 * label rather than the exact host so www., :port, and *.localhost aliases all
 * resolve during local development.
 */
export function resolveSiteVariant(host: string | null | undefined): SiteVariant {
  const hostname = (host ?? "").split(":")[0].toLowerCase();
  return hostname.includes("patrickpowers") ? "powers" : DEFAULT_VARIANT;
}

/** External social links rendered in the footer. Shared by both variants. */
export const socialLinks = [
  { href: "https://github.com/patrickserrano", label: "GitHub" },
  { href: "https://www.linkedin.com/in/patrickserrano", label: "LinkedIn" },
  { href: "https://mastodon.social/@patrickgpowers", label: "Mastodon" },
  { href: "https://instagram.com/patrickserrano", label: "Instagram" },
] as const;

export const studio = {
  href: "https://pixelfoxstudio.com",
  label: "Pixel Fox Studio",
  logo: "/img/pixelfox_logo.png",
} as const;

export type NavLink = { href: string; label: string };
