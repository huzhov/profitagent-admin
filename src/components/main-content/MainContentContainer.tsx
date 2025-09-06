import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import {
  Bot,
  Bug,
  Copy,
  Database,
  DollarSign,
  Edit,
  Key,
  MessageCircle,
  MessageSquare,
  MoreHorizontal,
  MousePointer,
  Plus,
  RefreshCw,
  Repeat,
  Settings,
  ShoppingCart,
  Sparkles,
  Target,
  Trash2,
  TrendingDown,
  TrendingUp,
  TrendingUpIcon,
  UserCheck,
  Users,
  Zap,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Progress } from "../ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import type { ProgressStep } from "../../types";
import AgentBuilder from "./AgentBuilder";

export default function MainContentContainer({
  currentStep,
  setCurrentStep,
  steps,
  activeSection,
  setActiveSection,
}: {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  steps: ProgressStep[];
  activeSection: string;
  setActiveSection: (section: string) => void;
}) {
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

  const [integrations, setIntegrations] = useState([
    {
      id: 1,
      name: "WhatsApp Business API - Main Store",
      status: "Connected",
      lastSync: "2024-01-15 10:30 AM",
      accountId: "123456789",
      phoneNumber: "+1-555-0123",
    },
    {
      id: 2,
      name: "WhatsApp Business API - Fashion Line",
      status: "Connected",
      lastSync: "2024-01-15 09:15 AM",
      accountId: "987654321",
      phoneNumber: "+1-555-0124",
    },
    {
      id: 3,
      name: "WhatsApp Business API - Electronics",
      status: "Disconnected",
      lastSync: "Never",
      accountId: "",
      phoneNumber: "",
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

  const [volumeData] = useState([
    {
      date: "2024-01-08",
      conversations: 245,
      messages: 1420,
      clicks: 89,
      catalogItems: 156,
    },
    {
      date: "2024-01-09",
      conversations: 312,
      messages: 1876,
      clicks: 124,
      catalogItems: 203,
    },
    {
      date: "2024-01-10",
      conversations: 289,
      messages: 1654,
      clicks: 98,
      catalogItems: 178,
    },
    {
      date: "2024-01-11",
      conversations: 356,
      messages: 2134,
      clicks: 145,
      catalogItems: 234,
    },
    {
      date: "2024-01-12",
      conversations: 423,
      messages: 2567,
      clicks: 178,
      catalogItems: 289,
    },
    {
      date: "2024-01-13",
      conversations: 398,
      messages: 2345,
      clicks: 156,
      catalogItems: 267,
    },
    {
      date: "2024-01-14",
      conversations: 445,
      messages: 2789,
      clicks: 198,
      catalogItems: 312,
    },
  ]);

  const [engagementData] = useState([
    { metric: "Response Rate", value: 87, change: 5.2, trend: "up" },
    { metric: "Quick Reply Usage", value: 64, change: -2.1, trend: "down" },
    { metric: "Drop-off Rate", value: 23, change: -8.4, trend: "down" },
    { metric: "Avg Session Length", value: 4.2, change: 12.3, trend: "up" },
  ]);

  const [businessOutcomes] = useState([
    { date: "2024-01-08", checkouts: 34, conversions: 12.4, retention: 78.2 },
    { date: "2024-01-09", checkouts: 45, conversions: 15.8, retention: 79.1 },
    { date: "2024-01-10", checkouts: 38, conversions: 13.2, retention: 77.8 },
    { date: "2024-01-11", checkouts: 52, conversions: 18.1, retention: 80.3 },
    { date: "2024-01-12", checkouts: 61, conversions: 21.7, retention: 82.1 },
    { date: "2024-01-13", checkouts: 56, conversions: 19.4, retention: 81.5 },
    { date: "2024-01-14", checkouts: 68, conversions: 24.2, retention: 83.7 },
  ]);

  const [abTestData] = useState([
    {
      variant: "Control",
      conversations: 1247,
      conversions: 156,
      conversionRate: 12.5,
      revenue: 15600,
    },
    {
      variant: "Variant A",
      conversations: 1189,
      conversions: 178,
      conversionRate: 15.0,
      revenue: 17800,
    },
  ]);

  const pieData = [
    { name: "Completed", value: 68, color: "#10b981" },
    { name: "In Progress", value: 23, color: "#f59e0b" },
    { name: "Dropped", value: 9, color: "#ef4444" },
  ];

  return (
    <main className="flex-1 overflow-auto">
      <div className="container mx-auto px-8 py-8">
        {activeSection === "builder" && (
          <AgentBuilder currentStep={currentStep} setCurrentStep={setCurrentStep} steps={steps} />
        )}

        {activeSection === "admin" && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-card-foreground">
                  User Administration
                </h2>
                <p className="text-muted-foreground">
                  Manage users, permissions, and system integrations
                </p>
              </div>
              <Button className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Add User</span>
              </Button>
            </div>

            <Tabs defaultValue="users" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger
                  value="users"
                  className="flex items-center space-x-2"
                >
                  <Users className="h-4 w-4" />
                  <span>Users & Permissions</span>
                </TabsTrigger>
                <TabsTrigger
                  value="integrations"
                  className="flex items-center space-x-2"
                >
                  <Key className="h-4 w-4" />
                  <span>Account & Integrations</span>
                </TabsTrigger>
                <TabsTrigger
                  value="debug"
                  className="flex items-center space-x-2"
                >
                  <Bug className="h-4 w-4" />
                  <span>Debug Dashboard</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="users" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>
                      Manage user accounts and their permissions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          name: "John Smith",
                          email: "john@hbomax.com",
                          role: "Admin",
                          brand: "HBO Max",
                        },
                        {
                          name: "Sarah Johnson",
                          email: "sarah@disney.com",
                          role: "Manager",
                          brand: "Disney",
                        },
                        {
                          name: "Mike Chen",
                          email: "mike@netflix.com",
                          role: "Editor",
                          brand: "Netflix",
                        },
                        {
                          name: "Emma Wilson",
                          email: "emma@spotify.com",
                          role: "Viewer",
                          brand: "Spotify",
                        },
                      ].map((user, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 border rounded-lg"
                        >
                          <div className="flex items-center space-x-4">
                            <Avatar>
                              <AvatarFallback>
                                {user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {user.email}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <Badge
                              variant="outline"
                              className="bg-blue-50 text-blue-700 border-blue-200"
                            >
                              {user.brand}
                            </Badge>
                            <Badge
                              variant={
                                user.role === "Admin" ? "default" : "secondary"
                              }
                            >
                              {user.role}
                            </Badge>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="integrations" className="space-y-6">
                <div className="grid gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <MessageSquare className="h-5 w-5 text-green-600" />
                        <span>WhatsApp Business API Connections</span>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                          Official Partner
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        Connect multiple WhatsApp Business accounts to manage
                        different brands or product lines. Powered by Meta's
                        official Business API.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Connected WhatsApp Accounts */}
                      <div className="space-y-4">
                        <h4 className="font-medium text-card-foreground">
                          Connected Accounts
                        </h4>
                        {integrations.map((integration) => (
                          <div
                            key={integration.id}
                            className="flex items-center justify-between p-4 border rounded-lg"
                          >
                            <div className="flex items-center space-x-4">
                              <div
                                className={`w-3 h-3 rounded-full ${
                                  integration.status === "Connected"
                                    ? "bg-green-500"
                                    : "bg-gray-400"
                                }`}
                              />
                              <div>
                                <p className="font-medium text-card-foreground flex items-center space-x-2">
                                  <span>{integration.name}</span>
                                  {integration.status === "Connected" && (
                                    <Badge
                                      variant="outline"
                                      className="text-green-600 border-green-600"
                                    >
                                      <MessageSquare className="h-3 w-3 mr-1" />
                                      Active
                                    </Badge>
                                  )}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {integration.status === "Connected"
                                    ? `Account ID: ${integration.accountId} • Phone: ${integration.phoneNumber}`
                                    : "Not configured"}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Last sync: {integration.lastSync}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button variant="outline" size="sm">
                                <Settings className="h-4 w-4 mr-1" />
                                Configure
                              </Button>
                              {integration.status === "Connected" && (
                                <Button variant="outline" size="sm">
                                  <RefreshCw className="h-4 w-4 mr-1" />
                                  Sync
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Add New WhatsApp Connection */}
                      <div className="border-t pt-6">
                        <h4 className="font-medium text-card-foreground mb-4">
                          Add New WhatsApp Business Account
                        </h4>
                        <div className="grid gap-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="userId">User ID</Label>
                              <Input
                                id="userId"
                                placeholder="Enter WhatsApp User ID"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="clientSecret">
                                Client Secret
                              </Label>
                              <Input
                                id="clientSecret"
                                type="password"
                                placeholder="Enter Client Secret"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="accessToken">
                                WhatsApp Account Access Token
                              </Label>
                              <Input
                                id="accessToken"
                                type="password"
                                placeholder="Enter Access Token"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="businessAccountId">
                                WhatsApp Business Account ID
                              </Label>
                              <Input
                                id="businessAccountId"
                                placeholder="Enter Business Account ID"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="accountName">
                              Account Name (for identification)
                            </Label>
                            <Input
                              id="accountName"
                              placeholder="e.g., Main Store, Fashion Line, Electronics"
                            />
                          </div>
                          <Button className="w-fit">
                            <Plus className="h-4 w-4 mr-2" />
                            Connect WhatsApp Account
                          </Button>
                        </div>
                      </div>

                      {/* Webhook Configuration */}
                      <div className="border-t pt-6">
                        <h4 className="font-medium text-card-foreground mb-4">
                          Webhook Configuration
                        </h4>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="webhookUrl">Webhook URL</Label>
                              <Input
                                id="webhookUrl"
                                value="https://your-domain.com/api/webhooks/whatsapp"
                                readOnly
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="verifyToken">Verify Token</Label>
                              <div className="flex space-x-2">
                                <Input
                                  id="verifyToken"
                                  value="wa_verify_token_12345"
                                  readOnly
                                />
                                <Button variant="outline" size="sm">
                                  <Copy className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <h5 className="font-medium text-blue-900 mb-2">
                              Setup Instructions
                            </h5>
                            <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                              <li>
                                Copy the webhook URL and verify token above
                              </li>
                              <li>Go to your Meta Developer Console</li>
                              <li>
                                Navigate to WhatsApp → Configuration → Webhooks
                              </li>
                              <li>Add the webhook URL and verify token</li>
                              <li>Subscribe to message events</li>
                            </ol>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="debug" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Debug Dashboard (Internal)</CardTitle>
                    <CardDescription>
                      System monitoring and troubleshooting tools
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <Card className="p-4">
                        <div className="text-2xl font-bold text-green-600">
                          99.9%
                        </div>
                        <div className="text-sm text-muted-foreground">
                          System Uptime
                        </div>
                      </Card>
                      <Card className="p-4">
                        <div className="text-2xl font-bold text-blue-600">
                          1,247
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Active Connections
                        </div>
                      </Card>
                      <Card className="p-4">
                        <div className="text-2xl font-bold text-orange-600">
                          23ms
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Avg Response Time
                        </div>
                      </Card>
                      <Card className="p-4">
                        <div className="text-2xl font-bold text-red-600">3</div>
                        <div className="text-sm text-muted-foreground">
                          Error Count (24h)
                        </div>
                      </Card>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold">Recent System Logs</h4>
                      <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-1">
                        <div className="text-green-600">
                          [2024-01-15 10:30:15] INFO: WhatsApp webhook received
                          successfully
                        </div>
                        <div className="text-blue-600">
                          [2024-01-15 10:29:45] DEBUG: Agent response generated
                          in 234ms
                        </div>
                        <div className="text-orange-600">
                          [2024-01-15 10:28:12] WARN: Rate limit approaching for
                          user_id: 1247
                        </div>
                        <div className="text-red-600">
                          [2024-01-15 10:25:33] ERROR: Failed to connect to
                          Shopify API - timeout
                        </div>
                        <div className="text-green-600">
                          [2024-01-15 10:24:18] INFO: New agent deployed
                          successfully
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <Button variant="outline">Download Logs</Button>
                      <Button variant="outline">Clear Cache</Button>
                      <Button variant="outline">Restart Services</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {activeSection === "reporting" && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-card-foreground">
                  Analytics Dashboard
                </h2>
                <p className="text-muted-foreground">
                  Track performance, engagement, and business outcomes
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Select defaultValue="7days">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7days">Last 7 days</SelectItem>
                    <SelectItem value="30days">Last 30 days</SelectItem>
                    <SelectItem value="90days">Last 90 days</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">Export Report</Button>
              </div>
            </div>

            <Tabs defaultValue="volume" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger
                  value="volume"
                  className="flex items-center space-x-2"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Volume Metrics</span>
                </TabsTrigger>
                <TabsTrigger
                  value="engagement"
                  className="flex items-center space-x-2"
                >
                  <UserCheck className="h-4 w-4" />
                  <span>Engagement Quality</span>
                </TabsTrigger>
                <TabsTrigger
                  value="business"
                  className="flex items-center space-x-2"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>Business Outcomes</span>
                </TabsTrigger>
                <TabsTrigger
                  value="testing"
                  className="flex items-center space-x-2"
                >
                  <Target className="h-4 w-4" />
                  <span>A/B Testing</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="volume" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            Total Conversations
                          </p>
                          <p className="text-2xl font-bold">2,468</p>
                        </div>
                        <MessageCircle className="h-8 w-8 text-blue-600" />
                      </div>
                      <div className="flex items-center mt-2">
                        <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                        <span className="text-sm text-green-600">+12.5%</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            Messages Sent
                          </p>
                          <p className="text-2xl font-bold">14,785</p>
                        </div>
                        <MessageSquare className="h-8 w-8 text-green-600" />
                      </div>
                      <div className="flex items-center mt-2">
                        <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                        <span className="text-sm text-green-600">+8.3%</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            Link Clicks
                          </p>
                          <p className="text-2xl font-bold">988</p>
                        </div>
                        <MousePointer className="h-8 w-8 text-purple-600" />
                      </div>
                      <div className="flex items-center mt-2">
                        <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                        <span className="text-sm text-green-600">+15.7%</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            Catalog Items Viewed
                          </p>
                          <p className="text-2xl font-bold">1,639</p>
                        </div>
                        <Database className="h-8 w-8 text-orange-600" />
                      </div>
                      <div className="flex items-center mt-2">
                        <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                        <span className="text-sm text-green-600">+22.1%</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Volume Trends</CardTitle>
                    <CardDescription>
                      Daily conversation and message volume over time
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <LineChart data={volumeData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="conversations"
                          stroke="#3b82f6"
                          strokeWidth={2}
                        />
                        <Line
                          type="monotone"
                          dataKey="messages"
                          stroke="#10b981"
                          strokeWidth={2}
                        />
                        <Line
                          type="monotone"
                          dataKey="clicks"
                          stroke="#8b5cf6"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="engagement" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {engagementData.map((item, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">
                              {item.metric}
                            </p>
                            <p className="text-2xl font-bold">
                              {item.value}
                              {item.metric.includes("Rate") ||
                              item.metric.includes("Length")
                                ? item.metric.includes("Length")
                                  ? "min"
                                  : "%"
                                : ""}
                            </p>
                          </div>
                          {item.trend === "up" ? (
                            <TrendingUp className="h-8 w-8 text-green-600" />
                          ) : (
                            <TrendingDown className="h-8 w-8 text-red-600" />
                          )}
                        </div>
                        <div className="flex items-center mt-2">
                          {item.trend === "up" ? (
                            <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                          )}
                          <span
                            className={`text-sm ${
                              item.trend === "up"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {item.change > 0 ? "+" : ""}
                            {item.change}%
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Conversation Status Distribution</CardTitle>
                      <CardDescription>
                        How conversations are completing
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, value }) => `${name}: ${value}%`}
                          >
                            {pieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Engagement Quality Metrics</CardTitle>
                      <CardDescription>
                        Key performance indicators
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Response Rate</span>
                          <span>87%</span>
                        </div>
                        <Progress value={87} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Quick Reply Usage</span>
                          <span>64%</span>
                        </div>
                        <Progress value={64} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>User Satisfaction</span>
                          <span>92%</span>
                        </div>
                        <Progress value={92} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Goal Completion</span>
                          <span>76%</span>
                        </div>
                        <Progress value={76} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="business" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            Total Checkouts
                          </p>
                          <p className="text-2xl font-bold">354</p>
                        </div>
                        <ShoppingCart className="h-8 w-8 text-green-600" />
                      </div>
                      <div className="flex items-center mt-2">
                        <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                        <span className="text-sm text-green-600">+18.2%</span>
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
                          <p className="text-2xl font-bold">17.8%</p>
                        </div>
                        <Target className="h-8 w-8 text-blue-600" />
                      </div>
                      <div className="flex items-center mt-2">
                        <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                        <span className="text-sm text-green-600">+3.4%</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            Customer Retention
                          </p>
                          <p className="text-2xl font-bold">80.3%</p>
                        </div>
                        <UserCheck className="h-8 w-8 text-purple-600" />
                      </div>
                      <div className="flex items-center mt-2">
                        <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                        <span className="text-sm text-green-600">+5.7%</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Business Outcomes Over Time</CardTitle>
                    <CardDescription>
                      Track checkouts, conversions, and retention trends
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <AreaChart data={businessOutcomes}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area
                          type="monotone"
                          dataKey="checkouts"
                          stackId="1"
                          stroke="#10b981"
                          fill="#10b981"
                          fillOpacity={0.6}
                        />
                        <Area
                          type="monotone"
                          dataKey="conversions"
                          stackId="2"
                          stroke="#3b82f6"
                          fill="#3b82f6"
                          fillOpacity={0.6}
                        />
                        <Area
                          type="monotone"
                          dataKey="retention"
                          stackId="3"
                          stroke="#8b5cf6"
                          fill="#8b5cf6"
                          fillOpacity={0.6}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Revenue Attribution</CardTitle>
                      <CardDescription>
                        Revenue generated through AI agent interactions
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">
                          Direct Sales
                        </span>
                        <span className="text-lg font-bold">$45,230</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">
                          Assisted Sales
                        </span>
                        <span className="text-lg font-bold">$23,150</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">
                          Lead Generation
                        </span>
                        <span className="text-lg font-bold">$12,890</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Total Revenue</span>
                        <span className="text-xl font-bold text-green-600">
                          $81,270
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Customer Journey Metrics</CardTitle>
                      <CardDescription>
                        How customers progress through your funnel
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Initial Contact</span>
                          <span>100%</span>
                        </div>
                        <Progress value={100} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Engaged Conversation</span>
                          <span>78%</span>
                        </div>
                        <Progress value={78} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Product Interest</span>
                          <span>45%</span>
                        </div>
                        <Progress value={45} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Purchase Intent</span>
                          <span>28%</span>
                        </div>
                        <Progress value={28} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Conversion</span>
                          <span>18%</span>
                        </div>
                        <Progress value={18} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="testing" className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">
                      A/B Testing Dashboard
                    </h3>
                    <p className="text-muted-foreground">
                      Compare AI agent variations and measure impact
                    </p>
                  </div>
                  <Button className="flex items-center space-x-2">
                    <Plus className="h-4 w-4" />
                    <span>Create New Test</span>
                  </Button>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>
                      Active Test: Greeting Message Variation
                    </CardTitle>
                    <CardDescription>
                      Testing different greeting approaches for new customers
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {abTestData.map((variant, index) => (
                        <Card
                          key={index}
                          className={
                            variant.variant === "Variant A"
                              ? "border-green-500"
                              : ""
                          }
                        >
                          <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                              {variant.variant}
                              {variant.variant === "Variant A" && (
                                <Badge className="bg-green-500">Winner</Badge>
                              )}
                            </CardTitle>
                          </CardHeader>
                        </Card>
                      ))}
                    </div>

                    <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Target className="h-5 w-5 text-green-600" />
                        <h4 className="font-semibold text-green-800">
                          Test Results
                        </h4>
                      </div>
                      <p className="text-sm text-green-700 mt-2">
                        Variant A shows a <strong>20% improvement</strong> in
                        conversion rate with 95% statistical significance.
                        Consider implementing this variation across all agents.
                      </p>
                    </div>

                    <div className="flex space-x-4 mt-6">
                      <Button>Implement Winner</Button>
                      <Button variant="outline">Extend Test</Button>
                      <Button variant="outline">View Details</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Test History</CardTitle>
                    <CardDescription>
                      Previous A/B tests and their outcomes
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Test Name</TableHead>
                          <TableHead>Duration</TableHead>
                          <TableHead>Winner</TableHead>
                          <TableHead>Improvement</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">
                            Product Recommendation Style
                          </TableCell>
                          <TableCell>14 days</TableCell>
                          <TableCell>Variant B</TableCell>
                          <TableCell className="text-green-600">
                            +15.3%
                          </TableCell>
                          <TableCell>
                            <Badge>Implemented</Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">
                            Follow-up Timing
                          </TableCell>
                          <TableCell>21 days</TableCell>
                          <TableCell>Control</TableCell>
                          <TableCell className="text-red-600">-2.1%</TableCell>
                          <TableCell>
                            <Badge variant="secondary">Completed</Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">
                            CTA Button Text
                          </TableCell>
                          <TableCell>10 days</TableCell>
                          <TableCell>Variant A</TableCell>
                          <TableCell className="text-green-600">
                            +8.7%
                          </TableCell>
                          <TableCell>
                            <Badge>Implemented</Badge>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {activeSection === "agents" && (
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
                  onClick={() => setActiveSection("builder")}
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
                <Card
                  key={agent.id}
                  className="hover:shadow-lg transition-shadow"
                >
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
                    <div className="text-2xl font-bold text-green-600">
                      $847K
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Revenue This Month
                    </div>
                    <div className="text-xs text-green-600 flex items-center justify-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +23% vs last month
                    </div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-2xl font-bold text-blue-600">
                      34.2%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Avg Conversion Rate
                    </div>

                    <div className="text-xs text-green-600 flex items-center justify-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +4.1% vs last month
                    </div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="text-2xl font-bold text-purple-600">
                      1,847
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Leads Generated
                    </div>
                    <div className="text-xs text-green-600 flex items-center justify-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +18% vs last month
                    </div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="text-2xl font-bold text-orange-600">
                      $247K
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Cost Savings
                    </div>
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
                            <TableCell className="text-green-600">
                              47%
                            </TableCell>
                            <TableCell>$127,340</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">
                              Subscription Converter
                            </TableCell>
                            <TableCell>Media & Entertainment</TableCell>
                            <TableCell className="text-green-600">
                              23%
                            </TableCell>
                            <TableCell>$89,230</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">
                              Cart Recovery Pro
                            </TableCell>
                            <TableCell>E-commerce Recovery</TableCell>
                            <TableCell className="text-green-600">
                              31%
                            </TableCell>
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
        )}

        {activeSection === "messages" && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-card-foreground">
                  Messages
                </h2>
                <p className="text-muted-foreground">
                  View and manage all messages
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
