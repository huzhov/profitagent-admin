import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
import { ArrowLeft, Bot, Settings } from "lucide-react";
import { useNavigate, useParams } from "@tanstack/react-router";
import { getAgent } from "@/services/agents";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Label } from "../ui/label";
// import AgentToggleButton from "./AgentToggleButton";

export default function AgentView() {
  const navigate = useNavigate();
  const { id } = useParams({ from: "/_authenticated/agents/$id/view" });

  const {
    data: agentData,
    // refetch: refetchAgent,
    // isRefetching: isAgentDataRefetching,
  } = useSuspenseQuery({
    queryKey: ["agents", id],
    queryFn: async () => getAgent(id),
  });

  // Mock data - replace with actual data fetching
  // const agent = {
  //   id: id,
  //   name: "SalesBot Pro",
  //   description: "Advanced sales agent for lead qualification and conversion",
  //   status: "Active",
  //   conversations: 1247,
  //   conversionRate: "28.5%",
  //   revenueGenerated: "$15,420",
  //   satisfaction: "94%",
  // };

  // const workflows = [
  //   {
  //     id: 1,
  //     name: "Lead Qualification Flow",
  //     description: "Qualifies leads based on budget and needs",
  //     status: "Active",
  //     steps: 8,
  //     executions: 342,
  //     successRate: "87.5%",
  //     lastUpdated: "2 hours ago",
  //   },
  //   {
  //     id: 2,
  //     name: "Product Recommendation",
  //     description: "Recommends products based on customer preferences",
  //     status: "Active",
  //     steps: 6,
  //     executions: 256,
  //     successRate: "92.3%",
  //     lastUpdated: "1 day ago",
  //   },
  //   {
  //     id: 3,
  //     name: "Objection Handling",
  //     description: "Handles common sales objections",
  //     status: "Draft",
  //     steps: 5,
  //     executions: 0,
  //     successRate: "-",
  //     lastUpdated: "3 days ago",
  //   },
  // ];

  return (
    <div className="h-[calc(100vh-145px)]">
      {/* Header Section */}
      <div className=" border-b border-gray-200">
        <div className="px-6 py-4">
          {/* Top Row with Back Button and Actions */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate({ to: "/agents" })}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>

            <div className="flex-1">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-blue-100 dark:bg-blue-900/20 text-blue-700">
                  <Bot className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-3">
                  <h1 className="text-gray-900">{agentData.name}</h1>
                  <Badge
                    className={`text-xs border-transparent ${
                      agentData.status === "enabled"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                    }`}
                  >
                    {agentData.status === "enabled" ? "Active" : "Paused"}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* <Button
                variant="outline"
                size="sm"
                onClick={() => navigate({ to: `/agents/${id}/preview` })}
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button> 
               <Button
                variant="outline"
                size="sm"
                onClick={() => navigate({ to: `/agents/${id}/edit` })}
              >
                <Settings className="w-4 h-4 mr-2" />
                Configure
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Ellipsis className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuItem>Export</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu> */}
              {/* <AgentToggleButton
                refetch={refetchAgent}
                isRefetching={isAgentDataRefetching}
                agent={agentData}
              /> */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate({ to: `/agents/${id}/edit` })}
              >
                <Settings className="w-4 h-4 mr-2" />
                Configure
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 flex overflow-hidden h-full">
        <div className="w-64 xl:w-80 flex-shrink-0 border-r border-border px-6 py-6 overflow-auto ">
          <div className="space-y-6">
            <div>
              <Label className="items-center gap-2 text-sm leading-none font-medium select-none text-muted-foreground mb-2 block">
                Description
              </Label>
              <p className="text-sm text-gray-900">{agentData.description}</p>
            </div>
            <div>
              <Label className="items-center gap-2 text-sm leading-none font-medium select-none text-muted-foreground mb-2 block">
                Objective
              </Label>
              <p className="text-sm text-gray-900">{agentData.objective}</p>
            </div>
            <div>
              <Label className="items-center gap-2 text-sm leading-none font-medium select-none text-muted-foreground mb-2 block">
                Tone of Voice
              </Label>
              <p className="text-sm text-gray-900">{agentData.tone}</p>
            </div>
            <div>
              <Label className="items-center gap-2 text-sm leading-none font-medium select-none text-muted-foreground mb-2 block">
                Language
              </Label>
              <p className="text-sm text-gray-900">English</p>
            </div>
            <div>
              <Label className="items-center gap-2 text-sm leading-none font-medium select-none text-muted-foreground mb-2 block">
                Active Channels
              </Label>
              <div className="flex flex-wrap gap-2">
                <Badge
                  data-slot="badge"
                  className="inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800 border-blue-200"
                >
                  WhatsApp
                </Badge>
              </div>
            </div>
            <div>
              <Label
                data-slot="label"
                className="items-center gap-2 text-sm leading-none font-medium select-none text-muted-foreground mb-2 block"
              >
                System Prompt
              </Label>
              <p className="text-sm text-gray-900 line-clamp-3">
                {agentData.systemPrompt}
              </p>
            </div>
            <div className="pt-2">
              <Button
                className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium h-8 rounded-md w-full"
                variant="outline"
                onClick={() => navigate({ to: `/agents/${id}/edit` })}
              >
                <Settings className="w-4 h-4 mr-2" />
                Edit Configuration
              </Button>
            </div>
          </div>
        </div>
        <div className="flex-1 px-6 py-6 overflow-auto">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-muted-foreground mb-1">Tests</p>
              <p className="text-2xl">0</p>
            </div>
            <div className="rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-muted-foreground mb-1">Visits</p>
              <p className="text-2xl">0</p>
            </div>
            <div className="rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-muted-foreground mb-1">Engagements</p>
              <p className="text-2xl">0</p>
            </div>
            <div className="rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-muted-foreground mb-1">Clicks</p>
              <p className="text-2xl">0</p>
            </div>
          </div>
        </div>
      </div>

      {/* Workflows Section */}
      {/* <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-gray-900 flex items-center gap-2">
              <Workflow className="w-5 h-5" />
              Workflows
            </h2>
            <p className="text-gray-600">
              Manage workflows that define this agent's behavior and actions
            </p>
          </div>
          <Button>
            <Plus className="w-4 h-4" />
            New Workflow
          </Button>
        </div> */}

      {/* Workflows Table */}
      {/* <div className=" rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="text-foreground">Name</TableHead>
                <TableHead className="text-foreground">Description</TableHead>
                <TableHead className="text-foreground">Status</TableHead>
                <TableHead className="text-foreground">Steps</TableHead>
                <TableHead className="text-foreground">Executions</TableHead>
                <TableHead className="text-foreground">Success Rate</TableHead>
                <TableHead className="text-foreground">Last Updated</TableHead>
                <TableHead className="text-foreground w-[80px]">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {workflows.map((workflow) => (
                <TableRow
                  key={workflow.id}
                  className="group hover:bg-gray-50 transition-colors"
                >
                  <TableCell>
                    <button className="text-gray-900 hover:text-blue-600 transition-colors">
                      {workflow.name}
                    </button>
                  </TableCell>
                  <TableCell className="text-gray-600 max-w-xs truncate">
                    {workflow.description}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        workflow.status === "Active"
                          ? "bg-green-100 text-green-700 border-green-200"
                          : "bg-gray-100 text-gray-700 border-gray-200"
                      }
                    >
                      {workflow.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {workflow.steps}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {workflow.executions}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span
                        className={
                          workflow.successRate === "-"
                            ? "text-yellow-600"
                            : "text-green-600"
                        }
                      >
                        {workflow.successRate}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {workflow.lastUpdated}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Ellipsis className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div> */}
      {/* </div> */}
    </div>
  );
}
