"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowDown, ArrowRight } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { useLocale } from "@/components/i18n/locale-provider";
import { LocalizedMetadata } from "@/components/i18n/localized-metadata";

const heroSequence: Variants = {
  hidden: {},
  visible: {},
};

const revealItem: Variants = {
  hidden: {
    opacity: 0,
    y: 14,
  },
  visible: (order = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.48,
      delay: 0.08 + order * 0.07,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const ctaSequence: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.38,
      staggerChildren: 0.06,
    },
  },
};

const revealCta: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
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
      delay: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const ctaBaseStyles =
  "group inline-flex min-h-11 w-full items-center justify-center rounded-sm px-5 py-3 text-sm font-medium transition-[color,background-color,border-color,transform] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transform-none motion-reduce:transition-colors sm:w-auto";

export function Hero() {
  const { content } = useLocale();
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      aria-labelledby="hero-title"
      initial={shouldReduceMotion ? false : "hidden"}
      animate="visible"
      variants={heroSequence}
      className="mx-auto flex min-h-[calc(100svh-3.5rem)] w-full max-w-7xl flex-col px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
    >
      <LocalizedMetadata page="home" />
      <div className="flex flex-1 items-center py-8 sm:py-12 lg:py-16">
        <div className="grid w-full items-center gap-14 xl:grid-cols-[minmax(0,1fr)_minmax(18rem,0.4fr)] xl:gap-16">
          <div className="min-w-0">
            <motion.h1
              id="hero-title"
              custom={1}
              variants={revealItem}
              className="text-[clamp(3.25rem,10vw,8.5rem)] leading-[0.9] font-semibold tracking-[-0.08em] text-balance text-foreground"
            >
              Kauã
              <span className="block">Cantanhêde</span>
            </motion.h1>

            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-5">
              <motion.p
                custom={0}
                variants={revealItem}
                className="text-sm font-semibold tracking-[0.12em] text-foreground uppercase"
              >
                {content.hero.role}
              </motion.p>
              <motion.span
                custom={2}
                variants={revealItem}
                aria-hidden="true"
                className="hidden h-px w-10 bg-border sm:block"
              />
              <motion.p
                custom={2}
                variants={revealItem}
                className="text-sm leading-6 text-muted-foreground sm:text-base"
              >
                {content.hero.specialties}
              </motion.p>
            </div>

            <motion.p
              custom={3}
              variants={revealItem}
              className="mt-7 max-w-2xl text-base leading-7 text-pretty text-muted-foreground sm:mt-8 sm:text-lg sm:leading-8"
            >
              {content.hero.description}
            </motion.p>

            <motion.div
              variants={ctaSequence}
              className="mt-9 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center"
            >
              <motion.div variants={revealCta} className="w-full sm:w-auto">
                <Link
                  href="/#projects"
                  aria-label={content.common.viewProjectsLabel}
                  className={`${ctaBaseStyles} gap-2 bg-foreground text-background hover:bg-foreground/85`}
                >
                  {content.common.viewProjects}
                  <ArrowRight
                    className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none"
                    aria-hidden="true"
                  />
                </Link>
              </motion.div>
              <motion.div variants={revealCta} className="w-full sm:w-auto">
                <Link
                  href="/technical-map"
                  aria-label={content.hero.technicalMapLabel}
                  className={`${ctaBaseStyles} border border-border bg-background text-foreground hover:bg-muted`}
                >
                  {content.hero.technicalMap}
                </Link>
              </motion.div>
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
                src="/kant-sdev.jpeg"
                alt={content.hero.portraitAlt}
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
        custom={6}
        variants={revealItem}
        className="flex items-center justify-between border-t border-border/70 pt-4 text-[0.7rem] font-medium tracking-[0.16em] text-muted-foreground uppercase"
      >
        <span className="inline-flex items-center gap-2">
          {content.hero.explore}
          <ArrowDown className="size-3.5" aria-hidden="true" />
        </span>
        <span>{content.hero.introduction}</span>
      </motion.div>
    </motion.section>
  );
}
