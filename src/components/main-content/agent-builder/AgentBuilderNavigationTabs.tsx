import type { ProgressStep } from "@/types";

export default function AgentBuilderNavigationTabs({
  currentStep,
  setCurrentStep,
  sections,
}: {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  sections: ProgressStep[];
}) {
  return (
    <div className="flex flex-wrap gap-2 mb-8 p-1 bg-muted rounded-lg">
      {sections.map((section) => {
        const Icon = section.icon;
        return (
          <button
            key={section.id}
            onClick={() =>
              setCurrentStep(sections.findIndex((s) => s.id === section.id))
            }
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              sections[currentStep]?.id === section.id
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-background/50"
            }`}
          >
            <Icon className="h-4 w-4" />
            <span>{section.title}</span>
          </button>
        );
      })}
    </div>
  );
}
