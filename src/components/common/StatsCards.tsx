import { Card, CardContent } from "@/components/ui/card";
import { getAgentCount } from "@/services/agents";
import { getBusinessEngagements } from "@/services/business";
import { useQueries } from "@tanstack/react-query";
import { useBusiness } from "@/context/AppContext";
import {
  Bot,
  FlaskConical,
  MessageSquare,
  TrendingUp,
  MousePointerClick,
} from "lucide-react";

export default function StatsCards({ type }: { type: string }) {
  const { business } = useBusiness();

  const [{ data: agentCountData }, { data: businessEngagementsData }] =
    useQueries({
      queries: [
        {
          queryKey: ["agentCount"],
          queryFn: async () => getAgentCount(),
          enabled: !!business,
        },
        {
          queryKey: ["businessEngagements"],
          queryFn: async () => getBusinessEngagements(business?.id || null),
          enabled: !!business,
        },
      ],
    });

  const statsData = [
    {
      id: "totalAgents",
      title: "Total Agents",
      icon: Bot,
      count: agentCountData?.count ?? 0,
      color: "blue-600",
    },
    {
      id: "activeTest",
      title: "Active Test",
      icon: FlaskConical,
      count: 0,
      color: "purple-600",
    },
    {
      id: "visits",
      title: "Visits",
      icon: TrendingUp,
      count: 0,
      color: "green-600",
    },
    {
      id: "engagements",
      title: "Engagements",
      icon: MessageSquare,
      count: businessEngagementsData?.engagements ?? 0,
      color: "orange-600",
    },
    {
      id: "clicks",
      title: "Clicks",
      icon: MousePointerClick,
      count: 0,
      color: "yellow-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      {statsData.map((stats) => {
        const Icon = stats.icon;
        return (
          <Card className="py-0 shadow-none rounded-xl border" key={stats.id}>
            <CardContent className="[&:last-child]:pb-6 p-4">
              {type === "Home" ? (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {stats.title}
                    </p>
                    <p className="text-2xl font-semibold">{stats.count}</p>
                  </div>
                  <Icon className={`w-8 h-8 text-${stats.color}`} />
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <Icon className={`w-4 h-4 text-${stats.color}`} />
                    <span className="text-sm text-muted-foreground">
                      {stats.title}
                    </span>
                  </div>
                  <p className="text-2xl font-semibold">{stats.count}</p>
                </>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
