import type { ProgressStep } from "../../types";
import AgentBuilder from "./AgentBuilder";
import UsersManagement from "./UsersManagement";
import Reporting from "./Reporting";
import Agents from "./Agents";
import Messages from "./Messages";

enum NavbarSection {
  Builder = "builder",
  Admin = "admin",
  Reporting = "reporting",
  Agents = "agents",
  Messages = "messages",
}

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
        {activeSection === NavbarSection.Builder && (
          <AgentBuilder
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            steps={steps}
          />
        )}
        {activeSection === NavbarSection.Admin && <UsersManagement />}
        {activeSection === NavbarSection.Reporting && <Reporting />}
        {activeSection === NavbarSection.Agents && (
          <Agents setActiveSection={setActiveSection} />
        )}
        {activeSection === NavbarSection.Messages && <Messages />}
      </div>
    </main>
  );
}
