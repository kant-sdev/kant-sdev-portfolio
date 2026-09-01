export type ProjectStatus =
  | "production"
  | "development"
  | "restructuring"
  | "completed";

export interface ProjectTechnology {
  name: string;
  href?: string;
  featured?: boolean;
}

export interface Project {
  id: string;

  title: string;
  slug: string;
  category: string;

  description: string;

  status?: ProjectStatus;

  technologies: readonly ProjectTechnology[];

  image?: string;

  github?: string;
  demo?: string;
}

export type ProjectDefinition = Omit<Project, "category" | "description">;
