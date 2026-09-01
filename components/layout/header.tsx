"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

import { navigation } from "@/data/navigation";
import { useLocale } from "@/components/i18n/locale-provider";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";

const navigationLinkStyles =
  "relative rounded-sm px-2 py-2 text-sm text-muted-foreground transition-colors after:absolute after:inset-x-2 after:bottom-1 after:h-px after:origin-left after:bg-foreground after:transition-transform hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:after:transition-none";

const observedSectionIds = ["about", "core-stack", "projects", "contact"] as const;
type ObservedSectionId = (typeof observedSectionIds)[number];

function getSectionId(href: string) {
  return href.startsWith("/#") ? href.slice(2) : null;
}

function ScrollProgress() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 28,
    mass: 0.2,
  });
  const progress = shouldReduceMotion ? scrollYProgress : smoothProgress;

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX: progress }}
      className="absolute inset-x-0 bottom-[-1px] h-px origin-left bg-foreground/70"
    />
  );
}

export function Header() {
  const { content } = useLocale();
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<ObservedSectionId | null>(null);

  useEffect(() => {
    if (!isHomePage) {
      return;
    }

    const sections = observedSectionIds.flatMap((sectionId) => {
      const section = document.getElementById(sectionId);
      return section ? [section] : [];
    });

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (first, second) =>
              Math.abs(first.boundingClientRect.top) -
              Math.abs(second.boundingClientRect.top),
          );

        const currentSection = visibleSections[0]?.target.id as
          | ObservedSectionId
          | undefined;

        if (currentSection) {
          setActiveSection(currentSection);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0, 0.25, 0.5, 0.75],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [isHomePage]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/95">
      <a
        href="#main-content"
        className="sr-only z-[60] rounded-sm bg-background px-3 py-2 text-sm text-foreground focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:outline-none focus:ring-2 focus:ring-ring"
      >
        {content.header.skipContent}
      </a>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between gap-4">
          <Link
            href="/"
            aria-label={content.header.homeLabel}
            className="shrink-0 rounded-sm text-sm font-semibold tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <span aria-hidden="true">&lt;kant-sdev/&gt;</span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-4">
            <nav
              aria-label={content.header.navigationLabel}
              className="hidden md:block"
            >
              <ul className="flex items-center gap-1">
                {navigation.map((item) => {
                  const sectionId = getSectionId(item.href);
                  const isActive =
                    isHomePage && sectionId !== null && sectionId === activeSection;

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={isActive ? "location" : undefined}
                        className={`${navigationLinkStyles} ${
                          isActive
                            ? "text-foreground after:scale-x-100"
                            : "after:scale-x-0"
                        }`}
                      >
                        {content.navigation[item.id]}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <LanguageSwitcher />

            <button
              type="button"
              aria-label={isMenuOpen ? content.header.closeMenu : content.header.openMenu}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
              className="inline-flex size-10 items-center justify-center rounded-sm text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background md:hidden"
            >
              {isMenuOpen ? (
                <X className="size-5" aria-hidden="true" />
              ) : (
                <Menu className="size-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen ? (
          <nav
            id="mobile-navigation"
            aria-label={content.header.mobileNavigationLabel}
            className="border-t border-border/70 py-3 md:hidden"
          >
            <ul className="grid gap-1">
              {navigation.map((item) => {
                const sectionId = getSectionId(item.href);
                const isActive =
                  isHomePage && sectionId !== null && sectionId === activeSection;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive ? "location" : undefined}
                      onClick={() => setIsMenuOpen(false)}
                      className={`${navigationLinkStyles} block w-full after:right-auto after:w-8 ${
                        isActive
                          ? "text-foreground after:scale-x-100"
                          : "after:scale-x-0"
                      }`}
                    >
                      {content.navigation[item.id]}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        ) : null}
      </div>
      {isHomePage ? <ScrollProgress /> : null}
    </header>
  );
}
