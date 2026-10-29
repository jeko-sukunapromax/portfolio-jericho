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

export const toolkit = [
  { name: "PHP", badge: "PHP", role: "Application logic" },
  { name: "Laravel", badge: "L", role: "Backend framework" },
  { name: "Livewire", badge: "LW", role: "Reactive interfaces" },
  { name: "Tailwind CSS", badge: "TW", role: "Interface styling" },
  { name: "Vite", badge: "V", role: "Asset builds" },
  { name: "Chart.js", badge: "CH", role: "ATMS visualizations" },
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
      "A geographic information system combining interactive maps with barangay profiles, population data, land use, hazard levels, and facility information. Includes boundary management, spatial analysis, data imports and exports, and role-based administration.",
    tags: ["PHP", "Laravel", "Livewire", "Tailwind CSS", "GeoJSON"],
    highlight:
      "Connects barangay information, community facilities, and hazard data with interactive maps.",
  },
  {
    id: "atms",
    shortName: "ATMS",
    title: "Audit Management Platform",
    category: "Audit management",
    artwork: "audit",
    description:
      "An audit management application for organizing audit projects, tracking findings, and following up on recommendations. Includes office management, role-based permissions, and an overview dashboard.",
    tags: ["PHP", "Laravel", "Livewire", "Tailwind CSS", "Chart.js"],
    highlight:
      "Keeps audit projects, findings, and recommendations connected in one workflow.",
  },
];
