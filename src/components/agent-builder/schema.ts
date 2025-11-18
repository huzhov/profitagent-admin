import { z } from "zod";

export const agentBuilderSchema = z.object({
  // Profile
  agentName: z.string().min(2, "Agent name is required"),

  // Integrations
  integrationId: z.uuid("Integration is required"),

  // Config
  systemPromptCustomisation: z.string().max(2000),
  toneOfVoice: z.string(),
  aiGuardrails: z.array(z.string()),
  faqsBestAnswers: z.string().max(4000),
  productPlans: z.string().max(4000),
});

export type AgentBuilderFormValues = z.infer<typeof agentBuilderSchema>;

export const defaultValues: AgentBuilderFormValues = {
  agentName: "",
  integrationId: "",
  systemPromptCustomisation: "",
  toneOfVoice: "professional",
  aiGuardrails: [],
  faqsBestAnswers: "",
  productPlans: "",
};

export const agentSchema = z.object({
  // Basic Info
  agentName: z.string().min(1, "Agent name is required"),
  description: z.string().min(1, "Description is required"),
  objective: z.string().min(1, "Objective is required"),
  brandName: z.string().optional(),
  industry: z.string().optional(),
  toneOfVoice: z.string().default("friendly"),
  language: z.string().default("en"),
  creativity: z.number().default(0.7),
  systemPrompt: z.string().min(1, "System Prompt is required"),
  contextInfo: z.string().optional(),
  productPlans: z.string().optional(),
  highTouch: z.string().optional(),
  audience: z.string().optional(),
  // ID
  integrationId: z.string().min(1, "WhatsApp is Required"),
  businessId: z.string(),
  // Agent Type
  agentType: z.string(),

  // Product Catalogue
  catalogS3Key: z.string().optional(),
  catalogName: z.string().optional(),

  // Document Library (Lee’s categories)
  productInfoDocs: z.array(z.instanceof(File)).optional(),
  processWorkflowDocs: z.array(z.instanceof(File)).optional(),
  complianceDocs: z.array(z.instanceof(File)).optional(),
  customerEducationDocs: z.array(z.instanceof(File)).optional(),
  salesMarketingDocs: z.array(z.instanceof(File)).optional(),
  dataToolsDocs: z.array(z.instanceof(File)).optional(),

  // Guardrails
  restrictedTopics: z.string().optional(),
  customProfanityWords: z.string().optional(),
  piiHandling: z.boolean().default(true),
  escalationKeywords: z.string().optional(),
  brandVoiceRules: z.string().optional(),

  // Messaging Controls
  followUpDelay: z.number().default(24),
  maxFollowUps: z.number().default(3),
  quietHoursStart: z.string().default("22:00"),
  quietHoursEnd: z.string().default("08:00"),
  dailyMessageLimit: z.number().default(10),
  monthlyMessageLimit: z.number().default(100),

  // HITL Handover
  sentimentThreshold: z.number().default(30),
  repeatedQuestionsCount: z.number().default(3),
  hitlKeywords: z.string().optional(),
  handoverMessage: z
    .string()
    .default("Let me connect you with a team member who can help you better."),

  // WhatsApp Components
  quickRepliesEnabled: z.boolean().default(true),
  ctaButtonsEnabled: z.boolean().default(true),
  listMessagesEnabled: z.boolean().default(true),

  // Scheduling
  schedulingProvider: z.string().default("calendly"),
  calendlyUrl: z.string().optional(),

  // Question Sets
  questionSets: z.array(z.instanceof(File)).optional(),
  questionSetJson: z.string().optional(),

  // Product Recommendations
  maxRecommendations: z.number().default(3),
  recommendationStrategy: z.string().default("popularity"),
  includeImages: z.boolean().default(true),

  // Natural Conversation
  oneQuestionAtATime: z.boolean().default(true),
  responsePacing: z.number().default(1500),
  simulateTyping: z.boolean().default(true),
});

export type AgentFormValues = z.infer<typeof agentSchema>;

// ensure default values use the same type:
export const defaultAgentValues: AgentFormValues = {
  agentName: "",
  description: "",
  objective: "",
  brandName: "",
  industry: "",
  toneOfVoice: "friendly",
  language: "en",
  creativity: 0.7,
  systemPrompt: "",
  contextInfo: "",
  productPlans: "",
  highTouch: "",
  audience: "",
  integrationId: "",
  businessId: "",
  agentType: "",
  catalogS3Key: "",
  catalogName: "",

  productInfoDocs: [],
  processWorkflowDocs: [],
  complianceDocs: [],
  customerEducationDocs: [],
  salesMarketingDocs: [],
  dataToolsDocs: [],

  restrictedTopics: "",
  customProfanityWords: "",
  piiHandling: true,
  escalationKeywords: "",
  brandVoiceRules: "",

  followUpDelay: 24,
  maxFollowUps: 3,
  quietHoursStart: "22:00",
  quietHoursEnd: "08:00",
  dailyMessageLimit: 10,
  monthlyMessageLimit: 100,

  sentimentThreshold: 30,
  repeatedQuestionsCount: 3,
  hitlKeywords: "",
  handoverMessage:
    "Let me connect you with a team member who can help you better.",

  quickRepliesEnabled: true,
  ctaButtonsEnabled: true,
  listMessagesEnabled: true,

  schedulingProvider: "calendly",
  calendlyUrl: "",

  questionSets: [],
  questionSetJson: "",

  maxRecommendations: 3,
  recommendationStrategy: "popularity",
  includeImages: true,

  oneQuestionAtATime: true,
  responsePacing: 1500,
  simulateTyping: true,
};
