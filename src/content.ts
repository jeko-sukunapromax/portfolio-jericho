export interface BackgroundEntry {
  title: string;
  organization: string;
  period: string;
  description?: string;
  logo?: string;
  highlights?: string[];
}

export interface PortfolioContent {
  name: string;
  firstName: string;
  github: string;
  instagram: string;
  email: string | null;
  resume: string | null;
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
      "Laravel Sanctum", "Laravel Jetstream", "RBAC", "Apex",
    ],
  },
  {
    id: "databases",
    title: "Databases & Data",
    icon: "database",
    tools: ["SQL", "PostgreSQL", "PostGIS", "SQLite", "Cloudflare D1", "GeoJSON", "Spatial Analysis"],
  },
  {
    id: "cloud",
    title: "Cloud, DevOps & Infra",
    icon: "cloud",
    tools: [
      "Railway", "Salesforce", "Docker", "Docker Compose", "GitHub Actions", "CI/CD Pipelines",
      "Git/GitHub", "Windows Server", "Linux", "Cloudflare Workers", "Wrangler",
      "Vite", "npm", "Composer",
    ],
  },
];

export const profile: PortfolioContent = {
  name: "Jericho Ivan Villamor",
  firstName: "Jericho",
  github: "https://github.com/jeko-sukunapromax",
  instagram: "https://www.instagram.com/jericho.dev",
  email: "villamorjerichoivan@gmail.com",
  resume: null,
  location: null,
  bio: "A little corner of the internet for my work, ideas, and the things I’m building.",
  portrait: "/images/jericho-portrait.webp",
  work: [
    {
      title: "Salesforce Developer Internship (Remote)",
      organization: "SmartBridge",
      period: "2025–2026",
      description:
        "Completed the Salesforce VIP Program, building a foundation in Apex programming, Lightning Web Components (LWC), and core CRM concepts.",
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
      "A Laravel and Livewire mapping platform for barangay profiles, population, land use, facilities, and hazard information. Supports boundary management, spatial analysis, data imports and exports, and role-based administration.",
    tags: ["PHP", "Laravel", "Livewire", "Tailwind CSS", "GeoJSON"],
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
      "Connected audit projects, findings, and recommendation follow-ups in one role-based workflow.",
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
];
