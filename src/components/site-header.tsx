"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { navLinks, siteConfig, studio } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-border bg-background px-6 py-5 sm:px-10">
      <Link
        href="/"
        className="text-[13px] font-bold tracking-[0.02em] text-foreground"
      >
        {siteConfig.name}
      </Link>

      <nav aria-label="Primary navigation">
        <ul className="flex flex-wrap items-center gap-5 sm:gap-8">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "text-xs tracking-[0.04em] text-muted-foreground transition-colors hover:text-foreground",
                    active &&
                      "text-foreground underline decoration-1 underline-offset-4",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
          <li>
            <a
              href={studio.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${studio.label}, opens in a new tab`}
              className="flex items-center gap-1.5 whitespace-nowrap text-xs tracking-[0.04em] text-muted-foreground transition-colors hover:text-foreground"
            >
              <Image
                src={studio.logo}
                alt=""
                width={14}
                height={14}
                className="shrink-0 [image-rendering:pixelated]"
              />
              {studio.label}
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
