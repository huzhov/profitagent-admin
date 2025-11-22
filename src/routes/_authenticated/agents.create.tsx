import { createFileRoute } from "@tanstack/react-router";
import AgentBuilderPage from "@/pages/AgentBuilderPage";

export const Route = createFileRoute("/_authenticated/agents/create")({
  component: AgentBuilderPage,
});
