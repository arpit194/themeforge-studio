import { flushSync } from "react-dom";
import { Moon, Sun } from "lucide-react";
import { usePageTheme } from "../../context/usePageTheme";
import { Button } from "../ui/Button";
import styles from "./ThemeSwitcher.module.css";

export function ThemeSwitcher() {
  const { isDark, toggleDark } = usePageTheme();

  function handleToggle() {
    if (!document.startViewTransition) {
      toggleDark();
      return;
    }
    document.startViewTransition(() => {
      flushSync(() => toggleDark());
    });
  }

  return (
    <Button
      variant="primary"
      size="md"
      className={styles.fab}
      onClick={handleToggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
      <span className={styles.label}>{isDark ? "Light mode" : "Dark mode"}</span>
    </Button>
  );
}
