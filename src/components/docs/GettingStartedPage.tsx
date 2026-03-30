import styles from "./DocPage.module.css";

export function GettingStartedPage() {
  return (
    <article className={styles.page}>
      <h1>Getting Started</h1>
      <p className={styles.lead}>
        ThemeForge is a lightweight, type-safe design token library for React. Pass a color —
        get a complete token system wired to CSS custom properties automatically.
      </p>

      <h2>How it works</h2>
      <p>
        Most token solutions require you to either define every CSS variable by hand or adopt
        a large framework. ThemeForge takes a different approach: you pass one hex value per
        color scale, and the library generates the entire primitive and semantic layer for you.
      </p>
      <ul>
        <li>
          <strong>Primitive scale</strong> — 11 shades (50–950) generated from your base color
        </li>
        <li>
          <strong>Semantic layer</strong> — tokens like <code>bg-primary-hover</code>,{" "}
          <code>text-on-dark</code>, and <code>border-focus</code> that map to primitives
        </li>
        <li>
          <strong>CSS variables</strong> — everything resolves to <code>--tf-*</code> custom
          properties scoped to the ThemeProvider element
        </li>
        <li>
          <strong>JS access</strong> — read resolved hex values directly via <code>useTheme()</code>
        </li>
        <li>
          <strong>TypeScript</strong> — full type safety with module augmentation for custom tokens
        </li>
        <li>
          <strong>Zero dependencies</strong> — no runtime overhead, no hidden peer deps
        </li>
      </ul>

      <h2>Primitive vs semantic tokens</h2>
      <p>
        ThemeForge maintains two layers of tokens, and understanding the distinction is important
        for using it correctly.
      </p>
      <p>
        <strong>Primitive tokens</strong> are the raw generated shades —{" "}
        <code>--tf-color-primary-500</code>, <code>--tf-color-neutral-200</code>, and so on.
        They represent specific points on a color scale and have no meaning beyond their value.
      </p>
      <p>
        <strong>Semantic tokens</strong> are named by their role — <code>--tf-color-bg-primary</code>,{" "}
        <code>--tf-color-text-secondary</code>, <code>--tf-color-border-default</code>. They
        point to a primitive under the hood, and that mapping flips automatically in dark mode.
        This is what makes dark mode work without any extra CSS.
      </p>
      <div className={`${styles.callout} ${styles.calloutInfo}`}>
        <p>
          Always use semantic tokens in your components. Reaching for a primitive directly
          means the value won't adapt in dark mode.
        </p>
      </div>

      <h2>The token categories</h2>
      <p>
        Tokens are grouped into categories that map to CSS concerns:
      </p>
      <ul>
        <li><strong>color</strong> — semantic color tokens across <code>bg</code>, <code>text</code>, <code>icon</code>, and <code>border</code> groups</li>
        <li><strong>spacing</strong> — a consistent scale from <code>2xs</code> to <code>7xl</code></li>
        <li><strong>radius</strong> — border radius from <code>sm</code> to <code>full</code></li>
        <li><strong>shadow</strong> — elevation levels from <code>sm</code> to <code>xl</code></li>
        <li><strong>typography</strong> — font families, sizes, weights, line heights, and letter spacing</li>
      </ul>

      <h2>Dark mode</h2>
      <p>
        ThemeForge handles dark mode by remapping semantic tokens at the primitive level — the
        same <code>--tf-color-bg-primary</code> variable resolves to a different shade depending
        on the active color scheme. There is no class toggling, no duplicate CSS, and no manual
        overrides needed unless you want to customize the mapping.
      </p>
      <p>
        Color scheme follows the OS preference by default via{" "}
        <code>prefers-color-scheme</code>. You can override it with the{" "}
        <code>colorScheme</code> prop on <code>ThemeProvider</code>.
      </p>

      <h2>Ready to install?</h2>
      <p>
        Head to the <strong>Installation</strong> page for step-by-step setup instructions,
        or jump straight to <strong>ThemeProvider</strong> for the full API reference.
      </p>
    </article>
  );
}
