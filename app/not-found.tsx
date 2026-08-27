import type { Metadata } from "next";

import { NotFoundContent } from "@/components/not-found-content";

export const metadata: Metadata = {
  title: "404 — Página não encontrada | Kant Cantanhede",
  description: "A página solicitada não foi encontrada.",
};

export default function NotFound() {
  return <NotFoundContent />;
}
