import { createFileRoute } from "@tanstack/react-router";
import ABTestingPage from "@/pages/ABTestingPage";

export const Route = createFileRoute("/testing")({
  component: ABTestingPage,
});
