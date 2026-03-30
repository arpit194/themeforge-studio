import styles from "./Footer.module.css";

const NAV_LINKS = [
  { label: "Playground", href: "/playground" },
  { label: "Tokens",     href: "/tokens" },
  { label: "Docs",       href: "/docs" },
  { label: "GitHub",     href: "https://github.com/arpit194/themeforge", external: true },
  { label: "npm",        href: "https://www.npmjs.com/package/@arpit194/themeforge", external: true },
] as const;

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <span className={styles.logo}>ThemeForge</span>
            <p className={styles.tagline}>
              Lightweight, type-safe design tokens for React.
            </p>
            <code className={styles.install}>npm install @arpit194/themeforge</code>
          </div>

          <nav className={styles.nav} aria-label="Footer navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={styles.link}
                {...('external' in link && link.external ? { target: "_blank", rel: "noreferrer" } : {})}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>
            MIT License · Built with ThemeForge
          </p>
        </div>
      </div>
    </footer>
  );
}
