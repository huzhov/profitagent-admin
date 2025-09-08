import type { Message } from "@/types";
import { useEffect, useMemo, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { fetchConversations, fetchConversationMessages } from "@/lib/mockHttp";

// Simple date formatter helpers
const formatDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};

const formatTime = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Data fetched via mock HTTP endpoints

// Group messages by day
const groupByDate = (messages: Message[]) => {
  const map: Record<string, Message[]> = {};
  messages.forEach((m) => {
    const key = new Date(m.sentAt).toDateString();
    map[key] = map[key] || [];
    map[key].push(m);
  });
  return Object.entries(map)
    .sort(
      (a, b) =>
        new Date(a[1][0].sentAt).getTime() - new Date(b[1][0].sentAt).getTime()
    )
    .map(([dateKey, msgs]) => ({
      dateKey,
      label: formatDate(msgs[0].sentAt),
      messages: msgs.sort(
        (a, b) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime()
      ),
    }));
};

export default function Messages() {
  const [conversationId, setConversationId] = useState<string>("");
  const [conversations, setConversations] = useState<
    { id: string; created_at: string }[]
  >([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const clientId = "client-1"; // TODO: replace with real client id from context/auth

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const convs = await fetchConversations(150, clientId);
        if (!alive) return;
        setConversations(convs);
        // default to most recent conversation
        if (convs.length && !conversationId) {
          const first = convs[0]?.id;
          setConversationId(first);
          const msgs = await fetchConversationMessages(first);
          if (!alive) return;
          setMessages(msgs);
        }
      } catch (e: any) {
        if (!alive) return;
        setError(e?.message ?? "Failed to load data");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  // Fetch messages when conversation changes (from dropdown)
  useEffect(() => {
    let alive = true;
    (async () => {
      if (!conversationId) return;
      try {
        setLoading(true);
        const msgs = await fetchConversationMessages(conversationId);
        if (!alive) return;
        setMessages(msgs);
      } catch (e: any) {
        if (!alive) return;
        setError(e?.message ?? "Failed to load messages");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [conversationId]);

  const grouped = useMemo(() => groupByDate(messages), [messages]);

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-8rem)]">
      <div className="pb-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-card-foreground">Messages</h2>
          <p className="text-muted-foreground">WhatsApp-like chat preview</p>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-muted-foreground pl-1">
            Conversation
          </label>
          <Select value={conversationId} onValueChange={setConversationId}>
            <SelectTrigger className="min-w-[200px]">
              <SelectValue placeholder="Select conversation" />
            </SelectTrigger>
            <SelectContent>
              {conversations.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.id}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto rounded-lg border bg-background p-4 space-y-8 scrollbar-thin">
        {loading && (
          <div className="text-center text-sm text-muted-foreground py-10">
            Loading…
          </div>
        )}
        {error && (
          <div className="text-center text-sm text-destructive py-10">
            {error}
          </div>
        )}
        {grouped.length === 0 && (
          <div className="text-center text-sm text-muted-foreground py-10">
            No messages.
          </div>
        )}
        {grouped.map((group) => (
          <div key={group.dateKey} className="space-y-4">
            <div className="flex justify-center">
              <span className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground font-medium">
                {group.label}
              </span>
            </div>
            <div className="space-y-2">
              {group.messages.map((m, i) => {
                const prev = group.messages[i - 1];
                const isFirstOfCluster =
                  !prev ||
                  prev.direction !== m.direction ||
                  new Date(m.sentAt).getTime() -
                    new Date(prev.sentAt).getTime() >
                    1000 * 60 * 10;
                const isOutgoing = m.direction === "out";
                return (
                  <div
                    key={m.id}
                    className={`flex w-full ${isOutgoing ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg px-3 py-2 text-sm shadow-sm ring-1 ring-border whitespace-pre-line leading-relaxed flex items-end gap-2 ${
                        isOutgoing
                          ? "bg-emerald-500 text-emerald-50 ring-emerald-500/60"
                          : "bg-accent text-accent-foreground ring-accent/40"
                      } ${isFirstOfCluster ? "mt-2" : "mt-0.5"}`}
                    >
                      <span className="min-w-0 break-words flex-1">
                        {m.content}
                      </span>
                      <span
                        className={`text-[10px] font-medium opacity-70 shrink-0 ${
                          isOutgoing
                            ? "text-emerald-100"
                            : "text-muted-foreground"
                        }`}
                      >
                        {formatTime(m.sentAt)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
