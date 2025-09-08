export enum Step {
  Profile = "profile",
  Config = "config",
}

export type AgentBuilderStep = {
  id: Step;
  title: string;
  icon: React.ElementType;
};
