export enum Step {
  Profile = "profile",
  Config = "config",
}

export type AgentBuilderStep = {
  id: Step;
  title: string;
  icon: React.ElementType;
};

export enum BusinessVertical {
  Entertainment = "entertainment",
  Ecommerce = "ecommerce",
  Saas = "saas",
  Retail = "retail",
  Healthcare = "healthcare",
  Finance = "finance",
  Education = "education",
  Travel = "travel",
  RealEstate = "real_estate",
}
