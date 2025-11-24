import { createFileRoute } from "@tanstack/react-router";
import SettingsGeneral from "@/components/settings/SettingsGeneral";

export const Route = createFileRoute("/_authenticated/settings/general")({
  component: SettingsGeneral,
});
