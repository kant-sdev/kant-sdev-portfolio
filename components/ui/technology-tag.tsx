"use client";

import Link from "next/link";
import { useLocale } from "@/components/i18n/locale-provider";
import type { IconType } from "react-icons";
import { FaAws, FaJava, FaLinux } from "react-icons/fa";
import { GrOracle } from "react-icons/gr";
import {
  SiDocker,
  SiFastapi,
  SiHibernate,
  SiJson,
  SiJsonwebtokens,
  SiMysql,
  SiNextdotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiSpring,
  SiSpringboot,
  SiSpringsecurity,
  SiTypescript,
} from "react-icons/si";
import { TbApi, TbCode, TbGitBranch, TbHttpGet, TbSql } from "react-icons/tb";

type TechnologyPresentation = {
  icon: IconType;
  iconColor: string;
};

const technologyPresentation: Record<string, TechnologyPresentation> = {
  Java: { icon: FaJava, iconColor: "text-[#f89820]" },
  "Spring Boot": { icon: SiSpringboot, iconColor: "text-[#6db33f]" },
  "REST APIs": { icon: TbApi, iconColor: "text-sky-500" },
  "Spring Data JPA": { icon: SiSpring, iconColor: "text-[#6db33f]" },
  "Spring Security": {
    icon: SiSpringsecurity,
    iconColor: "text-[#6db33f]",
  },
  PostgreSQL: { icon: SiPostgresql, iconColor: "text-[#4169e1]" },
  MySQL: { icon: SiMysql, iconColor: "text-[#4479a1]" },
  SQL: { icon: TbSql, iconColor: "text-amber-600" },
  "JPA / Hibernate": { icon: SiHibernate, iconColor: "text-[#59666c]" },
  React: { icon: SiReact, iconColor: "text-[#61dafb]" },
  TypeScript: { icon: SiTypescript, iconColor: "text-[#3178c6]" },
  "Next.js": { icon: SiNextdotjs, iconColor: "text-foreground" },
  AWS: { icon: FaAws, iconColor: "text-[#ff9900]" },
  "Oracle Cloud Infrastructure": {
    icon: GrOracle,
    iconColor: "text-[#f80000]",
  },
  OCI: { icon: GrOracle, iconColor: "text-[#f80000]" },
  Docker: { icon: SiDocker, iconColor: "text-[#2496ed]" },
  "CI/CD": { icon: TbGitBranch, iconColor: "text-violet-600" },
  Linux: { icon: FaLinux, iconColor: "text-[#d4a20a]" },
  Python: { icon: SiPython, iconColor: "text-[#3776ab]" },
  FastAPI: { icon: SiFastapi, iconColor: "text-[#009688]" },
  JWT: { icon: SiJsonwebtokens, iconColor: "text-violet-600" },
  HTTP: { icon: TbHttpGet, iconColor: "text-sky-600" },
  JSON: { icon: SiJson, iconColor: "text-amber-600" },
};

export type TechnologyTagProps = {
  name: string;
  href?: string;
  context?: string;
  emphasis?: "primary" | "secondary";
  size?: "default" | "compact";
};

export function TechnologyTag({
  name,
  href,
  context,
  emphasis,
  size = "default",
}: TechnologyTagProps) {
  const { content: dictionary } = useLocale();
  const presentation = technologyPresentation[name];
  const Icon = presentation?.icon ?? TbCode;
  const iconColor = presentation?.iconColor ?? "text-muted-foreground";
  const emphasisStyles =
    emphasis === "primary"
      ? "border-foreground bg-foreground text-background hover:bg-foreground/85"
      : emphasis === "secondary"
        ? "border-foreground/45 bg-background text-foreground hover:border-foreground hover:bg-muted"
        : "border-border bg-background text-muted-foreground hover:border-foreground/45 hover:text-foreground";
  const sizeStyles =
    size === "compact"
      ? "min-h-9 gap-2 px-3 py-1.5 text-xs"
      : "min-h-11 gap-2.5 px-4 py-2 text-sm";
  const className = `inline-flex items-center rounded-sm border font-medium transition-colors ${sizeStyles} ${emphasisStyles}`;
  const content = (
    <>
      <Icon
        className={`${size === "compact" ? "size-3.5" : "size-4"} shrink-0 ${iconColor}`}
        aria-hidden="true"
      />
      {name}
    </>
  );

  if (!href) {
    return <span className={className}>{content}</span>;
  }

  return (
    <Link
      href={href}
      aria-label={context ? dictionary.common.technologyContext(name, context) : name}
      className={`${className} cursor-pointer transition-[color,background-color,border-color,box-shadow,transform] hover:-translate-y-0.5 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transform-none motion-reduce:transition-colors`}
    >
      {content}
    </Link>
  );
}
