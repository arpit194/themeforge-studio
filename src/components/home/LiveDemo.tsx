import { useTheme } from "@arpit194/themeforge";
import { usePageTheme } from "../../context/usePageTheme";
import styles from "./LiveDemo.module.css";

const PRIMARY_PRESETS = [
  { label: "Violet",  hex: "#7C3AED" },
  { label: "Blue",    hex: "#2563EB" },
  { label: "Cyan",    hex: "#0891B2" },
  { label: "Green",   hex: "#16A34A" },
  { label: "Rose",    hex: "#E11D48" },
  { label: "Orange",  hex: "#EA580C" },
] as const;

const SECONDARY_PRESETS = [
  { label: "Amber",   hex: "#F59E0B" },
  { label: "Slate",   hex: "#475569" },
  { label: "Teal",    hex: "#0D9488" },
  { label: "Indigo",  hex: "#4F46E5" },
  { label: "Pink",    hex: "#DB2777" },
  { label: "Stone",   hex: "#78716C" },
] as const;

const SHADES = ["50","100","200","300","400","500","600","700","800","900","950"] as const;

export function LiveDemo() {
  const { primary, secondary, setPrimary, setSecondary } = usePageTheme();

  // Read resolved token values directly from JS — the whole page uses these same values
  const { colors } = useTheme();
  const primaryHex = colors.primary.shades[500];
  const secondaryHex = colors.secondary.shades[500];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.layout}>

          {/* Controls */}
          <div className={styles.controls}>
            <p className={styles.eyebrow}>Interactive demo</p>
            <h2 className={styles.heading}>
              Change the theme.<br /><em>Watch the page update.</em>
            </h2>
            <p className={styles.description}>
              Pick colors below. ThemeForge regenerates all 11 shades and rewires
              every semantic token across the entire page — instantly.
            </p>

            <div className={styles.pickerGroup}>
              <span className={styles.pickerLabel}>Primary</span>
              <div className={styles.presets}>
                {PRIMARY_PRESETS.map(({ label, hex }) => (
                  <button
                    key={hex}
                    className={`${styles.preset} ${primary === hex ? styles.presetActive : ""}`}
                    style={{ backgroundColor: hex }}
                    onClick={() => setPrimary(hex)}
                    aria-label={`Set primary to ${label}`}
                    aria-pressed={primary === hex}
                  />
                ))}
                <input
                  type="color"
                  className={styles.colorInput}
                  value={primary}
                  onChange={e => setPrimary(e.target.value)}
                  aria-label="Custom primary color"
                />
              </div>
            </div>

            <div className={styles.pickerGroup}>
              <span className={styles.pickerLabel}>Secondary</span>
              <div className={styles.presets}>
                {SECONDARY_PRESETS.map(({ label, hex }) => (
                  <button
                    key={hex}
                    className={`${styles.preset} ${secondary === hex ? styles.presetActive : ""}`}
                    style={{ backgroundColor: hex }}
                    onClick={() => setSecondary(hex)}
                    aria-label={`Set secondary to ${label}`}
                    aria-pressed={secondary === hex}
                  />
                ))}
                <input
                  type="color"
                  className={styles.colorInput}
                  value={secondary}
                  onChange={e => setSecondary(e.target.value)}
                  aria-label="Custom secondary color"
                />
              </div>
            </div>
          </div>

          {/* Token preview — reads live JS values via useTheme() */}
          <div className={styles.preview}>
            <div className={styles.previewHeader}>
              <span className={styles.previewLabel}>Resolved token values</span>
            </div>

            <div className={styles.scaleBlock}>
              <span className={styles.scaleTitle}>primary</span>
              <div className={styles.scaleSwatches}>
                {SHADES.map(shade => (
                  <div
                    key={shade}
                    className={styles.scaleSwatch}
                    style={{ backgroundColor: colors.primary.shades[shade] }}
                    title={`primary-${shade}: ${colors.primary.shades[shade]}`}
                  />
                ))}
              </div>
            </div>

            <div className={styles.scaleBlock}>
              <span className={styles.scaleTitle}>secondary</span>
              <div className={styles.scaleSwatches}>
                {SHADES.map(shade => (
                  <div
                    key={shade}
                    className={styles.scaleSwatch}
                    style={{ backgroundColor: colors.secondary.shades[shade] }}
                    title={`secondary-${shade}: ${colors.secondary.shades[shade]}`}
                  />
                ))}
              </div>
            </div>

            <div className={styles.tokenList}>
              <div className={styles.tokenRow}>
                <span className={styles.tokenVar}>--tf-color-bg-primary</span>
                <span className={styles.tokenChip} style={{ backgroundColor: primaryHex }}>{primaryHex}</span>
              </div>
              <div className={styles.tokenRow}>
                <span className={styles.tokenVar}>--tf-color-bg-secondary</span>
                <span className={styles.tokenChip} style={{ backgroundColor: secondaryHex }}>{secondaryHex}</span>
              </div>
              <div className={styles.tokenRow}>
                <span className={styles.tokenVar}>--tf-color-bg-primary-subtle</span>
                <span className={styles.tokenChip} style={{ backgroundColor: colors.primary.shades[50], color: "var(--tf-color-text-primary)" }}>
                  {colors.primary.shades[50]}
                </span>
              </div>
              <div className={styles.tokenRow}>
                <span className={styles.tokenVar}>--tf-color-border-primary</span>
                <span className={styles.tokenChip} style={{ backgroundColor: colors.primary.shades[500] }}>{colors.primary.shades[500]}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
