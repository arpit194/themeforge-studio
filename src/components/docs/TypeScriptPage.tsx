import { CodeBlock } from "../ui/CodeBlock";
import styles from "./DocPage.module.css";

const AUGMENTABLE_INTERFACES = [
  { name: "CustomColorKeys",         category: "Colors",     example: "brand: string",                  prop: "theme" },
  { name: "CustomSpacingKeys",       category: "Spacing",    example: "page: string",                   prop: "spacing" },
  { name: "CustomRadiusKeys",        category: "Radius",     example: "card: string",                   prop: "radius" },
  { name: "CustomShadowKeys",        category: "Shadows",    example: "glow: ShadowDefinition",         prop: "shadows" },
  { name: "CustomFontFamilyKeys",    category: "Typography", example: "mono: string",                   prop: "typography.fontFamilies" },
  { name: "CustomFontSizeKeys",      category: "Typography", example: "hero: string",                   prop: "typography.fontSizes" },
  { name: "CustomFontWeightKeys",    category: "Typography", example: "heavy: string",                  prop: "typography.fontWeights" },
  { name: "CustomLineHeightKeys",    category: "Typography", example: "heading: string",                prop: "typography.lineHeights" },
  { name: "CustomLetterSpacingKeys", category: "Typography", example: "display: string",               prop: "typography.letterSpacing" },
  { name: "CustomTextStyleKeys",     category: "Typography", example: "hero: TextStyle",               prop: "typography.textStyles" },
  { name: "CustomSemanticKeys",      category: "Colors",     example: "'bg-brand': SemanticColorRef",  prop: "semantic / semanticDark" },
] as const;

export function TypeScriptPage() {
  return (
    <article className={styles.page}>
      <h1>TypeScript</h1>
      <p className={styles.lead}>
        ThemeForge ships with full TypeScript support. Every token category is extensible
        via module augmentation — add your own keys and they flow through automatically to{" "}
        <code>ThemeProvider</code> props, <code>useTheme()</code> return values, and
        generated CSS variables.
      </p>

      <h2>How it works</h2>
      <p>
        ThemeForge exposes empty interfaces for each token category. You extend them in your
        own code via TypeScript's module augmentation. The library's types merge your keys
        in automatically — no code generation, no config files, no extra build step.
      </p>

      <h2>Augmentable interfaces</h2>
      <div className={styles.tableWrap}>
        <table className={styles.tokenTable}>
          <thead>
            <tr>
              <th>Interface</th>
              <th>Category</th>
              <th>Value type</th>
              <th>ThemeProvider prop</th>
            </tr>
          </thead>
          <tbody>
            {AUGMENTABLE_INTERFACES.map(({ name, category, example, prop }) => (
              <tr key={name}>
                <td><code>{name}</code></td>
                <td>{category}</td>
                <td><code>{example}</code></td>
                <td><code>{prop}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Custom color scales</h2>
      <p>
        Extend <code>CustomColorKeys</code> to add a new color scale. ThemeForge generates
        a full 11-shade palette from the hex you provide, writes all{" "}
        <code>--tf-color-{"{key}"}-50</code> through <code>--tf-color-{"{key}"}-950</code>{" "}
        CSS variables, and makes the scale available in <code>useTheme().colors</code>.
      </p>
      <CodeBlock
        filename="types/themeforge.d.ts"
        code={`declare module '@arpit194/themeforge' {
  interface CustomColorKeys {
    brand: string
  }
}`}
      />
      <CodeBlock
        filename="main.tsx"
        code={`<ThemeProvider theme={{ primary: '#7C3AED', brand: '#0EA5E9' }}>`}
      />
      <CodeBlock
        language="css"
        code={`.hero {
  background-color: var(--tf-color-brand-500);
  color: var(--tf-color-brand-50);
  border: 1px solid var(--tf-color-brand-200);
}`}
      />
      <CodeBlock
        filename="Component.tsx"
        code={`const { colors } = useTheme()
colors.brand.shades[500]  // fully typed — '#0EA5E9'
colors.brand.anchor       // the shade the input was placed at`}
      />

      <h2>Custom spacing</h2>
      <p>
        Add named spacing values beyond the built-in scale — useful for layout-level
        distances like page gutters or section gaps.
      </p>
      <CodeBlock
        filename="types/themeforge.d.ts"
        code={`declare module '@arpit194/themeforge' {
  interface CustomSpacingKeys {
    page:    string   // full-bleed page padding
    section: string   // vertical spacing between sections
    prose:   string   // max-width for text content
  }
}`}
      />
      <CodeBlock
        filename="main.tsx"
        code={`<ThemeProvider spacing={{ page: '80px', section: '120px', prose: '720px' }}>`}
      />
      <CodeBlock
        language="css"
        code={`.layout {
  padding-inline: var(--tf-spacing-page);
}

.section {
  margin-bottom: var(--tf-spacing-section);
}

.prose {
  max-width: var(--tf-spacing-prose);
}`}
      />

      <h2>Custom radius</h2>
      <p>
        Add component-specific radius values to enforce consistent shape language across
        your design system.
      </p>
      <CodeBlock
        filename="types/themeforge.d.ts"
        code={`declare module '@arpit194/themeforge' {
  interface CustomRadiusKeys {
    card:   string
    avatar: string
    input:  string
    badge:  string
  }
}`}
      />
      <CodeBlock
        filename="main.tsx"
        code={`<ThemeProvider radius={{ card: '12px', avatar: '50%', input: '8px', badge: '4px' }}>`}
      />
      <CodeBlock
        language="css"
        code={`.card   { border-radius: var(--tf-radius-card); }
.avatar { border-radius: var(--tf-radius-avatar); }
.input  { border-radius: var(--tf-radius-input); }
.badge  { border-radius: var(--tf-radius-badge); }`}
      />

      <h2>Custom shadows</h2>
      <p>
        Add named shadow styles. Each value is a <code>ShadowDefinition</code> — an array
        of shadow layers. Each layer uses a semantic color token for its color; the default
        is <code>'shadow-color'</code>, which remaps automatically in dark mode. Use the{" "}
        <code>semantic</code> property to point a layer at a different semantic token — for
        example a primary-tinted glow. Augment <code>CustomSemanticKeys</code> to add
        dedicated shadow color tokens.
      </p>
      <CodeBlock
        filename="types/themeforge.d.ts"
        code={`import type { ShadowDefinition, SemanticColorRef } from '@arpit194/themeforge'

declare module '@arpit194/themeforge' {
  interface CustomShadowKeys {
    glow:    ShadowDefinition   // colored glow effect
    pressed: ShadowDefinition   // inset press state
    float:   ShadowDefinition   // elevated floating UI
  }

  // Custom semantic token so the glow can use a brand color
  interface CustomSemanticKeys {
    'shadow-color-primary': SemanticColorRef
  }
}`}
      />
      <CodeBlock
        filename="main.tsx"
        code={`<ThemeProvider
  semantic={{ 'shadow-color-primary': { scale: 'primary', shade: 500 } }}
  semanticDark={{ 'shadow-color-primary': { scale: 'primary', shade: 400 } }}
  shadows={{
    glow: [
      { y: 'none', blur: 'lg', spread: 'xs', semantic: 'shadow-color-primary' },
    ],
    pressed: [
      { y: '2xs', blur: 'xs', inset: true },
    ],
    float: [
      { y: 'xs', blur: 'sm' },
      { y: 'md', blur: 'xl' },
      { y: 'lg', blur: '2xl' },
    ],
  }}
>`}
      />
      <CodeBlock
        language="css"
        code={`.glowButton:focus { box-shadow: var(--tf-shadow-glow); }
.pressedButton:active { box-shadow: var(--tf-shadow-pressed); }
.floatingCard { box-shadow: var(--tf-shadow-float); }`}
      />

      <h2>Custom typography</h2>
      <p>
        Every typography sub-category is independently extensible. You can add custom font
        families, sizes, weights, line heights, letter spacing, and full composite text styles.
      </p>

      <h3>Font families</h3>
      <p>
        ThemeForge has two built-in slots: <code>primary</code> and <code>secondary</code>.
        Add more via <code>CustomFontFamilyKeys</code>.
      </p>
      <CodeBlock
        filename="types/themeforge.d.ts"
        code={`declare module '@arpit194/themeforge' {
  interface CustomFontFamilyKeys {
    mono:    string
    display: string
  }
}`}
      />
      <CodeBlock
        filename="main.tsx"
        code={`<ThemeProvider
  typography={{
    fontFamilies: {
      mono:    "'JetBrains Mono', monospace",
      display: "'Cal Sans', sans-serif",
    },
  }}
>`}
      />
      <CodeBlock
        language="css"
        code={`code    { font-family: var(--tf-font-family-mono); }
.hero   { font-family: var(--tf-font-family-display); }`}
      />

      <h3>Font sizes</h3>
      <CodeBlock
        filename="types/themeforge.d.ts"
        code={`declare module '@arpit194/themeforge' {
  interface CustomFontSizeKeys {
    hero:     string   // oversized display heading
    '8xl':    string
  }
}`}
      />
      <CodeBlock
        filename="main.tsx"
        code={`<ThemeProvider typography={{ fontSizes: { hero: '96px', '8xl': '72px' } }}>`}
      />

      <h3>Font weights</h3>
      <CodeBlock
        filename="types/themeforge.d.ts"
        code={`declare module '@arpit194/themeforge' {
  interface CustomFontWeightKeys {
    heavy: string   // e.g. 900 for display text
  }
}`}
      />
      <CodeBlock
        filename="main.tsx"
        code={`<ThemeProvider typography={{ fontWeights: { heavy: '900' } }}>`}
      />

      <h3>Line heights</h3>
      <CodeBlock
        filename="types/themeforge.d.ts"
        code={`declare module '@arpit194/themeforge' {
  interface CustomLineHeightKeys {
    display: string   // tighter than tight for large hero text
  }
}`}
      />
      <CodeBlock
        filename="main.tsx"
        code={`<ThemeProvider typography={{ lineHeights: { display: '0.95' } }}>`}
      />

      <h3>Letter spacing</h3>
      <CodeBlock
        filename="types/themeforge.d.ts"
        code={`declare module '@arpit194/themeforge' {
  interface CustomLetterSpacingKeys {
    display: string   // negative tracking for large display text
  }
}`}
      />
      <CodeBlock
        filename="main.tsx"
        code={`<ThemeProvider typography={{ letterSpacing: { display: '-0.04em' } }}>`}
      />

      <h3>Text styles</h3>
      <p>
        A text style is a composite token — it bundles family, size, weight, line height,
        and letter spacing into a single named style. Add custom styles for display headings,
        overlines, captions, or any pattern used repeatedly in your UI.
      </p>
      <CodeBlock
        filename="types/themeforge.d.ts"
        code={`import type { TextStyle } from '@arpit194/themeforge'

declare module '@arpit194/themeforge' {
  interface CustomTextStyleKeys {
    hero:     TextStyle   // large display heading
    overline: TextStyle   // uppercase label above headings
    numeric:  TextStyle   // tabular figures for data
  }
}`}
      />
      <CodeBlock
        filename="main.tsx"
        code={`<ThemeProvider
  typography={{
    textStyles: {
      hero: {
        family:        'display',    // keyof FontFamilyTokens
        size:          'hero',       // keyof FontSizeTokens
        weight:        'heavy',      // keyof FontWeightTokens
        lineHeight:    'display',    // keyof LineHeightTokens
        letterSpacing: 'display',    // keyof LetterSpacingTokens
      },
      overline: {
        family:        'secondary',
        size:          'xs',
        weight:        'semibold',
        lineHeight:    'normal',
        letterSpacing: 'widest',
      },
      numeric: {
        family:        'mono',
        size:          'md',
        weight:        'regular',
        lineHeight:    'normal',
        letterSpacing: 'normal',
      },
    },
  }}
>`}
      />
      <p>
        Each text style generates individual CSS variables for each property:
      </p>
      <CodeBlock
        language="css"
        code={`.heroHeading {
  font-family:     var(--tf-text-hero-family);
  font-size:       var(--tf-text-hero-size);
  font-weight:     var(--tf-text-hero-weight);
  line-height:     var(--tf-text-hero-line-height);
  letter-spacing:  var(--tf-text-hero-letter-spacing);
}

.overline {
  font-family:     var(--tf-text-overline-family);
  font-size:       var(--tf-text-overline-size);
  font-weight:     var(--tf-text-overline-weight);
  letter-spacing:  var(--tf-text-overline-letter-spacing);
  text-transform:  uppercase;
}`}
      />
      <div className={`${styles.callout} ${styles.calloutInfo}`}>
        <p>
          All keys referenced in a <code>TextStyle</code> — family, size, weight, lineHeight,
          letterSpacing — must exist in their respective token maps, whether built-in or
          custom-augmented. TypeScript enforces this at compile time.
        </p>
      </div>

      <h2>Custom semantic tokens</h2>
      <p>
        Extend <code>CustomSemanticKeys</code> to add semantic color tokens beyond the
        built-in <code>bg-*</code>, <code>text-*</code>, <code>icon-*</code>, and{" "}
        <code>border-*</code> groups. Each value is a <code>SemanticColorRef</code> pointing
        to a scale and shade — meaning it adapts automatically in dark mode when you provide
        a <code>semanticDark</code> override.
      </p>
      <CodeBlock
        filename="types/themeforge.d.ts"
        code={`import type { SemanticColorRef } from '@arpit194/themeforge'

declare module '@arpit194/themeforge' {
  interface CustomSemanticKeys {
    // Brand surface tokens
    'bg-brand':           SemanticColorRef
    'bg-brand-subtle':    SemanticColorRef
    'bg-brand-hover':     SemanticColorRef

    // Brand text and border
    'text-brand':         SemanticColorRef
    'border-brand':       SemanticColorRef
    'border-brand-focus': SemanticColorRef
  }
}`}
      />
      <CodeBlock
        filename="semanticTokens.ts"
        code={`import type { SemanticTokens } from '@arpit194/themeforge'

export const semanticOverrides: Partial<SemanticTokens> = {
  'bg-brand':           { scale: 'brand', shade: 500 },
  'bg-brand-subtle':    { scale: 'brand', shade: 50  },
  'bg-brand-hover':     { scale: 'brand', shade: 600 },
  'text-brand':         { scale: 'brand', shade: 700 },
  'border-brand':       { scale: 'brand', shade: 300 },
  'border-brand-focus': { scale: 'brand', shade: 400 },
}

// Dark mode overrides for the same tokens
export const semanticDarkOverrides: Partial<SemanticTokens> = {
  'bg-brand-subtle':    { scale: 'brand', shade: 900 },
  'text-brand':         { scale: 'brand', shade: 300 },
  'border-brand':       { scale: 'brand', shade: 700 },
}`}
      />
      <CodeBlock
        filename="main.tsx"
        code={`<ThemeProvider
  theme={{ primary: '#7C3AED', brand: '#0EA5E9' }}
  semantic={semanticOverrides}
  semanticDark={semanticDarkOverrides}
>`}
      />
      <CodeBlock
        language="css"
        code={`.brandCard {
  background-color: var(--tf-color-bg-brand-subtle);
  border: 1px solid var(--tf-color-border-brand);
  color: var(--tf-color-text-brand);
}

.brandCard:focus-within {
  border-color: var(--tf-color-border-brand-focus);
}`}
      />

      <h2>Augmentation vs runtime value</h2>
      <p>
        Module augmentation only affects TypeScript types — it has no runtime effect.
        You must also pass the actual value to <code>ThemeProvider</code> at runtime,
        otherwise the CSS variable will never be generated.
      </p>
      <div className={`${styles.callout} ${styles.calloutWarning}`}>
        <p>
          A common mistake: augmenting <code>CustomColorKeys</code> makes TypeScript
          accept the key in the <code>theme</code> prop — but if you forget to pass the
          value, ThemeForge has nothing to generate shades from and the variable will be
          missing at runtime.
        </p>
      </div>
      <CodeBlock
        filename="main.tsx"
        code={`// ✅ Type augmentation
declare module '@arpit194/themeforge' {
  interface CustomColorKeys { brand: string }
}

// ❌ Augmented but value not passed — --tf-color-brand-* won't exist
<ThemeProvider theme={{ primary: '#7C3AED' }}>

// ✅ Augmented AND value passed — shades generated, variables available
<ThemeProvider theme={{ primary: '#7C3AED', brand: '#0EA5E9' }}>`}
      />
      <p>
        The same applies to all other custom key types — <code>CustomSpacingKeys</code>,{" "}
        <code>CustomRadiusKeys</code>, and so on. The interface augmentation gives you type
        safety; the runtime prop provides the actual value.
      </p>

      <h2>Organising augmentations</h2>
      <p>
        Keep all augmentations in a single <code>.d.ts</code> file and import it once at
        your app entry point so the extended types are available everywhere.
      </p>
      <CodeBlock
        filename="src/types/themeforge.d.ts"
        code={`import '@arpit194/themeforge'
import type { SemanticColorRef, ShadowDefinition, TextStyle } from '@arpit194/themeforge'

declare module '@arpit194/themeforge' {
  // Colors
  interface CustomColorKeys {
    brand: string
  }

  // Spacing
  interface CustomSpacingKeys {
    page:    string
    section: string
  }

  // Radius
  interface CustomRadiusKeys {
    card:   string
    avatar: string
  }

  // Shadows
  interface CustomShadowKeys {
    glow: ShadowDefinition
  }

  // Typography
  interface CustomFontFamilyKeys {
    mono:    string
    display: string
  }
  interface CustomFontSizeKeys {
    hero: string
  }
  interface CustomTextStyleKeys {
    hero:     TextStyle
    overline: TextStyle
  }

  // Semantic
  interface CustomSemanticKeys {
    'bg-brand':        SemanticColorRef
    'bg-brand-subtle': SemanticColorRef
    'text-brand':      SemanticColorRef
    'border-brand':    SemanticColorRef
  }
}`}
      />
      <CodeBlock
        filename="main.tsx"
        code={`import './types/themeforge'  // import once at the entry point
import { ThemeProvider } from '@arpit194/themeforge'`}
      />

      <div className={`${styles.callout} ${styles.calloutInfo}`}>
        <p>
          Module augmentation is purely a compile-time feature — zero runtime cost. The
          actual token values are provided at runtime via <code>ThemeProvider</code> props.
        </p>
      </div>
    </article>
  );
}
