import { createContext } from "react";

export type PageThemeContextValue = {
  primary: string;
  secondary: string;
  neutral: string;
  isDark: boolean;
  setPrimary: (hex: string) => void;
  setSecondary: (hex: string) => void;
  setNeutral: (hex: string) => void;
  toggleDark: () => void;
};

export const PageThemeContext = createContext<PageThemeContextValue | null>(null);
