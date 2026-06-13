import type { Metadata } from "next";

import { education, jobs, skills, type Job } from "@/lib/resume";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Resume for Patrick Serrano — software engineering, management, marketing technology, design, and systems administration experience.",
  alternates: { canonical: "/resume" },
};

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-5 border-b border-primary pb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
      {children}
    </h2>
  );
}

function JobEntry({ job }: { job: Job }) {
  return (
    <div className="mb-7 last:mb-0">
      <div className="mb-2 flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        <div className="flex min-w-0 flex-wrap items-baseline gap-2">
          <span className="text-[13px] font-bold text-foreground">
            {job.title}
          </span>
          {job.company ? (
            <span className="text-[13px] text-primary">{job.company}</span>
          ) : null}
        </div>
        <span className="shrink-0 whitespace-nowrap text-[11px] text-muted-foreground">
          {job.date}
        </span>
      </div>

      {job.bullets ? (
        <ul className="space-y-1">
          {job.bullets.map((bullet, i) => (
            <li
              key={i}
              className="relative pl-5 text-[12px] leading-[1.7] text-foreground before:absolute before:left-0 before:text-muted-foreground before:content-['—']"
            >
              {bullet}
            </li>
          ))}
        </ul>
      ) : null}

      {job.prose ? (
        <p className="text-[12px] leading-[1.7] text-foreground">{job.prose}</p>
      ) : null}
    </div>
  );
}

export default function ResumePage() {
  return (
    <article aria-labelledby="resume-heading" className="max-w-[680px]">
      <h1
        id="resume-heading"
        className="mb-4 border-b border-border pb-4 text-base font-bold uppercase tracking-[0.06em]"
      >
        Resume
      </h1>

      <p className="mb-12 flex items-center gap-1.5 text-[12px] text-[color:var(--text-secondary,#aaaaaa)] before:text-[11px] before:text-primary before:content-['✉']">
        {siteConfig.email.replace("@", " [at] ")}
      </p>

      <section className="mb-12">
        <SectionHeading>Skills</SectionHeading>
        <p className="text-[12px] leading-[1.85] text-foreground">
          {skills.join(", ")}
        </p>
      </section>

      <section className="mb-12">
        <SectionHeading>Experience</SectionHeading>
        {jobs.map((job, i) => (
          <JobEntry key={`${job.title}-${i}`} job={job} />
        ))}
      </section>

      <section>
        <SectionHeading>Education</SectionHeading>
        <p className="text-[12px] text-foreground">{education}</p>
      </section>
    </article>
  );
}
