// src/context/theme-provider.tsx
"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// --- Définitions des Types ---
type Theme = 'light' | 'dark';

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

// Création du Contexte
const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

// --- Composant Provider ---
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // Initialisation à partir du système ou du LocalStorage
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme') as Theme;
      if (storedTheme) return storedTheme;
      // Optionnel : Détecter la préférence système
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'dark'; // Thème sombre par défaut
  });

  // Effet pour appliquer la classe 'dark' à l'élément <html> et mettre à jour le LocalStorage
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Retirer les deux classes pour éviter les conflits
    root.classList.remove('light', 'dark');

    // Ajouter la classe correspondante et mettre à jour le LocalStorage
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Fonction pour changer l'état du thème
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  // Fonction pour basculer entre les modes
  const toggleTheme = () => {
    setThemeState(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// --- Hook Personnalisé pour l'utilisation ---
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};