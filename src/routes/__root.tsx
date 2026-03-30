import { useRef } from "react";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { ThemeProvider } from "@arpit194/themeforge";
import { usePageTheme } from "../context/usePageTheme";
import { PortalContext } from "../context/PortalContext";
import { typography } from "../config/typography";
import { semanticDarkOverrides } from "../config/semanticTokens";
import { ThemeSwitcher } from "../components/shared/ThemeSwitcher";
import { ThemePicker } from "../components/shared/ThemePicker";
import styles from "./__root.module.css";

export const Route = createRootRoute({
  component: RootLayout,
});

// eslint-disable-next-line react-refresh/only-export-components -- TanStack Router requires Route + component in the same file
function RootLayout() {
  const { primary, secondary, neutral, isDark } = usePageTheme();
  const portalRef = useRef<HTMLDivElement>(null);

  return (
    <ThemeProvider
      theme={{ primary, secondary, neutral }}
      typography={typography}
      colorScheme={isDark ? "dark" : "light"}
      semanticDark={semanticDarkOverrides}
    >
      <PortalContext.Provider value={portalRef}>
        <Outlet />
        <div className={styles.floatingLeft}>
          <ThemePicker />
        </div>
        <div className={styles.floatingRight}>
          <ThemeSwitcher />
        </div>
        <div ref={portalRef} />
      </PortalContext.Provider>
    </ThemeProvider>
  );
}
