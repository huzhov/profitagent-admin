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
  MessageSquare,
  TrendingUp,
  TrendingDown,
  Download,
  Calendar,
  Users,
  MessageCircle,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

// Sample data for charts
const volumeData = [
  { date: "Jan 1", messages: 420, conversations: 85 },
  { date: "Jan 2", messages: 380, conversations: 76 },
  { date: "Jan 3", messages: 450, conversations: 90 },
  { date: "Jan 4", messages: 520, conversations: 104 },
  { date: "Jan 5", messages: 480, conversations: 96 },
  { date: "Jan 6", messages: 550, conversations: 110 },
  { date: "Jan 7", messages: 610, conversations: 122 },
];

const hourlyData = [
  { hour: "00:00", messages: 12 },
  { hour: "03:00", messages: 8 },
  { hour: "06:00", messages: 25 },
  { hour: "09:00", messages: 68 },
  { hour: "12:00", messages: 92 },
  { hour: "15:00", messages: 78 },
  { hour: "18:00", messages: 85 },
  { hour: "21:00", messages: 45 },
];

const chartConfig = {
  messages: {
    label: "Messages",
    color: "#3b82f6",
  },
  conversations: {
    label: "Conversations",
    color: "#8b5cf6",
  },
};

function VolumeMetricsPage() {
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
            title="Volume Metrics"
            description="Track message volumes and conversation trends"
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
                <p className="text-sm text-muted-foreground">Total Messages</p>
                <p className="text-2xl font-bold">12,847</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600">+12.5%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Conversations</p>
                <p className="text-2xl font-bold">2,156</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600">+8.3%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. per Day</p>
                <p className="text-2xl font-bold">428</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingDown className="w-4 h-4 text-red-600" />
                  <span className="text-sm text-red-600">-2.1%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold">1,892</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600">+15.7%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Message Volume Trend */}
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle>Message Volume Trend</CardTitle>
          <CardDescription>
            Daily message and conversation volume over the last 7 days
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <AreaChart data={volumeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="messages"
                stackId="1"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="conversations"
                stackId="2"
                stroke="#8b5cf6"
                fill="#8b5cf6"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Hourly Distribution & Channel Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle>Hourly Distribution</CardTitle>
            <CardDescription>Message volume by hour of day</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px] w-full">
              <BarChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="messages" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardHeader>
            <CardTitle>Channel Breakdown</CardTitle>
            <CardDescription>
              Messages per communication channel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  channel: "WhatsApp",
                  count: 8456,
                  percentage: 65.8,
                  color: "bg-green-500",
                },
                {
                  channel: "Web Chat",
                  count: 2891,
                  percentage: 22.5,
                  color: "bg-blue-500",
                },
                {
                  channel: "Telegram",
                  count: 1024,
                  percentage: 8.0,
                  color: "bg-sky-500",
                },
                {
                  channel: "SMS",
                  count: 476,
                  percentage: 3.7,
                  color: "bg-purple-500",
                },
              ].map((item) => (
                <div key={item.channel} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{item.channel}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">
                        {item.count.toLocaleString()}
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
      </div>

      {/* Top Performing Agents */}
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle>Top Performing Agents</CardTitle>
          <CardDescription>Agents by message volume</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                name: "SalesBot Pro",
                messages: 4234,
                conversations: 847,
                status: "active",
              },
              {
                name: "Support Assistant",
                messages: 3892,
                conversations: 778,
                status: "active",
              },
              {
                name: "Lead Qualifier",
                messages: 2456,
                conversations: 491,
                status: "active",
              },
              {
                name: "Onboarding Bot",
                messages: 1834,
                conversations: 367,
                status: "active",
              },
              {
                name: "FAQ Helper",
                messages: 431,
                conversations: 86,
                status: "paused",
              },
            ].map((agent, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-semibold text-blue-600">
                    #{index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{agent.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {agent.messages.toLocaleString()} messages •{" "}
                      {agent.conversations.toLocaleString()} conversations
                    </p>
                  </div>
                </div>
                <Badge
                  variant={agent.status === "active" ? "default" : "secondary"}
                >
                  {agent.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export const Route = createFileRoute(
  "/_authenticated/reporting/volume-metrics"
)({
  component: VolumeMetricsPage,
});
