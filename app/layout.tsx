import { JetBrains_Mono } from "next/font/google";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { LocaleProvider } from "@/components/i18n/locale-provider";
import { defaultLocale } from "@/lib/i18n/config";

import "./globals.css";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang={defaultLocale} className={`${jetBrainsMono.variable} h-full`}>
      <body
        className={`${jetBrainsMono.className} flex min-h-full flex-col bg-background text-foreground antialiased`}
      >
        <LocaleProvider>
          <Header />
          <main id="main-content" className="flex flex-1 flex-col">
            {children}
          </main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
