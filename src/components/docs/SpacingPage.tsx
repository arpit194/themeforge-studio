import { useTheme } from "@arpit194/themeforge";
import { CodeBlock } from "../ui/CodeBlock";
import styles from "./DocPage.module.css";

const SPACING_KEYS = [
  "3xs", "2xs", "xs", "sm", "md", "lg", "xl",
  "2xl", "3xl", "4xl", "5xl", "6xl", "7xl", "8xl", "9xl", "10xl",
] as const;

export function SpacingPage() {
  const { spacing } = useTheme();

  return (
    <article className={styles.page}>
      <h1>Spacing</h1>
      <p className={styles.lead}>
        A consistent scale from <code>3xs</code> to <code>10xl</code> exposed as CSS custom
        properties. Use these for all margin, padding, and gap values to keep spacing coherent
        across your UI.
      </p>

      <h2>Scale</h2>
      <div className={styles.tableWrap}>
      <table className={styles.tokenTable}>
        <thead>
          <tr>
            <th>Key</th>
            <th>CSS Variable</th>
            <th>Value</th>
            <th>Preview</th>
          </tr>
        </thead>
        <tbody>
          {SPACING_KEYS.map(key => (
            <tr key={key}>
              <td><code>{key}</code></td>
              <td><code>--tf-spacing-{key}</code></td>
              <td><code>{spacing[key]}</code></td>
              <td>
                <div
                  style={{
                    width: spacing[key],
                    height: "12px",
                    backgroundColor: "var(--tf-color-bg-primary)",
                    borderRadius: "var(--tf-radius-xs)",
                    minWidth: "2px",
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      <h2>Usage</h2>
      <CodeBlock
        filename="Card.module.css"
        language="css"
        code={`.card {
  padding: var(--tf-spacing-xl);
  gap: var(--tf-spacing-md);
}

.cardHeader {
  margin-bottom: var(--tf-spacing-lg);
}

.cardFooter {
  padding-top: var(--tf-spacing-md);
  margin-top: var(--tf-spacing-xl);
}`}
      />

      <h2>Overriding the scale</h2>
      <p>
        Pass a <code>spacing</code> object to <code>ThemeProvider</code> to override individual
        keys. Unspecified keys keep their defaults.
      </p>
      <CodeBlock
        filename="main.tsx"
        code={`<ThemeProvider
  theme={{ primary: '#7C3AED' }}
  spacing={{ md: '10px', lg: '14px' }}
>
  <App />
</ThemeProvider>`}
      />
    </article>
  );
}
