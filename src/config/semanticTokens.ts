import type { SemanticTokens } from "@arpit194/themeforge";

/**
 * Overrides for DEFAULT_SEMANTIC_DARK.
 *
 * Problems with the defaults this fixes:
 *
 * 1. border-subtle = neutral-800 = same shade as bg-surface (800)
 *    → borders on surface cards are invisible. Move to 700.
 *    → border-default must also step down to stay visually stronger (700 → 600).
 *
 * 2. All *-subtle bg tints default to shade 950 — same darkness as bg-page (neutral-950).
 *    → Callouts, highlights and tinted areas have no visible separation from the page.
 *    → Move all subtle tints to 900 so they read as a distinct layer.
 */
export const semanticDarkOverrides: Partial<SemanticTokens> = {
  // Borders
  "border-subtle": { scale: "neutral", shade: 700 },
  "border-default": { scale: "neutral", shade: 600 },

  // Subtle bg tints — lifted from 950 to 900 so they separate from bg-page
  "bg-primary-subtle": { scale: "primary", shade: 900 },
  "bg-secondary-subtle": { scale: "secondary", shade: 900 },
  "bg-success-subtle": { scale: "success", shade: 900 },
  "bg-warning-subtle": { scale: "warning", shade: 900 },
  "bg-error-subtle": { scale: "error", shade: 900 },
  "bg-info-subtle": { scale: "info", shade: 900 },
};
