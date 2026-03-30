import { Link } from "@tanstack/react-router";
import { useTheme } from "@arpit194/themeforge";
import { CodeBlock } from "../ui/CodeBlock";
import styles from "./DocPage.module.css";

const RETURN_VALUES = [
  {
    key: "colors",
    type: "ThemeColors",
    typeLink: "/docs/types#ThemeColors",
    description: "Resolved hex values for every color scale and shade. Keyed by scale name, then shades 50–950.",
  },
  {
    key: "spacing",
    type: "SpacingTokens",
    typeLink: "/docs/types#SpacingTokens",
    description: "Resolved spacing values as strings (e.g. '16px'). Keyed by spacing scale key.",
  },
  {
    key: "radius",
    type: "RadiusTokens",
    typeLink: "/docs/types#RadiusTokens",
    description: "Resolved border radius values as strings. Keyed by radius scale key.",
  },
  {
    key: "shadows",
    type: "ShadowTokens",
    typeLink: "/docs/types#ShadowTokens",
    description: "Shadow layer definitions. Each value is an array of ShadowLayer objects.",
  },
  {
    key: "typography",
    type: "TypographyTokens",
    typeLink: "/docs/types#TypographyTokens",
    description: "All resolved typography tokens: fontFamilies, fontSizes, fontWeights, lineHeights, letterSpacing, and composite textStyles.",
  },
  {
    key: "semantic",
    type: "SemanticTokens",
    typeLink: "/docs/types#SemanticTokens",
    description: "Active semantic token mappings after all overrides and dark mode remapping. Each value is a SemanticColorRef { scale, shade }.",
  },
  {
    key: "isDark",
    type: "boolean",
    typeLink: null,
    description: "Whether dark mode is currently active. Reflects the resolved scheme regardless of whether colorScheme is 'system' or forced.",
  },
  {
    key: "cssVarPrefix",
    type: "string",
    typeLink: null,
    description: "The CSS variable prefix currently in use. Matches the cssVarPrefix prop passed to ThemeProvider. Defaults to 'tf'.",
  },
] as const;

export function UseThemePage() {
  const { isDark, cssVarPrefix } = useTheme();

  return (
    <article className={styles.page}>
      <h1>useTheme</h1>
      <p className={styles.lead}>
        A hook that returns all resolved token values as JavaScript objects. Use it when you
        need token values in code — for canvas rendering, third-party chart libraries, or
        anything that can't consume CSS variables.
      </p>

      <div className={`${styles.callout} ${styles.calloutWarning}`}>
        <p>
          <code>useTheme()</code> must be called inside a component that is a descendant
          of <code>ThemeProvider</code>. Calling it outside will throw an error.
        </p>
      </div>

      <h2>Import</h2>
      <CodeBlock
        filename="Component.tsx"
        code={`import { useTheme } from '@arpit194/themeforge'`}
      />

      <h2>Signature</h2>
      <CodeBlock
        filename="types.ts"
        code={`function useTheme(): ThemeContextValue`}
      />

      <h2>Return value</h2>
      <div className={styles.tableWrap}>
        <table className={styles.propTable}>
          <thead>
            <tr>
              <th>Key</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {RETURN_VALUES.map(({ key, type, typeLink, description }) => (
              <tr key={key}>
                <td><div className={styles.propName}>{key}</div></td>
                <td>
                  {typeLink
                    ? <Link to={typeLink} className={styles.propType}>{type}</Link>
                    : <span className={styles.propType}>{type}</span>
                  }
                </td>
                <td><span className={styles.propDesc}>{description}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>colors</h2>
      <p>
        Resolved hex values for every color scale. Useful for libraries that require raw
        color strings rather than CSS variables.
      </p>
      <CodeBlock
        filename="Component.tsx"
        code={`const { colors } = useTheme()

colors.primary.shades[500]    // e.g. '#7C3AED'
colors.secondary.shades[300]  // resolved hex
colors.neutral.shades[200]
colors.success.shades[500]
colors.warning.shades[500]
colors.error.shades[500]
colors.info.shades[500]`}
      />

      <h2>spacing / radius</h2>
      <CodeBlock
        filename="Component.tsx"
        code={`const { spacing, radius } = useTheme()

spacing.md    // e.g. '16px'
spacing['2xl']
radius.md     // e.g. '6px'
radius.full   // '9999px'`}
      />

      <h2>typography</h2>
      <CodeBlock
        filename="Component.tsx"
        code={`const { typography } = useTheme()

typography.fontFamilies.primary       // e.g. "'DM Serif Display', serif"
typography.fontSizes.lg               // e.g. '18px'
typography.fontWeights.semibold       // e.g. '600'
typography.lineHeights.relaxed        // e.g. '1.625'
typography.letterSpacing.wide         // e.g. '0.025em'

// Composite text style (references primitive key names, not raw values)
typography.textStyles.h1
// { family: 'primary', size: '5xl', weight: 'regular', lineHeight: 'tight', ... }`}
      />

      <h2>semantic</h2>
      <p>
        The active semantic token mappings after all overrides and dark mode remapping are
        applied. Each value is a <code>SemanticColorRef</code> — it tells you which primitive
        a token resolves to, not the hex value.
      </p>
      <CodeBlock
        filename="Component.tsx"
        code={`const { semantic, colors } = useTheme()

semantic['bg-primary']   // { scale: 'primary', shade: 500 }
semantic['text-link']    // { scale: 'primary', shade: 500 }
semantic['border-error'] // { scale: 'error',   shade: 500 }

// To get the resolved hex from a semantic token:
const { scale, shade } = semantic['bg-primary']
const hex = colors[scale].shades[shade]  // '#7C3AED'`}
      />

      <h2>isDark / cssVarPrefix</h2>
      <CodeBlock
        filename="Component.tsx"
        code={`const { isDark, cssVarPrefix } = useTheme()

isDark        // ${isDark} — true when dark mode is active
cssVarPrefix  // '${cssVarPrefix}' — matches ThemeProvider cssVarPrefix prop

// Build a variable name dynamically
const varName = \`--\${cssVarPrefix}-color-bg-primary\``}
      />

      <h2>Usage examples</h2>

      <h3>Canvas rendering</h3>
      <CodeBlock
        filename="Canvas.tsx"
        code={`import { useEffect, useRef } from 'react'
import { useTheme } from '@arpit194/themeforge'

export function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { colors } = useTheme()

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return
    ctx.fillStyle = colors.primary.shades[500]
    ctx.fillRect(0, 0, 100, 100)
  }, [colors])

  return <canvas ref={canvasRef} />
}`}
      />

      <h3>Chart library integration</h3>
      <CodeBlock
        filename="BarChart.tsx"
        code={`import { useTheme } from '@arpit194/themeforge'

export function BarChart({ data }) {
  const { colors } = useTheme()

  return (
    <ResponsiveBar
      data={data}
      colors={[
        colors.primary.shades[500],
        colors.secondary.shades[400],
        colors.info.shades[500],
      ]}
      theme={{
        grid: { line: { stroke: colors.neutral.shades[200] } },
        axis: { ticks: { text: { fill: colors.neutral.shades[600] } } },
      }}
    />
  )
}`}
      />

      <div className={`${styles.callout} ${styles.calloutInfo}`}>
        <p>
          For styling regular components, prefer CSS custom properties over{" "}
          <code>useTheme()</code> — they require no JavaScript at access time and work in
          any CSS context. Reserve <code>useTheme()</code> for cases where CSS variables
          genuinely aren't an option.
        </p>
      </div>
    </article>
  );
}
