import { Card, CardContent } from "@/components/ui/card";
import {
  Bot,
  FlaskConical,
  MessageSquare,
  TrendingUp,
  MousePointerClick,
} from "lucide-react";

export default function StatsCards({ totalAgent }: { totalAgent: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <Card className="py-0 shadow-none rounded-xl border">
        <CardContent className="[&:last-child]:pb-6 p-4">
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-muted-foreground">Total Agents</span>
          </div>
          <p className="text-2xl font-semibold">{totalAgent}</p>
        </CardContent>
      </Card>

      <Card className="py-0 shadow-none rounded-xl border">
        <CardContent className="[&:last-child]:pb-6 p-4">
          <div className="flex items-center gap-2">
            <FlaskConical className="w-4 h-4 text-purple-600" />
            <span className="text-sm text-muted-foreground">Active Tests</span>
          </div>
          <p className="text-2xl font-semibold">0</p>
        </CardContent>
      </Card>

      <Card className="py-0 shadow-none rounded-xl border">
        <CardContent className="[&:last-child]:pb-6 p-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-sm text-muted-foreground">Visits</span>
          </div>
          <p className="text-2xl font-semibold">0</p>
        </CardContent>
      </Card>

      <Card className="py-0 shadow-none rounded-xl border">
        <CardContent className="[&:last-child]:pb-6 p-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-orange-600" />
            <span className="text-sm text-muted-foreground">Engagements</span>
          </div>
          <p className="text-2xl font-semibold">0</p>
        </CardContent>
      </Card>

      <Card className="py-0 shadow-none rounded-xl border">
        <CardContent className="[&:last-child]:pb-6 p-4">
          <div className="flex items-center gap-2">
            <MousePointerClick className="w-4 h-4 text-yellow-600" />
            <span className="text-sm text-muted-foreground">Clicks</span>
          </div>
          <p className="text-2xl font-semibold">0</p>
        </CardContent>
      </Card>
    </div>
  );
}
