"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { useLocale } from "@/components/i18n/locale-provider";
import { LocalizedMetadata } from "@/components/i18n/localized-metadata";

const pageSequence: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.06,
      staggerChildren: 0.09,
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

const revealNumber: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.56,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const linkBaseStyles =
  "inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-sm px-5 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none sm:w-auto";

export function NotFoundContent() {
  const { content } = useLocale();
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      aria-labelledby="not-found-title"
      initial={shouldReduceMotion ? false : "hidden"}
      animate="visible"
      variants={pageSequence}
      className="flex flex-1"
    >
      <LocalizedMetadata page="notFound" />
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <motion.p
          variants={revealItem}
          className="text-xs font-semibold tracking-[0.18em] text-foreground uppercase"
        >
          {content.notFound.eyebrow}
        </motion.p>

        <div className="flex flex-1 flex-col justify-center py-12 sm:py-16 lg:py-20">
          <motion.p
            aria-hidden="true"
            variants={revealNumber}
            className="select-none text-[clamp(8rem,29vw,23rem)] leading-[0.7] font-semibold tracking-[-0.1em] text-foreground/[0.07]"
          >
            404
          </motion.p>

          <motion.div
            variants={pageSequence}
            className="relative z-10 -mt-5 max-w-3xl sm:-mt-8 lg:-mt-12"
          >
            <motion.h1
              id="not-found-title"
              variants={revealItem}
              className="text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] font-semibold tracking-[-0.065em] text-balance text-foreground"
            >
              {content.notFound.title}
            </motion.h1>

            <motion.p
              variants={revealItem}
              className="mt-7 max-w-2xl text-sm leading-7 text-pretty text-muted-foreground sm:text-base sm:leading-8"
            >
              {content.notFound.description}
            </motion.p>

            <motion.div
              variants={revealItem}
              className="mt-9 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center"
            >
              <Link
                href="/"
                className={`${linkBaseStyles} bg-foreground text-background hover:bg-foreground/85`}
              >
                {content.common.backHome}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href="/#projects"
                className={`${linkBaseStyles} border border-border bg-background text-foreground hover:bg-muted`}
              >
                {content.common.viewProjects}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          variants={revealItem}
          className="flex items-center justify-end border-t border-border/70 pt-4"
        >
          <span
            aria-hidden="true"
            className="text-[0.7rem] font-medium tracking-[0.16em] text-muted-foreground"
          >
            &lt;kant-sdev/&gt;
          </span>
        </motion.div>
      </div>
    </motion.section>
  );
}
