import type { AgentBuilderStep, Step } from "./types";

export default function AgentBuilderNavigationTabs({
  currentStep,
  setCurrentStep,
  steps,
}: {
  currentStep: Step;
  setCurrentStep: (step: Step) => void;
  steps: AgentBuilderStep[];
}) {
  return (
    <div className="flex flex-wrap justify-evenly gap-2 mb-8 p-1 bg-muted rounded-lg">
      {steps.map((step) => {
        const Icon = step.icon;
        return (
          <button
            key={step.id}
            onClick={() => setCurrentStep(step.id)}
            className={`flex flex-1 basis-0 items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              step.id === currentStep
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-background/50"
            }`}
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span className="truncate">{step.title}</span>
          </button>
        );
      })}
    </div>
  );
}
