import { content } from "@/data/i18n";
import { defaultLocale, type Locale } from "@/lib/i18n/config";
import type { Project, ProjectDefinition } from "@/types/projects";

export const projects = [
  {
    id: "finvise",
    title: "FinVise",
    slug: "finvise",
    technologies: [
      { name: "Java", featured: true },
      { name: "Spring Boot", featured: true },
      { name: "React", featured: true },
      { name: "TypeScript" },
      { name: "PostgreSQL", featured: true },
      { name: "Python" },
      { name: "FastAPI" },
      { name: "Docker", featured: true },
      { name: "OCI" },
    ],
    github:
      "https://github.com/No-Country-simulation/G9-BR-Team-17-FinVise",
  },
  {
    id: "forumhub",
    title: "FórumHub",
    slug: "forumhub",
    technologies: [
      { name: "Java", featured: true },
      { name: "Spring Boot", featured: true },
      { name: "Spring Data JPA" },
      { name: "Spring Security", featured: true },
      { name: "JWT", featured: true },
      { name: "PostgreSQL", featured: true },
    ],
    github: "https://github.com/kant-sdev/challenge-forumhub-alura-one",
  },
  {
    id: "literalura",
    title: "LiterAlura",
    slug: "literalura",
    technologies: [
      { name: "Java", featured: true },
      { name: "Spring Boot", featured: true },
      { name: "Spring Data JPA", featured: true },
      { name: "PostgreSQL", featured: true },
      { name: "HTTP", featured: true },
      { name: "JSON" },
    ],
    github: "https://github.com/kant-sdev/challenge-literalura-java",
  },
] as const satisfies readonly ProjectDefinition[];

export type ProjectId = (typeof projects)[number]["id"];

const featuredProjectSlugs = ["finvise", "forumhub", "literalura"] as const;

export const featuredProjects = featuredProjectSlugs.flatMap((slug) => {
  const project = projects.find((item) => item.slug === slug);

  return project ? [project] : [];
});

export function getProjects(locale: Locale = defaultLocale): Project[] {
  return projects.map((project) => ({
    ...project,
    ...content[locale].projects.items[project.id],
  }));
}

export function getFeaturedProjects(locale: Locale = defaultLocale): Project[] {
  return featuredProjects.map((project) => ({
    ...project,
    ...content[locale].projects.items[project.id],
  }));
}
