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
