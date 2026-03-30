import { createFileRoute } from "@tanstack/react-router";
import { CssVariablesPage } from "../components/docs/CssVariablesPage";

export const Route = createFileRoute("/docs/css-variables")({
  component: CssVariablesPage,
});
