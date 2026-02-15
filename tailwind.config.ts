import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";
const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Palette AI-STOCK
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "#FFD11A", // Jaune focus
        background: "#FFFFFF", // Fond Blanc pur
        foreground: "#000000", // Texte Noir pur
        primary: {
          DEFAULT: "#FFD11A", // Jaune AI-STOCK (un poil plus chaud et saturé)
          foreground: "#000000",
        },
        secondary: {
          DEFAULT: "#F8F8F8", // Gris "Soft" pour les fonds de cartes ou sidebar
          foreground: "#1A1A1A",
        },
        accent: {
          DEFAULT: "#FFFBEB", // Jaune très clair pour les hovers d'items
          foreground: "#000000",
        },
        muted: {
          DEFAULT: "#737373", // Gris neutre pour le texte secondaire
          foreground: "#A3A3A3",
        },
        // Couleurs d'états (badges)
        success: "#10B981",
        error: "#EF4444",
        info: "#3B82F6",
      },
      borderRadius: {
        lg: "24px", // Pour les grandes sections et cartes principales
        md: "16px", // Pour les conteneurs moyens
        sm: "12px", // Pour les boutons et inputs
      },
      boxShadow: {
        // Ombres "Framer" : très diffuses et légères
        premium:
          "0 0 0 1px rgba(0,0,0,0.03), 0 2px 4px rgba(0,0,0,0.02), 0 12px 24px rgba(0,0,0,0.03)",
        soft: "0 2px 15px -3px rgba(0,0,0,0.07), 0 4px 6px -2px rgba(0,0,0,0.05)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out forwards",
      },
    },
  },
  plugins: [tailwindAnimate],
};

export default config;
