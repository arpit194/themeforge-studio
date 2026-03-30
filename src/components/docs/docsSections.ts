export const DOC_SECTIONS = [
  {
    title: "Introduction",
    items: [
      { label: "Getting Started",  path: "/docs/getting-started" },
      { label: "Installation",     path: "/docs/installation" },
      { label: "Customization",    path: "/docs/customization" },
      { label: "Examples",         path: "/docs/examples" },
    ],
  },
  {
    title: "Tokens",
    items: [
      { label: "Colors",      path: "/docs/colors" },
      { label: "Typography",  path: "/docs/typography" },
      { label: "Spacing",     path: "/docs/spacing" },
      { label: "Radius",      path: "/docs/radius" },
      { label: "Shadows",     path: "/docs/shadows" },
    ],
  },
  {
    title: "API",
    items: [
      { label: "ThemeProvider",  path: "/docs/theme-provider" },
      { label: "useTheme",       path: "/docs/use-theme" },
      { label: "CSS Variables",  path: "/docs/css-variables" },
      { label: "TypeScript",     path: "/docs/typescript" },
      { label: "Types",          path: "/docs/types" },
    ],
  },
] as const;
