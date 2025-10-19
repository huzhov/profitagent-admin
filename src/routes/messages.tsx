import { createFileRoute } from "@tanstack/react-router";
import MessagesContent from "@/components/main-content/messages/Messages";

export const Route = createFileRoute("/messages")({
  component: Messages,
});

function Messages() {
  return <MessagesContent />;
}
