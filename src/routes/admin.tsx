import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import MainContentContainer from "../components/main-content/MainContentContainer";
import SidebarContainer from "../components/sidebar/SidebarContainer";

export const Route = createFileRoute("/admin")({
  component: Admin,
});

function Admin() {
  const [activeSection, setActiveSection] = useState("admin");

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
