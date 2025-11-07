import {
  House,
  Bot,
  Workflow,
  FlaskConical,
  ChartColumn,
  Zap,
  MessageSquare,
  Settings,
} from "lucide-react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { Badge } from "../ui/badge";
import { useApp } from "@/context/AppContext";

export default function SidebarNavigation() {
  const navigate = useNavigate();
  const { agents } = useApp();
  const { location } = useRouterState();
  const currentPath = location.pathname;

  const mainSections = [
    { id: "home", title: "Home", icon: House, route: "/" },
    {
      id: "agents",
      title: "Agents",
      icon: Bot,
      route: "/agents",
      badge: agents?.length.toString(),
    },
    {
      id: "workflows",
      title: "Workflows",
      icon: Workflow,
      route: "/workflows",
    },
    {
      id: "testing",
      title: "A/B Testing",
      icon: FlaskConical,
      route: "/ab-testing",
    },
    {
      id: "templates",
      title: "Templates",
      icon: ChartColumn,
      route: "/templates",
    },
    {
      id: "intelligence",
      title: "Intelligence",
      icon: Zap,
      route: "/intelligence",
    },
    {
      id: "messages",
      title: "Messages",
      icon: MessageSquare,
      route: "/messages",
    },
    { id: "settings", title: "Settings", icon: Settings, route: "/settings" },
  ];

  return (
    <nav className="flex-1 px-4">
      <ul className="space-y-2">
        {mainSections.map((section) => {
          const Icon = section.icon;
          const isActive = currentPath === section.route;

          return (
            <li key={section.id}>
              <button
                onClick={() => navigate({ to: section.route })}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors cursor-pointer ${
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{section.title}</span>
                {section.badge && (
                  <Badge variant="secondary" className="ml-auto">
                    {section.badge}
                  </Badge>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
