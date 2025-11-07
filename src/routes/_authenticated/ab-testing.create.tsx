import { createFileRoute } from "@tanstack/react-router";
import CreateABTestPage from "@/pages/CreateABTestPage";

export const Route = createFileRoute("/_authenticated/ab-testing/create")({
  component: CreateABTestPage,
});
