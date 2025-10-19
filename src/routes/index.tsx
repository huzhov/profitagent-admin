import { createFileRoute } from "@tanstack/react-router";
import AgentBuilderContainer from "@/components/main-content/agent-builder/AgentBuilderContainer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return <AgentBuilderContainer />;
}
