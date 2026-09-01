import type { Locale } from "@/lib/i18n/config";
import { en } from "./en";
import { ptBR, type Dictionary } from "./pt-BR";

export const content: Record<Locale, Dictionary> = {
  "pt-BR": ptBR,
  en,
};

export type { Dictionary } from "./pt-BR";
