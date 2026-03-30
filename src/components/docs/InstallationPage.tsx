import { CodeBlock } from "../ui/CodeBlock";
import styles from "./DocPage.module.css";

export function InstallationPage() {
  return (
    <article className={styles.page}>
      <h1>Installation</h1>
      <p className={styles.lead}>
        Step-by-step setup for a React project. Takes about five minutes.
      </p>

      <h2>Requirements</h2>
      <ul>
        <li>React 18 or later</li>
        <li>Node 18 or later</li>
        <li>Any bundler that supports CSS custom properties (Vite, webpack, etc.)</li>
      </ul>

      <h2>1. Install the package</h2>
      <CodeBlock language="bash" filename="terminal" code={`npm install @arpit194/themeforge`} />
      <p>pnpm and yarn are also supported:</p>
      <CodeBlock language="bash" filename="terminal" code={`pnpm add @arpit194/themeforge\nyarn add @arpit194/themeforge`} />

      <h2>2. Wrap your app root</h2>
      <p>
        Import <code>ThemeProvider</code> and wrap your root component. Pass a{" "}
        <code>theme</code> object with at minimum a <code>primary</code> hex color.
      </p>
      <CodeBlock
        filename="main.tsx"
        code={`import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@arpit194/themeforge'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={{ primary: '#7C3AED' }}>
      <App />
    </ThemeProvider>
  </StrictMode>
)`}
      />

      <h2>3. Add more color scales (optional)</h2>
      <p>
        Pass any combination of scale keys. Unspecified scales fall back to built-in defaults.
      </p>
      <CodeBlock
        filename="main.tsx"
        code={`<ThemeProvider
  theme={{
    primary:   '#7C3AED',
    secondary: '#F59E0B',
    neutral:   '#6B7280',
  }}
>
  <App />
</ThemeProvider>`}
      />

      <h2>4. Start using tokens</h2>
      <p>
        All tokens are available as CSS custom properties inside any descendant of{" "}
        <code>ThemeProvider</code>.
      </p>
      <CodeBlock
        filename="Button.module.css"
        language="css"
        code={`.button {
  background-color: var(--tf-color-bg-primary);
  color: var(--tf-color-text-on-dark);
  border-radius: var(--tf-radius-md);
  padding: var(--tf-spacing-xs) var(--tf-spacing-lg);
}

.button:hover {
  background-color: var(--tf-color-bg-primary-hover);
}`}
      />
      <div className={`${styles.callout} ${styles.calloutWarning}`}>
        <p>
          Use semantic tokens like <code>--tf-color-bg-primary</code> in your components —
          not primitive vars like <code>--tf-color-primary-500</code>. Only semantic tokens
          remap automatically in dark mode.
        </p>
      </div>

      <h2>Next steps</h2>
      <ul>
        <li><strong>ThemeProvider</strong> — full prop reference including dark mode and typography</li>
        <li><strong>Colors</strong> — browse all semantic tokens and what they map to</li>
        <li><strong>TypeScript</strong> — add custom token keys with full type safety</li>
      </ul>
    </article>
  );
}
