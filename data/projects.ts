import type { Project } from "@/types/projects";

export const projects: Project[] = [
  {
    id: "finvise",
    title: "FinVise",
    slug: "finvise",
    category: "Product · Hackathon · Full Stack",
    description:
      "Plataforma de inteligência financeira que transforma transações e extratos em análises financeiras, recomendações e interações com um agente conversacional.",
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
    category: "Backend · API REST · Java",
    description:
      "API REST para um sistema de fóruns, desenvolvida com Java e Spring Boot, utilizando arquitetura em camadas, persistência de dados e autenticação.",
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
    category: "Backend · Java · API Integration",
    description:
      "Aplicação Java para consulta e gerenciamento de livros e autores, integrando dados de uma API externa e persistindo informações em banco de dados.",
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
];

const featuredProjectSlugs = ["finvise", "forumhub", "literalura"] as const;

export const featuredProjects = featuredProjectSlugs.flatMap((slug) => {
  const project = projects.find((item) => item.slug === slug);

  return project ? [project] : [];
});
