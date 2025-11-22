import axiosInstance from "@/lib/axiosInstance";
import type { AgentFormValues } from "@/components/agent-builder/schema";
import type { AgentListResponse, AgentResponse } from "@/types/agents";

export async function getAgentList(): Promise<AgentListResponse[]> {
  const { data } = await axiosInstance.get<AgentListResponse[]>(`/agents/list`);
  return data;
}

export async function getAgent(id: string): Promise<AgentResponse> {
  const { data } = await axiosInstance.get<AgentResponse>(`/agents/${id}`);
  return data;
}

export async function createAgent(
  values: AgentFormValues
): Promise<AgentResponse> {
  const payload = {
    agentName: values.agentName,
    integrationId: values.whatsappIntegrationId,
    systemPrompt: values.systemPrompt,
    description: values.description,
    objective: values.objective,
    toneOfVoice: values.toneOfVoice,
    faqsBestAnswers: values.faqsBestAnswers || "",
    productPlans: values.productPlans || "",
    creativity: values.creativity,
    catalogS3Key: values.catalogS3Key,
    catalogName: values.catalogName,
  };

  const { data } = await axiosInstance.post<AgentResponse>(`/agents`, payload);
  return data;
}
