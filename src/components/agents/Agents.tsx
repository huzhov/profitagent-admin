import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import {
  Bot,
  Calendar,
  ChartColumn,
  EllipsisVertical,
  Eye,
  FlaskConical,
  MessageSquare,
  Pause,
  Play,
  Plus,
  TrendingUp,
  Trophy,
  Workflow,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CreateAgentModal } from "./CreateAgentModal";

export default function Agents() {
  const navigate = useNavigate();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
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

  const totalConversations = agents.reduce(
    (sum, agent) => sum + agent.conversations,
    0
  );
  const avgConversion =
    agents.reduce((sum, agent) => sum + parseFloat(agent.conversionRate), 0) /
    agents.length;

  const getIconColorClass = (color: string) => {
    const colorMap: { [key: string]: string } = {
      blue: "bg-blue-100 text-blue-700",
      green: "bg-green-100 text-green-700",
      purple: "bg-purple-100 text-purple-700",
    };
    return colorMap[color] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <PageHeader
        title="My Agents"
        description="Manage and monitor your AI agents"
        buttonLabel="Create Agent"
        buttonIcon={Plus}
        onButtonClick={() => setIsCreateModalOpen(true)}
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="py-0 shadow-none rounded-xl border">
          <CardContent className="[&:last-child]:pb-6 p-4">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-muted-foreground">
                Total Agents
              </span>
            </div>
            <p className="text-2xl font-semibold">{agents.length}</p>
          </CardContent>
        </Card>

        <Card className="py-0 shadow-none rounded-xl border">
          <CardContent className="[&:last-child]:pb-6 p-4">
            <div className="flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-purple-600" />
              <span className="text-sm text-muted-foreground">
                Active Tests
              </span>
            </div>
            <p className="text-2xl font-semibold">
              {agents.reduce((sum, agent) => sum + agent.tests, 0)}
            </p>
          </CardContent>
        </Card>

        <Card className="py-0 shadow-none rounded-xl border">
          <CardContent className="[&:last-child]:pb-6 p-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-green-600" />
              <span className="text-sm text-muted-foreground">
                Conversations
              </span>
            </div>
            <p className="text-2xl font-semibold">
              {totalConversations.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card className="py-0 shadow-none rounded-xl border">
          <CardContent className="[&:last-child]:pb-6 p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-orange-600" />
              <span className="text-sm text-muted-foreground">
                Avg. Conversion
              </span>
            </div>
            <p className="text-2xl font-semibold">
              {avgConversion.toFixed(0)}%
            </p>
          </CardContent>
        </Card>

        <Card className="py-0 shadow-none rounded-xl border">
          <CardContent className="[&:last-child]:pb-6 p-4">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-yellow-600" />
              <span className="text-sm text-muted-foreground">
                Avg. Improvement
              </span>
            </div>
            <p className="text-2xl font-semibold">0%</p>
          </CardContent>
        </Card>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <Card
            key={agent.id}
            data-slot="card"
            className="shadow-none py-0 bg-card text-card-foreground flex flex-col gap-6 rounded-xl border hover:shadow-md transition-shadow"
          >
            <CardHeader
              data-slot="card-header"
              className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6 pb-3"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${getIconColorClass(agent.iconColor)}`}
                  >
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle data-slot="card-title" className="text-lg">
                        {agent.name}
                      </CardTitle>
                      <div className="flex items-center gap-1">
                        {agent.workflows > 0 && (
                          <>
                            <Workflow className="w-4 h-4 text-purple-600" />
                            <Badge
                              data-slot="badge"
                              variant="outline"
                              className="text-xs bg-purple-50 text-purple-700 border-purple-200"
                            >
                              {agent.workflows}
                            </Badge>
                          </>
                        )}
                        {agent.tests > 0 && (
                          <>
                            <FlaskConical className="w-4 h-4 text-blue-600" />
                            <Badge
                              data-slot="badge"
                              variant="outline"
                              className="text-xs bg-blue-50 text-blue-700 border-blue-200"
                            >
                              {agent.tests}
                            </Badge>
                          </>
                        )}
                      </div>
                    </div>
                    <Badge
                      data-slot="badge"
                      className={`text-xs border-transparent ${
                        agent.status === "Active"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                      }`}
                    >
                      {agent.status}
                    </Badge>
                  </div>
                </div>
                <Button
                  data-slot="button"
                  variant="ghost"
                  size="sm"
                  className="cursor-pointer"
                >
                  <EllipsisVertical className="w-4 h-4" />
                </Button>
              </div>
              <CardDescription
                data-slot="card-description"
                className="text-muted-foreground mt-2 text-md"
              >
                {agent.description}
              </CardDescription>
            </CardHeader>
            <CardContent
              data-slot="card-content"
              className="px-6 [&:last-child]:pb-6 space-y-4"
            >
              {/* Metrics Grid */}
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-2 bg-accent/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Conversations
                    </p>
                    <p className="font-semibold">
                      {agent.conversations.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-center p-2 bg-accent/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">Conversion</p>
                    <p className="font-semibold">{agent.conversionRate}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-2 bg-accent/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Revenue Generated
                    </p>
                    <p className="font-semibold">{agent.revenueGenerated}</p>
                  </div>
                  <div className="text-center p-2 bg-accent/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Customer Satisfaction
                    </p>
                    <p className="font-semibold">
                      {agent.customerSatisfaction}
                    </p>
                  </div>
                </div>
              </div>

              {/* Active Channels */}
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  Active Channels
                </p>
                <div className="flex gap-1">
                  {agent.channels.map((channel, index) => (
                    <Badge
                      key={index}
                      data-slot="badge"
                      variant="outline"
                      className="text-xs"
                    >
                      {channel}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Metadata */}
              <div className="text-xs text-muted-foreground space-y-1">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>Created {agent.created}</span>
                </div>
                <p>Last active: {agent.lastActive}</p>
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-2">
                <Button
                  data-slot="button"
                  size="sm"
                  className="w-full cursor-pointer"
                  onClick={() =>
                    navigate({ to: `/agents/${agent.id}/view` as any })
                  }
                >
                  <Eye className="w-3 h-3 mr-1" />
                  View Agent
                </Button>
                <div className="flex gap-2">
                  <Button
                    data-slot="button"
                    variant="outline"
                    size="sm"
                    className="flex-1 cursor-pointer"
                    onClick={() =>
                      navigate({ to: `/agents/${agent.id}/preview` as any })
                    }
                  >
                    <Play className="w-3 h-3 mr-1" />
                    Preview
                  </Button>
                  <Button
                    data-slot="button"
                    variant="outline"
                    size="sm"
                    className="flex-1 cursor-pointer"
                  >
                    <ChartColumn className="w-3 h-3 mr-1" />
                    Analytics
                  </Button>
                  <Button
                    data-slot="button"
                    variant="outline"
                    size="sm"
                    onClick={() => toggleAgentStatus(agent.id)}
                    className="cursor-pointer"
                  >
                    {agent.status === "Active" ? (
                      <Pause className="w-3 h-3" />
                    ) : (
                      <Play className="w-3 h-3" />
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Create New Agent Card */}
        <Card
          data-slot="card"
          className="shadow-none py-0 bg-card text-card-foreground flex flex-col gap-6 rounded-xl border-dashed border-2 hover:border-primary transition-colors cursor-pointer"
        >
          <CardContent
            data-slot="card-content"
            className="[&:last-child]:pb-6 flex flex-col items-center justify-center h-full p-6 text-center"
          >
            <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4">
              <Bot className="w-6 h-6 text-muted-foreground" />
            </div>
            <h3 className="font-medium mb-2">Create New Agent</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Set up a new AI agent to handle customer interactions and drive
              conversions
            </p>
            <Button
              data-slot="button"
              onClick={() => setIsCreateModalOpen(true)}
              className="cursor-pointer"
            >
              Get Started
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Create Agent Modal */}
      <CreateAgentModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        onSelectAgentType={(agentTypeId) => {
          navigate({ to: `/agents/create/${agentTypeId}` as any });
        }}
      />
    </div>
  );
}
