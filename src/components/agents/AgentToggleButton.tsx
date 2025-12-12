import { Loader2, Pause, Play } from "lucide-react";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { toggleAgentStatus } from "@/services/agents";
import { toast } from "sonner";
import type { AgentResponse } from "@/types/agents";

type AgentPlayButtonProps = {
  agent: Partial<AgentResponse>;
  isRefetching: boolean;
  refetch: () => void;
};

export default function AgentToggleButton({
  agent,
  isRefetching,
  refetch,
}: AgentPlayButtonProps) {
  const { mutate: toggleAgentStatusFn, isPending: isPendingToggleAgentStatus } =
    useMutation({
      mutationKey: ["agentToggleStatus", agent.id],
      mutationFn: toggleAgentStatus,
      onSuccess: () => {
        toast.success(
          `${agent.name} is ${agent.status === "enabled" ? "pause" : "active"}`
        );
        refetch();
      },
    });

  return (
    <Button
      data-slot="button"
      variant="outline"
      size="sm"
      className="cursor-pointer"
      onClick={() => toggleAgentStatusFn(agent.id || "")}
      disabled={isPendingToggleAgentStatus || isRefetching}
    >
      {isRefetching || isPendingToggleAgentStatus ? (
        <Loader2 className="w-3 h-3 animate-spin" />
      ) : agent.status === "enabled" ? (
        <Pause className="w-3 h-3" />
      ) : (
        <Play className="w-3 h-3" />
      )}
    </Button>
  );
}
