import { createFileRoute } from "@tanstack/react-router";
import PrivacyPolicyPage from "@/pages/PrivacyPolicyPage";

export const Route = createFileRoute("/_authenticated/privacy-policy")({
  component: PrivacyPolicyPage,
});
