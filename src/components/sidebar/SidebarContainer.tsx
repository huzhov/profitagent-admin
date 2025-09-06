import type { ProgressStep } from "../../types";
import SidebarHeader from "./SidebarHeader";
import SidebarNavigation from "./SidebarNavigation";
import SidebarProgress from "./SidebarProgress";

export default function SidebarContainer({
  activeSection,
  setActiveSection,
  currentStep,
  steps,
}: {
  activeSection: string;
  setActiveSection: (section: string) => void;
  currentStep: number;
  steps: ProgressStep[];
}) {
  const currentProgress = ((currentStep + 1) / steps.length) * 100;

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col">
      <SidebarHeader />
      <SidebarNavigation
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Progress Bar for Agent Builder */}
      <SidebarProgress
        activeSection={activeSection}
        currentStep={currentStep}
        steps={steps}
        currentProgress={currentProgress}
      />
    </aside>
  );
}
