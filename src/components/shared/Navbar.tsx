import { Link } from "@tanstack/react-router";
import styles from "./Navbar.module.css";

type Props = {
  section?: string;
};

export function Navbar({ section }: Props) {
  return (
    <header className={styles.nav}>
      <div className={styles.left}>
        <Link to="/" className={styles.logo}>ThemeForge</Link>
        {section && (
          <>
            <span className={styles.divider}>/</span>
            <span className={styles.section}>{section}</span>
          </>
        )}
      </div>
      <nav className={styles.links}>
        <a href="/playground" className={styles.link}>Playground</a>
        <Link to="/docs/getting-started" className={styles.link}>Docs</Link>
        <a href="https://github.com/arpit194/themeforge" className={styles.link} target="_blank" rel="noreferrer">GitHub</a>
      </nav>
    </header>
  );
}
