import Image from "next/image";

import { siteConfig, socialLinks, studio } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border px-6 py-7 sm:px-10">
      <div className="mx-auto flex max-w-[860px] flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <ul className="flex flex-wrap items-center gap-5 sm:gap-6">
          {socialLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] tracking-[0.04em] text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={studio.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${studio.label}, opens in a new tab`}
              className="flex items-center gap-1.5 text-[11px] tracking-[0.04em] text-muted-foreground transition-colors hover:text-foreground"
            >
              <Image
                src={studio.logo}
                alt=""
                width={13}
                height={13}
                className="[image-rendering:pixelated]"
              />
              {studio.label}
            </a>
          </li>
        </ul>
        <p className="text-[11px] text-muted-foreground">
          &copy; {year} {siteConfig.name}
        </p>
      </div>
    </footer>
  );
}
