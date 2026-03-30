import { createFileRoute } from "@tanstack/react-router";
import { ExamplesPage } from "../components/docs/ExamplesPage";

export const Route = createFileRoute("/docs/examples")({
  component: ExamplesPage,
});
