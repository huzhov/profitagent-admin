import type { Message } from "@/types";
import { apiFetch } from "@/lib/http";

export type ConversationSummary = {
  id: string;
  client_id?: string;
  created_at: string; // ISO
};

export type FetchMessagesParams = {
  conversationId?: string;
  delayMs?: number;
};

export async function fetchMessages(
  params: FetchMessagesParams = {}
): Promise<Message[]> {
  const { conversationId, delayMs = 200 } = params;
  // Simulate network latency
  if (delayMs > 0) {
    await new Promise((r) => setTimeout(r, delayMs));
  }
  const res = await apiFetch("/mock/messagesByConversation.json", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Failed to fetch messages map: ${res.status}`);
  const map = (await res.json()) as Record<string, Message[]>;
  if (conversationId) return map[conversationId] ?? [];
  // Flatten when no conversationId provided
  return Object.values(map).flat();
}

export async function fetchConversations(
  delayMs = 150,
  clientId?: string
): Promise<ConversationSummary[]> {
  if (delayMs > 0) {
    await new Promise((r) => setTimeout(r, delayMs));
  }
  const res = await apiFetch("/mock/conversations.json", { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch conversations: ${res.status}`);
  let list: ConversationSummary[] = await res.json();
  if (clientId) list = list.filter((c) => c.client_id === clientId);
  // Sort by created_at desc
  return list.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export async function fetchMessagesByConversation(
  delayMs = 200
): Promise<Record<string, Message[]>> {
  if (delayMs > 0) {
    await new Promise((r) => setTimeout(r, delayMs));
  }
  const res = await apiFetch("/mock/messagesByConversation.json", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Failed to fetch messages map: ${res.status}`);
  return (await res.json()) as Record<string, Message[]>;
}

export async function fetchConversationMessages(
  conversationId: string,
  delayMs = 180
): Promise<Message[]> {
  if (delayMs > 0) await new Promise((r) => setTimeout(r, delayMs));
  const res = await apiFetch("/mock/messagesByConversation.json", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Failed to fetch messages map: ${res.status}`);
  const map = (await res.json()) as Record<string, Message[]>;
  return map[conversationId] ?? [];
}
