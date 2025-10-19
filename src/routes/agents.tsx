import { createFileRoute } from "@tanstack/react-router";
import AgentsContent from "@/components/main-content/Agents";

export const Route = createFileRoute("/agents")({
  component: AgentsRoute,
});

function AgentsRoute() {
  return <AgentsContent />;
}
