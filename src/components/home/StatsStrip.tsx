import styles from "./StatsStrip.module.css";

const STATS = [
  { value: "11", label: "shades per color" },
  { value: "0", label: "runtime overhead" },
  { value: "0", label: "dependencies" },
  { value: "∞", label: "custom tokens" },
  { value: "100%", label: "CSS variables" },
] as const;

export function StatsStrip() {
  return (
    <div className={styles.strip}>
      {STATS.map(({ value, label }, i) => (
        <div key={i} className={styles.stat}>
          <span className={styles.value}>{value}</span>
          <span className={styles.label}>{label}</span>
        </div>
      ))}
    </div>
  );
}
