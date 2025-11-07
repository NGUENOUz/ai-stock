// src/components/theme-toggle.tsx
"use client";

import React from 'react';
import { useTheme } from '@/context/theme-provider';
import { IconSun, IconMoon } from '@tabler/icons-react';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-neutral-700 dark:bg-neutral-800 text-white dark:text-yellow-500 hover:bg-neutral-600 dark:hover:bg-neutral-700 transition duration-300"
      aria-label={`Passer au mode ${theme === 'dark' ? 'jour' : 'nuit'}`}
    >
      {theme === 'dark' ? (
        <IconSun className="w-6 h-6" />
      ) : (
        <IconMoon className="w-6 h-6" />
      )}
    </button>
  );
};

export default ThemeToggle;