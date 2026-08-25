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

  technologies: ProjectTechnology[];

  image?: string;

  github?: string;
  demo?: string;
}
