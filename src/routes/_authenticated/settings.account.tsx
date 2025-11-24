import { createFileRoute } from "@tanstack/react-router";
import SettingsAccount from "@/components/settings/SettingsAccount";

export const Route = createFileRoute("/_authenticated/settings/account")({
  component: SettingsAccount,
});
