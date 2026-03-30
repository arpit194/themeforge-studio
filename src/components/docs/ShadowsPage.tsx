import { CodeBlock } from "../ui/CodeBlock";
import styles from "./DocPage.module.css";

const SHADOW_KEYS = ["none", "xs", "sm", "md", "lg", "xl", "2xl", "inner"] as const;

export function ShadowsPage() {
  return (
    <article className={styles.page}>
      <h1>Shadows</h1>
      <p className={styles.lead}>
        Elevation tokens from <code>xs</code> to <code>2xl</code>, plus <code>inner</code>
        for inset depth. Shadow colors are derived from the neutral scale so they shift
        subtly when you change your neutral color.
      </p>

      <h2>Scale</h2>
      <div className={styles.tableWrap}>
      <table className={styles.tokenTable}>
        <thead>
          <tr>
            <th>Key</th>
            <th>CSS Variable</th>
            <th>Preview</th>
          </tr>
        </thead>
        <tbody>
          {SHADOW_KEYS.map(key => (
            <tr key={key}>
              <td><code>{key}</code></td>
              <td><code>--tf-shadow-{key}</code></td>
              <td>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    backgroundColor: "var(--tf-color-bg-surface)",
                    borderRadius: "var(--tf-radius-md)",
                    boxShadow: `var(--tf-shadow-${key})`,
                    border: "1px solid var(--tf-color-border-subtle)",
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
  box-shadow: var(--tf-shadow-md);
}

.dropdown {
  box-shadow: var(--tf-shadow-lg);
}

.modal {
  box-shadow: var(--tf-shadow-2xl);
}

.input:focus {
  box-shadow: var(--tf-shadow-inner);
}`}
      />

      <h2>Overriding shadows</h2>
      <p>
        Pass a <code>shadows</code> object to <code>ThemeProvider</code>. Each value is an
        array of shadow layers — this gives you multi-layer shadows and full control over
        blur, spread, and color. Each layer's color comes from a semantic token
        (<code>'shadow-color'</code> by default) so shadows adapt automatically in dark mode.
      </p>
      <CodeBlock
        filename="main.tsx"
        code={`<ThemeProvider
  theme={{ primary: '#7C3AED' }}
  shadows={{
    md: [{ y: 'sm', blur: 'lg' }],
    lg: [
      { y: 'sm', blur: 'md' },
      { y: 'md', blur: 'xl' },
    ],
  }}
>
  <App />
</ThemeProvider>`}
      />
    </article>
  );
}
