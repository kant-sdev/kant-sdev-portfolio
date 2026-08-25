export type CoreStackTechnology = {
  name: string;
  href: string;
  emphasis?: "primary" | "secondary";
};

export type CoreStackGroup = {
  id: string;
  category: string;
  technologies: readonly CoreStackTechnology[];
};

export const coreStack = [
  {
    id: "backend-software-engineering",
    category: "Backend & Software Engineering",
    technologies: [
      {
        name: "Java",
        href: "/mapa-tecnico#backend",
        emphasis: "primary",
      },
      {
        name: "Spring Boot",
        href: "/mapa-tecnico#backend",
        emphasis: "primary",
      },
      {
        name: "REST APIs",
        href: "/mapa-tecnico#backend",
        emphasis: "secondary",
      },
      {
        name: "Spring Data JPA",
        href: "/mapa-tecnico#backend",
      },
      {
        name: "Spring Security",
        href: "/mapa-tecnico#backend",
      },
    ],
  },
  {
    id: "data-persistence",
    category: "Data & Persistence",
    technologies: [
      {
        name: "PostgreSQL",
        href: "/mapa-tecnico#bancos-de-dados",
        emphasis: "secondary",
      },
      {
        name: "MySQL",
        href: "/mapa-tecnico#bancos-de-dados",
      },
      {
        name: "SQL",
        href: "/mapa-tecnico#bancos-de-dados",
      },
      {
        name: "JPA / Hibernate",
        href: "/mapa-tecnico#backend",
      },
    ],
  },
  {
    id: "frontend",
    category: "Frontend",
    technologies: [
      {
        name: "React",
        href: "/mapa-tecnico#frontend",
      },
      {
        name: "TypeScript",
        href: "/mapa-tecnico#frontend",
      },
      {
        name: "Next.js",
        href: "/mapa-tecnico#frontend",
      },
    ],
  },
  {
    id: "cloud-devops",
    category: "Cloud & DevOps",
    technologies: [
      {
        name: "AWS",
        href: "/mapa-tecnico#cloud-devops",
        emphasis: "secondary",
      },
      {
        name: "Oracle Cloud Infrastructure",
        href: "/mapa-tecnico#cloud-devops",
        emphasis: "secondary",
      },
      {
        name: "Docker",
        href: "/mapa-tecnico#cloud-devops",
        emphasis: "secondary",
      },
      {
        name: "CI/CD",
        href: "/mapa-tecnico#cloud-devops",
      },
      {
        name: "Linux",
        href: "/mapa-tecnico#infraestrutura",
      },
    ],
  },
] as const satisfies readonly CoreStackGroup[];
