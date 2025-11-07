import { useState } from "react";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  ChevronDown,
  RotateCcw,
  Send,
  Bot,
  User,
  Upload,
  CircleCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useApp } from "@/context/AppContext";

const agentTypeConfig = {
  onboarding: {
    title: "Onboarding Agent",
    color: "blue",
    bgColor: "bg-blue-50",
    textColor: "text-blue-600",
    borderColor: "border-blue-200",
  },
  sales: {
    title: "Sales Agent",
    color: "green",
    bgColor: "bg-green-50",
    textColor: "text-green-600",
    borderColor: "border-green-200",
  },
  support: {
    title: "Support Agent",
    color: "purple",
    bgColor: "bg-purple-50",
    textColor: "text-purple-600",
    borderColor: "border-purple-200",
  },
};

export default function AgentEdit() {
  const navigate = useNavigate();
  const { id } = useParams({ from: "/_authenticated/agents/$id/edit" });

  const { agents, handleSaveAgent } = useApp();
  const agent = agents.find((agent) => agent.id === Number(id));
  const agentConfig = Object.values(agentTypeConfig).find(
    (config) => config.color === agent?.iconColor
  );

  const [agentName, setAgentName] = useState(agent?.name ?? "");
  const [description, setDescription] = useState(agent?.description ?? "");
  const [objective, setObjective] = useState("");
  const [brandName, setBrandName] = useState("");
  const [industry, setIndustry] = useState("");
  const [tone, setTone] = useState("friendly");
  const [language, setLanguage] = useState("en");
  const [creativity, setCreativity] = useState([0.7]);
  const [systemPrompt, setSystemPrompt] = useState("");
  const [contextInfo, setContextInfo] = useState("");
  const [productCatalogue, setProductCatalogue] = useState("");
  const [highTouch, setHighTouch] = useState("");
  const [audience, setAudience] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // Track collapsible states
  const [openSections, setOpenSections] = useState({
    basicInfo: true,
    brandBusiness: true,
    behavior: false,
    aiConfig: false,
    channels: false,
    knowledge: false,
    productCatalogue: false,
    audience: false,
  });

  const [channels, setChannels] = useState({
    whatsapp: false,
    web: false,
    slack: false,
    telegram: false,
    sms: false,
  });
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<
    Array<{
      role: "user" | "agent";
      content: string;
      timestamp: string;
      type?: "info" | "loading";
    }>
  >([
    {
      role: "agent",
      content: "Chat preview - Test how your agent responds to messages",
      timestamp: "11:12 PM",
      type: "info",
    },
  ]);
  const [isSaved, setIsSaved] = useState(false);

  const handleFileUpload = (file: File) => {
    if (file.type === "text/csv" || file.name.endsWith(".csv")) {
      setUploadedFile(file);
      // Here you would typically process the CSV file
      console.log("File uploaded:", file.name);
    } else {
      alert("Please upload a CSV file");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

    const userMessage = {
      role: "user" as const,
      content: chatInput,
      timestamp: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, userMessage]);
    setChatInput("");

    // Add loading message
    const loadingMessage = {
      role: "agent" as const,
      content: "",
      timestamp: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      type: "loading" as const,
    };

    setTimeout(() => {
      setMessages((prev) => [...prev, loadingMessage]);
    }, 300);

    // Simulate agent response
    setTimeout(() => {
      setMessages((prev) => {
        // Remove loading message and add actual response
        const withoutLoading = prev.filter((msg) => msg.type !== "loading");
        const agentMessage = {
          role: "agent" as const,
          content: "Thanks for your message! I'm happy to help you out. 😊",
          timestamp: new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        return [...withoutLoading, agentMessage];
      });
    }, 1500);
  };

  const handleSave = () => {
    handleSaveAgent(agent?.id ?? 0, agentName, description);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 2000);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-4 flex-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate({ to: "/agents" })}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <Input
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
                className="text-gray-900 border-0 shadow-none px-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 max-w-md text-2xl font-semibold"
                placeholder="New Agent"
              />
              <Badge
                className={`${agentConfig?.bgColor} ${agentConfig?.textColor} ${agentConfig?.borderColor} border`}
              >
                {agentConfig?.title}
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isSaved && (
            <span className="text-green-600 text-sm flex items-center gap-1">
              <CircleCheck className="w-4 h-4" />
              Saved
            </span>
          )}
          <Button variant="outline" size="sm">
            Cancel
          </Button>
          <Button size="sm" onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Form Section */}
        <div className="flex-1 overflow-auto">
          <ScrollArea className="h-full">
            <div className="max-w-3xl mx-auto py-8 px-6">
              <div className="space-y-4">
                {/* Basic Information */}
                <Collapsible
                  open={openSections.basicInfo}
                  onOpenChange={(open) =>
                    setOpenSections({ ...openSections, basicInfo: open })
                  }
                >
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                    <CollapsibleTrigger className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                      <div className="text-left">
                        <h3 className="text-gray-900 flex items-center gap-2">
                          Basic Information
                        </h3>
                        <p className="text-gray-600 text-sm">
                          Agent name, description, and purpose
                        </p>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-400 transition-transform ${openSections.basicInfo ? "" : "-rotate-90"}`}
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="px-6 pb-6 space-y-4 border-t border-gray-100 pt-4">
                        <div>
                          <Label htmlFor="agent-name">Agent Name*</Label>
                          <Input
                            id="agent-name"
                            placeholder="e.g., SalesBot Pro"
                            value={agentName}
                            onChange={(e) => setAgentName(e.target.value)}
                            className="mt-1.5"
                          />
                        </div>
                        <div>
                          <Label htmlFor="agent-description">
                            Description*
                          </Label>
                          <Textarea
                            id="agent-description"
                            placeholder="Brief description of what this agent does"
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="mt-1.5"
                          />
                        </div>
                        <div>
                          <Label htmlFor="agent-objective">
                            Primary Objective*
                          </Label>
                          <Input
                            id="agent-objective"
                            placeholder="e.g., Qualify leads and book meetings"
                            value={objective}
                            onChange={(e) => setObjective(e.target.value)}
                            className="mt-1.5"
                          />
                        </div>
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>

                {/* Brand & Business */}
                <Collapsible
                  open={openSections.brandBusiness}
                  onOpenChange={(open) =>
                    setOpenSections({ ...openSections, brandBusiness: open })
                  }
                >
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                    <CollapsibleTrigger className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                      <div className="text-left">
                        <h3 className="text-gray-900 flex items-center gap-2">
                          Brand & Business
                        </h3>
                        <p className="text-gray-600 text-sm">
                          Company information and industry
                        </p>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-400 transition-transform ${openSections.brandBusiness ? "" : "-rotate-90"}`}
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="px-6 pb-6 space-y-4 border-t border-gray-100 pt-4">
                        <div>
                          <Label htmlFor="brand-name">Brand Name*</Label>
                          <Input
                            id="brand-name"
                            placeholder="Your company name"
                            value={brandName}
                            onChange={(e) => setBrandName(e.target.value)}
                            className="mt-1.5"
                          />
                        </div>
                        <div>
                          <Label htmlFor="industry">Industry*</Label>
                          <Select value={industry} onValueChange={setIndustry}>
                            <SelectTrigger
                              id="industry"
                              className="mt-1.5 w-full"
                            >
                              <SelectValue placeholder="Select industry" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="technology">
                                Technology
                              </SelectItem>
                              <SelectItem value="finance">Finance</SelectItem>
                              <SelectItem value="healthcare">
                                Healthcare
                              </SelectItem>
                              <SelectItem value="retail">Retail</SelectItem>
                              <SelectItem value="education">
                                Education
                              </SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>

                {/* Agent Behavior */}
                <Collapsible
                  open={openSections.behavior}
                  onOpenChange={(open) =>
                    setOpenSections({ ...openSections, behavior: open })
                  }
                >
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                    <CollapsibleTrigger className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                      <div className="text-left">
                        <h3 className="text-gray-900">Agent Behavior</h3>
                        <p className="text-gray-600 text-sm">
                          Communication style and personality
                        </p>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-400 transition-transform ${openSections.behavior ? "" : "-rotate-90"}`}
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="px-6 pb-6 space-y-4 border-t border-gray-100 pt-4">
                        <div>
                          <Label htmlFor="tone">Communication Tone</Label>
                          <Select value={tone} onValueChange={setTone}>
                            <SelectTrigger id="tone" className="mt-1.5 w-full">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="professional">
                                Professional
                              </SelectItem>
                              <SelectItem value="friendly">Friendly</SelectItem>
                              <SelectItem value="casual">Casual</SelectItem>
                              <SelectItem value="formal">Formal</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="language">Language</Label>
                          <Select value={language} onValueChange={setLanguage}>
                            <SelectTrigger
                              id="language"
                              className="mt-1.5 w-full"
                            >
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="en">English</SelectItem>
                              <SelectItem value="es">Spanish</SelectItem>
                              <SelectItem value="fr">French</SelectItem>
                              <SelectItem value="de">German</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="temperature">
                            Creativity Level: {creativity[0]}
                          </Label>
                          <Slider
                            id="temperature"
                            min={0}
                            max={1}
                            step={0.1}
                            value={creativity}
                            onValueChange={setCreativity}
                            className="mt-2"
                          />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>Focused</span>
                            <span>Creative</span>
                          </div>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>

                {/* AI Configuration */}
                <Collapsible
                  open={openSections.aiConfig}
                  onOpenChange={(open) =>
                    setOpenSections({ ...openSections, aiConfig: open })
                  }
                >
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                    <CollapsibleTrigger className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                      <div className="text-left">
                        <h3 className="text-gray-900 flex items-center gap-2">
                          AI Configuration
                        </h3>
                        <p className="text-gray-600 text-sm">
                          Model settings and system prompt
                        </p>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-400 transition-transform ${openSections.aiConfig ? "" : "-rotate-90"}`}
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="px-6 pb-6 space-y-4 border-t border-gray-100 pt-4">
                        <div>
                          <Label htmlFor="system-prompt">System Prompt*</Label>
                          <Textarea
                            id="system-prompt"
                            placeholder="Describe the agent's role, personality, and instructions..."
                            rows={6}
                            value={systemPrompt}
                            onChange={(e) => setSystemPrompt(e.target.value)}
                            className="mt-1.5 font-mono text-sm"
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            This defines how the AI behaves and responds
                          </p>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>

                {/* Channels */}
                <Collapsible
                  open={openSections.channels}
                  onOpenChange={(open) =>
                    setOpenSections({ ...openSections, channels: open })
                  }
                >
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                    <CollapsibleTrigger className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                      <div className="text-left">
                        <h3 className="text-gray-900 flex items-center gap-2">
                          Channels
                        </h3>
                        <p className="text-gray-600 text-sm">
                          Where your agent will operate
                        </p>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-400 transition-transform ${openSections.channels ? "" : "-rotate-90"}`}
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="px-6 pb-6 space-y-3 border-t border-gray-100 pt-4">
                        {[
                          { id: "whatsapp", label: "WhatsApp", emoji: "💬" },
                          { id: "web", label: "Web Chat", emoji: "🌐" },
                          { id: "slack", label: "Slack", emoji: "💼" },
                          { id: "telegram", label: "Telegram", emoji: "✈️" },
                          { id: "sms", label: "SMS", emoji: "📱" },
                        ].map((channel) => (
                          <div
                            key={channel.id}
                            className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-xl">{channel.emoji}</span>
                              <span className="text-gray-900">
                                {channel.label}
                              </span>
                            </div>
                            <Switch
                              checked={
                                channels[channel.id as keyof typeof channels]
                              }
                              onCheckedChange={(checked) =>
                                setChannels({
                                  ...channels,
                                  [channel.id]: checked,
                                })
                              }
                            />
                          </div>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>

                {/* Knowledge & Context */}
                <Collapsible
                  open={openSections.knowledge}
                  onOpenChange={(open) =>
                    setOpenSections({ ...openSections, knowledge: open })
                  }
                >
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                    <CollapsibleTrigger className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                      <div className="text-left">
                        <h3 className="text-gray-900">Knowledge & Context</h3>
                        <p className="text-gray-600 text-sm">
                          Information the agent has access to
                        </p>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-400 transition-transform ${openSections.knowledge ? "" : "-rotate-90"}`}
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="px-6 pb-6 space-y-4 border-t border-gray-100 pt-4">
                        <div>
                          <Label htmlFor="context-info">
                            Context Information
                          </Label>
                          <Textarea
                            id="context-info"
                            placeholder="Product details, pricing, FAQs, company policies, etc."
                            rows={4}
                            value={contextInfo}
                            onChange={(e) => setContextInfo(e.target.value)}
                            className="mt-1.5"
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Add relevant information the agent should know
                          </p>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>

                {/* Product Catalogue */}
                <Collapsible
                  open={openSections.productCatalogue}
                  onOpenChange={(open) =>
                    setOpenSections({ ...openSections, productCatalogue: open })
                  }
                >
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                    <CollapsibleTrigger className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                      <div className="text-left">
                        <h3 className="text-gray-900">Product Catalogue</h3>
                        <p className="text-gray-600 text-sm">
                          Subscription Plans
                        </p>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-400 transition-transform ${openSections.productCatalogue ? "" : "-rotate-90"}`}
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="px-6 pb-6 space-y-4 border-t border-gray-100 pt-4">
                        <div>
                          <Label htmlFor="product-catalogue">
                            Product / Plan
                          </Label>
                          <Textarea
                            id="product-catalogue"
                            placeholder="List products or subscription plans with details"
                            rows={6}
                            value={productCatalogue}
                            onChange={(e) =>
                              setProductCatalogue(e.target.value)
                            }
                            className="mt-1.5"
                          />
                        </div>

                        {/* Drag and Drop Upload Zone */}
                        <div
                          onDrop={handleDrop}
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer hover:bg-gray-50 ${
                            isDragging
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-300"
                          }`}
                          onClick={() =>
                            document.getElementById("csv-upload")?.click()
                          }
                        >
                          <input
                            id="csv-upload"
                            type="file"
                            accept=".csv"
                            onChange={handleFileInputChange}
                            className="hidden"
                          />
                          <div className="flex flex-col items-center gap-2">
                            <Upload
                              className={`w-8 h-8 ${isDragging ? "text-blue-500" : "text-gray-400"}`}
                            />
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {uploadedFile
                                  ? uploadedFile.name
                                  : "Upload CSV Product Catalog"}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {uploadedFile
                                  ? "Click to upload a different file"
                                  : "Drag and drop your CSV file here, or click to browse"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>

                {/* Audience*/}
                <Collapsible
                  open={openSections.audience}
                  onOpenChange={(open) =>
                    setOpenSections({ ...openSections, audience: open })
                  }
                >
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                    <CollapsibleTrigger className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                      <div className="text-left">
                        <h3 className="text-gray-900">Audience</h3>
                        <p className="text-gray-600 text-sm">
                          Choose how you want to add your audience.
                        </p>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-400 transition-transform ${openSections.audience ? "" : "-rotate-90"}`}
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="px-6 pb-6 space-y-4 border-t border-gray-100 pt-4">
                        <div>
                          <Label htmlFor="context-info">
                            Audience description
                          </Label>
                          <Textarea
                            id="context-info"
                            placeholder="Enter audience description."
                            rows={4}
                            value={audience}
                            onChange={(e) => setAudience(e.target.value)}
                            className="mt-1.5"
                          />
                        </div>
                        <div>
                          <Label htmlFor="industry">Hightouch segment</Label>
                          <Select
                            value={highTouch}
                            onValueChange={setHighTouch}
                          >
                            <SelectTrigger
                              id="industry"
                              className="mt-1.5 w-full"
                            >
                              <SelectValue placeholder="Select Hightouch" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="technology">
                                Stay at home mums
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>
              </div>
              <div className="h-20" />
            </div>
          </ScrollArea>
        </div>

        {/* Chat Preview Sidebar */}
        <div className="w-[400px] flex-shrink-0">
          <div className="h-full flex flex-col bg-white border-l border-gray-200">
            <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-gray-900">Chat Preview</h3>
                  <p className="text-gray-600 text-xs mt-0.5">Your Agent</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-600"
                  onClick={() =>
                    setMessages([
                      {
                        role: "agent",
                        content:
                          "Chat preview - Test how your agent responds to messages",
                        timestamp: "11:12 PM",
                        type: "info",
                      },
                    ])
                  }
                >
                  <RotateCcw className="w-4 h-4 mr-1" />
                  Reset
                </Button>
              </div>
            </div>
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`flex gap-3 max-w-[85%] ${
                        message.role === "user"
                          ? "flex-row-reverse"
                          : "flex-row"
                      }`}
                    >
                      <div
                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                          message.role === "user"
                            ? "bg-blue-600"
                            : message.type === "info"
                              ? "bg-gray-600"
                              : "bg-green-600"
                        }`}
                      >
                        {message.role === "user" ? (
                          <User className="w-4 h-4 text-white" />
                        ) : (
                          <Bot className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div className="flex flex-col gap-1">
                        <div
                          className={`rounded-lg px-4 py-2 ${
                            message.role === "user"
                              ? "bg-blue-600 text-white"
                              : message.type === "info"
                                ? "bg-yellow-50 text-yellow-900 border border-yellow-200"
                                : message.type === "loading"
                                  ? "bg-gray-100 text-gray-900"
                                  : "bg-gray-100 text-gray-900"
                          }`}
                        >
                          {message.type === "loading" ? (
                            <div className="flex items-center gap-2">
                              <div className="flex gap-1">
                                <span
                                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                  style={{ animationDelay: "0ms" }}
                                ></span>
                                <span
                                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                  style={{ animationDelay: "150ms" }}
                                ></span>
                                <span
                                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                  style={{ animationDelay: "300ms" }}
                                ></span>
                              </div>
                            </div>
                          ) : (
                            <p className="text-sm whitespace-pre-wrap">
                              {message.content}
                            </p>
                          )}
                        </div>
                        <div
                          className={`flex items-center gap-2 px-1 ${
                            message.role === "user"
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          <span className="text-xs text-gray-500">
                            {message.timestamp}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="p-4 border-t border-gray-200 bg-white flex-shrink-0">
              <div className="flex gap-2">
                <Input
                  placeholder="Type a message to test..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!chatInput.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Preview how your agent responds based on its configuration
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
