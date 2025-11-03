import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import {
  Plus,
  Play,
  CircleCheck,
  TrendingUp,
  Calendar,
  Target,
  MessageSquare,
  Users,
  Eye,
  Pause,
  Trophy,
  EllipsisVertical,
} from "lucide-react";

interface TestVariant {
  name: string;
  isControl?: boolean;
  isWinner?: boolean;
  conversionRate: number;
  impressions: number;
  conversions: number;
  improvement?: number;
}

interface ABTest {
  id: number;
  title: string;
  description: string;
  status: "Running" | "Completed";
  significance: boolean;
  metric: string;
  metricIcon: typeof Target | typeof MessageSquare;
  agentName: string;
  variantCount: number;
  variants: TestVariant[];
  totalImpressions: number;
  confidence: number;
}

export default function ABTesting() {
  const tests: ABTest[] = [
    {
      id: 1,
      title: "Sales Agent Personality Test",
      description:
        "Testing professional vs friendly tone for lead qualification",
      status: "Running",
      significance: true,
      metric: "Conversion",
      metricIcon: Target,
      agentName: "SalesBot Pro",
      variantCount: 2,
      variants: [
        {
          name: "Professional Tone (Control)",
          isControl: true,
          conversionRate: 7.0,
          impressions: 1250,
          conversions: 87,
        },
        {
          name: "Friendly Tone",
          isWinner: true,
          conversionRate: 10.5,
          impressions: 1180,
          conversions: 124,
          improvement: 51.0,
        },
      ],
      totalImpressions: 2430,
      confidence: 95,
    },
    {
      id: 2,
      title: "Welcome Message Optimization",
      description: "Testing different welcome message approaches",
      status: "Completed",
      significance: true,
      metric: "Engagement",
      metricIcon: MessageSquare,
      agentName: "SalesBot Pro",
      variantCount: 2,
      variants: [
        {
          name: "Direct CTA",
          isControl: true,
          conversionRate: 5.1,
          impressions: 890,
          conversions: 45,
        },
        {
          name: "Question-based",
          isWinner: true,
          conversionRate: 8.0,
          impressions: 910,
          conversions: 73,
          improvement: 58.7,
        },
      ],
      totalImpressions: 1800,
      confidence: 98,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        title="A/B Testing"
        description="Test different agent configurations to optimize performance and conversions"
        showBorder={true}
        showButton={false}
      />

      {/* Content */}
      <div>
        <Tabs defaultValue="overview" className="flex flex-col gap-2">
          <TabsList className="bg-muted text-muted-foreground h-9 w-fit items-center justify-center rounded-xl p-[3px] flex">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="flex-1 outline-none mt-6">
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-muted-foreground">
                      Active Tests
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <Play className="w-4 h-4 text-green-600" />
                      <span className="text-2xl font-semibold">1</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-muted-foreground">
                      Completed Tests
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <CircleCheck className="w-4 h-4 text-blue-600" />
                      <span className="text-2xl font-semibold">1</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-muted-foreground">
                      Avg Improvement
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-2xl font-semibold">+24.3%</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-muted-foreground">
                      Tests This Month
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-purple-600" />
                      <span className="text-2xl font-semibold">0</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Tests Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">A/B Tests</h2>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Test
                  </Button>
                </div>

                {/* Test Cards */}
                <div className="grid gap-4">
                  {tests.map((test) => {
                    const MetricIcon = test.metricIcon;
                    return (
                      <Card
                        key={test.id}
                        className="hover:shadow-md transition-shadow"
                      >
                        <CardContent className="p-6">
                          {/* Test Header */}
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="font-semibold">{test.title}</h3>
                                <Badge
                                  className={
                                    test.status === "Running"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-blue-100 text-blue-800"
                                  }
                                >
                                  {test.status}
                                </Badge>
                                {test.significance && (
                                  <Badge
                                    variant="outline"
                                    className="text-green-600 border-green-200"
                                  >
                                    Significant
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">
                                {test.description}
                              </p>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <MetricIcon className="w-3 h-3" />
                                  {test.metric}
                                </span>
                                <span>{test.agentName}</span>
                                <span>{test.variantCount} variants</span>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 rounded-md"
                            >
                              <EllipsisVertical className="w-4 h-4" />
                            </Button>
                          </div>

                          {/* Variants Comparison */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            {test.variants.map((variant, index) => (
                              <div
                                key={index}
                                className="border rounded-lg p-4"
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-medium text-sm">
                                    {variant.name}
                                  </h4>
                                  <div className="flex gap-1">
                                    {variant.isControl && (
                                      <Badge variant="outline">Control</Badge>
                                    )}
                                    {variant.isWinner && (
                                      <Badge className="bg-green-100 text-green-800">
                                        <Trophy className="w-3 h-3 mr-1" />
                                        Winner
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <div className="flex justify-between text-sm">
                                    <span>Conversion Rate</span>
                                    <span className="font-medium">
                                      {variant.conversionRate}%
                                    </span>
                                  </div>
                                  <div className="flex justify-between text-sm">
                                    <span>Impressions</span>
                                    <span>{variant.impressions}</span>
                                  </div>
                                  <div className="flex justify-between text-sm">
                                    <span>Conversions</span>
                                    <span>{variant.conversions}</span>
                                  </div>
                                  {variant.improvement && (
                                    <div className="flex justify-between text-sm text-green-600">
                                      <span>Improvement</span>
                                      <span>+{variant.improvement}%</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Test Footer */}
                          <div className="flex items-center justify-between pt-4 border-t">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Users className="w-4 h-4" />
                              <span>
                                {test.totalImpressions.toLocaleString()} total
                                impressions
                              </span>
                              <span>•</span>
                              <span>{test.confidence}% confidence</span>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Eye className="w-3 h-3 mr-1" />
                                View Details
                              </Button>
                              {test.status === "Running" ? (
                                <Button variant="outline" size="sm">
                                  <Pause className="w-3 h-3 mr-1" />
                                  Pause
                                </Button>
                              ) : (
                                <Button size="sm">
                                  <Trophy className="w-3 h-3 mr-1" />
                                  Deploy Winner
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="results" className="flex-1 outline-none mt-6">
            {/* Results content will go here */}
          </TabsContent>

          <TabsContent value="insights" className="flex-1 outline-none mt-6">
            {/* Insights content will go here */}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
