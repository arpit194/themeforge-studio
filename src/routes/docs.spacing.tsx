import { createFileRoute } from "@tanstack/react-router";
import { SpacingPage } from "../components/docs/SpacingPage";

export const Route = createFileRoute("/docs/spacing")({
  component: SpacingPage,
});
