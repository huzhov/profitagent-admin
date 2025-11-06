import { createFileRoute } from "@tanstack/react-router";
import CreateWorkflowPage from "@/pages/CreateWorkflowPage";

export const Route = createFileRoute("/workflows/new")({
  component: CreateWorkflowPage,
});
