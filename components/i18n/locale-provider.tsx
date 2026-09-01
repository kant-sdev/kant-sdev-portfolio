"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { MotionConfig } from "motion/react";

import { content, type Dictionary } from "@/data/i18n";
import type { Locale } from "@/lib/i18n/config";
import {
  getLocaleSnapshot,
  getServerLocaleSnapshot,
  setLocale,
  subscribeToLocale,
} from "@/lib/i18n/store";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  content: Dictionary;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(
    subscribeToLocale,
    getLocaleSnapshot,
    getServerLocaleSnapshot,
  );
  const value = useMemo(
    () => ({ locale, setLocale, content: content[locale] }),
    [locale],
  );

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <LocaleContext.Provider value={value}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);

  if (!context) throw new Error("useLocale must be used within LocaleProvider.");

  return context;
}
