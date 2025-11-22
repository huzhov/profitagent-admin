import { createFileRoute } from "@tanstack/react-router";
import AgentEditPage from "@/pages/AgentEditPage";

export const Route = createFileRoute("/_authenticated/agents/$id/edit")({
  component: AgentEditPage,
});
