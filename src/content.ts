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
  artwork: "map" | "audit";
  description: string;
  tags: string[];
  highlight: string;
}

export interface PortfolioTool {
  name: string;
  badge: string;
  role: string;
  workflow?: boolean;
}

export const toolkit: PortfolioTool[] = [
  { name: "PHP", badge: "PHP", role: "Application logic" },
  { name: "Laravel", badge: "L", role: "Backend framework" },
  { name: "Livewire", badge: "LW", role: "Reactive interfaces" },
  { name: "Tailwind CSS", badge: "TW", role: "Interface styling" },
  { name: "Vite", badge: "V", role: "Asset builds" },
  { name: "Chart.js", badge: "CH", role: "ATMS visualizations" },
  {
    name: "AI-assisted development",
    badge: "AI",
    role: "Coding and debugging support",
    workflow: true,
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
    artwork: "map",
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
    artwork: "audit",
    description:
      "A Laravel and Livewire audit platform for managing audit projects, findings, and recommendations. Includes office management, role-based permissions, and a Chart.js dashboard for reviewing audit activity.",
    tags: ["PHP", "Laravel", "Livewire", "Tailwind CSS", "Chart.js"],
    highlight:
      "Connected audit projects, findings, and recommendation follow-ups in one role-based workflow.",
  },
];
