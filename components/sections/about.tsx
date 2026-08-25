"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "motion/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const aboutSequence: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.04,
      staggerChildren: 0.08,
    },
  },
};

const revealContent: Variants = {
  hidden: {
    opacity: 0,
    y: 15,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.48,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const revealSidebar: Variants = {
  hidden: {
    opacity: 0,
    x: 15,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      delay: 0.16,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const credentialSequence: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.12,
      staggerChildren: 0.07,
    },
  },
};

const revealCredential: Variants = {
  hidden: {
    opacity: 0,
    y: 8,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

type Credential = {
  badge: string;
  badgeAlt: string;
  title: string;
  subtitle?: string;
  date?: string;
  href: string;
  prominence: "primary" | "secondary";
};

const certifications: Credential[] = [
  {
    badge: "/oci-2026.jpg",
    badgeAlt: "Oracle Cloud Infrastructure Foundations Associate 2026",
    title: "Oracle Cloud Infrastructure",
    subtitle: "Certified Foundations Associate",
    date: "2026",
    href: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=94B585351608FEF834BA7BAF5A750EAB82ECA4BFD1EC9EBC10AB53765CC95BE3",
    prominence: "primary",
  },
  {
    badge: "/oci-2025.jpeg",
    badgeAlt: "Oracle Cloud Infrastructure Foundations Associate 2025",
    title: "Oracle Cloud Infrastructure",
    subtitle: "Certified Foundations Associate",
    date: "2025",
    href: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=954CE58E5E42C068276DB62617F1481321E6CD3F5B9347F8F0DCF69FF930ABB8",
    prominence: "primary",
  },
];

// const programs = [
//   { title: "Oracle Next Education", detail: "G9 · Tech Foundation" },
//   { title: "Oracle Next Education", detail: "G10 · AI for Tech" },
// ] as const;

const achievements: Credential[] = [
  {
    badge: "/oracle-java-foundations.png",
    badgeAlt: "Oracle Java Foundations",
    title: "Oracle Java Foundations",
    href: "https://mylearn.oracle.com/ou/learning-path/oracle-java-foundations/79726",
    prominence: "secondary",
  },
  {
    badge: "/oracle-java-explorer.png",
    badgeAlt: "Oracle Java Foundations Training and Assessment",
    title: "Oracle Java Foundations: Training and Assessment",
    href: "https://mylearn.oracle.com/ou/learning-path/oracle-java-foundations-training-and-assessment/152239",
    prominence: "secondary",
  },
];

const ctaBaseStyles = "inline-flex min-h-11 w-full mt-5 items-center justify-center rounded-sm px-5 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-auto";
function CredentialItem({
  badge,
  badgeAlt,
  title,
  subtitle,
  date,
  href,
  prominence,
}: Credential) {
  const isPrimary = prominence === "primary";

  return (
    <motion.li variants={revealCredential} className="py-7 first:pt-0 last:pb-0">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Abrir credencial oficial: ${title}`}
        className="group block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
      >
        <Image
          src={badge}
          alt={badgeAlt}
          width={552}
          height={276}
          sizes={
            isPrimary
              ? "(max-width: 1023px) 304px, 272px"
              : "(max-width: 1023px) 176px, 160px"
          }
          className={`h-auto object-contain ${isPrimary
              ? "w-full max-w-[19rem] lg:max-w-[17rem]"
              : "w-full max-w-44 lg:max-w-40"
            }`}
        />

        <div className={isPrimary ? "mt-5" : "mt-4"}>
          <h5 className="text-sm leading-6 font-semibold text-foreground transition-colors group-hover:text-foreground/75">
            {title}
          </h5>
          {subtitle ? (
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              {subtitle}
            </p>
          ) : null}
          {date ? (
            <p className="mt-2 text-[0.7rem] leading-5 font-medium tracking-[0.12em] text-muted-foreground uppercase">
              {date}
            </p>
          ) : null}
        </div>
      </a>
    </motion.li>
  );
}

export function About() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      id="about"
      aria-labelledby="about-title"
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={aboutSequence}
      className="scroll-mt-14 border-t border-border/70"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,1.7fr)_minmax(17rem,0.75fr)] lg:gap-16 xl:gap-24">
          <motion.div variants={aboutSequence} className="min-w-0">
            <motion.p
              variants={revealContent}
              className="text-xs font-semibold tracking-[0.18em] text-foreground uppercase"
            >
              About
            </motion.p>

            <motion.h2
              id="about-title"
              variants={revealContent}
              className="mt-5 max-w-4xl text-[clamp(2.25rem,4.5vw,4.5rem)] leading-[0.98] font-semibold tracking-[-0.06em] text-balance text-foreground"
            >
              Construindo software com visão de sistema.
            </motion.h2>

            <motion.div
              variants={revealContent}
              className="mt-10 max-w-3xl space-y-6 text-sm leading-7 text-pretty text-muted-foreground sm:mt-12 sm:text-base sm:leading-8"
            >
              <p>
                Minha trajetória em tecnologia começou em redes de computadores e
                infraestrutura, construindo uma visão que vai além do código e considera
                as diferentes camadas que fazem um sistema funcionar. Essa base me levou
                ao desenvolvimento de software e à formação em Análise e Desenvolvimento
                de Sistemas.
              </p>

              <p>
                Hoje, venho construindo meu caminho em engenharia de software, com foco no
                ecossistema Java e Spring, APIs, bancos de dados, arquitetura, cloud e
                DevOps. Ao mesmo tempo, mantenho uma visão full stack e exploro diferentes
                tecnologias para entender como as partes de uma aplicação se conectam.
              </p>

              <p>
                É nessa interseção entre software, arquitetura e infraestrutura que venho
                concentrando meus projetos. Cloud, automação e inteligência artificial
                complementam essa base, enquanto a prática transforma conhecimento em
                soluções cada vez mais coesas.
              </p>
            </motion.div>
            <Link
                href="/#projects"
                aria-label="Ver projetos e evidências práticas"
                className={`${ctaBaseStyles} gap-2 bg-foreground text-background hover:bg-foreground/85`}
              >
                Ver projetos
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
          </motion.div>

          <motion.aside
            aria-labelledby="credentials-title"
            variants={revealSidebar}
            className="border-t border-border/70 pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10 xl:pl-14"
          >
            <h3
              id="credentials-title"
              className="text-xs font-semibold tracking-[0.18em] text-foreground uppercase"
            >
              Credentials
            </h3>

            <div className="mt-10 space-y-12">
              <section aria-labelledby="credentials-certifications-title">
                <h4
                  id="credentials-certifications-title"
                  className="border-b border-border/70 pb-3 text-[0.7rem] font-semibold tracking-[0.16em] text-muted-foreground uppercase"
                >
                  Certifications
                </h4>
                <motion.ol
                  variants={credentialSequence}
                  className="mt-7 divide-y divide-border/70"
                >
                  {certifications.map((certification) => (
                    <CredentialItem
                      key={`${certification.title}-${certification.date}`}
                      {...certification}
                    />
                  ))}
                </motion.ol>
              </section>

              {/* <section aria-labelledby="credentials-programs-title">
                <h4
                  id="credentials-programs-title"
                  className="border-b border-border/70 pb-3 text-[0.7rem] font-semibold tracking-[0.16em] text-muted-foreground uppercase"
                >
                  Programs
                </h4>
                <motion.ul
                  variants={credentialSequence}
                  className="mt-2 divide-y divide-border/70"
                >
                  {programs.map((program) => (
                    <motion.li
                      key={program.detail}
                      variants={revealCredential}
                      className="py-5"
                    >
                      <h5 className="text-sm leading-6 font-semibold text-foreground">
                        {program.title}
                      </h5>
                      <p className="mt-1 text-[0.7rem] leading-5 font-medium tracking-[0.12em] text-muted-foreground uppercase">
                        {program.detail}
                      </p>
                    </motion.li>
                  ))}
                </motion.ul>
              </section> */}

              <section aria-labelledby="credentials-achievements-title">
                <h4
                  id="credentials-achievements-title"
                  className="border-b border-border/70 pb-3 text-[0.7rem] font-semibold tracking-[0.16em] text-muted-foreground uppercase"
                >
                  Achievements
                </h4>
                <motion.ol
                  variants={credentialSequence}
                  className="mt-7 divide-y divide-border/70"
                >
                  {achievements.map((achievement) => (
                    <CredentialItem key={achievement.title} {...achievement} />
                  ))}
                </motion.ol>
              </section>
            </div>
          </motion.aside>
        </div>
      </div>
    </motion.section>
  );
}
