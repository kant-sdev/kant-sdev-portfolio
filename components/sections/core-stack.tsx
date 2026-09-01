"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "motion/react";

import { TechnologyTag } from "@/components/ui/technology-tag";
import { coreStack, type CoreStackTechnology } from "@/data/core-stack";
import { useLocale } from "@/components/i18n/locale-provider";

const sectionSequence: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.04,
      staggerChildren: 0.1,
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

const technologySequence: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.045,
    },
  },
};

const revealTechnology: Variants = {
  hidden: {
    opacity: 0,
    y: 8,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.36,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

type StackItemProps = CoreStackTechnology & {
  category: string;
};

function StackItem({ name, href, category, emphasis }: StackItemProps) {
  return (
    <motion.li variants={revealTechnology}>
      <TechnologyTag
        name={name}
        href={href}
        context={category}
        emphasis={emphasis}
      />
    </motion.li>
  );
}

export function CoreStack() {
  const { content } = useLocale();
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      id="core-stack"
      aria-labelledby="core-stack-title"
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={sectionSequence}
      className="section-surface scroll-mt-14 border-t border-border/70"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <motion.header
          variants={sectionSequence}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.p
            variants={revealContent}
            className="text-xs font-semibold tracking-[0.18em] text-foreground uppercase"
          >
            {content.coreStack.eyebrow}
          </motion.p>
          <motion.h2
            id="core-stack-title"
            variants={revealContent}
            className="mt-5 text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] font-semibold tracking-[-0.065em] text-balance text-foreground"
          >
            {content.coreStack.title}
          </motion.h2>
          <motion.p
            variants={revealContent}
            className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-pretty text-muted-foreground sm:text-base sm:leading-8"
          >
            {content.coreStack.description}
          </motion.p>
        </motion.header>

        <div className="mt-16 border-b border-border/70 sm:mt-20">
          {coreStack.map((group) => (
            <motion.section
              key={group.id}
              aria-labelledby={`${group.id}-title`}
              initial={shouldReduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={revealContent}
              className="grid gap-6 border-t border-border/70 py-8 md:grid-cols-[minmax(13rem,0.65fr)_minmax(0,1.35fr)] md:gap-10 md:py-10"
            >
              <h3
                id={`${group.id}-title`}
                className="max-w-xs text-sm leading-6 font-semibold text-foreground"
              >
                {content.coreStack.categories[group.id]}
              </h3>

              <motion.ul
                variants={technologySequence}
                className="flex min-w-0 flex-wrap gap-2.5"
              >
                {group.technologies.map((technology) => (
                  <StackItem
                    key={technology.name}
                    {...technology}
                    category={content.coreStack.categories[group.id]}
                  />
                ))}
              </motion.ul>
            </motion.section>
          ))}
        </div>

        <motion.div variants={revealContent} className="mt-10 text-center">
          <Link
            href="/technical-map"
            className="group inline-flex min-h-11 items-center gap-2 rounded-sm px-3 py-2 text-sm font-medium text-foreground transition-[color,transform] hover:-translate-y-0.5 hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transform-none motion-reduce:transition-colors"
          >
            {content.coreStack.explore}
            <ArrowRight
              className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none"
              aria-hidden="true"
            />
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
