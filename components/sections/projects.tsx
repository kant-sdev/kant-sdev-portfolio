import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ProjectsCarousel } from "@/components/sections/projects-carousel";
import { featuredProjects } from "@/data/projects";

export function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="scroll-mt-14 border-t border-border/70"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <header className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold tracking-[0.18em] text-foreground uppercase">
            Projects
          </p>
          <h2
            id="projects-title"
            className="mt-5 text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] font-semibold tracking-[-0.065em] text-balance text-foreground"
          >
            Projetos que representam minha evolução em engenharia de software.
          </h2>
        </header>

        <ProjectsCarousel projects={featuredProjects} />

        <div className="mt-10 text-center">
          <Link
            href="/projetos"
            className="inline-flex min-h-11 items-center gap-2 rounded-sm px-3 py-2 text-sm font-medium text-foreground transition-colors hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            View all projects
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
