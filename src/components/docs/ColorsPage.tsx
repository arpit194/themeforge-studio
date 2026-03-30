import { useTheme } from "@arpit194/themeforge";
import { CodeBlock } from "../ui/CodeBlock";
import styles from "./DocPage.module.css";

const SHADES = ["50","100","200","300","400","500","600","700","800","900","950"] as const;

const SEMANTIC_GROUPS = [
  {
    group: "bg",
    tokens: [
      "bg-page", "bg-subtle", "bg-surface", "bg-surface-raised",
      "bg-primary", "bg-primary-hover", "bg-primary-active",
      "bg-primary-subtle", "bg-primary-selected", "bg-primary-disabled",
      "bg-secondary", "bg-secondary-hover", "bg-secondary-active",
      "bg-secondary-subtle",
    ],
  },
  {
    group: "text",
    tokens: [
      "text-primary", "text-secondary", "text-disabled",
      "text-inverse", "text-link", "text-link-hover",
      "text-on-dark", "text-on-light",
      "text-success", "text-warning", "text-error", "text-info",
    ],
  },
  {
    group: "border",
    tokens: [
      "border-subtle", "border-default", "border-strong",
      "border-primary", "border-primary-focus", "border-primary-disabled",
      "border-secondary",
      "border-success", "border-warning", "border-error", "border-info",
    ],
  },
] as const;

function ScaleTable({ scaleName }: { scaleName: "primary" | "secondary" | "neutral" | "success" | "warning" | "error" | "info" }) {
  const { colors } = useTheme();
  const scale = colors[scaleName];

  return (
    <div className={styles.tableWrap}>
    <table className={styles.tokenTable}>
      <thead>
        <tr>
          <th>Shade</th>
          <th>CSS Variable</th>
          <th>Value</th>
          <th>Preview</th>
        </tr>
      </thead>
      <tbody>
        {SHADES.map(shade => (
          <tr key={shade}>
            <td><code>{shade}</code></td>
            <td><code>--tf-color-{scaleName}-{shade}</code></td>
            <td><code>{scale.shades[shade]}</code></td>
            <td>
              <span
                className={styles.swatch}
                style={{ backgroundColor: scale.shades[shade] }}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

function SemanticTable({ tokens }: { group: string; tokens: readonly string[] }) {
  return (
    <div className={styles.tableWrap}>
    <table className={styles.tokenTable}>
      <thead>
        <tr>
          <th>Token</th>
          <th>CSS Variable</th>
          <th>Preview</th>
        </tr>
      </thead>
      <tbody>
        {tokens.map(token => (
          <tr key={token}>
            <td><code>{token}</code></td>
            <td><code>--tf-color-{token}</code></td>
            <td>
              <div className={styles.swatchCell}>
                <span
                  className={styles.swatch}
                  style={{ backgroundColor: `var(--tf-color-${token})` }}
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

export function ColorsPage() {
  return (
    <article className={styles.page}>
      <h1>Colors</h1>
      <p className={styles.lead}>
        ThemeForge generates a complete 11-shade primitive scale from each base color, then
        maps a semantic layer on top. Change the theme in the FAB and watch every table below
        update live — these values are read directly from <code>useTheme()</code>.
      </p>

      <h2>How it works</h2>
      <p>
        You pass a single hex value per color scale. ThemeForge places it at the most
        appropriate shade (the "anchor") and generates the surrounding shades algorithmically —
        lighter shades toward 50, darker toward 950. The result is a perceptually consistent
        scale that works for both light and dark modes.
      </p>
      <CodeBlock
        filename="main.tsx"
        code={`<ThemeProvider
  theme={{
    primary:   '#7C3AED',
    secondary: '#F59E0B',
  }}
>
  <App />
</ThemeProvider>`}
      />

      <h2>Primitive scales</h2>
      <p>
        Each scale produces 11 CSS variables: <code>--tf-color-{"{scale}"}-50</code> through{" "}
        <code>--tf-color-{"{scale}"}-950</code>. Use these only when building the semantic
        layer — prefer semantic tokens in your components.
      </p>

      <h3>Primary</h3>
      <ScaleTable scaleName="primary" />

      <h3>Secondary</h3>
      <ScaleTable scaleName="secondary" />

      <h3>Neutral</h3>
      <ScaleTable scaleName="neutral" />

      <div className={`${styles.callout} ${styles.calloutWarning}`}>
        <p>
          Avoid using primitive scale variables (e.g. <code>--tf-color-primary-500</code>)
          directly in components. Use semantic tokens instead — they adapt automatically in
          dark mode and when the theme changes.
        </p>
      </div>

      <h2>Semantic tokens</h2>
      <p>
        Semantic tokens give meaning to colors. Instead of <code>--tf-color-primary-500</code>,
        you write <code>--tf-color-bg-primary</code> — the intent is clear and the value
        adapts to dark mode automatically.
      </p>
      <p>
        Tokens are grouped by usage: <code>bg-*</code> for backgrounds, <code>text-*</code> for
        text, <code>border-*</code> for borders, <code>icon-*</code> for icons.
      </p>

      {SEMANTIC_GROUPS.map(({ group, tokens }) => (
        <div key={group}>
          <h3>{group}-*</h3>
          <SemanticTable group={group} tokens={tokens} />
        </div>
      ))}

      <h2>Using colors in CSS</h2>
      <CodeBlock
        filename="Card.css"
        code={`.card {
  background: var(--tf-color-bg-surface);
  border: 1px solid var(--tf-color-border-subtle);
}

.cardTitle {
  color: var(--tf-color-text-primary);
}

.cardBody {
  color: var(--tf-color-text-secondary);
}

.badge {
  background: var(--tf-color-bg-primary-subtle);
  color: var(--tf-color-text-link);
  border: 1px solid var(--tf-color-border-primary);
}`}
      />

      <h2>Using colors in JavaScript</h2>
      <p>
        Use <code>useTheme()</code> to access resolved hex values directly — useful for
        canvas rendering, charting libraries, or anything that can't consume CSS variables.
      </p>
      <CodeBlock
        filename="Chart.tsx"
        code={`import { useTheme } from '@arpit194/themeforge'

export function Chart() {
  const { colors } = useTheme()

  return (
    <BarChart
      data={data}
      primaryColor={colors.primary.shades[500]}
      secondaryColor={colors.secondary.shades[400]}
      gridColor={colors.neutral.shades[200]}
    />
  )
}`}
      />

      <h2>Status colors</h2>
      <p>
        ThemeForge includes built-in <code>success</code>, <code>warning</code>,{" "}
        <code>error</code>, and <code>info</code> scales, each with matching semantic tokens.
      </p>
      <CodeBlock
        filename="Alert.css"
        code={`.alertError {
  background: var(--tf-color-bg-error-subtle);
  color: var(--tf-color-text-error);
  border: 1px solid var(--tf-color-border-error);
}

.alertSuccess {
  background: var(--tf-color-bg-success-subtle);
  color: var(--tf-color-text-success);
  border: 1px solid var(--tf-color-border-success);
}`}
      />
    </article>
  );
}
