export type CoreStackTechnology = {
  name: string;
  href: string;
  emphasis?: "primary" | "secondary";
};

export type CoreStackGroup = {
  id: string;
  technologies: readonly CoreStackTechnology[];
};

export const coreStack = [
  {
    id: "backend",
    technologies: [
      {
        name: "Java",
        href: "/technical-map#backend",
        emphasis: "primary",
      },
      {
        name: "Spring Boot",
        href: "/technical-map#backend",
        emphasis: "primary",
      },
      {
        name: "REST APIs",
        href: "/technical-map#backend",
        emphasis: "secondary",
      },
      {
        name: "Spring Data JPA",
        href: "/technical-map#backend",
      },
      {
        name: "Spring Security",
        href: "/technical-map#backend",
      },
    ],
  },
  {
    id: "software-engineering-architecture",
    technologies: [
      {
        name: "Clean Architecture",
        href: "/technical-map#software-architecture",
        emphasis: "primary",
      },
      {
        name: "SOLID",
        href: "/technical-map#software-engineering",
        emphasis: "secondary",
      },
      {
        name: "Design Patterns",
        href: "/technical-map#software-engineering",
      },
      {
        name: "Clean Code",
        href: "/technical-map#software-engineering",
      },
    ],
  },
  {
    id: "data-persistence",
    technologies: [
      {
        name: "PostgreSQL",
        href: "/technical-map#bancos-de-dados",
        emphasis: "secondary",
      },
      {
        name: "MySQL",
        href: "/technical-map#bancos-de-dados",
      },
      {
        name: "SQL",
        href: "/technical-map#bancos-de-dados",
      },
      {
        name: "JPA / Hibernate",
        href: "/technical-map#backend",
      },
    ],
  },
  {
    id: "frontend",
    technologies: [
      {
        name: "React",
        href: "/technical-map#frontend",
      },
      {
        name: "TypeScript",
        href: "/technical-map#frontend",
      },
      {
        name: "Next.js",
        href: "/technical-map#frontend",
      },
    ],
  },
  {
    id: "cloud-devops",
    technologies: [
      {
        name: "AWS",
        href: "/technical-map#cloud-devops",
        emphasis: "secondary",
      },
      {
        name: "Oracle Cloud Infrastructure",
        href: "/technical-map#cloud-devops",
        emphasis: "secondary",
      },
      {
        name: "Docker",
        href: "/technical-map#cloud-devops",
        emphasis: "secondary",
      },
      {
        name: "CI/CD",
        href: "/technical-map#cloud-devops",
      },
      {
        name: "Linux",
        href: "/technical-map#infraestrutura",
      },
    ],
  },
] as const satisfies readonly CoreStackGroup[];

export type CoreStackId = (typeof coreStack)[number]["id"];
