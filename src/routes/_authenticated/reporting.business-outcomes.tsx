import { createFileRoute } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
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
  DollarSign,
  TrendingUp,
  TrendingDown,
  Download,
  Calendar,
  ShoppingCart,
  Target,
  Users,
  Percent,
  ArrowLeft,
} from "lucide-react";
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

// Sample data
const revenueData = [
  { date: "Jan 1", revenue: 5420, conversions: 42 },
  { date: "Jan 2", revenue: 6380, conversions: 51 },
  { date: "Jan 3", revenue: 7450, conversions: 59 },
  { date: "Jan 4", revenue: 6520, conversions: 52 },
  { date: "Jan 5", revenue: 7880, conversions: 63 },
  { date: "Jan 6", revenue: 8250, conversions: 66 },
  { date: "Jan 7", revenue: 9210, conversions: 74 },
];

const conversionFunnelData = [
  { stage: "Visitors", count: 5420, percentage: 100 },
  { stage: "Engaged", count: 3250, percentage: 60 },
  { stage: "Qualified Leads", count: 1890, percentage: 35 },
  { stage: "Proposals Sent", count: 845, percentage: 16 },
  { stage: "Conversions", count: 407, percentage: 7.5 },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "#8b5cf6",
  },
  conversions: {
    label: "Conversions",
    color: "#10b981",
  },
};

function BusinessOutcomesPage() {
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
            title="Business Outcomes"
            description="Monitor conversions and revenue impact"
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
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">$45,890</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600">+18.2%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Conversion Rate</p>
                <p className="text-2xl font-bold">23.4%</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600">+4.1%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Percent className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Order Value</p>
                <p className="text-2xl font-bold">$127</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingDown className="w-4 h-4 text-red-600" />
                  <span className="text-sm text-red-600">-2.3%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Total Conversions
                </p>
                <p className="text-2xl font-bold">407</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600">+22.5%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Trend */}
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle>Revenue & Conversion Trend</CardTitle>
          <CardDescription>
            Daily revenue and conversion performance over the last 7 days
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <AreaChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="revenue"
                stroke="#8b5cf6"
                fill="#8b5cf6"
                fillOpacity={0.6}
              />
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="conversions"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Conversion Funnel */}
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle>Conversion Funnel</CardTitle>
          <CardDescription>
            Customer journey from first contact to conversion
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {conversionFunnelData.map((stage, index) => (
              <div key={stage.stage} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-semibold text-xs">
                      {index + 1}
                    </div>
                    <span className="font-medium">{stage.stage}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">
                      {stage.count.toLocaleString()}
                    </span>
                    <Badge variant="outline">{stage.percentage}%</Badge>
                  </div>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden ml-11">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-300"
                    style={{ width: `${stage.percentage}%` }}
                  />
                </div>
                {index < conversionFunnelData.length - 1 && (
                  <div className="ml-11 pl-2 text-xs text-muted-foreground">
                    Drop-off:{" "}
                    {(
                      ((conversionFunnelData[index].count -
                        conversionFunnelData[index + 1].count) /
                        conversionFunnelData[index].count) *
                      100
                    ).toFixed(1)}
                    %
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Revenue by Product Category & Top Converting Agents */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle>Revenue by Category</CardTitle>
            <CardDescription>
              Top revenue-generating product categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px] w-full">
              <BarChart
                data={[
                  { category: "Electronics", revenue: 18420 },
                  { category: "Fashion", revenue: 12850 },
                  { category: "Home & Garden", revenue: 8920 },
                  { category: "Sports", revenue: 5700 },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="revenue" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardHeader>
            <CardTitle>Top Converting Agents</CardTitle>
            <CardDescription>Agents by conversion rate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  name: "SalesBot Pro",
                  conversions: 142,
                  rate: 28.4,
                  revenue: "$18,034",
                },
                {
                  name: "Lead Qualifier",
                  conversions: 118,
                  rate: 24.1,
                  revenue: "$14,986",
                },
                {
                  name: "Support Assistant",
                  conversions: 89,
                  rate: 18.3,
                  revenue: "$11,303",
                },
                {
                  name: "Onboarding Bot",
                  conversions: 58,
                  rate: 15.8,
                  revenue: "$7,366",
                },
              ].map((agent, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center font-semibold text-purple-600 text-sm">
                      #{index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{agent.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {agent.conversions} conversions • {agent.revenue}
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
                    {agent.rate}%
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer Lifetime Value */}
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle>Customer Lifetime Value</CardTitle>
          <CardDescription>
            Average customer value and retention metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 border rounded-lg">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <p className="text-sm text-muted-foreground">Avg Customer LTV</p>
              <p className="text-3xl font-bold mt-1">$456</p>
              <p className="text-sm text-green-600 mt-2">
                +12.3% vs last period
              </p>
            </div>
            <div className="text-center p-6 border rounded-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-sm text-muted-foreground">
                Repeat Purchase Rate
              </p>
              <p className="text-3xl font-bold mt-1">34.2%</p>
              <p className="text-sm text-green-600 mt-2">
                +5.8% vs last period
              </p>
            </div>
            <div className="text-center p-6 border rounded-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-sm text-muted-foreground">
                Revenue per Customer
              </p>
              <p className="text-3xl font-bold mt-1">$127</p>
              <p className="text-sm text-red-600 mt-2">-2.3% vs last period</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export const Route = createFileRoute(
  "/_authenticated/reporting/business-outcomes"
)({
  component: BusinessOutcomesPage,
});
