import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import {
  Database,
  MessageCircle,
  MessageSquare,
  MousePointer,
  Plus,
  ShoppingCart,
  Target,
  TrendingDown,
  TrendingUp,
  UserCheck,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Progress } from "../ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const volumeData = [
  {
    date: "2024-01-08",
    conversations: 245,
    messages: 1420,
    clicks: 89,
    catalogItems: 156,
  },
  {
    date: "2024-01-09",
    conversations: 312,
    messages: 1876,
    clicks: 124,
    catalogItems: 203,
  },
  {
    date: "2024-01-10",
    conversations: 289,
    messages: 1654,
    clicks: 98,
    catalogItems: 178,
  },
  {
    date: "2024-01-11",
    conversations: 356,
    messages: 2134,
    clicks: 145,
    catalogItems: 234,
  },
  {
    date: "2024-01-12",
    conversations: 423,
    messages: 2567,
    clicks: 178,
    catalogItems: 289,
  },
  {
    date: "2024-01-13",
    conversations: 398,
    messages: 2345,
    clicks: 156,
    catalogItems: 267,
  },
  {
    date: "2024-01-14",
    conversations: 445,
    messages: 2789,
    clicks: 198,
    catalogItems: 312,
  },
];

const engagementData = [
  { metric: "Response Rate", value: 87, change: 5.2, trend: "up" },
  { metric: "Quick Reply Usage", value: 64, change: -2.1, trend: "down" },
  { metric: "Drop-off Rate", value: 23, change: -8.4, trend: "down" },
  { metric: "Avg Session Length", value: 4.2, change: 12.3, trend: "up" },
];

const businessOutcomes = [
  { date: "2024-01-08", checkouts: 34, conversions: 12.4, retention: 78.2 },
  { date: "2024-01-09", checkouts: 45, conversions: 15.8, retention: 79.1 },
  { date: "2024-01-10", checkouts: 38, conversions: 13.2, retention: 77.8 },
  { date: "2024-01-11", checkouts: 52, conversions: 18.1, retention: 80.3 },
  { date: "2024-01-12", checkouts: 61, conversions: 21.7, retention: 82.1 },
  { date: "2024-01-13", checkouts: 56, conversions: 19.4, retention: 81.5 },
  { date: "2024-01-14", checkouts: 68, conversions: 24.2, retention: 83.7 },
];

const abTestData = [
  {
    variant: "Control",
    conversations: 1247,
    conversions: 156,
    conversionRate: 12.5,
    revenue: 15600,
  },
  {
    variant: "Variant A",
    conversations: 1189,
    conversions: 178,
    conversionRate: 15.0,
    revenue: 17800,
  },
];

const pieData = [
  { name: "Completed", value: 68, color: "#10b981" },
  { name: "In Progress", value: 23, color: "#f59e0b" },
  { name: "Dropped", value: 9, color: "#ef4444" },
];

export default function Reporting() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-card-foreground">
            Analytics Dashboard
          </h2>
          <p className="text-muted-foreground">
            Track performance, engagement, and business outcomes
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Select defaultValue="7days">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Export Report</Button>
        </div>
      </div>

      <Tabs defaultValue="volume" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="volume" className="flex items-center space-x-2">
            <MessageCircle className="h-4 w-4" />
            <span>Volume Metrics</span>
          </TabsTrigger>
          <TabsTrigger
            value="engagement"
            className="flex items-center space-x-2"
          >
            <UserCheck className="h-4 w-4" />
            <span>Engagement Quality</span>
          </TabsTrigger>
          <TabsTrigger value="business" className="flex items-center space-x-2">
            <ShoppingCart className="h-4 w-4" />
            <span>Business Outcomes</span>
          </TabsTrigger>
          <TabsTrigger value="testing" className="flex items-center space-x-2">
            <Target className="h-4 w-4" />
            <span>A/B Testing</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="volume" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Total Conversations
                    </p>
                    <p className="text-2xl font-bold">2,468</p>
                  </div>
                  <MessageCircle className="h-8 w-8 text-blue-600" />
                </div>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-sm text-green-600">+12.5%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Messages Sent
                    </p>
                    <p className="text-2xl font-bold">14,785</p>
                  </div>
                  <MessageSquare className="h-8 w-8 text-green-600" />
                </div>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-sm text-green-600">+8.3%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Link Clicks
                    </p>
                    <p className="text-2xl font-bold">988</p>
                  </div>
                  <MousePointer className="h-8 w-8 text-purple-600" />
                </div>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-sm text-green-600">+15.7%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Catalog Items Viewed
                    </p>
                    <p className="text-2xl font-bold">1,639</p>
                  </div>
                  <Database className="h-8 w-8 text-orange-600" />
                </div>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-sm text-green-600">+22.1%</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Volume Trends</CardTitle>
              <CardDescription>
                Daily conversation and message volume over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={volumeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="conversations"
                    stroke="#3b82f6"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="messages"
                    stroke="#10b981"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="clicks"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {engagementData.map((item, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {item.metric}
                      </p>
                      <p className="text-2xl font-bold">
                        {item.value}
                        {item.metric.includes("Rate") ||
                        item.metric.includes("Length")
                          ? item.metric.includes("Length")
                            ? "min"
                            : "%"
                          : ""}
                      </p>
                    </div>
                    {item.trend === "up" ? (
                      <TrendingUp className="h-8 w-8 text-green-600" />
                    ) : (
                      <TrendingDown className="h-8 w-8 text-red-600" />
                    )}
                  </div>
                  <div className="flex items-center mt-2">
                    {item.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                    )}
                    <span
                      className={`text-sm ${
                        item.trend === "up" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {item.change > 0 ? "+" : ""}
                      {item.change}%
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Conversation Status Distribution</CardTitle>
                <CardDescription>
                  How conversations are completing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Engagement Quality Metrics</CardTitle>
                <CardDescription>Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Response Rate</span>
                    <span>87%</span>
                  </div>
                  <Progress value={87} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Quick Reply Usage</span>
                    <span>64%</span>
                  </div>
                  <Progress value={64} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>User Satisfaction</span>
                    <span>92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Goal Completion</span>
                    <span>76%</span>
                  </div>
                  <Progress value={76} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="business" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Total Checkouts
                    </p>
                    <p className="text-2xl font-bold">354</p>
                  </div>
                  <ShoppingCart className="h-8 w-8 text-green-600" />
                </div>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-sm text-green-600">+18.2%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Avg Conversion Rate
                    </p>
                    <p className="text-2xl font-bold">17.8%</p>
                  </div>
                  <Target className="h-8 w-8 text-blue-600" />
                </div>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-sm text-green-600">+3.4%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Customer Retention
                    </p>
                    <p className="text-2xl font-bold">80.3%</p>
                  </div>
                  <UserCheck className="h-8 w-8 text-purple-600" />
                </div>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-sm text-green-600">+5.7%</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Business Outcomes Over Time</CardTitle>
              <CardDescription>
                Track checkouts, conversions, and retention trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={businessOutcomes}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="checkouts"
                    stackId="1"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="conversions"
                    stackId="2"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="retention"
                    stackId="3"
                    stroke="#8b5cf6"
                    fill="#8b5cf6"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Attribution</CardTitle>
                <CardDescription>
                  Revenue generated through AI agent interactions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Direct Sales</span>
                  <span className="text-lg font-bold">$45,230</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Assisted Sales</span>
                  <span className="text-lg font-bold">$23,150</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Lead Generation</span>
                  <span className="text-lg font-bold">$12,890</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total Revenue</span>
                  <span className="text-xl font-bold text-green-600">
                    $81,270
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Journey Metrics</CardTitle>
                <CardDescription>
                  How customers progress through your funnel
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Initial Contact</span>
                    <span>100%</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Engaged Conversation</span>
                    <span>78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Product Interest</span>
                    <span>45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Purchase Intent</span>
                    <span>28%</span>
                  </div>
                  <Progress value={28} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Conversion</span>
                    <span>18%</span>
                  </div>
                  <Progress value={18} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="testing" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold">A/B Testing Dashboard</h3>
              <p className="text-muted-foreground">
                Compare AI agent variations and measure impact
              </p>
            </div>
            <Button className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Create New Test</span>
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Active Test: Greeting Message Variation</CardTitle>
              <CardDescription>
                Testing different greeting approaches for new customers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {abTestData.map((variant, index) => (
                  <Card
                    key={index}
                    className={
                      variant.variant === "Variant A" ? "border-green-500" : ""
                    }
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        {variant.variant}
                        {variant.variant === "Variant A" && (
                          <Badge className="bg-green-500">Winner</Badge>
                        )}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                ))}
              </div>

              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-green-600" />
                  <h4 className="font-semibold text-green-800">Test Results</h4>
                </div>
                <p className="text-sm text-green-700 mt-2">
                  Variant A shows a <strong>20% improvement</strong> in
                  conversion rate with 95% statistical significance. Consider
                  implementing this variation across all agents.
                </p>
              </div>

              <div className="flex space-x-4 mt-6">
                <Button>Implement Winner</Button>
                <Button variant="outline">Extend Test</Button>
                <Button variant="outline">View Details</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Test History</CardTitle>
              <CardDescription>
                Previous A/B tests and their outcomes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Test Name</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Winner</TableHead>
                    <TableHead>Improvement</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">
                      Product Recommendation Style
                    </TableCell>
                    <TableCell>14 days</TableCell>
                    <TableCell>Variant B</TableCell>
                    <TableCell className="text-green-600">+15.3%</TableCell>
                    <TableCell>
                      <Badge>Implemented</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Follow-up Timing
                    </TableCell>
                    <TableCell>21 days</TableCell>
                    <TableCell>Control</TableCell>
                    <TableCell className="text-red-600">-2.1%</TableCell>
                    <TableCell>
                      <Badge variant="secondary">Completed</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      CTA Button Text
                    </TableCell>
                    <TableCell>10 days</TableCell>
                    <TableCell>Variant A</TableCell>
                    <TableCell className="text-green-600">+8.7%</TableCell>
                    <TableCell>
                      <Badge>Implemented</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
