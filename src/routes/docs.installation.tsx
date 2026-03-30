import { createFileRoute } from "@tanstack/react-router";
import { InstallationPage } from "../components/docs/InstallationPage";

export const Route = createFileRoute("/docs/installation")({
  component: InstallationPage,
});
