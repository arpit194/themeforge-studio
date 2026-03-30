import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import "./index.css";
import { PageThemeProvider } from "./context/PageTheme";
import { routeTree } from "./routeTree.gen";

declare module "@arpit194/themeforge" {
  interface CustomFontFamilyKeys {
    mono: string;
  }
}

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PageThemeProvider>
      <RouterProvider router={router} />
    </PageThemeProvider>
  </StrictMode>,
);
