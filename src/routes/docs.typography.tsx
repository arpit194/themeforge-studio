import { createFileRoute } from "@tanstack/react-router";
import { TypographyPage } from "../components/docs/TypographyPage";

export const Route = createFileRoute("/docs/typography")({
  component: TypographyPage,
});
