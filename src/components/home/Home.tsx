import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import {
  Plus,
  Bot,
  MessageSquare,
  TrendingUp,
  DollarSign,
  Zap,
  Users,
} from "lucide-react";
import { useState } from "react";
import { CreateAgentModal } from "@/components/agents/CreateAgentModal";
import { useNavigate } from "@tanstack/react-router";

export default function Home() {
  const navigate = useNavigate();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        title="Welcome to ProfitAgent"
        description="Create and manage AI agents that drive sales and engagement"
        buttonLabel="Create Agent"
        buttonIcon={Plus}
        onButtonClick={() => setIsCreateModalOpen(true)}
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="py-0 shadow-none rounded-xl border">
          <CardContent className="[&:last-child]:pb-6 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Agents</p>
                <p className="text-2xl font-semibold">0</p>
              </div>
              <Bot className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="py-0 shadow-none rounded-xl border">
          <CardContent className="[&:last-child]:pb-6 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Total Conversations
                </p>
                <p className="text-2xl font-semibold">0</p>
              </div>
              <MessageSquare className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="py-0 shadow-none rounded-xl border">
          <CardContent className="[&:last-child]:pb-6 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Conversion Rate</p>
                <p className="text-2xl font-semibold">0%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="py-0 shadow-none rounded-xl border">
          <CardContent className="[&:last-child]:pb-6 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Revenue Generated
                </p>
                <p className="text-2xl font-semibold">$0</p>
              </div>
              <DollarSign className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

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
            >
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium">SalesBot Pro</p>
                    <p className="text-sm text-muted-foreground">
                      1,247 conversations
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge>Active</Badge>
                  <p className="text-xs text-muted-foreground mt-1">
                    2 mins ago
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium">Support Assistant</p>
                    <p className="text-sm text-muted-foreground">
                      892 conversations
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge>Active</Badge>
                  <p className="text-xs text-muted-foreground mt-1">
                    5 mins ago
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium">Lead Qualifier</p>
                    <p className="text-sm text-muted-foreground">
                      634 conversations
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="secondary">Paused</Badge>
                  <p className="text-xs text-muted-foreground mt-1">
                    1 hour ago
                  </p>
                </div>
              </div>
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
              onClick={() => setIsCreateModalOpen(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create New Agent
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start cursor-pointer shadow-none"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              View Messages
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start cursor-pointer shadow-none"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Analytics Dashboard
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start cursor-pointer shadow-none"
            >
              <Users className="w-4 h-4 mr-2" />
              Browse Templates
            </Button>
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
              Increase sales with personalized recommendations, dynamic pricing,
              and targeted offers.
            </p>
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
