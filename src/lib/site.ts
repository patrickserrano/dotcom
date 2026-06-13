export const siteConfig = {
  name: "Patrick Serrano",
  title: "Patrick Serrano",
  description:
    "Patrick Serrano is a software engineer and creative technologist with experience across engineering, management, design, and systems work.",
  // Used for absolute URLs in metadata, sitemap, and OG tags.
  url: "https://patrickserrano.com",
  email: "hello@patrickserrano.com",
  themeColor: "#0d0d0d",
} as const;

/** Primary nav links rendered in the site header. */
export const navLinks = [
  { href: "/", label: "About" },
  { href: "/resume", label: "Resume" },
  { href: "/blog", label: "Blog" },
] as const;

/** External social links rendered in the footer. */
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
