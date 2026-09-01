export const navigation = [
  {
    id: "about",
    href: "/#about",
  },
  {
    id: "projects",
    href: "/projects",
  },
  {
    id: "technicalMap",
    href: "/technical-map",
  },
  {
    id: "contact",
    href: "/#contact",
  },
] as const;

export type NavigationId = (typeof navigation)[number]["id"];
