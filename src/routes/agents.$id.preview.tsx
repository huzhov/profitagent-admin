import { createFileRoute } from "@tanstack/react-router";
import AgentPreviewPage from "@/pages/AgentPreviewPage";

export const Route = createFileRoute("/agents/$id/preview")({
  component: AgentPreviewPage,
});
