import { createFileRoute } from "@tanstack/react-router";
import ReportingPage from "@/pages/ReportingPage";

export const Route = createFileRoute("/_authenticated/reporting")({
  component: ReportingPage,
});
