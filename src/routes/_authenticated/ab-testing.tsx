import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/ab-testing")({
  component: ABTestingLayout,
});

function ABTestingLayout() {
  return <Outlet />;
}
