"use client";

import { useLocale } from "@/components/i18n/locale-provider";
import type { MetadataPage } from "@/lib/i18n/metadata";

export function LocalizedMetadata({ page }: { page: MetadataPage }) {
  const { content } = useLocale();
  const { title, description } = content.metadata[page];

  // React 19 hoists these tags into <head> during SSR and client navigation.
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
    </>
  );
}
