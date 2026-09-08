import Image from "next/image";

import { getSite } from "@/lib/site-server";

export default async function HomePage() {
  const site = await getSite();

  return (
    <section
      aria-labelledby="intro-heading"
      className="grid grid-cols-1 gap-10 sm:grid-cols-[220px_1fr] sm:gap-16"
    >
      <div>
        <Image
          src="/img/me.jpg"
          alt={site.name}
          width={220}
          height={220}
          priority
          className="h-[130px] w-[130px] border border-border object-cover sm:h-[220px] sm:w-[220px]"
        />
      </div>

      <div>
        <h1
          id="intro-heading"
          className="mb-2 text-xl font-bold leading-snug text-foreground"
        >
          Associate Lead Software Engineer.
        </h1>
        <p className="mb-7 text-[13px] text-muted-foreground">
          Builder of things. Manager of people.
        </p>

        <div className="space-y-4 text-[13px] leading-[1.75] text-foreground">
          <p>
            I&apos;ve spent a lot of time filling different roles, most recently
            as an Associate Lead Software Engineer.
          </p>
          <p>
            In the past I&apos;ve worked as a people manager, engineering
            manager, marketing strategist, communications consultant, designer,
            systems administrator, production manager and more. These different
            roles have been valuable learning experiences for me, but through
            them all I&apos;ve come to realize that I&apos;m particularly good at
            managing projects. Having a background in both the technical and the
            creative gives me a unique perspective to bridge the gap between
            teams and push to achieve the best possible results.
          </p>
          <p>
            Outside of work, music is my passion. I&apos;m constantly looking for
            the next great band, or relaxing with my favorite{" "}
            <a
              href="https://www.discogs.com/user/hXcpat/collection"
              className="text-primary underline decoration-1 underline-offset-[3px] transition-colors hover:text-foreground"
            >
              record
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
