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

export default function AgentBuilder() {
  const navigate = useNavigate();
  const { type } = useParams({ from: "/_authenticated/agents/create/$type" });
  const agentConfig =
    agentTypeConfig[type as keyof typeof agentTypeConfig] ||
    agentTypeConfig.onboarding;

  const [agentName, setAgentName] = useState("New Agent");
  const [description, setDescription] = useState("");
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

  // Guardrails state
  const [restrictedTopics, setRestrictedTopics] = useState("");
  const [profanityFilter, setProfanityFilter] = useState(true);
  const [customProfanityWords, setCustomProfanityWords] = useState("");
  const [piiHandling, setPiiHandling] = useState(true);
  const [escalationKeywords, setEscalationKeywords] = useState("");
  const [brandVoiceRules, setBrandVoiceRules] = useState("");

  // Messaging Controls state
  const [followUpDelay, setFollowUpDelay] = useState([24]);
  const [maxFollowUps, setMaxFollowUps] = useState([3]);
  const [quietHoursEnabled, setQuietHoursEnabled] = useState(false);
  const [quietHoursStart, setQuietHoursStart] = useState("22:00");
  const [quietHoursEnd, setQuietHoursEnd] = useState("08:00");
  const [dailyMessageLimit, setDailyMessageLimit] = useState([10]);
  const [monthlyMessageLimit, setMonthlyMessageLimit] = useState([100]);

  // HITL Handover state
  const [hitlEnabled, setHitlEnabled] = useState(false);
  const [sentimentThreshold, setSentimentThreshold] = useState([30]);
  const [repeatedQuestionsCount, setRepeatedQuestionsCount] = useState([3]);
  const [hitlKeywords, setHitlKeywords] = useState("");
  const [handoverMessage, setHandoverMessage] = useState(
    "Let me connect you with a team member who can help you better."
  );

  // WhatsApp Components state
  const [quickRepliesEnabled, setQuickRepliesEnabled] = useState(true);
  const [ctaButtonsEnabled, setCtaButtonsEnabled] = useState(true);
  const [listMessagesEnabled, setListMessagesEnabled] = useState(true);

  // Scheduling state
  const [schedulingEnabled, setSchedulingEnabled] = useState(false);
  const [schedulingProvider, setSchedulingProvider] = useState("calendly");
  const [calendlyUrl, setCalendlyUrl] = useState("");

  // Question Sets state
  const [questionSets, setQuestionSets] = useState<File[]>([]);
  const [isQuestionSetDragging, setIsQuestionSetDragging] = useState(false);
  const [questionSetJson, setQuestionSetJson] = useState("");
  const [questionSetInputMode, setQuestionSetInputMode] = useState<
    "upload" | "paste"
  >("upload");

  // Product Recommendations state
  const [recommendationsEnabled, setRecommendationsEnabled] = useState(false);
  const [maxRecommendations, setMaxRecommendations] = useState([3]);
  const [recommendationStrategy, setRecommendationStrategy] =
    useState("popularity");
  const [includeImages, setIncludeImages] = useState(true);

  // Natural Conversation state
  const [oneQuestionAtATime, setOneQuestionAtATime] = useState(true);
  const [responsePacing, setResponsePacing] = useState([1500]);
  const [simulateTyping, setSimulateTyping] = useState(true);

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
    guardrails: false,
    messagingControls: false,
    hitlHandover: false,
    whatsappComponents: false,
    scheduling: false,
    questionSets: false,
    recommendations: false,
    conversationFlow: false,
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

  const progress = 0; // Calculate based on filled fields

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
                className={`${agentConfig.bgColor} ${agentConfig.textColor} ${agentConfig.borderColor} border`}
              >
                {agentConfig.title}
              </Badge>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex-1 max-w-xs bg-gray-200 rounded-full h-1.5">
                <div
                  className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-sm text-gray-600">
                {progress}% complete
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Cancel
          </Button>
          <Button size="sm">Save</Button>
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
                    <CollapsibleTrigger className="w-full px-6 py-4 flex items-center justify-between transition-colors hover:bg-gray-50 rounded-lg">
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
                    <CollapsibleTrigger className="w-full px-6 py-4 flex items-center justify-between transition-colors hover:bg-gray-50 rounded-lg">
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
                    <CollapsibleTrigger className="w-full px-6 py-4 flex items-center justify-between transition-colors hover:bg-gray-50 rounded-lg">
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
                    <CollapsibleTrigger className="w-full px-6 py-4 flex items-center justify-between transition-colors hover:bg-gray-50 rounded-lg">
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
                    <CollapsibleTrigger className="w-full px-6 py-4 flex items-center justify-between transition-colors hover:bg-gray-50 rounded-lg">
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
                    <CollapsibleTrigger className="w-full px-6 py-4 flex items-center justify-between transition-colors hover:bg-gray-50 rounded-lg">
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
                    <CollapsibleTrigger className="w-full px-6 py-4 flex items-center justify-between transition-colors hover:bg-gray-50 rounded-lg">
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
                    <CollapsibleTrigger className="w-full px-6 py-4 flex items-center justify-between transition-colors hover:bg-gray-50 rounded-lg">
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

                {/* Guardrails & Safety */}
                <Collapsible
                  open={openSections.guardrails}
                  onOpenChange={(open) =>
                    setOpenSections({ ...openSections, guardrails: open })
                  }
                >
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                    <CollapsibleTrigger className="w-full px-6 py-4 flex items-center justify-between transition-colors hover:bg-gray-50 rounded-lg">
                      <div className="text-left">
                        <h3 className="text-gray-900">Guardrails & Safety</h3>
                        <p className="text-gray-600 text-sm">
                          Define boundaries and safety mechanisms
                        </p>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-400 transition-transform ${openSections.guardrails ? "" : "-rotate-90"}`}
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="px-6 pb-6 space-y-4 border-t border-gray-100 pt-4">
                        <div>
                          <Label htmlFor="restricted-topics">
                            Restricted Topics
                          </Label>
                          <Textarea
                            id="restricted-topics"
                            placeholder="Enter topics the agent should avoid (one per line)&#10;e.g., Politics, Religion, Controversial subjects"
                            rows={3}
                            value={restrictedTopics}
                            onChange={(e) =>
                              setRestrictedTopics(e.target.value)
                            }
                            className="mt-1.5"
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Agent will politely decline to discuss these topics
                          </p>
                        </div>

                        <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
                          <div>
                            <Label className="text-sm font-medium">
                              Profanity Filter
                            </Label>
                            <p className="text-xs text-gray-500">
                              Automatically filter inappropriate language
                            </p>
                          </div>
                          <Switch
                            checked={profanityFilter}
                            onCheckedChange={setProfanityFilter}
                          />
                        </div>

                        {profanityFilter && (
                          <div>
                            <Label htmlFor="custom-profanity">
                              Custom Restricted Words
                            </Label>
                            <Textarea
                              id="custom-profanity"
                              placeholder="Add custom words to filter (comma-separated)"
                              rows={2}
                              value={customProfanityWords}
                              onChange={(e) =>
                                setCustomProfanityWords(e.target.value)
                              }
                              className="mt-1.5"
                            />
                          </div>
                        )}

                        <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
                          <div>
                            <Label className="text-sm font-medium">
                              PII Protection
                            </Label>
                            <p className="text-xs text-gray-500">
                              Mask personal information in logs
                            </p>
                          </div>
                          <Switch
                            checked={piiHandling}
                            onCheckedChange={setPiiHandling}
                          />
                        </div>

                        <div>
                          <Label htmlFor="escalation-keywords">
                            Escalation Keywords
                          </Label>
                          <Textarea
                            id="escalation-keywords"
                            placeholder="Keywords that trigger human handover&#10;e.g., speak to manager, urgent help, complaint"
                            rows={3}
                            value={escalationKeywords}
                            onChange={(e) =>
                              setEscalationKeywords(e.target.value)
                            }
                            className="mt-1.5"
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Agent will offer human assistance when these are
                            detected
                          </p>
                        </div>

                        <div>
                          <Label htmlFor="brand-voice-rules">
                            Brand Voice Guidelines
                          </Label>
                          <Textarea
                            id="brand-voice-rules"
                            placeholder="Define brand voice rules&#10;e.g., Always use 'we' not 'I', Avoid technical jargon, Use emojis sparingly"
                            rows={4}
                            value={brandVoiceRules}
                            onChange={(e) => setBrandVoiceRules(e.target.value)}
                            className="mt-1.5"
                          />
                        </div>
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>

                {/* Messaging Controls */}
                <Collapsible
                  open={openSections.messagingControls}
                  onOpenChange={(open) =>
                    setOpenSections({
                      ...openSections,
                      messagingControls: open,
                    })
                  }
                >
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                    <CollapsibleTrigger className="w-full px-6 py-4 flex items-center justify-between transition-colors hover:bg-gray-50 rounded-lg">
                      <div className="text-left">
                        <h3 className="text-gray-900">Messaging Controls</h3>
                        <p className="text-gray-600 text-sm">
                          Follow-up frequency and outbound limits
                        </p>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-400 transition-transform ${openSections.messagingControls ? "" : "-rotate-90"}`}
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="px-6 pb-6 space-y-4 border-t border-gray-100 pt-4">
                        <div>
                          <Label htmlFor="follow-up-delay">
                            Follow-up Delay: {followUpDelay[0]} hours
                          </Label>
                          <Slider
                            id="follow-up-delay"
                            min={1}
                            max={168}
                            step={1}
                            value={followUpDelay}
                            onValueChange={setFollowUpDelay}
                            className="mt-2"
                          />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>1 hour</span>
                            <span>1 week</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            Time to wait before sending a follow-up message
                          </p>
                        </div>

                        <div>
                          <Label htmlFor="max-followups">
                            Maximum Follow-ups: {maxFollowUps[0]}
                          </Label>
                          <Slider
                            id="max-followups"
                            min={0}
                            max={10}
                            step={1}
                            value={maxFollowUps}
                            onValueChange={setMaxFollowUps}
                            className="mt-2"
                          />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>None</span>
                            <span>10 attempts</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            Maximum follow-up attempts before stopping
                          </p>
                        </div>

                        <div className="border-t pt-4">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <Label className="text-sm font-medium">
                                Quiet Hours
                              </Label>
                              <p className="text-xs text-gray-500">
                                Prevent messages during specific hours
                              </p>
                            </div>
                            <Switch
                              checked={quietHoursEnabled}
                              onCheckedChange={setQuietHoursEnabled}
                            />
                          </div>

                          {quietHoursEnabled && (
                            <div className="grid grid-cols-2 gap-4 mt-3">
                              <div>
                                <Label
                                  htmlFor="quiet-start"
                                  className="text-sm"
                                >
                                  Start Time
                                </Label>
                                <Input
                                  id="quiet-start"
                                  type="time"
                                  value={quietHoursStart}
                                  onChange={(e) =>
                                    setQuietHoursStart(e.target.value)
                                  }
                                  className="mt-1.5"
                                />
                              </div>
                              <div>
                                <Label htmlFor="quiet-end" className="text-sm">
                                  End Time
                                </Label>
                                <Input
                                  id="quiet-end"
                                  type="time"
                                  value={quietHoursEnd}
                                  onChange={(e) =>
                                    setQuietHoursEnd(e.target.value)
                                  }
                                  className="mt-1.5"
                                />
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="border-t pt-4">
                          <Label className="text-sm font-medium mb-3 block">
                            Rate Limits
                          </Label>

                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="daily-limit" className="text-sm">
                                Daily Messages per User: {dailyMessageLimit[0]}
                              </Label>
                              <Slider
                                id="daily-limit"
                                min={1}
                                max={50}
                                step={1}
                                value={dailyMessageLimit}
                                onValueChange={setDailyMessageLimit}
                                className="mt-2"
                              />
                              <p className="text-xs text-gray-500 mt-1">
                                Maximum messages sent to a single user per day
                              </p>
                            </div>

                            <div>
                              <Label
                                htmlFor="monthly-limit"
                                className="text-sm"
                              >
                                Monthly Messages per User:{" "}
                                {monthlyMessageLimit[0]}
                              </Label>
                              <Slider
                                id="monthly-limit"
                                min={10}
                                max={500}
                                step={10}
                                value={monthlyMessageLimit}
                                onValueChange={setMonthlyMessageLimit}
                                className="mt-2"
                              />
                              <p className="text-xs text-gray-500 mt-1">
                                Maximum messages sent to a single user per month
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>
                {/* Human-In-The-Loop Handover */}
                <Collapsible
                  open={openSections.hitlHandover}
                  onOpenChange={(open) =>
                    setOpenSections({ ...openSections, hitlHandover: open })
                  }
                >
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                    <CollapsibleTrigger className="w-full px-6 py-4 flex items-center justify-between transition-colors hover:bg-gray-50 rounded-lg">
                      <div className="text-left">
                        <h3 className="text-gray-900">Human Handover</h3>
                        <p className="text-gray-600 text-sm">
                          Configure when to escalate to human operators
                        </p>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-400 transition-transform ${openSections.hitlHandover ? "" : "-rotate-90"}`}
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="px-6 pb-6 space-y-4 border-t border-gray-100 pt-4">
                        <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
                          <div>
                            <Label className="text-sm font-medium">
                              Enable Human Handover
                            </Label>
                            <p className="text-xs text-gray-500">
                              Allow escalation to human operators
                            </p>
                          </div>
                          <Switch
                            checked={hitlEnabled}
                            onCheckedChange={setHitlEnabled}
                          />
                        </div>

                        {hitlEnabled && (
                          <>
                            <div>
                              <Label htmlFor="sentiment-threshold">
                                Negative Sentiment Threshold:{" "}
                                {sentimentThreshold[0]}%
                              </Label>
                              <Slider
                                id="sentiment-threshold"
                                min={0}
                                max={100}
                                step={5}
                                value={sentimentThreshold}
                                onValueChange={setSentimentThreshold}
                                className="mt-2"
                              />
                              <p className="text-xs text-gray-500 mt-1">
                                Trigger handover when customer sentiment drops
                                below this level
                              </p>
                            </div>

                            <div>
                              <Label htmlFor="repeated-questions">
                                Repeated Questions Count:{" "}
                                {repeatedQuestionsCount[0]}
                              </Label>
                              <Slider
                                id="repeated-questions"
                                min={1}
                                max={10}
                                step={1}
                                value={repeatedQuestionsCount}
                                onValueChange={setRepeatedQuestionsCount}
                                className="mt-2"
                              />
                              <p className="text-xs text-gray-500 mt-1">
                                Escalate if customer asks same question this
                                many times
                              </p>
                            </div>

                            <div>
                              <Label htmlFor="hitl-keywords">
                                Handover Trigger Keywords
                              </Label>
                              <Textarea
                                id="hitl-keywords"
                                placeholder="Enter keywords (one per line)&#10;e.g., speak to manager, human help, talk to person"
                                rows={3}
                                value={hitlKeywords}
                                onChange={(e) =>
                                  setHitlKeywords(e.target.value)
                                }
                                className="mt-1.5"
                              />
                            </div>

                            <div>
                              <Label htmlFor="handover-message">
                                Handover Message
                              </Label>
                              <Textarea
                                id="handover-message"
                                placeholder="Message shown when transferring to human"
                                rows={2}
                                value={handoverMessage}
                                onChange={(e) =>
                                  setHandoverMessage(e.target.value)
                                }
                                className="mt-1.5"
                              />
                            </div>
                          </>
                        )}
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>

                {/* WhatsApp Native Components */}
                <Collapsible
                  open={openSections.whatsappComponents}
                  onOpenChange={(open) =>
                    setOpenSections({
                      ...openSections,
                      whatsappComponents: open,
                    })
                  }
                >
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                    <CollapsibleTrigger className="w-full px-6 py-4 flex items-center justify-between transition-colors hover:bg-gray-50 rounded-lg">
                      <div className="text-left">
                        <h3 className="text-gray-900">WhatsApp Components</h3>
                        <p className="text-gray-600 text-sm">
                          Configure interactive message formats
                        </p>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-400 transition-transform ${openSections.whatsappComponents ? "" : "-rotate-90"}`}
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="px-6 pb-6 space-y-3 border-t border-gray-100 pt-4">
                        <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
                          <div>
                            <Label className="text-sm font-medium">
                              Quick Reply Buttons
                            </Label>
                            <p className="text-xs text-gray-500">
                              Use for 2-3 simple choices (Yes/No, options)
                            </p>
                          </div>
                          <Switch
                            checked={quickRepliesEnabled}
                            onCheckedChange={setQuickRepliesEnabled}
                          />
                        </div>

                        <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
                          <div>
                            <Label className="text-sm font-medium">
                              Call-to-Action Buttons
                            </Label>
                            <p className="text-xs text-gray-500">
                              Use for links and phone calls (Visit Website, Call
                              Us)
                            </p>
                          </div>
                          <Switch
                            checked={ctaButtonsEnabled}
                            onCheckedChange={setCtaButtonsEnabled}
                          />
                        </div>

                        <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
                          <div>
                            <Label className="text-sm font-medium">
                              List Messages
                            </Label>
                            <p className="text-xs text-gray-500">
                              Use for 4-10 options (Product menu, Services)
                            </p>
                          </div>
                          <Switch
                            checked={listMessagesEnabled}
                            onCheckedChange={setListMessagesEnabled}
                          />
                        </div>

                        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <p className="text-sm text-blue-900">
                            <strong>Auto-Selection Rules:</strong> Agent will
                            automatically choose the best component type based
                            on context and number of options.
                          </p>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>

                {/* Appointment Scheduling */}
                <Collapsible
                  open={openSections.scheduling}
                  onOpenChange={(open) =>
                    setOpenSections({ ...openSections, scheduling: open })
                  }
                >
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                    <CollapsibleTrigger className="w-full px-6 py-4 flex items-center justify-between transition-colors hover:bg-gray-50 rounded-lg">
                      <div className="text-left">
                        <h3 className="text-gray-900">
                          Appointment Scheduling
                        </h3>
                        <p className="text-gray-600 text-sm">
                          Enable calendar booking capabilities
                        </p>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-400 transition-transform ${openSections.scheduling ? "" : "-rotate-90"}`}
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="px-6 pb-6 space-y-4 border-t border-gray-100 pt-4">
                        <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
                          <div>
                            <Label className="text-sm font-medium">
                              Enable Scheduling
                            </Label>
                            <p className="text-xs text-gray-500">
                              Allow customers to book appointments
                            </p>
                          </div>
                          <Switch
                            checked={schedulingEnabled}
                            onCheckedChange={setSchedulingEnabled}
                          />
                        </div>

                        {schedulingEnabled && (
                          <>
                            <div>
                              <Label htmlFor="scheduling-provider">
                                Calendar Provider
                              </Label>
                              <Select
                                value={schedulingProvider}
                                onValueChange={setSchedulingProvider}
                              >
                                <SelectTrigger
                                  id="scheduling-provider"
                                  className="mt-1.5 w-full"
                                >
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="calendly">
                                    Calendly
                                  </SelectItem>
                                  <SelectItem value="google">
                                    Google Calendar
                                  </SelectItem>
                                  <SelectItem value="outlook">
                                    Outlook Calendar
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            {schedulingProvider === "calendly" && (
                              <div>
                                <Label htmlFor="calendly-url">
                                  Calendly Event URL
                                </Label>
                                <Input
                                  id="calendly-url"
                                  placeholder="https://calendly.com/your-link/30min"
                                  value={calendlyUrl}
                                  onChange={(e) =>
                                    setCalendlyUrl(e.target.value)
                                  }
                                  className="mt-1.5"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                  Get this URL from your Calendly event settings
                                </p>
                              </div>
                            )}

                            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                              <p className="text-sm text-green-900">
                                <strong>How it works:</strong> Agent will offer
                                booking options and send customers a link to
                                schedule appointments directly.
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>

                {/* Question Sets */}
                <Collapsible
                  open={openSections.questionSets}
                  onOpenChange={(open) =>
                    setOpenSections({ ...openSections, questionSets: open })
                  }
                >
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                    <CollapsibleTrigger className="w-full px-6 py-4 flex items-center justify-between transition-colors hover:bg-gray-50 rounded-lg">
                      <div className="text-left">
                        <h3 className="text-gray-900">Question Sets</h3>
                        <p className="text-gray-600 text-sm">
                          Upload structured question flows (JSON)
                        </p>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-400 transition-transform ${openSections.questionSets ? "" : "-rotate-90"}`}
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="px-6 pb-6 space-y-4 border-t border-gray-100 pt-4">
                        {/* Toggle between Upload and Paste */}
                        <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
                          <div>
                            <Label className="text-sm font-medium">
                              {questionSetInputMode === "upload"
                                ? "Upload JSON File"
                                : "Paste JSON Code"}
                            </Label>
                            <p className="text-xs text-gray-500">
                              {questionSetInputMode === "upload"
                                ? "Upload a JSON file from your computer"
                                : "Paste JSON code directly into the editor"}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-sm ${questionSetInputMode === "upload" ? "text-gray-900 font-medium" : "text-gray-500"}`}
                            >
                              Upload
                            </span>
                            <Switch
                              checked={questionSetInputMode === "paste"}
                              onCheckedChange={(checked) =>
                                setQuestionSetInputMode(
                                  checked ? "paste" : "upload"
                                )
                              }
                            />
                            <span
                              className={`text-sm ${questionSetInputMode === "paste" ? "text-gray-900 font-medium" : "text-gray-500"}`}
                            >
                              Paste
                            </span>
                          </div>
                        </div>

                        {questionSetInputMode === "upload" ? (
                          <>
                            <div
                              onDrop={(e) => {
                                e.preventDefault();
                                setIsQuestionSetDragging(false);
                                const file = e.dataTransfer.files[0];
                                if (file && file.type === "application/json") {
                                  setQuestionSets([...questionSets, file]);
                                } else {
                                  alert("Please upload a JSON file");
                                }
                              }}
                              onDragOver={(e) => {
                                e.preventDefault();
                                setIsQuestionSetDragging(true);
                              }}
                              onDragLeave={(e) => {
                                e.preventDefault();
                                setIsQuestionSetDragging(false);
                              }}
                              className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer hover:bg-gray-50 ${
                                isQuestionSetDragging
                                  ? "border-blue-500 bg-blue-50"
                                  : "border-gray-300"
                              }`}
                              onClick={() =>
                                document.getElementById("json-upload")?.click()
                              }
                            >
                              <input
                                id="json-upload"
                                type="file"
                                accept=".json"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    setQuestionSets([...questionSets, file]);
                                  }
                                }}
                                className="hidden"
                              />
                              <div className="flex flex-col items-center gap-2">
                                <Upload
                                  className={`w-8 h-8 ${isQuestionSetDragging ? "text-blue-500" : "text-gray-400"}`}
                                />
                                <div>
                                  <p className="text-sm font-medium text-gray-900">
                                    Upload Question Set JSON
                                  </p>
                                  <p className="text-xs text-gray-500 mt-1">
                                    Drag and drop or click to browse
                                  </p>
                                </div>
                              </div>
                            </div>

                            {questionSets.length > 0 && (
                              <div className="space-y-2">
                                <Label>Uploaded Question Sets</Label>
                                {questionSets.map((file, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                  >
                                    <span className="text-sm">{file.name}</span>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() =>
                                        setQuestionSets(
                                          questionSets.filter(
                                            (_, i) => i !== index
                                          )
                                        )
                                      }
                                    >
                                      Remove
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </>
                        ) : (
                          <div>
                            <Textarea
                              id="question-set-json"
                              placeholder='Paste your JSON question set here, e.g.:
{
  "questions": [
    {
      "id": "q1",
      "text": "What is your name?",
      "type": "text"
    }
  ]
}'
                              rows={12}
                              value={questionSetJson}
                              onChange={(e) =>
                                setQuestionSetJson(e.target.value)
                              }
                              className="mt-1.5 font-mono text-sm"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                              Paste your JSON question set configuration
                            </p>
                          </div>
                        )}

                        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <p className="text-sm text-yellow-900">
                            <strong>JSON Format:</strong>{" "}
                            {questionSetInputMode === "upload"
                              ? "Upload"
                              : "Paste"}{" "}
                            structured question flows with conditional logic for
                            data collection.
                          </p>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>

                {/* Product Recommendations */}
                <Collapsible
                  open={openSections.recommendations}
                  onOpenChange={(open) =>
                    setOpenSections({ ...openSections, recommendations: open })
                  }
                >
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                    <CollapsibleTrigger className="w-full px-6 py-4 flex items-center justify-between transition-colors hover:bg-gray-50 rounded-lg">
                      <div className="text-left">
                        <h3 className="text-gray-900">
                          Product Recommendations
                        </h3>
                        <p className="text-gray-600 text-sm">
                          Configure intelligent product suggestions
                        </p>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-400 transition-transform ${openSections.recommendations ? "" : "-rotate-90"}`}
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="px-6 pb-6 space-y-4 border-t border-gray-100 pt-4">
                        <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
                          <div>
                            <Label className="text-sm font-medium">
                              Enable Recommendations
                            </Label>
                            <p className="text-xs text-gray-500">
                              Suggest products based on customer needs
                            </p>
                          </div>
                          <Switch
                            checked={recommendationsEnabled}
                            onCheckedChange={setRecommendationsEnabled}
                          />
                        </div>

                        {recommendationsEnabled && (
                          <>
                            <div>
                              <Label htmlFor="max-recommendations">
                                Max Recommendations: {maxRecommendations[0]}
                              </Label>
                              <Slider
                                id="max-recommendations"
                                min={1}
                                max={10}
                                step={1}
                                value={maxRecommendations}
                                onValueChange={setMaxRecommendations}
                                className="mt-2"
                              />
                              <p className="text-xs text-gray-500 mt-1">
                                Maximum products to suggest per message
                              </p>
                            </div>

                            <div>
                              <Label htmlFor="recommendation-strategy">
                                Recommendation Strategy
                              </Label>
                              <Select
                                value={recommendationStrategy}
                                onValueChange={setRecommendationStrategy}
                              >
                                <SelectTrigger
                                  id="recommendation-strategy"
                                  className="mt-1.5 w-full"
                                >
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="popularity">
                                    Popularity-Based
                                  </SelectItem>
                                  <SelectItem value="collaborative">
                                    Collaborative Filtering
                                  </SelectItem>
                                  <SelectItem value="content_based">
                                    Content-Based
                                  </SelectItem>
                                  <SelectItem value="rule_based">
                                    Rule-Based
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
                              <div>
                                <Label className="text-sm font-medium">
                                  Include Product Images
                                </Label>
                                <p className="text-xs text-gray-500">
                                  Show images with recommendations
                                </p>
                              </div>
                              <Switch
                                checked={includeImages}
                                onCheckedChange={setIncludeImages}
                              />
                            </div>
                          </>
                        )}
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>

                {/* Natural Conversation Flow */}
                <Collapsible
                  open={openSections.conversationFlow}
                  onOpenChange={(open) =>
                    setOpenSections({ ...openSections, conversationFlow: open })
                  }
                >
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                    <CollapsibleTrigger className="w-full px-6 py-4 flex items-center justify-between transition-colors hover:bg-gray-50 rounded-lg">
                      <div className="text-left">
                        <h3 className="text-gray-900">Conversation Flow</h3>
                        <p className="text-gray-600 text-sm">
                          Natural, humanistic conversation pacing
                        </p>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-400 transition-transform ${openSections.conversationFlow ? "" : "-rotate-90"}`}
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="px-6 pb-6 space-y-4 border-t border-gray-100 pt-4">
                        <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
                          <div>
                            <Label className="text-sm font-medium">
                              One Question at a Time
                            </Label>
                            <p className="text-xs text-gray-500">
                              Present questions individually for natural flow
                            </p>
                          </div>
                          <Switch
                            checked={oneQuestionAtATime}
                            onCheckedChange={setOneQuestionAtATime}
                          />
                        </div>

                        <div>
                          <Label htmlFor="response-pacing">
                            Response Delay: {responsePacing[0]}ms
                          </Label>
                          <Slider
                            id="response-pacing"
                            min={0}
                            max={5000}
                            step={100}
                            value={responsePacing}
                            onValueChange={setResponsePacing}
                            className="mt-2"
                          />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>Instant</span>
                            <span>5 seconds</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            Delay before sending response (simulates thinking)
                          </p>
                        </div>

                        <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
                          <div>
                            <Label className="text-sm font-medium">
                              Typing Indicator
                            </Label>
                            <p className="text-xs text-gray-500">
                              Show typing animation before responding
                            </p>
                          </div>
                          <Switch
                            checked={simulateTyping}
                            onCheckedChange={setSimulateTyping}
                          />
                        </div>

                        <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                          <p className="text-sm text-purple-900">
                            <strong>Natural Feel:</strong> These settings create
                            a more human-like conversation experience.
                          </p>
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
