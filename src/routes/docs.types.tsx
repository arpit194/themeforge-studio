import { createFileRoute } from "@tanstack/react-router";
import { TypesPage } from "../components/docs/TypesPage";

export const Route = createFileRoute("/docs/types")({
  component: TypesPage,
});
