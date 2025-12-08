import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import {
  Bot,
  // ChartColumn,
  EllipsisVertical,
  Eye,
  Plus,
  // Play,
  // Pause,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "@tanstack/react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useApp } from "@/context/AppContext";
import { useQuery } from "@tanstack/react-query";
import { getAgentList } from "@/services/agents";
import { Skeleton } from "@/components/ui/skeleton";
import { useBusiness } from "@/context/AppContext";
import StatsCards from "@/components/common/StatsCards";
import BusinessInfoCard from "@/components/common/BusinessInfoCard";
import { getWhatsAppList } from "@/services/integrations";
import { Tooltip, TooltipTrigger } from "../ui/tooltip";
import NoIntegrationInfo from "@/components/common/NoIntegrationInfo";

export default function Agents() {
  const navigate = useNavigate();
  const { agents } = useApp();
  const { business } = useBusiness();

  const { data, isLoading } = useQuery({
    queryKey: ["agentsList"],
    queryFn: async () => {
      const data = await getAgentList();
      return data;
    },
    enabled: !!business,
  });

  const { data: whatsAppIntegrations, isLoading: isWhatsAppLoading } = useQuery(
    {
      queryKey: ["whatsAppList"],
      queryFn: async () => {
        return await getWhatsAppList();
      },
    }
  );

  const isNoWhatsappIntegrationsAvailable = !whatsAppIntegrations?.length;

  // const totalConversations = agents.reduce(
  //   (sum, agent) => sum + agent.conversations,
  //   0
  // );
  // const avgConversion =
  //   agents.reduce((sum, agent) => sum + parseFloat(agent.conversionRate), 0) /
  //   agents.length;

  const getIconColorClass = (color: string) => {
    const colorMap: { [key: string]: string } = {
      blue: "bg-blue-100 text-blue-700",
      green: "bg-green-100 text-green-700",
      purple: "bg-purple-100 text-purple-700",
    };
    return colorMap[color] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="mx-auto p-6 space-y-6">
      {/* Header */}
      <PageHeader
        title="My Agents"
        description="Manage and monitor your AI agents"
        buttonLabel="Create Agent"
        buttonIcon={Plus}
        onButtonClick={() => navigate({ to: "/agents/create" })}
        disabled={
          isNoWhatsappIntegrationsAvailable || isWhatsAppLoading || !business
        }
        tooltip={
          <NoIntegrationInfo
            isNoBusinessAvailable={!business}
            isNoWhatsappIntegrationsAvailable={
              isNoWhatsappIntegrationsAvailable
            }
          />
        }
      />
      {!business ? (
        <div className="flex-1 overflow-y-auto h-[calc(100vh-16rem)]">
          <BusinessInfoCard type="Agents" />
        </div>
      ) : (
        <>
          {/* Stats Grid */}
          <StatsCards type="Agents" />
          {/* Agents Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {isLoading ? (
              <>
                {[1, 2, 3].map((i) => (
                  <Card
                    key={i}
                    data-slot="card"
                    className="shadow-none py-0 bg-card text-card-foreground flex flex-col gap-6 rounded-xl border"
                  >
                    <CardHeader
                      data-slot="card-header"
                      className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6 pb-3"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Skeleton className="w-10 h-10 rounded-lg" />
                          <div className="space-y-2">
                            <Skeleton className="h-5 w-32" />
                            <div className="flex gap-1">
                              <Skeleton className="h-4.5 w-15" />
                              <Skeleton className="h-4.5 w-15" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <Skeleton className="h-5 w-full mt-3" />
                      {/* <Skeleton className="h-4 w-3/4" /> */}
                    </CardHeader>
                    <CardContent
                      data-slot="card-content"
                      className="px-6 [&:last-child]:pb-6 space-y-4"
                    >
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <Skeleton className="h-16 rounded-lg" />
                          <Skeleton className="h-16 rounded-lg" />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <Skeleton className="h-16 rounded-lg" />
                          <Skeleton className="h-16 rounded-lg" />
                        </div>
                      </div>

                      {/* <div className="space-y-1">
                        <Skeleton className="h-3 w-32" />
                        <Skeleton className="h-3 w-28" />
                      </div> */}
                      <div className="flex gap-2 space-y-2 pt-2">
                        <Skeleton className="h-7 w-full" />
                        <Skeleton className="h-7 w-full" />
                        <Skeleton className="h-7 w-20" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </>
            ) : (
              data?.map((agent) => (
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
                          className={`w-10 h-10 rounded-lg flex items-center justify-center dark:bg-blue-900/20 ${getIconColorClass(agents[0].iconColor)}`}
                        >
                          <Bot className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <CardTitle
                              data-slot="card-title"
                              className="text-lg"
                            >
                              {agent.name}
                            </CardTitle>
                            <div className="flex items-center gap-1">
                              {/* {agents[0].workflows > 0 && (
                                <>
                                  <Workflow className="w-4 h-4 text-purple-600" />
                                  <Badge
                                    data-slot="badge"
                                    variant="outline"
                                    className="text-xs bg-purple-50 text-purple-700 border-purple-200"
                                  >
                                    {agents[0].workflows}
                                  </Badge>
                                </>
                              )}
                              {agents[0].tests > 0 && (
                                <>
                                  <FlaskConical className="w-4 h-4 text-blue-600" />
                                  <Badge
                                    data-slot="badge"
                                    variant="outline"
                                    className="text-xs bg-blue-50 text-blue-700 border-blue-200"
                                  >
                                    {agents[0].tests}
                                  </Badge>
                                </>
                              )} */}
                            </div>
                          </div>
                          <div className="flex gap-1">
                            {/* <Badge
                              data-slot="badge"
                              className={`text-xs border-transparent ${
                                agent.status === "Active"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                                  : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                              }`}
                            >
                              {agent.status === "disabled"
                                ? "Paused"
                                : "Active"}
                            </Badge> */}
                            {/* Active Channels */}
                            {agents[0].channels.map((channel, index) => (
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
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <EllipsisVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() =>
                              navigate({ to: `/agents/${agent.id}/edit` })
                            }
                          >
                            Edit Agent
                          </DropdownMenuItem>
                          {/* <DropdownMenuItem
                          // onClick={() => handleCloneAgent(agent.id)}
                          >
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            // onClick={() => handleDeleteAgent(agent.id)}
                          >
                            Delete
                          </DropdownMenuItem> */}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <CardDescription
                      data-slot="card-description"
                      className="text-muted-foreground mt-2 text-md line-clamp-1 h-6"
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
                          <p className="text-sm text-muted-foreground">Tests</p>
                          <p className="font-semibold">0</p>
                        </div>
                        <div className="text-center p-2 bg-accent/50 rounded-lg">
                          <p className="text-sm text-muted-foreground">
                            Visits
                          </p>
                          <p className="font-semibold">0</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="text-center p-2 bg-accent/50 rounded-lg">
                          <p className="text-sm text-muted-foreground">
                            Engagements
                          </p>
                          <p className="font-semibold">0</p>
                        </div>
                        <div className="text-center p-2 bg-accent/50 rounded-lg">
                          <p className="text-sm text-muted-foreground">
                            Clicks
                          </p>
                          <p className="font-semibold">0</p>
                        </div>
                      </div>
                    </div>

                    {/* Metadata */}
                    {/* <div className="text-xs text-muted-foreground space-y-1">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>Created {agents[0].created}</span>
                      </div>
                      <p>Last active: {agents[0].lastActive}</p>
                    </div> */}

                    {/* Actions */}

                    <div className="flex gap-2 space-y-2 pt-2">
                      <Button
                        data-slot="button"
                        size="sm"
                        variant="outline"
                        className="w-full cursor-pointer"
                        onClick={() =>
                          navigate({ to: `/agents/${agent.id}/view` })
                        }
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        View Agent
                      </Button>
                      {/* <div className="w-full"></div>
                      <div className="w-full"> */}
                      {/* <Button
                          data-slot="button"
                          variant="outline"
                          size="sm"
                          className="flex-1 cursor-pointer"
                          onClick={() =>
                            navigate({
                              to: `/agents/${agent.id}/preview` as any,
                            })
                          }
                        >
                          <Play className="w-3 h-3 mr-1" />
                          Preview
                        </Button> */}
                      {/* <Button
                          data-slot="button"
                          variant="outline"
                          size="sm"
                          className="w-full cursor-pointer"
                          onClick={() => navigate({ to: `/intelligence` })}
                        >
                          <ChartColumn className="w-3 h-3 mr-1" />
                          Analytics
                        </Button> */}
                      {/* </div> */}
                      {/* <Button
                        data-slot="button"
                        variant="outline"
                        size="sm"
                        // onClick={() => toggleAgentStatus(agent.id)}
                        className="cursor-pointer"
                      >
                        {agent.status === "Active" ? (
                          <Pause className="w-3 h-3" />
                        ) : (
                          <Play className="w-3 h-3" />
                        )}
                      </Button> */}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}

            {/* Create New Agent Card - Only show when not loading */}
            {!isLoading && (
              <Card
                data-slot="card"
                className="shadow-none h-92 py-0 bg-card text-card-foreground flex flex-col gap-6 rounded-xl border-dashed border-2 hover:border-primary transition-colors cursor-pointer"
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
                    Set up a new AI agent to handle customer interactions and
                    drive conversions
                  </p>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>
                        <Button
                          data-slot="button"
                          onClick={() => navigate({ to: "/agents/create" })}
                          className="cursor-pointer"
                          disabled={
                            isNoWhatsappIntegrationsAvailable ||
                            isWhatsAppLoading
                          }
                        >
                          Get Started
                        </Button>
                      </div>
                    </TooltipTrigger>
                    <NoIntegrationInfo
                      isNoWhatsappIntegrationsAvailable={
                        isNoWhatsappIntegrationsAvailable
                      }
                    />
                  </Tooltip>
                </CardContent>
              </Card>
            )}
          </div>
        </>
      )}
    </div>
  );
}
