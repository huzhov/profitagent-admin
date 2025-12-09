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
  description: string;
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
  guardrails: string[] | null;
  subscriptionPlans: string;
  followupFrequency: number | null;
  status: string;
  catalogS3Key?: string;
  catalogName?: string;
  questionSets?: {
    name: string;
    questions: Array<{
      id: string;
      question: string;
      type: string;
      options?: string[];
      note?: string;
    }>;
  };
  businessId: string;
  catalog?: {
    id: string;
    name: string;
  };
};

export type AgentCountResponse = {
  count: number;
};
