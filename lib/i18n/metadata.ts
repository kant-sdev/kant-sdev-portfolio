import type { Metadata } from "next";

import { content, type Dictionary } from "@/data/i18n";
import { defaultLocale, type Locale } from "./config";

export type MetadataPage = keyof Dictionary["metadata"];

export function getPageMetadata(
  page: MetadataPage,
  locale: Locale = defaultLocale,
): Pick<Metadata, "title" | "description"> {
  return content[locale].metadata[page];
}
