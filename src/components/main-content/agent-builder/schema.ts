import { z } from "zod";

export const agentBuilderSchema = z.object({
  // Profile
  agentName: z.string().min(2, "Agent name is required"),
  brandName: z.string().min(2, "Brand name is required"),
  category: z.string().min(1, "Category is required"),

  // Integrations
  waAuthToken: z.string().min(1, "WA Auth Token is required"),
  wabaPhoneNumberId: z.string().min(1, "Phone Number ID is required"),
  wabaId: z.string().min(1, "WABA ID is required"),
  waLinkUrl: z.url(),
});

export type AgentBuilderFormValues = z.infer<typeof agentBuilderSchema>;

export const defaultValues: AgentBuilderFormValues = {
  agentName: "",
  brandName: "",
  category: "",
  waAuthToken: "",
  wabaPhoneNumberId: "",
  wabaId: "",
  waLinkUrl: "",
};
