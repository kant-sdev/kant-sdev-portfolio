import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

import "./globals.css";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "kant-sdev | Portfólio",
  description: "Portfólio profissional de kant-sdev.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${jetBrainsMono.variable} h-full`}>
      <body
        className={`${jetBrainsMono.className} flex min-h-full flex-col bg-background text-foreground antialiased`}
      >
        <Header />
        <main id="main-content" className="flex flex-1 flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
