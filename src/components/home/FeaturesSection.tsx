import styles from "./FeaturesSection.module.css";

const FEATURES = [
  {
    number: "01",
    title: "One color, eleven shades",
    description:
      "Pass a single hex value. Get a complete 50-950 scale, algorithmically generated and immediately usable as CSS variables.",
  },
  {
    number: "02",
    title: "Semantic by design",
    description:
      "bg-primary-hover, text-on-dark, border-focus. Tokens communicate intent, not just values — making your CSS self-documenting.",
  },
  {
    number: "03",
    title: "Fully type-safe",
    description:
      "Module augmentation lets you extend token types with zero boilerplate. Your custom tokens become first-class TypeScript citizens.",
  },
  {
    number: "04",
    title: "Pure CSS variables",
    description:
      "Everything resolves to CSS custom properties scoped to your ThemeProvider. Components read tokens with no JavaScript — just the cascade.",
  },
] as const;

export function FeaturesSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>What's in the box</p>
          <h2 className={styles.heading}>
            Built for
            <br />
            design systems.
          </h2>
        </div>
        <div className={styles.grid}>
          {FEATURES.map((feature) => (
            <div key={feature.number} className={styles.card}>
              <span className={styles.cardNumber}>{feature.number}</span>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
