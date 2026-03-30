import type { TypographyConfig } from "@arpit194/themeforge";

export const typography: TypographyConfig = {
  fontFamilies: {
    primary: "'DM Serif Display', serif",
    secondary: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    mono: "'JetBrains Mono', monospace",
  },
  textStyles: {
    "body-lg": { family: "secondary" },
    body: { family: "secondary" },
    "body-sm": { family: "secondary" },
    label: { family: "secondary" },
    caption: { family: "secondary" },
    code: { family: "mono" },
  },
};
