"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowDown, ArrowRight } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "motion/react";

const heroSequence: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.08,
    },
  },
};

const revealItem: Variants = {
  hidden: {
    opacity: 0,
    y: 14,
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

const revealPhoto: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.52,
      delay: 0.12,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const ctaBaseStyles =
  "inline-flex min-h-11 w-full items-center justify-center rounded-sm px-5 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-auto";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      aria-labelledby="hero-title"
      initial={shouldReduceMotion ? false : "hidden"}
      animate="visible"
      variants={heroSequence}
      className="mx-auto flex min-h-[calc(100svh-3.5rem)] w-full max-w-7xl flex-col px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
    >
      <div className="flex flex-1 items-center py-8 sm:py-12 lg:py-16">
        <div className="grid w-full items-center gap-14 xl:grid-cols-[minmax(0,1fr)_minmax(18rem,0.4fr)] xl:gap-16">
          <div className="min-w-0">
            <motion.h1
              id="hero-title"
              variants={revealItem}
              className="text-[clamp(3.25rem,10vw,8.5rem)] leading-[0.9] font-semibold tracking-[-0.08em] text-balance text-foreground"
            >
              Kauã
              <span className="block">Cantanhêde</span>
            </motion.h1>

            <motion.div
              variants={revealItem}
              className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-5"
            >
              <p className="text-sm font-semibold tracking-[0.12em] text-foreground uppercase">
                Software Engineer 
              </p>
              <span
                aria-hidden="true"
                className="hidden h-px w-10 bg-border sm:block"
              />
              <p className="text-sm leading-6 text-muted-foreground sm:text-base">
                Backend · Cloud · Architecture · Full Stack
              </p>
            </motion.div>

            <motion.p
              variants={revealItem}
              className="mt-7 max-w-2xl text-base leading-7 text-pretty text-muted-foreground sm:mt-8 sm:text-lg sm:leading-8"
            >
              Construção de software com foco em sistemas backend, decisões
              arquiteturais, infraestrutura cloud e integração entre as camadas
              que sustentam produtos digitais.
            </motion.p>

            <motion.div
              variants={revealItem}
              className="mt-9 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center"
            >
              <Link
                href="/#projects"
                aria-label="Ver projetos e evidências práticas"
                className={`${ctaBaseStyles} gap-2 bg-foreground text-background hover:bg-foreground/85`}
              >
                Ver projetos
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href="/mapa-tecnico"
                aria-label="Explorar o mapa técnico e a profundidade de conhecimento"
                className={`${ctaBaseStyles} border border-border bg-background text-foreground hover:bg-muted`}
              >
                Mapa técnico
              </Link>
            </motion.div>
          </div>

          <motion.div
            variants={revealPhoto}
            className="mx-auto w-full max-w-[17rem] sm:max-w-[20rem] xl:mx-0 xl:max-w-[22rem] xl:justify-self-end"
          >
            <div
              className="relative aspect-square overflow-hidden bg-muted shadow-sm ring-1 ring-border/60"
              style={{
                borderRadius: "58% 42% 47% 53% / 45% 52% 48% 55%",
              }}
            >
              <Image
                src="/kant-sdev.JPEG"
                alt="Kauã Cantanhede — Software Engineer"
                width={640}
                height={640}
                sizes="(max-width: 639px) 272px, (max-width: 1279px) 320px, 352px"
                preload
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        variants={revealItem}
        className="flex items-center justify-between border-t border-border/70 pt-4 text-[0.7rem] font-medium tracking-[0.16em] text-muted-foreground uppercase"
      >
        <span className="inline-flex items-center gap-2">
          scroll / explore
          <ArrowDown className="size-3.5" aria-hidden="true" />
        </span>
        <span className="hidden sm:inline">01 — introduction</span>
      </motion.div>
    </motion.section>
  );
}
