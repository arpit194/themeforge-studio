import { createFileRoute } from "@tanstack/react-router";
import { ColorsPage } from "../components/docs/ColorsPage";

export const Route = createFileRoute("/docs/colors")({
  component: ColorsPage,
});
