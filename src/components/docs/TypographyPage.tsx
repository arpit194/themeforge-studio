import { useTheme } from "@arpit194/themeforge";
import { CodeBlock } from "../ui/CodeBlock";
import styles from "./DocPage.module.css";

const FONT_SIZE_KEYS = ["2xs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "7xl"] as const;
const FONT_WEIGHT_KEYS = ["thin", "light", "regular", "medium", "semibold", "bold", "black"] as const;
const LINE_HEIGHT_KEYS = ["none", "tight", "snug", "normal", "relaxed", "loose"] as const;
const LETTER_SPACING_KEYS = ["tighter", "tight", "normal", "wide", "wider", "widest"] as const;
const TEXT_STYLE_KEYS = ["h1", "h2", "h3", "h4", "h5", "h6", "body-lg", "body", "body-sm", "label", "caption", "code"] as const;

export function TypographyPage() {
  const { typography } = useTheme();

  return (
    <article className={styles.page}>
      <h1>Typography</h1>
      <p className={styles.lead}>
        Typography tokens cover font families, sizes, weights, line heights, letter spacing,
        and composite text styles. All values are exposed as CSS custom properties and can
        be overridden via the <code>typography</code> prop on <code>ThemeProvider</code>.
      </p>

      <h2>Font families</h2>
      <p>
        Two built-in family slots: <code>primary</code> for display and headings, and{" "}
        <code>secondary</code> for body and UI text. Additional slots (e.g. <code>mono</code>)
        are added via <code>CustomFontFamilyKeys</code> module augmentation.
      </p>
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
          {(["primary", "secondary", "mono"] as const).map(key => (
            <tr key={key}>
              <td><code>{key}</code></td>
              <td><code>--tf-font-family-{key}</code></td>
              <td><code style={{ fontSize: "11px" }}>{typography.fontFamilies[key]}</code></td>
              <td>
                <span style={{ fontFamily: typography.fontFamilies[key] }}>
                  The quick brown fox
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      <h2>Font sizes</h2>
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
          {FONT_SIZE_KEYS.map(key => (
            <tr key={key}>
              <td><code>{key}</code></td>
              <td><code>--tf-font-size-{key}</code></td>
              <td><code>{typography.fontSizes[key]}</code></td>
              <td>
                <span style={{ fontSize: typography.fontSizes[key], lineHeight: 1 }}>Aa</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      <h2>Font weights</h2>
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
          {FONT_WEIGHT_KEYS.map(key => (
            <tr key={key}>
              <td><code>{key}</code></td>
              <td><code>--tf-font-weight-{key}</code></td>
              <td><code>{typography.fontWeights[key]}</code></td>
              <td>
                <span style={{ fontWeight: typography.fontWeights[key] }}>
                  The quick brown fox
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      <h2>Line heights</h2>
      <div className={styles.tableWrap}>
      <table className={styles.tokenTable}>
        <thead>
          <tr>
            <th>Key</th>
            <th>CSS Variable</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {LINE_HEIGHT_KEYS.map(key => (
            <tr key={key}>
              <td><code>{key}</code></td>
              <td><code>--tf-line-height-{key}</code></td>
              <td><code>{typography.lineHeights[key]}</code></td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      <h2>Letter spacing</h2>
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
          {LETTER_SPACING_KEYS.map(key => (
            <tr key={key}>
              <td><code>{key}</code></td>
              <td><code>--tf-letter-spacing-{key}</code></td>
              <td><code>{typography.letterSpacing[key]}</code></td>
              <td>
                <span style={{ letterSpacing: typography.letterSpacing[key] }}>
                  ABCDEFG
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      <h2>Text styles</h2>
      <p>
        Composite styles that combine family, size, weight, line height, and letter spacing.
        Each style exposes individual CSS variables — e.g. <code>--tf-text-body-size</code>,{" "}
        <code>--tf-text-label-weight</code>.
      </p>
      <div className={styles.tableWrap}>
      <table className={styles.tokenTable}>
        <thead>
          <tr>
            <th>Style</th>
            <th>Preview</th>
          </tr>
        </thead>
        <tbody>
          {TEXT_STYLE_KEYS.map(key => {
            const s = typography.textStyles[key];
            return (
              <tr key={key}>
                <td><code>{key}</code></td>
                <td>
                  <span
                    style={{
                      fontFamily: typography.fontFamilies[s.family],
                      fontSize: typography.fontSizes[s.size],
                      fontWeight: typography.fontWeights[s.weight],
                      lineHeight: typography.lineHeights[s.lineHeight],
                      letterSpacing: typography.letterSpacing[s.letterSpacing],
                    }}
                  >
                    The quick brown fox
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>

      <h2>Overriding typography</h2>
      <p>
        Pass a <code>typography</code> object to <code>ThemeProvider</code>. Each key is
        optional — unspecified values keep their defaults. Text style overrides are
        per-property, so you can change just the weight without re-specifying the full style.
      </p>
      <CodeBlock
        filename="main.tsx"
        code={`import { ThemeProvider } from '@arpit194/themeforge'

<ThemeProvider
  theme={{ primary: '#7C3AED' }}
  typography={{
    fontFamilies: {
      primary: "'Playfair Display', serif",
      mono: "'Fira Code', monospace",
    },
    textStyles: {
      h1: { weight: 'bold' },
      label: { weight: 'semibold' },
    },
  }}
>
  <App />
</ThemeProvider>`}
      />
    </article>
  );
}
