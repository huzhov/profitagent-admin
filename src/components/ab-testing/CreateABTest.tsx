import { useState, useRef, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  Eye,
  Target,
  MessageSquare,
  Trophy,
  Users,
  Plus,
  Check,
  Play,
  X,
} from "lucide-react";

interface StepConfig {
  id: number;
  title: string;
  subtitle: string;
}

interface Variant {
  id: string;
  name: string;
  personality: string;
  temperature: number;
  welcomeMessage: string;
  systemPrompt: string;
}

const steps: StepConfig[] = [
  { id: 1, title: "Test Setup", subtitle: "Basic test configuration" },
  { id: 2, title: "Variants", subtitle: "Configure test variants" },
  { id: 3, title: "Settings", subtitle: "Advanced test settings" },
  { id: 4, title: "Review", subtitle: "Review and launch" },
];

const primaryGoals = [
  {
    id: "conversion",
    icon: Target,
    title: "Conversion Rate",
    description: "Optimize for lead generation and sales",
  },
  {
    id: "engagement",
    icon: MessageSquare,
    title: "Engagement Rate",
    description: "Increase user interaction and session length",
  },
  {
    id: "satisfaction",
    icon: Trophy,
    title: "Customer Satisfaction",
    description: "Improve customer satisfaction scores",
  },
  {
    id: "retention",
    icon: Users,
    title: "User Retention",
    description: "Keep users coming back",
  },
];

export function CreateABTest() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [testName, setTestName] = useState("");
  const [testDescription, setTestDescription] = useState("");
  const [selectedGoal, setSelectedGoal] = useState<string>("");
  const [newVariantId, setNewVariantId] = useState<string | null>(null);
  const variantRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Variants state
  const [variants, setVariants] = useState<Variant[]>([
    {
      id: "variant-1",
      name: "Variant A",
      personality: "friendly",
      temperature: 55,
      welcomeMessage: "Hi there! What brings you here today?",
      systemPrompt: "You are a friendly and approachable sales assistant.",
    },
  ]);

  // Settings state
  const [testDuration, setTestDuration] = useState(14);
  const [controlTraffic, setControlTraffic] = useState(50);
  const [variantTraffic, setVariantTraffic] = useState(50);
  const [minSampleSize, setMinSampleSize] = useState(1000);
  const [confidenceLevel, setConfidenceLevel] = useState("95");

  // Scroll to newly added variant
  useEffect(() => {
    if (newVariantId && variantRefs.current[newVariantId]) {
      variantRefs.current[newVariantId]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      setNewVariantId(null);
    }
  }, [newVariantId, variants]);

  const handleBack = () => {
    navigate({ to: "/ab-testing" });
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const addVariant = () => {
    const newVariantNumber = variants.length + 1;
    const newId = `variant-${Date.now()}`;
    const newVariant: Variant = {
      id: newId,
      name: `Variant ${String.fromCharCode(64 + newVariantNumber)}`,
      personality: "",
      temperature: 50,
      welcomeMessage: "",
      systemPrompt: "",
    };
    setVariants([...variants, newVariant]);
    setNewVariantId(newId);
  };

  const deleteVariant = (id: string) => {
    setVariants(variants.filter((v) => v.id !== id));
  };

  const updateVariant = (
    id: string,
    field: keyof Variant,
    value: string | number
  ) => {
    setVariants(
      variants.map((v) => (v.id === id ? { ...v, [field]: value } : v))
    );
  };

  const progressPercentage = (currentStep / steps.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        {/* Mobile Layout - Two Rows */}
        <div className="sm:hidden px-4 py-4 space-y-3">
          {/* First Row - Back Button */}
          <div>
            <Button variant="ghost" onClick={handleBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>

          {/* Second Row - Title and Preview Button */}
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0 flex-1">
              <h1 className="text-lg font-semibold">Create A/B Test</h1>
              <p className="text-xs text-muted-foreground">
                Step {currentStep} of {steps.length}:{" "}
                {steps[currentStep - 1].subtitle}
              </p>
            </div>
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Desktop Layout - One Row */}
        <div className="hidden sm:flex items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={handleBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-xl font-semibold">Create A/B Test</h1>
              <p className="text-sm text-muted-foreground">
                Step {currentStep} of {steps.length}:{" "}
                {steps[currentStep - 1].subtitle}
              </p>
            </div>
          </div>
          <Button variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-73px)]">
        {/* Left Sidebar - Progress */}
        <div className="w-full lg:w-80 border-b lg:border-b-0 lg:border-r border-border bg-card p-4 sm:p-6">
          <div className="space-y-4">
            <h3 className="font-medium text-sm sm:text-base">Progress</h3>
            <div className="space-y-3">
              {steps.map((step) => (
                <div
                  key={step.id}
                  onClick={() => setCurrentStep(step.id)}
                  className={cn(
                    "flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors",
                    currentStep === step.id
                      ? "bg-primary/10 text-primary"
                      : currentStep > step.id
                        ? "text-muted-foreground"
                        : "text-muted-foreground hover:bg-accent"
                  )}
                >
                  <div
                    className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center text-xs",
                      currentStep === step.id
                        ? "bg-primary text-primary-foreground"
                        : currentStep > step.id
                          ? "bg-green-100 text-green-700"
                          : "bg-muted text-muted-foreground"
                    )}
                  >
                    {currentStep > step.id ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      step.id
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{step.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {step.subtitle}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-4 border-t">
              <div className="text-xs sm:text-sm text-muted-foreground mb-2">
                Overall Progress
              </div>
              <div className="bg-primary/20 relative w-full overflow-hidden rounded-full h-2">
                <div
                  className="bg-primary h-full w-full flex-1 transition-all"
                  style={{
                    transform: `translateX(-${100 - progressPercentage}%)`,
                  }}
                />
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {progressPercentage.toFixed(0)}% complete
              </div>
            </div>
          </div>
        </div>

        {/* Right Content - Form */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            <div className="max-w-4xl mx-auto w-full">
              <div className="mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-semibold mb-2">
                  {steps[currentStep - 1].title}
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground">
                  {steps[currentStep - 1].subtitle}
                </p>
              </div>

              {currentStep === 1 && (
                <div className="space-y-6">
                  {/* Test Name */}
                  <div>
                    <label className="text-sm font-medium leading-none">
                      Test Name *
                    </label>
                    <Input
                      type="text"
                      value={testName}
                      onChange={(e) => setTestName(e.target.value)}
                      placeholder="e.g., Welcome Message Optimization"
                      className="mt-2"
                    />
                  </div>

                  {/* Test Description */}
                  <div>
                    <label className="text-sm font-medium leading-none">
                      Test Description
                    </label>
                    <Textarea
                      value={testDescription}
                      onChange={(e) => setTestDescription(e.target.value)}
                      placeholder="Describe what you're testing and your hypothesis..."
                      className="mt-2"
                    />
                  </div>

                  {/* Primary Goal */}
                  <div>
                    <label className="text-sm font-medium leading-none">
                      Primary Goal *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                      {primaryGoals.map((goal) => {
                        const Icon = goal.icon;
                        return (
                          <div
                            key={goal.id}
                            onClick={() => setSelectedGoal(goal.id)}
                            className={cn(
                              "p-4 border rounded-lg cursor-pointer transition-colors",
                              selectedGoal === goal.id
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/50"
                            )}
                          >
                            <div className="flex items-start gap-3">
                              <Icon className="w-5 h-5 mt-0.5 text-primary" />
                              <div>
                                <h4 className="font-medium">{goal.title}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {goal.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Target Agent */}
                  <div>
                    <label className="text-sm font-medium leading-none">
                      Target Agent *
                    </label>
                    <Select>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select the agent to test" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sales-pro">
                          Sales Pro Agent
                        </SelectItem>
                        <SelectItem value="customer-support">
                          Customer Support Agent
                        </SelectItem>
                        <SelectItem value="lead-qualifier">
                          Lead Qualifier Agent
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Configure Variants</h3>
                    <Button variant="outline" onClick={addVariant}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Variant
                    </Button>
                  </div>

                  <div className="space-y-6">
                    {/* Control Variant */}
                    <div className="border rounded-xl">
                      <div className="px-6 pt-6 pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Input
                              type="text"
                              value="Control (Current Agent)"
                              className="font-medium"
                              readOnly
                            />
                            <span className="inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium whitespace-nowrap">
                              Control
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="px-6 pb-6 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium leading-none">
                              Personality
                            </label>
                            <Select defaultValue="professional">
                              <SelectTrigger className="mt-2">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="professional">
                                  Professional
                                </SelectItem>
                                <SelectItem value="friendly">
                                  Friendly
                                </SelectItem>
                                <SelectItem value="casual">Casual</SelectItem>
                                <SelectItem value="formal">Formal</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <label className="text-sm font-medium leading-none">
                              Temperature: 30
                            </label>
                            <Slider
                              defaultValue={[30]}
                              max={100}
                              step={1}
                              className="mt-2"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium leading-none">
                            Welcome Message
                          </label>
                          <Textarea
                            value="Hello! How can I help you today?"
                            className="mt-2"
                            readOnly
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium leading-none">
                            System Prompt
                          </label>
                          <Textarea
                            value="You are a professional sales assistant."
                            className="mt-2"
                            readOnly
                          />
                        </div>
                      </div>
                    </div>

                    {/* Dynamic Variants */}
                    {variants.map((variant) => (
                      <div
                        key={variant.id}
                        ref={(el) => {
                          variantRefs.current[variant.id] = el;
                        }}
                        className="border rounded-xl"
                      >
                        <div className="px-6 pt-6 pb-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Input
                                type="text"
                                value={variant.name}
                                onChange={(e) =>
                                  updateVariant(
                                    variant.id,
                                    "name",
                                    e.target.value
                                  )
                                }
                                className="font-medium"
                              />
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteVariant(variant.id)}
                              className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="px-6 pb-6 space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium leading-none">
                                Personality
                              </label>
                              <Select
                                value={variant.personality}
                                onValueChange={(value) =>
                                  updateVariant(
                                    variant.id,
                                    "personality",
                                    value
                                  )
                                }
                              >
                                <SelectTrigger className="mt-2">
                                  <SelectValue placeholder="Select personality" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="professional">
                                    Professional
                                  </SelectItem>
                                  <SelectItem value="friendly">
                                    Friendly
                                  </SelectItem>
                                  <SelectItem value="casual">Casual</SelectItem>
                                  <SelectItem value="formal">Formal</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <label className="text-sm font-medium leading-none">
                                Temperature: {variant.temperature}
                              </label>
                              <Slider
                                value={[variant.temperature]}
                                onValueChange={(value) =>
                                  updateVariant(
                                    variant.id,
                                    "temperature",
                                    value[0]
                                  )
                                }
                                max={100}
                                step={1}
                                className="mt-2"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-sm font-medium leading-none">
                              Welcome Message
                            </label>
                            <Textarea
                              value={variant.welcomeMessage}
                              onChange={(e) =>
                                updateVariant(
                                  variant.id,
                                  "welcomeMessage",
                                  e.target.value
                                )
                              }
                              placeholder="Enter welcome message..."
                              className="mt-2"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium leading-none">
                              System Prompt
                            </label>
                            <Textarea
                              value={variant.systemPrompt}
                              onChange={(e) =>
                                updateVariant(
                                  variant.id,
                                  "systemPrompt",
                                  e.target.value
                                )
                              }
                              placeholder="Enter system prompt..."
                              className="mt-2"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  {/* Test Duration */}
                  <div>
                    <label className="text-sm font-medium leading-none">
                      Test Duration
                    </label>
                    <div className="flex items-center gap-4 mt-2">
                      <Slider
                        value={[testDuration]}
                        onValueChange={(value) => setTestDuration(value[0])}
                        min={7}
                        max={60}
                        step={1}
                        className="flex-1"
                      />
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                          {testDuration}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          days
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Traffic Split */}
                  <div>
                    <label className="text-sm font-medium leading-none">
                      Traffic Split
                    </label>
                    <div className="space-y-3 mt-2">
                      {/* Control Traffic */}
                      <div className="flex items-center gap-4">
                        <div className="w-32 text-sm">
                          Control (Current Agent):
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Slider
                              value={[controlTraffic]}
                              onValueChange={(value) => {
                                setControlTraffic(value[0]);
                                setVariantTraffic(100 - value[0]);
                              }}
                              min={0}
                              max={100}
                              step={1}
                              className="flex-1"
                            />
                            <span className="text-sm font-medium w-12">
                              {controlTraffic}%
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Variant A Traffic */}
                      <div className="flex items-center gap-4">
                        <div className="w-32 text-sm">Variant A:</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Slider
                              value={[variantTraffic]}
                              onValueChange={(value) => {
                                setVariantTraffic(value[0]);
                                setControlTraffic(100 - value[0]);
                              }}
                              min={0}
                              max={100}
                              step={1}
                              className="flex-1"
                            />
                            <span className="text-sm font-medium w-12">
                              {variantTraffic}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Minimum Sample Size and Confidence Level */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium leading-none">
                        Minimum Sample Size
                      </label>
                      <Input
                        type="number"
                        value={minSampleSize}
                        onChange={(e) =>
                          setMinSampleSize(Number(e.target.value))
                        }
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium leading-none">
                        Confidence Level
                      </label>
                      <Select
                        value={confidenceLevel}
                        onValueChange={setConfidenceLevel}
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="90">90%</SelectItem>
                          <SelectItem value="95">95%</SelectItem>
                          <SelectItem value="99">99%</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-6">
                  {/* Test Summary Card */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="leading-none">
                        Test Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">
                            Test Name:
                          </span>
                          <div className="font-medium">
                            {testName || "Not set"}
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Primary Goal:
                          </span>
                          <div className="font-medium">
                            {selectedGoal
                              ? primaryGoals.find((g) => g.id === selectedGoal)
                                  ?.title
                              : "Not set"}
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Target Agent:
                          </span>
                          <div className="font-medium">Not set</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Duration:
                          </span>
                          <div className="font-medium">{testDuration} days</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Variants Card */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="leading-none">
                        Variants ({variants.length + 1})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Control Variant */}
                        <div className="flex items-start justify-between p-3 border rounded-lg">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium">
                                Control (Current Agent)
                              </span>
                              <Badge variant="outline">Control</Badge>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              professional • 30% temperature
                            </div>
                            <div className="text-sm text-muted-foreground">
                              "Hello! How can I help you today?"
                            </div>
                          </div>
                          <Badge variant="outline">
                            {controlTraffic}% traffic
                          </Badge>
                        </div>

                        {/* Dynamic Variants */}
                        {variants.map((variant) => (
                          <div
                            key={variant.id}
                            className="flex items-start justify-between p-3 border rounded-lg"
                          >
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium">
                                  {variant.name}
                                </span>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {variant.personality || "not set"} •{" "}
                                {variant.temperature}% temperature
                              </div>
                              <div className="text-sm text-muted-foreground">
                                "{variant.welcomeMessage || "not set"}"
                              </div>
                            </div>
                            <Badge variant="outline">
                              {variantTraffic}% traffic
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Ready to Launch Banner */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-2">
                      Ready to Launch
                    </h4>
                    <p className="text-sm text-blue-700">
                      Your test will run for {testDuration} days and
                      automatically collect data on{" "}
                      {selectedGoal
                        ? primaryGoals
                            .find((g) => g.id === selectedGoal)
                            ?.title.toLowerCase()
                        : "your primary goal"}
                      . You can monitor progress and stop the test early if
                      needed.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="border-t border-border bg-card p-4 sm:p-6">
            <div className="max-w-4xl mx-auto flex justify-between gap-2">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              {currentStep === steps.length ? (
                <Button onClick={() => navigate({ to: "/ab-testing" })}>
                  <Play className="w-4 h-4 mr-2" />
                  Launch Test
                </Button>
              ) : (
                <Button onClick={handleNext}>Next Step</Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
