import axiosInstance from "@/lib/axiosInstance";
import type { SendTemplate, TemplatesResponse } from "@/types/templates";

export async function listTemplates(): Promise<TemplatesResponse[]> {
  const { data } = await axiosInstance.get<TemplatesResponse[]>(`/templates`);
  return data;
}

export async function sendTemplate(
  values: SendTemplate
): Promise<{ success: string }> {
  const { data } = await axiosInstance.post<{ success: string }>(
    `/templates/send`,
    values
  );

  return data;
}
