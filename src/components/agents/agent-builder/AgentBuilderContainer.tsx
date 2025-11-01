import { Card, CardContent } from "../../ui/card";
import { apiJson } from "@/lib/http";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Textarea } from "../../ui/textarea";
import { Separator } from "../../ui/separator";
import { Button } from "../../ui/button";
import { Bot, Settings } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import AgentBuilderHeader from "./AgentBuilderHeader";
import AgentBuilderProgressBar from "./AgentBuilderProgressBar";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  agentBuilderSchema,
  defaultValues,
  type AgentBuilderFormValues,
} from "./schema";
import { useEffect, useMemo, useState, type MouseEvent } from "react";
import type { AgentBuilderStep } from "./types";
import { Step } from "./types";

const steps: AgentBuilderStep[] = [
  { id: Step.Profile, title: "Agent Program", icon: Bot },
  { id: Step.Config, title: "Agent Configuration", icon: Settings },
  // { id: "whatsapp", title: "WhatsApp Native Fields", icon: MessageSquare },
  // { id: "experience", title: "Experience", icon: Sparkles },
];

const stepFields: Record<Step, (keyof AgentBuilderFormValues)[]> = {
  [Step.Profile]: ["agentName", "integrationId"],
  [Step.Config]: [
    "systemPromptCustomisation",
    "toneOfVoice",
    "aiGuardrails",
    "faqsBestAnswers",
    "productPlans",
  ],
};

const profileSchema = agentBuilderSchema.pick({
  agentName: true,
  integrationId: true,
});

const configSchema = agentBuilderSchema.pick({
  systemPromptCustomisation: true,
  toneOfVoice: true,
  aiGuardrails: true,
  faqsBestAnswers: true,
  productPlans: true,
});

type Integration = {
  id: number;
  name: string;
  displayPhoneNumber: string;
  status?: "enabled" | "disabled";
};

export default function AgentBuilderContainer() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(steps[0].id);
  const currentStepIndex = Math.max(
    0,
    steps.findIndex((section) => section.id === currentStep)
  );

  const form = useForm<AgentBuilderFormValues>({
    resolver: zodResolver(agentBuilderSchema),
    defaultValues,
  });

  const { isSubmitting, isValid } = form.formState;
  const profileWatch = form.watch(stepFields[Step.Profile]);
  const configWatch = form.watch(stepFields[Step.Config]);

  // Evaluate validity so navigation buttons can reflect the current form state.
  const isCurrentStepValid = useMemo(() => {
    const fields = stepFields[currentStep] ?? [];
    if (!fields.length) {
      return true;
    }

    const values = Object.fromEntries(
      fields.map((field) => [field, form.getValues(field)])
    );

    if (currentStep === Step.Profile) {
      return profileSchema.safeParse(values).success;
    }

    if (currentStep === Step.Config) {
      return configSchema.safeParse(values).success;
    }

    return true;
  }, [configWatch, currentStep, form, profileWatch]);

  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [integrationsLoading, setIntegrationsLoading] = useState(false);
  const [integrationsError, setIntegrationsError] = useState<string | null>(
    null
  );

  useEffect(() => {
    setIntegrationsLoading(true);
    setIntegrationsError(null);
    apiJson<Integration[]>(
      `${import.meta.env.VITE_BACKEND_URL}/integrations/whatsapp`
    )
      .then((res) => setIntegrations(res))
      .catch((err) => {
        console.error("Failed to fetch integrations", err);
        const message =
          err instanceof Error ? err.message : "Failed to load integrations";
        setIntegrationsError(message);
      })
      .finally(() => setIntegrationsLoading(false));
  }, []);

  const nextStep = async (e?: MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    e?.stopPropagation();
    // Trigger validation only for the current step's fields
    const fieldsToValidate = stepFields[currentStep] || [];
    const isValid = await form.trigger(fieldsToValidate, {
      shouldFocus: true,
    });
    if (!isValid) return;

    if (currentStepIndex < steps.length - 1) {
      setCurrentStep(steps[currentStepIndex + 1].id);
    }
  };

  const prevStep = (e?: MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (currentStepIndex && currentStepIndex > 0) {
      setCurrentStep(steps[currentStepIndex - 1].id);
    }
  };

  const submitForm = async (values: AgentBuilderFormValues) => {
    const filteredValues = Object.fromEntries(
      Object.entries(values).filter(([_, v]) => !!v)
    );
    const mappedValues = {
      ...filteredValues,
      aiGuardrails: filteredValues.aiGuardrails?.length
        ? filteredValues.aiGuardrails
        : [],
      businessId: JSON.parse(localStorage.getItem("user") || "{}").businessId,
    };
    await apiJson(`${import.meta.env.VITE_BACKEND_URL}/agents`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mappedValues),
    });
    toast.success("Agent has been created successfully");
    navigate({ to: "/" });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <AgentBuilderHeader />

      <div className="mt-6 mb-8">
        <AgentBuilderProgressBar currentStep={currentStepIndex} steps={steps} />
      </div>

      {/* Form Content */}
      <Form {...form}>
        <form onSubmit={(e) => e.preventDefault()}>
          <Card>
            <CardContent className="space-y-6">
              {/* Section 1: Agent Program */}
              {currentStep === Step.Profile && (
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
                        <FormField
                          control={form.control}
                          name="agentName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel htmlFor="agentName">
                                Agent Name *
                              </FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Agent name" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
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
                      <h3 className="text-xl font-semibold">Integrations</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <FormField
                          control={form.control}
                          name="integrationId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel htmlFor="integrationId">
                                WhatsApp Integration *
                              </FormLabel>
                              <Select
                                value={field.value}
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                disabled={
                                  integrationsLoading ||
                                  integrations.length === 0
                                }
                              >
                                <FormControl>
                                  <SelectTrigger className="w-full">
                                    <SelectValue
                                      placeholder={
                                        integrationsLoading
                                          ? "Loading integrations..."
                                          : integrationsError
                                            ? "Unable to load integrations"
                                            : "Select an integration"
                                      }
                                    />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {integrations.map((integration) => (
                                    <SelectItem
                                      key={integration.id}
                                      value={integration.id.toString()}
                                    >
                                      {integration.name}
                                      {integration.displayPhoneNumber
                                        ? ` • +${integration.displayPhoneNumber}`
                                        : ""}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              {integrationsError ? (
                                <p className="text-sm text-destructive">
                                  {integrationsError}
                                </p>
                              ) : null}
                              {!integrationsLoading &&
                              !integrationsError &&
                              integrations.length === 0 ? (
                                <p className="text-sm text-muted-foreground">
                                  No WhatsApp integrations available. Configure
                                  one first.
                                </p>
                              ) : null}
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Section 2: Agent Configuration */}
              {currentStep === Step.Config && (
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
                      <FormField
                        control={form.control}
                        name="systemPromptCustomisation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor="systemPromptCustomisation">
                              System Prompt Customisation *
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                rows={5}
                                placeholder="Customize the base AI system prompt to define your agent's personality, behavior, and response style"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="toneOfVoice"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor="toneOfVoice">
                              Tone of Voice / Communication Style *
                            </FormLabel>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="professional">
                                  Professional
                                </SelectItem>
                                <SelectItem value="friendly">
                                  Friendly
                                </SelectItem>
                                <SelectItem value="casual">Casual</SelectItem>
                                <SelectItem value="humorous">
                                  Humorous
                                </SelectItem>
                                <SelectItem value="empathetic">
                                  Empathetic
                                </SelectItem>
                                <SelectItem value="authoritative">
                                  Authoritative
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="faqsBestAnswers"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor="faqsBestAnswers">
                              FAQs & Best Answers
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                rows={5}
                                placeholder="Enter questions and answers manually"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {/* <div className="space-y-3"> */}
                      {/* <Button
                          variant="outline"
                          className="w-full bg-transparent"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Upload FAQ Document
                        </Button> */}
                      {/* </div> */}
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
                      <FormField
                        control={form.control}
                        name="aiGuardrails"
                        render={({ field }) => {
                          const options = [
                            "No medical advice",
                            "No legal advice",
                            "No competitor mentions",
                            "No swearing or offensive language",
                            "Mention sustainability",
                            "Use inclusive language",
                            "Reference quality guarantee",
                            "Avoid pricing discussions",
                          ];
                          const value: string[] = Array.isArray(field.value)
                            ? field.value
                            : [];
                          const toggle = (rule: string) => {
                            const next = value.includes(rule)
                              ? value.filter((r) => r !== rule)
                              : [...value, rule];
                            field.onChange(next);
                          };
                          return (
                            <FormItem>
                              <FormLabel htmlFor="aiGuardrails">
                                AI Guardrails
                              </FormLabel>
                              <div className="space-y-3">
                                <div className="grid grid-cols-2 gap-3">
                                  {options.map((rule) => (
                                    <div
                                      key={rule}
                                      className="flex items-center space-x-2"
                                    >
                                      <input
                                        type="checkbox"
                                        id={rule}
                                        className="rounded border-gray-300"
                                        checked={value.includes(rule)}
                                        onChange={() => toggle(rule)}
                                      />
                                      <Label htmlFor={rule} className="text-sm">
                                        {rule}
                                      </Label>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Product Catalogue */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="h-8 w-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                        3
                      </div>
                      <h3 className="text-xl font-semibold">
                        Product Catalogue (Subscription Plans)
                      </h3>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <FormField
                          control={form.control}
                          name="productPlans"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel htmlFor="productPlans">
                                Product / Plan
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  {...field}
                                  rows={5}
                                  placeholder="List products or subscription plans with details"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      {/* <Button
                        variant="outline"
                        className="w-full bg-transparent"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload CSV Product Catalog
                      </Button> */}
                    </div>
                  </div>
                </div>
              )}

              {/* {currentStep === 8 && (
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
                            Hi! I'm your {formData.agentName || "AI"} assistant.
                            How can I help you today?
                          </p>
                        </div>
                        <div className="bg-white border p-3 rounded-lg rounded-bl-sm text-left">
                          <p className="text-sm">Tell me about your products</p>
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
              )} */}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStepIndex === 0}
                >
                  Previous
                </Button>

                <div className="flex space-x-3">
                  {/* <Button variant="outline">Save Draft</Button> */}
                  {currentStepIndex === steps.length - 1 ? (
                    <Button
                      type="button"
                      onClick={() => form.handleSubmit(submitForm)()}
                      disabled={!isValid || isSubmitting}
                    >
                      Deploy Agent
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={nextStep}
                      disabled={!isCurrentStepValid}
                    >
                      Next
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
