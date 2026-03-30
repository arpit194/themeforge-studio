import { useTheme } from "@arpit194/themeforge";
import { CodeBlock } from "../ui/CodeBlock";
import styles from "./DocPage.module.css";

const RADIUS_KEYS = ["none", "xs", "sm", "md", "lg", "xl", "2xl", "3xl", "full"] as const;

export function RadiusPage() {
  const { radius } = useTheme();

  return (
    <article className={styles.page}>
      <h1>Radius</h1>
      <p className={styles.lead}>
        Border radius tokens from <code>none</code> to <code>full</code>. Apply them
        consistently across components to maintain a coherent shape language.
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
          {RADIUS_KEYS.map(key => (
            <tr key={key}>
              <td><code>{key}</code></td>
              <td><code>--tf-radius-{key}</code></td>
              <td><code>{radius[key]}</code></td>
              <td>
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "var(--tf-color-bg-primary)",
                    borderRadius: radius[key],
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
        filename="Button.module.css"
        language="css"
        code={`.button {
  border-radius: var(--tf-radius-md);
}

.pill {
  border-radius: var(--tf-radius-full);
}

.card {
  border-radius: var(--tf-radius-xl);
}

.avatar {
  border-radius: var(--tf-radius-full);
}`}
      />

      <h2>Overriding the scale</h2>
      <p>
        Pass a <code>radius</code> object to <code>ThemeProvider</code> to override individual
        keys. Unspecified keys keep their defaults.
      </p>
      <CodeBlock
        filename="main.tsx"
        code={`<ThemeProvider
  theme={{ primary: '#7C3AED' }}
  radius={{ md: '6px', lg: '10px', xl: '16px' }}
>
  <App />
</ThemeProvider>`}
      />
    </article>
  );
}
