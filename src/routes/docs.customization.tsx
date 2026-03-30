import { createFileRoute } from "@tanstack/react-router";
import { CustomizationPage } from "../components/docs/CustomizationPage";

export const Route = createFileRoute("/docs/customization")({
  component: CustomizationPage,
});
