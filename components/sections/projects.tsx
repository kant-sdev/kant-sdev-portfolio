"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { ProjectsCarousel } from "@/components/sections/projects-carousel";
import { getFeaturedProjects } from "@/data/projects";
import { useLocale } from "@/components/i18n/locale-provider";
import { fadeUp } from "@/lib/animation";

export function Projects() {
  const { locale, content } = useLocale();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="scroll-mt-14 border-t border-border/70"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <motion.header
          initial={shouldReduceMotion ? false : fadeUp.initial}
          whileInView={fadeUp.whileInView}
          viewport={{ ...fadeUp.viewport, amount: 0.2 }}
          transition={fadeUp.transition}
          className="mx-auto max-w-4xl text-center"
        >
          <p className="text-xs font-semibold tracking-[0.18em] text-foreground uppercase">
            {content.projects.eyebrow}
          </p>
          <h2
            id="projects-title"
            className="mt-5 text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] font-semibold tracking-[-0.065em] text-balance text-foreground"
          >
            {content.projects.title}
          </h2>
        </motion.header>

        <ProjectsCarousel projects={getFeaturedProjects(locale)} />

        <motion.div
          initial={shouldReduceMotion ? false : fadeUp.initial}
          whileInView={fadeUp.whileInView}
          viewport={{ ...fadeUp.viewport, amount: 0.4 }}
          transition={fadeUp.transition}
          className="mt-10 text-center"
        >
          <Link
            href="/projects"
            className="group inline-flex min-h-11 items-center gap-2 rounded-sm px-3 py-2 text-sm font-medium text-foreground transition-[color,transform] hover:-translate-y-0.5 hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transform-none motion-reduce:transition-colors"
          >
            {content.projects.viewAll}
            <ArrowRight
              className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none"
              aria-hidden="true"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
