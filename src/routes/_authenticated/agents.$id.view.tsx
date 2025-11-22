import { createFileRoute } from "@tanstack/react-router";
import AgentViewPage from "@/pages/AgentViewPage";

export const Route = createFileRoute("/_authenticated/agents/$id/view")({
  component: AgentViewPage,
});
