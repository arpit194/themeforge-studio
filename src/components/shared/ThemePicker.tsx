import { Popover } from '@base-ui/react/popover';
import { Palette } from 'lucide-react';
import { usePageTheme } from '../../context/usePageTheme';
import { usePortal } from '../../context/PortalContext';
import { Button } from '../ui/Button';
import styles from './ThemePicker.module.css';

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

const NEUTRAL_PRESETS = [
  { label: "Cool Grey",   hex: "#6B7280" },
  { label: "Slate",       hex: "#64748B" },
  { label: "Blue Grey",   hex: "#607D8B" },
  { label: "Zinc",        hex: "#71717A" },
  { label: "Stone",       hex: "#78716C" },
  { label: "Warm Grey",   hex: "#9CA3AF" },
] as const;

export function ThemePicker() {
  const portalRef = usePortal();
  const { primary, secondary, neutral, setPrimary, setSecondary, setNeutral } = usePageTheme();

  return (
    <Popover.Root>
      <Popover.Trigger
        render={<Button variant="secondary" size="md" className={styles.trigger} />}
        aria-label="Customize theme colors"
      >
        <Palette size={18} />
        <span className={styles.label}>Customize</span>
      </Popover.Trigger>
      <Popover.Portal container={portalRef}>
        <Popover.Positioner side="top" align="start" sideOffset={12}>
          <Popover.Popup className={styles.popup}>
            <p className={styles.popupTitle}>Theme Colors</p>

            <div className={styles.pickerGroup}>
              <span className={styles.pickerLabel}>Primary</span>
              <div className={styles.presets}>
                {PRIMARY_PRESETS.map(({ label, hex }) => (
                  <button
                    key={hex}
                    className={`${styles.preset} ${primary === hex ? styles.presetActive : ''}`}
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
                    className={`${styles.preset} ${secondary === hex ? styles.presetActive : ''}`}
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

            <div className={styles.pickerGroup}>
              <span className={styles.pickerLabel}>Neutral</span>
              <div className={styles.presets}>
                {NEUTRAL_PRESETS.map(({ label, hex }) => (
                  <button
                    key={hex}
                    className={`${styles.preset} ${neutral === hex ? styles.presetActive : ''}`}
                    style={{ backgroundColor: hex }}
                    onClick={() => setNeutral(hex)}
                    aria-label={`Set neutral to ${label}`}
                    aria-pressed={neutral === hex}
                  />
                ))}
                <input
                  type="color"
                  className={styles.colorInput}
                  value={neutral}
                  onChange={e => setNeutral(e.target.value)}
                  aria-label="Custom neutral color"
                />
              </div>
            </div>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}
