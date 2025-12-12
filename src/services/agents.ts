import axiosInstance from "@/lib/axiosInstance";
import type { AgentFormValues } from "@/components/agent-builder/schema";
import type {
  AgentCountResponse,
  AgentListResponse,
  AgentResponse,
} from "@/types/agents";

const buildAgentPayload = (values: Partial<AgentFormValues>) => ({
  agentName: values.agentName,
  integrationId: values.whatsappIntegrationId,
  systemPrompt: values.systemPrompt,
  description: values.description,
  objective: values.objective,
  toneOfVoice: values.toneOfVoice,
  aiGuardrails: [],
  faqsBestAnswers: values.faqsBestAnswers || "",
  productPlans: values.productPlans || "",
  creativity: values.creativity,
  catalogS3Key: values.catalogS3Key,
  catalogName: values.catalogName,
  questionSets: values.questionSets || "",
});

export async function getAgentList(): Promise<AgentListResponse[]> {
  const { data } = await axiosInstance.get<AgentListResponse[]>(`/agents/list`);
  return data;
}

export async function getAgentCount(): Promise<AgentCountResponse> {
  const { data } = await axiosInstance.get<AgentCountResponse>(`/agents/count`);
  return data;
}

export async function getAgent(id: string): Promise<AgentResponse> {
  const { data } = await axiosInstance.get<AgentResponse>(`/agents/${id}`);
  return data;
}

export async function createAgent(
  values: AgentFormValues
): Promise<AgentResponse> {
  const payload = buildAgentPayload(values);
  const { data } = await axiosInstance.post<AgentResponse>(`/agents`, payload);
  return data;
}

export async function updateAgent(
  id: string,
  values: Partial<AgentFormValues>
): Promise<AgentResponse> {
  const payload = buildAgentPayload(values);
  const { data } = await axiosInstance.patch<AgentResponse>(
    `/agents/${id}`,
    payload
  );
  return data;
}

export async function toggleAgentStatus(id: string): Promise<void> {
  const { data } = await axiosInstance.patch<void>(`/agents/${id}/toggle`);
  return data;
}

export async function checkIfAgentExists(
  name: string
): Promise<{ exists: boolean }> {
  const { data } = await axiosInstance.get<{ exists: boolean }>(
    `/agents/exists`,
    {
      params: { name },
    }
  );
  return data;
}
