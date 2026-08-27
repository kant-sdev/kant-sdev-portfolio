export type ContactChannel = "github" | "linkedin" | "email";

export type ContactLink = {
  channel: ContactChannel;
  label: string;
  description: string;
  href: string;
  external: boolean;
};

export const contactLinks: ContactLink[] = [
  {
    channel: "github",
    label: "GitHub",
    description: "@kant-sdev",
    href: "https://github.com/kant-sdev",
    external: true,
  },
  {
    channel: "email",
    label: "Email",
    description: "kaua.cantanhede.santos@gmail.co",
    href: "mailto:kaua.cantanhede.santos@gmail.co",
    external: false,
  },
];

type ContactFormConfig = {
  endpoint: string | null;
};

export const contactFormConfig: ContactFormConfig = {
  endpoint: null,
};
