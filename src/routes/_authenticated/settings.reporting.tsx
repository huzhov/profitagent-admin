import { createFileRoute } from "@tanstack/react-router";
import SettingsReporting from "@/components/settings/SettingsReporting";

export const Route = createFileRoute("/_authenticated/settings/reporting")({
  component: SettingsReporting,
});
