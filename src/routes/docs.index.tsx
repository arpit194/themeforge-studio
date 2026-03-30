import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/docs/")({
  loader: () => redirect({ to: "/docs/getting-started" }),
});
