import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Agent } from "./types";

interface AppContextType {
  agents: Agent[];
  toggleAgentStatus: (agentId: number) => void;
  handleCloneAgent: (agentId: number) => void;
  handleDeleteAgent: (agentId: number) => void;
  handleSaveAgent: (agentId: number, name: string, description: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [agents, setAgents] = useState([
    {
      id: 1,
      name: "SalesBot Pro",
      description: "Advanced sales agent for lead qualification and conversion",
      status: "Active",
      workflows: 3,
      tests: 0,
      conversations: 0,
      conversionRate: "0%",
      revenueGenerated: "$0",
      customerSatisfaction: "0%",
      channels: ["WhatsApp", "Web"],
      created: "Oct 15, 2024",
      lastActive: "2 minutes ago",
      iconColor: "blue",
    },
    {
      id: 2,
      name: "Support Assistant",
      description: "Customer support automation with intelligent routing",
      status: "Active",
      workflows: 2,
      tests: 0,
      conversations: 0,
      conversionRate: "0%",
      revenueGenerated: "$0",
      customerSatisfaction: "0%",
      channels: ["Slack", "Web"],
      created: "Sep 28, 2024",
      lastActive: "5 minutes ago",
      iconColor: "green",
    },
    {
      id: 3,
      name: "Lead Qualifier",
      description: "Pre-qualifies leads and schedules appointments",
      status: "Paused",
      workflows: 1,
      tests: 0,
      conversations: 0,
      conversionRate: "0%",
      revenueGenerated: "$0",
      customerSatisfaction: "0%",
      channels: ["Web"],
      created: "Sep 10, 2024",
      lastActive: "1 hour ago",
      iconColor: "purple",
    },
  ]);

  const toggleAgentStatus = (agentId: number) => {
    setAgents(
      agents.map((agent) =>
        agent.id === agentId
          ? {
              ...agent,
              status: agent.status === "Active" ? "Paused" : "Active",
            }
          : agent
      )
    );
  };

  const handleCloneAgent = (agentId: number) => {
    const agent = agents.find((agent) => agent.id === agentId);
    if (!agent) return;

    const counter = agents.filter((agent) =>
      agent.name.includes("Copy")
    ).length;

    const cloneAgent = {
      ...agent,
      id: agents[agents.length - 1].id + 1,
      name: agent.name.includes("Copy")
        ? agent.name.replace(/\(Copy.*\)$/, `(Copy - ${counter})`)
        : `${agent?.name} (Copy)`,
    };

    setAgents(agents.concat(cloneAgent));
  };

  const handleDeleteAgent = (agentId: number) => {
    setAgents(agents.filter((agent) => agent.id !== agentId));
  };

  const handleSaveAgent = (
    agentId: number,
    name: string,
    description: string
  ) => {
    setAgents(
      agents.map((agent) =>
        agent.id === agentId
          ? {
              ...agent,
              name,
              description,
            }
          : agent
      )
    );
  };

  return (
    <AppContext.Provider
      value={{
        agents,
        toggleAgentStatus,
        handleCloneAgent,
        handleDeleteAgent,
        handleSaveAgent,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}
