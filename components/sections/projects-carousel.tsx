"use client";

import Image from "next/image";
import { useState, type KeyboardEvent } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type PanInfo,
  type Variants,
} from "motion/react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

import { TechnologyTag } from "@/components/ui/technology-tag";
import type { Project } from "@/types/projects";
import { useLocale } from "@/components/i18n/locale-provider";

const slideVariants: Variants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 24 : -24,
  }),
  center: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.38,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -24 : 24,
    transition: {
      duration: 0.24,
      ease: [0.4, 0, 1, 1],
    },
  }),
};

const reducedSlideVariants: Variants = {
  enter: { opacity: 1, x: 0 },
  center: { opacity: 1, x: 0, transition: { duration: 0 } },
  exit: { opacity: 1, x: 0, transition: { duration: 0 } },
};

type ProjectSlideProps = {
  project: Project;
  index: number;
  total: number;
};

function ProjectSlide({ project, index, total }: ProjectSlideProps) {
  const { content } = useLocale();
  const featuredTechnologies = project.technologies.some(
    (technology) => technology.featured,
  )
    ? project.technologies.filter((technology) => technology.featured)
    : project.technologies.slice(0, 5);
  const projectNumber = String(index + 1).padStart(2, "0");

  return (
    <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(20rem,0.8fr)] lg:gap-14">
      <div className="relative aspect-[16/10] min-w-0 overflow-hidden rounded-sm border border-border bg-muted/35">
        {project.image ? (
          <Image
            src={project.image}
            alt={content.projects.previewAlt(project.title)}
            fill
            sizes="(max-width: 1023px) calc(100vw - 2rem), 58vw"
            className="object-cover"
          />
        ) : (
          <div
            role="img"
            aria-label={content.projects.previewPlaceholder(project.title)}
            className="flex h-full min-h-56 flex-col justify-between p-6 sm:min-h-72 sm:p-8"
          >
            <span className="text-[0.65rem] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
              {content.projects.preview}
            </span>
            <span
              aria-hidden="true"
              className="self-center text-[clamp(4rem,11vw,8rem)] leading-none font-semibold tracking-[-0.08em] text-border"
            >
              {projectNumber}
            </span>
            <span className="text-xs tracking-[0.12em] text-muted-foreground uppercase">
              {project.slug}
            </span>
          </div>
        )}
      </div>

      <div className="min-w-0">
        <p className="text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
          {projectNumber} / {String(total).padStart(2, "0")}
        </p>
        <h3 className="mt-4 text-[clamp(2.5rem,6vw,4.75rem)] leading-[0.95] font-semibold tracking-[-0.065em] text-balance text-foreground">
          {project.title}
        </h3>
        <p className="mt-5 text-xs leading-6 font-medium tracking-[0.1em] text-foreground uppercase">
          {project.category}
        </p>
        <p className="mt-6 text-sm leading-7 text-pretty text-muted-foreground sm:text-base sm:leading-8">
          {project.description}
        </p>

        <ul
          aria-label={content.projects.technologies(project.title)}
          className="mt-7 flex flex-wrap gap-2"
        >
          {featuredTechnologies.map((technology) => (
            <li key={technology.name}>
              <TechnologyTag
                name={technology.name}
                href={technology.href}
                context={project.title}
                size="compact"
              />
            </li>
          ))}
        </ul>

        {project.github ? (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-8 inline-flex min-h-11 items-center gap-2 rounded-sm py-2 text-sm font-medium text-foreground transition-colors hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {content.projects.viewProject}
            <ArrowUpRight
              className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </a>
        ) : null}
      </div>
    </div>
  );
}

type ProjectsCarouselProps = {
  projects: Project[];
};

export function ProjectsCarousel({ projects }: ProjectsCarouselProps) {
  const { content } = useLocale();
  const carousel = content.projects.carousel;
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  if (projects.length === 0) {
    return <p className="mt-14 text-center text-sm text-muted-foreground">{content.projects.empty}</p>;
  }

  const activeProject = projects[activeIndex];
  const currentPosition = String(activeIndex + 1).padStart(2, "0");
  const totalProjects = String(projects.length).padStart(2, "0");

  function changeProject(nextDirection: number) {
    setDirection(nextDirection);
    setActiveIndex(
      (currentIndex) =>
        (currentIndex + nextDirection + projects.length) % projects.length,
    );
  }

  function selectProject(index: number) {
    if (index === activeIndex) {
      return;
    }

    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  }

  function handleDragEnd(_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    const swipeIntent = info.offset.x + info.velocity.x * 0.15;

    if (swipeIntent < -60) {
      changeProject(1);
    } else if (swipeIntent > 60) {
      changeProject(-1);
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) {
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      changeProject(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      changeProject(1);
    }
  }

  return (
    <div
      role="region"
      aria-roledescription={carousel.role}
      aria-label={carousel.label}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="mt-14 overflow-hidden rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background sm:mt-16"
    >
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {carousel.announcement(activeProject.title, activeIndex + 1, projects.length)}
      </p>

      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.article
          id="featured-project-slide"
          key={activeProject.id}
          custom={direction}
          variants={shouldReduceMotion ? reducedSlideVariants : slideVariants}
          initial={shouldReduceMotion ? false : "enter"}
          animate="center"
          exit="exit"
          drag={shouldReduceMotion ? false : "x"}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.14}
          onDragEnd={handleDragEnd}
          aria-roledescription={carousel.slideRole}
          aria-label={carousel.slideLabel(activeProject.title, activeIndex + 1, projects.length)}
          className="touch-pan-y border-y border-border/70 py-8 sm:py-10 lg:py-12"
        >
          <ProjectSlide
            project={activeProject}
            index={activeIndex}
            total={projects.length}
          />
        </motion.article>
      </AnimatePresence>

      <div className="flex flex-col gap-5 border-b border-border/70 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-5">
          <span className="text-xs font-medium tracking-[0.14em] text-muted-foreground">
            {currentPosition} / {totalProjects}
          </span>
          <div className="flex items-center gap-2" aria-label={carousel.select}>
            {projects.map((project, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={project.id}
                  type="button"
                  aria-label={carousel.goTo(project.title, index + 1)}
                  aria-current={isActive ? "true" : undefined}
                  aria-controls="featured-project-slide"
                  onClick={() => selectProject(index)}
                  className="inline-flex h-8 items-center rounded-sm px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <span
                    aria-hidden="true"
                    className={`block h-1.5 rounded-full transition-[width,background-color] ${
                      isActive ? "w-6 bg-foreground" : "w-1.5 bg-border"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            type="button"
            aria-label={carousel.previous}
            aria-controls="featured-project-slide"
            onClick={() => changeProject(-1)}
            className="inline-flex size-11 items-center justify-center rounded-sm border border-border text-foreground transition-colors hover:border-foreground/45 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label={carousel.next}
            aria-controls="featured-project-slide"
            onClick={() => changeProject(1)}
            className="inline-flex size-11 items-center justify-center rounded-sm border border-border text-foreground transition-colors hover:border-foreground/45 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <ChevronRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
