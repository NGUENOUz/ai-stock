import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "next-themes";
import ConditionalLayout from "@/components/ConditionalLayout";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
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
          plusJakartaSans.variable,
          "antialiased min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-sans selection:bg-primary/30",
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange
        >
          <ConditionalLayout>{children}</ConditionalLayout>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
