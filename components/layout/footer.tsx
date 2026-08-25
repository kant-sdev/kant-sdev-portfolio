import Link from "next/link";

import { navigation } from "@/data/navigation";

type FooterLink = {
  label: string;
  href: string;
};

const importantLinks: FooterLink[] = [
  { label: "Home", href: "/" },
  ...navigation.filter((item) => item.label !== "Contato"),
];

const socialLinks: FooterLink[] = [];

const otherLinks: FooterLink[] = navigation.filter(
  (item) => item.label === "Contato",
);

const footerLinkStyles =
  "rounded-sm text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/70">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-[1.4fr_repeat(3,minmax(0,1fr))]">
          <nav
            aria-label="Links importantes do rodapé"
            className="lg:col-start-2 lg:row-start-1"
          >
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-foreground">
              Important Links
            </h2>
            <ul className="space-y-3">
              {importantLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={footerLinkStyles}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <section
            aria-labelledby="footer-social-title"
            className="lg:col-start-3 lg:row-start-1"
          >
            <h2
              id="footer-social-title"
              className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-foreground"
            >
              Social
            </h2>
            {socialLinks.length > 0 ? (
              <ul className="space-y-3">
                {socialLinks.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className={footerLinkStyles}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm leading-6 text-muted-foreground">
                Links ainda não publicados.
              </p>
            )}
          </section>

          <nav
            aria-label="Outros links do rodapé"
            className="lg:col-start-4 lg:row-start-1"
          >
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-foreground">
              Other
            </h2>
            <ul className="space-y-3">
              {otherLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={footerLinkStyles}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <p className="text-xs leading-6 text-muted-foreground sm:col-span-3 lg:col-span-1 lg:col-start-1 lg:row-start-1">
            Copyright © {currentYear} Kauã Cantanhede
          </p>
        </div>
      </div>
    </footer>
  );
}
