import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/ab-testing")({
  component: ABTestingLayout,
});

function ABTestingLayout() {
  return <Outlet />;
}
