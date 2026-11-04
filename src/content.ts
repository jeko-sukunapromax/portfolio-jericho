export interface BackgroundEntry {
  title: string;
  organization: string;
  period: string;
  description: string;
}

export interface PortfolioContent {
  name: string;
  firstName: string;
  github: string;
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

export const toolkitGroups: PortfolioToolGroup[] = [
  {
    id: "ai-automation",
    title: "AI, Automation & Browser",
    icon: "ai",
    tools: [
      "Claude Code (Advanced)", "Codex", "Antigravity", "n8n",
      "Prompt Engineering", "Playwright", "chromedp", "Selenium",
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    icon: "frontend",
    tools: [
      "React", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS",
      "Blade", "Livewire", "Leaflet.js", "Chart.js",
    ],
  },
  {
    id: "backend",
    title: "Backend",
    icon: "backend",
    tools: [
      "PHP", "Laravel", "Node.js", "discord.js", "REST APIs",
      "Laravel Sanctum", "Laravel Jetstream", "RBAC",
    ],
  },
  {
    id: "databases",
    title: "Databases & Data",
    icon: "database",
    tools: ["PostgreSQL", "PostGIS", "SQLite", "Cloudflare D1", "GeoJSON", "Spatial Analysis"],
  },
  {
    id: "cloud",
    title: "Cloud, DevOps & Infra",
    icon: "cloud",
    tools: [
      "Railway", "Docker", "Docker Compose", "GitHub Actions", "CI/CD Pipelines",
      "Git/GitHub", "Windows Server", "Linux", "Cloudflare Workers", "Wrangler",
      "Vite", "npm", "Composer",
    ],
  },
];

export const profile: PortfolioContent = {
  name: "Jericho Ivan Villamor",
  firstName: "Jericho",
  github: "https://github.com/jeko-sukunapromax",
  email: null,
  location: null,
  bio: "A little corner of the internet for my work, ideas, and the things I’m building.",
  portrait: "/images/jericho-portrait.webp",
  work: [],
  education: [],
};

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
      "Unified barangay profiles, facility information, and hazard data in one interactive mapping workflow.",
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
