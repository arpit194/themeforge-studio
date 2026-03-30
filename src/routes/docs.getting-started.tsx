import { createFileRoute } from "@tanstack/react-router";
import { GettingStartedPage } from "../components/docs/GettingStartedPage";

export const Route = createFileRoute("/docs/getting-started")({
  component: GettingStartedPage,
});
