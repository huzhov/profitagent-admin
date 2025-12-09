import {
  MessageDirection,
  type Conversation,
  type GroupedMessages,
} from "@/types";
import { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { apiJson } from "@/lib/http";
import { PageHeader } from "@/components/ui/page-header";
import { Spinner } from "../ui/spinner";
import { useBusiness } from "@/context/AppContext";
import BusinessInfoCard from "@/components/common/BusinessInfoCard";

export default function Messages() {
  const [conversationId, setConversationId] = useState<string>("");
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [groupedMessages, setGroupedMessages] = useState<GroupedMessages>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { business } = useBusiness();

  useEffect(() => {
    if (business) {
      let alive = true;
      (async () => {
        try {
          setLoading(true);
          const convs = await apiJson<Conversation[]>(
            `${import.meta.env.VITE_BACKEND_URL}/conversations`
          );
          if (!alive) return;
          setConversations(convs);
          // default to most recent conversation
          if (convs.length && !conversationId) {
            const first = convs[0].id;
            setConversationId(first);
            const msgs = await apiJson<GroupedMessages>(
              `${import.meta.env.VITE_BACKEND_URL}/messages?conversationId=${first}`
            );
            if (!alive) return;
            setGroupedMessages(msgs);
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
    }
  }, []);

  // Fetch messages when conversation changes (from dropdown)
  useEffect(() => {
    if (business) {
      let alive = true;
      (async () => {
        if (!conversationId) return;
        try {
          setLoading(true);
          const msgs = await apiJson<GroupedMessages>(
            `${import.meta.env.VITE_BACKEND_URL}/messages?conversationId=${conversationId}`
          );
          if (!alive) return;
          setGroupedMessages(msgs);
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
    }
  }, [conversationId]);

  return (
    <div className="mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <PageHeader
          title="Messages"
          description="Message management coming soon..."
          showBorder={false}
          showButton={false}
        />
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-muted-foreground pl-1">
            Conversation
          </label>
          <Select
            value={conversationId}
            onValueChange={setConversationId}
            disabled={conversations.length === 0}
          >
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

      <div className="flex-1 overflow-y-auto rounded-lg border bg-background p-4 space-y-8 scrollbar-thin h-[calc(100vh-16rem)]">
        {!business ? (
          <BusinessInfoCard type="Messages" />
        ) : (
          <>
            {loading && (
              <div className="flex items-center justify-center h-full">
                <Spinner size="lg" />
              </div>
            )}
            {error && (
              <div className="text-center text-sm text-destructive py-10">
                {error}
              </div>
            )}
            {!loading && Object.keys(groupedMessages).length === 0 && (
              <div className="text-center text-sm text-muted-foreground flex items-center justify-center h-full">
                No messages.
              </div>
            )}
            {Object.values(groupedMessages).map((group) => (
              <div key={group.dateKey} className="space-y-4">
                <div className="flex justify-center">
                  <span className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground font-medium">
                    {group.formattedDate}
                  </span>
                </div>
                <div className="space-y-2">
                  {group.messages.map((m, i) => {
                    const prev = group.messages[i - 1];
                    const isFirstOfCluster =
                      !prev ||
                      prev.direction !== m.direction ||
                      new Date(m.time).getTime() -
                        new Date(prev.time).getTime() >
                        1000 * 60 * 10;
                    const isOutgoing = m.direction === MessageDirection.Out;
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
                            {m.time}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
