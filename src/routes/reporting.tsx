import { createFileRoute } from "@tanstack/react-router";
import ReportingContent from "@/components/main-content/Reporting";

export const Route = createFileRoute("/reporting")({
  component: ReportingRoute,
});

function ReportingRoute() {
  return <ReportingContent />;
}
