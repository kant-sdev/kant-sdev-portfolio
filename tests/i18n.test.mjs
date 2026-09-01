import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { registerHooks } from "node:module";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = new URL("../", import.meta.url);

// Use Node's native TypeScript support with the same local aliases as Next.js.
registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.startsWith("@/") || specifier.startsWith(".")) {
      const target = specifier.startsWith("@/")
        ? new URL(specifier.slice(2), root)
        : new URL(specifier, context.parentURL);

      for (const suffix of ["", ".ts", "/index.ts"]) {
        const candidate = new URL(target);
        candidate.pathname += suffix;
        if (existsSync(fileURLToPath(candidate)) && candidate.pathname.endsWith(".ts")) {
          return { ...nextResolve(candidate.href, context), format: "module-typescript" };
        }
      }
    }

    return nextResolve(specifier, context);
  },
});

const { content } = await import("../data/i18n/index.ts");
const { defaultLocale, isLocale, localeStorageKey } = await import("../lib/i18n/config.ts");
const { getPageMetadata } = await import("../lib/i18n/metadata.ts");
const { navigation } = await import("../data/navigation.ts");
const { coreStack } = await import("../data/core-stack.ts");
const { projects, getProjects, getFeaturedProjects } = await import("../data/projects.ts");

function assertSameShape(portuguese, english, path = "content") {
  assert.equal(typeof english, typeof portuguese, path);

  if (typeof portuguese === "object") {
    assert.deepEqual(Object.keys(english).sort(), Object.keys(portuguese).sort(), path);
    for (const key of Object.keys(portuguese)) {
      assertSameShape(portuguese[key], english[key], `${path}.${key}`);
    }
  } else if (typeof portuguese === "string") {
    assert.ok(portuguese.trim(), `${path} is empty in PT-BR`);
    assert.ok(english.trim(), `${path} is empty in EN`);
  } else if (typeof portuguese === "function") {
    assert.equal(english.length, portuguese.length, path);
    assert.ok(portuguese("FinVise", 2, 3).includes("FinVise"), path);
    assert.ok(english("FinVise", 2, 3).includes("FinVise"), path);
  }
}

test("PT-BR is the default and only supported locales are accepted", () => {
  assert.equal(defaultLocale, "pt-BR");
  assert.ok(isLocale("pt-BR"));
  assert.ok(isLocale("en"));
  for (const value of [null, undefined, "pt", "en-US", "invalid"]) assert.equal(isLocale(value), false);
});

test("both dictionaries have complete, non-empty matching content", () => {
  assertSameShape(content["pt-BR"], content.en);
  assert.deepEqual(Object.keys(content.en.navigation).sort(), navigation.map((item) => item.id).sort());
  assert.deepEqual(Object.keys(content.en.coreStack.categories).sort(), coreStack.map((group) => group.id).sort());
  assert.deepEqual(Object.keys(content.en.projects.items).sort(), projects.map((project) => project.id).sort());
});

test("localization preserves project identities, links, technology names and featured order", () => {
  for (const locale of ["pt-BR", "en"]) {
    const translated = getProjects(locale);
    translated.forEach((project, index) => {
      const { category, description, ...identity } = project;
      assert.deepEqual(identity, projects[index]);
      assert.ok(category);
      assert.ok(description);
    });
    assert.deepEqual(getFeaturedProjects(locale).map((project) => project.slug), ["finvise", "forumhub", "literalura"]);
  }
  assert.notEqual(getProjects("en")[0].description, getProjects("pt-BR")[0].description);
});

test("metadata is available in both languages for current and future pages", () => {
  for (const page of ["home", "projects", "project", "technicalMap", "trajectory", "notFound"]) {
    assert.deepEqual(getPageMetadata(page), content["pt-BR"].metadata[page]);
    assert.deepEqual(getPageMetadata(page, "en"), content.en.metadata[page]);
  }
});

function mockBrowser(context, savedLocale, blocked = false) {
  const entries = new Map(savedLocale === undefined ? [] : [[localeStorageKey, savedLocale]]);
  const events = new Map();
  const storage = {
    getItem: (key) => entries.get(key) ?? null,
    setItem: (key, value) => entries.set(key, value),
  };
  const previousWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: {
      get localStorage() {
        if (blocked) throw new Error("Storage unavailable");
        return storage;
      },
      addEventListener: (name, listener) => events.set(name, listener),
      removeEventListener: (name) => events.delete(name),
    },
  });
  context.after(() => {
    if (previousWindow) Object.defineProperty(globalThis, "window", previousWindow);
    else delete globalThis.window;
  });
  return { entries, events, storage };
}

test("SSR never accesses browser storage and always starts in Portuguese", async () => {
  const store = await import("../lib/i18n/store.ts?test=ssr");
  assert.equal(typeof window, "undefined");
  assert.equal(store.getServerLocaleSnapshot(), "pt-BR");
  assert.equal(store.getLocaleSnapshot(), "pt-BR");
});

test("a saved preference is restored only on subscription, without overwriting it", async (context) => {
  const { entries } = mockBrowser(context, "en");
  const store = await import("../lib/i18n/store.ts?test=restore");
  assert.equal(store.getLocaleSnapshot(), "pt-BR");
  let changes = 0;
  const unsubscribe = store.subscribeToLocale(() => changes++);
  assert.equal(store.getLocaleSnapshot(), "en");
  assert.equal(store.getServerLocaleSnapshot(), "pt-BR");
  assert.equal(entries.get(localeStorageKey), "en");
  store.setLocale("pt-BR");
  assert.equal(entries.get(localeStorageKey), "pt-BR");
  assert.equal(changes, 1);
  unsubscribe();
});

test("invalid stored preferences fall back to Portuguese", async (context) => {
  mockBrowser(context, "unsupported");
  const store = await import("../lib/i18n/store.ts?test=invalid");
  const unsubscribe = store.subscribeToLocale(() => {});
  assert.equal(store.getLocaleSnapshot(), "pt-BR");
  store.setLocale("unsupported");
  assert.equal(store.getLocaleSnapshot(), "pt-BR");
  unsubscribe();
});

test("switching still works in memory when localStorage is blocked", async (context) => {
  mockBrowser(context, undefined, true);
  const store = await import("../lib/i18n/store.ts?test=blocked");
  const unsubscribe = store.subscribeToLocale(() => {});
  store.setLocale("en");
  assert.equal(store.getLocaleSnapshot(), "en");
  unsubscribe();
  const resubscribe = store.subscribeToLocale(() => {});
  assert.equal(store.getLocaleSnapshot(), "en");
  resubscribe();
});

test("storage updates sync other tabs, ignore unrelated keys and clean up", async (context) => {
  const { events, storage } = mockBrowser(context);
  const store = await import("../lib/i18n/store.ts?test=events");
  const unsubscribe = store.subscribeToLocale(() => {});
  events.get("storage")({ key: "unrelated", newValue: "en", storageArea: storage });
  assert.equal(store.getLocaleSnapshot(), "pt-BR");
  events.get("storage")({ key: localeStorageKey, newValue: "en", storageArea: storage });
  assert.equal(store.getLocaleSnapshot(), "en");
  events.get("storage")({ key: null, newValue: null, storageArea: storage });
  assert.equal(store.getLocaleSnapshot(), "pt-BR");
  unsubscribe();
  assert.equal(events.size, 0);
});
