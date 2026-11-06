export interface BackgroundEntry {
  title: string;
  organization: string;
  period: string;
  description?: string;
  initials?: string;
  logo?: string;
  highlights?: string[];
}

export interface PortfolioContent {
  name: string;
  firstName: string;
  github: string;
  instagram: string;
  linkedin: string;
  email: string | null;
  location: string | null;
  bio: string;
  portrait: string;
  work: BackgroundEntry[];
  education: BackgroundEntry[];
}

export interface PortfolioProject {
  id: string;
  shortName: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  highlight: string;
}

export interface PortfolioToolGroup {
  id: string;
  title: string;
  icon: "ai" | "frontend" | "backend" | "database" | "cloud";
  tools: string[];
}

export interface PortfolioTrainingCertificate {
  id: string;
  title: string;
  issuer: string;
  issuedOn: string;
  kind: "Program completion" | "Course completion";
}

export const toolkitGroups: PortfolioToolGroup[] = [
  {
    id: "ai-automation",
    title: "AI, Automation & Browser",
    icon: "ai",
    tools: [
      "Claude Code (Advanced)", "Codex", "Antigravity", "n8n",
      "Prompt Engineering", "RAG (Retrieval-Augmented Generation)",
      "Playwright", "chromedp", "Selenium",
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    icon: "frontend",
    tools: [
      "React", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS",
      "Blade", "Livewire", "Leaflet.js", "Chart.js", "Lightning Web Components (LWC)",
    ],
  },
  {
    id: "backend",
    title: "Backend",
    icon: "backend",
    tools: [
      "PHP", "Laravel", "Node.js", "discord.js", "REST APIs", "Webhooks",
      "Express", "Fastify", "EJS", "OAuth 2.0", "IMAP / SMTP", "Vitest",
      "Laravel Sanctum", "Laravel Jetstream", "RBAC", "Apex",
    ],
  },
  {
    id: "databases",
    title: "Databases & Data",
    icon: "database",
    tools: ["SQL", "PostgreSQL", "PostGIS", "Redis", "SQLite", "Cloudflare D1", "GeoJSON", "Spatial Analysis"],
  },
  {
    id: "cloud",
    title: "Cloud, DevOps & Infra",
    icon: "cloud",
    tools: [
      "Railway", "Salesforce", "Docker", "Docker Compose", "GitHub Actions", "CI/CD Pipelines",
      "Git/GitHub", "Windows Server", "Linux", "Cloudflare Workers", "Wrangler",
      "PowerShell", "SSH", "Caddy", "systemd", "Vite", "npm", "pnpm", "Composer",
    ],
  },
];

export const profile: PortfolioContent = {
  name: "Jericho Ivan Villamor",
  firstName: "Jericho",
  github: "https://github.com/jeko-sukunapromax",
  instagram: "https://www.instagram.com/jericho.dev",
  linkedin: "https://www.linkedin.com/in/jericho-villamor-03394237a",
  email: "villamorjerichoivan@gmail.com",
  location: null,
  bio: "Built for the eyes to admire, engineered for the mind to trust.",
  portrait: "/images/jericho-portrait.webp",
  work: [
    {
      title: "Junior Software Engineer",
      organization: "Center Court Capital (US Client · Outsourced)",
      period: "Aug 2026 – Present",
      initials: "CC",
      description: "Email automation, third-party integrations & internal tools",
      highlights: [
        "Maintained the Central Email dashboard, Discord email-automation bot, and connected signup services using Node.js and TypeScript.",
        "Integrated AYCD Inbox and Jancy with internal APIs to retrieve email verification codes and support mailbox workflows.",
        "Improved Discord request approvals, batch processing, progress updates, and cancellation to prevent stuck runs and reduce duplicate messages.",
        "Maintained Lysted sales and remittance reconciliation, including import validation, audit trails, issue tracking, and aging calculations.",
        "Integrated DeepSeek-powered queue analysis with response validation and review controls.",
        "Maintained automated signup workflows with email and SMS verification, batch processing, and progress tracking.",
      ],
    },
    {
      title: "Full Stack Developer",
      organization: "LGU Bayambang (Remote)",
      period: "Jun 2026 – Sep 2026",
      initials: "LB",
      description: "Geographic Information System",
      highlights: [
        "Developed a Geographic Information System for barangay profiles, population, land use, facilities, and hazard information.",
        "Integrated real assessor records with geographic information for Bayambang using PostgreSQL and PostGIS.",
        "Implemented boundary management, spatial analysis, data imports and exports, and role-based administration.",
        "Built the Bayambang Investor Portal as a one-stop shop for browsing property listings, viewing map locations, and submitting and tracking inquiries.",
      ],
    },
    {
      title: "Full Stack Developer",
      organization: "LGU Bayambang",
      period: "Jan 2026 – Jun 2026",
      initials: "LB",
      description: "Audit Tracking Management System",
      highlights: [
        "Helped replace a manual, paper-based audit workflow with a digital Audit Tracking Management System for managing projects, findings, recommendations, and follow-ups.",
        "Helped gather user requirements and translate them into system enhancements.",
      ],
    },
    {
      title: "Salesforce Developer Internship (Remote)",
      organization: "SmartBridge",
      period: "2025–2026",
      initials: "SB",
      highlights: [
        "Completed the Salesforce VIP Program, building a foundation in Apex programming, Lightning Web Components (LWC), and core CRM concepts.",
        "Strengthened cloud solution development by integrating industry-recognized methodologies with practical Salesforce implementation techniques.",
      ],
    },
    {
      title: "Full Stack Developer",
      organization: "Leisure Coast Resort (Philippines)",
      period: "Aug 2024 – Jan 2025",
      initials: "LC",
    },
  ],
  education: [
    {
      title: "Universidad de Dagupan",
      organization: "Bachelor of Science in Information Technology",
      period: "2022–2026",
      logo: "/images/universidad-de-dagupan-logo.jpg",
      highlights: ["Focus on Web & Software Development."],
    },
  ],
};

export const trainingCertificates: PortfolioTrainingCertificate[] = [
  {
    id: "salesforce-vip",
    title: "Salesforce VIP Program",
    issuer: "SmartBridge",
    issuedOn: "2026-06-01",
    kind: "Program completion",
  },
  {
    id: "oracle-sql",
    title: "Database Programming with SQL",
    issuer: "Oracle Academy",
    issuedOn: "2026-05-16",
    kind: "Course completion",
  },
  {
    id: "cisco-enterprise-networking",
    title: "CCNA: Enterprise Networking, Security, and Automation",
    issuer: "Cisco",
    issuedOn: "2025-10-14",
    kind: "Course completion",
  },
  {
    id: "cisco-cybersecurity",
    title: "Introduction to Cybersecurity",
    issuer: "Cisco",
    issuedOn: "2025-05-30",
    kind: "Course completion",
  },
  {
    id: "cisco-switching-routing",
    title: "CCNA: Switching, Routing, and Wireless Essentials",
    issuer: "Cisco",
    issuedOn: "2025-01-22",
    kind: "Course completion",
  },
  {
    id: "cisco-introduction-to-networks",
    title: "CCNA: Introduction to Networks",
    issuer: "Cisco",
    issuedOn: "2024-07-11",
    kind: "Course completion",
  },
];

export const projects: PortfolioProject[] = [
  {
    id: "gis",
    shortName: "GIS",
    title: "Geographic Information System",
    category: "Geospatial platform",
    description:
      "A Laravel and Livewire mapping platform powered by PostgreSQL and PostGIS, combining real assessor records with barangay profiles, population, land use, facilities, and hazard information. Supports boundary management, spatial analysis, data imports and exports, and role-based administration. Includes the Bayambang Investor Portal, a one-stop shop for browsing property listings, viewing map locations, and submitting and tracking inquiries.",
    tags: ["PHP", "Laravel", "Livewire", "PostgreSQL", "PostGIS", "Tailwind CSS", "GeoJSON"],
    highlight:
      "27,000+ data records for Bayambang, organized in one interactive mapping platform.",
  },
  {
    id: "atms",
    shortName: "ATMS",
    title: "Audit Management Platform",
    category: "Audit management",
    description:
      "A Laravel and Livewire audit platform for managing audit projects, findings, and recommendations. Includes office management, role-based permissions, and a Chart.js dashboard for reviewing audit activity.",
    tags: ["PHP", "Laravel", "Livewire", "Tailwind CSS", "Chart.js"],
    highlight:
      "Replaced manual, paper-based audit tracking with a digital workflow for audit projects, findings, and recommendation follow-ups.",
  },
  {
    id: "wedding-invitation",
    shortName: "INVITE",
    title: "Wedding Invitation Website",
    category: "Digital invitation",
    description:
      "An interactive React and Vite wedding invitation with an animated envelope reveal, a live countdown, photo viewing, background music, and an RSVP dialog. Includes calendar downloads and reduced-motion support.",
    tags: ["React", "JavaScript", "CSS", "Vite"],
    highlight:
      "Brought the invitation, countdown, RSVP, and calendar details together in one guest experience.",
  },
  {
    id: "discord-assistant",
    shortName: "BOT",
    title: "Personal Discord Assistant",
    category: "Productivity & automation",
    description:
      "A TypeScript Discord bot for tasks, habit check-ins, scheduled reminders, and ATMS audit updates through slash commands. Includes service monitoring and a daily agenda, with Node.js/SQLite and Cloudflare Workers/D1 deployment options.",
    tags: ["TypeScript", "Node.js", "discord.js", "SQLite", "Cloudflare Workers", "D1"],
    highlight:
      "Connected daily tasks, habit tracking, reminders, and audit deadlines in one Discord workflow.",
  },
  {
    id: "estateagent",
    shortName: "ESTATE",
    title: "EstateAgent",
    category: "AI & property research",
    description:
      "A Next.js and TypeScript workspace for Gemini-powered property research, live browser scraping with Selenium, and GeoJSON assessor-file searches. Includes source citations, listing checks, parcel boundary previews, and research sessions stored locally in SQLite.",
    tags: ["Next.js", "React", "TypeScript", "Gemini AI", "Selenium", "SQLite", "GeoJSON"],
    highlight:
      "Combined online property research, browser automation, and local assessor lookup in one workspace.",
  },
];
