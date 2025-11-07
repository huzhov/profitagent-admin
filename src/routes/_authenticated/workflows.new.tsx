import { createFileRoute } from "@tanstack/react-router";
import CreateWorkflowPage from "@/pages/CreateWorkflowPage";

export const Route = createFileRoute("/_authenticated/workflows/new")({
  component: CreateWorkflowPage,
});
