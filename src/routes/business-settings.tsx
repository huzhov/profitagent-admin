import { createFileRoute } from "@tanstack/react-router";
import BusinessSettingsPage from "@/pages/BusinessSettingsPage";

export const Route = createFileRoute("/business-settings")({
  component: BusinessSettingsPage,
});
