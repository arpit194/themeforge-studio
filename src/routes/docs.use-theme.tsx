import { createFileRoute } from "@tanstack/react-router";
import { UseThemePage } from "../components/docs/UseThemePage";

export const Route = createFileRoute("/docs/use-theme")({
  component: UseThemePage,
});
