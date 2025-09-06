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
import MainContentContainer from "./components/main-content/MainContentContainer";
import SidebarContainer from "./components/sidebar/SidebarContainer";
import type { ProgressStep } from "./types";

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

function App() {
  const [activeSection, setActiveSection] = useState("builder");
  const [currentStep, setCurrentStep] = useState(0);

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@company.com",
      role: "Admin",
      status: "Active",
      lastLogin: "2024-01-15",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@company.com",
      role: "Editor",
      status: "Active",
      lastLogin: "2024-01-14",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@company.com",
      role: "Viewer",
      status: "Inactive",
      lastLogin: "2024-01-10",
    },
  ]);

  const toggleUserStatus = (userId: number) => {
    setUsers(
      users.map((user) =>
        user.id === userId
          ? {
              ...user,
              status: user.status === "Active" ? "Inactive" : "Active",
            }
          : user
      )
    );
  };

  const deleteUser = (userId: number) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  return (
    <div className="min-h-screen bg-background flex">
      <SidebarContainer
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        currentStep={currentStep}
        steps={steps}
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

export default App;
