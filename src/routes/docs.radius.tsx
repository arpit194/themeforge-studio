import { createFileRoute } from "@tanstack/react-router";
import { RadiusPage } from "../components/docs/RadiusPage";

export const Route = createFileRoute("/docs/radius")({
  component: RadiusPage,
});
