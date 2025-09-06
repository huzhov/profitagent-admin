import type { ProgressStep } from "../../types";
import { Badge } from "../ui/badge";

export default function SidebarProgress({
  activeSection,
  currentStep,
  steps,
  currentProgress,
}: {
  activeSection: string;
  currentStep: number;
  steps: ProgressStep[];
  currentProgress: number;
}) {
  return (
    <>
      {activeSection === "builder" && (
        <div className="p-4 border-t border-border">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="secondary" className="text-xs">
              Step {currentStep + 1} of {steps.length}
            </Badge>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${currentProgress}%` }}
            />
          </div>
        </div>
      )}
    </>
  );
}
