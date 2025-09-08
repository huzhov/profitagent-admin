export type Message = {
  id: string;
  conversationId: string;
  direction: "in" | "out";
  content: string;
  sentAt: string; // ISO timestamp
};
