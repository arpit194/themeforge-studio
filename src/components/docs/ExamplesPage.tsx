import { CodeBlock } from "../ui/CodeBlock";
import styles from "./DocPage.module.css";

export function ExamplesPage() {
  return (
    <article className={styles.page}>
      <h1>Examples</h1>
      <p className={styles.lead}>
        Self-contained component patterns showing how ThemeForge tokens compose in practice.
        Copy and adapt these directly into your project.
      </p>

      <h2>Button</h2>
      <p>
        A button with primary, secondary, and ghost variants — each using semantic tokens
        so they adapt to theme changes and dark mode automatically.
      </p>
      <CodeBlock
        filename="Button.module.css"
        language="css"
        code={`.root {
  display: inline-flex;
  align-items: center;
  gap: var(--tf-spacing-xs);
  border: none;
  border-radius: var(--tf-radius-md);
  cursor: pointer;
  font-family: var(--tf-text-label-family);
  font-size: var(--tf-text-label-size);
  font-weight: var(--tf-font-weight-medium);
  padding: var(--tf-spacing-xs) var(--tf-spacing-lg);
  transition: background-color 150ms ease, color 150ms ease;
}

.primary {
  background-color: var(--tf-color-bg-primary);
  color: var(--tf-color-text-on-dark);
}
.primary:hover { background-color: var(--tf-color-bg-primary-hover); }
.primary:active { background-color: var(--tf-color-bg-primary-active); }

.secondary {
  background-color: var(--tf-color-bg-secondary);
  color: var(--tf-color-text-on-dark);
}
.secondary:hover { background-color: var(--tf-color-bg-secondary-hover); }

.ghost {
  background-color: transparent;
  color: var(--tf-color-text-primary);
}
.ghost:hover { background-color: var(--tf-color-bg-primary-subtle); }`}
      />

      <h2>Badge / Status chip</h2>
      <p>
        Status badges using the built-in success, warning, error, and info semantic tokens.
      </p>
      <CodeBlock
        filename="Badge.module.css"
        language="css"
        code={`.badge {
  display: inline-flex;
  align-items: center;
  gap: var(--tf-spacing-2xs);
  padding: var(--tf-spacing-2xs) var(--tf-spacing-sm);
  border-radius: var(--tf-radius-full);
  font-family: var(--tf-text-label-family);
  font-size: var(--tf-font-size-xs);
  font-weight: var(--tf-font-weight-medium);
  border: 1px solid transparent;
}

.success {
  background-color: var(--tf-color-bg-success-subtle);
  color: var(--tf-color-text-success);
  border-color: var(--tf-color-border-success);
}

.warning {
  background-color: var(--tf-color-bg-warning-subtle);
  color: var(--tf-color-text-warning);
  border-color: var(--tf-color-border-warning);
}

.error {
  background-color: var(--tf-color-bg-error-subtle);
  color: var(--tf-color-text-error);
  border-color: var(--tf-color-border-error);
}

.info {
  background-color: var(--tf-color-bg-info-subtle);
  color: var(--tf-color-text-info);
  border-color: var(--tf-color-border-info);
}`}
      />
      <CodeBlock
        filename="Badge.tsx"
        code={`type Variant = 'success' | 'warning' | 'error' | 'info'

export function Badge({ variant, children }: { variant: Variant; children: React.ReactNode }) {
  return <span className={\`\${styles.badge} \${styles[variant]}\`}>{children}</span>
}`}
      />

      <h2>Card</h2>
      <p>
        A surface card with header, body, and footer zones. Uses surface tokens so it
        sits visibly above the page background in both light and dark mode.
      </p>
      <CodeBlock
        filename="Card.module.css"
        language="css"
        code={`.card {
  background-color: var(--tf-color-bg-surface);
  border: 1px solid var(--tf-color-border-subtle);
  border-radius: var(--tf-radius-xl);
  box-shadow: var(--tf-shadow-sm);
  overflow: hidden;
}

.header {
  padding: var(--tf-spacing-lg) var(--tf-spacing-xl);
  border-bottom: 1px solid var(--tf-color-border-subtle);
}

.title {
  font-family: var(--tf-text-body-family);
  font-size: var(--tf-text-body-lg-size);
  font-weight: var(--tf-font-weight-semibold);
  color: var(--tf-color-text-primary);
  margin: 0;
}

.body {
  padding: var(--tf-spacing-xl);
  color: var(--tf-color-text-secondary);
  font-family: var(--tf-text-body-family);
  font-size: var(--tf-text-body-size);
  line-height: var(--tf-line-height-relaxed);
}

.footer {
  padding: var(--tf-spacing-md) var(--tf-spacing-xl);
  border-top: 1px solid var(--tf-color-border-subtle);
  background-color: var(--tf-color-bg-subtle);
  display: flex;
  justify-content: flex-end;
  gap: var(--tf-spacing-sm);
}`}
      />

      <h2>Alert / Callout</h2>
      <p>
        Inline alerts for success, warning, error, and info states using semantic status tokens.
      </p>
      <CodeBlock
        filename="Alert.module.css"
        language="css"
        code={`.alert {
  display: flex;
  gap: var(--tf-spacing-md);
  align-items: flex-start;
  padding: var(--tf-spacing-lg);
  border-radius: var(--tf-radius-lg);
  border: 1px solid;
}

.success {
  background-color: var(--tf-color-bg-success-subtle);
  border-color: var(--tf-color-border-success);
  color: var(--tf-color-text-success);
}

.warning {
  background-color: var(--tf-color-bg-warning-subtle);
  border-color: var(--tf-color-border-warning);
  color: var(--tf-color-text-warning);
}

.error {
  background-color: var(--tf-color-bg-error-subtle);
  border-color: var(--tf-color-border-error);
  color: var(--tf-color-text-error);
}

.info {
  background-color: var(--tf-color-bg-info-subtle);
  border-color: var(--tf-color-border-info);
  color: var(--tf-color-text-info);
}

.message {
  font-family: var(--tf-text-body-family);
  font-size: var(--tf-text-body-size);
  line-height: var(--tf-line-height-relaxed);
}`}
      />

      <h2>Input</h2>
      <p>
        A text input with focus ring, error state, and disabled state — all via semantic tokens.
      </p>
      <CodeBlock
        filename="Input.module.css"
        language="css"
        code={`.input {
  width: 100%;
  font-family: var(--tf-text-body-family);
  font-size: var(--tf-text-body-size);
  color: var(--tf-color-text-primary);
  background-color: var(--tf-color-bg-surface);
  border: 1px solid var(--tf-color-border-default);
  border-radius: var(--tf-radius-md);
  padding: var(--tf-spacing-xs) var(--tf-spacing-md);
  outline: none;
  transition: border-color 150ms ease, box-shadow 150ms ease;
}

.input::placeholder {
  color: var(--tf-color-text-placeholder);
}

.input:hover {
  border-color: var(--tf-color-border-strong);
}

.input:focus {
  border-color: var(--tf-color-border-primary-focus);
  box-shadow: 0 0 0 3px var(--tf-color-bg-primary-subtle);
}

.input:disabled {
  background-color: var(--tf-color-bg-subtle);
  color: var(--tf-color-text-disabled);
  cursor: not-allowed;
}

.inputError {
  border-color: var(--tf-color-border-error);
}

.inputError:focus {
  border-color: var(--tf-color-border-error);
  box-shadow: 0 0 0 3px var(--tf-color-bg-error-subtle);
}

.hint {
  font-size: var(--tf-font-size-xs);
  margin-top: var(--tf-spacing-xs);
  color: var(--tf-color-text-secondary);
}

.hintError {
  color: var(--tf-color-text-error);
}`}
      />

      <h2>Navigation link</h2>
      <p>
        A sidebar or nav link with active and hover states using primary tokens.
      </p>
      <CodeBlock
        filename="NavLink.module.css"
        language="css"
        code={`.link {
  display: flex;
  align-items: center;
  gap: var(--tf-spacing-sm);
  padding: var(--tf-spacing-xs) var(--tf-spacing-md);
  border-radius: var(--tf-radius-md);
  font-family: var(--tf-text-body-family);
  font-size: var(--tf-text-body-size);
  color: var(--tf-color-text-secondary);
  text-decoration: none;
  transition: background-color 150ms ease, color 150ms ease;
}

.link:hover {
  background-color: var(--tf-color-bg-primary-subtle);
  color: var(--tf-color-text-primary);
}

.linkActive {
  background-color: var(--tf-color-bg-primary);
  color: var(--tf-color-text-on-dark);
  font-weight: var(--tf-font-weight-medium);
}

.linkActive:hover {
  background-color: var(--tf-color-bg-primary-hover);
}`}
      />

      <h2>Skeleton loader</h2>
      <p>
        A shimmer placeholder using neutral surface tokens — adapts to dark mode without
        any extra code.
      </p>
      <CodeBlock
        filename="Skeleton.module.css"
        language="css"
        code={`@keyframes shimmer {
  from { background-position: -200% 0; }
  to   { background-position:  200% 0; }
}

.skeleton {
  border-radius: var(--tf-radius-md);
  background-image: linear-gradient(
    90deg,
    var(--tf-color-bg-subtle) 25%,
    var(--tf-color-bg-surface) 50%,
    var(--tf-color-bg-subtle) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
}

.text {
  height: 1em;
  margin-bottom: var(--tf-spacing-xs);
}

.heading {
  height: 1.5em;
  width: 60%;
  margin-bottom: var(--tf-spacing-md);
}

.avatar {
  border-radius: var(--tf-radius-full);
  width: 40px;
  height: 40px;
}`}
      />
    </article>
  );
}
