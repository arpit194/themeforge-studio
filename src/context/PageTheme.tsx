import { useState, type ReactNode } from "react";
import { PageThemeContext } from "./pageThemeContext";

const LS_PRIMARY   = "tf-primary";
const LS_SECONDARY = "tf-secondary";
const LS_NEUTRAL   = "tf-neutral";
const LS_DARK      = "tf-dark";

function read(key: string, fallback: string): string {
  return localStorage.getItem(key) ?? fallback;
}

export function PageThemeProvider({ children }: { children: ReactNode }) {
  const [primary, _setPrimary]     = useState(() => read(LS_PRIMARY,   "#7C3AED"));
  const [secondary, _setSecondary] = useState(() => read(LS_SECONDARY, "#F59E0B"));
  const [neutral, _setNeutral]     = useState(() => read(LS_NEUTRAL,   "#6B7280"));
  const [isDark, setIsDark]        = useState(() => read(LS_DARK, "false") === "true");

  function setPrimary(hex: string) {
    localStorage.setItem(LS_PRIMARY, hex);
    _setPrimary(hex);
  }

  function setSecondary(hex: string) {
    localStorage.setItem(LS_SECONDARY, hex);
    _setSecondary(hex);
  }

  function setNeutral(hex: string) {
    localStorage.setItem(LS_NEUTRAL, hex);
    _setNeutral(hex);
  }

  function toggleDark() {
    setIsDark(prev => {
      const next = !prev;
      localStorage.setItem(LS_DARK, String(next));
      return next;
    });
  }

  return (
    <PageThemeContext.Provider value={{ primary, secondary, neutral, isDark, setPrimary, setSecondary, setNeutral, toggleDark }}>
      {children}
    </PageThemeContext.Provider>
  );
}
