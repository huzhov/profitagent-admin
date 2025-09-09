import { z } from "zod";
import { BusinessVertical } from "./types";

export const agentBuilderSchema = z.object({
  // Profile
  agentName: z.string().min(2, "Agent name is required"),
  // category: z.enum(BusinessVertical),

  // Integrations
  waAuthToken: z.string().min(1, "WA Auth Token is required"),
  wabaPhoneNumberId: z.string().min(1, "Phone Number ID is required"),
  wabaId: z.string().min(1, "WABA ID is required"),
  waDisplayPhoneNumber: z
    .string()
    .min(1, "WA Display Phone Number is required"),

  // Config
  systemPromptCustomisation: z.string().max(2000),
  toneOfVoice: z.string(),
  aiGuardrails: z.string(),
  faqsBestAnswers: z.string().max(4000),
  productPlans: z.string().max(4000),
});

export type AgentBuilderFormValues = z.infer<typeof agentBuilderSchema>;

export const defaultValues: Omit<AgentBuilderFormValues, "category"> & {
  category: BusinessVertical | undefined;
} = {
  agentName: "",
  category: undefined,
  waAuthToken: "",
  wabaPhoneNumberId: "",
  wabaId: "",
  waDisplayPhoneNumber: "",
  systemPromptCustomisation: "",
  toneOfVoice: "professional",
  aiGuardrails: "",
  faqsBestAnswers: "",
  productPlans: "",
};
