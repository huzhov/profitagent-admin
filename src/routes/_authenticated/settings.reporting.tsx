import { createFileRoute, useNavigate } from "@tanstack/react-router";
import SettingsLayout from "@/components/settings/SettingsLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Activity, DollarSign } from "lucide-react";

function ReportingSettings() {
  const navigate = useNavigate();

  return (
    <SettingsLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Volume Metrics Card */}
        <Card
          className="shadow-none cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => navigate({ to: "/reporting/volume-metrics" })}
        >
          <CardHeader>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
            <CardTitle>Volume Metrics</CardTitle>
            <CardDescription>
              Track message volumes and conversation trends
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Total Messages
                </span>
                <span className="font-semibold">12,847</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Conversations
                </span>
                <span className="font-semibold">2,156</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Avg. per Day
                </span>
                <span className="font-semibold">428</span>
              </div>
            </div>
            <Button variant="link" className="mt-4 p-0">
              View Detailed Report →
            </Button>
          </CardContent>
        </Card>

        {/* Engagement Quality Card */}
        <Card
          className="shadow-none cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => navigate({ to: "/reporting/engagement" })}
        >
          <CardHeader>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3">
              <Activity className="w-6 h-6 text-green-600" />
            </div>
            <CardTitle>Engagement Quality</CardTitle>
            <CardDescription>
              Measure interaction quality and response rates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Response Rate
                </span>
                <span className="font-semibold">94.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Avg. Response Time
                </span>
                <span className="font-semibold">1.2 min</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Customer Satisfaction
                </span>
                <span className="font-semibold">4.8/5</span>
              </div>
            </div>
            <Button variant="link" className="mt-4 p-0">
              View Detailed Report →
            </Button>
          </CardContent>
        </Card>

        {/* Business Outcomes Card */}
        <Card
          className="shadow-none cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => navigate({ to: "/reporting/business-outcomes" })}
        >
          <CardHeader>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
            <CardTitle>Business Outcomes</CardTitle>
            <CardDescription>
              Monitor conversions and revenue impact
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Conversion Rate
                </span>
                <span className="font-semibold">23.4%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Revenue Generated
                </span>
                <span className="font-semibold">$45,890</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Avg. Order Value
                </span>
                <span className="font-semibold">$127</span>
              </div>
            </div>
            <Button variant="link" className="mt-4 p-0">
              View Detailed Report →
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-900">
          <strong>Tip:</strong> Click on any card above to view the full
          detailed reporting dashboard with charts, filters, and export options.
        </p>
      </div>
    </SettingsLayout>
  );
}

export const Route = createFileRoute("/_authenticated/settings/reporting")({
  component: ReportingSettings,
});
