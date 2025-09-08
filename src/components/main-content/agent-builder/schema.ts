import { z } from "zod";

export const agentBuilderSchema = z.object({
  // Profile
  brandName: z.string().min(2, "Brand name is required"),
  category: z.string().min(1, "Category is required"),

  // Integrations
  waAuthToken: z.string().min(1, "WA Auth Token is required"),
  wabaPhoneNumberId: z.string().min(1, "Phone Number ID is required"),
  wabaId: z.string().min(1, "WABA ID is required"),
  waLinkUrl: z.url(),

  systemPromptCustomisation: z.string().max(2000),
  toneOfVoice: z.string(),
  aiGuardrails: z.string(),
  faqsBestAnswers: z.string().max(4000),
  productPlans: z.string().max(4000),
});

export type AgentBuilderFormValues = z.infer<typeof agentBuilderSchema>;

export const defaultValues: AgentBuilderFormValues = {
  brandName: "",
  category: "",
  waAuthToken: "",
  wabaPhoneNumberId: "",
  wabaId: "",
  waLinkUrl: "",
  systemPromptCustomisation: "",
  toneOfVoice: "professional",
  aiGuardrails: "",
  faqsBestAnswers: "",
  productPlans: "",
};
