import axiosInstance from "@/lib/axiosInstance";
import type { WhatsAppResponse } from "@/types/integrations";

export async function getWhatsAppList(): Promise<WhatsAppResponse[]> {
  const { data } = await axiosInstance.get<WhatsAppResponse[]>(
    `/integrations/whatsapp`
  );
  return data;
}
