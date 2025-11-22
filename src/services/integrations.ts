import axiosInstance from "@/lib/axiosInstance";
import type {
  WhatsAppResponse,
  CreateWhatsAppResponse,
  CreateWhatsApp,
} from "@/types/integrations";

export async function exchangeWhatsAppToken(values: any): Promise<string> {
  const { data } = await axiosInstance.post<string>(
    `/integrations/whatsapp/token`,
    values
  );

  return data;
}

export async function listWhatsAppIntegrations(): Promise<WhatsAppResponse[]> {
  const { data } = await axiosInstance.get<WhatsAppResponse[]>(
    `/integrations/whatsapp`
  );
  return data;
}

export async function createWhatsAppIntegration(
  values: CreateWhatsApp
): Promise<CreateWhatsAppResponse> {
  const { data } = await axiosInstance.post<CreateWhatsAppResponse>(
    `/integrations/whatsapp`,
    values
  );

  return data;
}

export async function getWhatsAppList(): Promise<WhatsAppResponse[]> {
  return listWhatsAppIntegrations();
}
