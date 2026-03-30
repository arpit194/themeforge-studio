import { createFileRoute } from "@tanstack/react-router";
import { TypeScriptPage } from "../components/docs/TypeScriptPage";

export const Route = createFileRoute("/docs/typescript")({
  component: TypeScriptPage,
});
