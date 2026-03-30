import { Button } from "../ui/Button";
import styles from "./HeroSection.module.css";

export function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <p className={styles.eyebrow}>Design token library for React</p>
        <h1 className={styles.headline}>
          Design tokens<br />
          <em>with intent.</em>
        </h1>

        <div className={styles.swatchStrip}>
          <div className={`${styles.swatch} ${styles.s50}`} />
          <div className={`${styles.swatch} ${styles.s100}`} />
          <div className={`${styles.swatch} ${styles.s200}`} />
          <div className={`${styles.swatch} ${styles.s300}`} />
          <div className={`${styles.swatch} ${styles.s400}`} />
          <div className={`${styles.swatch} ${styles.s500}`} />
          <div className={`${styles.swatch} ${styles.s600}`} />
          <div className={`${styles.swatch} ${styles.s700}`} />
          <div className={`${styles.swatch} ${styles.s800}`} />
          <div className={`${styles.swatch} ${styles.s900}`} />
          <div className={`${styles.swatch} ${styles.s950}`} />
        </div>

        <p className={styles.description}>
          A lightweight, type-safe design token library for React. One base
          color generates eleven shades. A semantic layer gives tokens
          meaning —{" "}
          <code className={styles.inlineCode}>bg-primary-hover</code>,{" "}
          <code className={styles.inlineCode}>text-on-dark</code>,{" "}
          <code className={styles.inlineCode}>border-focus</code>. All resolved
          to CSS variables.
        </p>

        <div className={styles.actions}>
          <Button variant="primary" size="lg" nativeButton={false} render={<a href="#quick-start" />}>Get Started</Button>
          <Button variant="secondary" size="lg" nativeButton={false} render={<a href="https://github.com/arpit194/themeforge" target="_blank" rel="noreferrer" />}>View on GitHub</Button>
        </div>
      </div>
    </section>
  );
}
