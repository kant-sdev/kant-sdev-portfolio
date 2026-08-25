export type SkillLevel =
  | "studied"
  | "project"
  | "professional"
  | "certified"
  | "learning";

export interface Skill {
  id: string;
  name: string;

  macroArea: string;
  category: string;

  description?: string;

  level: SkillLevel;

  projectIds: string[];
  certificateIds?: string[];

  icon?: string;
}