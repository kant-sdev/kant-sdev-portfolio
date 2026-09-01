"use client";

import Link from "next/link";
import { useLocale } from "@/components/i18n/locale-provider";
import { LocalizedMetadata } from "@/components/i18n/localized-metadata";

export default function TechnicalMapPage() {
  const { content } = useLocale();
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <LocalizedMetadata page="technicalMap" />
      <div className="text-center">
        <p className="text-sm text-muted-foreground">{content.technicalMap.eyebrow}</p>

        <h1 className="mt-2 text-4xl font-semibold tracking-tight">
          {content.technicalMap.title}
        </h1>

        <p className="mt-4 text-muted-foreground">
          {content.technicalMap.description}
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex items-center text-sm underline underline-offset-4"
        >
          {content.common.backHome}
        </Link>
      </div>
    </main>
  );
}
