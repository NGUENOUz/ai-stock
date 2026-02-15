import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Footer } from "@/components/footer";
import HeaderComponent from "@/components/header";

import { cn } from "@/lib/utils";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI-STOCK | Le Hub Ultime de l'Intelligence Artificielle",
  description:
    "Découvrez les meilleurs outils IA, prompts, workflows et formations sur la plateforme référence francophone.",
  keywords: [
    "IA",
    "Intelligence Artificielle",
    "Annuaire IA",
    "Prompts Library",
    "Formations IA",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          "antialiased min-h-screen bg-white text-black font-sans selection:bg-primary/30",
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {/* Header fixe en haut */}
          <HeaderComponent />

          {/* Main avec un min-height pour éviter les sauts de page au chargement */}
          <main className="relative flex flex-col min-h-screen">
            {children}
          </main>

          <Footer />
        </ThemeProvider>

        <Analytics />
      </body>
    </html>
  );
}
