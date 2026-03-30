import { Link } from "@tanstack/react-router";
import { CodeBlock } from "../ui/CodeBlock";
import styles from "./DocPage.module.css";

const PROPS = [
  {
    name: "theme",
    type: "Partial<ThemeConfig>",
    typeLink: "/docs/types#ThemeConfig",
    default: "—",
    required: false,
    description: "Base color scales. Each key is a hex string. Unspecified scales fall back to built-in defaults.",
  },
  {
    name: "spacing",
    type: "Partial<SpacingTokens>",
    typeLink: "/docs/types#SpacingTokens",
    default: "—",
    required: false,
    description: "Override individual spacing scale keys.",
  },
  {
    name: "radius",
    type: "Partial<RadiusTokens>",
    typeLink: "/docs/types#RadiusTokens",
    default: "—",
    required: false,
    description: "Override individual border radius keys.",
  },
  {
    name: "shadows",
    type: "Partial<ShadowTokens>",
    typeLink: "/docs/types#ShadowTokens",
    default: "—",
    required: false,
    description: "Override individual shadow keys. Each value is an array of shadow layers.",
  },
  {
    name: "typography",
    type: "TypographyConfig",
    typeLink: "/docs/types#TypographyConfig",
    default: "—",
    required: false,
    description: "Override font families, sizes, weights, line heights, letter spacing, and composite text styles. All sub-keys are optional.",
  },
  {
    name: "semantic",
    type: "Partial<SemanticTokens>",
    typeLink: "/docs/types#SemanticTokens",
    default: "—",
    required: false,
    description: "Override light mode semantic token mappings. Each value is a SemanticColorRef pointing to a scale and shade.",
  },
  {
    name: "semanticDark",
    type: "Partial<SemanticTokens>",
    typeLink: "/docs/types#SemanticTokens",
    default: "—",
    required: false,
    description: "Override semantic tokens in dark mode only. Applied on top of the default dark mode semantic mappings.",
  },
  {
    name: "colorScheme",
    type: "ColorScheme",
    typeLink: "/docs/types#ColorScheme",
    default: "'system'",
    required: false,
    description: "Controls which color mode is active. 'system' follows the OS prefers-color-scheme media query.",
  },
  {
    name: "cssVarPrefix",
    type: "string",
    typeLink: null,
    default: "'tf'",
    required: false,
    description: "Prefix for all generated CSS variable names. Change this to namespace tokens in a larger system.",
  },
  {
    name: "generateShades",
    type: "GenerateShadesFn",
    typeLink: "/docs/types#GenerateShadesFn",
    default: "built-in",
    required: false,
    description: "Replace the built-in shade generation algorithm. Receives a hex string, must return ColorShades (keys 50–950).",
  },
  {
    name: "children",
    type: "ReactNode",
    typeLink: null,
    default: "—",
    required: true,
    description: "The subtree that receives access to all generated CSS variables.",
  },
] as const;

export function ThemeProviderPage() {
  return (
    <article className={styles.page}>
      <h1>ThemeProvider</h1>
      <p className={styles.lead}>
        The root component that generates your token system and exposes everything as CSS
        custom properties. Wrap your app once — all descendants get access to the full
        token set.
      </p>

      <h2>Props</h2>
      <div className={styles.tableWrap}>
        <table className={styles.propTable}>
          <thead>
            <tr>
              <th>Prop</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {PROPS.map(({ name, type, typeLink, default: def, required, description }) => (
              <tr key={name}>
                <td>
                  <div className={styles.propName}>
                    {name}
                    <span className={`${styles.badge} ${required ? styles.badgeRequired : styles.badgeOptional}`}>
                      {required ? "required" : "optional"}
                    </span>
                  </div>
                </td>
                <td>
                  {typeLink
                    ? <Link to={typeLink} className={styles.propType}>{type}</Link>
                    : <span className={styles.propType}>{type}</span>
                  }
                </td>
                <td><span className={styles.propDefault}>{def}</span></td>
                <td><span className={styles.propDesc}>{description}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>theme</h2>
      <p>
        Pass a hex value for any color scale. ThemeForge generates a full 11-shade palette
        and wires it into the semantic layer automatically. Pass a stable reference to avoid
        regenerating shades on every render.
      </p>
      <CodeBlock
        filename="main.tsx"
        code={`<ThemeProvider
  theme={{
    primary:   '#7C3AED',
    secondary: '#F59E0B',
    neutral:   '#6B7280',
    success:   '#22C55E',
    warning:   '#EAB308',
    error:     '#EF4444',
    info:      '#3B82F6',
  }}
>`}
      />

      <h2>spacing / radius / shadows</h2>
      <p>
        Override individual keys from each scale. Unspecified keys keep their defaults.
      </p>
      <CodeBlock
        filename="main.tsx"
        code={`<ThemeProvider
  spacing={{ md: '10px', lg: '14px' }}
  radius={{ md: '6px', lg: '10px' }}
  shadows={{
    md: [{ y: 'sm', blur: 'lg' }],
    lg: [
      { y: 'sm', blur: 'md' },
      { y: 'md', blur: 'xl' },
    ],
  }}
>`}
      />

      <h2>typography</h2>
      <p>
        Override font families, sizes, weights, line heights, letter spacing, or composite
        text styles. Text style overrides are per-property — you can change just the weight
        without re-specifying the full style.
      </p>
      <CodeBlock
        filename="main.tsx"
        code={`<ThemeProvider
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
>`}
      />

      <h2>semantic / semanticDark</h2>
      <p>
        Each semantic token maps to a <code>SemanticColorRef</code> — a scale name and shade
        number. Use <code>semantic</code> to change light mode mappings and{" "}
        <code>semanticDark</code> to patch the dark mode palette without touching light mode.
      </p>
      <CodeBlock
        filename="main.tsx"
        code={`<ThemeProvider
  semantic={{
    'bg-primary': { scale: 'primary', shade: 600 },
    'text-link':  { scale: 'secondary', shade: 500 },
  }}
  semanticDark={{
    'border-subtle':     { scale: 'neutral', shade: 700 },
    'bg-primary-subtle': { scale: 'primary', shade: 900 },
  }}
>`}
      />

      <h2>colorScheme</h2>
      <p>
        Defaults to <code>'system'</code>. Set to <code>'light'</code> or{" "}
        <code>'dark'</code> to force a mode — useful for user preference toggles.
      </p>
      <CodeBlock
        filename="main.tsx"
        code={`// Controlled by app state
<ThemeProvider colorScheme={isDark ? 'dark' : 'light'}>`}
      />

      <h2>cssVarPrefix</h2>
      <p>
        Defaults to <code>"tf"</code>. All generated variable names use this prefix.
        Change it to avoid collisions when embedding ThemeForge alongside another system.
      </p>
      <CodeBlock
        filename="main.tsx"
        code={`<ThemeProvider cssVarPrefix="ds">
  {/* --ds-color-bg-primary, --ds-spacing-md, etc. */}
</ThemeProvider>`}
      />

      <h2>generateShades</h2>
      <p>
        Replaces the built-in shade generation. The function receives a hex string and must
        return a <code>ColorShades</code> object with keys <code>50</code> through{" "}
        <code>950</code>.
      </p>
      <CodeBlock
        filename="main.tsx"
        code={`import { generateShades } from '@arpit194/themeforge'

<ThemeProvider generateShades={(hex) => {
  const shades = generateShades(hex)
  return { ...shades, '500': hex } // anchor 500 exactly to the input
}}>`}
      />

      <h2>Dynamic theme switching</h2>
      <p>
        The <code>theme</code> and <code>colorScheme</code> props are fully reactive. Store
        your values in state and ThemeForge regenerates the token system whenever they change.
      </p>
      <CodeBlock
        filename="App.tsx"
        code={`import { useState, useMemo } from 'react'
import { ThemeProvider } from '@arpit194/themeforge'

export function App() {
  const [primary, setPrimary] = useState('#7C3AED')
  const [isDark, setIsDark]   = useState(false)

  // Memoize — see the performance note below
  const theme = useMemo(() => ({ primary }), [primary])

  return (
    <ThemeProvider theme={theme} colorScheme={isDark ? 'dark' : 'light'}>
      <button onClick={() => setPrimary('#E11D48')}>Switch to Rose</button>
      <button onClick={() => setIsDark(d => !d)}>Toggle dark</button>
      <App />
    </ThemeProvider>
  )
}`}
      />

      <h2>Performance — stable references</h2>
      <p>
        ThemeForge regenerates all 11 shades and rewrites CSS variables whenever{" "}
        <code>theme</code> changes. If you construct the theme object inline, it creates a
        new reference on every render and triggers unnecessary regeneration.
      </p>
      <CodeBlock
        filename="main.tsx"
        code={`// ❌ New object every render — regenerates shades constantly
<ThemeProvider theme={{ primary: '#7C3AED' }}>

// ✅ Defined outside the component — reference is stable
const THEME = { primary: '#7C3AED' }
<ThemeProvider theme={THEME}>

// ✅ State-driven — memoize to stabilize the reference
const theme = useMemo(() => ({ primary, secondary }), [primary, secondary])
<ThemeProvider theme={theme}>`}
      />
      <div className={`${styles.callout} ${styles.calloutInfo}`}>
        <p>
          The same applies to <code>spacing</code>, <code>radius</code>,{" "}
          <code>shadows</code>, <code>typography</code>, <code>semantic</code>, and{" "}
          <code>semanticDark</code> — define them outside the component or wrap in{" "}
          <code>useMemo</code> if they're derived from state.
        </p>
      </div>

      <h2>Nested / scoped themes</h2>
      <p>
        You can nest <code>ThemeProvider</code> instances to apply a different theme to
        a subtree. CSS variables cascade — the inner provider overrides only what it
        declares, and the rest falls through from the outer provider.
      </p>
      <CodeBlock
        filename="App.tsx"
        code={`<ThemeProvider theme={{ primary: '#7C3AED', secondary: '#F59E0B' }}>
  {/* Main app — violet primary */}
  <MainContent />

  {/* Promo banner — rose primary, inherits secondary from outer */}
  <ThemeProvider theme={{ primary: '#E11D48' }}>
    <PromoBanner />
  </ThemeProvider>

  {/* Sidebar — different neutral tint */}
  <ThemeProvider theme={{ primary: '#7C3AED', neutral: '#475569' }}>
    <Sidebar />
  </ThemeProvider>
</ThemeProvider>`}
      />
      <p>
        This is useful for marketing pages with multiple branded sections, embedded widgets,
        or any UI where a region needs its own distinct color identity.
      </p>

      <h2>Portals inside ThemeProvider</h2>
      <p>
        Because ThemeForge scopes CSS variables to the element <code>ThemeProvider</code>{" "}
        renders — not to <code>:root</code> — any content rendered outside that element via
        a portal (modals, popovers, drawers) won't have access to the token variables.
      </p>
      <p>
        The fix is to render the portal into a container that lives <em>inside</em>{" "}
        <code>ThemeProvider</code>. Create a ref, attach it to a div inside the provider,
        and pass it as the <code>container</code> prop to any portal component.
      </p>
      <CodeBlock
        filename="App.tsx"
        code={`import { useRef } from 'react'
import { ThemeProvider } from '@arpit194/themeforge'
import { Popover } from '@base-ui/react/popover'

export function App() {
  const portalRef = useRef<HTMLDivElement>(null)

  return (
    <ThemeProvider theme={{ primary: '#7C3AED' }}>
      <YourContent />

      {/* Popover portal renders inside ThemeProvider — tokens available */}
      <Popover.Portal container={portalRef}>
        <Popover.Popup>...</Popover.Popup>
      </Popover.Portal>

      {/* The portal target — must be inside ThemeProvider */}
      <div ref={portalRef} />
    </ThemeProvider>
  )
}`}
      />
      <p>
        If multiple components across your app need to portal into the same container,
        expose the ref via context rather than prop-drilling it.
      </p>
      <CodeBlock
        filename="PortalContext.ts"
        code={`import { createContext, useContext } from 'react'

export const PortalContext = createContext<React.RefObject<HTMLDivElement | null> | null>(null)

export function usePortal() {
  const ctx = useContext(PortalContext)
  if (!ctx) throw new Error('usePortal must be used within PortalContext.Provider')
  return ctx
}`}
      />
      <CodeBlock
        filename="App.tsx"
        code={`const portalRef = useRef<HTMLDivElement>(null)

<ThemeProvider theme={{ primary: '#7C3AED' }}>
  <PortalContext.Provider value={portalRef}>
    <YourApp />
    <div ref={portalRef} />
  </PortalContext.Provider>
</ThemeProvider>`}
      />
      <CodeBlock
        filename="AnyComponent.tsx"
        code={`// Any component deep in the tree
const portalRef = usePortal()

<Popover.Portal container={portalRef}>
  <Popover.Popup>...</Popover.Popup>
</Popover.Portal>`}
      />

      <h2>Full example</h2>
      <CodeBlock
        filename="main.tsx"
        code={`import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@arpit194/themeforge'
import { semanticDarkOverrides } from './config/semanticTokens'
import { typography } from './config/typography'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider
      theme={{ primary: '#7C3AED', secondary: '#F59E0B' }}
      typography={typography}
      colorScheme="system"
      semanticDark={semanticDarkOverrides}
    >
      <App />
    </ThemeProvider>
  </StrictMode>
)`}
      />
    </article>
  );
}
