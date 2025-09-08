import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import MainContentContainer from "../components/main-content/MainContentContainer";
import SidebarContainer from "../components/sidebar/SidebarContainer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [activeSection, setActiveSection] = useState("builder");

  return (
    <div className="min-h-screen bg-background flex">
      <SidebarContainer
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <MainContentContainer
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
    </div>
  );
}
