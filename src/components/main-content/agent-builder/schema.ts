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
