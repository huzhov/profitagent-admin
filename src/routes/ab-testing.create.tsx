import { createFileRoute } from "@tanstack/react-router";
import CreateABTestPage from "@/pages/CreateABTestPage";

export const Route = createFileRoute("/ab-testing/create")({
  component: CreateABTestPage,
});
