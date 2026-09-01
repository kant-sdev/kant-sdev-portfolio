import type { CoreStackId } from "@/data/core-stack";
import type { NavigationId } from "@/data/navigation";
import type { ContactChannel } from "@/data/profile";
import type { ProjectId } from "@/data/projects";
import type { Project } from "@/types/projects";

export const ptBR = {
  navigation: {
    about: "Sobre",
    projects: "Projetos",
    technicalMap: "Mapa Técnico",
    contact: "Contato",
  } satisfies Record<NavigationId, string>,
  common: {
    home: "Início",
    backHome: "Voltar para o início",
    viewProjects: "Ver projetos",
    viewProjectsLabel: "Ver projetos e evidências práticas",
    newTab: " (abre em uma nova aba)",
    technologyContext: (name: string, context: string) => `${name} em ${context}`,
  },
  header: {
    skipContent: "Pular para o conteúdo",
    homeLabel: "Ir para o início",
    navigationLabel: "Navegação principal",
    mobileNavigationLabel: "Navegação principal para dispositivos móveis",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    languageLabel: "Idioma do site",
    portuguese: "Português (Brasil)",
    english: "English",
  },
  hero: {
    role: "Engenheiro de software",
    specialties: "Backend · Nuvem · Arquitetura · Full Stack",
    description:
      "Construção de software com foco em sistemas backend, decisões arquiteturais, infraestrutura em nuvem e integração entre as camadas que sustentam produtos digitais.",
    technicalMap: "Mapa técnico",
    technicalMapLabel: "Explorar o mapa técnico e a profundidade de conhecimento",
    portraitAlt: "Kauã Cantanhede — Engenheiro de software",
    explore: "rolar / explorar",
    introduction: "01 — introdução",
  },
  about: {
    eyebrow: "02 — Sobre",
    title: "Construindo software com visão de sistema.",
    paragraphs: [
      "Minha trajetória em tecnologia começou em redes de computadores e infraestrutura, construindo uma visão que vai além do código e considera as diferentes camadas que fazem um sistema funcionar. Essa base me levou ao desenvolvimento de software e à formação em Análise e Desenvolvimento de Sistemas.",
      "Hoje, venho construindo meu caminho em engenharia de software, com foco no ecossistema Java e Spring, APIs, bancos de dados, arquitetura, computação em nuvem e DevOps. Ao mesmo tempo, mantenho uma visão full stack e exploro diferentes tecnologias para entender como as partes de uma aplicação se conectam.",
      "É nessa interseção entre software, arquitetura e infraestrutura que venho concentrando meus projetos. Computação em nuvem, automação e inteligência artificial complementam essa base, enquanto a prática transforma conhecimento em soluções cada vez mais coesas.",
    ],
    credentials: "Credenciais",
    certifications: "Certificações",
    achievements: "Conquistas",
    programs: "Programas",
    openCredential: (title: string) => `Abrir credencial oficial: ${title}`,
  },
  coreStack: {
    eyebrow: "03 — Stack principal",
    title: "Tecnologias principais",
    description:
      "As tecnologias que utilizo para construir aplicações, integrando backend, dados, frontend e infraestrutura.",
    explore: "Explorar mapa técnico",
    categories: {
      backend: "Backend",
      "software-engineering-architecture": "Engenharia de Software e Arquitetura",
      "data-persistence": "Dados e persistência",
      frontend: "Desenvolvimento frontend",
      "cloud-devops": "Nuvem e DevOps",
    } satisfies Record<CoreStackId, string>,
  },
  projects: {
    eyebrow: "04 — Projetos",
    title: "Projetos que representam minha evolução em engenharia de software.",
    viewAll: "Ver todos os projetos",
    viewProject: "Ver projeto",
    preview: "Prévia do projeto",
    previewAlt: (title: string) => `Prévia do projeto ${title}`,
    previewPlaceholder: (title: string) => `Área preparada para a prévia do projeto ${title}`,
    technologies: (title: string) => `Tecnologias principais de ${title}`,
    empty: "Nenhum projeto publicado por enquanto.",
    carousel: {
      label: "Projetos em destaque",
      role: "carrossel",
      slideRole: "slide",
      select: "Selecionar projeto",
      previous: "Projeto anterior",
      next: "Próximo projeto",
      announcement: (title: string, position: number, total: number) =>
        `Projeto ${title}, ${position} de ${total}`,
      slideLabel: (title: string, position: number, total: number) =>
        `${position} de ${total}: ${title}`,
      goTo: (title: string, position: number) => `Ir para o projeto ${position}: ${title}`,
    },
    items: {
      finvise: {
        category: "Produto · Hackathon · Full Stack",
        description:
          "Plataforma de inteligência financeira que transforma transações e extratos em análises financeiras, recomendações e interações com um agente conversacional.",
      },
      forumhub: {
        category: "Backend · API REST · Java",
        description:
          "API REST para um sistema de fóruns, desenvolvida com Java e Spring Boot, utilizando arquitetura em camadas, persistência de dados e autenticação.",
      },
      literalura: {
        category: "Backend · Java · Integração com API",
        description:
          "Aplicação Java para consulta e gerenciamento de livros e autores, integrando dados de uma API externa e persistindo informações em banco de dados.",
      },
    } satisfies Record<ProjectId, Pick<Project, "category" | "description">>,
  },
  contact: {
    eyebrow: "05 — Contato",
    title: "Vamos conversar.",
    description:
      "Seja para uma oportunidade profissional, um projeto ou uma ideia que vale a pena explorar, estou aberto a novas conversas.",
    connect: "Conecte-se",
    connectDescription: "Encontre-me também por aqui.",
    channels: {
      github: "GitHub",
      linkedin: "LinkedIn",
      email: "E-mail",
    } satisfies Record<ContactChannel, string>,
    form: {
      title: "Envie uma mensagem",
      name: "Nome",
      email: "E-mail",
      message: "Mensagem",
      namePlaceholder: "Seu nome",
      emailPlaceholder: "seu@email.com",
      messagePlaceholder: "Como posso ajudar?",
      submit: "Enviar mensagem",
      submitting: "Enviando...",
      success: "Mensagem enviada. Obrigado pelo contato.",
      error: "Não foi possível enviar agora. Tente novamente ou use um dos canais ao lado.",
      unavailable: "O envio direto ainda não está integrado. Use um dos canais ao lado.",
      validation: {
        nameRequired: "Informe seu nome.",
        emailRequired: "Informe seu e-mail.",
        messageRequired: "Conte brevemente como posso ajudar.",
        emailInvalid: "Informe um e-mail válido.",
      },
    },
  },
  footer: {
    importantLinks: "Links importantes",
    importantLinksLabel: "Links importantes do rodapé",
    social: "Redes sociais",
    noSocialLinks: "Links ainda não publicados.",
    other: "Outros",
    otherLinksLabel: "Outros links do rodapé",
    copyright: "Direitos autorais",
  },
  notFound: {
    eyebrow: "404 / Página não encontrada",
    title: "Essa página não existe.",
    description: "O endereço solicitado não corresponde a nenhum recurso disponível neste portfólio.",
  },
  projectPage: {
    title: "Projeto não encontrado",
    description: "Este projeto ainda não possui uma página disponível.",
  },
  technicalMap: {
    eyebrow: "Em construção",
    title: "Mapa Técnico",
    description: "Esta página está sendo construída e estará disponível em breve.",
  },
  trajectory: {
    title: "Trajetória",
    empty: "Nenhum marco publicado por enquanto.",
  },
  metadata: {
    home: { title: "kant-sdev | Portfólio", description: "Portfólio profissional de kant-sdev." },
    projects: { title: "Projetos | kant-sdev", description: "Projetos de engenharia de software de kant-sdev." },
    project: { title: "Projeto | kant-sdev", description: "Detalhes de um projeto de engenharia de software de kant-sdev." },
    technicalMap: { title: "Mapa Técnico | kant-sdev", description: "Tecnologias e competências de engenharia de software de kant-sdev." },
    trajectory: { title: "Trajetória | kant-sdev", description: "Formação, experiências e trajetória profissional de kant-sdev." },
    notFound: { title: "404 — Página não encontrada | Kant Cantanhede", description: "A página solicitada não foi encontrada." },
  },
};

export type Dictionary = typeof ptBR;
