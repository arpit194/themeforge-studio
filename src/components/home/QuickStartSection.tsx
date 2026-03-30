import styles from "./QuickStartSection.module.css";

const STEPS = [
  {
    number: "01",
    title: "Install",
    code: `npm install @arpit194/themeforge`,
    lang: "bash",
  },
  {
    number: "02",
    title: "Wrap your app",
    code: `import { ThemeProvider } from '@arpit194/themeforge'

export function App() {
  return (
    <ThemeProvider theme={{ primary: '#7c3aed', secondary: '#f59e0b' }}>
      <YourApp />
    </ThemeProvider>
  )
}`,
    lang: "tsx",
  },
  {
    number: "03",
    title: "Use tokens in CSS",
    code: `.button {
  background: var(--tf-color-bg-primary);
  color: var(--tf-color-text-on-dark);
  border-radius: var(--tf-radius-md);
  padding: var(--tf-spacing-xs) var(--tf-spacing-lg);
}`,
    lang: "css",
  },
  {
    number: "04",
    title: "Or read tokens in JS",
    code: `import { useTheme } from '@arpit194/themeforge'

export function MyChart() {
  const { colors, spacing } = useTheme()

  return (
    <Canvas
      color={colors.primary.shades[500]}
      gap={spacing.lg}
    />
  )
}`,
    lang: "tsx",
  },
] as const;

export function QuickStartSection() {
  return (
    <section className={styles.section} id="quick-start">
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>Quick Start</p>
          <h2 className={styles.heading}>
            Up and running
            <br />
            <em>in minutes.</em>
          </h2>
          <p className={styles.description}>
            Install the package, wrap your app, and start using tokens
            immediately.
          </p>
        </div>

        <div className={styles.steps}>
          {STEPS.map((step) => (
            <div key={step.number} className={styles.step}>
              <div className={styles.stepMeta}>
                <span className={styles.stepNumber}>{step.number}</span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
              </div>
              <div className={styles.codeBlock}>
                <pre className={styles.code}>{step.code}</pre>
              </div>
            </div>
          ))}
        </div>

        <footer className={styles.footer}>
          <p className={styles.footerText}>
            ThemeForge — lightweight design tokens for React.
          </p>
          <code className={styles.installCommand}>
            npm install @arpit194/themeforge
          </code>
        </footer>
      </div>
    </section>
  );
}
