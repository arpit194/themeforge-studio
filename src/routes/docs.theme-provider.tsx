import { createFileRoute } from "@tanstack/react-router";
import { ThemeProviderPage } from "../components/docs/ThemeProviderPage";

export const Route = createFileRoute("/docs/theme-provider")({
  component: ThemeProviderPage,
});
