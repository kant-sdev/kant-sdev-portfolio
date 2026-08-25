import { Project } from "./projects";
import { Skill } from "./skills";
import type { TimelineItem } from "./timeline";

export interface Profile {
  name: string;
  role: string;
  headline: string;

  location?: string;

  bio: string;

  email?: string;

  github?: string;
  linkedin?: string;
  website?: string;
}

export interface PortfolioData {
  profile: Profile;

  skills: Skill[];

  projects: Project[];

  timeline: TimelineItem[];
}