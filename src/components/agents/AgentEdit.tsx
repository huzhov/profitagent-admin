import { useEffect, useState } from "react";
import { useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft, ChevronDown, Upload, CircleCheck } from "lucide-react";
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
import { useQuery } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Resolver } from "react-hook-form";
import { getAgent } from "@/services/agents";
import {
  agentSchema,
  defaultAgentValues,
  type AgentFormValues,
} from "@/components/agent-builder/schema";
import { getWhatsAppList } from "@/services/integrations";
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

export default function AgentBuilder() {
  const navigate = useNavigate();

  const { id } = useParams({ from: "/_authenticated/agents/$id/edit" });
  const agentConfig = agentTypeConfig.onboarding;

  const resolver = zodResolver(
    agentSchema
  ) as unknown as Resolver<AgentFormValues>;

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AgentFormValues>({
    resolver: resolver,
    defaultValues: defaultAgentValues,
    mode: "onSubmit",
  });

  const { user } = useApp();

  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // Document Library state - Lee's categories
  const [productInfoDocs, setProductInfoDocs] = useState<File[]>([]);
  const [isProductInfoDragging, setIsProductInfoDragging] = useState(false);
  const [processWorkflowDocs, setProcessWorkflowDocs] = useState<File[]>([]);
  const [isProcessWorkflowDragging, setIsProcessWorkflowDragging] =
    useState(false);
  const [complianceDocs, setComplianceDocs] = useState<File[]>([]);
  const [isComplianceDragging, setIsComplianceDragging] = useState(false);
  const [customerEducationDocs, setCustomerEducationDocs] = useState<File[]>(
    []
  );
  const [isCustomerEducationDragging, setIsCustomerEducationDragging] =
    useState(false);
  const [salesMarketingDocs, setSalesMarketingDocs] = useState<File[]>([]);
  const [isSalesMarketingDragging, setIsSalesMarketingDragging] =
    useState(false);
  const [dataToolsDocs, setDataToolsDocs] = useState<File[]>([]);
  const [isDataToolsDragging, setIsDataToolsDragging] = useState(false);

  // Guardrails state
  const [profanityFilter, setProfanityFilter] = useState(true);

  // Messaging Controls state
  const [quietHoursEnabled, setQuietHoursEnabled] = useState(false);

  // HITL Handover state
  const [hitlEnabled, setHitlEnabled] = useState(false);

  // Scheduling state
  const [schedulingEnabled, setSchedulingEnabled] = useState(false);

  // Question Sets state
  const [questionSets, setQuestionSets] = useState<File[]>([]);
  const [isQuestionSetDragging, setIsQuestionSetDragging] = useState(false);
  const [questionSetInputMode, setQuestionSetInputMode] = useState<
    "upload" | "paste"
  >("upload");

  // Product Recommendations state
  const [recommendationsEnabled, setRecommendationsEnabled] = useState(false);

  // Track collapsible states
  const [openSections, setOpenSections] = useState({
    basicInfo: true,
    brandBusiness: true,
    behavior: true,
    aiConfig: true,
    channels: true,
    knowledge: false,
    productCatalogue: false,
    audience: false,
    productInfo: false,
    processWorkflow: false,
    compliance: false,
    customerEducation: false,
    salesMarketing: false,
    dataTools: false,
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
    whatsapp: true,
    web: false,
    slack: false,
    telegram: false,
    sms: false,
  });

  const [isSaved] = useState(false);

  const progress = 0; // Calculate based on filled fields

  const { data, isFetching } = useQuery({
    queryKey: ["whatsAppList"],
    queryFn: async () => {
      const data = await getWhatsAppList();
      return data;
    },
  });

  const { data: agentData, isFetched } = useQuery({
    queryKey: ["agents"],
    queryFn: async () => {
      const data = await getAgent(id);
      return data;
    },
  });
  useEffect(() => {
    if (isFetched) {
      setValue("agentName", agentData?.name || "");
      setValue("description", agentData?.description || "");
      setValue("systemPrompt", agentData?.systemPrompt || "");
      setValue("objective", agentData?.objective || "");
      setValue("integrationId", agentData?.wabaAccountId || "");
      setValue("creativity", agentData?.creativity || 0);
      setValue("toneOfVoice", agentData?.tone || "");
      setValue("integrationId", agentData?.wabaAccountId || "");
    }
  }, [isFetched]);

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

  const onSubmit = (values: any) => {
    setValue("businessId", user.businessId ?? "");

    // Debug Submit Values
    console.log(values);

    // mutate(values);
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
                value={watch("agentName")}
                onChange={(e) =>
                  setValue("agentName", e.target.value, {
                    shouldValidate: true,
                  })
                }
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
          {isSaved && (
            <span className="text-green-600 text-sm flex items-center gap-1">
              <CircleCheck className="w-4 h-4" />
              Saved
            </span>
          )}
          <Button variant="outline" size="sm">
            Cancel
          </Button>
          <Button size="sm" onClick={handleSubmit(onSubmit)}>
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
                          <Label
                            htmlFor="agent-name"
                            className={
                              errors.agentName
                                ? "text-red-500 text-sm mt-1"
                                : ""
                            }
                          >
                            Agent Name*
                          </Label>
                          <Input
                            id="agent-name"
                            placeholder="e.g., SalesBot Pro"
                            className={`mt-1.5`}
                            value={watch("agentName")}
                            onChange={(e) =>
                              setValue("agentName", e.target.value, {
                                shouldValidate: true,
                              })
                            }
                          />
                          {errors.agentName && (
                            <p className="text-xs text-red-500 text-sm mt-1">
                              {errors.agentName.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label
                            htmlFor="agent-description"
                            className={
                              errors.description
                                ? "text-red-500 text-sm mt-1"
                                : ""
                            }
                          >
                            Description*
                          </Label>
                          <Textarea
                            id="agent-description"
                            placeholder="Brief description of what this agent does"
                            rows={3}
                            value={watch("description")}
                            onChange={(e) =>
                              setValue("description", e.target.value, {
                                shouldValidate: true,
                              })
                            }
                            className="mt-1.5"
                          />
                          {errors.description && (
                            <p className="text-xs text-red-500 text-sm mt-1">
                              {errors.description.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label
                            htmlFor="agent-objective"
                            className={
                              errors.objective
                                ? "text-red-500 text-sm mt-1"
                                : ""
                            }
                          >
                            Primary Objective*
                          </Label>
                          <Input
                            id="agent-objective"
                            placeholder="e.g., Qualify leads and book meetings"
                            value={watch("objective")}
                            onChange={(e) =>
                              setValue("objective", e.target.value, {
                                shouldValidate: true,
                              })
                            }
                            className="mt-1.5"
                          />
                          {errors.objective && (
                            <p className="text-xs text-red-500 text-sm mt-1">
                              {errors.objective.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>

                {/* Brand & Business */}
                {/* <Collapsible
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
                            value={watch("brandName")}
                            onChange={(e) =>
                              setValue("brandName", e.target.value, {
                                shouldValidate: true,
                              })
                            }
                            className="mt-1.5"
                          />
                        </div>
                        <div>
                          <Label htmlFor="industry">Industry*</Label>
                          <Select
                            value={watch("industry")}
                            onValueChange={(value) =>
                              setValue("industry", value, {
                                shouldValidate: true,
                              })
                            }
                          >
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
                </Collapsible> */}

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
                          <Select
                            value={watch("toneOfVoice")}
                            onValueChange={(value) =>
                              setValue("toneOfVoice", value, {
                                shouldValidate: true,
                              })
                            }
                          >
                            <SelectTrigger
                              id="toneOfVoice"
                              className="mt-1.5 w-full"
                            >
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
                          <Label htmlFor="temperature">
                            Creativity Level: {watch("creativity")}
                          </Label>
                          <Slider
                            id="temperature"
                            min={0}
                            max={1}
                            step={0.1}
                            value={[watch("creativity")]}
                            onValueChange={(value) =>
                              setValue("creativity", value[0])
                            }
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
                          <Label
                            htmlFor="system-prompt"
                            className={
                              errors.systemPrompt
                                ? "text-red-500 text-sm mt-1"
                                : ""
                            }
                          >
                            System Prompt*
                          </Label>
                          <Textarea
                            id="system-prompt"
                            placeholder="Describe the agent's role, personality, and instructions..."
                            rows={6}
                            value={watch("systemPrompt")}
                            onChange={(e) =>
                              setValue("systemPrompt", e.target.value, {
                                shouldValidate: true,
                              })
                            }
                            className="mt-1.5 font-mono text-sm"
                          />
                          {errors.systemPrompt && (
                            <p className="text-xs text-red-500 text-sm mt-1">
                              {errors.systemPrompt.message}
                            </p>
                          )}
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
                          // { id: "web", label: "Web Chat", emoji: "🌐" },
                          // { id: "slack", label: "Slack", emoji: "💼" },
                          // { id: "telegram", label: "Telegram", emoji: "✈️" },
                          // { id: "sms", label: "SMS", emoji: "📱" },
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
                        {channels.whatsapp ? (
                          <div>
                            <Label
                              htmlFor="tone"
                              className={
                                errors.integrationId
                                  ? "text-red-500 text-sm mt-1"
                                  : ""
                              }
                            >
                              WhatsApp Integration*
                            </Label>
                            <Select
                              value={watch("integrationId")}
                              onValueChange={(value) =>
                                setValue("integrationId", value, {
                                  shouldValidate: true,
                                })
                              }
                              disabled={isFetching}
                            >
                              <SelectTrigger className="mt-1.5 w-full">
                                <SelectValue placeholder="Select WhatsApp Integration" />
                              </SelectTrigger>
                              <SelectContent>
                                {data?.map((whatApp) => (
                                  <SelectItem
                                    value={whatApp.id}
                                    key={whatApp.id}
                                  >
                                    {whatApp.name} • +
                                    {whatApp.displayPhoneNumber}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        ) : null}
                        {errors.integrationId && (
                          <p className="text-xs text-red-500 text-sm mt-1">
                            {errors.integrationId.message}
                          </p>
                        )}
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
                            value={watch("contextInfo")}
                            onChange={(e) =>
                              setValue("contextInfo", e.target.value)
                            }
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
                            value={watch("productPlans")}
                            onChange={(e) =>
                              setValue("productPlans", e.target.value, {
                                shouldValidate: true,
                              })
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
                            value={watch("audience")}
                            onChange={(e) =>
                              setValue("audience", e.target.value)
                            }
                            className="mt-1.5"
                          />
                        </div>
                        <div>
                          <Label htmlFor="industry">Hightouch segment</Label>
                          <Select
                            value={watch("highTouch")}
                            onValueChange={(value) =>
                              setValue("highTouch", value)
                            }
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

                {/* Product Information Documents */}
                <Collapsible
                  open={openSections.productInfo}
                  onOpenChange={(open) =>
                    setOpenSections({ ...openSections, productInfo: open })
                  }
                >
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                    <CollapsibleTrigger className="w-full px-6 py-4 flex items-center justify-between transition-colors hover:bg-gray-50 rounded-lg">
                      <div className="text-left">
                        <h3 className="text-gray-900">
                          Product Information Documents
                        </h3>
                        <p className="text-gray-600 text-sm">
                          Brochures, plan details, terms & conditions
                        </p>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-400 transition-transform ${openSections.productInfo ? "" : "-rotate-90"}`}
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="px-6 pb-6 space-y-4 border-t border-gray-100 pt-4">
                        <div
                          onDrop={(e) => {
                            e.preventDefault();
                            setIsProductInfoDragging(false);
                            const files = Array.from(e.dataTransfer.files);
                            const validFiles = files.filter(
                              (f) =>
                                f.type === "application/pdf" ||
                                f.type === "text/plain" ||
                                f.name.endsWith(".pdf") ||
                                f.name.endsWith(".txt")
                            );
                            if (validFiles.length > 0) {
                              setValue("productInfoDocs", [
                                ...productInfoDocs,
                                ...validFiles,
                              ]);
                            } else {
                              alert("Please upload PDF or text documents");
                            }
                          }}
                          onDragOver={(e) => {
                            e.preventDefault();
                            setIsProductInfoDragging(true);
                          }}
                          onDragLeave={(e) => {
                            e.preventDefault();
                            setIsProductInfoDragging(false);
                          }}
                          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer hover:bg-gray-50 ${
                            isProductInfoDragging
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-300"
                          }`}
                          onClick={() =>
                            document
                              .getElementById("product-info-upload")
                              ?.click()
                          }
                        >
                          <input
                            id="product-info-upload"
                            type="file"
                            accept=".pdf,.txt"
                            multiple
                            onChange={(e) => {
                              const files = Array.from(e.target.files || []);
                              if (files.length > 0) {
                                setValue("productInfoDocs", [
                                  ...productInfoDocs,
                                  ...files,
                                ]);
                              }
                            }}
                            className="hidden"
                          />
                          <div className="flex flex-col items-center gap-2">
                            <Upload
                              className={`w-8 h-8 ${isProductInfoDragging ? "text-blue-500" : "text-gray-400"}`}
                            />
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                Upload Product Documents
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                PDF or text files - Drag and drop or click to
                                browse
                              </p>
                            </div>
                          </div>
                        </div>

                        {productInfoDocs.length > 0 && (
                          <div className="space-y-2">
                            <Label>
                              Uploaded Documents ({productInfoDocs.length})
                            </Label>
                            {productInfoDocs.map((file, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                              >
                                <span className="text-sm">{file.name}</span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    setProductInfoDocs(
                                      productInfoDocs.filter(
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
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>

                {/* Processes & Workflows Documents */}
                <Collapsible
                  open={openSections.processWorkflow}
                  onOpenChange={(open) =>
                    setOpenSections({ ...openSections, processWorkflow: open })
                  }
                >
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                    <CollapsibleTrigger className="w-full px-6 py-4 flex items-center justify-between transition-colors hover:bg-gray-50 rounded-lg">
                      <div className="text-left">
                        <h3 className="text-gray-900">
                          Processes & Workflows Documents
                        </h3>
                        <p className="text-gray-600 text-sm">
                          Onboarding, claims, service guides
                        </p>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-400 transition-transform ${openSections.processWorkflow ? "" : "-rotate-90"}`}
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="px-6 pb-6 space-y-4 border-t border-gray-100 pt-4">
                        <div
                          onDrop={(e) => {
                            e.preventDefault();
                            setIsProcessWorkflowDragging(false);
                            const files = Array.from(e.dataTransfer.files);
                            const validFiles = files.filter(
                              (f) =>
                                f.type === "application/pdf" ||
                                f.type === "text/plain" ||
                                f.name.endsWith(".pdf") ||
                                f.name.endsWith(".txt")
                            );
                            if (validFiles.length > 0) {
                              setProcessWorkflowDocs([
                                ...processWorkflowDocs,
                                ...validFiles,
                              ]);
                            } else {
                              alert("Please upload PDF or text documents");
                            }
                          }}
                          onDragOver={(e) => {
                            e.preventDefault();
                            setIsProcessWorkflowDragging(true);
                          }}
                          onDragLeave={(e) => {
                            e.preventDefault();
                            setIsProcessWorkflowDragging(false);
                          }}
                          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer hover:bg-gray-50 ${
                            isProcessWorkflowDragging
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-300"
                          }`}
                          onClick={() =>
                            document
                              .getElementById("process-workflow-upload")
                              ?.click()
                          }
                        >
                          <input
                            id="process-workflow-upload"
                            type="file"
                            accept=".pdf,.txt"
                            multiple
                            onChange={(e) => {
                              const files = Array.from(e.target.files || []);
                              if (files.length > 0) {
                                setProcessWorkflowDocs([
                                  ...processWorkflowDocs,
                                  ...files,
                                ]);
                              }
                            }}
                            className="hidden"
                          />
                          <div className="flex flex-col items-center gap-2">
                            <Upload
                              className={`w-8 h-8 ${isProcessWorkflowDragging ? "text-blue-500" : "text-gray-400"}`}
                            />
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                Upload Process Documents
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                PDF or text files - Drag and drop or click to
                                browse
                              </p>
                            </div>
                          </div>
                        </div>

                        {processWorkflowDocs.length > 0 && (
                          <div className="space-y-2">
                            <Label>
                              Uploaded Documents ({processWorkflowDocs.length})
                            </Label>
                            {processWorkflowDocs.map((file, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                              >
                                <span className="text-sm">{file.name}</span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    setProcessWorkflowDocs(
                                      processWorkflowDocs.filter(
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
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>

                {/* Compliance & Regulatory Documents */}
                <Collapsible
                  open={openSections.compliance}
                  onOpenChange={(open) =>
                    setOpenSections({ ...openSections, compliance: open })
                  }
                >
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                    <CollapsibleTrigger className="w-full px-6 py-4 flex items-center justify-between transition-colors hover:bg-gray-50 rounded-lg">
                      <div className="text-left">
                        <h3 className="text-gray-900">
                          Compliance & Regulatory Documents
                        </h3>
                        <p className="text-gray-600 text-sm">
                          Disclosures, approved language, legal docs
                        </p>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-400 transition-transform ${openSections.compliance ? "" : "-rotate-90"}`}
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="px-6 pb-6 space-y-4 border-t border-gray-100 pt-4">
                        <div
                          onDrop={(e) => {
                            e.preventDefault();
                            setIsComplianceDragging(false);
                            const files = Array.from(e.dataTransfer.files);
                            const validFiles = files.filter(
                              (f) =>
                                f.type === "application/pdf" ||
                                f.type === "text/plain" ||
                                f.name.endsWith(".pdf") ||
                                f.name.endsWith(".txt")
                            );
                            if (validFiles.length > 0) {
                              setComplianceDocs([
                                ...complianceDocs,
                                ...validFiles,
                              ]);
                            } else {
                              alert("Please upload PDF or text documents");
                            }
                          }}
                          onDragOver={(e) => {
                            e.preventDefault();
                            setIsComplianceDragging(true);
                          }}
                          onDragLeave={(e) => {
                            e.preventDefault();
                            setIsComplianceDragging(false);
                          }}
                          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer hover:bg-gray-50 ${
                            isComplianceDragging
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-300"
                          }`}
                          onClick={() =>
                            document
                              .getElementById("compliance-upload")
                              ?.click()
                          }
                        >
                          <input
                            id="compliance-upload"
                            type="file"
                            accept=".pdf,.txt"
                            multiple
                            onChange={(e) => {
                              const files = Array.from(e.target.files || []);
                              if (files.length > 0) {
                                setComplianceDocs([
                                  ...complianceDocs,
                                  ...files,
                                ]);
                              }
                            }}
                            className="hidden"
                          />
                          <div className="flex flex-col items-center gap-2">
                            <Upload
                              className={`w-8 h-8 ${isComplianceDragging ? "text-blue-500" : "text-gray-400"}`}
                            />
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                Upload Compliance Documents
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                PDF or text files - Drag and drop or click to
                                browse
                              </p>
                            </div>
                          </div>
                        </div>

                        {complianceDocs.length > 0 && (
                          <div className="space-y-2">
                            <Label>
                              Uploaded Documents ({complianceDocs.length})
                            </Label>
                            {complianceDocs.map((file, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                              >
                                <span className="text-sm">{file.name}</span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    setComplianceDocs(
                                      complianceDocs.filter(
                                        (_, i) => i !== index
                                      )
                                    )
                                  }
                                >
                                  {/* Customer Education & FAQs Documents */}
                                  <Collapsible
                                    open={openSections.customerEducation}
                                    onOpenChange={(open) =>
                                      setOpenSections({
                                        ...openSections,
                                        customerEducation: open,
                                      })
                                    }
                                  >
                                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                                      <CollapsibleTrigger className="w-full px-6 py-4 flex items-center justify-between transition-colors hover:bg-gray-50 rounded-lg">
                                        <div className="text-left">
                                          <h3 className="text-gray-900">
                                            Customer Education & FAQs
                                          </h3>
                                          <p className="text-gray-600 text-sm">
                                            Explainers, how-tos, training docs
                                          </p>
                                        </div>
                                        <ChevronDown
                                          className={`w-5 h-5 text-gray-400 transition-transform ${openSections.customerEducation ? "" : "-rotate-90"}`}
                                        />
                                      </CollapsibleTrigger>
                                      <CollapsibleContent>
                                        <div className="px-6 pb-6 space-y-4 border-t border-gray-100 pt-4">
                                          <div
                                            onDrop={(e) => {
                                              e.preventDefault();
                                              setIsCustomerEducationDragging(
                                                false
                                              );
                                              const files = Array.from(
                                                e.dataTransfer.files
                                              );
                                              const validFiles = files.filter(
                                                (f) =>
                                                  f.type ===
                                                    "application/pdf" ||
                                                  f.type === "text/plain" ||
                                                  f.name.endsWith(".pdf") ||
                                                  f.name.endsWith(".txt")
                                              );
                                              if (validFiles.length > 0) {
                                                setCustomerEducationDocs([
                                                  ...customerEducationDocs,
                                                  ...validFiles,
                                                ]);
                                              } else {
                                                alert(
                                                  "Please upload PDF or text documents"
                                                );
                                              }
                                            }}
                                            onDragOver={(e) => {
                                              e.preventDefault();
                                              setIsCustomerEducationDragging(
                                                true
                                              );
                                            }}
                                            onDragLeave={(e) => {
                                              e.preventDefault();
                                              setIsCustomerEducationDragging(
                                                false
                                              );
                                            }}
                                            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer hover:bg-gray-50 ${
                                              isCustomerEducationDragging
                                                ? "border-blue-500 bg-blue-50"
                                                : "border-gray-300"
                                            }`}
                                            onClick={() =>
                                              document
                                                .getElementById(
                                                  "customer-education-upload"
                                                )
                                                ?.click()
                                            }
                                          >
                                            <input
                                              id="customer-education-upload"
                                              type="file"
                                              accept=".pdf,.txt"
                                              multiple
                                              onChange={(e) => {
                                                const files = Array.from(
                                                  e.target.files || []
                                                );
                                                if (files.length > 0) {
                                                  setCustomerEducationDocs([
                                                    ...customerEducationDocs,
                                                    ...files,
                                                  ]);
                                                }
                                              }}
                                              className="hidden"
                                            />
                                            <div className="flex flex-col items-center gap-2">
                                              <Upload
                                                className={`w-8 h-8 ${isCustomerEducationDragging ? "text-blue-500" : "text-gray-400"}`}
                                              />
                                              <div>
                                                <p className="text-sm font-medium text-gray-900">
                                                  Upload Customer Education
                                                  Documents
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                  PDF or text files - Drag and
                                                  drop or click to browse
                                                </p>
                                              </div>
                                            </div>
                                          </div>

                                          {customerEducationDocs.length > 0 && (
                                            <div className="space-y-2">
                                              <Label>
                                                Uploaded Documents (
                                                {customerEducationDocs.length})
                                              </Label>
                                              {customerEducationDocs.map(
                                                (file, index) => (
                                                  <div
                                                    key={index}
                                                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                                  >
                                                    <span className="text-sm">
                                                      {file.name}
                                                    </span>
                                                    <Button
                                                      variant="ghost"
                                                      size="sm"
                                                      onClick={() =>
                                                        setCustomerEducationDocs(
                                                          customerEducationDocs.filter(
                                                            (_, i) =>
                                                              i !== index
                                                          )
                                                        )
                                                      }
                                                    >
                                                      Remove
                                                    </Button>
                                                  </div>
                                                )
                                              )}
                                            </div>
                                          )}
                                        </div>
                                      </CollapsibleContent>
                                    </div>
                                  </Collapsible>
                                  {/* Sales & Marketing Documents */}
                                  <Collapsible
                                    open={openSections.salesMarketing}
                                    onOpenChange={(open) =>
                                      setOpenSections({
                                        ...openSections,
                                        salesMarketing: open,
                                      })
                                    }
                                  >
                                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                                      <CollapsibleTrigger className="w-full px-6 py-4 flex items-center justify-between transition-colors hover:bg-gray-50 rounded-lg">
                                        <div className="text-left">
                                          <h3 className="text-gray-900">
                                            Sales & Marketing Documents
                                          </h3>
                                          <p className="text-gray-600 text-sm">
                                            Scripts, tone guides, campaign
                                            materials
                                          </p>
                                        </div>
                                        <ChevronDown
                                          className={`w-5 h-5 text-gray-400 transition-transform ${openSections.salesMarketing ? "" : "-rotate-90"}`}
                                        />
                                      </CollapsibleTrigger>
                                      <CollapsibleContent>
                                        <div className="px-6 pb-6 space-y-4 border-t border-gray-100 pt-4">
                                          <div
                                            onDrop={(e) => {
                                              e.preventDefault();
                                              setIsSalesMarketingDragging(
                                                false
                                              );
                                              const files = Array.from(
                                                e.dataTransfer.files
                                              );
                                              const validFiles = files.filter(
                                                (f) =>
                                                  f.type ===
                                                    "application/pdf" ||
                                                  f.type === "text/plain" ||
                                                  f.name.endsWith(".pdf") ||
                                                  f.name.endsWith(".txt")
                                              );
                                              if (validFiles.length > 0) {
                                                setSalesMarketingDocs([
                                                  ...salesMarketingDocs,
                                                  ...validFiles,
                                                ]);
                                              } else {
                                                alert(
                                                  "Please upload PDF or text documents"
                                                );
                                              }
                                            }}
                                            onDragOver={(e) => {
                                              e.preventDefault();
                                              setIsSalesMarketingDragging(true);
                                            }}
                                            onDragLeave={(e) => {
                                              e.preventDefault();
                                              setIsSalesMarketingDragging(
                                                false
                                              );
                                            }}
                                            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer hover:bg-gray-50 ${
                                              isSalesMarketingDragging
                                                ? "border-blue-500 bg-blue-50"
                                                : "border-gray-300"
                                            }`}
                                            onClick={() =>
                                              document
                                                .getElementById(
                                                  "sales-marketing-upload"
                                                )
                                                ?.click()
                                            }
                                          >
                                            <input
                                              id="sales-marketing-upload"
                                              type="file"
                                              accept=".pdf,.txt"
                                              multiple
                                              onChange={(e) => {
                                                const files = Array.from(
                                                  e.target.files || []
                                                );
                                                if (files.length > 0) {
                                                  setSalesMarketingDocs([
                                                    ...salesMarketingDocs,
                                                    ...files,
                                                  ]);
                                                }
                                              }}
                                              className="hidden"
                                            />
                                            <div className="flex flex-col items-center gap-2">
                                              <Upload
                                                className={`w-8 h-8 ${isSalesMarketingDragging ? "text-blue-500" : "text-gray-400"}`}
                                              />
                                              <div>
                                                <p className="text-sm font-medium text-gray-900">
                                                  Upload Sales & Marketing
                                                  Documents
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                  PDF or text files - Drag and
                                                  drop or click to browse
                                                </p>
                                              </div>
                                            </div>
                                          </div>

                                          {salesMarketingDocs.length > 0 && (
                                            <div className="space-y-2">
                                              <Label>
                                                Uploaded Documents (
                                                {salesMarketingDocs.length})
                                              </Label>
                                              {salesMarketingDocs.map(
                                                (file, index) => (
                                                  <div
                                                    key={index}
                                                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                                  >
                                                    <span className="text-sm">
                                                      {file.name}
                                                    </span>
                                                    <Button
                                                      variant="ghost"
                                                      size="sm"
                                                      onClick={() =>
                                                        setSalesMarketingDocs(
                                                          salesMarketingDocs.filter(
                                                            (_, i) =>
                                                              i !== index
                                                          )
                                                        )
                                                      }
                                                    >
                                                      Remove
                                                    </Button>
                                                  </div>
                                                )
                                              )}
                                            </div>
                                          )}
                                        </div>
                                      </CollapsibleContent>
                                    </div>
                                  </Collapsible>
                                  {/* Data & Tools Documents */}
                                  <Collapsible
                                    open={openSections.dataTools}
                                    onOpenChange={(open) =>
                                      setOpenSections({
                                        ...openSections,
                                        dataTools: open,
                                      })
                                    }
                                  >
                                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                                      <CollapsibleTrigger className="w-full px-6 py-4 flex items-center justify-between transition-colors hover:bg-gray-50 rounded-lg">
                                        <div className="text-left">
                                          <h3 className="text-gray-900">
                                            Data & Tools Documents
                                          </h3>
                                          <p className="text-gray-600 text-sm">
                                            Pricing tables, calculators,
                                            API/logic files
                                          </p>
                                        </div>
                                        <ChevronDown
                                          className={`w-5 h-5 text-gray-400 transition-transform ${openSections.dataTools ? "" : "-rotate-90"}`}
                                        />
                                      </CollapsibleTrigger>
                                      <CollapsibleContent>
                                        <div className="px-6 pb-6 space-y-4 border-t border-gray-100 pt-4">
                                          <div
                                            onDrop={(e) => {
                                              e.preventDefault();
                                              setIsDataToolsDragging(false);
                                              const files = Array.from(
                                                e.dataTransfer.files
                                              );
                                              const validFiles = files.filter(
                                                (f) =>
                                                  f.type ===
                                                    "application/pdf" ||
                                                  f.type === "text/plain" ||
                                                  f.name.endsWith(".pdf") ||
                                                  f.name.endsWith(".txt")
                                              );
                                              if (validFiles.length > 0) {
                                                setDataToolsDocs([
                                                  ...dataToolsDocs,
                                                  ...validFiles,
                                                ]);
                                              } else {
                                                alert(
                                                  "Please upload PDF or text documents"
                                                );
                                              }
                                            }}
                                            onDragOver={(e) => {
                                              e.preventDefault();
                                              setIsDataToolsDragging(true);
                                            }}
                                            onDragLeave={(e) => {
                                              e.preventDefault();
                                              setIsDataToolsDragging(false);
                                            }}
                                            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer hover:bg-gray-50 ${
                                              isDataToolsDragging
                                                ? "border-blue-500 bg-blue-50"
                                                : "border-gray-300"
                                            }`}
                                            onClick={() =>
                                              document
                                                .getElementById(
                                                  "data-tools-upload"
                                                )
                                                ?.click()
                                            }
                                          >
                                            <input
                                              id="data-tools-upload"
                                              type="file"
                                              accept=".pdf,.txt"
                                              multiple
                                              onChange={(e) => {
                                                const files = Array.from(
                                                  e.target.files || []
                                                );
                                                if (files.length > 0) {
                                                  setDataToolsDocs([
                                                    ...dataToolsDocs,
                                                    ...files,
                                                  ]);
                                                }
                                              }}
                                              className="hidden"
                                            />
                                            <div className="flex flex-col items-center gap-2">
                                              <Upload
                                                className={`w-8 h-8 ${isDataToolsDragging ? "text-blue-500" : "text-gray-400"}`}
                                              />
                                              <div>
                                                <p className="text-sm font-medium text-gray-900">
                                                  Upload Data & Tools Documents
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                  PDF or text files - Drag and
                                                  drop or click to browse
                                                </p>
                                              </div>
                                            </div>
                                          </div>

                                          {dataToolsDocs.length > 0 && (
                                            <div className="space-y-2">
                                              <Label>
                                                Uploaded Documents (
                                                {dataToolsDocs.length})
                                              </Label>
                                              {dataToolsDocs.map(
                                                (file, index) => (
                                                  <div
                                                    key={index}
                                                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                                  >
                                                    <span className="text-sm">
                                                      {file.name}
                                                    </span>
                                                    <Button
                                                      variant="ghost"
                                                      size="sm"
                                                      onClick={() =>
                                                        setDataToolsDocs(
                                                          dataToolsDocs.filter(
                                                            (_, i) =>
                                                              i !== index
                                                          )
                                                        )
                                                      }
                                                    >
                                                      Remove
                                                    </Button>
                                                  </div>
                                                )
                                              )}
                                            </div>
                                          )}
                                        </div>
                                      </CollapsibleContent>
                                    </div>
                                  </Collapsible>
                                  Remove
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
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
                            value={watch("restrictedTopics")}
                            onChange={(e) =>
                              setValue("restrictedTopics", e.target.value)
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
                              value={watch("customProfanityWords")}
                              onChange={(e) =>
                                setValue("customProfanityWords", e.target.value)
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
                            checked={watch("piiHandling")}
                            onCheckedChange={(check) =>
                              setValue("piiHandling", check)
                            }
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
                            value={watch("escalationKeywords")}
                            onChange={(e) =>
                              setValue("escalationKeywords", e.target.value)
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
                            value={watch("brandVoiceRules")}
                            onChange={(e) =>
                              setValue("brandVoiceRules", e.target.value)
                            }
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
                            Follow-up Delay: {watch("followUpDelay")} hours
                          </Label>
                          <Slider
                            id="follow-up-delay"
                            min={1}
                            max={168}
                            step={1}
                            value={watch("followUpDelay")}
                            onValueChange={(value) =>
                              setValue("followUpDelay", value)
                            }
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
                            Maximum Follow-ups: {watch("maxFollowUps")}
                          </Label>
                          <Slider
                            id="max-followups"
                            min={0}
                            max={10}
                            step={1}
                            value={watch("maxFollowUps")}
                            onValueChange={(value) =>
                              setValue("maxFollowUps", value)
                            }
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
                                  value={watch("quietHoursStart")}
                                  onChange={(e) =>
                                    setValue("quietHoursStart", e.target.value)
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
                                  value={watch("quietHoursEnd")}
                                  onChange={(e) =>
                                    setValue("quietHoursEnd", e.target.value)
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
                                Daily Messages per User:{" "}
                                {watch("dailyMessageLimit")}
                              </Label>
                              <Slider
                                id="daily-limit"
                                min={1}
                                max={50}
                                step={1}
                                value={watch("dailyMessageLimit")}
                                onValueChange={(value) =>
                                  setValue("dailyMessageLimit", value)
                                }
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
                                {watch("monthlyMessageLimit")}
                              </Label>
                              <Slider
                                id="monthly-limit"
                                min={10}
                                max={500}
                                step={10}
                                value={watch("monthlyMessageLimit")}
                                onValueChange={(value) =>
                                  setValue("monthlyMessageLimit", value)
                                }
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
                                {watch("sentimentThreshold")}%
                              </Label>
                              <Slider
                                id="sentiment-threshold"
                                min={0}
                                max={100}
                                step={5}
                                value={watch("sentimentThreshold")}
                                onValueChange={(value) =>
                                  setValue("sentimentThreshold", value)
                                }
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
                                {watch("repeatedQuestionsCount")}
                              </Label>
                              <Slider
                                id="repeated-questions"
                                min={1}
                                max={10}
                                step={1}
                                value={watch("repeatedQuestionsCount")}
                                onValueChange={(value) =>
                                  setValue("repeatedQuestionsCount", value)
                                }
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
                                value={watch("hitlKeywords")}
                                onChange={(e) =>
                                  setValue("hitlKeywords", e.target.value)
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
                                value={watch("handoverMessage")}
                                onChange={(e) =>
                                  setValue("handoverMessage", e.target.value)
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
                            checked={watch("quickRepliesEnabled")}
                            onCheckedChange={(checked) =>
                              setValue("quickRepliesEnabled", checked)
                            }
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
                            checked={watch("ctaButtonsEnabled")}
                            onCheckedChange={(checked) =>
                              setValue("ctaButtonsEnabled", checked)
                            }
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
                            checked={watch("listMessagesEnabled")}
                            onCheckedChange={(checked) =>
                              setValue("listMessagesEnabled", checked)
                            }
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
                                value={watch("schedulingProvider")}
                                onValueChange={(value) =>
                                  setValue("schedulingProvider", value)
                                }
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

                            {watch("schedulingProvider") === "calendly" && (
                              <div>
                                <Label htmlFor="calendly-url">
                                  Calendly Event URL
                                </Label>
                                <Input
                                  id="calendly-url"
                                  placeholder="https://calendly.com/your-link/30min"
                                  value={watch("calendlyUrl")}
                                  onChange={(e) =>
                                    setValue("calendlyUrl", e.target.value)
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
                              value={watch("questionSetJson")}
                              onChange={(e) =>
                                setValue("questionSetJson", e.target.value)
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
                                Max Recommendations:{" "}
                                {watch("maxRecommendations")[0]}
                              </Label>
                              <Slider
                                id="max-recommendations"
                                min={1}
                                max={10}
                                step={1}
                                value={watch("maxRecommendations")}
                                onValueChange={(value) =>
                                  setValue("maxRecommendations", value)
                                }
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
                                value={watch("recommendationStrategy")}
                                onValueChange={(value) =>
                                  setValue("recommendationStrategy", value)
                                }
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
                                checked={watch("includeImages")}
                                onCheckedChange={(checked) =>
                                  setValue("includeImages", checked)
                                }
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
                            checked={watch("oneQuestionAtATime")}
                            onCheckedChange={(checked) =>
                              setValue("oneQuestionAtATime", checked)
                            }
                          />
                        </div>

                        <div>
                          <Label htmlFor="response-pacing">
                            Response Delay: {watch("responsePacing")}ms
                          </Label>
                          <Slider
                            id="response-pacing"
                            min={0}
                            max={5000}
                            step={100}
                            value={watch("responsePacing")}
                            onValueChange={(value) =>
                              setValue("responsePacing", value)
                            }
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
                            checked={watch("simulateTyping")}
                            onCheckedChange={(checked) =>
                              setValue("simulateTyping", checked)
                            }
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
      </div>
    </div>
  );
}
