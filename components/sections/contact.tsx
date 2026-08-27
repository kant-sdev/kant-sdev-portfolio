"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, ArrowUpRight, Mail } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

import {
  contactFormConfig,
  contactLinks,
  type ContactChannel,
  type ContactLink,
} from "@/data/profile";

const sectionSequence: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.04,
      staggerChildren: 0.09,
    },
  },
};

const revealContent: Variants = {
  hidden: {
    opacity: 0,
    y: 15,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.48,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const linkSequence: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.06,
    },
  },
};

type FormStatus = "idle" | "submitting" | "success" | "error";
type FieldName = "name" | "email" | "message";
type FieldErrors = Partial<Record<FieldName, string>>;
type ContactField = HTMLInputElement | HTMLTextAreaElement;

const fieldNames: FieldName[] = ["name", "email", "message"];

function ContactIcon({ channel }: { channel: ContactChannel }) {
  const iconStyles = "size-4";

  switch (channel) {
    case "github":
      return <FaGithub className={iconStyles} aria-hidden="true" />;
    case "linkedin":
      return <FaLinkedin className={iconStyles} aria-hidden="true" />;
    case "email":
      return <Mail className={iconStyles} aria-hidden="true" />;
  }
}

function getFieldError(field: ContactField) {
  const value = field.value.trim();

  if (!value) {
    return field.name === "message"
      ? "Conte brevemente como posso ajudar."
      : `Informe seu ${field.name === "name" ? "nome" : "email"}.`;
  }

  if (field.name === "email" && field.validity.typeMismatch) {
    return "Informe um email válido.";
  }

  return "";
}

function ContactLinkCard({
  link,
  shouldReduceMotion,
}: {
  link: ContactLink;
  shouldReduceMotion: boolean | null;
}) {
  return (
    <motion.li variants={revealContent}>
      <motion.a
        href={link.href}
        target={link.external ? "_blank" : undefined}
        rel={link.external ? "noopener noreferrer" : undefined}
        aria-label={`${link.label}: ${link.description}${
          link.external ? " (abre em uma nova aba)" : ""
        }`}
        whileHover={shouldReduceMotion ? undefined : { y: -2 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className="group flex min-h-28 w-full items-stretch justify-between gap-4 rounded-sm border border-border/70 bg-background p-5 transition-colors hover:border-foreground/25 hover:bg-muted/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
      >
        <span className="flex min-w-0 flex-col justify-between gap-5">
          <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <ContactIcon channel={link.channel} />
            {link.label}
          </span>
          <span className="break-words text-xs leading-5 text-muted-foreground sm:text-sm">
            {link.description}
          </span>
        </span>

        <ArrowUpRight
          className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none"
          aria-hidden="true"
        />
      </motion.a>
    </motion.li>
  );
}

export function Contact() {
  const shouldReduceMotion = useReducedMotion();
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  function clearFieldError(fieldName: FieldName) {
    if (fieldErrors[fieldName]) {
      setFieldErrors((currentErrors) => ({
        ...currentErrors,
        [fieldName]: undefined,
      }));
    }

    if (formStatus === "error") {
      setFormStatus("idle");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const fields = fieldNames.map(
      (fieldName) => form.elements.namedItem(fieldName) as ContactField,
    );
    const nextErrors = fields.reduce<FieldErrors>((errors, field) => {
      const error = getFieldError(field);

      if (error) {
        errors[field.name as FieldName] = error;
      }

      return errors;
    }, {});

    setFieldErrors(nextErrors);

    const firstInvalidField = fields.find(
      (field) => nextErrors[field.name as FieldName],
    );

    if (firstInvalidField) {
      setFormStatus("idle");
      firstInvalidField.focus();
      return;
    }

    if (!contactFormConfig.endpoint) {
      setFormStatus("error");
      return;
    }

    setFormStatus("submitting");

    try {
      const response = await fetch(contactFormConfig.endpoint, {
        method: "POST",
        body: new FormData(form),
      });

      if (!response.ok) {
        throw new Error("Contact form request failed.");
      }

      form.reset();
      setFormStatus("success");
    } catch {
      setFormStatus("error");
    }
  }

  const fieldStyles =
    "mt-3 w-full rounded-sm border border-border/80 bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 hover:border-foreground/20 focus-visible:border-foreground/40 focus-visible:ring-2 focus-visible:ring-ring/35 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 motion-reduce:transition-none";
  const errorStyles = "mt-2 text-xs leading-5 text-destructive";

  return (
    <motion.section
      id="contact"
      aria-labelledby="contact-title"
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.08 }}
      variants={sectionSequence}
      className="scroll-mt-14 border-t border-border/70"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <motion.header variants={sectionSequence} className="max-w-4xl">
          <motion.p
            variants={revealContent}
            className="text-xs font-semibold tracking-[0.18em] text-foreground uppercase"
          >
            Contact
          </motion.p>
          <motion.h2
            id="contact-title"
            variants={revealContent}
            className="mt-5 text-[clamp(2.75rem,6vw,5.5rem)] leading-[0.95] font-semibold tracking-[-0.065em] text-balance text-foreground"
          >
            Vamos conversar.
          </motion.h2>
          <motion.p
            variants={revealContent}
            className="mt-7 max-w-3xl text-sm leading-7 text-pretty text-muted-foreground sm:text-base sm:leading-8"
          >
            Seja para uma oportunidade profissional, um projeto ou uma ideia
            que vale a pena explorar, estou aberto a novas conversas.
          </motion.p>
        </motion.header>

        <motion.div
          variants={sectionSequence}
          className="mt-14 grid border-t border-border/70 sm:mt-16 lg:grid-cols-2"
        >
          <motion.section
            variants={revealContent}
            aria-labelledby="connect-title"
            className="min-w-0 py-10 lg:pr-12 xl:pr-16"
          >
            <h3
              id="connect-title"
              className="text-xs font-semibold tracking-[0.18em] text-foreground uppercase"
            >
              Connect
            </h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Encontre-me também por aqui.
            </p>

            <motion.ul
              variants={linkSequence}
              className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"
            >
              {contactLinks.map((link) => (
                <ContactLinkCard
                  key={link.channel}
                  link={link}
                  shouldReduceMotion={shouldReduceMotion}
                />
              ))}
            </motion.ul>
          </motion.section>

          <motion.section
            variants={revealContent}
            aria-labelledby="contact-form-title"
            className="min-w-0 border-t border-border/70 py-10 lg:border-t-0 lg:border-l lg:pl-12 xl:pl-16"
          >
            <h3
              id="contact-form-title"
              className="text-xs font-semibold tracking-[0.18em] text-foreground uppercase"
            >
              Send a message
            </h3>

            <form className="mt-8 space-y-6" noValidate onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="contact-name"
                  className="text-xs font-medium text-foreground"
                >
                  Nome
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  placeholder="Seu nome"
                  aria-invalid={fieldErrors.name ? true : undefined}
                  aria-describedby={
                    fieldErrors.name ? "contact-name-error" : undefined
                  }
                  onChange={() => clearFieldError("name")}
                  className={fieldStyles}
                />
                {fieldErrors.name ? (
                  <p id="contact-name-error" className={errorStyles}>
                    {fieldErrors.name}
                  </p>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="text-xs font-medium text-foreground"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  placeholder="seu@email.com"
                  aria-invalid={fieldErrors.email ? true : undefined}
                  aria-describedby={
                    fieldErrors.email ? "contact-email-error" : undefined
                  }
                  onChange={() => clearFieldError("email")}
                  className={fieldStyles}
                />
                {fieldErrors.email ? (
                  <p id="contact-email-error" className={errorStyles}>
                    {fieldErrors.email}
                  </p>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="text-xs font-medium text-foreground"
                >
                  Mensagem
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  required
                  placeholder="Como posso ajudar?"
                  aria-invalid={fieldErrors.message ? true : undefined}
                  aria-describedby={
                    fieldErrors.message ? "contact-message-error" : undefined
                  }
                  onChange={() => clearFieldError("message")}
                  className={`${fieldStyles} min-h-36 resize-y`}
                />
                {fieldErrors.message ? (
                  <p id="contact-message-error" className={errorStyles}>
                    {fieldErrors.message}
                  </p>
                ) : null}
              </div>

              <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  disabled={formStatus === "submitting"}
                  className="group inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-sm bg-foreground px-5 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-wait disabled:opacity-60 motion-reduce:transition-none sm:w-auto"
                >
                  {formStatus === "submitting"
                    ? "Enviando..."
                    : "Enviar mensagem"}
                  <ArrowRight
                    className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none"
                    aria-hidden="true"
                  />
                </button>

                <p
                  aria-live="polite"
                  className={`text-xs leading-5 sm:max-w-64 sm:text-right ${
                    formStatus === "error"
                      ? "text-destructive"
                      : "text-muted-foreground"
                  }`}
                >
                  {formStatus === "success"
                    ? "Mensagem enviada. Obrigado pelo contato."
                    : formStatus === "error"
                      ? contactFormConfig.endpoint
                        ? "Não foi possível enviar agora. Tente novamente ou use um dos canais ao lado."
                        : "O envio direto ainda não está integrado. Use um dos canais ao lado."
                      : ""}
                </p>
              </div>
            </form>
          </motion.section>
        </motion.div>
      </div>
    </motion.section>
  );
}
