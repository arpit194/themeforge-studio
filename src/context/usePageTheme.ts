import { useContext } from "react";
import { PageThemeContext } from "./pageThemeContext";

export function usePageTheme() {
  const ctx = useContext(PageThemeContext);
  if (!ctx) throw new Error("usePageTheme must be used within PageThemeProvider");
  return ctx;
}
