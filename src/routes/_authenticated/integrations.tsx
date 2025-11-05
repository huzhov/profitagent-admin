import { createFileRoute } from "@tanstack/react-router";
import IntegrationsPage from "@/pages/IntegrationsPage";

export const Route = createFileRoute("/_authenticated/integrations")({
  component: IntegrationsPage,
});
