import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import {
  Bot,
  MessageSquare,
  Plus,
  Settings,
  Sparkles,
  TestTube,
  Upload,
} from "lucide-react";
import { Slider } from "../ui/slider";
import type { ProgressStep } from "@/types";

const sections = [
  { id: "profile", title: "Agent Program", icon: Bot },
  { id: "system", title: "Agent Configuration", icon: Settings },
  { id: "whatsapp", title: "WhatsApp Native Fields", icon: MessageSquare },
  { id: "experience", title: "Experience", icon: Sparkles },
];

export default function AgentBuilder({
  currentStep,
  setCurrentStep,
  steps,
}: {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  steps: ProgressStep[];
}) {
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

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-balance mb-2">
          Create AI Agent
        </h2>
        <p className="text-muted-foreground">
          Build your WhatsApp commerce AI agent with advanced configuration
          options
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
                setCurrentStep(sections.findIndex((s) => s.id === section.id))
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
                      <div key={lang} className="flex items-center space-x-2">
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
                    onValueChange={(value) => updateFormData("category", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Industry category of the agent" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                      <SelectItem value="saas">SaaS</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="travel">
                        Travel & Hospitality
                      </SelectItem>
                      <SelectItem value="realestate">Real Estate</SelectItem>
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
                      updateFormData("businessDescription", e.target.value)
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
                  <h3 className="text-xl font-semibold">Integrations</h3>
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
                        updateFormData("businessAccountId", e.target.value)
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
                  <Label htmlFor="primaryGoalKPI">Primary Goal / KPI *</Label>
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
                  <h3 className="text-xl font-semibold">AI System Design</h3>
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
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="friendly">Friendly</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="humorous">Humorous</SelectItem>
                      <SelectItem value="empathetic">Empathetic</SelectItem>
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
                      updateFormData("defineSocialMedia", e.target.checked)
                    }
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="defineSocialMedia">
                    Define using social media handles
                  </Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="targetAudience">Target Audience *</Label>
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
                  <Label htmlFor="faqsBestAnswers">FAQs & Best Answers</Label>
                  <div className="space-y-3">
                    <Textarea
                      id="faqsBestAnswers"
                      value={formData.faqsBestAnswers}
                      onChange={(e) =>
                        updateFormData("faqsBestAnswers", e.target.value)
                      }
                      placeholder="Enter questions and answers manually"
                      rows={6}
                    />
                    <Button variant="outline" className="w-full bg-transparent">
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
                      updateFormData("conversationClosure", e.target.value)
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
                        updateFormData("newTopicsToLearn", e.target.value)
                      }
                      placeholder="Input new topics for AI learning"
                      rows={3}
                    />
                    <Button variant="outline" className="w-full bg-transparent">
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
                        <div key={rule} className="flex items-center space-x-2">
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
                  <Label htmlFor="brandGuardrails">Brand Guardrails</Label>
                  <div className="space-y-3">
                    <Textarea
                      id="brandGuardrails"
                      value={formData.brandGuardrails}
                      onChange={(e) =>
                        updateFormData("brandGuardrails", e.target.value)
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
                          <Label htmlFor={guideline} className="text-sm">
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
                      updateFormData("marketingOptInCopy", e.target.value)
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
                      updateFormData("discoveryQuestions", e.target.value)
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
                  <Button variant="outline" className="w-full bg-transparent">
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
                  <h3 className="text-xl font-semibold">Generation Settings</h3>
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
                      <Label>Temperature (Assertiveness / Creativity)</Label>
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
                  <h3 className="text-xl font-semibold">Quick Reply Buttons</h3>
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
                          updateFormData("quickReplyHeader", e.target.value)
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
                          updateFormData("quickReplyFooter", e.target.value)
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
                          updateFormData("quickReplyTitle", e.target.value)
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
                          <SelectItem value="phone">Phone Number</SelectItem>
                          <SelectItem value="app">App Action</SelectItem>
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
                  <h3 className="text-xl font-semibold">List Messages</h3>
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
                      <Label htmlFor="listButtonLabel">Button Label</Label>
                      <Input
                        id="listButtonLabel"
                        value={formData.listButtonLabel}
                        onChange={(e) =>
                          updateFormData("listButtonLabel", e.target.value)
                        }
                        placeholder="Label for action button"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="listSectionTitle">Section Title</Label>
                    <Input
                      id="listSectionTitle"
                      value={formData.listSectionTitle}
                      onChange={(e) =>
                        updateFormData("listSectionTitle", e.target.value)
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
                      <Label htmlFor="listDescription">Description</Label>
                      <Textarea
                        id="listDescription"
                        value={formData.listDescription}
                        onChange={(e) =>
                          updateFormData("listDescription", e.target.value)
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
                      {["1st", "2nd", "3rd", "4th", "Basket drop-off"].map(
                        (option) => (
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
                        )
                      )}
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
                          updateFormData("dynamicPricing", e.target.value)
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
                        updateFormData("lastMessage71hrs", e.target.value)
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
                  Preview and test your AI agent before deploying to WhatsApp
                </p>

                <div className="bg-muted p-6 rounded-lg max-w-md mx-auto">
                  <div className="space-y-4">
                    <div className="bg-green-600 text-white p-3 rounded-lg rounded-br-sm text-left">
                      <p className="text-sm">
                        Hi! I'm your {formData.brandName || "AI"} assistant. How
                        can I help you today?
                      </p>
                    </div>
                    <div className="bg-white border p-3 rounded-lg rounded-bl-sm text-left">
                      <p className="text-sm">Tell me about your products</p>
                    </div>
                    <div className="bg-green-600 text-white p-3 rounded-lg rounded-br-sm text-left">
                      <p className="text-sm">
                        I'd be happy to help!{" "}
                        {formData.businessDescription
                          ? formData.businessDescription.slice(0, 50) + "..."
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
      </Card>
    </div>
  );
}
