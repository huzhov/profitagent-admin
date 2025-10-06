import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import MainContentContainer from "../components/main-content/MainContentContainer";
import SidebarContainer from "../components/sidebar/SidebarContainer";

export const Route = createFileRoute("/messages")({
  component: Messages,
});

function Messages() {
  const [activeSection, setActiveSection] = useState("messages");

  return (
    <div className="min-h-screen bg-background flex">
      <SidebarContainer activeSection={activeSection} />

      <MainContentContainer
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
    </div>
  );
}
