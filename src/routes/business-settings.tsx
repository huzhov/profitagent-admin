import BusinessSettingsContent from "@/components/main-content/BusinessSettings";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/business-settings")({
  component: BusinessSettingsRoute,
});

function BusinessSettingsRoute() {
  return <BusinessSettingsContent />;
}
