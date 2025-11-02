export enum MessageDirection {
  In = "in",
  Out = "out",
}

export type Message = {
  id: string;
  direction: MessageDirection;
  content: string;
  isRead: boolean;
  time: string; // ISO timestamp
};

type DateKey = string;

export type GroupedMessages = {
  [key: DateKey]: {
    dateKey: DateKey;
    formattedDate: string;
    messages: Message[];
  };
};

export type Conversation = {
  id: string;
  isResolved: boolean;
  createdAt: string;
};
