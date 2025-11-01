import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import {
  Bot,
  DollarSign,
  Edit,
  MessageCircle,
  Plus,
  Repeat,
  ShoppingCart,
  Target,
  Trash2,
  TrendingDown,
  TrendingUp,
  TrendingUpIcon,
  Zap,
} from "lucide-react";
import { Badge } from "../ui/badge";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export default function Agents() {
  const navigate = useNavigate();
  const [agents, setAgents] = useState([
    {
      id: 1,
      name: "Black Friday AI Agent v2.1",
      description:
        "Maximizes flash sale conversions with urgency-driven messaging and dynamic pricing alerts",
      status: "Active",
      kpi: "47% conversion lift",
      conversations: 2847,
      revenue: "$127,340",
      lastActive: "2 min ago",
      performance: 94,
      category: "Seasonal Commerce",
      conversionRate: 47,
      createdBy: "System",
      lastUpdated: "2024-01-15",
    },
    {
      id: 2,
      name: "HBO Max Subscription Agent v3.0",
      description:
        "Drives incremental subscriptions through personalized content recommendations and exclusive offers",
      status: "Active",
      kpi: "23% subscription rate",
      conversations: 1923,
      revenue: "$89,230",
      lastActive: "5 min ago",
      performance: 87,
      category: "Media & Entertainment",
      conversionRate: 23,
      createdBy: "System",
      lastUpdated: "2024-01-15",
    },
    {
      id: 3,
      name: "Cart Recovery Pro v1.8",
      description:
        "Recovers abandoned carts with gamified incentives and personalized product bundles",
      status: "Active",
      kpi: "31% recovery rate",
      conversations: 3421,
      revenue: "$156,780",
      lastActive: "1 min ago",
      performance: 91,
      category: "E-commerce Recovery",
      conversionRate: 31,
      createdBy: "System",
      lastUpdated: "2024-01-15",
    },
    {
      id: 4,
      name: "Nike Air Max Launch Agent v1.2",
      description:
        "Drives pre-orders and waitlist signups for exclusive sneaker drops with hype mechanics",
      status: "Testing",
      kpi: "68% pre-order rate",
      conversations: 892,
      revenue: "$43,560",
      lastActive: "12 min ago",
      performance: 89,
      category: "Product Launch",
      conversionRate: 68,
      createdBy: "System",
      lastUpdated: "2024-01-15",
    },
    {
      id: 5,
      name: "Loyalty Rewards Maximizer v2.3",
      description:
        "Increases customer lifetime value through gamified loyalty programs and tier upgrades",
      status: "Active",
      kpi: "42% LTV increase",
      conversations: 1567,
      revenue: "$78,920",
      lastActive: "3 min ago",
      performance: 85,
      category: "Customer Retention",
      conversionRate: 42,
      createdBy: "System",
      lastUpdated: "2024-01-15",
    },
    {
      id: 6,
      name: "Booking.com Upsell Agent v1.5",
      description:
        "Maximizes booking value with room upgrades, add-ons, and experience packages",
      status: "Paused",
      kpi: "29% upsell rate",
      conversations: 743,
      revenue: "$34,210",
      lastActive: "2 hours ago",
      performance: 82,
      category: "Travel & Hospitality",
      conversionRate: 29,
      createdBy: "System",
      lastUpdated: "2024-01-15",
    },
  ]);

  const deleteAgent = (agentId: number) => {
    setAgents(agents.filter((agent) => agent.id !== agentId));
  };

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

  const cloneAgent = (agentId: number) => {
    const agentToClone = agents.find((agent) => agent.id === agentId);
    if (agentToClone) {
      const newAgent = {
        ...agentToClone,
        id: Math.max(...agents.map((a) => a.id)) + 1,
        name: `${agentToClone.name} (Copy)`,
        status: "Draft",
        conversations: 0,
        conversionRate: 0,
        lastUpdated: new Date().toISOString().split("T")[0],
        createdBy: "Current User",
      };
      setAgents([...agents, newAgent]);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-card-foreground">
            Agents Hub
          </h2>
          <p className="text-muted-foreground">
            Manage all your AI agents in one centralized location
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={() => navigate({ to: "/" })}
            className="flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Create New Agent</span>
          </Button>
          <Select defaultValue="all">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Agents</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="paused">Paused</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Agents
                </p>
                <p className="text-2xl font-bold">{agents.length}</p>
              </div>
              <Bot className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Active Agents
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {agents.filter((a) => a.status === "Active").length}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Conversations
                </p>
                <p className="text-2xl font-bold">
                  {agents
                    .reduce((sum, agent) => sum + agent.conversations, 0)
                    .toLocaleString()}
                </p>
              </div>
              <MessageCircle className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Avg Conversion Rate
                </p>
                <p className="text-2xl font-bold text-orange-600">
                  {(
                    agents.reduce(
                      (sum, agent) => sum + agent.conversionRate,
                      0
                    ) / agents.length
                  ).toFixed(1)}
                  %
                </p>
              </div>
              <Target className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <Card key={agent.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{agent.name}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={
                        agent.status === "Active"
                          ? "default"
                          : agent.status === "Draft"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {agent.status}
                    </Badge>
                    <Badge variant="outline">{agent.category}</Badge>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => cloneAgent(agent.id)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteAgent(agent.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Goal/KPI
                </p>
                <p className="text-sm">{agent.kpi}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Description
                </p>
                <p className="text-sm text-muted-foreground">
                  {agent.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Conversations
                  </p>
                  <p className="text-lg font-bold">
                    {agent.conversations.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Conversion Rate
                  </p>
                  <p className="text-lg font-bold text-green-600">
                    {agent.conversionRate}%
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                <span>By {agent.createdBy}</span>
                <span>Updated {agent.lastUpdated}</span>
              </div>

              <div className="flex space-x-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-transparent"
                  onClick={() => toggleAgentStatus(agent.id)}
                >
                  {agent.status === "Active" ? "Pause" : "Activate"}
                </Button>
                <Button size="sm" className="flex-1">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Agent Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue-Optimized Templates</CardTitle>
          <CardDescription>
            Launch high-converting agents with proven commerce frameworks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer border-green-200">
              <div className="text-center space-y-2">
                <TrendingUpIcon className="h-8 w-8 text-green-600 mx-auto" />
                <h4 className="font-semibold">Flash Sale Maximizer</h4>
                <p className="text-xs text-muted-foreground">
                  Drive urgency with dynamic pricing & countdown mechanics
                </p>
                <Button
                  size="sm"
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Launch Agent
                </Button>
              </div>
            </Card>

            <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer border-blue-200">
              <div className="text-center space-y-2">
                <Repeat className="h-8 w-8 text-blue-600 mx-auto" />
                <h4 className="font-semibold">Subscription Converter</h4>
                <p className="text-xs text-muted-foreground">
                  Transform one-time buyers into recurring subscribers
                </p>
                <Button
                  size="sm"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Launch Agent
                </Button>
              </div>
            </Card>

            <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer border-purple-200">
              <div className="text-center space-y-2">
                <ShoppingCart className="h-8 w-8 text-purple-600 mx-auto" />
                <h4 className="font-semibold">Cart Recovery Pro</h4>
                <p className="text-xs text-muted-foreground">
                  Gamified recovery with personalized incentives
                </p>
                <Button
                  size="sm"
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  Launch Agent
                </Button>
              </div>
            </Card>

            <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer border-orange-200">
              <div className="text-center space-y-2">
                <Zap className="h-8 w-8 text-orange-600 mx-auto" />
                <h4 className="font-semibold">Upsell Optimizer</h4>
                <p className="text-xs text-muted-foreground">
                  AI-powered cross-sells & bundle recommendations
                </p>
                <Button
                  size="sm"
                  className="w-full bg-orange-600 hover:bg-orange-700"
                >
                  Launch Agent
                </Button>
              </div>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            <span>Revenue Intelligence</span>
          </CardTitle>
          <CardDescription>
            Real-time revenue optimization insights across all agents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="text-2xl font-bold text-green-600">$847K</div>
              <div className="text-sm text-muted-foreground">
                Revenue This Month
              </div>
              <div className="text-xs text-green-600 flex items-center justify-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +23% vs last month
              </div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-2xl font-bold text-blue-600">34.2%</div>
              <div className="text-sm text-muted-foreground">
                Avg Conversion Rate
              </div>

              <div className="text-xs text-green-600 flex items-center justify-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +4.1% vs last month
              </div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="text-2xl font-bold text-purple-600">1,847</div>
              <div className="text-sm text-muted-foreground">
                Leads Generated
              </div>
              <div className="text-xs text-green-600 flex items-center justify-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +18% vs last month
              </div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
              <div className="text-2xl font-bold text-orange-600">$247K</div>
              <div className="text-sm text-muted-foreground">Cost Savings</div>
              <div className="text-xs text-red-600 flex items-center justify-center mt-1">
                <TrendingDown className="h-3 w-3 mr-1" />
                -6% vs last month
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Agents</CardTitle>
                <CardDescription>
                  Agents driving the most revenue
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Agent Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Conversion Rate</TableHead>
                      <TableHead>Revenue</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">
                        Flash Sale Maximizer
                      </TableCell>
                      <TableCell>Seasonal Commerce</TableCell>
                      <TableCell className="text-green-600">47%</TableCell>
                      <TableCell>$127,340</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Subscription Converter
                      </TableCell>
                      <TableCell>Media & Entertainment</TableCell>
                      <TableCell className="text-green-600">23%</TableCell>
                      <TableCell>$89,230</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Cart Recovery Pro
                      </TableCell>
                      <TableCell>E-commerce Recovery</TableCell>
                      <TableCell className="text-green-600">31%</TableCell>
                      <TableCell>$156,780</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Agent Performance Distribution</CardTitle>
                <CardDescription>
                  How agents are performing across key metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={agents}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="performance" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
