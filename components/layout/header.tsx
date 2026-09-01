"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { navigation } from "@/data/navigation";
import { useLocale } from "@/components/i18n/locale-provider";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";

const navigationLinkStyles =
  "rounded-sm px-2 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function Header() {
  const { content } = useLocale();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                {navigation.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={navigationLinkStyles}>
                      {content.navigation[item.id]}
                    </Link>
                  </li>
                ))}
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
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`${navigationLinkStyles} block w-full`}
                  >
                    {content.navigation[item.id]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
