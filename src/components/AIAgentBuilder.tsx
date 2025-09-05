import React from "react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Slider } from "./ui/slider";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import {
  Bot,
  Settings,
  Database,
  Shield,
  Sliders,
  Wrench,
  MessageSquare,
  TestTube,
  Smartphone,
  Users,
  BarChart3,
  Grid3X3,
  Zap,
  Plus,
  Edit,
  Trash2,
  Key,
  Bug,
  TrendingUp,
  TrendingDown,
  MessageCircle,
  MousePointer,
  ShoppingCart,
  UserCheck,
  Target,
  Copy,
  RefreshCw,
  TrendingUpIcon,
  Repeat,
  DollarSign,
  MoreHorizontal,
  Upload,
  Sparkles,
} from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";

const mainSections = [
  { id: "reporting", title: "Reporting", icon: BarChart3 },
  { id: "agents", title: "Agents Hub", icon: Grid3X3 },
  { id: "builder", title: "Agent Builder", icon: Bot },
  { id: "messages", title: "Messages", icon: MessageSquare },
  { id: "admin", title: "User Admin", icon: Users },
];

const steps = [
  { id: "agent", title: "AI Agent Attributes", icon: Bot },
  { id: "system", title: "System Prompt & Design", icon: Settings },
  { id: "knowledge", title: "Static Knowledge & Memory", icon: Database },
  { id: "guardrails", title: "Guardrails", icon: Shield },
  { id: "generation", title: "Generation Settings", icon: Sliders },
  { id: "tools", title: "Dynamic Tools", icon: Wrench },
  { id: "whatsapp", title: "WhatsApp Native Fields", icon: MessageSquare },
  { id: "demo", title: "Demo & Test", icon: TestTube },
  { id: "integration", title: "WhatsApp Integration", icon: Smartphone },
];

const sections = [
  { id: "profile", title: "Agent Program", icon: Bot },
  { id: "system", title: "Agent Configuration", icon: Settings },
  { id: "whatsapp", title: "WhatsApp Native Fields", icon: MessageSquare },
  { id: "experience", title: "Experience", icon: Sparkles },
];

export default function AIAgentBuilder() {
  const [activeSection, setActiveSection] = useState("builder");
  const [currentStep, setCurrentStep] = useState(0);

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

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@company.com",
      role: "Admin",
      status: "Active",
      lastLogin: "2024-01-15",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@company.com",
      role: "Editor",
      status: "Active",
      lastLogin: "2024-01-14",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@company.com",
      role: "Viewer",
      status: "Inactive",
      lastLogin: "2024-01-10",
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

  const [formData, setFormData] = useState({
    // Section 1: Agent Program - Profile
    profile: "",
    template: "",
    languages: [],
    brandName: "",
    websiteUrl: "",
    category: "",
    businessDescription: "",
    socialMediaHandles: [],
    eCommerceUrl: "",
    clickOutUrl: "",

    // Section 1: Agent Program - Integrations
    oauthUserId: "",
    clientSecret: "",
    accessToken: "",
    businessAccountId: "",

    // Section 1: Agent Program - AI Agent
    primaryGoalKPI: "",
    tasksActions: "",

    // Section 2: Agent Configuration - AI System Design
    systemPromptCustomisation: "",
    toneOfVoice: "professional",
    defineSocialMedia: false,
    targetAudience: "",
    faqsBestAnswers: "",
    conversationClosure: "",
    newTopicsToLearn: "",

    // Section 2: Agent Configuration - Governance
    aiGuardrails: "",
    brandGuardrails: "",
    marketingOptInCopy: "",

    // Section 2: Agent Configuration - Media & Personalisation
    discoveryQuestions: "",

    // Section 2: Agent Configuration - Content Catalogue
    contentItems: [],

    // Section 2: Agent Configuration - Product Catalogue
    productPlans: "",

    // Section 2: Agent Configuration - Contextual Signals
    apiFeeds: [],

    // Section 2: Agent Configuration - Generation Settings
    toneVoiceSlider: [50],
    emotionality: [50],
    temperature: [50],
    messageLength: [50],
    chattyClinky: [50],

    // WhatsApp Native Fields - Quick Reply Buttons
    quickReplyId: "",
    quickReplyHeader: "",
    quickReplyBody: "",
    quickReplyFooter: "",
    quickReplyTitle: "",

    // WhatsApp Native Fields - Call-To-Action Buttons
    ctaHeader: "",
    ctaBody: "",
    ctaFooter: "",
    ctaType: "",
    ctaTitle: "",
    ctaUrlNumber: "",

    // WhatsApp Native Fields - List Messages
    listId: "",
    listHeader: "",
    listBody: "",
    listFooter: "",
    listButtonLabel: "",
    listSectionTitle: "",
    listRowTitle: "",
    listDescription: "",

    // Experience
    followUpFrequency: [],
    dynamicPricing: "",
    lastMessage71hrs: "",
  });

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentProgress = ((currentStep + 1) / steps.length) * 100;

  const toggleUserStatus = (userId: number) => {
    setUsers(
      users.map((user) =>
        user.id === userId
          ? {
              ...user,
              status: user.status === "Active" ? "Inactive" : "Active",
            }
          : user
      )
    );
  };

  const deleteUser = (userId: number) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  return (
    <div className="min-h-screen bg-background flex">
      <aside className="w-64 bg-card border-r border-border flex flex-col">
        {/* Logo Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <img
              src="/images/profitagent-logo.png"
              alt="ProfitAgent"
              className="h-10 w-10"
            />
            <div>
              <h1 className="text-xl font-bold text-card-foreground">
                ProfitAgent.AI
              </h1>
              <p className="text-xs text-muted-foreground">
                WhatsApp Revenue Engine
              </p>
            </div>
          </div>
          <Badge
            variant="secondary"
            className="bg-green-100 text-green-800 border-green-200 mt-2 text-xs"
          >
            Official Partner
          </Badge>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {mainSections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-left ${
                    activeSection === section.id
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "hover:bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{section.title}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Progress Bar for Agent Builder */}
        {activeSection === "builder" && (
          <div className="p-4 border-t border-border">
            <div className="flex items-center justify-between mb-2">
              <Badge variant="secondary" className="text-xs">
                Step {currentStep + 1} of {steps.length}
              </Badge>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${currentProgress}%` }}
              />
            </div>
          </div>
        )}
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto px-8 py-8">
          {activeSection === "builder" && (
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-balance mb-2">
                  Create AI Agent
                </h2>
                <p className="text-muted-foreground">
                  Build your WhatsApp commerce AI agent with advanced
                  configuration options
                </p>
              </div>

              {/* Section Navigation Tabs */}
              <div className="flex flex-wrap gap-2 mb-8 p-1 bg-muted rounded-lg">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() =>
                        setCurrentStep(
                          sections.findIndex((s) => s.id === section.id)
                        )
                      }
                      className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        sections[currentStep]?.id === section.id
                          ? "bg-background text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{section.title}</span>
                    </button>
                  );
                })}
              </div>

              {/* Form Content */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    {sections[currentStep] && (
                      <>
                        {React.createElement(sections[currentStep].icon, {
                          className: "h-5 w-5",
                        })}
                        <span>{sections[currentStep].title}</span>
                      </>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Section 1: Agent Program */}
                  {currentStep === 0 && (
                    <div className="space-y-8">
                      {/* Profile */}
                      <div className="space-y-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="h-8 w-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                            1
                          </div>
                          <h3 className="text-xl font-semibold">Profile</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="profile">Profile *</Label>
                            <Input
                              id="profile"
                              value={formData.profile}
                              onChange={(e) =>
                                updateFormData("profile", e.target.value)
                              }
                              placeholder="Name or identifier for the agent"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="template">Template</Label>
                            <Select
                              value={formData.template}
                              onValueChange={(value) =>
                                updateFormData("template", value)
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select a predefined agent template" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="ecommerce">
                                  E-commerce Sales Agent
                                </SelectItem>
                                <SelectItem value="subscription">
                                  Subscription Conversion Agent
                                </SelectItem>
                                <SelectItem value="support">
                                  Customer Support Agent
                                </SelectItem>
                                <SelectItem value="retention">
                                  Customer Retention Agent
                                </SelectItem>
                                <SelectItem value="upsell">
                                  Upsell & Cross-sell Agent
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="languages">Languages</Label>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {[
                              "English",
                              "Spanish",
                              "French",
                              "German",
                              "Italian",
                              "Portuguese",
                              "Dutch",
                              "Arabic",
                            ].map((lang) => (
                              <div
                                key={lang}
                                className="flex items-center space-x-2"
                              >
                                <input
                                  type="checkbox"
                                  id={lang}
                                  className="rounded border-gray-300"
                                />
                                <Label htmlFor={lang} className="text-sm">
                                  {lang}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="brandName">Brand Name *</Label>
                            <Input
                              id="brandName"
                              value={formData.brandName}
                              onChange={(e) =>
                                updateFormData("brandName", e.target.value)
                              }
                              placeholder="Brand/company name"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="websiteUrl">Website URL</Label>
                            <Input
                              id="websiteUrl"
                              type="url"
                              value={formData.websiteUrl}
                              onChange={(e) =>
                                updateFormData("websiteUrl", e.target.value)
                              }
                              placeholder="https://company.com"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="category">Category</Label>
                          <Select
                            value={formData.category}
                            onValueChange={(value) =>
                              updateFormData("category", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Industry category of the agent" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ecommerce">
                                E-commerce
                              </SelectItem>
                              <SelectItem value="saas">SaaS</SelectItem>
                              <SelectItem value="retail">Retail</SelectItem>
                              <SelectItem value="healthcare">
                                Healthcare
                              </SelectItem>
                              <SelectItem value="finance">Finance</SelectItem>
                              <SelectItem value="education">
                                Education
                              </SelectItem>
                              <SelectItem value="travel">
                                Travel & Hospitality
                              </SelectItem>
                              <SelectItem value="realestate">
                                Real Estate
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="businessDescription">
                            Business Description
                          </Label>
                          <Textarea
                            id="businessDescription"
                            value={formData.businessDescription}
                            onChange={(e) =>
                              updateFormData(
                                "businessDescription",
                                e.target.value
                              )
                            }
                            placeholder="Short paragraph describing the business"
                            rows={3}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Social Media Handles</Label>
                          <div className="space-y-3">
                            <Input placeholder="Instagram: @username" />
                            <Input placeholder="Twitter: @username" />
                            <Input placeholder="Facebook: facebook.com/page" />
                            <Input placeholder="LinkedIn: linkedin.com/company/name" />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="eCommerceUrl">E-Commerce URL</Label>
                            <Input
                              id="eCommerceUrl"
                              type="url"
                              value={formData.eCommerceUrl}
                              onChange={(e) =>
                                updateFormData("eCommerceUrl", e.target.value)
                              }
                              placeholder="https://store.company.com"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="clickOutUrl">
                              Click Out URL (Fallback)
                            </Label>
                            <Input
                              id="clickOutUrl"
                              type="url"
                              value={formData.clickOutUrl}
                              onChange={(e) =>
                                updateFormData("clickOutUrl", e.target.value)
                              }
                              placeholder="https://help.company.com"
                            />
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Integrations */}
                      <div className="space-y-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="h-8 w-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                            2
                          </div>
                          <h3 className="text-xl font-semibold">
                            Integrations
                          </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="oauthUserId">OAuth User ID</Label>
                            <Input
                              id="oauthUserId"
                              value={formData.oauthUserId}
                              onChange={(e) =>
                                updateFormData("oauthUserId", e.target.value)
                              }
                              placeholder="User ID for OAuth integration"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="clientSecret">Client Secret</Label>
                            <Input
                              id="clientSecret"
                              type="password"
                              value={formData.clientSecret}
                              onChange={(e) =>
                                updateFormData("clientSecret", e.target.value)
                              }
                              placeholder="••••••••••••••••"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="accessToken">Access Token</Label>
                            <Input
                              id="accessToken"
                              type="password"
                              value={formData.accessToken}
                              onChange={(e) =>
                                updateFormData("accessToken", e.target.value)
                              }
                              placeholder="••••••••••••••••"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="businessAccountId">
                              Business Account ID
                            </Label>
                            <Input
                              id="businessAccountId"
                              value={formData.businessAccountId}
                              onChange={(e) =>
                                updateFormData(
                                  "businessAccountId",
                                  e.target.value
                                )
                              }
                              placeholder="ID for associated business account"
                            />
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* AI Agent */}
                      <div className="space-y-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="h-8 w-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                            3
                          </div>
                          <h3 className="text-xl font-semibold">AI Agent</h3>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="primaryGoalKPI">
                            Primary Goal / KPI *
                          </Label>
                          <Textarea
                            id="primaryGoalKPI"
                            value={formData.primaryGoalKPI}
                            onChange={(e) =>
                              updateFormData("primaryGoalKPI", e.target.value)
                            }
                            placeholder="Key performance indicator or main objective for the agent:&#10;• Increase conversion rate by 25%&#10;• Reduce cart abandonment to under 15%&#10;• Achieve 90% customer satisfaction score&#10;• Generate $50K additional revenue per month"
                            rows={4}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="tasksActions">Tasks / Actions</Label>
                          <Textarea
                            id="tasksActions"
                            value={formData.tasksActions}
                            onChange={(e) =>
                              updateFormData("tasksActions", e.target.value)
                            }
                            placeholder="List of tasks or actions the AI agent should perform:&#10;• Qualify leads and identify purchase intent&#10;• Provide product recommendations based on preferences&#10;• Handle objections and concerns&#10;• Process orders and upsell complementary products&#10;• Schedule follow-up conversations&#10;• Collect customer feedback and reviews"
                            rows={6}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Section 2: Agent Configuration */}
                  {currentStep === 1 && (
                    <div className="space-y-8">
                      {/* AI System Design */}
                      <div className="space-y-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="h-8 w-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                            1
                          </div>
                          <h3 className="text-xl font-semibold">
                            AI System Design
                          </h3>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="systemPromptCustomisation">
                            System Prompt Customisation *
                          </Label>
                          <Textarea
                            id="systemPromptCustomisation"
                            value={formData.systemPromptCustomisation}
                            onChange={(e) =>
                              updateFormData(
                                "systemPromptCustomisation",
                                e.target.value
                              )
                            }
                            placeholder="Customize the base AI system prompt to define your agent's personality, behavior, and response style"
                            rows={5}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="toneOfVoice">
                            Tone of Voice / Communication Style
                          </Label>
                          <Select
                            value={formData.toneOfVoice}
                            onValueChange={(value) =>
                              updateFormData("toneOfVoice", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="professional">
                                Professional
                              </SelectItem>
                              <SelectItem value="friendly">Friendly</SelectItem>
                              <SelectItem value="casual">Casual</SelectItem>
                              <SelectItem value="humorous">Humorous</SelectItem>
                              <SelectItem value="empathetic">
                                Empathetic
                              </SelectItem>
                              <SelectItem value="authoritative">
                                Authoritative
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="defineSocialMedia"
                            checked={formData.defineSocialMedia}
                            onChange={(e) =>
                              updateFormData(
                                "defineSocialMedia",
                                e.target.checked
                              )
                            }
                            className="rounded border-gray-300"
                          />
                          <Label htmlFor="defineSocialMedia">
                            Define using social media handles
                          </Label>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="targetAudience">
                            Target Audience *
                          </Label>
                          <Textarea
                            id="targetAudience"
                            value={formData.targetAudience}
                            onChange={(e) =>
                              updateFormData("targetAudience", e.target.value)
                            }
                            placeholder="Describe ideal users/customers"
                            rows={4}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="faqsBestAnswers">
                            FAQs & Best Answers
                          </Label>
                          <div className="space-y-3">
                            <Textarea
                              id="faqsBestAnswers"
                              value={formData.faqsBestAnswers}
                              onChange={(e) =>
                                updateFormData(
                                  "faqsBestAnswers",
                                  e.target.value
                                )
                              }
                              placeholder="Enter questions and answers manually"
                              rows={6}
                            />
                            <Button
                              variant="outline"
                              className="w-full bg-transparent"
                            >
                              <Upload className="h-4 w-4 mr-2" />
                              Upload FAQ Document
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="conversationClosure">
                            Conversation Closure Checklist
                          </Label>
                          <Textarea
                            id="conversationClosure"
                            value={formData.conversationClosure}
                            onChange={(e) =>
                              updateFormData(
                                "conversationClosure",
                                e.target.value
                              )
                            }
                            placeholder="Steps AI should follow to close a conversation appropriately"
                            rows={4}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="newTopicsToLearn">
                            New Topics for AI to Learn
                          </Label>
                          <div className="space-y-3">
                            <Textarea
                              id="newTopicsToLearn"
                              value={formData.newTopicsToLearn}
                              onChange={(e) =>
                                updateFormData(
                                  "newTopicsToLearn",
                                  e.target.value
                                )
                              }
                              placeholder="Input new topics for AI learning"
                              rows={3}
                            />
                            <Button
                              variant="outline"
                              className="w-full bg-transparent"
                            >
                              <Upload className="h-4 w-4 mr-2" />
                              Upload Learning Documents
                            </Button>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Governance */}
                      <div className="space-y-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="h-8 w-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                            2
                          </div>
                          <h3 className="text-xl font-semibold">Governance</h3>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="aiGuardrails">AI Guardrails</Label>
                          <div className="space-y-3">
                            <Textarea
                              id="aiGuardrails"
                              value={formData.aiGuardrails}
                              onChange={(e) =>
                                updateFormData("aiGuardrails", e.target.value)
                              }
                              placeholder="List of restrictions or 'do not cross' rules for AI"
                              rows={4}
                            />
                            <div className="grid grid-cols-2 gap-3">
                              {[
                                "No medical advice",
                                "No legal advice",
                                "No competitor mentions",
                                "Professional tone only",
                              ].map((rule) => (
                                <div
                                  key={rule}
                                  className="flex items-center space-x-2"
                                >
                                  <input
                                    type="checkbox"
                                    id={rule}
                                    className="rounded border-gray-300"
                                  />
                                  <Label htmlFor={rule} className="text-sm">
                                    {rule}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="brandGuardrails">
                            Brand Guardrails
                          </Label>
                          <div className="space-y-3">
                            <Textarea
                              id="brandGuardrails"
                              value={formData.brandGuardrails}
                              onChange={(e) =>
                                updateFormData(
                                  "brandGuardrails",
                                  e.target.value
                                )
                              }
                              placeholder="Brand-specific guidelines or limitations"
                              rows={4}
                            />
                            <div className="grid grid-cols-2 gap-3">
                              {[
                                "Mention sustainability",
                                "Use inclusive language",
                                "Reference quality guarantee",
                                "Avoid pricing discussions",
                              ].map((guideline) => (
                                <div
                                  key={guideline}
                                  className="flex items-center space-x-2"
                                >
                                  <input
                                    type="checkbox"
                                    id={guideline}
                                    className="rounded border-gray-300"
                                  />
                                  <Label
                                    htmlFor={guideline}
                                    className="text-sm"
                                  >
                                    {guideline}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="marketingOptInCopy">
                            Marketing Opt-In Copy
                          </Label>
                          <Textarea
                            id="marketingOptInCopy"
                            value={formData.marketingOptInCopy}
                            onChange={(e) =>
                              updateFormData(
                                "marketingOptInCopy",
                                e.target.value
                              )
                            }
                            placeholder="Copy used to request user consent for marketing communications"
                            rows={3}
                          />
                        </div>
                      </div>

                      <Separator />

                      {/* Media & Personalisation */}
                      <div className="space-y-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="h-8 w-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                            3
                          </div>
                          <h3 className="text-xl font-semibold">
                            Media & Personalisation
                          </h3>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="discoveryQuestions">
                            Discovery Questions
                          </Label>
                          <Textarea
                            id="discoveryQuestions"
                            value={formData.discoveryQuestions}
                            onChange={(e) =>
                              updateFormData(
                                "discoveryQuestions",
                                e.target.value
                              )
                            }
                            placeholder="Questions AI should ask to understand user preferences"
                            rows={5}
                          />
                        </div>
                      </div>

                      <Separator />

                      {/* Content Catalogue */}
                      <div className="space-y-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="h-8 w-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                            4
                          </div>
                          <h3 className="text-xl font-semibold">
                            Content Catalogue (Information Feed)
                          </h3>
                        </div>

                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <p className="text-sm text-muted-foreground">
                              Add content items for your AI agent to reference
                            </p>
                            <Button variant="outline" size="sm">
                              <Plus className="h-4 w-4 mr-2" />
                              Add Content Item
                            </Button>
                          </div>

                          <div className="border rounded-lg p-4 space-y-4">
                            <div className="space-y-2">
                              <Label>Title</Label>
                              <Input placeholder="Name of content item" />
                            </div>
                            <div className="space-y-2">
                              <Label>Media</Label>
                              <div className="flex space-x-2">
                                <Input
                                  placeholder="Upload media files or link to external content"
                                  className="flex-1"
                                />
                                <Button variant="outline" size="sm">
                                  <Upload className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label>Description</Label>
                              <Textarea
                                placeholder="Short description of the content"
                                rows={2}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>CTA</Label>
                              <Input placeholder="Call-to-action link or text" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Product Catalogue */}
                      <div className="space-y-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="h-8 w-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                            5
                          </div>
                          <h3 className="text-xl font-semibold">
                            Product Catalogue (Subscription Plans)
                          </h3>
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="productPlans">Product / Plan</Label>
                            <Textarea
                              id="productPlans"
                              value={formData.productPlans}
                              onChange={(e) =>
                                updateFormData("productPlans", e.target.value)
                              }
                              placeholder="List products or subscription plans with details"
                              rows={6}
                            />
                          </div>
                          <Button
                            variant="outline"
                            className="w-full bg-transparent"
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            Upload CSV Product Catalog
                          </Button>
                        </div>
                      </div>

                      <Separator />

                      {/* Contextual Signals */}
                      <div className="space-y-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="h-8 w-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                            6
                          </div>
                          <h3 className="text-xl font-semibold">
                            Contextual Signals (APIs / Feeds)
                          </h3>
                        </div>

                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <p className="text-sm text-muted-foreground">
                              Provide URLs for dynamic data sources
                            </p>
                            <Button variant="outline" size="sm">
                              <Plus className="h-4 w-4 mr-2" />
                              Add API Feed
                            </Button>
                          </div>

                          <div className="border rounded-lg p-4 space-y-4">
                            <div className="space-y-2">
                              <Label>API / Feed URL</Label>
                              <Input
                                type="url"
                                placeholder="https://api.example.com/feed"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Generation Settings */}
                      <div className="space-y-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="h-8 w-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                            7
                          </div>
                          <h3 className="text-xl font-semibold">
                            Generation Settings
                          </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-6">
                            <div className="space-y-3">
                              <Label>Tone / Voice</Label>
                              <div className="px-3">
                                <Slider
                                  value={formData.toneVoiceSlider}
                                  onValueChange={(value) =>
                                    updateFormData("toneVoiceSlider", value)
                                  }
                                  max={100}
                                  step={1}
                                  className="w-full"
                                />
                                <div className="flex justify-between text-sm text-muted-foreground mt-1">
                                  <span>Formal</span>
                                  <span>{formData.toneVoiceSlider[0]}%</span>
                                  <span>Casual</span>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <Label>Emotionality</Label>
                              <div className="px-3">
                                <Slider
                                  value={formData.emotionality}
                                  onValueChange={(value) =>
                                    updateFormData("emotionality", value)
                                  }
                                  max={100}
                                  step={1}
                                  className="w-full"
                                />
                                <div className="flex justify-between text-sm text-muted-foreground mt-1">
                                  <span>Neutral</span>
                                  <span>{formData.emotionality[0]}%</span>
                                  <span>Expressive</span>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <Label>
                                Temperature (Assertiveness / Creativity)
                              </Label>
                              <div className="px-3">
                                <Slider
                                  value={formData.temperature}
                                  onValueChange={(value) =>
                                    updateFormData("temperature", value)
                                  }
                                  max={100}
                                  step={1}
                                  className="w-full"
                                />
                                <div className="flex justify-between text-sm text-muted-foreground mt-1">
                                  <span>Conservative</span>
                                  <span>{formData.temperature[0]}%</span>
                                  <span>Creative</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-6">
                            <div className="space-y-3">
                              <Label>Message Length</Label>
                              <div className="px-3">
                                <Slider
                                  value={formData.messageLength}
                                  onValueChange={(value) =>
                                    updateFormData("messageLength", value)
                                  }
                                  max={100}
                                  step={1}
                                  className="w-full"
                                />
                                <div className="flex justify-between text-sm text-muted-foreground mt-1">
                                  <span>Concise</span>
                                  <span>{formData.messageLength[0]}%</span>
                                  <span>Detailed</span>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <Label>Chatty / Clicky</Label>
                              <div className="px-3">
                                <Slider
                                  value={formData.chattyClinky}
                                  onValueChange={(value) =>
                                    updateFormData("chattyClinky", value)
                                  }
                                  max={100}
                                  step={1}
                                  className="w-full"
                                />
                                <div className="flex justify-between text-sm text-muted-foreground mt-1">
                                  <span>Action-focused</span>
                                  <span>{formData.chattyClinky[0]}%</span>
                                  <span>Conversational</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* WhatsApp Native Fields */}
                  {currentStep === 2 && (
                    <div className="space-y-8">
                      {/* Quick Reply Buttons */}
                      <div className="space-y-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="h-8 w-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                            1
                          </div>
                          <h3 className="text-xl font-semibold">
                            Quick Reply Buttons
                          </h3>
                        </div>

                        <div className="border rounded-lg p-4 space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="quickReplyId">ID</Label>
                              <Input
                                id="quickReplyId"
                                value={formData.quickReplyId}
                                onChange={(e) =>
                                  updateFormData("quickReplyId", e.target.value)
                                }
                                placeholder="Unique identifier for the button"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="quickReplyHeader">Header</Label>
                              <Input
                                id="quickReplyHeader"
                                value={formData.quickReplyHeader}
                                onChange={(e) =>
                                  updateFormData(
                                    "quickReplyHeader",
                                    e.target.value
                                  )
                                }
                                placeholder="Header text for the button"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="quickReplyBody">Body</Label>
                            <Textarea
                              id="quickReplyBody"
                              value={formData.quickReplyBody}
                              onChange={(e) =>
                                updateFormData("quickReplyBody", e.target.value)
                              }
                              placeholder="Main content of the button message"
                              rows={2}
                            />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="quickReplyFooter">Footer</Label>
                              <Input
                                id="quickReplyFooter"
                                value={formData.quickReplyFooter}
                                onChange={(e) =>
                                  updateFormData(
                                    "quickReplyFooter",
                                    e.target.value
                                  )
                                }
                                placeholder="Footer text"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="quickReplyTitle">Title</Label>
                              <Input
                                id="quickReplyTitle"
                                value={formData.quickReplyTitle}
                                onChange={(e) =>
                                  updateFormData(
                                    "quickReplyTitle",
                                    e.target.value
                                  )
                                }
                                placeholder="Button label text"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Call-To-Action Buttons */}
                      <div className="space-y-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="h-8 w-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                            2
                          </div>
                          <h3 className="text-xl font-semibold">
                            Call-To-Action Buttons
                          </h3>
                        </div>

                        <div className="border rounded-lg p-4 space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="ctaHeader">Header</Label>
                              <Input
                                id="ctaHeader"
                                value={formData.ctaHeader}
                                onChange={(e) =>
                                  updateFormData("ctaHeader", e.target.value)
                                }
                                placeholder="Header text of CTA"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="ctaType">Type</Label>
                              <Select
                                value={formData.ctaType}
                                onValueChange={(value) =>
                                  updateFormData("ctaType", value)
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Type of action" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="url">URL</SelectItem>
                                  <SelectItem value="phone">
                                    Phone Number
                                  </SelectItem>
                                  <SelectItem value="app">
                                    App Action
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="ctaBody">Body</Label>
                            <Textarea
                              id="ctaBody"
                              value={formData.ctaBody}
                              onChange={(e) =>
                                updateFormData("ctaBody", e.target.value)
                              }
                              placeholder="Main message"
                              rows={2}
                            />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="ctaFooter">Footer</Label>
                              <Input
                                id="ctaFooter"
                                value={formData.ctaFooter}
                                onChange={(e) =>
                                  updateFormData("ctaFooter", e.target.value)
                                }
                                placeholder="Footer text"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="ctaTitle">Title</Label>
                              <Input
                                id="ctaTitle"
                                value={formData.ctaTitle}
                                onChange={(e) =>
                                  updateFormData("ctaTitle", e.target.value)
                                }
                                placeholder="Label text on button"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="ctaUrlNumber">URL / Number</Label>
                            <Input
                              id="ctaUrlNumber"
                              value={formData.ctaUrlNumber}
                              onChange={(e) =>
                                updateFormData("ctaUrlNumber", e.target.value)
                              }
                              placeholder="Link or number to trigger"
                            />
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* List Messages */}
                      <div className="space-y-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="h-8 w-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                            3
                          </div>
                          <h3 className="text-xl font-semibold">
                            List Messages
                          </h3>
                        </div>

                        <div className="border rounded-lg p-4 space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="listId">ID</Label>
                              <Input
                                id="listId"
                                value={formData.listId}
                                onChange={(e) =>
                                  updateFormData("listId", e.target.value)
                                }
                                placeholder="Unique identifier for the list"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="listHeader">Header</Label>
                              <Input
                                id="listHeader"
                                value={formData.listHeader}
                                onChange={(e) =>
                                  updateFormData("listHeader", e.target.value)
                                }
                                placeholder="Header of list message"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="listBody">Body</Label>
                            <Textarea
                              id="listBody"
                              value={formData.listBody}
                              onChange={(e) =>
                                updateFormData("listBody", e.target.value)
                              }
                              placeholder="Main content of the message"
                              rows={2}
                            />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="listFooter">Footer</Label>
                              <Input
                                id="listFooter"
                                value={formData.listFooter}
                                onChange={(e) =>
                                  updateFormData("listFooter", e.target.value)
                                }
                                placeholder="Footer text"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="listButtonLabel">
                                Button Label
                              </Label>
                              <Input
                                id="listButtonLabel"
                                value={formData.listButtonLabel}
                                onChange={(e) =>
                                  updateFormData(
                                    "listButtonLabel",
                                    e.target.value
                                  )
                                }
                                placeholder="Label for action button"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="listSectionTitle">
                              Section Title
                            </Label>
                            <Input
                              id="listSectionTitle"
                              value={formData.listSectionTitle}
                              onChange={(e) =>
                                updateFormData(
                                  "listSectionTitle",
                                  e.target.value
                                )
                              }
                              placeholder="Section heading"
                            />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="listRowTitle">Row Title</Label>
                              <Input
                                id="listRowTitle"
                                value={formData.listRowTitle}
                                onChange={(e) =>
                                  updateFormData("listRowTitle", e.target.value)
                                }
                                placeholder="Row label"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="listDescription">
                                Description
                              </Label>
                              <Textarea
                                id="listDescription"
                                value={formData.listDescription}
                                onChange={(e) =>
                                  updateFormData(
                                    "listDescription",
                                    e.target.value
                                  )
                                }
                                placeholder="Row description"
                                rows={2}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Experience */}
                  {currentStep === 3 && (
                    <div className="space-y-8">
                      <div className="space-y-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="h-8 w-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                            1
                          </div>
                          <h3 className="text-xl font-semibold">
                            Experience Configuration
                          </h3>
                        </div>

                        <div className="space-y-6">
                          <div className="space-y-3">
                            <Label>Follow Up Frequency</Label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                              {[
                                "1st",
                                "2nd",
                                "3rd",
                                "4th",
                                "Basket drop-off",
                              ].map((option) => (
                                <div
                                  key={option}
                                  className="flex items-center space-x-2"
                                >
                                  <input
                                    type="checkbox"
                                    id={option}
                                    className="rounded border-gray-300"
                                  />
                                  <Label htmlFor={option} className="text-sm">
                                    {option}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="dynamicPricing">
                              Dynamic Pricing / Promotions
                            </Label>
                            <div className="space-y-3">
                              <Textarea
                                id="dynamicPricing"
                                value={formData.dynamicPricing}
                                onChange={(e) =>
                                  updateFormData(
                                    "dynamicPricing",
                                    e.target.value
                                  )
                                }
                                placeholder="Input rules, promotions, or dynamic pricing information"
                                rows={5}
                              />
                              <Button
                                variant="outline"
                                className="w-full bg-transparent"
                              >
                                <Upload className="h-4 w-4 mr-2" />
                                Upload CSV Pricing Rules
                              </Button>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="lastMessage71hrs">
                              Last Message (No Response After 71hrs)
                            </Label>
                            <Textarea
                              id="lastMessage71hrs"
                              value={formData.lastMessage71hrs}
                              onChange={(e) =>
                                updateFormData(
                                  "lastMessage71hrs",
                                  e.target.value
                                )
                              }
                              placeholder="Message AI sends if user doesn't respond within 71 hours"
                              rows={4}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 8 && (
                    <div className="space-y-6">
                      <div className="text-center py-8">
                        <TestTube className="h-16 w-16 text-green-600 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">
                          Test Your AI Agent
                        </h3>
                        <p className="text-muted-foreground mb-6">
                          Preview and test your AI agent before deploying to
                          WhatsApp
                        </p>

                        <div className="bg-muted p-6 rounded-lg max-w-md mx-auto">
                          <div className="space-y-4">
                            <div className="bg-green-600 text-white p-3 rounded-lg rounded-br-sm text-left">
                              <p className="text-sm">
                                Hi! I'm your {formData.brandName || "AI"}{" "}
                                assistant. How can I help you today?
                              </p>
                            </div>
                            <div className="bg-white border p-3 rounded-lg rounded-bl-sm text-left">
                              <p className="text-sm">
                                Tell me about your products
                              </p>
                            </div>
                            <div className="bg-green-600 text-white p-3 rounded-lg rounded-br-sm text-left">
                              <p className="text-sm">
                                I'd be happy to help!{" "}
                                {formData.businessDescription
                                  ? formData.businessDescription.slice(0, 50) +
                                    "..."
                                  : "We offer a wide range of products..."}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 space-y-3">
                          <Button
                            size="lg"
                            className="w-full max-w-sm bg-green-600 hover:bg-green-700"
                          >
                            Start Test Conversation
                          </Button>
                          <Button
                            variant="outline"
                            size="lg"
                            className="w-full max-w-sm bg-transparent"
                          >
                            View Agent Preview
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between pt-6 border-t">
                    <Button
                      variant="outline"
                      onClick={prevStep}
                      disabled={currentStep === 0}
                    >
                      Previous
                    </Button>

                    <div className="flex space-x-3">
                      <Button variant="outline">Save Draft</Button>
                      {currentStep === steps.length - 1 ? (
                        <Button className="bg-secondary hover:bg-secondary/90">
                          Deploy Agent
                        </Button>
                      ) : (
                        <Button onClick={nextStep}>Next Step</Button>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    disabled={currentStep === 0}
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={() =>
                      setCurrentStep(
                        Math.min(sections.length - 1, currentStep + 1)
                      )
                    }
                    disabled={currentStep === sections.length - 1}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {currentStep === sections.length - 1
                      ? "Create Agent"
                      : "Next"}
                  </Button>
                </CardFooter>
              </Card>
            </div>
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
                                  user.role === "Admin"
                                    ? "default"
                                    : "secondary"
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
                                <Label htmlFor="verifyToken">
                                  Verify Token
                                </Label>
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
                                  Navigate to WhatsApp → Configuration →
                                  Webhooks
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
                          <div className="text-2xl font-bold text-red-600">
                            3
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Error Count (24h)
                          </div>
                        </Card>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold">Recent System Logs</h4>
                        <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-1">
                          <div className="text-green-600">
                            [2024-01-15 10:30:15] INFO: WhatsApp webhook
                            received successfully
                          </div>
                          <div className="text-blue-600">
                            [2024-01-15 10:29:45] DEBUG: Agent response
                            generated in 234ms
                          </div>
                          <div className="text-orange-600">
                            [2024-01-15 10:28:12] WARN: Rate limit approaching
                            for user_id: 1247
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
                                <Cell
                                  key={`cell-${index}`}
                                  fill={entry.color}
                                />
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
                          Consider implementing this variation across all
                          agents.
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
                            <TableCell className="text-red-600">
                              -2.1%
                            </TableCell>
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
                            .reduce(
                              (sum, agent) => sum + agent.conversations,
                              0
                            )
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
                          <CardTitle className="text-lg">
                            {agent.name}
                          </CardTitle>
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
                    Launch high-converting agents with proven commerce
                    frameworks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer border-green-200">
                      <div className="text-center space-y-2">
                        <TrendingUpIcon className="h-8 w-8 text-green-600 mx-auto" />
                        <h4 className="font-semibold">Flash Sale Maximizer</h4>
                        <p className="text-xs text-muted-foreground">
                          Drive urgency with dynamic pricing & countdown
                          mechanics
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
                        <h4 className="font-semibold">
                          Subscription Converter
                        </h4>
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
    </div>
  );
}
