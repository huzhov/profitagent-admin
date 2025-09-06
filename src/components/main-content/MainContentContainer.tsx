import type { ProgressStep } from "../../types";
import AgentBuilder from "./AgentBuilder";
import UsersManagement from "./UsersManagement";
import Reporting from "./Reporting";
import Agents from "./Agents";
import Messages from "./Messages";

export default function MainContentContainer({
  currentStep,
  setCurrentStep,
  steps,
  activeSection,
  setActiveSection,
}: {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  steps: ProgressStep[];
  activeSection: string;
  setActiveSection: (section: string) => void;
}) {
  return (
    <main className="flex-1 overflow-auto">
      <div className="container mx-auto px-8 py-8">
        {activeSection === "builder" && (
          <AgentBuilder
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            steps={steps}
          />
        )}
        {activeSection === "admin" && <UsersManagement />}
        {activeSection === "reporting" && <Reporting />}
        {activeSection === "agents" && (
          <Agents setActiveSection={setActiveSection} />
        )}
        {activeSection === "messages" && <Messages />}
      </div>
    </main>
  );
}
