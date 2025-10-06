import MainContentContainer from "@/components/main-content/MainContentContainer";
import SidebarContainer from "@/components/sidebar/SidebarContainer";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/business-settings")({
  component: BusinessSettings,
});

function BusinessSettings() {
  const [activeSection, setActiveSection] = useState("business-settings");

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
