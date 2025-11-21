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
  const payload: Record<string, any> = {
    agentName: values?.agentName,
    integrationId: values?.integrationId,
    businessId: values?.businessId,
    systemPrompt: values?.systemPrompt,
    description: values?.description,
    objective: values?.objective,
    toneOfVoice: values?.toneOfVoice,
    faqsBestAnswers: values?.faqsBestAnswers,
    productPlans: values?.productPlans,
    creativity: values?.creativity,
  };

  // Only include catalog fields if BOTH have non-empty values
  if (
    values?.catalogS3Key &&
    values?.catalogS3Key.trim() !== "" &&
    values?.catalogName &&
    values?.catalogName.trim() !== ""
  ) {
    payload.catalogS3Key = values.catalogS3Key;
    payload.catalogName = values.catalogName;
  }

  const { data } = await axiosInstance.post<AgentResponse>(`/agents`, payload);
  return data;
}
