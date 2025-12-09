// React
import { useState, useEffect, useRef, useMemo } from "react";

// Third-party libraries
import {
  useNavigate,
  useParams,
  useLocation,
  useRouter,
  useCanGoBack,
} from "@tanstack/react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import type { Resolver, FieldErrors } from "react-hook-form";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import {
  ArrowLeft,
  Book,
  BookOpen,
  ChevronDown,
  FileQuestionMark,
  Info,
  Loader2,
  MessageSquare,
  Monitor,
  Upload,
  Zap,
} from "lucide-react";

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ValidatedInput } from "@/components/ui/validated-input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { Spinner } from "@/components/ui/spinner";

// Services
import {
  createAgent,
  getAgent,
  checkIfAgentExists,
  updateAgent,
} from "@/services/agents";
import { getWhatsAppList } from "@/services/integrations";
import { stageUpload, uploadFile } from "@/services/upload";

// Hooks
import { useNameValidation } from "@/hooks/useNameValidation";

// Utils
import { handleAgentMutationError } from "@/lib/agentErrorHandler";

// Types
import type { WhatsAppResponse } from "@/types/integrations";

// Local
import {
  agentSchema,
  defaultAgentValues,
  type AgentFormValues,
} from "./schema";
import QuestionSets from "./QuestionSets";
import { WhatsAppIcon } from "../assets";

const navigationSection = [
  {
    id: "basicInfo",
    title: "Basic Information",
    icon: Info,
  },
  {
    id: "behavior",
    title: "Agent Behavior",
    icon: MessageSquare,
  },
  {
    id: "aiConfig",
    title: "AI Configuration",
    icon: Zap,
  },
  {
    id: "channels",
    title: "Channels",
    icon: Monitor,
  },
  {
    id: "knowledge",
    title: "Knowledge & Context",
    icon: BookOpen,
  },
  {
    id: "productCatalogue",
    title: "Product Catalogue",
    icon: Book,
  },
  {
    id: "questionSets",
    title: "Question Sets",
    icon: FileQuestionMark,
  },
];

export default function AgentBuilder() {
  const navigate = useNavigate();
  const location = useLocation();
  const canGoBack = useCanGoBack();
  const router = useRouter();
  const isAgentCreate = location.pathname.includes("/create");
  const isAgentEdit = location.pathname.includes("/edit");
  const params = useParams({ strict: false });
  const id = params.id || "";

  const basicInfoRef = useRef<HTMLDivElement>(null);
  const behavior = useRef<HTMLDivElement>(null);
  const aiConfig = useRef<HTMLDivElement>(null);
  const channelsRef = useRef<HTMLDivElement>(null);
  const knowledgeRef = useRef<HTMLDivElement>(null);
  const productCatalogueRef = useRef<HTMLDivElement>(null);
  const questionSetsRef = useRef<HTMLDivElement>(null);

  const resolver = zodResolver(
    agentSchema
  ) as unknown as Resolver<AgentFormValues>;

  const {
    handleSubmit,
    setValue,
    control,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<AgentFormValues>({
    resolver: resolver,
    defaultValues: defaultAgentValues,
    mode: "onSubmit",
  });

  const [isDragging, setIsDragging] = useState(false);

  // Computed initial states based on mode
  const getDefaultOpenSections = () => ({
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

  const getDefaultChannels = () => ({
    whatsapp: true,
    web: false,
    slack: false,
    telegram: false,
    sms: false,
  });

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [csvValidationError, setCsvValidationError] = useState<string | null>(
    null
  );
  const [openSections, setOpenSections] = useState(getDefaultOpenSections);
  const [channels, setChannels] = useState(getDefaultChannels);
  const [uploadedCatalogKey, setUploadedCatalogKey] = useState<string | null>(
    null
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  const formValues = useWatch({
    control,
    name: [
      "agentName",
      "description",
      "objective",
      "systemPrompt",
      "whatsappIntegrationId",
      "catalogS3Key",
      "catalogName",
    ],
  });

  const agentName = useWatch({ control, name: "agentName" });
  const description = useWatch({ control, name: "description" });
  const objective = useWatch({ control, name: "objective" });
  const toneOfVoice = useWatch({ control, name: "toneOfVoice" });
  const creativity = useWatch({ control, name: "creativity" });
  const systemPrompt = useWatch({ control, name: "systemPrompt" });
  const whatsappIntegrationId = useWatch({
    control,
    name: "whatsappIntegrationId",
  });
  const faqsBestAnswers = useWatch({ control, name: "faqsBestAnswers" });
  const productPlans = useWatch({ control, name: "productPlans" });
  const questionSets = useWatch({
    control,
    name: "questionSets",
  });

  const nameValidation = useNameValidation({
    name: agentName,
    checkExists: checkIfAgentExists,
    setError,
    clearErrors,
    fieldName: "agentName",
    enabled: isAgentCreate,
  });

  const isStringifiedValueNotEmpty = (value: unknown): boolean => {
    return !!value?.toString()?.trim().length;
  };

  const progress = useMemo(() => {
    const isAgentNameValidForProgress = (value: unknown): boolean => {
      return (
        isStringifiedValueNotEmpty(value) &&
        nameValidation.status === "available"
      );
    };

    const requiredFields = [
      "agentName",
      "description",
      "objective",
      "systemPrompt",
      "whatsappIntegrationId",
      "catalogS3Key",
      "catalogName",
    ] as const;

    const filledFields = requiredFields.filter((field) => {
      const value = formValues[requiredFields.indexOf(field)];

      // Special validation for agentName - it must have value AND be valid
      if (field === "agentName" && isAgentCreate) {
        return isAgentNameValidForProgress(value);
      }

      // For other fields, just check if they have valid values
      return isStringifiedValueNotEmpty(value);
    });

    return Math.round((filledFields.length / requiredFields.length) * 100);
  }, [formValues, nameValidation.status, isAgentCreate]);

  const { mutate: createAgentFn, isPending: isCreateAgentPending } =
    useMutation({
      mutationFn: createAgent,
      onSuccess: (data) => {
        toast.success("Agent has been created successfully");
        navigate({ to: `/agents/${data.id}/view` });
      },
      onError: (error: AxiosError<{ error?: string; message?: string }>) => {
        handleAgentMutationError(error, setError);
      },
    });

  const { mutate: updateAgentFn, isPending: isUpdateAgentPending } =
    useMutation({
      mutationFn: (values: AgentFormValues) => updateAgent(id, values),
      onSuccess: (data) => {
        toast.success("Agent has been updated successfully");
        navigate({ to: `/agents/${data.id}/view` });
      },
      onError: (error: AxiosError<{ error?: string; message?: string }>) => {
        handleAgentMutationError(error);
      },
    });

  const resetUploadState = () => {
    setUploadedCatalogKey(null);
    setUploadedFile(null);
    setValue("catalogS3Key", "", { shouldValidate: true });
    setValue("catalogName", "", { shouldValidate: true });
  };

  const { mutate: uploadFileFn } = useMutation({
    mutationFn: uploadFile,
    onSuccess: () => {
      if (uploadedCatalogKey) {
        setValue("catalogS3Key", uploadedCatalogKey, { shouldValidate: true });
        toast.success("Product catalog uploaded successfully");
        setUploadedCatalogKey(null);
      } else {
        toast.error(
          "Upload completed but no file reference received. Please try again."
        );
        resetUploadState();
      }
    },
    onError: (error: AxiosError) => {
      toast.error("Failed to upload file to S3. Please try again.");
      console.error("S3 upload error:", error);
      resetUploadState();
    },
  });

  const { mutate: stageUploadFn } = useMutation({
    mutationFn: stageUpload,
    onSuccess: (data, variables) => {
      setValue("catalogName", variables.filename, { shouldValidate: true });
      setUploadedCatalogKey(data.key);
      uploadFileFn({ url: data.uploadUrl, file: uploadedFile });
    },
    onError: () => {
      toast.error("Failed to prepare file upload. Please try again.");
      resetUploadState();
    },
  });

  const { data: whatsAppList } = useQuery({
    queryKey: ["whatsAppList"],
    queryFn: async () => {
      return await getWhatsAppList();
    },
  });

  const { data: agentData, isPending: isAgentLoading } = useQuery({
    queryKey: ["agents"],
    queryFn: async () => {
      return await getAgent(id);
    },
    enabled: isAgentEdit,
  });

  useEffect(() => {
    if (isAgentCreate) {
      clearErrors();
      reset(defaultAgentValues);

      setUploadedCatalogKey(null);
    }
  }, [isAgentCreate, location.pathname, reset, clearErrors]);

  useEffect(() => {
    if (agentData && isAgentEdit) {
      setValue("agentName", agentData?.name || "");
      setValue("description", agentData?.description || "");
      setValue("systemPrompt", agentData?.systemPrompt || "");
      setValue("objective", agentData?.objective || "");
      setValue("faqsBestAnswers", agentData?.faq || "");
      setValue("creativity", agentData?.creativity || 0);
      setValue("toneOfVoice", agentData?.tone || "");
      setValue("productPlans", agentData?.subscriptionPlans || "");
      setValue("whatsappIntegrationId", agentData?.wabaAccountId || "");
      setValue("catalogS3Key", agentData?.catalogS3Key || "");
      setValue("catalogName", agentData?.catalogName || "");
    }
  }, [agentData, setValue, isAgentEdit]);

  const validateCSV = async (file: File): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        const text = e.target?.result as string;
        const lines = text.split("\n").filter((line) => line.trim());

        if (lines.length < 2) {
          setCsvValidationError("CSV file is empty or has no data rows");
          reject(new Error("CSV file is empty"));
          return;
        }

        // Parse header row - preserve case for validation
        const headers = lines[0].split(",").map((h) => h.trim());
        const headersLowercase = headers.map((h) => h.toLowerCase());

        // Check for required "name" field (must be lowercase)
        if (!headers.includes("name")) {
          // Check if they have "Name" with capital N
          if (headersLowercase.includes("name")) {
            setCsvValidationError(
              'CSV header has "Name" but the backend requires lowercase "name". Please change your CSV header from "Name" to "name".'
            );
          } else {
            setCsvValidationError(
              'CSV file is missing required "name" column. Please include a lowercase "name" column in your CSV header.'
            );
          }
          reject(new Error("Missing required 'name' column"));
          return;
        }

        // Validate that data rows have content in the name column
        const nameIndex = headers.indexOf("name");
        const hasValidData = lines.slice(1).some((line) => {
          const values = line.split(",");
          return values[nameIndex]?.trim();
        });

        if (!hasValidData) {
          setCsvValidationError(
            "CSV file has no valid data. Please ensure at least one row has a name value."
          );
          reject(new Error("No valid data in CSV"));
          return;
        }

        setCsvValidationError(null);
        resolve(true);
      };

      reader.onerror = () => {
        setCsvValidationError("Failed to read CSV file");
        reject(new Error("Failed to read file"));
      };

      reader.readAsText(file);
    });
  };

  const handleFileUpload = async (file: File) => {
    if (file.type === "text/csv" || file.name.endsWith(".csv")) {
      try {
        await validateCSV(file);
        setUploadedFile(file);
        stageUploadFn({
          filename: file.name,
          contentType: file.type,
        });
        setCsvValidationError(null);
      } catch {
        setUploadedFile(null);
        setValue("catalogS3Key", "", { shouldValidate: true });
        setValue("catalogName", "", { shouldValidate: true });
        toast.error("CSV validation failed. Please check the file format.");
      }
    } else {
      setCsvValidationError("Please upload a CSV file");
      setUploadedFile(null);
      setValue("catalogS3Key", "", { shouldValidate: true });
      setValue("catalogName", "", { shouldValidate: true });
      toast.error("Please upload a CSV file");
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

  const onSubmit = async (values: AgentFormValues) => {
    if (isAgentEdit) {
      updateAgentFn(values);
      return;
    }

    if (!isAgentCreate) return;

    if (nameValidation.status === "exists") {
      toast.error("Agent with this name already exists");
      document.getElementById("agent-name")?.focus();
      return;
    }

    if (nameValidation.status === "checking") {
      toast.error("Please wait for name validation to complete");
      return;
    }

    createAgentFn(values);
  };

  const onError = (errors: FieldErrors<AgentFormValues>) => {
    const updatedSections = { ...openSections };
    if (errors.agentName || errors.description || errors.objective) {
      updatedSections.basicInfo = true;
    }
    if (errors.systemPrompt) {
      updatedSections.aiConfig = true;
    }
    if (errors.whatsappIntegrationId) {
      updatedSections.channels = true;
    }
    if (errors.catalogS3Key || errors.catalogName) {
      updatedSections.productCatalogue = true;
    }
    setOpenSections(updatedSections);

    const errorMessages: string[] = [];
    if (errors.agentName) errorMessages.push("Agent Name");
    if (errors.description) errorMessages.push("Description");
    if (errors.objective) errorMessages.push("Objective");
    if (errors.systemPrompt) errorMessages.push("System Prompt");
    if (errors.whatsappIntegrationId) errorMessages.push("WhatsApp Number");
    if (errors.catalogS3Key || errors.catalogName)
      errorMessages.push("Product Catalog");

    if (errorMessages.length > 0) {
      toast.error(
        `Please complete the following required fields: ${errorMessages.join(", ")}`
      );
    }
  };

  const handleScrollTo = (name: string) => {
    setOpenSections({ ...openSections, [name]: true });
    setTimeout(() => {
      switch (name) {
        case "basicInfo":
          return basicInfoRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        case "behavior":
          return behavior.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        case "aiConfig":
          return aiConfig.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        case "channels":
          return channelsRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        case "knowledge":
          return knowledgeRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        case "productCatalogue":
          return productCatalogueRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        case "questionSets":
          return questionSetsRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }
    }, 100);
  };

  const handleBackButton = () => {
    canGoBack ? router.history.back() : navigate({ to: "/agents" });
  };

  const setQuestionSets = (value: string) => {
    setValue("questionSets", value);
  };

  const setQuestionSetError = (value: string) => {
    setError("questionSets", {
      type: "manual",
      message: value,
    });
  };

  const clearQuestionSetError = () => {
    clearErrors("questionSets");
  };

  if (isAgentEdit && isAgentLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-64px)]">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col bg-gray-50">
      {/* Header */}
      <style>{`
        .highlight {
          background: yellow !important;
        }
      `}</style>

      <div className="bg-background border-b border-gray-200 px-6 py-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-4 flex-1">
          <Button variant="ghost" size="sm" onClick={() => handleBackButton()}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <Input
                value={agentName}
                onChange={(e) =>
                  setValue("agentName", e.target.value, {
                    shouldValidate: true,
                  })
                }
                className="text-gray-900 border-0 shadow-none px-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 max-w-md text-2xl font-semibold"
                placeholder="New Agent"
              />
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
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleBackButton()}
          >
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={handleSubmit(onSubmit, onError)}
            disabled={
              isCreateAgentPending ||
              isUpdateAgentPending ||
              (isAgentCreate &&
                (nameValidation.status === "checking" ||
                  nameValidation.status === "exists" ||
                  nameValidation.status === "error")) ||
              !!errors?.questionSets ||
              !agentName?.trim() ||
              progress < 100
            }
          >
            {isCreateAgentPending || isUpdateAgentPending ? (
              <div className="w-18 flex justify-center">
                <Loader2 className="animate-spin" />
              </div>
            ) : isAgentEdit ? (
              "Update Agent"
            ) : (
              "Save Agent"
            )}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden ">
        <div className="flex-shrink-0 flex flex-col max-w-3xl mx-auto py-8 pl-6">
          <div className="bg-background rounded-lg border border-gray-200 p-3">
            <div className="space-y-1">
              {navigationSection.map((section) => {
                const Icon = section.icon;
                return (
                  <Button
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors text-gray-700`}
                    variant="ghost"
                    key={section.id}
                    onClick={() => handleScrollTo(section.id)}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="flex-1 text-sm whitespace-nowrap">
                      {section.title}
                    </span>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
        {/* Form Section */}
        <div className="flex-1 overflow-auto">
          <ScrollArea className="h-full">
            <div className="max-w-3xl mx-auto py-8">
              <div className="space-y-4">
                {/* Basic Information */}
                <Collapsible
                  open={openSections.basicInfo}
                  ref={basicInfoRef}
                  onOpenChange={(open) =>
                    setOpenSections({ ...openSections, basicInfo: open })
                  }
                >
                  <div className="bg-background rounded-lg border border-gray-200 shadow-sm">
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
                              errors.agentName ||
                              nameValidation.status === "exists"
                                ? "text-red-500 text-sm mt-1"
                                : nameValidation.status === "available"
                                  ? "text-green-600 text-sm mt-1"
                                  : ""
                            }
                          >
                            Agent Name<span className="text-red-500">*</span>
                          </Label>
                          <ValidatedInput
                            id="agent-name"
                            placeholder="e.g., SalesBot Pro"
                            className="mt-1.5"
                            value={agentName}
                            onChange={(e) =>
                              setValue("agentName", e.target.value, {
                                shouldValidate: true,
                              })
                            }
                            disabled={isAgentEdit}
                            validationStatus={nameValidation.status}
                            showValidation={!isAgentEdit}
                          />
                          {(errors.agentName || nameValidation.message) && (
                            <p
                              className={`text-sm mt-1 ${
                                nameValidation.status === "available"
                                  ? "text-green-600"
                                  : "text-red-500"
                              }`}
                            >
                              {errors.agentName?.message ||
                                nameValidation.message}
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
                            Description<span className="text-red-500">*</span>
                          </Label>
                          <Textarea
                            id="agent-description"
                            placeholder="Brief description of what this agent does"
                            rows={3}
                            value={description}
                            onChange={(e) =>
                              setValue("description", e.target.value, {
                                shouldValidate: true,
                              })
                            }
                            className={`mt-1.5 ${errors.description ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                          />
                          {errors.description && (
                            <p className="text-sm text-red-500 mt-1">
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
                            Primary Objective
                            <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="agent-objective"
                            placeholder="e.g., Qualify leads and book meetings"
                            value={objective}
                            onChange={(e) =>
                              setValue("objective", e.target.value, {
                                shouldValidate: true,
                              })
                            }
                            className={`mt-1.5 ${errors.objective ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                          />
                          {errors.objective && (
                            <p className="text-sm text-red-500 mt-1">
                              {errors.objective.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>

                {/* Agent Behavior */}
                <Collapsible
                  ref={behavior}
                  open={openSections.behavior}
                  onOpenChange={(open) =>
                    setOpenSections({ ...openSections, behavior: open })
                  }
                >
                  <div className="bg-background rounded-lg border border-gray-200 shadow-sm">
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
                            value={toneOfVoice}
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
                            Creativity Level: {creativity}
                          </Label>
                          <Slider
                            id="temperature"
                            min={0}
                            max={1}
                            step={0.1}
                            value={[creativity]}
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
                  ref={aiConfig}
                  open={openSections.aiConfig}
                  onOpenChange={(open) =>
                    setOpenSections({ ...openSections, aiConfig: open })
                  }
                >
                  <div className="bg-background rounded-lg border border-gray-200 shadow-sm">
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
                            System Prompt<span className="text-red-500">*</span>
                          </Label>
                          <Textarea
                            id="system-prompt"
                            placeholder="Describe the agent's role, personality, and instructions..."
                            rows={6}
                            value={systemPrompt}
                            onChange={(e) =>
                              setValue("systemPrompt", e.target.value, {
                                shouldValidate: true,
                              })
                            }
                            className={`mt-1.5 font-mono text-sm ${errors.systemPrompt ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                          />
                          {errors.systemPrompt && (
                            <p className="text-sm text-red-500 mt-1">
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
                  ref={channelsRef}
                  open={openSections.channels}
                  onOpenChange={(open) =>
                    setOpenSections({ ...openSections, channels: open })
                  }
                >
                  <div
                    className={`bg-background rounded-lg border shadow-sm ${errors.whatsappIntegrationId ? "border-red-500" : "border-gray-200"}`}
                  >
                    <CollapsibleTrigger className="w-full px-6 py-4 flex items-center justify-between transition-colors hover:bg-gray-50 rounded-lg">
                      <div className="text-left">
                        <h3 className="text-gray-900 flex items-center gap-2">
                          Channels
                          <span className="text-red-500 text-sm">*</span>
                        </h3>
                        <p className="text-gray-600 text-sm">
                          Select where your agent will operate (Required)
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
                              <WhatsAppIcon />
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

                        {channels.whatsapp && (
                          <div className="mt-4">
                            <Label
                              htmlFor="whatsapp-number"
                              className={
                                errors.whatsappIntegrationId
                                  ? "text-red-500"
                                  : ""
                              }
                            >
                              Select WhatsApp Number
                              <span className="text-red-500">*</span>
                            </Label>
                            <Select
                              value={whatsappIntegrationId}
                              onValueChange={(value) =>
                                setValue("whatsappIntegrationId", value, {
                                  shouldValidate: true,
                                })
                              }
                            >
                              <SelectTrigger
                                id="whatsapp-number"
                                className={`mt-1.5 w-full ${errors.whatsappIntegrationId ? "border-red-500" : ""}`}
                              >
                                <SelectValue placeholder="Select WhatsApp number" />
                              </SelectTrigger>
                              <SelectContent>
                                {whatsAppList?.map(
                                  (whatsapp: WhatsAppResponse) => {
                                    const formatPhoneNumber = (
                                      phone: string
                                    ) => {
                                      if (!phone) return phone;

                                      // Remove all non-digit characters
                                      const cleaned = phone.replace(/\D/g, "");

                                      if (cleaned.length === 0) return phone;

                                      // Always format with + prefix: +1 555 831 0121
                                      const countryCode = cleaned.slice(0, 1);
                                      const rest = cleaned.slice(1);
                                      const groups =
                                        rest.match(/.{1,3}/g) || [];
                                      return `+${countryCode} ${groups.join(" ")}`;
                                    };

                                    return (
                                      <SelectItem
                                        key={whatsapp.id}
                                        value={whatsapp.id}
                                      >
                                        <span className="font-mono">
                                          {formatPhoneNumber(
                                            whatsapp.displayPhoneNumber
                                          )}
                                        </span>
                                        <span className="text-gray-500 ml-2">
                                          ({whatsapp.name})
                                        </span>
                                      </SelectItem>
                                    );
                                  }
                                )}
                              </SelectContent>
                            </Select>
                            {errors.whatsappIntegrationId && (
                              <p className="text-sm text-red-500 mt-1">
                                {errors.whatsappIntegrationId.message}
                              </p>
                            )}
                            {!whatsAppList?.length && (
                              <p className="text-xs text-gray-500 mt-1">
                                No WhatsApp numbers available. Please add one in
                                Integrations.
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>

                {/* Knowledge & Context */}
                <Collapsible
                  ref={knowledgeRef}
                  open={openSections.knowledge}
                  onOpenChange={(open) =>
                    setOpenSections({ ...openSections, knowledge: open })
                  }
                >
                  <div className="bg-background rounded-lg border border-gray-200 shadow-sm">
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
                            value={faqsBestAnswers}
                            onChange={(e) =>
                              setValue("faqsBestAnswers", e.target.value)
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
                  ref={productCatalogueRef}
                  open={openSections.productCatalogue}
                  onOpenChange={(open) =>
                    setOpenSections({ ...openSections, productCatalogue: open })
                  }
                >
                  <div
                    className={`bg-background rounded-lg border shadow-sm ${errors.catalogS3Key || errors.catalogName ? "border-red-500" : "border-gray-200"}`}
                  >
                    <CollapsibleTrigger className="w-full px-6 py-4 flex items-center justify-between transition-colors hover:bg-gray-50 rounded-lg">
                      <div className="text-left">
                        <h3 className="text-gray-900 flex items-center gap-2">
                          Product Catalogue
                          <span className="text-red-500 text-sm">*</span>
                        </h3>
                        <p className="text-gray-600 text-sm">
                          Upload CSV file with product data (Required)
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
                            value={productPlans}
                            onChange={(e) =>
                              setValue("productPlans", e.target.value, {
                                shouldValidate: true,
                              })
                            }
                            className="mt-1.5"
                          />
                        </div>

                        {/* Drag and Drop Upload Zone */}
                        <div>
                          <Label
                            className={
                              errors.catalogS3Key ? "text-red-500" : ""
                            }
                          >
                            Upload Product Catalog (CSV)
                            <span className="text-red-500">*</span>
                          </Label>
                          <div
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer hover:bg-gray-50 mt-1.5 ${
                              isDragging
                                ? "border-blue-500 bg-blue-50"
                                : errors.catalogS3Key || csvValidationError
                                  ? "border-red-500 bg-red-50"
                                  : "border-gray-300"
                            }`}
                            onClick={() => fileInputRef.current?.click()}
                          >
                            <input
                              ref={fileInputRef}
                              id="csv-upload"
                              type="file"
                              accept=".csv"
                              onChange={handleProductCatalogueFileInputChange}
                              className="hidden"
                            />
                            <div className="flex flex-col items-center gap-2">
                              <Upload
                                className={`w-8 h-8 ${
                                  isDragging
                                    ? "text-blue-500"
                                    : errors.catalogS3Key || csvValidationError
                                      ? "text-red-500"
                                      : "text-gray-400"
                                }`}
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
                          {(errors.catalogS3Key || errors.catalogName) && (
                            <p className="text-sm text-red-500 mt-1">
                              {errors.catalogS3Key?.message ||
                                errors.catalogName?.message}
                            </p>
                          )}
                        </div>

                        {csvValidationError && (
                          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                            <p className="text-sm text-red-600">
                              {csvValidationError}
                            </p>
                          </div>
                        )}
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>
                {/* Question Sets */}
                <Collapsible
                  ref={questionSetsRef}
                  open={openSections.questionSets}
                  onOpenChange={(open) =>
                    setOpenSections({ ...openSections, questionSets: open })
                  }
                >
                  <div className="bg-background rounded-lg border border-gray-200 shadow-sm">
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
                        <QuestionSets
                          questionSets={questionSets ?? ""}
                          setQuestionSets={setQuestionSets}
                          error={errors.questionSets?.message ?? ""}
                          setQuestionSetError={setQuestionSetError}
                          clearQuestionSetError={clearQuestionSetError}
                        />
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
