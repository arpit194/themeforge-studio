import { CodeBlock } from "../ui/CodeBlock";
import styles from "./DocPage.module.css";

const CATEGORIES = [
  {
    name: "Color — semantic",
    pattern: "--tf-color-{token}",
    examples: [
      "--tf-color-bg-primary",
      "--tf-color-bg-primary-hover",
      "--tf-color-bg-secondary-subtle",
      "--tf-color-text-primary",
      "--tf-color-text-secondary",
      "--tf-color-text-on-dark",
      "--tf-color-border-default",
      "--tf-color-border-primary",
      "--tf-color-bg-error-subtle",
      "--tf-color-text-success",
    ],
  },
  {
    name: "Color — primitive",
    pattern: "--tf-color-{scale}-{shade}",
    examples: [
      "--tf-color-primary-50",
      "--tf-color-primary-500",
      "--tf-color-primary-950",
      "--tf-color-secondary-400",
      "--tf-color-neutral-200",
      "--tf-color-neutral-900",
    ],
  },
  {
    name: "Spacing",
    pattern: "--tf-spacing-{key}",
    examples: [
      "--tf-spacing-xs",
      "--tf-spacing-sm",
      "--tf-spacing-md",
      "--tf-spacing-lg",
      "--tf-spacing-xl",
      "--tf-spacing-2xl",
    ],
  },
  {
    name: "Radius",
    pattern: "--tf-radius-{key}",
    examples: [
      "--tf-radius-sm",
      "--tf-radius-md",
      "--tf-radius-lg",
      "--tf-radius-xl",
      "--tf-radius-full",
    ],
  },
  {
    name: "Shadow",
    pattern: "--tf-shadow-{key}",
    examples: [
      "--tf-shadow-sm",
      "--tf-shadow-md",
      "--tf-shadow-lg",
      "--tf-shadow-xl",
      "--tf-shadow-inner",
    ],
  },
  {
    name: "Font family",
    pattern: "--tf-font-family-{key}",
    examples: [
      "--tf-font-family-primary",
      "--tf-font-family-secondary",
      "--tf-font-family-mono",
    ],
  },
  {
    name: "Font size",
    pattern: "--tf-font-size-{key}",
    examples: [
      "--tf-font-size-xs",
      "--tf-font-size-sm",
      "--tf-font-size-md",
      "--tf-font-size-lg",
      "--tf-font-size-xl",
      "--tf-font-size-3xl",
    ],
  },
  {
    name: "Font weight",
    pattern: "--tf-font-weight-{key}",
    examples: [
      "--tf-font-weight-regular",
      "--tf-font-weight-medium",
      "--tf-font-weight-semibold",
      "--tf-font-weight-bold",
    ],
  },
  {
    name: "Line height",
    pattern: "--tf-line-height-{key}",
    examples: [
      "--tf-line-height-tight",
      "--tf-line-height-normal",
      "--tf-line-height-relaxed",
    ],
  },
  {
    name: "Letter spacing",
    pattern: "--tf-letter-spacing-{key}",
    examples: [
      "--tf-letter-spacing-tight",
      "--tf-letter-spacing-normal",
      "--tf-letter-spacing-wide",
      "--tf-letter-spacing-wider",
    ],
  },
  {
    name: "Text style",
    pattern: "--tf-text-{style}-{property}",
    examples: [
      "--tf-text-h1-size",
      "--tf-text-body-family",
      "--tf-text-body-size",
      "--tf-text-label-weight",
      "--tf-text-code-family",
    ],
  },
] as const;

export function CssVariablesPage() {
  return (
    <article className={styles.page}>
      <h1>CSS Variables</h1>
      <p className={styles.lead}>
        Every ThemeForge token is exposed as a CSS custom property scoped to the{" "}
        <code>ThemeProvider</code> element. All variables follow a consistent naming pattern
        and are available to any descendant via the cascade.
      </p>

      <h2>Naming convention</h2>
      <p>
        All variables follow the pattern:
      </p>
      <CodeBlock
        language="css"
        code={`--{prefix}-{category}-{key}

/* Default prefix is "tf" */
--tf-color-bg-primary
--tf-spacing-md
--tf-radius-lg
--tf-shadow-sm
--tf-font-size-xl
--tf-font-weight-semibold`}
      />
      <p>
        The prefix defaults to <code>tf</code> and can be changed via the{" "}
        <code>cssVarPrefix</code> prop on <code>ThemeProvider</code>.
      </p>

      <h2>Categories</h2>
      <div className={styles.tableWrap}>
      <table className={styles.tokenTable}>
        <thead>
          <tr>
            <th>Category</th>
            <th>Pattern</th>
            <th>Examples</th>
          </tr>
        </thead>
        <tbody>
          {CATEGORIES.map(({ name, pattern, examples }) => (
            <tr key={name}>
              <td>{name}</td>
              <td><code>{pattern}</code></td>
              <td>
                <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  {examples.slice(0, 3).map(v => (
                    <code key={v} style={{ fontSize: "11px" }}>{v}</code>
                  ))}
                  {examples.length > 3 && (
                    <span style={{ fontSize: "11px", color: "var(--tf-color-text-secondary)" }}>
                      +{examples.length - 3} more
                    </span>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      <h2>Scoping</h2>
      <p>
        Variables are set on whichever element <code>ThemeProvider</code> renders — not on{" "}
        <code>:root</code>. This means you can nest multiple <code>ThemeProvider</code>{" "}
        instances with different themes and the correct values will cascade to each subtree.
      </p>
      <CodeBlock
        filename="ScopedTheme.tsx"
        code={`<ThemeProvider theme={{ primary: '#7C3AED' }}>
  <MainContent />

  {/* This subtree uses a different primary color */}
  <ThemeProvider theme={{ primary: '#E11D48' }}>
    <PromoBanner />
  </ThemeProvider>
</ThemeProvider>`}
      />

      <h2>Usage in CSS</h2>
      <CodeBlock
        filename="Component.module.css"
        language="css"
        code={`.button {
  background-color: var(--tf-color-bg-primary);
  color: var(--tf-color-text-on-dark);
  border-radius: var(--tf-radius-md);
  padding: var(--tf-spacing-xs) var(--tf-spacing-lg);
  font-size: var(--tf-text-label-size);
  font-weight: var(--tf-text-label-weight);
  box-shadow: var(--tf-shadow-sm);
}`}
      />

      <h2>Usage in inline styles</h2>
      <CodeBlock
        filename="Component.tsx"
        code={`<div
  style={{
    backgroundColor: 'var(--tf-color-bg-surface)',
    padding: 'var(--tf-spacing-xl)',
    borderRadius: 'var(--tf-radius-lg)',
  }}
/>`}
      />

      <div className={`${styles.callout} ${styles.calloutWarning}`}>
        <p>
          Always use semantic color variables like <code>--tf-color-bg-primary</code> in
          components — not primitive scale variables like{" "}
          <code>--tf-color-primary-500</code>. Only semantic variables remap in dark mode.
        </p>
      </div>

      <h2>Changing the prefix</h2>
      <p>
        If <code>tf</code> conflicts with another library, change the prefix via{" "}
        <code>cssVarPrefix</code>. All generated variable names will update automatically.
      </p>
      <CodeBlock
        filename="main.tsx"
        code={`<ThemeProvider cssVarPrefix="ds">
  {/* All variables now use --ds-* */}
  {/* --ds-color-bg-primary, --ds-spacing-md, etc. */}
</ThemeProvider>`}
      />
    </article>
  );
}
