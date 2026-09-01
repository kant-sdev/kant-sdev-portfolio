"use client";

import { useLocale } from "@/components/i18n/locale-provider";

const buttonStyles =
  "min-h-10 rounded-sm px-1.5 text-xs transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none";
const activeStyles = "font-semibold text-foreground underline underline-offset-4";

export function LanguageSwitcher() {
  const { locale, setLocale, content } = useLocale();

  return (
    <div
      role="group"
      aria-label={content.header.languageLabel}
      className="flex shrink-0 items-center gap-0.5"
    >
      <button
        type="button"
        lang="pt-BR"
        aria-label={content.header.portuguese}
        aria-pressed={locale === "pt-BR"}
        onClick={() => setLocale("pt-BR")}
        className={`${buttonStyles} ${locale === "pt-BR" ? activeStyles : "text-muted-foreground"}`}
      >
        PT-BR
      </button>
      <span aria-hidden="true" className="text-xs text-border">
        |
      </span>
      <button
        type="button"
        lang="en"
        aria-label={content.header.english}
        aria-pressed={locale === "en"}
        onClick={() => setLocale("en")}
        className={`${buttonStyles} ${locale === "en" ? activeStyles : "text-muted-foreground"}`}
      >
        EN
      </button>
    </div>
  );
}
