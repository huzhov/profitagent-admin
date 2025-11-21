import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "@tanstack/react-router";
import { ArrowLeft, ChevronDown, Upload } from "lucide-react";
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
import { useMutation, useQuery } from "@tanstack/react-query";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Resolver } from "react-hook-form";
import { createAgent, getAgent } from "@/services/agents";
import {
  agentSchema,
  defaultAgentValues,
  type AgentFormValues,
} from "./schema";
import { getWhatsAppList } from "@/services/integrations";
import { useApp } from "@/context/AppContext";
import { stageUpload, uploadFile } from "@/services/upload";
import { toast } from "sonner";

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
  const location = useLocation();
  const isAgentCreate = location.pathname.includes("/create/");
  const isAgentEdit = location.pathname.includes("/edit");
  const params = useParams({ strict: false });
  const type = params.type || "";
  const id = params.id || "";

  const agentConfig =
    agentTypeConfig[type as keyof typeof agentTypeConfig] ||
    agentTypeConfig.onboarding;

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

  // // Document Library state - Lee's categories
  // const productInfoDocs = watch("productInfoDocs") ?? [];
  // const processWorkflowDocs = watch("processWorkflowDocs") ?? [];
  // const complianceDocs = watch("complianceDocs") ?? [];
  // const customerEducationDocs = watch("customerEducationDocs") ?? [];
  // const salesMarketingDocs = watch("salesMarketingDocs") ?? [];
  // const dataToolsDocs = watch("dataToolsDocs") ?? [];
  // const questionSets = watch("questionSets") ?? [];
  // const [isProductInfoDragging, setIsProductInfoDragging] = useState(false);
  // const [isProcessWorkflowDragging, setIsProcessWorkflowDragging] =
  //   useState(false);
  // const [isComplianceDragging, setIsComplianceDragging] = useState(false);
  // const [isCustomerEducationDragging, setIsCustomerEducationDragging] =
  //   useState(false);
  // const [isSalesMarketingDragging, setIsSalesMarketingDragging] =
  //   useState(false);
  // const [isDataToolsDragging, setIsDataToolsDragging] = useState(false);

  // // Guardrails state
  // const [profanityFilter, setProfanityFilter] = useState(true);

  // // Messaging Controls state
  // const [quietHoursEnabled, setQuietHoursEnabled] = useState(false);

  // // HITL Handover state
  // const [hitlEnabled, setHitlEnabled] = useState(false);

  // // Scheduling state
  // const [schedulingEnabled, setSchedulingEnabled] = useState(false);

  // // Question Sets state
  // const [isQuestionSetDragging, setIsQuestionSetDragging] = useState(false);
  // const [questionSetInputMode, setQuestionSetInputMode] = useState<
  //   "upload" | "paste"
  // >("upload");

  // // Product Recommendations state
  // const [recommendationsEnabled, setRecommendationsEnabled] = useState(false);

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

  // const [isSaved, setIsSaved] = useState(false);

  const progress = 0; // Calculate based on filled fields

  // Creating agent function
  const { mutate: createAgentFn } = useMutation({
    mutationFn: createAgent,
    onSuccess: (data) => {
      toast.success("Agent has been created successfully");
      navigate({ to: `/agents/${data.id}/view` });
    },
  });

  // Upload function
  const { mutate: uploadFileFn } = useMutation({
    mutationFn: uploadFile,
  });

  // Stage Upload function
  const { mutate: stageUploadFn } = useMutation({
    mutationFn: stageUpload,
    onSuccess: (data, variables) => {
      setValue("catalogS3Key", data.key);
      setValue("catalogName", variables.filename);

      // Call Upload Function
      uploadFileFn({ url: data.uploadUrl, file: uploadedFile });
    },
  });

  const { data: whatsAppListData, isFetching } = useQuery({
    queryKey: ["whatsAppList"],
    queryFn: async () => {
      return await getWhatsAppList();
    },
  });

  const { data: agentData, isFetchedAfterMount } = useQuery({
    queryKey: ["agents"],
    queryFn: async () => {
      return await getAgent(id);
    },
    enabled: id !== "",
  });

  useEffect(() => {
    if (isAgentEdit && isFetchedAfterMount) {
      setValue("agentName", agentData?.name || "");
      setValue("description", agentData?.description || "");
      setValue("systemPrompt", agentData?.systemPrompt || "");
      setValue("objective", agentData?.objective || "");
      setValue("integrationId", agentData?.wabaAccountId || "");
      setValue("creativity", agentData?.creativity || 0);
      setValue("toneOfVoice", agentData?.tone || "");
      setValue("integrationId", agentData?.wabaAccountId || "");
    }
  }, [isFetchedAfterMount]);

  const handleFileUpload = (file: File) => {
    if (file.type === "text/csv" || file.name.endsWith(".csv")) {
      // Here you would typically process the CSV file
      console.log("File uploaded:", file.name);

      setUploadedFile(file);

      // Call Endpoint
      stageUploadFn({
        filename: file.name,
        contentType: file.type,
      });
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

  const handleProductCatalogueFileInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  // const handleQuestionInputMode = (checked: boolean) => {
  //   setValue("questionSetJson", "");
  //   setValue("questionSets", []);
  //   setQuestionSetInputMode(checked ? "paste" : "upload");
  // };

  const onSubmit = (values: AgentFormValues) => {
    setValue("businessId", user.businessId ?? "");
    setValue("agentType", agentConfig.title);

    // Debug Submit Values
    values.businessId = user.businessId ?? "";
    values.agentType = agentConfig.title;
    console.log(values);

    if (isAgentCreate) createAgentFn(values);
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
          {/* {isSaved && (
            <span className="text-green-600 text-sm flex items-center gap-1">
              <CircleCheck className="w-4 h-4" />
              Saved
            </span>
          )} */}
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
                                {whatsAppListData?.map((whatApp) => (
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
                            onChange={handleProductCatalogueFileInputChange}
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
                                  : "Upload CSV Product Catalogue"}
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
              </div>
              <div className="h-20" />
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
