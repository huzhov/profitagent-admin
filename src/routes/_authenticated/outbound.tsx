import { createFileRoute } from "@tanstack/react-router";
import OutboundPage from "@/pages/OutboundPage";

export const Route = createFileRoute("/_authenticated/outbound")({
  component: OutboundPage,
});
