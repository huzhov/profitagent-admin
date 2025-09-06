import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Bot,
  Settings,
  Database,
  Shield,
  Sliders,
  Wrench,
  MessageSquare,
  TestTube,
  Smartphone,
} from "lucide-react";
import MainContentContainer from "../components/main-content/MainContentContainer";
import SidebarContainer from "../components/sidebar/SidebarContainer";
import type { ProgressStep } from "../types";

const steps: ProgressStep[] = [
  { id: "agent", title: "AI Agent Attributes", icon: Bot },
  { id: "system", title: "System Prompt & Design", icon: Settings },
  { id: "knowledge", title: "Static Knowledge & Memory", icon: Database },
  { id: "guardrails", title: "Guardrails", icon: Shield },
  { id: "generation", title: "Generation Settings", icon: Sliders },
  { id: "tools", title: "Dynamic Tools", icon: Wrench },
  { id: "whatsapp", title: "WhatsApp Native Fields", icon: MessageSquare },
  { id: "demo", title: "Demo & Test", icon: TestTube },
  { id: "integration", title: "WhatsApp Integration", icon: Smartphone },
];

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [activeSection, setActiveSection] = useState("builder");
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="min-h-screen bg-background flex">
      <SidebarContainer
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <MainContentContainer
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        steps={steps}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
    </div>
  );
}
