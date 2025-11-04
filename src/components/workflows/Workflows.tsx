import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { Plus, EllipsisVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

interface Workflow {
  id: number;
  name: string;
  assignedAgents: string[];
  status: "Active" | "Draft";
  lastUpdated: string;
}

export default function Workflows() {
  const [workflows] = useState<Workflow[]>([
    {
      id: 1,
      name: "Lead Qualification Flow",
      assignedAgents: ["Sales Agent", "Support Agent"],
      status: "Active",
      lastUpdated: "2 hours ago",
    },
    {
      id: 2,
      name: "Product Recommendation",
      assignedAgents: ["Sales Agent"],
      status: "Active",
      lastUpdated: "1 day ago",
    },
    {
      id: 3,
      name: "Customer Onboarding",
      assignedAgents: ["Support Agent"],
      status: "Draft",
      lastUpdated: "3 days ago",
    },
  ]);

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <PageHeader
        title="Workflows"
        description="Define and visualize structured workflows for your AI agents"
        buttonLabel="New Workflow"
        buttonIcon={Plus}
        onButtonClick={() => console.log("Create new workflow")}
      />

      {/* Workflows Table */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Name</TableHead>
              <TableHead>Assigned Agent(s)</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
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
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {workflow.assignedAgents.map((agent, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="px-2 py-1 bg-blue-50 text-blue-700 border-blue-100"
                      >
                        {agent}
                      </Badge>
                    ))}
                  </div>
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
                  {workflow.lastUpdated}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 p-0"
                      >
                        <EllipsisVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                      <DropdownMenuItem>View Analytics</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
