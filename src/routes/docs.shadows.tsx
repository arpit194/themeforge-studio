import { createFileRoute } from "@tanstack/react-router";
import { ShadowsPage } from "../components/docs/ShadowsPage";

export const Route = createFileRoute("/docs/shadows")({
  component: ShadowsPage,
});
