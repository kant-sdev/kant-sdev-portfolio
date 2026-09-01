export type ContactChannel = "github" | "linkedin" | "email";

export type ContactLink = {
  channel: ContactChannel;
  description: string;
  href: string;
  external: boolean;
};

export const contactLinks: ContactLink[] = [
  {
    channel: "github",
    description: "@kant-sdev",
    href: "https://github.com/kant-sdev",
    external: true,
  },
  {
    channel: "email",
    description: "kaua.cantanhede.santos@gmail.com",
    href: "mailto:kaua.cantanhede.santos@gmail.com",
    external: false,
  },
];

type ContactFormConfig = {
  endpoint: string | null;
};

export const contactFormConfig: ContactFormConfig = {
  endpoint: "/api/contact",
};
