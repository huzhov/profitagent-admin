import { createFileRoute } from "@tanstack/react-router";
import IntegrationsManagement from "@/components/main-content/IntegrationsManagement";

export const Route = createFileRoute("/integrations")({
  component: Integrations,
});

function Integrations() {
  return <IntegrationsManagement />;
}
