import { createFileRoute } from "@tanstack/react-router";
import AgentBuilderPage from "@/pages/AgentBuilderPage";

export const Route = createFileRoute("/agents/create/$type")({
  component: AgentBuilderPage,
});
