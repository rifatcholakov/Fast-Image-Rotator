import { useState, useEffect } from 'react';
import { THEMES, THEME_STORAGE_KEY } from '../utils/constants.js';

export const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: light)').matches 
      ? THEMES.LIGHT 
      : THEMES.DARK;
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK));

  return { theme, toggleTheme };
};
