import { CodeBlock } from "../ui/CodeBlock";
import styles from "./DocPage.module.css";

export function CustomizationPage() {
  return (
    <article className={styles.page}>
      <h1>Customization</h1>
      <p className={styles.lead}>
        A practical walkthrough of building a real branded theme — picking colors, overriding
        semantic tokens, tuning dark mode, and wiring it all to user preferences.
      </p>

      <h2>1. Pick your brand colors</h2>
      <p>
        Start with a <code>primary</code> — the most prominent interactive color in your UI.
        Pick the hex that best represents your brand at full saturation; ThemeForge will
        generate the surrounding 10 shades automatically.
      </p>
      <p>
        Add <code>secondary</code> for accents, badges, and supporting UI. Add{" "}
        <code>neutral</code> to tint backgrounds, borders, and body text. The neutral scale
        underpins most of the surface and text tokens.
      </p>
      <CodeBlock
        filename="main.tsx"
        code={`<ThemeProvider
  theme={{
    primary:   '#0EA5E9',  // sky blue — interactive elements
    secondary: '#F59E0B',  // amber — accents and badges
    neutral:   '#64748B',  // slate — surfaces and text
  }}
>`}
      />
      <div className={`${styles.callout} ${styles.calloutInfo}`}>
        <p>
          Pass the color at whatever shade feels right — ThemeForge places it at the
          closest anchor and generates the rest. You don't need to calculate a 500-weight
          equivalent manually.
        </p>
      </div>

      <h2>2. Override semantic tokens</h2>
      <p>
        The default semantic layer maps tokens to sensible primitives, but you may want to
        deviate. Common adjustments:
      </p>
      <ul>
        <li>Make <code>text-link</code> use your secondary scale instead of primary</li>
        <li>Use a deeper primary shade for <code>bg-primary</code> for higher contrast</li>
        <li>Change <code>bg-page</code> to a warm neutral instead of pure white</li>
      </ul>
      <CodeBlock
        filename="semanticTokens.ts"
        code={`import type { SemanticTokens } from '@arpit194/themeforge'

export const semanticOverrides: Partial<SemanticTokens> = {
  // Links use the secondary (amber) scale instead of primary
  'text-link':       { scale: 'secondary', shade: 600 },
  'text-link-hover': { scale: 'secondary', shade: 700 },
  'border-primary':  { scale: 'secondary', shade: 400 },

  // Slightly deeper primary button for contrast
  'bg-primary':       { scale: 'primary', shade: 600 },
  'bg-primary-hover': { scale: 'primary', shade: 700 },
}`}
      />
      <CodeBlock
        filename="main.tsx"
        code={`import { semanticOverrides } from './config/semanticTokens'

<ThemeProvider
  theme={{ primary: '#0EA5E9', secondary: '#F59E0B', neutral: '#64748B' }}
  semantic={semanticOverrides}
>`}
      />

      <h2>3. Fix dark mode contrast</h2>
      <p>
        ThemeForge uses a separate semantic mapping in dark mode — each token points to a
        different shade than it does in light mode. The defaults are good but won't always
        be perfect for every palette. Use <code>semanticDark</code> to patch specific tokens
        without touching light mode.
      </p>
      <CodeBlock
        filename="semanticTokens.ts"
        code={`export const semanticDarkOverrides: Partial<SemanticTokens> = {
  // Borders were invisible — neutral-800 same shade as bg-surface (800)
  'border-subtle':  { scale: 'neutral', shade: 700 },
  'border-default': { scale: 'neutral', shade: 600 },

  // Subtle tints default to 950 — same as bg-page, no visual separation
  'bg-primary-subtle':   { scale: 'primary',   shade: 900 },
  'bg-secondary-subtle': { scale: 'secondary', shade: 900 },
  'bg-error-subtle':     { scale: 'error',     shade: 900 },
  'bg-info-subtle':      { scale: 'info',      shade: 900 },
}`}
      />
      <div className={`${styles.callout} ${styles.calloutInfo}`}>
        <p>
          A quick way to audit dark mode: look for any surface, card, or callout that
          blends into the page background. The fix is almost always moving the{" "}
          <code>*-subtle</code> token up by 50–100 shade units.
        </p>
      </div>

      <h2>4. Customize typography</h2>
      <p>
        Swap in your brand typefaces. ThemeForge has two built-in family slots:{" "}
        <code>primary</code> for headings and <code>secondary</code> for body and UI. Additional
        slots like <code>mono</code> are added via <code>CustomFontFamilyKeys</code> module
        augmentation — see the <strong>TypeScript</strong> page.
      </p>
      <CodeBlock
        filename="main.tsx"
        code={`<ThemeProvider
  typography={{
    fontFamilies: {
      primary:   "'Cal Sans', 'Inter', sans-serif",
      secondary: "'Inter', system-ui, sans-serif",
      mono:      "'JetBrains Mono', monospace",
    },
    textStyles: {
      h1: { weight: 'semibold', letterSpacing: 'tight' },
      h2: { weight: 'semibold' },
      label: { weight: 'medium' },
    },
  }}
>`}
      />

      <h2>5. Wire to user preferences</h2>
      <p>
        Store the user's chosen colors in state and pass them to <code>ThemeProvider</code>.
        Because the <code>theme</code> prop is reactive, ThemeForge regenerates the token
        system whenever it changes.
      </p>
      <CodeBlock
        filename="App.tsx"
        code={`import { useState, useMemo } from 'react'
import { ThemeProvider } from '@arpit194/themeforge'

export function App() {
  const [primary, setPrimary] = useState('#0EA5E9')
  const [secondary, setSecondary] = useState('#F59E0B')
  const [isDark, setIsDark] = useState(false)

  // Memoize to avoid regenerating shades on every render
  const theme = useMemo(
    () => ({ primary, secondary }),
    [primary, secondary]
  )

  return (
    <ThemeProvider
      theme={theme}
      colorScheme={isDark ? 'dark' : 'light'}
    >
      <ThemeSwitcher onPrimaryChange={setPrimary} onDarkChange={setIsDark} />
      <YourApp />
    </ThemeProvider>
  )
}`}
      />

      <h2>6. Persist preferences</h2>
      <p>
        Read saved preferences from <code>localStorage</code> on initial render so the
        theme is restored across sessions.
      </p>
      <CodeBlock
        filename="useThemePreferences.ts"
        code={`import { useState } from 'react'

function read(key: string, fallback: string) {
  return localStorage.getItem(key) ?? fallback
}

export function useThemePreferences() {
  const [primary, _setPrimary] = useState(() => read('primary', '#0EA5E9'))
  const [isDark, setIsDark]    = useState(() => read('dark', 'false') === 'true')

  function setPrimary(hex: string) {
    localStorage.setItem('primary', hex)
    _setPrimary(hex)
  }

  function toggleDark() {
    setIsDark(prev => {
      const next = !prev
      localStorage.setItem('dark', String(next))
      return next
    })
  }

  return { primary, isPrimary: setPrimary, isDark, toggleDark }
}`}
      />

      <h2>7. Add custom token keys</h2>
      <p>
        If your design system needs tokens beyond the built-ins, extend the ThemeForge
        interfaces via module augmentation. See the <strong>TypeScript</strong> page for
        the full guide.
      </p>
      <CodeBlock
        filename="types/themeforge.d.ts"
        code={`import '@arpit194/themeforge'
import type { SemanticColorRef } from '@arpit194/themeforge'

declare module '@arpit194/themeforge' {
  interface CustomColorKeys {
    brand: string       // generates --tf-color-brand-50 through 950
  }
  interface CustomSemanticKeys {
    'bg-brand': SemanticColorRef
    'text-brand': SemanticColorRef
  }
}`}
      />
    </article>
  );
}
