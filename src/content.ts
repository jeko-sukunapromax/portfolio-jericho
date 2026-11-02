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
  theme: "map" | "audit" | "wedding";
  description: string;
  tags: string[];
  highlight: string;
}

export interface PortfolioToolGroup {
  id: string;
  title: string;
  icon: "ai" | "frontend" | "backend" | "mapping" | "database" | "build";
  tools: string[];
}

export const toolkitGroups: PortfolioToolGroup[] = [
  {
    id: "ai-workflow",
    title: "AI & Development Workflow",
    icon: "ai",
    tools: ["AI-assisted Development", "Coding Support", "Debugging"],
  },
  {
    id: "frontend",
    title: "Frontend",
    icon: "frontend",
    tools: ["React", "TypeScript", "JavaScript", "Tailwind CSS", "HTML", "CSS"],
  },
  {
    id: "backend",
    title: "Backend & Frameworks",
    icon: "backend",
    tools: ["PHP", "Laravel", "Livewire", "Blade", "REST APIs"],
  },
  {
    id: "mapping",
    title: "Mapping & Visualization",
    icon: "mapping",
    tools: ["Leaflet.js", "GeoJSON", "Chart.js", "Spatial Analysis"],
  },
  {
    id: "databases",
    title: "Databases & Auth",
    icon: "database",
    tools: ["PostgreSQL", "PostGIS", "Laravel Sanctum", "Laravel Jetstream", "RBAC"],
  },
  {
    id: "build",
    title: "Build & Version Control",
    icon: "build",
    tools: ["Vite", "npm", "Composer", "Git", "GitHub"],
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
    theme: "map",
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
    theme: "audit",
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
    theme: "wedding",
    description:
      "An interactive React and Vite wedding invitation with an animated envelope reveal, a live countdown, photo viewing, background music, and an RSVP dialog. Includes calendar downloads and reduced-motion support.",
    tags: ["React", "JavaScript", "CSS", "Vite"],
    highlight:
      "Brought the invitation, countdown, RSVP, and calendar details together in one guest experience.",
  },
];
