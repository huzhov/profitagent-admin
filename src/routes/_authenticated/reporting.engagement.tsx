import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Activity,
  TrendingUp,
  TrendingDown,
  Download,
  Calendar,
  Clock,
  Star,
  MessageCircle,
  ThumbsUp,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

// Sample data
const responseTimeData = [
  { date: "Jan 1", avgTime: 1.8 },
  { date: "Jan 2", avgTime: 1.5 },
  { date: "Jan 3", avgTime: 1.2 },
  { date: "Jan 4", avgTime: 1.4 },
  { date: "Jan 5", avgTime: 1.1 },
  { date: "Jan 6", avgTime: 1.3 },
  { date: "Jan 7", avgTime: 1.2 },
];

const satisfactionData = [
  { name: "Satisfaction", value: 4.8, fill: "#10b981" },
];

const chartConfig = {
  avgTime: {
    label: "Avg Response Time (min)",
    color: "#10b981",
  },
};

function EngagementPage() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate({ to: "/settings/reporting" })}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <PageHeader
            title="Engagement Quality"
            description="Measure interaction quality and response rates"
            showBorder={false}
            showButton={false}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Last 7 Days
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-none">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Response Rate</p>
                <p className="text-2xl font-bold">94.2%</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600">+3.1%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Avg Response Time
                </p>
                <p className="text-2xl font-bold">1.2 min</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingDown className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600">-0.3 min</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Customer Satisfaction
                </p>
                <p className="text-2xl font-bold">4.8/5</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600">+0.2</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Resolution Rate</p>
                <p className="text-2xl font-bold">87.5%</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600">+5.2%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <ThumbsUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Response Time Trend & Satisfaction Score */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-none md:col-span-2">
          <CardHeader>
            <CardTitle>Response Time Trend</CardTitle>
            <CardDescription>
              Average response time over the last 7 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <LineChart data={responseTimeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="avgTime"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ fill: "#10b981" }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardHeader>
            <CardTitle>Overall Satisfaction</CardTitle>
            <CardDescription>Customer satisfaction score</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <div className="text-center">
              <ChartContainer config={chartConfig} className="h-[200px] w-full">
                <RadialBarChart
                  data={satisfactionData}
                  startAngle={90}
                  endAngle={-270}
                  innerRadius="80%"
                  outerRadius="100%"
                >
                  <RadialBar dataKey="value" cornerRadius={10} />
                </RadialBarChart>
              </ChartContainer>
              <div className="mt-4">
                <p className="text-4xl font-bold">4.8</p>
                <p className="text-sm text-muted-foreground">out of 5.0</p>
                <div className="flex items-center justify-center gap-1 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${star <= 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Response Time Distribution */}
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle>Response Time Distribution</CardTitle>
          <CardDescription>
            Percentage of responses by time range
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                range: "< 30 seconds",
                count: 3456,
                percentage: 42.8,
                color: "bg-green-500",
              },
              {
                range: "30s - 1 min",
                count: 2891,
                percentage: 35.7,
                color: "bg-blue-500",
              },
              {
                range: "1 - 2 min",
                count: 1234,
                percentage: 15.3,
                color: "bg-yellow-500",
              },
              {
                range: "> 2 min",
                count: 512,
                percentage: 6.2,
                color: "bg-red-500",
              },
            ].map((item) => (
              <div key={item.range} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{item.range}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">
                      {item.count.toLocaleString()} responses
                    </span>
                    <Badge variant="outline">{item.percentage}%</Badge>
                  </div>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} transition-all duration-300`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Agent Performance */}
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle>Agent Performance Ratings</CardTitle>
          <CardDescription>Customer satisfaction by agent</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                name: "SalesBot Pro",
                rating: 4.9,
                responses: 847,
                avgTime: "0.8 min",
              },
              {
                name: "Support Assistant",
                rating: 4.8,
                responses: 778,
                avgTime: "1.1 min",
              },
              {
                name: "Lead Qualifier",
                rating: 4.7,
                responses: 491,
                avgTime: "1.3 min",
              },
              {
                name: "Onboarding Bot",
                rating: 4.6,
                responses: 367,
                avgTime: "1.5 min",
              },
              {
                name: "FAQ Helper",
                rating: 4.5,
                responses: 86,
                avgTime: "2.1 min",
              },
            ].map((agent, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center font-semibold text-green-600">
                    #{index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{agent.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {agent.responses.toLocaleString()} responses • Avg:{" "}
                      {agent.avgTime}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{agent.rating}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">rating</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export const Route = createFileRoute("/_authenticated/reporting/engagement")({
  component: EngagementPage,
});
