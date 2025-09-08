import { Card, CardContent } from "../../ui/card";
import axios from "axios";
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
import AgentBuilderNavigationTabs from "./AgentBuilderNavigationTabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  agentBuilderSchema,
  defaultValues,
  type AgentBuilderFormValues,
} from "./schema";
import { useState } from "react";
import type { AgentBuilderStep } from "./types";
import { Step } from "./types";

const steps: AgentBuilderStep[] = [
  { id: Step.Profile, title: "Agent Program", icon: Bot },
  { id: Step.Config, title: "Agent Configuration", icon: Settings },
  // { id: "whatsapp", title: "WhatsApp Native Fields", icon: MessageSquare },
  // { id: "experience", title: "Experience", icon: Sparkles },
];

export default function AgentBuilderContainer() {
  const [currentStep, setCurrentStep] = useState(steps[0].id);
  const currentStepIndex = steps.findIndex(
    (section) => section.id === currentStep
  );

  const form = useForm<AgentBuilderFormValues>({
    resolver: zodResolver(agentBuilderSchema),
    defaultValues,
  });

  // Define which fields belong to each step so we can validate only those
  const stepFields: Record<string, (keyof AgentBuilderFormValues)[]> = {
    [Step.Profile]: [
      "brandName",
      "category",
      "waAuthToken",
      "wabaPhoneNumberId",
      "wabaId",
      "waLinkUrl",
    ],
    [Step.Config]: [
      "systemPromptCustomisation",
      "toneOfVoice",
      // Add other required step 1 fields you want to gate navigation on
    ],
  };

  const nextStep = async () => {
    // Trigger validation only for the current step's fields
    const fieldsToValidate = stepFields[currentStep] || [];
    const isValid = await form.trigger(fieldsToValidate as any, {
      shouldFocus: true,
    });
    if (!isValid) return; // Stop if step invalid

    if (currentStepIndex < steps.length - 1) {
      setCurrentStep(steps[currentStepIndex + 1].id);
    }
  };

  const prevStep = () => {
    if (currentStepIndex && currentStepIndex > 0) {
      setCurrentStep(steps[currentStepIndex - 1].id);
    }
  };

  const submitForm = async (values: AgentBuilderFormValues) => {
    console.log("smth");
    console.log("Submitting form values:", values);
    return;
    const payload = {
      waAuthToken: values.waAuthToken,
      wabaPhoneNumberId: values.wabaPhoneNumberId,
      wabaId: values.wabaId,
      name: values.brandName,
      vertical: values.category,
    };

    await axios.post(`${import.meta.env.VITE_BACKEND_URL}/clients`, payload);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <AgentBuilderHeader />

      {/* Section Navigation Tabs */}
      <AgentBuilderNavigationTabs
        steps={steps}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />

      {/* Form Content */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitForm)}>
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
                          name="brandName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel htmlFor="brandName">
                                Brand Name *
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Brand/company name"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor="category">Category *</FormLabel>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Industry category of the agent" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="entertainment">
                                  Entertainment
                                </SelectItem>
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
                            <FormMessage />
                          </FormItem>
                        )}
                      />
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
                          name="waAuthToken"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel htmlFor="waAuthToken">
                                WA Auth Token *
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="WhatsApp authentication token"
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
                          name="wabaPhoneNumberId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel htmlFor="wabaPhoneNumberId">
                                WABA Phone Number ID *
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="WhatsApp Business Account phone number ID"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <FormField
                          control={form.control}
                          name="wabaId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel htmlFor="wabaId">WABA ID *</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="WhatsApp Business Account ID"
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
                          name="waLinkUrl"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel htmlFor="waLinkUrl">
                                WA Link URL *
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="WhatsApp Business Account URL user to be navigated to"
                                />
                              </FormControl>
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
                      <Label htmlFor="aiGuardrails">AI Guardrails</Label>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            "No medical advice",
                            "No legal advice",
                            "No competitor mentions",
                            "No swearing or offensive language",
                            "Mention sustainability",
                            "Use inclusive language",
                            "Reference quality guarantee",
                            "Avoid pricing discussions",
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
                            Hi! I'm your {formData.brandName || "AI"} assistant.
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

              {/* Progress Bar for Agent Builder */}
              {/* <AgentBuilderProgressBar currentStep={currentStep} steps={steps} /> */}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStepIndex === 0}
                >
                  Previous
                </Button>

                <div className="flex space-x-3">
                  {/* <Button variant="outline">Save Draft</Button> */}
                  {currentStepIndex === steps.length - 1 ? (
                    <Button type="submit">Deploy Agent</Button>
                  ) : (
                    <Button type="button" onClick={nextStep}>
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
