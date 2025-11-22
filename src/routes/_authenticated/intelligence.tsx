import { createFileRoute } from "@tanstack/react-router";
import IntelligencePage from "@/pages/IntelligencePage";

export const Route = createFileRoute("/_authenticated/intelligence")({
  component: IntelligencePage,
});
