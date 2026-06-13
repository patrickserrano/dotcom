export type Job = {
  title: string;
  company?: string;
  date: string;
  bullets?: string[];
  prose?: string;
};

export const skills = [
  "C#",
  ".NET Core",
  ".NET Framework",
  "TypeScript",
  "JavaScript",
  "SQL",
  "Python",
  "React",
  "Next.js",
  "HTML",
  "CSS",
  "Go",
  "Team Management",
  "Project Management",
  "Microsoft Azure",
  "Google Cloud Platform",
  "Elasticsearch",
  "Kubernetes",
  "MongoDB",
  "MSBuild",
  "TeamCity",
  "GitHub",
  "Perforce",
  "PowerShell",
  "Claude Code",
  "Codex",
  "Photoshop",
  "Illustrator",
  "InDesign",
  "Acrobat",
  "Microsoft Office",
  "Pageflex",
];

export const jobs: Job[] = [
  {
    title: "Associate Lead Software Engineer",
    company: "Rockstar Games",
    date: "2025–Present",
    bullets: ["Managed team of 6 engineers and 2 UX designers"],
  },
  {
    title: "Senior Software Engineer",
    company: "Rockstar Games",
    date: "2024–2025",
    bullets: ["Senior full-stack software engineer"],
  },
  {
    title: "Software Engineer",
    company: "Rockstar Games",
    date: "2022–2023",
    bullets: ["Full-stack software engineer"],
  },
  {
    title: "Software Engineer",
    company: "automotiveMastermind",
    date: "2020–2022",
    bullets: [
      "Built marketing software and technology for use across the organization",
      "Launched a major new technology initiative to deliver a wholistic marketing platform",
    ],
  },
  {
    title: "Manager, Marketing Development",
    company: "automotiveMastermind",
    date: "2018–2020",
    bullets: [
      "Managed agile marketing development team responsible for delivering over $30M of client marketing annually across direct mail and email channels",
      "Optimized supply and production chains to lower costs and maximize margins",
      "Established collaborative workflows with vendor partners using source control, CI/CD pipelines, and vendor API integrations",
      "Built and maintained Python-based marketing automation web application to streamline team workflow",
      "Established toolchain for complex variable email templates using MJML, TypeScript, and Handlebars.js",
      "Built automated CI/CD pipelines using Azure Pipelines for internal applications",
      "Automated manual processes to increase visibility, accountability, and reliability",
      "Functioned as Product Owner and Scrum Master, writing features and user stories and coordinating ceremonies",
      "Worked with Product Manager to plan and prioritize feature work and balance tech debt with company roadmap",
    ],
  },
  {
    title: "Predictive Marketing Production Manager",
    company: "automotiveMastermind",
    date: "2017–2018",
    bullets: [
      "Oversaw implementation of all new marketing campaigns",
      "Managed day-to-day operations of the Predictive Marketing technical team",
      "Refactored existing code for better stability and performance",
      "Identified opportunities for process automation and built supporting tools",
      "Developed and implemented educational opportunities to improve the team's technical skills",
    ],
  },
  {
    title: "Variable Data Developer",
    company: "automotiveMastermind",
    date: "2017",
    bullets: [
      "Created highly complex print templates for customer marketing activities",
      "Wrote and maintained business logic in JavaScript",
      "Developed and maintained variable copy, image, and template libraries",
      "Managed print house and design vendors",
    ],
  },
  {
    title: "Director of Technical Services",
    company: "nuyu",
    date: "2016–2017",
    bullets: [
      "Managed technical systems — hardware, inventory management, communications",
      "Oversaw marketing design team across all advertising and social campaigns",
      "Launched, managed, and maintained wearnuyu.com, creating a direct-to-customer revenue stream",
      "Managed all Houston, TX warehouse operations remotely from New York",
    ],
  },
  {
    title: "Communications Consultant",
    company: "East End Seaport Museum",
    date: "2015–2016",
    bullets: [
      "Developed and managed marketing campaigns that cross-promoted events to maximize exposure",
      "Designed official branding assets and print collateral",
      "Built and maintained two websites, incorporating e-commerce and event information",
    ],
  },
  {
    title: "Micro Computer Repair Technician",
    company: "Greenport UFSD",
    date: "2014–2016",
    prose:
      "Primary technician for district-wide helpdesk in a mixed-platform environment. Re-implemented 1:1 iPad program using DEP and MDM for zero-touch app deployment. Managed internal network and worked with vendors to upgrade infrastructure. Built internal video surveillance system. Deployed WordPress on LEMP stack for the district website and digital signage.",
  },
  {
    title: "IT Administrator / Consultant",
    company: "New Suffolk Common School",
    date: "2012–Present",
    prose:
      "Formalized and implemented a technology plan and budget for the district. Implemented a 1:1 iPad program while transitioning staff from PCs to Macs. Built a new website focused on community communications.",
  },
  {
    title: "Production Manager",
    company: "Amereon Ltd",
    date: "2010–Present",
    prose:
      "Grew from junior designer to head of all production, overseeing manufacturing, quality control, and design projects. Managed vendor listings on Amazon Vendor Central, photographed book covers, and maintained production schedules.",
  },
  {
    title: "Freelance Web / Print Design & Consulting",
    date: "2010–Present",
    prose:
      "Partnered with local businesses and nonprofits to build maintainable web presences using Squarespace, MailChimp, Google Workspace, and Twilio.",
  },
];

export const education = "Full Sail University — BS Graphic Design, 2013";
