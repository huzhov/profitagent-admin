export type Agent = {
  id: number;
  name: string;
  description: string;
  status: string;
  workflows: number;
  tests: number;
  conversations: number;
  conversionRate: string;
  revenueGenerated: string;
  customerSatisfaction: string;
  channels: string[];
  created: string;
  lastActive: string;
  iconColor: string;
};

export type AgentListResponse = {
  id: string;
  name: string;
  status: string;
};

export type AgentResponse = {
  id: string;
  name: string;
  systemPrompt: string;
  description: string;
  objective: string;
  wabaAccountId: string;
  creativity: number;
  tone: string;
  faq: string;
  guardrails: string[];
  subscriptionPlans: string;
  status: string;
};

export type AgentCountResponse = {
  count: number;
};
