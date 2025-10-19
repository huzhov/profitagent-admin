import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import MainContentContainer from "../components/main-content/MainContentContainer";
import SidebarContainer from "../components/sidebar/SidebarContainer";

export const Route = createFileRoute("/reporting")({
  component: ReportingRoute,
});

function ReportingRoute() {
  const [activeSection, setActiveSection] = useState("reporting");

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
