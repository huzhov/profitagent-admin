import { createFileRoute } from "@tanstack/react-router";
import AgentPreviewPage from "@/pages/AgentPreviewPage";

export const Route = createFileRoute("/_authenticated/agents/$id/preview")({
  component: AgentPreviewPage,
});
