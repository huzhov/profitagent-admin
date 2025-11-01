import { createFileRoute } from "@tanstack/react-router";
import ReportingPage from "@/pages/ReportingPage";

export const Route = createFileRoute("/reporting")({
  component: ReportingPage,
});
