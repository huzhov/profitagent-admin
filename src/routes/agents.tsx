import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import MainContentContainer from "../components/main-content/MainContentContainer";
import SidebarContainer from "../components/sidebar/SidebarContainer";

export const Route = createFileRoute("/agents")({
  component: AgentsRoute,
});

function AgentsRoute() {
  const [activeSection, setActiveSection] = useState("agents");

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
