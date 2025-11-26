import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { useNavigate } from "@tanstack/react-router";
import StatsCards from "@/components/common/StatsCards";
import { useQuery } from "@tanstack/react-query";
import { getAgentList } from "@/services/agents";
import { useBusiness } from "@/context/AppContext";
import { Plus, Bot, MessageSquare, TrendingUp, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "../ui/skeleton";

export default function Home() {
  const navigate = useNavigate();
  const { business } = useBusiness();

  const { data, isLoading } = useQuery({
    queryKey: ["agentsList"],
    queryFn: async () => {
      const data = await getAgentList();
      return data;
    },
    enabled: business !== null,
  });

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <PageHeader
        title="Welcome to ProfitAgent"
        description="Create and manage AI agents that drive sales and engagement"
        buttonLabel="Create Agent"
        buttonIcon={Plus}
        onButtonClick={() => navigate({ to: "/agents/create" })}
      />

      {/* Stats Grid */}
      <StatsCards totalAgent={data?.length ?? 0} />

      {/* Recent Agents and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 shadow-none">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Agents</CardTitle>
              <CardDescription>
                Your most recently active AI agents
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="shadow-none cursor-pointer"
              onClick={() => navigate({ to: "/agents" })}
            >
              View All
            </Button>
          </CardHeader>
          <CardContent className="items-center justify-center">
            <div className="space-y-4">
              {isLoading ? (
                [1, 2, 3].map((d) => (
                  <div
                    className="flex items-center justify-between p-3 border rounded-lg"
                    key={d}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                        <Skeleton className="w-5 h-5" />
                      </div>
                      <div>
                        <Skeleton className="w-15 h-6" />
                        <Skeleton className="w-25 h-4 mt-1" />
                      </div>
                    </div>
                    <div className="text-right">
                      <Skeleton className="w-15 h-6" />
                    </div>
                  </div>
                ))
              ) : data ? (
                data?.slice(0, 3)?.map((agent, index) => (
                  <div
                    className="flex items-center justify-between p-3 border rounded-lg"
                    key={index}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                        <Bot className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium">{agent.name}</p>
                        <p className="text-sm text-muted-foreground">
                          0 conversations
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge>
                        {agent.status === "disabled" ? "Paused" : "Active"}
                      </Badge>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center">
                  <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                    <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4">
                      <Bot className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <h3 className="font-medium mb-2">Create New Agent</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Set up a new AI agent to handle customer interactions and
                      drive conversions
                    </p>
                    <Button
                      data-slot="button"
                      onClick={() => navigate({ to: "/agents/create" })}
                      className="cursor-pointer"
                    >
                      Get Started
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start cursor-pointer shadow-none"
              onClick={() => navigate({ to: "/agents/create" })}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create New Agent
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start cursor-pointer shadow-none"
              onClick={() => navigate({ to: "/messages" })}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              View Messages
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start cursor-pointer shadow-none"
              onClick={() => navigate({ to: "/intelligence" })}
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Analytics Dashboard
            </Button>
            {/* <Button
              variant="outline"
              className="w-full justify-start cursor-pointer shadow-none"
            >
              <Users className="w-4 h-4 mr-2" />
              Browse Templates
            </Button> */}
          </CardContent>
        </Card>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-none">
          <CardHeader>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-2">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
            <CardTitle>Multi-Channel</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Deploy your agents across WhatsApp, websites, Slack, and more
              communication channels.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardHeader>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mb-2">
              <Zap className="w-6 h-6 text-green-600" />
            </div>
            <CardTitle>Smart Automation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Automate customer support, lead qualification, and sales processes
              with intelligent AI.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardHeader>
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mb-2">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <CardTitle>Boost Conversions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Increase sales with personalised recommendations, dynamic pricing,
              and targeted offers.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
