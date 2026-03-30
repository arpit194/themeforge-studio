import { CodeBlock } from "../ui/CodeBlock";
import styles from "./DocPage.module.css";

export function TypesPage() {
  return (
    <article className={styles.page}>
      <h1>Types</h1>
      <p className={styles.lead}>
        Full TypeScript type definitions exported by <code>@arpit194/themeforge</code>.
        All types are importable directly from the package.
      </p>

      {/* ── Colors ── */}

      <h2>Colors</h2>

      <h3 id="ColorShades">ColorShades</h3>
      <p>
        A map of all 11 shade keys to their resolved hex values. Used as the shape of a
        generated color scale.
      </p>
      <CodeBlock
        filename="types.ts"
        code={`type ColorShades = {
  50:  string
  100: string
  200: string
  300: string
  400: string
  500: string
  600: string
  700: string
  800: string
  900: string
  950: string
}`}
      />

      <h3 id="ColorScale">ColorScale</h3>
      <p>
        A single generated color scale. <code>shades</code> contains all 11 hex values.{" "}
        <code>anchor</code> is the shade key that the original input color was placed at.
      </p>
      <CodeBlock
        filename="types.ts"
        code={`type ColorScale = {
  shades: ColorShades
  anchor: keyof ColorShades
}`}
      />

      <h3 id="ThemeColors">ThemeColors</h3>
      <p>
        The resolved color object returned by <code>useTheme()</code>. Contains a{" "}
        <code>ColorScale</code> for every built-in scale plus any custom scales added via
        module augmentation.
      </p>
      <CodeBlock
        filename="types.ts"
        code={`type ThemeColors = {
  primary:   ColorScale
  secondary: ColorScale
  neutral:   ColorScale
  success:   ColorScale
  warning:   ColorScale
  error:     ColorScale
  info:      ColorScale
  // + any keys from CustomColorKeys
}`}
      />

      <h3 id="ThemeConfig">ThemeConfig</h3>
      <p>
        The input shape for the <code>theme</code> prop on <code>ThemeProvider</code>. Each
        key is a hex string. You typically pass <code>Partial&lt;ThemeConfig&gt;</code> —
        unspecified scales fall back to defaults.
      </p>
      <CodeBlock
        filename="types.ts"
        code={`type ThemeConfig = {
  primary:   string
  secondary: string
  neutral:   string
  success:   string
  warning:   string
  error:     string
  info:      string
  // + any keys from CustomColorKeys
}`}
      />

      <h3 id="SemanticColorRef">SemanticColorRef</h3>
      <p>
        A pointer to a primitive color — a scale name and a shade key. ThemeForge resolves
        this to a CSS variable at render time. This is what you write when overriding
        semantic tokens via the <code>semantic</code> or <code>semanticDark</code> props.
      </p>
      <CodeBlock
        filename="types.ts"
        code={`type SemanticColorRef = {
  scale: keyof ThemeConfig   // e.g. 'primary' | 'neutral' | 'error' | ...
  shade: keyof ColorShades   // e.g. 50 | 100 | ... | 950
}`}
      />

      <h3 id="SemanticTokens">SemanticTokens</h3>
      <p>
        The full set of semantic color tokens. Every key maps to a{" "}
        <code>SemanticColorRef</code>. Used by both the <code>semantic</code> /{" "}
        <code>semanticDark</code> props and the <code>semantic</code> field in{" "}
        <code>useTheme()</code>.
      </p>
      <CodeBlock
        filename="types.ts"
        code={`type SemanticTokens = {
  // Backgrounds
  'bg-page':              SemanticColorRef
  'bg-subtle':            SemanticColorRef
  'bg-surface':           SemanticColorRef
  'bg-surface-raised':    SemanticColorRef
  'bg-primary':           SemanticColorRef
  'bg-primary-hover':     SemanticColorRef
  'bg-primary-active':    SemanticColorRef
  'bg-primary-disabled':  SemanticColorRef
  'bg-primary-selected':  SemanticColorRef
  'bg-primary-subtle':    SemanticColorRef
  'bg-secondary':         SemanticColorRef
  'bg-secondary-hover':   SemanticColorRef
  'bg-secondary-active':  SemanticColorRef
  'bg-secondary-disabled':SemanticColorRef
  'bg-secondary-selected':SemanticColorRef
  'bg-secondary-subtle':  SemanticColorRef
  'bg-success':           SemanticColorRef
  'bg-success-subtle':    SemanticColorRef
  'bg-warning':           SemanticColorRef
  'bg-warning-subtle':    SemanticColorRef
  'bg-error':             SemanticColorRef
  'bg-error-hover':       SemanticColorRef
  'bg-error-active':      SemanticColorRef
  'bg-error-subtle':      SemanticColorRef
  'bg-info':              SemanticColorRef
  'bg-info-subtle':       SemanticColorRef

  // Text
  'text-primary':         SemanticColorRef
  'text-secondary':       SemanticColorRef
  'text-disabled':        SemanticColorRef
  'text-inverse':         SemanticColorRef
  'text-placeholder':     SemanticColorRef
  'text-link':            SemanticColorRef
  'text-link-hover':      SemanticColorRef
  'text-on-dark':         SemanticColorRef  // for saturated/dark backgrounds
  'text-on-light':        SemanticColorRef  // for light tinted backgrounds
  'text-success':         SemanticColorRef
  'text-warning':         SemanticColorRef
  'text-error':           SemanticColorRef
  'text-info':            SemanticColorRef

  // Icons (same structure as text)
  'icon-primary':         SemanticColorRef
  'icon-secondary':       SemanticColorRef
  'icon-disabled':        SemanticColorRef
  'icon-inverse':         SemanticColorRef
  'icon-on-dark':         SemanticColorRef
  'icon-on-light':        SemanticColorRef
  'icon-success':         SemanticColorRef
  'icon-warning':         SemanticColorRef
  'icon-error':           SemanticColorRef
  'icon-info':            SemanticColorRef

  // Borders
  'border-default':            SemanticColorRef
  'border-subtle':             SemanticColorRef
  'border-strong':             SemanticColorRef
  'border-primary':            SemanticColorRef
  'border-primary-focus':      SemanticColorRef
  'border-primary-disabled':   SemanticColorRef
  'border-secondary':          SemanticColorRef
  'border-secondary-focus':    SemanticColorRef
  'border-secondary-disabled': SemanticColorRef
  'border-success':            SemanticColorRef
  'border-warning':            SemanticColorRef
  'border-error':              SemanticColorRef
  'border-info':               SemanticColorRef

  'shadow-color':              SemanticColorRef  // base color for box-shadows

  // + any keys from CustomSemanticKeys
}`}
      />

      <h3 id="ColorScheme">ColorScheme</h3>
      <p>
        Controls which color mode is active. <code>'system'</code> follows the OS{" "}
        <code>prefers-color-scheme</code> media query.
      </p>
      <CodeBlock
        filename="types.ts"
        code={`type ColorScheme = 'light' | 'dark' | 'system'`}
      />

      {/* ── Tokens ── */}

      <h2>Tokens</h2>

      <h3 id="SpacingTokens">SpacingTokens</h3>
      <p>All spacing scale keys mapped to resolved string values (e.g. <code>'16px'</code>).</p>
      <CodeBlock
        filename="types.ts"
        code={`type SpacingTokens = {
  '3xs': string
  '2xs': string
  xs:    string
  sm:    string
  md:    string
  lg:    string
  xl:    string
  '2xl': string
  '3xl': string
  '4xl': string
  '5xl': string
  '6xl': string
  '7xl': string
  '8xl': string
  '9xl': string
  '10xl': string
  // + any keys from CustomSpacingKeys
}`}
      />

      <h3 id="RadiusTokens">RadiusTokens</h3>
      <p>All border radius keys mapped to resolved string values.</p>
      <CodeBlock
        filename="types.ts"
        code={`type RadiusTokens = {
  none:  string
  xs:    string
  sm:    string
  md:    string
  lg:    string
  xl:    string
  '2xl': string
  '3xl': string
  full:  string
  // + any keys from CustomRadiusKeys
}`}
      />

      <h3 id="ShadowLayer">ShadowLayer</h3>
      <p>
        A single shadow layer. Multiple layers compose into a CSS <code>box-shadow</code>{" "}
        value. Offset, blur, and spread reference spacing token keys rather than raw values.
      </p>
      <CodeBlock
        filename="types.ts"
        code={`type ShadowLayer = {
  x?:              keyof SpacingTokens  // horizontal offset (default: 0)
  y:               keyof SpacingTokens  // vertical offset
  blur:            keyof SpacingTokens  // blur radius
  spread?:         keyof SpacingTokens  // spread radius
  negativeSpread?: boolean              // negate the spread value
  semantic?:       keyof SemanticTokens // semantic color token (default: 'shadow-color')
  inset?:          boolean              // inset shadow
}`}
      />

      <h3 id="ShadowDefinition">ShadowDefinition</h3>
      <p>
        An array of <code>ShadowLayer</code> objects that compose into a single{" "}
        <code>box-shadow</code> declaration. An empty array resolves to <code>none</code>.
      </p>
      <CodeBlock
        filename="types.ts"
        code={`type ShadowDefinition = ShadowLayer[]`}
      />

      <h3 id="ShadowTokens">ShadowTokens</h3>
      <p>All shadow keys mapped to their layer definitions.</p>
      <CodeBlock
        filename="types.ts"
        code={`type ShadowTokens = {
  none:   ShadowDefinition
  xs:     ShadowDefinition
  sm:     ShadowDefinition
  md:     ShadowDefinition
  lg:     ShadowDefinition
  xl:     ShadowDefinition
  '2xl':  ShadowDefinition
  inner:  ShadowDefinition
  // + any keys from CustomShadowKeys
}`}
      />

      {/* ── Typography ── */}

      <h2>Typography</h2>

      <h3 id="TextStyle">TextStyle</h3>
      <p>
        A composite text style. References primitive token key names — not raw values. This
        is what each entry in <code>TextStyleTokens</code> looks like.
      </p>
      <CodeBlock
        filename="types.ts"
        code={`type TextStyle = {
  family:        keyof FontFamilyTokens
  size:          keyof FontSizeTokens
  weight:        keyof FontWeightTokens
  lineHeight:    keyof LineHeightTokens
  letterSpacing: keyof LetterSpacingTokens
}`}
      />

      <h3 id="TypographyConfig">TypographyConfig</h3>
      <p>
        The input shape for the <code>typography</code> prop on <code>ThemeProvider</code>.
        All keys are optional. Text style overrides are per-property — you can change just
        the <code>weight</code> without re-specifying the full style.
      </p>
      <CodeBlock
        filename="types.ts"
        code={`type TypographyConfig = {
  fontFamilies?:  Partial<FontFamilyTokens>
  fontSizes?:     Partial<FontSizeTokens>
  fontWeights?:   Partial<FontWeightTokens>
  lineHeights?:   Partial<LineHeightTokens>
  letterSpacing?: Partial<LetterSpacingTokens>
  textStyles?: {
    [K in keyof TextStyleTokens]?: Partial<TextStyle>
  }
}`}
      />

      <h3 id="TypographyTokens">TypographyTokens</h3>
      <p>
        The resolved typography object returned by <code>useTheme()</code>. Contains fully
        resolved values for all typography sub-categories.
      </p>
      <CodeBlock
        filename="types.ts"
        code={`type TypographyTokens = {
  fontFamilies:  FontFamilyTokens
  fontSizes:     FontSizeTokens
  fontWeights:   FontWeightTokens
  lineHeights:   LineHeightTokens
  letterSpacing: LetterSpacingTokens
  textStyles:    TextStyleTokens
}`}
      />

      {/* ── Context ── */}

      <h2>Context</h2>

      <h3 id="ThemeContextValue">ThemeContextValue</h3>
      <p>
        The full return type of <code>useTheme()</code>.
      </p>
      <CodeBlock
        filename="types.ts"
        code={`type ThemeContextValue = {
  colors:       ThemeColors
  spacing:      SpacingTokens
  radius:       RadiusTokens
  shadows:      ShadowTokens
  typography:   TypographyTokens
  semantic:     SemanticTokens
  isDark:       boolean
  cssVarPrefix: string
}`}
      />

      <h3 id="GenerateShadesFn">GenerateShadesFn</h3>
      <p>
        The function signature for a custom shade generator. Receives a base hex string and
        must return a <code>ColorScale</code>.
      </p>
      <CodeBlock
        filename="types.ts"
        code={`type GenerateShadesFn = (baseHex: string) => ColorScale`}
      />

      <h2>Importing types</h2>
      <p>All types are importable directly from the package:</p>
      <CodeBlock
        filename="Component.tsx"
        code={`import type {
  ThemeColors,
  ThemeConfig,
  ColorShades,
  ColorScale,
  SemanticColorRef,
  SemanticTokens,
  ColorScheme,
  SpacingTokens,
  RadiusTokens,
  ShadowLayer,
  ShadowDefinition,
  ShadowTokens,
  TypographyConfig,
  TypographyTokens,
  TextStyle,
  ThemeContextValue,
  GenerateShadesFn,
} from '@arpit194/themeforge'`}
      />
    </article>
  );
}
