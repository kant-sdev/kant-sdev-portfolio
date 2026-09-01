import { defaultLocale, isLocale, localeStorageKey, type Locale } from "./config";

let currentLocale: Locale = defaultLocale;
let hasRestoredPreference = false;
const listeners = new Set<() => void>();

function updateLocale(locale: Locale) {
  if (locale === currentLocale) return;

  currentLocale = locale;
  listeners.forEach((listener) => listener());
}

function handleStorage(event: StorageEvent) {
  if (event.key !== localeStorageKey && event.key !== null) return;

  try {
    if (event.storageArea !== window.localStorage) return;
  } catch {
    return;
  }

  updateLocale(isLocale(event.newValue) ? event.newValue : defaultLocale);
}

export function subscribeToLocale(listener: () => void) {
  // React subscribes after hydration; browser storage is never read during SSR.
  if (!hasRestoredPreference) {
    hasRestoredPreference = true;

    try {
      const storedLocale = window.localStorage.getItem(localeStorageKey);
      currentLocale = isLocale(storedLocale) ? storedLocale : defaultLocale;
    } catch {
      // Switching remains available when storage is blocked or unavailable.
    }
  }

  if (listeners.size === 0) window.addEventListener("storage", handleStorage);
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) window.removeEventListener("storage", handleStorage);
  };
}

export function getLocaleSnapshot() {
  return currentLocale;
}

export function getServerLocaleSnapshot() {
  // The server and the first client render must always use the same language.
  return defaultLocale;
}

export function setLocale(locale: Locale) {
  if (!isLocale(locale)) return;

  updateLocale(locale);

  try {
    window.localStorage.setItem(localeStorageKey, locale);
  } catch {
    // Keep the in-memory preference even if persistence fails.
  }
}
